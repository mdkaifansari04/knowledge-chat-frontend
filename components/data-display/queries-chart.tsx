'use client';

import { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface QueriesChartProps {
  queries: Array<{
    timestamp: string;
    id: string;
  }>;
}

export function QueriesChart({ queries }: QueriesChartProps) {
  // Process queries to group by day
  const queryData = useMemo(() => {
    const groupedByDay = queries.reduce(
      (acc, query) => {
        const date = new Date(query.timestamp);
        const day = date.toISOString().split('T')[0];

        if (!acc[day]) {
          acc[day] = {
            date: day,
            count: 0,
          };
        }

        acc[day].count++;
        return acc;
      },
      {} as Record<string, { date: string; count: number }>,
    );

    // Convert to array and sort by date
    return Object.values(groupedByDay).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [queries]);

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <ChartContainer
      config={{
        queries: {
          label: 'Queries',
          color: 'hsl(var(--chart-1))',
        },
      }}
      className="h-[300px]"
    >
      <BarChart accessibilityLayer data={queryData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="date" tickFormatter={formatDate} tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <ChartTooltip content={<ChartTooltipContent indicator="dashed" />} />
        <Bar dataKey="count" name="Queries" fill="var(--color-queries)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  );
}
