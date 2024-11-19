import React, { useState } from "react";
import api from "../api";

export default function Form({ roomId, userId }) {
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [bookingData, setBookingData] = useState({
    roomId: roomId , 
    userId: userId || "67317f4bc56868b8019207e6", 
    bookingDate: "",
    startTime: "",
    endTime: "",
    status: "confirmed", // Static status
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setBookingData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

 
  const prepareBookingData = () => {
    const { bookingDate, startTime, endTime } = bookingData;

    const startDateTime = new Date(`${bookingDate}T${startTime}`);
    const endDateTime = new Date(`${bookingDate}T${endTime}`);

    return {
      ...bookingData,
      bookingDate: new Date(bookingDate).toISOString(),
      startTime: startDateTime.toISOString(),
      endTime: endDateTime.toISOString(),
    };
  };

  // Validate the form
  const validateBooking = () => {
    const { bookingDate, startTime, endTime } = bookingData;

    if (!bookingDate || !startTime || !endTime) {
      setMessage("Please fill in all fields.");
      return false;
    }

    const startDateTime = new Date(`${bookingDate}T${startTime}`);
    const endDateTime = new Date(`${bookingDate}T${endTime}`);

    if (startDateTime >= endDateTime) {
      setMessage("Start time must be before end time.");
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateBooking()) {
      setLoading(false);
      return;
    }

    const dataWithISOFormat = prepareBookingData();

    try {
      const res = await api.post("/bookings/create", dataWithISOFormat);
      console.log("Booking sent successfully:", res);
      setMessage("Booking successful!");
      setIsFormVisible(false);
    } catch (error) {
      console.error("Error submitting booking data:", error);
      setMessage(
        error.response?.data?.message || "Error submitting booking data."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50">
          <div className="relative w-full max-w-sm bg-white p-8 rounded-lg shadow-md border border-gray-200">
            <button
              onClick={() => setIsFormVisible(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-3xl"
            >
              &times;
            </button>

            <form onSubmit={handleSubmit}>
              <h2 className="text-2xl font-semibold mb-6 text-center">
                Book a Room
              </h2>

              {/* Display success or error message */}
              {message && (
                <p
                  className={`text-center ${
                    message.includes("successful")
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {message}
                </p>
              )}

              <div className="mb-4">
                <label
                  htmlFor="bookingDate"
                  className="block text-sm font-medium mb-2"
                >
                  Booking Date
                </label>
                <input
                  type="date"
                  name="bookingDate"
                  value={bookingData.bookingDate}
                  onChange={handleChange}
                  id="bookingDate"
                  className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="startTime"
                  className="block text-sm font-medium mb-2"
                >
                  Start Time
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={bookingData.startTime}
                  onChange={handleChange}
                  id="startTime"
                  className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="endTime"
                  className="block text-sm font-medium mb-2"
                >
                  End Time
                </label>
                <input
                  type="time"
                  name="endTime"
                  value={bookingData.endTime}
                  onChange={handleChange}
                  id="endTime"
                  className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#2A9E00] text-white py-2 px-4 hover:bg-[#238200] active:bg-[#1E6E00] focus:outline-none focus:ring-2 focus:ring-green-400"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Confirm"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
