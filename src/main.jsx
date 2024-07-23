import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import "./index.css";
import { RouterProvider, createBrowserRouter, useLocation } from "react-router-dom";
import LoadingLogo from "./components/Loaders/LoadingLogo.jsx";
import LoginSignup from "./components/onBoardLogin/loginSignup.jsx";
import SignUp from "./components/signup/SignUp.jsx";
import Verification from "./components/Verification.jsx";
import Login from "./components/Login/Login.jsx";
import LetsSetup from "./components/LetsSetup.jsx";
import CreateNewWallete from "./components/newWallet/CreateNewWallete.jsx";
import HomeTemplate from "./utils/HomeTemplate.jsx";
import Home from "./components/Home/Home.jsx";
import AddIncome from "./components/AddIncome/AddIncome.jsx";
import AddExpense from "./components/Addexpense/AddExpense.jsx";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import QueryProvider from "./reactQuery/QueryProvider.jsx";
import OTPInput from "react-otp-input";
import AllTransaction from "./pages/AllTransaction.jsx";
import Budget from "./pages/Budget.jsx";
import Profile from "./pages/Profile.jsx";
import Transfer from "./components/Transfer.jsx";
import Wallets from "./components/Wallets.jsx";
import { AnimatePresence } from "framer-motion";
import FinancialReport from "./pages/FinancialReport.jsx";



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
      {
        path: "/otp-Verification/:email",
        element: <Verification />,
      },
      {
        path : "/add-expense",
        element : <AddExpense />,
      },
      {
        path : '/add-income',
        element : <AddIncome/>
      },{
        path : "/lets-setup",
        element : <LetsSetup/>
      },
      {
        path : "/create-new-wallet",
        element : <CreateNewWallete/>
      },
      {
        path : "/all-transaction",
        element : <AllTransaction/>
      },
      {
        path : "/budget",
        element : <Budget/>
      },
      {
        path : "/profile",
        element : <Profile/>,
        
      },
      {
        path : "/wallets",
        element : <Wallets/>
      },
      {
        path : "/transfer",
        element : <Transfer/>
      },
      {
        path : "/financial-report",
        element : <FinancialReport/>,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(

  
  <React.StrictMode>
    <AnimatePresence wait>
    <QueryProvider>
      <Provider store={store} location={location} key={location.pathname}>
        <RouterProvider router={router} />
      </Provider>
    </QueryProvider></AnimatePresence>
  </React.StrictMode>
);
