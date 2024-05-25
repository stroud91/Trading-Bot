// Constants
const SET_MARKET_DATA = "marketData/SET_MARKET_DATA";

// Action Creators
const setMarketData = (data) => ({
    type: SET_MARKET_DATA,
    payload: data,
});

// Initial State
const initialState = { data: null };

// Thunks
export const fetchMarketData = () => async (dispatch) => {
    const response = await fetch(`/api/marketData`);
    if (response.ok) {
        const data = await response.json();
        dispatch(setMarketData(data));
    }
};

// Reducer
export default function marketDataReducer(state = initialState, action) {
    switch (action.type) {
        case SET_MARKET_DATA:
            return { data: action.payload };
        default:
            return state;
    }
}
