import { GET_SUIT } from '../constants/actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case GET_SUIT:
      const { suit } = action.payload
      return {
        ...state,
        suit,
      }
    default:
      return state
  }
}
