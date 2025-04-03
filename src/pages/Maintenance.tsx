/**
 * Proyecto: EasyRental.io
 * Desarrollado por: Jose Alejandro Trejo
 * Año: 2025
 */


import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { mockApartments, mockMaintenanceRequests } from "@/mockData";
import { MaintenanceRequest } from "@/types";
import { format } from "date-fns";
import { Filter, MoreHorizontal, Plus, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Maintenance = () => {
  const { user, isLandlord } = useAuth();
  const { toast } = useToast();
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter maintenance requests based on role and status filter
  const filteredRequests = mockMaintenanceRequests
    .filter((request) => {
      // Filter by user role
      if (!isLandlord && request.tenantId !== user?.id) {
        return false;
      }

      // Filter by status
      if (filter !== "all" && request.status !== filter) {
        return false;
      }

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          request.title.toLowerCase().includes(query) ||
          request.description.toLowerCase().includes(query)
        );
      }

      return true;
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // Function to update request status (mock)
  const handleStatusChange = (request: MaintenanceRequest, newStatus: string) => {
    toast({
      title: "Status Updated",
      description: `Request ${request.id} status changed to ${newStatus}`,
    });
  };

  // Get apartment number by ID
  const getApartmentNumber = (apartmentId: string) => {
    return mockApartments.find((apt) => apt.id === apartmentId)?.number || "Unknown";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Maintenance Requests</h2>
          <p className="text-muted-foreground">
            {isLandlord
              ? "Manage and track maintenance requests from tenants"
              : "Submit and track your maintenance requests"}
          </p>
        </div>
        {/* New Request Button (visible to tenants) */}
        {!isLandlord && (
          <Button className="w-full sm:w-auto" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Request
          </Button>
        )}
      </div>

      <Card>
        <CardHeader className="px-5 pb-3 pt-4">
          <div className="flex items-center justify-between">
            <CardTitle>Maintenance Requests</CardTitle>
            <Tabs defaultValue="all" className="w-[400px]" onValueChange={setFilter}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="new">New</TabsTrigger>
                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
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
                  placeholder="Search requests..."
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
                    All Requests
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter("new")}>
                    New Requests
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter("assigned")}>
                    Assigned
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter("in-progress")}>
                    In Progress
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter("completed")}>
                    Completed
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden md:table-cell">Unit</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">
                      <Link to={`/maintenance/${request.id}`} className="hover:underline">
                        {request.title}
                      </Link>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {getApartmentNumber(request.apartmentId)}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {format(new Date(request.createdAt), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={request.priority} />
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={request.status} />
                    </TableCell>
                    <TableCell>
                      {isLandlord ? (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(request, "assigned")}
                            >
                              Assign
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(request, "in-progress")}
                            >
                              Mark In Progress
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(request, "completed")}
                            >
                              Mark Completed
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      ) : (
                        <Button variant="ghost" size="icon" asChild>
                          <Link to={`/maintenance/${request.id}`}>
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">View details</span>
                          </Link>
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {filteredRequests.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No maintenance requests found.
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

export default Maintenance;
