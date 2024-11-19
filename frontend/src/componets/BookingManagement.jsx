import React, { useEffect, useState } from 'react';
import api from '../api';

export default function BookingManagement() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get('/bookings/all');
        setData(res.data); 
        console.log(data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetch();
  }, []);

  return (
    <div className="h-screen bg-gray-50">
      <p className="text-center text-3xl font-semibold m-7">Booking History</p>
      <div className="p-4">
        <div className="overflow-x-auto flex justify-center">
          <table className="w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] table-auto border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm border border-gray-300">Room ID</th>
                <th className="px-4 py-2 text-left text-sm border border-gray-300">User ID</th>
                <th className="px-4 py-2 text-left text-sm border border-gray-300">Start Date</th>
                <th className="px-4 py-2 text-left text-sm border border-gray-300">End Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border border-gray-300 text-sm">{item.roomId}</td>
                  <td className="px-4 py-2 border border-gray-300 text-sm">{item.userId}</td>
                  <td className="px-4 py-2 border border-gray-300 text-sm">{item.startDate}</td>
                  <td className="px-4 py-2 border border-gray-300 text-sm">{item.endDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
