import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions } from '../../store/transaction';
import './AccountPositions.css';

const AccountPositions = () => {
    const dispatch = useDispatch();
    const transactions = useSelector((state) => state.transaction.transactions);

    useEffect(() => {
        dispatch(fetchTransactions());
    }, [dispatch]);

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
                    {transactions.length > 0 ? (
                        transactions.map((transaction) => (
                            <tr key={transaction.id}>
                                <td>{transaction.market}</td>
                                <td>{transaction.side}</td>
                                <td>{transaction.size}</td>
                                <td>{transaction.leverage}</td>
                                <td>{transaction.liquidation_price}</td>
                                <td>{transaction.unrealized_pnl}</td>
                                <td>{transaction.realized_pnl}</td>
                                <td>{transaction.avg_open_close}</td>
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
