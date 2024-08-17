import { Message } from "@mui/icons-material";
import { ADD_FCILITIES, DELETE_FCILITIES, ERROR_FCILITIES, GET_FCILITIES, LOADING_FCILITIES, UPDATE_FCILITIES } from "../ActionTypes";

const initialState = {
    isLoading: false,
    facilities: [],
    error: null
}

export const facilitiesReducer = (state = initialState, action) => {
    // console.log(action);

    switch (action.type) {

        case LOADING_FCILITIES:
            console.log("loading...");
            return {
                ...state,
                isLoading : true,
            }

        case GET_FCILITIES:
            return {
                ...state,
            }

        case ADD_FCILITIES:
            return {
                ...state,
                isLoading : false,
                facilities: state.facilities.concat(action.payload),
                
            }

        case DELETE_FCILITIES:
            return {
                ...state,
                isLoading : false,
                facilities: state.facilities.filter((v) => v.id !== action.payload)
            }

        case UPDATE_FCILITIES:
            return {
                ...state,
                isLoading : false,
                facilities: state.facilities.map((v) => {
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

