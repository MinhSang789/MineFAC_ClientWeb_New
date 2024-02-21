import Request from './request'

export default class LeaderBoard {
   
    static async getLeaderBoard(data = {}) {
        return new Promise(resolve => {
            Request.send({
                method: 'POST',
                path: 'LeaderBoard/user/getTopRank',
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