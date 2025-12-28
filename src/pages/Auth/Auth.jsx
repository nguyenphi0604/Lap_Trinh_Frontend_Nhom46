import React, { useState } from 'react';
import styles from './Auth.module.scss';
import { Link, useNavigate } from 'react-router-dom';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [fullName, setFullName] = useState(''); // Lưu họ tên
    const [email, setEmail] = useState('');       // Lưu email
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // 1. Xác định tên hiển thị:
        // Nếu Đăng ký: lấy từ ô "Họ và tên".
        // Nếu Đăng nhập: lấy phần trước chữ @ của Email (ví dụ: phi0604@gmail.com -> phi0604)
        const displayName = !isLogin ? fullName : email.split('@')[0];

        // 2. Tạo object người dùng
        const userData = {
            username: displayName,
            email: email,
        };

        // 3. Lưu vào localStorage (Khóa 'user' phải khớp với Header)
        localStorage.setItem('user', JSON.stringify(userData));

        // 4. Thông báo và điều hướng
        alert(`${isLogin ? 'Đăng nhập' : 'Đăng ký'} thành công!`);
        navigate('/');

        // 5. Làm mới trang để Header cập nhật lại trạng thái mới nhất
        window.location.reload();
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

                    <form onSubmit={handleSubmit}>
                        {/* Nếu là Đăng ký thì mới hiện ô nhập Họ và tên */}
                        {!isLogin && (
                            <input
                                type="text"
                                placeholder="Họ và tên"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                            />
                        )}

                        <input
                            type="email"
                            placeholder="Địa chỉ Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <input
                            type="password"
                            placeholder="Mật khẩu"
                            required
                        />

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