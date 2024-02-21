import React, { useCallback, useEffect, useState } from 'react';
import _, { debounce } from "lodash"
import { formatToUSDTPrice } from "../../helper/common"
import Loader from '../../components/Loader'
import { Input, notification, Table } from 'antd';
import { IconIncrease, IconThunderGreen } from "./../../assets/icons/index"
import WalletBalanceUnitService from '../../services/walletBalanceUnit';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';

const DEFAULT_FILTER = {
  "filter": {},
  "skip": 0,
  "limit": 8,
  "order": {
    "key": "createdAt",
    "value": "desc"
  }
}
const Agency = "Agency"

function ListCoinPrice() {
  const history = useHistory()
  const [isVisible, setIsVisible] = useState(false)
  const [ filter, setFilter ] = useState(DEFAULT_FILTER)
  const [walletUserlist, setWalletUsetList] = useState({ data: [], total: 0 })
  const { memberLevelName } = useSelector((state) => state.member ? state.member : {})

  const intl = useIntl();
  const t = useCallback((id) => intl.formatMessage({ id }), [intl])

  function walletBalanceUnitList(filter) {
    setIsVisible(true)
    WalletBalanceUnitService.getList(filter).then((result) => {
      const { isSuccess, message, data } = result
      setIsVisible(false)
      if (!isSuccess || !data) {
        notification['error']({
          message: '',
          description: message || t('something_wrong')
        })
        return
      } else {
        setWalletUsetList(data)
      }
    })
  }

  useEffect(() => {
    walletBalanceUnitList(filter)
  }, [])



  const columns = [
    {
      title: 'Mã Coin',
      dataIndex: 'walletBalanceUnitCode',
      key: 'walletBalanceUnitCode',
      render: (text, row, index) => {
        const { walletBalanceUnitCode, walletBalanceUnitAvatar } = row
        return <div className="d-flex align-items-center">
          {walletBalanceUnitAvatar ? <img style={{ height: "40px", width: "40px" }} className="management__box__icon" src={walletBalanceUnitAvatar} alt="goi"></img> : null} <span className="management__box__coin">{walletBalanceUnitCode}</span>
        </div>
      }
    },
    {
      title: t('name'),
      dataIndex: 'walletBalanceUnitDisplayName',
      key: 'walletBalanceUnitDisplayName',
      render: (text, row, index) => {
        const { walletBalanceUnitDisplayName } = row
        return <div className="d-flex align-items-center">
          <span className="management__box__coin"> {walletBalanceUnitDisplayName}  </span>
        </div>
      }
    },
    {
      title: 'Giá bán',
      dataIndex: 'originalPrice',
      key: 'originalPrice',
      render: (text, row, index) => {
        const { agencySellPrice, userSellPrice } = row
        return <div className="d-flex align-items-center">
          <span className="management__box__coin">{formatToUSDTPrice(memberLevelName === Agency ? agencySellPrice : userSellPrice)}  </span> <IconIncrease />
        </div>
      }
    },
    {
      title: 'Tăng tốc',
      dataIndex: 'agencySellPrice',
      key: 'agencySellPrice',
      render: (text, row, index) => {
        const { walletBalanceUnitCode, walletBalanceUnitDisplayName } = row
        return <div className="d-flex align-items-center">
          <div
            style={{ cursor: "pointer" }}
            onClick={() => history.push({
              pathname: "/management/packet",
              state: { walletBalanceUnitCode: walletBalanceUnitCode, walletBalanceUnitDisplayName: walletBalanceUnitDisplayName }
            })}>
            <IconThunderGreen /> <span className="management__box__coin recharge_history__text_green">Đầu tư ngay</span>
          </div>
        </div>
      }
    }
  ];


  const debounceFn = useCallback(debounce(handleDebounceFn, 1000), []);

  function handleDebounceFn(inputValue) {
      const newFilter = {
        ...filter,
        searchText: inputValue.trim()
      }
      if(!newFilter.searchText) {
        delete newFilter.searchText
      }
      setFilter(newFilter)
      walletBalanceUnitList(newFilter)
  }
 
  const onSearch = (e) => {
    debounceFn(e.target.value);
  }

  return (
    <section className="management recharge_history">
      <div className="management__box">
        <div className="recharge_history__header">
          <div className="management__box__detail">Bảng giá Coin</div>
          <div className="recharge_history__group_select_date">
            <Input placeholder="Tìm kiếm..." onChange={value => onSearch(value)} />
          </div>
        </div>
        <Table
          dataSource={walletUserlist.data}
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
              walletBalanceUnitList(newFilter)
            },
            total: walletUserlist.total,
            pageSize: filter.limit,
            showSizeChanger: false
          }}
        />
      </div>
      {isVisible ? <Loader /> : null}
    </section>
  )
}
export default ListCoinPrice;