import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { fetchProducts } from '../../redux/productSlice';
import { addToCart } from '../../redux/cartSlice';
import ProductCard from '../../components/ProductCard/ProductCard';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { FaCartPlus, FaTruck, FaShieldAlt, FaLeaf, FaChevronRight } from 'react-icons/fa';
import styles from './ProductDetail.module.scss';

const ProductDetail = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();

    // States
    const [quantity, setQuantity] = useState(1);
    const [selectedImg, setSelectedImg] = useState("");

    const { items: products, status } = useAppSelector(state => state.products);

    // 1. Tối ưu tìm kiếm sản phẩm bằng useMemo
    const product = useMemo(() => {
        return products.find(p => p.id === parseInt(id));
    }, [products, id]);

    // 2. Tối ưu lấy sản phẩm liên quan
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

    // 3. Cập nhật ảnh mặc định khi đổi sản phẩm
    useEffect(() => {
        if (product) {
            // Ưu tiên lấy ảnh đầu tiên trong mảng images, nếu không có lấy image đơn
            setSelectedImg(product.images?.[0] || product.image);
            setQuantity(1); // Reset số lượng về 1 khi đổi sản phẩm
        }
    }, [product]);

    if (status === 'loading' || !product) {
        return (
            <div className={styles.loadingWrapper}>
                <Header />
                <div className={styles.loader}>
                    <div className={styles.spinner}></div>
                    <p>Đang tải thông tin cây xanh...</p>
                </div>
                <Footer />
            </div>
        );
    }

    const handleAddToCart = () => {
        dispatch(addToCart({ ...product, quantity }));
        // Thay alert bằng Toast hoặc Notification sẽ chuyên nghiệp hơn
    };

    return (
        <div className={styles.wrapper}>
            <Header />

            <main className={styles.container}>
                {/* Breadcrumb đơn giản */}
                <nav className={styles.breadcrumb}>
                    <Link to="/">Trang chủ</Link> <FaChevronRight />
                    <span>{product.category}</span> <FaChevronRight />
                    <strong>{product.name}</strong>
                </nav>

                <div className={styles.productMain}>
                    {/* GALLERY ẢNH NHIỀU GÓC MẶT */}
                    <div className={styles.imageSection}>
                        <div className={styles.mainImage}>
                            <img src={selectedImg} alt={product.name} />
                            {product.oldPrice && <div className={styles.saleBadge}>Sale</div>}
                        </div>

                        {/* Hiển thị list ảnh nhỏ nếu có mảng images trong db.json */}
                        {product.images && product.images.length > 1 && (
                            <div className={styles.thumbList}>
                                {product.images.map((img, index) => (
                                    <div
                                        key={index}
                                        className={`${styles.thumbItem} ${selectedImg === img ? styles.active : ''}`}
                                        onClick={() => setSelectedImg(img)}
                                    >
                                        <img src={img} alt={`Góc ${index}`} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* THÔNG TIN SẢN PHẨM */}
                    <div className={styles.productContent}>
                        <span className={styles.categoryName}>{product.category}</span>
                        <h1>{product.name}</h1>

                        <div className={styles.priceContainer}>
                            <span className={styles.price}>
                                {new Intl.NumberFormat('vi-VN').format(product.price)}đ
                            </span>
                            {product.oldPrice && (
                                <span className={styles.oldPrice}>
                                    {new Intl.NumberFormat('vi-VN').format(product.oldPrice)}đ
                                </span>
                            )}
                        </div>

                        <p className={styles.shortDesc}>{product.description}</p>

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
                                <FaTruck /> <div><strong>Giao hàng</strong><span>Giao hỏa tốc 2h nội thành</span></div>
                            </div>
                            <div className={styles.policyItem}>
                                <FaShieldAlt /> <div><strong>Bảo hành</strong><span>Đổi trả trong 7 ngày nếu héo</span></div>
                            </div>
                            <div className={styles.policyItem}>
                                <FaLeaf /> <div><strong>Ưu đãi</strong><span>Tặng kèm cẩm nang chăm sóc</span></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SẢN PHẨM LIÊN QUAN */}
                {relatedProducts.length > 0 && (
                    <section className={styles.relatedSection}>
                        <h2 className={styles.sectionTitle}>Sản phẩm tương tự</h2>
                        <div className={styles.relatedGrid}>
                            {relatedProducts.map(item => (
                                <ProductCard key={item.id} product={item} />
                            ))}
                        </div>
                    </section>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default ProductDetail;