import { forwardRef } from "react";
import CalendarIcon from "../icons/Calendar";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const InputField = forwardRef<HTMLInputElement, InputProps>(
  ({ type = "text", className, ...rest }, ref) => {
    return (
      <div className="relative text-slate-600" >
        <input
          type={type}
          ref={ref}
          {...rest}
          className={`block w-full rounded-md border-0 py-2 pl-5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6 ${className}`}
        />
        <CalendarIcon className="absolute right-2 top-2 select-none pointer-events-none" />
      </div>
    );
  }
);

export default InputField;
