// 4dec
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductPage.css';
import { Link } from 'react-router-dom'; // Import Link for routing

const ProductPage = () => {
    const skuId = useParams().id; // Get SKU ID from URL
    const [sku, setSku] = useState(null);
    const [price, setPrice] = useState(null);
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch SKU details
                // const skuResponse = await axios.get(`http://localhost:3000/sku/${skuId}`);
                const skuResponse = await axios.get(`https://vtex-backend-l0v5.onrender.com/sku/${skuId}`);
                setSku(skuResponse.data);

                // Fetch Pricing details
                // const pricingResponse = await axios.get(`http://localhost:3000/pricing/${skuId}`);
                const pricingResponse = await axios.get(`https://vtex-backend-l0v5.onrender.com/pricing/${skuId}`);
                setPrice(pricingResponse.data.basePrice); // Extract `basePrice` from the pricing response

                // Fetch recommended products
                const recommendationsResponse = await axios.get(
                    `https://vtex-backend-l0v5.onrender.com/recommendations/${skuId}`
                    // `http://localhost:3000/recommendations/${skuId}`
                );
                setRecommendedProducts(recommendationsResponse.data);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Error fetching product details');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [skuId]);

    if (loading) {
        return (
            <div className="loading-spinner">
                <div className="spinner"></div>
            </div>
        );
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return sku ? (
        <div className="single_product-page-container">
            {/* Main Product Display */}
            <div className="single_product-header">
                <h1>{sku.NameComplete || 'Product Name Not Available'}</h1>
            </div>
            <div className="single_product-details">
                <div className="single_product-images">
                    {sku.Images?.length > 0 ? (
                        <>
                            {/* First image large */}
                            <img
                                src={sku.Images[0].ImageUrl}
                                alt={sku.Images[0].ImageName || 'Main Image'}
                                className="single_product-main-img"
                            />
                            {/* Other images smaller */}
                            <div className="single_product-thumbnails">
                                {sku.Images.slice(1).map((image, index) => (
                                    <img
                                        key={index}
                                        src={image.ImageUrl}
                                        alt={image.ImageName || `Thumbnail ${index + 1}`}
                                        className="single_product-thumbnail-img"
                                    />
                                ))}
                            </div>
                        </>
                    ) : (
                        <img
                            src="default-image.jpg"
                            alt="Default Product"
                            className="single_product-main-img"
                        />
                    )}
                </div>
                <div className="single_product-info">
                    <h1>{sku.NameComplete || 'Product Name Not Available'}</h1>
                    <p className="single_product-description">
                        {sku.ProductDescription || 'No description available'}
                    </p>
                    <p className="single_product-price">
                        Price: {price ? `$${(price / 100).toFixed(2)}` : `${0}`}
                    </p>
                </div>
            </div>
            {/* Recommended Products Grid */}
            <div className="recommended_products-section">
                <h1>Recommended Products</h1>
                <div className="recommended_products-grid">
                    {recommendedProducts.length > 0 ? (
                        recommendedProducts.map((product) => (
                            <Link
                                key={product.productId}
                                to={`/product/${product.items[0]?.itemId}`} // Use the item's SKU ID for redirection
                                className="recommended_product-link"
                            >
                                <div className="recommended_product-card">
                                    <img
                                        src={product.items[0]?.images[0]?.imageUrl || 'default-image.jpg'}
                                        alt={product.productName || 'Recommended Product'}
                                        className="recommended_product-img"
                                    />
                                    <h3 className="recommended_product-name">
                                        {product.productName || 'Product Name'}
                                    </h3>
                                    <p className="recommended_product-price">
                                        {product.items[0]?.sellers[0]?.commertialOffer?.Price
                                            ? `$${product.items[0]?.sellers[0]?.commertialOffer?.Price.toFixed(2)}`
                                            : 'Price not available'}
                                    </p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p>No recommended products available.</p>
                    )}
                </div>
            </div>
        </div>

    ) : (
        <div className="not-found-message">SKU not found</div>
    );
};

export default ProductPage;












// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import './ProductPage.css';
// import { Link } from 'react-router-dom';

// const ProductPage = () => {
//     const skuId = useParams().id; // Get SKU ID from URL
//     const [sku, setSku] = useState(null);
//     const [price, setPrice] = useState(null);
//     const [recommendedProducts, setRecommendedProducts] = useState([]);
//     const [variants, setVariants] = useState([]);
//     const [selectedVariant, setSelectedVariant] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 // Fetch SKU details
//                 const skuResponse = await axios.get(`http://localhost:3000/sku/${skuId}`);
//                 setSku(skuResponse.data);

//                 // Fetch Pricing details
//                 const pricingResponse = await axios.get(`http://localhost:3000/pricing/${skuId}`);
//                 setPrice(pricingResponse.data.basePrice);

//                 // Fetch Variants
//                 if (skuResponse.data.ProductId) {
//                     const variantsResponse = await axios.get(
//                         `http://localhost:3000/product/${skuResponse.data.ProductId}/variants`
//                     );
//                     setVariants(variantsResponse.data.skus || []);
//                 }

//                 // Fetch Recommended Products
//                 const recommendationsResponse = await axios.get(
//                     `http://localhost:3000/recommendations/${skuId}`
//                 );
//                 setRecommendedProducts(recommendationsResponse.data);
//             } catch (err) {
//                 console.error('Error fetching data:', err);
//                 setError('Error fetching product details');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [skuId]);

//     const handleVariantClick = (variant) => {
//         // Update the selected variant details
//         setSelectedVariant({
//             name: variant.skuname || sku.NameComplete,
//             price: variant.bestPriceFormated || `$${(price / 100).toFixed(2)}`,
//             image: variant.image || sku.Images?.[0]?.ImageUrl || 'default-image.jpg',
//         });
//     };

//     if (loading) {
//         return (
//             <div className="loading-spinner">
//                 <div className="spinner"></div>
//             </div>
//         );
//     }

//     if (error) {
//         return <div className="error-message">{error}</div>;
//     }

//     const displayedImage = selectedVariant?.image || sku.Images?.[0]?.ImageUrl || 'default-image.jpg';
//     const displayedName = sku.SkuName || 'Product Name Not Available';
//     const displayedPrice = selectedVariant?.price || `$${(price / 100).toFixed(2)}`;

//     return sku ? (
//         <div className="single_product-page-container">
//             {/* Main Product Display */}
//             <div className="single_product-header">
//                 <h1>{displayedName}</h1>
//             </div>
//             <div className="single_product-details">
//                 <div className="single_product-images">
//                     <img
//                         src={displayedImage}
//                         alt="Selected Variant"
//                         className="single_product-main-img"
//                     />
//                 </div>
//                 <div className="single_product-info">
//                     <h1>{displayedName}</h1>
//                     <p className="single_product-description">
//                         {sku.ProductDescription || 'No description available'}
//                     </p>
//                     <p className="single_product-price">
//                         Price: {displayedPrice}
//                     </p>

//                     {/* Render All Variant Images Below the Price */}
//                     <div className="variant-images">
//                         {variants.length > 0 ? (
//                             <div className="variants-list">
//                                 {variants.map((variant) => (
//                                     <img
//                                         key={variant.sku}
//                                         src={variant.image || 'default-image.jpg'}
//                                         alt={variant.skuname || 'Variant Image'}
//                                         className="variant-thumbnail-img"
//                                         onClick={() => handleVariantClick(variant)} // Update the displayed variant on click
//                                     />
//                                 ))}
//                             </div>
//                         ) : (
//                             <p>No variants available for this product.</p>
//                         )}
//                     </div>
//                 </div>

//             </div>



//             {/* Recommended Products Section */}
//             <div className="recommended_products-section">
//                 <h1>Recommended Products</h1>
//                 <div className="recommended_products-grid">
//                     {recommendedProducts.length > 0 ? (
//                         recommendedProducts.map((product) => (
//                             <Link
//                                 key={product.productId}
//                                 to={`/product/${product.items?.[0]?.itemId}`}
//                                 className="recommended_product-link"
//                             >
//                                 <div className="recommended_product-card">
//                                     <img
//                                         src={
//                                             product.items?.[0]?.images?.[0]?.imageUrl ||
//                                             'default-image.jpg'
//                                         }
//                                         alt={product.productName || 'Recommended Product'}
//                                         className="recommended_product-img"
//                                     />
//                                     <h3 className="recommended_product-name">
//                                         {product.productName || 'Product Name'}
//                                     </h3>
//                                     <p className="recommended_product-price">
//                                         {product.items?.[0]?.sellers?.[0]?.commertialOffer?.Price
//                                             ? `$${product.items[0].sellers[0].commertialOffer.Price.toFixed(
//                                                 2
//                                             )}`
//                                             : 'Price not available'}
//                                     </p>
//                                 </div>
//                             </Link>
//                         ))
//                     ) : (
//                         <p>No recommended products available.</p>
//                     )}
//                 </div>
//             </div>
//         </div>
//     ) : (
//         <div className="not-found-message">SKU not found</div>
//     );

// };

// export default ProductPage;
