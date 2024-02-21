import { CloseOutlined, InfoCircleFilled } from '@ant-design/icons'
import React from 'react'
import { injectIntl } from 'react-intl'
import "./detailBranch.scss"

function DetailBranch(props) {
  const { intl } = props
  return (
    <div className='detail-branch'>
      <div className='detail-branch-header'>
        <InfoCircleFilled />
        <span>{intl.formatMessage({id: "member_level_name_info"})}</span>
        <div className='close-icon' onClick={() => props.history.goBack()}><CloseOutlined /></div>
      </div>
      <div className='detail-branch-content'>
        <div className='content-section'>
          <div className='title'>*&nbsp;{intl.formatMessage({id: "member"})}</div>
          <ul>
            <div className='subTitle'>-&nbsp;{intl.formatMessage({id: "condition"})}</div>
            <li>+&nbsp;{intl.formatMessage({id: "detailBranchText1"})}&nbsp;$100</li>
        
            <div className='subTitle'>-&nbsp;{intl.formatMessage({id: 'reward'})}</div>
            <li>+&nbsp;{intl.formatMessage({id:"receive_point"})}&nbsp;F1: 10%</li>
            <li>+&nbsp;{intl.formatMessage({id:"receive_point"})}&nbsp;F2: 8%</li>
            <li>+&nbsp;{intl.formatMessage({id:"receive_point"})}&nbsp;F3: 5%</li>
          </ul>
        </div>

        <div className='content-section'>
          <div className='title'>*&nbsp;{intl.formatMessage({id: "family"})}</div>
          <ul>
            <div className='subTitle'>-&nbsp;{intl.formatMessage({id: "condition"})}</div>
            <li>+&nbsp;{intl.formatMessage({id: 'detailBranchText1'})}&nbsp;$1,000</li>
            <li>+&nbsp;{intl.formatMessage({id: 'detailBranchText2'})}&nbsp;$5,000</li>
        
            <div className='subTitle'>- &nbsp;{intl.formatMessage({id: "reward"})}</div>
            <li>+&nbsp;{intl.formatMessage({id:"receive_point"})}&nbsp;F1: 12%</li>
            <li>+&nbsp;{intl.formatMessage({id:"receive_point"})}&nbsp;F2: 8%</li>
            <li>+&nbsp;{intl.formatMessage({id:"receive_point"})}&nbsp;F3: 5%</li>
            <li>+&nbsp;{intl.formatMessage({id: 'detailBranchText3'})}&nbsp;$100</li>
            <li>+&nbsp;{intl.formatMessage({id: 'detailBranchText4'})}&nbsp;5%</li>
          </ul>
        </div>

        <div className='content-section'>
          <div className='title'>*&nbsp;{intl.formatMessage({id: "company"})}</div>
          <ul>
            <div className='subTitle'>-&nbsp;{intl.formatMessage({id: "condition"})}</div>
            <li>+ &nbsp;{intl.formatMessage({id: 'detailBranchText1'})}&nbsp; $3,000</li>
            <li>+&nbsp;{intl.formatMessage({id: 'detailBranchText2'})}&nbsp;$10,000</li>
        
            <div className='subTitle'>- &nbsp;{intl.formatMessage({id: "reward"})}</div>
            <li>+&nbsp;{intl.formatMessage({id:"receive_point"})}&nbsp;F1: 15%</li>
            <li>+&nbsp;{intl.formatMessage({id:"receive_point"})}&nbsp;F2: 8%</li>
            <li>+&nbsp;{intl.formatMessage({id:"receive_point"})}&nbsp;F3: 5%</li>
            <li>+&nbsp;{intl.formatMessage({id: 'detailBranchText3'})}&nbsp;$500</li>
            <li>+&nbsp;{intl.formatMessage({id: 'detailBranchText4'})}&nbsp;10%</li>
          </ul>
        </div>
        
        <div className='content-section'>
          <div className='title'>* {intl.formatMessage({id: "enterprise"})}</div>
          <ul>
            <div className='subTitle'>-&nbsp;{intl.formatMessage({id: "condition"})}</div>
            <li>+ &nbsp;{intl.formatMessage({id: 'detailBranchText1'})}&nbsp; $10,000</li>
            <li>+&nbsp;{intl.formatMessage({id: 'detailBranchText2'})}&nbsp;$30,000</li>
        
            <div className='subTitle'>- &nbsp;{intl.formatMessage({id: "reward"})}</div>
            <li>+&nbsp;{intl.formatMessage({id:"receive_point"})}&nbsp;F1: 17%</li>
            <li>+&nbsp;{intl.formatMessage({id:"receive_point"})}&nbsp;F2: 8%</li>
            <li>+&nbsp;{intl.formatMessage({id:"receive_point"})}&nbsp;F3: 5%</li>
            <li>+&nbsp;{intl.formatMessage({id: 'detailBranchText3'})}&nbsp;$1,000</li>
            <li>+&nbsp;{intl.formatMessage({id: 'detailBranchText4'})}&nbsp;15%</li>
          </ul>
        </div>

        <div className='content-section'>
          <div className='title'>* {intl.formatMessage({id: "organization_2"})}</div>
          <ul>
            <div className='subTitle'>-&nbsp;{intl.formatMessage({id: "condition"})}</div>
            <li>+ &nbsp;{intl.formatMessage({id: 'detailBranchText1'})}&nbsp; $30,000</li>
            <li>+&nbsp;{intl.formatMessage({id: 'detailBranchText2'})}&nbsp;$100,000</li>
        
            <div className='subTitle'>- &nbsp;{intl.formatMessage({id: "reward"})}</div>
            <li>+&nbsp;{intl.formatMessage({id:"receive_point"})}&nbsp;F1: 20%</li>
            <li>+&nbsp;{intl.formatMessage({id:"receive_point"})}&nbsp;F2: 8%</li>
            <li>+&nbsp;{intl.formatMessage({id:"receive_point"})}&nbsp;F3: 5%</li>
            <li>+&nbsp;{intl.formatMessage({id: 'detailBranchText31'})}&nbsp;$1,000</li>
            <li>+&nbsp;{intl.formatMessage({id: 'detailBranchText4'})}&nbsp;20%</li>
          </ul>
        </div>

        
        <div className='content-section'>
          <div className='title'>#&nbsp;{intl.formatMessage({id: "note"})}</div>
          <ul>
            <li>-&nbsp;{intl.formatMessage({id:"detailBranchText5"})}</li> 
            <li>-&nbsp;{intl.formatMessage({id:"detailBranchText7"})}</li> 
            <li>-&nbsp;{intl.formatMessage({id:"detailBranchText8"})}</li>  
            <li>-&nbsp;{intl.formatMessage({id:"detailBranchText9"})}</li> 
            <li>-&nbsp;{intl.formatMessage({id:"detailBranchText10"})}</li> 
          </ul>
        </div>
      </div>
    </div>
  )
}

export default injectIntl(DetailBranch)