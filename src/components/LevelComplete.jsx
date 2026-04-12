import styles from './LevelComplete.module.css';

export default function LevelComplete({ results, totalLevels, onNext, onLevelSelect }) {
  const { levelId, score, total, stars } = results;
  const isLastLevel = levelId >= totalLevels;

  let message;
  if (stars === 3) message = 'Perfect! You\'re a riddle master!';
  else if (stars === 2) message = 'Great job! You really know your riddles!';
  else if (stars === 1) message = 'Not bad! Try again for a better score.';
  else message = 'Keep practicing! You\'ll get them next time.';

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.heading}>Level {levelId} Complete!</h2>
        <div className={styles.stars}>
          {[1, 2, 3].map((s) => (
            <span key={s} className={s <= stars ? styles.starFilled : styles.starEmpty}>
              ★
            </span>
          ))}
        </div>
        <div className={styles.score}>
          {score} / {total} correct
        </div>
        <p className={styles.message}>{message}</p>
        <div className={styles.actions}>
          <button className={styles.secondaryBtn} onClick={onLevelSelect}>
            Level Select
          </button>
          {!isLastLevel && (
            <button className={styles.primaryBtn} onClick={onNext}>
              Next Level →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
