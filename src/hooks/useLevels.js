import { useMemo } from 'react';
import riddles from '../data/riddles.json';

const RIDDLES_PER_LEVEL = 5;

export function useLevels() {
  const levels = useMemo(() => {
    const result = [];
    for (let i = 0; i < riddles.length; i += RIDDLES_PER_LEVEL) {
      const levelRiddles = riddles.slice(i, i + RIDDLES_PER_LEVEL);
      const levelIndex = Math.floor(i / RIDDLES_PER_LEVEL);
      let mode;
      if (levelIndex < 4) {
        mode = 'multiple-choice';
      } else if (levelIndex < 8) {
        mode = 'multiple-choice';
      } else {
        mode = 'type-answer';
      }
      result.push({
        id: levelIndex + 1,
        riddles: levelRiddles,
        mode,
        difficulty: levelIndex < 4 ? 'easy' : levelIndex < 8 ? 'medium' : 'hard',
      });
    }
    return result;
  }, []);

  const totalLevels = levels.length;

  return { levels, totalLevels, RIDDLES_PER_LEVEL };
}
