import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopStocks, fetchUserStocks } from '../../store/marketdata';
import './MarketData.css';

const MarketData = ({ userId }) => {
    const dispatch = useDispatch();
    const topStock = useSelector((state) => state.marketData.topStocks);
    const userStocks = useSelector((state) => state.marketData.userStocks);
    const user = useSelector((state) => state.session.user);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("Dispatching fetchTopStocks");
                await dispatch(fetchTopStocks());

                if (userId) {
                    console.log("Dispatching fetchUserStocks for userId:", userId);
                    await dispatch(fetchUserStocks(userId));
                }
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [dispatch, userId]);

    const getChangeClass = (change) => {
        if (change > 0) return "stock-change positive";
        if (change < 0) return "stock-change negative";
        return "stock-change";
    };

    if (loading) {
        return <p>Loading market data...</p>;
    }

    return (
        <div className="market-data-container">
            <div className="market-data-top-stocks">
                <h2>Top Stocks</h2>
                {topStock && topStock.length > 0 ? (
                    <ul>
                        {topStock.map((stock, index) => (
                            <li key={index}>
                                <div className="stock-info">
                                    <span className="stock-symbol">{stock.symbol}</span>
                                    <div className="stock-prices">
                                        <span>High: {stock.h}</span>
                                        <span>Low: {stock.l}</span>
                                        <span>Open: {stock.o}</span>
                                        <span>Previous Close: {stock.pc}</span>
                                    </div>
                                </div>
                                <span className={getChangeClass(stock.d)}>{stock.c} ({stock.dp}%)</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No top stocks available</p>
                )}
            </div>
            {user && (
                <div className="market-data-user-stocks">
                    <h2>Your Stocks</h2>
                    {userStocks && userStocks.length > 0 ? (
                        <ul>
                            {userStocks.map((stock, index) => (
                                <li key={index}>
                                    <div className="stock-info">
                                        <span className="stock-symbol">{stock.symbol}</span>
                                        <div className="stock-prices">
                                            <span>High: {stock.h}</span>
                                            <span>Low: {stock.l}</span>
                                            <span>Open: {stock.o}</span>
                                            <span>Previous Close: {stock.pc}</span>
                                        </div>
                                    </div>
                                    <span className={getChangeClass(stock.d)}>{stock.c} ({stock.dp}%)</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No user stocks available</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default MarketData;
