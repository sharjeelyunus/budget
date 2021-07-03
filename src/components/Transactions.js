import React from 'react';
import './Transactions.css';
import TransactionCard from './TransactionCard';

const Transations = () => {

    return (
        <div className="transactions">
            <h1>Transactions</h1>

            <TransactionCard />
            <TransactionCard />
            <TransactionCard />
        </div>
    )
}

export default Transations;
