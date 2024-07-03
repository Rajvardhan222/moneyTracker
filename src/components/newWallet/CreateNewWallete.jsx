import React from 'react'
import BackTexttemplate from '../../utils/BackTexttemplate'
import Input from '../../utils/Input'
import { useForm } from 'react-hook-form'
import Select from '../../utils/Select'
import ThemeButton from '../../utils/ThemeButton'
import { useCreateWalletMutation } from '@/reactQuery/queryMutatuion'
import { addWallet } from '@/store/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function CreateNewWallete() {
let userDetail = useSelector(store => store.user.user)
    let options =["wallet", "Bank", "UPI", "PhonePe", "paytm"]
    let dispatch = useDispatch()
    let {handleSubmit,register} = useForm({
        defaultValues:{
            amount_add : 0
        }
    })
    let navigate = useNavigate()
    const {mutateAsync : createWallet,isPending : isCreatingWallet,isError : isWalletCreationError} = useCreateWalletMutation()
    let submitForm = async(data) => {
        console.log(data)
        let wallet = await createWallet({
            name : data.Name,
            type : data.typeOfWallet,
            balance : data.amount_add,
            userId : userDetail.id
        })

        if(!wallet){
            throw new Error('Failed to create wallet')
        }
        
        if(wallet.data.success){
           dispatch( addWallet(wallet.data))
           navigate('/')
        }

    }
  return (
    <>
    <form onSubmit={handleSubmit(submitForm)}>
    <div className='min-h-full w-full bg-[#7F3DFF]'>
    <BackTexttemplate header={'Create New Wallet'} type={"purple"}>
        
    </BackTexttemplate>
    <div className='mt-32 ml-5 pb-44'>
        <p className='text-[#FCFCFC] font-semibold text-lg'>Balance</p>
       <span className='text-5xl font-bold text-white'>$<input className='bg-transparent w-[70%] outline-none '  type='number' min={0}  max={1000000} {...register('amount_add',{max : 1000000})}/></span>
    </div>
    </div>
    <div className='relative w-full  bottom-36 bg-white min-h-36 pt-11 rounded-tl-[2rem] rounded-tr-[2rem]'>
        <div className=' m-auto w-[90%] flex flex-col gap-y-10'>
            <Input placeholder={"Name"} type={'text'} {...register('Name',{required :true,minLength : 3})}/>
            <Select options={options} className={'w-[90%] py-5 px-5 bg-white border-2 border-[##F1F1FA] rounded-2xl appearance-none custom-select'} {...register("typeOfWallet")}/>

            <ThemeButton>
                Continue
            </ThemeButton>
        </div>
    </div>
    </form>
    </>
  )
}

export default CreateNewWallete