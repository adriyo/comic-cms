import { ForwardedRef, forwardRef, useState } from 'react';
import DatePicker, { ReactDatePicker } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { InputProps } from './types';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

export interface InputDatepickerProps extends InputProps {
  selectedDate?: Date | null;
  onChange: (date: Date | null) => void;
}

const range = (start: number, end: number, step: number = 1): number[] => {
  const result = [];
  for (let i = start; i < end; i += step) {
    result.push(i);
  }
  return result;
};
const getMonth = (date: Date): number => {
  return date.getMonth();
};

const getYear = (date: Date): number => {
  return date.getFullYear();
};

const TextDatePicker = (
  { onChange, selectedDate, id, label, errorMessage, containerClassName }: InputDatepickerProps,
  ref: ForwardedRef<ReactDatePicker<never, undefined>>,
) => {
  const years = range(getYear(new Date()) - 100, getYear(new Date()) + 1, 1);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const renderCustomHeader = (
    date: Date,
    changeYear: (year: number) => void,
    changeMonth: (month: number) => void,
    decreaseMonth: () => void,
    increaseMonth: () => void,
    prevMonthButtonDisabled: boolean,
    nextMonthButtonDisabled: boolean,
  ) => {
    return (
      <div className="m-[10px] flex justify-center">
        <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
          <MdChevronLeft className="w-7 h-7" />
        </button>
        <select
          className="select select-bordered select-sm"
          value={getYear(date)}
          onChange={({ target: { value } }) => changeYear(+value)}
        >
          {years.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="w-1" />
        <select
          className="select select-bordered select-sm"
          value={months[getMonth(date)]}
          onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
        >
          {months.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
          <MdChevronRight className="w-7 h-7" />
        </button>
      </div>
    );
  };

  return (
    <div className={`${containerClassName}`}>
      {label ? (
        <label htmlFor={id} className="label text-sm">
          <span className="label-text">{label}</span>
        </label>
      ) : null}
      <DatePicker
        ref={ref}
        id={id}
        key={id}
        selected={selectedDate}
        onChange={onChange}
        className="input input-bordered"
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => {
          return renderCustomHeader(
            date,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          );
        }}
      />
      {errorMessage ? (
        <label className="label">
          <span className="label-text-alt text-red-500">{errorMessage}</span>
        </label>
      ) : null}
    </div>
  );
};

export default forwardRef(TextDatePicker);
