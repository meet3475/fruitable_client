import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    color : '',
    messsage: ''
}

const alertsSlice = createSlice({
    name: 'alert',  
    initialState,
    reducers: {
        setAlert : (state, action) => {
            state.color = action.payload.color
            state.messsage = action.payload.message
        },
        resetAlert : (state, action) => {
            state.color = ''
            state.messsage = ''
        }
    }
        
})

export const {setAlert, resetAlert} = alertsSlice.actions
export default alertsSlice.reducer;