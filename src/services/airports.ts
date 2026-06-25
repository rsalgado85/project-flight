import axios from 'axios';
import type { Airport } from '@/types/flight';

const AIRPORTS_URL = 'https://davidmegginson.github.io/ourairports-data/airports.json';
const CACHE_KEY = 'ourairports_cache';
const CACHE_TIMESTAMP_KEY = 'ourairports_cache_ts';
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours in ms

/**
 * Fetch all airports from OurAirports.
 * Returns cleaned Airport[] (only large/medium with IATA, not closed).
 * Caches the result in localStorage for 24 hours (the JSON is ~25MB).
 */
export async function fetchAirports(): Promise<Airport[]> {
  // Check cache first
  const cached = getCachedAirports();
  if (cached) return cached;

  try {
    const response = await axios.get<Airport[]>(AIRPORTS_URL, {
      timeout: 60000, // 60s for the large JSON
    });

    const airports = response.data;

    // Filter: only large_airport and medium_airport with IATA codes, not closed
    const cleaned = airports.filter((a) => {
      if (a.type === 'closed') return false;
      if (a.type !== 'large_airport' && a.type !== 'medium_airport') return false;
      if (!a.iata_code || a.iata_code.trim() === '') return false;
      return true;
    });

    // Cache in localStorage
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(cleaned));
      localStorage.setItem(CACHE_TIMESTAMP_KEY, String(Date.now()));
    } catch {
      // localStorage might be full — that's okay
      console.warn('[Airports] Could not cache to localStorage');
    }

    return cleaned;
  } catch (error) {
    console.error('[Airports] fetchAirports failed:', error);
    // Fall back to stale cache if available
    const stale = getCachedAirports(true);
    return stale ?? [];
  }
}

/**
 * Get airports from localStorage cache.
 * @param ignoreExpiry - If true, return even expired cache
 */
function getCachedAirports(ignoreExpiry: boolean = false): Airport[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    const ts = localStorage.getItem(CACHE_TIMESTAMP_KEY);
    if (!raw || !ts) return null;

    const timestamp = parseInt(ts, 10);
    const now = Date.now();

    if (!ignoreExpiry && now - timestamp > CACHE_TTL) return null;

    return JSON.parse(raw) as Airport[];
  } catch {
    return null;
  }
}

/**
 * Search airports by ICAO code.
 */
export async function fetchAirportByIcao(code: string): Promise<Airport | null> {
  const airports = await fetchAirports();
  const search = code.toUpperCase().trim();
  return airports.find(
    (a) => a.ident?.toUpperCase() === search || a.gps_code?.toUpperCase() === search
  ) ?? null;
}

/**
 * Search airports by IATA code.
 */
export async function fetchAirportByIata(code: string): Promise<Airport | null> {
  const airports = await fetchAirports();
  const search = code.toUpperCase().trim();
  return airports.find((a) => a.iata_code?.toUpperCase() === search) ?? null;
}

/**
 * Clear the airport cache (useful for forced refresh).
 */
export function clearAirportCache(): void {
  try {
    localStorage.removeItem(CACHE_KEY);
    localStorage.removeItem(CACHE_TIMESTAMP_KEY);
  } catch {
    // ignore
  }
}
