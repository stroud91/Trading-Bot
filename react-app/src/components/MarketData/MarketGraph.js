import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchHistoricalData } from '../../store/ marketData';
import './MarketGraph.css';

const MarketGraph = ({ symbol }) => {
    const dispatch = useDispatch();
    const historicalData = useSelector((state) => state.marketData.historicalData);

    useEffect(() => {
        dispatch(fetchHistoricalData(symbol));
    }, [dispatch, symbol]);

    return (
        <div className="market-graph">
            <h2>{symbol} Market Graph</h2>
            {historicalData ? (
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
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default MarketGraph;
