import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { baseURL } from "../../utils/baseURL"

export const addcoupon = createAsyncThunk(
    'coupon/add',
    async (data) => {
       try {
            const response = await axios.post(baseURL + "coupon", data)
            return response.data
       } catch (error) {
            console.log(error.message);
       }
    }
)

export const getCoupon = createAsyncThunk(
    'coupon/get',
    async () => {
        try {
            const response = await axios.get(baseURL + "coupon")
            return response.data
        } catch (error) {
            console.log(error.message);
        }
    }
)

export const deleteCoupon = createAsyncThunk(
    'coupon/delete',
    async (id) => {
        try {
            const response =  await axios.delete(baseURL + "coupon/" + id)
            return response.data.id
        } catch (error) {
            console.log(error.message);
        }
    }
)

export const updateCoupon = createAsyncThunk(
    'coupon/update',
    async (data) => {
        try {
            const response =  await axios.put(baseURL + "coupon/" + data.id, data)
            return response.data
        } catch (error) {
            console.log(error.message);
        }
    }
)


const initialState = {
    isLoading: false,
    coupon: [],
    error: null
}

const couponSlice = createSlice({
    name: 'coupon',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addcoupon.fulfilled, (state, action) => {
            // console.log(action);
            state.coupon = state.coupon.concat(action.payload)
        })

        builder.addCase(getCoupon.fulfilled, (state, action) => {
            // console.log(action);
            state.coupon = (action.payload)
        })
        
        builder.addCase(deleteCoupon.fulfilled, (state, action) => {
            // console.log(action);
            state.coupon = state.coupon.filter((v) => v.id !== action.payload)
        })

        builder.addCase(updateCoupon.fulfilled, (state, action) => {
            // console.log(action);
            state.coupon = state.coupon.map((v) => {
                if (v.id === action.payload.id) {
                    return action.payload
                } else {
                    return v
                }
            })
        })
    },

})



export default couponSlice.reducer







