// pages/Login.tsx
import React from 'react';
import { useForm  } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import background from "../../assets//background.webp"
import { login } from '../../services/loginService';


// Define form input types
interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();


  const navigate = useNavigate()
  // Form submission handler
  const onSubmit: SubmitHandler<LoginFormInputs> = async  (data) => {
     
    try {
        const response = await login(data)
        console.log(response.data)
        navigate("/")

    } catch (error : any) {

        if(error.response.data.otpverify === false)
        {
            console.log(error.response.data.email)
           localStorage.setItem("email",error.response.data.email)
           navigate('/verify-otp')
        }
       
    }
    
  };

  return (
    <div className="bg-gray-50 min-h-screen  flex flex-col"
    style={{backgroundImage : `url(${background})`}}
    >
      <main className="flex-grow">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
              Log In to Amazing Care
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: 'Invalid email address',
                    },
                  })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 8, message: 'Password must be at least 8 characters' },
                  })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              {/* Signup Link and Submit Button */}
              <div className="flex justify-between items-center">
                <Link
                  to="/signup"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Don't have an account? Sign up
                </Link>
                <button
                  type="submit"
                  className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Log In
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Login;