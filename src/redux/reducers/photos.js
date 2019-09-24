import { SET_FEED } from 'redux/actions/actionTypes'

const initialState = {
  feed: null,
}

const photoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FEED:
      return {
        ...state,
        feed: action.payload.feed,
      }
    default:
      return state;
  }
}

export default photoReducer
