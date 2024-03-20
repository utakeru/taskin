import { useEffect, useState } from 'react';

const DEFALUT_TIMER_SECONDS = 1; //25 * 60;
const DEFAULT_BREAK_TIMER_SECONDS = 2; // 5 * 60;

type TimerState = 'idle' | 'running' | 'paused' | 'finished';

type TimerContext = 'work' | 'break';

export const useTimer = () => {
  const [seconds, setSeconds] = useState(DEFALUT_TIMER_SECONDS);
  const [state, setState] = useState<TimerState>('idle');
  const [context, setContext] = useState<TimerContext>('work');
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null);
  const [startAt, setStartAt] = useState<number | null>(null);
  const [endAt, setEndAt] = useState<number | null>(null);

  useEffect(() => {
    if (seconds === 0) {
      if (state === 'running') {
        setState('finished');
        alert('Time is up!');
        // タイマーのログを残したい

        if (intervalId !== null) {
          clearInterval(intervalId);
          setIntervalId(null);
        }
        setTimeout(() => {
          if (context === 'work') {
            setSeconds(DEFAULT_BREAK_TIMER_SECONDS);
            setContext('break');
          } else if (context === 'break') {
            setSeconds(DEFALUT_TIMER_SECONDS);
            setContext('work');
          }
          setState('idle');
        }, 500);
      }
    }
  }, [context, intervalId, seconds, state]);

  useEffect(() => {
    if (state === 'running' && intervalId === null) {
      setIntervalId(
        setInterval(() => {
          setSeconds((prevSeconds) => {
            return prevSeconds - 1;
          });
        }, 1000)
      );
    }
  }, [intervalId, seconds, state]);

  const onStart = () => {
    if (state === 'running' || seconds === 0) {
      return;
    }
    setState('running');
  };

  const onPause = () => {
    if (state === 'running') {
      setState('paused');
      if (intervalId !== null) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
    }
  };

  const onStop = () => {
    if (intervalId !== null) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setSeconds(DEFALUT_TIMER_SECONDS);
    setState('idle');
  };

  return { seconds, state, context, onStart, onPause, onStop };
};
