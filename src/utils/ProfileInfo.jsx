import React from 'react'

function ProfileInfo({src,name,id}) {
  return (
    <div className='flex gap-x-7 justify-between items-center'>
        <div className='flex items-center justify-between gap-x-6'>
        <div className='rounded-full border-fuchsia-700 border-2 p-1 '>
            <img src={src} width={100}/>
        </div>
        <div className='flex flex-col gap-y-1'>
            <p className='text-lg font-large text-[#91919F] '>Username</p>
            <p className='text-3xl font-semibold '>{name}</p>
        </div>
        </div>
        <div>
            <img src='/icons/edit.svg' />
        </div>
        
    </div>
  )
}

export default ProfileInfo