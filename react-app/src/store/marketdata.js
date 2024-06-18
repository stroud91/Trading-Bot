const SET_MARKET_DATA = "marketData/SET_MARKET_DATA";
const SET_HISTORICAL_DATA = "marketData/SET_HISTORICAL_DATA";
const SET_TOP_STOCKS = "marketData/SET_TOP_STOCKS";
const SET_USER_STOCKS = "marketData/SET_USER_STOCKS";

const setMarketData = (data) => ({
    type: SET_MARKET_DATA,
    payload: data,
});

const setHistoricalData = (data) => ({
    type: SET_HISTORICAL_DATA,
    payload: data,
});

const setTopStocks = (data) => ({
    type: SET_TOP_STOCKS,
    payload: data,
});

const setUserStocks = (data) => ({
    type: SET_USER_STOCKS,
    payload: data,
});

export const fetchMarketData = () => async (dispatch) => {
    try {
        console.log("Fetching market data...");
        const response = await fetch(`/api/main/real_time`);
        if (response.ok) {
            const data = await response.json();
            console.log("Market data:", data);
            dispatch(setMarketData(data));
        } else {
            console.error("Failed to fetch market data, status:", response.status);
        }
    } catch (error) {
        console.error("Failed to fetch market data:", error);
    }
};

export const fetchHistoricalData = (symbol) => async (dispatch) => {
    try {
        console.log(`Fetching historical data for ${symbol}...`);
        const response = await fetch(`/api/main/market_data/historical/${symbol}`);
        if (response.ok) {
            const data = await response.json();
            console.log("Historical data:", data);
            dispatch(setHistoricalData(data));
        } else {
            console.error("Failed to fetch historical data, status:", response.status);
        }
    } catch (error) {
        console.error("Failed to fetch historical data:", error);
    }
};

export const fetchTopStocks = () => async (dispatch) => {
    try {
        console.log("Fetching top stocks...");
        const response = await fetch(`/api/main/stocks/top`);
        if (response.ok) {
            const data = await response.json();
            console.log("Top stocks data:", data);
            dispatch(setTopStocks(data));
        } else {
            console.error("Failed to fetch top stocks, status:", response.status);
        }
    } catch (error) {
        console.error("Failed to fetch top stocks:", error);
    }
};

export const fetchUserStocks = (userId) => async (dispatch) => {
    try {
        console.log(`Fetching stocks for user ${userId}...`);
        const response = await fetch(`/api/user_stocks/${userId}`);
        if (response.ok) {
            const data = await response.json();
            console.log("User stocks data:", data);
            dispatch(setUserStocks(data));
        } else {
            console.error("Failed to fetch user stocks, status:", response.status);
        }
    } catch (error) {
        console.error("Failed to fetch user stocks:", error);
    }
};

const initialState = { historicalData: null, data: null, topStocks: [], userStocks: [] };

const marketDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MARKET_DATA:
            return { ...state, data: action.payload };
        case SET_HISTORICAL_DATA:
            return { ...state, historicalData: action.payload };
        case SET_TOP_STOCKS:
            return { ...state, topStocks: action.payload };
        case SET_USER_STOCKS:
            return { ...state, userStocks: action.payload };
        default:
            return state;
    }
}


export default marketDataReducer
