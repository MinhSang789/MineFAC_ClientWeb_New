import { Button, Form, InputNumber } from 'antd';
import { routes } from 'App';
import { IconShield } from 'assets/icons';
import { IconCopyProfile } from 'assets/icons';
import { IconExclamation } from 'assets/icons';
import classNames from 'classnames';
import { formatToNInputPrice } from 'helper/common';
import { simpleCopyToClipboard } from 'helper/common';
import { isLeftAction } from 'hooks/management.hook';
import { isExchangeFAC } from 'hooks/management.hook';
import { isRequestWithdrawUsdt } from 'hooks/management.hook';
import { isRequestReceiveBTC } from 'hooks/management.hook';
import { isExchangeAction } from 'hooks/management.hook';
import { isRequestDeposit } from 'hooks/management.hook';
import { isRightAction } from 'hooks/management.hook';
import { isRequestBTC } from 'hooks/management.hook';
import { isPointWallet } from 'hooks/management.hook';
import { isRequestUsdt } from 'hooks/management.hook';
import { isFACWallet } from 'hooks/management.hook';
import { useManagement } from 'hooks/management.hook';
import Input from 'rc-input';
import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';
import parser from 'react-html-parser';

export default function Detail() {
  const {
    activeWallet,
    setActionByDirection,
    action,
    form,
    onActionFinish,
    handleExchangeFromChange,
    handleExchangeToChange,
    diachiviUSDT,
    diachiviBTC
  } = useManagement();
  const walletAddress = useMemo(() => {
    if (isRequestUsdt(action)) {
      return diachiviUSDT;
    } else if (isRequestBTC(action)) {
      return diachiviBTC;
    }
    return "";
  }, [action, diachiviBTC, diachiviUSDT])
  const displayRequireMsg = useMemo(() => {
    return ((isRequestUsdt(action) && !diachiviUSDT) 
    || (isRequestBTC(action) && !diachiviBTC));
  }, [action, diachiviBTC, diachiviUSDT]);
  const intl = useIntl();
  const t = (id) => intl.formatMessage({ id });
  return (
    <div className="detail">
        <div className="detail__header">
          <div className="detail__title">{activeWallet.title}</div>
          <div className="detail__divider"></div>
          <div className="detail__description">{parser(activeWallet.description)}</div>
          <div className={classNames({ 'd-none': isFACWallet(activeWallet) || isPointWallet(activeWallet)})}>
            <span className="detail__sub detail__white">{t('wallet_address')}</span>
            <div className={classNames('detail__address-empty', { 
              'd-none': !displayRequireMsg
            })}>
              <IconExclamation />{t('provide_address_note_1')} <a href={routes.managementProfile?.path}>{t('provide_address_note_2')}</a>
            </div>
            <div className={classNames('detail__address', { 
              'd-none': displayRequireMsg
            })}>
              <Input className="detail__address__input" disabled value={walletAddress} />
              <Button
              size="large"
              className="detail__address__btn"
              onClick={()=>{  simpleCopyToClipboard(walletAddress) }}>
                <IconCopyProfile style={{ marginRight: "8px"}}/>
                {t('copy')}
              </Button>
            </div>
          </div>
        </div>
        <div style={{padding: '28px 28px 0'}}>
          <div className="detail__navigate">
            <Button
              className={classNames('detail__button', 'detail__navigate__button', {
                'detail__navigate__button--active': isLeftAction(action)
              })}
              size="large"
              onClick={()=>{ setActionByDirection(true)}}>
                {activeWallet.navigate?.left}
            </Button>
            <Button
              className={classNames('detail__button detail__navigate__button', {
                'd-none': isFACWallet(activeWallet) || isPointWallet(activeWallet),
                'detail__navigate__button--active': isRightAction(action)
              })}
              size="large"
              onClick={()=>{ setActionByDirection(false)}}>
                {activeWallet.navigate?.right}
            </Button>
          </div>
        </div>
        <Form
            name="management"
            autoComplete="off"
            form={form}
          >
            <div className={classNames('detail__content', {'d-none': isRightAction(action)})}>
              <div className={classNames({'d-none': !isRequestDeposit(action)})}>
                <div className="detail__item">
                  <label>{t('deposit_amount')}</label>
                  <Form.Item
                    name="paymentAmount"
                    rules={[{
                      required: isLeftAction(action),
                      message: t('deposit_amount_required'),
                    }]}>
                    <Input className="detail__input" addonAfter="USDT" placeholder={t('deposit_amount_placeholder')} />
                  </Form.Item>
                </div>
                <div className="detail__item">
                  <label>Transaction ID</label>
                  <div className="detail__address-normal">
                    <Form.Item
                      name="paymentRef"
                      rules={[{
                        required: isRequestDeposit(action),
                        message: t('transaction_id_required'),
                      }]}>
                      <Input className="detail__input" placeholder={t('transaction_id')} />
                    </Form.Item>
                  </div>
                </div>
              </div>
              <div className={classNames({'d-none': isRequestDeposit(action)})}>
                <div className="detail__item">
                  <label>{activeWallet.input?.label}</label>
                  <Form.Item
                    name="paymentAmount"
                    onChange={handleExchangeFromChange}
                    rules={[{
                      required: isLeftAction(action),
                      message: activeWallet.input?.required,
                    }]}>
                      <InputNumber
                        className="detail__input"
                        addonAfter={activeWallet.code}
                        placeholder={activeWallet?.input?.placeholder}
                        min="0.00001"
                        step="0.00001"
                      />
                    </Form.Item>
                  <span className="detail__sub">{`${t('remaining_balance')} ${formatToNInputPrice(activeWallet.balance)} ${activeWallet.code}`}</span>
                </div>
                <div className={classNames('detail__item', {'d-none': !isExchangeFAC(action)})}>
                  <label>{t('number_exchange')}</label>
                  <Form.Item
                    name="paymentToAmount"
                    onChange={handleExchangeToChange}>
                      <Input className="detail__input" addonAfter="USDT" />
                    </Form.Item>
                </div>
              </div>
              <div className="detail__item detail__notice">
                <span className={classNames('d-block', { 'd-none': isExchangeAction(action)})}>
                  <IconShield />
                  <span style={{marginLeft: '8px'}}>
                    {t('deposit_note')}
                  </span>
                </span>
                <div className={classNames('detail__note', { 'd-none': !isExchangeAction(action) })}>
                  <IconExclamation />
                  <span style={{marginLeft: '8px'}}>
                    {activeWallet.exchangeNote}
                  </span>
                </div>
                <Button type="submit" className="detail__button" disabled={displayRequireMsg}>
                  {activeWallet.sendBtnText}
                </Button>
                <Button type="button" className={classNames('detail__button', 'detail__button--second', {'d-none': !isExchangeAction(action)})}>
                  {t('increase_performance_point')}
                </Button>
              </div>
              <div className="detail__item text-center">
                <a href={activeWallet.viewDeposit} className={classNames('detail__link')}>{activeWallet.viewDepositHistory}</a>
                <a href={activeWallet.viewWithdraw} className={classNames('detail__link', { 'd-none': !isExchangeAction(action)})}>{activeWallet.viewWithdrawHistory}</a>
              </div>
            </div>
          <div className={classNames('detail__content', {'d-none': isLeftAction(action)})}>
            <div className={classNames('detail__item', { 'd-none': isRequestReceiveBTC(action)})}>
              <label>{t('withdraw_amount')}</label>
              <Form.Item
                name="paymentAmount"
                rules={[{
                  required: isRightAction(action),
                  message: t('withdraw_amount_required'),
                }]}>
                  <Input className="detail__input" addonAfter={activeWallet.code} placeholder={t('withdraw_amount_placeholder')} />
                </Form.Item>

            </div>
            <div className={classNames({'d-none': false})}>
              <div className={['detail__item', {'d-none': !isRequestReceiveBTC(action)}]}>
                {parser(activeWallet.receiveNote)}
              </div>
              <div className="detail__item detail__notice">
                <span className={classNames("d-block", { 'd-none': !isRequestWithdrawUsdt(action)})}>
                  <IconShield />
                  <span style={{marginLeft: '8px'}}>
                    {t('deposit_note')}
                  </span>
                </span>
                <Button type="submit" className="detail__button" disabled={displayRequireMsg}>{activeWallet.receiveBtnText}</Button>
              </div>
              <div className={classNames('detail__item', 'text-center')}>
                <a href={activeWallet.viewWithdraw} style={{color: '#010C29', textDecoration: 'underline'}}>{activeWallet.viewWithdrawHistory}</a>
              </div>
            </div>
          </div>
        </Form>
      </div>
  )
}