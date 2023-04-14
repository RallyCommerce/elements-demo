import React, { useContext, useEffect, useRef } from 'react';
import { Context } from '../lib/rally/Context';

const Checkout = () => {
    const { rally } = useContext(Context);
    const purchaseBlockElement = useRef<HTMLDivElement>(null);
    const rightColumn = document.querySelector('.right-column');

    useEffect(() => {
        rally.events.subscribe(('payments.initiated'), () => {
            const expiryDateLabelEl = document.querySelector('label[for="vgs-card-expiry"]');
            const cvcErrorMessageEl = document.querySelector('label[for="vgs-card-cvc"]')?.parentElement?.querySelector('.rally-error-msg');
            const expiryDateErrorMessageEl = expiryDateLabelEl?.parentElement?.querySelector('.rally-error-msg');
            if (expiryDateLabelEl) {
                expiryDateLabelEl.innerHTML = "MM/YY";
                if (expiryDateErrorMessageEl) {
                    expiryDateErrorMessageEl.innerHTML = "Enter MM/YY";
                }
                if (cvcErrorMessageEl) {
                    cvcErrorMessageEl.innerHTML = "Enter code";
                }
            }
        });
    }, []);

    const isScrollable = (element: any) => {
        return element?.scrollHeight > element?.clientHeight;
    }

    const updateClass = () => {
        if (isScrollable(rightColumn)) {
            purchaseBlockElement.current?.classList.add('rally-purchase-block-fixed');
        } else {
            purchaseBlockElement.current?.classList.remove('rally-purchase-block-fixed');
        }
    }

    updateClass();
    window.addEventListener('resize', updateClass);
    rightColumn?.addEventListener('DOMNodeInserted', updateClass);

    return (<>
        <rally-express-checkout-group config='{"showHeading": false}'></rally-express-checkout-group>
        <div className="rally-separator rally-border-top rally-or-block">
            <h6 className="rally-express-heading">OR PAY WITH CARD</h6>
        </div>
        <rally-email config='{"heading": "Email", "consent": {"field": {"hidden": true}}}'></rally-email>
        <div className="rally-shipping-address-block">
            <rally-shipping-address config='{"fields":[{"key":"company","hidden":true,"validators":{"required":{"value":false}}}]}'></rally-shipping-address>
        </div>
        <div className="rally-credit-card-block rally-mt-4">
            <span className="rally-heading rally-card-information-heading rally-d-none">Card information</span>
            <rally-credit-card-payment config='{"style":{"isExpanded":true}, "loader":{"tileCount": 2, "enableOnBillingSection": false}}'>
                <div className="rally-billing-address-option-block">
                    <span className="rally-heading rally-billing-heading rally-d-none">Billing address</span>
                    <rally-billing-address-option></rally-billing-address-option>
                </div>
                <div className="rally-pay-enroll-block">
                    <rally-pay-enroll></rally-pay-enroll>
                </div>
                <div className="rally-purchase-block rally-mt-2" ref={purchaseBlockElement}>
                    <rally-purchase-button></rally-purchase-button>
                </div>
            </rally-credit-card-payment>
        </div>
    </>
    );
};

export default Checkout;
