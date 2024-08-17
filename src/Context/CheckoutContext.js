import { createContext, useReducer } from "react";
import { ADD_CHECKOUT, DELETE_CHECKOUT, GET_CHECKOUT, UPDATE_CHECKOUT } from "./ActionType";
import { checkoutReducer } from "./reducer/checkout.reducer";
import axios from "axios";
import { baseURL } from "../utils/baseURL";

const initialState = {
    isLoading: false,
    checkout: [],
    error: null
}

export const CheckoutContext = createContext();

export const CheckProvider = ({ children }) => {
    const [state, dispatch] = useReducer(checkoutReducer, initialState);

        const getcheckout = () => async (dispatch) => {
            try {
                await axios.get(baseURL + "checkout")
                    .then((response) => {
                        dispatch({ type: GET_CHECKOUT, payload: response.data })
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            } catch (error) {
        
            }
        }

        const  addcheckout = (data) => async (dispatch) => {
            try {
                await axios.post(baseURL + "checkout", data)
                    .then((response) => {
                        dispatch({ type: ADD_CHECKOUT, payload: response.data })
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            } catch (error) {
        
            }
        }

        const  deletecheckout = (id) => async (dispatch) => {
            try {
                await axios.delete(baseURL + "checkout/" + id)
                    .then((response) => {
                        dispatch({ type: DELETE_CHECKOUT, payload: id })
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            } catch (error) {
        
            }
        }

        const  editcheckout = (data) => async (dispatch) => {
            try {
                await axios.put(baseURL + "checkout/" + data.id, data)
                    .then((response) => {
                        dispatch({ type: UPDATE_CHECKOUT, payload: data })
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            } catch (error) {
        
            }
        }
   

    return (
        <CheckoutContext.Provider
            value={{
                ...state,
                getcheckout,
                addcheckout,
                deletecheckout,
                editcheckout
            }}
        >
            {children}
        </CheckoutContext.Provider>
    )
}

