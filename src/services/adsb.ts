import axios from 'axios';
import type { FlightState } from '@/types/flight';

const ADSB_BASE = 'https://api.adsb.lol/v2';

/**
 * Normalize ADSB.lol aircraft data to FlightState format.
 * ADSB.lol returns a different schema so we map fields.
 */
interface AdsbAircraft {
  hex?: string;
  flight?: string;
  alt_baro?: number;
  alt_geom?: number;
  gs?: number;
  track?: number;
  baro_rate?: number;
  lat?: number;
  lon?: number;
  seen_pos?: number;
  seen?: number;
  squawk?: string;
}

function normalizeAdsb(aircraft: AdsbAircraft): FlightState | null {
  if (!aircraft.hex || aircraft.lat == null || aircraft.lon == null) return null;
  return {
    icao24: aircraft.hex,
    callsign: aircraft.flight?.trim() ?? '',
    origin_country: '',
    time_position: aircraft.seen_pos ?? 0,
    last_contact: aircraft.seen ?? 0,
    longitude: aircraft.lon,
    latitude: aircraft.lat,
    baro_altitude: aircraft.alt_baro ?? 0,
    geo_altitude: aircraft.alt_geom ?? 0,
    velocity: aircraft.gs ?? 0,
    true_track: aircraft.track ?? 0,
    vertical_rate: aircraft.baro_rate ?? 0,
    on_ground: false,
    squawk: aircraft.squawk ?? '',
    position_source: 1,
  };
}

/**
 * Fetch aircraft from ADSB.lol as fallback.
 * Uses the sample endpoint (point/.../250) which returns up to 250 nearby aircraft.
 * We use 0/0 (null island) as center and a large radius to get global-ish coverage.
 */
export async function fetchFromAdsbLol(): Promise<FlightState[]> {
  try {
    // ADSB.lol v2 point endpoint: /point/{lat}/{lon}/{radius_nm}
    // Using 0,0 with max radius for global sample
    const response = await axios.get<{ ac?: AdsbAircraft[] }>(
      `${ADSB_BASE}/point/0/0/250`,
      { timeout: 15000 }
    );

    const aircraft = response.data?.ac;
    if (!aircraft || !Array.isArray(aircraft)) return [];

    const states: FlightState[] = [];
    for (const ac of aircraft) {
      const state = normalizeAdsb(ac);
      if (state) states.push(state);
    }
    return states;
  } catch (error) {
    console.error('[ADSB.lol] fetchFromAdsbLol failed:', error);
    return [];
  }
}

/**
 * Fetch flights with automatic fallback to ADSB.lol if OpenSky fails.
 * This is the recommended aggregated fetch function.
 */
export async function fetchFlightsWithFallback(
  primaryFetcher: () => Promise<FlightState[]>
): Promise<FlightState[]> {
  try {
    const result = await primaryFetcher();
    if (result.length > 0) return result;

    // OpenSky returned empty — try ADSB.lol
    console.log('[Aggregator] Primary source empty, falling back to ADSB.lol');
    return await fetchFromAdsbLol();
  } catch (error) {
    console.error('[Aggregator] Primary source failed, falling back to ADSB.lol:', error);
    return await fetchFromAdsbLol();
  }
}
