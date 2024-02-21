
import Request from './request'

export default class Upload {

    static async uploadUserAvatar(data = {}) {
        return new Promise(resolve => {
            Request.send({
                method: 'POST',
                path: 'AppUsers/uploadAvatar',
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

    static async uploadImageIdentityCardBefore(data = {}) {
        return new Promise(resolve => {
            Request.send({
                method: 'POST',
                path: 'AppUsers/uploadImageIdentityCardBefore',
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

    static async uploadImageIdentityCardAfter(data = {}) {
        return new Promise(resolve => {
            Request.send({
                method: 'POST',
                path: 'AppUsers/uploadImageIdentityCardAfter',
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

    static async submitImageIdentityCard(data = {}) {
        return new Promise(resolve => {
            Request.send({
                method: 'POST',
                path: 'AppUsers/user/submitIdentity',
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