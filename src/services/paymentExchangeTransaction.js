import Request from './request'

export default class PaymentExchangeTransaction {
   
    static async exchangeFAC(data = {}) {
        return new Promise(resolve => {
            Request.send({
                method: 'POST',
                path: 'PaymentExchangeTransaction/user/ExchangeFAC',
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

    static async exchangePOINT(data = {}) {
        return new Promise(resolve => {
            Request.send({
                method: 'POST',
                path: 'PaymentExchangeTransaction/user/ExchangePOINT',
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

    static async userExchangeFACHistory(data = {}) {
        return new Promise(resolve => {
            Request.send({
                method: 'POST',
                path: 'PaymentExchangeTransaction/user/userExchangeFACHistory',
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

    static async userExchangePOINTHistory(data = {}) {
        return new Promise(resolve => {
            Request.send({
                method: 'POST',
                path: 'PaymentExchangeTransaction/user/userExchangePOINTHistory',
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

    static async receiveHistory(data = {}) {
        return new Promise(resolve => {
            Request.send({
                method: 'POST',
                path: 'PaymentExchangeTransaction/user/receiveHistory',
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

    static async viewExchangeHistory(data = {}) {
        return new Promise(resolve => {
            Request.send({
                method: 'POST',
                path: 'PaymentExchangeTransaction/user/viewExchangeRequests',
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

    static async acceptExchangeRequest(data = {}) {
        return new Promise(resolve => {
            Request.send({
                method: 'POST',
                path: 'PaymentExchangeTransaction/user/acceptExchangeRequest',
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
    static async denyExchangeRequest(data = {}) {
        return new Promise(resolve => {
            Request.send({
                method: 'POST',
                path: 'PaymentExchangeTransaction/user/denyExchangeRequest',
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

    static async cancelExchangeRequest(data = {}) {
        return new Promise(resolve => {
            Request.send({
                method: 'POST',
                path: 'PaymentExchangeTransaction/user/cancelExchangeRequest',
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