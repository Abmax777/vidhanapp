import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import suits from './suits'
import suit from './suit'
import statutes from './statutes'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    suits,
    suit,
    statutes,
  })

export default createRootReducer
