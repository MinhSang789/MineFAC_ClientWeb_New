import React, { useCallback, useEffect, useState } from 'react';
import _ from "lodash"
import { formatToUSDTPrice } from "../../helper/common"
import Loader from '../../components/Loader'
import { notification, Table, DatePicker } from 'antd';
import moment from 'moment';
import StatusRender from 'components/Loader/statusRender';
import PaymentExchangeTransaction from '../../services/paymentExchangeTransaction';
import { useIntl } from 'react-intl';
const DEFAULT_FILTER = {
  "skip": 0,
  "limit": 20,
  "order": {
    "key": "createdAt",
    "value": "desc"
  }
}

function PurchaseHistory() {
  const [isVisible, setIsVisible] = useState(false)
  const [ filter, setFilter ] = useState(DEFAULT_FILTER)
  const [ dataList, setDataList] = useState({data: [], total: 0})
  const [ startDate, setStartDate] = useState()
  const [ endDate, setEndDate] = useState()

  const intl = useIntl();
  const t = useCallback((id) => intl.formatMessage({ id }), [intl])

  function receiveHistory(filter){
    setIsVisible(true)
		PaymentExchangeTransaction.receiveHistory(filter).then((result) => {
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
    receiveHistory(filter)
  },[])

  
  const columns = [
    {
      title: t('time'),
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
      title: t('name'),
      dataIndex: 'username',
      key: 'username',
      render:(text,row, index)=>{
        const { username } = row
        return <div className="d-flex align-items-center">
         <span className="management__box__coin recharge_history__normal_text"> {username}  </span>
        </div>
      }
    },
    {
      title: t('transaction_type'),
      dataIndex: 'paymentUnit',
      key: 'paymentUnit',
      render:(text,row, index)=>{
        const {paymentUnit}=row
        return <div className="d-flex align-items-center">
         <div className="d-flex justify-content-center with_draw_history__type_transaction coint_sell__green">
           <span>{paymentUnit}</span>
         </div>
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
          <span className="management__box__coin recharge_history__normal_text">{StatusRender(paymentStatus)}</span>
        </div>
      }
    },
    {
      title: t('weight'),
      dataIndex: 'paymentAmount',
      key: 'paymentAmount',
      render:(text,row, index)=>{
        const { paymentAmount } = row
        return <div className="d-flex align-items-center">
          <span className="management__box__coin recharge_history__normal_text">{paymentAmount}</span>
        </div>
      }
    }
    ,
    {
      title: 'Tổng tiền giao dịch',
      dataIndex: 'receiveAmount',
      key: 'receiveAmount',
      render:(text,row, index)=>{
        const { receiveAmount } = row
        return <div className="d-flex align-items-center">
          <span className="management__box__coin recharge_history__normal_text">{formatToUSDTPrice(receiveAmount)}</span>
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
    receiveHistory(newFilter)
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
    receiveHistory(newFilter)
  }

  function disabledDate(current) {
    return current && current < moment(startDate).endOf('day');
  }

  const onKeyDown = (e) => {
    e.preventDefault();
    return false
  }
  
  return (
    <section className="management recharge_history coint_sell">
      <div className="management__box">
        <div className="recharge_history__header">
          <div className="management__box__detail">Lịch sử mua</div>
          <div className="recharge_history__group_select_date">
            <DatePicker  inputReadOnly={true} onKeyDown={e => onKeyDown(e)} value={startDate} placeholder={`${t('from')}: YY-MM-DD`} onChange={date => onChangeStartDate(date)} />
            <DatePicker  inputReadOnly={true} onKeyDown={e => onKeyDown(e)} value={endDate} disabledDate={disabledDate} placeholder={`${t('to')}: YY-MM-DD`} className="recharge_history__select_date" onChange={date => onChangeEndDate(date)} />
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
              receiveHistory(newFilter)
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
export default PurchaseHistory;