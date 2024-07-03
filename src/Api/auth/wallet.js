import { apiClient } from "../ApiClient";

export const createWallet = async ({name,userId,type,balance})=>{
    try {
        console.log(name,userId,type,balance);
        let createWallet = await apiClient.post("/wallet/createWallet",{
            name : name,
            userId : userId,
            type : type,
            balance : balance,
        })

       if(!createWallet.data.success){
        throw new Error('failed to create wallet')
       }
        return createWallet
      
    } catch (error) {
        console.log("wallet || wallet.js || createWallet ", error)
    }
}

export const getWalletbyUserId = async(userId) =>{
try {
    console.log(userId);
    let wallet = await apiClient.post('/wallet/getUserwalletbyId',{
        userId: userId
    })

    return wallet
} catch (error) {
    console.log("wallet || wallet.js || getWalletById ", error)
}
}