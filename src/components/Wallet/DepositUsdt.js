import { Form, InputNumber, Button } from "antd";
import { IconShield } from "assets/icons";
import { useModal } from "context/ModalContext";
import { useWallet } from "context/WalletContext";
import { formatToUSDTPrice } from "helper/common";
import TransactionHistory from "Page/TransactionHistory";
import React, { useCallback, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import ModalWrapper from "./ModalWrapper";

export default function DepositUsdtForm() {
  const [form] = Form.useForm();
  const modal = useModal();
  const {
    wallet: { depositUsdt },
  } = useWallet();
  const intl = useIntl();
  const t = useCallback((id) => intl.formatMessage({ id }), [intl]);
  const [loading, setLoading] = useState(false);
  function handleSubmit(values) {
    setLoading(true);
    depositUsdt({ ...values, paymentCategory: "BLOCKCHAIN" }, () => {
      setLoading(false);
      form.resetFields();
    });
  }
  function handleHistoryBtnClick() {
    modal.show({
      title: t("history_modal"),
      content: <TransactionHistory />,
    });
  }
  const handleInputNumber = (value) => {
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(value) || value === "" || value === "-") {
      console.log("test đúng ", value);
      form.setFieldsValue({ paymentAmount: value });
    } else {
      console.log("test sai ", value);
    }
  };
  useEffect(() => {
    form.resetFields();
  }, []);
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
        <Form.Item
          name="paymentAmount"
          label={t("deposit_amount2")}
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

                if (parseFloat(value) >= 10) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error(t("minimumDepositBalance")));
              },
            },
          ]}
        >
          <InputNumber
            placeholder="0"
            addonBefore="USDT"
            formatter={(value) => formatToUSDTPrice(value, false, false)}
            onChange={handleInputNumber}
          />
        </Form.Item>
        {/* <Form.Item
          name="paymentRef"
          label={t("transaction_id")}
          rules={[
            {
              required: true,
              message: t("transaction_id_required"),
            },
          ]}
        >
          <Input placeholder={t("transaction_id")} />
        </Form.Item> */}
        <div className="center-vertical mt-4">
          <IconShield />
          <p className="ms-2">{t("deposit_note")}</p>
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
            {t("usdt_deposit_history")}
          </button>
        </div>
        <div>
            <h4
              style={{ fontWeight: 600, fontSize: 15 }}
              className="text-danger"
            >
              {t("attention")}
            </h4>
            <p>
              <abbr className="text-danger">*</abbr>{" "}
              {t("attention_content_despoit_vnd_1")}
            </p>
          </div>
      </Form>
    </ModalWrapper>
  );
}
