import React from "react";
import clsx from "clsx";
import styles from '../Styles/button.module.css';


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
    primary: styles["bg-primary"],
    secondary: styles["bg-secondary"],
    success: styles["bg-success"],
    danger: styles["bg-danger"],
    warning: styles["bg-warning"],
    none: styles["text-dark"],
  };

   return (
    <button
      className={clsx(
        styles.btn,
        styles[`btn-${size}`],
        variant === "outline"
          ? styles["btn-outline"]
          : colorClass[color],
        (disabled || isLoading) && styles.disabled,
        className
      )}
      disabled={isLoading || disabled}
      {...rest}
    >
    
      {isLoading && <span className={styles.spinner}></span>}

      {icon && iconPosition === "left" && (
        <img
          src={icon}
          alt=""
          width={15}
          height={15}
          className={styles["icon-left"]}
        />
      )}

      {isLoading ? loadingText : children}

      {icon && iconPosition === "right" && (
        <img
          src={icon}
          alt=""
          width={15}
          height={15}
          className={styles["icon-right"]}
        />
      )}
    </button>
  );
};

export default Button;