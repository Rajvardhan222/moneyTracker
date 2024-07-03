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
  return (
    
    <HomeTemplate>
      <AnimatePresence  wait>
     <motion.div   key={location.pathname} initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition} className="flex flex-col gap-y-5 ">
      <div className="w-[90%] m-auto mt-8">

        <ProfileInfo src={profileDetail.avatar} name={profileDetail.name}/>
      </div>
     <div className="flex flex-col w-[90%] m-auto rounded-3xl bg-[#ffffff] shadow-lg px-4 py-3 gap-y-5">
        {
          settings.map((item, index) => (
            <div key={index} className={`flex items-center w-full px-2 cursor-pointer  gap-x-5 py-2 ${index !== 2 ? "border-b-[1px]" : ""}`} onClick={()=>navigate(item.path)}>
              <img src={item.icon} alt={item.title} />
              <p>{item.title}</p>
            </div>
          ))
        } 
         <Drawer>
  <DrawerTrigger><div className={`flex items-center w-full px-2 cursor-pointer  gap-x-5 py-2`} >
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
