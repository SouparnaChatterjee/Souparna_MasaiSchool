import React from 'react';
import useTimer from '../hooks/useTimer';

const TimerComponent = () => {
  const { timer, isRunning, startTimer, stopTimer, resetTimer } = useTimer();

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>Timer: {timer} seconds</h2>
      <p>Status: {isRunning ? 'Running' : 'Stopped'}</p>
      <button onClick={startTimer} style={{ margin: '0.5rem' }}>Start</button>
      <button onClick={stopTimer} style={{ margin: '0.5rem' }}>Stop</button>
      <button onClick={resetTimer} style={{ margin: '0.5rem' }}>Reset</button>
    </div>
  );
};

export default TimerComponent;
