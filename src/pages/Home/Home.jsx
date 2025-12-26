import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { FaArrowUp, FaTruck, FaLeaf, FaHeadset, FaStar, FaBookOpen } from 'react-icons/fa'; // Thêm icon FaBookOpen
import styles from './Home.module.scss';

const Home = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const categories = [
        { name: "Cây Ăn Trái", img: "https://plus.unsplash.com/premium_photo-1667385010648-1a16b251c4b7?q=80&w=1170&auto=format&fit=crop" },
        { name: "Cây Văn Phòng", img: "https://gardenerspath.com/wp-content/uploads/2024/11/How-to-Water-Cactus-Feature.jpg" },
        { name: "Hoa Lan Quý", img: "https://nongnghiepdep.com/wp-content/uploads/2023/06/lan-hac-dinh-1.jpg" }
    ];

    const products = [1, 2, 3, 4, 5, 6, 7, 8];

    return (
        <div className={styles.homeWrapper}>
            <Header />

            {/* 1. HERO SECTION */}
            <section className={styles.hero}>
                <div className={styles.overlay}></div>
                <div className={styles.heroContent}>
                    <span className={styles.subTitle}>BST Mùa Xuân 2025</span>
                    <h1>THỔI HỒN XANH <br/> VÀO KHÔNG GIAN SỐNG</h1>
                    <p>Cung cấp hơn 500+ loại cây giống chất lượng cao, bảo hành 1 đổi 1.</p>
                    <div className={styles.btnGroup}>
                        <button className={styles.primaryBtn}>MUA NGAY</button>
                        <button className={styles.secondaryBtn}>XEM KHUYẾN MÃI</button>
                    </div>
                </div>
            </section>

            {/* 2. FEATURES */}
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

            {/* 3. CATEGORIES */}
            <section className={styles.categories}>
                <h2 className={styles.sectionTitle}>DANH MỤC PHỔ BIẾN</h2>
                <div className={styles.cateGrid}>
                    {categories.map((cat, idx) => (
                        <div key={idx} className={styles.cateCard}>
                            <img src={cat.img} alt={cat.name} />
                            <div className={styles.cateOverlay}>
                                <h3>{cat.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. BEST SELLERS */}
            <section className={styles.products}>
                <h2 className={styles.sectionTitle}>SẢN PHẨM BÁN CHẠY</h2>
                <div className={styles.grid}>
                    {products.map(i => (
                        <div key={i} className={styles.card}>
                            <div className={styles.badge}>-20%</div>
                            <div className={styles.imagePlaceholder}>
                                <img src={`https://source.unsplash.com/random/300x300?plant,${i}`} alt="Plant" onError={(e) => e.target.src='https://via.placeholder.com/300'}/>
                            </div>
                            <div className={styles.cardInfo}>
                                <span className={styles.cateName}>Cây Ăn Trái</span>
                                <h3>Mít Thái Siêu Sớm</h3>
                                <div className={styles.priceRow}>
                                    <span className={styles.price}>45.000đ</span>
                                    <span className={styles.oldPrice}>60.000đ</span>
                                </div>
                                <div className={styles.rating}>
                                    <FaStar/><FaStar/><FaStar/><FaStar/><FaStar/> <span>(12)</span>
                                </div>
                            </div>
                            <button className={styles.addBtn}>Thêm vào giỏ</button>
                        </div>
                    ))}
                </div>
            </section>

            {/* 5. ADVICE & GUIDE (MỚI THÊM) */}
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