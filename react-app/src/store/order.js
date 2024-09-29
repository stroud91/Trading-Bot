const SET_ORDERS = "orders/SET_ORDERS";
const ADD_ORDER = "orders/ADD_ORDER";
const UPDATE_ORDER = "orders/UPDATE_ORDER";
const REMOVE_ORDER = "orders/REMOVE_ORDER";
const SET_ORDER_DETAIL = "orders/SET_ORDER_DETAIL";

const setOrders = (orders) => ({
    type: SET_ORDERS,
    payload: orders,
});

const addOrder = (order) => ({
    type: ADD_ORDER,
    payload: order,
});

const updateOrder = (order) => ({
    type: UPDATE_ORDER,
    payload: order,
});

const removeOrder = (orderId) => ({
    type: REMOVE_ORDER,
    payload: orderId,
});

const setOrderDetail = (order) => ({
    type: SET_ORDER_DETAIL,
    payload: order,
});

export const fetchOrders = () => async (dispatch) => {
    const response = await fetch(`/api/orders/orders`);
    if (response.ok) {
        const data = await response.json();
        dispatch(setOrders(data));
    }
};

export const fetchOrderDetail = (orderId) => async (dispatch) => {
    const response = await fetch(`/api/orders/orders/${orderId}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(setOrderDetail(data));
    }
};

export const createOrder = (orderData) => async (dispatch) => {
    const response = await fetch(`/api/orders/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(addOrder(data));
    }
};

export const updateOrderDetails = (orderId, orderData) => async (dispatch) => {
    const response = await fetch(`/api/orders/orders/${orderId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(updateOrder(data));
    }
};

export const deleteOrder = (orderId) => async (dispatch) => {
    const response = await fetch(`/api/orders/orders/${orderId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        dispatch(removeOrder(orderId));
    }
};

const initialState = {
    orders: [],
    orderDetail: null
};

export default function orderReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ORDERS:
            return { ...state, orders: action.payload };
        case ADD_ORDER:
            return { ...state, orders: [...state.orders, action.payload] };
        case UPDATE_ORDER:
            return {
                ...state,
                orders: state.orders.map(order =>
                    order.id === action.payload.id ? action.payload : order
                )
            };
        case REMOVE_ORDER:
            return {
                ...state,
                orders: state.orders.filter(order => order.id !== action.payload)
            };
        case SET_ORDER_DETAIL:
            return { ...state, orderDetail: action.payload };
        default:
            return state;
    }
}
