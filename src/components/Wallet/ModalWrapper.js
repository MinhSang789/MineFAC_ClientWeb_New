import BackgroundTop from 'components/Layout/BackgroundTop';
import { UserAvatar } from 'components/User';
import { useUser } from 'context/UserContext';
import React from 'react';

export default function ModalWrapper({ hideAvatar, dark, children, isTop }) {
  const { user } = useUser();
  return (
    <section>
      {isTop && <BackgroundTop height={dark ? '130px' : '228px'} />}
      <div style={{paddingTop: dark ? '30px' : '0'}}>
        {(!hideAvatar && isTop ) ? (
          <div className="center">
            <UserAvatar user={user} vertical dark={dark} />
          </div>
        ) : <></>}
        <div style={{paddingTop: dark? '0' : '60px'}}>
          {children}
        </div>
      </div>
    </section>
  )
};