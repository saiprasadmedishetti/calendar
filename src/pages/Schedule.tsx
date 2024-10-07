import { useRef, useState } from "react";
import Calendar from "../components/Calendar";
import Dropdown from "../components/Dropdown";
import InputField from "../components/Input";
import {
  formatDateNumber,
  getDate,
  getMonthName,
  MONTH_NAMES,
} from "../constants/date";
import useClickOutside from "../hooks/useClickOutside";

const YEARS_LIMIT = 10;

type SelectedDate = {
  date?: number;
  month?: number;
  year?: number;
};

export default function Schedule() {
  const [visible, setVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<SelectedDate>({
    date: undefined,
    month: undefined,
    year: undefined,
  });

  const { month: month_, year: year_ } = getDate(
    selectedDate.year,
    selectedDate.month
  );
  const [monthName, setMonthName] = useState(getMonthName());
  const [month, setMonth] = useState(month_);
  const [year, setYear] = useState(year_);
  const inputRef = useRef(null);

  useClickOutside(inputRef, () => setVisible(false));

  const onYearSelect = (value: string) => {
    setYear(Number(value));
  };
  const onMonthSelect = (value: string, index: number) => {
    setMonthName(value);
    setMonth(index);
  };

  const handleInputClick = () => {
    setVisible(true);
  };

  const onDateSelect = (date: number, month: number, year: number) => {
    setSelectedDate({
      date,
      month,
      year,
    });
    setVisible(false);
  };

  const inputValue = selectedDate.date
    ? `${formatDateNumber(selectedDate.date!)}/${formatDateNumber(
        selectedDate.month! + 1
      )}/${formatDateNumber(selectedDate.year!)}`
    : "";

  const years = Array.from({ length: YEARS_LIMIT }, (_, idx) =>
    (idx - YEARS_LIMIT / 2 + year).toString()
  );

  return (
    <>
      <h1 className="font-medium text-2xl text-center mb-5">Calendar</h1>
      <div className=" mx-auto relative" ref={inputRef}>
        <InputField
          className="text-xl"
          defaultValue={inputValue}
          onClick={handleInputClick}
          placeholder="dd/mm/yyyy"
        />



        {visible && (
          <div className=" width-30-rem absolute z-10 w-full  shadow-md rounded-md border-t  mt-1">
            <div className="flex justify-between border-b border-gray-100">
              <Dropdown
                value={year.toString()}
                options={years}
                onSelect={onYearSelect}
              />
              <Dropdown
                value={monthName}
                options={MONTH_NAMES}
                onSelect={onMonthSelect}
                position="left"
              />
            </div>
            <Calendar monthIndex={month} year={year} onClick={onDateSelect} />
          </div>
        )}
      </div>
    </>
  );
}
