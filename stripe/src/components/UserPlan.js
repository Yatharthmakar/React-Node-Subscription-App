import React, { useState, useEffect } from 'react';
import '../css/user.css';
import {Link} from 'react-router-dom';

export default function UserPlan(props) {

    const [plan, setPlan] = useState();
    const [cancel, setCancel] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchplan = async () => {
            const response = await fetch('/user/getplan', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ data: props.userPlan.plan.name })
            });
            const result = await response.json();
            console.log("current", result.plan);
            setPlan(result.plan);
        }
        fetchplan();
    }, [])

    const cancelPlan = async() => {
        setIsLoading(true);
        const response = await fetch('/user/deleteuserplan', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ data: localStorage.getItem("stripe") || sessionStorage.getItem("stripe") })
            })
        setCancel(true);
        setIsLoading(false);
    }

    console.log("prop", props.userPlan);
    return (
        <div className='user-plan'>
            <div className='user-header'>
                <div className='user-status-header'>
                    <h2>Current Plan Details</h2>
                    {cancel ? <p className='user-deactive'>Deactive</p> : <p className='user-active'>Active</p>}
                </div>
                <div>
                    {isLoading && <i class="fa fa-spinner fa-spin"></i>} {!cancel && <a onClick={cancelPlan}>Cancel</a>}
                </div>
            </div>
                <h3>{plan && plan.name}</h3>
                {plan && plan.devices.map((device)=>{
                    return (
                        <small>{device} </small>
                    )
                })}
                <div className='flex'>
                    <h2>&#8377; {plan && (props.userPlan.plan.period == "Monthly"?plan.price:plan.price*11)}/</h2><p>{props.userPlan.plan.period}</p>
                </div>
                <Link to='/allplans'>
                    <div className='user-changeplan'>Change Plan</div>
                </Link>
                <div className='user-period'>
                    Your Subscription has started on {props.userPlan.plan.time}.
                </div>
        </div>
    )
}
