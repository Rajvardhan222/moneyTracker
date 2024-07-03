import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
function LoginSignup() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="w-[90%] m-auto mt-10  flex flex-col gap-y-16 mb-8">
      <Slider {...settings}>
        <div>
          <div className="flex flex-col justify-center items-center gap-y-6 mb-3">
            <img src="./onBoarding/1.svg" />
            <div className="flex justify-center items-center flex-col gap-y-4">
                <h1 className="text-3xl font-bold text-center">
                Gain total control 
                of your money
                </h1>
                <p className="text-center text- font-normal text-[#91919F]">
                Become your own money manager and make every cent count
                </p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col justify-center items-center gap-y-6 mb-3">
            <img src="./onBoarding/2.svg" />
            <div className="flex justify-center items-center flex-col gap-y-4">
                <h1 className="text-3xl font-bold text-center">
                Gain total control 
                of your money
                </h1>
                <p className="text-center text- font-normal text-[#91919F]">
                Become your own money manager and make every cent count
                </p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col justify-center items-center gap-y-6 mb-3">
            <img src="./onBoarding/3.svg" />
            <div className="flex justify-center items-center flex-col gap-y-4">
                <h1 className="text-3xl font-bold text-center">
                Gain total control 
                of your money
                </h1>
                <p className="text-center text- font-normal text-[#91919F]">
                Become your own money manager and make every cent count
                </p>
            </div>
          </div>
        </div>
       
      
      </Slider>
      <div className="flex flex-col gap-y-8 items-center">
        <button className="bg-[#7F3DFF] w-72 rounded-2xl text-white font-bold px-5 py-3">SignUp</button>
        <button className="bg-[#EEE5FF] font-bold text-[#7F3DFF] w-72 rounded-2xl px-5 py-3">Login</button>
      </div>
    </div>
  );
}

export default LoginSignup;
