import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { setOrderForm, clearCart } from '../../Redux/cartSlice';


const Cart = () => {
    const { orderFormId } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const cart = useSelector((state) => state.cart.orderForm);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCartDetails = async () => {
            try {
                const {data} = await axios.get(`http://localhost:4700/cart/${orderFormId}`);
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

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    if (loading) {
        return <div>Loading cart...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return cart ? (
        <div>
            <h1>Your Cart</h1>
            <h4>OrderForm ID: <span>{orderFormId}</span></h4>
            <div>
            {cart.items && cart.items.length > 0 ? (
    cart.items.map((item, index) => (
        <div key={index} className="cart-item">
            <p><strong>Item:</strong> {item.name}</p>
            <p><strong>Quantity:</strong> {item.quantity}</p>
            <p><strong>Price:</strong> ${(item.price / 100).toFixed(2)}</p>
        </div>
    ))
) : (
    <p>No items in the cart</p>
)}
            </div>
            <p><strong>Total Value:</strong> ${(cart.value / 100).toFixed(2)}</p>
            <button onClick={handleClearCart}>Clear Cart</button>
        </div>
    ) : (
        <div>Cart is empty</div>
    );
};


export default Cart;