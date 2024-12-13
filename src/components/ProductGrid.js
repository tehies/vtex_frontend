import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ProductGrid.css';

const ProductGrid = ({ myId }) => {
    const [collectionProducts, setCollectionProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const collectionId = myId || 138; // Default collection ID if not provided

    useEffect(() => {
        const fetchCollectionProducts = async () => {
            try {
                // const collectionResponse = await axios.get(`http://localhost:3000/collectionProduct?collectionId=${collectionId}`);
                const collectionResponse = await axios.get(`https://vtex-backend-l0v5.onrender.com/collectionProduct?collectionId=${collectionId}`);
                if (Array.isArray(collectionResponse.data.Data)) {
                    const products = collectionResponse.data.Data;

                    // Fetch pricing for each product's SkuId
                    const productsWithPrices = await Promise.all(
                        products.map(async (product) => {
                            try {
                                // const priceResponse = await axios.get(`http://localhost:3000/pricing/${product.SkuId}`);
                                const priceResponse = await axios.get(`https://vtex-backend-l0v5.onrender.com/pricing/${product.SkuId}`);
                                console.log(`Price for SkuId ${product.SkuId}:`, priceResponse.data.basePrice);

                                return { ...product, basePrice: priceResponse.data.basePrice || 0 }; // Include basePrice or default to 0
                            } catch (error) {
                                console.error(`Error fetching price for SkuId ${product.SkuId}:`, error);
                                return { ...product, basePrice: 0 }; // Default basePrice to 0 on error
                            }
                        })
                    );

                    setCollectionProducts(productsWithPrices);
                } else {
                    setError('Invalid response format from collection API');
                }
            } catch (err) {
                console.error('Error fetching collection products:', err);
                setError('Failed to fetch collection products');
            } finally {
                setLoading(false);
            }
        };

        fetchCollectionProducts();
    }, [collectionId]);

    if (loading) {
        return (
            <div className="loader-container">
                <div className="loader"></div>
                <p>Loading collection products...</p>
            </div>
        );
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="collection-product-container">
            <h1 className="product-heading">Collection Products</h1>
            <div className="product-grid">
                {collectionProducts.length > 0 ? (
                    collectionProducts.map((product) => (
                        <Link key={product.SkuId} to={`/product/${product.SkuId}`} className="product-card-link">
                            <div className="product-card">
                                <img
                                    src={product.SkuImageUrl || 'default-image.jpg'}
                                    alt={product.ProductName}
                                    className="product-image"
                                />
                                <h3 className="product-name">{product.ProductName}</h3>
                                <p className="product-price">
                                    {product.basePrice ? `$${(product.basePrice / 100).toFixed(2)}` : '0'}
                                    {/* {price ? `$${(price / 100).toFixed(2)}` : `${0}`} */}
                                </p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>No products found in this collection.</p>
                )}
            </div>
        </div>
    );
};

export default ProductGrid;

