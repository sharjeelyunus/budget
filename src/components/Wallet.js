import React, { useEffect, useState } from 'react';
import './Wallet.css';
import WalletWidget from './WalletWidget';
import TransactionWidget from './TransactionWidget';
import WalletDetails from './WalletDetails';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const Wallet = () => {

    const [user] = useAuthState(auth);
    const [transactions, setTransctions] = useState([]);

    useEffect(() => {
        db.collection(`${user.email}`).doc('Transactions').collection('Transaction').onSnapshot(snapshot => {
            setTransctions(snapshot.docs.map(doc => ({
                transaction: doc.data()
            })));
        })
    }, [user]);

    const amountsArr = transactions.map(({ transaction }) => transaction.amount);

    const amounts = amountsArr.map((i) => Number(i));

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
