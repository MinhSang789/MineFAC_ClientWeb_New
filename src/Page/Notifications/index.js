import React, { useCallback, useEffect, useState } from "react";
import { notification, Table, Select } from "antd";
import { ArrowLeftOutlined, DeleteOutlined } from "@ant-design/icons";
import BackgroundTop from "components/Layout/BackgroundTop";
import Loader from "components/Loader";
import CustomerService from "services/customerMessage";
import _ from "lodash";
import { useIntl } from "react-intl";
import "./index.scss";
import moment from "moment";
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
export default function Notifications() {
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState(DEFAULT_FILTER);
  const [dataList, setDataList] = useState({ data: [], total: 0 });
  const intl = useIntl();
  const t = useCallback((id) => intl.formatMessage({ id }), [intl]);
  const history = useHistory();

  function rechargeHistory(filter) {
    const dateFilter = filter.filter;
    const newFilter = _.omit(filter, "filter");
    CustomerService.getListNotification(
      Object.assign(newFilter, dateFilter)
    ).then((result) => {
      const { isSuccess, message, data } = result;
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

  function deleteNotification(id) {
    setIsVisible(true);
    CustomerService.deleteNotification({ id }).then((result) => {
      const { isSuccess, message, data } = result;
      setIsVisible(false);
      if (!isSuccess || !data) {
        notification["error"]({
          message: "",
          description: message || t("something_wrong"),
        });
        return;
      } else {
        rechargeHistory(filter);
      }
    });
  }
  function readNotification(id) {
    CustomerService.readNotification({ id }).then((result) => {
      const { isSuccess, message, data } = result;
      if (!isSuccess || !data) {
        notification["error"]({
          message: "",
          description: message || t("something_wrong"),
        });
        return;
      } else {
        history.push("/management/notification/" + id);
      }
    });
  }

  useEffect(() => {
    rechargeHistory(filter);
  }, []);

  const columns = [
    {
      title: t("name"),
      dataIndex: "name",
      key: "name",
      render: (text, row, index) => {
        const { customerMessageId, customerMessageTitle, isRead, createdAt, customerMessageContent } =
          row;
        return (
          <div
            onClick={() => readNotification(customerMessageId)}
            style={{
              padding: "20px 28px",
              color: isRead ? "#616161": "#222222",
              cursor: "pointer",
              backgroundColor: isRead ? "#FFFFFF" : "#F5F5F5",
            }}
            className="d-flex flex-row align-items-center justify-content-between"
          >
            <div>
              <div className={!isRead && 'notif-datetime'}>{moment(createdAt).format("HH:mm DD/MM/yyyy")}</div>
              <div className="management__box__coin recharge_history__normal_text">
                {customerMessageTitle}
              </div>
              <div className="management__box__coin recharge_history__normal_text content-cut">
                {customerMessageContent}
              </div>
            </div>
            {!isRead && (
              <>
                <div
                  style={{
                    marginLeft: "auto",
                    marginRight: "10px",
                    paddingLeft: '7px',
                    paddingRight: '7px',
                    height: "14px",
                    marginTop: "4px",
                    borderRadius: "50%",
                    background: "#FF8314",
                  }}
                ></div>
                <span onClick={() => deleteNotification(customerMessageId)}>
                  <DeleteOutlined />
                </span>
              </>
            )}
          </div>
        );
      },
    },
  ];
  return (
    <section className="notification">
      <div className="d-block bg-transparent bg-img-earth position-relative">
        {/* <BackgroundTop small height="84px" imgSrc="../../assets/images/bg-small.png"/> */}
        <div className="d-flex align-items-center header-mobile__container notif-header p-3">
          <div
            role="button"
            className="me-3 text-light"
            onClick={() => {
              history.push("/");
            }}
          >
            <ArrowLeftOutlined style={{ fontSize: "20px" }} />
          </div>
          <div className="title">
            <p className="m-0 text-light fw-semibold text-uppercase">
              {" "}
              {t("notification")}
            </p>
          </div>
        </div>
      </div>
      <div className="management__box-rounded-unset">
        <Table
          dataSource={dataList.data}
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
            position: ["none", "bottomCenter"],
          }}
        />
        {/* <div className="d-flex">
          <div className="d-flex flex-column">

          </div>
          <div className="d-flex flex-column">

          </div>
        </div> */}
        {isVisible ? <Loader /> : null}
      </div>
    </section>
  );
}
