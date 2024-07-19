import React from "react";

const HeaderRow = () => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return (
    <div className="h-[56px] w-full bg-header-color pl-[120px] border-b-[1px]">
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
