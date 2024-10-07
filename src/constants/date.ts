export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const MONTH_DAYS = {
  January: 31,
  February: 28, // 29 in leap years
  March: 31,
  April: 30,
  May: 31,
  June: 30,
  July: 31,
  August: 31,
  September: 30,
  October: 31,
  November: 30,
  December: 31,
};

export const getDate = (
  year_ = new Date().getFullYear(),
  month_ = new Date().getMonth(),
  date_ = new Date().getDate(),
) => {
  const dt = new Date(year_, month_, date_);
  const day = dt.getDay();
  const month = dt.getMonth();
  const year = dt.getFullYear();
  const date = dt.getDate();
  return {
    date,
    day,
    month,
    year,
  };
};

export const getMonthName = (year_?: number, month_?: number) => {
  const { month } = getDate(year_, month_);
  return MONTH_NAMES[month];
};

export const getMonthDays = (year_?: number, month_?: number) => {
  const monthName = getMonthName(year_, month_) as keyof typeof MONTH_DAYS;
  return MONTH_DAYS[monthName];
};

export const getMonthStartDay = (year_?: number, month_?: number) => {
  const { month, year } = getDate(year_, month_);
  // month is 0-indexed (0 for January, 1 for February, etc.)
  const date = new Date(year, month);
  return date.getDay(); // returns a number from 0 (Sunday) to 6 (Saturday)
};

export const DAY_NAMES = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export const formatDateNumber = (num:number)=>{
  return num.toString().padStart(2,"0")
}
