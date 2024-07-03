import React from "react";

function LoadingLogo() {
  return (
    <div className="min-h-full min-w-full bg-[#7F3DFF] fixed flex justify-center items-center">
      <div className=" relative">
        <h1 className="text-white font-bold text-5xl">Cashier</h1>
        <div className="min-h-12 min-w-12 rounded-full -bottom-2 blur-lg left-5 -z-10 absolute bg-[#FCAC12] "></div>
      </div>
    </div>
  );
}

export default LoadingLogo;
