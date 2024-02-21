import Request from './request'

export default class LoginService {
    static async Signin(data = {}) {
        return new Promise(resolve => {
            Request.send({
                method: 'POST',
                path: 'AppUsers/loginByEmail',
                data
            }).then((result = {}) => {
                const { statusCode, data, message, error } = result

                if (statusCode === 200) {
                    return resolve({ isSuccess: true, data })
                } else {
                    return resolve({ isSuccess: false, message, error })
                }
            })
        })
    }
    static async sendEmailOTP(data = {}) {
        return new Promise(resolve => {
            Request.send({
                method: 'POST',
                path: 'AppUsers/user/sendEmailOTP',
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
    static async verifyOtp(data = {}) {
        return new Promise(resolve => {
            Request.send({
                method: 'POST',
                path: 'AppUsers/confirmEmailOTP',
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
    static async verify2Fa(data = {}) {
        return new Promise(resolve => {
            Request.send({
                method: 'POST',
                path: 'AppUsers/verify2FA',
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
    static async Register(data = {}) {
        return new Promise(resolve => {
            Request.send({
                method: 'POST',
                path: 'AppUsers/registerUserByEmail',
                data
            }).then((result = {}) => {
                const { statusCode, data, message, error } = result

                if (statusCode === 200) {
                    return resolve({ isSuccess: true, data })
                } else {
                    return resolve({ isSuccess: false, message: error })
                }
            })
        })
    }

    static async ForgotPass(data = {}) {
        return new Promise(resolve => {
            Request.send({
                method: 'POST',
                path: 'users/forgotPasswordOTP',
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

    static async ChangeUserPassWord(data = {}) {
        return new Promise(resolve => {
            Request.send({
                method: 'POST',
                path: 'users/change-password',
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
    static async setPassword(data = {}) {
        return new Promise(resolve => {
            Request.send({
                method: 'POST',
                path: 'users/set-password',
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

    static async verifyAccount(data = {}) {
        return new Promise(resolve => {
            Request.send({
                method: 'POST',
                path: 'AppUsers/user/checkExistingAccount',
                data
            }).then((result = {}) => {
                const { statusCode } = result

                if (statusCode === 200) {
                    return resolve({ isSuccess: true })
                } else {
                    return resolve({ isSuccess: false })
                }
            })
        })
    }

    static async verifyAccount(data = {}) {
        return new Promise(resolve => {
            Request.send({
                method: 'POST',
                path: 'AppUsers/user/checkExistingAccount',
                data
              }).then((result = {})=>{
                const { statusCode } = result
                 
                if(statusCode === 200) {
                    return resolve({ isSuccess: true })
                }else{
                    return resolve({ isSuccess: false })
                }
              })
        })
    }

    static async updatePass(data = {}) {
        return new Promise(resolve => {
            Request.send({
                method: 'POST',
                path: 'AppUsers/user/changePasswordviaEmailOTP',
                data
              }).then((result = {})=>{
                const { statusCode, error, message } = result
                 
                if(statusCode === 200) {
                    return resolve({ isSuccess: true })
                }else{
                    return resolve({ isSuccess: false, error })
                }
              })
        })
    }
}