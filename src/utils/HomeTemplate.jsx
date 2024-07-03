import React, { useState } from "react";
import Select from "./Select";
import { navigation } from "./navigation";
import { NavLink, useNavigate } from "react-router-dom";

function HomeTemplate({ children }) {
  let [isMenuOpen, setIsMenuOpen] = useState(false);
let navigate = useNavigate()
  return (
    <>
      {children}
      <div className="fixed flex bg-white bottom-0 p-4 justify-around w-full items-center z-40">
        {navigation.map((nav, index) => {
          return (
            <NavLink
      key={index}
      to={nav.nav}
      className={({ isActive }) =>
        isActive ? 'active-link-class' : 'inactive-link-class'
      }
    >
      {({ isActive }) => (
        <div
          className="flex flex-col"
          onClick={() => {
            nav.name === "" ? setIsMenuOpen(!isMenuOpen) : "";
            console.log(isMenuOpen);
          }}
        >
          <img
            src={isActive ? nav.path2 : nav.path}
            width={36}
            className={`m-auto duration-150  ${
              nav.name === "" && isMenuOpen ? "rotate-45 backdrop-blur-xl -translate-y-4 scale-125" : null
            }`}
          />
          <p className={`text-sm ${isActive ? "text-[#7F3DFF] font-semibold" : " text-[#C6C6C6] font-semibold"}`}>{nav.name}</p>
        </div>
      )}
    </NavLink>
          );
        })}

        <div
          className={`z-10 flex   absolute gap-x-7 duration-150 left-[34%] ${
            isMenuOpen == false ? "-bottom-12" : "bottom-24"
          } `}
        >
          <div className="bg-[#00A86B]  relative p-2 rounded-full " onClick={()=> navigate('/add-income')}>
            <img src="/icons/incomewhite.svg" />
          </div>
          <div className="bg-[#FD3C4A] p-2 rounded-full ml-10" onClick={()=> navigate('/add-expense')}>
            <img src="/icons/expensewhite.svg" />
          </div>
          <div
            className={`absolute duration-150  p-2 rounded-full  bg-[#0077FF] ${
              isMenuOpen == true ? "left-14" : "-bottom-28"
            }`}  onClick={()=> navigate('/transfer')}
          >
            <img src="/icons/transferIcon.svg" />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeTemplate;
