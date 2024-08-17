import { DECREMENT_COUNTER, INCREMENT_COUNTER } from "../ActionTypes"

export const increse = () => (dispatch) => {
    dispatch({type: INCREMENT_COUNTER})
}

export const decrese = () => (dispatch) => {
    dispatch({type: DECREMENT_COUNTER})
}

