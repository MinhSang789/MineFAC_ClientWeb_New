import { CopyFilled } from "@ant-design/icons";
import { Collapse, message, Spin, Button } from "antd";
import { useModal } from "context/ModalContext";
import { useUser } from "context/UserContext";
import { useWallet } from "context/WalletContext";
import { simpleCopyToClipboard, formatToNInputPrice } from "helper/common";
import { usePaymentMethods } from "hooks/usePaymentMethod";
import React, { useCallback, useMemo, useState } from "react";
import { useIntl } from "react-intl";
import ModalWrapper from "./ModalWrapper";

const TextWithCopy = ({ title, valueCopy }) => (
  <div
    style={{ color: "#047B73" }}
    className="d-flex justify-content-between align-items-center"
  >
    <p>{title}</p>
    <div>
      <span style={{ fontWeight: 600 }}>{valueCopy}</span>
      <span
        className="rounded-circle p-1 d-inline-flex align-items-center"
        role="button"
        onClick={() => {
          simpleCopyToClipboard(valueCopy);
        }}
      >
        <CopyFilled style={{ color: "#ACACAC" }} />
      </span>
    </div>
  </div>
);

export default function BankTransferVND({ moneyDraw }) {
  const intl = useIntl();
  const { user } = useUser();
  const modal = useModal();
  const t = useCallback((id) => intl.formatMessage({ id }), [intl]);
  const [loadingSm, setLoadingSm] = useState(false);

  const {
    wallet: { depositUsdt },
  } = useWallet();

  const { data, loading } = usePaymentMethods();

  const banks = useMemo(
    () =>
      data?.length > 0 &&
      data?.map((method) => ({
        header: method.paymentMethodReferName,
        content: () => (
          <div>
            <TextWithCopy
              title={t("account_number")}
              valueCopy={method?.paymentMethodIdentityNumber}
            />
            <TextWithCopy
              title={t("account_holder")}
              valueCopy={method?.paymentMethodReceiverName}
            />
          </div>
        ),
      })),
    [data]
  );

  const onConfirm = () => {
    setLoadingSm(true);
    depositUsdt(
      {
        paymentAmount: moneyDraw.usdt,
        paymentRefAmount: Number(moneyDraw.vnd),
        paymentCategory: "ATM/BANK",
      },
      () => {
        setLoadingSm(false);
        modal.hide();
        message.success(t("thank_for_despoit"));
      }
    );
  };

  return (
    <ModalWrapper>
      <div className="d-flex justify-content-between align-items-center px-4 py-3 bg-gray">
        <p>{t("bank_transfer")}</p>
      </div>

      <div className="px-4">
        <p>{t("select_bank")}:</p>
        <ul>
          <li>
            {t("follow_content")}:{" "}
            <span className="text-danger" style={{ fontWeight: 400 }}>
              {user ? user.username.split("@")[0] : 'username'}
            </span>
            <span
              className="rounded-circle p-1 d-inline-flex align-items-center"
              role="button"
              onClick={() => {
                simpleCopyToClipboard(user.username.split("@")[0]);
              }}
            >
              <CopyFilled style={{ color: "#ACACAC" }} />
            </span>
          </li>
          <li>
            {t("money_need_transfer")}:{" "}
            <span className="text-danger" style={{ fontWeight: 400 }}>
              {formatToNInputPrice(Number(moneyDraw.vnd))}
            </span>
            <span
              className="rounded-circle p-1 d-inline-flex align-items-center"
              role="button"
              onClick={() => {
                simpleCopyToClipboard(moneyDraw.vnd);
              }}
            >
              <CopyFilled style={{ color: "#ACACAC" }} />
            </span>
          </li>
        </ul>
      </div>

      {loading ? (
        <Spin />
      ) : (
        <Collapse bordered={false} defaultActiveKey={["1"]}>
          {banks &&
            banks?.map(({ header, content: Content }, index) => (
              <Collapse.Panel
                header={
                  <h3
                    className="mb-0"
                    style={{
                      fontSize: 20,
                      fontWeight: 500,
                      lineHeight: "44px",
                    }}
                  >
                    {header}
                  </h3>
                }
                key={index + 1}
              >
                <Content />
              </Collapse.Panel>
            ))}
        </Collapse>
      )}

      <div className="px-4">
        <Button
          loading={loadingSm}
          style={{ marginBottom: 10 }}
          onClick={onConfirm}
          className="btn btn-primary w-100 py-2 mt-3"
        >
          {t("confirm")}
        </Button>

        <div>
          <h4 style={{ fontWeight: 600, fontSize: 15 }} className="text-danger">
            {t("attention")}:
          </h4>
          <p>
            <span className="text-danger">*</span>{" "}
            {t("attention_when_transfer")}
          </p>
        </div>
      </div>
    </ModalWrapper>
  );
}
