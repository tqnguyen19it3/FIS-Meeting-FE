import React from "react";

const TimeCol = () => {
  const hours = [
    "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
  ];
  return (
    <div className="flex flex-col w-[120px] bg-time-col-color py-[20px] border-l-[1px]">
      {hours.map((hour, index) => (
        <div key={index} className="h-[60px] flex font-semibold items-center justify-center">
          {hour}
        </div>
      ))}
    </div>
  );
};

export default React.memo(TimeCol);
