import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { fetchProducts } from '../../redux/productSlice';
import { addToCart } from '../../redux/cartSlice';
import ProductCard from '../../components/ProductCard/ProductCard';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ReviewForm from './ReviewForm';
import { FaCartPlus, FaTruck, FaShieldAlt, FaLeaf, FaChevronRight, FaStar } from 'react-icons/fa';
import styles from './ProductDetail.module.scss';

const ProductDetail = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const [quantity, setQuantity] = useState(1);
    const [selectedImg, setSelectedImg] = useState(null);

    // State quản lý danh sách đánh giá tạm thời
    const [reviews, setReviews] = useState([
        { id: 1, userName: "Nguyễn Văn A", rating: 5, comment: "Cây rất xanh và khỏe, đóng gói cẩn thận.", date: "01/01/2024" },
        { id: 2, userName: "Trần Thị B", rating: 4, comment: "Giao hàng nhanh, cây hơi nhỏ so với ảnh nhưng rất đẹp.", date: "02/01/2024" }
    ]);

    const { items: products, status } = useAppSelector(state => state.products);

    const product = useMemo(() => {
        if (!products.length) return null;
        return products.find(p => String(p.id) === String(id));
    }, [products, id]);

    const relatedProducts = useMemo(() => {
        if (!product) return [];
        return products
            .filter(p => p.category === product.category && p.id !== product.id)
            .slice(0, 4);
    }, [products, product]);

    useEffect(() => {
        if (status === 'idle') dispatch(fetchProducts());
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [id, status, dispatch]);

    useEffect(() => {
        if (product) {
            setSelectedImg(product.images?.[0] || product.image || null);
            setQuantity(1);
        }
    }, [product]);

    const handleNewReview = (newReview) => {
        setReviews(prev => [newReview, ...prev]);
    };

    const handleAddToCart = () => {
        dispatch(addToCart({ ...product, quantity }));
        alert("Đã thêm sản phẩm vào giỏ hàng!");
    };

    if (status === 'loading' || !product) {
        return (
            <div className={styles.loadingWrapper}>
                <Header />
                <div className={styles.loader}><div className={styles.spinner}></div><p>Đang tải...</p></div>
                <Footer />
            </div>
        );
    }

    return (
        <div className={styles.wrapper}>
            <Header />
            <main className={styles.container}>
                <nav className={styles.breadcrumb}>
                    <Link to="/">Trang chủ</Link> <FaChevronRight className={styles.icon} />
                    <strong>{product.name}</strong>
                </nav>

                <div className={styles.productMain}>
                    <div className={styles.imageSection}>
                        <div className={styles.mainImage}>
                            {selectedImg ? <img src={selectedImg} alt={product.name} /> : <div className={styles.imgPlaceholder}>No Image</div>}
                            {product.oldPrice && (
                                <div className={styles.saleBadge}>
                                    -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                                </div>
                            )}
                        </div>
                        {product.images?.length > 1 && (
                            <div className={styles.thumbList}>
                                {product.images.map((img, index) => (
                                    <div
                                        key={index}
                                        className={`${styles.thumbItem} ${selectedImg === img ? styles.active : ''}`}
                                        onClick={() => setSelectedImg(img)}
                                    >
                                        <img src={img} alt="thumb" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className={styles.productContent}>
                        <span className={styles.categoryName}>{product.category}</span>
                        <h1 className={styles.title}>{product.name}</h1>
                        <div className={styles.priceContainer}>
                            <span className={styles.price}>{product.price?.toLocaleString()}đ</span>
                            {product.oldPrice && <span className={styles.oldPrice}>{product.oldPrice?.toLocaleString()}đ</span>}
                        </div>

                        <div className={styles.divider}></div>
                        <p className={styles.shortDesc}>{product.description || "Thông tin cây đang được cập nhật..."}</p>

                        <div className={styles.purchaseZone}>
                            <div className={styles.qtyBox}>
                                <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                                <input type="number" value={quantity} readOnly />
                                <button onClick={() => setQuantity(q => q + 1)}>+</button>
                            </div>
                            <button className={styles.addBtn} onClick={handleAddToCart}>
                                <FaCartPlus /> THÊM VÀO GIỎ HÀNG
                            </button>
                        </div>

                        <div className={styles.policy}>
                            <div className={styles.policyItem}>
                                <FaTruck className={styles.policyIcon} />
                                <div><strong>Giao hàng</strong><span>Hỏa tốc nội thành trong 2h</span></div>
                            </div>
                            <div className={styles.policyItem}>
                                <FaShieldAlt className={styles.policyIcon} />
                                <div><strong>Bảo hành</strong><span>7 ngày đổi trả nếu cây lỗi</span></div>
                            </div>
                            <div className={styles.policyItem}>
                                <FaLeaf className={styles.policyIcon} />
                                <div><strong>Cam kết</strong><span>Cây khỏe mạnh, đúng chủng loại</span></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* REVIEW SECTION */}
                <section className={styles.reviewSection}>
                    <div className={styles.sectionHeader}>
                        <h2>Đánh giá từ khách hàng</h2>
                    </div>
                    <div className={styles.reviewContent}>
                        <div className={styles.formColumn}>
                            <ReviewForm productId={product.id} onReviewSubmit={handleNewReview} />
                        </div>
                        <div className={styles.listColumn}>
                            <h3>Tất cả bình luận ({reviews.length})</h3>
                            <div className={styles.reviewList}>
                                {reviews.map((rev) => (
                                    <div key={rev.id} className={styles.reviewItem}>
                                        <div className={styles.revUser}>
                                            <span className={styles.userName}>{rev.userName}</span>
                                            <span className={styles.revDate}>{rev.date}</span>
                                        </div>
                                        <div className={styles.revStars}>
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar key={i} color={i < rev.rating ? "#ffc107" : "#e4e5e9"} />
                                            ))}
                                        </div>
                                        <p className={styles.revComment}>{rev.comment}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {relatedProducts.length > 0 && (
                    <section className={styles.relatedSection}>
                        <h2 className={styles.sectionTitle}>Sản phẩm tương tự</h2>
                        <div className={styles.relatedGrid}>
                            {relatedProducts.map(item => <ProductCard key={item.id} product={item} />)}
                        </div>
                    </section>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default ProductDetail;