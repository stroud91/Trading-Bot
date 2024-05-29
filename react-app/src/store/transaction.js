

const SET_TRANSACTIONS = "transactions/SET_TRANSACTIONS";
const SET_TRANSACTION_DETAIL = "transactions/SET_TRANSACTION_DETAIL";
const ADD_TRANSACTION = "transactions/ADD_TRANSACTION";
const UPDATE_TRANSACTION = "transactions/UPDATE_TRANSACTION";
const REMOVE_TRANSACTION = "transactions/REMOVE_TRANSACTION";



const setTransactions = (transactions) => ({
    type: SET_TRANSACTIONS,
    payload: transactions,
});

const setTransactionDetail = (transaction) => ({
    type: SET_TRANSACTION_DETAIL,
    payload: transaction,
});

const addTransaction = (transaction) => ({
    type: ADD_TRANSACTION,
    payload: transaction,
});

const updateTransaction = (transaction) => ({
    type: UPDATE_TRANSACTION,
    payload: transaction,
});

const removeTransaction = (transactionId) => ({
    type: REMOVE_TRANSACTION,
    payload: transactionId,
});


export const fetchTransactions = () => async (dispatch) => {
    const response = await fetch(`/api/transactions`);
    if (response.ok) {
        const data = await response.json();
        dispatch(setTransactions(data));
    }
};

export const fetchTransactionDetail = (transactionId) => async (dispatch) => {
    const response = await fetch(`/api/transactions/${transactionId}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(setTransactionDetail(data));
    }
};

export const createTransaction = (transactionData) => async (dispatch) => {
    const response = await fetch(`/api/transactions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(transactionData)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(addTransaction(data));
    }
};

export const updateTransactionDetails = (transactionId, transactionData) => async (dispatch) => {
    const response = await fetch(`/api/transactions/${transactionId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(transactionData)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(updateTransaction(data));
    }
};

export const deleteTransaction = (transactionId) => async (dispatch) => {
    const response = await fetch(`/api/transactions/${transactionId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        dispatch(removeTransaction(transactionId));
    }
};

const initialState = {
    transactions: [],
    transactionDetail: null,
};

export default function transactionReducer(state = initialState, action) {
    switch (action.type) {
        case SET_TRANSACTIONS:
            return { ...state, transactions: action.payload };
        case SET_TRANSACTION_DETAIL:
            return { ...state, transactionDetail: action.payload };
        case ADD_TRANSACTION:
            return { ...state, transactions: [...state.transactions, action.payload] };
        case UPDATE_TRANSACTION:
            return {
                ...state,
                transactions: state.transactions.map(transaction =>
                    transaction.id === action.payload.id ? action.payload : transaction
                ),
                transactionDetail: state.transactionDetail && state.transactionDetail.id === action.payload.id ? action.payload : state.transactionDetail
            };
        case REMOVE_TRANSACTION:
            return {
                ...state,
                transactions: state.transactions.filter(transaction => transaction.id !== action.payload),
                transactionDetail: state.transactionDetail && state.transactionDetail.id === action.payload ? null : state.transactionDetail
            };
        default:
            return state;
    }
}
