import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../store/order';
import './AccountOrders.css';

const AccountOrders = () => {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.order.orders);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    return (
        <div className="account-orders">
            <h2>Orders</h2>
            <table>
                <thead>
                    <tr>
                        <th>Market</th>
                        <th>Status</th>
                        <th>Side</th>
                        <th>Amount / Filled</th>
                        <th>Price</th>
                        <th>Trigger</th>
                        <th>Good Til</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.market}</td>
                                <td>{order.status}</td>
                                <td>{order.side}</td>
                                <td>{order.amount_filled}</td>
                                <td>{order.price}</td>
                                <td>{order.trigger}</td>
                                <td>{order.good_til}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">You have no orders.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AccountOrders;
