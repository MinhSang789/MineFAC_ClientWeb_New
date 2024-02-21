import React, { useCallback, useEffect, useState, useMemo } from "react";
import { useIntl } from "react-intl";
import { Modal, Form, InputNumber, Button } from 'antd';
import { ModalWrapper } from "components/Wallet";
import { IconFAC } from "../../assets/icons/index";
import { useUser } from "context/UserContext";
import { formatToNInputPrice, formatToPrice } from 'helper/common';
import { find, set } from "lodash";
import { WALLET } from "hooks/management.hook";
import PaymentMethod from "services/paymentMethod";
import swal from 'sweetalert';
import "./index.scss";

const Xpay = (props) => {
  const { user, refresh } = useUser();
  const [isModal, setIsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState('deposit');
  const [form] = Form.useForm();
  const facWallet = useMemo(() => {
    return find(user.wallets, { walletType: WALLET.FAC }) || null;
  }, [user.wallets]);
  const pointWallet = useMemo(() => {
    return find(user.wallets, { walletType: WALLET.POINT }) || null;
  }, [user.wallets]);
  // useIntl template
  const intl = useIntl();

  const t = useCallback(
    (id) => {
      return intl.formatMessage({ id });
    },
    [intl]
  );
  const handleClickBtn = (val) => {
    setIsLoading(true);
    PaymentMethod.loginExternal().then((loginExternalResult) => {
      if (loginExternalResult.isSuccess) {
        if (mode == "deposit") {
          PaymentMethod.requestDepositExternal({ paymentAmount: val.amount, paymentReceiver: "PTS", sendWalletId: facWallet.walletId }).then(async (result) => {
            const { isSuccess } = result;
            setIsLoading(false);
            if (isSuccess) {
              swal(t("exchange_external_success"), {
                icon: "success",
              });
              refresh();
              setIsModal(false);
              form.resetFields();
            } else {
              swal(t("exchange_external_fail"), {
                icon: "error",
              });
            }
          })
        } else {
          PaymentMethod.requestWithdrawExternal({ receiveAmount: val.amount, paymentReceiver: "PTS", receiveWalletId: pointWallet.walletId }).then(async (result) => {
            const { isSuccess } = result;
            setIsLoading(false);
            if (isSuccess) {
              swal(t("exchange_external_success"), {
                icon: "success",
              });
              refresh();
              setIsModal(false);
              form.resetFields();
            } else {
              swal(t("exchange_external_fail"), {
                icon: "error",
              });
            }
          })
        }
      } else {
        if (mode == "deposit") {
          swal(t("exchange_external_fail"), {
            icon: "error",
          });
        } else {
          swal(t("exchange_external_fail"), {
            icon: "error",
          });
        }
      }
    })
  };
  return (
    <>
    <ModalWrapper dark isTop hideAvatar>
      <div className="xpay-bg d-flex align-items-center flex-column p-3">
        <img src="/assets/images/xpay-bg.png" alt="Box2" />
      </div>
      <div className="d-flex justify-content-between align-items-center px-4 py-3 mt-3 bg-gray">
        <IconFAC />
        <p className="fw-500 ms-2 me-auto">{t("fac_wallet")}</p>
        <p className="h3 fw-500">{formatToNInputPrice(facWallet?.balance)}</p>
      </div>
      <div className="xpay-btn d-flex justify-content-around align-items-center px-4 py-3 mt-3">
        <Button
          className="join-btn d-flex align-items-center justify-content-center"
          type="primary"
          size="large"
          onClick={() => {
            window.location.replace(`https://pts.game.finetwork.io/loginExternal?token=${user.token}`);
            //window.location.replace(`http://localhost:3001/loginExternal?token=${user.token}`);
          }}
        >
         {t('join')}
        </Button>
        <Button
          className="deposit-btn d-flex align-items-center justify-content-center"
          type="primary"
          size="large"
          onClick={() => {
            setMode('deposit');
            setIsModal(true);
          }}
        >
          {t('recharge')}
        </Button>
        <Button
          className="deposit-btn d-flex align-items-center justify-content-center"
          type="primary"
          size="large"
          onClick={() => {
            setMode('withdraw');
            setIsModal(true);
          }}
        >
          {t('withdraw')}
        </Button>
      </div>
    </ModalWrapper>
    <Modal
        title={mode === 'deposit' ? t('recharge') : t('withdraw')}
        closable={false}
        footer={false}
        className="modalXPay"
        open={isModal}
        centered
        okText={t('confirm')}
        cancelText={t('back')}
        onCancel={() => {
          setIsModal(false);
        }}
      ><Form
        requiredMark={false}
        size="large"
        layout="vertical"
        className="mb-6"
        form={form}
        onFinish={(value) => handleClickBtn(value)}
      ><div className="xpay-label-input">{mode === 'deposit' ? t('input_amount') : t('input_amount_withdraw')}</div>
          <Form.Item
            name="amount"
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
                  if (mode === 'deposit' && parseFloat(value) > facWallet.balance) {
                    return Promise.reject(
                      new Error(t("outOfFac"))
                    );
                  }
                  if (mode === 'withdraw' && parseFloat(value) > 100000000) {
                    return Promise.reject(
                      new Error(t("maxWithdrawBalance"))
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <InputNumber
              placeholder="0.000"
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              formatter={(value) => formatToPrice(value)}
              className="xpay-input"
            />
          </Form.Item>
          <div className="w-100 d-flex justify-content-around xpay-btn">
            <Button
              className="btn-back blue_button"
              type="submit"
              size="large"
              onClick={() => {
                setIsModal(false);
                form.resetFields();
              }}
              loading={isLoading}
            >
              {t('back')}
            </Button>
            <Button
              className="btn-confirm blue_button"
              loading={isLoading}
              htmlType="submit"
              size="large">
              {t('confirm')}
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default Xpay;
