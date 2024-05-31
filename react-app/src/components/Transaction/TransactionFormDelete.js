import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTransaction } from '../../store/transaction';
import { useModal } from '../../context/Modal';
import './TransactionForm.css';

const TransactionFormDelete = ({ transactionId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async () => {
    await dispatch(deleteTransaction(transactionId));
    closeModal();
  };

  return (
    <div className="form-container">
      <h2>Delete Transaction</h2>
      <p>Are you sure you want to delete this transaction?</p>
      <button onClick={handleDelete}>Yes, Delete</button>
      <button onClick={closeModal}>Cancel</button>
    </div>
  );
};

export default TransactionFormDelete;
