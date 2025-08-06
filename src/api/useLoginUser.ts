import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { loginUrl } from "./apiConstant";

const useLoginUser = () => {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: (data: { email: string; password: string }) => {
      return axios.post(
        loginUrl,
        { ...data },
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
          withCredentials: true,
        }
      );
    },
  });
};

export default useLoginUser;
