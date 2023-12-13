import React, { useState } from "react";

interface DropdownProps {
  onSelect: (selectedOption: string) => void;
}

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

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setOptions(options.filter((option) => option !== selectedOption));
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
          Auswahl Caches
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
