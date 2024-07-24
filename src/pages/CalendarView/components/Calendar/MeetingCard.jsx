import React from "react";
import moment from "moment-timezone";

const MeetingCard = ({ meetings }) => {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const getColorClasses = (status) => {
    switch (status) {
      case "scheduled":
        return {
          lBgClass: "bg-meeting-scheduled",
          rBgClass: "bg-meeting-scheduledBg",
          textClass: "text-meeting-scheduled",
        };
      case "ongoing":
        return {
          lBgClass: "bg-meeting-ongoing",
          rBgClass: "bg-meeting-ongoingBg",
          textClass: "text-meeting-ongoing",
        };
      case "completed":
        return {
          lBgClass: "bg-meeting-completed",
          rBgClass: "bg-meeting-completedBg",
          textClass: "text-meeting-completed",
        };
      case "cancelled":
        return {
          lBgClass: "bg-meeting-cancelled",
          rBgClass: "bg-meeting-cancelledBg",
          textClass: "text-meeting-cancelled",
        };
      default:
        return { lBgClass: "bg-gray-500", textClass: "text-gray-700" };
    }
  };

  const renderMeetingsForDay = (day) => {
    const filteredMeetings = meetings.filter((meeting) => {
      const meetingDay = moment(meeting.startTime)
        .tz("Asia/Ho_Chi_Minh")
        .isoWeekday();
      return meetingDay === day;
    });

    const transformedMeetingData = filteredMeetings.map((item, index) => {
      return index == 0
        ? {
            meetingName: item.meetingName,
            department: item.department,
            startTime: item.startTime,
            date: `${moment(item.startTime).tz("Asia/Ho_Chi_Minh").format('DD/MM/YYYY')}`,
            time: `${moment(item.startTime)
                    .tz("Asia/Ho_Chi_Minh")
                    .format("HH:mm")} 
                  - ${moment(item.endTime)
                    .tz("Asia/Ho_Chi_Minh")
                    .format("HH:mm")}`,
            heightStyle:
              +moment(item.endTime).tz("Asia/Ho_Chi_Minh").format("HH") -
              +moment(item.startTime).tz("Asia/Ho_Chi_Minh").format("HH") +
              1,
            mgStyle:
              +moment(item.startTime).tz("Asia/Ho_Chi_Minh").format("HH") - 9,
            status: item.status,
          }
        : {
            meetingName: item.meetingName,
            department: item.department,
            date: `${moment(item.startTime).tz("Asia/Ho_Chi_Minh").format('DD/MM/YYYY')}`,
            time: `${moment(item.startTime)
                    .tz("Asia/Ho_Chi_Minh")
                    .format("HH:mm")} 
                  - ${moment(item.endTime)
                    .tz("Asia/Ho_Chi_Minh")
                    .format("HH:mm")}`,
            heightStyle:
              +moment(item.endTime).tz("Asia/Ho_Chi_Minh").format("HH") -
              +moment(item.startTime).tz("Asia/Ho_Chi_Minh").format("HH") +
              1,
            mgStyle:
              +moment(item.startTime).tz("Asia/Ho_Chi_Minh").format("HH") -
              +moment(filteredMeetings[index - 1].endTime)
                .tz("Asia/Ho_Chi_Minh")
                .format("HH") -
              1,
            status: item.status,
          };
    });

    return transformedMeetingData.map((meeting, index) => {
      const margin = meeting.mgStyle >= 0 ? meeting.mgStyle : 0.03;
      const extraMargin = meeting.mgStyle >= 0 ? (index == 0 ? 20 : 60) : 0;
      const height = meeting.mgStyle >= 0 ? meeting.heightStyle : meeting.heightStyle - 1;
      const extraHeight = meeting.mgStyle >= 0 ? -60 : 0;
      return (
        <div
          key={index}
          style={{
            marginTop: `${margin * 60 + extraMargin}px`,
            height: `${height * 60 + extraHeight}px`,
          }}
          className={`overflow-hidden rounded-[8px] flex ${
            getColorClasses(meeting.status).lBgClass
          }`}
        >
          <div className="w-3 h-full"></div>
          <div
            className={`${
              getColorClasses(meeting.status).rBgClass
            } w-full text-start p-3 overflow-y-auto font-sans text-sm`}
          >
            <div className={"font-semibold text-base"}>{meeting.meetingName}</div>
            <div>{meeting.department}</div>
            <div>{meeting.time}</div>
            <div>{meeting.date}</div>
            <div className={`font-medium ${
              getColorClasses(meeting.status).textClass
            }`}>{meeting.status}</div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="flex-1 grid grid-cols-5">
      {daysOfWeek.map((day, index) => (
        <div
          key={index}
          className="border-r-[1px] border-[#dbdbdb] flex-1 flex flex-col p-5 bg-[#f7c2450d]"
        >
          {renderMeetingsForDay(index + 1)}
        </div>
      ))}
    </div>
  );
};

export default MeetingCard;
