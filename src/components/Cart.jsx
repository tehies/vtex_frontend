import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { setOrderForm, clearCart, incrementQuantity, decrementQuantity } from './cartSlice';


const Cart = () => {
    const { orderFormId } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const cart = useSelector((state) => state.cart.orderForm);
    const dispatch = useDispatch();


    useEffect(() => {
        const fetchCartDetails = async () => {

            const storedOrderFormId = localStorage.getItem('orderFormId');
            if (!storedOrderFormId) {
                return;
            }

            try {
                const { data } = await axios.get(`https://vtex-backend-l0v5.onrender.com/cart/${orderFormId}`);
                dispatch(setOrderForm(data));
            } catch (err) {
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

    if (loading) {
        return <div>Loading cart...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }


    return (
        <>
            <div className='cart-details'>
                <h1>Your Cart</h1>
                {/* <h4>OrderForm ID: <span>{orderFormId}</span></h4> */}
                {cart.items && cart.items.length > 0 ? (
                    <table className='cartTable'>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.items.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <img
                                            src={item.imageUrl}
                                            alt={item.name}
                                            style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                        />
                                    </td>
                                    <td>{item.name}</td>
                                    <td className='Quantity-btn'>
                                        <div className='btn-style'>
                                            <div className='minus-btn'>
                                                <button
                                                    onClick={() => handleDecrement(item.id)}
                                                    disabled={item.quantity <= 1}
                                                    style={{
                                                        marginRight: "15px"
                                                    }}>
                                                    -
                                                </button>
                                            </div>
                                            {item.quantity}
                                            <div className='add-btn'>
                                                <button
                                                    onClick={() => handleIncrement(item.id)}
                                                    style={{
                                                        marginLeft: "15px"
                                                    }}>
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {item.price ? `$ ${(item.price / 100).toFixed(2)}` : `${0}`}
                                        {/* ${(item.price / 100).toFixed(2)} */}
                                    </td>
                                    <td>
                                        ${(item.price * item.quantity / 100).toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        {/* <tfoot>
                            <tr>
                                <td colSpan="4">
                                    <strong>Total Value:</strong>
                                </td>
                                <td>
                                    ${(cart.value / 100).toFixed(2)}
                                </td>
                            </tr>
                        </tfoot> */}
                    </table>
                ) : (
                    <p>No items in the cart</p>
                )}
                <button onClick={handleClearCart} style={{ marginTop: "20px" }}>Clear Cart</button>
            </div>
        </>
    )

};


export default Cart;