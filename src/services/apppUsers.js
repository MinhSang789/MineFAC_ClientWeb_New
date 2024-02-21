import Request from './request'

export default class AppUsers {

  static async getDetailUserById(data = {}) {
    return new Promise(resolve => {
      Request.send({
        method: 'POST',
        path: 'AppUsers/getDetailUserById',
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

  static async changePasswordUser(data = {}) {
    return new Promise(resolve => {
      Request.send({
        method: 'POST',
        path: 'AppUsers/changePasswordUser',
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
  static async changeSecondPasswordUser(data = {}) {
    return new Promise(resolve => {
      Request.send({
        method: 'POST',
        path: 'AppUsers/user/changeSecondaryPassword',
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

  static async updateInfoUser(data = {}) {
    return new Promise(resolve => {
      Request.send({
        method: 'POST',
        path: 'AppUsers/updateInfoUser',
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

  static async requestVerifyKYC(data = {}) {
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
  static async get2FACode(data = {}) {
    return new Promise(resolve => {
      Request.send({
        method: 'GET',
        path: `AppUsers/get2FACode?appUserId=${data.id}`,
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
  static async verify2FA(data = {}) {
    return new Promise(resolve => {
      Request.send({
        method: 'POST',
        path: 'AppUsers/verify2FA ',
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