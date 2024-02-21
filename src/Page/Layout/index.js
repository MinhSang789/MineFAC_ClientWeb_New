
import { HomeFilled, HomeOutlined, ShopOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'
import { OrganizationOutlined } from 'assets/icons'
import { OrganizationFilled } from 'assets/icons'
import { FactoryFilled } from 'assets/icons'
import { FactoryOutlined } from 'assets/icons'
import classNames from 'classnames'
import { useModal } from 'context/ModalContext'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useIntl } from 'react-intl'
import { connect } from "react-redux"
import { routes } from "./../../App"
import "./index.scss"

function LayoutPage(props) {
  const { Component, className = "" } = props;

  const { location, history } = props
  const { pathname } = location;
  const modal = useModal();

  const intl = useIntl();
  const t = useCallback((id) => intl.formatMessage({ id }), [intl]);

  const isHome = useMemo(() => {
    return pathname === routes.home.path;
  }, [pathname]);

  const isFactory = useMemo(() => {
    return pathname === routes.managementPackageBonus.path;
  }, [pathname]);

  const isStore = useMemo(() => {
    return pathname === routes.managementPacket.path;
  }, [pathname]);

  const isBranch = useMemo(() => {
    return pathname === routes.branch.path;
  }, [pathname]);

  const isProfile = useMemo(() => {
    return pathname === routes.managementProfile.path;
  }, [pathname]);

  function handleClickFooterIcon(path) {
    history.push(path);
    modal.hide();
  }

  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      const headerId = document.getElementById("header-sticky")
      if (headerId && headerId.classList) {
        if (window.pageYOffset > 0) {
          headerId.classList.toggle('sticky')
        } else {
          headerId.classList.remove('sticky');
        }
      }

    });
  }, [])


  useEffect(() => {
    if (props.isAuth) {
      // document.getElementById('root').style.height = 'calc(100vh - 120px)'
    } else {
      document.getElementById('root').style.height = '100vh'
    }
  }, [props, props.isAuth])

  useEffect(() => {
    const bodyId = document.getElementById("body-root")
    if (bodyId) {
      bodyId.className = "bg-gray"
      bodyId.classList.add(className || "")
    }
  }, [className])

  return (
    <>
      <Component {...props} />
      {
        props.isAuth && (
          <footer className="d-block bg-white p-0 fixed-bottom" style={{
            marginBottom: '-20px',
            maxWidth: '576px',
            margin: 'auto'
          }}>
            <div className="d-flex justify-content-between py-2 px-1 navigation text-center" style={{ height: '88px' }}>
              <div
                className={classNames('py-2', { 'border-bottom-active': isHome, 'text-primary': isHome })}
                role="button"
                onClick={() => handleClickFooterIcon(routes.home.path)}>
                {isHome ? <HomeFilled className="fs-5" /> : <HomeOutlined className="fs-5" />}
                <p className="fs-7 mt-1">{t('homepage')}</p>
              </div>
              <div
                className={classNames('py-2', { 'border-bottom-active': isFactory, 'text-primary': isFactory })}
                role="button"
                onClick={() => handleClickFooterIcon(routes.managementPackageBonus.path)}>
                {isFactory ? <FactoryFilled className="fs-5" /> : <FactoryOutlined className="fs-5" />}
                <p className="fs-7 mt-1">{t('factory')}</p>
              </div>
              <div
                className={classNames("relative", { 'text-primary': isStore })}
                role="button"
                onClick={() => handleClickFooterIcon(routes.managementPacket.path)} style={{ minWidth: '64px' }}>
                <div
                  className="bg-primary rounded-circle text-white"
                  style={{ position: 'absolute', top: '-32px', padding: '16px' }}>
                  <ShopOutlined className="fs-1" />
                </div>
                <p className="fs-7 mt-1" style={{ paddingTop: '29px' }}>{t('store')}</p>
              </div>
              <div
                className={classNames('py-2', { 'border-bottom-active': isBranch, 'text-primary': isBranch })}
                role="button"
                onClick={() => handleClickFooterIcon(routes.branch.path)}>
                {isBranch ? <OrganizationFilled className="fs-5" /> : <OrganizationOutlined className="fs-5" />}
                <p className="fs-7 mt-1">{t('branch')}</p>
              </div>
              <div
                className={classNames('py-2', { 'border-bottom-active': isProfile, 'text-primary': isProfile })}
                role="button"
                onClick={() => handleClickFooterIcon(routes.managementProfile.path)}>
                <UserOutlined className="fs-5" />
                <p className="fs-7 m-1">{t('its_mine')}</p>
              </div>
            </div>
          </footer>
        )
      }
    </>
  );

}

const mapStateToProps = state => ({
  member: state.member || {},
});

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LayoutPage)
