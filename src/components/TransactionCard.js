import React from 'react';
import './TransactionCard.css';

const TransationCard = ({ income, expense, transactionType, timestamp, expenseType, expenseFor }) => {
    return (
        <div>
            <div className="transaction__card">
                <div className="transaction__type">
                    <p>{transactionType}</p>
                </div>
                <div className="transaction__purpose">
                    <h4>{expenseType}</h4>
                    <p>{expenseFor}</p>
                </div>
                <div className="transaction__money">
                    <h4>{income || expense} PKR</h4>
                </div>
                <div className="transaction__time">
                    <p>{timestamp}</p>
                </div>
            </div>
        </div>
    )
}

export default TransationCard;
