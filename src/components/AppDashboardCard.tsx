/**
 * Proyecto: EasyRental.io
 * Desarrollado por: Jose Alejandro Trejo
 * Año: 2025
 */


import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface AppDashboardCardProps {
  title: string;
  icon?: ReactNode;
  footer?: ReactNode;
  className?: string;
  children: ReactNode;
}

const AppDashboardCard = ({
  title,
  icon,
  footer,
  className,
  children,
}: AppDashboardCardProps) => {
  return (
    <Card className={cn("shadow-sm hover:shadow-md transition-all", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          {icon && <span className="text-primary">{icon}</span>}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footer && <CardFooter className="pt-0">{footer}</CardFooter>}
    </Card>
  );
};

export default AppDashboardCard;
