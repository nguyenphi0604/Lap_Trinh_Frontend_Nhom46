import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: [],
    totalQuantity: 0,
    totalAmount: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === newItem.id);

            if (!existingItem) {
                state.cartItems.push({
                    id: newItem.id,
                    name: newItem.name,
                    image: newItem.image || newItem.images?.[0],
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            }

            state.totalQuantity++;
            state.totalAmount = state.totalAmount + newItem.price;
        },
    },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;