import { GET_SUITS } from '../constants/actionTypes'

// A sample reducer
const defaultState = {
  suits: [],
  count: 0,
  skip: 0,
  limit: 24,
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_SUITS:
      const { suits, count, skip, limit, queryObj } = action.payload
      return {
        ...state,
        suits,
        count,
        skip,
        limit,
        queryObj,
      }
    default:
      return state
  }
}
