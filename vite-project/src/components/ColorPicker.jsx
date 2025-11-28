import { useState, useEffect } from "react";
import "./css/formGenerator.css";

const ColorPicker = ({ name, onChange, disabled, placeholder, defaultValue }) => {
  const [selectedColor, setSelectedColor] = useState(defaultValue);
  const predefinedColors = ["#33475B", "#FFFFFF", "#000000"];

  useEffect(() => {
    if (defaultValue) setSelectedColor(defaultValue);
  }, [defaultValue]);

  const handleColorChange = (color) => {
    setSelectedColor(color);
    onChange(color);
  };

  return (
    <div>
      <div className="color-picker-wrapper">
        {predefinedColors.map((color) => (
          <div
            key={color}
            style={{ backgroundColor: color }}
            className={`${"color-item"} ${
              selectedColor === color ? "active" : ""
            }`}
            onClick={() => handleColorChange(color)}
          />
        ))}
      </div>

      <div className="color-input-wrapper">
        <div className="color-preview">
          <input
            type="color"
            name={name}
            disabled={disabled}
            value={selectedColor}
            placeholder={placeholder}
            onChange={(e) => handleColorChange(e.target.value)}
            className="color-input"
          />
          <div
            className="color-box"
            style={{ backgroundColor: selectedColor }}
          />
        </div>

        <span className="color-input-text">{selectedColor}</span>
      </div>
    </div>
  );
};

export default ColorPicker;
