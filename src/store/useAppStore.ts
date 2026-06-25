import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Language } from '@/i18n/translations';
import type { DashboardStats, SpeedUnit, AltitudeUnit, DistanceUnit } from '@/types/flight';

export type Theme = 'light' | 'dark';

interface AppState {
  // Theme
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;

  // Language
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;

  // Sidebar
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;

  // Units
  speedUnit: SpeedUnit;
  altitudeUnit: AltitudeUnit;
  distanceUnit: DistanceUnit;
  setSpeedUnit: (unit: SpeedUnit) => void;
  setAltitudeUnit: (unit: AltitudeUnit) => void;
  setDistanceUnit: (unit: DistanceUnit) => void;

  // Dashboard stats
  dashboardStats: DashboardStats;
  setDashboardStats: (stats: DashboardStats) => void;

  // Selected aircraft (for detail panel)
  selectedAircraftIcao24: string | null;
  setSelectedAircraftIcao24: (icao24: string | null) => void;

  // Map state
  mapCenter: [number, number];
  mapZoom: number;
  setMapCenter: (center: [number, number]) => void;
  setMapZoom: (zoom: number) => void;
}

const defaultDashboardStats: DashboardStats = {
  totalFlights: 0,
  flightsInAir: 0,
  flightsOnGround: 0,
  avgSpeed: 0,
  avgAltitude: 0,
  countries: 0,
  emergencies: 0,
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Theme
      theme: 'dark',
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      setTheme: (theme) => set({ theme }),

      // Language
      language: 'en',
      toggleLanguage: () =>
        set((state) => ({ language: state.language === 'en' ? 'es' : 'en' })),
      setLanguage: (language) => set({ language }),

      // Sidebar
      sidebarCollapsed: false,
      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),

      // Units
      speedUnit: 'knots',
      altitudeUnit: 'feet',
      distanceUnit: 'km',
      setSpeedUnit: (speedUnit) => set({ speedUnit }),
      setAltitudeUnit: (altitudeUnit) => set({ altitudeUnit }),
      setDistanceUnit: (distanceUnit) => set({ distanceUnit }),

      // Dashboard stats
      dashboardStats: defaultDashboardStats,
      setDashboardStats: (dashboardStats) => set({ dashboardStats }),

      // Selected aircraft
      selectedAircraftIcao24: null,
      setSelectedAircraftIcao24: (selectedAircraftIcao24) =>
        set({ selectedAircraftIcao24 }),

      // Map state
      mapCenter: [20, 0],
      mapZoom: 3,
      setMapCenter: (mapCenter) => set({ mapCenter }),
      setMapZoom: (mapZoom) => set({ mapZoom }),
    }),
    {
      name: 'flight-radar-store',
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
        sidebarCollapsed: state.sidebarCollapsed,
        speedUnit: state.speedUnit,
        altitudeUnit: state.altitudeUnit,
        distanceUnit: state.distanceUnit,
        mapCenter: state.mapCenter,
        mapZoom: state.mapZoom,
      }),
    }
  )
);
