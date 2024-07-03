import React from "react";
import { format, isThisYear, isToday } from "date-fns";
function Transaction({ transactionDetail, key,page }) {
  const formatDate = (date) => {
    if (isToday(date)) {
      return format(date, "hh:mm a");
    } else if (isThisYear(date)) {
      return format(date, "hh:mm a, dd");
    } else {
      return format(date, "yyyy-MM-dd hh:mm a");
    }
  };
console.log(transactionDetail);
  return transactionDetail?.map((detail, index) => {
  return  <div
      key={`${page}-${index}`}
      className="flex justify-between items-center w-[90%] m-auto"
    >
      <div className="flex gap-x-6">
        <img src={`/icons/${detail.category}.svg`} />
        <div className="flex flex-col gap-y-2">
          <p className="text-lg font-semibold">{detail.category}</p>
          <p className="text-[#91919F] font-semibold">{detail.description}</p>
        </div>
      </div>
      <div className="flex flex-col gap-y-2 text-center">
        <p
          className={`${
            detail.type == "E"
              ? "text-[#FD3C4A] font-semibold text-lg"
              : "text-[#00A86B] font-semibold text-lg"
          } `}
        >
          {" "}
          {detail.type == "E" ? "-₹" : "+₹"}
          {detail.amount}
        </p>
        <p className="text-[#91919F] font-semibold">
          {formatDate(detail.createdAt)}
        </p>
      </div>
    </div>;
  });
}

export default Transaction;
