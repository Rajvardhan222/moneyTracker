import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../../utils/Input";
import BackTexttemplate from "../../utils/BackTexttemplate";
import { useNavigate } from "react-router-dom";

import { useRegesterUserMutation } from "../../reactQuery/queryMutatuion";
function SignUp() {
  let navigate = useNavigate()
  let {mutateAsync : regesterUser,isPending:isRegestring,isError:errRegester,error:signupErr} = useRegesterUserMutation()

  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  let submit =async (data) => {
    let regester =await regesterUser({name :data.Name,email :data.Email,password:data.Password})

      if (!regester) {
        throw new Error('Failed to regester')
        
      }

      navigate(`/otp-Verification/${data.Email}`)

      


  };

  let [isPassword, setIspassword] = useState("password");

  let tooglePasswordVis = () => {
    if (isPassword === "password") {
      setIspassword("text");
    } else {
      setIspassword("password");
    }
  };
  return (
    <>
     
      <BackTexttemplate header={'Sign Up'}>
      <div className="mt-16">
        <form
          onSubmit={handleSubmit(submit)}
          className="flex flex-col items-center justify-center gap-y-10"
          >
         {signupErr && <p className="text-red-500 text-lg font-semibold w-[90%] text-center">{signupErr.message}</p>}
          <Input
            type={"text"}
            placeholder={"Name"}
            {...register("Name", { required: true })}
          />
          <Input
            type={"email"}
            placeholder={"Email"}
            {...register("Email", { required: true })}
          />
          <div className="flex border-2 rounded-2xl">
            <Input
              type={isPassword}
              className="border-none"
              placeholder={"Password"}
              {...register("Password", { required: true })}
            />
            <img src="icons/eye.svg" onClick={() => tooglePasswordVis()} />
          </div>
          <input
            type="submit"
            disabled = {isRegestring}
            className={` w-[90%] rounded-2xl text-white font-semibold text-lg px-6 py-5 ${isRegestring ? "bg-[#361970] " : "bg-[#7F3DFF]"}`}
            value={"Sign Up"}
          />
          
        </form>
      </div>
      <div className="flex justify-center mt-4">
        <p className="text-[#91919F] text-lg">
          Already have an account?{" "}
          <span className="text-[#7F3DFF] underline-offset-2 cursor-pointer" onClick={()=>{navigate('/login')}}>Login</span>
        </p>
      </div>
      </BackTexttemplate>
    </> 
  );
}

export default SignUp;
