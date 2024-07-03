import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BackTexttemplate from "@/utils/BackTexttemplate";
import { Progress } from "@/components/ui/progress";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelector } from "react-redux";
import { getMonthRange } from "@/utils/getMonthRange";
import { monthsOfTheYear } from "@/utils/month";
import { useCategoryWiseIAndE } from "@/reactQuery/queryMutatuion";
import MyResponsivePie from "@/utils/ResponsivePi";
import { categoryToColor } from "@/utils/categoryToColor";
import CategoryBatch from "@/utils/CategoryBatch";
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
  },
};
const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};
function FinancialReport() {
  let createdAt = useSelector((store) => store.user.user.createdAt);
  let createdAtDate = new Date(createdAt);
  let today = new Date();
  let [month, setMonth] = useState(monthsOfTheYear[new Date(today).getMonth()]);
  let [isExpense, setIsExpense] = useState(true);
  let [expense,setExpense] = useState(0)
  let [income, setIncome] = useState(0)
  let [category, setCategory] = useState([]);
  let [total, setTotal] = useState(0)
  let wallets = useSelector((store) => store?.user?.user?.wallets);
  let { mutateAsync: categoryData, isPending } = useCategoryWiseIAndE();
  let data = [];
  useEffect(() => {
    let call = async () => {
      let categorys = await categoryData({ wallets, month });
      console.log(categorys);
      setCategory(categorys?.data?.data?.filteredResults);
      setExpense(categorys?.data?.data?.expense)
      setIncome(categorys?.data?.data?.income)
    };
    call();
  }, []);

  let categoryToData = (data, isExp) => {
    let editedData = [];
    data.map((item) => {
      if (isExp == true) {
        item.type == "E" &&
          editedData.push({
            id: item.category,
            label: item.category,
            value: Number(item.total),
            color: categoryToColor[item.category],
          });
        
      } else {
        item.type == "I" &&
          editedData.push({
            id: item.category,
            label: item.category,
            value: Number(item.total),
            color: categoryToColor[item.category],
          });
      }
    });
    console.log(editedData);
    return editedData;
  };

  return (
    <BackTexttemplate header={"Financial Report"}>
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="flex flex-col w-[90%] m-auto "
      >
        <div className="flex justify-start">
          <Select
            value={month}
            onValueChange={(e) => {
              setMonth(e);
            }}
          >
            <SelectTrigger className="w-28">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {/* get the list of months from today month to account createdAt month */}
              {getMonthRange(createdAtDate, today).map((month, index) => (
                <SelectItem key={index} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Pie chart for financial report */}
        <div className="w-full h-[24rem]">
          {/* TODO: Implement pie chart */}

          <MyResponsivePie
            data={categoryToData(category, isExpense)}
            CenteredMetric={isExpense ? expense :income}
          ></MyResponsivePie>
          {/* TODO: Understand the how toggle css and html design logic work */}
          <div className="toggle-button w-full">
            <div
              className={`toggle-option ${isExpense ? "active" : ""}`}
              onClick={() => setIsExpense(true)}
            >
              Expense
            </div>
            <div
              className={`toggle-option ${!isExpense ? "active" : ""}`}
              onClick={() => setIsExpense(false)}
            >
              Income
            </div>
            <div
              className={`toggle-indicator ${isExpense ? "expense" : "income"}`}
            />
          </div>
          <div className="flex flex-col mt-7 mb-5 gap-y-7">
            {/* <CategoryBatch color={'red'} category={'food'}/> */}
            {categoryToData(category, isExpense).map((item, index) => {
              console.log('expense',expense);
              let value = (item.value/(isExpense ? expense : income))*100
              return (
                <div className="flex flex-col gap-y-4 " key={index}>
                  <div className="flex justify-between items-center">
                    <CategoryBatch color={item.color} category={item.label} />
                    <p
                      className={`${
                       isExpense
                          ? "text-[#FD3C4A] font-semibold text-lg"
                          : "text-[#00A86B] font-semibold text-lg"
                      } `}
                    >
                      {" "}
                      {isExpense  ? "-₹" : "+₹"}
                      {item.value}
                    </p>
                  </div>
                  {/* progress bar */}
                  <div>
                    
                   <Progress value={value} color={item.color}  className="" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </BackTexttemplate>
  );
}

export default FinancialReport;
