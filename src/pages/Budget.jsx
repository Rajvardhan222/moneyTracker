import HomeTemplate from '@/utils/HomeTemplate'
import React from 'react'

function Budget() {
  return (
    <HomeTemplate>
        <div className="w-full max-w-6xl mx-auto mt-6">
          <div className="bg-white border border-[#EFE7DA] rounded-3xl shadow-sm px-6 py-10 text-center">
            <h2 className="text-2xl font-semibold text-[#161616]">Budget</h2>
            <p className="text-[#91919F] mt-2">Set up budgets and track limits here.</p>
          </div>
        </div>
    </HomeTemplate>
  )
}

export default Budget