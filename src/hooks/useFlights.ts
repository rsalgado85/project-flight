import { useQuery } from '@tanstack/react-query';
import { fetchAllFlights, fetchFlightsInBounds, fetchFlightByIcao } from '@/services/opensky';
import { fetchFromAdsbLol } from '@/services/adsb';
import type { FlightState, MapBounds } from '@/types/flight';

/**
 * TanStack Query hook: fetches all flights with 15s refetch interval.
 * Falls back to ADSB.lol if OpenSky returns empty.
 */
export function useFlights() {
  return useQuery<FlightState[]>({
    queryKey: ['flights', 'all'],
    queryFn: async () => {
      const flights = await fetchAllFlights();
      if (flights.length > 0) return flights;
      // Fallback to ADSB.lol
      console.log('[useFlights] OpenSky empty, falling back to ADSB.lol');
      return fetchFromAdsbLol();
    },
    refetchInterval: 15000, // 15 seconds
    staleTime: 10000,       // 10 seconds
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * Math.pow(2, attempt), 10000),
  });
}

/**
 * TanStack Query hook: fetches flights within a bounding box.
 */
export function useFlightsByBbox(bounds: MapBounds | null) {
  return useQuery<FlightState[]>({
    queryKey: ['flights', 'bbox', bounds],
    queryFn: async () => {
      if (!bounds) return [];
      const flights = await fetchFlightsInBounds(bounds);
      if (flights.length > 0) return flights;
      // Fallback to ADSB.lol
      console.log('[useFlightsByBbox] OpenSky empty, falling back to ADSB.lol');
      return fetchFromAdsbLol();
    },
    refetchInterval: 15000,
    staleTime: 10000,
    enabled: !!bounds,
    retry: 2,
  });
}

/**
 * TanStack Query hook: fetch single aircraft by ICAO24.
 */
export function useFlightByIcao(icao24: string | null) {
  return useQuery<FlightState | null>({
    queryKey: ['flight', 'icao', icao24],
    queryFn: () => fetchFlightByIcao(icao24!),
    enabled: !!icao24,
    refetchInterval: 15000,
    staleTime: 10000,
    retry: 1,
  });
}
