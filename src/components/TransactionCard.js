import React, { useContext } from 'react';
import './TransactionCard.css';
import { GlobalContext } from '../context/GlobalState';
import { Transaction } from './Transaction';

const TransationCard = () => {
    const { transactions } = useContext(GlobalContext);

    return (
        <div>
            {transactions.map(transaction => (
                <Transaction
                    key={transaction.id}
                    transaction={transaction}
                />
            ))}
        </div>
    )
}

export default TransationCard;
