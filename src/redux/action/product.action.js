import axios from "axios"
import { ADD_PRODUCT, DELETE_PRODUCT, ERROR_PRODUCT, GET_PRODUCT, LOADING_PRODUCT, UPDATE_PRODUCT } from "../ActionTypes"
import { authURL } from "../../utils/baseURL"

const handleLoading = () => (dispatch) => {
    dispatch({ type: LOADING_PRODUCT })
}

const handleError = (error) => (dispatch) => {
    dispatch({ type: ERROR_PRODUCT, payload: error })
}

export const getProduct = () => async (dispatch) => {
    try {
        dispatch(handleLoading())
        await axios.get(authURL + "products/list-products")
            .then((response) => {
                dispatch({ type: GET_PRODUCT, payload: response.data.data })
            })
            .catch((error) => {
                dispatch(handleError(error.message))
            })
    } catch (error) {
        dispatch(handleError(error.message))
    }
}

export const addProduct = (product) => async (dispatch) => {
    dispatch(handleLoading())
    try {
        await axios.post(authURL + "products/add-products", product, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((response) => {

                console.log(response.data);
                dispatch({ type: ADD_PRODUCT, payload: response.data.data })
            })
            .catch((error) => {
                dispatch(handleError(error.message))
            })
    } catch (error) {
        dispatch(handleError(error.message))
    }
}

export const deleteProduct = (id) => async (dispatch) => {
    dispatch(handleLoading())
    try {
        await axios.delete(authURL + `products/delete-products/${id}`)
            .then(dispatch({ type: DELETE_PRODUCT, payload: id }))
            .catch((error) => {
                dispatch(handleError(error.message))
            })
    } catch (error) {
        dispatch(handleError(error.message))
    }
}

export const editProduct = (product) => async (dispatch) => {
    dispatch(handleLoading())
    try {
        await axios.put(authURL + `products/update-products/${product._id}`, product, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((response) => {
                dispatch({ type: UPDATE_PRODUCT, payload: response.data.data })
            })
            .catch((error) => {
                dispatch(handleError(error.message))
            })
    } catch (error) {
        dispatch(handleError(error.message))
    }
}