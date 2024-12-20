import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './SearchModal.css'; // Ensure correct import for your styles
import { useTranslation } from "react-i18next";
const SearchModal = ({ onClose }) => {
    const [query, setQuery] = useState('');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate(); // Initialize the navigate function
    const { t, i18n } = useTranslation();
    useEffect(() => {
        setIsOpen(true);
    }, []);

    useEffect(() => {
        if (query.trim()) {
            handleSearch();
        } else {
            setProducts([]);
        }
    }, [query]);

    const handleSearch = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get('https://vtex-backend-l0v5.onrender.com/searchProducts', {
            // const response = await axios.get('https://vtex-backend-l0v5.onrender.com/searchProducts', {
                params: { q: query },
            });
            setProducts(response.data);
        } catch (err) {
            setError('Failed to fetch search results. Please try again later.');
            console.error("Error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setIsOpen(false);
        setTimeout(onClose, 500);
    };

    const handleSearchButtonClick = () => {
        // Close the modal after searching
        handleClose();

        // Navigate to the SearchComponent page with the search query as a parameter
        navigate(`/search-results?q=${query}`);
    };

    const handleProductClick = (product) => {
        console.log(product);

        const skuId = product.skus && product.skus.skus[0].sku;
        console.log("hello", skuId);

        if (skuId) {
            // Navigate to the product page with the SKU ID
            navigate(`/product/${skuId}`);
        } else {
            navigate(`/product/${product.productId}`);
        }

        // Close the modal after clicking a product
        handleClose();
    };

    return (
        <div className={`search-modal ${isOpen ? 'open' : ''}`} onClick={handleClose}>
            <div className="search-modal-content" onClick={(e) => e.stopPropagation()}>
                <input
                    className='myinput'
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t("Search for products")}
                />
                <button onClick={handleSearchButtonClick}>{t("search")}</button> {/* Search Button */}

                {loading && <p className="nav-loading-text">Loading...</p>}
                {error && <p className="nav-error-text">{error}</p>}

                <div className="nav-products-grid">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div
                                key={product.productId}
                                className="nav-product-card"
                                onClick={() => handleProductClick(product)} // Pass entire product object
                            >
                                {/* <h4 className="nav-product-name">{product.productName}</h4> */}
                                {product.items && product.items[0]?.images && (
                                    <img
                                        src={product.items[0].images[0].imageUrl}
                                        alt={product.productName}
                                        className="nav-product-image"
                                    />
                                )}
                                {/* Display product price */}
                                <p className="nav-product-price">${product.items[0]?.sellers[0]?.commertialOffer?.Price / 100}</p>
                            </div>
                        ))
                    ) : (
                        !loading && <p className="nav-no-results-text"></p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchModal;

