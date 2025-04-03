/**
 * Proyecto: EasyRental.io
 * Desarrollado por: Jose Alejandro Trejo
 * Año: 2025
 */


import AppAvatar from "@/components/AppAvatar";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { mockApartments, mockTenants } from "@/mockData";
import { format } from "date-fns";
import { Mail, Phone, Plus, Search, UserPlus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Tenants = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  // Filter tenants based on search query
  const filteredTenants = mockTenants.filter((tenant) => {
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    const apartmentNumber = mockApartments.find((apt) => apt.id === tenant.apartmentId)?.number || "";

    return (
      tenant.name.toLowerCase().includes(query) ||
      tenant.email.toLowerCase().includes(query) ||
      apartmentNumber.toLowerCase().includes(query) ||
      tenant.phone?.toLowerCase().includes(query)
    );
  });

  const handleAddTenant = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Tenant Added",
      description: "New tenant has been added successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Tenants</h2>
          <p className="text-muted-foreground">
            Manage your property tenants and their information
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Tenant
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Tenant</DialogTitle>
              <DialogDescription>
                Enter the tenant's details to register them in the system
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddTenant}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label
                    htmlFor="name"
                    className="text-right text-sm font-medium leading-none"
                  >
                    Full Name
                  </label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    className="col-span-3"
                    required
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <label
                    htmlFor="email"
                    className="text-right text-sm font-medium leading-none"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="col-span-3"
                    required
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <label
                    htmlFor="phone"
                    className="text-right text-sm font-medium leading-none"
                  >
                    Phone
                  </label>
                  <Input
                    id="phone"
                    placeholder="555-123-4567"
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <label
                    htmlFor="apartment"
                    className="text-right text-sm font-medium leading-none"
                  >
                    Apartment
                  </label>
                  <select
                    id="apartment"
                    className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    required
                  >
                    <option value="">Select Apartment</option>
                    {mockApartments
                      .filter((apt) => !apt.isOccupied)
                      .map((apt) => (
                        <option key={apt.id} value={apt.id}>
                          Apt {apt.number} - {apt.bedrooms}BR/{apt.bathrooms}BA
                        </option>
                      ))}
                  </select>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <label
                    htmlFor="rent"
                    className="text-right text-sm font-medium leading-none"
                  >
                    Monthly Rent
                  </label>
                  <Input
                    id="rent"
                    type="number"
                    placeholder="1200"
                    className="col-span-3"
                    required
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <label
                    htmlFor="leaseStart"
                    className="text-right text-sm font-medium leading-none"
                  >
                    Lease Start
                  </label>
                  <Input
                    id="leaseStart"
                    type="date"
                    className="col-span-3"
                    required
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <label
                    htmlFor="leaseEnd"
                    className="text-right text-sm font-medium leading-none"
                  >
                    Lease End
                  </label>
                  <Input id="leaseEnd" type="date" className="col-span-3" required />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add Tenant</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="px-6 pb-4 pt-6">
          <div className="flex items-center justify-between">
            <CardTitle>Tenant List</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tenants..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-6">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tenant</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead className="hidden md:table-cell">Contact</TableHead>
                  <TableHead className="hidden lg:table-cell">Lease Period</TableHead>
                  <TableHead className="hidden md:table-cell">Rent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTenants.map((tenant) => (
                  <TableRow key={tenant.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <AppAvatar
                          src={tenant.avatar}
                          fallback={tenant.name}
                          size="sm"
                        />
                        <span>{tenant.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {mockApartments.find((apt) => apt.id === tenant.apartmentId)?.number || ""}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex flex-col">
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          <a href={`mailto:${tenant.email}`} className="text-sm hover:underline">
                            {tenant.email}
                          </a>
                        </span>
                        {tenant.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3 text-muted-foreground" />
                            <a href={`tel:${tenant.phone}`} className="text-sm hover:underline">
                              {tenant.phone}
                            </a>
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="text-sm">
                        {format(new Date(tenant.leaseStart), "MMM d, yyyy")} -{" "}
                        {format(new Date(tenant.leaseEnd), "MMM d, yyyy")}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      ${tenant.rentAmount}/mo
                    </TableCell>
                    <TableCell>
                      <StatusBadge
                        status={tenant.balance > 0 ? "Overdue" : "Active"}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/tenants/${tenant.id}`}>View</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredTenants.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No tenants found.
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

export default Tenants;
