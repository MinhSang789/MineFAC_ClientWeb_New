import request from "./request"

export class StakingPackageService {
  static async getListStakingPackage(data = {
    skip: 0,
    limit: 20
  }) {
    return new Promise(resolve => {
      request.send({
        method: 'POST',
        path: 'StakingPackage/user/getList',
        data
      }).then((result = {}) => {
        const { statusCode, data: { data }, message, error } = result

        if (statusCode === 200) {
          return resolve({ isSuccess: true, data })
        } else {
          return resolve({ isSuccess: false, message, error })
        }
      })
    })
  }

  static async requestStaking(data) {
    return new Promise(resolve => {
      request.send({
        method: 'POST',
        path: 'StakingPackage/user/requestStaking',
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

  static async getHistoryStaking(data) {
    return new Promise(resolve => {
      request.send({
        method: 'POST',
        path: 'StakingPackage/user/historyStaking',
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
}