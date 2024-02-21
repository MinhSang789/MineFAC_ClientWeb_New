import { combineReducers } from 'redux'
import app from './app'
import member from './member'
const rootReducer = combineReducers({
  member,
  app
})

export default rootReducer