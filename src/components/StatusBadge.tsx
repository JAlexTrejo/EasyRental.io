/**
 * Proyecto: EasyRental.io
 * Desarrollado por: Jose Alejandro Trejo
 * Año: 2025
 */


import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  variant?: "default" | "outline";
  className?: string;
}

const StatusBadge = ({ status, variant = "default", className }: StatusBadgeProps) => {
  // Map status to color variant
  const getStatusVariant = () => {
    switch (status.toLowerCase()) {
      case "completed":
      case "paid":
      case "active":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "new":
      case "pending":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "in-progress":
      case "assigned":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100";
      case "overdue":
      case "urgent":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "low":
        return "bg-slate-100 text-slate-800 hover:bg-slate-100";
      case "medium":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100";
      case "high":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100";
      case "cancelled":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
      default:
        return "bg-slate-100 text-slate-800 hover:bg-slate-100";
    }
  };

  return (
    <Badge
      variant={variant}
      className={cn(getStatusVariant(), "font-medium", className)}
    >
      {status}
    </Badge>
  );
};

export default StatusBadge;
