import React from "react";
import { forwardRef } from "react";
let Input=({ placeholder, type, className = "" ,...props}, ref)=> {
  return (
    <input
      type={type}
      placeholder={placeholder}
      ref={ref}
      minLength={3}
      className={`outline-none px-9 py-4 border-2 font-medium text-xl w-[80%] border-[#F1F1FA] rounded-2xl ${className}` } {...props}
    />
  );
}

export default forwardRef(Input);
