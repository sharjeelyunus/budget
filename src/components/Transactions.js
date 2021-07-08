import React, { useEffect, useState } from 'react';
import './Transactions.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { Transaction } from './Transaction';
import Loan from './Loan';
import TodayTransaction from '../Cards/TodayTransaction';

const Transations = () => {

    const [user] = useAuthState(auth);
    const [transactions, setTransctions] = useState([]);
    const [todayTransactions, setTodayTransctions] = useState([]);
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

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December", "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const newDate = new Date();
    const date = newDate.getDate();
    const day = dayNames[newDate.getDay() - 1];
    const monthName = monthNames[newDate.getMonth()];
    const year = newDate.getFullYear();

    const today = `${day} ${date} ${monthName} ${year}`;

    useEffect(() => {
        db.collection(`${user.email}`).doc('Transactions').collection('Transaction').where('localTimestamp', '==', today).onSnapshot(snapshot => {
            setTodayTransctions(snapshot.docs.map(doc => ({
                todayTransaction: doc.data()
            })));
        });
    }, [user, today]);

    const todayAmountsArr = todayTransactions.map(({ todayTransaction }) => todayTransaction.amount);
    const todayAmounts = todayAmountsArr.map((i) => Number(i));
    const totalToday = todayAmounts.reduce((acc, item) => (acc += item), 0);

    return (
        <div className="transactions">
            <div className="transctions__widget">
                <h1>Transactions</h1>
                <div className="widgets">

                    <TodayTransaction total={totalToday} />
                    <div className="transctions__card">
                        {transactions.map(({ transaction }) => (
                            <Transaction
                                id={transaction.id}
                                transaction={transaction.amount}
                                incomeText={transaction.incomeText}
                                expenseText={transaction.expenseText}
                                timestamp={transaction.localTimestamp}
                                expenseType={transaction.expenseType}
                            />
                        ))}
                    </div>

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
                            getLoanFrom={loan.getLoanFrom}
                            giveLoanTo={loan.giveLoanTo}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Transations;
