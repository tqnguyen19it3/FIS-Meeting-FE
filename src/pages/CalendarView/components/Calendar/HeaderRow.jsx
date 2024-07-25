import React from "react";

const HeaderRow = () => {
  const days = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6"];

  return (
    <div className="h-[60px] w-full bg-header-color pl-[120px] border-b-[1px]">
      <div className="h-full grid grid-cols-5 items-center">
        {days.map((day, index) => (
          <span key={index} className="text-center font-bold">
            {day}
          </span>
        ))}
      </div>
    </div>
  );
};

export default HeaderRow;
