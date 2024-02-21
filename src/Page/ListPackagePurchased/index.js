import React, { useCallback, useEffect, useState } from 'react';
import _ from "lodash"
import { formatToUSDTPrice } from "../../helper/common"
import Loader from '../../components/Loader'
import { notification, Table, DatePicker, Progress} from 'antd';
import moment from 'moment';
import PaymentServicePackage from '../../services/paymentServicePackage';
import { IconCollectCoin, } from '../../assets/icons';
import { useIntl } from 'react-intl';

const DEFAULT_FILTER = {
  "filter": {},
  "skip": 0,
  "limit": 20,
  "order": {
    "key": "createdAt",
    "value": "desc"
  }
}

function ListPackagePurchased() {
  const [isVisible, setIsVisible] = useState(false)
  const [filter, setFilter] = useState(DEFAULT_FILTER)
  const [dataList, setDataList] = useState({ data: [], total: 0 })
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const intl = useIntl();
  const t = useCallback((id) => t.formatMessage({ id }, [intl]))

  function historyServicePackage(filter) {
    setIsVisible(true)
    PaymentServicePackage.historyServicePackage(filter).then((result) => {
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
    historyServicePackage(filter)
  }, [])

  const handleReceiveCoin = (id) => {
    setIsVisible(true)
    PaymentServicePackage.collectServicePackage({ paymentServicePackageUserId: id }).then((result) => {
      const { isSuccess, message, data } = result

      setIsVisible(false)
      if (!isSuccess || !data) {
        notification['error']({
          message: '',
          description: message || t('something_wrong')
        })
        return
      } else {
        historyServicePackage(filter)
      }
    })
  }

  const handleMiningCoin = (id) => {
    setIsVisible(true)
    PaymentServicePackage.activateServicePackage({ paymentServicePackageUserId: id }).then((result) => {
      const { isSuccess, message, data } = result

      setIsVisible(false)
      if (!isSuccess || !data) {
        notification['error']({
          message: '',
          description: message || t('something_wrong')
        })
        return
      } else {
        historyServicePackage(filter)
      }
    })
  }

  const columns = [
    {
      title: 'Ngày mua',
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
      title: 'Tên Gói',
      dataIndex: 'packageName',
      key: 'packageName',
      render: (text, row, index) => {
        const { packageName } = row
        return <div className="d-flex align-items-center">
          <span className="management__box__coin recharge_history__normal_text"> {packageName}  </span>
        </div>
      }
    },
    {
      title: 'Tên Coin',
      dataIndex: 'walletBalanceUnitDisplayName',
      key: 'walletBalanceUnitDisplayName',
      render: (text, row, index) => {
        const { walletBalanceUnitDisplayName } = row
        return <div className="d-flex align-items-center">
          <span className="management__box__coin recharge_history__normal_text">{walletBalanceUnitDisplayName}</span>
        </div>
      }
    },
    {
      title: 'Ngày hết hạn',
      dataIndex: 'packageExpireDate',
      key: 'packageExpireDate',
      render: (text, row, index) => {
        const { packageExpireDate } = row
        return <div className="d-flex align-items-center">
          <span className="management__box__coin recharge_history__normal_text">{moment(packageExpireDate).format("YYYY-MM-DD HH:mm:ss")}</span>
        </div>
      }
    },
    {
      title: t('performance'),
      dataIndex: 'packagePerformance',
      key: 'packagePerformance',
      render: (text, row, index) => {
        const { packagePerformance, walletBalanceUnitCode } = row
        return <div className="d-flex align-items-center">
          <span className="management__box__coin recharge_history__normal_text">{packagePerformance} {walletBalanceUnitCode}/ ngày</span>
        </div>
      }
    },
    {
      title: 'Lợi nhuận dự kiến',
      dataIndex: 'profitEstimate',
      key: 'profitEstimate',
      render: (text, row, index) => {
        const { memberLevelName, userSellPrice, agencySellPrice, packagePerformance } = row
        const price = memberLevelName === "Agency" ? agencySellPrice : userSellPrice
        return <div className="d-flex align-items-center">
          <span className="management__box__coin recharge_history__normal_text">{formatToUSDTPrice(price * packagePerformance)}</span>
        </div>
      }
    },
    {
      title: 'Thu nhập',
      dataIndex: 'profitActual',
      key: 'profitActual',
      render: (text, row, index) => {
        const { profitActual } = row
        return <div className="d-flex align-items-center">
          <span className="management__box__coin recharge_history__normal_text">{profitActual}</span>
        </div>
      }
    },
    {
      title: '',
      dataIndex: 'profitEstimate',
      key: 'profitEstimate',
      render: (text, row, index) => {
        const { packageActivityStatus, profitActual, paymentServicePackageUserId, processing } = row
        return <div className="d-flex align-items-center">
          {profitActual > 0 ? 
            <div className='package_purchase__enable_icon_collect' onClick={() => { handleReceiveCoin(paymentServicePackageUserId) }} style={{ cursor: "pointer", marginRight: 10 }}>
              <IconCollectCoin />
            </div>
            :
            <div className='package_purchase__disable_icon_collect'>
              <IconCollectCoin />
            </div>
          }
          {packageActivityStatus === 0 ?
            <div style={{ cursor: "not-allowed" }}>
              <div className='package_purchase__disable_icon_mining_green d-flex align-items-center'>
                <Progress type="circle" percent={100} width={25} />
              </div>
            </div>
            : 
            <div className='package_purchase__disable_icon_mining_green d-flex align-items-center'>
            <Progress type="circle" percent={processing} width={25} />
            </div>
          }

        </div>
      }
    }
  ];

  function onChangeStartDate(date) {
    const newFilter = {
      ...filter,
      startDate: date ? moment(date).startOf("days").add(7, 'hours').add(1, 'seconds').toDate() : ""
    }
    setStartDate(date)
    if (!date) {
      delete newFilter.startDate
    }
    setFilter(newFilter)
    historyServicePackage(newFilter)
  }

  function onChangeEndDate(date) {
    const newFilter = {
      ...filter,
      endDate: date ? moment(date).endOf("days").add(7, 'hours').toDate() : ""
    }
    setEndDate(date)
    if (!date) {
      delete newFilter.endDate
    }
    setFilter(newFilter)
    historyServicePackage(newFilter)
  }

  function disabledDate(current) {
    return current && current < moment(startDate).endOf('day');
  }

  const onKeyDown = (e) => {
    e.preventDefault();
    return false
  }

  return (
    <section className="management recharge_history package_purchase">
      <div className="management__box">
        <div className="recharge_history__header">
          <div className="management__box__detail">Danh sách gói đã mua</div>
          <div className="recharge_history__group_select_date">
            <DatePicker onKeyDown={e => onKeyDown(e)} value={startDate} placeholder={`${t('from')}: YY-MM-DD`} onChange={date => onChangeStartDate(date)} />
            <DatePicker onKeyDown={e => onKeyDown(e)} value={endDate} disabledDate={disabledDate} placeholder={`${t('to')}: YY-MM-DD`} className="recharge_history__select_date" onChange={date => onChangeEndDate(date)} />
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
              historyServicePackage(newFilter)
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
export default ListPackagePurchased;