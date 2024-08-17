import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    isLoading: false,
    subcategories: [],
    error: null
}

export const getSubData = createAsyncThunk(
    'subcategories/get',
    async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/v1/subcategories/list-subcategories")
            return  response.data;
        } catch (error) {
            console.log(error.message);
        }
    }
)

export const handleAdd = createAsyncThunk(
    'subcategories/add',
    async (data) => {
       try {
            const response = await axios.post("http://localhost:8000/api/v1/subcategories/add-subcategories", data)
            return response.data
       } catch (error) {
            console.log(error.message);
       }
    }
)

export const handledelete = createAsyncThunk(
    'subcategories/delete',
    async (id) => {
        try {
            await axios.delete("http://localhost:8000/api/v1/subcategories/delete-subcategory/" + id)
            return id;
        } catch (error) {
            console.log(error.message);
        }
    }
)

export const handleUpdateData = createAsyncThunk(
    'subcategories/update',
    async (data) => {
        try {
            const response =  await axios.put("http://localhost:8000/api/v1/subcategories/update-subcategory/" + data._id, data)
            return response.data
        } catch (error) {
            console.log(error.message);
        }
    }
)


const subcategorySlice = createSlice({
    name: 'subcategories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getSubData.fulfilled, (state, action) => {
            // console.log(action);
            state.subcategories = action.payload.data;
        })
        
        builder.addCase(handleAdd.fulfilled, (state, action) => {
            // console.log(action);
            state.subcategories = state.subcategories.concat(action.payload.data)
        })

        builder.addCase(handledelete.fulfilled, (state, action) => {
            // console.log(action);
            state.subcategories = state.subcategories.filter((v) => v._id !== action.payload)
        })

        builder.addCase(handleUpdateData.fulfilled, (state, action) => {
            // console.log(action.payload);
            state.subcategories = state.subcategories.map((v) => {
                if (v._id === action.payload.data._id) {
                    return action.payload.data
                } else {
                    return v
                }
            })
        })
    },

})

export default subcategorySlice.reducer;

