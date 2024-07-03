export const giveBalance = (wallets) => {
    let balance = 0 
        wallets.map(wallet =>{
           balance += wallet.balance
        })
        return balance
}