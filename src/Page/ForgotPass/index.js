import React, { useState } from 'react'
import { Tabs, Form, Button, Input, notification } from 'antd'
import { ArrowLeftOutlined, EyeInvisibleOutlined, EyeTwoTone, LoginOutlined } from '@ant-design/icons'
import { IconEmail, IconLock } from "./../../assets/icons/index"
import ConfirmOtpForm from 'components/ConfirmOTPForm'
import "./forgotPass.scss";
import LoginService from '../../services/loginService'
import { injectIntl } from 'react-intl'

function ForgotPass(props) {
  const [tabKey, setTabKey] = useState('forgot')
  const [form] = Form.useForm()
  const [otp, setOtp] = useState('')
  const { history, intl } = props
  function handleSubmit() {
    const values = form.getFieldsValue()
    LoginService.sendEmailOTP({
      email: values.email
    }).then(res => {
      if (res.isSuccess) {
        setTabKey('otp')
      } else {
        notification.error({
          message: "",
          description: intl.formatMessage({ id: "error" })
        })
      }
    })
  }

  async function handleVerifyOTP() {
    return await LoginService.verifyOtp({
      email: form.getFieldValue('email'),
      otp: otp
    }).then(res => {
      if (res.isSuccess) {
        return true;
      } else {
        return false;
      }
    })
  }

  async function handleUpdatePass(values) {
    LoginService.updatePass({
      "email": form.getFieldValue('email'),
      "otpCode": otp,
      "newPassword": values.password
    }).then(res => {
      if (res.isSuccess) {
        setTabKey('success')
      } else {
        if (res.error === 'OTP_CODE_EXPIRED') {
          notification.error({
            message: "",
            description: intl.formatMessage({ id: "expiredOTP" })
          })
        } else {
          notification.error({
            message: "",
            description: intl.formatMessage({ id: "error" })
          })
        }
      }
    })
  }

  function onGoBack() {
    if (tabKey === 'forgot') {
      history.replace('/login')
    } else if (tabKey === 'otp') {
      setTabKey('forgot')
    } else if (tabKey === 'updatePass') {
      setTabKey('otp')
    }
  }

  return (
    <div className="forgot">
      {
        tabKey !== 'success' && (
          <div className='mb-5 cursor-pointer pt-3 ml-2' onClick={onGoBack}>
            <ArrowLeftOutlined className='backIcon' />
          </div>
        )
      }
      <div className='login-center'>
        <div id="recaptcha-container"></div>
        <Tabs activeKey={tabKey}>
          <Tabs.TabPane tab="forgot" key="forgot">
            <div>
              <div className='forgot-img'>
                <img src={window.origin + '/assets/images/forgot.png'} alt="img" />
              </div>
              <div className='login__title'>{intl.formatMessage({ id: "forgotTitle" })}</div>
              <div className='login__subTitle'>{intl.formatMessage({ id: 'forgotSubtitle' })}</div>
              <Form
                name="login"
                onFinish={handleSubmit}
                form={form}
              >
                <Form.Item
                  name="email"

                  rules={[
                    {
                      type: 'email',
                      message: intl.formatMessage({ id: "inValidEmail" }),
                    },
                    {
                      required: true,
                      message: intl.formatMessage({ id: "email_required" }),
                    }

                  ]}
                >
                  <div className="login__input__icon">
                    <IconEmail />
                    <Input
                      autoComplete="new-password"
                      className="login__input w-100"
                      placeholder={intl.formatMessage({id: "typeEmail"})}
                      type="text"
                      size="large"
                    />
                  </div>

                </Form.Item>

                <div className="w-100 d-flex justify-content-center">
                  <Button
                    className="login__button blue_button"
                    type="primary"
                    htmlType="submit"
                    size="large"
                  >{intl.formatMessage({ id: 'confirm' })}</Button>
                </div>
              </Form>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="verify" key="otp">
            <div className='forgot-img'>
              <img src={window.origin + '/assets/images/confirm.png'} alt="img" />
            </div>
            <ConfirmOtpForm
              setOtp={setOtp}
              title={intl.formatMessage({ id: "kyc_profile" })}
              nextTab={tabKey}
              handleVerifyOTP={(otp) => handleVerifyOTP(otp)}
              resendOTP={() => {
                handleSubmit(form.getFieldsValue())
              }}
              setNextTab={() => setTabKey('updatePass')}
              setPreviousTab={() => setTabKey('forgot')}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="updatePass" key="updatePass">
            <div className='forgot-img'>
              <img src={window.origin + '/assets/images/confirm.png'} alt="img" />
            </div>
            <div className="login__title">{intl.formatMessage({ id: "createNewPass" })}</div>
            <Form onFinish={handleUpdatePass}>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({ id: "password_required" }),
                  },
                  {
                    min: 6,
                    message: intl.formatMessage({ id: "invalidPass" }),
                  }
                ]}
              >
                <div className="login__input__icon">
                  <IconLock />
                  <Input.Password
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    autoComplete="new-password"
                    className="login__input"
                    type="password"
                    placeholder={"• • • • • • • • • • • • • • "}
                    size="large"
                  />
                </div>
              </Form.Item>

              <Form.Item
                name="confirm"
                rules={[
                  {
                    min: 6,
                    message: intl.formatMessage({ id: 'invalidPass' })
                  },
                  {
                    required: true,
                    message: intl.formatMessage({ id: 'verifyPass' }),
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error(intl.formatMessage({ id: "passDoesntMatch" })));
                    },
                  }),
                ]}
              >
                <div className="login__input__icon">
                  <IconLock />
                  <Input.Password
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    autoComplete="new-password"
                    className="login__input"
                    type="password"
                    placeholder={intl.formatMessage({ id: "verifyPass" })}
                    size="large"
                  />
                </div>
              </Form.Item>

              <div className="w-100 d-flex justify-content-center">
                <Button
                  className="login__button blue_button"
                  type="primary"
                  htmlType="submit"
                  size="large"
                >{intl.formatMessage({ id: "confirm" })}</Button>
              </div>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab="success" key="success">
            <div className='register-success'>
              <div className='m-auto mb-5 forgot-img'>
                <img src={window.origin + '/assets/images/resetPassSuccess.png'} />
              </div>
              <div className='text-center h4 mb-2'>{intl.formatMessage({ id: "forgotSuccessTitle" })}</div>
              <div 
                className='text-center mb-4'
                dangerouslySetInnerHTML={{
                  __html: intl.formatMessage({ id: "forgotSuccessSubtitle" })
                }}
              />
              <Button onClick={() => history.replace('/login')} size="large" className='login__button blue_button'>
                <LoginOutlined /> {intl.formatMessage({ id: 'login' })}
              </Button>
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default injectIntl(ForgotPass)
