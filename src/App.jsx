import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import {
  useGetIncomeAndExpense,
  useGetWalletByIdMutation,
  useRefreshAccessToken,
  useVerifyAccessTOken,
} from "./reactQuery/queryMutatuion";

import { useDispatch } from "react-redux";
import { addAllWallet, login } from "./store/userSlice";
import { setIncomeAndExpense } from "./store/userSlice";
function App() {
  const {
    mutateAsync: verifyAccessToken,
    isPending: isVerifying,
    isError: isVerifyError,
  } = useVerifyAccessTOken();

  const {
    mutateAsync: refreshToken,
    isPending: isRefreshingToken,
    isError: isRefreshError,
  } = useRefreshAccessToken();
  let user = useSelector((store) => store.user.isLoggedIn);
  let userDetail = useSelector((store) => store.user);
  let {
    mutateAsync: getWalletsByUserId,
    isPending: isWalletPending,
    isError: isWalletErrorGetting,
  } = useGetWalletByIdMutation();
  let dispatch = useDispatch();
  let {
    mutateAsync: getIncomeAndExpense,
    isPending: isReceivingIncomeandExpense,
  } = useGetIncomeAndExpense();
  let navigate = useNavigate();
  useEffect(() => {
    let check = async () => {
      if (!user) {
       
        let detail = await verifyAccessToken();
        let refreshT;
        if (!detail) {
          refreshT = await refreshToken();
        }
      

        if (!(detail?.data?.data || refreshT?.data?.data)) {
          navigate("/login");
        }

        dispatch(
          login({
            name: detail?.data?.data?.name || refreshT.data?.data?.data?.name,
            email:
              detail?.data?.data?.email || refreshT.data?.data?.data?.email,
            id: detail?.data?.data?.id || refreshT.data?.data?.data?.id,
            avatar:
              detail?.data?.data?.avatar || refreshT.data?.data?.data?.avatar,
              createdAt : detail?.data?.data?.createdAt || refreshT.data?.data?.data?.createdAt
          })
        );
        let id = detail?.data?.data?.id || refreshT.data?.data?.data?.id;

    
        let walletList = await getWalletsByUserId(id);
        console.log("wallet list", walletList);

      dispatch(addAllWallet(walletList.data.data))
      // let dataOfIncome = await  getIncomeAndExpense(walletList.data.data)
      // dispatch(setIncomeAndExpense(dataOfIncome?.data?.message))
      if (walletList.data.data == 0) {
        navigate("/lets-setup");
      }
      }
    };
    check();
  }, [user, navigate, userDetail, dispatch, verifyAccessToken, getWalletsByUserId, getIncomeAndExpense, refreshToken]);

  //useeffect for checkinh weather user has wallet ?

 
  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default App;
