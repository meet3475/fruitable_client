import { ADD_FCILITIES, DELETE_FCILITIES, ERROR_FCILITIES, GET_FCILITIES, LOADING_FCILITIES, UPDATE_FCILITIES } from "../ActionTypes"

const handleLoading = () => (dispatch) => {
    dispatch({ type: LOADING_FCILITIES })
}

export const getFacilities = () => (dispatch) => {
    dispatch({type: GET_FCILITIES})
}

export const Addfacilities = (data) => (dispatch) => {
    dispatch(handleLoading())
    setTimeout(() => {
        dispatch({ type: ADD_FCILITIES, payload: data })
    }, 2000)

}

export const Deletefacilities = (id) => (dispatch) => {
    dispatch({ type: DELETE_FCILITIES, payload: id })
}

export const Updatefacilities = (data) => (dispatch) => {
    dispatch({ type: UPDATE_FCILITIES, payload: data })
}

