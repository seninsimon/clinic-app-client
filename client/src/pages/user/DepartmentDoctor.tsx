// src/pages/DepartmentDoctorsPage.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDoctorsByDepartment } from "../../services/doctor/doctorServices";

interface Doctor {
  _id: string;
  name: string;
  profilePicture?: string;
  additionalInfo?: string;
  specialisation?: {
    _id: string;
    deptName: string;
  };
}

const DepartmentDoctorsPage: React.FC = () => {
  const { id } = useParams();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        if (id) {
          const data = await getDoctorsByDepartment(id);
          setDoctors(data);
        }
      } catch (error) {
        console.error("Failed to load doctors", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [id]);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">Doctors in This Department</h1>

        {loading && <p className="text-center">Loading...</p>}
        {!loading && doctors.length === 0 && (
          <p className="text-center text-gray-600">No doctors found in this department.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {doctors.map((doc) => (
            <div
              key={doc._id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-md transition flex flex-col items-center text-center"
            >
              <img
                src={doc.profilePicture || "/default-doctor.jpg"}
                alt={doc.name}
                className="w-32 h-32 rounded-md object-cover mb-4 border border-gray-200"
              />
              <h2 className="text-lg font-semibold text-blue-700">{doc.name}</h2>
              <p className="text-sm text-gray-500 mt-1">
                {doc.specialisation?.deptName || "Unknown Department"}
              </p>
              {doc.additionalInfo && (
                <p className="mt-2 text-sm text-gray-600">{doc.additionalInfo}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DepartmentDoctorsPage;
