// pages/UserSignup.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import backgroundimage from "../../assets/artigo_2.jpg"
import { signup } from '../../services/resgistrationService';

// Define form input types
interface SignupFormInputs {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  gender: 'male' | 'female';
}

const UserSignup: React.FC = () => {
  

    const navigate = useNavigate()


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormInputs>({
    defaultValues: {
      gender: 'male',
    },
  });

  // Watch password for confirm password validation
  const password = watch('password');

  // Form submission handler
  const onSubmit: SubmitHandler<SignupFormInputs> = async (data) => {
    
    const result = await signup(data)
    console.log(result)
    navigate("/login")
    

  };

  return (
    <div className="min-h-screen bg-cover bg-no-repeat bg-center" 
    style={{backgroundImage :`url(${backgroundimage})`}}
    >
      <main className="flex-grow">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Doctor Registration Prompt */}
          <div className="flex justify-end mb-6">
            <div className="text-right">
              <p className="text-base font-medium text-gray-700 mb-2">
                Are you a doctor?
              </p>
              <Link
                to="/doctor-registration"
                className="inline-block bg-blue-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Doctor Registration
              </Link>
            </div>
          </div>

          {/* Signup Form */}
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
              Sign Up for Amazing Care
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  {...register('name', {
                    required: 'Name is required',
                    minLength: { value: 2, message: 'Name must be at least 2 characters' },
                  })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

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

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  {...register('phone', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^\+?[1-9]\d{1,14}$/,
                      message: 'Invalid phone number (e.g., +1234567890)',
                    },
                  })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
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
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        'Password must include uppercase, lowercase, number, and special character',
                    },
                  })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value) => value === password || 'Passwords do not match',
                  })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <div className="mt-2 flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="male"
                      {...register('gender', { required: 'Gender is required' })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Male</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="female"
                      {...register('gender', { required: 'Gender is required' })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Female</span>
                  </label>
                </div>
                {errors.gender && (
                  <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
                )}
              </div>

              {/* Login Link */}
              <div>
                <Link
                  to="/login"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Already have an account? Log in
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Sign Up
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default UserSignup;