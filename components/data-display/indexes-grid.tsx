'use client';

import { Database, Layers } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface IndexesGridProps {
  indexes: Array<{
    name: string;
    totalVectors: number;
    dimension: number;
    namespaces: Record<string, { recordCount: number }>;
    storageUsed: string;
  }>;
}

export function IndexesGrid({ indexes }: IndexesGridProps) {
  // Function to get storage percentage for progress bar
  const getStoragePercentage = (storageStr: string) => {
    const storage = Number.parseFloat(storageStr.split(' ')[0]);
    // Max is either the highest storage value or 10MB, whichever is greater
    const maxStorage = Math.max(...indexes.map((idx) => Number.parseFloat(idx.storageUsed.split(' ')[0])), 10);
    return (storage / maxStorage) * 100;
  };

  // Function to get color based on storage usage
  const getStorageColor = (storageStr: string) => {
    const storage = Number.parseFloat(storageStr.split(' ')[0]);
    if (storage === 0) return 'bg-muted';
    if (storage < 1) return 'bg-primary';
    if (storage < 5) return 'bg-amber-500';
    return 'bg-red-500';
  };

  // Function to count namespaces
  const countNamespaces = (namespaces: Record<string, { recordCount: number }>) => {
    return Object.keys(namespaces).length;
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {indexes.map((index) => (
        <Card key={index.name} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium truncate">{index.name}</CardTitle>
              <Badge variant={index.totalVectors > 0 ? 'default' : 'outline'}>{index.totalVectors > 0 ? 'Active' : 'Empty'}</Badge>
            </div>
            <CardDescription className="flex items-center gap-1">
              <Database className="w-3 h-3" />
              {index.dimension.toLocaleString()}D
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <div className="flex items-center gap-1">
                  <Layers className="w-4 h-4 text-muted-foreground" />
                  <span>Vectors:</span>
                </div>
                <span className="font-medium">{index.totalVectors.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-sm">
                <div className="flex items-center gap-1">
                  <Database className="w-4 h-4 text-muted-foreground" />
                  <span>Namespaces:</span>
                </div>
                <span className="font-medium">{countNamespaces(index.namespaces)}</span>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Storage:</span>
                  <span className="font-medium">{index.storageUsed}</span>
                </div>
                <Progress value={getStoragePercentage(index.storageUsed)} className={getStorageColor(index.storageUsed)} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
