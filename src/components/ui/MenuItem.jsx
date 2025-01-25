import React, { useState, useCallback } from "react";
import { useAppContext } from "@/context/AppContext";
import { ICONS } from "@/assets";
import Icon from "./Icon";
import Link from "next/link";

const MenuItem = ({ title, style, isExpendable = false, menuItems }) => {
  const { setApplicationContext } = useAppContext() || {};
  const [selected, setSelected] = useState("Employees");
  const [isExpended, setExpended] = useState(true);

  const handleLinkClick = useCallback(
    (value) => {
      setApplicationContext({ pageName: value.title });
      setSelected(value.label);
    },
    [setApplicationContext]
  );

  const toggleExpendable = () => {
    setExpended((prev) => !prev);
  };

  return (
    <div className={`flex flex-col gap-3 mb-5`} style={style}>
      {title && (
        <div className="flex justify-between">
          <h3 className="text-light-gray font-bold leading-6 font-quicksand text-base tracking-widest">
            {title}
          </h3>
          {isExpendable && (
            <Icon
              src={ICONS.DownIcon}
              onClick={toggleExpendable}
              width={0.875}
              height={0.46}
            />
          )}
        </div>
      )}

      <ul
        className={`flex flex-col gap-3 transition-all duration-300 ease-in-out overflow-hidden ${
          isExpended ? "max-h-screen" : "max-h-0"
        }`}
      >
        {Object.entries(menuItems).map(([key, value]) => (
          <li
            key={key}
            className={`flex flex-row items-center ml-2 gap-[10px] ${
              selected === value.label
                ? "bg-light-gray-100 border-light-gray-200 border-[1px] rounded-[12px] px-1 py-[2px]"
                : ""
            } hover:bg-light-gray-400 hover:border-[#02B9B0] hover:border-[1px] hover:rounded-[12px] hover:p-[2px]`}
          >
            <Icon
              src={value.icon}
              className="w-6 h-6"
              alt={`${value.label} Icon`}
            />
            <Link
              className={`block   rounded font-medium leading-5 text-base  px-2 py-2 text-dark-gray hover:text-gray-700  ${
                value.disabled ? "pointer-events-none" : ""
              }`}
              onClick={() => handleLinkClick(value)}
              href={value?.path || "/"}
              aria-current={selected === value.label ? "page" : undefined}
            >
              {value.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(MenuItem);
