import React, { useEffect, useRef, useState } from 'react'
import { Else, If, Then, When } from 'react-if'

import DropdownItem from './DropdownItem'

import ArrowDownIcon from './arrowdownIcon.svg'

const Dropdown = ({
  type = 'single',
  title,
  placeholder,
  defaultOption,
  dataSelected,
  onSelect,
  data,
}) => {
  const [expanded, setExpanded] = useState(false)
  const [selectedItem, setSelectedItem] = useState(
    defaultOption != undefined ? defaultOption : null,
  )
  const dropdownRef = useRef(null)

  const rotateDeg = expanded ? 'rotate(180deg)' : 'rotate(0deg)'

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setExpanded(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef])

  const handleExpandDropdown = () => {
    setExpanded(!expanded)
  }

  const handleSelectItem = (item) => {
    setSelectedItem(item)
    if (type == 'single') setExpanded(false)
    if (onSelect) onSelect(item)
  }
  return (
    <div className="relative w-full font-regular font-sans text-sm" ref={dropdownRef}>
      <When condition={title}>
        <div className="flex mb-1">
          {title}
        </div>
      </When>

      <div
        onClick={handleExpandDropdown}
        className="border py-2 px-3 flex items-center justify-between rounded-[10px]">
        <div className="flex-1 flex items-center overflow-hidden">
          <If condition={type == 'single'}>
            <Then>
              <span>
                {selectedItem == null ? placeholder : selectedItem.label}
              </span>
            </Then>
            <Else>
              <span className="inline-block overflow-hidden text-ellipsis whitespace-nowrap">
                {dataSelected?.length === 0
                  ? placeholder
                  : dataSelected?.map(item => item.label).join(', ')}
              </span>
            </Else>
          </If>
        </div>
        <div
          style={{ transform: `${rotateDeg}`, transition: '0.2s linear' }}
          className="w-[16px] h-[16px] flex items-center justify-center">
          <img src={ArrowDownIcon} alt="dropdown_icon" width={8} height={6} />
        </div>
      </div>

      <When condition={expanded}>
        <div className="shadow-md w-full border-t-1 rounded-[10px] py-[6px] absolute z-50 max-h-[150px] overflow-auto bg-white">
          {data.map((item, index) => (
            <DropdownItem
              key={index}
              type={type}
              option={item}
              onSelectItem={item => handleSelectItem(item)}
              isSelected={
                type == 'single'
                  ? selectedItem?.value === item.value
                  : dataSelected?.some(data => data.value === item.value) ||
                    false
              }
            />
          ))}
        </div>
      </When>
    </div>
  )
}

export default Dropdown
