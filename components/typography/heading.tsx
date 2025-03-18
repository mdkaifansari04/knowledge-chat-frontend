import { cn } from '@/lib/utils';
import React from 'react';

interface SectionBreadCrumbProps {
  text: string;
  className?: string;
  textSecondary?: string[] | undefined;
}
export function SectionBreadCrumb({
  text,
  className,
  textSecondary,
}: SectionBreadCrumbProps) {
  return (
    <div className={cn('flex gap-2 items-center justify-start', className)}>
      <h2 className={cn('text-xl md:text-2xl font-medium  text-slate-800')}>
        {text}
      </h2>
      {textSecondary &&
        textSecondary?.map((i, k) => (
          <span
            key={k}
            className="font-normal text-lg md:text-xl text-slate-600"
          >
            {i}
          </span>
        ))}
    </div>
  );
}
