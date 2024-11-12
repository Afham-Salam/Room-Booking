import React from "react";
import { reviews } from "../utils/data";

export default function Review() {
  return (
    <div className="bg-gray-50 py-10 px-4 sm:px-6 lg:px-24">
      <h2 className="text-2xl font-bold text-center mb-8">What Our Customers Say</h2>
      <div className=" flex flex-col gap-10 md:flex-row ">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="w-fit sm:w-fit bg-white shadow-lg rounded-lg p-6 transform transition-transform hover:scale-105"
          >
            <img
              src={review.image}
              alt={`${review.name}'s review`}
              className="w-20 h-20 rounded-full mx-auto mb-4"
            />
            <p className="text-gray-800 mb-4 text-center">"{review.review}"</p>
            <div className="mt-4 border-t pt-4 text-center">
              <h3 className="text-lg font-semibold text-[#2A9E00]">{review.name}</h3>
              <p className="text-gray-500 text-sm">{review.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
