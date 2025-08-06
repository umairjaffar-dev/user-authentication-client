import { useMutation } from "@tanstack/react-query";
import { useAxiosInstance } from "./useAxiosInstance";
import { logoutUrl } from "./apiConstant";


export const useLogoutUser = () => {
  const axiosInstance = useAxiosInstance();

  return useMutation({
    mutationKey: ["logout"],
    mutationFn: () => {
      return axiosInstance.post(logoutUrl);
    },
  });
};
