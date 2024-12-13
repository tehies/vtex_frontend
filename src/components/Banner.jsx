import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Banner.css';
import CollectionProduct from './CollectionProduct';
import CollectionPage from './CollectionPage';
import SearchComponent from './SearchComponent';

const Banner = ({ imageSrc, title, description, productid }) => { // Ensure the correct prop name
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://vtex-backend-l0v5.onrender.com/collectionProduct');
                console.log('API Response:', response.data); // Log the structure for debugging
                setProducts(response.data.products || []); // Adjust key based on API response
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="banner-container">
            <div className="banner-image">
                <img
                    src={imageSrc}
                    alt="Banner"
                    className="banner-image-tag"
                />
            </div>
            <div className="banner-content">
                <h2 className="banner-title">{title}</h2>
                <p className="banner-description">{description}</p>

                {/* Pass the productid prop to CollectionProduct */}
                <CollectionProduct id={productid} />

            </div>
        </div>
    );
};

export default Banner;
