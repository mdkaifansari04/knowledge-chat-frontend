import { BarChart, LineChart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IndexesGrid } from '@/components/data-display/indexes-grid';
import { QueriesChart } from '@/components/data-display/queries-chart';
import { StatsCards } from '@/components/data-display/stats-card';

// Mock data - in a real app, this would come from an API
const dashboardData = {
  usersCount: 2,
  queries: [
    { timestamp: '2025-03-15T10:30:00Z', id: 'q1' },
    { timestamp: '2025-03-15T14:45:00Z', id: 'q2' },
    { timestamp: '2025-03-16T09:15:00Z', id: 'q3' },
    { timestamp: '2025-03-17T11:20:00Z', id: 'q4' },
    { timestamp: '2025-03-17T16:30:00Z', id: 'q5' },
  ],
  totalStorageUsed: '3.35 MB',
  indexes: [
    {
      name: 'appnologyjames',
      totalVectors: 0,
      dimension: 3072,
      namespaces: {},
      storageUsed: '0.00 MB',
    },
    {
      name: 'cybersecurity',
      totalVectors: 0,
      dimension: 3072,
      namespaces: {},
      storageUsed: '0.00 MB',
    },
    {
      name: 'marketdata',
      totalVectors: 0,
      dimension: 3072,
      namespaces: {},
      storageUsed: '0.00 MB',
    },
    {
      name: 'demo',
      totalVectors: 286,
      dimension: 3072,
      namespaces: {},
      storageUsed: '3.00MB',
    },
  ],
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <div className="flex-1 p-4 pt-6 space-y-4 md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">System Analytics Dashboard</h2>
        </div>

        {/* Stats Cards */}
        <StatsCards data={dashboardData} />

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
            <Card>
              <CardHeader>
                <CardTitle>Queries Per Day</CardTitle>
                <CardDescription>The number of queries made each day</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <QueriesChart queries={dashboardData.queries} />
              </CardContent>
            </Card>

            {/* Indexes Grid */}
            <div>
              <h3 className="mb-4 text-lg font-medium">Indexes</h3>
              <IndexesGrid indexes={dashboardData.indexes} />
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
}
