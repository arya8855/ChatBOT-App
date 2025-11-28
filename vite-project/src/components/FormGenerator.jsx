import { Fragment, useEffect, useState } from "react";
import INFO_ICON from "../assets/nofitication.svg";
import "./css/formGenerator.css";

const FormGenerator = ({
  inputType,
  options,
  label,
  checkboxLabel,
  defaultValue = "",
  placeholder,
  name,
  type = "text",
  lines = 3,
  className,
  validation = {},
  error,
  hasRequiredMark = false,
  disabled = false,
  suggesstionText = "",
  onUpdate,
}) => {
  const [value, setValue] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (defaultValue) setValue(defaultValue);
  }, [defaultValue]);

  const validateField = (val) => {
    if (validation.required && (!val || (typeof val === "string" && !val.trim())))
      return "This field is required.";

    if (validation.minLength && typeof val === "string" && val.length < validation.minLength)
      return `Minimum length is ${validation.minLength}.`;

    if (validation.maxLength && typeof val === "string" && val.length > validation.maxLength)
      return `Maximum length is ${validation.maxLength}.`;

    if (validation.min !== undefined && typeof val === "number" && val < validation.min)
      return `Minimum value is ${validation.min}.`;

    if (validation.max !== undefined && typeof val === "number" && val > validation.max)
      return `Maximum value is ${validation.max}.`;

    if (validation.pattern && typeof val === "string" && !validation.pattern.test(val))
      return validation.errorMessage ?? "Invalid format.";

    if (validation.validate) {
      const customError = validation.validate(val);
      if (customError) return customError;
    }

    return null;
  };

  const handleChange = (event) => {
    let newValue = event.target.value;

    if (event.target.type === "checkbox") {
      newValue = event.target.checked;
    }

    setValue(newValue);
    onUpdate(name, newValue, validateField(newValue));
  };

  return (
    <label className={`form-group ${className ? className : ""}`}>
      {label && (
        <span className="form-label">
          {label}
          {hasRequiredMark && validation.required && (
            <span className="text-danger ps-2">*</span>
          )}
        </span>
      )}

      <div className="input-wrapper">
        {/* INPUT */}
        {inputType === "input" && (
          <div className="input-suggestion-wrapper">
            <input
              type={type}
              name={name}
              placeholder={placeholder}
              value={typeof value === "string" ? value : ""}
              onChange={handleChange}
              disabled={disabled}
              minLength={validation.minLength}
              maxLength={validation.maxLength}
              autoComplete="off"
              onFocus={() => setIsFocused(true)}
              className={`form-input ${isFocused && error ? "input-error" : ""} ${
                disabled ? "cursor-blocked" : ""
              }`}
            />

            {suggesstionText !== "" && (
              <div className="suggesstion-info-wrapper">
                <img src={INFO_ICON} alt="info" width={15} />
                <span className="suggesstion-text">{suggesstionText}</span>
              </div>
            )}
          </div>
        )}

        {/* SELECT */}
        {inputType === "select" && options && (
          <>
            <select
              name={name}
              value={typeof value === "string" ? value : ""}
              onChange={handleChange}
              className={`form-input ${disabled ? "cursor-blocked" : ""}`}
            >
              <option value="" disabled>
                {placeholder || "Select an option"}
              </option>

              {options.map((option) => (
                <option key={option.id} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {suggesstionText !== "" && (
              <div className="suggesstion-info-wrapper">
                <img src={INFO_ICON} alt="info" width={15} />
                <span className="suggesstion-text">{suggesstionText}</span>
              </div>
            )}
          </>
        )}

        {/* TEXTAREA */}
        {inputType === "textarea" && (
          <>
            <textarea
              name={name}
              placeholder={placeholder}
              rows={lines}
              value={typeof value === "string" ? value : ""}
              onChange={handleChange}
              className={`form-input ${disabled ? "cursor-blocked" : ""}`}
            />

            {suggesstionText !== "" && (
              <div className="suggesstion-info-wrapper">
                <img src={INFO_ICON} alt="info" width={15} />
                <span className="suggesstion-text">{suggesstionText}</span>
              </div>
            )}
          </>
        )}

        {/* CHECKBOX */}
        {inputType === "checkbox" && (
          <div className="form-checkbox">
            <input
              type="checkbox"
              name={name}
              checked={typeof value === "boolean" ? value : false}
              onChange={handleChange}
              className={`checkbox-input ${disabled ? "cursor-blocked" : ""}`}
            />

            {checkboxLabel && <span className="form-label">{checkboxLabel}</span>}

            {suggesstionText !== "" && (
              <div className="suggesstion-info-wrapper">
                <img src={INFO_ICON} alt="info" width={15} />
                <span className="suggesstion-text">{suggesstionText}</span>
              </div>
            )}
          </div>
        )}

        {/* RADIO */}
        {inputType === "radio" && options && (
          <div className="form-radio">
            {options.map((option) => (
              <Fragment key={option.value}>
                <label className="radio-label">
                  <input
                    type="radio"
                    name={name}
                    value={option.value}
                    checked={value === option.value}
                    onChange={handleChange}
                    className={`radio-input ${disabled ? "cursor-blocked" : ""}`}
                  />
                  {option.label}
                </label>

                {suggesstionText !== "" && (
                  <div className="suggesstion-info-wrapper">
                    <img src={INFO_ICON} alt="info" width={15} />
                    <span className="suggesstion-text">{suggesstionText}</span>
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        )}

        {/* COLOR PICKER */}
        {inputType === "color" && (
          <ColorPicker
            name={name}
            onChange={(color) => onUpdate(name, color, validateField(color))}
            disabled={disabled}
            placeholder={placeholder}
            defaultValue={defaultValue}
          />
        )}

        {isFocused && error && <span className="form-error">{error}</span>}
      </div>
    </label>
  );
};

export default FormGenerator;