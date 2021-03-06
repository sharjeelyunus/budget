import React from 'react';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const WalletWidget = ({ total, income, expense, getLoan, giveLoan }) => {

    return (
        <div className="wallet__card">
            <div className="walletDetails">
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

            <div className="wallet__header">
                <h1>My Balance</h1>
                <div className="wallet__total">
                    <h3>{total} PKR</h3>
                </div>
            </div>

            <div className="walletDetails">
                <div className="walletDetails__money">
                    <div className="walletDetails__arrowUp">
                        <ArrowUpwardIcon />
                    </div>
                    <div>
                        <h4>Get Loan</h4>
                        <p>{getLoan} PKR</p>
                    </div>
                </div>
                <div className="walletDetails__money">
                    <div className="walletDetails__arrowDown">
                        <ArrowDownwardIcon />
                    </div>
                    <div>
                        <h4>Give Loan</h4>
                        <p>{giveLoan} PKR</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WalletWidget;
