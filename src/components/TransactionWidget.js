import React, { useState } from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase';
import './Wallet.css';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: '#3a3a3a',
        color: 'white',
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
}));

const TransactionWidget = () => {
    const classes = useStyles();
    const [user] = useAuthState(auth);
    const [openIncome, setOpenIncome] = useState(false);
    const [openExpense, setOpenExpense] = useState(false);
    const [incomeText, setIncomeText] = useState('');
    const [incomeAmount, setIncomeAmount] = useState();
    const [expenseText, setExpenseText] = useState('');
    const [expenseType, setExpenseType] = useState('');
    const [expenseAmount, setExpenseAmount] = useState();
    const [openGetLoan, setOpenGetLoan] = useState(false);
    const [openGiveLoan, setOpenGiveLoan] = useState(false);
    const [getLoanText, setGetLoanText] = useState('');
    const [getLoanFrom, setGetLoanFrom] = useState('');
    const [getLoanAmount, setGetLoanAmount] = useState();
    const [giveLoanText, setGiveLoanText] = useState('');
    const [giveLoanTo, setGiveLoanTo] = useState('');
    const [giveLoanAmount, setGiveLoanAmount] = useState();

    const handleOpenIncome = () => {
        setOpenIncome(true);
    };

    const handleCloseIncome = () => {
        setOpenIncome(false);
    };

    const handleOpenExpense = () => {
        setOpenExpense(true);
    };

    const handleCloseExpense = () => {
        setOpenExpense(false);
    };

    const handleOpenGetLoan = () => {
        setOpenGetLoan(true);
    };

    const handleCloseGetLoan = () => {
        setOpenGetLoan(false);
    };

    const handleOpenGiveLoan = () => {
        setOpenGiveLoan(true);
    };

    const handleCloseGiveLoan = () => {
        setOpenGiveLoan(false);
    };

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const newDate = new Date();
    const date = newDate.getDate();
    const monthName = monthNames[newDate.getMonth()];
    const year = newDate.getFullYear();

    const id = Math.floor(Math.random() * 100000000);

    const col = db.collection('users').doc(`${user.email}`);

    const handleIncome = (e) => {
        e.preventDefault();

        col.collection('Transactions').add({
            id: id,
            amount: incomeAmount,
            incomeText: incomeText,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            localTimestamp: `${date}/${monthName}/${year}`
        });

        col.collection('Filter').doc('Monthly').collection(`${monthName}`).add({
            id: id,
            amount: incomeAmount,
            incomeText: incomeText,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            localTimestamp: `${date}/${monthName}/${year}`
        });

        setIncomeText('');
        setIncomeAmount('');
    }

    const handleExpense = (e) => {
        e.preventDefault();

        col.collection('Transactions').add({
            id: id,
            amount: -expenseAmount,
            expenseText: expenseText,
            expenseType: expenseType,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            localTimestamp: `${date}/${monthName}/${year}`
        });

        col.collection('Filter').doc('Monthly').collection(`${monthName}`).add({
            id: id,
            amount: -expenseAmount,
            expenseText: expenseText,
            expenseType: expenseType,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            localTimestamp: `${date}/${monthName}/${year}`
        });

        setExpenseText('');
        setExpenseAmount('');
    }

    const handleGetLoan = (e) => {
        e.preventDefault();

        col.collection('Loans').add({
            id: id,
            amount: getLoanAmount,
            getLoanText: getLoanText,
            getLoanFrom: getLoanFrom,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            localTimestamp: `${date}/${monthName}/${year}`
        });

        setGetLoanText('');
        setGetLoanFrom('');
        setGetLoanAmount('');
    }

    const handleGiveLoan = (e) => {
        e.preventDefault();

        col.collection('Loans').add({
            id: id,
            amount: -giveLoanAmount,
            giveLoanText: giveLoanText,
            giveLoanTo: giveLoanTo,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            localTimestamp: `${date}/${monthName}/${year}`
        });

        setGiveLoanText('');
        setGiveLoanTo('');
        setGiveLoanAmount('');
    }

    return (
        <div className="wallet__card">

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openIncome}
                onClose={handleCloseIncome}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openIncome}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">Income</h2>
                        <p id="transition-modal-description">Add Income you just got!</p>
                        <div className="wallet__addIncome">
                            <form className="addIncome__form" onSubmit={handleIncome}>
                                <div className="addIncome__date">
                                    <span>{date} {monthName}</span>
                                </div>
                                <div className="addIncome__input">
                                    <input
                                        type="number"
                                        value={incomeAmount}
                                        onChange={(e) => setIncomeAmount(e.target.value)}
                                        placeholder="Enter amount..."
                                    />
                                    <label htmlFor="">PKR</label>
                                </div>
                                <input
                                    type="text"
                                    value={incomeText}
                                    onChange={(e) => setIncomeText(e.target.value)}
                                    placeholder="Enter text..."
                                />
                                <button type="submit">
                                    Add Money
                                </button>
                            </form>
                        </div>
                    </div>
                </Fade>
            </Modal>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openExpense}
                onClose={handleCloseExpense}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openExpense}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">Expense</h2>
                        <p id="transition-modal-description">Put your expenses here!</p>
                        <div className="wallet__addIncome">
                            <form className="addIncome__form" onSubmit={handleExpense}>
                                <div className="addIncome__date">
                                    <span>{date} {monthName}</span>
                                </div>
                                <div className="addIncome__input">
                                    <input
                                        type="number"
                                        value={expenseAmount}
                                        onChange={(e) => setExpenseAmount(e.target.value)}
                                        placeholder="Enter amount..."
                                    />
                                    <label htmlFor="">PKR</label>
                                </div>
                                <input
                                    type="text"
                                    value={expenseText}
                                    onChange={(e) => setExpenseText(e.target.value)}
                                    placeholder="Enter text..."
                                />
                                <div className="options">
                                    <lable>Category:</lable>
                                    <select
                                        className="add__options"
                                        value={expenseType}
                                        onChange={(e) => setExpenseType(e.target.value)}
                                    >
                                        <option>Food</option>
                                        <option>Shopping</option>
                                        <option>Travel</option>
                                        <option>Fuel</option>
                                        <option>Entertainment</option>
                                        <option>Others</option>
                                    </select>
                                </div>
                                <button type="submit">
                                    Expense
                                </button>
                            </form>
                        </div>
                    </div>
                </Fade>
            </Modal>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openGetLoan}
                onClose={handleCloseGetLoan}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openGetLoan}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">GET LOAN</h2>
                        <p id="transition-modal-description">Add Loan you just got!</p>
                        <div className="wallet__addIncome">
                            <form className="addIncome__form" onSubmit={handleGetLoan}>
                                <div className="addIncome__date">
                                    <span>{date} {monthName}</span>
                                </div>
                                <div className="addIncome__input">
                                    <input
                                        type="number"
                                        value={getLoanAmount}
                                        onChange={(e) => setGetLoanAmount(e.target.value)}
                                        placeholder="Enter amount..."
                                    />
                                    <label htmlFor="">PKR</label>
                                </div>
                                <input
                                    type="text"
                                    value={getLoanText}
                                    onChange={(e) => setGetLoanText(e.target.value)}
                                    placeholder="Get Loan For?"
                                />
                                <input
                                    type="text"
                                    value={getLoanFrom}
                                    onChange={(e) => setGetLoanFrom(e.target.value)}
                                    placeholder="Get Loan From?"
                                />
                                <button type="submit">
                                    Add Loan
                                </button>
                            </form>
                        </div>
                    </div>
                </Fade>
            </Modal>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openGiveLoan}
                onClose={handleCloseGiveLoan}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openGiveLoan}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">Give Loan</h2>
                        <p id="transition-modal-description">Add Loan you gave here!</p>
                        <div className="wallet__addIncome">
                            <form className="addIncome__form" onSubmit={handleGiveLoan}>
                                <div className="addIncome__date">
                                    <span>{date} {monthName}</span>
                                </div>
                                <div className="addIncome__input">
                                    <input
                                        type="number"
                                        value={giveLoanAmount}
                                        onChange={(e) => setGiveLoanAmount(e.target.value)}
                                        placeholder="Enter amount..."
                                    />
                                    <label htmlFor="">PKR</label>
                                </div>
                                <input
                                    type="text"
                                    value={giveLoanText}
                                    onChange={(e) => setGiveLoanText(e.target.value)}
                                    placeholder="Give Loan For?"
                                />
                                <input
                                    type="text"
                                    value={giveLoanTo}
                                    onChange={(e) => setGiveLoanTo(e.target.value)}
                                    placeholder="Give Loan To?"
                                />
                                <button type="submit">
                                    Give Loan
                                </button>
                            </form>
                        </div>
                    </div>
                </Fade>
            </Modal>

            <div className="wallet__buttons">
                <div className="wallet__button addbtn" onClick={handleOpenIncome}>
                    <p>Add</p>
                    <AddCircleIcon />
                </div>
                <div className="wallet__button minbtn" onClick={handleOpenExpense}>
                    <p>Expense</p>
                    <RemoveCircleIcon />
                </div>
            </div>

            <div className="wallet__buttons">
                <div className="wallet__button" onClick={handleOpenGetLoan}>
                    <p>Get Loan</p>
                    <AddCircleIcon />
                </div>
                <div className="wallet__button" onClick={handleOpenGiveLoan}>
                    <p>Give Loan</p>
                    <RemoveCircleIcon />
                </div>
            </div>
        </div>
    )
}

export default TransactionWidget;
