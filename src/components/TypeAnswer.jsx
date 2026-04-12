import { useState } from 'react';
import styles from './TypeAnswer.module.css';

function fuzzyMatch(input, answer) {
  const normalize = (s) =>
    s
      .toLowerCase()
      .replace(/^(a |an |the )/, '')
      .replace(/[^a-z0-9]/g, '')
      .trim();
  const a = normalize(input);
  const b = normalize(answer);
  if (a === b) return true;
  if (b.includes(a) && a.length >= b.length * 0.6) return true;
  // Levenshtein distance for minor typos
  if (a.length > 2 && b.length > 2) {
    const dist = levenshtein(a, b);
    if (dist <= Math.max(1, Math.floor(b.length * 0.25))) return true;
  }
  return false;
}

function levenshtein(a, b) {
  const m = a.length,
    n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
  return dp[m][n];
}

export default function TypeAnswer({ riddle, onAnswer }) {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || result !== null) return;
    const isCorrect = fuzzyMatch(input, riddle.answer);
    setResult(isCorrect ? 'correct' : 'wrong');
    setTimeout(() => {
      onAnswer(isCorrect);
      setInput('');
      setResult(null);
    }, 1500);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputWrap}>
        <input
          type="text"
          className={`${styles.input} ${result === 'correct' ? styles.correct : result === 'wrong' ? styles.wrong : ''}`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your answer..."
          disabled={result !== null}
          autoFocus
        />
        <button type="submit" className={styles.submitBtn} disabled={!input.trim() || result !== null}>
          →
        </button>
      </div>
      {result === 'wrong' && (
        <div className={styles.correctAnswer}>
          Correct answer: <strong>{riddle.answer}</strong>
        </div>
      )}
      {result === 'correct' && <div className={styles.correctMsg}>Correct!</div>}
    </form>
  );
}
