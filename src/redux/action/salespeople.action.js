import axios from "axios";
import { ADD_SALESPEOPLE, DELETE_SALESPEOPLE, EDIT_SALESPEOPLE, GET_SALESPEOPLE } from "../ActionTypes";


export const getsalespeople = () => async (dispatch) => {
    try {
        const response = await axios.get("http://localhost:8000/api/v1/salespeople/list-salespeople");
        dispatch({ type: GET_SALESPEOPLE, payload: response.data.data });
    } catch (error) {
       console.log("Error ger variant:");
    }
};

export const addsalespeople = (data) => async (dispatch) => {
    try {
        const response = await axios.post("http://localhost:8000/api/v1/salespeople/add-salespeople", data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        dispatch({ type: ADD_SALESPEOPLE, payload: response.data.data });
    } catch (error) {
        console.log("Error adding variant:");
    }
};

export const deletesalespeople = (snum) => async (dispatch) => {
    // console.log(snum);
    try {
        await axios.delete(`http://localhost:8000/api/v1/salespeople/delete-salespeople/${snum}`);
        dispatch({ type: DELETE_SALESPEOPLE, payload: snum });
    } catch (error) {
        console.log("Error deleting variant:");
    }
};

export const editsalespeople = (data) => async (dispatch) => {
    // console.log(data);
    try {
        await axios.put(`http://localhost:8000/api/v1/salespeople/update-salespeople/${data.snum}`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        dispatch({ type: EDIT_SALESPEOPLE, payload: data});
    } catch (error) {
        console.log("Error editing variant:", error);
    }
};




