import React, { useState, useContext } from 'react';
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
import WalletWidget from './WalletWidget';
import Loan from './Loan';
import WalletDetails from './WalletDetails';
import { GlobalContext } from '../context/GlobalState';

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

const Wallet = () => {
    const classes = useStyles();
    const [user] = useAuthState(auth);
    const [openIncome, setOpenIncome] = useState(false);
    const [openExpense, setOpenExpense] = useState(false);
    const [incomeText, setIncomeText] = useState('');
    const [incomeAmount, setIncomeAmount] = useState(0);
    const [expenseText, setExpenseText] = useState('');
    const [expenseAmount, setExpenseAmount] = useState(0);

    const { transactions } = useContext(GlobalContext);

    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0);
    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0);

    const expense = (
        amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
        -1
    );

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

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const newDate = new Date();
    const date = newDate.getDate();
    const day = dayNames[newDate.getDay()];
    const monthName = monthNames[newDate.getMonth()];
    const year = newDate.getFullYear();

    const { addIncome } = useContext(GlobalContext);
    const { addExpense } = useContext(GlobalContext);

    const id = Math.floor(Math.random() * 100000000);

    const handleIncome = (e) => {
        e.preventDefault();

        const newIncome = {
            id: id,
            incomeText: incomeText,
            amount: +incomeAmount,
            localTimestamp: `${day} ${date} ${monthName} ${year}`
        }

        addIncome(newIncome);

        db.collection(`${user.email}`).add({
            id: id,
            amount: incomeAmount,
            incomeText: incomeText,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            localTimestamp: `${day} ${date} ${monthName} ${year}`
        });

        setIncomeText('');
        setIncomeAmount('');
    }

    const handleExpense = (e) => {
        e.preventDefault();

        const newExpense = {
            id: id,
            expenseText,
            amount: -`${expenseAmount}`,
            localTimestamp: `${day} ${date} ${monthName} ${year}`
        }

        addExpense(newExpense);

        db.collection(`${user.email}`).add({
            id: id,
            amount: -expenseAmount,
            expenseText: expenseText,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            localTimestamp: `${day} ${date} ${monthName} ${year}`
        });

        setExpenseText('');
        setExpenseAmount('');
    }

    return (
        <div className="wallet">
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
                                    <span>{day} {date} {monthName}</span>
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
                                    <span>{day} {date} {monthName}</span>
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
                                <button type="submit">
                                    Expense
                                </button>
                            </form>
                        </div>
                    </div>
                </Fade>
            </Modal>
            <div>
                <WalletWidget total={total} />

                <WalletDetails income={income} expense={expense} />

            </div>
            <div>
                <div className="wallet__card">
                    <div className="wallet__buttons">
                        <div className="wallet__button">
                            <p>Add</p>
                            <AddCircleIcon onClick={handleOpenIncome} />
                        </div>
                        <div className="wallet__button">
                            <p>Expense</p>
                            <RemoveCircleIcon onClick={handleOpenExpense} />
                        </div>
                    </div>
                </div>

                <Loan />
            </div>
        </div>
    )
}

export default Wallet;
