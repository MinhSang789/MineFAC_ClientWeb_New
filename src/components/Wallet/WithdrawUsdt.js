import { Form, Input, InputNumber, Button } from "antd";
import { IconShield } from "assets/icons";
import { useModal } from "context/ModalContext";
import { useUser } from "context/UserContext";
import { useWallet } from "context/WalletContext";
import { formatToNInputPrice, formatToPrice } from "helper/common";
import TransactionHistory from "Page/TransactionHistory";
import React, { useCallback, useState } from "react";
import { useIntl } from "react-intl";
import Badge from "./Badge";
import ModalWrapper from "./ModalWrapper";

export default function WithdrawUdt() {
  const { user } = useUser();
  const intl = useIntl();
  const modal = useModal();
  const [loading, setLoading] = useState(false);
  const {
    wallet: { usdtBalance, withdrawUsdt },
  } = useWallet();
  const t = useCallback((id) => intl.formatMessage({ id }), [intl]);
  const [form] = Form.useForm();
  function handleSubmit(values) {
    setLoading(true);
    withdrawUsdt({ ...values, paymentCategory: "BLOCKCHAIN" }, () => {
      setLoading(false);
      form.resetFields();
    });
  }
  function handleHistoryBtnClick() {
    modal.show({
      title: t("history_modal"),
      content: <TransactionHistory defaultActiveKey="2" />,
    });
  }
  function handleBadgeClick() {
    form.setFieldsValue({
      paymentAmount: usdtBalance,
    });
  }
  return (
    <ModalWrapper>
      <Form
        size="large"
        requiredMark={false}
        className="px-4"
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
      >
        <p className="text-dark fw-semibold">{`${t(
          "wallet_address"
        )}(TRC20)`}</p>
        <p className="text-primary px-2 py-2 bg-gray mt-2">
          {user?.diachiviUSDT}
        </p>
        <div className="divider my-3"></div>
        <Form.Item
          name="paymentAmount"
          label={t("withdraw_amount")}
          rules={[
            {
              required: true,
              message: t("withdraw_amount_required"),
            },
            {
              validator(_, value) {
                if (isNaN(value) || value === null) {
                  return Promise.resolve();
                }

                if (parseFloat(value) > usdtBalance) {
                  return Promise.reject(new Error(t("outOfBalance")));
                }

                if (parseFloat(value) < 10) {
                  return Promise.reject(new Error(t("minimumWithdrawBalance")));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <InputNumber
            placeholder="0"
            addonBefore="USDT"
            addonAfter={<Badge onClick={handleBadgeClick} />}
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            formatter={(value) => formatToPrice(value)}
          />
        </Form.Item>
        <span className="text-blue">{`${t(
          "remaining_balance"
        )} ${formatToNInputPrice(usdtBalance)}`}</span>
        <Form.Item
          name="secondaryPassword"
          label={t("withdraw_password")}
          className="mt-3"
          rules={[
            {
              required: true,
              message: t("withdraw_password_required"),
            },
            {
              min: 6,
              message: t("invalidPass"),
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <div className="center-vertical mt-4">
          <IconShield />
          <p className="ms-2" style={{ fontSize: "13px" }}>
            {t("deposit_note")}
          </p>
        </div>
        <Button htmlType="submit" 
        loading={loading}
        className="btn btn-primary w-100 py-2 mt-3">
          {t("confirm")}
        </Button>
        <div className="center-horizontal">
          <button
            type="button"
            className="btn btn-link text-dark mt-2"
            onClick={handleHistoryBtnClick}
          >
            {t("withdraw_usdt_history")}
          </button>
        </div>
      </Form>
    </ModalWrapper>
  );
}
