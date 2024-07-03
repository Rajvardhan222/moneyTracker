import HomeTemplate from "@/utils/HomeTemplate";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Tag from "@/utils/Tag";
import ThemeButton from "@/utils/ThemeButton";
import { useGetInfiniteFilteredTransactions } from "@/reactQuery/queryMutatuion";
import Transaction from "@/utils/Transaction";
import { useInView } from "react-intersection-observer";
import { Loader2Icon } from "lucide-react";
import { useSelector } from "react-redux";
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";

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

function AllTransaction() {
  const { ref, inView } = useInView();
  let [filterBy, setFilterBy] = useState(null);
  let [sortBy, setSortBy] = useState(null);
  let [month, setmonth] = useState(getCurrentMonthName());
  let [categorys, setCategory] = useState(null);
  const filterByList = ["Income", "Expense", "Transfer"];
  const sortByList = ["Newest", "Oldest", "Highest", "Lowest"];
  let category = [
    "Food",
    "Travel",
    "Education",
    "Entertainment",
    "Business",
    "Cloths",
    "Grocery",
    "Vegetable",
  ];
  let navigate = useNavigate()
  const allWallet = useSelector((store) => store.user.user.wallets);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useGetInfiniteFilteredTransactions({
      filterBy: filterBy?.charAt(0),
      orderBy: sortBy == "Newest" || sortBy == "Highest" ? "DESC" : "ASC",
      filterByCategory: categorys,
      forOrder:
        sortBy == "Newest"
          ? "createdAt"
          : sortBy == "Oldest"
          ? "createdAt"
          : "amount",
      month: month !== "Month" ? month : null,
      wallets: allWallet,
    });
  console.log("data of trans", data?.pages?.data?.data?.length);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  function getCurrentMonthName() {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const today = new Date();
    const monthIndex = today.getMonth();

    return monthNames[monthIndex];
  }
  console.log(data?.pages);
  return (
    <HomeTemplate>
      <motion.div initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition} className="flex flex-col w-full">
        <div className="flex  items-center justify-between m-auto py-4 w-[90%] ">
          <div>
            <Select
              value={month}
              onValueChange={(e) => {
                setmonth(e);
              }}
            >
              <SelectTrigger className="w-28">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="January">January</SelectItem>
                <SelectItem value="February">February</SelectItem>
                <SelectItem value="March">March</SelectItem>
                <SelectItem value="April">April</SelectItem>
                <SelectItem value="May">May</SelectItem>
                <SelectItem value="June">June</SelectItem>
                <SelectItem value="July">July</SelectItem>
                <SelectItem value="August">August</SelectItem>
                <SelectItem value="September">September</SelectItem>
                <SelectItem value="October">October</SelectItem>
                <SelectItem value="November">November</SelectItem>
                <SelectItem value="December">December</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="p-2 border border-[#F1F1FA] rounded-2xl  shadow-sm ">
            <Drawer>
              <DrawerTrigger>
                <img src="/icons/filter.svg" />
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>
                    <div className="flex flex-col gap-y-6">
                      <div className="flex items-center justify-between m-auto w-full">
                        <p>Filter transaction</p>
                        <Tag
                          name={"reset"}
                          isActive={true}
                          onClick={() => {
                            setFilterBy(null);
                            setSortBy(null);
                            setCategory(null);
                          }}
                        ></Tag>
                      </div>
                      <div className="flex flex-col  items-start gap-y-5  ">
                        <p>Filter By</p>
                        <div className="flex gap-x-3">
                          {filterByList.map((item, index) => {
                            return (
                              <Tag
                                key={index}
                                isActive={filterBy == item ? true : false}
                                name={item}
                                onClick={(e) => {
                                  setFilterBy(item);
                                  console.log(e.target.value);
                                }}
                              ></Tag>
                            );
                          })}
                        </div>
                      </div>
                      <div className="flex flex-col  items-start gap-y-5  ">
                        <p>Sort By</p>
                        <div className="grid grid-rows-2 grid-cols-3 gap-3 gap-y-5">
                          {sortByList.map((item, index) => {
                            return (
                              <Tag
                                key={index}
                                name={item}
                                onClick={() => {
                                  setSortBy(item);
                                }}
                                isActive={sortBy == item ? true : false}
                              ></Tag>
                            );
                          })}
                        </div>
                      </div>
                      <div className="flex gap-y-7 flex-col items-start">
                        <p>Category</p>
                        <div>
                          <Select
                            value={categorys}
                            onValueChange={(e) => {
                              setCategory(e);
                              console.log(e);
                            }}
                          >
                            <SelectTrigger className="w-80">
                              <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                              {category.map((item, index) => {
                                return (
                                  <SelectItem key={index} value={item}>
                                    {item}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </DrawerTitle>
                </DrawerHeader>
                <DrawerFooter>
                  <DrawerClose>
                    <ThemeButton>Apply</ThemeButton>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
          <div className="flex cursor-pointer justify-between items-center bg-[#EEE5FF] py-4 px-2 w-[90%] m-auto mb-6 rounded-2xl text-[#7F3DFF]" onClick={()=>navigate('/financial-report')}>
            <p className="text-lg ml-5">See your financial report</p>
            <img src="/icons/rightArrow.svg"/>

          </div>
        <div className="flex mb-24 flex-col gap-y-4">
          {data?.pages?.map((detail, index) => {
            console.log(detail?.data?.data);
            return (
              <Transaction
                key={index}
                page={index}
                transactionDetail={detail?.data?.data}
              />
            );
          })}
          {data?.pages[0]?.data?.data.length == 0 && (
            <div className="flex items-center justify-center mt-32">
              <p className=" font-extrabold text-6xl text-center ml-2 text-black">
                No transaction found! 🥺
              </p>
            </div>
          )}
        </div>
        <div ref={ref}>
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
  );
}

export default AllTransaction;
