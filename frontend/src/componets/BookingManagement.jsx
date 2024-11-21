import React, { useEffect, useState } from 'react';
import api from '../api';

export default function BookingManagement() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get('bookings/all');
        setData(res.data);
        console.log(res.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetch();
  }, []);

  const formatDate = (dateTime) =>
    new Date(dateTime).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

  return (
    <div className="h-screen bg-gray-50">
      <p className="text-center text-3xl font-semibold m-7">Booking History</p>
      <div className="p-4">
        {/* Table Wrapper for Horizontal Scrolling */}
        <div className="overflow-x-auto flex justify-center">
          <table className="w-full ml-[136px] md:ml-0 sm:w-[95%] md:w-[85%] lg:w-[70%] table-auto border-collapse border border-gray-200 shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-2 text-left text-xs sm:text-sm md:text-base border border-gray-300">
                  Room Name
                </th>
                <th className="px-3 py-2 text-left text-xs sm:text-sm md:text-base border border-gray-300">
                  User ID
                </th>
                <th className="px-3 py-2 text-center text-xs sm:text-sm md:text-base border border-gray-300">
                  Start Time
                </th>
                <th className="px-3 py-2 text-center text-xs sm:text-sm md:text-base border border-gray-300">
                  End Time
                </th>
                <th className="px-3 py-2 text-center text-xs sm:text-sm md:text-base border border-gray-300">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-100">
                    <td className="px-3 py-2 border border-gray-300 text-xs sm:text-sm md:text-base break-words">
                    {item.roomId?.roomName}
                    </td>
                    <td className="px-3 py-2 border border-gray-300 text-xs sm:text-sm md:text-base break-words">
                      {item.userId}
                    </td>
                    <td className="px-3 py-2 border border-gray-300 text-center text-xs sm:text-sm md:text-base">
                      {formatDate(item.startTime)}
                    </td>
                    <td className="px-3 py-2 border border-gray-300 text-center text-xs sm:text-sm md:text-base">
                      {formatDate(item.endTime)}
                    </td>
                    <td className="px-3 py-2 border border-gray-300 text-center text-xs sm:text-sm md:text-base capitalize">
                      {item.status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No bookings available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
