import React, { useCallback, useEffect, useState } from 'react';
import "./index.scss"
import _ from "lodash"
import { formatToUSDTPrice } from "../../helper/common"
import Loader from '../../components/Loader'
import { notification, Table } from 'antd';
import Statistical from '../../services/statistical';
import { useIntl } from 'react-intl';

const DEFAULT_FILTER = {
 limit: 20,
 skip: 0
}

function Group() {
  const [isVisible, setIsVisible] = useState(false)
  const [ filter, setFilter ] = useState(DEFAULT_FILTER)
  const [ dataList, setDataList] = useState({data: [], total: 0})

  const intl = useIntl();
  const t = useCallback((id) => intl.formatMessage({ id }), [intl])
  
  function userSummaryReferUser(filter){
    setIsVisible(true)
		Statistical.userSummaryReferUser(filter).then((result) => {
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
    userSummaryReferUser(filter)
  },[])
  
  const columns = [
    {
      title: 'ID',
      dataIndex: 'ID',
      key: 'ID',
      render:(text,row, index)=>{
        const { appUserId, isFooter } = row
        if(isFooter){
          return <div className="d-flex align-items-center">
          <strong style={{color: "red", fontSize:"20px"}}>{appUserId}</strong>
          </div>
        }
        return <div className="d-flex align-items-center">
        <span className="management__box__coin recharge_history__normal_text">{appUserId}</span>
        </div>
      }
    },
    {
      title: 'Tài khoản',
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
      title: 'Tổng nạp',
      dataIndex: 'username',
      key: 'username',
      render:(text,row, index)=>{
        const { totalDeposit } = row
        return <div className="d-flex align-items-center">
        <div className="d-flex justify-content-center  ">
          <span>{formatToUSDTPrice(totalDeposit)}</span>
        </div>
       </div>
      }
    },
    {
      title: 'Tổng rút',
      dataIndex: 'totalWithdraw',
      key: 'totalWithdraw',
      render:(text,row, index)=>{
        const {totalWithdraw} = row
        return <div className="d-flex align-items-center">
         <div className="d-flex justify-content-center  ">
           <span>{formatToUSDTPrice(totalWithdraw)}</span>
         </div>
        </div>
      }
    },
    {
      title: 'Tổng mua',
      dataIndex: 'totalBuy',
      key: 'totalBuy',
      render:(text,row, index)=>{
        const {totalBuy} = row
        return <div className="d-flex align-items-center">
         <div className="d-flex justify-content-center">
           <span>{formatToUSDTPrice(totalBuy)}</span>
         </div>
        </div>
      }
    },
    {
      title: 'Tổng bán',
      dataIndex: 'totalSell',
      key: 'totalSell',
      render:(text,row, index)=>{
        const {totalSell} = row
        return <div className="d-flex align-items-center">
         <div className="d-flex justify-content-center  ">
           <span>{formatToUSDTPrice(totalSell)}</span>
         </div>
        </div>
      }
    },
      
  ];
  
  return (
    <section className="management recharge_history coint_sell">
      <div className="management__box">
        <div className="recharge_history__header">
         <div className="management__box__detail">Tổng số lượng người dùng: {dataList.total}</div>
        
        </div>
        <Table 
          dataSource={[...dataList.data, {
            appUserId: "Tổng",
            totalBuy: dataList.totalBuy || 0,
            totalDeposit: dataList.totalDeposit ||  0,
            totalSell: dataList.totalSell ||0,
            totalWithdraw: dataList.totalWithdraw || 0,
            username: "",
            isFooter: true
          } ]} 
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
              userSummaryReferUser(newFilter)
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
export default Group;