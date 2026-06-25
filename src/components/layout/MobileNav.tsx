import { type FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Map, Search, Building2, MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { useT } from '@/i18n/translations';

interface MobileNavItem {
  to: string;
  icon: typeof Home;
  labelKey: 'nav.home' | 'nav.map' | 'nav.search' | 'nav.airports' | 'nav.more';
}

const navItems: MobileNavItem[] = [
  { to: '/', icon: Home, labelKey: 'nav.home' },
  { to: '/map', icon: Map, labelKey: 'nav.map' },
  { to: '/search', icon: Search, labelKey: 'nav.search' },
  { to: '/airports', icon: Building2, labelKey: 'nav.airports' },
  { to: '/more', icon: MoreHorizontal, labelKey: 'nav.more' },
];

export const MobileNav: FC = () => {
  const language = useAppStore((s) => s.language);
  const t = useT(language);
  const location = useLocation();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden
        bg-black/60 backdrop-blur-xl border-t border-white/[0.08]
        safe-area-inset-bottom"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around h-16 px-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className="relative flex flex-col items-center justify-center gap-0.5 min-w-0 flex-1 py-1
                text-white/40 hover:text-white/70 transition-colors"
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-indicator"
                  className="absolute -top-0.5 left-1/4 right-1/4 h-0.5 rounded-full bg-blue-400"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Icon
                className={`h-5 w-5 flex-shrink-0 ${
                  isActive ? 'text-blue-400' : ''
                }`}
                aria-hidden="true"
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span
                className={`text-[10px] font-medium truncate max-w-[64px] ${
                  isActive ? 'text-blue-400' : ''
                }`}
              >
                {t(item.labelKey)}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;
