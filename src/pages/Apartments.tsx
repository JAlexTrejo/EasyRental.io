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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockApartments, mockTenants } from "@/mockData";
import { Bed, Home, Plus, Search, Bath } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Apartments = () => {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter apartments based on occupancy and search
  const filteredApartments = mockApartments.filter((apartment) => {
    // Filter by occupancy
    if (filter === "occupied" && !apartment.isOccupied) return false;
    if (filter === "vacant" && apartment.isOccupied) return false;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const tenant = apartment.tenantId
        ? mockTenants.find((t) => t.id === apartment.tenantId)
        : null;
      
      return (
        apartment.number.toLowerCase().includes(query) ||
        apartment.address.toLowerCase().includes(query) ||
        (tenant && tenant.name.toLowerCase().includes(query))
      );
    }

    return true;
  });

  // Get tenant name by ID
  const getTenantName = (tenantId?: string) => {
    if (!tenantId) return "Vacant";
    return mockTenants.find((tenant) => tenant.id === tenantId)?.name || "Unknown";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Apartments</h2>
          <p className="text-muted-foreground">Manage your property units</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Add Apartment
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Summary Cards */}
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Units</p>
              <p className="text-2xl font-bold">{mockApartments.length}</p>
            </div>
            <Home className="h-10 w-10 text-primary opacity-80" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Occupied Units</p>
              <p className="text-2xl font-bold">
                {mockApartments.filter((apt) => apt.isOccupied).length}
              </p>
            </div>
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
              <Home className="h-5 w-5 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Vacant Units</p>
              <p className="text-2xl font-bold">
                {mockApartments.filter((apt) => !apt.isOccupied).length}
              </p>
            </div>
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Home className="h-5 w-5 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="px-5 pb-3 pt-4">
          <div className="flex items-center justify-between">
            <CardTitle>Apartment List</CardTitle>
            <Tabs defaultValue="all" className="w-[300px]" onValueChange={setFilter}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="occupied">Occupied</TabsTrigger>
                <TabsTrigger value="vacant">Vacant</TabsTrigger>
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
                  placeholder="Search apartments..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Number</TableHead>
                  <TableHead className="hidden md:table-cell">Details</TableHead>
                  <TableHead>Tenant</TableHead>
                  <TableHead className="hidden lg:table-cell">Address</TableHead>
                  <TableHead>Rent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApartments.map((apartment) => (
                  <TableRow key={apartment.id}>
                    <TableCell className="font-medium">
                      {apartment.number}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Bed className="h-4 w-4 text-muted-foreground" />
                          <span>{apartment.bedrooms}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Bath className="h-4 w-4 text-muted-foreground" />
                          <span>{apartment.bathrooms}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {apartment.squareFeet} sq ft
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{getTenantName(apartment.tenantId)}</TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="max-w-[200px] truncate text-sm">
                        {apartment.address}
                      </div>
                    </TableCell>
                    <TableCell>${apartment.rentAmount}/mo</TableCell>
                    <TableCell>
                      <StatusBadge
                        status={apartment.isOccupied ? "Occupied" : "Vacant"}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/apartments/${apartment.id}`}>View</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredApartments.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No apartments found.
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

export default Apartments;
