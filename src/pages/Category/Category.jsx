import React, { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { fetchProducts } from '../../redux/productSlice';
import ProductCard from '../../components/ProductCard/ProductCard';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { FaChevronRight, FaHome } from 'react-icons/fa';
import styles from './Category.module.scss';

const Category = () => {
    const { type } = useParams(); // Lấy slug từ URL (vd: cay-an-trai)
    const dispatch = useAppDispatch();
    const { items: products, status } = useAppSelector(state => state.products);

    useEffect(() => {
        if (status === 'idle') dispatch(fetchProducts());
    }, [status, dispatch]);

    // Hàm chuyển đổi Slug URL sang Tên Category trong DB
    const getCategoryName = (slug) => {
        const map = {
            'cay-an-trai': "CÂY ĂN TRÁI",
            'cay-bonsai': "CÂY BONSAI",
            'cay-canh': "CÂY CẢNH",
            'cay-co-hoa': "CÂY CÓ HOA",
            'cay-doc-la': "CÂY ĐỘC LẠ",
            'cay-gia-vi': "CÂY GIA VỊ",
            'cay-giong': "CÂY GIỐNG",
            'cay-hoa-leo': "CÂY HOA LEO",
            'cay-lon': "CÂY LỚN",
            'hoa-lan': "HOA LAN",
            'phan-bon-vat-tu': "PHÂN BÓN - VẬT TƯ"
        };
        return map[slug] || "TẤT CẢ SẢN PHẨM";
    };

    const categoryName = getCategoryName(type);

    // Lọc sản phẩm
    const filteredProducts = useMemo(() => {
        if (!categoryName || categoryName === "TẤT CẢ SẢN PHẨM") return products;
        // So sánh tương đối (có thể cần toUpperCase để chính xác)
        return products.filter(p => p.category === categoryName);
    }, [products, categoryName]);

    return (
        <div className={styles.wrapper}>
            <Header />

            {/* Breadcrumb đơn giản */}
            <div className={styles.breadcrumb}>
                <Link to="/"><FaHome /> Trang chủ</Link>
                <FaChevronRight className={styles.icon} />
                <span>{categoryName}</span>
            </div>

            <div className={styles.container}>
                <div className={styles.headerSection}>
                    <h1>{categoryName}</h1>
                    <p>Tìm thấy {filteredProducts.length} sản phẩm phù hợp</p>
                </div>

                <div className={styles.grid}>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map(p => <ProductCard key={p.id} product={p} />)
                    ) : (
                        <div className={styles.empty}>Chưa có sản phẩm nào trong danh mục này.</div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Category;