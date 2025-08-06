import { useMutation } from "@tanstack/react-query";
import { registerUrl } from "./apiConstant";
import axios from "axios";

const useRegisterUser = () => {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: (data: { name: string; email: string; password: string }) => {
      return axios.post(
        registerUrl,
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

export default useRegisterUser;
