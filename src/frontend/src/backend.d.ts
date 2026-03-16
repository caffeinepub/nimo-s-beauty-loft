import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type ServiceId = bigint;
export interface UserProfile {
    name: string;
}
export interface Testimonial {
    id: TestimonialId;
    review: string;
    clientName: string;
    avatarInitials: string;
    rating: bigint;
}
export interface Service {
    id: ServiceId;
    displayOrder: bigint;
    name: string;
    description: string;
    iconName: string;
    priceFrom?: string;
}
export interface SiteSettings {
    instagramHandle: string;
    instagramPosts: bigint;
    instagramFollowers: bigint;
    instagramFollowing: bigint;
    whatsappNumber: string;
    aboutText: string;
    heroTagline: string;
}
export type GalleryImageId = bigint;
export interface GalleryImage {
    id: GalleryImageId;
    displayOrder: bigint;
    imageUrl: string;
    caption: string;
}
export type ProductId = bigint;
export type TestimonialId = bigint;
export interface Product {
    id: ProductId;
    name: string;
    isAvailable: boolean;
    description: string;
    imageUrl: string;
    category: Category;
    priceKES: bigint;
}
export enum Category {
    jewellery = "jewellery",
    gluelessWig = "gluelessWig",
    headbandWig = "headbandWig"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createGalleryImage(imageUrl: string, caption: string, displayOrder: bigint): Promise<GalleryImageId>;
    createProduct(name: string, description: string, priceKES: bigint, category: Category, imageUrl: string, isAvailable: boolean): Promise<ProductId>;
    createService(name: string, description: string, priceFrom: string | null, iconName: string, displayOrder: bigint): Promise<ServiceId>;
    createTestimonial(clientName: string, review: string, rating: bigint, avatarInitials: string): Promise<TestimonialId>;
    deleteGalleryImage(id: GalleryImageId): Promise<void>;
    deleteProduct(id: ProductId): Promise<void>;
    deleteService(id: ServiceId): Promise<void>;
    deleteTestimonial(id: TestimonialId): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getGalleryImages(): Promise<Array<GalleryImage>>;
    getProducts(): Promise<Array<Product>>;
    getProductsByCategory(category: Category): Promise<Array<Product>>;
    getServices(): Promise<Array<Service>>;
    getSiteSettings(): Promise<SiteSettings | null>;
    getTestimonials(): Promise<Array<Testimonial>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateGalleryImage(id: GalleryImageId, imageUrl: string, caption: string, displayOrder: bigint): Promise<void>;
    updateProduct(id: ProductId, name: string, description: string, priceKES: bigint, category: Category, imageUrl: string, isAvailable: boolean): Promise<void>;
    updateService(id: ServiceId, name: string, description: string, priceFrom: string | null, iconName: string, displayOrder: bigint): Promise<void>;
    updateSiteSettings(whatsappNumber: string, instagramHandle: string, heroTagline: string, aboutText: string, instagramPosts: bigint, instagramFollowers: bigint, instagramFollowing: bigint): Promise<void>;
    updateTestimonial(id: TestimonialId, clientName: string, review: string, rating: bigint, avatarInitials: string): Promise<void>;
}
