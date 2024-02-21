import React, { useEffect, useState } from 'react';
import Loader from './../../components/Loader'
import { Form, Input, Button, notification, Checkbox, Tabs } from 'antd';
import { IconLock, IconEmail } from "./../../assets/icons/index"
import LoginService from "./../../services/loginService"
import { routes } from "./../../App"
import ConfirmOtpForm from 'components/ConfirmOTPForm';
import swal from 'sweetalert';
import "./register.scss"
import { ArrowLeftOutlined, LoginOutlined, ApartmentOutlined, CheckCircleOutlined, ScanOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { injectIntl } from 'react-intl';
import ChangeLanguage from 'components/ChangeLanguage';

function Register(props) {
  const [isVisible, setIsVisible] = useState(false)
  const [nextTab, setNextTab] = useState('register')
  const { history, location, intl } = props
  const search = location.search

  const params = new URLSearchParams(search);
  const notVerified = params.get('notVerified') || ''
  const userEmail = params.get('email') || ''
  const [form] = Form.useForm();

  function onFinish(values) {
    handleRegister(values)
  }

  const handleRegister = (values) => {
    setIsVisible(true)
    values = form.getFieldsValue()
    const newData = {
      email: values.email,
      referUser: values.referUser,
      password: values.password,
      // phoneNumber: values.username,
      secondaryPassword: values.secondaryPassword,
      companyName: values.companyName
    }
    LoginService.Register(newData).then((result) => {
      const { isSuccess, message } = result
      setIsVisible(false)
      if (!isSuccess) {
        if (message === "INVALID_REFER_USER") {
          swal(intl.formatMessage({ id: "invalidRefer" }), {
            icon: "warning",
          });
        } else if (message === "DUPLICATED_USER") {
          swal(intl.formatMessage({ id: 'emailUsed' }), {
            icon: "warning",
          });
        } else {
          swal(intl.formatMessage({ id: "registerFail" }), {
            icon: "warning",
          });
        }
        return
      } else {
        setTimeout(() => {
          LoginService.sendEmailOTP({
            email: values.email
          }).then(res => {
            if (res.isSuccess) {
              setNextTab('otp')
            } else {
              notification.error({
                message: "",
                description: intl.formatMessage({ id: "error" })
              })
            }
          })
        }, 500);
      }
    })
  }

  async function handleCheckCompanyName(val) {
    return await LoginService.verifyAccount({ companyName: val }).then(res => {
      if (res) {
        return res.isSuccess
      } else {
        return false
      }
    })
  }

  async function handleVerifyOTP(otp, email) {
    console.log(`handleVerifyOTP`)
    console.log(otp)
    console.log(email)
    return await LoginService.verifyOtp({
      email: email,
      otp: otp
    }).then(res => {
      if (res.isSuccess) {
        setNextTab('success')
        return true;
      } else {
        return false;
      }
    })
  }

  useEffect(() => {
    console.log('notVerified ', notVerified)
    if (notVerified && notVerified === '1') {
      setNextTab('otp')
    }
    const search = window.location.search
    if (search) {
      form.setFieldsValue({
        referUser: search.split('=')[1]
      })
      console.log(form.getFieldValue('referUser'))
    }
  }, [])

  return (
    <div className="register">
      <div id="recaptcha-container"></div>
      <ChangeLanguage className={`my-4 ${nextTab === 'register' ? "" : "d-none"}`} />

      <div
        className={`
          register-container 
          ${nextTab === 'register' ? "small" : "full"}
          ${nextTab === 'success' ? "d-flex justify-content-center align-items-center" : ""}
          `
        }
      >
        <Tabs activeKey={nextTab}>
          <Tabs.TabPane tab="register" key="register">
            <div className='h-100 d-flex align-items-end flex-column'>
              <div>
                <div className="login__title">{intl.formatMessage({ id: 'registerTitle' })}</div>
                <div className="login__subTitle">{intl.formatMessage({ id: 'registerSubtitle' })}</div>
              </div>
              <Form
                name="login"
                autoComplete="new-password"
                initialValues={{
                  referUser: params.get("refer") || ""
                }}
                form={form}
                onFinish={(values) => {
                  onFinish(values)
                }}
              >
                <Form.Item
                  name="email"

                  rules={[
                    {
                      type: 'email',
                      message: intl.formatMessage({ id: 'inValidEmail' }),
                    },
                    {
                      required: true,
                      message: intl.formatMessage({ id: 'email_required' }),
                    }

                  ]}
                >
                  <div className="login__input__icon">
                    <IconEmail />
                    <Input
                      className="login__input"
                      placeholder={intl.formatMessage({ id: "registerBy" }) + " email"}
                      type="text"
                      size="large"
                    />
                  </div>

                </Form.Item>
                <Form.Item
                  name="companyName"
                  rules={[
                    () => ({
                      async validator(_, value) {
                        if (!value) {
                          return Promise.reject(new Error(intl.formatMessage({ id: "companyName" })));
                        }
                        const isValidCompanyName = await handleCheckCompanyName(value)
                        if (value && !isValidCompanyName) {
                          return Promise.reject(new Error(intl.formatMessage({ id: 'invalidCompanyName' })));
                        }
                        return Promise.resolve();
                      },
                    }),
                  ]}
                >
                  <div className='login__input__icon'>
                    <ApartmentOutlined />
                    <Input
                      className="login__input"
                      placeholder={intl.formatMessage({ id: "companyName" })}
                      type="text"
                      size="large"
                    />
                  </div>
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: intl.formatMessage({ id: "password_required" }),
                    },
                    {
                      min: 6,
                      message: intl.formatMessage({ id: 'invalidPass' })
                    }
                  ]}
                >
                  <div className="login__input__icon">
                    <IconLock />
                    <Input.Password
                      autoComplete="new-password"
                      className="login__input"
                      type="password"
                      iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                      placeholder={"• • • • • • • • • • • • • • • • • • • •"}
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
                      message: intl.formatMessage({ id: "password_required" }),
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
                    <CheckCircleOutlined />
                    <Input.Password
                      // prefix={<></>}
                      autoComplete="new-password"
                      iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                      className="login__input"
                      type="password"
                      placeholder={intl.formatMessage({ id: `verifyPass` })}
                      size="large"
                    />
                  </div>
                </Form.Item>
                <div className='login__input__icon'>
                  <ScanOutlined className='top-3' />
                  <Form.Item
                    name="referUser"
                    rules={[
                      {
                        required: true,
                        message: intl.formatMessage({ id: "referRequired" }),
                      }
                    ]}
                  >
                    <Input
                      autoComplete="new-password"
                      placeholder={intl.formatMessage({ id: "refer" })}
                      type="text"
                      size="large"
                    />
                  </Form.Item>
                </div>
                {/* <div className="login__parent register__parent">
                  <div>
                    <Checkbox
                      checked={isCheckBox}
                      onChange={(e) => {
                        const { checked } = e.target
                        if (checked) {
                          setIsCheckBoxError(false)
                        }
                        setIsCheckBox(checked)
                      }}
                    >
                      <span
                        dangerouslySetInnerHTML={{
                          __html: intl.formatMessage({ id: "rules" })
                        }}
                      />
                    </Checkbox>
                    {
                      isCheckBoxError ? <div className="ant-form-item-explain ant-form-item-explain-error"><div role="alert" className="ant-form-item-explain-error">{intl.formatMessage({ id: "ruledRequired" })}</div></div> : null
                    }

                  </div>
                </div> */}

                <div className="w-100 d-flex justify-content-center">
                  <Button
                    className="login__button blue_button"
                    type="primary"
                    htmlType="submit"
                    size="large"
                  >{intl.formatMessage({ id: "register" })}</Button>
                </div>
                <div className="login__footer">
                  {intl.formatMessage({ id: 'alreadyHaveAccount' })}&nbsp;<span onClick={() => { history.push(routes.login.path) }} className="login__footer--text">{intl.formatMessage({ id: 'loginNow' })}</span>
                </div>
              </Form>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="otp" key="otp" >
            <div className='mb-5 mt-3 cursor-pointer' onClick={() => setNextTab('register')}>
              <ArrowLeftOutlined className='backIcon' />
            </div>
            <div className='register-otp'>
              <img src={window.origin + "/assets/images/otp.png"} alt="img" />
            </div>
            <div className="register__otp_border">
              <ConfirmOtpForm
                handleVerifyOTP={(otp) => handleVerifyOTP(otp, userEmail ? userEmail : form.getFieldValue('email'))}
                resendOTP={() => {
                  onFinish(form.getFieldsValue())
                }}
                nextTab={nextTab}
                setNextTab={() => setNextTab('success')}
                setPreviousTab={() => setNextTab('register')}
              />
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab='success' key="success">
            <div className='register-success'>
              <div className='m-auto mb-5'>
                <img src={window.origin + '/assets/images/success.png'} />
              </div>
              <div className='text-center h4 mb-2'>
                {intl.formatMessage({
                  id: 'activeSuccessful'
                })}
              </div>
              <div className='text-center mb-4'>
                {intl.formatMessage({
                  id: 'activeSuccessfulSubtitle'
                }
                ).replace('{{account}}', form.getFieldValue('email'))}
              </div>
              <Button onClick={() => history.push('/login')} size="large" className='login__button blue_button'>
                <LoginOutlined />{intl.formatMessage({ id: 'login' })}
              </Button>
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
      {isVisible ? <Loader /> : null}
    </div>
  )
}
export default injectIntl(Register);