import Request from './request'

export default class walletBalanceUnit {
   
    static async getList(data = {}) {
        return new Promise(resolve => {
            Request.send({
                method: 'POST',
                path: 'WalletBalanceUnit/user/getList',
                data
              }).then((result = {})=>{
                const { statusCode, data, message } = result
                 
                if(statusCode === 200) {
                    return resolve( { isSuccess: true, data})
                }else{
                    return resolve({ isSuccess: false, message})
                }
              })
        })
    }
}