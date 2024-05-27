const SET_ACCOUNTS = "accounts/SET_ACCOUNTS";
const SET_ACCOUNT_DETAIL = "accounts/SET_ACCOUNT_DETAIL";
const ADD_ACCOUNT = "accounts/ADD_ACCOUNT";
const UPDATE_ACCOUNT = "accounts/UPDATE_ACCOUNT";
const REMOVE_ACCOUNT = "accounts/REMOVE_ACCOUNT";


const setAccounts = (accounts) => ({
    type: SET_ACCOUNTS,
    payload: accounts,
});

const setAccountDetail = (account) => ({
    type: SET_ACCOUNT_DETAIL,
    payload: account,
});

const addAccount = (account) => ({
    type: ADD_ACCOUNT,
    payload: account,
});

const updateAccount = (account) => ({
    type: UPDATE_ACCOUNT,
    payload: account,
});

const removeAccount = (accountId) => ({
    type: REMOVE_ACCOUNT,
    payload: accountId,
});


export const fetchAccounts = () => async (dispatch) => {
    const response = await fetch(`/api/account/accounts`);
    if (response.ok) {
        const data = await response.json();
        dispatch(setAccounts(data));
    }
};

export const fetchAccountDetail = (accountId) => async (dispatch) => {
    const response = await fetch(`/api/account/accounts/${accountId}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(setAccountDetail(data));
    }
};

export const createAccount = (accountData) => async (dispatch) => {
    const response = await fetch(`/api/account/accounts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(accountData)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(addAccount(data));
    }
};

export const updateAccountDetails = (accountId, accountData) => async (dispatch) => {
    const response = await fetch(`/api/account/accounts/${accountId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(accountData)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(updateAccount(data));
    }
};

export const deleteAccount = (accountId) => async (dispatch) => {
    const response = await fetch(`/api/account/accounts/${accountId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        dispatch(removeAccount(accountId));
    }
};

const initialState = {
    accounts: [],
    accountDetail: null,
};

export default function accountReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ACCOUNTS:
            return { ...state, accounts: action.payload };
        case SET_ACCOUNT_DETAIL:
            return { ...state, accountDetail: action.payload };
        case ADD_ACCOUNT:
            return { ...state, accounts: [...state.accounts, action.payload] };
        case UPDATE_ACCOUNT:
            return {
                ...state,
                accounts: state.accounts.map(account =>
                    account.id === action.payload.id ? action.payload : account
                ),
                accountDetail: state.accountDetail && state.accountDetail.id === action.payload.id ? action.payload : state.accountDetail
            };
        case REMOVE_ACCOUNT:
            return {
                ...state,
                accounts: state.accounts.filter(account => account.id !== action.payload),
                accountDetail: state.accountDetail && state.accountDetail.id === action.payload ? null : state.accountDetail
            };
        default:
            return state;
    }
}
