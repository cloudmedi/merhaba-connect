import { Card } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useApiMetrics } from "@/hooks/useApiMetrics";
import { commonXAxisProps, commonYAxisProps, commonChartProps } from "@/components/charts/ChartConfig";

export function ApiPerformance() {
  const { data: metrics = [] } = useApiMetrics();

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-white hover:shadow-lg transition-shadow">
        <h3 className="text-lg font-semibold mb-6 text-gray-900">API Request Volume (24h)</h3>
        <div className="h-[300px]">
          <ChartContainer
            config={{
              requests: { color: "#6E59A5" },
              errors: { color: "#ef4444" },
            }}
          >
            <BarChart 
              data={metrics}
              {...commonChartProps}
            >
              <XAxis 
                {...commonXAxisProps}
                dataKey="endpoint"
              />
              <YAxis {...commonYAxisProps} />
              <ChartTooltip />
              <Bar 
                dataKey="total_requests" 
                fill="#6E59A5"
                radius={[4, 4, 0, 0]}
                maxBarSize={40}
                {...commonChartProps}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </Card>

      <Card className="p-6 bg-white hover:shadow-lg transition-shadow">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">API Endpoint Performance</h3>
        <ScrollArea className="h-[300px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Endpoint</TableHead>
                <TableHead className="text-right">Avg Response Time</TableHead>
                <TableHead className="text-right">Total Requests</TableHead>
                <TableHead className="text-right">Error Count</TableHead>
                <TableHead className="text-right">Success Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {metrics.map((metric) => (
                <TableRow key={metric.id}>
                  <TableCell className="font-medium">{metric.endpoint}</TableCell>
                  <TableCell className="text-right">{metric.response_time}ms</TableCell>
                  <TableCell className="text-right">{metric.total_requests.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{metric.error_count}</TableCell>
                  <TableCell className="text-right">
                    {metric.success_rate.toFixed(2)}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </Card>
    </div>
  );
}