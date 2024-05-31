import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTransaction } from '../../store/transaction';
import { useModal } from '../../context/Modal';
import './TransactionForm.css';

const TransactionFormCreate = () => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [formData, setFormData] = useState({
    account_id: '',
    transaction_type: '',
    amount: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createTransaction(formData));
    closeModal();
  };

  return (
    <div className="form-container">
      <h2>Create Transaction</h2>
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
          Transaction Type:
          <input
            type="text"
            value={formData.transaction_type}
            onChange={(e) => setFormData({ ...formData, transaction_type: e.target.value })}
            required
          />
        </label>
        <label>
          Amount:
          <input
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            required
          />
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default TransactionFormCreate;
