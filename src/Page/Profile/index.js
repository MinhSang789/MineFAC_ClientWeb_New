import React, { useCallback, useEffect, useMemo, useState } from "react";
import _, { first, initial } from "lodash";
import { useSelector } from "react-redux";

import ApppUsers from "./../../services/apppUsers";
import { handleUpdateDetail } from "./../../actions";
import { useDispatch } from "react-redux";
import Loader from "./../../components/Loader";
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Tabs,
  Upload,
  message,
} from "antd";
import {
  IconInboxOutlined,
  Guardian,
  IconTrash
} from "./../../assets/icons/index";
import swal from "sweetalert";
import moment from "moment";
import { convertFileToBase64 } from "helper/common";
import UploadService from "services/upload";
import AppUsers from "./../../services/apppUsers";
import classNames from "classnames";
import { simpleCopyToClipboard } from "helper/common";
import { CopyOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { useUser } from "context/UserContext";
import { UserAvatar } from "components/User";
import { useIntl } from "react-intl";
import Status from 'components/User/Status'

const { Option } = Select;
const { Dragger } = Upload;

function ProFile(props) {
  const {
    firstName,
    lastName,
    diachiviUSDT,
    diachiviBTC,
    birthDay,
    phoneNumber,
    appUserId,
    username,
    email,
    referQRCode,
    referLink,
    companyName,
    identityNumber,
    imageAfterIdentityCard,
    imageBeforeIdentityCard
  } = useSelector((state) => state.member || {});

  const [identifyCard, setIdentifyCard] = useState({
    front: '',
    back: ''
  });
  const isVerified = useSelector((state) => state.member?.isVerified);
  const isVerifiedSuccess = isVerified === 1;
  const isAwaitVerify = isVerified === 2;
  const isAllowRequestVerify = isVerified === 0 || isVerified === 3

  const intl = useIntl();
  const { user, refresh } = useUser();
  // console.log(user);
  const t = useCallback((id) => intl.formatMessage({ id }), [intl]);

  useEffect(() => {
    setIdentifyCard({
      front: imageBeforeIdentityCard,
      back: imageAfterIdentityCard
    })
  }, [imageAfterIdentityCard, imageBeforeIdentityCard])

  const initialValues = {
    fullName: [firstName, lastName].join(" "),
    diachiviUSDT,
    identityNumber,
    diachiviBTC,
    birthDay: birthDay ? moment(birthDay) : null,
    phoneNumber,
    email,
    companyName,
  };

  const [isVisible, setIsVisible] = useState(false);
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();
  const dispatch = useDispatch();

  function onFinish(values) {
    setIsVisible(true);
    ApppUsers.changePasswordUser({
      password: values.password,
      newPassword: values.newPassword,
    }).then((result) => {
      const { isSuccess, message, data } = result;

      setIsVisible(false);
      if (!isSuccess) {
        swal(t("update_profile_failed"), {
          icon: "warning",
        });

        return;
      } else {
        swal(t("update_profile_success"), {
          icon: "success",
        });
        refresh();
        // form.resetFields();
      }
    });
  }

  function onFinishInfo(values) {
    setIsVisible(true);
    let data = {};
    Object.keys(values).forEach((key) => {
      if (initialValues[key] !== values[key] || key === "diachiviBTC") {
        if (key === "diachiviUSDT") {
          data.diachiviUSDT = values[key];
        } else if (key === "diachiviBTC") {
          data.diachiviBTC = values[key]
        } else if (key === "fullName") {
          const [firstName, ...lastName] = values.fullName?.trim().split(/\s+/g);
          data.firstName = firstName;
          data.lastName = lastName.join(" ");
        } else {
          data[key] = values[key];
        }
      }
    });
    delete data.front;
    delete data.back;
    delete data.id;
    if (!_.isEmpty(data)) {
      ApppUsers.updateInfoUser({
        data,
        id: appUserId,
      }).then(async (result) => {
        const { isSuccess, message, data } = result;
        setIsVisible(false);
        if (!isSuccess) {
          swal(t("duplicate_phone_number"), {
            icon: "warning",
          });
  
          return;
        } else {
          swal(t("update_success"), {
            icon: "success",
          });
          if ([0, 3].includes(isVerified)) {
            const result = await ApppUsers.requestVerifyKYC({ id: appUserId });
            if (result.isSuccess) {
              data['isVerified'] = 2;
            }
          }
          dispatch(handleUpdateDetail(data));
        }
      });
    } else {
      return false;
    }
   
  }

  function onFinishKyc(values) {
    if (!form2.getFieldValue("diachiviUSDT")) {
      swal(t("usdt_address_required_2"), {
        icon: "warning",
      });
      return;
    }
    setIsVisible(true);
    AppUsers.updateInfoUser({
      data: {
        identityNumber: values.id,
      },
      id: appUserId,
    }).then((result) => {
      const { isSuccess, message, data } = result;
      setIsVisible(false);
      if (!isSuccess) {
        swal(t("submit_kyc_failed"), {
          icon: "warning",
        });
      } else {
        UploadService.submitImageIdentityCard().then((result) => {
          const { isSuccess, message, data } = result;
          if (!isSuccess) {
            swal(t("submit_kyc_failed"), {
              icon: "warning",
            });

            return;
          } else {
            swal(t("submit_kyc_success"), {
              icon: "success",
            });
          }
        });
      }
    });
  }

  const onChangeTab = () => { };

  const draggerProps = (front = true, showUploadList = true) => {
    return {
      name: front ? "front" : "back",
      customRequest: ({ file, onSuccess }) => {
        setTimeout(() => {
          onSuccess("ok");
        }, 0);
      },
      showUploadList,
      accept: "image/*",
      onChange(info) {
        const { status } = info.file;
        if (status !== "uploading") {
          convertFileToBase64(info.file.originFileObj).then((dataUrl) => {
            const newData = dataUrl.replace(/,/gi, "").split("base64");
            if (newData[1]) {
              const data = {
                id: appUserId,
                imageData: newData[1],
                imageFormat: "png",
              };
              const service = front
                ? UploadService.uploadImageIdentityCardBefore
                : UploadService.uploadImageIdentityCardAfter;
              service(data).then((result) => {
                const { isSuccess, message, data } = result;
                if (!isSuccess) {
                  swal(message || t("upload_failed"), {
                    icon: "warning",
                  });

                  return;
                } else {
                  swal(t("upload_success"), {
                    icon: "success",
                  });
                  setIdentifyCard((prev) => {
                    return {
                      ...prev,
                      [front ? 'front' : 'back']: data
                    }
                  })
                }
              });
            }
          });
        }
      },
      onDrop(e) {
        console.log("Dropped files", e.dataTransfer.files);
      },
    };
  };


  const handleUploadAvatar = (event) => {
    const file = event.target.files[0];
    if (file) {
      convertFileToBase64(file).then((dataUrl) => {
        const newData = dataUrl.replace(/,/gi, "").split("base64");
        if (newData[1]) {
          const data = {
            id: appUserId,
            imageData: newData[1],
            imageFormat: "png",
          };
          const service = UploadService.uploadUserAvatar;
          service(data).then((result) => {
            const { isSuccess, message, data } = result;
            if (!isSuccess) {
              swal(message || t("upload_failed"), {
                icon: "warning",
              });

              return;
            } else {
              swal(t("upload_success"), {
                icon: "success",
              });
              refresh();
            }
          });
        }
      });
    }
  }
  const handleClickAvatar = () => {
    const el = document.createElement('input');
    el.type = 'file';
    el.accept = 'image/*';
    el.onchange = handleUploadAvatar;
    el.click();
  }

  const getTitle = () => {
    switch (isVerified) {
      case 0:
        return "Tài khoản chưa xác thực KYC. Hãy hoàn thành KYC để nhận ngay phần thưởng 10 Fi ";
      case 2:
        return "Đang chờ duyệt";
      case 1:
        return "Đã duyệt";
      case 3:
        return "Đã từ chối";
      default:
        return "Tài khoản chưa xác thực KYC. Hãy hoàn thành KYC để nhận ngay phần thưởng 10 Fi ";
    }
  }

  const title = getTitle();

  return (
    <section className="management profile">
      <div className="management__box">
        <div
          className={`profile__top d-flex justify-content-center flex-column align-items-center`}
        >
          <div className="profile__top__title text-uppercase">
            {t("its_mine")}
          </div>
          <div className="factory__top__avatar mt-2">
            <UserAvatar user={user} vertical dark onClick={handleClickAvatar} />
          </div>
        </div>
        <div className="management__box__hr"></div>
        {/* <div className="packet__empty__list d-flex justify-content-center align-items-center p-2 m-4">
          <ExclamationCircleFilled className="" />
          <span className="mx-3">
            {title}
          </span>
        </div> */}
        <div className="m-4 d-flex justify-content-center">
          <Status />
        </div>
        <div style={{ borderBottom: ' 1px solid #F5F5F5', width: '100%' }}></div>
        <Form
          name="login"
          autoComplete="off"
          form={form2}
          layout="vertical"
          initialValues={{
            fullName: [firstName, lastName].join(" ").trim(),
            diachiviUSDT: diachiviUSDT,
            diachiviBTC: diachiviBTC && diachiviBTC.toString() ,
            birthDay: birthDay ? moment(birthDay) : null,
            phoneNumber,
            email,
            companyName,
            back: imageAfterIdentityCard,
            front: imageBeforeIdentityCard,
            identityNumber
          }}
          onFinish={(values) => {
            onFinishInfo(values);
          }}
        >
          <div className="row mx-3">
            <div className="col-12">
              <Form.Item
                name="fullName"
                label={t("full_name")}
                disabled={isAwaitVerify || isVerifiedSuccess}
                rules={[
                  {
                    required: true,
                    message: t("full_name_required"),
                  },
                  {
                    pattern: new RegExp(/[\p{L}\p{N}]\s[\p{L}\p{N}]+/ug),
                    message: t('full_name_pattern')
                  }
                ]}
              >
                <Input
                  placeholder={t("full_name")}
                  type="text"
                  size="large"
                  disabled={isAwaitVerify || isVerifiedSuccess}
                />
              </Form.Item>
              <Form.Item
                name="phoneNumber"
                label={t("phone")}
                rules={[
                  {
                    required: true,
                    message: t("phone_required"),
                  },
                ]}
                id
                disabled={isAwaitVerify || isVerifiedSuccess}
              >
                <Input placeholder="0385 xx xx xx" type="text" size="large" disabled={isAwaitVerify || isVerifiedSuccess} />
              </Form.Item>
              <Form.Item
                name="birthDay"
                label={t("dob")}
                disabled={isAwaitVerify || isVerifiedSuccess}
                rules={[
                  {
                    required: true,
                    message: t("dob_required"),
                  },
                ]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  placeholder={t("dob")}
                  size="large"
                  format="DD/MM/YYYY"
                  disabled={isAwaitVerify || isVerifiedSuccess}
                />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: t("email_required"),
                  },
                ]}
              >
                <Input placeholder="Email" type="text" size="large" disabled />
              </Form.Item>
              <Form.Item name="companyName" label={t("organization_name")}>
                <Input
                  placeholder={t("organization_name")}
                  type="text"
                  size="large"
                  disabled
                />
              </Form.Item>
              <div style={{ borderBottom: ' 1px solid #F5F5F5', width: '100vw' }}></div>
              <Form.Item
                name="diachiviUSDT"
                label={t("usdt_address") + " (TRC20) "}
                disabled={user?.diachiviUSDT}
              >
                <Input
                  className="detail__address__input green"
                  placeholder={t("usdt_address") + " (TRC20) "}
                  type="text"
                  size="large"
                  disabled={user?.diachiviUSDT}
                  // style={{ color: '#047B73' }}
                  suffix={
                    <Button
                      size="large"
                      className="detail__address__btn"
                      onClick={() => {
                        simpleCopyToClipboard(diachiviUSDT);
                      }}
                      style={{ border: 'none', alignItems: 'center', display: 'flex', padding: 0, top: 0 }}
                      icon={<CopyOutlined />}
                    >
                      {t("copy")}
                    </Button>
                  }
                />
              </Form.Item>
              <Form.Item
                name="diachiviBTC"
                label={t("btc_address")}
                rules={[
                  {
                    required: isVerifiedSuccess && !diachiviBTC,
                    message: t("btc_address_required"),
                  },
                ]}
              >
                <Input
                  className="detail__address__input green"
                  placeholder={t("btc_address")}
                  type="text"
                  size="large"
                  style={{ color: '#047B73' }}
                  suffix={<Button
                    size="large"
                    className="detail__address__btn"
                    onClick={() => simpleCopyToClipboard(diachiviBTC)}
                    style={{ border: 'none', alignItems: 'center', display: 'flex', padding: 0, top: 0 }}
                    icon={<CopyOutlined />}
                  >
                    {/* <IconCopyProfile style={{ marginRight: "8px" }} /> */}
                    {t("copy")}
                  </Button>}
                />
              </Form.Item>
            </div>
            <div className="col-12">
            </div>
          </div>
          <div style={{ borderBottom: ' 1px solid #F5F5F5', width: '100%' }}></div>
          <div className="row mx-3">
            <div className="col-12">
              {[0, 3].includes(isVerified) && (
                <div className="d-flex align-items-center m-badge m-badge-warning">
                  <ExclamationCircleFilled />
                  <p style={{ marginLeft: "8px" }}>
                    {t("not_kyc")}
                  </p>
                </div>
              )}
              <Form.Item
                name="identityNumber"
                label={t("cmnd")}
                rules={[
                  {
                    required: true,
                    message: t("cmnd_required"),
                  },
                ]}
                disabled={isAwaitVerify || isVerifiedSuccess}
              >
                <Input
                  placeholder="250 xxx xxx"
                  type="text"
                  size="large"
                  disabled={isAwaitVerify || isVerifiedSuccess}
                />
              </Form.Item>
              <div>
                <Form.Item
                  name="front"
                  label={t("cmnd_front")}
                  rules={[
                    {
                      required: true,
                      message: t("cmnd_front_required"),
                    },
                  ]}
                >
                  {identifyCard.front ?
                    <div className="profile__image-identify">
                      <img src={identifyCard.front} alt="" />
                      <div className="img-name">
                        {identifyCard.front}
                      </div>
                      <Dragger {...draggerProps(true, false)} disabled={isAwaitVerify || isVerifiedSuccess} style={{ border: 'none', background: 'none' }}>
                        <Button disabled={isAwaitVerify || isVerifiedSuccess} className="img-button" icon={<IconTrash />}></Button>
                      </Dragger>
                    </div>
                    : <Dragger {...draggerProps(true)} disabled={isAwaitVerify || isVerifiedSuccess}>
                      <p className="ant-upload-drag-icon">
                        <IconInboxOutlined />
                      </p>
                      <p className="ant-upload-text">{t("upload_note")}</p>
                    </Dragger>}
                </Form.Item>
              </div>
            </div>
            <div
              className={classNames("col-12")}
            >
              <Form.Item
                name="back"
                label={t("cmnd_back")}
                rules={[
                  {
                    required: true,
                    message: t("cmnd_back_required"),
                  },
                ]}
              >
                {identifyCard.back ?
                  <div className="profile__image-identify">
                    <img src={identifyCard.back} alt="" />
                    <div className="img-name">
                      {identifyCard.back}
                    </div>
                    <Dragger {...draggerProps(false, false)} style={{ border: 'none', background: 'none' }} disabled={isAwaitVerify || isVerifiedSuccess}>
                      <Button disabled={isAwaitVerify || isVerifiedSuccess} className="img-button" icon={<IconTrash />}></Button>
                    </Dragger>
                  </div >
                  : <Dragger {...draggerProps(false)}
                    disabled={isAwaitVerify || isVerifiedSuccess}
                  >
                    <p className="ant-upload-drag-icon">
                      <IconInboxOutlined />
                    </p>
                    <p className="ant-upload-text">{t("upload_note")}</p>
                  </Dragger>}
              </Form.Item>
            </div>
          </div>
          {isVerified === 0 && <div className="w-100 d-flex ">
            <Button
              className={classNames("profile__button", "w-100", "mx-4", "profile__button")}
              style={{ margin: "0px 40px" }}
              type="submit"
              size="large"
              htmlType="submit"
            >
              <Guardian /> {t("kyc_verify")}
            </Button>
          </div>}
            {isVerified !== 0 && <div className="w-100 d-flex ">
              <Button
                className={classNames("profile__button", "w-100", "mx-4", "profile__button")}
                style={{ margin: "0px 40px" }}
                type="submit"
                size="large"
                htmlType="submit"
              >
                <Guardian />{t('update')}
              </Button>
            </div>}
        </Form>
      </div>
      {isVisible ? <Loader /> : null}
    </section>
  );
}
export default ProFile;
