export function formatAltitude(meters: number | null): string {
  if (meters === null || meters === undefined) return 'N/A';
  const feet = meters * 3.28084;
  return `${Math.round(feet).toLocaleString()} ft`;
}

export function formatSpeed(mps: number | null): string {
  if (mps === null || mps === undefined) return 'N/A';
  const knots = mps * 1.94384;
  return `${Math.round(knots)} kts`;
}

export function formatHeading(degrees: number | null): string {
  if (degrees === null || degrees === undefined) return 'N/A';
  return `${Math.round(degrees)}°`;
}

export function formatTimestamp(unix: number | null): string {
  if (!unix) return 'N/A';
  return new Date(unix * 1000).toLocaleString();
}

export function formatRelativeTime(unix: number): string {
  const now = Date.now();
  const diff = now - unix * 1000;
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'active': return 'var(--color-success)';
    case 'scheduled': return 'var(--color-warning)';
    case 'landed': return 'var(--color-text-muted)';
    case 'cancelled': return 'var(--color-danger)';
    case 'diverted': return 'var(--color-accent)';
    default: return 'var(--color-text-muted)';
  }
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
