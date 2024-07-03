import React from 'react'
import {forwardRef } from 'react'
function Select({placeholder, options,className, ...props},ref) {
  return (
    <>
        <select ref={ref} className={`${className} `} {...props}>
            <option disabled = {true} selected>{placeholder}</option>
               { options.map((option,index) => {
                    return (
                      <>
                      
                    <option key={index}>{option}</option>
                    </>
                  )
                })
            }
        </select>
    </>
  )
}

export default forwardRef( Select)