import React from 'react'

function ThemeButton({isPending,className,children,type,...props}) {
  return (
    <>
    <button type={type} {...props} disabled={isPending} className={` w-[100%] m-auto py-3 bg-[#7F3DFF]  text-white font-semibold text-lg rounded-2xl hover:bg-[#3e0da1] duration-150 ${isPending ? "bg-black": "bg-[#7F3DFF]"} ${className}`}>{children}</button>
    </>
  )
}

export default ThemeButton