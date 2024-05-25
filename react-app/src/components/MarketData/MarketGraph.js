import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMarketData } from '../../store/ marketData';
import './MarketGraph.css';

const MarketGraph = () => {
    const dispatch = useDispatch();
    const marketData = useSelector(state => state.marketData.data);
    console.log("this is data", marketData)

    useEffect(() => {
        dispatch(fetchMarketData());
    }, [dispatch]);

    return (
        <div className="market-graph">
            <h2>Market Graph</h2>
            {marketData ? (
                <div id="graph-container">

                    <canvas id="myChart"></canvas>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default MarketGraph;
