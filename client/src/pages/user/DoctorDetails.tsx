import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  getDoctorById,
  getSlotsForDoctorByDate,
  bookAppointment,
} from "../../services/doctor/doctorServices";
import { parse, format } from "date-fns";
import axiosInstance from "../../api/axiosInterceptor";
import { loadRazorpayScript } from "../../utils/loadRazorpay";
import toast from "react-hot-toast"; // ✅ Added toast

interface Slot {
  start: string;
  end: string;
  booked?: boolean;
}

interface Doctor {
  _id: string;
  name: string;
  email: string;
  phone: string;
  experience: number;
  fee: number;
  profilePicture?: string;
  additionalInfo?: string;
  specialisation?: {
    _id: string;
    deptName: string;
  };
}

const DoctorDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState<Date | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [reason, setReason] = useState<string>("");

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        if (id) {
          const data = await getDoctorById(id);
          setDoctor(data);
        }
      } catch (error) {
        console.error("Error fetching doctor:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [id]);

  useEffect(() => {
    const fetchSlots = async () => {
      if (id && date) {
        const isoDate = date.toISOString().split("T")[0];
        try {
          const data = await getSlotsForDoctorByDate(id, isoDate);
          setSlots(data);
        } catch (error) {
          console.error("Error fetching slots:", error);
        }
      } else {
        setSlots([]);
        setSelectedSlot(null);
      }
    };
    fetchSlots();
  }, [date, id]);

  const handleBooking = async () => {
    if (!id || !date || !selectedSlot || !doctor || !reason.trim()) {
      toast.error("Please select a slot and enter a reason.");
      return;
    }

    const res = await loadRazorpayScript();
    if (!res) {
      toast.error("Failed to load Razorpay SDK");
      return;
    }

    try {
      const orderResponse = await axiosInstance.post("/payment/create-order", {
        amount: doctor.fee,
      });

      const { id: order_id, amount, currency } = orderResponse.data;

      const options = {
        key: "rzp_test_xsHKluwMQg91bX",
        amount,
        currency,
        name: "Online Clinic",
        description: "Doctor Appointment Fee",
        order_id,
        handler: async (response: any) => {
          await bookAppointment({
            doctor: id,
            date: date.toISOString().split("T")[0],
            start: selectedSlot.start,
            end: selectedSlot.end,
            reason: reason.trim(),
             fee: doctor.fee,
          });

          toast.success("✅ Appointment booked!");
          setSelectedSlot(null);
          setReason("");
          const updated = await getSlotsForDoctorByDate(id, date.toISOString().split("T")[0]);
          setSlots(updated);
        },
        prefill: {
          name: "Patient Name",
          email: "patient@example.com",
          contact: "9876543210",
        },
        theme: { color: "#0d6efd" },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("❌ Payment failed");
    }
  };

  if (loading) return <p className="text-center p-8">Loading...</p>;
  if (!doctor) return <p className="text-center p-8 text-red-500">Doctor not found</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-xl p-6">
        {/* Doctor Profile */}
        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <img
            src={doctor.profilePicture || "/default-doctor.jpg"}
            alt={doctor.name}
            className="w-40 h-40 rounded-md object-cover border border-gray-200"
          />
          <div>
            <h2 className="text-2xl font-bold text-blue-700">{doctor.name}</h2>
            <p className="text-gray-600">{doctor.specialisation?.deptName}</p>
            <p className="text-gray-600">Phone: {doctor.phone}</p>
            <p className="text-gray-600">Experience: {doctor.experience} years</p>
            <p className="text-gray-600">Fee: ₹{doctor.fee}</p>
            {doctor.additionalInfo && (
              <p className="text-gray-500 mt-2">{doctor.additionalInfo}</p>
            )}
          </div>
        </div>

        <hr className="my-6" />

        {/* Booking Section */}
        <h3 className="text-xl font-semibold mb-4 text-blue-700">Book Appointment</h3>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Select Date</label>
          <DatePicker
            selected={date}
            onChange={(date: Date | null) => setDate(date)}
            className="border border-gray-300 rounded px-3 py-2 w-full"
            placeholderText="Choose a date"
            dateFormat="yyyy-MM-dd"
            minDate={new Date()}
          />
        </div>

        {/* Slot selection */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
          {slots.length === 0 ? (
            <p className="text-gray-500 col-span-full">No slots available for selected date.</p>
          ) : (
            slots.map((slot, idx) => {
              const isBooked = slot.booked;
              const isSelected =
                selectedSlot?.start === slot.start &&
                selectedSlot?.end === slot.end;

              const formattedStart = format(parse(slot.start, "HH:mm", new Date()), "hh:mm a");
              const formattedEnd = format(parse(slot.end, "HH:mm", new Date()), "hh:mm a");

              return (
                <button
                  key={idx}
                  onClick={() => !isBooked && setSelectedSlot(slot)}
                  className={`border px-4 py-2 rounded text-sm text-center transition ${
                    isBooked
                      ? "bg-red-100 text-red-600 cursor-not-allowed"
                      : isSelected
                      ? "bg-blue-600 text-white"
                      : "bg-green-100 text-green-700 hover:bg-green-200"
                  }`}
                  disabled={isBooked}
                >
                  {formattedStart} - {formattedEnd}
                </button>
              );
            })
          )}
        </div>

        {/* Reason for appointment */}
        <div className="mt-6">
          <label className="block text-sm text-gray-600 mb-1">Reason for Appointment</label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g. Fever, stomach pain, follow-up..."
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>

        <button
          onClick={handleBooking}
          disabled={!date || !selectedSlot || !reason.trim()}
          className={`mt-6 px-6 py-2 rounded transition ${
            date && selectedSlot && reason.trim()
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default DoctorDetailsPage;
