import BackTexttemplate from "@/utils/BackTexttemplate";
import ThemeButton from "@/utils/ThemeButton";
import WalletShow from "@/utils/WalletShow";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';

const pageVariants = {
  initial: {
    opacity: 0,
    x: "200vw",
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
function Wallets() {
  const divStyle = {
    backgroundImage: `url('/icons/amount-bg.png')`,
    backgroundSize: "cover", // Add this to ensure the background image covers the entire div
    width: "100%", // Set width as per your requirement
    height: "", // Set height as per your requirement
  };

  let walletList = useSelector((store) => store?.user?.user?.wallets);
  let balance = 0;
  walletList.map((wallet) => (balance += wallet.balance));
  let navigate = useNavigate();
  return (
    <BackTexttemplate header={"Account"}>
      <motion.dev initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition} className="flex flex-col">
        <div
          className="w-full h-60 flex flex-col justify-center items-center"
          style={divStyle}
        >
          <p className="font-semibold text-lg text-[#91919F] ">
            Account Balance
          </p>
          <p className="text-5xl font-bold">₹{balance}</p>
        </div>
        <div className="flex flex-col gap-y-5 py-3 w-[90%] m-auto ">
          {walletList.map((item, index) => (
            <WalletShow name={item.name} amount={item.balance} key={index} />
          ))}
          {walletList.length == 0 && (
            <div className="text-2xl font-black">No wallet</div>
          )}
        </div>
        <ThemeButton
          className="mt-10 w-[80%] m-auto "
          onClick={() => navigate("/create-new-wallet")}
        >
          + Add new wallet
        </ThemeButton>
      </motion.dev>
    </BackTexttemplate>
  );
}

export default Wallets;
