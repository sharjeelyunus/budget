import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';

const Loan = ({ id, transaction, getLoanText, giveLoanText, getLoanFrom, giveLoanTo, timestamp }) => {
    const [user] = useAuthState(auth);

    const sign = transaction < 0 ? '-' : '+';

    const deleteTransactionFromDB = () => {
        const docToBeDeleted = db.collection(`${user.email}`).doc('Loans').collection('Loan').where('id', '==', id);
        docToBeDeleted.get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                doc.ref.delete();
            });
        });
    }

    return (
        <div className={transaction < 0 ? 'transaction__card minus' : 'transaction__card plus'}>
            <div className="transaction__purpose">
                <h4>{getLoanText || giveLoanText}</h4>
            </div>
            <div className="transaction__money">
                <h4>{sign}{Math.abs(transaction)} PKR</h4>
            </div>
            <p>{getLoanFrom || giveLoanTo}</p>
            <div className="transaction__time">
                <p>{timestamp}</p>
            </div>
            <button className="delete-btn" onClick={() => { deleteTransactionFromDB(id); }}>x</button>
        </div>
    )
}

export default Loan;
