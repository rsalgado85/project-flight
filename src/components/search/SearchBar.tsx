import { type FC, useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plane, Building2, Building, Navigation, X } from 'lucide-react';
import type Fuse from 'fuse.js';
import { useAppStore } from '@/store/useAppStore';
import { useT } from '@/i18n/translations';
import type { Aircraft, SearchResult } from '@/types/flight';

// We lazy-load Fuse.js to reduce initial bundle size
let FuseModule: typeof Fuse | null = null;
async function getFuse(): Promise<typeof Fuse> {
  if (!FuseModule) {
    const mod = await import('fuse.js');
    FuseModule = mod.default;
  }
  return FuseModule;
}

interface SearchBarProps {
  /** The list of aircraft to search through */
  aircraft?: Aircraft[];
  /** Optional external search handler for broader search (airports, airlines, etc.) */
  onSearch?: (query: string) => SearchResult[];
  /** Placeholder override */
  placeholder?: string;
  /** Compact mode for navbar embedding */
  compact?: boolean;
  className?: string;
}

const typeIcons: Record<string, typeof Plane> = {
  aircraft: Plane,
  airport: Building2,
  airline: Building,
  flight: Navigation,
};

const typeLabels: Record<string, string> = {
  aircraft: 'search.typeAircraft',
  airport: 'search.typeAirport',
  airline: 'search.typeAirline',
  flight: 'search.typeFlight',
};

export const SearchBar: FC<SearchBarProps> = ({
  aircraft = [],
  onSearch,
  placeholder,
  compact = false,
  className = '',
}) => {
  const navigate = useNavigate();
  const language = useAppStore((s) => s.language);
  const t = useT(language);

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isSearching, setIsSearching] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fuseRef = useRef<Fuse<Aircraft> | null>(null);

  // Initialize Fuse.js
  useEffect(() => {
    getFuse().then((FuseClass) => {
      fuseRef.current = new FuseClass(aircraft, {
        keys: [
          { name: 'callsign', weight: 0.4 },
          { name: 'icao24', weight: 0.35 },
          { name: 'origin_country', weight: 0.15 },
          { name: 'squawk', weight: 0.1 },
        ],
        threshold: 0.3,
        distance: 100,
        minMatchCharLength: 2,
      });
    });
  }, [aircraft]);

  // Perform search
  const performSearch = useCallback(
    async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults([]);
        setIsOpen(false);
        return;
      }

      setIsSearching(true);

      // Fuse.js search on aircraft
      let fuseResults: SearchResult[] = [];
      if (fuseRef.current) {
        fuseResults = fuseRef.current.search(searchQuery).map((r) => {
          const item = r.item as Aircraft;
          return {
            type: 'aircraft' as const,
            id: item.icao24,
            label: item.callsign || item.icao24.toUpperCase(),
            sublabel: `${item.origin_country} · ${item.icao24.toUpperCase()}`,
            data: item,
          };
        });
      }

      // External search (airports, airlines)
      let externalResults: SearchResult[] = [];
      if (onSearch) {
        try {
          externalResults = onSearch(searchQuery);
        } catch {
          // External search failed, proceed with just fuse results
        }
      }

      const allResults = [...fuseResults, ...externalResults].slice(0, 8);
      setResults(allResults);
      setIsOpen(allResults.length > 0);
      setActiveIndex(-1);
      setIsSearching(false);
    },
    [onSearch]
  );

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(query);
    }, 150);
    return () => clearTimeout(timer);
  }, [query, performSearch]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) {
      if (e.key === 'Escape') {
        inputRef.current?.blur();
        setIsOpen(false);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
        break;
      case 'Enter':
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < results.length) {
          handleSelect(results[activeIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  const handleSelect = (result: SearchResult) => {
    setQuery('');
    setIsOpen(false);
    setActiveIndex(-1);
    inputRef.current?.blur();

    // Navigate based on type
    switch (result.type) {
      case 'aircraft':
        navigate(`/aircraft/${result.id}`);
        break;
      case 'airport':
        navigate(`/airports/${result.id}`);
        break;
      case 'airline':
        navigate(`/airlines/${result.id}`);
        break;
      case 'flight':
        navigate(`/aircraft/${result.id}`);
        break;
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Search input */}
      <div
        className={`relative flex items-center gap-2 rounded-xl border transition-all duration-200 ${
          isOpen
            ? 'bg-black/50 backdrop-blur-xl border-blue-500/30 shadow-lg shadow-blue-500/5'
            : 'bg-white/[0.04] border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.1]'
        } ${compact ? 'px-3 py-2' : 'px-4 py-3'}`}
      >
        <Search
          className={`flex-shrink-0 transition-colors ${
            isOpen ? 'text-blue-400' : 'text-white/30'
          } ${compact ? 'h-3.5 w-3.5' : 'h-4 w-4'}`}
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query && results.length > 0 && setIsOpen(true)}
          placeholder={placeholder ?? t('search.placeholder')}
          className="flex-1 bg-transparent text-sm text-white/80 placeholder:text-white/25
            outline-none border-none focus:ring-0 min-w-0"
          role="combobox"
          aria-expanded={isOpen}
          aria-controls="search-results"
          aria-activedescendant={activeIndex >= 0 ? `search-result-${activeIndex}` : undefined}
          autoComplete="off"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setIsOpen(false);
              inputRef.current?.focus();
            }}
            className="p-1 rounded-md hover:bg-white/10 text-white/40 hover:text-white/70 transition-colors"
            aria-label="Clear search"
          >
            <X className={compact ? 'h-3.5 w-3.5' : 'h-4 w-4'} aria-hidden="true" />
          </button>
        )}
        {isSearching && (
          <div className="h-4 w-4 rounded-full border-2 border-white/20 border-t-blue-400 animate-spin" aria-hidden="true" />
        )}
      </div>

      {/* Results dropdown */}
      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            id="search-results"
            role="listbox"
            className="absolute top-full left-0 right-0 mt-2 rounded-xl
              bg-black/80 backdrop-blur-2xl border border-white/[0.08]
              shadow-2xl shadow-black/50 overflow-hidden z-50"
          >
            {results.map((result, index) => {
              const TypeIcon = typeIcons[result.type] || Plane;
              const typeLabelKey = typeLabels[result.type] || 'search.typeAircraft';

              return (
                <button
                  key={`${result.type}-${result.id}`}
                  id={`search-result-${index}`}
                  type="button"
                  role="option"
                  aria-selected={index === activeIndex}
                  onClick={() => handleSelect(result)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                    index === activeIndex
                      ? 'bg-white/[0.08]'
                      : 'hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                    <TypeIcon className="h-4 w-4 text-white/50" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white/80 truncate">{result.label}</p>
                    <p className="text-[10px] text-white/40 truncate">{result.sublabel}</p>
                  </div>
                  <span className="text-[10px] font-medium text-white/25 uppercase flex-shrink-0">
                    {t(typeLabelKey as any)}
                  </span>
                </button>
              );
            })}

            {results.length >= 8 && (
              <div className="px-4 py-2 border-t border-white/[0.06]">
                <p className="text-[10px] text-white/30 text-center">
                  {t('common.showing')} {results.length} {t('common.results')}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
