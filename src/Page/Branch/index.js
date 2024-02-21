import React, { useCallback, useEffect, useState } from "react";
import { notification, Table, Select, Modal, Input } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import Loader from "components/Loader";
import PaymentServicePackage from "services/paymentServicePackage";
import _, { debounce } from "lodash"
import { useIntl } from "react-intl";
import moment from "moment";
import { ChartIcon, LightningIcon } from "../../assets/icons/index";
import "./index.scss";
import { useSelector } from "react-redux";
import { useManagement } from "hooks/management.hook";
import { userLevel, userRole, userPower } from "context/UserContext";
import { useWallet } from "context/WalletContext";
import { formatToNInputPrice, formatToPrice } from "helper/common";
import { IconFAC } from "assets/icons";
import Header from "../../components/ManagerHeader";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

const DEFAULT_FILTER = {
  filter: {},
  skip: 0,
  limit: 10,
  order: {
    key: "createdAt",
    value: "desc",
  },
};
export default function Branch() {
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState(DEFAULT_FILTER);
  const [dataList, setDataList] = useState({ data: [], total: 0, totalServicePackagePaymentAmount: 0, totalReferredServicePackagePaymentAmount: 0, totalCountVerifiedReferredUser: 0 });
  const user = useSelector((state) => state.member);
  const history = useHistory()
  // useIntl template
  const intl = useIntl();
  const t = useCallback(
    (id) => {
      return intl.formatMessage({ id });
    },
    [intl]
  );
  const { wallet } = useWallet();
  function rechargeHistory(filter) {
    setIsVisible(true);
    const dateFilter = filter.filter;
    const newFilter = _.omit(filter, "filter");
    PaymentServicePackage.userGetListBranch(
      Object.assign(newFilter, dateFilter)
    ).then((result) => {
      const { isSuccess, message, data } = result;
      setIsVisible(false);
      if (!isSuccess || !data) {
        notification["error"]({
          message: "",
          description: message || t("something_wrong"),
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

  const columns = [
    {
      title: t("time"),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text, row, index) => {
        const { createdAt } = row;
        return (
          <div className="d-flex align-items-center">
            <span className="management__box__coin recharge_history__normal_text">
              {moment(createdAt).format("YYYY-MM-DD HH:mm:ss")}
            </span>
          </div>
        );
      },
    },
    {
      title: t("organization_name"),
      dataIndex: "companyName",
      key: "companyName",
      render: (text, row, index) => {
        return (
          <div className="d-flex align-items-center">
            <span className="management__box__coin recharge_history__normal_text">
              {text}
            </span>
          </div>
        );
      },
    },
    {
      title: t("branch"),
      dataIndex: "branch",
      key: "branch",
      render: (text, row, index) => {
        const {memberReferIdF1, memberReferIdF2, memberReferIdF3, memberReferIdF4, memberReferIdF5} = row;
        return (
          <div className="d-flex align-items-center">
            <span className="management__box__coin recharge_history__normal_text">
              {userRole(row, user)}
            </span>
          </div>
        );
      },
    },
    {
      title: 'KYC',
      dataIndex: "isVerified",
      key: "isVerified",
      render: (text, row, index) => {
        return (
          <div className="d-flex align-items-center">
            <span className="management__box__coin recharge_history__normal_text">
              {row.isVerified === 1 ? t('has_kyc') : t('has_no_kyc')}
            </span>
          </div>
        );
      },
    },
    {
      title: t('level'),
      dataIndex: "totalpackagePaymentAmount",
      key: "totalpackagePaymentAmount",
      render: (text, row, index) => {
        // console.log('level table ', row);
        return (
          <div className="d-flex align-items-center">
            <span className="management__box__coin recharge_history__normal_text">
              {userLevel(row?.appUsermembershipId)}
            </span>
          </div>
        );
      },
    },
    {
      title: `${t("total_user_asset")} (USDT)`,
      dataIndex: "totalpackagePaymentAmount",
      key: "totalpackagePaymentAmount",
      render: (text, row, index) => {
        const { totalProfitActual } = row;
        return (
          <div className="d-flex align-items-center">
            <span className="management__box__coin recharge_history__normal_text">
              {formatToNInputPrice(text)}
            </span>
          </div>
        );
      },
    },
    {
      title: `${t("total_user_fac_branch_daily")} (Fi)`,
      dataIndex: "totalProfitClaimed",
      key: "totalProfitClaimed",
      render: (text, row, index) => {
        return (
          <div className="d-flex align-items-center">
            <span className="management__box__coin recharge_history__normal_text">
              {formatToNInputPrice(text)}
            </span>
          </div>
        );
      },
    },
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
      setFilter(newFilter);
      rechargeHistory(newFilter);
  }
  const onSearch = (e) => {
    debounceFn(e.target.value);
  }
  return (
    <>
      <section className="branch px-0 px-md-4">
        <Header headerTitle={t("branch")} headerClass={'__branch'}/>
        <div className="factory__header__balance w-100 d-flex flex-column mt-2">
          <div className="w-100 justify-content-between d-flex flex-column mt-2">
            <p className="fs-7 center-vertical text-center">
              <IconFAC />
              <span className="fs-5 mx-2">{t("point_wallet")}</span>
            </p>
            <p className="fw-semibold" style={{paddingLeft: '52px'}}>
              {formatToNInputPrice(wallet?.pointBalance || 0)}
            </p>
          </div>
          <div className="factory__header__power w-100 justify-content-start d-flex">
            <p className="power-title fs-6 center-vertical text-center">
              <LightningIcon style={{ fontSize: 10 }} />
              {t('minging_power')}
            </p>
            <p>-</p>
            <p className="power-percent fs-6">
              <ChartIcon />
              {`${userPower(user?.appUserMembershipId)}%`}
            </p>
          </div>
        </div>
        <div class="packet__approve__content mt-3 mx-3">
          <div class="packet__approve__item branch-title">
            <p>{t("property_permanent_personal")}</p>
            <p>{formatToNInputPrice(dataList.totalServicePackagePaymentAmount)}</p>
          </div>
          <div class="packet__approve__item branch-title">
            <p>{t("property_permanent_branch")}</p>
            <p>{formatToNInputPrice(dataList.totalReferredServicePackagePaymentAmount)}</p>
          </div>
          <div class="packet__approve__item branch-title">
            <p>{t("property_permanent_register")}</p>
            <p>{dataList.totalCountF1 ? dataList.totalCountF1 : 0}</p>
          </div>
          <div class="packet__approve__item branch-title">
            <p>{t("property_permanent_kyc")}</p>
            <p>{dataList.totalCountVerifiedReferredUser}</p>
          </div>
        </div>
        <div className="management__box mx-0">
          <div className="recharge_history__header">
            <div className="management__box__detail">
              {t("branch_list")}
              <InfoCircleOutlined className="icon" onClick={() => {
                history.push('/detail-branch')
              }} />
            </div>
            <div className="branch__search">
            <Input placeholder={intl.formatMessage({id: "organization_name"})} onChange={value => onSearch(value)} suffix={<SearchOutlined />}/>
          </div>
          </div>
          <Table
            dataSource={dataList.data}
            scroll={{ x: 768 }}
            columns={columns}
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
            }}
          />
          {isVisible ? <Loader /> : null}
        </div>
        
      </section>
    </>
  );
}
