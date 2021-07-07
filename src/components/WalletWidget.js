import React from 'react';

const WalletWidget = ({ total }) => {

    return (
        <div className="wallet__card">
            <div className="wallet__header">
                <h1>Wallet</h1>
                <h2>My Balance</h2>
                <div className="wallet__total">
                    <h3>{total} PKR</h3>
                </div>
            </div>
        </div>
    )
}

export default WalletWidget;
