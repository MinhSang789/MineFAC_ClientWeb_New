import { Select } from 'antd'
import React, { useContext, useState } from 'react'
import "./changeLanguage.scss"
import { IntlContext } from '../../helper/Internationalization'
import { CaretDownOutlined } from '@ant-design/icons'
function ChangeLanguage({ className }) {
  const intlContext = useContext(IntlContext)

  const langObj = [
    {
      label: "EN",
      flag: "/assets/images/eng.png",
      value: "en"
    },
    {
      label: "CN",
      flag: "/assets/images/cn.png",
      value: "cn"
    },
    {
      label: "VI",
      flag: "/assets/images/vi.webp",
      value: "vi"
    }
  ]

  // ** Function to switch Language
  const handleLangUpdate = (lang) => {
    intlContext.switchLanguage(lang)
  }

  return (
    <div
      className={`change_language ${className}`}
    >
      <div></div>
      <div className='brand'>
        <img className="img-logo" src="Logo.png" alt="" />
      </div>
      <div>
        <Select
          value={intlContext.locale}
          onChange={handleLangUpdate}
          className='change_language-selected'
          size='large'
          suffixIcon={<CaretDownOutlined />}
        >
          {
            langObj.map((item) => {
              return (
                <Select.Option key={item.value}>
                  <img className='flag' src={window.origin + item.flag} alt="flag" />
                  <span className='text'>{item.label.slice(0, 3)}</span>
                </Select.Option>
              )
            })
          }
        </Select>
      </div>
    </div>
  )
}

export default ChangeLanguage