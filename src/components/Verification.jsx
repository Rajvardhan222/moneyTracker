import React, { useState } from 'react'
import BackTexttemplate from '../utils/BackTexttemplate'
import OtpInput  from 'react-otp-input'

import { useNavigate, useParams } from 'react-router-dom'
import { useRegesterUserOtpMutation } from '../reactQuery/queryMutatuion'

function Verification({params}) {
    let [otp,setOtp] = useState('')
    let navigate = useNavigate()
    let {mutateAsync : regesterUserOtp,isPending:isRegestringOtp,isError:errRegesterOtp} = useRegesterUserOtpMutation()


    let {email} = useParams()

let submit= async ()=>{
    if(otp.length == 4){
    let verify =await  regesterUserOtp({OTP : otp})
    if(verify){
        navigate('/login')
    }
    }
}


let maskEmail = (email) => {
    const atIndex = email.indexOf('@');
    if (atIndex <= 0) return email; // handle cases where '@' is at the beginning or not present
    
    const visibleCharacters = 5; // Number of characters to display before the '@' symbol
    
    // Ensure we don't try to mask more characters than are available before the '@'
    const maskedCharacters = Math.max(atIndex - visibleCharacters, 0);
    
    // Create the masked email string
    let maskedEmail = email.substring(0, visibleCharacters); // Keep the visible characters before the '@'
    maskedEmail += '*'.repeat(maskedCharacters); // Mask the middle characters
    maskedEmail += email.substring(atIndex); // Keep everything after the '@'
    
    return maskedEmail;
  };
  return (
    <>
    <BackTexttemplate type={''} header={'Verification'}>
        <div className='mt-10 flex flex-col gap-y-14'>
            <h1 className='text-4xl w-[90%] font-semibold m-auto'>
            Enter your Verification Code
            </h1>
        <OtpInput 
      value={otp}
      onChange={setOtp}
      numInputs={4}
      renderSeparator={<span></span>}
      renderInput={(props) => (<input {...props}  className=' h-16 min-w-14  mx-4 border-2 border-black rounded-lg  text-black text-2xl font-medium outline-none'/>)}
    />
        </div>
        <div className='w-[90%] m-auto mt-5 font-semibold text-md'>
        We send verification code to your
email <span className='text-[#7F3DFF]'>{maskEmail(email)}</span>. You can
check your inbox
        </div>
        <div className='flex justify-center mt-6'>
        <button className="bg-[#7F3DFF] font-bold text-white  rounded-2xl px-32 py-3 " onClick={()=> submit()}>Verify</button></div>
    </BackTexttemplate>
    </>
  )
}

export default Verification