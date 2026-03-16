export function playDoneSound() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    const masterGain = ctx.createGain();
    masterGain.connect(ctx.destination);

    const playTone = (freq, startTime, duration, peakGain) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(masterGain);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(peakGain, startTime + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.start(startTime);
      osc.stop(startTime + duration);
    };

    const t = ctx.currentTime;
    playTone(523.25, t, 1.5, 0.28);
    playTone(659.25, t + 0.55, 1.3, 0.22);
    playTone(783.99, t + 1.05, 1.1, 0.18);
    playTone(1567.98, t + 1.05, 0.9, 0.06);
  } catch {
    // Swallow audio errors to keep timer behavior stable.
  }
}
