import styles from './Header.module.css';

export default function Header({ totalScore, onReset }) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span className={styles.icon}>🧩</span>
        <h1 className={styles.title}>RiddleMeThat</h1>
      </div>
      <div className={styles.stats}>
        <div className={styles.score}>
          <span className={styles.scoreIcon}>⭐</span>
          <span>{totalScore}</span>
        </div>
        <button className={styles.resetBtn} onClick={onReset} title="Reset Progress">
          ↺
        </button>
      </div>
    </header>
  );
}
