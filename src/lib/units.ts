/**
 * Unit conversion utilities for aviation.
 */

// --- Length / Altitude ---

export function feetToMeters(ft: number): number {
  return ft * 0.3048;
}

export function metersToFeet(m: number): number {
  return m / 0.3048;
}

export function kmToMiles(km: number): number {
  return km * 0.621371;
}

export function milesToKm(mi: number): number {
  return mi / 0.621371;
}

// --- Speed ---

export function knotsToKmh(kts: number): number {
  return kts * 1.852;
}

export function kmhToKnots(kmh: number): number {
  return kmh / 1.852;
}

export function knotsToMph(kts: number): number {
  return kts * 1.15078;
}

export function mphToKnots(mph: number): number {
  return mph / 1.15078;
}

// --- Formatting ---

/**
 * Format altitude in feet with comma separators.
 * Example: formatAltitude(35000) => "35,000 ft"
 */
export function formatAltitude(ft: number): string {
  if (ft === 0) return '0 ft';
  const abs = Math.abs(ft);
  const formatted = abs.toLocaleString('en-US');
  return `${formatted} ft`;
}

/**
 * Format altitude in meters.
 */
export function formatAltitudeMeters(m: number): string {
  return formatAltitude(metersToFeet(m));
}

/**
 * Format speed in knots.
 * Example: formatSpeed(450) => "450 kts"
 */
export function formatSpeed(kts: number): string {
  const rounded = Math.round(kts);
  return `${rounded} kts`;
}

/**
 * Format speed in km/h.
 */
export function formatSpeedKmh(kmh: number): string {
  return `${Math.round(kmh)} km/h`;
}

/**
 * Convert a heading in degrees to a compass direction + degrees.
 * Example: formatHeading(45) => "NE (45°)"
 */
export function formatHeading(deg: number): string {
  const directions: [string, number, number][] = [
    ['N', 0, 22.5],
    ['NE', 22.5, 67.5],
    ['E', 67.5, 112.5],
    ['SE', 112.5, 157.5],
    ['S', 157.5, 202.5],
    ['SW', 202.5, 247.5],
    ['W', 247.5, 292.5],
    ['NW', 292.5, 337.5],
    ['N', 337.5, 360],
  ];

  const normalized = ((deg % 360) + 360) % 360;
  const dir = directions.find(([, min, max]) => normalized >= min && normalized < max);
  const label = dir ? dir[0] : 'N';
  return `${label} (${Math.round(normalized)}°)`;
}

/**
 * Format vertical rate in feet per minute.
 */
export function formatVerticalRate(fpm: number): string {
  if (fpm === 0) return 'Level';
  const abs = Math.abs(Math.round(fpm));
  const direction = fpm > 0 ? '↑' : '↓';
  return `${direction} ${abs.toLocaleString('en-US')} fpm`;
}

/**
 * Get altitude category for color coding.
 * Low: < 10,000 ft (green)
 * Mid: 10,000 - 30,000 ft (yellow)
 * High: > 30,000 ft (red)
 */
export type AltitudeCategory = 'low' | 'mid' | 'high' | 'ground';

export function getAltitudeCategory(baroAltFt: number, onGround: boolean): AltitudeCategory {
  if (onGround) return 'ground';
  const alt = Math.abs(baroAltFt);
  if (alt < 10000) return 'low';
  if (alt < 30000) return 'mid';
  return 'high';
}

/**
 * Altitude category color map.
 */
export const ALTITUDE_COLORS: Record<AltitudeCategory, string> = {
  ground: '#9CA3AF', // gray
  low: '#22C55E',    // green
  mid: '#EAB308',    // yellow
  high: '#EF4444',   // red
};
