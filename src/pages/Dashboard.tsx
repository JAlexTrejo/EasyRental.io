/**
 * Proyecto: EasyRental.io
 * Desarrollado por: Jose Alejandro Trejo
 * Año: 2025
 */


import AppDashboardCard from "@/components/AppDashboardCard";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { mockApartments, mockExpenses, mockMaintenanceRequests, mockPayments, mockTenants } from "@/mockData";
import { formatDistanceToNow } from "date-fns";
import { ArrowRight, Building2, Home, PiggyBank, Wrench, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user, isLandlord, isTenant } = useAuth();

  // Filter data based on user role
  const relevantTenants = isLandlord
    ? mockTenants
    : mockTenants.filter((tenant) => tenant.id === user?.id);

  const relevantApartments = isLandlord
    ? mockApartments
    : mockApartments.filter(
        (apartment) => apartment.tenantId === user?.id
      );

  const relevantMaintenanceRequests = isLandlord
    ? mockMaintenanceRequests
    : mockMaintenanceRequests.filter(
        (request) => request.tenantId === user?.id
      );

  const relevantPayments = isLandlord
    ? mockPayments
    : mockPayments.filter((payment) => payment.tenantId === user?.id);

  // Calculate summary statistics
  const occupiedApartments = mockApartments.filter((apt) => apt.isOccupied).length;
  const vacantApartments = mockApartments.filter((apt) => !apt.isOccupied).length;
  
  const activeRequests = mockMaintenanceRequests.filter(
    (request) => !["completed", "cancelled"].includes(request.status)
  ).length;
  
  const overduePendingPayments = mockPayments.filter(
    (payment) => payment.status === "overdue" || payment.status === "pending"
  ).length;

  const totalRevenue = mockPayments
    .filter((payment) => payment.status === "paid")
    .reduce((sum, payment) => sum + payment.amount, 0);

  const totalExpenses = mockExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  // Dashboard components for different roles
  const LandlordDashboard = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="stats-card">
          <div className="stats-label">Occupied Units</div>
          <div className="stats-value">{occupiedApartments}</div>
        </div>
        <div className="stats-card">
          <div className="stats-label">Vacant Units</div>
          <div className="stats-value">{vacantApartments}</div>
        </div>
        <div className="stats-card">
          <div className="stats-label">Active Requests</div>
          <div className="stats-value">{activeRequests}</div>
        </div>
        <div className="stats-card">
          <div className="stats-label">Pending Payments</div>
          <div className="stats-value">{overduePendingPayments}</div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Recent Maintenance */}
        <AppDashboardCard 
          title="Recent Maintenance" 
          icon={<Wrench size={18} />}
          footer={
            <Button asChild variant="ghost" size="sm" className="w-full">
              <Link to="/maintenance" className="flex items-center justify-center gap-1">
                <span>View all requests</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </Button>
          }
        >
          <div className="space-y-3">
            {relevantMaintenanceRequests.slice(0, 3).map((request) => (
              <div key={request.id} className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium">{request.title}</div>
                  <div className="text-xs text-muted-foreground">
                    Unit {mockApartments.find(apt => apt.id === request.apartmentId)?.number} • {formatDistanceToNow(new Date(request.createdAt), { addSuffix: true })}
                  </div>
                </div>
                <StatusBadge status={request.status} />
              </div>
            ))}
            {relevantMaintenanceRequests.length === 0 && (
              <div className="py-3 text-sm text-muted-foreground text-center">
                No maintenance requests
              </div>
            )}
          </div>
        </AppDashboardCard>

        {/* Recent Payments */}
        <AppDashboardCard 
          title="Recent Payments" 
          icon={<PiggyBank size={18} />}
          footer={
            <Button asChild variant="ghost" size="sm" className="w-full">
              <Link to="/payments" className="flex items-center justify-center gap-1">
                <span>View all payments</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </Button>
          }
        >
          <div className="space-y-3">
            {relevantPayments.slice(0, 3).map((payment) => (
              <div key={payment.id} className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium">
                    {payment.type.charAt(0).toUpperCase() + payment.type.slice(1)} - ${payment.amount}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Unit {mockApartments.find(apt => apt.id === payment.apartmentId)?.number} • Due: {new Date(payment.dueDate).toLocaleDateString()}
                  </div>
                </div>
                <StatusBadge status={payment.status} />
              </div>
            ))}
            {relevantPayments.length === 0 && (
              <div className="py-3 text-sm text-muted-foreground text-center">
                No recent payments
              </div>
            )}
          </div>
        </AppDashboardCard>

        {/* Tenants Overview */}
        <AppDashboardCard 
          title="Tenants" 
          icon={<Users size={18} />}
          footer={
            <Button asChild variant="ghost" size="sm" className="w-full">
              <Link to="/tenants" className="flex items-center justify-center gap-1">
                <span>View all tenants</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </Button>
          }
        >
          <div className="space-y-3">
            {relevantTenants.slice(0, 3).map((tenant) => (
              <div key={tenant.id} className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium">{tenant.name}</div>
                  <div className="text-xs text-muted-foreground">
                    Unit {mockApartments.find(apt => apt.id === tenant.apartmentId)?.number} • ${tenant.rentAmount}/month
                  </div>
                </div>
                <StatusBadge 
                  status={tenant.balance > 0 ? "Overdue" : "Active"} 
                />
              </div>
            ))}
            {relevantTenants.length === 0 && (
              <div className="py-3 text-sm text-muted-foreground text-center">
                No tenants
              </div>
            )}
          </div>
        </AppDashboardCard>

        {/* Properties Overview */}
        <AppDashboardCard 
          title="Properties" 
          icon={<Building2 size={18} />}
          className="lg:col-span-2"
          footer={
            <Button asChild variant="ghost" size="sm" className="w-full">
              <Link to="/apartments" className="flex items-center justify-center gap-1">
                <span>View all properties</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </Button>
          }
        >
          <div className="space-y-3">
            {relevantApartments.slice(0, 4).map((apartment) => (
              <div key={apartment.id} className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium">
                    Apt {apartment.number} - {apartment.bedrooms}BR/{apartment.bathrooms}BA
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {apartment.address} • ${apartment.rentAmount}/month
                  </div>
                </div>
                <StatusBadge 
                  status={apartment.isOccupied ? "Occupied" : "Vacant"} 
                  variant="outline"
                />
              </div>
            ))}
          </div>
        </AppDashboardCard>

        {/* Financial Summary */}
        <AppDashboardCard 
          title="Financial Summary" 
          icon={<PiggyBank size={18} />}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-muted-foreground text-sm">Revenue</div>
                <div className="text-xl font-medium text-green-600">${totalRevenue}</div>
              </div>
              <div className="space-y-1">
                <div className="text-muted-foreground text-sm">Expenses</div>
                <div className="text-xl font-medium text-red-600">${totalExpenses}</div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-muted-foreground text-sm">Net Income</div>
              <div className={cn(
                "text-xl font-medium",
                totalRevenue - totalExpenses >= 0 ? "text-green-600" : "text-red-600"
              )}>
                ${totalRevenue - totalExpenses}
              </div>
            </div>
          </div>
        </AppDashboardCard>
      </div>
    </div>
  );

  const TenantDashboard = () => {
    // Get tenant data
    const tenantData = mockTenants.find((tenant) => tenant.id === user?.id);
    const apartmentData = mockApartments.find((apt) => apt.id === tenantData?.apartmentId);
    
    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">My Dashboard</h2>

        {/* Tenant Stats Overview */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="stats-card">
            <div className="stats-label">My Rent</div>
            <div className="stats-value">${tenantData?.rentAmount}/mo</div>
          </div>
          <div className="stats-card">
            <div className="stats-label">Balance Due</div>
            <div className={cn("stats-value", tenantData && tenantData.balance > 0 ? "text-red-500" : "")}>
              ${tenantData?.balance || 0}
            </div>
          </div>
          <div className="stats-card">
            <div className="stats-label">Lease Ends</div>
            <div className="stats-value">
              {tenantData?.leaseEnd ? new Date(tenantData.leaseEnd).toLocaleDateString() : "N/A"}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* My Apartment */}
          <AppDashboardCard 
            title="My Apartment" 
            icon={<Home size={18} />}
          >
            {apartmentData ? (
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="font-medium text-lg">
                    Apt {apartmentData.number}
                  </div>
                  <div>
                    {apartmentData.bedrooms} BR / {apartmentData.bathrooms} BA
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {apartmentData.address}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Square Feet:</span> {apartmentData.squareFeet}
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-3 text-sm text-muted-foreground text-center">
                No apartment information available
              </div>
            )}
          </AppDashboardCard>

          {/* My Maintenance Requests */}
          <AppDashboardCard 
            title="My Requests" 
            icon={<Wrench size={18} />}
            footer={
              <Button asChild variant="ghost" size="sm" className="w-full">
                <Link to="/maintenance" className="flex items-center justify-center gap-1">
                  <span>View all requests</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </Button>
            }
          >
            <div className="space-y-3">
              {relevantMaintenanceRequests.slice(0, 3).map((request) => (
                <div key={request.id} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">{request.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(request.createdAt), { addSuffix: true })}
                    </div>
                  </div>
                  <StatusBadge status={request.status} />
                </div>
              ))}
              {relevantMaintenanceRequests.length === 0 && (
                <div className="py-3 text-sm text-muted-foreground text-center">
                  No maintenance requests
                </div>
              )}
            </div>
          </AppDashboardCard>

          {/* My Payments */}
          <AppDashboardCard 
            title="My Payments" 
            icon={<PiggyBank size={18} />}
            footer={
              <Button asChild variant="ghost" size="sm" className="w-full">
                <Link to="/payments" className="flex items-center justify-center gap-1">
                  <span>View all payments</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </Button>
            }
          >
            <div className="space-y-3">
              {relevantPayments.slice(0, 3).map((payment) => (
                <div key={payment.id} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">
                      {payment.type.charAt(0).toUpperCase() + payment.type.slice(1)} - ${payment.amount}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Due: {new Date(payment.dueDate).toLocaleDateString()}
                    </div>
                  </div>
                  <StatusBadge status={payment.status} />
                </div>
              ))}
              {relevantPayments.length === 0 && (
                <div className="py-3 text-sm text-muted-foreground text-center">
                  No payment history
                </div>
              )}
            </div>
          </AppDashboardCard>
        </div>
      </div>
    );
  };

  return isLandlord ? <LandlordDashboard /> : <TenantDashboard />;
};

export default Dashboard;
