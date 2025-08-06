import { useState, type ChangeEvent } from "react";
import "../styles/register.style.css";
import useRegisterUser from "../api/useRegisterUser";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "Umair",
    email: "umair@gmail.com",
    password: "12345",
  });

  const { mutate, isPending } = useRegisterUser();

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
      onSuccess: () => {
        toast.success("User Created!");
        navigate("/login");
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

        <label>Name</label>
        <input
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
        />

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
          {isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Register;
