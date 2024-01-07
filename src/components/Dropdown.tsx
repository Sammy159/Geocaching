import React, { useState } from "react";

/**
 * Props for the Dropdown component.
 */
interface DropdownProps {
  /**
   * A callback function that is invoked when an option is selected.
   * @param selectedOption - The selected option as a string.
   */
  onSelect: (selectedOption: string) => void;
}

/**
 * A React component that displays a dropdown menu of cache options.
 * @param {DropdownProps} props - The properties for the Dropdown component.
 */
const Dropdown: React.FC<DropdownProps> = ({ onSelect }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [options, setOptions] = useState<string[]>([
    "Cache Cafe",
    "Cache Blume",
    "Cache Baum",
    "Cache Wasser",
    "Cache Wolke",
    "Cache Sitzplatz",
    "Cache Trophäe",
    "Cache Grill",
    "Cache Ball",
    "Cache Fragezeichen",
  ]);

  /**
   * Handles the selection of an option and triggers the onSelect callback.
   * @param option - The selected option as a string.
   */
  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setOptions(options.filter((opt) => opt !== option));
    onSelect(option);
  };

  return (
    <div>
      <label>Choose a cache:</label>
      <select
        value={selectedOption || ""}
        onChange={(e) => handleSelect(e.target.value)}
      >
        <option value="" disabled>
          Select a cache
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
