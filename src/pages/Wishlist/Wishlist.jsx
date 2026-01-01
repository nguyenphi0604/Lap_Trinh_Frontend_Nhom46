import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromWishlist } from '../../redux/wishlistSlice'; // Đảm bảo đường dẫn đúng

const Wishlist = () => {
    const wishlistItems = useSelector((state) => state.wishlist.items);
    const dispatch = useDispatch();

    const handleRemove = (id) => {
        dispatch(removeFromWishlist(id));
    };

    return (
        <div className="container mt-5" style={{ minHeight: '60vh' }}>
            <h2 className="mb-4">Danh sách yêu thích của tôi</h2>

            {wishlistItems.length === 0 ? (
                <div className="text-center mt-5">
                    <p>Bạn chưa có sản phẩm yêu thích nào.</p>
                    <Link to="/" className="btn btn-success">Khám phá sản phẩm ngay</Link>
                </div>
            ) : (
                <div className="row">
                    {wishlistItems.map((item) => (
                        <div key={item.id} className="col-md-3 mb-4">
                            <div className="card h-100 shadow-sm">
                                <img
                                    src={item.image}
                                    className="card-img-top"
                                    alt={item.name}
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title" style={{ fontSize: '1rem' }}>{item.name}</h5>
                                    <p className="card-text text-danger fw-bold">
                                        {item.price.toLocaleString()}đ
                                    </p>
                                    <div className="mt-auto d-grid gap-2">
                                        <Link to={`/product/${item.id}`} className="btn btn-outline-primary btn-sm">
                                            Xem chi tiết
                                        </Link>
                                        <button
                                            className="btn btn-outline-danger btn-sm"
                                            onClick={() => handleRemove(item.id)}
                                        >
                                            Xóa khỏi yêu thích
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;