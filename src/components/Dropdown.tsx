import React, { useState } from "react";

interface DropdownProps {
  options: string[];
  onSelect: (selectedOption: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <div>
      <label>Wähle einen Cache aus:</label>
      <select
        value={selectedOption || ""}
        onChange={(e) => handleSelect(e.target.value)}
      >
        <option value="" disabled>
          Wähle einen Cache aus:
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
