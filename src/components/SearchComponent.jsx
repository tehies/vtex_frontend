import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom'; // For accessing query parameters and navigation
import './SearchComponent.css'; // Import the CSS file

const SearchComponent = () => {
    const [query, setQuery] = useState('');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const location = useLocation();
    const navigate = useNavigate(); // For navigation

    // Handle URL query parameter and trigger search on initial load or when query changes
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const searchQuery = queryParams.get('q');
        setQuery(searchQuery || '');
        if (searchQuery) {
            handleSearch(searchQuery);
        }
    }, [location.search]);

    // Function to handle the search
    const handleSearch = async (queryParam) => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get('https://vtex-backend-l0v5.onrender.com/searchProducts', {
            // const response = await axios.get('https://vtex-backend-l0v5.onrender.com/searchProducts', {
                params: { q: queryParam },
            });
            setProducts(response.data);
        } catch (err) {
            setError('Failed to fetch search results. Please try again later.');
            console.error("Error:", err);
        } finally {
            setLoading(false);
        }
    };

    // Handle search input change
    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    // Handle search button click
    const handleSearchButtonClick = () => {
        if (query.trim()) {
            navigate(`/search-results?q=${query}`);
        }
    };

    // Navigate to product page on product click
    const handleProductClick = (product) => {
        const skuId = product.skus && product.skus.skus[0].sku;
        if (skuId) {
            navigate(`/product/${skuId}`);
        } else {
            navigate(`/product/${product.productId}`);
        }
    };

    return (
        <div className="col-search-container">
            <div className="col-search-heading">
                <h1>Search</h1>
            </div>
            <div className="col-search-input-wrapper">
                <input
                    type="text"
                    className="col-search-input"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Search for products..."
                />
                <button onClick={handleSearchButtonClick} className="col-search-button">
                    Search
                </button>
            </div>

            <h3>Search Results for: {query}</h3>

            {loading && (
                <div className="col-loader">
                    <div className="spinner"></div>
                    <p>Loading...</p>
                </div>
            )}
            {error && <p className="col-error-text">{error}</p>}

            <div className="col-products-grid">
                {!loading && products.length > 0 ? (
                    products.map((product) => (
                        <div
                            key={product.productId}
                            className="col-product-card"
                            onClick={() => handleProductClick(product)} // On product card click, navigate to the product page
                        >


                            {/* Display product image */}
                            {product.items && product.items[0]?.images && (
                                <img
                                    src={product.items[0].images[0].imageUrl}
                                    alt={product.productName}
                                    className="col-product-image"
                                />
                            )}

                            {/* Display product price */}
                            <h4 className="col-product-name">{product.productName}</h4>
                            <p className="col-product-price">
                                ${product.items[0]?.sellers[0]?.commertialOffer?.Price / 100}
                            </p>
                        </div>
                    ))
                ) : (
                    !loading && <p className="col-no-results-text">No results found.</p>
                )}
            </div>
        </div>
    );
};

export default SearchComponent;
