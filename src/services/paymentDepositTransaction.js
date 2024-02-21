import Request from './request'

export default class PaymentDepositTransaction {

    static async insert(data = {}) {
        return new Promise(resolve => {
            Request.send({
                method: 'POST',
                path: 'PaymentDepositTransaction/insert',
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

    static async requestDeposit(data = {}) {
        return new Promise(resolve => {
            Request.send({
                method: 'POST',
                path: 'PaymentDepositTransaction/user/requestDepositUSDTDirect',
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

    static async depositHistory(data = {}) {
        return new Promise(resolve => {
            Request.send({
                method: 'POST',
                path: 'PaymentDepositTransaction/user/depositHistory',
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

    static async viewHistoryFAC(data = {}) {
        return new Promise(resolve => {
            Request.send({
                method: 'POST',
                path: 'WalletRecord/user/viewHistoryFAC',
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

    static async viewHistoryPOINT(data = {}) {
        return new Promise(resolve => {
            Request.send({
                method: 'POST',
                path: 'WalletRecord/user/viewHistoryPOINT',
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

    static async bonusHistory(data = {}) {
        return new Promise(resolve => {
            Request.send({
                method: 'POST',
                path: 'PaymentBonusTransaction/user/bonusHistory',
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

    static async viewHistoryBTC(data = {}) {
        return new Promise(resolve => {
            Request.send({
                method: 'POST',
                path: 'WalletRecord/user/viewHistoryBTC',
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