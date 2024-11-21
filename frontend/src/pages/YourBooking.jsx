import React, { useEffect, useState } from 'react';
import api from '../api';

export default function YourBooking() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get('bookings/current-user/all');
        setData(res.data); 
        console.log("history :",data);
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
    <>
      <div className="h-screen bg-gray-50">
        <p className="text-center text-3xl font-semibold m-7">Your Booking</p>
        <div className="p-4">
          <div className="overflow-x-auto flex justify-center">
            {data.length === 0 ? (
              <p className="text-center mt-32 text-lg font-medium text-gray-500">
                No bookings available.
              </p>
            ) : (
              <table className="w-[95%] ml-[136px] md:ml-0 sm:w-[90%] md:w-[80%] lg:w-[70%] table-auto border-collapse border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm border border-gray-300">
                      Room Name
                    </th>
                    
                    <th className="px-4 py-2 text-center text-sm border border-gray-300">
                      Start Time
                    </th>
                    <th className="px-4 py-2 text-center text-sm border border-gray-300">
                      End Time
                    </th>
                    <th className="px-4 py-2 text-center text-sm border border-gray-300">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-100">
                      <td className="px-4 py-2 border border-gray-300 text-sm">
                        {item.roomId.roomName}
                      </td>
                      
                      <td className="px-4 py-2 border border-gray-300 text-center text-sm">
                        {formatDate(item.startTime)}
                      </td>
                      <td className="px-4 py-2 border border-gray-300 text-center text-sm">
                        {formatDate(item.endTime)}
                      </td>
                      <td className="px-4 py-2 border border-gray-300 text-center text-sm">
                        {item.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
