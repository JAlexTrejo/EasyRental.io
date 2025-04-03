/**
 * Proyecto: EasyRental.io
 * Desarrollado por: Jose Alejandro Trejo
 * Año: 2025
 */


export type UserRole = "landlord" | "tenant";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
}

export interface Tenant extends User {
  apartmentId: string;
  leaseStart: string;
  leaseEnd: string;
  rentAmount: number;
  balance: number;
  moveInDate: string;
}

export interface Landlord extends User {
  properties: string[];
}

export interface Apartment {
  id: string;
  number: string;
  floor: string;
  building: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  rentAmount: number;
  isOccupied: boolean;
  tenantId?: string;
}

export interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  status: "new" | "assigned" | "in-progress" | "completed" | "cancelled";
  priority: "low" | "medium" | "high" | "urgent";
  createdAt: string;
  updatedAt: string;
  apartmentId: string;
  tenantId: string;
  assignedTo?: string;
  photos?: string[];
  comments?: Comment[];
}

export interface Comment {
  id: string;
  text: string;
  createdAt: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
}

export interface Payment {
  id: string;
  amount: number;
  type: "rent" | "deposit" | "fee";
  status: "pending" | "paid" | "overdue" | "refunded";
  dueDate: string;
  paidDate?: string;
  tenantId: string;
  apartmentId: string;
  receiptUrl?: string;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: "maintenance" | "utilities" | "taxes" | "insurance" | "other";
  propertyId: string;
  vendorName?: string;
  receiptUrl?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "error";
  isRead: boolean;
  createdAt: string;
  userId: string;
  linkTo?: string;
}
