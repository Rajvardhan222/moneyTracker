import { useTransferMoney } from "@/reactQuery/queryMutatuion";
import BackTexttemplate from "@/utils/BackTexttemplate";
import Input from "@/utils/Input";
import Select from "@/utils/Select";
import ThemeButton from "@/utils/ThemeButton";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
function Transfer() {
  let wallets = useSelector((store) => store.user.user.wallets);
  const walletList = [];
  const walletName = [];
  wallets?.map((wallet) => {
    walletList.push({ name: wallet?.name, id: wallet?.id });
    walletName.push(wallet?.name);
  });
  let navigate = useNavigate()
  let { register, handleSubmit } = useForm({
    defaultValues: {
      amount_add: 0,
    },
  });
let {mutateAsync : transferMoney,isPending,error:isTransferErr} = useTransferMoney()
let [error,setError] = useState(null)
  let submitForm = async(data) => {
    setError(null)
    if((data.from != data.to) && data?.amount_add > 0) {
    

    let walletOneId =  walletList.find((item) => {
      return item.name == data.from
     })
    let walletTwoId =  walletList.find((item) => {
      return item.name == data.to
     })
        try {
          let transfer = await transferMoney({
            acc1Id : walletOneId.id,
            acc2Id : walletTwoId.id,
            amount : data.amount_add,
            description : data.desc
          })
          console.log(isTransferErr);
          if(transfer){
            navigate('/')
          }
        } catch (err) {
          console.log(isTransferErr);
        }
        

    }else{
      setError("Please choose a different wallet ")
     
    }
  };
  return (
    <motion.form initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition} onSubmit={handleSubmit(submitForm)}>
      <div className="min-h-full w-full bg-[#0077FF]">
        <BackTexttemplate
          header={"Create New Wallet"}
          type={"purple"}
        ></BackTexttemplate>
       
        <div className="mt-32 ml-5 pb-44">
          <p className="text-[#FCFCFC] font-semibold text-lg">How much ?</p>
          <span className="text-5xl font-bold text-white">
            ₹
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
      <div className="relative w-full   bottom-36 bg-white min-h-36 pt-11 m-auto rounded-tl-[2rem] rounded-tr-[2rem]">
        <div className="w-[90%] flex flex-col gap-y-10 m-auto">
        {isTransferErr && !isPending&& <p className="text-red-500 font-bold text-xl    text-center ">
            {isTransferErr.message}
          </p>}
          {
            error && <p className="text-red-500 font-bold text-xl    text-center ">
            {error}
          </p>
          }
          <div className="flex  ">
            <Select
              options={walletName}
              placeholder={"From"}
              className={
                "w-[40%] py-2 px-5 bg-white border-2 border-[##F1F1FA] rounded-2xl appearance-none custom-select"
              }
              {...register("from", {
                required: true,
                validate: (val) =>
                  val !== "Wallets" || "PLease select a valid category",
              })}
            />

            <img src="icons/transfers.svg" className="" />
            <Select
              options={walletName}
              placeholder={"To"}
              className={
                "w-[40%] py-2 px-5 bg-white border-2 border-[##F1F1FA] rounded-2xl appearance-none custom-select"
              }
              {...register("to", {
                required: true,
                validate: (val) =>
                  val !== "Wallets" || "PLease select a valid category",
              })}
            />
          </div>
          <div>
            <Input
              placeholder={"Desc"}
              type={"text"}
              {...register("desc", {
                min: 3,
              })}
            />
          </div>
        <ThemeButton type="submit" isPending={isPending}>Continue</ThemeButton>
        </div>

      </div>
    </motion.form>
  );
}

export default Transfer;
