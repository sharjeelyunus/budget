import React, { useEffect, useState } from 'react';
import './Transactions.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { Transaction } from './Transaction';

const Transations = () => {

    const [user] = useAuthState(auth);
    const [transactions, setTransctions] = useState([]);

    useEffect(() => {
        db.collection(`${user.email}`).orderBy("timestamp", "desc").onSnapshot(snapshot => {
            setTransctions(snapshot.docs.map(doc => ({
                transaction: doc.data()
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
        </div>
    )
}

export default Transations;
