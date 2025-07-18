import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getSlotsByDay,
  setSlotsForDay,
  deleteSlotsByDay,
} from "../../services/doctor/slotService";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Schedules: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string>("Monday");
  const [slots, setSlots] = useState<{ start: string; end: string }[]>([]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        setLoading(true);
        const slotsData = await getSlotsByDay(selectedDay);
        setSlots(slotsData || []);
      } catch (err) {
        console.error("Failed to load slots", err);
        toast.error("Error fetching slots.");
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, [selectedDay]);

  const addSlot = () => {
    if (start && end) {
      setSlots([...slots, { start, end }]);
      setStart("");
      setEnd("");
    } else {
      toast.error("Please provide both start and end times.");
    }
  };

  const removeSlot = (index: number) => {
    const updated = [...slots];
    updated.splice(index, 1);
    setSlots(updated);
  };

  const saveSlots = async () => {
    try {
      await setSlotsForDay(selectedDay, slots);
      toast.success("Schedule updated successfully!");
    } catch (error) {
      console.error("Failed to update slots:", error);
      toast.error("Failed to update schedule.");
    }
  };

  const deleteAllSlots = async () => {
    try {
      await deleteSlotsByDay(selectedDay);
      setSlots([]);
      toast.success("All slots deleted for " + selectedDay);
    } catch (error) {
      console.error("Error deleting slots:", error);
      toast.error("Failed to delete slots.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow p-6 rounded-lg">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">
          Set Your Weekly Schedule
        </h1>

        {/* Day Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-600">
            Select Day
          </label>
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="border p-2 rounded w-full"
          >
            {daysOfWeek.map((day) => (
              <option key={day}>{day}</option>
            ))}
          </select>
        </div>

        {/* Add New Slot */}
        <div className="flex gap-4 mb-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-600">
              Start Time
            </label>
            <input
              type="time"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-600">
              End Time
            </label>
            <input
              type="time"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>
          <button
            onClick={addSlot}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            + Add Slot
          </button>
        </div>

        {/* Slot List */}
        <div className="mb-4">
          <h3 className="text-md font-semibold text-gray-700 mb-2">
            Slots for {selectedDay}:
          </h3>
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : slots.length === 0 ? (
            <p className="text-sm text-gray-500">No slots added.</p>
          ) : (
            <ul className="space-y-2">
              {slots.map((slot, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-gray-100 p-2 rounded"
                >
                  <span>
                    {slot.start} - {slot.end}
                  </span>
                  <button
                    onClick={() => removeSlot(index)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={saveSlots}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Save Slots
          </button>
          <button
            onClick={deleteAllSlots}
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
          >
            Delete All Slots
          </button>
        </div>
      </div>
    </div>
  );
};

export default Schedules;
