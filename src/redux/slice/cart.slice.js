
import { createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios";
import { authURL } from "../../utils/baseURL";

const initialState = {
    isLoading: false,
    cart: [],
    error: null
}

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async (data, { rejectedWithValue }) => {
        try {
            console.log(data);

            const response = await axios.post(authURL + 'carts/add-to-cart', data);
            console.log(response);

            return response.data
        } catch (error) {
            return rejectedWithValue(error.response ? error.response.data : error.message);
        }
    }
);

export const deleteCartItem = createAsyncThunk(
    'carts/deleteCartItem',
    async ({ cart_id, _id }, { rejectWithValue }) => {
        try {
            console.log(cart_id, _id);
            const url = authURL + `carts/delete-cart/${cart_id}/${_id}`;
            const response = await axios.delete(url);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);


export const updateCartQuantity = createAsyncThunk(
    'carts/updateCartQuantity',
    async ({ cart_id, product_id, qty }, { rejectWithValue }) => {
        try {
            const url = authURL + `carts/update-quantity/${cart_id}`;
            const response = await axios.put(url, { product_id, qty });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.fulfilled, (state, action) => {
                state.cart = action.payload
            })
            .addCase(deleteCartItem.fulfilled, (state, action) => {
                state.cart = action.payload
            })
            .addCase(updateCartQuantity.fulfilled, (state, action) => {
                state.cart = action.payload;
            });

    }

});

export default cartSlice.reducer;