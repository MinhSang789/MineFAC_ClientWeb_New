import { ArrowDownOutlined, ExclamationCircleFilled, WalletFilled } from '@ant-design/icons';
import { Form, Input, InputNumber, Button } from 'antd';
import { routes } from 'App';
import { useModal } from 'context/ModalContext';
import { useWallet } from 'context/WalletContext';
import { formatToFACPrice, formatToNInputPrice } from 'helper/common';
import TransactionHistory from 'Page/TransactionHistory';
import React, { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import Badge from './Badge';
import ModalWrapper from './ModalWrapper';

export default function ExchangePoint({ history }) {
  const intl = useIntl();
  const modal = useModal();
  const {
    wallet: {
      pointBalance,
      exchangePoint
    }
  } = useWallet();
  const [loading, setLoading] = useState(false);
  const t = useCallback(id => intl.formatMessage({ id }), [intl]);
  const [form] = Form.useForm();
  function handleSubmit(values) {
    setLoading(true);
    exchangePoint(values, () => {
      form.resetFields();
      setLoading(false);
    })
  }
  function handleExchangeHistoryClick() {
    modal.show({
      title: t('history_modal'),
      content: <TransactionHistory  defaultActiveKey="5" />,
    })
  }
  function handleReceiveHistoryClick() {
    modal.show({
      title: t('history_modal'),
      content: <TransactionHistory  defaultActiveKey="6" />,
    })
  }
  function handleBadgeClick() {
    form.setFieldsValue({
      paymentAmount: pointBalance,
      paymentToAmount: pointBalance
    })
  }
  return (
    <ModalWrapper>
      <Form
        size="large"
        requiredMark={false}
        className="px-4"
        layout="vertical"
        form={form}
        onFinish={handleSubmit}>
        <div className="center-vertical">
          <p className="fw-500">{t('from')}</p>
          <p className='fw-500 text-center bg-gray rounded w-100 py-2 center ms-3'>
            <WalletFilled className='text-primary'/>
            <span className='ms-2'>{t('point_wallet')}</span>
          </p>
        </div>
        <div className='center-vertical my-2'>
          <p className="fw-500" style={{visibility: 'hidden'}}>{t('to')}</p>
          <div className='center w-100'>
            <div className='divider border-top-blue pe-2 w-50'></div>
            <button className='btn btn-outline-blue p-2 rounded-circle center'>
              <ArrowDownOutlined className='text-blue fs-6'/>
            </button>
            <div className='divider border-top-blue ps-2 w-50'></div>
          </div>
        </div>
        <div className="center-vertical">
          <p className="fw-500">{t('to')}</p>
          <p className='fw-500 text-center bg-gray rounded w-100 py-2 center ms-3'>
            <WalletFilled className='text-primary'/>
            <span className='ms-2'>{t('fac_wallet')}</span>
          </p>
        </div>
        <Form.Item
          name="paymentAmount"
          className="mt-4 mb-1"
          label={t('transfer_amount')}
          rules={[{
            required: true,
            message: t('transfer_amount_required')
          }, {
            type: 'number',
            min: 1,
            message: t('min_exchange_point')
          },
          {
            validator(_, value) {
              if (isNaN(value) || value === null) {
                return Promise.resolve();
              }
              if (parseFloat(value) > pointBalance) {
                return Promise.reject(new Error(t("outOfBalance")));
              }
              return Promise.resolve();
            },
          },
          ]}>
          <InputNumber
            addonBefore="Fi "
            addonAfter={<Badge onClick={handleBadgeClick}/>}
            placeholder="0"
            formatter={(value) => formatToFACPrice(value, false, false)}
            />
        </Form.Item>
        <span className="text-blue">{`${t('remaining_balance')} ${formatToNInputPrice(pointBalance)}`}</span>
        <Button 
        loading={loading}
        htmlType="submit" 
        className="btn btn-primary w-100 py-2 mt-4">{t('confirm')}</Button>
        <div className="center-horizontal">
          <button
            type="button"
            className="btn btn-link text-dark mt-2"
            onClick={handleExchangeHistoryClick}>
            {t('exchange_history_2')}
          </button>
        </div>
        <div className="center-horizontal">
          <button
            type="button"
            className="btn btn-link text-dark mt-2"
            onClick={handleReceiveHistoryClick}>
            {t('point_history')}
          </button>
        </div>
      </Form>
    </ModalWrapper>
  )
}