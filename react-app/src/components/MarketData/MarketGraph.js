import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    Brush, AreaChart, Area, ReferenceLine, ReferenceDot, ReferenceArea
} from 'recharts';
import { fetchHistoricalData } from '../../store/marketData';
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
                <ResponsiveContainer width="100%" height={500}>
                    <AreaChart data={historicalData}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="Date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Brush dataKey="Date" height={30} stroke="#8884d8" />
                        <Area type="monotone" dataKey="Close Price" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                        <Line type="monotone" dataKey="High Price" stroke="#82ca9d" />
                        <Line type="monotone" dataKey="Low Price" stroke="#ffc658" />
                    </AreaChart>
                </ResponsiveContainer>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default MarketGraph;
