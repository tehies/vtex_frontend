import React, { useEffect, useState } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductPage.css';
import { useDispatch } from 'react-redux';
import { setOrderForm } from './cartSlice';
import { useTranslation } from "react-i18next";

const ProductPage = () => {
    const { t, i18n } = useTranslation();
    const skuId = useParams().id;
    const [sku, setSku] = useState(null);
    const [price, setPrice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    // useEffect(() => {
    //     const fetchSkuAndPrice = async () => {
    //         try {
    //             // Fetch SKU details
    //             // const skuResponse = await axios.get(`http://localhost:3000/sku/${skuId}`);
    //             const skuResponse = await axios.get(`https://vtex-backend.onrender.com/sku/${skuId}`);

    //             // console.log(skuResponse.data)

    //             setSku(skuResponse.data);

    //             // Fetch Pricing details
    //             // const pricingResponse = await axios.get(`http://localhost:3000/pricing/${skuId}`);
    //             const pricingResponse = await axios.get(`https://vtex-backend.onrender.com/pricing/${skuId}`);
    //             setPrice(pricingResponse.data.basePrice);
    //         } catch (err) {
    //             console.error('Error fetching data:', err);
    //             setError('Error fetching product details');  
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchSkuAndPrice();
    // }, [skuId]);



    useEffect(() => {
        const fetchSkuAndPrice = async () => {
            try {
                // Fetch SKU details
                const skuResponse = await axios.get(`https://vtex-backend-l0v5.onrender.com/sku/${skuId}`);
                const skuData = skuResponse.data;
    
                // Extract Arabic title and description
                const arabicTitle = skuData.ProductSpecifications.find(
                    spec => spec.FieldName === "Arabic title"
                )?.FieldValues?.[0] || "N/A";
    
                const arabicDescription = skuData.ProductSpecifications.find(
                    spec => spec.FieldName === "Arabic description"
                )?.FieldValues?.[0] || "N/A";
    
                console.log("Arabic Title:", arabicTitle);
                console.log("Arabic Description:", arabicDescription);
    
                setSku({
                    ...skuData,
                    arabicTitle,
                    arabicDescription,
                });
    
                // Fetch Pricing details
                const pricingResponse = await axios.get(`https://vtex-backend-l0v5.onrender.com/pricing/${skuId}`);
                setPrice(pricingResponse.data.basePrice);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Error fetching product details');
            } finally {
                setLoading(false);
            }
        };
    
        fetchSkuAndPrice();
    }, [skuId]);
    



    const handleAddToCart = async () => {
        try {

            let orderFormId = localStorage.getItem('orderFormId')

            if (orderFormId == null) {

                const { data } = await axios.get('https://vtex-backend-l0v5.onrender.com/cart');
                orderFormId = data.orderFormId
                localStorage.setItem('orderFormId', data.orderFormId)
            }




            // dispatch(setOrderForm(data));

            const API_BASE_URL = "https://vtex-backend-l0v5.onrender.com";

            let response_add = await axios.post(`${API_BASE_URL}/add-to-cart/${orderFormId}`, {
                orderItems: [
                    {
                        quantity: 1,
                        seller: "1",
                        id: skuId,
                        index: 0,
                        price: 1099,
                    },
                ],
            });

            navigate(`/cart/${orderFormId}`, {
                state: {
                    orderFormId: orderFormId,
                    skuId
                },
            });
        } catch (err) {
            console.error('Error adding to cart:', err);
            alert('Failed to add to cart');
        }
    };




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
                    {/* <h1>
                        
                        {sku.ProductName || 'Product Name Not Available'}

                    </h1>
                    <p className="single_product-description">

                        {sku.ProductDescription || 'No description available'}

                    </p> */}


               <h1>
                {i18n.language === "ar" 
                    ? sku.arabicTitle || t("Product Name Not Available")
                    : sku.ProductName || t("Product Name Not Available")}
            </h1>
            <p className="single_product-description">
                {i18n.language === "ar" 
                    ? sku.arabicDescription || t("No description available")
                    : sku.ProductDescription || t("No description available")}
            </p>
                    <p className="single_product-price">
                        Price: {price ? `$ ${price.toFixed(2)}` : `${0}`}
                    </p>
                    <div className='addtocartBTN'>
                        <button onClick={handleAddToCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className="not-found-message">SKU not found</div>
    );


};

export default ProductPage;



