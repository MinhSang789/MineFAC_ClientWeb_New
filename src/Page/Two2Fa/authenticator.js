import React, { useCallback, useState } from "react";
import { useIntl } from "react-intl";
import { useModal } from "context/ModalContext";
import { Button } from "antd";
import { HOST } from 'constants/url'
import { useUser } from 'context/UserContext';
import ConfirmAuth from "./confirmAuth";
import "./index.scss";

const Anthenticatior = (props) => {
  const { user } = useUser();
  const [authRdoState, setAuthRdoState] = useState([]);
  const modal = useModal();
  // useIntl template
  const intl = useIntl();

  const t = useCallback(
    (id) => {
      return intl.formatMessage({ id });
    },
    [intl]
  );
  const handleClickBtn = (val) => {
    if (authRdoState) {
      modal.show({
        title: t("sec_2fa"),
        content: <ConfirmAuth history={props.history}/>,
        transparent: true,
        customClass: "modal-authenticator",
        headerClassBg: "bg-img-earth",
      });
    } else {
    }
  };
  return (
    <section className="authenticator__2fa m">
      <div className="authenticator__2fa__auth__grp--title m-2 d-flex flex-column">
        <div className="authenticator__2fa__auth__grp--title my-2">
          {t("setting_sec_by_google")}
        </div>
        <div className="authenticator__2fa__auth__grp--top-content mb-3">
          {t("setting_sec_by_google_content")}
        </div>
        <div className="d-flex flex-column text-center">
        <div className="authenticator__2fa__auth__grp--qrcode center-horizontal">
         {/* {dataImg} */}
          <img src={`${HOST}AppUsers/get2FACode?appUserId=${user.appUserId}`} alt="qr-code" />
        </div>
        <div className="authenticator__2fa__auth__grp--bottom-content mb-3">
          {t("another_way_sec")}
          </div>
          <div className="authenticator__2fa__auth__grp--code">
            {user?.twoFACode}
          </div>
        </div>
      </div>
      <div className="w-100 d-flex justify-content-center">
        <Button className="authenticator__2fa--btn mx-4" onClick={handleClickBtn}>
        {t("continue")}
        </Button>
      </div>
    </section>
  );
};

export default Anthenticatior;
