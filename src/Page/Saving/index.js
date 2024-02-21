import { IconSavingGreen } from 'assets/icons';
import { IconPlus } from 'assets/icons';
import { IconSavingNormal } from 'assets/icons';
import { IconUSDT } from 'assets/icons';
import { Form, Input, Checkbox, Button, DatePicker, Select, Row, Col } from 'antd';
import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import { useIntl } from 'react-intl';
export default function Saving() {
  // useIntl template
  const intl = useIntl();
  const t = useCallback((id) => {
    return intl.formatMessage({ id });
  }, [intl]);
  const onFinish = (values) => {
  }
  const [createStaking, setCreateStaking] = useState(false);
  return (
    <div className="row px-0 px-md-4 saving">
      <div className="col-12 col-md-6">
        <div className="saving__left">
          <div className="saving__left__top">
            <p className="text-white">{t('your_staking')}</p>
            <div className="saving__left__wallet">
              <IconUSDT />
              <span>999,999,888,000 USDT</span>
            </div>
            <div className="divider"></div>
            <p className='text-white'>Là Ví tiết kiệm: khách hàng có thể lấy đồng Fi  khai thác được gửi vào đây theo kì hạn để nhận lãi suất, chỉ ví Fi  mới staking được, nếu Fi  đang ở ví hoa hồng, thì chuyển sang ví Fi  để đủ số lượng tối thiểu 10.000 đồng Fi  mới staking được</p>
          </div>
          <div className="saving__left__bottom">
            <div className="saving__left__item saving__left__item-active" role="button" onClick={() => {
              setCreateStaking(false);
            }}>
              <IconSavingGreen />
              <div>
                <p className=''>{t('staking_package')}</p>
                <p className='text-gray'>3 Gói đang staking</p>
              </div>
            </div>
            <div className="saving__left__item" role="button" onClick={() => {
              setCreateStaking(false);
            }}>
              <IconSavingNormal />
              <div>
                <p className=''>Lịch sử Hết hạn</p>
                <p className='text-gray'>2 Gói đã hết hạn</p>
              </div>
            </div>
            <div className='text-center'>
              <Button className='btn-primary' onClick={() => setCreateStaking(true)}><IconPlus />{t('bonus_package')}</Button>
            </div>
          </div>
        </div>
      </div>
      <div className={classNames('col-12', 'col-md-6', { 'd-none': createStaking })}>
        <div className="saving__right">
          <div className='bg-primary'>
          <p className="text-white" style={{padding: '28px 0 28px 28px'}}>Chi tiết</p>
          </div>
          <div className="bg-white bd-flow bd-bottom" style={{padding: '28px'}}>
            <div className="py-3">
              <p className='text-gray'>Tên gói tiết kiệm</p>
              <p className=''>Tên của Gói staking #1</p>
            </div>
            <div className="py-3">
              <p className='text-gray'>Số lượng gửi</p>
              <p className=''>1,000,000,000 Fi </p>
            </div>
            <div className="py-3 d-flex justify-content-between">
              <div>
                <p className='text-gray'>Kỳ hạn</p>
                <p className=''>60 ngày</p>
              </div>
              <div className='text-left px-4 w-50'>
                <p className='text-gray'>lãi suất</p>
                <p className=''>7% / 30 ngày</p>
              </div>
            </div>
            <div className="py-3 d-flex justify-content-between">
              <div>
                <p className='text-gray'>ngày bắt đầu</p>
                <p className=''>20-02-2022</p>
              </div>
              <div className='text-left px-4 w-50'>
                <p className='text-gray'>ngày kết thúc</p>
                <p className=''>20-04-2022</p>
              </div>
            </div>
            <div className="py-3">
              <p className='text-gray'>Số dư vào ngày đến hạn</p>
              <p className=''>1,014,000,000 Fi </p>
            </div>
          </div>
          <div className="bg-white bd-flow bd-bottom" style={{padding: '28px'}}>
            <div className="py-3">
              <p className='text-gray'>Tên gói tiết kiệm</p>
              <p className=''>Tên của Gói staking #1</p>
            </div>
            <div className="py-3">
              <p className='text-gray'>Số lượng gửi</p>
              <p className=''>1,000,000,000 Fi </p>
            </div>
            <div className="py-3 d-flex justify-content-between">
              <div>
                <p className='text-gray'>Kỳ hạn</p>
                <p className=''>60 ngày</p>
              </div>
              <div className='text-left px-4 w-50'>
                <p className='text-gray'>lãi suất</p>
                <p className=''>7% / 30 ngày</p>
              </div>
            </div>
            <div className="py-3 d-flex justify-content-between">
              <div>
                <p className='text-gray'>ngày bắt đầu</p>
                <p className=''>20-02-2022</p>
              </div>
              <div className='text-left px-4 w-50'>
                <p className='text-gray'>ngày kết thúc</p>
                <p className=''>20-04-2022</p>
              </div>
            </div>
            <div className="py-3">
              <p className='text-gray'>Số dư vào ngày đến hạn</p>
              <p className=''>1,014,000,000 Fi </p>
            </div>
          </div>
          <div className="bg-white bd-flow bd-bottom" style={{padding: '28px'}}>
            <div className="py-3">
              <p className='text-gray'>Tên gói tiết kiệm</p>
              <p className=''>Tên của Gói staking #1</p>
            </div>
            <div className="py-3">
              <p className='text-gray'>Số lượng gửi</p>
              <p className=''>1,000,000,000 Fi </p>
            </div>
            <div className="py-3 d-flex justify-content-between">
              <div>
                <p className='text-gray'>Kỳ hạn</p>
                <p className=''>60 ngày</p>
              </div>
              <div className='text-left px-4 w-50'>
                <p className='text-gray'>lãi suất</p>
                <p className=''>7% / 30 ngày</p>
              </div>
            </div>
            <div className="py-3 d-flex justify-content-between">
              <div>
                <p className='text-gray'>ngày bắt đầu</p>
                <p className=''>20-02-2022</p>
              </div>
              <div className='text-left px-4 w-50'>
                <p className='text-gray'>ngày kết thúc</p>
                <p className=''>20-04-2022</p>
              </div>
            </div>
            <div className="py-3">
              <p className='text-gray'>Số dư vào ngày đến hạn</p>
              <p className=''>1,014,000,000 Fi </p>
            </div>
          </div>
        </div>
      </div>
      <div className={classNames('col-12', 'col-md-6', { 'd-none': !createStaking })}>
        <div>
          <div className='bg-primary' style={{padding: '28px'}}>
          <p className='text-white'>{t('bonus_package')}</p>
          </div>
          
        <div className="bg-white d-flex justify-content-start" style={{padding: '28px'}}>
          <Form
          className='w-100'
            name="basic"
            layout='vertical'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              wrapperCol={{sm: 24}}
              label="Tên gói tiết kiệm"
              name="name"
              rules={[{ required: true, message: 'Vui lòng nhập tên gói tiết kiệm' }]}
            >
              <Input className="w-100" size="large" />
            </Form.Item>

            <Form.Item
              label="Số lượng gửi"
              name="amount"
              wrapperCol={{sm: 24}}
              rules={[{ required: true, message: 'Vui lòng nhập số lượng gửi' }]}
            >
              <Input suffix="Fi " size="large"  />
              <span>{t('remaining_balance')} 256,623.54 Fi </span>
            </Form.Item>

            <Row className="w-100" gutter={8}>
            <Col xs={24} md={12}>
            <Form.Item
              label="Kỳ hạn"
              name="duration"
              wrapperCol={{sm: 24}}
            >
              <Select size="large" >
                <Select.Option value="60">60 NGÀY</Select.Option>
                <Select.Option value="90">90 NGÀY</Select.Option>
              </Select>
            </Form.Item>
            </Col>

            <Col xs={24} md={12}>
            <Form.Item
              label="Lãi suất"
              name="percent"
              value="7% / 30 ngày"
              disabled
              wrapperCol={{sm: 24}}
            >
              <Input size="large"  />
            </Form.Item>
            </Col>
            </Row>

            <Row className='w-100'>
            <Col xs={24} md={12}>
            <Form.Item
              label="Ngày bắt đầu"
              name="from"
              wrapperCol={{sm: 24}}
              rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu' }]}
            >
              <DatePicker size="large" />
            </Form.Item>
            </Col>
            <Col xs={24} md={12}>
            <Form.Item
              wrapperCol={{sm: 24}}
              label="Ngày kết thúc"
              name="amount"
              rules={[{ required: true, message: 'Vui lòng chọn ngày kết thúc' }]}
            >
              <DatePicker size="large" />
            </Form.Item>
            </Col>
            
            </Row>

            <Form.Item
            wrapperCol={{sm: 24}}
              label="Số dư vào ngày đến hạn"
              name="remain"
            >
              <Input size="large"  suffix="Fi " />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button className="btn-primary" type="primary" type="submit">
              Xác nhận
              </Button>
            </Form.Item>
          </Form>
          </div>
        </div>
      </div>
    </div>
  )
}