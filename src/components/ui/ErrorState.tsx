import { type FC } from 'react';
import { AlertTriangle, RefreshCw, WifiOff, SearchX } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

interface ErrorStateProps {
  icon?: 'warning' | 'network' | 'notFound';
  title?: string;
  description?: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
}

const iconMap = {
  warning: AlertTriangle,
  network: WifiOff,
  notFound: SearchX,
};

export const ErrorState: FC<ErrorStateProps> = ({
  icon = 'warning',
  title,
  description,
  onRetry,
  retryLabel,
  className = '',
}) => {
  const { t } = useLanguage();
  const Icon = iconMap[icon];

  const displayTitle = title ?? t.common.error;
  const displayDesc = description ?? t.common.error;
  const displayRetry = retryLabel ?? t.common.retry;

  return (
    <div
      className={`flex flex-col items-center justify-center py-16 px-4 text-center ${className}`}
      role="alert"
    >
      <div className="mb-6 rounded-full bg-red-500/10 p-6">
        <Icon className="h-12 w-12 text-red-400" aria-hidden="true" />
      </div>
      <h2 className="text-xl font-semibold text-white/90 mb-2">{displayTitle}</h2>
      <p className="text-sm text-white/60 max-w-md mb-6">{displayDesc}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white/80 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        >
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          <span>{displayRetry}</span>
        </button>
      )}
    </div>
  );
};

export default ErrorState;
