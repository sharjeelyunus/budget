import React, { useEffect, useState } from 'react';
import './TransactionCard.css';
import { Transaction } from './Transaction';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';

const TransationCard = () => {

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
        <>
            <div>
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
        </>
    )
}

export default TransationCard;
