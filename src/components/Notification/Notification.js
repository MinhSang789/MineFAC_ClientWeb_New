import { BellOutlined } from '@ant-design/icons';
import useInterval from '../../hooks/useInterval';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CustomerService from '../../services/customerMessage';

export default function Notification() {
  const history = useHistory();
  const [notificationCount, setNotificationCount] = useState(null);
  const filter = {};
  useEffect(() => {
    CustomerService.getUnreadNotificationCount({ filter }).then(result => {
      const { isSuccess, data } = result;
      if (isSuccess) {
        setNotificationCount(data.total);
      }
    })
  }, []);
  useInterval(() => {
    CustomerService.getUnreadNotificationCount({ filter }).then(result => {
      const { isSuccess, data } = result;
      if (isSuccess) {
        setNotificationCount(data.total);
      }
    })
  }, 60000)
  return (
    <div className="position-relative" role="button"
      onClick={() => history.push('/management/notification')}>
      <BellOutlined style={{ fontSize: '24px' }} />
      {(notificationCount && notificationCount > 0 ) ? (
        <p className="rounded-circle bg-orange d-flex align-items-center justify-content-center"
          style={{ width: '20px', height: '20px', position: 'absolute', top: '-45%', left: '60%', padding: '2px', fontSize: '12px' }}>
          {notificationCount}
        </p>
      ): <></>}
    </div>
  );
}