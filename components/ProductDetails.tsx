import React from 'react';
import FeatureCard from "@/components/common/FeatureCard"
import ActionButton from "@/components/common/ActionButton"
import styles from "@/styles/Home.module.scss"
import { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../lib/rally/Context';

interface ProductDetailsProps {
    scrollToCheckout: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ scrollToCheckout }) => {
    const [productPrice, setProductPrice] = useState<any>(null);
    const imageGalleryRef = useRef<HTMLDivElement>(null);
    const { product, rally } = useContext(Context)
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('productId');

    useEffect(() => {
        if (product) {
            setProductPrice(rally.currency.transform(product?.discountedPrice));
            let images = [product?.image];
            rally.elements.update(imageGalleryRef.current, { images: images });
        }
    }, [product])

    return (<>
        <div className="text-center rally-mb-5">
            <h1 className={styles.title}>Take home the<br /> {product?.title}<br /> for just {productPrice}!</h1>
        </div>
        <rally-image-gallery ref={imageGalleryRef} config='{"galleryLayout":{"desktop":"thumbnails","mobile":"stacked"}}'></rally-image-gallery>
        <div className="buy-now-action">
            <ActionButton onClick={scrollToCheckout}>BUY NOW</ActionButton>
        </div>
        {productId ? (<span></span>) : (
            <div className="rally-d-flex text-center rally-mt-5">
                <div className="rally-pr-1">
                    <FeatureCard
                        iconSrc="/handshake-icon.svg"
                        iconAlt="Handshake Icon"
                        text="No-miss guarantee."
                        subText="If you miss, you’re doing it wrong."
                    ></FeatureCard>
                </div>
                <div className="rally-pl-1">
                    <FeatureCard
                        iconSrc="/bolt-icon.svg"
                        iconAlt="Bolt Icon"
                        text="Super-charge your game instantly. Sink shot after shot with the distance of a pro."
                    ></FeatureCard>
                </div>
            </div>
        )}
        <div dangerouslySetInnerHTML={{ __html: product?.description }} className={styles.mainText}>
        </div>
    </>
    );
};

export default ProductDetails;