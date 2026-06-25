import { type FC, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Plane, PlaneLanding, Gauge, Mountain } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { useT } from '@/i18n/translations';
import type { DashboardStats } from '@/types/flight';

// Animated counter that counts up/down to target
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const prevValue = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const start = prevValue.current;
    const end = value;
    const duration = 800;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * eased);
      setDisplay(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    prevValue.current = end;

    return () => cancelAnimationFrame(rafRef.current);
  }, [value]);

  return (
    <span className="tabular-nums">
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

interface StatCardProps {
  icon: typeof Plane;
  label: string;
  value: number;
  suffix?: string;
  gradient: string;
}

const StatCard: FC<StatCardProps> = ({ icon: Icon, label, value, suffix = '', gradient }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    className="glass-card p-4 relative overflow-hidden group cursor-default"
    role="status"
    aria-label={`${label}: ${value}${suffix}`}
  >
    {/* Gradient glow */}
    <div
      className={`absolute -top-6 -right-6 w-20 h-20 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity ${gradient}`}
      aria-hidden="true"
    />
    <div className="relative flex items-start justify-between">
      <div className="space-y-1.5">
        <p className="text-xs font-medium text-white/40 uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-bold text-white/90 tracking-tight">
          <AnimatedCounter value={value} suffix={suffix} />
        </p>
      </div>
      <div className={`p-2.5 rounded-xl bg-white/5 ${gradient} bg-opacity-10`}>
        <Icon className="h-5 w-5 text-white/60" aria-hidden="true" />
      </div>
    </div>
  </motion.div>
);

interface StatsBarProps {
  stats?: DashboardStats;
}

export const StatsBar: FC<StatsBarProps> = ({ stats }) => {
  const language = useAppStore((s) => s.language);
  const t = useT(language);
  const dashboardStats = useAppStore((s) => s.dashboardStats);

  const current = stats ?? dashboardStats;

  const statCards = [
    {
      icon: Plane,
      label: t('dashboard.flightsInAir'),
      value: current.flightsInAir,
      suffix: '',
      gradient: 'bg-blue-500',
    },
    {
      icon: PlaneLanding,
      label: t('dashboard.flightsOnGround'),
      value: current.flightsOnGround,
      suffix: '',
      gradient: 'bg-emerald-500',
    },
    {
      icon: Gauge,
      label: t('dashboard.avgSpeed'),
      value: current.avgSpeed,
      suffix: ` ${t('stats.knots')}`,
      gradient: 'bg-amber-500',
    },
    {
      icon: Mountain,
      label: t('dashboard.avgAltitude'),
      value: current.avgAltitude,
      suffix: ` ${t('stats.feet')}`,
      gradient: 'bg-purple-500',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {statCards.map((card) => (
        <StatCard
          key={card.label}
          icon={card.icon}
          label={card.label}
          value={card.value}
          suffix={card.suffix}
          gradient={card.gradient}
        />
      ))}
    </div>
  );
};

export default StatsBar;
