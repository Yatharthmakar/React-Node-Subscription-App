import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/plan.css';

export default function ShowPlans() {

    const [selected, setSelected] = useState('Monthly');
    const [selectedPlan, setSelectedPlan] = useState('Mobile');
    const [plans, setPlans] = useState();
    const [selectedPrice, setSelectedPrice] = useState(49);

    useEffect(() => {
        const fetchplan = async () => {
            const response = await fetch('/user/getallplans');
            const result = await response.json();
            console.log("plans", result.plans);
            setPlans(result.plans);
        }
        fetchplan();
    }, [])

    return (
        <div className='plan'>
            <div className='plan-card'>
                <div className='first-column'>
                    <div className='selector-wraper'>
                        <div className='period-selector'>
                            <div id='Monthly' className={selected == 'Monthly' ? 'selected' : 'unselected'} onClick={(e) => setSelected(e.target.id)}>Monthly</div>
                            <div id='Yearly' className={selected == 'Yearly' ? 'selected' : 'unselected'} onClick={(e) => setSelected(e.target.id)}>Yearly</div>
                        </div>
                    </div>

                    <div className='list-item'>
                        {selected} Price
                    </div>
                    <hr></hr>

                    <div className='list-item'>
                        Video Quaily
                    </div>
                    <hr></hr>

                    <div className='list-item'>
                        Resolution
                    </div>
                    <hr></hr>

                    <div className='list-item'>
                        Devices you can use to watch
                    </div>
                </div>
                <div className='second-cloumn'>
                    {plans && plans.map((plan) => {
                        return (
                            <div id={plan.name} className={selectedPlan == plan.name ? 'selectedPlan' : 'unselectedPlan'} onClick={(e) => {setSelectedPlan(e.target.id); setSelectedPrice(plan.price)}}>
                                <div className='plan-box-wraper'>
                                    <div className='plan-box'>{plan.name}</div>
                                </div>
                                <div className='center list-item'>&#8377; {selected == 'Monthly' ? plan.price : plan.price * 11}</div>
                                <hr></hr>
                                <div className='center list-item'>{plan.video_quality}</div>
                                <hr></hr>
                                <div className='center list-item'>{plan.resolution}</div>
                                <hr></hr>
                                {plan.devices.map((device) => {
                                    return (
                                        <div className='center list-item'>{device}</div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='center'>
                <Link to="/payment" state={{data:{"plan": selectedPlan, "period": selected, "price": selected == 'Monthly' ? selectedPrice : selectedPrice * 11 }}}><button className='submit-button'>Next</button></Link>
            </div>
        </div>
    )
}
