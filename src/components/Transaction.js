import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Transaction = ({ transaction }) => {
    const { deleteTransaction } = useContext(GlobalContext);

    const sign = transaction.amount < 0 ? '-' : '+';

    return (
        <div className={transaction.amount < 0 ? 'transaction__card minus' : 'transaction__card plus'}>
            {/* <div className="transaction__type">
                <p></p>
            </div> */}
            <div className="transaction__purpose">
                <h4>{transaction.incomeText || transaction.expenseText}</h4>
                {/* <p></p> */}
            </div>
            <div className="transaction__money">
                <h4>{sign}{Math.abs(transaction.amount)} PKR</h4>
            </div>
            <div className="transaction__time">
                <p>{transaction.localTimestamp}</p>
            </div>
            <button className="delete-btn" onClick={() => deleteTransaction(transaction.id)}>x</button>
        </div>
    )
}
