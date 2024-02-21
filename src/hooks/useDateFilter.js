import moment from "moment";
import { useState } from "react";

const DEFAULT_FILTER = {
  filter: {},
  skip: 0,
  limit: 10,
  order: {
    key: "createdAt",
    value: "desc",
  },
};

export default function useDateFilter({ callback }) {
  const [filter, setFilter] = useState({
    ...DEFAULT_FILTER,
    startDate: moment().subtract(1, 'month').startOf("days").add(7, 'hours').add(1, 'seconds').toDate(),
    endDate: moment().add(1, 'month').endOf("days").add(7, 'hours').toDate()
  });
  const [startDate, setStartDate] = useState(moment().subtract(1, 'month'));
  const [endDate, setEndDate] = useState(moment().add(1, 'month'));
  function onChangeStartDate(date) {
    const newFilter = {
      ...filter,
      startDate: date ? moment(date).startOf("days").add(7, 'hours').add(1, 'seconds').toDate() : "",
    };
    setStartDate(date);
    if (!date) {
      delete newFilter.startDate;
    }
    setFilter(newFilter);
    callback(newFilter);
  }

  function onChangeEndDate(date) {
    const newFilter = {
      ...filter,
      endDate: date ? moment(date).endOf("days").add(7, 'hours').toDate() : "",
    };
    setEndDate(date);
    if (!date) {
      delete newFilter.endDate;
    }
    setFilter(newFilter);
    callback(newFilter);
  }

  function disabledDate(current) {
    return current && current < moment(startDate).endOf("day");
  }

  const onKeyDown = (e) => {
    e.preventDefault();
    return false;
  };
  return {
    startDate,
    endDate,
    onChangeEndDate,
    onChangeStartDate,
    disabledDate,
    onKeyDown,
    filter,
    setFilter
  };
}
