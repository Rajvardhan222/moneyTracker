import React, { useEffect, useState } from "react";
import HomeTemplate from "../../utils/HomeTemplate";
import Select from "../../utils/Select.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useGetIncomeAndExpense,
  useGetInfiniteTransactions,
  useGetWalletByIdMutation,
  useVerifyAccessTOken,
} from "@/reactQuery/queryMutatuion";
import { useInView } from "react-intersection-observer";
import { useDispatch } from "react-redux";
import { addAllWallet, login as loginDispatch, setIncomeAndExpense } from "@/store/userSlice";
import Transaction from "@/utils/Transaction";
import { Loader2Icon } from "lucide-react";
import { giveBalance } from "@/utils/giveBalance";
import { motion } from 'framer-motion';
import { monthsOfTheYear } from "@/utils/month";
import DateShow from "@/utils/DateShow";

const pageVariants = {
  initial: {
    opacity: 0,
    x: "-100vw",
  },
  in: {
    opacity: 1,
    x: 0,
  },
  out: {
    opacity: 0,
    x: "100vw",
  }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

function Home() {
  let dispatch = useDispatch();
  let {
    mutateAsync: getWalletsByUserId,
    isPending: isWalletPending,
    isError: isWalletErrorGetting,
  } = useGetWalletByIdMutation();
  
  let {
    mutateAsync: getIncomeAndExpense,
    isPending: isReceivingIncomeandExpense,
  } = useGetIncomeAndExpense();
  let navigate = useNavigate();
  let wallets = useSelector((store) => store.user.user.wallets);
  let incomeAndExpense = useSelector((store) => store.user)

  let [targetSelected, setTargetSelected] = useState(0);
  let fetchTransactionOfDate = ["Today", "Week", "Month", "Year"];
  const {
    mutateAsync: verifyAccessToken,
    isPending: isVerifying,
    isError: isVerifyError,
  } = useVerifyAccessTOken();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useGetInfiniteTransactions({tillDate :fetchTransactionOfDate[targetSelected],wallets});
 
    let today = new Date();
   
    let [month, setMonth] = useState(monthsOfTheYear[new Date(today).getMonth()]);
  let user = useSelector((store) => store.user.isLoggedIn);
  let userInfo = useSelector((store) => store.user.user);
  let dates = ["Today", "Week", "Month", "Year"];
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  useEffect(()=>{
  let getIncome=async ()=>{
    let walletList = await getWalletsByUserId(userInfo?.id);
    console.log(userInfo);
    console.log("wallet list", walletList);
    let dataOfIncome = await getIncomeAndExpense({associatedWalletList: walletList?.data?.data,month});       //gives imcone and expense till month

   
    dispatch(setIncomeAndExpense(dataOfIncome?.data?.message)); 

   
   } // sets the wallet which we have in store 
   getIncome()
  },[navigate,userInfo])

  return (
    <div>
      <HomeTemplate>
        <motion.div initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition} className="flex flex-col pb-10 bg-gradient-to-b rounded-bl-3xl rounded-br-3xl from-[#FFF6E5] to-[#f8edd83c] ">
          <div className="flex w-[90%] justify-between m-auto mt-5">
            <div className="rounded-full  border-blue-500 border-2">
              <img
                src={userInfo.avatar}
                className="bg-white rounded-full"
                width={40}
              />
            </div>
            <DateShow month={month} setMonth={setMonth}/>
            
          </div>
          <div className="m-auto mt-4 gap-y-5 flex flex-col">
            <p className="text-lg m-auto font-semibold text-[#91919F]">
              Account Balance
            </p>

            <p className="m-auto text-5xl font-semibold">
              ₹{giveBalance(wallets)}
            </p>
          </div>
          <div className="flex justify-around mt-5 ">
            <div className="flex justify-around  bg-[#00A86B] px-5 py-3 rounded-3xl gap-x-3 ">
              <img src="../../icons/income.svg" />
              <div className="flex flex-col text-white">
                <p>Income</p>
                <p className="text-lg font-semibold">
                  ₹{incomeAndExpense?.Income}
                </p>
              </div>
            </div>
            <div className="flex justify-around bg-[#FD3C4A] px-5 py-3 rounded-3xl gap-x-3">
              <img src="../../icons/expense.svg" />
              <div className="flex flex-col text-white">
                <p>Expense</p>
                <p className="text-lg font-semibold">
                  ₹{incomeAndExpense?.Expense}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition} className="flex flex-col">
          <div className="flex items-center justify-around overflow-y-scroll " style={{scrollbarWidth : 'none'}}>
            {dates.map((date, index) => {
              return (
                <div
                  key={index}
                  className={`flex justify-center duration-200 items-center cursor-pointer rounded-3xl px-6 py-1 m-0 ${
                    targetSelected == index ? "bg-[#FCEED4] " : ""
                  }`}
                  onClick={() => {
                    setTargetSelected(index);
                  }}
                >
                  <p
                    className={` duration-200 font-semibold  ${
                      targetSelected == index
                        ? "text-[#FCAC12] text-lg "
                        : "text-[#91919F] text-sm"
                    }`}
                  >
                    {date}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="flex py-5 justify-between items-center w-[90%] m-auto">
            <p className="font-semibold text-lg">Recent Transaction</p>
            <button className="bg-[#EEE5FF] py-2 px-5 rounded-3xl text-[#7F3DFF]" onClick={()=>{
              navigate("/all-transaction")
            }}>
              See All
            </button>
          </div>
          <div className="flex mb-24 flex-col gap-y-4">
            {data?.pages?.map((detail, index) => {
              return (
                <Transaction
                  key={index}
                  transactionDetail={detail?.data?.message?.transactionBetween}
                />
              );
            })}
          </div>
          <div
            className="flex items-center justify-center w-full mb-36"
            ref={ref}
          >
            {isFetchingNextPage && (
              <Loader2Icon
                className="animate-spin  py-"
                size={60}
                color="black"
              ></Loader2Icon>
            )}
          </div>
        </motion.div>
      </HomeTemplate>
    </div>
  );
}

export default Home;
