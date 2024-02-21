import { ArrowLeftOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import classNames from 'classnames';
import { UserAvatar } from 'components/User';
import { useUser } from "context/UserContext";
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const [visible, setVisible] = useState(false);
  const [screens, setScreens] = useState([]);

  const { user } = useUser();

  const show = (screen) => {
    const newScreens = [...screens, screen];
    console.log('%cModalContext.js line:37 screens before insert', 'color: #007acc;', screens);
    setScreens(newScreens);
    setVisible(true);
  };

  const hide = () => {
    setScreens([]);
    setVisible(false);
  };

  const back = useCallback(() => {
    const newScreens = screens.slice(0, -1);
    setScreens(newScreens);
    if (!newScreens.length) {
      setVisible(false);
    }
  }, [screens]);

  const current = useMemo(() => {
    if (screens.length) {
      return screens[screens.length - 1];
    }
    return null;
  }, [screens]);

  const closeCallback = () => {
    console.log('change close')
    document.body.style.overflow = 'initial';
  }

  console.log('%cModalContext.js line:37 screens', 'color: #007acc;', screens);
  console.log('%cModalContext.js line:40 current', 'color: #007acc;', current);

  const renderTitle = useMemo(() => {
    return (
      (
        <div className={classNames(`d-block position-relative ${current?.headerClassBg}`, { 'bg-transparent': current?.transparent, 'bg-primary': !current?.transparent })}>
          <div className='d-flex align-items-center header-mobile__container p-3'>
            <div role="button" className='me-3 text-light' onClick={back}>
              <ArrowLeftOutlined style={{ fontSize: '20px' }} />
            </div>
            <div className="title">
              <p className='m-0 text-light fw-semibold text-uppercase'>{current?.title}</p>
            </div>
          </div>
          {current?.headerNode === true && <div className="factory__top__avatar mt-2 mb-3">
              <UserAvatar user={user} vertical />
      </div>}
        </div>
      )
    )
  }, [current, back]);

  return (
    <ModalContext.Provider value={{ show, hide, back }}>
      {children}
      <Modal
        afterClose={closeCallback}
        bodyStyle={current?.bodyStyle}
        maskStyle={{ backgroundColor: '#FEFCF7' }}
        destroyOnClose
        wrapClassName={`fadeInLeft ${current?.customClass}`}
        forceRender
        open={visible}
        closable={false}
        onOk={hide}
        onCancel={hide}
        title={renderTitle}
        centered
        footer={null}>
        {current?.content}
      </Modal>
    </ModalContext.Provider>
  )
}

export function useModal() {
  return useContext(ModalContext);
}