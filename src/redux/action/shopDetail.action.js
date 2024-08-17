import {ADD_SHOPDETAIL, DELETE_SHOPDETAIL, GET_SHOPDETAIL, UPDATE_SHOPDETAIL } from "../ActionTypes"
import axios from "axios"
import { baseURL } from "../../utils/baseURL"

export const getShopDetail = () => async (dispatch) => {
    try {
        await axios.get(baseURL + "reviews")
            .then((response) => {
                dispatch({ type: GET_SHOPDETAIL, payload: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    } catch (error) {

    }
}

export const  addShopDetail = (data) => async (dispatch) => {
    try {
        await axios.post(baseURL + "reviews", data)
            .then((response) => {
                dispatch({ type: ADD_SHOPDETAIL, payload: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    } catch (error) {

    }
}

export const  deleteShopDetail = (id) => async (dispatch) => {
    try {
        await axios.delete(baseURL + "reviews/" + id)
            .then((response) => {
                dispatch({ type: DELETE_SHOPDETAIL, payload: id })
            })
            .catch((error) => {
                console.log(error);
            })
    } catch (error) {

    }
}

export const  editShopDetail = (data) => async (dispatch) => {
    try {
        await axios.put(baseURL + "reviews/" + data.id, data)
            .then((response) => {
                dispatch({ type: UPDATE_SHOPDETAIL, payload: data })
            })
            .catch((error) => {
                console.log(error);
            })
    } catch (error) {

    }
}