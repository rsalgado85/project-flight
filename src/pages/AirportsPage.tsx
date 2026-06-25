import { useLanguage } from '@/i18n/LanguageContext';
import { TableSkeleton } from '@/components/ui/Skeleton';
import { MapPin } from 'lucide-react';

export default function AirportsPage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-[var(--color-accent-glow)] flex items-center justify-center">
          <MapPin className="text-[var(--color-accent)]" size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{t.airports.title}</h1>
          <p className="text-[var(--color-text-muted)]">{t.common.search} airports by ICAO, IATA, or name</p>
        </div>
      </div>

      <TableSkeleton rows={8} />
    </div>
  );
}
