import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import '../css/payment.css'

export default function Payment() {

    const [card, setCard] = useState();
    const [planData, setPlanData] = useState();
    const [error, setError] = useState();
    const [cardLength, setCardLength] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const data = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("data", data.state.data);
        setPlanData(data.state);
    }, []);


    const handleCard = (e) => {
        setError('');
        const cardval = e.target.value.replace(/\D/g, '');

        if (cardval.length <= 16) {
            setCard(cardval);
            setCardLength(cardval.length);
        }
    }

    const handleSubmit = async () => {
        setIsLoading(true);
        if (cardLength < 16) {
            setError('Card number must have 16 digits');
        }
        else {
            const response = await fetch('/user/setplan', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ data: {"email": localStorage.getItem("Stripe") || sessionStorage.getItem("stripe"), "plan": planData.data.plan, "period": planData.data.period} })
            })
            navigate('/home')
        }
        setIsLoading(false);
    }

    return (
        <div className='payment-card'>
            <div className='payment-first-column'>
                <h2>Complete Payment</h2>
                <p>Enter your credit card or debit card details below</p>
                <div className='payment-input-wraper'>
                    <input type="tel" maxLength="16" className='payment-input-box margin' value={card} placeholder="Card Number" onChange={handleCard} />
                    <p>{cardLength}/16</p>
                </div>
                <p className='payment-error'>{error}</p>
                <button className='payment-submit-button' onClick={handleSubmit}>
                    {isLoading && <i class="fa fa-spinner fa-spin"></i>}Confirm Payment
                </button>
            </div>
            <div className='payment-second-column'>
                <h3>Order Summary</h3>
                <div className='payment-summary-list'>
                    <p>Plan Name</p>
                    <p>{planData && planData.data.plan}</p>
                </div>
                <hr style={{ borderTop: "1px solid rgb(68, 68, 68)" }}></hr>
                <div className='payment-summary-list'>
                    <p>Billing Cycle</p>
                    <p>{planData && planData.data.period}</p>
                </div>
                <hr style={{ borderTop: "1px solid rgb(68, 68, 68)" }}></hr>
                <div className='payment-summary-list'>
                    <p>Plan Price</p>
                    <p>{planData && planData.data.price}</p>
                </div>
                <hr style={{ borderTop: "1px solid rgb(68, 68, 68)" }}></hr>
            </div>
        </div>
    )
}
