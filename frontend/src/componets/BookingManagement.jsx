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
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <p className="text-center text-3xl font-semibold mb-8">Booking History</p>
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto border-separate border-spacing-0">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b border-gray-200">
                Room Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b border-gray-200">
                User ID
              </th>
              <th className="px-4 py-2 text-center text-sm font-medium text-gray-700 border-b border-gray-200">
                Start Time
              </th>
              <th className="px-4 py-2 text-center text-sm font-medium text-gray-700 border-b border-gray-200">
                End Time
              </th>
              <th className="px-4 py-2 text-center text-sm font-medium text-gray-700 border-b border-gray-200">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-50 border-t border-gray-200"
                >
                  <td className="px-4 py-3 text-sm text-gray-800 break-words">
                    {item.roomId?.roomName}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800 break-words">
                    {item.userId}
                  </td>
                  <td className="px-4 py-3 text-sm text-center text-gray-800">
                    {formatDate(item.startTime)}
                  </td>
                  <td className="px-4 py-3 text-sm text-center text-gray-800">
                    {formatDate(item.endTime)}
                  </td>
                  <td className="px-4 py-3 text-sm text-center text-gray-800 capitalize">
                    {item.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-4 text-sm text-gray-500"
                >
                  No bookings available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
