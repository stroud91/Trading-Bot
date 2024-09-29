import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccounts, fetchAccountDetail } from '../../store/account';
import { fetchOrders } from '../../store/order';
import { fetchTransactions } from '../../store/transaction';
import AccountOrders from './AccountOrders';
import AccountPositions from './AccountPositions';
import './AccountOverview.css';

const AccountOverview = () => {
    const dispatch = useDispatch();
    const accounts = useSelector((state) => state.account.accounts);
    const account = useSelector((state) => state.account.accountDetail);
    const orders = useSelector((state) => state.order.orders);
    const transactions = useSelector((state) => state.transaction.transactions);

    const [accountId, setAccountId] = useState(null);

    useEffect(() => {
        // Fetch accounts if they haven't been loaded yet
        if (accounts.length === 0) {
            dispatch(fetchAccounts());
        }
    }, [dispatch, accounts.length]);

    useEffect(() => {
        // Set the accountId once accounts are loaded
        if (accounts.length > 0 && !accountId) {
            // You can modify this logic to select the appropriate account
            setAccountId(accounts[0].id);
        }
    }, [accounts, accountId]);

    useEffect(() => {
        // Fetch account details when accountId is set
        if (accountId && !account) {
            dispatch(fetchAccountDetail(accountId));
        }
    }, [dispatch, accountId, account]);

    useEffect(() => {
        // Fetch orders and transactions when account details are available
        if (account) {
            dispatch(fetchOrders(account.id));
            dispatch(fetchTransactions(account.id));
        }
    }, [dispatch, account]);

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
            <AccountPositions transactions={transactions} />
        </div>
    );
};

export default AccountOverview;
