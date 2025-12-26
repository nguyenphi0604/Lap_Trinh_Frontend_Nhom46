import React from 'react';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import styles from './Footer.module.scss';

const Footer = () => {
    return (
        <footer className={styles.footerWrapper}>
            {/* Phần 1: Đăng ký nhận tin (Newsletter) */}
            <div className={styles.newsletter}>
                <div className={styles.newsletterContent}>
                    <div className={styles.text}>
                        <h3>ĐĂNG KÝ NHẬN TIN KHUYẾN MÃI</h3>
                        <p>Nhận ngay voucher giảm giá 10% cho đơn hàng đầu tiên</p>
                    </div>
                    <div className={styles.form}>
                        <input type="email" placeholder="Nhập địa chỉ email của bạn..." />
                        <button><FaPaperPlane /> Đăng ký</button>
                    </div>
                </div>
            </div>

            {/* Phần 2: Nội dung chính (Main Footer) */}
            <div className={styles.mainFooter}>
                <div className={styles.container}>
                    {/* Cột 1: Giới thiệu */}
                    <div className={styles.column}>
                        <h4 className={styles.logo}>GREEN<span>GARDEN</span></h4>
                        <p className={styles.desc}>
                            Chuyên cung cấp các loại cây giống, cây cảnh, bonsai và vật tư nông nghiệp chất lượng cao. Mang không gian xanh đến ngôi nhà của bạn.
                        </p>
                        <ul className={styles.contactInfo}>
                            <li><FaMapMarkerAlt /> 123 Đường Cây Xanh, TP. Hồ Chí Minh</li>
                            <li><FaPhoneAlt /> 1900 123 456</li>
                            <li><FaEnvelope /> support@greengarden.com</li>
                        </ul>
                    </div>

                    {/* Cột 2: Hỗ trợ khách hàng */}
                    <div className={styles.column}>
                        <h4>HỖ TRỢ KHÁCH HÀNG</h4>
                        <ul>
                            <li><a href="#">Hướng dẫn mua hàng</a></li>
                            <li><a href="#">Chính sách đổi trả 1-1</a></li>
                            <li><a href="#">Phương thức thanh toán</a></li>
                            <li><a href="#">Chính sách bảo hành cây</a></li>
                            <li><a href="#">Câu hỏi thường gặp (FAQ)</a></li>
                        </ul>
                    </div>

                    {/* Cột 3: Danh mục nổi bật */}
                    <div className={styles.column}>
                        <h4>DANH MỤC PHỔ BIẾN</h4>
                        <ul>
                            <li><a href="#">Cây Ăn Trái</a></li>
                            <li><a href="#">Cây Bonsai Nghệ Thuật</a></li>
                            <li><a href="#">Hoa Lan Đột Biến</a></li>
                            <li><a href="#">Cây Cảnh Văn Phòng</a></li>
                            <li><a href="#">Phân Bón & Vật Tư</a></li>
                        </ul>
                    </div>

                    {/* Cột 4: Kết nối & Bản đồ */}
                    <div className={styles.column}>
                        <h4>KẾT NỐI VỚI CHÚNG TÔI</h4>
                        <div className={styles.socials}>
                            <a href="#" className={styles.fb}><FaFacebookF /></a>
                            <a href="#" className={styles.insta}><FaInstagram /></a>
                            <a href="#" className={styles.tiktok}><FaTiktok /></a>
                            <a href="#" className={styles.yt}><FaYoutube /></a>
                        </div>
                        <div className={styles.certification}>
                            <p>Chứng nhận website an toàn</p>
                            {/* Giả lập hình ảnh chứng nhận */}
                            <div className={styles.badge}>BỘ CÔNG THƯƠNG</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.bottomBar}>
                <p>&copy; 2025 Green Garden Group. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;