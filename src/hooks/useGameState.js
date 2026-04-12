import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'riddlemethat-progress';

function loadProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return {
    unlockedLevel: 1,
    completedLevels: {},
    totalScore: 0,
  };
}

function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {}
}

export function useGameState() {
  const [progress, setProgress] = useState(loadProgress);
  const [screen, setScreen] = useState('level-select');
  const [currentLevelId, setCurrentLevelId] = useState(null);
  const [levelResults, setLevelResults] = useState(null);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const startLevel = useCallback((levelId) => {
    setCurrentLevelId(levelId);
    setLevelResults(null);
    setScreen('game');
  }, []);

  const completeLevel = useCallback((levelId, score, total) => {
    const stars = score === total ? 3 : score >= Math.ceil(total / 2) ? 2 : score > 0 ? 1 : 0;
    setLevelResults({ levelId, score, total, stars });

    setProgress((prev) => {
      const existing = prev.completedLevels[levelId];
      const bestStars = existing ? Math.max(existing.stars, stars) : stars;
      const bestScore = existing ? Math.max(existing.score, score) : score;
      const scoreDiff = existing ? Math.max(0, score - existing.score) : score;

      return {
        ...prev,
        unlockedLevel: Math.max(prev.unlockedLevel, levelId + 1),
        completedLevels: {
          ...prev.completedLevels,
          [levelId]: { stars: bestStars, score: bestScore, total },
        },
        totalScore: prev.totalScore + scoreDiff,
      };
    });

    setScreen('level-complete');
  }, []);

  const goToLevelSelect = useCallback(() => {
    setScreen('level-select');
    setCurrentLevelId(null);
    setLevelResults(null);
  }, []);

  const nextLevel = useCallback((totalLevels) => {
    if (levelResults && levelResults.levelId < totalLevels) {
      startLevel(levelResults.levelId + 1);
    } else {
      goToLevelSelect();
    }
  }, [levelResults, startLevel, goToLevelSelect]);

  const resetProgress = useCallback(() => {
    const fresh = { unlockedLevel: 1, completedLevels: {}, totalScore: 0 };
    setProgress(fresh);
    saveProgress(fresh);
    setScreen('level-select');
  }, []);

  return {
    progress,
    screen,
    currentLevelId,
    levelResults,
    startLevel,
    completeLevel,
    goToLevelSelect,
    nextLevel,
    resetProgress,
  };
}
