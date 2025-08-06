import { useState, type ChangeEvent } from "react";
import "../styles/register.style.css";
import useLoginUser from "../api/useLoginUser";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "umair@gmail.com",
    password: "12345",
  });

  const { mutate, isPending } = useLoginUser();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form Submitted:", formData);
    // Add API call here if needed

    mutate(formData, {
      onSuccess: (data) => {
        const token = data.data.user.token;
        localStorage.setItem("token", token);

        toast.success("User Loggedin!");
        navigate("/");
      },
      onError: (error: unknown) => {
        console.log({ error });

        if (axios.isAxiosError(error)) {
          const errMessage = error.response?.data;

          toast.error(errMessage ? errMessage.message : error.message);
        }
      },
    });
  };

  return (
    <div className="register-container">
      <form
        className="register-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <h2>Register</h2>

        <label>Email</label>
        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          required
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />

        <button
          type="submit"
          disabled={isPending}
          className="disabled:cursor-not-allowed"
        >
          {isPending ? "loging..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Login;
