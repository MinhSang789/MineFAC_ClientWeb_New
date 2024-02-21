import { handleUpdateDetail } from 'actions/userAction';
import { Form } from 'antd';
import { routes } from 'App';
import _ from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from 'reselect';
import AppUsersAppUsers from 'services/apppUsers';
import PaymentExchangeTransaction from "services/paymentExchangeTransaction";
import PaymentMethod from "services/paymentMethod";
import swal from 'sweetalert';
import PaymentWithdrawTransaction from '../services/paymentWithdrawTransaction';

export const ACTION = Object.freeze({
  requestDeposit: 1,
  requestWithdrawUSDT: 2,
  ExchangeFAC: 3,
  ExchangePOINT: 4,
  requestWithdrawBTC: 5,
  requestReceiveBTC: 6,
});

export const WALLET = Object.freeze({
  USDT: 'USDTWallet',
  BTC: 'BTCWallet',
  FAC: 'FACWallet',
  POINT: 'PointWallet',
  VND: 'VNDWallet'
})

export const isUSDTWallet = (wallet) => wallet.walletType === WALLET.USDT;
export const isBTCWallet = (wallet) => wallet.walletType === WALLET.BTC;
export const isFACWallet = (wallet) => wallet.walletType === WALLET.FAC;
export const isPointWallet = (wallet) => wallet.walletType === WALLET.POINT;
export const isLeftAction = (action) => [ACTION.requestDeposit, ACTION.ExchangeFAC, ACTION.ExchangePOINT, ACTION.requestWithdrawBTC].includes(action);
export const isRightAction = (action) => [ACTION.requestWithdrawUSDT, ACTION.requestReceiveBTC].includes(action);
export const isRequestReceiveBTC = (action) => [ACTION.requestReceiveBTC].includes(action);
export const isRequestWithdrawBtc = (action) => [ACTION.isRequestWithdrawBTC].includes(action);
export const isRequestBTC = (action) => [ACTION.requestWithdrawBTC, ACTION.requestReceiveBTC].includes(action);
export const isRequestDeposit = (action) => [ACTION.requestDeposit].includes(action);
export const isRequestWithdrawUsdt = (action) => [ACTION.requestWithdrawUSDT].includes(action);
export const isRequestUsdt = (action) => [ACTION.requestDeposit, ACTION.requestWithdrawUSDT].includes(action);
export const isExchangeAction = (action) => [ACTION.ExchangeFAC, ACTION.ExchangePOINT].includes(action);
export const isExchangeFAC = (action) => [ACTION.ExchangeFAC].includes(action);

export const useManagement = () => {
  const [activeWallet, setActiveWallet] = useState({});
  const dispatch = useDispatch();
  const [action, setAction] = useState(ACTION.requestDeposit);
  const [paymentMethods, stePaymentMethods] = useState([]);
  const intl = useIntl();
  const t = useCallback((id) => intl.formatMessage({ id }), [intl]);
  const selectWallets = state => state.member?.wallets;
  const walletSelector = useMemo(() => {
    return createSelector(selectWallets, wallets => wallets.map(wallet => {
      const w = _.pick(wallet, ['walletId', 'walletType', 'balance']);
      const CMS = {
        [WALLET.USDT]: {
          title: t('usdt_wallet_detail'),
          navigate: {
            left: t('deposit_usdt'),
            right: t('withdraw_usdt'),
          },
          input: {
            label: t('deposit_amount_2'),
            required: t('deposit_amount_required_2'),
            placeholder: t('deposit_amount_placeholder_2'),
          },
          code: "USDT",
          sendBtnText: t('confirm'),
          receiveBtnText: t('confirm'),
          viewDepositHistory: t('view_deposit_usdt_history'),
          viewWithdrawHistory: t('view_withdraw_usdt_history'),
          viewDeposit: routes.managementDepositHistory.path,
          viewWithdraw: routes.managementWithdrawHistoryUSDT.path,
        },
        [WALLET.BTC]: {
          title: t('btc_wallet_detail'),
          navigate: {
            left: t('withdraw_btc'),
            right: t('receive_btc'),
          },
          code: "BTC",
          input: {
            label: t('withdraw_amount'),
            required: t('withdraw_amount_required'),
            placeholder: t('withdraw_amount_placeholder'),
          },
          sendBtnText: t('confirm'),
          receiveNote: t('receive_note'),
          receiveBtnText: t('increase_performance_btc'),
          viewDepositHistory: t('view_withdraw_btc'),
          viewWithdrawHistory: t('view_receive_btc'),
          viewWithdraw: routes.managementViewHistoryBTC.path,
          viewDeposit: routes.managementWithdrawHistoryBTC.path,
        },
        [WALLET.FAC]: {
          title: t('fac_wallet_detail'),
          description: t('fac_detail'),
          navigate: {
            left: t('exchange'),
          },
          input: {
            label: t('fac_exchange_amount'),
            required: t('exchange_amount_required'),
            placeholder: t('exchange_amount_placeholder'),
          },
          code: "Fi",
          sendBtnText: t('exchange_2'),
          exchangeNote: t('fac_note'),
          viewDepositHistory: t('view_exchange_history'),
          viewWithdrawHistory: t('view_receive_fac'),
          viewDeposit: routes.managementUserExchangeFACHistory.path,
          viewWithdraw: routes.managementViewHistoryFAC.path,
        },
        [WALLET.POINT]: {
          title: t('point_wallet_detail'),
          description: t('point_detail'),
          navigate: {
            left: t('exchange_to_fac'),
          },
          input: {
            label: t('exchange_amount'),
            required: t('exchange_amount_required'),
            placeholder: t('exchange_amount_placeholder'),
          },
          code: "Fi",
          sendBtnText: t('exchange_2'),
          exchangeNote: t('fac_not_3'),
          viewDepositHistory: t('view_exchange_history'),
          viewWithdrawHistory: t('view_receive_point'),
          viewWithdraw: routes.managementUserReceivePOINTHistory.path,
          viewDeposit: routes.managementUserExchangePOINTHistory.path,
        },
      }
      return Object.assign(w, CMS[w.walletType]);
    }))
  }, [t]);
  const wallets = useSelector(walletSelector);
  const appUserId = useSelector(state => state.member?.appUserId);
  const { diachiviUSDT, diachiviBTC } = useSelector(state => state.member)
  const [form] = Form.useForm();

  const getDetailUserById = (appUserId) => {
    AppUsersAppUsers.getDetailUserById({
      id: appUserId
    }).then(result=>{
      const { isSuccess, data } = result
      if(isSuccess){
        dispatch(handleUpdateDetail(data))
      }
    })
  };

  useEffect(() => {
    if (wallets?.length) {
      const usdtWallet = _.find(wallets, {walletType: WALLET.USDT});
      setActiveWallet(usdtWallet);
    }
  }, [wallets]);
  useEffect(() => {
    PaymentMethod.getList().then(result => {
      if (result.isSuccess) {
        stePaymentMethods(result.data);
      }
    })
  }, [])
  const setActiveWalletByType = (walletType) => {
    switch (walletType) {
      case WALLET.USDT:
        setAction(ACTION.requestDeposit);
        break;
      case WALLET.FAC:
        setAction(ACTION.ExchangeFAC);
        break;
      case WALLET.BTC:
        setAction(ACTION.requestWithdrawBTC);
        break;
      case WALLET.POINT:
        setAction(ACTION.ExchangePOINT);
        break;
      default:
          break;
      
    }
    const w = _.find(wallets, {walletType});
    setActiveWallet(w);
    form.resetFields();
  }
  /**
   * Set action based on direction and active wallet type
   * 
   * @param {*} direction true if left/false otherwise
   */
  const setActionByDirection = direction => {
    switch (activeWallet.walletType) {
      case WALLET.USDT:
        setAction(direction ? ACTION.requestDeposit : ACTION.requestWithdrawUSDT);
        break;
      case WALLET.FAC:
        setAction(ACTION.ExchangeFAC);
        break;
      case WALLET.BTC:
        setAction(direction ? ACTION.requestWithdrawBTC : ACTION.requestReceiveBTC);
        break;
      case WALLET.POINT:
        setAction(ACTION.ExchangePOINT);
        break;
      default:
          break;
      
    }
  }

  const handleExchangeFromChange = (e) => {
    form.setFieldsValue({paymentToAmount: e.target.value});
  }

  const handleExchangeToChange = (e) => {
    form.setFieldsValue({paymentAmount: e.target.value});
  }

  return {
    activeWallet,
    setActiveWalletByType,
    setActionByDirection,
    handleExchangeFromChange,
    handleExchangeToChange,
    paymentMethods,
    action,
    form,
    diachiviBTC,
    diachiviUSDT
  }
}