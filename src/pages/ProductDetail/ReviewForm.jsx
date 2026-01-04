import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import styles from './ReviewForm.module.scss'; // Nhớ tạo cả file scss này nhé

const ReviewForm = ({ productId, onReviewSubmit }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating === 0) return alert("Vui lòng chọn số sao!");

        onReviewSubmit({
            id: Date.now(),
            productId,
            rating,
            comment,
            date: new Date().toLocaleDateString('vi-VN'),
            userName: "Khách hàng"
        });
        setRating(0);
        setComment("");
    };

    return (
        <div className={styles.reviewFormCard}>
            <h3>Đánh giá sản phẩm</h3>
            <form onSubmit={handleSubmit}>
                <div className={styles.starRating}>
                    {[...Array(5)].map((_, i) => {
                        const val = i + 1;
                        return (
                            <FaStar
                                key={i}
                                className={styles.star}
                                color={val <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                                onMouseEnter={() => setHover(val)}
                                onMouseLeave={() => setHover(0)}
                                onClick={() => setRating(val)}
                            />
                        );
                    })}
                </div>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Nhập bình luận..."
                    required
                />
                <button type="submit" className={styles.submitBtn}>Gửi đánh giá</button>
            </form>
        </div>
    );
};

export default ReviewForm;