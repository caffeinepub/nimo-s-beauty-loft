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
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Service } from "../../backend.d";
import {
  useCreateService,
  useDeleteService,
  useServices,
  useUpdateService,
} from "../../hooks/useQueries";

const EMPTY_FORM = {
  name: "",
  description: "",
  priceFrom: "",
  iconName: "Star",
  displayOrder: "0",
};

export default function ServicesAdmin() {
  const { data: services = [], isLoading } = useServices();
  const createMutation = useCreateService();
  const updateMutation = useUpdateService();
  const deleteMutation = useDeleteService();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setOpen(true);
  };

  const openEdit = (s: Service) => {
    setEditing(s);
    setForm({
      name: s.name,
      description: s.description,
      priceFrom: s.priceFrom ?? "",
      iconName: s.iconName,
      displayOrder: s.displayOrder.toString(),
    });
    setOpen(true);
  };

  const handleSave = async () => {
    if (!form.name) return;
    const payload = {
      name: form.name,
      description: form.description,
      priceFrom: form.priceFrom || null,
      iconName: form.iconName,
      displayOrder: BigInt(Number(form.displayOrder) || 0),
    };
    try {
      if (editing) {
        await updateMutation.mutateAsync({ id: editing.id, ...payload });
        toast.success("Service updated!");
      } else {
        await createMutation.mutateAsync(payload);
        toast.success("Service created!");
      }
      setOpen(false);
    } catch {
      toast.error("Failed to save service.");
    }
  };

  const handleDelete = async (id: bigint) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Service deleted.");
    } catch {
      toast.error("Failed to delete service.");
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-playfair text-xl font-semibold text-foreground">
          Services
        </h2>
        <Button
          className="btn-accent rounded-full gap-2"
          onClick={openAdd}
          data-ocid="admin.services.primary_button"
        >
          <Plus size={15} /> Add Service
        </Button>
      </div>

      {isLoading ? (
        <div
          className="flex justify-center py-12"
          data-ocid="admin.services.loading_state"
        >
          <Loader2 className="animate-spin text-primary" size={28} />
        </div>
      ) : services.length === 0 ? (
        <div
          className="text-center py-12 text-muted-foreground"
          data-ocid="admin.services.empty_state"
        >
          No services yet.
        </div>
      ) : (
        <div className="grid gap-3">
          {services.map((s, idx) => (
            <div
              key={s.id.toString()}
              className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-xs"
              data-ocid={`admin.services.item.${idx + 1}`}
            >
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground">{s.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {s.description}
                </p>
                {s.priceFrom && (
                  <p className="text-xs text-rosegold mt-0.5">
                    From KES {s.priceFrom}
                  </p>
                )}
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => openEdit(s)}
                data-ocid={`admin.services.edit_button.${idx + 1}`}
              >
                <Pencil size={15} />
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-destructive"
                    data-ocid={`admin.services.delete_button.${idx + 1}`}
                  >
                    <Trash2 size={15} />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent data-ocid="admin.services.dialog">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Service?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete "{s.name}".
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel data-ocid="admin.services.cancel_button">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(s.id)}
                      data-ocid="admin.services.confirm_button"
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
        <DialogContent className="max-w-md" data-ocid="admin.services.modal">
          <DialogHeader>
            <DialogTitle className="font-playfair">
              {editing ? "Edit Service" : "Add Service"}
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
                placeholder="Service name"
                data-ocid="admin.services.input"
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
                data-ocid="admin.services.textarea"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Price From (KES)</Label>
                <Input
                  value={form.priceFrom}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, priceFrom: e.target.value }))
                  }
                  placeholder="500"
                  data-ocid="admin.services.input"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Display Order</Label>
                <Input
                  type="number"
                  value={form.displayOrder}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, displayOrder: e.target.value }))
                  }
                  data-ocid="admin.services.input"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Icon Name</Label>
              <Input
                value={form.iconName}
                onChange={(e) =>
                  setForm((p) => ({ ...p, iconName: e.target.value }))
                }
                placeholder="Star"
                data-ocid="admin.services.input"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              data-ocid="admin.services.cancel_button"
            >
              Cancel
            </Button>
            <Button
              className="btn-accent"
              onClick={handleSave}
              disabled={isPending}
              data-ocid="admin.services.save_button"
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
