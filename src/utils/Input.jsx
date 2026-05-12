import React from "react";
import { forwardRef } from "react";
let Input=({ placeholder, type, className = "" ,...props}, ref)=> {
  return (
    <input
      type={type}
      placeholder={placeholder}
      ref={ref}
      minLength={3}
      className={`outline-none px-5 py-3 border font-medium text-base w-full bg-white border-[#E8DFD0] rounded-2xl shadow-sm ${className}`}
      {...props}
    />
  );
}

export default forwardRef(Input);
