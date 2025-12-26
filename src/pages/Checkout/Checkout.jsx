import React, { useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { FaMapMarkerAlt, FaPhoneAlt, FaUser } from 'react-icons/fa';
import styles from './Checkout.module.scss';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const { cartItems, totalAmount } = useAppSelector(state => state.cart);
    const navigate = useNavigate();

    // State quản lý form
    const [formData, setFormData] = useState({
        name: '', phone: '', address: '', note: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic gửi đơn hàng lên Server sẽ viết ở đây
        alert("Đặt hàng thành công! Chúng tôi sẽ liên hệ sớm.");
        navigate('/'); // Quay về trang chủ
    };

    return (
        <div className={styles.wrapper}>
            <Header />
            <div className={styles.container}>
                <h1 className={styles.pageTitle}>Thanh Toán</h1>

                <form className={styles.grid} onSubmit={handleSubmit}>
                    {/* Cột Trái: Thông tin giao hàng */}
                    <div className={styles.formSection}>
                        <h2><FaMapMarkerAlt /> Thông tin giao hàng</h2>
                        <div className={styles.inputGroup}>
                            <label>Họ và tên người nhận</label>
                            <div className={styles.inputIcon}>
                                <FaUser />
                                <input type="text" placeholder="Ví dụ: Nguyễn Văn A" required
                                       onChange={e => setFormData({...formData, name: e.target.value})} />
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Số điện thoại</label>
                            <div className={styles.inputIcon}>
                                <FaPhoneAlt />
                                <input type="tel" placeholder="Ví dụ: 0909 123 456" required
                                       onChange={e => setFormData({...formData, phone: e.target.value})} />
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Địa chỉ nhận hàng</label>
                            <textarea placeholder="Số nhà, tên đường, phường/xã, quận/huyện..." required
                                      onChange={e => setFormData({...formData, address: e.target.value})}></textarea>
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Ghi chú đơn hàng (Tùy chọn)</label>
                            <textarea placeholder="Ví dụ: Giao hàng giờ hành chính..."
                                      onChange={e => setFormData({...formData, note: e.target.value})}></textarea>
                        </div>
                    </div>

                    {/* Cột Phải: Tóm tắt đơn hàng */}
                    <div className={styles.summarySection}>
                        <h2>Đơn hàng của bạn ({cartItems.length} sản phẩm)</h2>
                        <div className={styles.itemList}>
                            {cartItems.map(item => (
                                <div key={item.id} className={styles.item}>
                                    <div className={styles.imgWrapper}>
                                        <img src={item.image} alt={item.name} />
                                        <span className={styles.qtyBadge}>{item.quantity}</span>
                                    </div>
                                    <div className={styles.info}>
                                        <h4>{item.name}</h4>
                                        <p>{item.category}</p>
                                    </div>
                                    <span className={styles.price}>{(item.price * item.quantity).toLocaleString()}đ</span>
                                </div>
                            ))}
                        </div>

                        <div className={styles.calc}>
                            <div className={styles.row}>
                                <span>Tạm tính</span>
                                <span>{totalAmount.toLocaleString()}đ</span>
                            </div>
                            <div className={styles.row}>
                                <span>Phí vận chuyển</span>
                                <span>30.000đ</span>
                            </div>
                            <hr />
                            <div className={`${styles.row} ${styles.total}`}>
                                <span>Tổng cộng</span>
                                <span className={styles.totalPrice}>{(totalAmount + 30000).toLocaleString()}đ</span>
                            </div>
                        </div>

                        <button type="submit" className={styles.btnOrder}>ĐẶT HÀNG NGAY</button>
                        <p className={styles.note}>Thanh toán khi nhận hàng (COD)</p>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default Checkout;