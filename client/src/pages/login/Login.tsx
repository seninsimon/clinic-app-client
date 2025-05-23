import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import background from "../../assets/background.webp";
import { loginservice } from "../../services/loginService";
import { useAuth } from "../../hooks/useAuth";
import { GoogleLogin } from "@react-oauth/google";
import axiosInstance from "../../api/axiosInterceptor";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const { login , isLoggedIn } = useAuth();
  const navigate = useNavigate();


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

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const response = await loginservice(data);
      const accessToken = response.data.loginUser.token;
      console.log(response.data.loginUser.data.role)
      const theRole = response.data.loginUser.data.role
      localStorage.setItem("role",theRole)
      login(accessToken , theRole );
      navigate("/");
    } catch (error: any) {
      if (error.response?.data?.otpverify === false) {
        localStorage.setItem("email", error.response.data.email);
        navigate("/verify-otp");
      }
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    const tokenId = credentialResponse.credential;
    try {
      const res = await axiosInstance.post("/google-login", { tokenId });
      console.log(res.data.googleData.data.role)
      const theRole : string = res.data.googleData.data.role
      localStorage.setItem("role",theRole)
      const accessToken = res.data.token;
      login(accessToken ,theRole); 
      navigate("/");
    } catch (error) {
      console.error("Google login error", error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col" style={{ backgroundImage: `url(${background})` }}>
      <main className="flex-grow">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
              Log In to Amazing Care
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    },
                  })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 8, message: "Password must be at least 8 characters" },
                  })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
              </div>

              <div className="flex justify-between items-center">
                <Link to="/signup" className="text-sm text-blue-600 hover:underline">
                  Don't have an account? Sign up
                </Link>
                <button type="submit" className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-md">
                  Log In
                </button>
              </div>
            </form>

            <div className="my-4 text-center text-sm text-gray-500">or</div>

            {/* Google Login */}
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => console.log("Google Login Failed")}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
