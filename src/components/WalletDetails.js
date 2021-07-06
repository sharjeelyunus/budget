import React, { useContext } from 'react';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { GlobalContext } from '../context/GlobalState';

const WalletDetails = () => {
    const { transactions } = useContext(GlobalContext);

    const amounts = transactions.map(transaction => transaction.amount);

    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)

    const expense = (
        amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
        -1
    )

    return (
        <div className="wallet__card">
            <div className="walletDetails">
                <div>
                    <div className="walletDetails__money">
                        <div className="walletDetails__arrowUp">
                            <ArrowUpwardIcon />
                        </div>
                        <div>
                            <h4>Income</h4>
                            <p>{income} PKR</p>
                        </div>
                    </div>
                    <div className="walletDetails__money">
                        <div className="walletDetails__arrowDown">
                            <ArrowDownwardIcon />
                        </div>
                        <div>
                            <h4>Expenses</h4>
                            <p>{expense} PKR</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="walletDetails__money">
                        <div className="walletDetails__arrowUp">
                            <ArrowUpwardIcon />
                        </div>
                        <div>
                            <h4>Get Loan</h4>
                            <p> PKR</p>
                        </div>
                    </div>
                    <div className="walletDetails__money">
                        <div className="walletDetails__arrowDown">
                            <ArrowDownwardIcon />
                        </div>
                        <div>
                            <h4>Give Loan</h4>
                            <p> PKR</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WalletDetails;
