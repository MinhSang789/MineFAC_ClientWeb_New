import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, notification } from "antd";
import classNames from "classnames";
import _ from "lodash";
import { IconFAC, TroppyIcon, StoreIcon } from "../../assets/icons/index";
import { useIntl } from 'react-intl';
import { userLevel, userAvatar, useUser } from "context/UserContext";
import LeaderBoardService from "services/leaderBoard";
import "./index.scss";
const DEFAULT_FILTER = {
  filter: {},
  skip: 0,
  limit: 10,
  order: {
    key: "createdAt",
    value: "desc",
  },
};
export default function LeaderBoard(props) {
  const [filter, setFilter] = useState(DEFAULT_FILTER);
  const [dataList, setDataList] = useState([]);
  const { user } = useUser();
  const { history, hide } = props;
  const intl = useIntl();
  function getLeaderBoard(filter) {
    LeaderBoardService.getLeaderBoard(
    ).then((result) => {
      const { isSuccess, message, data } = result;
      if (!isSuccess || !data) {
        notification["error"]({
          message: "",
          description: message || t("something_wrong"),
        });
        return;
      } else {
        setDataList(data);
      }
    });
  }
  useEffect(() => {
    getLeaderBoard(filter);
  }, []);
  const t = useCallback((id, values) => intl.formatMessage({ id }, values), [intl]);
  return (
    <div className="leader-board">
      {dataList?.map((item, index)=> <div className="card bd-16 mb-4">
        <div className="d-flex w-100">
          <div className="wrapper-img"><img
            className={classNames("img-rounded", {
              "img-rounded--vertical": "vertical",
            })}
            src={userAvatar(item)}
            alt=""
          />
          <span className={`leader-rank rank-${index + 1}`}>{index + 1}</span>
          </div>
          <div className="mx-3 flex-grow-1">
            <div className="leader-name">{userLevel(item.appUsermembershipId)}</div>
            <div className="leader-groupNm">{item.companyName}</div>
            <div className="my-2 leader-div"></div>
            <div>
              <p className="fs-7 leader-coin">
                <IconFAC /><span className="mx-2">{item.totalScore}</span>
              </p>
            </div>
          </div>
          <div className="d-flex flex-column leader-troppy justify-content-center align-items-center"><TroppyIcon /><p className="my-2">{index === 0 ? '$1,000' : index === 1 ? '$300' : '$100'}</p></div>
        </div>
      </div>)}
      <div className="card leader-annoucement my-4">{t("prize_week")}</div>
      <Button
                className="login__button w-auto d-flex align-items-center justify-content-center my-4 p-4"
                type="primary"
                size="large"
                onClick={() => {
                  // eslint-disable-next-line no-unused-expressions
                  hide();
                  history.push("/management/packet");
                }}
              >
                <StoreIcon style={{ marginRight: "8px" }}/>{t("buy_machine")}
              </Button>
    </div>
  );
}
