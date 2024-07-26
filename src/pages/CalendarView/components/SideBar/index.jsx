import React from 'react'

import CalendarIcon from '../Calendar/calendarIcon.svg'

const Sidebar = () => {
  return (
    <div className="w-[86px] bg-[#1E2328]">
      <div className="mt-[84px] flex items-center justify-center relative">
        <div className="h-[44px] w-2 rounded-[12px] rounded-br-12 bg-[#F7C245] absolute left-0 top-1/2 translate-y-[-50%]"></div>
        <div className="w-[54px] h-[54px]  bg-[#414042] flex items-center justify-center rounded-[12px] m-1">
          <div className="w-[44px] h-[44px] bg-[#505050] flex items-center justify-center rounded-[12px]">
            <a href="/">
              <img src={CalendarIcon} width={24} height={24} alt='Calendar Icon'/>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
