import { cn } from '@/lib/utils';
import { AnimatePresence } from 'framer-motion';
import { Loader2, TriangleAlertIcon } from 'lucide-react';

interface QueryWrapperProps {
  data: unknown;
  isPending: boolean;
  isLoading?: boolean;
  isError: boolean;
  error: any;
  view: React.ReactNode;
  pendingView?: React.ReactNode;
  className?: string;
  emptyDataView?: React.ReactNode;
}
/* prettier-ignore */
export default function QueryWrapper(props: QueryWrapperProps) {
  const canShowData = !props.isError && !props.error && !props.isPending && props.data;
  const showError = props.isError && !props.isPending && props.error;
  const showDefaultPendingView = (props.isPending && !props.pendingView) || props.isLoading;
  // prettier-ignore
  const showEmptyData = (!props.data && props.emptyDataView && !props.isPending) ||
    (Array.isArray(props.data) && props.data?.length === 0 && props.emptyDataView && !props.isPending);

  return (
    <AnimatePresence mode="wait">
      {canShowData ? <div className={props.className}>{ props.view }</div> : null}
      {showError && <QueryErrorIndicator />}
      {props.isPending && (showDefaultPendingView ? <DefaultLoader /> : props.pendingView)}
      {showEmptyData && props.emptyDataView}
    </AnimatePresence>
  );
}

function DefaultLoader() {
  return (
    <div className="w-full flex justify-center items-center">
      <Loader2 className="w-3 h-3 animate-spin" />
    </div>
  );
}

function QueryErrorIndicator(props: { errorMessage?: string }) {
  return (
    <div className="w-full text-red-600 flex flex-col gap-3">
      <TriangleAlertIcon className="w-10 h-10" />
      <p className="font-normal text-sm tracking-tighter">
        {props.errorMessage ? props.errorMessage : 'Something went wrong'}
      </p>
    </div>
  );
}

export function MainSectionWrapper(props: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main
      className={cn('w-full h-screen p-4 overflow-y-auto', props.className)}
    >
      {props.children}
    </main>
  );
}
