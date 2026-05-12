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
      <div className='mt-10 flex flex-col gap-y-10 w-full max-w-3xl mx-auto bg-white border border-[#EFE7DA] rounded-3xl shadow-sm p-6'>
        <h1 className='text-3xl sm:text-4xl w-full font-semibold m-auto'>
            Enter your Verification Code
            </h1>
        <OtpInput 
      value={otp}
      onChange={setOtp}
      numInputs={4}
      renderSeparator={<span></span>}
      renderInput={(props) => (<input {...props}  className='h-16 min-w-14 mx-2 sm:mx-4 border border-[#E8DFD0] bg-white rounded-xl text-black text-2xl font-medium outline-none shadow-sm'/>)}
    />
        </div>
      <div className='w-full max-w-3xl mx-auto mt-5 font-semibold text-md'>
        We send verification code to your
email <span className='text-[#7F3DFF]'>{maskEmail(email)}</span>. You can
check your inbox
        </div>
      <div className='flex justify-center mt-6'>
      <button className="bg-[#7F3DFF] font-bold text-white rounded-2xl px-10 sm:px-32 py-3 border border-[#6F2FE8] shadow-md" onClick={()=> submit()}>Verify</button></div>
    </BackTexttemplate>
    </>
  )
}

export default Verification