import React from 'react'

function CategoryBatch({color,category}) {
  return (
    <div className='flex justify-between rounded-3xl min-w-28 px-4 py-2  border-[1px] '>
        <div className={`bg-[${color}] min-h-6 min-w-6 rounded-full`} style={{backgroundColor : color}}>

        </div>
        <p className='font-semibold px-3'>{category}</p>
    </div>
  )
}

export default CategoryBatch