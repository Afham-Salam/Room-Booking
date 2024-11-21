import React, { useEffect, useState } from "react";
import RoomImage from "/room1.jpg";
import Form from "../componets/Form";
import api from "../api";
import { useUser } from "../context/UserContext";
export default function RoomList() {
  const [open, setOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [data, setData] = useState([]);
  const { user } = useUser();




  
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await api.get("/rooms/all");
        setData(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRooms();
  }, []);

  const handleBookNow = (room) => {
    setSelectedRoom(room);
    setOpen(true);
  };

  return (
    <div className="sm:h-screen md:h-fit p-5">
      {data.map((item) => (
        <div
          key={item._id}
          className="w-full mb-5 border-2 border-gray-200 shadow-md flex flex-col md:flex-row md:justify-between md:items-center gap-5 p-5"
        >
          {/* Room Image */}
          <img
            className="w-full md:w-60 object-cover"
            src={RoomImage}
            alt="Room"
          />

          {/* Room Details */}
          <div className="grid grid-rows-3 gap-4 lg:gap-x-96 md:grid-cols-2 md:gap-x-12">
            <p className="text-left font-semibold">Name: {item.roomName}</p>
            <p className="text-left flex items-center gap-2 font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 512 512"
              >
                <path
                  fill="black"
                  d="M336 256c-20.56 0-40.44-9.18-56-25.84c-15.13-16.25-24.37-37.92-26-61c-1.74-24.62 5.77-47.26 21.14-63.76S312 80 336 80c23.83 0 45.38 9.06 60.7 25.52c15.47 16.62 23 39.22 21.26 63.63c-1.67 23.11-10.9 44.77-26 61C376.44 246.82 356.57 256 336 256m131.83 176H204.18a27.71 27.71 0 0 1-22-10.67a30.22 30.22 0 0 1-5.26-25.79c8.42-33.81 29.28-61.85 60.32-81.08C264.79 297.4 299.86 288 336 288c36.85 0 71 9 98.71 26.05c31.11 19.13 52 47.33 60.38 81.55a30.27 30.27 0 0 1-5.32 25.78A27.68 27.68 0 0 1 467.83 432M147 260c-35.19 0-66.13-32.72-69-72.93c-1.42-20.6 5-39.65 18-53.62c12.86-13.83 31-21.45 51-21.45s38 7.66 50.93 21.57c13.1 14.08 19.5 33.09 18 53.52c-2.87 40.2-33.8 72.91-68.93 72.91m65.66 31.45c-17.59-8.6-40.42-12.9-65.65-12.9c-29.46 0-58.07 7.68-80.57 21.62c-25.51 15.83-42.67 38.88-49.6 66.71a27.39 27.39 0 0 0 4.79 23.36A25.32 25.32 0 0 0 41.72 400h111a8 8 0 0 0 7.87-6.57c.11-.63.25-1.26.41-1.88c8.48-34.06 28.35-62.84 57.71-83.82a8 8 0 0 0-.63-13.39c-1.57-.92-3.37-1.89-5.42-2.89"
                />
              </svg>
              Capacity: {item.capacity}
            </p>
            <p className="text-left font-semibold">
              Features: {item.features.join(", ")}
            </p>
            <p className="text-left font-semibold">
              Price per Day: ₹ {item.pricePerHour}
            </p>
            <p className="text-left font-semibold">
              Availability: {item.availability ? "Available" : "Not Available"}
            </p>
          </div>

          <button
            onClick={() => handleBookNow()}
            className="bg-[#2A9E00] text-white py-2 px-10 rounded-sm hover:bg-[#238200]"
          >
            Book&nbsp;Now
          </button>
        </div>
      ))}

      {/* Form Component */}
      {open && <Form userId={user}  />}
    </div>
  );
}
