import { createSlice } from "@reduxjs/toolkit";

let initialUser = {
    user : {
        name : "",
        email : "",
        id : null,
        wallets : [],
        avatar : null,
        createdAt : null,

    },
    balance : null,
    isLoggedIn : false,
    Income : null,
    Expense : null,

}

export let userSlice = createSlice(
    {
        name : "user",
        initialState : initialUser,
        reducers : {
          login : (action,payload) => {
            action.isLoggedIn = true;
            console.log(payload);
            action.user.name = payload.payload.name;
            action.user.email = payload.payload.email;
            action.user.id = payload.payload.id;
            action.user.avatar = payload.payload.avatar;
            action.user.createdAt = payload.payload.createdAt;


          },
          logoutUser : (state,action) => {
            state.isLoggedIn = false;

          },
          addWallet : (state,action)=>{
            console.log("payload",action.payload.data);
                state.user.wallets.push(action.payload.data);
          },
          addAllWallet : (state,action)=>{
            state.user.wallets = []
            console.log(action.payload);
            action.payload.map(wallet => {
                state.user.wallets.push(wallet)
            })
          },
          updateBalanceToWallet : (state,action) => {
            const id = action.payload.id;
            const balance = action.payload.balance;
            console.log(id,balance);
            const index = state.user.wallets.findIndex(wallet => wallet.id === id);

            state.user.wallets[index].balance = balance

          },
          setIncomeAndExpense : (state,action) => {
            console.log(action.payload);
            state.Income = action.payload.Income
            state.Expense = action.payload.Expense
          }
        }
    }
)

export const {login,addWallet,addAllWallet,updateBalanceToWallet,setIncomeAndExpense,logoutUser} = userSlice.actions

export default userSlice.reducer;