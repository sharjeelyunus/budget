const ap = (state, action) => {
    switch (action.type) {
        case 'DELETE_TRANSACTION':
            return {
                ...state,
                transactions: state.transactions.filter(transaction => transaction.id !== action.payload)
            }
        case 'ADD_INCOME':
            return {
                ...state,
                transactions: [action.payload, ...state.transactions]
            }
        case 'ADD_EXPENSE':
            return {
                ...state,
                transactions: [action.payload, ...state.transactions]
            }
        default:
            return state;
    }
};
export default ap;
