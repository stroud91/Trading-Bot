import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHistory } from '../../store/ transaction';
import './AccountHistory.css';

const AccountHistory = () => {
    const dispatch = useDispatch();
    const history = useSelector(state => state.transaction.history);

    useEffect(() => {
        dispatch(fetchHistory(1));
    }, [dispatch]);

    return (
        <div className="account-history">
            <h2>History</h2>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {history.length > 0 ? (
                        history.map(transaction => (
                            <tr key={transaction.id}>
                                <td>{transaction.date}</td>
                                <td>{transaction.type}</td>
                                <td>{transaction.amount}</td>
                                <td>{transaction.status}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No history available.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AccountHistory;
