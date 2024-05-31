import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateOrder, fetchOrderDetail } from '../../store/order';
import { useModal } from '../../context/Modal';
import './OrderForm.css';

const OrderFormUpdate = ({ orderId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const order = useSelector(state => state.order.orderDetail);
  const [formData, setFormData] = useState({
    account_id: '',
    type: '',
    status: '',
    price: '',
    quantity: ''
  });

  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrderDetail(orderId));
    }
  }, [dispatch, orderId]);

  useEffect(() => {
    if (order) {
      setFormData({
        account_id: order.account_id,
        type: order.type,
        status: order.status,
        price: order.price,
        quantity: order.quantity
      });
    }
  }, [order]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateOrder(orderId, formData));
    closeModal();
  };

  return (
    <div className="form-container">
      <h2>Update Order</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Account ID:
          <input
            type="text"
            value={formData.account_id}
            onChange={(e) => setFormData({ ...formData, account_id: e.target.value })}
            required
          />
        </label>
        <label>
          Type:
          <input
            type="text"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            required
          />
        </label>
        <label>
          Status:
          <input
            type="text"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            required
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />
        </label>
        <label>
          Quantity:
          <input
            type="number"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            required
          />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default OrderFormUpdate;
