import React from 'react'

function ThemeButton({isPending,className,children,type,...props}) {
  return (
    <>
    <button
      type={type}
      {...props}
      disabled={isPending}
      className={`w-full m-auto py-3 text-white font-semibold text-lg rounded-2xl duration-150 shadow-md border ${
        isPending ? "bg-black border-black" : "bg-[#7F3DFF] hover:bg-[#3e0da1] border-[#6F2FE8]"
      } ${className}`}
    >
      {children}
    </button>
    </>
  )
}

export default ThemeButton