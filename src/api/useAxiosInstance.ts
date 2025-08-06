import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import { axiosInstance } from "./apiConstant";
import type { AxiosError } from "axios";
import axios from "axios";
import useClearAppState from "../useClearAppState";

export const useAxiosInstance = () => {
  //   const { accessToken, updateAccessToken } = useUser();
  const clearAppState = useClearAppState();
  //   const refresh = useRefreshToken();
  const navigate = useNavigate();
  const location = useLocation();

  const accessToken = localStorage.getItem("token");

  useEffect(() => {
    /**
     * Step 1) retriedRequests:
     *   - This set is used to track URLs that have already been retried after 401.
     *   - Prevent infinite retry loop if the refersh still fails.
     */
    const retriedRequests = new Set<string>();

    /**
     * Step 2) Attach Request Interceptors:
     */
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`; // Add the access token to the request headers
        }
        return config;
      },
      (error: AxiosError) => Promise.reject(new Error(error.message))
    );

    /**
     * Step 3) Attach Response Interceptors:
     */
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error: unknown) => {
        if (axios.isAxiosError<{ errors: string }>(error)) {
          // Extract Some Important data from error like, statuscode, message, config etc.
          const axiosError = error;
          const responseStatusCode = axiosError.response?.status;
          const originalRequest = axiosError.config;

          const alreadyRetried = retriedRequests.has(
            originalRequest?.url ?? ""
          );

          if (
            originalRequest &&
            responseStatusCode === 401 &&
            !alreadyRetried
          ) {
            retriedRequests.add(originalRequest.url ?? "");

            // try {
            //   const res = await refresh();
            //   const newAccessToken = res.data.accessToken;
            //   updateAccessToken(newAccessToken);

            //   originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            //   return await axiosInstance(originalRequest);
            // } catch (retriedReqError) {
            //   if (axios.isAxiosError(retriedReqError)) {
            //     return Promise.reject(retriedReqError);
            //   }

            //   return Promise.reject(
            //     new Error(
            //       "This must be an axios error. please check if something is wrong"
            //     )
            //   );
            // }
          }

          //if refresh token is expired
          if (responseStatusCode === 403) {
            clearAppState();
            void navigate("/login", {
              state: {
                from: location.pathname + location.search,
              },
            });
          } else {
            // console.log("in else ", axiosError);
            return Promise.reject(axiosError);
          }
        }
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [
    accessToken,
    // refresh,
    // updateAccessToken,
    location.pathname,
    location.search,
    navigate,
    // clearAppState,
  ]);

  return axiosInstance;
};
