import React from 'react';
import logo from '../assets/logo.png';
import { Avatar } from '@material-ui/core';
import './Header.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useModalStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        color: 'red',
        fontWeight: 700,
        fontSize: '20px',
    },
}));

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    paper: {
        marginRight: theme.spacing(2),
    },
}));

const Header = () => {
    const [user] = useAuthState(auth);

    const classes = useStyles();
    const modalClasses = useModalStyles();
    const [openModal, setOpenModal] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const newDate = new Date();
    let date = newDate.getDate();
    const monthName = monthNames[newDate.getMonth()];

    const ResetAllData = () => {
        const TransToBeDeleted = db.collection('users').doc(`${user.email}`).collection('Transactions');
        TransToBeDeleted.get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                doc.ref.delete();
            });
        });

        const LoansToBeDeleted = db.collection('users').doc(`${user.email}`).collection('Loans');
        LoansToBeDeleted.get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                doc.ref.delete();
            });
        });

        const FilterToBeDeleted = db.collection('users').doc(`${user.email}`).collection('Filter').doc('Monthly').collection(`${monthName}`);
        FilterToBeDeleted.get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                doc.ref.delete();
            });
        });
    }

    return (
        <div className="header">
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={modalClasses.modal}
                open={openModal}
                onClose={handleCloseModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModal}>
                    <div className={modalClasses.paper} onClick={() => { ResetAllData(); handleCloseModal() }}>
                        Reset All Data <DeleteForeverIcon />
                    </div>
                </Fade>
            </Modal>
            <div className="header__logo">
                <img src={logo} alt="" />
                <h1>Budget</h1>
            </div>
            <div className="header__date">
                <span>{date} {monthName}</span>
            </div>
            <div className="header__user">
                <h2><span>Hello,</span> {user?.displayName}!</h2>
                <div className={classes.root}>
                    <div>
                        <Button
                            ref={anchorRef}
                            aria-controls={open ? 'menu-list-grow' : undefined}
                            aria-haspopup="true"
                            onClick={handleToggle}
                        >
                            <Avatar
                                alt={user?.displayName}
                                src={user?.photoURL}
                            />
                        </Button>
                        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                            {({ TransitionProps, placement }) => (
                                <Grow
                                    {...TransitionProps}
                                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                >
                                    <Paper>
                                        <ClickAwayListener onClickAway={handleClose}>
                                            <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                                <MenuItem onClick={handleOpenModal}>Reset All Data</MenuItem>
                                                <MenuItem onClick={() => auth.signOut()}>Logout</MenuItem>
                                            </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;
