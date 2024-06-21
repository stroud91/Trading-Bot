import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccountDetail } from '../../store/account';
import { fetchOrders } from '../../store/order';
import { fetchTransactions } from '../../store/transaction';
import AccountOrders from './AccountOrders';
import AccountHistory from './AccountHistory';
import './AccountOverview.css';

const AccountOverview = ({ accountId }) => {
    const dispatch = useDispatch();
    const account = useSelector((state) => state.account.accountDetail);
    const orders = useSelector((state) => state.order.orders);
    const transactions = useSelector((state) => state.transaction.transactions);

    useEffect(() => {
        if (accountId) {
            dispatch(fetchAccountDetail(accountId));
            dispatch(fetchOrders());
            dispatch(fetchTransactions());
        }
    }, [dispatch, accountId]);

    return (
        <div className="account-overview">
            <h2>Account Overview</h2>
            {account ? (
                <div className="account-details">
                    <p><strong>Account ID:</strong> {account.id}</p>
                    <p><strong>User ID:</strong> {account.user_id}</p>
                    <p><strong>Balance:</strong> ${account.balance.toFixed(2)}</p>
                    <p><strong>Account Type:</strong> {account.account_type}</p>
                    <p><strong>Status:</strong> {account.status}</p>
                </div>
            ) : (
                <p>Loading account details...</p>
            )}
            <AccountOrders orders={orders} />
            <AccountHistory transactions={transactions} />
        </div>
    );
};

export default AccountOverview;
