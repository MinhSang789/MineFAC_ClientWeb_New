import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import Loader from './../../components/Loader'
import { Form, Input, Button, Checkbox } from 'antd';
import { IconEmail, IconLock } from "./../../assets/icons/index"
import { handleSignin, handleSigninWithTwo2Fa } from '../../actions'
import LoginService from "./../../services/loginService"
import { routes } from "./../../App"
import swal from 'sweetalert';
import { injectIntl } from 'react-intl';
import ChangeLanguage from 'components/ChangeLanguage';

function Login(props) {
	const [isVisible, setIsVisible] = useState(false)
	const { history, intl } = props
	const dispatch = useDispatch()
	const [form] = Form.useForm();
	function onFinish(values) {
		setIsVisible(true)
		LoginService.Signin(values).then((result) => {
			const { isSuccess, data, error } = result
			console.log(values)
			setIsVisible(false)
			if (!isSuccess) {
				
				if (error && error === 'NOT_VERIFIED_EMAIL') {
					history.push(`/register?notVerified=1&email=${values.email}`)
				} else {
					swal(`${intl.formatMessage({ id: 'login' })}  ${intl.formatMessage({ id: 'fail' })}`, {
						icon: "warning",
					});
					return
				}
			} else {
				form.resetFields()
				if (data.twoFAEnable) {
					history.push("/two2fa");
					dispatch(handleSigninWithTwo2Fa(data));
				} else {
					history.push("/");
					dispatch(handleSignin(data));
				}
			}
		})
	}

	return (
		<div className="login-container">
			<ChangeLanguage />
			<div className='login-header'>
				<div>
					<div>{intl.formatMessage({ id: 'login' })}</div>
				</div>
				<div></div>
			</div>
			<div className='login-center'>
				<div>
					<div className="login__title">{intl.formatMessage({ id: 'loginTitle' })}</div>
					<div className="login__subTitle">{intl.formatMessage({ id: 'loginSubtitle' })}</div>
				</div>
				<Form
					name="login"
					autoComplete="off"
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
								className="login__input"
								placeholder={intl.formatMessage({ id: "loginBy" }) + " email"}
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
							<Input
								className="login__input"
								type="password"
								placeholder={"• • • • • • • • • • • • • • • • • • • •"}
								size="large"
							/>
						</div>
					</Form.Item>



					<div className="login__parent">
						<Checkbox>{intl.formatMessage({ id: 'remember' })}</Checkbox>
						<div onClick={() => {
							history.push(routes.forgotPass.path)
						}} className="login__forget"> <span className='ms-2' dangerouslySetInnerHTML={{ __html: intl.formatMessage({ id: 'forgot' }) }}></span></div>
					</div>
					<div className="w-100 d-flex justify-content-center">
						<Button
							className="login__button blue_button"
							type="primary"
							htmlType="submit"
							size="large"
						>{intl.formatMessage({ id: 'login' })}</Button>
					</div>
					<div className="login__footer">
						{intl.formatMessage({ id: 'no-account' })}&nbsp;
						<span
							onClick={() => { history.push(routes.register.path) }}
							className="login__footer--text">
							{intl.formatMessage({ id: 'registerNow' })}
						</span>
					</div>
				</Form>
			</div>
			{isVisible ? <Loader /> : null}
		</div>
	)
}
export default injectIntl(Login);