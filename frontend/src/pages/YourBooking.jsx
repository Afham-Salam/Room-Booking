import React, { useEffect, useState } from 'react';
import api from '../api';

export default function YourBooking() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get('bookings/current-user/all');
        setData(res.data);
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <h1 className="text-3xl font-bold mb-6">Your Bookings</h1>
      <div className="w-full max-w-7xl px-4">
        {data.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-lg text-gray-500">No bookings available.</p>
          </div>
        ) : (
          <div className="overflow-hidden shadow rounded-lg">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Room Name
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Start Time
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    End Time
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item._id} className="even:bg-gray-50 hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 border-b">
                      {item.roomId.roomName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center border-b">
                      {formatDate(item.startTime)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center border-b">
                      {formatDate(item.endTime)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center border-b">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                          item.status === 'Confirmed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
