import React from "react";

const TimeCol = () => {
  return (
    <div className="flex flex-col w-[120px] bg-red-300 py-20 border-l-1">
      <div className="h-60 border flex items-center justify-center">9am</div>
      <div className="h-60 flex items-center justify-center">10am</div>
      <div className="h-60 flex items-center justify-center">11am</div>
      <div className="h-60 flex items-center justify-center">12am</div>
      <div className="h-60 flex items-center justify-center">1pm</div>
      <div className="h-60 flex items-center justify-center">2pm</div>
      <div className="h-60 flex items-center justify-center">3pm</div>
      <div className="h-60 flex items-center justify-center">4pm</div>
      <div className="h-60 flex items-center justify-center">5pm</div>
      <div className="h-60 flex items-center justify-center">6pm</div>
    </div>
  );
};

export default TimeCol;
