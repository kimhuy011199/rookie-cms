import styles from './style.module.css';

interface SpinnerInterface {
  isLoading: boolean;
}

function Spinner(props: SpinnerInterface) {
  const { isLoading } = props;

  if (!isLoading) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
    </div>
  );
}

export default Spinner;
