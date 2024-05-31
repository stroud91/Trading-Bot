import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAccount, fetchAccountDetail } from '../../store/account';
import { useModal } from '../../context/Modal';
import './AccountForm.css';

const AccountFormUpdate = ({ accountId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const account = useSelector(state => state.account.accountDetail);
  const [formData, setFormData] = useState({
    balance: '',
    account_type: '',
    status: 'active'
  });

  useEffect(() => {
    if (accountId) {
      dispatch(fetchAccountDetail(accountId));
    }
  }, [dispatch, accountId]);

  useEffect(() => {
    if (account) {
      setFormData({
        balance: account.balance,
        account_type: account.account_type,
        status: account.status
      });
    }
  }, [account]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateAccount(accountId, formData));
    closeModal();
  };

  return (
    <div className="form-container">
      <h2>Update Account</h2>
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
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default AccountFormUpdate;
