
import { apiClient } from "../ApiClient";

// add income

export const addIncome = async ({
  amount,
  category,
  description,
  associatedWallet,
}) => {
  try {
    let addIncome = await apiClient.post("/transaction/addIncome", {
      amount: amount,
      category: category,
      description: description,
      associatedWallet: associatedWallet,
    });

    return addIncome;
  } catch (error) {
    console.log(error);
  }
};

export const addExpense = async ({
  amount,
  category,
  description,
  associatedWallet,
}) => {
  try {
    let addExpense = await apiClient.post("/transaction/addExpense", {
      amount: amount,
      category: category,
      description: description,
      associatedWallet: associatedWallet,
    });

    return addExpense;
  } catch (error) {
    console.log(error);
  }
};

export const repeatTransaction = async ({
  endAftertime,
  repeatFrequency,
  amount,
  type,
  category,
  description,
  associatedWallet,
}) => {
  try {
    let repeatTransaction = await apiClient.post("/transaction/sch", {
      endAftertime: endAftertime,
      repeatFrequency: repeatFrequency,
      amount: amount,
      type: type,
      category: category,
      description: description,
      associatedWallet: associatedWallet,
    });

    return repeatTransaction;
  } catch (error) {
    console.log(error);
  }
};

export const transactionBetweenDate = async ({ pageParam = 0, queryKey }) => {
  const [_key, {tillDate ,wallets}] = queryKey
  let transList =await  apiClient.post("/transaction/sendTransactionBetween",{
      tillDate: tillDate,
      limit: 10,
      offset: pageParam,
      wallets
    })

    return transList;
}

export const getIncomeAndExpense = async (walletList) => {
  
     let incomeandE =await apiClient.post("/transaction/getIncome",{
        associatedWalletList : walletList
      })
      console.log(incomeandE);
      return incomeandE
}

export const getCategoryWiseIncomeAndexpense = async ({wallets,month}) => {
  
  let categoryWiseExpendeture =await apiClient.post("/transaction/categoryDetails",{
    wallets,month
  })
  console.log(categoryWiseExpendeture);
  return categoryWiseExpendeture
}

export const filterTransaction = async ({ pageParam = 0, queryKey }) => {
  const [_key, { filterBy, orderBy, filterByCategory, forOrder,month ,wallets}] = queryKey
  console.log({
    filterBy, orderBy, filterByCategory, forOrder,  limit: 10,
    offset: pageParam,
    });
  let transList =await  apiClient.post("/transaction/filterResult",{
    filterBy, orderBy, filterByCategory, forOrder,limit: 10,offset: pageParam,month,wallets
    })

    return transList;
}

export const transferMoney = async ({acc1Id,acc2Id,amount,description}) => {

  let transfer = await apiClient.post("/transaction/transfer",{
    acc1Id,acc2Id,amount,description,
  })

  return transfer

}
