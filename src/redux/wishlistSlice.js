import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // Đảm bảo tên là wishlistItems (hoặc items tùy bạn chọn, nhưng phải khớp với Selector)
    wishlistItems: [],
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        // Hàm này dùng cho nút trái tim ở trang chi tiết
        toggleWishlist: (state, action) => {
            const productId = action.payload;
            const index = state.wishlistItems.indexOf(productId);
            if (index >= 0) {
                state.wishlistItems.splice(index, 1);
            } else {
                state.wishlistItems.push(productId);
            }
        },
        // Hàm này dùng cho nút xóa ở trang Wishlist (cho đúng tên bạn đang gọi)
        removeFromWishlist: (state, action) => {
            const productId = action.payload;
            state.wishlistItems = state.wishlistItems.filter(id => id !== productId);
        },
    },
});

// QUAN TRỌNG: Bạn phải export đúng tên này ra
export const { toggleWishlist, removeFromWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;