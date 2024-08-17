
import axios from "axios"
import { baseURL } from "../../utils/baseURL"
import { ADD_REVIEW, DELETE_REVIEW, GET_REVIEW, UPDATE_REVIEW } from "../ActionTypes"

export const getReview = () => async (dispatch) => {
    try {
        await axios.get(baseURL + "reviews")
            .then((response) => {
                dispatch({ type: GET_REVIEW, payload: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    } catch (error) {

    }
}

export const  addReview = (data) => async (dispatch) => {
    try {
        await axios.post(baseURL + "reviews", data)
            .then((response) => {
                dispatch({ type: ADD_REVIEW, payload: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    } catch (error) {

    }
}

export const  deleteReview = (id) => async (dispatch) => {
    try {
        await axios.delete(baseURL + "reviews/" + id)
            .then((response) => {
                dispatch({ type: DELETE_REVIEW, payload: id })
            })
            .catch((error) => {
                console.log(error);
            })
    } catch (error) {

    }
}

export const  editReview = (data) => async (dispatch) => {
    try {
        await axios.put(baseURL + "reviews/" + data.id, data)
            .then((response) => {
                dispatch({ type: UPDATE_REVIEW, payload: data })
            })
            .catch((error) => {
                console.log(error);
            })
    } catch (error) {

    }
}