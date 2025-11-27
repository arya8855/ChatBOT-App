import { useState, useEffect } from "react";
import styles from "../Styles/formGenerator.module.css";

const ColorPicker = ({ name, onChange, disabled, placeholder, defaultValue }) => {
  const [selectedColor, setSelectedColor] = useState(defaultValue);
  const predefinedColors = ["#EB690F", "#FFFFFF", "#000000"];

  useEffect(() => {
    if (defaultValue) setSelectedColor(defaultValue);
  }, [defaultValue]);

  const handleColorChange = (color) => {
    setSelectedColor(color);
    onChange(color);
  };

  return (
    <div>
      <div className={styles["color-picker-wrapper"]}>
        {predefinedColors.map((color) => (
          <div
            key={color}
            style={{ backgroundColor: color }}
            className={`${styles["color-item"]} ${
              selectedColor === color ? styles["active"] : ""
            }`}
            onClick={() => handleColorChange(color)}
          />
        ))}
      </div>

      <div className={styles["color-input-wrapper"]}>
        <div className={styles["color-preview"]}>
          <input
            type="color"
            name={name}
            disabled={disabled}
            value={selectedColor}
            placeholder={placeholder}
            onChange={(e) => handleColorChange(e.target.value)}
            className={styles["color-input"]}
          />
          <div
            className={styles["color-box"]}
            style={{ backgroundColor: selectedColor }}
          />
        </div>

        <span className={styles["color-input-text"]}>{selectedColor}</span>
      </div>
    </div>
  );
};

export default ColorPicker;
