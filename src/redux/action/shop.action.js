import { GET_SHOP } from "../ActionTypes"
import axios from "axios"
import { baseURL } from "../../utils/baseURL"

export const getShop = () => async (dispatch) => {
    try {
        await axios.get(baseURL + "fruites")
            .then((response) => {
                dispatch({ type: GET_SHOP, payload: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    } catch (error) {

    }
}