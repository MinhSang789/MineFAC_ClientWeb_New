
import { USER_LOGIN, USER_DETAILS_UPDATE, USER_RESET, USER_LOGIN_2FA } from '../constants/member'
import { INIT_FINISH } from '../constants/app'
let initialState = {
  isUserLoggedIn: !!window.localStorage.getItem('isUserLoggedIn'),
  isInitLoad: true
}
const data = window.localStorage.getItem('data')
if (data && data.length) {
  const newData = JSON.parse(data)
  initialState = {
    ...initialState,
    ...newData
  }
}
export default function userReducer(state = initialState, action) {

  switch (action.type) {
    case USER_LOGIN: {
      if (action.data) {
        window.localStorage.setItem('isUserLoggedIn', true)
        window.localStorage.setItem('data', JSON.stringify(action.data))
        return {
          ...state,
          ...action.data,
          isUserLoggedIn: true
        }
      }
      return {}
    }
    case USER_LOGIN_2FA: {
      if (action.data) {
        // window.localStorage.setItem('isUserLoggedIn', true)
        window.localStorage.setItem('data', JSON.stringify(action.data))
        return {
          ...state,
          ...action.data,
          isUserLoggedIn: true
        }
      }
      return {}
    }
    case USER_DETAILS_UPDATE: {
      if (action.data) {
        const data = {
          ...action.data,
        }

        if (action.data.token) {
          window.localStorage.setItem('token', action.data.token)
          data.token = action.data.token
        }

        window.localStorage.setItem('data', JSON.stringify(action.data))
        return {
          ...state,
          ...data,
          isUserLoggedIn: true
        }
      }
      return {}
    }
    case USER_RESET: {
      window.localStorage.removeItem('data');
      window.localStorage.removeItem('isUserLoggedIn');
      return {}
    }
    case INIT_FINISH: {
      return {
        ...state,
        isInitLoad: false
      }
    }
    default:
      return state
  }
}

