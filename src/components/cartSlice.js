import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orderForm: null,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setOrderForm(state, action) {
            state.orderForm = action.payload;
        },
        clearCart(state) {
            state.orderForm = null;
        },
    },
});

export const { setOrderForm, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
