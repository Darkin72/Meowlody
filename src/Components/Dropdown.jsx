import React, { useState, useEffect, useRef } from "react";

const Dropdown = ({ buttonLabel, options, isHovered, onOpenChange, onOptionClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Hàm để lấy icon tương ứng cho mỗi option
  const getOptionIcon = (option) => {
    switch (option) {
      case "Add to playlist":
        return "fa-solid fa-plus";
      case "Properties":
        return "fa-solid fa-circle-info";
      case "Delete":
        return "fa-solid fa-trash";
      case "Play next":
        return "fa-solid fa-forward-step";
      case "Add to queue":
        return "fa-solid fa-list-ol";
      default:
        return null;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        if (onOpenChange) onOpenChange(false);
      }
    };


    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onOpenChange]);

  const toggleDropdown = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    if (onOpenChange) onOpenChange(newIsOpen);
  };

  const handleOptionClick = (option) => {
    setIsOpen(false);
    if (onOpenChange) onOpenChange(false);
    if (onOptionClick) onOptionClick(option);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`${isHovered ? "text-white" : "text-gray-900"} inline-block pb-[10px] text-xl focus:outline-none`}
      >
        {buttonLabel}
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 rounded-md border border-gray-500 bg-gray-800 shadow-lg">
          {options.map((option, index) => {
            const iconClass = getOptionIcon(option);
            return (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className="block w-full px-4 py-2 text-left text-white hover:bg-gray-700"
              >
                {iconClass && (
                  <i className={`${iconClass} mr-2 w-5 text-center`}></i>
                )}
                {option}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
