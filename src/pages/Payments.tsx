/**
 * Proyecto: EasyRental.io
 * Desarrollado por: Jose Alejandro Trejo
 * Año: 2025
 */


import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { mockApartments, mockPayments, mockTenants } from "@/mockData";
import { format } from "date-fns";
import { Download, Filter, Plus, Search, Upload } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const Payments = () => {
  const { user, isLandlord } = useAuth();
  const { toast } = useToast();
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter payments based on role and status filter
  const filteredPayments = mockPayments
    .filter((payment) => {
      // Filter by user role
      if (!isLandlord && payment.tenantId !== user?.id) {
        return false;
      }

      // Filter by status
      if (filter !== "all" && payment.status !== filter) {
        return false;
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const tenant = mockTenants.find((t) => t.id === payment.tenantId);
        const apartment = mockApartments.find((a) => a.id === payment.apartmentId);
        
        return (
          tenant?.name.toLowerCase().includes(query) ||
          apartment?.number.toLowerCase().includes(query) ||
          payment.id.toLowerCase().includes(query)
        );
      }

      return true;
    })
    .sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());

  // Handle mark as paid (mock)
  const handleMarkAsPaid = (paymentId: string) => {
    toast({
      title: "Payment Marked as Paid",
      description: `Payment ${paymentId} has been marked as paid`,
    });
  };

  // Get tenant name by ID
  const getTenantName = (tenantId: string) => {
    return mockTenants.find((tenant) => tenant.id === tenantId)?.name || "Unknown";
  };

  // Get apartment number by ID
  const getApartmentNumber = (apartmentId: string) => {
    return mockApartments.find((apt) => apt.id === apartmentId)?.number || "Unknown";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Payments</h2>
          <p className="text-muted-foreground">
            {isLandlord
              ? "Manage and track tenant payments"
              : "View and manage your rent payments"}
          </p>
        </div>
        {isLandlord && (
          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Create Payment
          </Button>
        )}
      </div>

      <Card>
        <CardHeader className="px-5 pb-3 pt-4">
          <div className="flex items-center justify-between">
            <CardTitle>Payment History</CardTitle>
            <Tabs defaultValue="all" className="w-[400px]" onValueChange={setFilter}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="paid">Paid</TabsTrigger>
                <TabsTrigger value="overdue">Overdue</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent className="px-5 pb-3 pt-0">
          <div className="flex items-center justify-between py-4">
            <div className="flex flex-1 items-center space-x-2">
              <div className="relative flex-1 md:max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search payments..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="ml-auto h-9">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuItem onClick={() => setFilter("all")}>
                    All Payments
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter("pending")}>
                    Pending
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter("paid")}>
                    Paid
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter("overdue")}>
                    Overdue
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  {isLandlord && <TableHead>Tenant</TableHead>}
                  <TableHead>Unit</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    {isLandlord && (
                      <TableCell className="font-medium">
                        {getTenantName(payment.tenantId)}
                      </TableCell>
                    )}
                    <TableCell>{getApartmentNumber(payment.apartmentId)}</TableCell>
                    <TableCell>${payment.amount}</TableCell>
                    <TableCell className="capitalize">{payment.type}</TableCell>
                    <TableCell>{format(new Date(payment.dueDate), "MMM d, yyyy")}</TableCell>
                    <TableCell>
                      <StatusBadge status={payment.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      {payment.status === "pending" && !isLandlord ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMarkAsPaid(payment.id)}
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          Mark Paid
                        </Button>
                      ) : payment.status === "paid" && payment.receiptUrl ? (
                        <Button variant="outline" size="sm" asChild>
                          <a href={payment.receiptUrl} target="_blank" rel="noreferrer">
                            <Download className="mr-2 h-4 w-4" />
                            Receipt
                          </a>
                        </Button>
                      ) : null}
                    </TableCell>
                  </TableRow>
                ))}
                {filteredPayments.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={isLandlord ? 7 : 6}
                      className="h-24 text-center"
                    >
                      No payment records found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Payments;
