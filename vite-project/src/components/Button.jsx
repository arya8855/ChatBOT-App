import React from "react";
import clsx from "clsx";
import "../components/css/button.css";

const Button = ({
  children,
  variant = "default",
  color = "primary",
  icon,
  iconPosition = "left",
  isLoading = false,
  loadingText = "Loading...",
  disabled = false,
  size = "md",
  className,
  ...rest
}) => {
  const colorClass = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    success: "bg-success",
    danger: "bg-danger",
    warning: "bg-warning",
    none: "text-dark",
  };

  return (
    <button
      className={clsx(
        "btn",
        `btn-${size}`,
        variant === "outline" ? "btn-outline" : colorClass[color],
        (disabled || isLoading) && "disabled",
        className
      )}
      disabled={isLoading || disabled}
      {...rest}
    >
      {isLoading && <span className="spinner"></span>}

      {icon && iconPosition === "left" && (
        <img src={icon} alt="" width={15} height={15} className="icon-left" />
      )}

      {isLoading ? loadingText : children}

      {icon && iconPosition === "right" && (
        <img src={icon} alt="" width={15} height={15} className="icon-right" />
      )}
    </button>
  );
};

export default Button;
