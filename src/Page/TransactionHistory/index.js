import React, { useCallback } from 'react';
import { Tabs } from 'antd';
import RechargeHistory from './DepositUSDT';
import ExchangeFAC from './ExchangeFAC';
import ExchangePoint from './ExchangePoint';
import ReceiveBTC from './ReceiveBTC';
import ReceiveFAC from './ReceiveFAC';
import ReceivePoint from './ReceivePoint';
import WithdrawBTC from './WithdrawBTC';
import WithDrawalHistory from './WithdrawUSDT';
import { useIntl } from 'react-intl';

export default function TransactionHistory({ defaultActiveKey = "1"}) {
  const intl = useIntl();
  const t = useCallback((id) => intl.formatMessage({ id }), [intl]);
  const onChangeTab = () => {

  }
  return (
    <section className="management packet">
      <div className="management__box">
        {/* <div className="packet__header">
          <div className="packet__header__title">
            {t('transaction_history')}
          </div>
        </div> */}
        {/* <div className="packet__divider"></div> */}
        <Tabs defaultActiveKey={defaultActiveKey} onChange={onChangeTab}>
          <Tabs.TabPane tab={t('deposit_usdt')} key="1">
            <RechargeHistory />
          </Tabs.TabPane>
          <Tabs.TabPane tab={t('withdraw_usdt')} key="2">
            <WithDrawalHistory />
          </Tabs.TabPane>
          <Tabs.TabPane tab={t('exchange_fac')} key="4">
            <ExchangeFAC />
          </Tabs.TabPane>
          <Tabs.TabPane tab={t('exchange_point_transaction')} key="5">
            <ExchangePoint />
          </Tabs.TabPane>
          <Tabs.TabPane tab={t('receive_point')} key="6">
            <ReceivePoint />
          </Tabs.TabPane>
          <Tabs.TabPane tab={t('receive_btc')} key="7">
            <ReceiveBTC />
          </Tabs.TabPane>
          <Tabs.TabPane tab={t('withdraw_btc')} key="8">
            <WithdrawBTC />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </section>
  )
}