import { Button, Form, Input, InputNumber, Select } from "antd";
import { ShieldIC } from "assets/icons";
import { useSystem } from "context/SystemContext";
import { useUser } from "context/UserContext";
import { useWallet } from "context/WalletContext";
import { formatToNInputPrice, formatToPrice } from "helper/common";
import { useManagement } from "hooks/management.hook";
import { usePaymentMethods } from "hooks/usePaymentMethod";
import React, { useCallback, useEffect, useMemo,useState } from "react";
import { useIntl } from "react-intl";
import Badge from "./Badge";
import ModalWrapper from "./ModalWrapper";
import ApppUsers from "services/apppUsers";
import { isEmpty } from "lodash";
import { ArrowDownOutlined } from "@ant-design/icons";
import DividerExternal from "components/DividerExternal";

const FORM = {
  accountHolder: "tentaikhoan",
  accountNumber: "sotaikhoan",
  bank: "tennganhang",
  amountDraw: "paymentAmount",
  passDraw: "secondaryPassword",
  amountVND: "paymentRefAmount",
};

const bankOptions = [
  { value: "Vietcom Bank", label: "Vietcom Bank" },
  { value: "Exim Bank", label: "Exim Bank" },
  { value: "Vietin Bank", label: "Vietin Bank" },
  { value: "SacomBank", label: "SacomBank" },
  {
    value: "Vietnam Prosperity Joint-Stock Commercial Bank",
    label: "Vietnam Prosperity Joint-Stock Commercial Bank",
  },
  { value: "Techcom", label: "Techcom Bank" },
  { value: "BIDV Bank", label: "BIDV Bank" },
  { value: "MB Bank", label: "MB Bank" },
  { value: "KienLong Bank", label: "KienLong Bank" },
  { value: "HD Bank", label: "HD Bank" },
  { value: "SHB Bank", label: "SHB Bank" },
  { value: "SCB Bank", label: "SCB Bank" },
  { value: "ACB Bank", label: "ACB Bank" },
  { value: "AB Bank", label: "AB Bank" },
  { value: "Agri Bank", label: "Agri Bank" },
  { value: "Bac A Bank", label: "Bac A Bank" },
  { value: "BaoViet Bank", label: "BaoViet Bank" },
  { value: "DONGA Bank", label: "DONGA Bank" },
  { value: "GP Bank", label: "GP Bank" },
  { value: "INDOVINA Bank", label: "INDOVINA Bank" },
  { value: "LienViet Post Bank", label: "LienViet Post Bank" },
  { value: "Maritime", label: "Maritime Bank" },
  { value: "Nam A Bank", label: "Nam A Bank" },
  { value: "Navi Bank", label: "Navi Bank" },
  { value: "NCB", label: "NCB" },
  { value: "OCB (PHUONG DONG)", label: "OCB (PHUONG DONG)" },
  { value: "PG Bank", label: "PG Bank" },
  { value: "PVCOM Bank", label: "PVCOM Bank" },
  { value: "SaiGon Bank", label: "SaiGon Bank" },
  { value: "SaA Bank", label: "SaA Bank" },
  { value: "ShinHan Bank", label: "ShinHan Bank" },
  { value: "Tien Phong Bank", label: "Tien Phong Bank" },
  { value: "United Overseas Bank", label: "United Overseas Bank" },
  { value: "VIB Bank", label: "VIB Bank" },
  { label: "VietABank", value: "VietABank" },
  { label: "VPBANK", value: "VPBANK" },
];

export default function WithdrawVnd() {
  const { user } = useUser();
  const intl = useIntl();

  const {
    wallet: { usdtBalance, withdrawUsdt },
  } = useWallet();
  const [loading, setLoading] = useState(false);

  const { system } = useSystem();
  let _price = (Number(system?.exchangeVNDPrice).toFixed(0));
  const priceConver = _price;

  const t = useCallback((id) => intl.formatMessage({ id }), [intl]);
  const [form] = Form.useForm();

  const initialValue = {
    [FORM.accountHolder]: user?.[FORM.accountHolder],
    [FORM.accountNumber]: user?.[FORM.accountNumber],
    [FORM.bank]: user?.[FORM.bank],
    [FORM.amountDraw]: 0,
    [FORM.passDraw]: "",
    [FORM.amountVND]: 0,
  };

  function handleBadgeClick() {
    form.setFieldsValue({
      [FORM.amountDraw]: usdtBalance,
    });
  }

  function convertUsdtToVnd() {
    const usdt = form.getFieldValue(FORM.amountDraw);
    if (isNaN(usdt)) return 0;
    return Number(usdt * priceConver || 0).toFixed();
  }

  async function handleSubmit(values) {
    const dataToUpdate = Object.keys(values).reduce((pre, cur) => {
      if (user?.[cur] !== values?.[cur]) pre[cur] = values[cur];
      return pre;
    }, {});
    if (dataToUpdate?.[FORM.accountNumber]) {
      dataToUpdate[FORM.accountNumber] =
        dataToUpdate[FORM.accountNumber].toString();
    }
    delete dataToUpdate[FORM.passDraw];
    delete dataToUpdate[FORM.amountDraw];
    delete dataToUpdate[FORM.amountVND];

    setLoading(true);
    Promise.all([
      withdrawUsdt({
        [FORM.amountDraw]: values[FORM.amountDraw],
        [FORM.passDraw]: values[FORM.passDraw],
        paymentCategory: "ATM/BANK",
        [FORM.amountVND]: convertUsdtToVnd(),
      }, () => {
        setLoading(false);
      }),
      ...(!isEmpty(dataToUpdate)
        ? [
            ApppUsers.updateInfoUser({
              data: dataToUpdate,
              id: user?.appUserId,
            }),
          ]
        : []),
    ]).then(() => {
      form.resetFields();
    });
  }

  return (
    <ModalWrapper>
      <Form
        size="large"
        requiredMark={false}
        className="px-4"
        layout="vertical"
        initialValues={initialValue}
        form={form}
        onFinish={handleSubmit}
      >
        <Form.Item
          name={FORM.accountHolder}
          label={t("label_account_holder")}
          rules={[
            {
              required: true,
              message: t("tentaikhoan_required"),
            },
          ]}
        >
          <Input disabled={user?.[FORM.accountHolder]} className="w-100" />
        </Form.Item>

        <Form.Item
          name={FORM.accountNumber}
          label={t("label_account_number")}
          rules={[
            {
              required: true,
              message: t("sotaikhoan_required"),
            },
          ]}
        >
          <Input disabled={user?.[FORM.accountNumber]} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          rules={[
            {
              required: true,
              message: t("tennganhang_required"),
            },
          ]}
          name={FORM.bank}
          label={t("label_bank")}
        >
          <Select
            showSearch
            disabled={user?.[FORM.bank]}
            optionFilterProp="children"
            filterOption={(input, opt) => {
              return opt?.label.toLowerCase().includes(input.toLowerCase());
            }}
            options={bankOptions}
          />
        </Form.Item>

        <Form.Item
          name={FORM.amountDraw}
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

        <DividerExternal>
          <Form.Item shouldUpdate name={FORM.amountVND}>
            <InputNumber
              placeholder="0"
              addonBefore="VND"
              disabled
              className="input-disabled"
              value={convertUsdtToVnd()}
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              formatter={(value) => formatToPrice(value)}
            />
            <p style={{ color: "#5479BB", fontSize: 14 }}>
              {t("conversition_price").replace("{price}", formatToNInputPrice(priceConver))}
            </p>
          </Form.Item>
        </DividerExternal>

        <Form.Item
          name={FORM.passDraw}
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

        <div
          style={{ fontSize: 13, color: "#737373", gap: 4 }}
          className="d-flex align-items-center"
        >
          <ShieldIC style={{ flexShrink: 0 }} />
          <p>{t("we_use_ssl")}</p>
        </div>

        <Form.Item>
          <Button
            loading={loading}
            disabled={form.loading}
            htmlType="submit"
            className="btn btn-primary w-100 py-2 mt-3"
          >
            {t("confirm")}
          </Button>
        </Form.Item>
      </Form>
    </ModalWrapper>
  );
}
