import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTransaction, fetchTransactionDetail } from '../../store/transaction';
import { useModal } from '../../context/Modal';
import './TransactionForm.css';

const TransactionFormUpdate = ({ transactionId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const transaction = useSelector(state => state.transaction.transactionDetail);
  const [formData, setFormData] = useState({
    account_id: '',
    transaction_type: '',
    amount: ''
  });

  useEffect(() => {
    if (transactionId) {
      dispatch(fetchTransactionDetail(transactionId));
    }
  }, [dispatch, transactionId]);

  useEffect(() => {
    if (transaction) {
      setFormData({
        account_id: transaction.account_id,
        transaction_type: transaction.transaction_type,
        amount: transaction.amount
      });
    }
  }, [transaction]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateTransaction(transactionId, formData));
    closeModal();
  };

  return (
    <div className="form-container">
      <h2>Update Transaction</h2>
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
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default TransactionFormUpdate;
