import { GET_STATUTES } from '../constants/actionTypes'

// A sample reducer
const defaultState = {
  statutes: [],
  count: 0,
  skip: 0,
  limit: 24,
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_STATUTES:
      const { statutes, count, skip, limit, queryObj } = action.payload
      return {
        ...state,
        statutes,
        count,
        skip,
        limit,
        queryObj,
      }
    default:
      return state
  }
}
