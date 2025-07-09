import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { loginDoctor } from "../../services/doctor/doctorServices";
import {  useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface LoginForm {
  email: string;
  password: string;
}


 

const DoctorLogin = () => {


 const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

 const  { login , isLoggedIn  } = useAuth()
  useEffect(() => {
    if (isLoggedIn) {
      const storedRole = localStorage.getItem("role");
  
      if (storedRole === "admin" ) {
        navigate("/admin/dashboard");
      } else if (storedRole ==="doctor")  {
        navigate("/doctor/dashboard");
      }
    }
  }, [isLoggedIn, navigate]);

  

  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    setLoginError("");

    try {
     const res = await loginDoctor(data);
     console.log(res)
      const token = res.token; 
      const role = res.role; 
          const status = res.status;

          console.log(status)

    if (role === "doctor" && status !== "Approved") {
      setLoginError("Your account is not approved yet. Please wait for admin approval.");
      return;
    }


      localStorage.setItem("role", role);
      login(token, role);
      navigate("/doctor/dashboard");
    } catch (err: any) {
      console.error("Login failed", err);
      setLoginError(err?.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-xl shadow-md border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Doctor Login
      </h2>

      {loginError && (
        <p className="text-center text-red-600 mb-4">{loginError}</p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="input-style"
            placeholder="doctor@example.com"
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="input-style"
            placeholder="Your password"
          />
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default DoctorLogin;
