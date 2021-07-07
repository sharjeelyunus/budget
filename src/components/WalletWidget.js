import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';

const WalletWidget = ({ total }) => {

    const [user] = useAuthState(auth);

    const [totalFromDB, setTotalFromDB] = useState([]);

    var col = db.collection(`${user.email}`).doc('Data').collection('Total');

    const updateTotalToDB = () => {
        col.add({
            total: total,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    }

    useEffect(() => {
        col.limit(1).orderBy("timestamp", "desc").onSnapshot(snapshot => {
            setTotalFromDB(snapshot.docs.map(doc => ({
                totalFromDB: doc.data()
            })));
        })
    }, [col]);


    return (
        <div className="wallet__card">
            <div className="wallet__header">
                <h1>Wallet</h1>
                <h2>My Balance</h2>
                <div className="wallet__total">
                    {totalFromDB.map(({ totalFromDB }) => (
                        <h3>{totalFromDB.total} PKR</h3>
                    ))}
                    <button className="updateButton" onClick={updateTotalToDB} title="update">
                        <RotateLeftIcon />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default WalletWidget;
