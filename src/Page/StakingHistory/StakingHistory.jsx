import { DatePicker, notification, Table } from 'antd';
import Loader from 'components/Loader';
import useDateFilter from 'hooks/useDateFilter';
import React, { useCallback, useEffect, useState } from 'react'
import { useIntl } from 'react-intl';
import { StakingPackageService } from 'services/stakingPackage';
import moment from 'moment';
import { formatToNInputPrice } from 'helper/common';
import { STAKING_ACTIVITY_STATUS_STRING } from 'constants/config';

const StakingHistory = () => {
  const {
    startDate,
    endDate,
    onChangeEndDate,
    onChangeStartDate,
    filter,
    setFilter,
    onKeyDown,
    disabledDate,
  } = useDateFilter({ callback: stakingHistory });
  const [isVisible, setIsVisible] = useState(false)
  const [dataList, setDataList] = useState({ data: [], total: 0 })

  const intl = useIntl();
  const t = useCallback((id) => intl.formatMessage({ id }), [intl])

  async function stakingHistory(filter) {
    setIsVisible(true);
    const { isSuccess, data, message } = await StakingPackageService.getHistoryStaking(filter);
    if (!isSuccess || !data) {
      notification['error']({
        message: '',
        description: message || t('something_wrong')
      })
      return
    } else {
      setDataList(data)
    }
    setIsVisible(true);
  }

  useEffect(() => {
    stakingHistory();
  }, [])

  const columns = [
    {
      title: t('staking_start'),
      dataIndex: 'stakingStartDate',
      key: 'stakingStartDate',
      render: (text, row, index) => {
        const { stakingStartDate } = row
        return <div className="d-flex align-items-center">
          <span className="management__box__coin recharge_history__normal_text">{moment(stakingStartDate).format("YYYY-MM-DD HH:mm:ss")}</span>
        </div>
      }
    },
    {
      title: t('staking_lock_time'),
      dataIndex: 'stakingPeriod',
      key: 'stakingPeriod',
      render: (text, row, index) => {
        const { stakingPeriod } = row
        return <div className="d-flex align-items-center">
          <span className="management__box__coin recharge_history__normal_text">{`${stakingPeriod} ${t('day')}`}</span>
        </div>
      }
    },
    {
      title: t('staking_lock_money'),
      dataIndex: 'stackingAmount',
      key: 'stackingAmount',
      render: (text, row, index) => {
        const { stackingAmount } = row
        return <div className="d-flex align-items-center">
          <span className="management__box__coin recharge_history__normal_text">{formatToNInputPrice(stackingAmount)}</span>
        </div>
      }
    },
    {
      title: t('staking_profit_estimate'),
      dataIndex: 'stakingInterestRate',
      key: 'stakingInterestRate',
      render: (text, row, index) => {
        const { stakingInterestRate, stakingPeriod } = row;
        return (
          <>
            <div className="d-flex align-items-center">
              <span className="management__box__coin recharge_history__normal_text">{`${stakingInterestRate}%/ ${stakingPeriod} ${intl.formatMessage({ id: 'day' })}`}</span>
            </div>
          </>
        )
      }
    },
    {
      title: t('machine_status'),
      dataIndex: 'stakingActivityStatus',
      key: 'stakingActivityStatus',
      render: (text, row, index) => {
        const { stakingActivityStatus } = row;

        return (
          <div className="d-flex align-items-center">
            <span className="management__box__coin recharge_history__normal_text">
              <div style={{ background: "#02BB6B" }} className="status__dot_status"></div>
              {t(STAKING_ACTIVITY_STATUS_STRING[stakingActivityStatus])}
            </span>
          </div>
        )
      }
    },
    {
      title: t('staking_end'),
      dataIndex: 'stakingEndDate',
      key: 'stakingEndDate',
      render: (text, row, index) => {
        const { stakingEndDate } = row;

        return (
          <div className="d-flex align-items-center">
            <span className="management__box__coin recharge_history__normal_text">{moment(stakingEndDate).format("YYYY-MM-DD HH:mm:ss")}</span>
          </div>
        )
      }
    },
    {
      title: t('staking_profit_timeout'),
      dataIndex: 'profitEstimate',
      key: 'profitEstimate',
      render: (text, row, index) => {
        const { profitEstimate, stackingAmount } = row;

        return (
          <div className="d-flex align-items-center">
            <span className="management__box__coin recharge_history__normal_text">{formatToNInputPrice(stackingAmount + profitEstimate)}</span>
          </div>
        )
      }
    },
  ]

  return (
    <section className="management recharge_history pt-4">
      <div className="management__box">
        <div className="recharge_history__header">
          <div className="management__box__detail">{t('staking_history_table')}</div>
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
              stakingHistory(newFilter)
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

export default StakingHistory