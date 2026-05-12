import React from 'react'
import ThemeButton from '../utils/ThemeButton'
import { Navigate, useNavigate } from 'react-router-dom'

function LetsSetup() {
  let navigate = useNavigate()
  return (
    <div className='min-h-[90%] w-full flex items-center justify-center'>
        <div className='w-full max-w-3xl bg-white border border-[#EFE7DA] rounded-3xl shadow-sm p-8'>
          <h1 className='font-semibold text-4xl sm:text-5xl'>
          Let’s setup your account!
          </h1>

          <p className='mt-6 text-[#4A4A4A]'>
          Account can be your bank, credit card or 
          your wallet.
          </p>
          <div className='mt-10'>
            <ThemeButton onClick={()=>navigate('/create-new-wallet')} >Let&apos;s go</ThemeButton>
          </div>
        </div>
    </div>
  )
}

export default LetsSetup