import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useUser } from "context/UserContext";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { UserAvatar } from 'components/User';

export default function Header(props) {
  const { user } = useUser();
  const intl = useIntl();
  const t = useCallback((id, values) => intl.formatMessage({ id }, values), [intl]);

  return (
    <div className={`factory__top${props.headerClass ? props.headerClass : ''} d-flex justify-content-center flex-column align-items-center`}>
      <div className="factory__top__title text-uppercase">{props.headerTitle}</div>
      <div className="factory__top__avatar mt-2">
        <UserAvatar user={user} vertical />
      </div>
    </div>
  );
}
