import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';

export const Transaction = ({ id, transaction, incomeText, expenseText, expenseType, timestamp }) => {
    const [user] = useAuthState(auth);

    const sign = transaction < 0 ? '-' : '+';

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December", "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const newDate = new Date();
    const monthName = monthNames[newDate.getMonth()];

    const deleteTransactionFromDB = () => {
        const docToBeDeleted = db.collection('users').doc(`${user.email}`).collection('Transactions').where('id', '==', id);
        docToBeDeleted.get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                doc.ref.delete();
            });
        });

        const docToBeDeletedMonthly = db.collection('users').doc(`${user.email}`).collection('Filter').doc('Monthly').collection(`${monthName}`).where('id', '==', id);
        docToBeDeletedMonthly.get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                doc.ref.delete();
            });
        });
    }

    return (
        <div className={transaction < 0 ? 'transaction__card minus' : 'transaction__card plus'}>
            <div className="transaction__purpose">
                <h4>{sign}{Math.abs(transaction)} PKR</h4>
            </div>
            <div className="transaction__money">
                <h4>{incomeText || expenseText}</h4>
                <p>{expenseType}</p>
            </div>
            <div className="transaction__time">
                <p>{timestamp}</p>
            </div>
            <button className="delete-btn" onClick={() => { deleteTransactionFromDB(id); }}>x</button>
        </div>
    )
}
