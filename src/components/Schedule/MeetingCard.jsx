import React, { useState, useEffect } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import moment from "moment-timezone";

const MeetingCard = ({ meetings, loading }) => {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const getColorClasses = (status) => {
    switch (status) {
      case "scheduled":
        return {
          bgClass: "bg-meeting-scheduled",
          textClass: "text-meeting-scheduled",
        };
      case "ongoing":
        return {
          bgClass: "bg-meeting-ongoing",
          textClass: "text-meeting-ongoing",
        };
      case "completed":
        return {
          bgClass: "bg-meeting-completed",
          textClass: "text-meeting-completed",
        };
      case "cancelled":
        return {
          bgClass: "bg-meeting-cancelled",
          textClass: "text-meeting-cancelled",
        };
      default:
        return { bgClass: "bg-gray-500", textClass: "text-gray-700" };
    }
  };

  const renderMeetingsForDay = (day) => {
    const filteredMeetings = meetings.filter((meeting) => {
      const meetingDay = moment(meeting.startTime)
        .tz("Asia/Ho_Chi_Minh")
        .isoWeekday();
      return meetingDay === day;
    });

    const newFilteredMeetings = filteredMeetings.map((item, index) => {
      return index == 0
        ? {
            meetingName: item.meetingName,
            department: item.department,
            startTime: item.startTime,
            height:
              +moment(item.endTime).tz("Asia/Ho_Chi_Minh").format("HH") -
              +moment(item.startTime).tz("Asia/Ho_Chi_Minh").format("HH") +
              1,
            mg: +moment(item.startTime).tz("Asia/Ho_Chi_Minh").format("HH") - 9,
            endTime: item.endTime,
            status: item.status,
          }
        : {
            meetingName: item.meetingName,
            department: item.department,
            startTime: item.startTime,
            height:
              +moment(item.endTime).tz("Asia/Ho_Chi_Minh").format("HH") -
              +moment(item.startTime).tz("Asia/Ho_Chi_Minh").format("HH") +
              1,
            mg:
              +moment(item.startTime).tz("Asia/Ho_Chi_Minh").format("HH") -
              +moment(filteredMeetings[index - 1].endTime)
                .tz("Asia/Ho_Chi_Minh")
                .format("HH") -
              1,
            endTime: item.endTime,
            status: item.status,
          };
    });

    console.log(newFilteredMeetings);
    // const test = +(moment(filteredMeetings[0].startTime).tz("Asia/Ho_Chi_Minh").format('HH')) - 9
    // console.log("aaaaaa: ", test);

    // const testb = (test * 60)+"px";

    return newFilteredMeetings.map((meeting, index) => (
      <div
        key={index}
        style={{
          marginTop: `${meeting.mg * 60}px`,
          height: `${meeting.height * 60}px`,
        }}
        className={`overflow-hidden rounded-[8px] flex ${
          getColorClasses(meeting.status).bgClass
        }`}
      >
        <div className="w-3 h-full"></div>
        <div className="bg-[#FFF1E9] w-full p-0">
          <div
            className={` font-semibold ${
              getColorClasses(meeting.status).textClass
            }`}
          >
            {meeting.meetingName}
          </div>
          <div>{meeting.department}</div>
          <div>
            Ngày {moment(meeting.startTime).tz("Asia/Ho_Chi_Minh").date()} Từ{" "}
            {moment(meeting.startTime).tz("Asia/Ho_Chi_Minh").format("HH:mm")} -{" "}
            {moment(meeting.endTime).tz("Asia/Ho_Chi_Minh").format("HH:mm")}
          </div>
        </div>
      </div>
    ));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={150} color={"#123abc"} loading={loading} />
      </div>
    );
  }

  return (
    <div className="flex-1 grid grid-cols-5">
      {daysOfWeek.map((day, index) => (
        <div
          key={index}
          className="border-r-[1px] flex-1 flex flex-col p-5 bg-[#F7C245] bg-opacity-5"
        >
          {renderMeetingsForDay(index + 1)}
        </div>
      ))}
    </div>
  );
};

export default MeetingCard;
