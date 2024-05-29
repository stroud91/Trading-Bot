
const SET_MARKET_DATA = "marketData/SET_MARKET_DATA";
const SET_HISTORICAL_DATA = "marketData/SET_HISTORICAL_DATA";


const setMarketData = (data) => ({
    type: SET_MARKET_DATA,
    payload: data,
});

const setHistoricalData = (data) => ({
    type: SET_HISTORICAL_DATA,
    payload: data,
});


export const fetchMarketData = () => async (dispatch) => {
    const response = await fetch(`/api/main/marketData`);
    if (response.ok) {
        const data = await response.json();
        dispatch(setMarketData(data));
    }
};

export const fetchHistoricalData = (symbol) => async (dispatch) => {
    const response = await fetch(`/api/main/graph/historical/${symbol}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(setHistoricalData(data));
    }
};

const initialState = { historicalData: null, data: null };

export default function marketDataReducer(state = initialState, action) {
    switch (action.type) {
        case SET_MARKET_DATA:
            return { data: action.payload };
        case SET_HISTORICAL_DATA:
            return { ...state, historicalData: action.payload };
        default:
            return state;
    }
}
