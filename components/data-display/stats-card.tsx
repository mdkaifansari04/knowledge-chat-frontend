'use client';

import { Database, HardDrive, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatsCardsProps {
  data: {
    usersCount: number;
    totalStorageUsed: string;
    queries: Array<{ timestamp: string; id: string }>;
    indexes: Array<{
      name: string;
      totalVectors: number;
      dimension: number;
      namespaces: any;
      storageUsed: string;
    }>;
  };
}

export function StatsCards({ data }: StatsCardsProps) {
  // Calculate total vectors across all indexes
  const totalVectors = data.indexes.reduce((sum, index) => sum + index.totalVectors, 0);

  // Count total indexes
  const totalIndexes = data.indexes.length;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Total Storage Used</CardTitle>
          <HardDrive className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.totalStorageUsed}</div>
          <p className="text-xs text-muted-foreground">Across {totalIndexes} indexes</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.usersCount}</div>
          <p className="text-xs text-muted-foreground">Active system users</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Total Vectors</CardTitle>
          <Database className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalVectors.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Across all indexes</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Indexes</CardTitle>
          <Database className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalIndexes}</div>
          <p className="text-xs text-muted-foreground">Total indexes in system</p>
        </CardContent>
      </Card>
    </div>
  );
}
