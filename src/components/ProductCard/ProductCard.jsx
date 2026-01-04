import React from 'react';
import { FaStar, FaHeart, FaRegHeart } from 'react-icons/fa'; // Thêm icon Heart
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks'; // Thêm useAppSelector
import { addToCart } from '../../redux/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../redux/wishlistSlice'; // Thêm action wishlist
import styles from './ProductCard.module.scss';

const ProductCard = ({ product }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // Kiểm tra xem sản phẩm đã có trong wishlist chưa
    const wishlistItems = useAppSelector(state => state.wishlist?.items || []);
    const isFavorite = wishlistItems.some(item => item.id === product.id);

    const handleGoToDetail = () => {
        navigate(`/product/${product.id}`);
    };

    const handleAddToCart = (e) => {
        e.stopPropagation();
        dispatch(addToCart(product));
    };

    const handleToggleWishlist = (e) => {
        e.stopPropagation(); // Ngăn chặn sự kiện click lan ra thẻ card
        if (isFavorite) {
            dispatch(removeFromWishlist(product.id));
        } else {
            dispatch(addToWishlist(product));
        }
    };

    return (
        <div className={styles.card} onClick={handleGoToDetail}>
            {/* Nút Yêu thích */}
            <div className={styles.wishlistIcon} onClick={handleToggleWishlist}>
                {isFavorite ? <FaHeart color="#ff4757" /> : <FaRegHeart />}
            </div>

            {product.oldPrice && (
                <div className={styles.badge}>
                    -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                </div>
            )}

            <div className={styles.imagePlaceholder}>
                <img
                    src={product.images?.[0] || product.image}
                    alt={product.name}
                    onError={(e) => e.target.src = 'https://via.placeholder.com/300?text=No+Image'}
                />
            </div>

            <div className={styles.cardInfo}>
                <span className={styles.cateName}>{product.category || 'Cây Cảnh'}</span>
                <h3>{product.name}</h3>

                <div className={styles.priceRow}>
                    <span className={styles.price}>
                        {product.price.toLocaleString()}đ
                    </span>
                    {product.oldPrice && (
                        <span className={styles.oldPrice}>
                            {product.oldPrice.toLocaleString()}đ
                        </span>
                    )}
                </div>

                <div className={styles.rating}>
                    {[...Array(5)].map((_, i) => (
                        <FaStar key={i} color={i < (product.rating || 5) ? "#ffc107" : "#e4e5e9"} />
                    ))}
                    <span>({product.reviews || 0})</span>
                </div>
            </div>

            <button className={styles.addBtn} onClick={handleAddToCart}>
                Thêm vào giỏ
            </button>
        </div>
    );
};

export default ProductCard;