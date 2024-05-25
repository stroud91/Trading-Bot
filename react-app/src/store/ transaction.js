


// Constants
const SET_POSITIONS = "transaction/SET_POSITIONS";
const SET_HISTORY = "transaction/SET_HISTORY";

// Action Creators
const setPositions = (positions) => ({
    type: SET_POSITIONS,
    payload: positions,
});

const setHistory = (history) => ({
    type: SET_HISTORY,
    payload: history,
});

// Initial State
const initialState = { positions: [], history: [] };

// Thunks
export const fetchPositions = (accountId) => async (dispatch) => {
    const response = await fetch(`/api/positions/${accountId}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(setPositions(data));
    }
};

export const fetchHistory = (accountId) => async (dispatch) => {
    const response = await fetch(`/api/history/${accountId}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(setHistory(data));
    }
};

// Reducer
export default function transactionReducer(state = initialState, action) {
    switch (action.type) {
        case SET_POSITIONS:
            return { ...state, positions: action.payload };
        case SET_HISTORY:
            return { ...state, history: action.payload };
        default:
            return state;
    }
}
