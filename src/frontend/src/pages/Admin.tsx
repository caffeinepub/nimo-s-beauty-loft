import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { ArrowLeft, Lock, Package } from "lucide-react";
import { useEffect, useState } from "react";

const ADMIN_PASSWORD = "nimo2024";

interface Order {
  id: number;
  name: string;
  phone: string;
  address: string;
  items: { name: string; quantity: number }[];
  status: "Pending" | "Confirmed" | "In Progress" | "Delivered";
  createdAt: string;
}

const STATUS_COLORS: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-800",
  Confirmed: "bg-blue-100 text-blue-800",
  "In Progress": "bg-purple-100 text-purple-800",
  Delivered: "bg-green-100 text-green-800",
};

export default function Admin() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (isAuthed) {
      const stored = JSON.parse(localStorage.getItem("nimo_orders") ?? "[]");
      setOrders(stored);
    }
  }, [isAuthed]);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthed(true);
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  const updateStatus = (id: number, status: Order["status"]) => {
    const updated = orders.map((o) => (o.id === id ? { ...o, status } : o));
    setOrders(updated);
    localStorage.setItem("nimo_orders", JSON.stringify(updated));
  };

  if (!isAuthed) {
    return (
      <div className="min-h-screen hero-bg flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-10 shadow-lilac max-w-sm w-full text-center">
          <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Lock size={24} className="text-primary" />
          </div>
          <span className="font-parisienne text-4xl text-primary">Nimo's</span>
          <p className="text-sm font-semibold tracking-widest uppercase text-muted-foreground mt-1 mb-8">
            Beauty Loft — Admin
          </p>
          <div className="space-y-4">
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="rounded-xl text-center"
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              data-ocid="admin.input"
            />
            {error && (
              <p
                className="text-sm text-destructive"
                data-ocid="admin.error_state"
              >
                {error}
              </p>
            )}
            <Button
              className="btn-accent w-full rounded-full"
              onClick={handleLogin}
              data-ocid="admin.login_button"
            >
              Login
            </Button>
          </div>
          <a
            href="/"
            className="mt-6 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="admin.link"
          >
            <ArrowLeft size={12} /> Back to site
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
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
              className="rounded-full text-xs"
              onClick={() => setIsAuthed(false)}
              data-ocid="admin.secondary_button"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center gap-3 mb-8">
          <Package size={22} className="text-primary" />
          <h1 className="font-playfair text-2xl font-bold text-foreground">
            Orders
          </h1>
          <Badge variant="secondary">{orders.length} orders</Badge>
        </div>

        {orders.length === 0 ? (
          <div
            className="bg-white rounded-2xl p-16 text-center shadow-xs"
            data-ocid="admin.empty_state"
          >
            <Package size={40} className="text-muted-foreground mx-auto mb-3" />
            <p className="font-playfair text-lg font-semibold text-foreground mb-1">
              No orders yet
            </p>
            <p className="text-sm text-muted-foreground">
              Orders placed via checkout will appear here.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xs overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order, idx) => (
                  <TableRow
                    key={order.id}
                    data-ocid={`admin.order.row.${idx + 1}`}
                  >
                    <TableCell className="font-semibold">
                      {order.name}
                    </TableCell>
                    <TableCell>{order.phone}</TableCell>
                    <TableCell className="max-w-[200px]">
                      <div className="space-y-0.5">
                        {order.items.map((item) => (
                          <p
                            key={item.name}
                            className="text-xs text-muted-foreground"
                          >
                            {item.name} ×{item.quantity}
                          </p>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-[150px] truncate">
                      {order.address}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(order.createdAt).toLocaleDateString("en-KE", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={order.status}
                        onValueChange={(v) =>
                          updateStatus(order.id, v as Order["status"])
                        }
                      >
                        <SelectTrigger className="w-36 h-8 text-xs rounded-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[
                            "Pending",
                            "Confirmed",
                            "In Progress",
                            "Delivered",
                          ].map((s) => (
                            <SelectItem key={s} value={s} className="text-xs">
                              <span
                                className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[s]}`}
                              >
                                {s}
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </main>
    </div>
  );
}
