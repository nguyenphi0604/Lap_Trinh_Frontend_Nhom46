import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom'; // Đã thêm Link ở đây
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
    const [quantity, setQuantity] = useState(1);
    const [selectedImg, setSelectedImg] = useState("");

    const { items: products, status } = useAppSelector(state => state.products);

    const product = useMemo(() => {
        return products.find(p => p.id === parseInt(id));
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
            setSelectedImg(product.images?.[0] || product.image);
            setQuantity(1);
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
        // Bạn có thể cài thêm thư viện react-hot-toast để hiện thông báo ở đây
    };

    return (
        <div className={styles.wrapper}>
            <Header />

            <main className={styles.container}>
                <nav className={styles.breadcrumb}>
                    <Link to="/">Trang chủ</Link> <FaChevronRight className={styles.icon} />
                    <Link to={`/category/${product.category}`}>{product.category}</Link> <FaChevronRight className={styles.icon} />
                    <strong>{product.name}</strong>
                </nav>

                <div className={styles.productMain}>
                    <div className={styles.imageSection}>
                        <div className={styles.mainImage}>
                            <img src={selectedImg} alt={product.name} />
                            {product.oldPrice && (
                                <div className={styles.saleBadge}>
                                    -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                                </div>
                            )}
                        </div>

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

                    <div className={styles.productContent}>
                        <span className={styles.categoryName}>{product.category}</span>
                        <h1 className={styles.title}>{product.name}</h1>

                        <div className={styles.priceContainer}>
                            <span className={styles.price}>
                                {product.price?.toLocaleString()}đ
                            </span>
                            {product.oldPrice && (
                                <span className={styles.oldPrice}>
                                    {product.oldPrice?.toLocaleString()}đ
                                </span>
                            )}
                        </div>

                        <div className={styles.divider}></div>

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
                                <div className={styles.policyIcon}><FaTruck /></div>
                                <div><strong>Giao hàng</strong><span>Hỏa tốc nội thành trong 2h</span></div>
                            </div>
                            <div className={styles.policyItem}>
                                <div className={styles.policyIcon}><FaShieldAlt /></div>
                                <div><strong>Bảo hành</strong><span>7 ngày đổi trả nếu cây lỗi</span></div>
                            </div>
                            <div className={styles.policyItem}>
                                <div className={styles.policyIcon}><FaLeaf /></div>
                                <div><strong>Cam kết</strong><span>Cây khỏe mạnh, đúng chủng loại</span></div>
                            </div>
                        </div>
                    </div>
                </div>

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