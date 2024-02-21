import React, { useCallback, useEffect, useMemo, useState } from "react";
import _ from "lodash";
import { formatToVNDPrice, formatToUSDTPrice } from "../../../helper/common";
import Loader from "../../../components/Loader";
import { notification, Table, DatePicker } from "antd";
import moment from "moment";
import StatusRender from "components/Loader/packageActivityStatusRender";
import PaymentServicePackage from "services/paymentServicePackage";
import useDateFilter from "hooks/useDateFilter";
import { useIntl, FormattedMessage } from "react-intl";

function RechargeHistory({
  fetchData = PaymentServicePackage.historyServicePackage,
  title,
  columns = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  timeIsExpired = false
}) {
  let {
    startDate,
    endDate,
    onChangeEndDate,
    onChangeStartDate,
    filter,
    setFilter,
    onKeyDown,
    disabledDate,
  } = useDateFilter({ callback: rechargeHistory });
  const intl = useIntl();
  const t = useCallback((id) => intl.formatMessage({ id }), [intl])
  const [isVisible, setIsVisible] = useState(false);
  const [dataList, setDataList] = useState({ data: [], total: 0 });

  function rechargeHistory(filter) {
    setIsVisible(true);
    fetchData(filter).then((result) => {
      if (timeIsExpired) {
        filter = {
          ...filter,
          order: {
            ...filter.order,
            key: 'packageExpireDate'
          }
        }
      }
      const { isSuccess, message, data } = result;
      setIsVisible(false);
      if (!isSuccess || !data) {
        notification["error"]({
          message: "",
          description: message || t('something_wrong'),
        });
        return;
      } else {
        setDataList(data);
      }
    });
  }

  useEffect(() => {
    rechargeHistory(filter);
  }, []);

  const configs = [
    {
      title: t('time'),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text, row, index) => {
        const { createdAt, packageExpireDate } = row;
        return (
          <div className="d-flex align-items-center">
            <span className="management__box__coin recharge_history__normal_text">
              {moment(timeIsExpired ? packageExpireDate : createdAt).format("YYYY-MM-DD HH:mm:ss")}
            </span>
          </div>
        );
      },
    },
    {
      title: t('machine_code'),
      dataIndex: "packageName",
      key: "packageName",
      render: (text, row, index) => {
        const { packageName } = row;
        return (
          <div className="d-flex align-items-center">
            <span className="management__box__coin recharge_history__normal_text">
              {" "}
              {packageName}{" "}
            </span>
          </div>
        );
      },
    },
    {
      title: t('type'),
      dataIndex: "paymentDepositTransactionId",
      key: "paymentDepositTransactionId",
      render: (text, row, index) => {
        const { paymentDepositTransactionId, packageType } = row;
        return (
          <div className="d-flex align-items-center">
            <span className="management__box__coin recharge_history__normal_text">
              {" "}
              {paymentDepositTransactionId ?? packageType}{" "}
            </span>
          </div>
        );
      },
    },
    {
      title: t('price'),
      dataIndex: "packagePrice",
      key: "packagePrice",
      render: (text, row, index) => {
        const { packagePrice } = row;
        return (
          <div className="d-flex align-items-center">
            <span className="management__box__coin recharge_history__normal_text">
              {formatToUSDTPrice(packagePrice)}
            </span>
          </div>
        );
      },
    },
    {
      title: t('speed'),
      dataIndex: "packagePerformance",
      key: "packagePerformance",
      render: (text, row, index) => {
        const { packagePerformance, betRecordWin } = row;
        return (
          <div className="d-flex align-items-center">
            <span className="management__box__coin recharge_history__normal_text">
              {`${packagePerformance ?? betRecordWin}`}
            </span>
          </div>
        );
      },
    },
    {
      title: t('sender'),
      dataIndex: "paymentNote",
      key: "paymentNote",
      render: (text, row, index) => {
        const { paymentNote } = row;
        return (
          <div className="d-flex align-items-center">
            <span className="management__box__coin recharge_history__normal_text">
              <FormattedMessage id={paymentNote} defaultMessage={paymentNote} />
            </span>
          </div>
        );
      },
    },
    {
      title: t('machine_status'),
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (text, row, index) => {
        const { packageActivityStatus } = row;
        return (
          <div className="d-flex align-items-center">
            <span className="management__box__coin recharge_history__normal_text">
              {StatusRender({
                status: packageActivityStatus,
                enableTextColor: true,
              })}
            </span>
          </div>
        );
      },
    },
    {
      title: t('machine_expired_date'),
      dataIndex: "packageExpireDate",
      key: "packageExpireDate",
      render: (text, row, index) => {
        const { packageExpireDate } = row;
        return (
          <div className="d-flex align-items-center">
            <span className="management__box__coin recharge_history__normal_text">
              {moment(packageExpireDate).format("YYYY-MM-DD HH:mm:ss")}
            </span>
          </div>
        );
      },
    },
    {
      title: t('note'),
      dataIndex: "paymentNote",
      key: "paymentNote",
      render: (text, row, index) => {
        const { paymentNote } = row;
        return (
          <div className="d-flex align-items-center">
            <span className="management__box__coin recharge_history__normal_text">
              {paymentNote}
            </span>
          </div>
        );
      },
    },
    {
      title: t('type'),
      dataIndex: "packageType",
      key: "packageType",
      render: (text, row, index) => {
        const { packageType } = row;
        return (
          <div className="d-flex align-items-center">
            <span className="management__box__coin recharge_history__normal_text">
              {packageType}
            </span>
          </div>
        );
      },
    },
    {
      title: t('fac_per_day'),
      dataIndex: "packagePerformance",
      key: "packagePerformance",
      render: (text, row, index) => {
        const { betRecordWin } = row;
        return (
          <div className="d-flex align-items-center">
            <span className="management__box__coin recharge_history__normal_text">
              {`${betRecordWin}`}
            </span>
          </div>
        );
      },
    },
    {
      title: t('note'),
      dataIndex: "packageNote",
      key: "packageNote",
      render: (text, row, index) => {
        const { packageNote } = row;
        return (
          <div className="d-flex align-items-center">
            <span className="management__box__coin recharge_history__normal_text">
              {packageNote ? <FormattedMessage id={packageNote} defaultMessage={packageNote} /> : ''}
            </span>
          </div>
        );
      },
    },
  ];

  const cols = useMemo(() => {
    return columns.map((column) => configs[column]);
  }, [configs, columns]);

  return (
    <section className="management recharge_history">
      <div className="management__box">
        <div className="recharge_history__header">
          <div className="management__box__detail">{title}</div>
          <div className="recharge_history__group_select_date">
            <DatePicker
              inputReadOnly={true}
              onKeyDown={(e) => onKeyDown(e)}
              value={startDate}
              placeholder={`${t('from')}: YY-MM-DD`}
              format="YYYY-MM-DD"
              onChange={(date) => onChangeStartDate(date)}
            />
            <DatePicker
              inputReadOnly={true}
              onKeyDown={(e) => onKeyDown(e)}
              value={endDate}
              disabledDate={disabledDate}
              placeholder={`${t('to')}: YY-MM-DD`}
              format="YYYY-MM-DD"
              className="recharge_history__select_date"
              onChange={(date) => onChangeEndDate(date)}
            />
          </div>
        </div>
        <Table
          dataSource={dataList.data}
          scroll={{ x: 768 }}
          columns={cols}
          pagination={{
            onChange: (page) => {
              const skip = (page - 1) * filter.limit;
              const newFilter = {
                ...filter,
                skip,
              };
              setFilter(newFilter);
              rechargeHistory(newFilter);
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
  );
}
export default RechargeHistory;
