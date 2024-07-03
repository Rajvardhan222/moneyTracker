import React from 'react'
import ThemeButton from '../utils/ThemeButton'
import { Navigate, useNavigate } from 'react-router-dom'

function LetsSetup() {
  let navigate = useNavigate()
  return (
    <div className='h-[90%] w-full'>
        <h1 className='font-semibold text-5xl mt-7  ml-3'>
        Let’s setup your account!
        </h1>

        <p className=' ml-4 mt-10 w-[80%] '>
        Account can be your bank, credit card or 
        your wallet.
        </p>
<div className='m-auto w-[85%] mt-96'>
        <ThemeButton onClick={()=>navigate('/create-new-wallet')} >Let&apos;s go</ThemeButton></div>
    </div>
  )
}

export default LetsSetup