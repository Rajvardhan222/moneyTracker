import React from 'react'

function Tag({name,isActive,...props}) {
  return (
    <div
    className={`border border-[#E8DFD0] bg-white text-center font-medium duration-200 py-2 cursor-pointer px-4 rounded-3xl shadow-sm ${isActive ? "text-[#7F3DFF] border-[#CBB7FF] bg-[#EEE5FF]" : "text-[#4A4A4A]"}`}  { ...props}
    >{name}</div>
  )
}

export default Tag