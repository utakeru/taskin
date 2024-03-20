import { TimeDisplay } from './TimeDisplay';
import { useTimer } from './useTimer';

export function Timer() {
  const { seconds, state, context, onStart, onPause, onStop } = useTimer();

  return (
    <div>
      <TimeDisplay seconds={seconds} />
      <div>{context}</div>
      <div>{state}</div>
      <button
        className="border p-1"
        onClick={() => {
          onStart();
        }}
        disabled={state === 'running' || seconds === 0}
      >
        Start
      </button>
      <button
        className="border p-1"
        onClick={() => {
          onPause();
        }}
      >
        Pause
      </button>
      <button
        className="border p-1"
        onClick={() => {
          onStop();
        }}
      >
        Stop
      </button>
    </div>
  );
}
