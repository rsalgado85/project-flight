import { useParams } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { CardSkeleton } from '@/components/ui/Skeleton';
import { ArrowLeft, Plane } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AircraftPage() {
  const { icao24 } = useParams<{ icao24: string }>();
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
      >
        <ArrowLeft size={18} />
        <span>{t.common.back}</span>
      </Link>

      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-[var(--color-accent-glow)] flex items-center justify-center">
          <Plane className="text-[var(--color-accent)]" size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{icao24 || 'Unknown'}</h1>
          <p className="text-[var(--color-text-muted)]">{t.aircraft.title}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  );
}
