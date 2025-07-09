import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CenteredConfirmationModal from "../../components/common/ConfirmationModal";
import { fetchAllDoctors, verifyDoctorStatus } from "../../services/admin/doctorService";

interface Doctor {
  _id: string;
  name: string;
  email: string;
  phone: string;
  experience: number;
  fee: number;
  profilePicture?: string;
  medicalLicence?: string;
}

const DoctorVerification = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedAction, setSelectedAction] = useState<"Approved" | "Rejected" | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    getDoctors();
  }, []);

  const getDoctors = async () => {
    try {
      const doctors = await fetchAllDoctors();
      setDoctors(doctors);
    } catch (err) {
      toast.error("Error fetching doctors");
      console.error(err);
    }
  };

  const handleStatusClick = (doctor: Doctor, status: "Approved" | "Rejected") => {
    setSelectedDoctor(doctor);
    setSelectedAction(status);
    setModalOpen(true);
  };

  const confirmStatusChange = async () => {
    if (!selectedDoctor || !selectedAction) return;

    try {
      await verifyDoctorStatus(selectedDoctor._id, selectedAction);
      toast.success(`Doctor ${selectedAction.toLowerCase()} successfully`);
      setDoctors(prev => prev.filter(doc => doc._id !== selectedDoctor._id));
    } catch (err) {
      toast.error("Error updating doctor status");
      console.error(err);
    } finally {
      setSelectedDoctor(null);
      setSelectedAction(null);
      setModalOpen(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Pending Doctor Approvals</h2>
      {doctors.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        <div className="grid gap-6">
          {doctors.map((doctor) => (
            <div key={doctor._id} className="bg-white p-4 rounded shadow">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{doctor.name}</h3>
                  <p>Email: {doctor.email}</p>
                  <p>Phone: {doctor.phone}</p>
                  <p>Experience: {doctor.experience} years</p>
                  <p>Fee: ₹{doctor.fee}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <img
                    src={doctor.profilePicture}
                    alt="Profile"
                    className="w-28 h-28 object-cover rounded-md"
                  />
                  <a
                    href={doctor.medicalLicence}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View Medical Licence
                  </a>
                </div>
              </div>

              <div className="mt-4 space-x-4">
                <button
                  onClick={() => handleStatusClick(doctor, "Approved")}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleStatusClick(doctor, "Rejected")}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      <CenteredConfirmationModal
        isOpen={modalOpen}
        title={`Confirm ${selectedAction}`}
        message={`Are you sure you want to ${selectedAction?.toLowerCase()} ${selectedDoctor?.name}?`}
        onConfirm={confirmStatusChange}
        onCancel={() => setModalOpen(false)}
        confirmText={selectedAction === "Approved" ? "Approve" : "Reject"}
      />
    </div>
  );
};

export default DoctorVerification;
