import { CustomerServiceFilled, FieldTimeOutlined, MenuOutlined, SettingFilled, TrophyFilled, CloseOutlined } from '@ant-design/icons';
import { notification, Carousel, Modal, Form, InputNumber, Button, Radio } from 'antd';
import PaymentServicePackage from "services/paymentServicePackage";
import _, { find, set } from "lodash"
import { DollarFilled, HandshakeFilled, UserSettingOutlined, WalletFilled, Xray } from 'assets/icons';
import PaymentMethod from "services/paymentMethod";
import BackgroundTop from 'components/Layout/BackgroundTop';
import { SignOut } from 'components/User';
import { UserAvatar } from 'components/User';
import { useModal } from 'context/ModalContext';
import { useSystem } from 'context/SystemContext';
import { useUser } from 'context/UserContext';
import { useWallet } from 'context/WalletContext';
import { WALLET } from "hooks/management.hook";
import { formatToNInputPrice, formatToPrice } from 'helper/common';
import { Introduce } from 'Page/Introduce';
import LeaderBoard from 'Page/LeaderBoard';
import Management from 'Page/Management';
import Settings from 'Page/Settings';
import Staking from 'Page/Staking';
import Badge from 'components/Wallet/Badge';
import Xpay from 'Page/Xpay';
import Support from 'Page/Support';
import { IntlContext } from '../../helper/Internationalization'
import TransactionHistory from 'Page/TransactionHistory';
import React, { useCallback, useState, useEffect, useContext, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router';
import './index.scss';
import { Notification } from 'components/Notification';
import swal from "sweetalert";

function AppName(history) {
  return (
    <div className="position-relative">
       <img className="img-logo" src="Logo.png" alt="" />
    </div>
  );
}
const DEFAULT_FILTER = {
  filter: {},
  skip: 0,
  limit: 10,
  order: {
    key: "createdAt",
    value: "desc",
  },
};

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpand, setIsExpand] = useState(false);
  const [mode, setMode] = useState('deposit');
  const [filter, setFilter] = useState(DEFAULT_FILTER);
  const [dataList, setDataList] = useState({ data: [], total: 0, totalServicePackagePaymentAmount: 0, totalReferredServicePackagePaymentAmount: 0, totalCountVerifiedReferredUser: 0 });
  const { user, refresh } = useUser();
  const { system } = useSystem();
  const { wallet } = useWallet();
  const history = useHistory();
  const modal = useModal();
  const [form] = Form.useForm();
  const [isModal, setIsModal] = useState(false);
  const [isXpayModal, setIsXpayModal] = useState(false);
  const intlContext = useContext(IntlContext);
  const facWallet = useMemo(() => {
    return find(user.wallets, { walletType: WALLET.FAC }) || null;
  }, [user.wallets]);
  const pointWallet = useMemo(() => {
    return find(user.wallets, { walletType: WALLET.POINT }) || null;
  }, [user.wallets]);
  //Get language from context
  const { locale } = intlContext;
  const initialValue = {
    amount: '',
    type: 1
  };
  // useIntl template
  const intl = useIntl();
  const t = useCallback((id) => {
    return intl.formatMessage({ id });
  }, [intl]);

  function handleClickUserIcon() {
    modal.show({
      title: <AppName />,
      content: <SignOut history={history}/>,
      customClass: 'modal-signout',
      transparent: true,
    })
  }
  function handleBadgeClick() {
    console.log('Click badge')
    form.setFieldsValue({
      amount: facWallet.balance,
    })
  }
  const handleClickBtn = (val) => {
    if (val.type === 1) {
      PaymentMethod.requestDepositExternal({paymentAmount: val.amount,  paymentReceiver: "PTS", sendWalletId: facWallet.walletId}).then(async (result) => {
        const { isSuccess } = result;
        if (isSuccess) {
          swal(t("exchange_external_success"), {
            icon: "success",
          });
          refresh();
          setIsModal(false);
          form.resetFields();
        } else {
          swal(t("exchange_external_fail"), {
            icon: "error",
          });
        }
        setIsXpayModal(false);
      })
    }  else {
      PaymentMethod.requestWithdrawExternal({receiveAmount: val.amount,  paymentReceiver: "PTS", receiveWalletId: pointWallet.walletId}).then(async (result) => {
        const { isSuccess } = result;
        if (isSuccess) {
          swal(t("exchange_external_success"), {
            icon: "success",
          });
          refresh();
          setIsModal(false);
          form.resetFields();
        } else {
          swal(t("exchange_external_fail"), {
            icon: "error",
          });
        }
        setIsXpayModal(false);
      })
    }
   
  };
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
  const listBanner = useMemo(() => {
    let suffBanner;
    if (locale === 'en') {
      suffBanner  = 'EN';
    } else if (locale === 'cn') {
      suffBanner  = 'CN';
    } else {
      suffBanner = '';
    }

    let bannerPath = [system[`bannerImage1${suffBanner}`],system[`bannerImage2${suffBanner}`], system[`bannerImage3${suffBanner}`]];

    return bannerPath;
  }, [system, locale]);

  useEffect(() => {
    rechargeHistory(filter);
    form.resetFields();
  }, []);

  return (
    <div className=" home pt-0 overflow-hidden position-relative">
      <BackgroundTop rounded />
      <div className="d-flex justify-content-between align-items-center bg-transparent text-white px-3 py-3">
        <div
          className="position-relative"
          role="button"
          onClick={handleClickUserIcon}>
          <UserSettingOutlined style={{ fontSize: '24px' }} />
        </div>
        <AppName />
        <Notification />
      </div>
      <div className="position-relative h-100">
        <Carousel autoplay dots slidesToShow={1}>
          {listBanner.map((banner) => (
          <div className="px-4 d-flex justify-content-center">
            <img className="img-fluid img-banner" src={banner} alt=""/>
          </div>
          ))}
        </Carousel>
        <div className="mt-4">
          <div className="row">
            <div className="col-3 d-block text-center" role="button">
              <button className="btn btn-primary text-secondary p-2 text-center" onClick={() => {
                modal.show({
                  title: t('my_wallet'),
                  content: <Management history={history} />,
                  customClass: 'modal-wallet',
                  transparent: true,
                  headerNode: true,
                  headerClassBg: 'bg-img-earth'
                })
              }}>
                <WalletFilled className="fs-5" />
              </button>
              <p className="mt-1">{t('my_wallet')}</p>
            </div>
            <div className="col-3 d-block text-center" role="button">
              <button className="btn btn-primary p-2" onClick={() => {
                modal.show({
                  title: t('introduction'),
                  content: <Introduce />,
                  transparent: true,
                  headerClassBg: 'bg-img-earth'
                })
              }}>
                <HandshakeFilled className="fs-5" />
              </button>
              <p className="mt-1">{t('introduction')}</p>
            </div>
            <div className="col-3 d-block text-center" role="button" onClick={() => {
              modal.show({
                title: t('setting'),
                content: <Settings />,
                customClass: 'modal-setting',
                transparent: true,
                headerClassBg: 'bg-img-earth'
              })
            }}>
              <button className="btn btn-primary text-secondary p-2 text-center">
                <SettingFilled className="fs-5" />
              </button>
              <p className="mt-1">{t('setting')}</p>
            </div>
            <div className="col-3 d-block text-center" role="button" onClick={() => {
              if (system.enableBonusModule) {
                modal.show({
                  title: t('leader_board'),
                  content: <LeaderBoard history={history} hide={() => modal.hide()} />,
                  customClass: 'modal-leader',
                  transparent: true
                })
              } else {
                const wrapper = document.createElement("div");
                wrapper.innerHTML = `
                <div class="home__disable__content">
                  <p>${t("disable_module")}</p>
                </div>
                `;
                swal({
                  html: true,
                  className: "packet__approve",
                  content: wrapper,
                  icon: "warning",
                  dangerMode: false,
                  cancelButtonText: t("cancel"),
                  showCloseButton: true,
                  showCancelButton: true,
                  showConfirmButton: false,
                  type: "info",
                })
              }
            }}>
              <button className="btn btn-primary text-secondary p-2">
                <TrophyFilled className="fs-5" />
              </button>
              <p className="mt-1">{t('leader_board')}</p>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-3 d-block text-center" role="button" onClick={() => {    
              setIsXpayModal(true);
              // setTimeout(() => {
              //   let modalWrap = document.querySelectorAll('div.ant-modal-root');
              //   for (const selector of modalWrap) {
              //     let xpayModal = selector.querySelector('div.ant-modal-wrap');
              //     let modalMask = selector.querySelector('div.ant-modal-mask');
              //     if (modalMask) {
              //       modalMask.style.zIndex = '1031';
              //       xpayModal.style.zIndex = '1031';
              //     }
              //   }
              // }, 100);
 
              }
            }
            >
              <Xray className="fs-5" />
              <p className="mt-1">{'XPay Game'}</p>
            </div>
            <div className="col-3 d-block text-center" role="button" onClick={() => {
              modal.show({
                title: t('history_modal'),
                content: <TransactionHistory />,
                customClass: 'refix-modal',
              })
            }}>
              <button className="btn btn-primary text-secondary p-2">
                <FieldTimeOutlined className="fs-5" />
              </button>
              <p className="mt-1">{t('history')}</p>
            </div>
            <div className="col-3 d-block text-center" role="button" onClick={() => {
              modal.show({
                title: t('support'),
                content: <Support />,
                customClass: 'modal-support',
                transparent: true,
                headerClassBg: 'bg-img-earth',
                customClass: 'refix-modal',
              })
            }}>
              <button className="btn btn-primary text-secondary p-2">
                <CustomerServiceFilled className="fs-5" />
              </button>
              <p className="mt-1">{t('support')}</p>
            </div>
            {isExpand && <div className="col-3 d-block text-center" role="button" onClick={() => {
              if (system.enableStakingModule) {
                modal.show({
                  title: 'Staking',
                  content: <Staking />,
                  transparent: true,
                })
              } else {
                const wrapper = document.createElement("div");
                wrapper.innerHTML = `
                <div class="home__disable__content">
                  <p>${t("disable_module")}</p>
                </div>
                `;
                swal({
                  html: true,
                  className: "packet__approve",
                  content: wrapper,
                  icon: "warning",
                  dangerMode: false,
                  cancelButtonText: t("cancel"),
                  showCloseButton: true,
                  showCancelButton: true,
                  showConfirmButton: false,
                  type: "info",
                })
              }
            }}
            style={{
              opacity: !isExpand ? "0" : "1",
              transition: "all .2s",
              display: isExpand ? "block" : "none",
            }}
            >
              <button className="btn btn-primary p-2">
                <DollarFilled className="fs-5" />
              </button>
              <p className="mt-1">{'Staking'}</p>
            </div>}
            {!isExpand && <div className="col-3 d-block text-center" role="button" onClick={() => {setIsExpand(!isExpand)}}>
              <button className="btn btn-primary text-secondary p-2">
                {isExpand ? <CloseOutlined className="fs-5"/> : <MenuOutlined className="fs-5" />}
              </button>
              <p className="mt-1">{t('addition')}</p>
            </div>}
          </div>
          <div className="row mt-2" style={{
              transition: "all .2s",
              display: isExpand ? "block" : "none",
            }}>
          <div className="col-3 d-block text-center" role="button"
            style={{
              opacity: !isExpand ? "0" : "1",
              transition: "all .2s",
              display: isExpand ? "block" : "none",
            }}
            onClick={() => {setIsExpand(!isExpand)}}
            >
                <button className="btn btn-primary text-secondary p-2">
                  {isExpand ? <CloseOutlined className="fs-5"/> : <MenuOutlined className="fs-5" />}
                </button>
                <p className="mt-1">{t('addition')}</p>
            </div>
        </div>
        </div>
        <div className="card p-2 m-2 align-items-stretch">
          <div className="card-header p-0">
            <UserAvatar user={user} horizontal />
          </div>
          <div className="card-body p-0">
            <div className="d-flex w-100 justify-content-between">
              <p className="fs-7">{t('usdt_balance')}</p>
              <p className="fw-semibold">{formatToNInputPrice(wallet?.usdtBalance || 0)}</p>
            </div>
            <div className="divider"></div>
            <div className="d-flex w-100 justify-content-between">
              <p className="fs-7">{t('fac_balance')}</p>
              <p className="fw-semibold">{formatToNInputPrice(wallet?.facBalance || 0)}</p>
            </div>
            <div className="divider"></div>
            <div className="d-flex w-100 justify-content-between">
              <p className="fs-7">{`${t('total_user_asset')} (USDT)`}</p>
              <p className="fw-semibold">{formatToNInputPrice(dataList?.totalServicePackagePaymentAmount || 0)}</p>
            </div>
          </div>
        </div>
        <div className="bg-light-home h-100 mt-4 pt-4 px-3" style={{ paddingBottom: '150px' }}>
          <div className="d-flex justify-content-between">
            <p className="fs-7">{t('total_factory')}</p>
            <p className="fw-semibold">{formatToNInputPrice(system?.totalWorkingServicePackages || 0)}</p>
          </div>
          <div className="divider my-3"></div>
          <div className="d-flex justify-content-between">
            <p className="fs-7">{t('total_fac_mined')}</p>
            <p className="fw-semibold">{formatToNInputPrice(system?.totalBetRecordWinAmount || 0)}</p>
          </div>
        </div>
      </div>
      <Modal
        maskClosable={true}
        title={"XPAY"}
        footer={false}
        className="modalXPay"
        open={isXpayModal}
        centered
        onCancel={() => {
          setIsXpayModal(false);
        }}
        zIndex={1031}
      >
      <div className="wallet-transfer-model my-2">
        <div className="wallet-transfer-model--title">{t('wallet_fi')}</div>
        <div className="wallet-transfer-model--amount">{formatToNInputPrice(facWallet.balance)}</div>
      </div>
      <div className="wallet-transfer-model mb-2">
        <div className="wallet-transfer-model--title">{t('wallet_xpay')}</div>
        <div className="wallet-transfer-model--amount">{formatToNInputPrice(pointWallet.balance)}</div>
      </div>  
      <Form
      requiredMark={false}
      size="large"
      layout="vertical"
      className="mb-6"
      form={form}
      onFinish={(value) => handleClickBtn(value)}
      initialValues={initialValue}
    >
      <Form.Item
          name="type"
          className="wallet-transfer-model--type"
          label={intl.formatMessage({ id: 'demand' })}
        >
        <Radio.Group>
          <Radio value={1}>{t('deposit')}</Radio>
          <Radio value={2}>{t('withdraw')}</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
          name="amount"
          className="wallet-transfer-model--input"
          rules={[
            {
              required: true,
              message: t("deposit_amount_required"),
            },
            {
              validator(_, value) {
                if (isNaN(value) || value === null) {
                  return Promise.resolve();
                }

                if (parseFloat(value) < 10) {
                  return Promise.reject(
                    new Error(t("minimumWithdrawBalance"))
                  );
                }
                if (mode === 'deposit' && parseFloat(value) > facWallet.balance) {
                  return Promise.reject(
                    new Error(t("outOfFac"))
                  );
                }
                if (mode === 'withdraw' && parseFloat(value) > 100000000) {
                  return Promise.reject(
                    new Error(t("maxWithdrawBalance"))
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
          label={intl.formatMessage({ id: 'amount_money' })}
        >
          <InputNumber
            placeholder={t('input_amount_place')}
            addonAfter={<Badge onClick={handleBadgeClick}/>}
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            formatter={(value) => formatToPrice(value)}
            className="xpay-input"
          />
        </Form.Item>
        <div className="w-100 d-flex justify-content-around xpay-btn">	
            <Button
            className="join-btn"
            type="submit"
            size="large"
            onClick={() => {
              window.location.replace(`https://pts.game.finetwork.io/loginExternal?token=${user.token}`);
            }}
            >
            {t('in-game')}
          </Button>									
          <Button
            className="transfer-btn"
            htmlType="submit"
            size="large">
            {t('confirm')}
          </Button>								
					</div>
      </Form>
      </Modal>
    </div>
  )
}

