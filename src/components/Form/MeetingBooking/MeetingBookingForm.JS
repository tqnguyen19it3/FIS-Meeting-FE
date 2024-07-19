import React from "react";

const MeetingBookingForm = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-overlay-gray10040 flex justify-center items-center">
      <div className="bg-white-white100 rounded-[10px] w-full max-w-1000 max-h-full">
        <div className="p-20">
          <span className="font-bold text-2xl">Đặt phòng họp</span>
        </div>

        <div className="grid grid-cols-3 gap-20 p-20 pt-0">
          <div>
            <span className="font-regular font-sans text-sm block mb-4 text-[#343434]">
              Tên người đặt
            </span>
            <div className="border-1 flex items-center rounded-[10px] px-12 py-8">
              <input
                className="text-sm w-full"
                name="abc"
                placeholder="Nhập"
                value=""
                onChange={() => {}}
              />
            </div>
          </div>
          <div>
            <span className="font-regular font-sans text-sm block mb-4 text-[#343434]">
              Tên người đặt
            </span>
            <div className="border-1 flex items-center rounded-[10px] px-12 py-8">
              <input
                className="text-sm w-full"
                name="abc"
                placeholder="Nhập"
                value=""
                onChange={() => {}}
              />
            </div>
          </div>
          <div>
            <span className="font-regular font-sans text-sm block mb-4 text-[#343434]">
              Tên người đặt
            </span>
            <div className="border-1 flex items-center rounded-[10px] px-12 py-8">
              <input
                className="text-sm w-full"
                name="abc"
                placeholder="Nhập"
                value=""
                onChange={() => {}}
              />
            </div>
          </div>

          <div>
            <span className="font-regular font-sans text-sm block mb-4 text-[#343434]">
              Ngày đặt lịch
            </span>
            <DatePicker
              className="text-sm"
              selected={null}
              placeholderText="Chọn"
              onChange={(date) => console.log(date)}
              customInput={
                <div className="px-12 py-8 flex items-center justify-between rounded-10 border">
                  <span className="font-sans font-regular text-sm text-[#7E7E7E]">
                    Chọn
                  </span>
                  <img src="{CalendarIcon}" width="{16}" height="{16}" />
                </div>
              }
            />
          </div>
          <div>
            <span className="font-regular font-sans text-sm block mb-4 text-[#343434]">
              Thời gian bắt đầu
            </span>
            <DatePicker
              showTimeSelect
              showTimeSelectOnly
              className="text-sm"
              selected={null}
              placeholderText="Chọn"
              onChange={(date) => console.log(date)}
              customInput={
                <div className="px-12 py-8 flex items-center justify-between rounded-10 border">
                  <span className="font-sans font-regular text-sm text-[#7E7E7E]">
                    Chọn
                  </span>
                  <img src="{CalendarIcon}" width="{16}" height="{16}" />
                </div>
              }
            />
          </div>
          <div>
            <span className="font-regular font-sans text-sm block mb-4 text-[#343434]">
              Thời lượng
            </span>
            <div className="border-1 flex items-center rounded-[10px] px-12 py-8">
              <input
                className="text-sm w-full"
                name="abc"
                placeholder="Nhập"
                value=""
                onChange={() => {}}
              />
            </div>
          </div>

          <div>
            <span className="font-regular font-sans text-sm block mb-4 text-[#343434]">
              Danh sách tham gia
            </span>
            <div className="border-1 flex items-center rounded-[10px] px-12 py-8">
              <input
                className="text-sm w-full"
                name="abc"
                placeholder="Nhập"
                value=""
                onChange={() => {}}
              />
            </div>
          </div>
          <div className="col-span-2">
            <span className="font-regular font-sans text-sm block mb-4 text-[#343434]">
              Lý do đặt phòng
            </span>
            <div className="border-1 flex items-center rounded-[10px] px-12 py-8">
              <input
                className="text-sm w-full"
                name="abc"
                placeholder="Nhập"
                value=""
                onChange={() => {}}
              />
            </div>
          </div>
        </div>

        <div className="p-20 flex gap-8 items-center justify-end">
          <button className="px-16 py-8 bg-[#D8D8D8] text-black font-sans font-medium rounded-[10px]">
            Huỷ bỏ
          </button>
          <button className="px-16 py-8 bg-[#F7C245] text-black font-sans font-medium rounded-[10px]">
            Đặt phòng
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeetingBookingForm;
