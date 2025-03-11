import React, { useState, useEffect, useRef } from "react";

const Dropdown = ({ buttonLabel, isHovered, onOpenChange, onOptionClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropDirection, setDropDirection] = useState("down"); // "down" hoặc "up"
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const options = [
    ["Play next", "fa-solid fa-forward-step"],
    ["Add to queue", "fa-solid fa-list-ol"],
    ["Properties", "fa-solid fa-circle-info"],
    ["Download", "fa-solid fa-download"],
    ["Delete", "fa-solid fa-trash"],
  ];
  
  const checkDropDirection = () => {
    if (buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      if (buttonRect.top > viewportHeight / 2) {
        setDropDirection("up");
      } else {
        setDropDirection("down");
      }
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
    checkDropDirection();
    
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
    <div
      className="pointer-events-auto relative inline-block text-left"
      ref={dropdownRef}
    >
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className={`${isHovered ? "text-white" : "text-gray-900"} inline-block pb-[10px] text-xl focus:outline-none`}
      >
        {buttonLabel}
      </button>

      {isOpen && (
        <div 
          className={`absolute ${dropDirection === "up" ? "bottom-full mb-2" : "top-full mt-2"} right-0 z-50 w-48 rounded-md border border-gray-500 bg-gray-800 shadow-lg`}
        >
          {options.map(([option, icon], index) => {
            return (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className="block w-full px-4 py-2 text-left text-white hover:bg-gray-700"
              >
                <i className={`${icon} mr-2 w-5 text-center`}></i>
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
