import React from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

const Loan = () => {
    return (
        <div className="wallet__card">
            <div className="wallet__buttons">
                <div className="wallet__button">
                    <p>Get Loan</p>
                    <AddCircleIcon />
                </div>
                <div className="wallet__button">
                    <p>Give Loan</p>
                    <RemoveCircleIcon />
                </div>
            </div>
        </div>
    )
}

export default Loan;
