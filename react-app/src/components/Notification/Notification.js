import React, { useEffect, useState } from 'react';
import './Notification.css';

const Notification = ({ message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="notification">
      <p>{message}</p>
      <div className="timer"></div>
    </div>
  );
};

export default Notification;
