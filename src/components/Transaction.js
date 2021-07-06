import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';

export const Transaction = ({ id, transaction, incomeText, expenseText, timestamp }) => {
    const [user] = useAuthState(auth);

    const sign = transaction < 0 ? '-' : '+';

    const deleteTransaction = () => {

        var docToBeDeleted = db.collection(`${user.email}`).where('id', '==', id);
        docToBeDeleted.get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                doc.ref.delete();
            });
        });
    }

    return (
        <div className={transaction < 0 ? 'transaction__card minus' : 'transaction__card plus'}>
            {/* <div className="transaction__type">
                <p></p>
            </div> */}
            <div className="transaction__purpose">
                <h4>{incomeText || expenseText}</h4>
                {/* <p></p> */}
            </div>
            <div className="transaction__money">
                <h4>{sign}{Math.abs(transaction)} PKR</h4>
            </div>
            <div className="transaction__time">
                <p>{timestamp}</p>
            </div>
            <button className="delete-btn" onClick={() => deleteTransaction()}>x</button>
        </div>
    )
}
