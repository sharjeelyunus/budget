import React, { useEffect, useState } from 'react';
import './Wallet.css';
import WalletWidget from './WalletWidget';
import TransactionWidget from './TransactionWidget';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const Wallet = () => {

    const [user] = useAuthState(auth);
    const [transactions, setTransctions] = useState([]);
    const [loans, setLoans] = useState([]);

    useEffect(() => {
        db.collection(`${user.email}`).doc('Transactions').collection('Transaction').onSnapshot(snapshot => {
            setTransctions(snapshot.docs.map(doc => ({
                transaction: doc.data()
            })));
        })
    }, [user]);

    useEffect(() => {
        db.collection(`${user.email}`).doc('Loans').collection('Loan').onSnapshot(snapshot => {
            setLoans(snapshot.docs.map(doc => ({
                loan: doc.data()
            })));
        })
    }, [user]);

    const amountsArr = transactions.map(({ transaction }) => transaction.amount);
    const LoansArr = loans.map(({ loan }) => loan.amount);

    const amounts = amountsArr.map((i) => Number(i));
    const loanamunts = LoansArr.map((i) => Number(i));

    const total = amounts.reduce((acc, item) => (acc += item), 0);
    const loanBalance = loanamunts.reduce((acc, item) => (acc += item), 0);

    const totalBalance = (total + loanBalance);

    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0);

    const expense = (
        amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
        -1
    );

    const getLoan = loanamunts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0);

    const giveLoan = (
        loanamunts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
        -1
    );

    return (
        <div className="wallet">
            <WalletWidget total={totalBalance} income={income} expense={expense} getLoan={getLoan} giveLoan={giveLoan} />
            <TransactionWidget />
        </div>
    )
}

export default Wallet;
