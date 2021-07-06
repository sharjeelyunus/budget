import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const WalletWidget = () => {
    const { transactions } = useContext(GlobalContext);

    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0);

    return (
        <div className="wallet__card">
            <div className="wallet__header">
                <h1>Wallet</h1>
                <h2>My Balance</h2>
                <h3>{total} PKR</h3>
            </div>
        </div>
    )
}

export default WalletWidget;
