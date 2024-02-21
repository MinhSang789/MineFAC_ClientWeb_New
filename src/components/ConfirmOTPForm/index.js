import React, { useState, useEffect } from "react";
import {
  Form,
  Button
} from "antd";
import OtpInput from 'react-otp-input';
import "./index.scss"
import { injectIntl } from "react-intl";

let counter = 60

function ConfirmOtpForm(props) {
  const [checkOtp, setCheckOtp] = useState(true);
  const [isCount, setIsCount] = useState(true)
  const [otp, setOTP] = useState("");
  const { intl, nextTab } = props;
  const onChangeOtpInput = (e) => {
    setOTP(e);
    props.setOtp && props.setOtp(e)
  }

  useEffect(() => {
    async function check() {
      if (otp.length === 6) {
        if (props.handleVerifyOTP && await props.handleVerifyOTP(otp)) {
          props.setNextTab && props.setNextTab()
          setIsCount(false)
        } else {
          setCheckOtp(false)
        }
      }
    }
    check(); 
  }, [otp]);

  useEffect(() => {
    let timer

    function countdown() {
      timer = window.setInterval(function () {
        const timerHtml = document.getElementById("timer");
        if (counter < 60 && timerHtml) { // I want it to say 1:00, not 60
          timerHtml.innerHTML = `(${counter}s)`;
        }
        if (counter > 0) { // so it doesn't go to -1
          counter--;
        } else {
          if (timerHtml) {
            document.getElementById("timer").innerHTML = ``;
            clearInterval(timer);
          }
        }
      }, 1000); // every second
    }
    if (nextTab === 'otp' || isCount) {
      countdown();
    }
  }, [nextTab, isCount])

  return (
    <div className="otp">
      <div className="otp__title">{intl.formatMessage({id: "verifyOTP"})}</div>
      <div className="otp__sub_title">{intl.formatMessage({id: "activeAccountSubtitle"})}</div>
      <Form name="confirmOtpForm" autoComplete="off">
        <Form.Item name="otpcode" className={`mb-1 ${checkOtp ? "otp__input-otp" : "otp__input-error-otp"}`}>
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
        <div
          className="otp__resend_otp"
          onClick={() => {
            if (counter < 1) {
              props.resendOTP()
              setIsCount(true)
              document.getElementById('timer').innerHTML = '(60s)'
              counter = 60
            }
          }}
        >
          {intl.formatMessage({id: 'resendOtp'})}&nbsp;<span id="timer">(60s)</span>
        </div>
        <Button
          className={`otp__button ${otp.length === 6 ? 'active' : ""}`}
          disabled={otp.length !== 6}
          size="large"
          onClick={async () => {
            if (props.handleVerifyOTP && await props.handleVerifyOTP(otp)) {
              props.setNextTab && props.setNextTab()
            } else {
              setCheckOtp(false)
            }
          }}
        >
          {intl.formatMessage({id:"confirm"})}
        </Button>
      </Form>
    </div>
  );
}

export default injectIntl(ConfirmOtpForm)