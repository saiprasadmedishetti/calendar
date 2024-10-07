import {
  DAY_NAMES,
  getDate,
  getMonthDays,
  getMonthStartDay,
} from "../constants/date";

type CalendarProps = {
  monthIndex: number;
  year: number;
  onClick: (d:number,m:number, y:number) => void
};

export default function Calendar({ monthIndex, year, onClick }: CalendarProps) {
  const { date, month, year: currentYear } = getDate();
  const daysInMonth = getMonthDays(year, monthIndex);
  const startDay = getMonthStartDay(year, monthIndex);

  return (
    <div className="grid grid-cols-7">
      {DAY_NAMES.map((day) => (
        <div
          key={day}
          className="font-medium py-5 text-slate-600 text-center mb-2 border-b border-gray-100"
        >
          {day}
        </div>
      ))}
      {Array.from({ length: daysInMonth + startDay }, (_, idx) => {
        const currentDate = idx + 1 - startDay;
        return (
          <div
            key={idx}
            className={`${
              currentDate === date &&
              month === monthIndex &&
              year === currentYear
                ? "bg-blue-600 border-blue-600 text-white"
                : "border-slate-800"
            } cursor-pointer text-xl p-3 text-center rounded-md`}
            onClick={() => onClick(currentDate, monthIndex, year)}
          >
            {startDay <= idx ? currentDate : ""}
          </div>
        );
      })}
    </div>
  );
}
