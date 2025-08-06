import { Outlet, useNavigate } from "react-router";
import useClearAppState from "../../useClearAppState";
import { useLogoutUser } from "../../api/useLogoutUser";
import toast from "react-hot-toast";
import axios from "axios";

const AuthWrapper = () => {
  const navigate = useNavigate();
  const { mutate: logout } = useLogoutUser();
  const clearAppState = useClearAppState();

  const loggedoutHandler = () => {
    logout(undefined, {
      onSuccess() {
        clearAppState();
        navigate("/login");
        toast.success("User LoggedOut!");
      },
      onError(error: unknown) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.statusText ?? "An error occurred");
          console.error(error.response?.statusText);
          return;
        } else if (error instanceof Error) {
          toast.error("Server error occurred");
          console.error(error.message);
          return;
        }

        toast.error("An error occurred");
      },
    });
  };

  return (
    <div className="h-screen w-full grid grid-cols-[auto_1fr]">
      <div className="bg-gray-900/40 w-48 flex flex-col justify-end py-5 items-center px-1">
        {/* Logout button */}
        <button
          onClick={loggedoutHandler}
          className="bg-gray-600 w-full py-2 rounded-md cursor-pointer text-red-600 shadow-2xl"
        >
          Logout
        </button>
      </div>

      <div className="bg-gray-900/60 px-3 py-5">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthWrapper;
