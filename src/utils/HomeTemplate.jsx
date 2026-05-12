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
      <div className="fixed left-1/2 -translate-x-1/2 bottom-4 z-40 w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] lg:w-[calc(100%-5rem)]">
        <div className="relative flex p-4 justify-around items-center bg-white border border-[#EFE7DA] shadow-lg rounded-3xl">
        {navigation.map((nav, index) => {
          if (nav.name === "") {
            return (
              <button
                key={index}
                type="button"
                className="flex flex-col items-center"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <img
                  src={nav.path}
                  width={40}
                  className={`m-auto duration-150 ${
                    isMenuOpen ? "rotate-45 -translate-y-3 scale-110" : ""
                  }`}
                />
              </button>
            );
          }

          return (
            <NavLink
              key={index}
              to={nav.nav}
              className={({ isActive }) =>
                isActive ? "active-link-class" : "inactive-link-class"
              }
            >
              {({ isActive }) => (
                <div className="flex flex-col">
                  <img
                    src={isActive ? nav.path2 : nav.path}
                    width={34}
                    className="m-auto duration-150"
                  />
                  <p
                    className={`text-sm ${
                      isActive
                        ? "text-[#7F3DFF] font-semibold"
                        : "text-[#B8B0A6] font-semibold"
                    }`}
                  >
                    {nav.name}
                  </p>
                </div>
              )}
            </NavLink>
          );
        })}

          <div
            className={`absolute left-1/2 -translate-x-1/2 flex items-center gap-3 sm:gap-4 transition-all duration-200 ${
              isMenuOpen ? "-translate-y-24 opacity-100" : "-translate-y-10 opacity-0 pointer-events-none"
            }`}
          >
            <button
              type="button"
              className="bg-[#00A86B] border border-[#E8DFD0] p-3 rounded-full shadow-md"
              onClick={() => navigate('/add-income')}
            >
              <img src="/icons/incomewhite.svg" />
            </button>
            <button
              type="button"
              className="bg-[#0077FF] border border-[#E8DFD0] p-3 rounded-full shadow-md"
              onClick={() => navigate('/transfer')}
            >
              <img src="/icons/transferIcon.svg" />
            </button>
            <button
              type="button"
              className="bg-[#FD3C4A] border border-[#E8DFD0] p-3 rounded-full shadow-md"
              onClick={() => navigate('/add-expense')}
            >
              <img src="/icons/expensewhite.svg" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeTemplate;
