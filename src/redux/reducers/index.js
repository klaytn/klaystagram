import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import auth from './auth'
import ui from './ui'
import photos from './photos'

const reducer = combineReducers({
  routing: routerReducer,
  auth,
  ui,
  photos,
})

export default reducer
