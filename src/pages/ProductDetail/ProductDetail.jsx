import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addToCart } from '../../redux/cartSlice';
import { fetchProducts } from '../../redux/productSlice';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { FaArrowLeft, FaShoppingBag, FaStar, FaHeart, FaShareAlt } from 'react-icons/fa';
import styles from './ProductDetail.module.scss';

const ProductDetail = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { items: products, status } = useAppSelector(state => state.products);

    // Gọi API nếu chưa có dữ liệu
    useEffect(() => {
        if (status === 'idle') dispatch(fetchProducts());
    }, [status, dispatch]);

    // Tìm sản phẩm theo ID (chuyển id sang string để so sánh an toàn)
    const product = products.find((p) => String(p.id) === String(id));

    // Loading UI
    if (status === 'loading') return <div className={styles.loading}>Đang tải...</div>;
    if (!product) return <div className={styles.error}>Không tìm thấy sản phẩm!</div>;

    return (
        <div className={styles.pageWrapper}>
            <Header />

            <div className={styles.mainContainer}>
                <div className={styles.heroBanner}>
                    <img src={product.image} alt={product.name} className={styles.bgImage} />
                    <div className={styles.overlay}></div>
                    <button onClick={() => navigate(-1)} className={styles.backBtn}>
                        <FaArrowLeft /> Quay lại
                    </button>
                </div>

                <div className={styles.contentGrid}>

                    <div className={styles.leftColumn}>
                        <div className={styles.headerInfo}>
                            <h1 className={styles.productName}>{product.name}</h1>
                            <div className={styles.badges}>
                                <span className={styles.ratingBadge}><FaStar /> {product.rating || 5.0}</span>
                                <span className={styles.tagBadge}>{product.category || 'Cây Cảnh'}</span>
                                <span className={styles.tagBadge}>Còn hàng</span>
                            </div>
                        </div>

                        <div className={styles.descriptionSection}>
                            <h3>Giới thiệu</h3>
                            <p>{product.description || "Mô tả đang được cập nhật. Cây xanh tốt, rễ khỏe, đã được thuần dưỡng tại vườn ươm GreenGarden."}</p>
                        </div>

                        <div className={styles.gallerySection}>
                            <h3>Hình ảnh thực tế</h3>
                            <div className={styles.galleryGrid}>
                                {/* Dùng lại ảnh chính làm demo gallery */}
                                <img src={product.image} alt="Góc chụp 1" />
                                <img src="https://source.unsplash.com/random/300x300?leaf" alt="Góc chụp 2" />
                            </div>
                        </div>
                    </div>

                    <div className={styles.rightColumn}>
                        <div className={styles.stickyCard}>
                            <img src={product.image} alt={product.name} className={styles.cardImage} />

                            <div className={styles.priceInfo}>
                                <div className={styles.priceText}>
                                    <span className={styles.oldPrice}>{(product.price * 1.2).toLocaleString()}đ</span>
                                    <span className={styles.currentPrice}>{product.price.toLocaleString()}đ</span>
                                </div>
                                <span className={styles.discountBadge}>-20%</span>
                            </div>

                            <div className={styles.actionButtons}>
                                <button
                                    className={styles.btnAddToCart}
                                    onClick={() => dispatch(addToCart(product))}
                                >
                                    <FaShoppingBag /> Thêm vào giỏ
                                </button>
                                <button className={styles.btnLike}>
                                    <FaHeart />
                                </button>
                            </div>

                            <div className={styles.shareBtn}>
                                <FaShareAlt /> Chia sẻ sản phẩm này
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ProductDetail;