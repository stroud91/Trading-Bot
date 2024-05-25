// Constants
const SET_ORDERS = "order/SET_ORDERS";

// Action Creators
const setOrders = (orders) => ({
    type: SET_ORDERS,
    payload: orders,
});

// Initial State
const initialState = { orders: [] };

// Thunks
export const fetchOrders = (accountId) => async (dispatch) => {
    const response = await fetch(`/api/orders/${accountId}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(setOrders(data));
    }
};

// Reducer
export default function orderReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ORDERS:
            return { ...state, orders: action.payload };
        default:
            return state;
    }
}
