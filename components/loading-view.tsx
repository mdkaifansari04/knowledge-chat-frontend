import { Skeleton } from './ui/skeleton';

import { Card, CardContent, CardHeader } from '@/components/ui/card';

export const StatsCardLoadingView = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Skeleton className="h-[120px] rounded-md" />
      <Skeleton className="h-[120px] rounded-md" />
      <Skeleton className="h-[120px] rounded-md" />
      <Skeleton className="h-[120px] rounded-md" />
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

export const KnowledgebaseLoadingView = () => {
  return (
    <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Skeleton className="h-[250px] rounded-md" />
      <Skeleton className="h-[250px] rounded-md" />
      <Skeleton className="h-[250px] rounded-md" />
    </div>
  );
};

export const KnowledgebaseCardLoadingView = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Skeleton className="w-[278px] h-[65px] rounded-md" />
      <Skeleton className="w-[278px] h-[65px] rounded-md" />
      <Skeleton className="w-[278px] h-[65px] rounded-md" />
      <Skeleton className="w-[278px] h-[65px] rounded-md" />
    </div>
  );
};

export const ResourceGroupLoadingView = () => {
  return (
    <div className="w-full">
      <Skeleton className="w-full h-[250px] rounded-md" />
    </div>
  );
};

export const PromptCardLoadingView = () => {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      <Skeleton className="w-[250px] h-[53px] rounded-md" />
      <Skeleton className="w-[250px] h-[53px] rounded-md" />
      <Skeleton className="w-[250px] h-[53px] rounded-md" />
    </div>
  );
};

export const ChatCardPendingView = () => {
  return (
    <div className="grid grid-cols-1 gap-3">
      <ChatCard />
      <ChatCard />
      <ChatCard />
      <ChatCard />
    </div>
  );
};

const ChatCard = () => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <Skeleton className="w-48 h-6" />
      </CardHeader>
      <CardContent>
        <Skeleton className="w-full h-24 mb-4" />
        <Skeleton className="w-full h-24" />
      </CardContent>
    </Card>
  );
};
