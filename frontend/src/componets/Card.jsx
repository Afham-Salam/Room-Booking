import React from 'react'
import { room } from '../utils/data'

export default function Card() {
  return (
   <>


<div className="grid grid-cols-1 lg:grid-cols-2 gap-5 justify-center items-center">
   {
    room.map((item)=>(
      <div key={item.key} className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg lg:w-[550px] overflow-hidden">
 
      <div className="w-[300px]">
        <img
          src={item.image}
          alt="Room"
          className="w-full h-full object-cover"
        />
      </div>
    
      {/* Details Section */}
      <div className="p-4 flex flex-col justify-between w-[250px]">
        {/* Room Name */}
        <h3 className="text-xl font-semibold text-gray-800">{item.label}</h3>
        
        {/* Price */}
        <p className="text-lg text-gray-600 font-bold mt-2">{item.price}</p>
        
        {/* Capacity */}
        <p className="text-md text-gray-500 mt-1">Capacity: {item.capacity} People</p>
        
        {/* Room Details */}
        <p className="text-sm text-gray-500 mt-2">
         {item.details}
        </p>
    
        {/* Book Now Button */}
        <button className="bg-[#2A9E00] text-white py-2 mt-4 rounded-sm hover:bg-[#238200] active:bg-[#1E6E00] transition duration-200">
          Book Now
        </button>
      </div>
    </div>
    
    ))
   }
   
   </div>
   
   
   
   
   </>
  )
}
