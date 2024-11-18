import React, { useState } from "react";

export default function Form() {
  const [isFormVisible, setIsFormVisible] = useState(true);

  return (
    <>
      {isFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50">
          {/* Modal Content */}
          <div className="relative w-full max-w-sm bg-white p-8 rounded-lg shadow-md border border-gray-200">
            <button
              onClick={() => setIsFormVisible(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-3xl"
            >
              &times;
            </button>

            <form>
              <h2 className="text-2xl font-semibold mb-6 text-center">
                Book a Room
              </h2>

              <div className="mb-4">
                <label
                  htmlFor="bookingDate"
                  className="block text-sm font-medium mb-2"
                >
                  Booking Date
                </label>
                <input
                  type="date"
                  id="bookingDate"
                  className="w-full border border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
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
                  id="startTime"
                  className="w-full border border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
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
                  id="endTime"
                  className="w-full border border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#2A9E00] text-white py-2 px-4  hover:bg-[#238200] active:bg-[#1E6E00] focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                Confirm
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
