
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from "react-i18next";
import './ProductGrid.css';

const ProductGrid = ({ myId }) => {
    const [collectionProducts, setCollectionProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { t, i18n } = useTranslation(); // Import and use the translation hook
    const collectionId = myId || 138; // Default collection ID if not provided

    useEffect(() => {
        const fetchCollectionProducts = async () => {
            try {
                const collectionResponse = await axios.get(`https://vtex-backend-l0v5.onrender.com/collectionProduct?collectionId=${collectionId}`);
                if (Array.isArray(collectionResponse.data)) {
                    const products = collectionResponse.data;

                    // Fetch pricing for each product's SkuId
                    const productsWithPrices = await Promise.all(
                        products.map(async (product) => {
                            try {
                                const priceResponse = await axios.get(`https://vtex-backend-l0v5.onrender.com/pricing/${product.SkuId}`);
                                return {
                                    ...product,
                                    basePrice: priceResponse.data.basePrice || 0
                                };
                            } catch (error) {
                                console.error(`Error fetching price for SkuId ${product.SkuId}:`, error);
                                return { ...product, basePrice: 0 };
                            }
                        })
                    );

                    setCollectionProducts(productsWithPrices);
                } else {
                    setError(t("Invalid response format from collection API"));
                }
            } catch (err) {
                console.error(t("Error fetching collection products:"), err);
                setError(t("Failed to fetch collection products"));
            } finally {
                setLoading(false);
            }
        };

        fetchCollectionProducts();
    }, [collectionId, t]);

    if (loading) {
        return (
            <div className="loader-container">
                <div className="loader"></div>
                <p>{t("Loading collection products...")}</p>
            </div>
        );
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="collection-product-container">
            <h1 className="product-heading">{t("Collection Products")}</h1>

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
                                <h3 className="product-name">
                                    {i18n.language === "ar"
                                        ? product.skuDetails.ProductSpecifications.find(spec => spec.FieldName === "Arabic title")?.FieldValues?.[0] || t("Product Name Not Available")
                                        : product.ProductName || t("Product Name Not Available")}
                                </h3>
                                <p className="product-price">
                                    {product.basePrice ? `$${(product.basePrice / 100).toFixed(2)}` : t("Price not available")}
                                </p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>{t("No products found in this collection.")}</p>
                )}
            </div>
        </div>
    );
};

export default ProductGrid;
