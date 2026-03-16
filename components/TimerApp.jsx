'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { playDoneSound } from '@/lib/sound';
import { formatTime, pad, splitTime, toSeconds } from '@/lib/time';

const MIN_MAX = {
  h: [0, 23],
  m: [0, 59],
  s: [0, 59],
};

export default function TimerApp() {
  const [theme, setTheme] = useState('dark');
  const [setTime, setSetTime] = useState({ h: 0, m: 5, s: 0 });
  const [remaining, setRemaining] = useState(0);
  const [total, setTotal] = useState(0);
  const [running, setRunning] = useState(false);
  const [colonOn, setColonOn] = useState(true);
  const [done, setDone] = useState(false);
  const [startText, setStartText] = useState('Start');

  const intervalRef = useRef(null);

  const display = useMemo(() => splitTime(remaining), [remaining]);
  const elapsed = Math.max(total - remaining, 0);
  const progress = total > 0 ? (elapsed / total) * 100 : 0;
  const setterDisabled = running;

  const updateFromSetTime = (nextSetTime) => {
    const nextSeconds = toSeconds(nextSetTime);
    setRemaining(nextSeconds);
  };

  const adjust = (unit, delta) => {
    if (running) return;

    const [min, max] = MIN_MAX[unit];
    setSetTime((prev) => {
      const next = {
        ...prev,
        [unit]: Math.max(min, Math.min(max, prev[unit] + delta)),
      };
      updateFromSetTime(next);
      return next;
    });
  };

  const clearTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startTimer = () => {
    if (running) return;

    let nextRemaining = remaining;
    let nextTotal = total;

    if (nextRemaining === 0) {
      nextRemaining = toSeconds(setTime);
      nextTotal = nextRemaining;
      setRemaining(nextRemaining);
      setTotal(nextTotal);
    }

    if (nextRemaining === 0) return;
    if (nextTotal === 0) {
      nextTotal = nextRemaining;
      setTotal(nextTotal);
    }

    setDone(false);
    setRunning(true);
    setStartText('Start');
  };

  const pauseTimer = () => {
    if (!running) return;
    setRunning(false);
    setStartText('Resume');
    setColonOn(true);
  };

  const resetTimer = () => {
    clearTimer();
    setRunning(false);
    setRemaining(0);
    setTotal(0);
    setDone(false);
    setColonOn(true);
    setStartText('Start');
  };

  useEffect(() => {
    if (!running) {
      clearTimer();
      return;
    }

    intervalRef.current = setInterval(() => {
      setRemaining((prev) => (prev > 0 ? prev - 1 : 0));
      setColonOn((prev) => !prev);
    }, 1000);

    return () => clearTimer();
  }, [running]);

  useEffect(() => {
    if (!running || remaining > 0) return;

    setRunning(false);
    setDone(true);
    setStartText('Start');
    setColonOn(true);
    playDoneSound();
  }, [remaining, running]);

  useEffect(() => {
    if (remaining > 0) {
      document.title = `${formatTime(remaining)} — Timer`;
      return;
    }

    document.title = done ? "⏰ Time's Up — Timer" : 'Timer';
  }, [remaining, done]);

  useEffect(() => () => clearTimer(), []);

  const remainingLabel = remaining > 0 ? `${formatTime(remaining)} remaining` : '—';

  return (
    <div className={`page ${theme === 'light' ? 'light' : ''}`}>
      <div className="theme-bar" role="group" aria-label="Theme switcher">
        <button
          className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
          onClick={() => setTheme('dark')}
          type="button"
        >
          Dark
        </button>
        <button
          className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
          onClick={() => setTheme('light')}
          type="button"
        >
          Light
        </button>
      </div>

      <main className="container">
        <div className="title">Countdown Timer</div>

        <div className="clock-display" aria-live="polite">
          <div className="unit">
            <div className="digits">{pad(display.h)}</div>
            <div className="unit-label">Hours</div>
          </div>
          <div className={`sep ${running && !colonOn ? 'blink' : ''}`}>:</div>
          <div className="unit">
            <div className="digits">{pad(display.m)}</div>
            <div className="unit-label">Minutes</div>
          </div>
          <div className={`sep ${running && !colonOn ? 'blink' : ''}`}>:</div>
          <div className="unit">
            <div className="digits">{pad(display.s)}</div>
            <div className="unit-label">Seconds</div>
          </div>
        </div>

        <div className="progress-wrap">
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="progress-labels">
            <span>{formatTime(elapsed)} elapsed</span>
            <span>{remainingLabel}</span>
          </div>
        </div>

        <div className={`setter ${setterDisabled ? 'disabled' : ''}`}>
          <div className="set-block">
            <div className="set-label">Hours</div>
            <div className="set-row">
              <button className="adj-btn" onClick={() => adjust('h', -1)} type="button">
                -
              </button>
              <div className="set-val">{setTime.h}</div>
              <button className="adj-btn" onClick={() => adjust('h', 1)} type="button">
                +
              </button>
            </div>
          </div>

          <div className="set-divider">:</div>

          <div className="set-block">
            <div className="set-label">Minutes</div>
            <div className="set-row">
              <button className="adj-btn" onClick={() => adjust('m', -1)} type="button">
                -
              </button>
              <div className="set-val">{setTime.m}</div>
              <button className="adj-btn" onClick={() => adjust('m', 1)} type="button">
                +
              </button>
            </div>
          </div>

          <div className="set-divider">:</div>

          <div className="set-block">
            <div className="set-label">Seconds</div>
            <div className="set-row">
              <button className="adj-btn" onClick={() => adjust('s', -1)} type="button">
                -
              </button>
              <div className="set-val">{setTime.s}</div>
              <button className="adj-btn" onClick={() => adjust('s', 1)} type="button">
                +
              </button>
            </div>
          </div>
        </div>

        <div className="done-msg" style={{ display: done ? 'block' : 'none' }}>
          Time&apos;s Up
        </div>

        <div className="controls">
          {!running && (
            <button className="ctrl-btn primary" onClick={startTimer} type="button">
              {startText}
            </button>
          )}
          {running && (
            <button className="ctrl-btn secondary" onClick={pauseTimer} type="button">
              Pause
            </button>
          )}
          <button className="ctrl-btn secondary" onClick={resetTimer} type="button">
            Reset
          </button>
        </div>
      </main>
    </div>
  );
}
