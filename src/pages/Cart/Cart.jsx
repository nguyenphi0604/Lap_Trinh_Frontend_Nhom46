import React from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { FaTrash, FaArrowLeft } from 'react-icons/fa';
import styles from './Cart.module.scss';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cartItems, totalAmount } = useAppSelector(state => state.cart);
    const navigate = useNavigate();

    return (
        <div className={styles.wrapper}>
            <Header />
            <div className={styles.container}>
                <h2 className={styles.title}>Giỏ hàng của bạn</h2>

                {cartItems.length === 0 ? (
                    <div className={styles.empty}>
                        <img src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" alt="Empty Cart" width="150" />
                        <p>Giỏ hàng đang trống</p>
                        <Link to="/" className={styles.continueBtn}><FaArrowLeft /> Tiếp tục mua sắm</Link>
                    </div>
                ) : (
                    <div className={styles.cartContent}>
                        <div className={styles.items}>
                            {cartItems.map((item, index) => (
                                <div key={index} className={styles.item}>
                                    <img src={item.images?.[0] || item.image} alt={item.name} />
                                    <div className={styles.info}>
                                        <h3>{item.name}</h3>
                                        <p className={styles.price}>{item.price.toLocaleString()}đ</p>
                                    </div>
                                    <div className={styles.qty}>
                                        <span>Số lượng: {item.quantity}</span>
                                    </div>
                                    <button className={styles.remove}><FaTrash /></button>
                                </div>
                            ))}
                        </div>

                        <div className={styles.summary}>
                            <h3>Tóm tắt đơn hàng</h3>
                            <div className={styles.row}><span>Tạm tính:</span> <span>{totalAmount.toLocaleString()}đ</span></div>
                            <div className={styles.row}><span>Phí vận chuyển:</span> <span>Miễn phí</span></div>
                            <hr />
                            <div className={styles.total}><span>Tổng cộng:</span> <span>{totalAmount.toLocaleString()}đ</span></div>

                            <button
                                className={styles.checkoutBtn}
                                onClick={() => navigate('/checkout')}
                            >
                                TIẾN HÀNH THANH TOÁN
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Cart;