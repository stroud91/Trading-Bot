import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteOrder } from '../../store/order';
import { useModal } from '../../context/Modal';
import './OrderForm.css';

const OrderFormDelete = ({ orderId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async () => {
    await dispatch(deleteOrder(orderId));
    closeModal();
  };

  return (
    <div className="form-container">
      <h2>Delete Order</h2>
      <p>Are you sure you want to delete this order?</p>
      <button onClick={handleDelete}>Yes, Delete</button>
      <button onClick={closeModal}>Cancel</button>
    </div>
  );
};

export default OrderFormDelete;
