import { ADD_VARIANTS, DELETE_VARIANTS, EDIT_VARIANTS, GET_VARIANTS } from "../ActionTypes";

const initialState = {
    isLoading: false,
    variant: [],
    error: null,
}

export const variantReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_VARIANTS:
            return {
                ...state,
                variant: action.payload,
                error: null,
            };

        case ADD_VARIANTS:
            return {
                ...state,
                variant: [...state.variant, action.payload],
                error: null,
            };

        case DELETE_VARIANTS:
            return {
                ...state,
                variant: state.variant.filter((v) => v._id !== action.payload),
                error: null,
            };

        case EDIT_VARIANTS:
            return {
                ...state,
                variant: state.variant.map((v) => v._id === action.payload._id ? action.payload : v),
                error: null,
            };

        default:
            return state;
    }
}