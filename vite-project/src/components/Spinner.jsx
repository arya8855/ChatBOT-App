import styles from '../Styles/spinner.module.css';

const Spinner = () => (
  <div className={styles["spinner-overlay"]}>
    <div className={styles["spinner"]} />
  </div>
)

export default Spinner