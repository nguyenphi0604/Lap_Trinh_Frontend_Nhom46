import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks'; // Cấp 1: pages, Cấp 2: src
import ProductCard from '../../components/ProductCard/ProductCard'; // Đã sửa đường dẫn
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './SearchResults.module.scss';

const SearchResults = () => {
    const { items: products } = useAppSelector(state => state.products);
    const location = useLocation();

    // Lấy từ khóa query từ URL: ?q=ten-cay
    const query = new URLSearchParams(location.search).get('q')?.toLowerCase() || "";

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
    );

    return (
        <div className={styles.searchPage}>
            <Header />
            <main className="container" style={{ padding: '40px 20px', minHeight: '70vh' }}>
                <h2 style={{ marginBottom: '30px', color: '#1a1a1a' }}>
                    {query ? `Kết quả tìm kiếm cho: "${query}"` : "Tất cả sản phẩm"}
                </h2>

                {filteredProducts.length > 0 ? (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                        gap: '30px'
                    }}>
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', marginTop: '100px' }}>
                        <p style={{ fontSize: '18px', color: '#666' }}>
                            Không tìm thấy sản phẩm nào phù hợp với "{query}".
                        </p>
                        <button
                            onClick={() => window.history.back()}
                            style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}
                        >
                            Quay lại
                        </button>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default SearchResults;