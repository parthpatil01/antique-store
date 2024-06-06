import './ProductProfile.css';
import { IonIcon } from '@ionic/react';
import { chevronBack, chevronForward, bagHandleOutline,trashBinOutline, heartCircleOutline, heartCircle } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import makeRequestWithToken from '../../helper/makeRequestWithToken';
import { useSelector } from 'react-redux';
import { selectEmail } from '../slices/authSlice';

export default function ProductProfile() {

    const { id } = useParams(); // Get the ID from URL parameter
    const [product, setProduct] = useState(null); // State to store the product data
    const [sliderPos, setSliderPos] = useState(0); // Initial slider position
    const totalSliderItems = 4; // Total number of slider items
    const email = useSelector(selectEmail)
    const [wishlistButtonDisabled, setWishlistButtonDisabled] = useState(false);
    const [cartButtonDisabled, setCartButtonDisabled] = useState(false);

    const [heart, setHeart] = useState(heartCircleOutline);
    const [cartIcon,setCartIcon] = useState(bagHandleOutline);
    const [cartText,setCartText] = useState('Add to cart');

    // Function to fetch product details based on the ID
    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const baseURL = process.env.REACT_APP_API_URL;
                const response = await axios.get(`${baseURL}/products/${id}?email=${email}`);
                setProduct(response.data.product); // Set the fetched product data
                if(response.data.isWishlisted){
                    setHeart(heartCircle)
                }
                if(response.data.isAddedToCart){
                    setCartIcon(trashBinOutline)
                    setCartText('Remove from cart')
                }
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        fetchProductDetails();
    }, [id]); // Trigger the effect when the ID changes

    // Function to increase product quantity
    const handleWishlish = () => {

        // Disable wishlist button
        setWishlistButtonDisabled(true);


        try {
            makeRequestWithToken('/verifiedUsers/add-to-wishlist', 'POST', { email, productId: product._id }).then(response => {
                if (response.status == 201) {
                    setHeart(heartCircle)
                } else {
                    setHeart(heartCircleOutline)
                }
                setWishlistButtonDisabled(false);

            })

        } catch (error) {
            console.error(error);
            alert('An unexpected error occurred. Please try again later.');
        } finally {
            console.log('addeds to wishlist')
        }

    };

    const handleCart = () => {

        // Disable wishlist button
        setCartButtonDisabled(true);
        console.log('clicked')

        try {
            makeRequestWithToken('/verifiedUsers/add-to-cart', 'POST', { email, productId: product._id }).then(response => {
                if (response.status == 201) {
                    setCartIcon(trashBinOutline)
                    setCartText('Remove from cart')
                } else {
                    setCartIcon(bagHandleOutline)
                    setCartText('Add to cart')
                }
                setCartButtonDisabled(false);

            })

        } catch (error) {
            console.error(error);
            alert('An unexpected error occurred. Please try again later.');
        } finally {
            console.log('addeds to cart')
        }

    };

    function formatIndianCurrency(number) {
        const [integer, decimal] = number.toString().split('.');
        let lastThree = integer.slice(-3);
        const otherNumbers = integer.slice(0, -3);

        if (otherNumbers !== '') {
            lastThree = ',' + lastThree;
        }
        const result = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
        return `₹${result}${decimal ? '.' + decimal : ''}`;
    }


    const slideToNext = () => {
        if (sliderPos < totalSliderItems - 1) {
            setSliderPos(sliderPos + 1);
        }
    };

    const slideToPrev = () => {
        if (sliderPos > 0) {
            setSliderPos(sliderPos - 1);
        }
    };

    // Render loading message if product data is still being fetched or if product images are not available
    if (!product) {
        return <p>Loading...</p>;
    }


    return (

        <section className="section product" aria-label="product">
            <div className="container">

                <div className="product-slides" >

                    <div className="slider-banner" style={{ transform: `translateX(-${sliderPos * 100}%)` }} >
                        <figure className="product-banner">
                            <img src={product.images[0]} width="600" height="600" loading="lazy" alt="Nike Sneaker"
                                className="img-cover" />
                        </figure>

                        <figure className="product-banner">
                            <img src={product.images[1]} width="600" height="600" loading="lazy" alt="Nike Sneaker"
                                className="img-cover" />
                        </figure>

                        <figure className="product-banner">
                            <img src={product.images[2]} width="600" height="600" loading="lazy" alt="Nike Sneaker"
                                className="img-cover" />
                        </figure>

                        <figure className="product-banner">
                            <img src={product.images[3]} width="600" height="600" loading="lazy" alt="Nike Sneaker"
                                className="img-cover" />
                        </figure>
                    </div>

                    <button className="slide-btn prev" aria-label="Previous image" onClick={slideToPrev}>
                        <IonIcon icon={chevronBack} aria-hidden="true" />
                    </button>

                    <button className="slide-btn next" aria-label="Next image" onClick={slideToNext}>
                        <IonIcon icon={chevronForward} aria-hidden="true" />

                    </button>

                </div>

                <div className="product-content">

                    <p className="product-subtitle">The Antique Store</p>

                    <h1 className="h1 product-title">{product.name}</h1>

                    <p className="product-text">
                        {product.description}
                    </p>

                    <div className="wrapper">

                        <span className="price" >{formatIndianCurrency(product.price - product.price * (product.discount / 100))}</span>

                        {product.discount != 0 && <span className="badge">{product.discount}%</span>}

                        {product.discount != 0 && <del className="del">{product.price}</del>}

                    </div>

                    <div className="btn-group">

                        <div className="counter-wrapper">
                            <button className="counter-btn" disabled={wishlistButtonDisabled} onClick={handleWishlish} >
                                <IonIcon icon={heart} />
                            </button>

                        </div>

                        <button className="cart-btn" disabled={cartButtonDisabled} onClick={handleCart}>
                            <IonIcon icon={cartIcon} />

                            <span className="span">{cartText}</span>
                        </button>

                    </div>

                </div>

            </div>
        </section>
    );

}