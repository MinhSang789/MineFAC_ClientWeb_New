import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useModal } from "context/ModalContext";
import { useUser } from 'context/UserContext';
import AppUsers from 'services/apppUsers';
import OtpInput from 'react-otp-input';
import swal from 'sweetalert';
import "./index.scss";

import {
  Form,
  Button
} from "antd";

const ConfirmAuth = (props) => {
  const { user, refresh } = useUser();
  const [otp, setOTP] = useState("");
  const [checkOtp, setCheckOtp] = useState(true);
  const { history } = props;
  const modal = useModal();

  const onChangeOtpInput = (e) => {
    setOTP(e);
    props.setOtp && props.setOtp(e)
  }
  // useIntl template
  const intl = useIntl();

  const t = useCallback(
    (id) => {
      return intl.formatMessage({ id });
    },
    [intl]
  );
  return (
    <section className="authenticator__2fa">
      <div>
          <div className="authenticator__2fa__auth__grp--shied-img center-horizontal my-4">
            <img src="/assets/images/shield-key.png" alt="qr-code" /></div>
          <div className="authenticator__2fa__auth__grp--confirm-title">{t("input_code")}</div>
          <div className="authenticator__2fa__auth__grp--confirm-content">{t("input_code_content")}</div>
        <Form name="confirmOtpForm" autoComplete="off" onFinish={(data) => {
              console.log('data ', data);
              AppUsers.verify2FA({
                id: user.appUserId,
                otpCode: data.otpCode
              }).then(result => {
                const { isSuccess, data } = result
                if (isSuccess) {
                  swal(t("verify_success"), {
                    icon: "success",
                  });
                  refresh();
                  modal.hide();
                  history.push("/");
                } else {
                  swal(t("verify_fail"), {
                    icon: "error",
                  });
                }
              })
        }}>
          <Form.Item name="otpCode" className={`mb-1 ${checkOtp ? "otp__input-otp" : "otp__input-error-otp"}`}>
            <OtpInput
              numInputs={6}
              isInputNum={true}
              className="m-auto"
              onChange={value => onChangeOtpInput(value)}
              separator={<span className=""></span>}
            />
          </Form.Item>
          <div
            style={{
              marginTop: 12,
              visibility: checkOtp ? "hidden" : "visible"
            }}
            className="otp__error_otp"
            id="checkOtp"
          >{intl.formatMessage({id: "invalidOTP"})}</div>
          <Button
            className={`otp__button ${otp.length === 6 ? 'active' : ""}`}
            disabled={otp.length !== 6}
            size="large"
            htmlType="submit"
          >
            {intl.formatMessage({id:"confirm"})}
          </Button>
        </Form>
      </div>
    </section>
  )
}

export default ConfirmAuth