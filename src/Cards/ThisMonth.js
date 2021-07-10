import React from 'react';

const ThisMonth = ({ monthName, total }) => {
    return (
        <div className="wallet__card balance">
            <div className="wallet__header">
                <h1>{monthName} Balance</h1>
                <div className="wallet__total">
                    <h3>{total} PKR</h3>
                </div>
            </div>
        </div>
    )
}

export default ThisMonth;
