import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFees } from '../../store/fees';
import './AccountFees.css';

const AccountFees = ({ accountId }) => {
    const dispatch = useDispatch();
    const fees = useSelector(state => state.fees.fees);

    useEffect(() => {
        dispatch(fetchFees(accountId));
    }, [dispatch, accountId]);

    return (
        <div className="account-fees">
            <h2>Account Fees</h2>
            <table>
                <thead>
                    <tr>
                        <th>Fee Type</th>
                        <th>Amount</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {fees.length > 0 ? (
                        fees.map(fee => (
                            <tr key={fee.id}>
                                <td>{fee.fee_type}</td>
                                <td>{fee.amount}</td>
                                <td>{fee.date}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">You have no fees.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AccountFees;
