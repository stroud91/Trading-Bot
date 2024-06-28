const SET_NEWS = "news/SET_NEWS";
const SET_LOADING_NEWS = "news/SET_LOADING_NEWS";

const setNews = (news) => ({
    type: SET_NEWS,
    payload: news,
});

const setLoadingNews = (loading) => ({
    type: SET_LOADING_NEWS,
    payload: loading,
});

export const fetchNews = (symbol) => async (dispatch) => {
    dispatch(setLoadingNews(true));
    try {
        const response = await fetch(`/api/news/news/${symbol}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            const data = await response.json();
            console.log("this is back end news", data)
            dispatch(setNews(data));
        } else {
            console.error("Failed to fetch news, status:", response.status);
        }
    } catch (error) {
        console.error("Failed to fetch news:", error);
    } finally {
        dispatch(setLoadingNews(false));
    }
};

const initialState = { news: [], loadingNews: false };

export default function newsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_NEWS:
            return { ...state, news: action.payload };
        case SET_LOADING_NEWS:
            return { ...state, loadingNews: action.payload };
        default:
            return state;
    }
}
