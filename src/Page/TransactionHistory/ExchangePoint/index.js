import React, { useCallback, useEffect, useState } from 'react';
import _ from "lodash"
import { formatToFACPrice } from "../../../helper/common"
import Loader from '../../../components/Loader'
import { notification, Table, DatePicker } from 'antd';
import moment from 'moment';
import PaymentExchangeTransaction from 'services/paymentExchangeTransaction';
import useDateFilter from 'hooks/useDateFilter';
import { useIntl } from 'react-intl';

function ExchangePoint() {
  const {
    startDate,
    endDate,
    onChangeEndDate,
    onChangeStartDate,
    filter,
    setFilter,
    onKeyDown,
    disabledDate,
  } = useDateFilter({ callback: rechargeHistory });
  const [isVisible, setIsVisible] = useState(false)
  const [dataList, setDataList] = useState({ data: [], total: 0 })

  // useIntl template
  const intl = useIntl();
  const t = useCallback((id) => intl.formatMessage({ id }), [intl])

  function rechargeHistory(filter) {
    setIsVisible(true);
    const dateFilter = filter.filter;
    const newFilter = _.omit(filter, 'filter');
    PaymentExchangeTransaction.userExchangePOINTHistory(Object.assign(newFilter, dateFilter)).then((result) => {
      const { isSuccess, message, data } = result
      setIsVisible(false)
      if (!isSuccess || !data) {
        notification['error']({
          message: '',
          description: message || t('something_wrong')
        })
        return
      } else {
        setDataList(data)
      }
    })
  }

  useEffect(() => {
    rechargeHistory(filter)
  }, [])



  const columns = [
    {
      title: t('time'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text, row, index) => {
        const { createdAt } = row
        return <div className="d-flex align-items-center">
          <span className="management__box__coin recharge_history__normal_text">{moment(createdAt).format("YYYY-MM-DD HH:mm:ss")}</span>
        </div>
      }
    },
    {
      title: t('point_wallet'),
      dataIndex: 'sendWalletBalanceBefore',
      key: 'sendWalletBalanceBefore',
      render: (text, row, index) => {
        const { sendWalletBalanceBefore, sendWalletBalanceAfter } = row
        return <div className="d-flex align-items-center">
          <span className="management__box__coin recharge_history__normal_text">
            {formatToFACPrice(Math.abs(sendWalletBalanceBefore - sendWalletBalanceAfter), false)}
          </span>
        </div>
      }
    },
    {
      title: t('wallet_FAC'),
      dataIndex: 'receiveWalletBalanceBefore',
      key: 'receiveWalletBalanceBefore',
      render: (text, row, index) => {
        const { receiveWalletBalanceBefore, receiveWalletBalanceAfter } = row
        return <div className="d-flex align-items-center">
          <span className="management__box__coin recharge_history__normal_text">
            {formatToFACPrice(Math.abs(receiveWalletBalanceBefore - receiveWalletBalanceAfter), false)}
          </span>
        </div>
      }
    },
    {
      title: t('note'),
      dataIndex: 'paymentNote',
      key: 'paymentNote',
      render: (text, row, index) => {
        const { paymentNote } = row
        return <div className="d-flex align-items-center">
          <span className="management__box__coin recharge_history__normal_text">{paymentNote}</span>
        </div>
      }
    }
  ];

  return (
    <section className="management recharge_history">
      <div className="management__box">
        <div className="recharge_history__header">
          <div className="management__box__detail">{t('exchange_fac_point_history')}</div>
          <div className="recharge_history__group_select_date">
            <DatePicker inputReadOnly={true} onKeyDown={e => onKeyDown(e)} value={startDate} placeholder={`${t('from')}: YY-MM-DD`} onChange={date => onChangeStartDate(date)} />
            <DatePicker inputReadOnly={true} onKeyDown={e => onKeyDown(e)} value={endDate} disabledDate={disabledDate} placeholder={`${t('to')}: YY-MM-DD`} className="recharge_history__select_date" onChange={date => onChangeEndDate(date)} />
          </div>
        </div>
        <Table
          dataSource={dataList.data}
          scroll={{ x: 768 }}
          columns={columns}
          pagination={{
            onChange: (page) => {
              const skip = (page - 1) * filter.limit
              const newFilter = {
                ...filter,
                skip
              }
              setFilter(newFilter)
              rechargeHistory(newFilter)
            },
            total: dataList.total,
            pageSize: filter.limit,
            showSizeChanger: false,
            position: ['bottomLeft']
          }}
        />
      </div>
      {isVisible ? <Loader /> : null}
    </section>
  )
}
export default ExchangePoint;