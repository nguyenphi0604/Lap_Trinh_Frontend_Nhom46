import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchProducts } from '../../redux/productSlice';
// Import Link từ react-router-dom để điều hướng
import { Link } from 'react-router-dom';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ProductCard from '../../components/ProductCard/ProductCard';

import { FaArrowUp, FaTruck, FaLeaf, FaHeadset, FaBookOpen } from 'react-icons/fa';
import styles from './Home.module.scss';

const Home = () => {
    const dispatch = useAppDispatch();
    const { items: products, status } = useAppSelector(state => state.products);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Cập nhật categories thêm slug để khớp với Header
    const categories = [
        {
            name: "Cây Ăn Trái",
            slug: "cay-an-trai",
            img: "https://plus.unsplash.com/premium_photo-1667385010648-1a16b251c4b7?q=80&w=1170&auto=format&fit=crop"
        },
        {
            name: "Cây Bonsai",
            slug: "cay-bonsai",
            img: "https://i0.wp.com/discoverandshare.org/wp-content/uploads/2025/07/79b71-evt_japanesefestival_jjmueller_8593.jpg?fit=1200%2C800&ssl=1"
        },
        {
            name: "Hoa Lan Quý",
            slug: "hoa-lan",
            img: "https://nongnghiepdep.com/wp-content/uploads/2023/06/lan-hac-dinh-1.jpg"
        }
    ];

    return (
        <div className={styles.homeWrapper}>
            <Header />

            {/* HERO SECTION */}
            <section className={styles.hero}>
                <div className={styles.overlay}></div>
                <div className={styles.heroContent}>
                    <span className={styles.subTitle}>BST Mùa Xuân 2025</span>
                    <h1>THỔI HỒN XANH <br/> VÀO KHÔNG GIAN SỐNG</h1>
                    <p>Cung cấp hơn 500+ loại cây giống chất lượng cao, bảo hành 1 đổi 1.</p>
                    <div className={styles.btnGroup}>
                        {/* Mua ngay có thể dẫn đến trang tất cả sản phẩm */}
                        <button className={styles.primaryBtn} onClick={() => window.scrollTo({top: 800, behavior: 'smooth'})}>MUA NGAY</button>
                        <button className={styles.secondaryBtn}>XEM KHUYẾN MÃI</button>
                    </div>
                </div>
            </section>

            {/* FEATURES */}
            <section className={styles.features}>
                <div className={styles.featureItem}>
                    <div className={styles.iconBox}><FaTruck /></div>
                    <h3>Giao Hàng Hỏa Tốc</h3>
                    <p>Vận chuyển an toàn trong 24h</p>
                </div>
                <div className={styles.featureItem}>
                    <div className={styles.iconBox}><FaLeaf /></div>
                    <h3>Giống Chuẩn F1</h3>
                    <p>Cam kết tỷ lệ sống 99%</p>
                </div>
                <div className={styles.featureItem}>
                    <div className={styles.iconBox}><FaHeadset /></div>
                    <h3>Hỗ Trợ 24/7</h3>
                    <p>Tư vấn kỹ thuật trọn đời</p>
                </div>
            </section>

            {/* CATEGORIES SECTION */}
            <section className={styles.categories}>
                <h2 className={styles.sectionTitle}>DANH MỤC PHỔ BIẾN</h2>
                <div className={styles.cateGrid}>
                    {categories.map((cat, idx) => (
                        /* Sử dụng Link để bọc toàn bộ Card danh mục */
                        <Link to={`/category/${cat.slug}`} key={idx} className={styles.cateCard}>
                            <img src={cat.img} alt={cat.name} />
                            <div className={styles.cateOverlay}>
                                <h3>{cat.name}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* PRODUCTS SECTION */}
            <section className={styles.products}>
                <h2 className={styles.sectionTitle}>SẢN PHẨM BÁN CHẠY</h2>
                <div className={styles.grid}>
                    {products && products.slice(0, 8).map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

            {/* ADVICE & GUIDE */}
            <section className={styles.adviceSection}>
                <div className={styles.adviceContent}>
                    <div className={styles.iconWrapper}>
                        <FaBookOpen />
                    </div>
                    <h2>Bạn gặp khó khăn khi chăm sóc cây?</h2>
                    <p>Đừng lo! Các chuyên gia của GreenGarden đã biên soạn bộ cẩm nang chi tiết cho từng loại cây.</p>
                    <button className={styles.guideBtn}>XEM HƯỚNG DẪN & MẸO</button>
                </div>
            </section>

            <Footer />

            <button className={styles.scrollTopBtn} onClick={scrollToTop}>
                <FaArrowUp />
            </button>
        </div>
    );
};

export default Home;