import HomeTemplate from "@/utils/HomeTemplate";
import ProfileInfo from "@/utils/ProfileInfo";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button";
import ThemeButton from "@/utils/ThemeButton";
import { logout } from "@/Api/auth/user";
import { logoutUser } from "@/store/userSlice";
import { AnimatePresence, motion } from 'framer-motion';
import * as XLSX from "xlsx";
import { useGetTransactionHistoryMutation } from "@/reactQuery/queryMutatuion";

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


function Profile() {
  const settings = [
    {
      title : "Wallet",
      icon : "icons/Wallet.svg",
      path : "/wallets"
    },
    {
      title : "Export",
      icon : "icons/export.svg",
      path : "/export"
    }
  ]
  
  let profileDetail = useSelector(store => store?.user?.user)
  let userWallets = useSelector(store => store?.user?.user?.wallets || [])
  const { mutateAsync: getHistory, isPending: isDownloading } =
    useGetTransactionHistoryMutation();

  let navigate = useNavigate()
  let dispatch = useDispatch()
  let logouttheuser = async()=>{
    let logoutuser = await logout()
    if(logoutuser){
      dispatch(logoutUser())
     navigate('/login',{replace : true})
    }
   }
   let location = useLocation()
  const downloadHistory = async () => {
    const response = await getHistory({ wallets: userWallets });
    const historyData = response?.data?.message || {};
    const transactions = historyData?.transactions || [];
    const wallets = historyData?.wallets || userWallets || [];
    const walletMap = new Map(
      wallets.map((wallet) => [wallet.id, wallet.name || `Wallet ${wallet.id}`])
    );

    const rows = transactions.map((item) => ({
      id: item.id,
      type: item.type === "E" ? "Expense" : "Income",
      amount: item.amount,
      category: item.category,
      description: item.description,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      associatedWallet: walletMap.get(item.associatedWallet) || item.associatedWallet,
      repeat: item.repeat ? "Yes" : "No",
      repeatFrequency: item.repeatFrequency || "",
      endAfterFrequency: item.endAfterFrequency || "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
    const filename = `transaction-history-${new Date().toISOString().slice(0, 10)}.xlsx`;
    XLSX.writeFile(workbook, filename);
  };

  return (
    
    <HomeTemplate>
      <AnimatePresence  wait>
     <motion.div   key={location.pathname} initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition} className="flex flex-col gap-y-5 w-full max-w-6xl mx-auto">
      <div className="w-full mt-8">

        <ProfileInfo src={profileDetail.avatar} name={profileDetail.name}/>
      </div>
    <div className="flex flex-col w-full rounded-3xl bg-white border border-[#EFE7DA] shadow-lg px-4 py-3 gap-y-5">
        {
          settings.map((item, index) => (
            <div
              key={index}
              className={`flex items-center w-full px-2 cursor-pointer gap-x-5 py-3 ${index !== 2 ? "border-b border-[#EFE7DA]" : ""}`}
              onClick={() => {
                if (item.title === "Export") {
                  downloadHistory();
                } else {
                  navigate(item.path);
                }
              }}
            >
              <img src={item.icon} alt={item.title} />
              <p>{item.title}{item.title === "Export" && isDownloading ? " (downloading...)" : ""}</p>
            </div>
          ))
        } 
         <Drawer>
  <DrawerTrigger><div className={`flex items-center w-full px-2 cursor-pointer gap-x-5 py-3`} >
              <img src={"/icons/logout.svg"} alt={'logout'} />
              <p>logout</p>
            </div></DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Logout ?</DrawerTitle>
      <DrawerDescription className="text-lg">Are you shure you wanna logout ?</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
    
      <DrawerClose>
        <div className="flex justify-around">
        <button className="bg-[#EEE5FF] text-xl font-semibold px-10 py-3 text-[#7F3DFF] rounded-xl">Cancel</button>
        <button className="bg-[#7F3DFF] text-white text-xl font-semibold px-10 py-3 rounded-xl" onClick={logouttheuser}>Logout</button>

        </div>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>

        {/* Map the setting  */}
     </div>
     </motion.div>
     </AnimatePresence>
    </HomeTemplate>
  );
}

export default Profile;
