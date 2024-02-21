import Request from './request'

export default class CustomerService {
  static async getListNotification(data = {}) {
    return new Promise(resolve => {
        Request.send({
            method: 'POST',
            path: 'CustomerMessage/user/getListNotification',
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
  static async readNotification(data = {}) {
    return new Promise(resolve => {
        Request.send({
            method: 'POST',
            path: 'CustomerMessage/user/readNotification',
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
  static async deleteNotification(data = {}) {
    return new Promise(resolve => {
        Request.send({
            method: 'POST',
            path: 'CustomerMessage/user/deleteNotification',
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
  static async getDetailMessage(data = {}) {
    return new Promise(resolve => {
        Request.send({
            method: 'POST',
            path: 'CustomerMessage/user/getDetailMessage',
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
  static async getUnreadNotificationCount(data = {}) {
    return new Promise(resolve => {
        Request.send({
            method: 'POST',
            path: 'CustomerMessage/user/getUnreadNotificationCount',
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