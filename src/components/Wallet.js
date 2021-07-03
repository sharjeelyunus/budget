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
import WalletWidget from './WalletWidget';

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
    const [addIncomeValue, setaddIncomeValue] = useState('');
    const [addIncomeDesc, setaddIncomeDesc] = useState('');
    const [addExpenseValue, setaddExpenseValue] = useState('');
    const [addExpenseType, setaddExpenseType] = useState('');
    const [addExpenseFor, setaddExpenseFor] = useState('');
    const [addExpenseDesc, setaddExpenseDesc] = useState('');

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
    const newDate = new Date();
    let date = newDate.getDate();
    const monthName = monthNames[newDate.getMonth()];

    const handleSubmitIncome = (e) => {
        e.preventDefault();

        db.collection(`${user.email}`).add({
            Income: addIncomeValue,
            description: addIncomeDesc,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        setaddIncomeValue('');
        setaddIncomeDesc('');
    };

    const handleSubmitExpense = (e) => {
        e.preventDefault();

        db.collection(`${user.email}`).add({
            Expense: addExpenseValue,
            Type: addExpenseType,
            For: addExpenseFor,
            description: addExpenseDesc,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        setaddExpenseValue('');
        setaddExpenseType('');
        setaddExpenseFor('');
        setaddExpenseDesc('');
    };

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
                            <form className="addIncome__form" onSubmit={handleSubmitIncome}>
                                <div className="addIncome__date">
                                    <span>{date} {monthName}</span>
                                </div>
                                <div className="addIncome__input">
                                    <input
                                        type="number"
                                        placeholder="Income"
                                        onChange={e => setaddIncomeValue(e.target.value)}
                                        value={addIncomeValue}
                                    />
                                    <label htmlFor="">PKR</label>
                                </div>
                                <input
                                    placeholder="Description"
                                    onChange={e => setaddIncomeDesc(e.target.value)}
                                    value={addIncomeDesc}
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
                            <form className="addIncome__form" onSubmit={handleSubmitExpense}>
                                <div className="addIncome__date">
                                    <span>{date} {monthName}</span>
                                </div>
                                <div className="addIncome__input">
                                    <input
                                        type="number"
                                        placeholder="Expense"
                                        onChange={e => setaddExpenseValue(e.target.value)}
                                        value={addExpenseValue}
                                    />
                                    <label htmlFor="">PKR</label>
                                </div>
                                <div className="addIncome__input">
                                    <input
                                        placeholder="Type"
                                        onChange={e => setaddExpenseType(e.target.value)}
                                        value={addExpenseType}
                                    />
                                    <label htmlFor="">Type</label>
                                </div>
                                <input
                                    placeholder="For"
                                    onChange={e => setaddExpenseFor(e.target.value)}
                                    value={addExpenseFor}
                                />
                                <input
                                    placeholder="Description"
                                    onChange={e => setaddExpenseDesc(e.target.value)}
                                    value={addExpenseDesc}
                                />
                                <button type="submit">
                                    Expense
                                </button>
                            </form>
                        </div>
                    </div>
                </Fade>
            </Modal>

            <WalletWidget />

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
        </div>
    )
}

export default Wallet;
