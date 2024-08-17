import { ADD_SHOPDETAIL, DELETE_SHOPDETAIL, GET_SHOPDETAIL, UPDATE_SHOPDETAIL } from "../ActionTypes";

const initialState = {
    isLoading: false,
    reviews: [],
    error: null
}

export const reviewReducer = (state = initialState, action) => {
    // console.log(action);

    switch (action.type) {
        case GET_SHOPDETAIL:
            return {
                isLoading: false,
                reviews: action.payload,
                error: null
            }

        case ADD_SHOPDETAIL:
            return {
                isLoading: false,
                reviews: state.reviews.concat(action.payload),
                error: null
            }

        case DELETE_SHOPDETAIL:
            return {
                isLoading: false,
                reviews: state.reviews.filter((v) => v.id !== action.payload),
                error: null
            }

        case UPDATE_SHOPDETAIL:
            return {
                isLoading: false,
                reviews: state.reviews.map((v) => {
                    if (v.id === action.payload.id) {
                        return action.payload
                    } else {
                        return v
                    }
                 }),
                error: null
            }

        default:
            return state
    }
}