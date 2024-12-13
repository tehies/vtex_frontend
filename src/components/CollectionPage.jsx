import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for routing

const CollectionPage = ({ id }) => {
    const [collectionProducts, setCollectionProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sortOrder, setSortOrder] = useState(''); // Sort state for low to high, high to low, etc.

    const collectionId = id; // Dynamically set your collection ID

    useEffect(() => {
        const fetchCollectionProducts = async () => {
            try {
                const response = await axios.get(`https://vtex-backend-l0v5.onrender.com/collectionProduct?collectionId=${collectionId}`);
                console.log('API Response:', response);

                if (Array.isArray(response.data.Data)) {
                    const products = response.data.Data;

                    // Fetch prices for each product
                    const productsWithPrices = await Promise.all(
                        products.map(async (product) => {
                            try {
                                const priceResponse = await axios.get(`https://vtex-backend-l0v5.onrender.com/pricing/${product.SkuId}`);
                                // const priceResponse = await axios.get(`http://localhost:3000/pricing/${product.SkuId}`);
                                console.log(`Price for SkuId ${product.SkuId}:`, priceResponse.data.basePrice);

                                // Add the price to the product object
                                return { ...product, Price: priceResponse.data.basePrice || 0 };
                            } catch (err) {
                                console.error(`Error fetching price for SkuId ${product.SkuId}:`, err);
                                return { ...product, Price: 0 }; // Default price to 0 if API fails
                            }
                        })
                    );

                    setCollectionProducts(productsWithPrices);
                    setFilteredProducts(productsWithPrices); // Initially set filteredProducts to all products
                } else {
                    setError('Data is not an array');
                }
            } catch (err) {
                console.error('Error fetching products:', err);
                setError('Error fetching products');
            } finally {
                setLoading(false);
            }
        };

        fetchCollectionProducts();
    }, [collectionId]);

    // Function to handle price filter
    const handleFilterChange = (event) => {
        const value = event.target.value;
        setSortOrder(value);

        let filtered = [...collectionProducts];

        if (value === 'lowToHigh') {
            filtered = filtered.sort((a, b) => a.Price - b.Price);
        } else if (value === 'highToLow') {
            filtered = filtered.sort((a, b) => b.Price - a.Price);
        } else if (value === 'aToZ') {
            filtered = filtered.sort((a, b) => a.ProductName.localeCompare(b.ProductName));
        } else if (value === 'zToA') {
            filtered = filtered.sort((a, b) => b.ProductName.localeCompare(a.ProductName));
        }

        setFilteredProducts(filtered);
    };

    if (loading) {
        return (
            <div className="loader-container">
                <div className="loader"></div>
                <p>Loading collection products...</p>
            </div>
        );
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="collection-product-container">
            <h1 className="product-heading">Collection Products</h1>

            {/* Sorting Controls */}
            <div className="sorting-controls">
                <label htmlFor="sortOrder">Sort By:</label>
                <select id="sortOrder" value={sortOrder} onChange={handleFilterChange}>
                    <option value="">Default</option>
                    <option value="lowToHigh">Price: Low to High</option>
                    <option value="highToLow">Price: High to Low</option>
                    <option value="aToZ">Name: A to Z</option>
                    <option value="zToA">Name: Z to A</option>
                </select>
            </div>

            {/* Product Grid */}
            <div className="product-grid">
                {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <Link key={product.SkuId} to={`/product/${product.SkuId}`} className="product-card-link">
                            <div key={product.ProductId} className="product-card">
                                <img
                                    src={product.SkuImageUrl || 'default-image.jpg'}
                                    alt={product.ProductName}
                                    className="product-image"
                                />
                                <div className="product-name">{product.ProductName}</div>
                                <p className="product-price">
                                    {product.Price ? `$${(product.Price / 100).toFixed(2)}` : 'Price not available'}
                                </p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div>No products found in this collection.</div>
                )}
            </div>
        </div>
    );
};

export default CollectionPage;
