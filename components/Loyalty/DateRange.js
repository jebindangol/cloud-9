import React from "react";
import { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

const DateRange = ({
  dateRange = [],
  setDateRange = () => {},
  handleSelect = () => {},
}) => {
  const maxRange = 60;
  const today = new Date();
  const maxDate = today;
  const minDate = new Date(today.getTime() - maxRange * 24 * 60 * 60 * 1000);

  return (
    <DateRangePicker
      ranges={dateRange}
      onChange={handleSelect}
      minDate={minDate}
      maxDate={maxDate}
      //   presets={presets}
      // staticRanges={[]}
      inputRanges={[]}
    />
  );
};

export default DateRange;
