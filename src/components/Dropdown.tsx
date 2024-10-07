import { useRef, useState } from "react";
import { ArrowDown } from "../icons";
import useClickOutside from "../hooks/useClickOutside";

type DropdownProps = {
  value: string;
  options: string[];
  onSelect: (option: string, index: number) => void;
  position?: "left" | "right" | "top" | "bottom"
};
export default function Dropdown({
  value = "Select",
  options,
  onSelect,
  position
}: DropdownProps) {
  const [visible, setVisible] = useState(false);
  const dropdownRef = useRef(null)

  const handleSelect = (option: string, idx: number) => {
    onSelect?.(option, idx);
    setVisible(false);
  };

  useClickOutside(dropdownRef, ()=> setVisible(false))

  const dropdownPosition = () => {
    switch (position) {
      case "left":
        return "right-0"
      case "right":
        return "left-0"
      case "top":
        return "bottom-0"
      case "bottom":
        return "top-0"
        
      default:
        return "left-0"
    }
  }

  return (
    <>
      <div className="relative inline-block" ref={dropdownRef}>
          <button
            type="button"
            className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-md px-3 py-2 font-medium"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
            onClick={() => setVisible((prev) => !prev)}
          >
            {value}
            <ArrowDown />
          </button>
        {visible && (
          <div
            className={`absolute ${dropdownPosition()} grid grid-cols-3 gap-1 place-items-center p-2 w-80 z-10 min-w-20 bg-white origin-top-right rounded-md  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex={-1}
          >
            {options?.map((option, idx) => (
              <span key={option} className="py-1" role="none">
                <div
                  className={`rounded cursor-pointer px-4 py-2 text-sm ${
                    value === option ? "bg-blue-600 text-white" : ""
                  }`}
                  role="menuitem"
                  tabIndex={-1}
                  id="menu-item-0"
                  onClick={() => handleSelect(option, idx)}
                >
                  {option}
                </div>
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
