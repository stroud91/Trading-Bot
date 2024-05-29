const SET_NEWS = "news/SET_NEWS";
const ADD_NEWS = "news/ADD_NEWS";


const setNews = (news) => ({
    type: SET_NEWS,
    payload: news,
});

const addNews = (newsItem) => ({
    type: ADD_NEWS,
    payload: newsItem,
});



export const fetchNews = (symbol) => async (dispatch) => {
    const response = await fetch(`/api/news/${symbol}/all`);
    if (response.ok) {
        const data = await response.json();
        dispatch(setNews(data));
    }
};

export const createNews = (symbol) => async (dispatch) => {
    const response = await fetch(`/api/news/${symbol}`, {
        method: 'POST',
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(fetchNews(symbol)); 
    }
};


const initialState = { news: [] };

export default function newsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_NEWS:
            return { ...state, news: action.payload };
        case ADD_NEWS:
            return { ...state, news: [...state.news, action.payload] };
        default:
            return state;
    }
}
