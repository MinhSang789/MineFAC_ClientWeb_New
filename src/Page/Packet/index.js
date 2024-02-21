import { Button, Modal, notification, Pagination, Tabs } from "antd";
import React, { useEffect, useState, useMemo, useCallback, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import swal from "sweetalert";
import {
  IconUSDT,
} from "./../../assets/icons/index";
import { ExclamationCircleFilled } from '@ant-design/icons';
import Loader from "./../../components/Loader";
import { formatToNInputPrice } from "./../../helper/common";
import PaymentServicePackage from "./../../services/paymentServicePackage";
import PasswordForm from "../Management/PasswordForm";
import BoughtMachine from "Page/TransactionHistory/BoughtMachine";
import { WALLET } from "hooks/management.hook";
import { handleUpdateDetail } from "actions";
import AppUsers from "services/apppUsers";
import { find } from "lodash";
import classNames from "classnames";
import { IntlContext } from '../../helper/Internationalization'
import FAC100 from "assets/images/fac100.png";
import FAC500 from "assets/images/fac500.png";
import FAC1000 from "assets/images/fac1000.png";
import { useIntl } from "react-intl";



const DEFAULT_FILTER = {
  filter: {
    packageType: "A100FAC"
  },
  skip: 0,
  limit: 20,
  order: {
    key: "createdAt",
    value: "desc",
  },
};

function Packet(props) {
  const { secondaryPassword, wallets, appUserId } = useSelector((state) =>
    state.member ? state.member : {}
  );
  const intlContext = useContext(IntlContext)
//Get language from context
const { locale } = intlContext;
  const [isVisible, setIsVisible] = useState(false);
  const [activeKey, setActiveKey] = useState('1');
  const [dataFrom, setDataForm] = useState({});
  const [filter, setFilter] = useState(DEFAULT_FILTER);
  const [dataList, setDataList] = useState({ data: [], total: 0 });
  const [isModal, setIsModal] = useState(false);
  const dispatch = useDispatch();
  const intl = useIntl();
  const t = useCallback((id) => intl.formatMessage({ id }), [intl]);

  const dataListAggregate = useMemo(() => {
    const aggr = (dataList.data || []).reduce((arr, cur) => {
      const newPack = cur.packageType.substring(1, cur.packageType.length);
      if (!arr[newPack]) {
        arr[newPack] = [];
      }
      arr[newPack].push(cur);
      return arr;
    }, {});
    if (!aggr.hasOwnProperty('1000FAC')) {
      aggr['1000FAC'] = [];
    }
    if (!aggr.hasOwnProperty('100FAC')) {
      aggr['100FAC'] = [];
    }
    if (!aggr.hasOwnProperty('500FAC')) {
      aggr['500FAC'] = [];
    }
    return aggr;
  }, [dataList.data]);

  const keys = useMemo(() => {
    const aggregateKeys = Object.keys(dataListAggregate);
    aggregateKeys.sort((a, b) => {
      return Number(a.match(/(\d+)/g)[0]) - Number(b.match(/(\d+)/g)[0]);
    });
    return aggregateKeys;
  }, [dataListAggregate]);

  const usdtBalance = useMemo(() => {
    return find(wallets, { walletType: WALLET.USDT })?.balance || 0;
  }, [wallets]);

  const facImg = (item) => {
    if (item.packageType === "A100FAC") {
      return FAC100;
    } else if (item.packageType === "A500FAC") {
      return FAC500;
    } else if (item.packageType === "A1000FAC") {
      return FAC1000;
    }
  };

  function getListPackage(filter) {
    setIsVisible(true);
    PaymentServicePackage.getList(filter).then((result) => {
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

  const getDetailUserById = (appUserId) => {
    AppUsers.getDetailUserById({
      id: appUserId,
    }).then((result) => {
      const { isSuccess, data } = result;
      if (isSuccess) {
        dispatch(handleUpdateDetail(data));
      }
    });
  };
  function btcProduction(packageType) {
    if (packageType.indexOf('100FAC') > -1) {
      return 0.01;
    } else if (packageType.indexOf('500FAC') > -1) {
      return 0.05;
    } else if (packageType.indexOf('1000FAC') > -1) {
      return 0.1;
    }
  }
  
  function getBannerByLocale() {
    if (locale === 'en') {
      return '/assets/imagesHome/store-banner_en.png';
    } else if (locale === 'cn') {
      return '/assets/imagesHome/store-banner_cn.png';
    }
    return '/assets/imagesHome/store-banner.png';
  };;

  function buyServicePackage(item) {
    setIsVisible(true);
    PaymentServicePackage.buyServicePackage(item).then((result) => {
      const { isSuccess, message } = result;
      setIsVisible(false);
      if (!isSuccess) {
        swal(t(message || "package_buy_failed"), {
          icon: "warning",
        });
      } else {
        swal(t("buy_success"), {
          icon: "success",
        });
        getListPackage(filter);
        getDetailUserById(appUserId);
      }
    });
  }

  const onChangeTab = (key) => {
    setActiveKey(key);
    console.log('key is ', key);
    const newFilter = {
      ...filter,
      filter: {
        ...filter.filter,
        packageType: `A${key}`
      }

    }
    setFilter(newFilter)
    getListPackage(newFilter)
  };

  const onChangePage = (page, pageSize) => {
    const newFilter = {
      ...filter,
      skip: (page - 1) * pageSize,
    }
    getListPackage(newFilter)
  };

  useEffect(() => {
    getListPackage(filter);
  }, []);

  return (
    <section className="management packet mb-0">
      <div className="packet__top d-flex justify-content-center align-items-center">
        <div className="packet__top__title text-uppercase">{t("store")}</div>
      </div>
      <div className="packet__top__img d-flex justify-content-center align-items-center py-4">
        <img src={getBannerByLocale()} alt="" />
      </div>
      <div>
        <div className="packet__header d-block">
          <div className="packet__header__balance d-flex mt-2 mt-md-0">
            <div className="flex-grow-1"><IconUSDT /><span className="mx-2">{t(("usdt_wallet"))}</span></div>
            <p>{formatToNInputPrice(usdtBalance)}</p>
          </div>
        </div>
        <div className="packet__divider"></div>
        <Tabs defaultActiveKey="1" onChange={onChangeTab} className="bg-gray management__tabs">
          {keys.map((key) => {
            return (
              <Tabs.TabPane tab={t(key)} key={key}>
                <div className="row mx-2">
                  {dataListAggregate[key].length > 0 ? dataListAggregate[key].map((item) => (
                    <div
                      className="col-6 mm-item"
                      role="button"
                      onClick={() => {
                        const wrapper = document.createElement("div");
                        wrapper.innerHTML = `
                        <div class="packet__approve__content">
                          <div class="packet__approve__item">
                            <p>${t("brand")}</p>
                            <p>${t("fac_gaming")}</p>
                          </div>
                          <div class="packet__approve__item">
                            <p>${t("machine_type")}</p>
                            <p>${t("crypto_mining")}</p>
                          </div>
                          <div class="packet__approve__item">
                            <p>${t("feature")}</p>
                            <p>${t("mining_fac_btc")}</p>
                          </div>
                          <div class="packet__approve__item">
                            <p>${t("machine_type_2")}</p>
                            <p>${item.packageName}</p>
                          </div>
                          <div class="packet__approve__item">
                            <p>${t("performance_q")}</p>
                            <p>${item.packagePerformance} Fi / ${t("day")}</p>
                          </div>
                          <div class="packet__approve__item">
                            <p>${t("price_store")}</p>
                            <p>$${formatToNInputPrice(item.packagePrice)}</p>
                          </div>
                          <div class="packet__approve__item">
                            <p>${t("old")}</p>
                            <p>${item.packageDuration} ${t("days")}</p>
                          </div>
                          <div class="packet__approve__item">
                            <p>${t("liquidation_fee")}</p>
                            <p>7 %</p>
                          </div>
                          <div class="packet__approve__item">
                            <p>${t("btc_mining_change")}</p>
                            <p>${btcProduction(item.packageType)} BTC</p>
                          </div>
                        </div>
                        `;
                        swal({
                          html: true,
                          className: classNames("packet__approve"),
                          title: t("detail_product"),
                          content: wrapper,
                          icon: "warning",
                          dangerMode: false,
                          buttons: [t("back"), t("buy_now")],
                          confirmButtonText: t("buy_now"),
                          cancelButtonText: t("back"),
                          showCloseButton: true,
                          showCancelButton: true,
                          type: "info",
                        }).then((willDelete) => {
                          if (willDelete) {
                            dataFrom.paymentServicePackageId =
                              item.paymentServicePackageId;
                            buyServicePackage(dataFrom);
                          }
                        });
                      }}
                    >
                      <div className="packet__box">
                        <div className="packet__box__content">
                          <div className="packet__box__img">
                            <img
                              className="w-100 h-100"
                              src={facImg(item)}
                              alt=""
                            />
                          </div>
                          <div className="packet__item-name">
                            {t("mining_machine")}{' '}
                            <span className="font-weight-bold">
                              {item.packageName}
                            </span>
                          </div>
                          <div className="packet__item-price">
                            ${formatToNInputPrice(item.packagePrice)}
                          </div>
                          <div className="management__box__hr packet__box__hr"></div>
                        </div>
                      </div>
                    </div>
                  )) : !isVisible && <div className="packet__empty__list d-flex justify-content-center align-items-center py-2 mt-4">
                    <ExclamationCircleFilled className="" /><span className="mx-3">{activeKey === '1' ? t('machine_100_soldout_comback') : activeKey === '2' ? t('machine_500_soldout_comback')  : t("machine_1000_soldout_comback") } </span>
                  </div>}
                  {dataListAggregate[key].length > 0 && <Pagination defaultCurrent={1} total={dataList.total} pageSize={20} onChange={onChangePage} />}
                </div>
              </Tabs.TabPane>
            );
          })}
          <Tabs.TabPane tab={t("bought_machine_history")} key="2">
            <div className="packet__content-second">
              <BoughtMachine columns={[0, 1, 2, 3, 4, 7]} title={t("bought_machine_history")} />
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
      {isVisible ? <Loader /> : null}
      <Modal
        closable={false}
        footer={false}
        className="modalChangePass"
        open={isModal}
        centered
        onCancel={() => {
          setIsModal(false);
        }}
      >
        <PasswordForm
          secondaryPassword={secondaryPassword}
          onChange={(secondaryPassword) => {
            setIsModal(false);
            dataFrom.secondaryPassword = secondaryPassword;
            buyServicePackage(dataFrom);
          }}
        />
      </Modal>
    </section>
  );
}
export default Packet;
