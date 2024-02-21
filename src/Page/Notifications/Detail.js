import { notification } from "antd";
import { IconDateOutlined } from "assets/icons";
import { ArrowLeftOutlined, DeleteOutlined } from "@ant-design/icons";
import BackgroundTop from "components/Layout/BackgroundTop";
import Loader from "components/Loader";
import React, { useCallback, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useHistory, useParams } from "react-router-dom";
import CustomerService from "services/customerMessage";
import "./index.scss";

export default function NotificationDetail() {
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState({});
  const history = useHistory();
  const { id } = useParams();
  const intl = useIntl();
  const t = useCallback((id) => intl.formatMessage({ id }), [intl])

  function deleteNotification(id) {
    setIsVisible(true)
    CustomerService.deleteNotification({ id }).then((result) => {
      const { isSuccess, message, data } = result
      setIsVisible(false)
      if (!isSuccess) {
        notification['error']({
          message: '',
          description: message || t('something_wrong')
        })
        return
      } else {
        history.push('/management/notification')
      }
    })
  }

  useEffect(() => {
    if (id) {
      CustomerService.getDetailMessage({ id }).then((result) => {
        const { isSuccess, message, data } = result;
        if (!isSuccess || !data) {
          notification["error"]({
            message: "",
            description: message || t('something_wrong'),
          });
          return;
        } else {
          setData(data);
        }
      });
    }
  }, [id]);

  return (
    <section className="notification mx-0">
      <div className="d-block bg-img-earth bg-transparent position-relative">
        {/* <BackgroundTop small height="84px" imgSrc="../../assets/images/bg-small.png"/> */}
        <div className="d-flex align-items-center header-mobile__container notif-header p-3">
          <div
            role="button"
            className="me-3 text-light"
            onClick={() => {
              history.push("/management/notification");
            }}
          >
            <ArrowLeftOutlined style={{ fontSize: "20px" }} />
          </div>
          <div className="title">
            <p className="m-0 text-light fw-semibold text-uppercase">
              {" "}
              {t(!id ? "notification" : "detail")}
            </p>
          </div>
          <div
          className="text-white notif-header__detail__rmBtn"
          role="button"
          onClick={() => {
            deleteNotification(id);
            setTimeout(() => {
              history.push('/management/notification');
            }, 1000);
          }}
        >
          <DeleteOutlined />
        </div>
        </div>
      </div>
      <div className="d-flex flex-column mx-4">
        <img
          className="py-4"
          src={data?.customerMessageImage}
          alt=""
          style={{
            objectFit: "fill",
            width: '100%',
            height: 'auto'
          }}
        />
        <p className="notifi-detail__title">{data?.customerMessageTitle}</p>
        <p className="notifi-detail__content my-3">{data?.customerMessageContent}</p>
      </div>
      {isVisible ? <Loader /> : null}
    </section>
  );
}
