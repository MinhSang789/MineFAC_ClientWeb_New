import React, { useCallback, useEffect, useState } from 'react';
import _ from "lodash"
import { formatToUSDTPrice } from "../../helper/common"
import Loader from '../../components/Loader'
import {notification, Table, DatePicker } from 'antd';
import moment from 'moment';
import TransactionRender from 'components/Loader/transactionRender';
import PaymentWithdrawTransaction from '../../services/paymentWithdrawTransaction';
import { useIntl } from 'react-intl';
const DEFAULT_FILTER = {
  "skip": 0,
  "limit": 20,
  "order": {
    "key": "createdAt",
    "value": "desc"
  }
}

function WithDrawalHistory() {
  const [isVisible, setIsVisible] = useState(false)
  const [ filter, setFilter ] = useState(DEFAULT_FILTER)
  const [ dataList, setDataList] = useState({data: [], total: 0})
  const [ startDate, setStartDate] = useState()
  const [ endDate, setEndDate] = useState()

  const intl = useIntl();
  const t = useCallback((id) => intl.formatMessage({ id }), [intl])

  function withDrawalHistory(filter){
    setIsVisible(true)
		PaymentWithdrawTransaction.PaymentWithdrawHistory(filter).then((result) => {
      const { isSuccess, message, data } = result
			setIsVisible(false)
			if(!isSuccess || !data) {
				notification['error']({
					message: '',
					description: message || t('something_wrong')
				})
				return
			}else{
         setDataList(data)
			}
		})
  }

  useEffect(()=>{
    withDrawalHistory(filter)
  },[])

  

  const columns = [
    {
      title: t('withdraw_date'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render:(text,row, index)=>{
        const { createdAt } = row
        return <div className="d-flex align-items-center">
        <span className="management__box__coin recharge_history__normal_text">{moment(createdAt).format("YYYY-MM-DD HH:mm:ss")}</span>
        </div>
      }
    },
    {
      title: t('withdraw_money_amount'),
      dataIndex: 'paymentAmount',
      key: 'paymentAmount',
      render:(text,row, index)=>{
        const { paymentAmount } = row
        return <div className="d-flex align-items-center">
         <span className="management__box__coin recharge_history__normal_text">{formatToUSDTPrice(paymentAmount)}</span>
        </div>
      }
    },
    {
      title: t('status'),
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      render:(text,row, index)=>{
        const { paymentStatus } = row
        return <div className="d-flex align-items-center">
          <span className="management__box__coin recharge_history__normal_text">{TransactionRender({paymentStatus, intl})}</span>
        </div>
      }
    },
    {
      title: t('note'),
      dataIndex: 'paymentNote',
      key: 'paymentNote',
      render:(text,row, index)=>{
        const { paymentNote } = row
        return <div className="d-flex align-items-center">
          <span className="management__box__coin recharge_history__normal_text">{paymentNote}</span>
        </div>
      }
    }
  ];

  function onChangeStartDate(date) {
    const newFilter={
      ...filter,
      startDate: date ? moment(date).startOf('days').toDate() : ""
    }
    setStartDate(date)
    if(!date) {
      delete newFilter.startDate
    }
    setFilter(newFilter)
    withDrawalHistory(newFilter)
  }

  function onChangeEndDate(date) {
    const newFilter={
      ...filter,
      endDate: date ? moment(date).endOf('days').toDate() : ""
    }
    setEndDate(date)
    if(!date) {
      delete newFilter.endDate
    }
    setFilter(newFilter)
    withDrawalHistory(newFilter)
  }

  function disabledDate(current) {
    return current && current < moment(startDate).endOf('day');
  }

  const onKeyDown = (e) => {
    e.preventDefault();
    return false
  }
  
  return (
    <section className="management recharge_history with_draw_history">
      <div className="management__box">
        <div className="recharge_history__header">
          <div className="management__box__detail">{t('withdraw_history')}</div>
          <div className="recharge_history__group_select_date">
            <DatePicker inputReadOnly={true} onKeyDown={e => onKeyDown(e)} value={startDate} placeholder={`${t('from')}: YY-MM-DD`} onChange={date => onChangeStartDate(date)} />
            <DatePicker inputReadOnly={true} onKeyDown={e => onKeyDown(e)} value={endDate} disabledDate={disabledDate} placeholder={`${t('to')}: YY-MM-DD`} className="with_draw_history__select_date" onChange={date => onChangeEndDate(date)} />
          </div>
        </div>
        <Table 
          dataSource={dataList.data} 
          scroll={{ x: 768 }}
          columns={columns}
          pagination={{
            onChange: (page)=>{
              const skip = (page - 1) * filter.limit 
              const newFilter={
                ...filter,
                skip  
              }
              setFilter(newFilter)
              withDrawalHistory(newFilter)
            },
            total: dataList.total,
            pageSize: filter.limit,
            showSizeChanger: false
         }}
        />
      </div>
      {isVisible ? <Loader /> : null}
    </section>
  )
}
export default WithDrawalHistory;