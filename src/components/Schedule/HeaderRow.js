import React from "react";

const HeaderRow = () => {
  return (
    <div className="h-56 w-full bg-[#FFEBA2] pl-[120px] border-b-1">
      <div className="h-full grid grid-cols-5 items-center">
        <span className="text-center">Monday</span>
        <span className="text-center">Tuesday</span>
        <span className="text-center">Wednesday</span>
        <span className="text-center">Thursday</span>
        <span className="text-center">Friday</span>
      </div>
    </div>
  );
};

export default HeaderRow;
