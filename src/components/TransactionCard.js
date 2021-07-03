import React from 'react';
import './TransactionCard.css';

const TransationCard = () => {
    return (
        <div>
            <div className="transaction__card">
                <div className="transaction__type">
                    <p>Expense</p>
                </div>
                <div className="transaction__purpose">
                    <h4>Travel</h4>
                    <p>BWP to JP</p>
                </div>
                <div className="transaction__money">
                    <h4>200 PKR</h4>
                </div>
                <div>
                    <p>Date</p>
                </div>
            </div>
        </div>
    )
}

export default TransationCard;
