import { type FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Plane,
  Building2,
  Building,
  Info,
  ChevronLeft,
  Sun,
  Moon,
  Globe,
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { useT } from '@/i18n/translations';

interface NavItem {
  to: string;
  icon: typeof Home;
  labelKey: 'nav.home' | 'nav.aircraft' | 'nav.airports' | 'nav.airlines' | 'nav.about';
}

const navItems: NavItem[] = [
  { to: '/', icon: Home, labelKey: 'nav.home' },
  { to: '/aircraft', icon: Plane, labelKey: 'nav.aircraft' },
  { to: '/airports', icon: Building2, labelKey: 'nav.airports' },
  { to: '/airlines', icon: Building, labelKey: 'nav.airlines' },
  { to: '/about', icon: Info, labelKey: 'nav.about' },
];

export const Sidebar: FC = () => {
  const language = useAppStore((s) => s.language);
  const theme = useAppStore((s) => s.theme);
  const collapsed = useAppStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useAppStore((s) => s.toggleSidebar);
  const toggleTheme = useAppStore((s) => s.toggleTheme);
  const toggleLanguage = useAppStore((s) => s.toggleLanguage);
  const t = useT(language);
  const location = useLocation();

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 256 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="hidden md:flex flex-col h-screen sticky top-0 z-40
        bg-white/5 backdrop-blur-xl border-r border-white/[0.08]
        shadow-[0_0_60px_-15px_rgba(0,0,0,0.3)]"
    >
      {/* Logo + collapse toggle */}
      <div
        className={`flex items-center h-16 px-4 border-b border-white/[0.08] ${
          collapsed ? 'justify-center' : 'justify-between'
        }`}
      >
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              key="logo-expanded"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex items-center gap-2.5"
            >
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Plane className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-sm tracking-wider text-white/90">
                {t('app.name')}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        {collapsed && (
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Plane className="h-4 w-4 text-white" />
          </div>
        )}
        <button
          type="button"
          onClick={toggleSidebar}
          className={`p-1.5 rounded-lg hover:bg-white/10 text-white/50 hover:text-white/80 transition-colors ${
            collapsed ? 'hidden' : ''
          }`}
          aria-label={collapsed ? t('sidebar.expand') : t('sidebar.collapse')}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-blue-500/15 text-blue-400 shadow-[inset_0_0_0_1px_rgba(59,130,246,0.2)]'
                  : 'text-white/50 hover:text-white/80 hover:bg-white/5'
              }`}
            >
              <Icon
                className={`h-5 w-5 flex-shrink-0 transition-colors ${
                  isActive ? 'text-blue-400' : 'text-white/40 group-hover:text-white/70'
                }`}
                aria-hidden="true"
              />
              <AnimatePresence mode="wait">
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    className="text-sm font-medium whitespace-nowrap"
                  >
                    {t(item.labelKey)}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom controls */}
      <div className="p-3 border-t border-white/[0.08] space-y-1">
        {/* Theme toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-white/50 hover:text-white/80 hover:bg-white/5 ${
            collapsed ? 'justify-center' : ''
          }`}
          aria-label={t('theme.toggle')}
        >
          {theme === 'dark' ? (
            <Moon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
          ) : (
            <Sun className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
          )}
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm font-medium whitespace-nowrap"
              >
                {theme === 'dark' ? t('theme.dark') : t('theme.light')}
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {/* Language toggle */}
        <button
          type="button"
          onClick={toggleLanguage}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-white/50 hover:text-white/80 hover:bg-white/5 ${
            collapsed ? 'justify-center' : ''
          }`}
          aria-label={t('language.toggle')}
        >
          <Globe className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm font-medium whitespace-nowrap"
              >
                {language.toUpperCase()}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
