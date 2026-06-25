export type Language = 'en' | 'es';

export type TranslationKey =
  | 'app.name' | 'app.tagline'
  | 'nav.home' | 'nav.aircraft' | 'nav.airports' | 'nav.airlines' | 'nav.about'
  | 'nav.map' | 'nav.search' | 'nav.more'
  | 'dashboard.title' | 'dashboard.flightsInAir' | 'dashboard.flightsOnGround'
  | 'dashboard.avgSpeed' | 'dashboard.avgAltitude' | 'dashboard.totalFlights'
  | 'dashboard.emergencies' | 'dashboard.countriesActive' | 'dashboard.lastUpdated'
  | 'dashboard.live' | 'dashboard.noData'
  | 'stats.knots' | 'stats.feet' | 'stats.kmh' | 'stats.meters'
  | 'aircraft.title' | 'aircraft.notFound' | 'aircraft.notFoundDesc'
  | 'aircraft.callsign' | 'aircraft.icao24' | 'aircraft.registration'
  | 'aircraft.altitude' | 'aircraft.speed' | 'aircraft.heading'
  | 'aircraft.verticalRate' | 'aircraft.squawk' | 'aircraft.position'
  | 'aircraft.originCountry' | 'aircraft.lastContact' | 'aircraft.positionSource'
  | 'aircraft.onGround' | 'aircraft.inFlight' | 'aircraft.airline'
  | 'aircraft.manufacturer' | 'aircraft.model' | 'aircraft.serialNumber'
  | 'aircraft.builtYear' | 'aircraft.engines' | 'aircraft.engineType'
  | 'aircraft.aircraftType' | 'aircraft.origin' | 'aircraft.destination'
  | 'aircraft.departure' | 'aircraft.arrival' | 'aircraft.estimatedArrival'
  | 'aircraft.flightPath' | 'aircraft.viewFullDetail' | 'aircraft.close'
  | 'aircraft.back' | 'aircraft.loading' | 'aircraft.noCallsign'
  | 'aircraft.unknown' | 'aircraft.dataUnavailable'
  | 'search.placeholder' | 'search.noResults' | 'search.searching'
  | 'search.typeAircraft' | 'search.typeAirport' | 'search.typeAirline' | 'search.typeFlight'
  | 'error.title' | 'error.description' | 'error.retry'
  | 'error.network' | 'error.notFound'
  | 'common.loading' | 'common.save' | 'common.cancel' | 'common.confirm'
  | 'common.delete' | 'common.edit' | 'common.view' | 'common.filter'
  | 'common.sort' | 'common.clear' | 'common.refresh' | 'common.export'
  | 'common.share' | 'common.moreInfo' | 'common.noData'
  | 'common.showing' | 'common.of' | 'common.results'
  | 'theme.light' | 'theme.dark' | 'theme.toggle'
  | 'language.toggle'
  | 'sidebar.collapse' | 'sidebar.expand';

/** Nested translations for convenience */
export interface Translations {
  nav: {
    dashboard: string;
    aircraft: string;
    airports: string;
    airlines: string;
    about: string;
    map: string;
    search: string;
    more: string;
  };
  common: {
    loading: string;
    retry: string;
    search: string;
    noResults: string;
    back: string;
    altitude: string;
    speed: string;
    heading: string;
    status: string;
    country: string;
    city: string;
    icao: string;
    iata: string;
    callsign: string;
    lastContact: string;
    onGround: string;
    active: string;
    landed: string;
    scheduled: string;
    cancelled: string;
    diverted: string;
    error: string;
  };
  home: {
    title: string;
    subtitle: string;
    activeFlights: string;
    totalAircraft: string;
    refreshIn: string;
    autoRefresh: string;
  };
  aircraft: {
    title: string;
    track: string;
    velocity: string;
    verticalRate: string;
    baroAltitude: string;
    geoAltitude: string;
    squawk: string;
    originCountry: string;
  };
  airports: { title: string; elevation: string; timezone: string };
  airlines: { title: string; activeLabel: string; inactiveLabel: string };
  about: { title: string; description: string; dataSource: string; dataSourceDesc: string; techStack: string };
}

const en: Translations = {
  nav: {
    dashboard: 'Dashboard', aircraft: 'Aircraft', airports: 'Airports',
    airlines: 'Airlines', about: 'About', map: 'Map', search: 'Search', more: 'More',
  },
  common: {
    loading: 'Loading...', retry: 'Retry', search: 'Search',
    noResults: 'No results found', back: 'Back', altitude: 'Altitude',
    speed: 'Speed', heading: 'Heading', status: 'Status', country: 'Country',
    city: 'City', icao: 'ICAO', iata: 'IATA', callsign: 'Callsign',
    lastContact: 'Last Contact', onGround: 'On Ground',
    active: 'Active', landed: 'Landed', scheduled: 'Scheduled',
    cancelled: 'Cancelled', diverted: 'Diverted', error: 'Something went wrong',
  },
  home: {
    title: 'Flight Tracker', subtitle: 'Real-time global flight tracking',
    activeFlights: 'Active Flights', totalAircraft: 'Aircraft Tracked',
    refreshIn: 'Refreshing in', autoRefresh: 'Auto-refresh',
  },
  aircraft: {
    title: 'Aircraft Details', track: 'Flight Track', velocity: 'Velocity',
    verticalRate: 'Vertical Rate', baroAltitude: 'Barometric Altitude',
    geoAltitude: 'Geometric Altitude', squawk: 'Squawk Code', originCountry: 'Origin Country',
  },
  airports: { title: 'Airports', elevation: 'Elevation', timezone: 'Timezone' },
  airlines: { title: 'Airlines', activeLabel: 'Active', inactiveLabel: 'Inactive' },
  about: {
    title: 'About Flight Tracker',
    description: 'A real-time flight tracking platform built with React, TypeScript, and the OpenSky Network API.',
    dataSource: 'Data Source',
    dataSourceDesc: 'Flight data is provided by the OpenSky Network.',
    techStack: 'Technology Stack',
  },
};

const es: Translations = {
  nav: {
    dashboard: 'Panel', aircraft: 'Aeronaves', airports: 'Aeropuertos',
    airlines: 'Aerolíneas', about: 'Acerca de', map: 'Mapa', search: 'Buscar', more: 'Más',
  },
  common: {
    loading: 'Cargando...', retry: 'Reintentar', search: 'Buscar',
    noResults: 'Sin resultados', back: 'Volver', altitude: 'Altitud',
    speed: 'Velocidad', heading: 'Rumbo', status: 'Estado', country: 'País',
    city: 'Ciudad', icao: 'ICAO', iata: 'IATA', callsign: 'Indicativo',
    lastContact: 'Último Contacto', onGround: 'En Tierra',
    active: 'Activo', landed: 'Aterrizado', scheduled: 'Programado',
    cancelled: 'Cancelado', diverted: 'Desviado', error: 'Algo salió mal',
  },
  home: {
    title: 'Rastreador de Vuelos', subtitle: 'Seguimiento global de vuelos en tiempo real',
    activeFlights: 'Vuelos Activos', totalAircraft: 'Aeronaves Rastreadas',
    refreshIn: 'Actualizando en', autoRefresh: 'Auto-actualizar',
  },
  aircraft: {
    title: 'Detalles de Aeronave', track: 'Trayectoria', velocity: 'Velocidad',
    verticalRate: 'Régimen Vertical', baroAltitude: 'Altitud Barométrica',
    geoAltitude: 'Altitud Geométrica', squawk: 'Código Squawk', originCountry: 'País de Origen',
  },
  airports: { title: 'Aeropuertos', elevation: 'Elevación', timezone: 'Zona Horaria' },
  airlines: { title: 'Aerolíneas', activeLabel: 'Activo', inactiveLabel: 'Inactivo' },
  about: {
    title: 'Acerca del Rastreador',
    description: 'Una plataforma de seguimiento de vuelos en tiempo real construida con React, TypeScript y la API de OpenSky Network.',
    dataSource: 'Fuente de Datos',
    dataSourceDesc: 'Los datos de vuelo son proporcionados por OpenSky Network.',
    techStack: 'Stack Tecnológico',
  },
};

const translations: Record<Language, Translations> = { en, es };

export function getTranslations(lang: Language): Translations {
  return translations[lang];
}

/** Flat-key t() for @/i18n/translations consumers */
export function t(key: TranslationKey, lang: Language): string {
  const tr = translations[lang];
  const flat: Record<string, string> = {
    // App
    'app.name': 'FLIGHT RADAR',
    'app.tagline': tr.home.subtitle,

    // Nav
    'nav.home': tr.nav.dashboard,
    'nav.aircraft': tr.nav.aircraft,
    'nav.airports': tr.nav.airports,
    'nav.airlines': tr.nav.airlines,
    'nav.about': tr.nav.about,
    'nav.map': tr.nav.map,
    'nav.search': tr.nav.search,
    'nav.more': tr.nav.more,

    // Dashboard
    'dashboard.title': tr.home.title,
    'dashboard.flightsInAir': tr.home.activeFlights,
    'dashboard.flightsOnGround': 'On Ground',
    'dashboard.avgSpeed': 'Avg Speed',
    'dashboard.avgAltitude': 'Avg Altitude',
    'dashboard.totalFlights': tr.home.totalAircraft,
    'dashboard.emergencies': 'Emergencies',
    'dashboard.countriesActive': tr.common.country,
    'dashboard.lastUpdated': 'Last updated',
    'dashboard.live': 'LIVE',
    'dashboard.noData': tr.common.noResults,

    // Stats
    'stats.knots': 'kts',
    'stats.feet': 'ft',
    'stats.kmh': 'km/h',
    'stats.meters': 'm',

    // Aircraft detail
    'aircraft.title': tr.aircraft.title,
    'aircraft.notFound': 'Aircraft Not Found',
    'aircraft.notFoundDesc': 'The aircraft you are looking for does not exist or its data has expired.',
    'aircraft.callsign': tr.common.callsign,
    'aircraft.icao24': tr.common.icao,
    'aircraft.registration': 'Registration',
    'aircraft.altitude': tr.common.altitude,
    'aircraft.speed': tr.common.speed,
    'aircraft.heading': tr.common.heading,
    'aircraft.verticalRate': tr.aircraft.verticalRate,
    'aircraft.squawk': tr.aircraft.squawk,
    'aircraft.position': 'Position',
    'aircraft.originCountry': tr.aircraft.originCountry,
    'aircraft.lastContact': tr.common.lastContact,
    'aircraft.positionSource': 'Position Source',
    'aircraft.onGround': tr.common.onGround,
    'aircraft.inFlight': tr.common.active,
    'aircraft.airline': 'Airline',
    'aircraft.manufacturer': 'Manufacturer',
    'aircraft.model': 'Model',
    'aircraft.serialNumber': 'Serial Number',
    'aircraft.builtYear': 'Built Year',
    'aircraft.engines': 'Engines',
    'aircraft.engineType': 'Engine Type',
    'aircraft.aircraftType': 'Aircraft Type',
    'aircraft.origin': 'Origin',
    'aircraft.destination': 'Destination',
    'aircraft.departure': 'Departure',
    'aircraft.arrival': 'Arrival',
    'aircraft.estimatedArrival': 'Est. Arrival',
    'aircraft.flightPath': 'Flight Path',
    'aircraft.viewFullDetail': 'View Full Details',
    'aircraft.close': 'Close',
    'aircraft.back': tr.common.back,
    'aircraft.loading': tr.common.loading,
    'aircraft.noCallsign': 'No Callsign',
    'aircraft.unknown': 'Unknown',
    'aircraft.dataUnavailable': 'N/A',

    // Search
    'search.placeholder': tr.common.search,
    'search.noResults': tr.common.noResults,
    'search.searching': 'Searching...',
    'search.typeAircraft': 'Aircraft',
    'search.typeAirport': 'Airport',
    'search.typeAirline': 'Airline',
    'search.typeFlight': 'Flight',

    // Error & states
    'error.title': tr.common.error,
    'error.description': tr.common.error,
    'error.retry': tr.common.retry,
    'error.network': 'Network error',
    'error.notFound': 'Not Found',

    // Common
    'common.loading': tr.common.loading,
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.view': 'View',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.clear': 'Clear',
    'common.refresh': 'Refresh',
    'common.export': 'Export',
    'common.share': 'Share',
    'common.moreInfo': 'More Info',
    'common.noData': tr.common.noResults,
    'common.showing': 'Showing',
    'common.of': 'of',
    'common.results': 'results',

    // Theme
    'theme.light': 'Light',
    'theme.dark': 'Dark',
    'theme.toggle': 'Toggle theme',

    // Language
    'language.toggle': lang === 'en' ? 'Cambiar a Español' : 'Switch to English',

    // Sidebar
    'sidebar.collapse': 'Collapse sidebar',
    'sidebar.expand': 'Expand sidebar',
  };
  return flat[key] ?? key;
}

export function useT(lang: Language) {
  return (key: TranslationKey): string => t(key, lang);
}

export default translations;
