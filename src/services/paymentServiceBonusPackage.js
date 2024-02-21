import Request from './request'
import { omit } from 'lodash';

export default class PaymentServiceBonusPackage {

    static async getListUserBuyPackage(data = {}) {
        return new Promise(resolve => {
            Request.send({
                method: 'POST',
                path: 'PaymentServicePackage/user/getListUserBuyPackage',
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
    static async activateServicePackage(data = {}) {
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

    static async completedServicePackage(data = {}) {
        return new Promise(resolve => {
            Request.send({
                method: 'POST',
                path: 'PaymentServicePackage/user/completedServicePackage',
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

    static async historyCompletedServicePackage(data = {}) {
        return new Promise(resolve => {
            let order = {
                key: "packageExpireDate",
                value: "desc"
            }
            data.order = order;
            Request.send({
                method: 'POST',
                path: 'PaymentServicePackage/user/historyCompletedServicePackage',
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

    static async historyCancelServicePackage(data = {}) {
        return new Promise(resolve => {
            Request.send({
                method: 'POST',
                path: 'PaymentServicePackage/user/historyCancelServicePackage',
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

    static async historyBonusServicePackage(data = {}) {
        return new Promise(resolve => {
            Request.send({
                method: 'POST',
                path: 'PaymentServicePackage/user/historyBonusServicePackage',
                data: omit(data, 'filter')
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

    static async historyMiningServicePackage(data = {}) {
        return new Promise(resolve => {
            Request.send({
                method: 'POST',
                path: 'BetRecords/user/getList',
                data: omit(data, 'filter')
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