import React, { useState } from "react";
import BackTexttemplate from "../../utils/BackTexttemplate";
import { useForm } from "react-hook-form";
import Input from "../../utils/Input";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetIncomeAndExpense, useGetWalletByIdMutation, useLoginMutation } from "@/reactQuery/queryMutatuion";
import { addAllWallet, login as loginDispatch, setIncomeAndExpense } from "@/store/userSlice";
function Login() {
  let dispatch = useDispatch();
  let {
    mutateAsync: getIncomeAndExpense,
    isPending: isReceivingIncomeandExpense,
  } = useGetIncomeAndExpense();
  let { register, handleSubmit } = useForm();
  let [isPassword, setIspassword] = useState("password");
let navigate = useNavigate()
  let tooglePasswordVis = () => {
    if (isPassword === "password") {
      setIspassword("text");
    } else {
      setIspassword("password");
    }
  };
  let {
    mutateAsync: getWalletsByUserId,
    isPending: isWalletPending,
    isError: isWalletErrorGetting,
  } = useGetWalletByIdMutation();

let {mutateAsync:loginUser,isPending,error} = useLoginMutation()
  let login = async (data) => {

let detail = await loginUser(data)
    if(!detail){
      throw new Error('Failed to login')
    }

    console.log(error);
dispatch(loginDispatch({name : detail?.data?.data?.userInfo?.name, email : detail?.data?.data?.userInfo.email,avatar : detail?.data?.data?.userInfo?.avatar,id : detail?.data?.data?.userInfo?.id}))
let walletList = await getWalletsByUserId(detail?.data?.data?.userInfo?.id);
let dataOfIncome = await  getIncomeAndExpense(walletList.data.data)
      dispatch(setIncomeAndExpense(dataOfIncome?.data?.message))

dispatch(addAllWallet(detail?.data?.data?.userInfo?.Wallets))

if(detail?.data?.data?.userInfo?.Wallets.length == 0){
  navigate("/lets-setup");
}else{

  navigate('/')
}




  }
  return (
    <>
      <BackTexttemplate header={"login"}>
        <div className="mt-16">
          <form className="flex flex-col gap-y-5 justify-center items-center" onSubmit={handleSubmit(login)}>
            {
              error && <p className="text-red-500 text-lg font-semibold">{error.message}</p>
            }
            <Input
              placeholder={"Email"}
              type={"email"}
              {...register("email", { required: "true" })}
            ></Input>
            <div className="flex border-2 rounded-2xl w-[80%]">
              <Input
                type={isPassword}
                className="border-none w-0%]"
                placeholder={"Password"}
                {...register("password", { required: true })}
              />
              <img src="icons/eye.svg" className="w-10" onClick={() => tooglePasswordVis()} />
            </div>
            <input
            type="submit"
            className={` w-[90%] rounded-2xl text-white font-semibold text-lg px-6 py-5 ${isPending ? "bg-[#401e82]" : "bg-[#7F3DFF]"}`}
            value={"Sign Up"}
          />
          </form>
        </div>
        <div className="flex justify-center mt-4">
        <p className="text-[#91919F] text-lg">
        Don’t have an account yet?{" "}
          <span className="text-[#7F3DFF] underline-offset-2 cursor-pointer" onClick={()=>{navigate('/signUp')}}>Sign Up</span>
        </p>
      </div>
      </BackTexttemplate>
    </>
  );
}

export default Login;
