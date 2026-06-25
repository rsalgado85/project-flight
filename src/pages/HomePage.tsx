import { type FC, useState, useEffect, useCallback, lazy, Suspense, useMemo } from 'react';
import { Clock } from 'lucide-react';
import dayjs from 'dayjs';
import { useAppStore } from '@/store/useAppStore';
import { useT } from '@/i18n/translations';
import { useFlights } from '@/hooks/useFlights';
import StatsBar from '@/components/dashboard/StatsBar';
import SearchBar from '@/components/search/SearchBar';
import type { Aircraft, SearchResult, FlightState } from '@/types/flight';

// Lazy-loaded components (Agent 2 builds these)
const FlightMap = lazy(() => import('@/components/map/FlightMap'));
const AircraftPanel = lazy(() => import('@/components/dashboard/AircraftPanel'));

export const HomePage: FC = () => {
  const language = useAppStore((s) => s.language);
  const setSelectedAircraftIcao24 = useAppStore((s) => s.setSelectedAircraftIcao24);
  const t = useT(language);
  const [currentTime, setCurrentTime] = useState(dayjs());

  // Live flight data
  const { data: allFlights = [] } = useFlights();

  // Compute stats from live data
  const liveStats = useMemo(() => {
    const flights = allFlights as FlightState[];
    const inAir = flights.filter(f => f.baro_altitude > 0).length;
    const onGround = flights.filter(f => f.on_ground || f.baro_altitude <= 0).length;
    const speeds = flights.filter(f => f.velocity > 0).map(f => f.velocity);
    const alts = flights.filter(f => f.baro_altitude > 0).map(f => f.baro_altitude);
    return {
      totalFlights: flights.length,
      flightsInAir: inAir,
      flightsOnGround: onGround,
      avgSpeed: speeds.length > 0 ? Math.round(speeds.reduce((a,b) => a+b, 0) / speeds.length) : 0,
      avgAltitude: alts.length > 0 ? Math.round(alts.reduce((a,b) => a+b, 0) / alts.length) : 0,
      countries: new Set(flights.map(f => f.origin_country).filter(Boolean)).size,
      emergencies: flights.filter(f => f.squawk === '7700' || f.squawk === '7600' || f.squawk === '7500').length,
    };
  }, [allFlights]);

  // Update time every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(dayjs()), 10000);
    return () => clearInterval(timer);
  }, []);

  // Handle aircraft selection from map
  const handleAircraftSelect = useCallback(
    (aircraft: Aircraft) => {
      setSelectedAircraftIcao24(aircraft.icao24);
    },
    [setSelectedAircraftIcao24]
  );

  // Handle closing the panel
  const handleClosePanel = useCallback(() => {
    setSelectedAircraftIcao24(null);
  }, [setSelectedAircraftIcao24]);

  // External search handler for airports/airlines (placeholder)
  const handleSearch = useCallback(
    (_query: string): SearchResult[] => {
      // TODO: Integrate with airport/airline data services
      return [];
    },
    []
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-950 via-slate-950 to-gray-950">
      {/* Top bar */}
      <header
        className="sticky top-0 z-30 h-14 md:h-16 bg-black/40 backdrop-blur-xl border-b border-white/[0.06]
          flex items-center gap-4 px-4 md:px-6"
      >
        {/* Search */}
        <div className="flex-1 max-w-xl">
          <SearchBar
            aircraft={[]}
            onSearch={handleSearch}
            compact
            placeholder={t('search.placeholder')}
          />
        </div>

        {/* Live indicator */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
            {t('dashboard.live')}
          </span>
        </div>

        {/* Time */}
        <div className="hidden md:flex items-center gap-1.5 text-[10px] text-white/30 font-mono">
          <Clock className="h-3 w-3" aria-hidden="true" />
          <span>{currentTime.format('HH:mm:ss')}</span>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Stats bar */}
        <div className="px-4 md:px-6 py-3">
          <StatsBar stats={liveStats} />
        </div>

        {/* Map area */}
        <div className="flex-1 relative mx-4 md:mx-6 mb-4 md:mb-6 rounded-2xl overflow-hidden
          border border-white/[0.06] shadow-2xl shadow-black/30 min-h-[50vh]">
          <Suspense
            fallback={
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <div className="flex flex-col items-center gap-3">
                  <div className="h-10 w-10 rounded-full border-2 border-white/20 border-t-blue-400 animate-spin" />
                  <p className="text-sm text-white/40">{t('common.loading')}</p>
                </div>
              </div>
            }
          >
            <FlightMap
              flights={allFlights as FlightState[]}
              onAircraftSelect={handleAircraftSelect}
              className="w-full h-full"
            />
          </Suspense>
        </div>
      </main>

      {/* Aircraft detail panel — rendered outside navigation so it overlays everything */}
      <Suspense fallback={null}>
        <AircraftPanel
          aircraft={null}
          onClose={handleClosePanel}
        />
      </Suspense>

      {/* Mobile bottom nav spacing */}
      <div className="h-16 md:hidden" aria-hidden="true" />
    </div>
  );
};

export default HomePage;
