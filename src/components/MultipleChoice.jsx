import { useState, useMemo } from 'react';
import styles from './MultipleChoice.module.css';

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function MultipleChoice({ riddle, onAnswer }) {
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const options = useMemo(
    () => shuffleArray([riddle.answer, ...riddle.wrongAnswers]),
    [riddle.id]
  );

  const handleSelect = (option) => {
    if (revealed) return;
    setSelected(option);
    setRevealed(true);
    const isCorrect = option.toLowerCase().trim() === riddle.answer.toLowerCase().trim();
    setTimeout(() => {
      onAnswer(isCorrect);
      setSelected(null);
      setRevealed(false);
    }, 1800);
  };

  return (
    <div className={styles.options}>
      {options.map((option) => {
        let cls = styles.option;
        if (revealed && option === selected) {
          cls +=
            ' ' +
            (option.toLowerCase().trim() === riddle.answer.toLowerCase().trim()
              ? styles.correct
              : styles.wrong);
        } else if (
          revealed &&
          option.toLowerCase().trim() === riddle.answer.toLowerCase().trim()
        ) {
          cls += ' ' + styles.correctReveal;
        }
        return (
          <button key={option} className={cls} onClick={() => handleSelect(option)} disabled={revealed}>
            {option}
          </button>
        );
      })}
    </div>
  );
}
