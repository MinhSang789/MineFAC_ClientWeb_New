import { StarFilled } from '@ant-design/icons';
import classNames from 'classnames';
import { userFullName } from 'context/UserContext';
import { userLevel } from 'context/UserContext';
import { userAvatar } from 'context/UserContext';
import React from 'react';

export default function UserAvatar({ user, vertical, horizontal, dark, onClick }) {
  return (
    <div className={classNames('d-flex', 'align-items-center', 'position-relative', {
      'flex-column': vertical,
      'justify-content-center': vertical,
    })}>
      <img className={classNames('img-rounded', { 'img-rounded--vertical': vertical, 'pointer': !!onClick })} src={userAvatar(user)} alt="" onClick={onClick} />
      <div className={classNames('px-2 position-relative', { 'mt-2': vertical, 'text-center': vertical })}>
        <div className="badge bg-blue d-inline-flex align-items-center text-center">
          <StarFilled className="text-secondary me-1" />
          <span className="text-white fs-8">{userLevel(user?.appUserMembershipId)}</span>
        </div>
        <p className={classNames('fw-semibold', 'text-center', {
          'mt-1': vertical,
          'h6': vertical,
          'text-light': vertical && !dark,
          'text-dark': dark,
        })}>{userFullName(user)}</p>
      </div>
    </div>
  );
}
