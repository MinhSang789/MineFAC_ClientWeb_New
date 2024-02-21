import React, { useEffect } from "react";
import { RightOutlined } from '@ant-design/icons';
import { useDispatch } from "react-redux";
import { handleUpdateDetail } from "actions";
import { useModal } from 'context/ModalContext';
import { useUser } from 'context/UserContext';
import { useWallet } from 'context/WalletContext';
import AppUsers from "services/apppUsers";
import { WALLET } from 'hooks/management.hook';
import { useIntl } from 'react-intl';
import { IconBTC } from '../../assets/icons';
import { Wallet } from '../../components/Wallet/Wallet';
import { formatToNInputPrice } from '../../helper/common';
import { IconFAC, IconHH, IconUSDT } from "./../../assets/icons/index";

function Management(props) {
  const { user } = useUser();
  const modal = useModal();
  const { history } = props;
  const dispatch = useDispatch();
  
  const { wallet: {
    usdtBalance,
    facBalance,
    btcBalance,
    pointBalance,
  }} = useWallet();

  const intl = useIntl();
  const t = (id) => intl.formatMessage({ id })


  function openWalletModal(walletType) {
    const transparent = true;
    const headerNode = true;
    const headerClassBg = 'bg-img-earth'
    const title = {
      [WALLET.USDT]: t('usdt_wallet'),
      [WALLET.FAC]: t('fac_wallet'),
      [WALLET.BTC]: t('btc_wallet'),
      [WALLET.POINT]: t('point_wallet'),
    }[walletType];
    const content = (
      <Wallet 
        walletType={walletType}
        history={history}
        />
    )
    modal.show({
      title,
      content,
      transparent,
      headerNode,
      headerClassBg
    })
  }

  const getDetailUserById = (appUserId) => {
    AppUsers.getDetailUserById({
      id: appUserId,
    }).then((result) => {
      const { isSuccess, data } = result;
      if (isSuccess) {
        dispatch(handleUpdateDetail(data));
      }
    });
  };

  useEffect(() => {
    getDetailUserById(user.appUserId);
  }, []);
  
  return (
    <section>
      <div
        className="d-flex justify-content-between align-items-center px-4 mt-3"
        role="button"
        onClick={() => openWalletModal(WALLET.USDT)}>
        <IconUSDT />
        <div className="d-flex flex-column ms-2 me-auto">
          <p className="center-vertical m-0">
            <span style={{marginRight: '8px'}}>{t('usdt_wallet')}</span>
          </p>
          <p className="h3">{formatToNInputPrice(usdtBalance)}</p>
        </div>
        <RightOutlined />
      </div>
      <div className="divider"></div>
      <div className="d-flex justify-content-between align-items-center px-4"
        role="button"
        onClick={() => openWalletModal(WALLET.FAC)}>
        <IconFAC />
        <div className="d-flex flex-column ms-2 me-auto">
          <p className="center-vertical m-0">
            <span style={{marginRight: '8px'}}>{t('fac_wallet')}</span>
          </p>
          <p className="h3">{formatToNInputPrice(facBalance)}</p>
        </div>
        <RightOutlined />
      </div>
      <div className="divider"></div>
      <div className="d-flex justify-content-between align-items-center px-4"
        role="button"
        onClick={() => openWalletModal(WALLET.BTC)}>
        <IconBTC />
        <div className="d-flex flex-column ms-2 me-auto">
          <p className="center-vertical m-0">
            <span style={{marginRight: '8px'}}>{t('btc_wallet')}</span>
            </p>
          <p className="h3">{formatToNInputPrice(btcBalance, 6)}</p>
        </div>
        <RightOutlined />
      </div>
      <div className="divider"></div>
      <div className="d-flex justify-content-between align-items-center px-4"
        role="button"
        onClick={() => openWalletModal(WALLET.POINT)}>
        <IconHH />
        <div className="d-flex flex-column ms-2 me-auto">
          <p className="d-flex align-items-center">
            <span style={{marginRight: '8px'}}>{t('point_wallet')}</span>
            </p>
          <p className="h3">{formatToNInputPrice(pointBalance)}</p>
        </div>
        <RightOutlined />
      </div>
      
    </section>
  )
}
export default Management;
