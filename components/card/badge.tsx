import { cn } from '@/lib/utils';
import React from 'react';
import { Badge } from '../ui/badge';

interface DifficultyBadgeProps {
  difficulty: string;
}

const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({ difficulty }) => {
  const badgeClass = cn(
    'py-0 px-3 rounded-full  border border-2 text-sm font-medium',
    {
      'border-green-500 bg-green-200 text-slate-700': difficulty === 'easy',
      'border-yellow-500 bg-yellow-200': difficulty === 'medium',
      'border-red-500 bg-red-200': difficulty === 'hard',
    },
  );

  return (
    <Badge variant="outline" className={badgeClass}>
      {difficulty?.charAt(0).toUpperCase() + difficulty?.slice(1)}
    </Badge>
  );
};

export default DifficultyBadge;
