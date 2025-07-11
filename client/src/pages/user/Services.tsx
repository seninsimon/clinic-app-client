// src/pages/ServicesPage.tsx
import React, { useEffect, useState } from "react";
import { fetchAlldepartments } from "../../services/departmentService";
import { useNavigate } from "react-router-dom";

interface Department {
  _id: string;
  deptName: string;
  description: string;
}

const ServicesPage: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDepartments = async () => {
      try {
        const data = await fetchAlldepartments();
        setDepartments(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load departments.");
      } finally {
        setLoading(false);
      }
    };

    loadDepartments();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Our Services</h1>

        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && departments.length === 0 && (
          <p className="text-center text-gray-500">No departments available.</p>
        )}

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {departments.map((dept) => (
            <div
              key={dept._id}
              onClick={() => navigate(`/department/${dept._id}`)}
              className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition cursor-pointer"
            >
              <h2 className="text-xl font-semibold text-blue-600">{dept.deptName}</h2>
              <p className="text-gray-600 mt-2">{dept.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
