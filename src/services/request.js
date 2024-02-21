import axios from 'axios'
import { HOST } from './../constants/url'
import { message } from 'antd';
import React from 'react';

import {
  getQueryString,
} from '../helper/common'
import { FormattedMessage } from 'react-intl';

function send({
  method = 'get', path, data = null, query = null, headers = {}, newUrl, disableAuth
}) {
  return new Promise((resolve) => {
    let url = HOST + `${path}${getQueryString(query)}`
    if (newUrl) {
      url = `${newUrl}${getQueryString(query)}`
    }
    const dataString = window.localStorage.getItem('data')
    if(!disableAuth && dataString){
      const newData =  JSON.parse(dataString)
      headers.authorization =`Bearer ${newData.token}`
    }
    axios({
      method, url, data, headers,
    })
      .then((result) => {
        const data = result.data
        return resolve(data)
      })
      .catch((error) => {
        const {response ={}} = error
        
        const result = response.data ? response.data :null
        
        if (!result) {
          return resolve({statusCode: 404, message: ""})
        }
        else {
          const { statusCode, message: data } = result
          
          //"{statusCode: 505, error: ""Unauthorized"", message: ""An internal server unauthorized""}
          // Nếu server trả về JSON trên thì cũng redirect ra ngoài login.
          // Đây là trường hợp user đang sử dụng mà bị khóa"
          if (statusCode === 401 || statusCode === 505) {
            message.warn(data || (<FormattedMessage id='something_wrong' />) )
            setTimeout(()=>{
              window.localStorage.clear()
              window.location.href = '/login'
            },1000)
          }
          else if (
            (statusCode === 401 && data === 'Unauthorized') || (statusCode === 403 && data === 'InvalidToken')) {
              // window.localStorage.clear()
              // window.location.href = '/'
            
          }
         
          else {
            return resolve(result)
          }
        }
      })
  })
}

export default {
  send,
}
