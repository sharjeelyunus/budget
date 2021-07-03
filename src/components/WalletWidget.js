import React from 'react';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const WalletWidget = (income) => {
    return (
        <div className="wallet__card">
            <div className="wallet__header">
                <h1>Wallet</h1>
                <h2>My Balance</h2>
                <h3>{ } PKR</h3>
            </div>
            <div className="walletDetails">
                <div className="walletDetails__money">
                    <div className="walletDetails__arrowUp">
                        <ArrowUpwardIcon />
                    </div>
                    <div>
                        <h4>Income</h4>
                        <p>5000 PKR</p>
                    </div>
                </div>
                <div className="walletDetails__money">
                    <div className="walletDetails__arrowDown">
                        <ArrowDownwardIcon />
                    </div>
                    <div>
                        <h4>Expenses</h4>
                        <p>2000 PKR</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WalletWidget;
