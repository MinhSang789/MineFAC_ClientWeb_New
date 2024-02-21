
import ForgotPass from "Page/ForgotPass"
import { Introduce } from "Page/Introduce"
import DetailBranch from "Page/Organization/detailBranch"
import Saving from "Page/Saving"
import Settings from "Page/Settings"
import TransactionHistory from "Page/TransactionHistory"
import React, { lazy, Suspense } from "react"
import { FormattedMessage } from "react-intl"
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Layout from './../src/Page/Layout'
import { IconBranch, IconLeaderBoard, IconNotification, IconOrganizationSmall, IconPacket, IconProfileIcon, IconRechargeHistory, IconSaving, IconSettings, IconSignout, IconSupport, IconWallet, ThunderButton2 } from "./assets/icons/index"
import WelcomePage from "Page/WelcomPage";
const NotificationDetail = lazy(() => import('./../src/Page/Notifications/Detail'))
const Home = lazy(() => import("./../src/Page/Home"));
const Register = lazy(() => import("./../src/Page/Register"));
const Login = lazy(() => import("./../src/Page/Login"));
const PurchaseHistory = lazy(() => import('./Page/PurchaseHistory'));
const WithdrawalHistory = lazy(() => import('./../src/Page/WithdrawalHistory'));
const BoughtMachine = lazy(() => import('./../src/Page/TransactionHistory/BoughtMachine'));
const DepositUSDT = lazy(() => import('./../src/Page/TransactionHistory/DepositUSDT'));
const ExchangeFAC = lazy(() => import('./../src/Page/TransactionHistory/ExchangeFAC'));
const ExchangePoint = lazy(() => import('./../src/Page/TransactionHistory/ExchangePoint'));
const ReceivePoint = lazy(() => import('./../src/Page/TransactionHistory/ReceivePoint'));
const ReceiveBTC = lazy(() => import('./../src/Page/TransactionHistory/ReceiveBTC'));
const ReceiveFAC = lazy(() => import('./../src/Page/TransactionHistory/ReceiveFAC'));
const WithdrawBTC = lazy(() => import('./../src/Page/TransactionHistory/WithdrawBTC'));
const WithdrawUSDT = lazy(() => import('./../src/Page/TransactionHistory/WithdrawUSDT'));
const Branch = lazy(() => import('./../src/Page/Branch'));
const Notifications = lazy(() => import('./../src/Page/Notifications'));
const Organization = lazy(() => import('./../src/Page/Organization'));
const LeaderBoard = lazy(() => import('./../src/Page/LeaderBoard'));

const ListCoinPrice = lazy(() => import('./../src/Page/ListCoinPrice'));
const ListPackagePurchased = lazy(() => import('./../src/Page/ListPackagePurchased'));
const Group = lazy(() => import('./Page/Group'));
const Packet = lazy(() => import("./../src/Page/Packet"));
const Recharge = lazy(() => import("./../src/Page/Recharge"));
const Support = lazy(() => import("./../src/Page/Support"));
const Profile = lazy(() => import("./../src/Page/Profile"));
const Management = lazy(() => import("./Page/Management"));
const ListPackageBonus = lazy(() => import("./../src/Page/ListPackageBonus"));
const Staking = lazy(() => import("./Page/Staking"));
const Two2Fa = lazy(() => import("./Page/Login/two2FA"));

export const routes = {
  login: {
    path: "/login",
    component: Login,
    isAuth: false,
    label: "Đăng nhập",
  },
  register: {
    path: "/register",
    component: Register,
    isAuth: false,
    label: "Đăng ký",
  },
  forgotPass: {
    path: "/forgot",
    component: ForgotPass,
    isAuth: false,
    label: "Quên mật khẩu"
  },
  introduce: {
    path: "/introduce",
    component: Introduce,
    isAuth: false,
    label: "Giới thiệu",
    isTop: true,
    showFooterMobile: true
  },
  introdure: {
    path: "/leader-board",
    component: LeaderBoard,
    isAuth: false,
    label: "Giải thưởng",
    isTop: true
  },
  managementWallet: {
    path: "/management/wallet",
    component: Management,
    isAuth: true,
    label: "Danh sách ví",
    isMenuItem: true,
    icon: <IconWallet />,
    className: "cosutmSelect"
  },
  managementPacket: {
    path: "/management/packet",
    component: Packet,
    isAuth: true,
    label: "Cửa hàng",
    isMenuItem: true,
    icon: <IconPacket />,
    showFooterMobile: true
  },
  managementPackageBonus: {
    path: "/management/package-bonus",
    component: ListPackageBonus,
    isAuth: true,
    label: "Nhà máy",
    isMenuItem: true,
    icon: <ThunderButton2 />,
    showFooterMobile: true
  },
  managementRechargeHistory: {
    path: "/management/transaction-history",
    component: TransactionHistory,
    isAuth: true,
    label: "Lịch sử ",
    mobileTitle: "Lịch sử giao dịch",
    isMenuItem: true,
    icon: <IconRechargeHistory />
  },
  managementDepositHistory: {
    path: "/management/deposit-history",
    component: DepositUSDT,
    isAuth: true,
    label: "Nạp USDT",
    isSubItem: true,
  },
  managementWithdrawHistoryUSDT: {
    path: "/management/withdraw-history-usdt",
    component: WithdrawUSDT,
    isAuth: true,
    label: "Rút USDT",
    isSubItem: true,
  },
  managementViewHistoryFAC: {
    path: "/management/view-history-fac",
    component: ReceiveFAC,
    isAuth: true,
    label: "Nhận Fi",
    isSubItem: true,
  },
  managementUserExchangeFACHistory: {
    path: "/management/user-exchange-fac-history",
    component: ExchangeFAC,
    isAuth: true,
    label: "Quy đổi Fi",
    isSubItem: true,
  },
  managementUserReceivePOINTHistory: {
    path: "/management/user-receive-point-history",
    component: ReceivePoint,
    isAuth: true,
    label: "Nhận hoa hồng",
    isSubItem: true,
  },
  managementUserExchangePOINTHistory: {
    path: "/management/user-exchange-point-history",
    component: ExchangePoint,
    isAuth: true,
    label: "Đổi hoa hồng",
    isSubItem: true,
  },
  managementViewHistoryBTC: {
    path: "/management/view-history-btc",
    component: ReceiveBTC,
    isAuth: true,
    label: "Nhận BTC",
    isSubItem: true,
  },
  managementWithdrawHistoryBTC: {
    path: "/management/withdraw-history-btc",
    component: WithdrawBTC,
    isAuth: true,
    label: "Rút BTC",
    isSubItem: true,
  },
  managementHistoryServicePackage: {
    path: "/management/history-service-package",
    component: BoughtMachine,
    isAuth: true,
    label: "Mua máy đào",
    isSubItem: true,
  },
  branch: {
    path: "/management/branch",
    component: Branch,
    isAuth: true,
    label: <FormattedMessage id="branch" />,
    isMenuItem: true,
    icon: <IconBranch />,
    showFooterMobile: true
  },
  organization: {
    path: "/management/organization",
    component: Organization,
    isAuth: true,
    label: <FormattedMessage id="organization" />,
    isMenuItem: true,
    icon: <IconOrganizationSmall />
  },
  notification: {
    path: "/management/notification",
    component: Notifications,
    isAuth: true,
    label: <FormattedMessage id="notification" />,
    isMenuItem: true,
    icon: <IconNotification />
  },
  notificationDetail: {
    path: "/management/notification/:id",
    component: NotificationDetail,
    isAuth: true,
    isMenuItem: true,
    isHidden: true,
    label: <FormattedMessage id="notification" />,
  },
  leaderBoard: {
    path: "/management/leader-board",
    component: LeaderBoard,
    isAuth: true,
    label: <FormattedMessage id="leader_board" />,
    isMenuItem: true,
    icon: <IconLeaderBoard />
  },
  saving: {
    path: "/management/saving",
    component: Saving,
    isAuth: true,
    label: <FormattedMessage id="saving" />,
    isMenuItem: true,
    icon: <IconSaving />
  },
  managementProfile: {
    path: "/management/profile",
    component: Profile,
    isAuth: true,
    label: "Tài khoản",
    isMenuItem: true,
    icon: <IconProfileIcon />
  },
  settings: {
    path: "/settings",
    component: Settings,
    isAuth: true,
    label: "Cài đặt",
    isMenuItem: true,
    icon: <IconSettings />
  },
  support: {
    path: "/management/support",
    component: Support,
    isAuth: true,
    label: "Hỗ trợ",
    isMenuItem: true,
    icon: <IconSupport />
  },
  management: {
    path: "/management",
    component: Management,
    isAuth: true,
    isTop: true,
    label: "Quản lý",
    isMenuItem: true,
  },
  signout: {
    path: "/signout",
    label: "Đăng xuất",
    icon: <IconSignout />
  },
  contact: {
    path: "/contact",
    component: Support,
    isAuth: false,
    label: "Liên hệ",
    isMobileHidden: true,
    isTop: true
  },
  detailBranch: {
    path: "/detail-branch",
    component: DetailBranch,
    isAuth: true,
  },
  staking: {
    path: '/management/staking',
    isAuth: true,
    component: Staking
  },
  two2Fa: {
    path: '/two2fa',
    isAuth: false,
    component: Two2Fa
  }
}

function App() {
  const isUserLoggedIn = useSelector(state => state.member ? state.member.isUserLoggedIn : false);
  const isInitLoad = useSelector(state => state.member ? state.member.isInitLoad : true);

  routes.home = {
    path: "/",
    component: Home,
    isAuth: true,
    label: "Trang chủ",
  }
  return isInitLoad ? <WelcomePage/> : 
   (
    <Router>
      <Suspense fallback={<div><FormattedMessage id="LOADING_TEXT" defaultMessage={'Đang tải dữ liệu...'} /></div>}>
        <Switch>
          {Object.keys(routes).map((key, index) => {
            if (isUserLoggedIn && routes[key].isAuth) {
              return (
                <Route
                  key={index}
                  exact
                  path={routes[key].path}
                  component={(props) => (
                    <Layout
                      {...props}
                      isAuth={routes[key].isAuth}
                      isMenuItem={routes[key].isMenuItem}
                      isSubMenu={routes[key].isSubMenu}
                      isSubItem={routes[key].isSubItem}
                      Component={routes[key].component}
                      showFooterMobile={routes[key].showFooterMobile}
                      className={`${routes[key].className || 'HOME'}`} />
                  )} />
              );
            } else if (!routes[key].isAuth) {
              return (
                <Route
                  key={index}
                  exact
                  path={routes[key].path}
                  component={(props) => (
                    <Layout
                      {...props}
                      isAuth={routes[key].isAuth}
                      Component={routes[key].component}
                      showFooterMobile={routes[key].showFooterMobile}
                      className={routes[key].isHeader ? "HOME" : "LOGIN"} />
                  )} />
              );
            }
          })}
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
