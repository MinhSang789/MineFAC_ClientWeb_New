import { routes } from 'App';
import { MachineOutlined } from 'assets/icons';
import { useModal } from 'context/ModalContext';
import TransactionHistory from 'Page/TransactionHistory';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import ModalWrapper from './ModalWrapper';

export default function ReceiveBtc({ history }) {
  const intl = useIntl();
  const t = useCallback(id => intl.formatMessage({ id }), [intl]);
  const modal = useModal();
  function handleClickBought() {
    history.push(routes.managementPacket.path);
    modal.hide();
  }
  function handleClickHistory() {
    modal.show({
      title: t('history_modal'),
      content: <TransactionHistory  defaultActiveKey="7" />,
    })
  }
  return (
    <ModalWrapper hideAvatar>
      <div className="px-3 position-relative bg-white d-flex flex-column align-items-center">
        <img className="img-fluid" src="assets/images/bg-receive-btc.svg" alt="" />
        <p className='mt-3 w-100'>{t('receive_btc_note1')}</p>
        <p className='mt-3 w-100'><MachineOutlined /><span className="fw-semibold ms-2">{t('receive_btc_1')}</span></p>
        <p className='mt-3 w-100'><MachineOutlined /><span className="fw-semibold ms-2">{t('receive_btc_2')}</span></p>
        <p className='mt-3 w-100'><MachineOutlined /><span className="fw-semibold ms-2">{t('receive_btc_3')}</span></p>
        <button className="btn btn-primary py-2 mt-5 fw-500 w-100" onClick={handleClickBought}>{t('increase_change_receive_btc')}</button>
        <button className="btn btn-link text-dark mt-3 fw-500" onClick={handleClickHistory}>{t('receive_btc_history')}</button>
      </div>
    </ModalWrapper>
  )
}