import { Library, Plane, Building2, MapPin, Info } from 'lucide-react';

export interface NavItem {
  label: string;
  path: string;
  icon: typeof Library;
}

export const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/', icon: Library },
  { label: 'Aircraft', path: '/aircraft', icon: Plane },
  { label: 'Airports', path: '/airports', icon: MapPin },
  { label: 'Airlines', path: '/airlines', icon: Building2 },
  { label: 'About', path: '/about', icon: Info },
];

export const themeColors = {
  bg: '#0a0e1a',
  surface: '#111827',
  accent: '#00d4ff',
  accentGlow: 'rgba(0,212,255,0.15)',
  danger: '#ef4444',
  warning: '#f59e0b',
  success: '#10b981',
  text: '#e2e8f0',
  textMuted: '#94a3b8',
  border: 'rgba(255,255,255,0.06)',
};

export const API_BASE = 'https://opensky-network.org/api';
export const REFRESH_INTERVAL = 15_000; // 15 seconds
export const DEFAULT_MAP_CENTER: [number, number] = [40.0, -3.0];
export const DEFAULT_MAP_ZOOM = 5;
