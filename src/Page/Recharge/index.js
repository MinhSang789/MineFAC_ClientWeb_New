import React, { useCallback, useEffect, useState } from 'react';
import _ from "lodash"
import { useSelector } from 'react-redux'
import PaymentDepositTransaction from "./../../services/paymentDepositTransaction"
import PaymentMethod from  "./../../services/paymentMethod"
import Loader from './../../components/Loader'
import SystemConfiguration from "./../../services/systemConfiguration"
import { Form,  Button, Select, InputNumber } from 'antd';
import { IconWalletTone } from "./../../assets/icons/index"
import { formatToUSDTPrice, formatToNInputPrice, price_to_number } from "./../../helper/common"
import swal from 'sweetalert';
import { useIntl } from 'react-intl';

const PointWallet= "PointWallet"
function ProFile(props) {
  const { wallets =[] } = useSelector((state) => state.member ? state.member : {})
  const [isVisible, setIsVisible] = useState(false)
  const [listBank, setListBank] = useState({ total: 0, data: []})
  const [form] = Form.useForm();
  const [ configData, setConfigData] = useState({})
  const [refresh, setRefresh] = useState(false)

  // useIntl template
  const intl = useIntl();
  const t = useCallback((id) => {
    return intl.formatMessage({ id });
  }, [intl]);

  function systemConfigurationFind() {
    SystemConfiguration.systemConfigurationFind().then((result) => {
      const { isSuccess, message, data } = result
      if (!isSuccess || !data) {
        swal(message || t('something_wrong'), {
          icon: "warning",
        });
	
        return
      } else {
        if(data.data){
          setConfigData(data.data[0])
        }
        
      }
    })
  }

  
  function onFinish(values) {
    setIsVisible(true)
		PaymentDepositTransaction.requestDeposit({
      paymentAmount: +(price_to_number(values.paymentAmount)/ configData.exchangeVNDPrice).toFixed(8),
    }).then((result) => {
      const { isSuccess, message } = result
      
      setIsVisible(false)
      if(!isSuccess) {
        swal("Nạp tiền thất bại", {
          icon: "warning",
        });
			
				return
			}else{
        swal("Nạp thành công", {
          icon: "success",
        });
        form.resetFields()
        setRefresh(true)
        setTimeout(()=>{
          setRefresh(false)
        },200)
			}
		})
  }

  function getListBank(filter){
    setIsVisible(true)
		PaymentMethod.getList(filter).then((result) => {
      const { isSuccess, data } = result
      
      setIsVisible(false)
     
			if(!isSuccess || !data) {
				return
			}else{
        setListBank(data)
			}
		})
  }

  useEffect(()=>{
    getListBank({})
    systemConfigurationFind()
  },[])

  const ItemWallet = wallets.find(item=> item.walletType === PointWallet) || {}
  return (
    <section className="management recharge">
       <div className="row">
        <div className="col-12 col-md-7">
           <div className="management__box">
           <div className="d-flex align-items-center">
               <div style={{marginBottom: "unset"}} className="management__box__detail">Nạp tiền</div>
               <div style={{marginBottom: "unset", marginLeft: "auto"}}  className=" recharge__box d-flex align-items-center">
                 <IconWalletTone/>
                 <span>{formatToUSDTPrice(ItemWallet.balance)}</span>
               </div>
             </div>
             <div className="management__box__hr"></div>
             <Form
								name="login"
                autoComplete="off"
                form={form}
                layout="vertical"
                
								onFinish={(values)=>{ 				
									onFinish(values)
								}}
							>
              	<Form.Item
									name="abs"
                  label="Giá trị được lưu trữ"
							
								>               
                 	<Select                   
                    options={
                      [{
                        value: "ATM",
                        lable: "ATM"
                      }]
                    }
                    disabled
										placeholder={"ATM"}
										size="large"
									/> 								
								</Form.Item>

								<Form.Item
									name="paymentAmount"
                  label={t('deposit_amount')}
									rules={[
										{
											required: true,
											message: "Hãy nhập số lượng nạp",
										}								
									]}
								>               
                 <div className="ant-input-wrapper ant-input-group">     
                    	<InputNumber                   
                        type="text"
                        className="management__input__number"     
                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
    										placeholder={"000,000.000"}
                        size="large"
                        onChange={()=>{
                          setRefresh(true)
                          setTimeout(()=>{setRefresh(false)},200)
                        }}
    									/> 		 
                      <span className="ant-input-group-addon">VNĐ</span>
                </div>            
               					
								</Form.Item>
                {
                  form.getFieldValue("paymentAmount") && configData.exchangeVNDPrice ? (
                    <div className="recharge__text-sub">${formatToNInputPrice(+(price_to_number(form.getFieldValue("paymentAmount")) / configData.exchangeVNDPrice).toFixed(8))}</div>
                  ): null
                }		
                <div className="w-100 d-flex justify-content-center">									
										<Button
											className="login__button blue_button"
											type="primary"
											type="submit"
											size="large"
										>
                      Xác nhận
										</Button>								
							  </div>
                <div className="recharge__subText-parent">
                  <div className="recharge__subText">Chúng tôi sử dụng mã hóa SSL 128 bit cho các khoản thanh</div>
                  <div className="recharge__subText">toán, có nghĩa là giao dịch hoàn toàn an toàn.</div>
                </div>
							</Form>
				
           </div>
           
        </div>
        <div className="col-12 col-md-5">
           <div className="management__box management__box-second recharge__box-second">
           <div className="d-flex align-items-center">
               <div className="management__box__detail">Phương thức nạp tiền</div>  
           </div>
           <ul className="recharge__ul">
             <li className="recharge__item">
              Sau khi nhập số tiền và xác nhận          
             </li>
             <li className="recharge__item">
              Vui lòng chuyển khoản vào số tài khoản bên dưới:
              </li>  
             <li className="recharge__item">
               Theo nội dung: <span className="home__active">Tên đăng nhập</span>        
             </li>  
             <li className="recharge__item">
               Ví điện tử hệ thống sẽ tự động cập nhật.
             </li>  
           </ul>
              {
         listBank.data   &&  listBank.data.map(item=>(
                <div className="recharge__cardInfo__content">
                <div className="recharge__cardInfo " >
                  <div className="d-flex">
                     <div className="recharge__cardInfo__lable">
                       Số tài khoản
                       <div className="recharge__cardInfo__text">
                         {item.paymentMethodIdentityNumber}
                       </div>
                     </div>
                   
                     <div style={{ marginLeft: "auto"}} className="recharge__cardInfo__lable ">
                     Tên tài khoản
                     <div className="recharge__cardInfo__text">
                       {item.paymentMethodReceiverName}
                     </div>
                   </div>
                   </div>
                   <div className="recharge__cardInfo__hr"></div>
                   <div className="recharge__cardInfo__lable">
                     Ngân hàng
                       <div className="recharge__cardInfo__text">
                         {item.paymentMethodReferName}
                       </div>
                     </div>
                   
                </div>
                </div>
             
              ))
              }
             
       
           </div>
        </div>
        <div className="col-12 col-md-7">
           <div className="management__box management__box-second recharge__box-second">
                
           <div className="recharge__note">Ghi chú:</div>
             <ul className="recharge__ul">
               <li className="recharge__item recharge__item__sub">
               Cùng một tài khoản / gia đình / địa chỉ hộ gia đình / số điện thoại / địa chỉ IP / máy tính dùng chung / môi trường mạng được coi là cùng một thành viên. Nếu nhiều tài khoản và cùng một IP được hỏi và tài khoản không rõ ràng, tất cả chúng sẽ bị coi là gian lận tạm ngưng tài khoản.

        
               </li>
               <li className="recharge__item recharge__item__sub">
               Đảm bảo xác nhận số tài khoản. Nếu số tài khoản sai, công ty chúng tôi không thể chịu trách nhiệm. Sau khi thành viên tham gia lần đầu tiên sẽ bị ràng buộc vĩnh viễn và không được thay đổi tùy ý.


                </li>  
               <li className="recharge__item recharge__item__sub">
               Bộ phận kiểm soát rủi ro của công ty sẽ xem xét lại, vui lòng không vi phạm quy định.


               </li>  
               <li className="recharge__item recharge__item__sub" >
               Công ty có quyền xem xét tài khoản thành viên hoặc chấm dứt vĩnh viễn các dịch vụ của thành viên mà không cần thông báo trước.


               </li>  
               <li className="recharge__item recharge__item__sub">
               Nếu phản hồi chậm do các yếu tố internet, hãy kiên nhẫn.


               </li> 
               <li className="recharge__item recharge__item__sub">
               Các hành động quá thường xuyên sẽ được hệ thống tự động lọc ra.
               </li> 
           </ul>
      
				
           </div>
           
        </div>
      </div>
    
      {isVisible ? <Loader /> : null}
    </section>
  )
}
export default ProFile;