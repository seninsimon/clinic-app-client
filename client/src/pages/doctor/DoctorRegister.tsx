// pages/doctorRegister.tsx

import React from "react";
import { useForm } from "react-hook-form";
import type { IDoctor } from "../../types/DoctotType";
import { uploadToS3 } from "../../utils/s3Upload";
import axiosInstance from "../../api/axiosInterceptor";

const DoctorRegister = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<IDoctor & { confirmPassword: string }>();

  const profilePicture = watch("profilePicture");
  const medicalLicence = watch("medicalLicence");

  const onSubmit = async (data: any) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const profileUrl = await uploadToS3(data.profilePicture[0], "profile");
      const licenseUrl = await uploadToS3(data.medicalLicence[0], "license");

      const finalData = {
        ...data,
        profilePicture: profileUrl,
        medicalLicence: licenseUrl,
      };

      delete finalData.confirmPassword;

      await axiosInstance.post("/doctor/register", finalData);
      alert("Doctor Registered!");
    } catch (error) {
      console.error("Registration error", error);
      alert("Failed to register");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Doctor Registration</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Section */}
        <div className="space-y-4">
          <input
            {...register("name")}
            placeholder="Full Name"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            required
          />
          <input
            {...register("email")}
            type="email"
            placeholder="Email Address"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            required
          />
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            required
          />
          <input
            {...register("confirmPassword")}
            type="password"
            placeholder="Confirm Password"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            required
          />
          <input
            {...register("phone")}
            placeholder="Phone Number"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            required
          />
          <input
            {...register("specialisation")}
            placeholder="Specialisation"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            required
          />
          <input
            {...register("experience", { valueAsNumber: true })}
            type="number"
            placeholder="Experience (Years)"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />
          <input
            {...register("fee", { valueAsNumber: true })}
            type="number"
            placeholder="Consultation Fee"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />
        </div>

        {/* Right Section */}
        <div className="space-y-4">
          <label className="block text-gray-700">Profile Picture (image)</label>
          <input
            type="file"
            {...register("profilePicture")}
            accept="image/*"
            className="w-full"
            required
          />

          <label className="block text-gray-700">Medical Licence (PDF or Image)</label>
          <input
            type="file"
            {...register("medicalLicence")}
            accept="application/pdf,image/*"
            className="w-full"
            required
          />

          <label className="block text-gray-700">Additional Information</label>
          <textarea
            {...register("additionalInfo")}
            placeholder="Additional details..."
            className="w-full border border-gray-300 rounded-md px-4 py-2 h-32 resize-none"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md mt-4"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default DoctorRegister;
