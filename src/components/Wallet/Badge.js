import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';

export default function Badge({ onClick }) {
  const intl = useIntl();
  const t = useCallback(id => intl.formatMessage({ id }), [intl]);
  return (
    <span
      className="badge bg-orange-200 fs-8 fw-normal text-orange text-capitalize py-1 px-2"
      style={{borderRadius: '4px'}}
      onClick={onClick}
      role="button"
      >
        {t('max')}
    </span>
  )
}