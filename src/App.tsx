import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAppStore } from '@/store/useAppStore';
import { LanguageProvider } from '@/i18n/LanguageContext';
import Sidebar from '@/components/layout/Sidebar';
import MobileNav from '@/components/layout/MobileNav';

// Pages (lazy-loaded) — built by Agent 3 (this agent)
const HomePage = lazy(() => import('@/pages/HomePage'));
const AircraftPage = lazy(() => import('@/pages/AircraftPage'));

// Pages built by Agent 2
const AirportsPage = lazy(() => import('@/pages/AirportsPage'));
const AirlinesPage = lazy(() => import('@/pages/AirlinesPage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));

// Placeholder fallbacks for routes not yet implemented
const Placeholder = lazy(() => import('@/pages/PlaceholderPage'));

// Query client with sensible defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10_000,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

// Loading fallback
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-slate-950 to-gray-950">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 rounded-full border-2 border-white/10 border-t-blue-400 animate-spin" />
        <p className="text-sm text-white/30">Loading...</p>
      </div>
    </div>
  );
}

function App() {
  const theme = useAppStore((s) => s.theme);

  // Apply theme class to <html> for CSS variable scoping
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
  }, [theme]);

  return (
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <div className="flex min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
            {/* Desktop sidebar */}
            <Sidebar />

            {/* Main content area */}
            <div className="flex-1 flex flex-col min-h-screen">
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  {/* Core routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/aircraft/:icao24" element={<AircraftPage />} />

                  {/* Agent 2 pages */}
                  <Route path="/airports" element={<AirportsPage />} />
                  <Route path="/airlines" element={<AirlinesPage />} />
                  <Route path="/about" element={<AboutPage />} />

                  {/* Mobile nav routes — go to same pages */}
                  <Route path="/map" element={<HomePage />} />
                  <Route path="/search" element={<HomePage />} />

                  {/* Fallback */}
                  <Route path="/more" element={<Placeholder title="More" />} />
                </Routes>
              </Suspense>

              {/* Mobile bottom navigation */}
              <MobileNav />
            </div>
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    </LanguageProvider>
  );
}

export default App;
