import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteAccount } from '../../store/account';
import { useModal } from '../../context/Modal';
import './AccountForm.css';

const AccountFormDelete = ({ accountId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async () => {
    await dispatch(deleteAccount(accountId));
    closeModal();
  };

  return (
    <div className="form-container">
      <h2>Delete Account</h2>
      <p>Are you sure you want to delete this account?</p>
      <button onClick={handleDelete}>Yes, Delete</button>
      <button onClick={closeModal}>Cancel</button>
    </div>
  );
};

export default AccountFormDelete;
