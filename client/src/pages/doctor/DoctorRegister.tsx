import { useForm } from "react-hook-form";
import type { IDoctor } from "../../types/DoctorType";
import { uploadToS3 } from "../../utils/s3Upload";
import {
  registerDoctor,
  type DoctorRegisterPayload,
} from "../../services/doctor/doctorServices";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInterceptor";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface DoctorForm
  extends Omit<IDoctor, "profilePicture" | "medicalLicence"> {
  confirmPassword: string;
  profilePicture: FileList;
  medicalLicence: FileList;
}

const DoctorRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DoctorForm>();

  const navigate = useNavigate()

   const  { isLoggedIn  } = useAuth()
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

  const [departments, setDepartments] = useState<
    { _id: string; deptName: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
  const fetchDepartments = async () => {
    try {
      const res = await axiosInstance.get("/doctor/departments");
      console.log("API response:", res.data);

      const deptArray = res.data.fetchDept?.dept;

      if (Array.isArray(deptArray)) {
        setDepartments(deptArray);
      } else {
        throw new Error("Invalid department data received.");
      }
    } catch (err) {
      console.error("Failed to fetch departments", err);
      setApiError("Failed to load departments. Please try again.");
    } finally {
      setLoading(false); // ✅ Always stop loading (success or error)
    }
  };

  fetchDepartments();
}, []);


  const onSubmit = async (data: DoctorForm) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const profileFile = data.profilePicture?.[0];
      const licenceFile = data.medicalLicence?.[0];

      if (!profileFile || !licenceFile) {
        alert("Please upload both profile and license files");
        return;
      }

      const profileUrl = await uploadToS3(profileFile, "profile");
      const licenseUrl = await uploadToS3(licenceFile, "license");

      const finalData: DoctorRegisterPayload = {
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        specialisation: data.specialisation,
        experience: data.experience,
        fee: data.fee,
        additionalInfo: data.additionalInfo,
        profilePicture: profileUrl,
        medicalLicence: licenseUrl,
      };

      await registerDoctor(finalData);
      alert("Doctor Registered Successfully!");
    } catch (error) {
      console.error("Registration error", error);
      alert("Failed to register doctor.");
    }
  };

return (
  <div className="max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10 border border-gray-200">
    <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">
      Doctor Registration
    </h2>

    {loading && (
      <p className="text-center text-gray-500 mb-4">Loading departments...</p>
    )}
    {apiError && <p className="text-center text-red-600 mb-4">{apiError}</p>}

    {!loading && (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <div className="space-y-5">
          <input
            {...register("name")}
            placeholder="Full Name"
            className="input-style"
            required
          />
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className="input-style"
            required
          />
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="input-style"
            required
          />
          <input
            {...register("confirmPassword")}
            type="password"
            placeholder="Confirm Password"
            className="input-style"
            required
          />
          <input
            {...register("phone")}
            placeholder="Phone Number"
            className="input-style"
            required
          />
          <select
            {...register("specialisation")}
            className="input-style"
            required
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept._id} value={dept._id}>
                {dept.deptName}
              </option>
            ))}
          </select>
          <input
            {...register("experience", { valueAsNumber: true })}
            type="number"
            placeholder="Experience (Years)"
            className="input-style"
          />
          <input
            {...register("fee", { valueAsNumber: true })}
            type="number"
            placeholder="Consultation Fee"
            className="input-style"
          />
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Picture
            </label>
            <input
              type="file"
              {...register("profilePicture")}
              accept="image/*"
              className="block w-full text-sm text-gray-500
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-md file:border-0
                         file:text-sm file:font-semibold
                         file:bg-blue-50 file:text-blue-700
                         hover:file:bg-blue-100"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Medical Licence (PDF or Image)
            </label>
            <input
              type="file"
              {...register("medicalLicence")}
              accept="application/pdf,image/*"
              className="block w-full text-sm text-gray-500
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-md file:border-0
                         file:text-sm file:font-semibold
                         file:bg-green-50 file:text-green-700
                         hover:file:bg-green-100"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Information
            </label>
            <textarea
              {...register("additionalInfo")}
              placeholder="Additional details..."
              className="input-style h-32 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300"
          >
            Register
          </button>
        </div>
      </form>
    )}
  </div>
);
};

export default DoctorRegister;
