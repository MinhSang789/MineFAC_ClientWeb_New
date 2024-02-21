import { Button, Modal, notification, Tabs, Pagination } from 'antd';
import { StarFilled } from '@ant-design/icons';
import FAC100 from 'assets/images/fac100.png';
import FAC1000 from 'assets/images/fac1000.png';
import FAC500 from 'assets/images/fac500.png';
import { WALLET } from 'hooks/management.hook';
import { handleUpdateDetail } from '../../actions'
import AppUsersAppUsers from 'services/apppUsers';
import { useUser, userPower } from 'context/UserContext';
import { isPackageActivityStandBy } from 'hooks/package.hook';
import { find } from 'lodash';
import BoughtMachine from 'Page/TransactionHistory/BoughtMachine';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import { IconClock, IconDelete, IconFAC, IconHourglass, IconPickleAxe, IconUSDT, ChartIcon, LightningIcon, RankFlag, BonusFlag } from "../../assets/icons/index";
import Loader from '../../components/Loader';
import Header from '../../components/ManagerHeader';
import PaymentServiceBonusPackage from "../../services/paymentServiceBonusPackage";
import PasswordForm from "../Management/PasswordForm";
import Duration from './duration';
import { formatToNInputPrice } from '../../helper/common'; 

const DEFAULT_FILTER = {
  'filter': {
    packageType: "A100FAC"
  },
  "skip": 0,
  "limit": 20,
  "order": {
    "key": "createdAt",
    "value": "desc"
  }
}

function Packet(props) {
  const { secondaryPassword, appUserId } = useSelector((state) => state.member ? state.member : {});
  const [isVisible, setIsVisible] = useState(false)
  const [dataFrom, setDataForm] = useState({})
  const [activeKey, setActiveKey] = useState('1');
  const [filter, setFilter] = useState(DEFAULT_FILTER)
  const [dataList, setDataList] = useState({ data: [], total: 0 })
  const [isModal, setIsModal] = useState(false);
  const dispatch = useDispatch();
  const { user } = useUser();
  const intl = useIntl();
  const t = useCallback((id, values) => intl.formatMessage({ id }, values), [intl]);

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
      return (Number(a.match(/(\d+)/g)[0]) - Number((b.match(/(\d+)/g)[0])))
    });
    return aggregateKeys;
  }, [dataListAggregate]);

  const facBalance = useMemo(() => {
    return find(user.wallets, { walletType: WALLET.FAC })?.balance || 0;
  }, [user.wallets]);
  const usdtBalance = useMemo(() => {
    return find(user.wallets, { walletType: WALLET.USDT })?.balance || 0;
  }, [user.wallets])

  function getListPackage(filter) {
    setIsVisible(true)
    PaymentServiceBonusPackage.getListUserBuyPackage(filter).then((result) => {
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

  const getDetailUserById = (appUserId) => {
    AppUsersAppUsers.getDetailUserById({
      id: appUserId
    }).then(result => {
      const { isSuccess, data } = result
      if (isSuccess) {
        dispatch(handleUpdateDetail(data))
      }
    })
  };

  function activateServicePackage(item) {
    setIsVisible(true);

    PaymentServiceBonusPackage.activateServicePackage(item).then((result) => {
      const { isSuccess, data } = result;
      setTimeout(() => {
        setIsVisible(false);
      }, 2000);
      getDetailUserById(appUserId);
      if (!isSuccess) {
        swal(t('mining_failed'), {
          icon: "warning",
        });
      } else {
        const wrapper = document.createElement('div');
        let renderHtml = data.profitBonus && data.profitBonus > 0 ? 'bg-btc' : 'bg-fac';
        wrapper.innerHTML = `
        <div class="factory__success__content">
          <div class="factory__success__title">
            ${t(data.profitBonus && data.profitBonus > 0 ? `mining_success_message_btc` : `mining_success_message_fac`)}
          </div>
          <div class="factory__success__point">
           + ${data.profitBonus && data.profitBonus > 0 ? `${data.profitBonus} BTC` : `${data.profitClaimed} Fi`}
         </div>
        </div>`
        swal({
          html: true,
          className: `factory__success__${renderHtml}`,
          content: wrapper,
          dangerMode: false,
          buttons: {
            cancel: t('mining_back'),
          }
        });
        getListPackage(filter);
      }
    })
  }

  function completedServicePackage(item) {
    setIsVisible(true)
    PaymentServiceBonusPackage.completedServicePackage(item).then((result) => {
      const { isSuccess } = result
      setTimeout(() => {
        setIsVisible(false);
      }, 2000);
      if (!isSuccess) {
        swal(t('liquid_failed'), {
          icon: "warning",
        });
      } else {
        swal(t('liquid_success'), {
          icon: "success",
        });
        getListPackage(filter);
      }
    })
  }


  const onChangeTab = (key) => {
    setActiveKey(key);
    const newFilter = {
      ...filter,
      filter: {
        ...filter.filter,
        packageType: `A${key}`
      }

    }
    setFilter(newFilter);
    getListPackage(newFilter)
  };

  const onChangePage = (page, pageSize) => {
    const newFilter = {
      ...filter,
      skip: (page - 1) * pageSize,
    }
    setFilter(newFilter);
    getListPackage(newFilter)
  };


  const facImg = (item) => {
    if (item.packageType.includes('100FAC')) {
      return FAC100;
    } else if (item.packageType.includes('500FAC')) {
      return FAC500
    } else if (item.packageType.includes('1000FAC')) {
      return FAC1000
    }
  }

  useEffect(() => {
    getListPackage(filter)
  }, [])

  return (
    <section className="management packet mb-0">
      <Header headerTitle={t("factory")} />
      <div >
        <div className="factory__header d-block">
          <div className="d-flex flex-column">
            <div className="factory__header__balance w-100 justify-content-between d-flex mx-0">
              <p className="fs-7"><IconUSDT /><span className="fs-5 mx-2">{t('usdt_wallet')}</span></p>
              <p className="fw-semibold">{formatToNInputPrice(usdtBalance || 0)}</p>
            </div>
            <div className="factory__header__balance w-100 d-flex flex-column mt-2">
              <div className="w-100 justify-content-between d-flex mt-2">
                <p className="fs-7 center-vertical text-center"><IconFAC /><span className="fs-5 mx-2">{t('fac_wallet')}</span></p>
                <p className="fw-semibold">{formatToNInputPrice(facBalance || 0)}</p>
              </div>
              <div className="factory__header__power w-100 justify-content-end d-flex">
                <p className="power-title fs-6 center-vertical text-center"><LightningIcon style={{ fontSize: 10 }} />{t('minging_power')}</p>
                <p>-</p>
                <p className="power-percent fs-6"><ChartIcon />{`${userPower(user?.appUserMembershipId)}%`}</p>
              </div>
            </div>

          </div>
        </div>
        <div className="packet__divider"></div>
        <Tabs defaultActiveKey={keys?.length ? keys[0] : '2'} onChange={onChangeTab} className="bg-gray management__tabs">
          {keys.map(key => (
            <Tabs.TabPane tab={t(key)} key={key}>
              <div className="row mx-2">

                {
                  dataListAggregate[key].map(item => (
                    <div className="col-6" role="button">
                      <div className="packet__box" >
                        <div className="packet__box__content">
                          <div className="packet__box__img">
                            {item.packageCategory === 'Rank' ? <div className="packet__box__flag d-flex flex-column red-flag"><RankFlag /><p>Rank</p></div> : item.packageCategory === 'Bonus' ? <div className="packet__box__flag d-flex flex-column blue-flag"><BonusFlag /><p>Bonus</p></div> : item.packageCategory === 'KYC' ? <div className="packet__box__flag d-flex blue-flag flex-column"><BonusFlag /><p>KYC</p></div> : ''}
                            <img className="w-100 h-100" src={facImg(item)} alt="" />
                          </div>
                          <div className="packet__item-name">{t('mining_machine')}{' '}<span className="font-weight-bold">{item.packageName}</span></div>
                          <div className="d-flex align-items-center packet__item-right"><IconClock /> <span>{t('mining')}: {item.packageCurrentPerformance} Fi/ {t('date')}</span></div>
                          <div className="d-flex align-items-center packet__item-left mb-4">
                            <IconHourglass />
                            <span>
                              <Duration lastActiveDate={item.packageExpireDate} format={`DD [${t('date')}] HH [${t('hour')}] mm [${t('minute')}] ss [${t('second')}]`} />
                            </span>
                          </div>
                          {isPackageActivityStandBy(item) && (<Button
                            className="login__button"
                            type="primary"
                            size="large"
                            onClick={() => {
                              const wrapper = document.createElement('div');
                              wrapper.innerHTML = `
                            <div class="packet__approve__content">
                            ${t('start_mining')} <strong>${item.packageName} </strong> ${t('values')}  <strong>$${item.packagePrice}</strong>?
                            `
                              swal({
                                html: true,
                                className: "packet__approve",
                                title: t('confirm_mining'),
                                content: wrapper,
                                icon: "warning",
                                dangerMode: false,
                                buttons: [t('cancel'), { text: t('confirm'), className: isVisible ? "loading" : '' }],
                                confirmButtonText: '<span style="color: #191919">Submit</span>',
                                confirmButtonText: t('confirm'),
                                cancelButtonText: t('cancel')
                              })
                                .then((willDelete) => { 
                                  if (willDelete) {
                                    dataFrom.paymentServicePackageUserId = item.paymentServicePackageUserId;
                                    activateServicePackage(dataFrom)
                                  }
                                });
                            }}
                          >
                            <IconPickleAxe /><span style={{ marginLeft: '8px' }}>{t('mine')}</span>
                          </Button>)}
                          {!isPackageActivityStandBy(item) && (<Button
                            className="login__button login__button-transparent-blue"
                            style={{ marginTop: '16px' }}
                            type="primary"
                            size="large"
                          >
                            <Duration lastActiveDate={item.packageLastActiveDate} prefix add24hours short />
                          </Button>)}
                          <Button
                            className="factory__btn login__button-transparent-red"
                            style={{ marginTop: '16px' }}
                            type="primary"
                            size="large"
                            onClick={() => {
                              const wrapper = document.createElement('div');
                              wrapper.innerHTML = `
                              <div class="packet__reject__content">
                              ${t('liquid_note').replace('{packageName}', item.packageName).replace('{packagePerformance}', item.packagePerformance)}
                                </div>
                            `
                              swal({
                                html: true,
                                className: "packet__reject",
                                title: t('liquid'),
                                content: wrapper,
                                icon: "warning",
                                dangerMode: false,
                                buttons: [t('back'), { text: t('confirm'), className: isVisible ? "loading" : '' }],
                                confirmButtonText: t('confirm'),
                                cancelButtonText: t('back')
                              })
                                .then((willDelete) => {
                                  if (willDelete) {
                                    dataFrom.paymentServicePackageUserId = item.paymentServicePackageUserId;
                                    completedServicePackage(dataFrom)
                                  }
                                });
                            }}
                          >
                            <IconDelete /><span style={{ marginLeft: '8px' }}>{t('liquid')}</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                }
                {dataListAggregate[key].length > 0 && <Pagination defaultCurrent={1} total={dataList.total} pageSize={20} onChange={onChangePage} />}
              </div>
            </Tabs.TabPane>
          ))}
          <Tabs.TabPane tab={t('history_mining')} key="5">
            <div className="packet__content-second">
              <BoughtMachine
                title={t('history_mining')}
                fetchData={PaymentServiceBonusPackage.historyMiningServicePackage}
                columns={[0, 1, 9, 10]}
              />
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab={t('machine_bonus_history')} key="4">
            <div className="packet__content-second">
              <BoughtMachine
                title={t('machine_bonus_history')}
                fetchData={PaymentServiceBonusPackage.historyBonusServicePackage}
                columns={[0, 1, 2, 4, 6, 7, 8]}
              />
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab={t('machine_liquidation_history')} key="2">
            <div className="packet__content-second">
              <BoughtMachine
                timeIsExpired
                title={t('machine_liquidation_history')}
                fetchData={PaymentServiceBonusPackage.historyCompletedServicePackage}
                columns={[0, 1, 2, 4, 11]}

              />
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab={t('machine_recall_history')} key="3">
            <div className="packet__content-second">
              <BoughtMachine
                timeIsExpired
                title={t('machine_recall_history')}
                fetchData={PaymentServiceBonusPackage.historyCancelServicePackage}
                columns={[0, 1, 2, 4]}
              />
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
          setIsModal(false)
        }}>
        <PasswordForm secondaryPassword={secondaryPassword} onChange={(secondaryPassword) => {
          setIsModal(false)
          dataFrom.secondaryPassword = secondaryPassword
          activateServicePackage(dataFrom)
        }}
        />
      </Modal>
    </section>
  )
}
export default Packet;