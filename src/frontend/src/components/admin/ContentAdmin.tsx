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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Plus, Save, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  useCreateGalleryImage,
  useCreateTestimonial,
  useDeleteGalleryImage,
  useDeleteTestimonial,
  useGalleryImages,
  useSiteSettings,
  useTestimonials,
  useUpdateSiteSettings,
} from "../../hooks/useQueries";

function GalleryAdmin() {
  const { data: images = [], isLoading } = useGalleryImages();
  const createMutation = useCreateGalleryImage();
  const deleteMutation = useDeleteGalleryImage();
  const [form, setForm] = useState({
    imageUrl: "",
    caption: "",
    displayOrder: "0",
  });

  const handleAdd = async () => {
    if (!form.imageUrl) return;
    try {
      await createMutation.mutateAsync({
        imageUrl: form.imageUrl,
        caption: form.caption,
        displayOrder: BigInt(Number(form.displayOrder) || 0),
      });
      toast.success("Image added!");
      setForm({ imageUrl: "", caption: "", displayOrder: "0" });
    } catch {
      toast.error("Failed to add image.");
    }
  };

  const handleDelete = async (id: bigint) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Image deleted.");
    } catch {
      toast.error("Failed to delete image.");
    }
  };

  return (
    <div>
      <h2 className="font-playfair text-xl font-semibold text-foreground mb-6">
        Gallery
      </h2>
      <div className="bg-white rounded-xl p-5 shadow-xs mb-6 space-y-3">
        <h3 className="text-sm font-semibold text-foreground">Add New Image</h3>
        <div className="grid sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2 space-y-1.5">
            <Label>Image URL</Label>
            <Input
              value={form.imageUrl}
              onChange={(e) =>
                setForm((p) => ({ ...p, imageUrl: e.target.value }))
              }
              placeholder="https://..."
              data-ocid="admin.gallery.input"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Order</Label>
            <Input
              type="number"
              value={form.displayOrder}
              onChange={(e) =>
                setForm((p) => ({ ...p, displayOrder: e.target.value }))
              }
              data-ocid="admin.gallery.input"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label>Caption</Label>
          <Input
            value={form.caption}
            onChange={(e) =>
              setForm((p) => ({ ...p, caption: e.target.value }))
            }
            placeholder="Image caption"
            data-ocid="admin.gallery.input"
          />
        </div>
        <Button
          className="btn-accent rounded-full gap-2"
          onClick={handleAdd}
          disabled={createMutation.isPending}
          data-ocid="admin.gallery.primary_button"
        >
          {createMutation.isPending ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Plus size={14} />
          )}{" "}
          Add Image
        </Button>
      </div>

      {isLoading ? (
        <div
          className="flex justify-center py-8"
          data-ocid="admin.gallery.loading_state"
        >
          <Loader2 className="animate-spin text-primary" size={24} />
        </div>
      ) : images.length === 0 ? (
        <div
          className="text-center py-8 text-muted-foreground"
          data-ocid="admin.gallery.empty_state"
        >
          No gallery images yet.
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {images.map((img, idx) => (
            <div
              key={img.id.toString()}
              className="relative group rounded-xl overflow-hidden"
              data-ocid={`admin.gallery.item.${idx + 1}`}
            >
              <img
                src={img.imageUrl}
                alt={img.caption}
                className="w-full aspect-square object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button
                      type="button"
                      className="p-2 rounded-full bg-white/20 text-white"
                      data-ocid={`admin.gallery.delete_button.${idx + 1}`}
                    >
                      <Trash2 size={15} />
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent data-ocid="admin.gallery.dialog">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Image?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently remove this image from the
                        gallery.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel data-ocid="admin.gallery.cancel_button">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(img.id)}
                        data-ocid="admin.gallery.confirm_button"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TestimonialsAdmin() {
  const { data: testimonials = [], isLoading } = useTestimonials();
  const createMutation = useCreateTestimonial();
  const deleteMutation = useDeleteTestimonial();
  const [form, setForm] = useState({
    clientName: "",
    review: "",
    rating: "5",
    avatarInitials: "",
  });

  const handleAdd = async () => {
    if (!form.clientName || !form.review) return;
    try {
      await createMutation.mutateAsync({
        clientName: form.clientName,
        review: form.review,
        rating: BigInt(Number(form.rating)),
        avatarInitials:
          form.avatarInitials ||
          form.clientName
            .split(" ")
            .map((w) => w[0])
            .join("")
            .toUpperCase(),
      });
      toast.success("Testimonial added!");
      setForm({ clientName: "", review: "", rating: "5", avatarInitials: "" });
    } catch {
      toast.error("Failed to add testimonial.");
    }
  };

  const handleDelete = async (id: bigint) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Testimonial deleted.");
    } catch {
      toast.error("Failed to delete testimonial.");
    }
  };

  return (
    <div>
      <h2 className="font-playfair text-xl font-semibold text-foreground mb-6">
        Testimonials
      </h2>
      <div className="bg-white rounded-xl p-5 shadow-xs mb-6 space-y-3">
        <h3 className="text-sm font-semibold text-foreground">
          Add Testimonial
        </h3>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label>Client Name</Label>
            <Input
              value={form.clientName}
              onChange={(e) =>
                setForm((p) => ({ ...p, clientName: e.target.value }))
              }
              placeholder="Jane Doe"
              data-ocid="admin.testimonials.input"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Rating</Label>
            <Select
              value={form.rating}
              onValueChange={(v) => setForm((p) => ({ ...p, rating: v }))}
            >
              <SelectTrigger data-ocid="admin.testimonials.select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[5, 4, 3, 2, 1].map((r) => (
                  <SelectItem key={r} value={r.toString()}>
                    {"★".repeat(r)} ({r})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-1.5">
          <Label>Review</Label>
          <Textarea
            value={form.review}
            onChange={(e) => setForm((p) => ({ ...p, review: e.target.value }))}
            rows={3}
            placeholder="Client's review..."
            data-ocid="admin.testimonials.textarea"
          />
        </div>
        <Button
          className="btn-accent rounded-full gap-2"
          onClick={handleAdd}
          disabled={createMutation.isPending}
          data-ocid="admin.testimonials.primary_button"
        >
          {createMutation.isPending ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Plus size={14} />
          )}{" "}
          Add Testimonial
        </Button>
      </div>

      {isLoading ? (
        <div
          className="flex justify-center py-8"
          data-ocid="admin.testimonials.loading_state"
        >
          <Loader2 className="animate-spin text-primary" size={24} />
        </div>
      ) : testimonials.length === 0 ? (
        <div
          className="text-center py-8 text-muted-foreground"
          data-ocid="admin.testimonials.empty_state"
        >
          No testimonials yet.
        </div>
      ) : (
        <div className="grid gap-3">
          {testimonials.map((t, idx) => (
            <div
              key={t.id.toString()}
              className="flex items-start gap-4 bg-white rounded-xl p-4 shadow-xs"
              data-ocid={`admin.testimonials.item.${idx + 1}`}
            >
              <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-primary">
                  {t.avatarInitials}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground text-sm">
                  {t.clientName} {"★".repeat(Number(t.rating))}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                  {t.review}
                </p>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-destructive flex-shrink-0"
                    data-ocid={`admin.testimonials.delete_button.${idx + 1}`}
                  >
                    <Trash2 size={15} />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent data-ocid="admin.testimonials.dialog">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Testimonial?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently remove this testimonial.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel data-ocid="admin.testimonials.cancel_button">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(t.id)}
                      data-ocid="admin.testimonials.confirm_button"
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
    </div>
  );
}

function SiteSettingsAdmin() {
  const { data: settings } = useSiteSettings();
  const updateMutation = useUpdateSiteSettings();
  const [form, setForm] = useState({
    whatsappNumber: "+254700000000",
    instagramHandle: "nimosbeautyloft",
    heroTagline: "Where Beauty Meets Luxury",
    aboutText: "",
    instagramPosts: "0",
    instagramFollowers: "0",
    instagramFollowing: "0",
  });
  const [initialized, setInitialized] = useState(false);

  if (settings && !initialized) {
    setInitialized(true);
    setForm({
      whatsappNumber: settings.whatsappNumber,
      instagramHandle: settings.instagramHandle,
      heroTagline: settings.heroTagline,
      aboutText: settings.aboutText,
      instagramPosts: settings.instagramPosts?.toString() ?? "0",
      instagramFollowers: settings.instagramFollowers?.toString() ?? "0",
      instagramFollowing: settings.instagramFollowing?.toString() ?? "0",
    });
  }

  const handleSave = async () => {
    try {
      await updateMutation.mutateAsync({
        ...form,
        instagramPosts: BigInt(Number(form.instagramPosts) || 0),
        instagramFollowers: BigInt(Number(form.instagramFollowers) || 0),
        instagramFollowing: BigInt(Number(form.instagramFollowing) || 0),
      });
      toast.success("Settings saved!");
    } catch {
      toast.error("Failed to save settings.");
    }
  };

  return (
    <div>
      <h2 className="font-playfair text-xl font-semibold text-foreground mb-6">
        Site Settings
      </h2>
      <div className="bg-white rounded-xl p-6 shadow-xs space-y-5 max-w-lg">
        <div className="space-y-1.5">
          <Label>WhatsApp Number</Label>
          <Input
            value={form.whatsappNumber}
            onChange={(e) =>
              setForm((p) => ({ ...p, whatsappNumber: e.target.value }))
            }
            placeholder="+254700000000"
            data-ocid="admin.settings.input"
          />
        </div>
        <div className="space-y-1.5">
          <Label>Instagram Handle</Label>
          <Input
            value={form.instagramHandle}
            onChange={(e) =>
              setForm((p) => ({ ...p, instagramHandle: e.target.value }))
            }
            placeholder="nimosbeautyloft"
            data-ocid="admin.settings.input"
          />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-1.5">
            <Label>Posts</Label>
            <Input
              type="number"
              min="0"
              value={form.instagramPosts}
              onChange={(e) =>
                setForm((p) => ({ ...p, instagramPosts: e.target.value }))
              }
              placeholder="0"
              data-ocid="admin.settings.input"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Followers</Label>
            <Input
              type="number"
              min="0"
              value={form.instagramFollowers}
              onChange={(e) =>
                setForm((p) => ({ ...p, instagramFollowers: e.target.value }))
              }
              placeholder="0"
              data-ocid="admin.settings.input"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Following</Label>
            <Input
              type="number"
              min="0"
              value={form.instagramFollowing}
              onChange={(e) =>
                setForm((p) => ({ ...p, instagramFollowing: e.target.value }))
              }
              placeholder="0"
              data-ocid="admin.settings.input"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label>Hero Tagline</Label>
          <Input
            value={form.heroTagline}
            onChange={(e) =>
              setForm((p) => ({ ...p, heroTagline: e.target.value }))
            }
            placeholder="Where Beauty Meets Luxury"
            data-ocid="admin.settings.input"
          />
        </div>
        <div className="space-y-1.5">
          <Label>About Text</Label>
          <Textarea
            value={form.aboutText}
            onChange={(e) =>
              setForm((p) => ({ ...p, aboutText: e.target.value }))
            }
            rows={6}
            data-ocid="admin.settings.textarea"
          />
        </div>
        <Button
          className="btn-accent rounded-full gap-2 w-full"
          onClick={handleSave}
          disabled={updateMutation.isPending}
          data-ocid="admin.settings.save_button"
        >
          {updateMutation.isPending ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Save size={14} />
          )}{" "}
          Save Settings
        </Button>
      </div>
    </div>
  );
}

export default function ContentAdmin() {
  return (
    <Tabs defaultValue="gallery" className="w-full">
      <TabsList className="mb-6 bg-muted rounded-full p-1">
        <TabsTrigger
          value="gallery"
          className="rounded-full"
          data-ocid="admin.content.tab"
        >
          Gallery
        </TabsTrigger>
        <TabsTrigger
          value="testimonials"
          className="rounded-full"
          data-ocid="admin.content.tab"
        >
          Testimonials
        </TabsTrigger>
        <TabsTrigger
          value="settings"
          className="rounded-full"
          data-ocid="admin.content.tab"
        >
          Site Settings
        </TabsTrigger>
      </TabsList>
      <TabsContent value="gallery">
        <GalleryAdmin />
      </TabsContent>
      <TabsContent value="testimonials">
        <TestimonialsAdmin />
      </TabsContent>
      <TabsContent value="settings">
        <SiteSettingsAdmin />
      </TabsContent>
    </Tabs>
  );
}
