import React, { useState } from 'react';
import styles from './Auth.module.scss';
import { Link, useNavigate } from 'react-router-dom'; // Thêm useNavigate

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate(); // Khởi tạo hàm điều hướng

    const handleSubmit = (e) => {
        e.preventDefault();

        // Giả lập logic xử lý:
        // Trong thực tế, bạn sẽ gọi API ở đây. Nếu thành công thì mới chuyển trang.
        console.log(isLogin ? "Đang đăng nhập..." : "Đang đăng ký...");

        // Sau khi xử lý xong, điều hướng người dùng về trang chủ
        navigate('/');
    };

    return (
        <div className={styles.container}>
            <div className={styles.imageSide}>
                <div className={styles.overlay}>
                    <h2>FINITI<span>GARDEN</span></h2>
                    <p>Mang thiên nhiên vào cuộc sống của bạn</p>
                </div>
            </div>
            <div className={styles.formSide}>
                <div className={styles.formContent}>
                    <h2>{isLogin ? 'Đăng Nhập' : 'Đăng Ký'}</h2>
                    <p>Chào mừng bạn quay trở lại!</p>

                    {/* Thay onClick của form bằng onSubmit */}
                    <form onSubmit={handleSubmit}>
                        {!isLogin && <input type="text" placeholder="Họ và tên" required />}
                        <input type="email" placeholder="Địa chỉ Email" required />
                        <input type="password" placeholder="Mật khẩu" required />

                        <button type="submit">
                            {isLogin ? 'Đăng Nhập' : 'Đăng Ký'}
                        </button>
                    </form>

                    <p className={styles.switch}>
                        {isLogin ? 'Chưa có tài khoản? ' : 'Đã có tài khoản? '}
                        <span onClick={() => setIsLogin(!isLogin)}>
                            {isLogin ? 'Đăng ký ngay' : 'Đăng nhập ngay'}
                        </span>
                    </p>
                    <Link to="/" className={styles.backHome}>Quay về trang chủ</Link>
                </div>
            </div>
        </div>
    );
};

export default Auth;