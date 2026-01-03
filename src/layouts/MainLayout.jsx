import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const MainLayout = () => {
    return (
        <div className="main-layout">
            <Header />
            <div className="content">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};
export default MainLayout;