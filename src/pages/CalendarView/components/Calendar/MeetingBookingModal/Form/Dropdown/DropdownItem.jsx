import React from 'react'
import { Else, If, Then } from 'react-if'
import CheckboxIcon from './CheckboxIcon'

const DropdownItem = ({
  option,
  type = 'single',
  onSelectItem,
  isSelected = false,
}) => {
  const handleItemClick = () => {
    onSelectItem(option)
  }

  return (
    <If condition={type == 'single'}>
      <Then>
        <div
          style={{ backgroundColor: isSelected ? '#F7C245' : '' }}
          onClick={handleItemClick}
          className="hover:bg-gray-100 font-sans font-regular text-sm py-[6px] px-[12px] rounded-[10px] cursor-pointer">
          {option.label}
        </div>
      </Then>
      <Else>
        <div
          onClick={handleItemClick}
          className="py-[2px] px-[12px] rounded-[10px] flex items-center gap-[4px] cursor-pointer">
          <CheckboxIcon fill={isSelected ? '#F7C245' : '#FFFFFF'} />
          <span className="mt-[2px] font-sans font-regular overflow-hidden text-sm text-black]">
            {option.label}
          </span>
        </div>
      </Else>
    </If>
  )
}

export default DropdownItem
