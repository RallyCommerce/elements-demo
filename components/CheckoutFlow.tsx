import React from 'react';
import Checkout from './Checkout';
import Confirmation from '@/components/Confirmation';
import { useState, useEffect, useContext } from 'react';
import { Context } from '../lib/rally/Context';


const CheckoutFlow = () => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const { rally } = useContext(Context);

    const handleShowConfirmation = () => {
        setShowConfirmation(!showConfirmation);
    };
    useEffect(() => {
        rally.events.subscribe(('customFlow.updated'), (data: any) => {
            if (data?.token) {
                sessionStorage.setItem('rallyAuthToken', JSON.stringify(data?.token));
            }
            if (data.type === 'confirmation') {
                rally.init(process.env.NEXT_PUBLIC_RALLY_CLIENT_ID, { checkoutSessionId: localStorage.getItem('rallyCheckoutSessionId'), pageType: 'confirmation' });
                setTimeout(() => handleShowConfirmation(), 1000);
                localStorage.clear();
            }
        });
    }, []);

    return (<>
        {showConfirmation ? (
            <div id="confirmationSection">
                <Confirmation></Confirmation>
            </div>
        ) : (
            <div id="checkoutSection">
                <Checkout></Checkout>
            </div>
        )}
    </>
    );
};

export default CheckoutFlow;
