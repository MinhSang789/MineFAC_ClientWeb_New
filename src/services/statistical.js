import Request from './request'

export default class Statistical {
    static async userSummaryReferUser(data = {}) {
        return new Promise(resolve => {
            // @ts-ignore
            Request.send({
                method: 'POST',
                path: 'Statistical/user/summaryReferUser',
                data
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