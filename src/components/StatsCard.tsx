import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "stable";
  trendValue?: string;
}

export function StatsCard({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend, 
  trendValue 
}: StatsCardProps) {
  return (
    <Card className="transition-all hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">
            {description}
          </p>
        )}
        {trend && trendValue && (
          <div className="flex items-center text-xs">
            <span 
              className={
                trend === "up" 
                  ? "text-success" 
                  : trend === "down" 
                  ? "text-destructive" 
                  : "text-muted-foreground"
              }
            >
              {trendValue}
            </span>
            <span className="text-muted-foreground ml-1">vs mes anterior</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}