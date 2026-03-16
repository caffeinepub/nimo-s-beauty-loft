import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Product } from "../../backend.d";
import {
  Category,
  useCreateProduct,
  useDeleteProduct,
  useProducts,
  useUpdateProduct,
} from "../../hooks/useQueries";

const CATEGORY_LABELS: Record<string, string> = {
  gluelessWig: "Glueless Wig",
  headbandWig: "Headband Wig",
  jewellery: "Jewellery",
};

const EMPTY_FORM = {
  name: "",
  description: "",
  priceKES: "",
  category: Category.gluelessWig as Category,
  imageUrl: "",
  isAvailable: true,
};

export default function ProductsAdmin() {
  const { data: products = [], isLoading } = useProducts();
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();
  const deleteMutation = useDeleteProduct();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({
      name: p.name,
      description: p.description,
      priceKES: p.priceKES.toString(),
      category: p.category,
      imageUrl: p.imageUrl,
      isAvailable: p.isAvailable,
    });
    setOpen(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.priceKES) return;
    const priceKES = BigInt(Math.round(Number(form.priceKES)));
    try {
      if (editing) {
        await updateMutation.mutateAsync({ id: editing.id, ...form, priceKES });
        toast.success("Product updated!");
      } else {
        await createMutation.mutateAsync({ ...form, priceKES });
        toast.success("Product created!");
      }
      setOpen(false);
    } catch {
      toast.error("Failed to save product.");
    }
  };

  const handleDelete = async (id: bigint) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Product deleted.");
    } catch {
      toast.error("Failed to delete product.");
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-playfair text-xl font-semibold text-foreground">
          Products
        </h2>
        <Button
          className="btn-accent rounded-full gap-2"
          onClick={openAdd}
          data-ocid="admin.products.primary_button"
        >
          <Plus size={15} /> Add Product
        </Button>
      </div>

      {isLoading ? (
        <div
          className="flex justify-center py-12"
          data-ocid="admin.products.loading_state"
        >
          <Loader2 className="animate-spin text-primary" size={28} />
        </div>
      ) : products.length === 0 ? (
        <div
          className="text-center py-12 text-muted-foreground"
          data-ocid="admin.products.empty_state"
        >
          No products yet. Add your first product!
        </div>
      ) : (
        <div className="grid gap-3">
          {products.map((p, idx) => (
            <div
              key={p.id.toString()}
              className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-xs"
              data-ocid={`admin.products.item.${idx + 1}`}
            >
              {p.imageUrl && (
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground truncate">
                  {p.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {CATEGORY_LABELS[p.category] ?? p.category} • KES{" "}
                  {Number(p.priceKES).toLocaleString()}
                </p>
              </div>
              <Badge variant={p.isAvailable ? "default" : "secondary"}>
                {p.isAvailable ? "Available" : "Hidden"}
              </Badge>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => openEdit(p)}
                data-ocid={`admin.products.edit_button.${idx + 1}`}
              >
                <Pencil size={15} />
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-destructive"
                    data-ocid={`admin.products.delete_button.${idx + 1}`}
                  >
                    <Trash2 size={15} />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent data-ocid="admin.products.dialog">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Product?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete "{p.name}". This action
                      cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel data-ocid="admin.products.cancel_button">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(p.id)}
                      data-ocid="admin.products.confirm_button"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md" data-ocid="admin.products.modal">
          <DialogHeader>
            <DialogTitle className="font-playfair">
              {editing ? "Edit Product" : "Add Product"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Name</Label>
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                placeholder="Product name"
                data-ocid="admin.products.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
                rows={3}
                data-ocid="admin.products.textarea"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Price (KES)</Label>
                <Input
                  type="number"
                  value={form.priceKES}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, priceKES: e.target.value }))
                  }
                  placeholder="5000"
                  data-ocid="admin.products.input"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(v) =>
                    setForm((p) => ({ ...p, category: v as Category }))
                  }
                >
                  <SelectTrigger data-ocid="admin.products.select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={Category.gluelessWig}>
                      Glueless Wig
                    </SelectItem>
                    <SelectItem value={Category.headbandWig}>
                      Headband Wig
                    </SelectItem>
                    <SelectItem value={Category.jewellery}>
                      Jewellery
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Image URL</Label>
              <Input
                value={form.imageUrl}
                onChange={(e) =>
                  setForm((p) => ({ ...p, imageUrl: e.target.value }))
                }
                placeholder="https://..."
                data-ocid="admin.products.input"
              />
            </div>
            <div className="flex items-center gap-3">
              <Switch
                checked={form.isAvailable}
                onCheckedChange={(v) =>
                  setForm((p) => ({ ...p, isAvailable: v }))
                }
                data-ocid="admin.products.switch"
              />
              <Label>Available</Label>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              data-ocid="admin.products.cancel_button"
            >
              Cancel
            </Button>
            <Button
              className="btn-accent"
              onClick={handleSave}
              disabled={isPending}
              data-ocid="admin.products.save_button"
            >
              {isPending && <Loader2 size={14} className="animate-spin mr-1" />}
              {editing ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
