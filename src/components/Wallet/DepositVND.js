import { Form, InputNumber } from "antd";
import { ShieldIC } from "assets/icons";
import { useModal } from "context/ModalContext";
import { formatToPrice, formatToNInputPrice } from "helper/common";
import React, { useCallback, useState } from "react";
import { useIntl } from "react-intl";
import ModalWrapper from "./ModalWrapper";
import BankTransferVND from "./BankTransferVND";
import { isNaN } from "lodash";
import { useSystem } from "context/SystemContext";

const FORM = {
  moneyDraw: "paymentAmount",
};

export default function DepositVND() {
  const intl = useIntl();
  const t = useCallback((id) => intl.formatMessage({ id }), [intl]);
  const { system } = useSystem();
  const [loading, setLoading] = useState(false);

  let _price = (Number(system?.exchangeVNDPrice).toFixed(0));
  const priceConver = _price;
  const modal = useModal();

  const [form] = Form.useForm();


  function convertUsdtToVnd(usdt) {
    if (isNaN(usdt)) return 0;
    return Number(usdt * priceConver || 0).toFixed();
  }

  function handleSubmit(values) {
    modal.show({
      title: t("deposit_vnd_wallet"),
      content: (
        <BankTransferVND
          moneyDraw={{
            vnd: convertUsdtToVnd(values[FORM.moneyDraw]),
            usdt: values[FORM.moneyDraw],
          }}
        />
      ),
      transparent: true,
      customClass: "modal-receive-btc",
      headerNode: true,
      headerClassBg: "bg-img-earth",
    });
  }

  return (
    <ModalWrapper>
      <Form
        requiredMark={false}
        size="large"
        layout="vertical"
        className="mb-6"
        form={form}
        onFinish={handleSubmit}
      >
        <div className="d-flex justify-content-between align-items-center px-4 py-3 mb-3 bg-gray">
          <p>{t("recharge")}</p>
        </div>
        <div className="px-4 mt-2">
          <Form.Item
            name={FORM.moneyDraw}
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
                  return Promise.resolve();
                },
              },
            ]}
          >
            <InputNumber
              placeholder="0"
              addonBefore="USDT"
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              formatter={(value) => formatToPrice(value)}
            />
          </Form.Item>

          <div className="divider" />

          {/* Số tiền nạp */}
          <Form.Item
            shouldUpdate
            name="convert_result"
            label={t("deposit_amount_money")}
          >
            <InputNumber
              placeholder="0"
              addonBefore="VND"
              disabled
              className="input-disabled"
              value={convertUsdtToVnd(form.getFieldValue(FORM.moneyDraw))}
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              formatter={(value) => formatToPrice(value)}
            />
            <p style={{ color: "#5479BB", fontSize: 14 }}>
              {t("conversition_price").replace("{price}", formatToNInputPrice(priceConver))}
            </p>
          </Form.Item>

          <div
            style={{ fontSize: 13, color: "#737373", gap: 4 }}
            className="d-flex align-items-center"
          >
            <ShieldIC style={{ flexShrink: 0 }} />
            <p>{t("we_use_ssl")}</p>
          </div>

          <Form.Item>
            <button type="submit" className="btn btn-primary w-100 py-2 mt-3">
              {t("confirm")}
            </button>
          </Form.Item>

          <div>
            <h4
              style={{ fontWeight: 600, fontSize: 15 }}
              className="text-danger"
            >
              {t("attention")}
            </h4>
            <p>
              <abbr className="text-danger">*</abbr>{" "}
              {t("attention_content_despoit_vnd_2")}
            </p>
            <p>
              <abbr className="text-danger">*</abbr>{" "}
              {t("attention_content_despoit_vnd_1")}
            </p>
          </div>
        </div>
      </Form>
    </ModalWrapper>
  );
}
