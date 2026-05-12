import React, { useEffect, useState } from "react";
import HomeTemplate from "../../utils/HomeTemplate";
import Select from "../../utils/Select.jsx";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
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
  let location = useLocation()
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
let isLoggedIn = useSelector((store) => store.user.user.isLoggedIn)
  useEffect(()=>{
 
  let getIncome=async ()=>{
    let walletList = await getWalletsByUserId(userInfo?.id);
    console.log(userInfo);
    console.log("wallet list", walletList);
    let dataOfIncome = await getIncomeAndExpense({associatedWalletList: walletList?.data?.data,month});       //gives imcone and expense till month

   
    dispatch(setIncomeAndExpense(dataOfIncome?.data?.message)); 

   
   } // sets the wallet which we have in store 
   getIncome()
  },[navigate,userInfo,location])

  return (
    <div>
      <HomeTemplate>
        <motion.div
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="flex flex-col pb-10"
        >
          <div className="w-full max-w-6xl mx-auto mt-6">
            <div className="rounded-[2.25rem] bg-white/35 backdrop-blur-xl border border-white/60 shadow-xl px-6 sm:px-8 lg:px-10 py-8">
              <div className="flex w-full justify-between items-center">
                <div className="rounded-full border-blue-500/50 border-2 p-1 bg-white/70">
                  <img
                    src={userInfo.avatar}
                    className="bg-white rounded-full"
                    width={48}
                  />
                </div>
                <DateShow month={month} setMonth={setMonth} />
              </div>
              <div className="mt-6 flex flex-col items-center gap-y-2">
                <p className="text-lg font-semibold text-[#91919F]">
                  Account Balance
                </p>
                <p className="text-4xl sm:text-5xl lg:text-6xl font-semibold">
                  ₹{giveBalance(wallets)}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-7">
                <div className="flex items-center justify-between bg-[#00A86B]/90 px-5 py-4 rounded-3xl gap-x-3 text-white shadow-lg border border-white/30">
                  <img src="../../icons/income.svg" />
                  <div className="flex flex-col text-right">
                    <p>Income</p>
                    <p className="text-lg font-semibold">
                      ₹{incomeAndExpense?.Income}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-[#FD3C4A]/90 px-5 py-4 rounded-3xl gap-x-3 text-white shadow-lg border border-white/30">
                  <img src="../../icons/expense.svg" />
                  <div className="flex flex-col text-right">
                    <p>Expense</p>
                    <p className="text-lg font-semibold">
                      ₹{incomeAndExpense?.Expense}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="flex flex-col"
        >
          <div
            className="flex items-center gap-3 overflow-x-auto px-2 py-4 w-full max-w-6xl mx-auto"
            style={{ scrollbarWidth: "none" }}
          >
            {dates.map((date, index) => {
              return (
                <div
                  key={index}
                  className={`flex justify-center duration-200 items-center cursor-pointer rounded-full px-6 py-2 border backdrop-blur-lg ${
                    targetSelected == index
                      ? "bg-[#FCEED4]/80 border-white/70"
                      : "bg-white/40 border-white/60"
                  }`}
                  onClick={() => {
                    setTargetSelected(index);
                  }}
                >
                  <p
                    className={`duration-200 font-semibold ${
                      targetSelected == index
                        ? "text-[#FCAC12] text-base"
                        : "text-[#91919F] text-sm"
                    }`}
                  >
                    {date}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="flex py-5 justify-between items-center w-full max-w-6xl mx-auto">
            <p className="font-semibold text-lg">Recent Transaction</p>
            <button
              className="bg-[#EEE5FF]/80 py-2 px-5 rounded-full text-[#7F3DFF] border border-white/60 shadow-sm"
              onClick={() => {
                navigate("/all-transaction");
              }}
            >
              See All
            </button>
          </div>
          <div className="grid mb-24 gap-4 w-full max-w-6xl mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
                className="animate-spin"
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
