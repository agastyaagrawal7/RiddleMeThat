import styles from './ProgressBar.module.css';

export default function ProgressBar({ current, total }) {
  const pct = (current / total) * 100;
  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>
        Riddle {current} of {total}
      </div>
      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
