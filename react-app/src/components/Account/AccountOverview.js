import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccount } from '../../store/account';
import './AccountOverview.css';

const AccountOverview = () => {
    const dispatch = useDispatch();
    const account = useSelector(state => state.account.account);

    useEffect(() => {
        dispatch(fetchAccount(1)); // Assuming accountId = 1 for demo
    }, [dispatch]);

    return (
        <div className="account-overview">
            {account ? (
                <>
                    <div className="account-value">
                        <h2>Portfolio Value</h2>
                        <p>${account.balance.toFixed(2)}</p>
                        <p>+ $0.00 (0.00%) Past Week</p>
                    </div>
                    <div className="account-metrics">
                        <div>Margin Usage: -</div>
                        <div>Free Collateral: -</div>
                        <div>Leverage: -</div>
                        <div>Buying Power: -</div>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default AccountOverview;
