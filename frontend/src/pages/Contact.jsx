import React from "react";

export default function Contact() {
  const handlealert=()=>{
    alert("Message sended successfully")


  }
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="container mx-auto bg-white shadow-md rounded-md overflow-hidden md:flex">
        {/* Left Section: Contact Form */}
        <div className="md:w-1/2 p-6">
          <h2 className="text-2xl font-bold text-[#2A9E00] mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-6">
            Fill out the form below and we’ll get back to you as soon as possible.
          </p>
          <form>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2A9E00]"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Your Email"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2A9E00]"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                placeholder="Your Message"
                className="w-full border border-gray-300 rounded-md px-3 py-2 "
                required
              ></textarea>
            </div>
            <button
              type="submit"
              onClick={handlealert}
              className=" bg-[#2A9E00] text-white py-2 px-4 hover:bg-[#238200] "
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Right Section: Address */}
        <div className="md:w-1/2 text-black bg-gray-100 p-6 flex flex-col gap-10 justify-center items-center rounded-md shadow-lg">
  {/* Title */}
  <p className="text-[24px] md:text-[32px] font-bold tracking-wider text-center">
    <span className="text-[#2A9E00]">Book</span>
    <span> a </span>
    <span className="text-[#2A9E00]">Room</span>
  </p>

  {/* Divider */}
  <div className="w-16 h-1 bg-[#2A9E00] rounded-full"></div>
  {/* Address Details */}
  <div className="space-y-4 text-lg text-center">
    <h2 className="text-2xl font-bold text-gray-800">Our Address</h2>
    <p className="text-gray-600">
      <strong className="font-semibold">Office:</strong> Room Booking 
    </p>
    <p className="text-gray-600">
      <strong className="font-semibold">Email:</strong> bookaroom@gmail.com
    </p>
    <p className="text-gray-600">
      <strong className="font-semibold">Phone:</strong> +1 234 567 890
    </p>
    <p className="text-gray-600">
      <strong className="font-semibold">Working Hours:</strong> Open 24/7
    </p>
  </div>

  {/* Call-to-Action */}
  <button 
  onClick={handlealert}
  className="mt-6 bg-[#2A9E00] text-white py-2 px-6  hover:bg-[#238200] ">
    Contact Us Now
  </button>
</div>

      </div>
    </div>
  );
}
