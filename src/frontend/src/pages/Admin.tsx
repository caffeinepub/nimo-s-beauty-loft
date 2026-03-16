import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Loader2, LogOut, ShieldAlert } from "lucide-react";
import ContentAdmin from "../components/admin/ContentAdmin";
import ProductsAdmin from "../components/admin/ProductsAdmin";
import ServicesAdmin from "../components/admin/ServicesAdmin";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useIsAdmin } from "../hooks/useQueries";

export default function Admin() {
  const { identity, login, clear, loginStatus } = useInternetIdentity();
  const queryClient = useQueryClient();
  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === "logging-in";
  const { data: isAdmin, isLoading: adminLoading } = useIsAdmin();

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  // Not logged in
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen hero-bg flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-10 shadow-lilac max-w-sm w-full text-center">
          <span className="font-parisienne text-4xl text-primary">Nimo's</span>
          <p className="text-sm font-semibold tracking-widest uppercase text-muted-foreground mt-1 mb-8">
            Beauty Loft — Admin
          </p>
          <p className="text-muted-foreground text-sm mb-6">
            Please log in with Internet Identity to access the admin panel.
          </p>
          <Button
            className="btn-accent w-full rounded-full"
            onClick={login}
            disabled={isLoggingIn}
            data-ocid="admin.primary_button"
          >
            {isLoggingIn ? (
              <>
                <Loader2 size={15} className="animate-spin mr-2" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
          <a
            href="/"
            className="mt-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="admin.link"
          >
            <ArrowLeft size={12} /> Back to site
          </a>
        </div>
      </div>
    );
  }

  // Loading admin status
  if (adminLoading) {
    return (
      <div
        className="min-h-screen hero-bg flex items-center justify-center"
        data-ocid="admin.loading_state"
      >
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  // Not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen hero-bg flex items-center justify-center px-4">
        <div
          className="bg-white rounded-3xl p-10 shadow-lilac max-w-sm w-full text-center"
          data-ocid="admin.error_state"
        >
          <ShieldAlert size={40} className="text-destructive mx-auto mb-4" />
          <h2 className="font-playfair text-xl font-bold text-foreground mb-2">
            Access Denied
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            You do not have admin access to this panel.
          </p>
          <Button
            variant="outline"
            className="rounded-full w-full"
            onClick={handleLogout}
            data-ocid="admin.secondary_button"
          >
            Logout
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin header */}
      <header className="bg-white border-b border-border sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="font-parisienne text-xl text-primary">Nimo's</span>
            <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
              Admin Panel
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
              data-ocid="admin.link"
            >
              <ArrowLeft size={12} /> View Site
            </a>
            <Button
              size="sm"
              variant="outline"
              className="rounded-full gap-1.5 text-xs"
              onClick={handleLogout}
              data-ocid="admin.secondary_button"
            >
              <LogOut size={12} /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="mb-8 bg-muted rounded-full p-1 gap-1">
            <TabsTrigger
              value="products"
              className="rounded-full px-5"
              data-ocid="admin.tab"
            >
              Products
            </TabsTrigger>
            <TabsTrigger
              value="services"
              className="rounded-full px-5"
              data-ocid="admin.tab"
            >
              Services
            </TabsTrigger>
            <TabsTrigger
              value="content"
              className="rounded-full px-5"
              data-ocid="admin.tab"
            >
              Gallery &amp; More
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <ProductsAdmin />
          </TabsContent>
          <TabsContent value="services">
            <ServicesAdmin />
          </TabsContent>
          <TabsContent value="content">
            <ContentAdmin />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
