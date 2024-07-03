import React from 'react'

function Tag({name,isActive,...props}) {
  return (
    <div
    className={`border border-[#E3E5E5] text-center font-medium duration-200 py-3 cursor-pointer p-2 rounded-3xl w-28 ${isActive ? "text-[#7F3DFF] border-none bg-[#EEE5FF]" : ""}`}  { ...props}
    >{name}</div>
  )
}

export default Tag