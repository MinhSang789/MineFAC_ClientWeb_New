import { ModalWrapper } from 'components/Wallet';
import React, { useCallback, useMemo } from 'react';
import { formatToNInputPrice } from '../../helper/common';
import { IconBTC, IconFAC, IconUSDT } from "../../assets/icons/index";
import { ExchangeFac, ExchangePoint, ReceiveBtc, WithdrawBtc } from 'components/Wallet';
import { useModal } from 'context/ModalContext';
import { useIntl } from 'react-intl';
import { WALLET } from 'hooks/management.hook';
import { useWallet } from 'context/WalletContext';
import classNames from 'classnames';
import WithdrawForm from './WithdrawForm';
import DepositUsdtForm from './DepositUsdt';

export function Wallet({ history, walletType }) {
  const intl = useIntl();
  const modal = useModal();
  const t = useCallback(id => intl.formatMessage({ id }), [intl]);

  const { wallet: {
    usdtBalance,
    facBalance,
    btcBalance,
    pointBalance,
  }} = useWallet();

  const isExchangeWallet = useMemo(() => {
    return [WALLET.FAC, WALLET.POINT].includes(walletType)
  }, [walletType])

  const buttonText = useMemo(() => {
    if (walletType === WALLET.POINT) {
      return t('transfer');
    }
    if (walletType === WALLET.BTC) {
      return t('receive');
    }
    return isExchangeWallet ? t('exchange_2'): t('deposit');
  }, [walletType, t, isExchangeWallet])

  const title = {
    [WALLET.USDT]: t('usdt_wallet'),
    [WALLET.FAC]: t('fac_wallet'),
    [WALLET.BTC]: t('btc_wallet'),
    [WALLET.POINT]: t('point_wallet'),
  }[walletType];

  const balance = {
    [WALLET.USDT]: usdtBalance,
    [WALLET.FAC]: facBalance,
    [WALLET.BTC]: btcBalance,
    [WALLET.POINT]: pointBalance,
  }[walletType];

  const icon = {
    [WALLET.USDT]: <IconUSDT />,
    [WALLET.FAC]: <IconFAC />,
    [WALLET.BTC]: <IconBTC />,
    [WALLET.POINT]: <IconFAC />,
  }[walletType];

  function openWithdrawModal(walletType) {
    const transparent = true;
    const headerNode = true;
    const headerClassBg = 'bg-img-earth'
    const title = {
      [WALLET.USDT]: t('withdraw_form'),
      [WALLET.BTC]: t('withdraw_btc'),
    }[walletType];

    const content = {
      [WALLET.USDT]: <WithdrawForm />, 
      [WALLET.BTC]: <WithdrawBtc />,
    }[walletType];

    modal.show({
      title,
      content,
      transparent,
      headerNode,
      headerClassBg
    })
  }

  function openDepositModal(walletType) {
    const transparent = true;
    const headerNode = true;
    const headerClassBg = 'bg-img-earth'
    const title = {
      [WALLET.USDT]: t('deposit_form'),
      [WALLET.FAC]: t('exchange_fac'),
      [WALLET.BTC]: t('receive_btc'),
      [WALLET.POINT]: t('exchange_point'),
    }[walletType];

    const content = {
      [WALLET.USDT]: <DepositUsdtForm />,
      [WALLET.FAC]: <ExchangeFac history={history} />,
      [WALLET.BTC]: <ReceiveBtc history={history} />,
      [WALLET.POINT]: <ExchangePoint history={history} />,
    }[walletType];

    modal.show({
      title,
      content,
      transparent,
      customClass: 'modal-receive-btc',
      headerNode,
      headerClassBg
    })
  }

  return (
    <ModalWrapper>
      {walletType === WALLET.FAC && (
        <p className="text-dark px-4 fs-7">
          <span dangerouslySetInnerHTML={{__html: t('exchange_fac_usdt_note')}} />
        </p>
      )}
      <div className="center-horizontal mt-3">
        <button
          className={classNames('btn btn-primary py-2 px-5', { 'mt-3': isExchangeWallet })}
          onClick={() => openDepositModal(walletType)}>
          {buttonText}
        </button>
        {!isExchangeWallet && (<button
          className="btn btn-primary py-2 px-5 ms-4 bg-black"
          onClick={() => openWithdrawModal(walletType)}>
            {t('withdraw')}
        </button>)}
      </div>
      <div className="d-flex justify-content-between align-items-center px-4 py-3 mt-5 bg-gray">
        {icon}
        <p className="fw-500 ms-2 me-auto">{title}</p>
        <p className="h3 fw-500">{walletType === WALLET.BTC ? formatToNInputPrice(balance, 6) : formatToNInputPrice(balance)}</p>
      </div>
  </ModalWrapper>
  );
}
