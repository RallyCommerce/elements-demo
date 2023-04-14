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
        rally.events.subscribe(('order.initiated'), () => handleShowConfirmation());
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
