import React, { useState, useEffect, useRef } from "react";

const Dropdown = ({ buttonLabel, options, isHovered, onOpenChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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
    console.log(`Selected: ${option}`);
    setIsOpen(false);
    if (onOpenChange) onOpenChange(false);
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
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              className="block w-full px-4 py-2 text-left text-white hover:bg-gray-700"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
