import React from 'react';
import './Transactions.css';
import TransactionCard from './TransactionCard';

const Transations = () => {

    return (
        <div className="transactions">
            <div className="transctions__widget">
                <h1>Transactions</h1>

                <div className="transctions__card">
                    <TransactionCard />
                </div>
            </div>

            <div className="loan__widget">
                <h1>Loans</h1>

                <div className="transctions__card">

                </div>
            </div>
        </div>
    )
}

export default Transations;
