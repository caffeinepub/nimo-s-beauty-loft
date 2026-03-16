# Nimo's Beauty Loft

## Current State
New project — no existing code.

## Requested Changes (Diff)

### Add
- Full beauty salon website with 7 public sections: Home, About, Services, Products, Gallery, Testimonials, Contact
- Admin/CMS panel (login-protected) to manage: products (wigs + jewellery), services, gallery images, testimonials
- WhatsApp floating action button visible across all pages
- Smooth scrolling single-page navigation
- Mobile-first responsive design

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan

### Backend (Motoko)
- `Product` type: id, name, description, price (Nat — KES), category (GluelessWig | HeadbandWig | Jewellery), imageUrl, whatsappLink, isAvailable
- `Service` type: id, name, description, price (optional), iconName
- `GalleryImage` type: id, imageUrl, caption
- `Testimonial` type: id, clientName, review, rating (1–5), avatarUrl
- CRUD operations for all four types
- Authorization: admin-only write operations, public read
- Blob storage for gallery and product images

### Frontend Pages/Sections
1. **Home** — Hero with tagline, Book Appointment (WhatsApp) + Shop Wigs CTAs
2. **About** — Salon story, values, founder info
3. **Services** — 4 service cards: Lash Installation, Nail Services, Eyebrow Shaping, General Beauty
4. **Products** — Tabbed catalog: Glueless Wigs / Headband Wigs / Jewellery; prices in KES; Buy Now → WhatsApp
5. **Gallery** — Masonry photo grid, images from blob storage or placeholder
6. **Testimonials** — Star-rated client review cards
7. **Instagram** — Placeholder feed grid linking to Instagram profile
8. **Contact** — WhatsApp link, Instagram link, contact form
9. **Admin Panel** — Protected route; CRUD UI for products, services, gallery, testimonials; image upload via blob storage

### Design Tokens
- Lilac: #C8A2C8 (primary)
- Nude/Cream: #F5E6DC (background)
- Rose Gold: #B76E79 (accent/CTA)
- Fonts: cursive for "Nimo's", clean sans-serif for body
