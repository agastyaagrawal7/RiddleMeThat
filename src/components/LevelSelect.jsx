import styles from './LevelSelect.module.css';

export default function LevelSelect({ levels, progress, onStartLevel }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Select a Level</h2>
      <div className={styles.grid}>
        {levels.map((level) => {
          const isUnlocked = level.id <= progress.unlockedLevel;
          const completed = progress.completedLevels[level.id];
          const stars = completed ? completed.stars : 0;

          return (
            <button
              key={level.id}
              className={`${styles.levelCard} ${isUnlocked ? styles.unlocked : styles.locked} ${completed ? styles.completed : ''}`}
              onClick={() => isUnlocked && onStartLevel(level.id)}
              disabled={!isUnlocked}
            >
              {!isUnlocked && <div className={styles.lockIcon}>🔒</div>}
              <div className={styles.levelNum}>Level {level.id}</div>
              <div className={styles.difficulty}>{level.difficulty}</div>
              <div className={styles.mode}>
                {level.mode === 'multiple-choice' ? '🔘 Choice' : '⌨️ Type'}
              </div>
              {completed && (
                <div className={styles.stars}>
                  {[1, 2, 3].map((s) => (
                    <span key={s} className={s <= stars ? styles.starFilled : styles.starEmpty}>
                      ★
                    </span>
                  ))}
                </div>
              )}
              {completed && (
                <div className={styles.scoreInfo}>
                  {completed.score}/{completed.total}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
