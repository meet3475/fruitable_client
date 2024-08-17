import { ADD_CHECKOUT, DELETE_CHECKOUT, GET_CHECKOUT, UPDATE_CHECKOUT } from "../ActionType";


export const checkoutReducer = (state, action) => {
    console.log(action);

    switch (action.type) {
        case GET_CHECKOUT:
            return {
                isLoading: false,
                checkout: action.payload,
                error: null
            }

        case ADD_CHECKOUT:
            return {
                isLoading: false,
                checkout: state.checkout.concat(action.payload),

            }

        case DELETE_CHECKOUT:
            return {
                isLoading : false,
                checkout: state.checkout.filter((v) => v.id !== action.payload)
            }

        case UPDATE_CHECKOUT:
            return {
                isLoading : false,
                checkout: state.checkout.map((v) => {
                    if (v.id === action.payload.id) {
                        return action.payload
                    } else {
                        return v
                    }
                })
            }

        default:
            return state
    }
}