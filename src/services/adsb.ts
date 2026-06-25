import axios from 'axios';
import type { FlightState } from '@/types/flight';

const ADSB_BASE = '/api/adsb';

interface AdsbAircraft {
  hex?: string;
  flight?: string;
  r?: string;        // registration
  t?: string;        // aircraft type (e.g. A320, B738)
  alt_baro?: number | 'ground';
  alt_geom?: number;
  gs?: number;       // ground speed (knots)
  track?: number;    // true track
  baro_rate?: number;
  geom_rate?: number;
  lat?: number;
  lon?: number;
  seen_pos?: number;
  seen?: number;
  squawk?: string;
  emergency?: string;
  category?: string;
  true_heading?: number;
  mag_heading?: number;
  mach?: number;
  ias?: number;
  tas?: number;
  wd?: number;       // wind direction
  ws?: number;       // wind speed
  oat?: number;      // outside air temp
  tat?: number;      // total air temp
  nac_p?: number;
  nac_v?: number;
  sil?: number;
  gva?: number;
  sda?: number;
  alert?: number;
  spi?: number;
  version?: number;
  messages?: number;
  rssi?: number;
}

interface AdsbResponse {
  ac?: AdsbAircraft[];
  msg?: string;
  now?: number;
  total?: number;
}

function normalizeAdsb(aircraft: AdsbAircraft): FlightState | null {
  if (!aircraft.hex || aircraft.lat == null || aircraft.lon == null) return null;

  const altBaro = aircraft.alt_baro === 'ground' ? 0 : (aircraft.alt_baro ?? 0);

  return {
    icao24: aircraft.hex,
    callsign: aircraft.flight?.trim() ?? '',
    origin_country: '',
    time_position: aircraft.seen_pos ?? 0,
    last_contact: aircraft.seen ?? 0,
    longitude: aircraft.lon,
    latitude: aircraft.lat,
    baro_altitude: altBaro,
    geo_altitude: aircraft.alt_geom ?? 0,
    velocity: aircraft.gs ?? 0,
    true_track: aircraft.track ?? 0,
    vertical_rate: aircraft.baro_rate ?? 0,
    on_ground: aircraft.alt_baro === 'ground',
    squawk: aircraft.squawk ?? '',
    position_source: 1,
  };
}

/**
 * Fetch aircraft from ADSB.lol by bounding box.
 * This is the PRIMARY flight data source.
 */
export async function fetchAdsbFlights(lamin: number, lomin: number, lamax: number, lomax: number): Promise<FlightState[]> {
  try {
    // Use the point API with a large radius to get broad coverage
    const centerLat = (lamin + lamax) / 2;
    const centerLon = (lomin + lomax) / 2;
    // Rough radius calculation, capped at 500nm to avoid API timeout
    const radiusNm = Math.min(500, Math.max(
      Math.abs(lamax - lamin) * 60,
      Math.abs(lomax - lomin) * 60 * Math.cos((centerLat * Math.PI) / 180),
      100
    ));

    const response = await axios.get<AdsbResponse>(
      `${ADSB_BASE}/point/${centerLat}/${centerLon}/${Math.round(radiusNm)}`,
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
    console.error('[ADSB.lol] fetchAdsbFlights failed:', error);
    return [];
  }
}

/**
 * Fetch flights covering a broad region (Europe + Atlantic).
 * For all-flights query. Uses a reasonable radius to avoid timeout.
 */
export async function fetchAdsbAll(): Promise<FlightState[]> {
  // Cover Europe/North Atlantic region
  return fetchAdsbFlights(30, -130, 60, 40);
}

/**
 * Fetch single aircraft by ICAO24.
 */
export async function fetchAdsbByIcao(icao24: string): Promise<FlightState | null> {
  try {
    const response = await axios.get<AdsbAircraft>(
      `${ADSB_BASE}/hex/${icao24}`,
      { timeout: 10000 }
    );
    return normalizeAdsb(response.data);
  } catch {
    return null;
  }
}

// Re-export for backward compatibility
export { fetchAdsbAll as fetchFromAdsbLol };
