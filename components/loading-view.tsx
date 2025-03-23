import { Skeleton } from './ui/skeleton';

export const StatsCardLoadingView = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Skeleton className="w-[278px] h-[120px] rounded-md" />
      <Skeleton className="w-[278px] h-[120px] rounded-md" />
      <Skeleton className="w-[278px] h-[120px] rounded-md" />
      <Skeleton className="w-[278px] h-[120px] rounded-md" />
    </div>
  );
};

export const QueryChartLoadingView = () => {
  return (
    <div className="w-full">
      <Skeleton className="w-full h-[370px] rounded-md" />
    </div>
  );
};

export const IndexLoadingView = () => {
  return (
    <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Skeleton className="h-[200px] rounded-md" />
      <Skeleton className="h-[200px] rounded-md" />
      <Skeleton className="h-[200px] rounded-md" />
    </div>
  );
};
