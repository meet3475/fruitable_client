import { ADD_CATEGORY, DELETE_CATEGORY, GET_CATEGORY, UPDATE_CATEGORY } from "../ActionTypes";
import axiosInstance from "../../utils/axiosInstance";

export const getData = () => async (dispatch) => {
    try {
        const response = await axiosInstance.get(`categories/list-categories`);
        dispatch({type: GET_CATEGORY, payload: response.data.data});
    } catch (error) {
        console.log(error);
    }
}

export const handleAdd = (data) => async (dispatch) => {
    try {
        axiosInstance.post("categories/add-categories", data)
        .then((response) => {
            // console.log(response.data);
            dispatch({ type: ADD_CATEGORY, payload:response.data })
        })
        .catch((error) => {
            console.log(error);
        })
    } catch (error) {
        console.log(error);
    }
}

export const handledelete = (id) => async (dispatch) => {
    try {
        await axiosInstance.delete("categories/delete-category/" + id);
        dispatch({type: DELETE_CATEGORY, payload: id});
    } catch (error) {
        console.log(error);
    }

}

export const handleUpdateData = (data) => async (dispatch) => {
    try {
        await axiosInstance.put("categories/update-category/" + data._id, data); 
        dispatch({type: UPDATE_CATEGORY, payload: data});
    } catch (error) {
        console.log(error);
    }

}

