import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Plane, Gauge, Mountain, Compass, ArrowUpDown, Hash } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { useT } from '@/i18n/translations';
import type { Aircraft } from '@/types/flight';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface AircraftPanelProps {
  aircraft: Aircraft | null;
  onClose: () => void;
}

export const AircraftPanel: FC<AircraftPanelProps> = ({ aircraft, onClose }) => {
  const navigate = useNavigate();
  const language = useAppStore((s) => s.language);
  const t = useT(language);

  return (
    <AnimatePresence>
      {aircraft && (
        <>
          {/* Overlay backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md
              bg-black/80 backdrop-blur-2xl border-l border-white/[0.08]
              shadow-2xl overflow-y-auto
              lg:w-96"
            role="dialog"
            aria-label={t('aircraft.title')}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-4
              bg-black/60 backdrop-blur-xl border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Plane className="h-4 w-4 text-blue-400" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white/90 leading-tight">
                    {aircraft.callsign || t('aircraft.noCallsign')}
                  </h2>
                  <p className="text-[10px] text-white/40 font-mono">{aircraft.icao24.toUpperCase()}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-white/10 text-white/50 hover:text-white/80 transition-colors"
                aria-label={t('aircraft.close')}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              {/* Status badge */}
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                    aircraft.on_ground
                      ? 'bg-emerald-500/15 text-emerald-400'
                      : 'bg-blue-500/15 text-blue-400'
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      aircraft.on_ground ? 'bg-emerald-400' : 'bg-blue-400 animate-pulse'
                    }`}
                    aria-hidden="true"
                  />
                  {aircraft.on_ground ? t('aircraft.onGround') : t('aircraft.inFlight')}
                </span>
                {aircraft.origin_country && (
                  <span className="text-[10px] text-white/40">
                    {aircraft.origin_country}
                  </span>
                )}
              </div>

              {/* Info grid */}
              <div className="grid grid-cols-2 gap-3">
                <InfoTile
                  icon={Mountain}
                  label={t('aircraft.altitude')}
                  value={aircraft.baro_altitude != null ? `${aircraft.baro_altitude.toLocaleString()} ft` : t('aircraft.dataUnavailable')}
                />
                <InfoTile
                  icon={Gauge}
                  label={t('aircraft.speed')}
                  value={aircraft.velocity != null ? `${aircraft.velocity.toFixed(0)} kts` : t('aircraft.dataUnavailable')}
                />
                <InfoTile
                  icon={Compass}
                  label={t('aircraft.heading')}
                  value={aircraft.true_track != null ? `${aircraft.true_track.toFixed(0)}°` : t('aircraft.dataUnavailable')}
                />
                <InfoTile
                  icon={ArrowUpDown}
                  label={t('aircraft.verticalRate')}
                  value={aircraft.vertical_rate != null
                    ? `${aircraft.vertical_rate > 0 ? '+' : ''}${aircraft.vertical_rate.toFixed(0)} ft/min`
                    : t('aircraft.dataUnavailable')}
                />
              </div>

              {/* Position */}
              {(aircraft.latitude != null && aircraft.longitude != null) && (
                <div className="glass-card p-3 space-y-1">
                  <p className="text-[10px] font-medium text-white/40 uppercase tracking-wider">
                    {t('aircraft.position')}
                  </p>
                  <p className="text-sm font-mono text-white/70">
                    {aircraft.latitude.toFixed(4)}°, {aircraft.longitude.toFixed(4)}°
                  </p>
                </div>
              )}

              {/* Squawk */}
              {aircraft.squawk && aircraft.squawk !== '0000' && (
                <div className="flex items-center gap-2">
                  <Hash className="h-3.5 w-3.5 text-white/40" aria-hidden="true" />
                  <span className="text-xs text-white/50">{t('aircraft.squawk')}:</span>
                  <span className="text-xs font-mono font-semibold text-white/70">
                    {aircraft.squawk}
                  </span>
                </div>
              )}

              {/* Last contact */}
              {aircraft.last_contact && (
                <p className="text-[10px] text-white/30">
                  {t('aircraft.lastContact')}: {dayjs.unix(aircraft.last_contact).fromNow()}
                </p>
              )}

              {/* Full detail button */}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  navigate(`/aircraft/${aircraft.icao24}`);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl
                  bg-blue-500/15 hover:bg-blue-500/25 text-blue-400 text-sm font-medium
                  transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                {t('aircraft.viewFullDetail')}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Small info tile for the grid
interface InfoTileProps {
  icon: typeof Plane;
  label: string;
  value: string;
}

const InfoTile: FC<InfoTileProps> = ({ icon: Icon, label, value }) => (
  <div className="glass-card p-3 space-y-1">
    <div className="flex items-center gap-1.5">
      <Icon className="h-3 w-3 text-white/40" aria-hidden="true" />
      <p className="text-[10px] font-medium text-white/40 uppercase tracking-wider">{label}</p>
    </div>
    <p className="text-sm font-semibold text-white/80 font-mono">{value}</p>
  </div>
);

export default AircraftPanel;
