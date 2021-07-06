import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

// Initial State
const initialState = {
    transactions: []
}

// create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    //Actions

    function deleteTransaction(id) {
        dispatch({
            type: 'DELETE_TRANSACTION',
            payload: id
        });
    }

    function addIncome(transaction) {
        dispatch({
            type: 'ADD_INCOME',
            payload: transaction
        });
    }

    function addExpense(transaction) {
        dispatch({
            type: 'ADD_EXPENSE',
            payload: transaction
        });
    }

    return (
        <GlobalContext.Provider value={{
            transactions: state.transactions,
            deleteTransaction,
            addIncome,
            addExpense
        }}>
            {children}
        </GlobalContext.Provider>
    );
}
