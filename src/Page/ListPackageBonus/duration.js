import React, { useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { useIntl } from 'react-intl';

export default function Duration({ prefix, lastActiveDate, format, add24hours }) {
  // useIntl template
  const intl = useIntl();

  const [dateString, setDateString] = useState('')

  useEffect(() => {
    let end = moment(lastActiveDate); // another date
    if (add24hours) {
      end = end.add(24, 'hours');
    }
    const interval = setInterval(() => {
      const now = moment();
      if (end.diff(now) === 0) {
        clearInterval(interval);
        return;
      }
      const duration = moment.duration(end.diff(now));
      setDateString(duration.format(format || 'HH : mm : ss'))
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="d-flex justify-content-center">
      {prefix ? <span className="d-none d-sm-block">{intl.formatMessage({id:"comeback_note"})}&nbsp;</span> : <> </>}
      <span>{dateString}</span>
    </div>
  )
}