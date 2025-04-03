/**
 * Proyecto: EasyRental.io
 * Desarrollado por: Jose Alejandro Trejo
 * Año: 2025
 */


import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  Building2, Home, MoveRight, ShieldCheck, User, Wrench
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // If user is already authenticated, redirect to dashboard
  if (isAuthenticated) {
    navigate("/dashboard");
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <Home className="h-5 w-5 text-primary" />
            <span className="text-lg">ResidenceHub</span>
          </div>
          <nav className="hidden gap-6 md:flex">
            <a href="#features" className="text-sm font-medium transition-colors hover:text-primary">
              Features
            </a>
            <a href="#benefits" className="text-sm font-medium transition-colors hover:text-primary">
              Benefits
            </a>
          </nav>
          <Button onClick={() => navigate("/login")}>Login</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-muted/40 py-12 md:py-20 lg:py-28">
        <div className="container flex flex-col items-center justify-center gap-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Effortless Property Management
          </h1>
          <p className="max-w-[42rem] text-muted-foreground sm:text-xl">
            Simplify your rental property operations with our comprehensive management platform.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" onClick={() => navigate("/login")}>
              Get Started
              <MoveRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#features">Learn More</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container py-14 md:py-20">
        <div className="mx-auto mb-12 flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Complete Property Management Solution
          </h2>
          <p className="max-w-[85%] text-muted-foreground sm:text-lg">
            Everything you need to manage your properties efficiently, all in one place.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Feature 1 */}
          <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
            <User className="h-10 w-10 text-primary" />
            <h3 className="text-xl font-bold">Tenant Management</h3>
            <p className="text-center text-muted-foreground">
              Easily track tenant information, leases, and maintain communication.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
            <Wrench className="h-10 w-10 text-primary" />
            <h3 className="text-xl font-bold">Maintenance Requests</h3>
            <p className="text-center text-muted-foreground">
              Streamlined system for submitting and tracking maintenance issues.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
            <Building2 className="h-10 w-10 text-primary" />
            <h3 className="text-xl font-bold">Property Insights</h3>
            <p className="text-center text-muted-foreground">
              Monitor occupancy, payments, and generate detailed reports.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="bg-muted/40 py-14 md:py-20">
        <div className="container">
          <div className="mx-auto mb-12 flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Designed for Both Landlords and Tenants
            </h2>
            <p className="max-w-[85%] text-muted-foreground sm:text-lg">
              Our platform creates a seamless experience for property managers and renters alike.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col space-y-2 rounded-lg border bg-card p-6">
              <h3 className="flex items-center gap-2 text-xl font-bold">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span>For Landlords</span>
              </h3>
              <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
                <li>Complete visibility of all properties and tenants</li>
                <li>Automated rent reminders and payment tracking</li>
                <li>Maintenance request management</li>
                <li>Financial reporting and insights</li>
                <li>Document storage for leases and agreements</li>
              </ul>
            </div>
            
            <div className="flex flex-col space-y-2 rounded-lg border bg-card p-6">
              <h3 className="flex items-center gap-2 text-xl font-bold">
                <User className="h-5 w-5 text-primary" />
                <span>For Tenants</span>
              </h3>
              <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
                <li>Easy maintenance request submission</li>
                <li>Rent payment tracking and receipts</li>
                <li>Document access for lease agreements</li>
                <li>Communication channel with property management</li>
                <li>Mobile-friendly interface for on-the-go access</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-14 md:py-20">
        <div className="flex flex-col items-center justify-center gap-6 rounded-lg bg-muted/80 p-8 text-center md:p-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Ready to Streamline Your Property Management?
          </h2>
          <p className="max-w-[600px] text-muted-foreground md:text-xl">
            Join thousands of property managers who have simplified their rental operations.
          </p>
          <Button size="lg" onClick={() => navigate("/login")}>
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 md:py-10">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <Home className="h-5 w-5 text-primary" />
            <span>ResidenceHub</span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ResidenceHub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
