import Request from './request'

export default class PaymentMethod {
   
    static async getList(data = {}) {
        return new Promise(resolve => {
            Request.send({
                method: 'POST',
                path: 'PaymentMethod/user/getList',
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
    static async requestWithdrawExternal(data = {}) {
        return new Promise(resolve => {
            Request.send({
                method: 'POST',
                path: 'PaymentExternalTransaction/user/requestWithdrawExternal',
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
    static async requestDepositExternal(data = {}) {
        return new Promise(resolve => {
            Request.send({
                method: 'POST',
                path: 'PaymentExternalTransaction/user/requestDepositExternal',
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
    static async loginExternal(data = {}) {
        const dataString = window.localStorage.getItem('data')
        let token = undefined;
        if(dataString){
          const newData =  JSON.parse(dataString)
          token = `Bearer ${newData.token}`;
        }
        data.token = token;
        return new Promise(resolve => {
          Request.send({
            method: 'POST',
            path: '/AppUsers/loginExternal',
            data,
            headers: undefined,
            newUrl: "https://pts.cdn.finetwork.io/AppUsers/loginExternal"
          }).then((result = {}) => {
            const { statusCode, data, message } = result
            if (statusCode === 200) {
              return resolve({ isSuccess: true, data })
            } else {
              return resolve({ isSuccess: false, message })
            }
          })
        })
      }
}