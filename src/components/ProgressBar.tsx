// FILE: src/components/ProgressBar.tsx
import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
  showPercentage?: boolean;
  className?: string;
}

export const ProgressBar = ({
  current,
  total,
  label,
  showPercentage = true,
  className = '',
}: ProgressBarProps) => {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className={`space-y-2 ${className}`}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between text-sm">
          {label && <span className="font-medium">{label}</span>}
          {showPercentage && (
            <span className="text-muted-foreground">
              {current}/{total} ({percentage}%)
            </span>
          )}
        </div>
      )}
      <Progress value={percentage} className="h-2" />
    </div>
  );
};
