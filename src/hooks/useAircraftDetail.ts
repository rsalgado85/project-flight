import { useQuery } from '@tanstack/react-query';
import { useFlightByIcao } from '@/hooks/useFlights';
import type { Aircraft } from '@/types/flight';

const OPENSKY_AIRCRAFT_URL = 'https://opensky-network.org/api/metadata/aircraft';

interface OpenSkyAircraftResponse {
  icao24: string;
  regid?: string;
  manufacturericao?: string;
  manufacturername?: string;
  model?: string;
  typecode?: string;
  serialnumber?: string;
  linennumber?: string;
  icaoaircrafttype?: string;
  operator?: string;
  operatorcallsign?: string;
  operatoricao?: string;
  operatoriata?: string;
  owner?: string;
  testreg?: string;
  registered?: string;
  reguntil?: string;
  status?: string;
  built?: string;
  firstflightdate?: string;
  seatconfiguration?: string;
  engines?: string;
  modes?: boolean;
  adsb?: boolean;
  acars?: boolean;
  notes?: string;
  categoryDescription?: string;
}

/**
 * Fetch aircraft metadata from OpenSky aircraft database.
 */
async function fetchAircraftMetadata(icao24: string): Promise<OpenSkyAircraftResponse | null> {
  try {
    const response = await fetch(`${OPENSKY_AIRCRAFT_URL}/${icao24}`);
    if (!response.ok) return null;
    const data = await response.json();
    return data as OpenSkyAircraftResponse;
  } catch {
    return null;
  }
}

export interface AircraftDetail {
  flight: ReturnType<typeof useFlightByIcao>['data'];
  metadata: OpenSkyAircraftResponse | null;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

/**
 * Combine flight state (OpenSky tracking) with aircraft metadata (OpenSky aircraft DB).
 */
export function useAircraftDetail(icao24: string | null) {
  const flightQuery = useFlightByIcao(icao24);

  const metadataQuery = useQuery<OpenSkyAircraftResponse | null>({
    queryKey: ['aircraft', 'metadata', icao24],
    queryFn: () => fetchAircraftMetadata(icao24!),
    enabled: !!icao24,
    staleTime: 60 * 60 * 1000, // 1 hour (metadata rarely changes)
    retry: 1,
  });

  return {
    flight: flightQuery.data ?? null,
    metadata: metadataQuery.data ?? null,
    isLoading: flightQuery.isLoading || metadataQuery.isLoading,
    isError: flightQuery.isError || metadataQuery.isError,
    error: flightQuery.error || metadataQuery.error,
    flightQuery,
    metadataQuery,
  };
}

/**
 * Convert OpenSky metadata to our Aircraft interface.
 */
export function toAircraft(metadata: OpenSkyAircraftResponse | null): Aircraft | null {
  if (!metadata) return null;
  return {
    icao24: metadata.icao24,
    callsign: metadata.operatorcallsign,
    origin_country: undefined,
    time_position: undefined,
    last_contact: undefined,
    longitude: undefined,
    latitude: undefined,
    category: undefined,
  };
}
