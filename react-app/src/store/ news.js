// Constants
const SET_NEWS = "news/SET_NEWS";

// Action Creators
const setNews = (news) => ({
    type: SET_NEWS,
    payload: news,
});

// Initial State
const initialState = { news: [] };

// Thunks
export const fetchNews = () => async (dispatch) => {
    const response = await fetch(`/api/news`);
    if (response.ok) {
        const data = await response.json();
        dispatch(setNews(data));
    }
};

// Reducer
export default function newsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_NEWS:
            return { news: action.payload };
        default:
            return state;
    }
}
