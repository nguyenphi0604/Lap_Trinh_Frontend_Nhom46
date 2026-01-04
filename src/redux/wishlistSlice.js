import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        // Lấy dữ liệu từ LocalStorage để không bị mất khi F5 trang
        items: JSON.parse(localStorage.getItem('wishlist')) || [],
    },
    reducers: {
        // Hàm thêm vào yêu thích
        addToWishlist: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            if (!existingItem) {
                state.items.push(newItem);
                // Lưu vào LocalStorage
                localStorage.setItem('wishlist', JSON.stringify(state.items));
            }
        },
        // Hàm xóa khỏi yêu thích
        removeFromWishlist: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            // Cập nhật lại LocalStorage
            localStorage.setItem('wishlist', JSON.stringify(state.items));
        }
    }
});

// QUAN TRỌNG: Kiểm tra dòng này xem đã có addToWishlist chưa
export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;