import React, { useCallback, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import Authenticator from "./authenticator";
import { useModal } from "context/ModalContext";
import { Radio, Button } from "antd";
import { useUser } from 'context/UserContext';
import swal from 'sweetalert';
import ApppUsers from "services/apppUsers";
import "./index.scss";

const Two2Fa = (props) => {
  
  const { user, refresh } = useUser();
  const [authRdoState, setAuthRdoState] = useState(user.twoFAEnable);
  const { history } = props;
  const modal = useModal();
  // useIntl template
  const intl = useIntl();

  const t = useCallback(
    (id) => {
      return intl.formatMessage({ id });
    },
    [intl]
  );
  const handleGetAuthRdoState = (val) => {
    setAuthRdoState(val);
  };
  const handleClickBtn = (val) => {
    if (authRdoState) {
      modal.show({
        title: t("sec_2fa"),
        content: <Authenticator history={history}/>,
        transparent: true,
        customClass: "modal-authenticator",
        headerClassBg: "bg-img-earth",
      });
    } else {
      ApppUsers.updateInfoUser({
        data: {twoFAEnable: 0},
        id: user.appUserId,
      }).then(async (result) => {
        const { isSuccess } = result;
        if (isSuccess) {
          swal(t("turn_off_sec"), {
            icon: "success",
          });
          refresh();
          modal.hide();
          history.push("/");
        } else {
          swal(t("update_profile_fail"), {
            icon: "error",
          });
        }

      }).catch((err) => {
        swal(t("update_profile_fail"), {
          icon: "error",
        });
      });
    }
  };
  return (
    <section className="sec__2fa">
      <div className="sec__2fa__auth d-flex m-4">
        <div className="sec__2fa__auth__grp">
          <div className="sec__2fa__auth__grp--title mb-2">
            {t("auth_by_google")}
          </div>
          <div className="sec__2fa__auth__grp--content">
            {t("auth_by_google_content")}
          </div>
        </div>
        <div className="sec__2fa__auth__grp--rdo">
          <Radio
            onChange={() => handleGetAuthRdoState(1)}
            checked={authRdoState === 1 ? true : false}
          />
        </div>
      </div>
      <div className="divider mt-4 w-100 my-2"></div>
      <div className="sec__2fa__nouse d-flex m-4">
        <div className="sec__2fa__nouse__grp">
          <div className="sec__2fa__nouse__grp--title  mb-2">
            {t("not_use_sec_2fa")}
          </div>
          <div className="sec__2fa__nouse__grp--content">
            {t("warning_sec_2fa")}
          </div>
        </div>
        <div className="sec__2fa__nouse__grp--rdo">
          <Radio
            onChange={() => handleGetAuthRdoState(0)}
            checked={authRdoState === 0 ? true : false}
          />
        </div>
      </div>
      <div className="divider mt-4 w-100 my-2"></div>
      <div className="w-100 d-flex justify-content-center">
        <Button className="sec__2fa--btn mx-4" onClick={handleClickBtn}>
          {t("continue")}
        </Button>
      </div>
    </section>
  );
};

export default Two2Fa;
