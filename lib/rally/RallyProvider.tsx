import React, { useState, useEffect, ReactNode } from 'react';
import { Rally } from '@rallycommerce/elements';
import { Context } from './Context'
let isInitiated: boolean = false;


declare global {
    namespace JSX {
        interface IntrinsicElements {
            'rally-email': any;
            'rally-shipping-address': any;
            'rally-express-checkout-group': any;
            'rally-image-gallery': any;
            'rally-credit-card-payment': any;
            'rally-billing-address-option': any;
            'rally-pay-enroll': any;
            'rally-purchase-button': any;
            'rally-logo': any;
            'rally-confirmation-gate': any;
            'rally-confirmation-details': any;
        }
    }
}

interface RallyProviderProps {
    children: ReactNode;
}

export const RallyProvider: React.FC<RallyProviderProps> = ({ children }) => {
    const [product, setProduct] = useState<any>(null);


    const handleSessionState = () => {
        Rally.events.subscribe('cart.initiated', () => {
            const persistedItem = localStorage.getItem(`rallyCheckoutProduct`);
            const checkoutProduct = persistedItem ? JSON.parse(persistedItem) : Rally.data.cart.get().lineItems?.[0]
            localStorage.setItem(`rallyCheckoutProduct`, JSON.stringify(checkoutProduct))
            setProduct(checkoutProduct);
            localStorage.setItem('rallyCheckoutSessionId', Rally.data.page.get()?.checkoutSessionId);
        });
        Rally.events.subscribe('order.initiated', () => {
            localStorage.setItem('rallyPageType', 'confirmation');
        })
    }

    useEffect(() => {
        if (!isInitiated) {
            isInitiated = true;
            const params = new URLSearchParams(window.location.search);
            const productId = params.get('productId');
            const persistedCheckoutId = localStorage.getItem('rallyCheckoutSessionId');

            const persistedItem = localStorage.getItem(`rallyCheckoutProduct`)
            const checkoutProduct = persistedItem ? JSON.parse(persistedItem) : null;
            const isProductStored = params.get('productId') ? productId === checkoutProduct?.productId : true;
            const config: any = { includeElements: ['rally-confirmation-details'], flowSegments: ['other'], customCheckoutFlow: { disableRedirect: true }, sessionOrigin: 'landing_page', pageType: localStorage.getItem('rallyPageType') || 'checkout' };
            if (persistedCheckoutId && isProductStored) {
                config.checkoutSessionId = persistedCheckoutId;
            } else {
                localStorage.clear();
                config.lineItems = [{ productId: 300, quantity: 1, includeDetails: true }]
            }
            handleSessionState();
            Rally.init(process.env.NEXT_PUBLIC_RALLY_CLIENT_ID, config);
        }
    }, []);

    return (
        <Context.Provider value={{ product, setProduct, rally: Rally }}>
            {children}
        </Context.Provider>
    );
};

export default RallyProvider;
