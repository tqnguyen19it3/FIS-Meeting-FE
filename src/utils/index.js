export const getStartAndEndOfWeek = (date) => {
  const inputDate = new Date(date);
  const start = new Date(inputDate);
  const end = new Date(inputDate);

  // Xác định ngày đầu tuần (Thứ Hai)
  const dayOfWeek = start.getDay();
  const differenceToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  start.setDate(start.getDate() + differenceToMonday);
  start.setHours(0, 0, 0, 0);

  // Xác định ngày cuối tuần (Chủ nhật)
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);

  // Đảm bảo ngày cuối tuần không bị lệch tháng
  if (end.getMonth() !== start.getMonth()) {
    end.setMonth(start.getMonth()); // Đặt tháng của endDate giống tháng của startDate
    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59, 999);
  }

  return {
    startDate: start.toISOString(),
    endDate: end.toISOString(),
  };
};

export const isWeekend = (date) => {
  const dayOfWeek = new Date(date).getDay();
  return dayOfWeek === 0 || dayOfWeek === 6; // 0 = Chủ nhật, 6 = Thứ bảy
};

export const getColorClasses = (status) => {
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

export function translateMeetingStatus(status) {
    const statusMap = {
      'scheduled': 'Đã lên lịch',
      'ongoing': 'Đang diễn ra',
      'completed': 'Đã hoàn thành',
      'cancelled': 'Đã hủy'
    };

    return statusMap[status] || 'Trạng thái chưa xác định';
}
