import Header from './components/Header';
import LevelSelect from './components/LevelSelect';
import GameScreen from './components/GameScreen';
import LevelComplete from './components/LevelComplete';
import { useGameState } from './hooks/useGameState';
import { useLevels } from './hooks/useLevels';
import styles from './App.module.css';

export default function App() {
  const { levels, totalLevels } = useLevels();
  const {
    progress,
    screen,
    currentLevelId,
    levelResults,
    startLevel,
    completeLevel,
    goToLevelSelect,
    nextLevel,
    resetProgress,
  } = useGameState();

  const currentLevel = currentLevelId ? levels.find((l) => l.id === currentLevelId) : null;

  return (
    <div className={styles.app}>
      <Header totalScore={progress.totalScore} onReset={resetProgress} />
      <main className={styles.main}>
        {screen === 'level-select' && (
          <LevelSelect levels={levels} progress={progress} onStartLevel={startLevel} />
        )}
        {screen === 'game' && currentLevel && (
          <GameScreen level={currentLevel} onComplete={completeLevel} onBack={goToLevelSelect} />
        )}
        {screen === 'level-complete' && levelResults && (
          <LevelComplete
            results={levelResults}
            totalLevels={totalLevels}
            onNext={() => nextLevel(totalLevels)}
            onLevelSelect={goToLevelSelect}
          />
        )}
      </main>
    </div>
  );
}
