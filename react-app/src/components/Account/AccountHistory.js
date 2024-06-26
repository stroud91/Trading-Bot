import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions } from '../../store/transaction';
import './AccountHistory.css';

const AccountHistory = () => {
    const dispatch = useDispatch();
    const history = useSelector((state) => state.transaction.transactions);

    useEffect(() => {
        dispatch(fetchTransactions());
    }, [dispatch]);

    return (
        <div className="account-history">
            <h2>Account History</h2>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Transaction Type</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {history.length > 0 ? (
                        history.map((entry) => (
                            <tr key={entry.id}>
                                <td>{entry.date}</td>
                                <td>{entry.type}</td>
                                <td>{entry.amount}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">You have no transaction history.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AccountHistory;
