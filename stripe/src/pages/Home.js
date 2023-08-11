import React, { useEffect, useState } from 'react';
import ShowPlans from '../components/ShowPlans';
import UserPlan from '../components/UserPlan';

export default function Home() {
    const [plan, setPlan] = useState();

    useEffect(() => {
        const fetchPlans = async () => {
            const response = await fetch('/user/getuserplan', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ data: localStorage.getItem("stripe") || sessionStorage.getItem("stripe") })
            })
            const result = await response.json();
            console.log("plans", result.plan);
            setPlan(result.plan);
        }
        fetchPlans();
    }, []);

    return (
        <>
            {!plan && <i class="fa fa-big fa-spinner fa-spin"></i>}
            {plan && (plan.plan=="null"? <ShowPlans/>:<UserPlan userPlan={plan}/>)}
        </>
    )
}
