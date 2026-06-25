import { useQuery } from '@tanstack/react-query';
import { fetchAdsbAll, fetchAdsbFlights, fetchAdsbByIcao } from '@/services/adsb';
import type { FlightState, MapBounds } from '@/types/flight';

/**
 * Fetch all flights (broad region).
 * Uses ADSB.lol — primary source with 15s refresh.
 */
export function useFlights() {
  return useQuery<FlightState[]>({
    queryKey: ['flights', 'all'],
    queryFn: fetchAdsbAll,
    refetchInterval: 15000,
    staleTime: 10000,
    retry: 2,
  });
}

/**
 * Fetch flights within a bounding box.
 * Uses ADSB.lol point API centered on the bounds.
 */
export function useFlightsByBbox(bounds: MapBounds | null) {
  return useQuery<FlightState[]>({
    queryKey: ['flights', 'bbox', bounds],
    queryFn: async () => {
      if (!bounds) return [];
      return fetchAdsbFlights(bounds.lamin, bounds.lomin, bounds.lamax, bounds.lomax);
    },
    refetchInterval: 15000,
    staleTime: 10000,
    enabled: !!bounds,
    retry: 2,
  });
}

/**
 * Fetch single aircraft by ICAO24.
 */
export function useFlightByIcao(icao24: string | null) {
  return useQuery<FlightState | null>({
    queryKey: ['flight', 'icao', icao24],
    queryFn: () => fetchAdsbByIcao(icao24!),
    enabled: !!icao24,
    refetchInterval: 15000,
    staleTime: 10000,
    retry: 1,
  });
}
