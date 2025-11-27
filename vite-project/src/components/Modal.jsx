import Button from "./Button";
import styles from "../Styles/modal.module.css";

const Modal = ({
  open,
  onClose,
  title,
  children,
  size = "medium",
  closeButton = true,
  className = "",
  hasFooter = false,
}) => {
  if (!open) return null

  const handleClose = () => onClose(false)

  return (
    <div
      className={styles["modal-overlay"]}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose()
      }}
    >

    <div
        className={[
          styles["modal-container"],
          styles[`modal-${size}`],
          className, // user custom classes
        ].join(" ")}
      >
      <div className={styles["modal-header"]}>
          {title && <div className={styles["modal-title"]}>{title}</div>}

          {closeButton && (
            <button className={styles["modal-close-btn"]} onClick={handleClose}>
              ✖
            </button>
          )}
        </div>
        <div className={styles["modal-content"]}>{children}</div>

        {hasFooter && (
          <Button
            onClick={handleClose}
            color="secondary"
            className="m-l-auto"
            size="sm"
          >
            Close
          </Button>
        )}
      </div>
    </div>
  )
}

export default Modal