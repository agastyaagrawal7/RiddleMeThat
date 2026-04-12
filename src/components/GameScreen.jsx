import { useState, useCallback } from 'react';
import ProgressBar from './ProgressBar';
import MultipleChoice from './MultipleChoice';
import TypeAnswer from './TypeAnswer';
import styles from './GameScreen.module.css';

export default function GameScreen({ level, onComplete, onBack }) {
  const [riddleIndex, setRiddleIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [hintVisible, setHintVisible] = useState(false);
  const [flipped, setFlipped] = useState(false);

  const riddle = level.riddles[riddleIndex];
  const total = level.riddles.length;

  const handleAnswer = useCallback(
    (isCorrect) => {
      const newScore = isCorrect ? score + 1 : score;
      setHintVisible(false);
      setFlipped(false);
      if (riddleIndex + 1 < total) {
        setScore(newScore);
        setRiddleIndex((i) => i + 1);
      } else {
        onComplete(level.id, newScore, total);
      }
    },
    [riddleIndex, score, total, level.id, onComplete]
  );

  const handleFlipReveal = useCallback(() => {
    setFlipped(true);
  }, []);

  const handleFlipNext = useCallback(() => {
    // Flipping counts as not answering correctly
    setHintVisible(false);
    setFlipped(false);
    if (riddleIndex + 1 < total) {
      setRiddleIndex((i) => i + 1);
    } else {
      onComplete(level.id, score, total);
    }
  }, [riddleIndex, score, total, level.id, onComplete]);

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={onBack}>
          ← Back
        </button>
        <div className={styles.levelInfo}>
          Level {level.id}{' '}
          <span className={styles.diffBadge}>{level.difficulty}</span>
        </div>
        <div className={styles.scoreDisplay}>
          {score}/{total}
        </div>
      </div>

      <ProgressBar current={riddleIndex + 1} total={total} />

      <div className={styles.riddleArea}>
        {/* Flip Card */}
        <div className={`${styles.flipCard} ${flipped ? styles.flipped : ''}`}>
          <div className={styles.flipCardInner}>
            <div className={styles.flipCardFront}>
              <div className={styles.question}>{riddle.question}</div>
            </div>
            <div className={styles.flipCardBack}>
              <div className={styles.answerLabel}>Answer</div>
              <div className={styles.answerText}>{riddle.answer}</div>
              <button className={styles.nextAfterFlip} onClick={handleFlipNext}>
                Continue →
              </button>
            </div>
          </div>
        </div>

        {!flipped && (
          <>
            <div className={styles.hintRow}>
              {!hintVisible && (
                <button className={styles.hintBtn} onClick={() => setHintVisible(true)}>
                  💡 Show Hint
                </button>
              )}
              <button className={styles.flipBtn} onClick={handleFlipReveal}>
                🔄 Flip Card
              </button>
            </div>
            {hintVisible && <div className={styles.hint}>💡 {riddle.hint}</div>}

            {level.mode === 'multiple-choice' ? (
              <MultipleChoice key={riddle.id} riddle={riddle} onAnswer={handleAnswer} />
            ) : (
              <TypeAnswer key={riddle.id} riddle={riddle} onAnswer={handleAnswer} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
