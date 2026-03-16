import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Category,
  type GalleryImage,
  type Product,
  type Service,
  type SiteSettings,
  type Testimonial,
  UserRole,
} from "../backend.d";
import { useActor } from "./useActor";

export function useSiteSettings() {
  const { actor, isFetching } = useActor();
  return useQuery<SiteSettings | null>({
    queryKey: ["siteSettings"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getSiteSettings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useProductsByCategory(category: Category) {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products", category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProductsByCategory(category);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useServices() {
  const { actor, isFetching } = useActor();
  return useQuery<Service[]>({
    queryKey: ["services"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getServices();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGalleryImages() {
  const { actor, isFetching } = useActor();
  return useQuery<GalleryImage[]>({
    queryKey: ["galleryImages"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getGalleryImages();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useTestimonials() {
  const { actor, isFetching } = useActor();
  return useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTestimonials();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCallerRole() {
  const { actor, isFetching } = useActor();
  return useQuery<UserRole>({
    queryKey: ["callerRole"],
    queryFn: async () => {
      if (!actor) return UserRole.guest;
      return actor.getCallerUserRole();
    },
    enabled: !!actor && !isFetching,
  });
}

// --- Mutations ---

export function useCreateProduct() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (p: {
      name: string;
      description: string;
      priceKES: bigint;
      category: Category;
      imageUrl: string;
      isAvailable: boolean;
    }) =>
      actor!.createProduct(
        p.name,
        p.description,
        p.priceKES,
        p.category,
        p.imageUrl,
        p.isAvailable,
      ),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useUpdateProduct() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (p: {
      id: bigint;
      name: string;
      description: string;
      priceKES: bigint;
      category: Category;
      imageUrl: string;
      isAvailable: boolean;
    }) =>
      actor!.updateProduct(
        p.id,
        p.name,
        p.description,
        p.priceKES,
        p.category,
        p.imageUrl,
        p.isAvailable,
      ),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useDeleteProduct() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: bigint) => actor!.deleteProduct(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useCreateService() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (s: {
      name: string;
      description: string;
      priceFrom: string | null;
      iconName: string;
      displayOrder: bigint;
    }) =>
      actor!.createService(
        s.name,
        s.description,
        s.priceFrom,
        s.iconName,
        s.displayOrder,
      ),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["services"] }),
  });
}

export function useUpdateService() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (s: {
      id: bigint;
      name: string;
      description: string;
      priceFrom: string | null;
      iconName: string;
      displayOrder: bigint;
    }) =>
      actor!.updateService(
        s.id,
        s.name,
        s.description,
        s.priceFrom,
        s.iconName,
        s.displayOrder,
      ),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["services"] }),
  });
}

export function useDeleteService() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: bigint) => actor!.deleteService(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["services"] }),
  });
}

export function useCreateGalleryImage() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (g: {
      imageUrl: string;
      caption: string;
      displayOrder: bigint;
    }) => actor!.createGalleryImage(g.imageUrl, g.caption, g.displayOrder),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["galleryImages"] }),
  });
}

export function useDeleteGalleryImage() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: bigint) => actor!.deleteGalleryImage(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["galleryImages"] }),
  });
}

export function useCreateTestimonial() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (t: {
      clientName: string;
      review: string;
      rating: bigint;
      avatarInitials: string;
    }) =>
      actor!.createTestimonial(
        t.clientName,
        t.review,
        t.rating,
        t.avatarInitials,
      ),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["testimonials"] }),
  });
}

export function useDeleteTestimonial() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: bigint) => actor!.deleteTestimonial(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["testimonials"] }),
  });
}

export function useUpdateSiteSettings() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (s: {
      whatsappNumber: string;
      instagramHandle: string;
      heroTagline: string;
      aboutText: string;
      instagramPosts: bigint;
      instagramFollowers: bigint;
      instagramFollowing: bigint;
    }) =>
      actor!.updateSiteSettings(
        s.whatsappNumber,
        s.instagramHandle,
        s.heroTagline,
        s.aboutText,
        s.instagramPosts,
        s.instagramFollowers,
        s.instagramFollowing,
      ),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["siteSettings"] }),
  });
}

export { Category };
