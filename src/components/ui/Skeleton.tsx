import { type FC } from 'react';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: boolean | 'full';
}

export const Skeleton: FC<SkeletonProps> = ({
  className = '',
  width,
  height,
  rounded = false,
}) => {
  const borderRadius = rounded === 'full' ? 'rounded-full' : rounded ? 'rounded-lg' : 'rounded';

  return (
    <div
      className={`animate-pulse bg-white/10 ${borderRadius} ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
      aria-hidden="true"
    />
  );
};

// Pre-configured skeleton variants
export const SkeletonText: FC<{ lines?: number; className?: string }> = ({
  lines = 1,
  className = '',
}) => (
  <div className={`flex flex-col gap-2 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton
        key={i}
        height={16}
        width={i === lines - 1 && lines > 1 ? '70%' : '100%'}
        rounded
      />
    ))}
  </div>
);

export const SkeletonCard: FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`glass-card p-4 space-y-3 ${className}`}>
    <Skeleton height={20} width="60%" rounded />
    <Skeleton height={36} width="40%" rounded />
    <Skeleton height={14} width="80%" rounded />
  </div>
);

export const CardSkeleton: FC = () => (
  <div className="glass rounded-xl p-6 space-y-4">
    <Skeleton height="1.5rem" width="60%" />
    <Skeleton height="3rem" width="80%" />
    <div className="flex gap-4">
      <Skeleton height="1rem" width="30%" />
      <Skeleton height="1rem" width="30%" />
    </div>
  </div>
);

export const TableSkeleton: FC<{ rows?: number }> = ({ rows = 5 }) => (
  <div className="space-y-3">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex gap-4 glass rounded-lg p-4">
        <Skeleton height="1rem" width="20%" />
        <Skeleton height="1rem" width="30%" />
        <Skeleton height="1rem" width="20%" />
        <Skeleton height="1rem" width="25%" />
      </div>
    ))}
  </div>
);

export const SkeletonAvatar: FC<{ size?: number; className?: string }> = ({
  size = 48,
  className = '',
}) => <Skeleton width={size} height={size} rounded="full" className={className} />;

export default Skeleton;
