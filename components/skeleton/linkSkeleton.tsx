// import CreateCategoryDialog from '../dialog/categoryDialog';
import { Skeleton } from '../ui/skeleton';

export function LinkPendingSkeleton({
  showCategoryDialog,
}: {
  showCategoryDialog?: boolean;
}) {
  return (
    <div className="space-y-2">
      <Skeleton className="h-10 w-full rounded-md bg-slate-200" />
      <Skeleton className="h-10 w-full rounded-md bg-slate-200" />
      <Skeleton className="h-10 w-full rounded-md bg-slate-200" />
      <Skeleton className="h-10 w-full rounded-md bg-slate-200" />
      {/* {showCategoryDialog && <CreateCategoryDialog />} */}
    </div>
  );
}
