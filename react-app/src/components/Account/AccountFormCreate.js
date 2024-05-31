import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAccount } from '../../store/account';
import { useModal } from '../../context/Modal';
import './AccountForm.css';

const AccountFormCreate = () => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [formData, setFormData] = useState({
    balance: '',
    account_type: '',
    status: 'active'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createAccount(formData));
    closeModal();
  };

  return (
    <div className="form-container">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Balance:
          <input
            type="number"
            value={formData.balance}
            onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
            required
          />
        </label>
        <label>
          Account Type:
          <input
            type="text"
            value={formData.account_type}
            onChange={(e) => setFormData({ ...formData, account_type: e.target.value })}
            required
          />
        </label>
        <label>
          Status:
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default AccountFormCreate;
