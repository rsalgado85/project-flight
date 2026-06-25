import { useQuery } from '@tanstack/react-query';
import { fetchAirports, fetchAirportByIcao } from '@/services/airports';
import type { Airport } from '@/types/flight';

/**
 * TanStack Query hook: fetches and caches airports.
 * staleTime is 24h since the data is cached in localStorage.
 */
export function useAirports() {
  return useQuery<Airport[]>({
    queryKey: ['airports', 'all'],
    queryFn: fetchAirports,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    gcTime: 7 * 24 * 60 * 60 * 1000, // 7 days garbage collection
    retry: 2,
  });
}

/**
 * TanStack Query hook: search airport by ICAO code.
 */
export function useAirportByIcao(code: string | null) {
  return useQuery<Airport | null>({
    queryKey: ['airport', 'icao', code],
    queryFn: () => fetchAirportByIcao(code!),
    enabled: !!code,
    staleTime: 24 * 60 * 60 * 1000,
    retry: 1,
  });
}

/**
 * TanStack Query hook: search airport by IATA code.
 */
export function useAirportByIata(code: string | null) {
  return useQuery<Airport | null>({
    queryKey: ['airport', 'iata', code],
    queryFn: async () => {
      // Reuse cached airports and filter locally
      const airports = await fetchAirports();
      const search = code!.toUpperCase().trim();
      return airports.find((a) => a.iata_code?.toUpperCase() === search) ?? null;
    },
    enabled: !!code,
    staleTime: 24 * 60 * 60 * 1000,
    retry: 1,
  });
}
