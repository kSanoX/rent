import { useEffect } from "react";
import { useState } from "react";
import "./AutocompleteInput.css";
const AutocompleteInput = ({ value, onChange, options, onAddNew }) => {
    const [inputValue, setInputValue] = useState(value || "");
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
  
    useEffect(() => {
      if (inputValue.trim() === "") {
        setFilteredOptions([]);
      } else {
        const filtered = options.filter((opt) =>
          opt.toLowerCase().includes(inputValue.toLowerCase())
        );
        setFilteredOptions(filtered);
      }
    }, [inputValue, options]);
  
    const handleSelect = (val) => {
      setInputValue(val);
      onChange(val);
      setShowDropdown(false);
    };
  
    const handleBlur = () => {
      setTimeout(() => setShowDropdown(false), 150); // чтобы не исчезло сразу при клике
    };
  
    const handleAddNew = () => {
      onAddNew(inputValue);
      onChange(inputValue);
      setShowDropdown(false);
    };
  
    return (
      <div className="autocomplete-input">
        <input
          type="text"
          className="form-input"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          onBlur={handleBlur}
          placeholder="Type or select"
        />
        {showDropdown && filteredOptions.length > 0 && (
          <ul className="autocomplete-list">
            {filteredOptions.map((opt, idx) => (
              <li key={idx} onClick={() => handleSelect(opt)}>
                {opt}
              </li>
            ))}
          </ul>
        )}
        {showDropdown && inputValue && !options.includes(inputValue) && (
          <div className="autocomplete-add-new" onClick={handleAddNew}>
            Add new: <strong>{inputValue}</strong>
          </div>
        )}
      </div>
    );
  };
  
  export default AutocompleteInput;