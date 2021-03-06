import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import listReducer from './list/reducer'
import singleReducer from './single/reducer'
import votesReducer from './votes/reducer'

export default combineReducers({
  listReducer: persistReducer({ key: 'place-list', storage }, listReducer),
  singleReducer: persistReducer({ key: 'place', storage }, singleReducer),
  votesReducer: persistReducer({ key: 'votes', storage }, votesReducer),
})
