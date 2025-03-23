'use client';
import { withAdminAuth } from '@/app/provider/adminAuthProvider';
import { IndexesGrid } from '@/components/data-display/indexes-grid';
import { QueriesChart } from '@/components/data-display/queries-chart';
import { StatsCards } from '@/components/data-display/stats-card';
import { IndexLoadingView, QueryChartLoadingView, StatsCardLoadingView } from '@/components/loading-view';
import QueryWrapper from '@/components/shared/wrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGetAlalytics } from '@/hooks/query';
import { BarChart, LineChart } from 'lucide-react';

const Page: React.FC = () => {
  const { data, isPending, isError, error } = useGetAlalytics();

  return (
    <div className="flex flex-col w-full min-h-screen">
      <div className="flex-1 p-4 pt-6 space-y-4 md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">System Analytics Dashboard</h2>
        </div>
        {/* Stats Cards */}
        <QueryWrapper isError={isError} data={data} error={error} isPending={isPending} pendingView={<StatsCardLoadingView />} view={<StatsCards data={data!} />} />
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">
              <LineChart className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <BarChart className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Queries Chart */}
            <QueryWrapper
              isError={isError}
              data={data}
              error={error}
              isPending={isPending}
              pendingView={<QueryChartLoadingView />}
              view={
                <Card>
                  <CardHeader>
                    <CardTitle>Queries Per Day</CardTitle>
                    <CardDescription>The number of queries made each day</CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <QueriesChart queries={data ? data.queries : []} />
                  </CardContent>
                </Card>
              }
            />
            {/* Indexes Grid */}
            <div>
              <h3 className="mb-4 text-lg font-medium">Indexes</h3>
              <QueryWrapper isError={isError} data={data} error={error} isPending={isPending} pendingView={<IndexLoadingView />} view={<IndexesGrid indexes={data?.indexes!} />} />
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Analytics</CardTitle>
                <CardDescription>Detailed analytics about system usage</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Advanced analytics features will be available soon.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default withAdminAuth(Page);
