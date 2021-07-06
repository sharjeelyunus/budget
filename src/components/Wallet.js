import React, { useContext } from 'react';
import './Wallet.css';
import WalletWidget from './WalletWidget';
import TransactionWidget from './TransactionWidget';
import WalletDetails from './WalletDetails';
import { GlobalContext } from '../context/GlobalState';

const Wallet = () => {

    const { transactions } = useContext(GlobalContext);

    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0);
    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0);

    const expense = (
        amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
        -1
    );

    return (
        <div className="wallet">
            <WalletWidget total={total} />
            <WalletDetails income={income} expense={expense} />
            <TransactionWidget />
        </div>
    )
}

export default Wallet;
