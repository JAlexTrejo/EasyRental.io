/**
 * Proyecto: EasyRental.io
 * Desarrollado por: Jose Alejandro Trejo
 * Año: 2025
 */


import { 
  User, 
  Tenant, 
  Landlord, 
  Apartment, 
  MaintenanceRequest, 
  Payment, 
  Expense, 
  Notification 
} from "../types";

// Mock Users
export const mockUsers: User[] = [
  {
    id: "landlord-1",
    name: "John Smith",
    email: "john@example.com",
    role: "landlord",
    phone: "555-123-4567",
    avatar: "https://i.pravatar.cc/150?u=landlord1",
  },
  {
    id: "tenant-1",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "tenant",
    phone: "555-987-6543",
    avatar: "https://i.pravatar.cc/150?u=tenant1",
  },
  {
    id: "tenant-2",
    name: "Bob Williams",
    email: "bob@example.com",
    role: "tenant",
    phone: "555-456-7890",
    avatar: "https://i.pravatar.cc/150?u=tenant2",
  },
  {
    id: "tenant-3",
    name: "Carol Davis",
    email: "carol@example.com",
    role: "tenant",
    phone: "555-789-0123",
    avatar: "https://i.pravatar.cc/150?u=tenant3",
  },
];

// Mock Tenants
export const mockTenants: Tenant[] = [
  {
    id: "tenant-1",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "tenant",
    phone: "555-987-6543",
    avatar: "https://i.pravatar.cc/150?u=tenant1",
    apartmentId: "apt-101",
    leaseStart: "2023-01-01",
    leaseEnd: "2024-01-01",
    rentAmount: 1200,
    balance: 0,
    moveInDate: "2023-01-01",
  },
  {
    id: "tenant-2",
    name: "Bob Williams",
    email: "bob@example.com",
    role: "tenant",
    phone: "555-456-7890",
    avatar: "https://i.pravatar.cc/150?u=tenant2",
    apartmentId: "apt-102",
    leaseStart: "2023-02-15",
    leaseEnd: "2024-02-15",
    rentAmount: 1350,
    balance: 150,
    moveInDate: "2023-02-15",
  },
  {
    id: "tenant-3",
    name: "Carol Davis",
    email: "carol@example.com",
    role: "tenant",
    phone: "555-789-0123",
    avatar: "https://i.pravatar.cc/150?u=tenant3",
    apartmentId: "apt-201",
    leaseStart: "2023-03-01",
    leaseEnd: "2024-03-01",
    rentAmount: 1500,
    balance: 0,
    moveInDate: "2023-03-01",
  },
];

// Mock Landlords
export const mockLandlords: Landlord[] = [
  {
    id: "landlord-1",
    name: "John Smith",
    email: "john@example.com",
    role: "landlord",
    phone: "555-123-4567",
    avatar: "https://i.pravatar.cc/150?u=landlord1",
    properties: ["property-1"],
  },
];

// Mock Apartments
export const mockApartments: Apartment[] = [
  {
    id: "apt-101",
    number: "101",
    floor: "1",
    building: "A",
    address: "123 Main St, Anytown, USA",
    bedrooms: 2,
    bathrooms: 1,
    squareFeet: 850,
    rentAmount: 1200,
    isOccupied: true,
    tenantId: "tenant-1",
  },
  {
    id: "apt-102",
    number: "102",
    floor: "1",
    building: "A",
    address: "123 Main St, Anytown, USA",
    bedrooms: 2,
    bathrooms: 1,
    squareFeet: 900,
    rentAmount: 1350,
    isOccupied: true,
    tenantId: "tenant-2",
  },
  {
    id: "apt-201",
    number: "201",
    floor: "2",
    building: "A",
    address: "123 Main St, Anytown, USA",
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1200,
    rentAmount: 1500,
    isOccupied: true,
    tenantId: "tenant-3",
  },
  {
    id: "apt-202",
    number: "202",
    floor: "2",
    building: "A",
    address: "123 Main St, Anytown, USA",
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1250,
    rentAmount: 1600,
    isOccupied: false,
  },
];

// Mock Maintenance Requests
export const mockMaintenanceRequests: MaintenanceRequest[] = [
  {
    id: "req-1",
    title: "Leaky faucet",
    description: "The bathroom sink faucet is dripping constantly",
    status: "new",
    priority: "medium",
    createdAt: "2023-05-10T14:30:00Z",
    updatedAt: "2023-05-10T14:30:00Z",
    apartmentId: "apt-101",
    tenantId: "tenant-1",
  },
  {
    id: "req-2",
    title: "Broken heater",
    description: "The heater isn't working properly",
    status: "assigned",
    priority: "high",
    createdAt: "2023-05-08T09:15:00Z",
    updatedAt: "2023-05-09T10:20:00Z",
    apartmentId: "apt-102",
    tenantId: "tenant-2",
    assignedTo: "worker-1",
  },
  {
    id: "req-3",
    title: "Clogged drain",
    description: "The kitchen sink is draining very slowly",
    status: "in-progress",
    priority: "medium",
    createdAt: "2023-05-05T11:45:00Z",
    updatedAt: "2023-05-06T13:10:00Z",
    apartmentId: "apt-201",
    tenantId: "tenant-3",
    assignedTo: "worker-2",
  },
  {
    id: "req-4",
    title: "Light bulb replacement",
    description: "Two light bulbs in the living room need to be replaced",
    status: "completed",
    priority: "low",
    createdAt: "2023-05-01T16:20:00Z",
    updatedAt: "2023-05-02T09:30:00Z",
    apartmentId: "apt-101",
    tenantId: "tenant-1",
    assignedTo: "worker-1",
  },
];

// Mock Payments
export const mockPayments: Payment[] = [
  {
    id: "payment-1",
    amount: 1200,
    type: "rent",
    status: "paid",
    dueDate: "2023-05-01",
    paidDate: "2023-04-29",
    tenantId: "tenant-1",
    apartmentId: "apt-101",
  },
  {
    id: "payment-2",
    amount: 1350,
    type: "rent",
    status: "overdue",
    dueDate: "2023-05-01",
    tenantId: "tenant-2",
    apartmentId: "apt-102",
  },
  {
    id: "payment-3",
    amount: 1500,
    type: "rent",
    status: "paid",
    dueDate: "2023-05-01",
    paidDate: "2023-04-30",
    tenantId: "tenant-3",
    apartmentId: "apt-201",
    receiptUrl: "https://example.com/receipt/payment-3",
  },
  {
    id: "payment-4",
    amount: 1200,
    type: "rent",
    status: "pending",
    dueDate: "2023-06-01",
    tenantId: "tenant-1",
    apartmentId: "apt-101",
  },
];

// Mock Expenses
export const mockExpenses: Expense[] = [
  {
    id: "expense-1",
    description: "Plumbing repairs",
    amount: 250,
    date: "2023-04-15",
    category: "maintenance",
    propertyId: "property-1",
    vendorName: "ABC Plumbing",
  },
  {
    id: "expense-2",
    description: "Landscaping",
    amount: 180,
    date: "2023-04-20",
    category: "maintenance",
    propertyId: "property-1",
    vendorName: "Green Lawn Services",
  },
  {
    id: "expense-3",
    description: "Property insurance",
    amount: 850,
    date: "2023-04-10",
    category: "insurance",
    propertyId: "property-1",
  },
  {
    id: "expense-4",
    description: "Water bill",
    amount: 320,
    date: "2023-05-01",
    category: "utilities",
    propertyId: "property-1",
  },
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: "notification-1",
    title: "Maintenance Request",
    message: "Your maintenance request for leaky faucet has been received",
    type: "info",
    isRead: false,
    createdAt: "2023-05-10T14:35:00Z",
    userId: "tenant-1",
    linkTo: "/maintenance/req-1",
  },
  {
    id: "notification-2",
    title: "Rent Overdue",
    message: "Your rent payment for May is overdue",
    type: "warning",
    isRead: false,
    createdAt: "2023-05-05T08:00:00Z",
    userId: "tenant-2",
    linkTo: "/payments",
  },
  {
    id: "notification-3",
    title: "Maintenance Update",
    message: "Your maintenance request for clogged drain is now in progress",
    type: "info",
    isRead: true,
    createdAt: "2023-05-06T13:15:00Z",
    userId: "tenant-3",
    linkTo: "/maintenance/req-3",
  },
  {
    id: "notification-4",
    title: "New Maintenance Request",
    message: "A new maintenance request has been submitted for apartment 101",
    type: "info",
    isRead: false,
    createdAt: "2023-05-10T14:35:00Z",
    userId: "landlord-1",
    linkTo: "/maintenance/req-1",
  },
];
