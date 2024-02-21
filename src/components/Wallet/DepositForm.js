import { RightOutlined } from "@ant-design/icons";
import { WalletCircle } from "assets/icons";
import { QrCode } from "assets/icons";
import { useModal } from "context/ModalContext";
import { WALLET } from "hooks/management.hook";
import React, { useCallback } from "react";
import { useIntl } from "react-intl";
import DepositAddress from "./DepositAddress";
import DepositVND from "./DepositVND";
import ModalWrapper from "./ModalWrapper";

export default function DepositForm() {
  const intl = useIntl();
  const t = useCallback((id) => intl.formatMessage({ id }), [intl]);
  const modal = useModal();

  function openDepositModal(depositType) {
    const title = {
      [WALLET.USDT]: t("deposit_usdt"),
      [WALLET.VND]: t("deposit_vnd_wallet"),
    }[depositType];

    const content = {
      [WALLET.USDT]: <DepositAddress />,
      [WALLET.VND]: <DepositVND />,
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
        <QrCode />
        <div className="d-flex flex-column ms-2 me-auto">
          <p className="center-vertical m-0">
            <span style={{ marginRight: "8px" }}>
              {t("deposit_usdt_wallet")}
            </span>
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
            <span style={{ marginRight: "8px" }}>
              {t("deposit_vnd_wallet")}
            </span>
          </p>
        </div>
        <RightOutlined />
      </div>

      <div className="divider"></div>
    </ModalWrapper>
  );
}
