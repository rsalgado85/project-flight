export interface Aircraft {
  icao24: string;
  callsign: string | null;
  origin_country: string;
  longitude: number | null;
  latitude: number | null;
  baro_altitude: number | null;
  velocity: number | null;
  true_track: number | null;
  vertical_rate: number | null;
  on_ground: boolean;
  last_contact: number;
  category?: string;
  geo_altitude?: number | null;
  squawk?: string | null;
  spi?: boolean;
  position_source?: number;
}

export interface Flight {
  icao24: string;
  callsign: string | null;
  origin_country: string;
  departure_airport: string | null;
  arrival_airport: string | null;
  status: FlightStatus;
  scheduled_departure: string | null;
  scheduled_arrival: string | null;
  actual_departure: string | null;
  actual_arrival: string | null;
  aircraft: Aircraft | null;
}

export type FlightStatus = 'scheduled' | 'active' | 'landed' | 'cancelled' | 'diverted';

export interface Airport {
  icao: string;
  iata: string | null;
  name: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  elevation: number | null;
  timezone: string | null;
}

export interface Airline {
  icao: string;
  iata: string | null;
  name: string;
  country: string;
  callsign: string | null;
  active: boolean;
}

export interface FlightTrack {
  icao24: string;
  positions: TrackPosition[];
}

export interface TrackPosition {
  time: number;
  latitude: number;
  longitude: number;
  altitude: number | null;
  heading: number | null;
  velocity: number | null;
}

export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}
