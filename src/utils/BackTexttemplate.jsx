import React from 'react'
import { useNavigate } from 'react-router-dom'

function BackTexttemplate({header,children,type}) {
  let navigate = useNavigate()
  return (
   <>
   <div
     className={`flex items-center m-auto p-4 w-full max-w-6xl mx-auto rounded-2xl shadow-sm border ${
       type == "purple"
         ? "text-white bg-white/10 border-white/20"
         : "text-[#161616] bg-white border-[#EFE7DA]"
     }`}
   >
      {type !== "purple" ? <img onClick={()=>{navigate(-1)}} src="/icons/leftarrow.svg"  className='cursor-pointer'/> : <img onClick={()=>{navigate(-1)}} src="/icons/leftWhiteArrow.svg" className='cursor-pointer'/>}
        <h1 className="m-auto font-semibold ">{header}</h1>
      </div>
      
        {children}
    
   </>
  )
}

export default BackTexttemplate