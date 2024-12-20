import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { setOrderForm, clearCart, incrementQuantity, decrementQuantity } from './cartSlice';
import { useTranslation } from "react-i18next";

const Cart = () => {
    const { orderFormId } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const cart = useSelector((state) => state.cart.orderForm);
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const fetchCartDetails = async () => {
            const storedOrderFormId = localStorage.getItem('orderFormId');
            if (!storedOrderFormId) return;
    
            setLoading(true);
            setError(null); // Reset error before fetching
    
            // try {
            //     const { data } = await axios.get(`https://vtex-backend-l0v5.onrender.com/cart-with-product-details/${orderFormId}`);
            //     dispatch(setOrderForm(data));
            
            //     // Ensure ProductSpecifications exists and is an array
            //     const productSpecifications = Array.isArray(data?.productDetails) ? data.productDetails : [];
            
            //     // Map to extract skuDetails and their ProductSpecifications
            //     const skuSpecifications = productSpecifications.map(spec => spec?.skuDetails?.ProductSpecifications || []);
            
            //     console.log("Specifications:", skuSpecifications);
            
            //     // Find the Arabic title
            //     const arabicTitle = skuSpecifications
            //         .flat() // Flatten the array to handle nested arrays inside ProductSpecifications
            //         .find(spec => spec?.FieldName === 'Arabic title')?.FieldValues?.[0] || 'N/A';
            
            //     console.log('Arabic Title:', arabicTitle);
            // } 
            try {
                const { data } = await axios.get(`https://vtex-backend-l0v5.onrender.com/cart-with-product-details/${orderFormId}`);
                dispatch(setOrderForm(data));
            
                // Ensure ProductSpecifications exists and is an array
                const productSpecifications = Array.isArray(data?.productDetails) ? data.productDetails : [];
            
                // Map through the items and assign arabicTitle for each item
                const updatedItems = data?.items?.map(item => {
                    const skuSpecifications = productSpecifications
                        .find(spec => spec?.skuDetails?.ProductSpecifications)
                        ?.skuDetails?.ProductSpecifications || [];
            
                    const arabicTitle = skuSpecifications
                        .flat()
                        .find(spec => spec?.FieldName === 'Arabic title')?.FieldValues?.[0] || 'N/A';
            
                    // Assign arabicTitle to the item
                    return { ...item, arabicTitle };
                }) || [];
            console.log(updatedItems);
                // Now, update the entire order form including the updated items
                dispatch(setOrderForm({ ...data, items: updatedItems }));
            } 
            catch (err) {
                console.error('Error fetching cart details:', err);
                setError('Failed to load cart');
            } finally {
                setLoading(false);
            }
        };
    
        fetchCartDetails();
    }, [orderFormId, dispatch]);
    

    const handleIncrement = (itemId) => {
        dispatch(incrementQuantity(itemId));
    };

    const handleDecrement = (itemId) => {
        dispatch(decrementQuantity(itemId));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
        localStorage.removeItem('orderFormId');
    };

    const calculateTotalPrice = () => {
        return cart.items?.reduce((total, item) => total + item.price * item.quantity, 0) || 0;
    };

    if (loading) return <div>Loading cart...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className='cart-details'>
            <h1>{t("Your Cart")}</h1>
            {cart.items && cart.items.length > 0 ? (
                <table className='cartTable'>
                    <thead>
                        <tr>
                            <th>{t("Image")}</th>
                            <th>{t("Item")}</th>
                            <th>{t("Quantity")}</th>
                            <th>{t("Price")}</th>
                            <th>{t("Total Price")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.items.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <img
                                        src={item.imageUrl}
                                        alt={item.name}
                                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                    />
                                </td>
                                {/* <td>{item.name}</td> */}
                                  <td>
                                  {i18n.language === "ar"
                    ? item.arabicTitle || t("Product Name Not Available")
                    : item.name || t("Product Name Not Available")}
                                  </td>

                                <td className='Quantity-btn'>
                                    <div className='btn-style'>
                                        <button
                                            onClick={() => handleDecrement(item.id)}
                                            disabled={item.quantity <= 1}
                                            style={{ marginRight: '15px' }}
                                        >
                                            -
                                        </button>
                                        {item.quantity}
                                        <button
                                            onClick={() => handleIncrement(item.id)}
                                            style={{ marginLeft: '15px' }}
                                        >
                                            +
                                        </button>
                                    </div>
                                </td>
                                <td>{item.price ? `$ ${(item.price / 100).toFixed(2)}` : '$0.00'}</td>
                                <td>${(item.price * item.quantity / 100).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan='4' style={{ textAlign: 'right' }}>
                                <strong>{t("Total Price")}:</strong>
                            </td>
                            <td>
                                <strong>${(calculateTotalPrice() / 100).toFixed(2)}</strong>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            ) : (
                <p>{t("No items in the cart")}</p>
            )}
            <button onClick={handleClearCart} style={{ marginTop: '20px' }}>
                {t("Clear Cart")}
            </button>
        </div>
    );
};

export default Cart;
