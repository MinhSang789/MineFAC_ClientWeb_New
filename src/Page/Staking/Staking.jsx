import { useUser } from 'context/UserContext';
import { formatToNInputPrice } from 'helper/common';
import { WALLET } from 'hooks/management.hook';
import { find } from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { DollarFilled, IconFAC } from "../../assets/icons/index";
import Header from "../../components/ManagerHeader";
import bg_saving from '../../assets/images/staking_save_bg.png';
import bg_history from '../../assets/images/staking_history_bg.png';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useModal } from 'context/ModalContext';
import StakingPermanent from 'Page/StakingPermanent';
import StakingHistory from 'Page/StakingHistory';
import BackgroundTop from 'components/Layout/BackgroundTop';
import { UserAvatar } from 'components/User';
import { StakingPackageService } from 'services/stakingPackage';

const Staking = () => {
  const { user } = useUser();
  const modal = useModal();
  const [stakingPackage, setStakingPackage] = useState([]);
  // useIntl template
  const intl = useIntl();

  useEffect(() => {
    const getStakingPackage = async () => {
      const response = await StakingPackageService.getListStakingPackage();
      if (response.isSuccess) {
        setStakingPackage(response.data);
      }
    }
    const timeout = setTimeout(() => {
      getStakingPackage();
    }, 200);
    return () => clearTimeout(timeout)
  }, []);

  const t = useCallback(
    (id) => {
      return intl.formatMessage({ id });
    },
    [intl]
  );

  const facBalance = useMemo(() => {
    return find(user.wallets, { walletType: WALLET.FAC })?.balance || 0;
  }, [user.wallets])
  return (
    <section>
      {/* <Header headerTitle={t("branch")} headerClass={'__branch'} /> */}
      <BackgroundTop />
      <div className="center position-relative">
        <UserAvatar user={user} vertical />
      </div>
      <div className="py-4"></div>
      <div className="factory__header__balance w-100 justify-content-between d-flex mx-0 mt-4">
        <p className="fs-7"><IconFAC /><span className="fs-5 mx-2">{t('fac_wallet')}</span></p>
        <p className="fw-semibold">{formatToNInputPrice(facBalance || 0)}</p>
      </div>
      <div className="staking__list">
        <div className="staking__list__item" onClick={() => {
          modal.show({
            title: t('staking_permanent'),
            content: <StakingPermanent stakingPackage={stakingPackage} />,
            transparent: true,
            customClass: 'modal-staking-permanent',
            headerClassBg: 'bg-img-earth'
          })
        }}>
          <div className="background">
            <img src={bg_saving} alt="" />
          </div>
          <div className="content">
            <div className="left">
              <div className="icon saving">
                <DollarFilled width={16} height={16} />
              </div>
              <span className="text">{t('staking_permanent')}</span>
            </div>
            <div className="right">
              <ArrowRightOutlined style={{ fontSize: '16px', color: '#FFBA52' }} />
            </div>
          </div>

        </div>
        <div className="staking__list__item" onClick={() => {
          modal.show({
            title: t('staking_history'),
            content: <StakingHistory />,
            transparent: true,
            headerClassBg: 'bg-img-earth'
          })
        }}>
          <div className="background">
            <img src={bg_history} alt="" />
          </div>
          <div className="content">
            <div className="left">
              <div className="icon history">
                <DollarFilled width={16} height={16} />
              </div>
              <span className="text">{t('staking_history')}</span>
            </div>
            <div className="right">
              <ArrowRightOutlined style={{ fontSize: '16px', color: '#FFBA52' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Staking