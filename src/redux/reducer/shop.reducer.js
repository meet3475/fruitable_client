import { GET_SHOP } from "../ActionTypes";

const initialState = {
    isLoading: false,
    fruites: [],
    error: null
}

export const fruitesReducer = (state = initialState, action) => {
    // console.log(action);

    switch (action.type) {
        case GET_SHOP:
            return {
                isLoading: false,
                fruites: action.payload,
                error: null
            }

        default:
            return state
    }
}