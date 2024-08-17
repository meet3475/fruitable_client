import { ADD_SALESPEOPLE, DELETE_SALESPEOPLE, EDIT_SALESPEOPLE, GET_SALESPEOPLE } from "../ActionTypes";


const initialState = {
    isLoading: false,
    salespeople: [],
    error: null,
}

export const salespeopleReducer = (state = initialState, action) => {
    // console.log(action.payload);

    switch (action.type) {
        case GET_SALESPEOPLE:
            return {
                ...state,
                salespeople: action.payload,
                error: null,
            };

        case ADD_SALESPEOPLE:
            return {
                ...state,
                salespeople: [...state.salespeople, action.payload],
                error: null,
            };

        case DELETE_SALESPEOPLE:
            return {
                ...state,
                salespeople: state.salespeople.filter((v) => v.snum !== action.payload),
                error: null,
            };

        case EDIT_SALESPEOPLE:
            return {
                ...state,
                salespeople: state.salespeople.map((v) => v.snum === action.payload.snum ? action.payload : v),
                error: null,
            };

            

        default:
            return state;
    }
}