import { RightOutlined } from "@ant-design/icons";
import { WalletCircle } from "assets/icons";
import { WalletCircle2 } from "assets/icons";
import { useModal } from "context/ModalContext";
import { WALLET } from "hooks/management.hook";
import React, { useCallback } from "react";
import { useIntl } from "react-intl";
import ModalWrapper from "./ModalWrapper";
import WithdrawUdt from "./WithdrawUsdt";
import WithdrawVnd from "./WithdrawVnd"

export default function WithdrawForm() {
  const intl = useIntl();
  const t = useCallback((id) => intl.formatMessage({ id }), [intl]);
  const modal = useModal();

  function openDepositModal(depositType) {
    const title = {
      [WALLET.USDT]: t("withdraw_usdt"),
      [WALLET.VND]: t("withdraw_vnd"),
    }[depositType];

    const content = {
      [WALLET.USDT]: <WithdrawUdt />,
      [WALLET.VND]:  <WithdrawVnd />,
    }[depositType];

    modal.show({
      title,
      content,
      transparent: true,
      customClass: "modal-receive-btc",
      headerNode: true,
      headerClassBg: "bg-img-earth",
    });
  }

  return (
    <ModalWrapper>
      <div
        className="d-flex justify-content-between align-items-center px-4 py-3"
        role="button"
        onClick={() => openDepositModal(WALLET.USDT)}
      >
        <WalletCircle2 />
        <div className="d-flex flex-column ms-2 me-auto">
          <p className="center-vertical m-0">
            <span style={{ marginRight: "8px" }}>{t("withdraw_usdt")}</span>
          </p>
        </div>
        <RightOutlined />
      </div>

      <div className="divider"></div>

      <div
        className="d-flex justify-content-between align-items-center px-4 py-3"
        role="button"
        onClick={() => openDepositModal(WALLET.VND)}
      >
        <WalletCircle />
        <div className="d-flex flex-column ms-2 me-auto">
          <p className="center-vertical m-0">
            <span style={{ marginRight: "8px" }}>{t("withdraw_vnd")}</span>
          </p>
        </div>
        <RightOutlined />
      </div>

      <div className="divider"></div>
    </ModalWrapper>
  );
}
