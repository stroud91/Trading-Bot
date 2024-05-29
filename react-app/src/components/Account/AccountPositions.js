import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions } from '../../store/transaction';
import './AccountPositions.css';

const AccountPositions = ({ accountId }) => {
    const dispatch = useDispatch();
    const positions = useSelector(state => state.transaction.positions);

    useEffect(() => {
        dispatch(fetchTransactions(accountId));
    }, [dispatch, accountId]);

    return (
        <div className="account-positions">
            <h2>Open Positions</h2>
            <table>
                <thead>
                    <tr>
                        <th>Market</th>
                        <th>Side</th>
                        <th>Size</th>
                        <th>Leverage</th>
                        <th>Liquidation Price</th>
                        <th>Unrealized P&L</th>
                        <th>Realized P&L</th>
                        <th>Average Open / Close</th>
                    </tr>
                </thead>
                <tbody>
                    {positions.length > 0 ? (
                        positions.map(position => (
                            <tr key={position.id}>
                                <td>{position.market}</td>
                                <td>{position.side}</td>
                                <td>{position.size}</td>
                                <td>{position.leverage}</td>
                                <td>{position.liquidationPrice}</td>
                                <td>{position.unrealizedPnL}</td>
                                <td>{position.realizedPnL}</td>
                                <td>{position.avgOpenClose}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8">You have no open positions.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AccountPositions;
