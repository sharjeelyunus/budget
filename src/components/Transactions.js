import React, { useEffect, useState } from 'react';
import './Transactions.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { Transaction } from './Transaction';
import Loan from './Loan';

const Transations = () => {

    const [user] = useAuthState(auth);
    const [transactions, setTransctions] = useState([]);
    const [loans, setLoans] = useState([]);

    useEffect(() => {
        db.collection(`${user.email}`).doc('Transactions').collection('Transaction').orderBy("timestamp", "desc").onSnapshot(snapshot => {
            setTransctions(snapshot.docs.map(doc => ({
                transaction: doc.data()
            })));
        })
    }, [user]);

    useEffect(() => {
        db.collection(`${user.email}`).doc('Loans').collection('Loan').orderBy("timestamp", "desc").onSnapshot(snapshot => {
            setLoans(snapshot.docs.map(doc => ({
                loan: doc.data()
            })));
        })
    }, [user]);

    return (
        <div className="transactions">
            <div className="transctions__widget">
                <h1>Transactions</h1>

                <div className="transctions__card">
                    {transactions.map(({ transaction }) => (
                        <Transaction
                            id={transaction.id}
                            transaction={transaction.amount}
                            incomeText={transaction.incomeText}
                            expenseText={transaction.expenseText}
                            timestamp={transaction.localTimestamp}
                        />
                    ))}
                </div>
            </div>

            <div className="transctions__widget">
                <h1>Loans</h1>

                <div className="transctions__card">
                    {loans.map(({ loan }) => (
                        <Loan
                            id={loan.id}
                            transaction={loan.amount}
                            getLoanText={loan.getLoanText}
                            giveLoanText={loan.giveLoanText}
                            timestamp={loan.localTimestamp}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Transations;
