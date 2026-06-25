import axios from 'axios';
import type { FlightState } from '@/types/flight';
import { normalizeFlightState, hasValidPosition, type MapBounds } from '@/types/flight';

const OPENSKY_BASE = '/api/opensky';
const REQUEST_TIMEOUT = 15000; // 15s
const MAX_RETRIES = 2;
const RETRY_DELAY = 1000; // 1s

interface OpenSkyStatesResponse {
  time: number;
  states: ((string | number | boolean | null)[])[] | null;
}

/**
 * Create an axios instance with timeout and retry logic for OpenSky API.
 * OpenSky limits anonymous users heavily; we retry on 429/503.
 */
const openskyApi = axios.create({
  baseURL: OPENSKY_BASE,
  timeout: REQUEST_TIMEOUT,
});

openskyApi.interceptors.response.use(undefined, async (error) => {
  const config = error.config;
  // Initialize retry count
  config.__retryCount = config.__retryCount ?? 0;

  if (
    config.__retryCount < MAX_RETRIES &&
    (error.response?.status === 429 || error.response?.status === 503 || !error.response)
  ) {
    config.__retryCount += 1;
    const delay = RETRY_DELAY * Math.pow(2, config.__retryCount - 1);
    await new Promise((resolve) => setTimeout(resolve, delay));
    return openskyApi(config);
  }

  return Promise.reject(error);
});

/**
 * Parse raw OpenSky states array into FlightState[] with validation.
 */
function parseStates(states: OpenSkyStatesResponse): FlightState[] {
  if (!states?.states || !Array.isArray(states.states)) return [];
  const result: FlightState[] = [];
  for (const raw of states.states) {
    const state = normalizeFlightState(raw);
    if (state && hasValidPosition(state)) {
      result.push(state);
    }
  }
  return result;
}

/**
 * Fetch all flights from OpenSky Network.
 * Returns FlightState[] with valid positions only.
 */
export async function fetchAllFlights(): Promise<FlightState[]> {
  try {
    const response = await openskyApi.get<OpenSkyStatesResponse>('/states/all');
    return parseStates(response.data);
  } catch (error) {
    console.error('[OpenSky] fetchAllFlights failed:', error);
    return [];
  }
}

/**
 * Fetch flights filtered by callsign prefix (airline).
 * Example: fetchFlightsByAirline('UAL') for United Airlines.
 */
export async function fetchFlightsByAirline(callsign: string): Promise<FlightState[]> {
  try {
    const allFlights = await fetchAllFlights();
    const prefix = callsign.toUpperCase();
    return allFlights.filter(
      (f) => f.callsign && f.callsign.toUpperCase().startsWith(prefix)
    );
  } catch (error) {
    console.error(`[OpenSky] fetchFlightsByAirline(${callsign}) failed:`, error);
    return [];
  }
}

/**
 * Fetch flights within a geographic bounding box.
 * @param lamin - Minimum latitude (south)
 * @param lomin - Minimum longitude (west)
 * @param lamax - Maximum latitude (north)
 * @param lomax - Maximum longitude (east)
 */
export async function fetchFlightsByBbox(
  lamin: number,
  lomin: number,
  lamax: number,
  lomax: number
): Promise<FlightState[]> {
  try {
    const response = await openskyApi.get<OpenSkyStatesResponse>('/states/all', {
      params: { lamin, lomin, lamax, lomax },
    });
    return parseStates(response.data);
  } catch (error) {
    console.error('[OpenSky] fetchFlightsByBbox failed:', error);
    return [];
  }
}

/**
 * Fetch flights within MapBounds (convenience wrapper).
 */
export async function fetchFlightsInBounds(bounds: MapBounds): Promise<FlightState[]> {
  return fetchFlightsByBbox(bounds.lamin, bounds.lomin, bounds.lamax, bounds.lomax);
}

/**
 * Fetch a single aircraft by ICAO24 address.
 */
export async function fetchFlightByIcao(icao24: string): Promise<FlightState | null> {
  try {
    const allFlights = await fetchAllFlights();
    return allFlights.find((f) => f.icao24 === icao24) ?? null;
  } catch (error) {
    console.error(`[OpenSky] fetchFlightByIcao(${icao24}) failed:`, error);
    return null;
  }
}
