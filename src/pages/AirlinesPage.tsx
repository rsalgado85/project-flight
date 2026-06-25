import { useLanguage } from '@/i18n/LanguageContext';
import { TableSkeleton } from '@/components/ui/Skeleton';
import { Building2 } from 'lucide-react';

export default function AirlinesPage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-[var(--color-accent-glow)] flex items-center justify-center">
          <Building2 className="text-[var(--color-accent)]" size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{t.airlines.title}</h1>
          <p className="text-[var(--color-text-muted)]">{t.common.search} airlines by name, ICAO, or IATA</p>
        </div>
      </div>

      <TableSkeleton rows={8} />
    </div>
  );
}
