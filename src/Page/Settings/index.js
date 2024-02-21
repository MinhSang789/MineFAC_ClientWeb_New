import React, { useCallback, useContext } from 'react'
import { Button, Form, Input, Select } from 'antd'
import { IntlContext } from '../../helper/Internationalization'
import { injectIntl } from 'react-intl'
import './index.scss'
import { handleUpdateDetail } from 'actions/userAction';
import { ArrowLeftOutlined, GlobalOutlined, LockOutlined, UserSwitchOutlined } from '@ant-design/icons'
import ApppUsers from '../../services/apppUsers'
import swal from 'sweetalert'
import { useDispatch, useSelector } from "react-redux";

const Setting = ({ intl }) => {
  const [formPassword] = Form.useForm()
  const [formSecondPassword] = Form.useForm()
  const intlContext = useContext(IntlContext)
  const user = useSelector(state => state.member)
  const dispatch = useDispatch();
  // ** Context

  // ** Vars
  const langObj = {
    en: intl.formatMessage({ id: 'en' }),
    cn: intl.formatMessage({ id: 'cn' }),
    vi: intl.formatMessage({ id: 'vi' })
  }

  // ** Function to switch Language
  const handleLangUpdate = (lang) => {
    intlContext.switchLanguage(lang)
  }

  const t = useCallback((id) => intl.formatMessage({ id }), [intl])

  const onChangePassword = (values) => {
    ApppUsers.changePasswordUser({
      password: values.password,
      newPassword: values.newPassword,
    }).then((result) => {
      const { isSuccess } = result;
      if (!isSuccess) {
        swal(t('update_profile_failed'), {
          icon: "warning",
        });

        return;
      } else {
        swal(t('update_profile_success'), {
          icon: "success",
        });
        formPassword.resetFields();
      }
    });
  }
  const getDetailUserById = () => {
    ApppUsers.getDetailUserById({
      id: user.appUserId
    }).then(result=>{
      const { isSuccess, data } = result
      if(isSuccess){
        dispatch(handleUpdateDetail(data))
      }
    })
  };

  const onChangeSecondPassword = (values) => {
    ApppUsers.changeSecondPasswordUser({
      password: values.newPassword,
      oldPassword: values.password
    }).then((result) => {
      const { isSuccess } = result;
      if (!isSuccess) {
        swal(t('update_profile_failed'), {
          icon: "warning",
        });

        return;
      } else {
        getDetailUserById()
        swal(t('update_profile_success'), {
          icon: "success",
        });
        formSecondPassword.resetFields();
      }
    });
  }

  return (
    <div className='setting'>
      {/* <div className='setting-header'>
        <div>
          <ArrowLeftOutlined />
        </div>
        <div className='route-name'>{intl.formatMessage({ id: 'setting' })}</div>
        <div />
      </div> */}
      <div className='setting-content'>
        <div className='px-20  d-flex justify-content-between align-items-center'>
          <div className='h6 mt-2 w-50 d-flex align-items-center'>
            <GlobalOutlined />
            {intl.formatMessage({ id: "language" })}
          </div>
          <Select
            value={langObj[intlContext.locale]}
            onChange={handleLangUpdate}
            className='w-50'
            size='large'
          >
            {
              Object.keys(langObj).map(key => {
                return (
                  <Select.Option key={key} value={key}>{langObj[key]}</Select.Option>
                )
              })
            }
          </Select>
        </div>

        <hr className='divide' />

        <div className='update-pass'>
          <div className='update-pass-header'>
            <LockOutlined />
            {intl.formatMessage({ id: 'changePass' })}
          </div>
          <div className='px-20 pt-2'>
            <Form
              name="formChangePassword"
              autoComplete="new-password"
              layout="vertical"
              form={formPassword}
              onFinish={onChangePassword}
            >
              <Form.Item
                name="password"
                label={t('old_password')}
                rules={[
                  {
                    min: 6,
                    message: intl.formatMessage({ id: 'invalidPass' })
                  },
                  {
                    required: true,
                    message: intl.formatMessage({ id: "password_required" }),
                  },
                ]}
              >
                <Input.Password
                  type="password"
                  placeholder={"**************"}
                  size="large"
                  autoComplete="new-password"
                />
              </Form.Item>

              <Form.Item
                name="newPassword"
                label={t('new_password')}
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({ id: "password_required" }),
                  }
                ]}
              >
                <Input.Password
                  type="password"
                  placeholder={"**************"}
                  size="large"
                  autoComplete="new-password"
                />
              </Form.Item>

              <Form.Item
                dependencies={["newPassword"]}
                name="confirm"
                label={t('confirm_new_password')}
                rules={[
                  {
                    required: true,
                    message: t('confirm_password'),
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(t('confirm_password_not_match'))
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  type="password"
                  placeholder={intl.formatMessage({ id: "verifyPass" })}
                  size="large"
                  autoComplete="new-password"
                />
              </Form.Item>
              <div className="w-100">
                <Button
                  className="w-100"
                  type="primary"
                  htmlType="submit"
                  size="large"
                >{intl.formatMessage({ id: "update" })}</Button>
              </div>
            </Form>
          </div>
        </div>
        <hr className='divide' />

        <div className='update-pass'>
          <div className='update-pass-header'>
            <UserSwitchOutlined />
            {
              user?.secondaryPassword?.trim() ?
                intl.formatMessage({ id: "changeSecondPass" }) :
                intl.formatMessage({ id: 'secondPass' })
            }
          </div>
          <div className='px-20 pt-2'>
            <Form
              name="formChangeSecondaryPassword"
              autoComplete="new-password"
              layout="vertical"
              form={formSecondPassword}
              onFinish={onChangeSecondPassword}
            >
              {
                user?.secondaryPassword?.trim() ? (
                  <Form.Item
                    name="password"
                    label={t('old_password')}
                    rules={[
                      {
                        min: 6,
                        message: intl.formatMessage({ id: 'invalidPass' })
                      },
                      {
                        required: true,
                        message: intl.formatMessage({ id: "password_required" }),
                      },
                    ]}
                  >
                    <Input.Password
                      type="password"
                      placeholder={"**************"}
                      size="large"
                      autoComplete="new-password"
                    />
                  </Form.Item>
                ) : (
                  <></>
                )
              }

              <Form.Item
                name="newPassword"
                label={t('new_password')}
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({ id: "password_required" }),
                  }
                ]}
              >
                <Input.Password
                  type="password"
                  placeholder={"**************"}
                  size="large"
                  autoComplete="new-password"
                />
              </Form.Item>

              <Form.Item
                dependencies={["newPassword"]}
                name="confirm"
                label={t('confirm_new_password')}
                rules={[
                  {
                    required: true,
                    message: t('confirm_password'),
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(t('confirm_password_not_match'))
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  type="password"
                  placeholder={intl.formatMessage({ id: "verifyPass" })}
                  size="large"
                  autoComplete="new-password"
                />
              </Form.Item>
              <div className="w-100">
                <Button
                  className="w-100"
                  type="primary"
                  htmlType="submit"
                  size="large"
                >
                  {intl.formatMessage({ id: user?.secondaryPassword ? "update" : "confirm" })}
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default injectIntl(Setting)