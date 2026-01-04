import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Thêm useNavigate
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './Profile.module.scss';

const Profile = () => {
    const navigate = useNavigate();
    const orders = useSelector(state => state.orders?.history || []);
    const userProfile = useSelector(state => state.orders?.userProfile || {});

    return (
        <div className={styles.profileContainer}>
            <Header />
            <div className="container mt-5 mb-5">
                <div className="row">
                    <div className="col-md-4">
                        <div className={styles.profileCard}>
                            <div className={styles.cardHeader}>
                                <div className={styles.avatarWrapper}>👤</div>
                                <h4>{userProfile.name || "Chưa có tên"}</h4>
                                <p>{userProfile.email || "Chưa có email"}</p>
                            </div>
                            {/* Chuyển hướng khi click */}
                            <button
                                className={styles.editBtn}
                                onClick={() => navigate('/profile/edit')}
                            >
                                Chỉnh sửa hồ sơ
                            </button>
                        </div>
                    </div>

                    <div className="col-md-8">
                        <h4 className="mb-4 fw-bold">📦 Lịch sử đơn hàng ({orders.length})</h4>
                        {orders.length === 0 ? (
                            <div className={styles.emptyState}><p>Chưa có đơn hàng nào.</p></div>
                        ) : (
                            orders.map(order => (
                                <div key={order.id} className={styles.orderItem}>
                                    <div className={styles.orderHeader}>
                                        <span className="fw-bold text-success">Mã đơn: #{order.id}</span>
                                        <span className="badge bg-warning text-dark">{order.status}</span>
                                    </div>

                                    <div className="bg-light p-3 mt-2 rounded" style={{fontSize: '0.85rem'}}>
                                        <p className="mb-1">📍 <strong>Người nhận:</strong> {order.customerInfo?.name}</p>
                                        <p className="mb-1">📞 <strong>SĐT:</strong> {order.customerInfo?.phone}</p>
                                        <p className="mb-0">🏠 <strong>Địa chỉ:</strong> {order.customerInfo?.address}</p>
                                    </div>

                                    <div className={styles.orderContent + " mt-2"}>
                                        {order.items?.map((item, index) => (
                                            <div key={index} className={styles.productRow}>
                                                <span>{item.name} x{item.quantity}</span>
                                                <span>{(item.price * item.quantity).toLocaleString()}đ</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className={styles.orderFooter}>
                                        <strong>Tổng cộng: {(order.totalAmount || 0).toLocaleString()}đ</strong>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;