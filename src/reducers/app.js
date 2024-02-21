import { FETCH_APP_CHANGE, FETCH_APP_CONFIGURATION_SUCCESS } from '../constants/app'


const initialState = {
  config: {}
}

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_APP_CHANGE:
      const data = action.payload
      return {
        ...state,
        ...data
      }
    case FETCH_APP_CONFIGURATION_SUCCESS: 
      return {
        ...state,
        config: action.data
      }
    default:
      return state
  }
}
