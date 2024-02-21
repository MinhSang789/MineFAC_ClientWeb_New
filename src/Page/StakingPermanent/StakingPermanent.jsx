import { Form, InputNumber, Select } from "antd";
import Badge from "components/Wallet/Badge";
import { useUser } from "context/UserContext";
import { useWallet } from "context/WalletContext";
import { formatToPrice, formatToNInputPrice } from "helper/common";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useIntl } from "react-intl";
import { MIN_STAKING } from "constants/config";
import { StakingPackageService } from "services/stakingPackage";
import swal from "sweetalert";

const StakingPermanent = ({ stakingPackage, onClose }) => {
  const { user } = useUser();
  const [selectedStakingPackage, setSelectedStakingPackage] = useState(
    stakingPackage[0]
  );
  const [estimateFac, setEstimateFac] = useState(0);
  const intl = useIntl();
  const {
    wallet: { facBalance },
  } = useWallet();
  const t = useCallback((id) => intl.formatMessage({ id }), [intl]);
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    console.log("submit", values);
    const response = await StakingPackageService.requestStaking({
      ...values,
      secondaryPassword: user.secondaryPassword,
      // stakingName: ""
    });
    if (response.isSuccess) {
      swal(t("staking_success"), {
        icon: "success",
      });
      onClose();
    } else {
      swal(t(response.message || "staking_failed"), {
        icon: "warning",
      });
    }
  };

  useEffect(() => {
    setSelectedStakingPackage(stakingPackage[0]);
  }, [stakingPackage]);

  useEffect(() => {
    estimateFAC(
      selectedStakingPackage.stakingInterestRate,
      form.getFieldValue("stackingAmount") ?? 0
    );
  }, [selectedStakingPackage, form]);

  const handleBadgeClick = () => {
    if (facBalance > 0) {
      form.setFieldsValue({
        stackingAmount: facBalance,
      });
      estimateFAC(selectedStakingPackage.stakingInterestRate, +facBalance);
    }
  };

  const options = useMemo(
    () =>
      stakingPackage.map(({ stakingPackageId, stakingPeriod }) => ({
        value: stakingPackageId,
        label: `${stakingPeriod} ${intl.formatMessage({ id: "day" })}`,
      })),
    [stakingPackage, intl]
  );

  const estimateFAC = (rate = 0, amount = 0) =>
    setEstimateFac(
      amount + (rate * amount) / 100
    );

  return (
    <Form
      size="large"
      requiredMark={false}
      className="px-4"
      layout="vertical"
      form={form}
      onFinish={handleSubmit}
      initialValues={{
        stakingId: stakingPackage[0]?.stakingPackageId || 1,
      }}
    >
      <Form.Item
        name="stackingAmount"
        className="m-0 pt-4"
        label={t("money_lock")}
        type="number"
        rules={[
          {
            required: true,
            message: t("money_lock_required"),
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (+value < MIN_STAKING) {
                return Promise.reject(
                  new Error(
                    intl.formatMessage(
                      { id: "min_staking" },
                      { value: formatToPrice(MIN_STAKING) }
                    )
                  )
                );
              }
              return Promise.resolve();
            },
          }),
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (+value > facBalance) {
                return Promise.reject(
                  new Error(intl.formatMessage({ id: "outOfFac" }))
                );
              }
              return Promise.resolve();
            },
          }),
        ]}
      >
        <InputNumber
          placeholder="0"
          addonBefore="Fi "
          addonAfter={<Badge onClick={handleBadgeClick} />}
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          formatter={(value) => formatToPrice(value)}
          onChange={(value) =>
            estimateFAC(selectedStakingPackage.stakingInterestRate, +value)
          }
        />
      </Form.Item>
      <div className="staking__form mb-3">
        <p className="text-price remaining">{`${t(
          "remaining_balance_FAC"
        )} ${formatToNInputPrice(facBalance)}`}</p>
        <p className="text-price red-text">{`${t(
          "money_lock_min"
        )} ${formatToNInputPrice(MIN_STAKING)}`}</p>
      </div>
      <div className="row custom-boostrap-col">
        <div className="col-6 staking__form">
          <div className="label row">
            <span className="">{t("money_lock_time")}</span>
          </div>
          <Form.Item name="stakingId" className="row">
            <Select
              options={options}
              size="large"
              onChange={(value) => {
                setSelectedStakingPackage(
                  stakingPackage.find((data) => data.stakingPackageId === value)
                );
              }}
              disabled={facBalance < MIN_STAKING}
            />
          </Form.Item>
        </div>
        <div className="col-6 staking__form">
          <div className="label">
            <span className="">{t("staking_profit_estimate")}</span>
          </div>
          <div className="content">
            <span>{`${selectedStakingPackage?.stakingInterestRate}%/ ${
              selectedStakingPackage?.stakingPeriod
            } ${intl.formatMessage({ id: "days" })}`}</span>
          </div>
        </div>
      </div>
      <div className="staking__form">
        <div className="label">
          <span>{t("staking_profit_timeout")}</span>
        </div>
        <div className="content">
          <span>{formatToNInputPrice(estimateFac)}</span>
        </div>
      </div>
      <div
        className="d-flex justify-content-center w-100 staking__form"
        style={{ marginTop: "60px" }}
      >
        <button type="button" className="btn btn-primary bg-black me-4">
          {t("cancel")}
        </button>
        <button
          type="submit"
          className="btn btn-primary "
          disabled={facBalance < MIN_STAKING}
        >
          {t("confirm")}
        </button>
      </div>
    </Form>
  );
};

export default StakingPermanent;
