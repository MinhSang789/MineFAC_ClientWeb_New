import { GiftFilled, CopyFilled } from '@ant-design/icons';
import { IconLink, IconSendSmall, OrganizationOutlined } from 'assets/icons';
import { useUser } from 'context/UserContext';
import { simpleCopyToClipboard } from 'helper/common';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import style from './index.module.scss';
export const Introduce = () => {
  // useIntl template
  const intl = useIntl();
  const t = useCallback((id) => {
    return intl.formatMessage({ id });
  }, [intl]);
  const { user } = useUser();
  return (
    <div className="bg-white vh-100">
      <div className={style['introduce']}>
        <div className={style['introduce__code_wrapper']}>
          <div className={`${style['introduce__code_wrapper__item']}`}>
            <p className={`${style['item_icon']} fw-500`}><OrganizationOutlined className="fs-5" /></p>
            <div className={style['item_content']}>
              <span >{t('organization_name')}</span>
              <p className="fw-500">
                <span>{`${user?.companyName || ''}`}</span>
                {/* <span className="rounded-circle p-1 d-inline-flex align-items-center" style={{ background: 'rgba(4, 123, 115, 0.12)', marginLeft: '8px' }} role="button">
                  <CopyOutlined />
                </span> */}
              </p>
            </div>
          </div>
          <div className={`${style['introduce__code_wrapper__item']}`}>
            <p className={`${style['item_icon']} fw-500`}><IconSendSmall /></p>
            <div className={style['item_content']}>
              <span >{t('refer_code')}</span>
              <p className="fw-500">
                <span>{user?.username || ''}</span>
                <span className="rounded-circle p-1 d-inline-flex align-items-center" role="button" onClick={() => { simpleCopyToClipboard(user?.username || '') }}>
                  <CopyFilled style={{ color: '#ACACAC' }} />
                </span>
              </p>
            </div>
          </div>
          <div className={`${style['introduce__code_wrapper__item']} ${style['link']}`}>
            <p className={`${style['item_icon']} fw-500`}><IconLink /></p>
            <div className={`${style['item_content']}`}>
              <span >{t('refer_ink')}</span>
              <div className="d-flex justify-content-between">
                <div style={{ width: '70vw' }}>
                  <a className="text-truncate d-inline-block w-100 text-decoration-underline" href={user?.referLink || ''} target="_blank" rel="noopener noreferrer" style={{ color: '#5479BB' }}>{user?.referLink || ''}</a>
                </div>
                <div className="rounded-circle p-1 d-flex align-items-center"
                  onClick={() => { simpleCopyToClipboard(user?.referLink || '') }}>
                  <CopyFilled style={{ color: '#ACACAC' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={style['introduce__qr']}>
          {user && user.referQRCode && <img src={user.referQRCode} alt="" />}
        </div>
        <div className={style['introduce__note']}>
          <div className={style['introduce__note__content']}>
            <div className={style['icon']}>
              <GiftFilled style={{ color: '#fff' }} />
            </div>
            <div className={style['text']} dangerouslySetInnerHTML={{ __html: t('introduce_note') }}>

            </div>
          </div>
        </div>
        {/* <div>
          <p className="pt-4 pb-3 text-center">{t('total_refer_user')}</p>
          <div className="d-flex justify-content-around text-center" style={{ gap: '8px' }}>
            <div className="card p-2 bg-grey">
              <p className="">{t('this_week')}</p>
              <p className="text-green">0</p>
            </div>
            <div className="card p-2 bg-grey">
              <p className="">{t('this_month')}</p>
              <p className="text-blue">0</p>
            </div>
            <div className="card p-2 bg-grey">
              <p className="">{t('total')}</p>
              <p className="text-primary">0</p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}