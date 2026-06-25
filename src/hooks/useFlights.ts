import { useQuery } from '@tanstack/react-query';
import { fetchAdsbAll, fetchAdsbFlights, fetchAdsbByIcao } from '@/services/adsb';
import type { FlightState, MapBounds } from '@/types/flight';

/**
 * Fetch all flights (broad region).
 * 60s refresh to avoid ADSB.lol rate limiting.
 */
export function useFlights() {
  return useQuery<FlightState[]>({
    queryKey: ['flights', 'all'],
    queryFn: fetchAdsbAll,
    refetchInterval: 60000,
    staleTime: 30000,
    retry: 1,
  });
}

/**
 * Fetch flights within a bounding box.
 */
export function useFlightsByBbox(bounds: MapBounds | null) {
  return useQuery<FlightState[]>({
    queryKey: ['flights', 'bbox', bounds],
    queryFn: async () => {
      if (!bounds) return [];
      return fetchAdsbFlights(bounds.lamin, bounds.lomin, bounds.lamax, bounds.lomax);
    },
    refetchInterval: 60000,
    staleTime: 30000,
    enabled: !!bounds,
    retry: 1,
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
    refetchInterval: 60000,
    staleTime: 30000,
    retry: 1,
  });
}
