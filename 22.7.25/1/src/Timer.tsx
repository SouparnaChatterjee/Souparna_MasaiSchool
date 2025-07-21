import React, { useState, useEffect, useRef } from 'react';

// Define possible statuses for clarity and type safety
type TimerStatus = 'running' | 'stopped';

const Timer: React.FC = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const [status, setStatus] = useState<TimerStatus>('stopped');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Start the timer
  const handleStart = () => {
    if (status === 'stopped') {
      setStatus('running');
      intervalRef.current = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }
  };

  // Stop the timer
  const handleStop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setStatus('stopped');
  };

  // Reset the timer
  const handleReset = () => {
    handleStop();
    setSeconds(0);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Timer: {seconds}s</h1>
      <button onClick={handleStart} disabled={status === 'running'}>
        Start
      </button>
      <button onClick={handleStop} disabled={status === 'stopped'}>
        Stop
      </button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default Timer;
