import { useLanguage } from '@/i18n/LanguageContext';
import { Info, Database, Code2 } from 'lucide-react';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-8 max-w-3xl">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-[var(--color-accent-glow)] flex items-center justify-center">
          <Info className="text-[var(--color-accent)]" size={28} />
        </div>
        <h1 className="text-3xl font-bold">{t.about.title}</h1>
      </div>

      <p className="text-lg text-[var(--color-text-muted)] leading-relaxed">
        {t.about.description}
      </p>

      <div className="glass rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-3">
          <Database className="text-[var(--color-accent)]" size={22} />
          <h2 className="text-xl font-semibold">{t.about.dataSource}</h2>
        </div>
        <p className="text-[var(--color-text-muted)] leading-relaxed">
          {t.about.dataSourceDesc}
        </p>
      </div>

      <div className="glass rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-3">
          <Code2 className="text-[var(--color-accent)]" size={22} />
          <h2 className="text-xl font-semibold">{t.about.techStack}</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {['React 19', 'TypeScript', 'Tailwind CSS v4', 'TanStack Query', 'Zustand', 'React Router', 'Leaflet', 'Framer Motion'].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 rounded-full text-sm bg-[var(--color-accent-glow)] text-[var(--color-accent)] border border-[var(--color-accent)]/20"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
