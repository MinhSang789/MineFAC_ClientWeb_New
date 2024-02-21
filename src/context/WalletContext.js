import { WALLET } from "hooks/management.hook";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  canWithdraw,
  useUser,
  isVerified,
  hasSecondaryPassword,
} from "./UserContext";
import { find, omit } from "lodash";
import PaymentDepositTransaction from "services/paymentDepositTransaction";
import swal from "sweetalert";
import { useIntl } from "react-intl";
import PaymentWithdrawTransaction from "services/paymentWithdrawTransaction";
import PaymentExchangeTransaction from "services/paymentExchangeTransaction";
import { removeCommaFromPayload } from "helper/common";

const WalletContext = createContext(null);

export function WalletProvider({ children }) {
  const { user, refresh } = useUser();

  const intl = useIntl();
  const t = useCallback((id) => intl.formatMessage({ id }), [intl]);

  const usdtBalance = useMemo(() => {
    return find(user?.wallets, { walletType: WALLET.USDT })?.balance || 0;
  }, [user]);
  const facBalance = useMemo(() => {
    return find(user?.wallets, { walletType: WALLET.FAC })?.balance || 0;
  }, [user]);
  const btcBalance = useMemo(() => {
    return find(user?.wallets, { walletType: WALLET.BTC })?.balance || 0;
  }, [user]);
  const pointBalance = useMemo(() => {
    return find(user?.wallets, { walletType: WALLET.POINT })?.balance || 0;
  }, [user]);

  function depositUsdt(values, callback) {
    // if (isVerified(user) === false) {
    //   return swal(t("kyc_required"), {
    //     icon: "warning",
    //   });
    // }
    PaymentDepositTransaction.requestDeposit({
      paymentAmount: values?.paymentAmount,
    }).then((result) => {
      const { isSuccess, data, error } = result;
      if (isSuccess) {
        // swal(t("deposit_success"), {
        //   icon: "success",
        // });
        refresh();
        window.location = `${process.env.REACT_APP_TORITI_USDT_DIRECT}?tnxRef=${data}`;
      } else {
        swal(errorMessage(error) || t("something_wrong"), {
          icon: "warning",
        });
      }
      if (callback && callback instanceof Function) {
        callback();
      }
    });
  }

  function withdrawUsdt(values, callback) {
    if (canWithdraw(user)) {
      PaymentWithdrawTransaction.requestWithdrawUSDT(values).then((result) => {
        const { isSuccess, error } = result;
        if (isSuccess) {
          swal(t("withdraw_success"), {
            icon: "success",
          });
          refresh();
        } else {
          console.log(
            "%cWalletContext.js line:62 error",
            "color: #007acc;",
            error
          );
          swal(errorMessage(error), {
            icon: "warning",
          });
        }
        if (callback && callback instanceof Function) {
          callback();
        }
      });
    } else {
      if (isVerified(user) === false) {
        swal(t("kyc_required"), {
          icon: "warning",
        });
      } else if (
        hasSecondaryPassword(user) &&
        hasSecondaryPassword(user) !== null
      ) {
        swal(t("secondpass_required"), {
          icon: "warning",
        });
      }
      if (callback && callback instanceof Function) {
        callback();
      }
    }
  }

  function errorMessage(error) {
    return error ? t(error.toLowerCase()) : t("something_wrong");
  }

  function withdrawBtc(values, callback) {
    if (canWithdraw(user)) {
      PaymentWithdrawTransaction.requestWithdrawBTC(
        omit(values, "paymentToAmount")
      ).then((result) => {
        const { isSuccess, error } = result;
        if (isSuccess) {
          swal(t("withdraw_success"), {
            icon: "success",
          });
          refresh();
        } else {
          console.log(
            "%cWalletContext.js line:92 error",
            "color: #007acc;",
            error
          );
          swal(error ? t(error.toLowerCase()) : t("something_wrong"), {
            icon: "warning",
          });
        }
        if (callback && callback instanceof Function) {
          callback();
        }
      });
    } else {
      swal(t("kyc_required"), {
        icon: "warning",
      });
      if (callback && callback instanceof Function) {
        callback();
      }
    }
  }

  function exchangeFac(values, callback) {
    PaymentExchangeTransaction.exchangeFAC(
      omit(removeCommaFromPayload(values), "paymentToAmount")
    ).then((result) => {
      const { isSuccess, message } = result;
      if (isSuccess) {
        swal(t("exchange_fac_success"), {
          icon: "success",
        });
        refresh();
      } else {
        swal(message || t("something_wrong"), {
          icon: "warning",
        });
      }
      if (callback && callback instanceof Function) {
        callback();
      }
    });
  }

  function exchangePoint(values, callback) {
    PaymentExchangeTransaction.exchangePOINT(
      omit(values, "paymentToAmount")
    ).then((result) => {
      const { isSuccess, message } = result;
      if (isSuccess) {
        swal(t("exchange_to_fac_success"), {
          icon: "success",
        });
        refresh();
      } else {
        swal(message || t("something_wrong"), {
          icon: "warning",
        });
      }
      if (callback && callback instanceof Function) {
        callback();
      }
    });
  }

  return (
    <WalletContext.Provider
      value={{
        wallet: {
          usdtBalance,
          facBalance,
          btcBalance,
          pointBalance,
          depositUsdt,
          withdrawUsdt,
          withdrawBtc,
          exchangeFac,
          exchangePoint,
        },
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  return useContext(WalletContext);
}
