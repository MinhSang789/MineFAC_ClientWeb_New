import Request from './request'

export default class SystemConfiguration {
   
    static async systemConfigurationFind(data = {}) {
        return new Promise(resolve => {
            Request.send({
                method: 'POST',
                path: 'SystemConfigurations/user/getDetail',
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