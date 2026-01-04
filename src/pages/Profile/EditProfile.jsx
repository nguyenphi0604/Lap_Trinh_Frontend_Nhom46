import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './EditProfile.module.scss';

const EditProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userProfile = useSelector(state => state.orders?.userProfile || {});

    const [formData, setFormData] = useState({
        name: userProfile.name || "",
        email: userProfile.email || "",
        phone: userProfile.phone || "",
        address: userProfile.address || ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = (e) => {
        e.preventDefault();
        dispatch({ type: 'orders/updateProfile', payload: formData });
        alert("Cập nhật hồ sơ thành công!");
        navigate('/profile');
    };

    return (
        <div className={styles.profileContainer}>
            <Header />
            <div className="container mt-5 mb-5">
                <div className={styles.editCard}>
                    <div className={styles.editHeader}>
                        <h2>Chỉnh sửa hồ sơ</h2>
                        <p>Quản lý thông tin cá nhân của bạn</p>
                    </div>

                    <form className={styles.editForm} onSubmit={handleSave}>
                        <div className={styles.formGroup}>
                            <label>Họ và tên</label>
                            <input name="name" type="text" value={formData.name} onChange={handleChange} required placeholder="Nhập họ tên..." />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Email</label>
                            <input name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="Nhập email..." />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Số điện thoại</label>
                            <input name="phone" type="text" value={formData.phone} onChange={handleChange} placeholder="Nhập số điện thoại..." />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Địa chỉ</label>
                            <textarea name="address" value={formData.address} onChange={handleChange} rows="3" placeholder="Nhập địa chỉ chi tiết..." />
                        </div>

                        <div className={styles.actionButtons}>
                            <button type="button" className={styles.cancelBtn} onClick={() => navigate('/profile')}>
                                Hủy bỏ
                            </button>
                            <button type="submit" className={styles.saveBtn}>
                                Lưu thay đổi
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default EditProfile;