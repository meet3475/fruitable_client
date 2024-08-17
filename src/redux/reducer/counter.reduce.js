import { DECREMENT_COUNTER, INCREMENT_COUNTER } from "../ActionTypes";

const insitialiState = {
    isLoading: false,
    count: 0,
    error: null
}

export const counterReducer = (state = insitialiState, action) => {
    // console.log(action);

    switch (action.type) {
        case INCREMENT_COUNTER:
            return {
                count: state.count + 1
            }

        case DECREMENT_COUNTER:
            return {
                count: state.count - 1
            }

        default:
            return state
    }
}