import { LogoutOutlined, RightOutlined } from '@ant-design/icons';
import { ModalWrapper } from 'components/Wallet';
import { useUser } from 'context/UserContext';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useModal } from 'context/ModalContext';
import { ShieldIC } from 'assets/icons';
import Two2Fa from 'Page/Two2Fa/two2Fa';

export default function SignOut(props) {
  const { history } = props;
  const intl = useIntl();
  const t = useCallback(id => intl.formatMessage({ id }), [intl]);
  const { user, signOut } = useUser();
  const modal = useModal();
  const siteTime = new Date().toLocaleString('en-GB', { timeZone: 'Asia/Singapore' }) + " (Singapore time GMT+08:00)";
  const handleClick2fa = () => {
    modal.show({
      title: t('sec_2fa'),
      content: <Two2Fa history={history}/>,
      transparent: true,
      customClass: 'modal-two2fa',
      headerClassBg: 'bg-img-earth'
    });
  }
  return (
    <ModalWrapper dark isTop>
      <div className='d-flex align-items-center flex-column p-3'>
        <div className='divider mt-4 w-100'></div>
        <div className="d-flex justify-content-between w-100 signout__sec" onClick={handleClick2fa}>
          <div> <ShieldIC /><span className="mx-2 signout__sec--title">{t('sec_2fa')}</span></div>
          <div className="d-flex align-items-center"><span className={user.twoFAEnable ? 'enabled-2fa mx-2' : 'disabled-2fa mx-2'}>{user.twoFAEnable ? t('enabled_2fa') : t('disabled_2fa')}</span><RightOutlined /></div>
        </div>
        <button className='btn bg-primary text-light mt-3 py-2 px-5 center' onClick={signOut}>
          <LogoutOutlined />
          <span className='ms-2'>{t('sign_out')}</span>
        </button>
        <p className='text-gray text-center mt-3'>
        Fi Network - v1.0.0
        </p>
        <p className='text-gray text-center mt-3'>
        {siteTime}
        </p>
      </div>
    </ModalWrapper>
  )
}