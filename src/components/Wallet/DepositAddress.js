import { CopyFilled } from '@ant-design/icons';
import { useModal } from 'context/ModalContext';
import { useSystem } from 'context/SystemContext';
import { simpleCopyToClipboard } from 'helper/common';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import DepositUsdtForm from './DepositUsdt';
import ModalWrapper from './ModalWrapper';
export default function DepositAddress() {
  const intl = useIntl();
  const modal = useModal();
  const { system } = useSystem();

  const t = useCallback(id => intl.formatMessage({ id }), [intl]);

  const handleCopyAddress = useCallback(() => {
    simpleCopyToClipboard(system?.USDTWalletAddress)
  }, [system])

  function openConfirmDepositModal() {
    modal.show({
      title: t('deposit_usdt'),
      content: <DepositUsdtForm />,
      transparent: true,
      headerNode: true,
      headerClassBg: 'bg-img-earth'
    })
  }
  return (
    <ModalWrapper>
      <div className="px-4">
        <div className="center-horizontal">
          <img src={system?.USDTWalletAddressQRCode} alt="qr-code" />
        </div>
        <p className="text-center mt-2">
          {t('deposit_usdt_note1')}
          <br />
          {t('deposit_usdt_note2')}
        </p>
        <div className="divider"></div>
        <div className="d-flex justify-content-between mt-4">
          <p>{t('network')}</p>
          <p className="fw-500">TRON (TRC20)</p>
        </div>
        <div className="divider"></div>
        <div className="d-flex justify-content-between align-items-center mt-4">
          <p>{t('deposit_address')}</p>
          <p className="fw-500 text-2 ms-auto" style={{ width: '188px' }}>{system?.USDTWalletAddress}</p>
          <button className="btn btn-outline-transparent" onClick={handleCopyAddress}>
            <CopyFilled className="text-gray" />
          </button>
        </div>
        <div className="divider"></div>
        <button className="btn btn-primary w-100 py-2 mt-4" onClick={openConfirmDepositModal}>{t('confirm')}</button>
      </div>
    </ModalWrapper>
  )
}