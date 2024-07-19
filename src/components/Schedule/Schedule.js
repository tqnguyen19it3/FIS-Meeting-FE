import React from "react";
import HeaderRow from "./HeaderRow";
import TimeCol from "./TimeCol";
import MeetingCard from "./MeetingCard";

const Schedule = () => {
  return (
    <>
        <div className="flex flex-col mx-20 rounded-8 overflow-hidden shadow-md">
            <HeaderRow />
            <div className="overflow-auto flex">
                <TimeCol />
                <MeetingCard />
            </div>
        </div>
    </>
  );
};

export default Schedule;
