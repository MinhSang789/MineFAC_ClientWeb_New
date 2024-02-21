import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { Form, Input, Button, } from 'antd';
import { IconLock } from "../../assets/icons/index"
import swal from "sweetalert"
import "./index.scss"

function PasswordForm(props) {
  const { secondaryPassword, onChange } = props
  const dispatch = useDispatch()
  const [form] = Form.useForm();
  function onFinish(values) {
		
			form.resetFields()
			onChange(values.secondaryPassword)
	
  }

  return (
    <div className={"modalChangePass__formTrade"}>
      <div style={{color: '#384B42', fontSize: '20px'}} className="login__title">Mã giao dịch</div>
				<Form
					name="login"
					autoComplete="off"
					form={form}
					onFinish={(values)=>{ 				
						onFinish(values)
					}}>
					<Form.Item
						name="secondaryPassword"
						rules={[
							{
								required: true,
								message: "Hãy nhập mã giao dịch",
							},
							{
								min: 6,
								message: "Mật khẩu phải ít nhất 6 ký tự",
							}
						]}>
						<div className="login__input__icon">
						<IconLock/> 
							<Input
								className="login__input"
								type="password"
								placeholder={"• • • • • • • • • • • • • • • • • • • •"}
								size="large"
							/>
						</div>
					</Form.Item>
					<div className="w-100 d-flex justify-content-center">									
							<Button
								className="login__button blue_button"
								type="primary"
								type="submit"
								size="large">
								Xác nhận
							</Button>								
					</div>
				</Form>
    </div>
  )
}
export default PasswordForm;