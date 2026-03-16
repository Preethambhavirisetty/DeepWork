export function pad(value) {
  return String(value).padStart(2, '0');
}

export function formatTime(totalSeconds) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${h}:${pad(m)}:${pad(s)}`;
}

export function toSeconds({ h, m, s }) {
  return h * 3600 + m * 60 + s;
}

export function splitTime(totalSeconds) {
  return {
    h: Math.floor(totalSeconds / 3600),
    m: Math.floor((totalSeconds % 3600) / 60),
    s: totalSeconds % 60,
  };
}
