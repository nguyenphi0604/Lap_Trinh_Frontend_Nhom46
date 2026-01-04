import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import ProductDetail from '../pages/ProductDetail/ProductDetail';
import Cart from '../pages/Cart/Cart';
import Category from '../pages/Category/Category';
import Checkout from '../pages/Checkout/Checkout';
import Auth from '../pages/Auth/Auth';
import SearchResults from '../pages/SearchResults/SearchResults';
import Success from '../pages/Success/Success';
import Profile from '../pages/Profile/Profile';
import WishlistPage from '../pages/Wishlist/Wishlist';
import EditProfile from '../pages/Profile/EditProfile'; // FIX: Thêm dấu .. để ra ngoài thư mục router
import NotFound from '../pages/NotFound/NotFound';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/category/:type" element={<Category />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/success" element={<Success />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/wishlist" element={<WishlistPage />} />

            {/* Luôn để Route NotFound ở cuối cùng */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRouter;