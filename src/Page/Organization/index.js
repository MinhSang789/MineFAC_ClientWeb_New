import { IconOrganizationSmall } from 'assets/icons';
import { Button, Collapse } from 'antd';
import React, { useCallback } from 'react';
import { IconSendSmall } from 'assets/icons';
import './index.scss';
import Input from 'rc-input';
import { IconCopyProfile } from 'assets/icons';
import { simpleCopyToClipboard } from 'helper/common';
import { IconLink } from 'assets/icons';
import { useIntl } from 'react-intl';
const { Panel } = Collapse;

export default function Organization() {

  const intl = useIntl();
  const t = useCallback((id) => intl.formatMessage({ id }), [intl])

  function callback(key) {
    console.log(key);
  }
  
  const text = `
    A dog is a type of domesticated animal.
    Known for its loyalty and faithfulness,
    it can be found as a welcome guest in many households across the world.
  `;
  return (
    <div className="row px-0 px-md-4 w-100">
      <div className="col-12 col-md-6">
        <div className="bg-white">
          <div className="bg-primary" style={{padding: '28px'}}>
            <p className='text-white'>{t('introduction')}</p>
          </div>
          <div style={{padding: '28px'}}>
          <div className="ic-grey bd-flow">
            <div className="d-flex justify-content-between" style={{padding: '16px'}}>
              <p className=""><IconOrganizationSmall /><span style={{marginLeft: '8px'}}>{t('organization_name')}</span></p>
              <p className="">{t('organization_name')} #name</p>
            </div>
            <div className="d-flex justify-content-between" style={{padding: '16px'}}>
              <p className=""><IconSendSmall /><span style={{marginLeft: '8px'}}>{t('refer_code')}</span></p>
              <p className="">MAGIOITHIEU2022</p>
            </div>
            <div className="d-block" style={{padding: '16px'}}>
              <p className=""><IconLink /><span style={{marginLeft: '8px'}}>{t('refer_ink')}</span></p>
              <div className='detail__address'>
                <Input className="detail__address__input w-100" disabled value="http://FACCOIN.com/diachiviABC123456" />
                <Button
                size="large"
                className="detail__address__btn"
                onClick={()=>{ simpleCopyToClipboard('http://FACCOIN.com/diachiviABC123456')}}>
                  <IconCopyProfile style={{ marginRight: "8px"}}/>
                  {t('copy')}
                </Button>
              </div>
            </div>
          </div>
          <div>
            <p className="pt-4 pb-3 text-center">{t('total_refer_user')}</p>
            <div className="d-flex justify-content-around">
              <div className="card mx-2">
                <p className="">{t('this_week')}</p>
                <p className="text-green">0</p>
              </div>
              <div className="card mx-2">
                <p className="">{t('this_month')}</p>
                <p className="text-blue">0</p>
              </div>
              <div className="card mx-2">
                <p className="">{t('total')}</p>
                <p className="text-primary">0</p>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-6">
        <div className="d-block">
          <div className="bg-primary" style={{padding: '28px'}}>
            <p className="text-white">{t('level')}</p>
          </div>
          <Collapse expandIconPosition="right" defaultActiveKey={['1']} onChange={callback}>
            <Panel header={t('member')} key="1">
              <div className="text-primary fw-bold">1. {t('condition')}:</div>
              <div>
                {t('condition_1')}:
                <ul>
                  <li>{t('condition_2')}</li>
                  <li>{t('condition_3')}</li>
                </ul>
              </div>
              <div className="text-primary fw-bold">2. {t('reward')}:</div>
              <p>{t('reward_1')}</p>
            </Panel>
            <Panel header={t('family')} key="2">
              <p>{text}</p>
            </Panel>
            <Panel header={t('company')} key="3">
              <p>{text}</p>
            </Panel>
            <Panel header={t('enterprise')} key="4">
              <p>{text}</p>
            </Panel>
            <Panel header={t('organization_2')} key="5">
              <p>{text}</p>
            </Panel>
          </Collapse>
        </div>
      </div>
    </div>
  )
}