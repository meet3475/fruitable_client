import { ADD_CATEGORY, DELETE_CATEGORY, GET_CATEGORY, UPDATE_CATEGORY } from "../ActionTypes";

const initialState = {
    isLoading: false,
    categories: [],
    error: null
}

export const categoriesReducer = (state = initialState, action) => {
    // console.log(action);

    switch (action.type) {
        case GET_CATEGORY:
            return {
                ...state,
                isloading: false,
                categories: action.payload,
                
            }

        case ADD_CATEGORY:
            return {
                isLoading: false,
                categories: state.categories.concat(action.payload.data),
                error: null
            }

        case DELETE_CATEGORY:
            return {
                isLoading: false,
                categories: state.categories.filter((v) => v._id !== action.payload),
                error: null
            }

        case UPDATE_CATEGORY:
            return {
                isLoading: false,
                categories: state.categories.map((v) => {
                    if (v._id === action.payload._id) {
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