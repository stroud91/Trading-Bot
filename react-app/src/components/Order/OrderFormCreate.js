import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createOrder } from '../../store/order';
import { useModal } from '../../context/Modal';
import './OrderForm.css';

const OrderFormCreate = () => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [formData, setFormData] = useState({
    account_id: '',
    type: '',
    status: '',
    price: '',
    quantity: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createOrder(formData));
    closeModal();
  };

  return (
    <div className="form-container">
      <h2>Create Order</h2>
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
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default OrderFormCreate;
