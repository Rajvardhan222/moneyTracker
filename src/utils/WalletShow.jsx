import React from 'react'

function WalletShow({name,amount}) {
  return (
    <div className='flex justify-between items-center py-4 px-4 rounded-2xl bg-white border border-[#EFE7DA] shadow-sm'>
      <div className='flex gap-x-4 items-center'>
            <img src='/icons/blueWallet.svg' />
            <p className='text-lg font-semibold'>{name}</p>
        </div>
        <p className='text-lg font-semibold'>{amount}</p>
        
    </div>
  )
}

export default WalletShow