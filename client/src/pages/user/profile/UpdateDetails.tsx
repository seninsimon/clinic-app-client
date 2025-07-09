// src/pages/user/profile/UpdateDetails.tsx
import React, { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosInterceptor";
import { uploadToS3 } from "../../../utils/s3Upload";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import CenteredConfirmationModal from "../../../components/common/ConfirmationModal";
import {
  validateName,
  validatePhone,
  validatePassword,
  validateConfirmPassword,
} from "../../../utils/validators";

import type { IUser } from "../../../types/UserType";
import { useNavigate } from "react-router-dom";

const fetchUser = async (): Promise<IUser> => {
  const res = await axiosInstance.get("/me");
  return res.data;
};

const UpdateDetails = () => {



    const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("please login to see profile")
      navigate("/login");
    }
  }, [navigate]);


  const queryClient = useQueryClient();
  const { data: user, isLoading } = useQuery<IUser>({
    queryKey: ["me"],
    queryFn: fetchUser,
  });

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<Partial<IUser>>({});
  const [changePass, setChangePass] = useState(false);
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [uploading, setUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        phone: user.phone,
        gender: user.gender,
        profilePicture: user.profilePicture,
      });
    }
  }, [user]);

  const updateUserMutation = useMutation({
    mutationFn: async (updates: Partial<IUser>) => {
      await axiosInstance.put("/user/update", updates);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["me"] });
      setEditMode(false);
      toast.success("User details updated!");
    },
    onError: () => {
      toast.error("Update failed");
    },
  });

  const validateForm = () => {
    const nameError = validateName(form.name || "");
    const phoneError = validatePhone(form.phone || "");
    const newErrors: { [key: string]: string } = {};

    if (nameError) newErrors.name = nameError;
    if (phoneError) newErrors.phone = phoneError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = () => {
    if (!validateForm()) {
      toast.error("Please fix form errors");
      return;
    }
    setIsModalOpen(true);
  };

  const confirmUpdate = () => {
    updateUserMutation.mutate(form);
    setIsModalOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleChangePassword = async () => {
    const { oldPassword, newPassword, confirmPassword } = passwords;
    const newErrors: { [key: string]: string } = {};

    const passwordError = validatePassword(newPassword);
    const confirmError = validateConfirmPassword(newPassword, confirmPassword);

    if (passwordError) newErrors.newPassword = passwordError;
    if (confirmError) newErrors.confirmPassword = confirmError;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix password errors");
      return;
    }

    try {
      await axiosInstance.put("/user/change-password", { oldPassword, newPassword });
      toast.success("Password changed successfully");
      setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
      setChangePass(false);
    } catch (err) {
      toast.error("Password change failed");
    }
  };

  const handleProfilePicClick = async () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";

    fileInput.onchange = async () => {
      const file = fileInput.files?.[0];
      if (file) {
        try {
          setUploading(true);
          const s3Url = await uploadToS3(file, "profilePictures");
          setForm((prev) => ({ ...prev, profilePicture: s3Url }));
          await updateUserMutation.mutateAsync({ profilePicture: s3Url });
          toast.success("Profile picture updated!");
        } catch (error) {
          toast.error("Failed to upload profile picture");
        } finally {
          setUploading(false);
        }
      }
    };
    fileInput.click();
  };

  if (isLoading || !user) return <div>Loading...</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded space-y-4">
      <h2 className="text-2xl font-semibold mb-4">My Profile</h2>

      {/* Profile Picture */}
      <div className="flex justify-center mb-4">
        <img
          src={form.profilePicture || user.profilePicture}
          alt="Profile"
          onClick={handleProfilePicClick}
          className="w-32 h-32 rounded-full object-cover border cursor-pointer"
          title="Click to change profile picture"
        />
      </div>

      {!editMode ? (
        <>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone || "N/A"}</p>
          <p><strong>Gender:</strong> {user.gender}</p>

          <button
            onClick={() => setEditMode(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
          >
            Edit Details
          </button>
        </>
      ) : (
        <>
          <label>Name:
            <input
              name="name"
              value={form.name || ""}
              onChange={handleChange}
              className="w-full border px-2 py-1 mb-1"
            />
            {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
          </label>

          <label>Phone:
            <input
              name="phone"
              value={form.phone || ""}
              onChange={handleChange}
              className="w-full border px-2 py-1 mb-1"
            />
            {errors.phone && <p className="text-red-600 text-sm">{errors.phone}</p>}
          </label>

          <label>Gender:
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full border px-2 py-1 mb-2"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>

          <div className="space-x-2">
            <button
              onClick={handleUpdate}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </>
      )}

      {/* Change Password */}
      <div className="mt-6">
        {!changePass ? (
          <button
            onClick={() => setChangePass(true)}
            className="text-blue-700 underline"
          >
            Change Password
          </button>
        ) : (
          <>
            <label>Old Password:
              <input
                type="password"
                name="oldPassword"
                value={passwords.oldPassword}
                onChange={handlePasswordChange}
                className="w-full border px-2 py-1 mb-1"
              />
            </label>

            <label>New Password:
              <input
                type="password"
                name="newPassword"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
                className="w-full border px-2 py-1 mb-1"
              />
              {errors.newPassword && <p className="text-red-600 text-sm">{errors.newPassword}</p>}
            </label>

            <label>Confirm Password:
              <input
                type="password"
                name="confirmPassword"
                value={passwords.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full border px-2 py-1 mb-1"
              />
              {errors.confirmPassword && <p className="text-red-600 text-sm">{errors.confirmPassword}</p>}
            </label>

            <div className="space-x-2">
              <button
                onClick={handleChangePassword}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Save Password
              </button>
              <button
                onClick={() => setChangePass(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>

      <CenteredConfirmationModal
        isOpen={isModalOpen}
        title="Confirm Update"
        message="Are you sure you want to save the changes?"
        onConfirm={confirmUpdate}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default UpdateDetails;
