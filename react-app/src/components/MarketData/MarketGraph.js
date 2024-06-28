import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { fetchTransactions, createTransaction } from '../../store/transaction';
import { createOrder, fetchOrders } from '../../store/order';
import { fetchHistoricalData } from '../../store/marketdata';
import { fetchNews } from '../../store/news';
import './MarketGraph.css';

const MarketGraph = ({ symbol }) => {
    const dispatch = useDispatch();
    const [timeFrame, setTimeFrame] = useState("1m");
    const historicalData = useSelector((state) => state.marketData.historicalData);
    const newsData = useSelector((state) => state.news.news);
    const accountData = useSelector((state) => state.account.accountDetail);
    const user = useSelector((state) => state.session.user);
    const transactions = useSelector((state) => state.transaction.transactions);
    const orders = useSelector((state) => state.order.orders);
    const loadingHistoricalData = useSelector((state) => state.marketData.loadingHistoricalData);
    const loadingNews = useSelector((state) => state.news.loadingNews);

    useEffect(() => {
        dispatch(fetchHistoricalData(symbol, timeFrame));
        dispatch(fetchNews(symbol));
        if (user) {
            dispatch(fetchOrders());
            dispatch(fetchTransactions());
        }
    }, [dispatch, symbol, timeFrame, user]);

    const handleTimeFrameChange = (frame) => {
        setTimeFrame(frame);
        dispatch(fetchHistoricalData(symbol, frame));
    };

    const handleBuy = () => {
        const orderData = {
            account_id: accountData.id,
            type: "buy",
            status: "open",
            price: historicalData[historicalData.length - 1]["Close Price"],
            quantity: 1
        };
        dispatch(createOrder(orderData));
        const transactionData = {
            account_id: accountData.id,
            type: "buy",
            amount: orderData.price * orderData.quantity
        };
        dispatch(createTransaction(transactionData));
    };

    const handleSell = () => {
        const orderData = {
            account_id: accountData.id,
            type: "sell",
            status: "open",
            price: historicalData[historicalData.length - 1]["Close Price"],
            quantity: 1
        };
        dispatch(createOrder(orderData));
        const transactionData = {
            account_id: accountData.id,
            type: "sell",
            amount: orderData.price * orderData.quantity
        };
        dispatch(createTransaction(transactionData));
    };

    return (
        <div className="market-graph-container">
            <div className="graph-section">
                <h2>{symbol} Market Graph</h2>
                <div className="time-frame-buttons">
                    <button onClick={() => handleTimeFrameChange("1d")}>1D</button>
                    <button onClick={() => handleTimeFrameChange("1w")}>1W</button>
                    <button onClick={() => handleTimeFrameChange("1m")}>1M</button>
                    <button onClick={() => handleTimeFrameChange("1y")}>1Y</button>
                </div>
                {loadingHistoricalData ? (
                    <p>Loading...</p>
                ) : (
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={historicalData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="Date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="Close Price" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                )}
                {user && (
                    <div className="buy-sell-options">
                        <button className="buy-button" onClick={handleBuy}>Buy</button>
                        <button className="sell-button" onClick={handleSell}>Sell</button>
                    </div>
                )}
            </div>
            <div className="news-section">
                <h2>{symbol} News</h2>
                {loadingNews ? (
                    <p>Loading news...</p>
                ) : (
                    <ul className="news-list">
                        {newsData.map((newsItem, index) => (
                            <li key={index} className="news-item">
                                <a href={newsItem.url} target="_blank" rel="noopener noreferrer">
                                    <h3>{newsItem.title}</h3>
                                    <p>{newsItem.description}</p>
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default MarketGraph;
