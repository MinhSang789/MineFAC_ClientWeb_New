import { ArrowDownOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { Form, Input, InputNumber, Button } from "antd";
import { routes } from "App";
import { useModal } from "context/ModalContext";
import { useSystem } from "context/SystemContext";
import { useWallet } from "context/WalletContext";
import { formatToUSDTPrice } from "helper/common";
import { formatToFACPrice, formatToPrice, formatToNInputPrice } from "helper/common";
import TransactionHistory from "Page/TransactionHistory";
import React, { useCallback, useState } from "react";
import { useIntl } from "react-intl";
import swal from "sweetalert";
import Badge from "./Badge";
import ModalWrapper from "./ModalWrapper";

export default function ExchangeFac({ history }) {
  const intl = useIntl();
  const modal = useModal();
  const { facPrice } = useSystem();
  const {
    wallet: { facBalance, exchangeFac },
  } = useWallet();
  const t = useCallback((id) => intl.formatMessage({ id }), [intl]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  function handleSubmit(values) {
    setLoading(true);
    exchangeFac(values, () => {
      setLoading(false);
      form.resetFields();
    });
  }
  function handleExchangeHistoryClick() {
    modal.show({
      title: t("history_modal"),
      content: <TransactionHistory defaultActiveKey="4" />,
    });
  }
  function handleBadgeClick() {
    if (facBalance > 0) {
      form.setFieldsValue({
        paymentAmount: facBalance,
        paymentToAmount: facBalance * facPrice,
      });
    }
  }
  function handleFieldChange(type, value) {
    switch (type) {
      case "fac":
        form.setFieldsValue({
          paymentToAmount: formatToUSDTPrice(value * facPrice, false, false),
        });
        break;
      case "usdt":
        form.setFieldsValue({
          paymentAmount: formatToNInputPrice(value),
        });
        break;
      default:
        break;
    }
  }
  function handleBtnOutlinedClick(e) {
    history.push(routes.managementPacket.path);
    modal.hide();
  }
  return (
    <ModalWrapper>
      <Form
        size="large"
        requiredMark={true}
        className="px-4"
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="paymentAmount"
          label={t("exchange_fac_amount")}
          className="mb-1"
          rules={[
            {
              required: true,
              message: t("exchange_fac_amount_required"),
            },
            {
              validator(_, value) {
                if (isNaN(value) || value === null) {
                  return Promise.resolve();
                }

                if (parseFloat(value) <= facBalance) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error(t('outOfBalance'))
                );
              },
            },
          ]}
        >
          <InputNumber
            addonBefore="Fi "
            addonAfter={<Badge onClick={handleBadgeClick} />}
            placeholder="0"
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            onChange={(value) => handleFieldChange("fac", value)}
            formatter={(value) => formatToFACPrice(value, false, false)}
          />
        </Form.Item>
        <span className="text-blue">{`${t(
          "remaining_balance"
        )} ${formatToNInputPrice(facBalance)}`}</span>
        <div className="center-vertical my-3">
          <div className="center w-100">
            <div className="divider border-top-blue pe-2 w-50"></div>
            <button className="btn btn-outline-blue p-2 rounded-circle center">
              <ArrowDownOutlined className="text-blue fs-6" />
            </button>
            <div className="divider border-top-blue ps-2 w-50"></div>
          </div>
        </div>
        <Form.Item
          name="paymentToAmount"
          className="mb-1"
          label={t("receive_usdt_amount")}
        >
          <InputNumber
            addonBefore="USDT"
            placeholder="0"
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            onChange={handleFieldChange}
            formatter={(value) => formatToUSDTPrice(value, false, false)}
          />
        </Form.Item>
        <span className="text-blue">{`${t(
          "current_fac_price"
        )}: 1 Fi = ${facPrice}`}</span>
        <div className="center-vertical bg-orange-200 text-orange py-2 px-3 mt-3">
          <ExclamationCircleFilled />
          <p className="ms-2">{t("fac_note")}</p>
        </div>
        <Button
        loading={loading} htmlType="submit" className="btn btn-primary w-100 py-2 mt-3">
          {t("confirm")}
        </Button>
        <button
          type="button"
          className="btn btn-outline-primary w-100 py-2 mt-3"
          onClick={handleBtnOutlinedClick}
        >
          {t("fac_increase_performance")}
        </button>
        <div className="center-horizontal">
          <button
            type="button"
            className="btn btn-link text-dark mt-2"
            onClick={handleExchangeHistoryClick}
          >
            {t("exchange_history")}
          </button>
        </div>
      </Form>
    </ModalWrapper>
  );
}
