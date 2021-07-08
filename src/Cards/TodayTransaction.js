import React from 'react';
import './Cards.css';

const TodayTransaction = ({ total }) => {
    return (
        <div className="wallet__card balance">
            <div className="wallet__header">
                <h1>Today Balance</h1>
                <div className="wallet__total">
                    <h3>{total} PKR</h3>
                </div>
            </div>
        </div>
    )
}

export default TodayTransaction;
