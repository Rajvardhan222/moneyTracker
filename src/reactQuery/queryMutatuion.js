import {  addExpense, addIncome, filterTransaction, getIncomeAndExpense, repeatTransaction, transactionBetweenDate, transferMoney } from "@/Api/auth/transaction";
import { loginUser, refreshAccessTOken, regesterUser, regesterUserOtp, verifyAccessTOken } from "@/Api/auth/user";
import { createWallet, getWalletbyUserId } from "@/Api/auth/wallet";
import AddExpense from "@/components/Addexpense/AddExpense";
import { QueryCache, QueryClient, useInfiniteQuery, useMutation,useQuery,useQueryClient } from "@tanstack/react-query";
import {getCategoryWiseIncomeAndexpense} from "@/Api/auth/transaction";
export const useRegesterUserMutation = ()=>{
    return useMutation({
        mutationFn : (user) => regesterUser(user)
    })
}

export const useRegesterUserOtpMutation = ()=>{
    return useMutation({
        mutationFn : (user) => regesterUserOtp(user)
    })}

export const useLoginMutation = ()=>{

        return useMutation({
            mutationFn : (user) => loginUser(user),
            onError : (err) => {
                console.log("Error in login",err)
            }
        })
    }

export const useVerifyAccessTOken = ()=>{

        return useMutation({
            mutationKey : ["verifyAT"],
            mutationFn : () => verifyAccessTOken(),
           
        })
    }

export const useRefreshAccessToken = ()=>{

        return useMutation({
            mutationFn : () => refreshAccessTOken()
        })
    }

export const useCreateWalletMutation = ()=>{
    const QueryClient = useQueryClient()
    return useMutation({
        mutationFn : (data) => createWallet(data),
        mutationKey : ["createWallet"],
        onSuccess : () => {
           QueryClient.invalidateQueries({
            queryKey : ["verifyAT"]
           })
        }
       
    })
}

export const useGetWalletByIdMutation = ()=>{
    return useMutation({
        mutationFn : (id) => getWalletbyUserId(id)
    })
}

export const useAddIncomeMutation = ()=>{
    return useMutation({
        mutationFn : (id) => addIncome(id)
    })
}

export const useAddExpenseMutation = ()=>{
    return useMutation({
        mutationFn : (id) => addExpense(id)
    })
}

export const useRepeatTransaction = ()=>{
    return useMutation({
        mutationFn : (id) => repeatTransaction(id)
    })
}

export const useTransferMoney = ()=>{
    return useMutation({
        mutationFn : (id) => transferMoney(id),
        onError : (err) => {
           console.log(err);
        }
    })
}

export const useGetIncomeAndExpense = ()=>{
    return useMutation({
        mutationFn : (id) => getIncomeAndExpense(id)
    })
}

export const useCategoryWiseIAndE = ()=>{
    return useMutation({
        mutationFn : (id) => getCategoryWiseIncomeAndexpense(id)
    })
}

export const useGetInfiniteTransactions = ({tillDate,wallets})=>{
    return useInfiniteQuery({
        queryKey : ['getInfiniteTransaction',{tillDate:tillDate,wallets}],
        queryFn : transactionBetweenDate,
        getNextPageParam: (lastPage, allPages) => {
            console.log(lastPage, allPages);
            if (lastPage?.data?.message?.transactionBetween.length === 0) return undefined;
            return allPages.length * 10; 
        },
    })
}

export const useGetInfiniteFilteredTransactions = (filters)=>{
    return useInfiniteQuery({
        queryKey : ['getInfiniteTransaction',filters],
        queryFn : filterTransaction,
        getNextPageParam: (lastPage, allPages) => {
            console.log(lastPage.data.data, allPages);
            if (lastPage?.data?.data?.length === 0) return undefined;
            return allPages.length * 10; 
        },
    })
}