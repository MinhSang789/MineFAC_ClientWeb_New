import Request from './request'

export default class PaymentServicePackage {

    static async historyServicePackage(data = {}) {
        return new Promise(resolve => {
            Request.send({
                method: 'POST',
                path: 'PaymentServicePackage/user/historyServicePackage',
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

    static async getUserServicePackage(data = {}) {
        return new Promise(resolve => {
            Request.send({
                method: 'POST',
                path: 'PaymentServicePackage/user/getUserServicePackage',
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

    static async getList(data = {}) {
        return new Promise(resolve => {
            Request.send({
                method: 'POST',
                path: 'PaymentServicePackage/user/getList',
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

    static async getListPackageHome(data = {}) {
        return new Promise(resolve => {
            Request.send({
                method: 'POST',
                path: 'PaymentServicePackage/user/getList',
                data,
                disableAuth: true
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

    static async buyServicePackage(data = {}) {
        return new Promise(resolve => {
            Request.send({
                method: 'POST',
                path: 'PaymentServicePackage/user/buyServicePackage',
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

    static async activateServicePackage(data = {}) {
        return new Promise(resolve => {
            Request.send({
                method: 'POST',
                path: 'PaymentServicePackage/user/activateServicePackage',
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

    static async collectServicePackage(data = {}) {
        return new Promise(resolve => {
            Request.send({
                method: 'POST',
                path: 'PaymentServicePackage/user/collectServicePackage',
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

    static async userGetListBranch(data = {}) {
        return new Promise(resolve => {
            Request.send({
                method: 'POST',
                path: 'PaymentServicePackage/user/userGetListBranch ',
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