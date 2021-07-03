import React, { useEffect, useState } from 'react';
import './Transactions.css';
import TransactionCard from './TransactionCard';
import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const Transations = () => {
    const [user] = useAuthState(auth);
    const [transactionCard, setTransctionCard] = useState([]);

    useEffect(() => {
        db.collection(`${user.email}`).orderBy("timestamp", "desc").onSnapshot(snapshot => {
            setTransctionCard(snapshot.docs.map(doc => ({
                transaction: doc.data()
            })));
        })
    }, [user]);

    return (
        <div className="transactions">
            <h1>Transactions</h1>

            <div className="transctions__card">
                {transactionCard.map(({ transaction }) => (
                    <TransactionCard
                        income={transaction.Income}
                        expense={transaction.Expense}
                        expenseType={transaction.Type}
                        expenseFor={transaction.For}
                        transactionType={transaction.Transaction}
                        timestamp={transaction.localTimestamp}
                    />
                ))}
            </div>

        </div>
    )
}

export default Transations;
