import React from 'react';
import useTimer from '../hooks/useTimer';

const Timer = () => {
  const { timer, isRunning, startTimer, stopTimer, resetTimer } = useTimer();

  return (
    <div style={styles.container}>
      <h2>Timer: {timer} seconds</h2>
      <div style={styles.buttons}>
        <button onClick={startTimer} disabled={isRunning}>Start</button>
        <button onClick={stopTimer} disabled={!isRunning}>Stop</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
  },
  buttons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    marginTop: '1rem'
  }
};

export default Timer;
