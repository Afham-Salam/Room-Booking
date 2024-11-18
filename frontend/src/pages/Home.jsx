import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import slidderImg1 from "../assets/slidderImg1.jpg";
import slidderImg2 from "../assets/slidderImg2.jpg";
import slidderImg3 from "../assets/slidderImg3.jpg";
import slidderImg4 from "../assets/slidderImg4.jpg";
import { roomDetails } from "../utils/data";
import Card from "../componets/Card";
import RoomImage from "/room5.jpg";
import Review from "../componets/Review";
import { Link } from "react-router-dom";
import api from "../api"; 

export default function Home() {
const [len,setLen]=useState(0)
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await api.get("/rooms/all"); // Fetching data from API
        setLen(res.data.length);
        console.log(res.data); // Debugging API response
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRooms();
  }, []);
  return (
    <>
      
      {/*slidder*/}
      <section className="h-1/2 w-full ">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={false}
          effect="fade" // Apply fade effect
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          fadeEffect={{ crossFade: true }} // Enable crossFade for smoother effect
          speed={3000} // Set fade speed in milliseconds (e.g., 1000ms = 1s)
          className=""
        >
          <SwiperSlide>
            <img
              src={slidderImg1}
              className="w-full  h-[300px] md:h-[500px] object-cover"
              alt="Slider 1"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={slidderImg2}
              className="w-full h-[300px] md:h-[500px] object-cover"
              alt="Slider 2"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={slidderImg3}
              className="w-full h-[300px] md:h-[500px] object-cover"
              alt="Slider 3"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={slidderImg4}
              className="w-full h-[300px] md:h-[500px] object-cover"
              alt="Slider 4"
            />
          </SwiperSlide>
        </Swiper>
      </section>

      <section>
        <div class="flex justify-center relative mt-5 lg:mt-[-50px] md:mt-[-40px]">
          <div class="flex flex-col md:flex-row lg:flex-row items-center px-4 md:px-8 lg:px-14 shadow-2xl bg-white h-auto lg:h-[130px] w-full md:w-[90%] lg:w-[70%] rounded-lg p-4 z-50">
            <div class="flex flex-col sm:flex-row md:flex-row lg:flex-nowrap gap-4 lg:gap-8 w-full justify-between">
              {roomDetails.map((item) => (
                <div class="flex items-center gap-4 w-full md:w-auto">
                  <div class="flex flex-col gap-2">
                    <strong class="text-[20px]  ">{item.title}</strong>
                    <p class="text-[17px] text-black font-bold">{len}</p>
                  </div>
                </div>
              ))}

              <div class="flex items-center gap-4 w-full md:w-auto"></div>
            </div>
            <Link to="/room" className="bg-[#2A9E00] text-white py-2 px-10 rounded-sm hover:bg-[#238200] active:bg-[#1E6E00] focus:ring-2 focus:ring-offset-2 focus:ring-[#2A9E00] transition duration-200">
              Book&nbsp;Now
            </Link>
          </div>
        </div>
      </section>

      <section id="about" className="flex flex-col md:flex-row items-center justify-center  gap-10  p-6 md:p-10 lg:p-16 rounded-lg ">
        {/* Image Section */}
        <div className=" mb-6 lg:mb-0">
          <img
            src={RoomImage}
            alt="Luxury Hotel"
            className="rounded-lg :w-[350px] h-auto object-cover"
          />
        </div>

        {/* Text Section */}
        <div className="w-full lg:w-[500px] lg:pl-10">
          <p className="text-xs md:text-sm font-semibold text-[#2A9E00] uppercase">
            About BookaRoom
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1e1e1e] mt-2">
            Luxury Stay in The Heart of India.
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-[#6b6b6b] mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Adipiscing
            integer ultrices suspendisse vulputate etiam est. Est, felis, tempus
            nec vitae orci sodales metus, velit nec at diam in sed. Massa dui
            ipsum ornare sagittis dolor sagittis amet odio est. Sit semper at
            velit faucibus.
          </p>
          <button className="bg-[#2A9E00] text-white py-3 px-3 mt-3 rounded-sm hover:bg-[#238200] active:bg-[#1E6E00] transition duration-200">
            Discover More
          </button>
        </div>
      </section>

      <section className="w-full lg:h-screen flex-col   flex  items-center py-10">
        <p className="text-[35px] text-center py-10 font-semibold first-letter:text-[#2A9E00] first-letter:text-[50px]">
          Rooms
        </p>
        <Card />
      </section>
      
      <section className="w-full lg:h-screen flex-col   flex  items-center py-10">
        <p className="text-[35px] text-center py-10 font-semibold first-letter:text-[#2A9E00] first-letter:text-[50px]">
          Reviews
        </p>
       <Review/>
      </section>

      

    </>
  );
}
