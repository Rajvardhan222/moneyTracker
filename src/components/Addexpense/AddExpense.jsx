import React, { useEffect, useState } from "react";
import ThemeButton from "../../utils/ThemeButton";
import Select from "../../utils/Select";
import Input from "../../utils/Input";
import BackTexttemplate from "../../utils/BackTexttemplate";
import { useForm } from "react-hook-form";
import { Switch } from "@/components/ui/switch";

import { DevTool } from "@hookform/devtools";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAddExpenseMutation, useRepeatTransaction } from "@/reactQuery/queryMutatuion";
import { updateBalanceToWallet } from "@/store/userSlice";
import { motion } from 'framer-motion';

const pageVariants = {
  initial: {
    opacity: 0,
    y: "-100vh",
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: "100vh",
  }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};
function AddExpense() {
    let { register, handleSubmit, getFieldState, watch, control, setValue } =
    useForm({
      defaultValues: {
        amount_add: 0,
      },
    });
    let {mutateAsync : addExpense,isPending : isAddingExpense,isError : isExpenseAddingErr} = useAddExpenseMutation()
    let {mutateAsync : repeatTransaction,isPending:isRepeating} = useRepeatTransaction()
    let navigate = useNavigate()
    let dispatch = useDispatch()
let addIncomeToWallet
  let wallets = useSelector((store) => store.user.user.wallets);
  const walletList = [];
  const walletName =[]
  wallets?.map((wallet) => {
    walletList.push({name : wallet?.name, id : wallet?.id});
    walletName.push(wallet?.name)
  });
  console.log("wl", walletList);
  let [repeat, setRepeat] = useState(false);
  //income category
  let category = [ 
    "Food",
    "Travel",
    "Education",
    "Entertainment",
   
    "Cloths",
    "Grocery",
    "Vegetable",
    "Electricity",
    "Transfer",
    "Tax",
    "Vegetable",
    "Technology",
    
    "Rent",
    "Donation",
    "Medical"
  ];
  let submitForm = async (data) => {
   
    let id = walletList.find(wallet => wallet.name == data.Wallet)

    if (repeat==false) {
      console.log(id.id);
    addIncomeToWallet = await addExpense({
        amount:data?.amount_add,
    category:data?.Category,
    description:data?.desc,
    associatedWallet : id.id

    })
    dispatch(updateBalanceToWallet({id : addIncomeToWallet?.data?.message?.wallet?.id,balance : addIncomeToWallet?.data?.message?.wallet?.balance}))
    if(addIncomeToWallet?.data.message?.wallet.length ==0){
        navigate('lets-setup')
    }else{
        navigate('/')
    }
    } else {
      let repeatTransactions =await  repeatTransaction({
        amount:data?.amount_add,
        category:data?.Category,
        description:data?.desc,
        associatedWallet : id.id,
        repeatFrequency : data?.repeatFrequency,
        endAftertime : data?.endDate,
        type : "E"
      })


      if(repeatTransactions){
        console.log(repeatTransactions);
        navigate('/')
      }
    }
   
  };

    
  
  
 
  return (
    <motion.form initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition} onSubmit={handleSubmit(submitForm)}>
      <div className="min-h-full w-full bg-[#FD3C4A]">
        <BackTexttemplate
          header={"Create New Wallet"}
          type={"purple"}
        ></BackTexttemplate>
        <div className="mt-32 ml-5 pb-44">
          <p className="text-[#FCFCFC] font-semibold text-lg">How much ?</p>
          <span className="text-5xl font-bold text-white">
            $
            <input
              className="bg-transparent w-[70%] outline-none "
            
              type="number"
              min={1}
              max={1000000}
              {...register("amount_add", { max: 1000000 })}
            />
          </span>
        </div>
      </div>
      <div className="relative w-full  bottom-36 bg-white min-h-36 pt-11 rounded-tl-[2rem] rounded-tr-[2rem]">
        <div className=" m-auto w-[90%] flex flex-col gap-y-10">
        <Select
            options={category}
            placeholder={"Expense Type"}
            className={
              "w-[90%] py-5 px-5 bg-white border-2 border-[##F1F1FA] rounded-2xl appearance-none custom-select"
            }
            {...register("Category", {
              required: true,
              validate: (val) =>
                val !== "Income Type" || "PLease select a valid category",
            })}
          />
          <Input placeholder={"Desc"} type={"text"}  {...register("desc",{
            min : 3
          })} />

          <Select
            options={walletName}
            placeholder={"Wallets"}
            className={
              "w-[90%] py-5 px-5 bg-white border-2 border-[##F1F1FA] rounded-2xl appearance-none custom-select"
            }
            {...register("Wallet", {
              required: true,
              validate: (val) =>
                val !== "Wallets" || "PLease select a valid category",
            })}
          />

          <div className="flex justify-around">
            <div className="flex flex-col">
              <p className="">Repeat</p>
              <p className=" text-[#91919F] text-sm">Repeat transaction</p>
            </div>
            <div>
              <Switch
                checked={repeat}
                onClick={() => {
                  setRepeat(!repeat);
                }}
              />
            </div>
          </div>

          {repeat && (
            <div className=" gap-y-4 flex flex-col">
              <div className="flex justify-between items-center">
                <p>Repeat frequency : </p>
                <Select
                  options={["D","W","M","Y"]}
                  className={
                    "w-[50%] py-2 px-5 bg-white border-2 border-[##F1F1FA] rounded-2xl appearance-none custom-select"
                  }
                  {...register("repeatFrequency", { required: true })}
                />
              </div>
              <div className="flex items-center justify-between">
                <p>Repeat Untill : </p>
                <Input type="date" {...register("endDate",{required : true,validate : (value) => {
                  if(value <= new Date().toISOString().slice(0,10)){
                    return "Please select a valid date"
                  }else{
                    return true
                  }
                }})} />
              </div>
            </div>
          )}

          <ThemeButton isPending={isAddingExpense} type="submit">Continue</ThemeButton>
        </div>
      </div>
    </motion.form>
  );
}

export default AddExpense;
