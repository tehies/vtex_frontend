import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orderForm: {
        items: [],
        value: 0,
    },
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,

    reducers: {
        setOrderForm(state, action) {
            state.orderForm = action.payload;
        },
        clearCart(state) {
            state.orderForm = { items: [], value: 0 };
        },
        incrementQuantity(state, action) {
            const itemId = action.payload;
            const item = state.orderForm.items.find((item) => item.id === itemId);
            if (item) {
                item.quantity += 1;
                state.orderForm.value += item.price;
            }
        },
        decrementQuantity(state, action) {
            const itemId = action.payload;
            const item = state.orderForm.items.find((item) => item.id === itemId);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
                state.orderForm.value -= item.price;
            }
        },
    },
});


export const { setOrderForm, clearCart, incrementQuantity, decrementQuantity } = cartSlice.actions;

export default cartSlice.reducer;