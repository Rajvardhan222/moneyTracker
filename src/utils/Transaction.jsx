import React from "react";
import { useNavigate } from "react-router-dom";
import { format, isThisYear, isToday } from "date-fns";
function Transaction({ transactionDetail, key,page }) {
  const navigate = useNavigate();
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
      className="flex justify-between items-center w-full px-4 sm:px-5 py-3 rounded-2xl bg-white border border-[#EFE7DA] shadow-sm cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => navigate(`/detail/${detail.id}`)}
    >
      <div className="flex gap-x-4 items-center">
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
