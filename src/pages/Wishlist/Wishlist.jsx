import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromWishlist } from '../../redux/wishlistSlice';
import { addToCart } from '../../redux/cartSlice';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { FaTrash, FaCartPlus, FaEye } from 'react-icons/fa';
import styles from './Wishlist.module.scss';

const Wishlist = () => {
    // Đảm bảo wishlistItems luôn là mảng để không bị lỗi .length
    const wishlistItems = useSelector((state) => state.wishlist?.items || []);
    const dispatch = useDispatch();

    return (
        <div className={styles.wishlistWrapper}>
            <Header />
            <div className={styles.container}>
                <h2 className={styles.title}>❤️ Danh sách yêu thích</h2>

                {wishlistItems.length === 0 ? (
                    <div className={styles.emptyState}>
                        <img src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" alt="empty" />
                        <p>Bạn chưa có sản phẩm yêu thích nào.</p>
                        <Link to="/" className={styles.btnExplore}>Khám phá ngay</Link>
                    </div>
                ) : (
                    <div className={styles.grid}>
                        {wishlistItems.map((item) => (
                            <div key={item.id} className={styles.wishlistCard}>
                                <div className={styles.imageBox}>
                                    <img
                                        // Kiểm tra nhiều nguồn ảnh và thêm ảnh dự phòng
                                        src={item.image || (item.images && item.images[0]) || 'https://via.placeholder.com/300?text=No+Image'}
                                        alt={item.name}
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/300?text=Image+Error';
                                        }}
                                    />
                                    <button
                                        className={styles.removeBtn}
                                        onClick={() => dispatch(removeFromWishlist(item.id))}
                                        title="Xóa khỏi danh sách"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                                <div className={styles.content}>
                                    <h4>{item.name}</h4>
                                    {/* Thêm check price để tránh lỗi toLocaleString trên undefined */}
                                    <p className={styles.price}>{(item.price || 0).toLocaleString()}đ</p>
                                    <div className={styles.actions}>
                                        <Link to={`/product/${item.id}`} className={styles.btnDetail}>
                                            <FaEye /> Chi tiết
                                        </Link>
                                        <button
                                            className={styles.btnAddCart}
                                            onClick={() => dispatch(addToCart(item))}
                                        >
                                            <FaCartPlus /> Giỏ hàng
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Wishlist;