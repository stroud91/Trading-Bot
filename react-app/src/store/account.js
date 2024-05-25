import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// Constants
const SET_ACCOUNT = "account/SET_ACCOUNT";
const REMOVE_ACCOUNT = "account/REMOVE_ACCOUNT";

// Action Creators
const setAccount = (account) => ({
    type: SET_ACCOUNT,
    payload: account,
});

const removeAccount = () => ({
    type: REMOVE_ACCOUNT,
});

// Initial State
const initialState = { account: null };

// Thunks
export const fetchAccount = (accountId) => async (dispatch) => {
    const response = await fetch(`/api/accounts/${accountId}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(setAccount(data));
    }
};

// Reducer
export default function accountReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ACCOUNT:
            return { account: action.payload };
        case REMOVE_ACCOUNT:
            return { account: null };
        default:
            return state;
    }
}
