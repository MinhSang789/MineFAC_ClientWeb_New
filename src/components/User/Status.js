import { ExclamationCircleFilled, WarningFilled } from '@ant-design/icons';
import { ShieldFilledGreen } from 'assets/icons';
import { useUser } from 'context/UserContext';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';

export default function Status() {
  const intl = useIntl();
  // console.log(user);
  const t = useCallback((id) => intl.formatMessage({ id }), [intl]);
  const { user } = useUser();
  if (user?.isVerified === 3) {
    return (
      <span className='p-1 rounded center-vertical bg-error'>
        <WarningFilled />
        <span className='ms-2'>
          {t('kyc_failed')}
        </span>
      </span>
    )
  }
  if (user?.isVerified === 1) {
    return (
      <span className='p-1 rounded center-vertical bg-success'>
        <ShieldFilledGreen />
        <span className='ms-2'>
          {t("kyc_confirm")}
        </span>
      </span>
    )
  }
  if (user?.isVerified === 2) {
    return (
      <span className='p-1 rounded center-vertical bg-warning'>
        <ExclamationCircleFilled />
        <span className='ms-2'>
          {t("kyc_waiting")}
        </span>
      </span>
    )
  }
  return (
    <span className='p-1 rounded center-vertical bg-warning'>
      <ExclamationCircleFilled />
      <span className='ms-2' dangerouslySetInnerHTML={{ __html: t('kyc_not_confirm') }}>
      </span>
    </span>
  );
}