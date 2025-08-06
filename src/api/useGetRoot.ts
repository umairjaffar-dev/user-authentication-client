import { useQuery } from "@tanstack/react-query";
import { useAxiosInstance } from "./useAxiosInstance";

const useGetRoot = () => {
  const axiosInstance = useAxiosInstance();
  return useQuery({
    queryKey: ["root"],
    queryFn: async () => {
      const response = await axiosInstance.get("http://127.0.0.1:7700/root/");
      return response.data;
    },
  });
};

export default useGetRoot;
