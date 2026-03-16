import Array "mo:core/Array";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";

actor {
  type ProductId = Nat;
  type ServiceId = Nat;
  type GalleryImageId = Nat;
  type TestimonialId = Nat;

  module Product {
    public func compare(p1 : Product, p2 : Product) : Order.Order {
      Nat.compare(p1.id, p2.id);
    };
  };

  module Service {
    public func compareByDisplayOrder(s1 : Service, s2 : Service) : Order.Order {
      Nat.compare(s1.displayOrder, s2.displayOrder);
    };
  };

  module GalleryImage {
    public func compareByDisplayOrder(i1 : GalleryImage, i2 : GalleryImage) : Order.Order {
      Nat.compare(i1.displayOrder, i2.displayOrder);
    };
  };

  module Testimonial {
    public func compare(t1 : Testimonial, t2 : Testimonial) : Order.Order {
      Nat.compare(t1.id, t2.id);
    };
  };

  public type Product = {
    id : ProductId;
    name : Text;
    description : Text;
    priceKES : Nat;
    category : Category;
    imageUrl : Text;
    isAvailable : Bool;
  };

  public type Category = {
    #gluelessWig;
    #headbandWig;
    #jewellery;
  };

  public type Service = {
    id : ServiceId;
    name : Text;
    description : Text;
    priceFrom : ?Text;
    iconName : Text;
    displayOrder : Nat;
  };

  public type GalleryImage = {
    id : GalleryImageId;
    imageUrl : Text;
    caption : Text;
    displayOrder : Nat;
  };

  public type Testimonial = {
    id : TestimonialId;
    clientName : Text;
    review : Text;
    rating : Nat;
    avatarInitials : Text;
  };

  // Legacy type - same shape as originally deployed; used for stable upgrade migration
  type SiteSettingsLegacy = {
    whatsappNumber : Text;
    instagramHandle : Text;
    heroTagline : Text;
    aboutText : Text;
  };

  public type SiteSettings = {
    whatsappNumber : Text;
    instagramHandle : Text;
    instagramPosts : Nat;
    instagramFollowers : Nat;
    instagramFollowing : Nat;
    heroTagline : Text;
    aboutText : Text;
  };

  public type UserProfile = {
    name : Text;
  };

  var nextProductId = 0;
  var nextServiceId = 0;
  var nextGalleryImageId = 0;
  var nextTestimonialId = 0;

  let products = Map.empty<ProductId, Product>();
  let services = Map.empty<ServiceId, Service>();
  let galleryImages = Map.empty<GalleryImageId, GalleryImage>();
  let testimonials = Map.empty<TestimonialId, Testimonial>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Keep old stable variable name/type so Motoko can load existing data on upgrade
  var siteSettings : ?SiteSettingsLegacy = null;
  // New variable for extended SiteSettings
  var siteSettingsV2 : ?SiteSettings = null;

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  include MixinStorage();

  // User Profile Functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Product Functions
  public shared ({ caller }) func createProduct(name : Text, description : Text, priceKES : Nat, category : Category, imageUrl : Text, isAvailable : Bool) : async ProductId {
    assertAccessControlAdmin(caller);
    let productId = nextProductId;
    let product : Product = {
      id = productId;
      name;
      description;
      priceKES;
      category;
      imageUrl;
      isAvailable;
    };
    products.add(productId, product);
    nextProductId += 1;
    productId;
  };

  public shared ({ caller }) func updateProduct(id : ProductId, name : Text, description : Text, priceKES : Nat, category : Category, imageUrl : Text, isAvailable : Bool) : async () {
    assertAccessControlAdmin(caller);
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?_) {
        let updatedProduct : Product = {
          id;
          name;
          description;
          priceKES;
          category;
          imageUrl;
          isAvailable;
        };
        products.add(id, updatedProduct);
      };
    };
  };

  public shared ({ caller }) func deleteProduct(id : ProductId) : async () {
    assertAccessControlAdmin(caller);
    if (not products.containsKey(id)) {
      Runtime.trap("Product not found");
    };
    products.remove(id);
  };

  public query ({ caller }) func getProducts() : async [Product] {
    products.values().toArray().sort();
  };

  public query ({ caller }) func getProductsByCategory(category : Category) : async [Product] {
    products.values().toArray().sort().filter(
      func(p) {
        p.category == category;
      }
    );
  };

  // Service Functions
  public shared ({ caller }) func createService(name : Text, description : Text, priceFrom : ?Text, iconName : Text, displayOrder : Nat) : async ServiceId {
    assertAccessControlAdmin(caller);
    let serviceId = nextServiceId;
    let service : Service = {
      id = serviceId;
      name;
      description;
      priceFrom;
      iconName;
      displayOrder;
    };
    services.add(serviceId, service);
    nextServiceId += 1;
    serviceId;
  };

  public shared ({ caller }) func updateService(id : ServiceId, name : Text, description : Text, priceFrom : ?Text, iconName : Text, displayOrder : Nat) : async () {
    assertAccessControlAdmin(caller);
    switch (services.get(id)) {
      case (null) { Runtime.trap("Service not found") };
      case (?_) {
        let updatedService : Service = {
          id;
          name;
          description;
          priceFrom;
          iconName;
          displayOrder;
        };
        services.add(id, updatedService);
      };
    };
  };

  public shared ({ caller }) func deleteService(id : ServiceId) : async () {
    assertAccessControlAdmin(caller);
    if (not services.containsKey(id)) {
      Runtime.trap("Service not found");
    };
    services.remove(id);
  };

  public query ({ caller }) func getServices() : async [Service] {
    services.values().toArray().sort(Service.compareByDisplayOrder);
  };

  // Gallery Image Functions
  public shared ({ caller }) func createGalleryImage(imageUrl : Text, caption : Text, displayOrder : Nat) : async GalleryImageId {
    assertAccessControlAdmin(caller);
    let imageId = nextGalleryImageId;
    let image : GalleryImage = {
      id = imageId;
      imageUrl;
      caption;
      displayOrder;
    };
    galleryImages.add(imageId, image);
    nextGalleryImageId += 1;
    imageId;
  };

  public shared ({ caller }) func updateGalleryImage(id : GalleryImageId, imageUrl : Text, caption : Text, displayOrder : Nat) : async () {
    assertAccessControlAdmin(caller);
    switch (galleryImages.get(id)) {
      case (null) { Runtime.trap("Gallery image not found") };
      case (?_) {
        let updatedImage : GalleryImage = {
          id;
          imageUrl;
          caption;
          displayOrder;
        };
        galleryImages.add(id, updatedImage);
      };
    };
  };

  public shared ({ caller }) func deleteGalleryImage(id : GalleryImageId) : async () {
    assertAccessControlAdmin(caller);
    if (not galleryImages.containsKey(id)) {
      Runtime.trap("Gallery image not found");
    };
    galleryImages.remove(id);
  };

  public query ({ caller }) func getGalleryImages() : async [GalleryImage] {
    galleryImages.values().toArray().sort(GalleryImage.compareByDisplayOrder);
  };

  // Testimonial Functions
  public shared ({ caller }) func createTestimonial(clientName : Text, review : Text, rating : Nat, avatarInitials : Text) : async TestimonialId {
    assertAccessControlAdmin(caller);
    if (rating < 1 or rating > 5) {
      Runtime.trap("Rating must be between 1 and 5");
    };
    let testimonialId = nextTestimonialId;
    let testimonial : Testimonial = {
      id = testimonialId;
      clientName;
      review;
      rating;
      avatarInitials;
    };
    testimonials.add(testimonialId, testimonial);
    nextTestimonialId += 1;
    testimonialId;
  };

  public shared ({ caller }) func updateTestimonial(id : TestimonialId, clientName : Text, review : Text, rating : Nat, avatarInitials : Text) : async () {
    assertAccessControlAdmin(caller);
    if (rating < 1 or rating > 5) {
      Runtime.trap("Rating must be between 1 and 5");
    };
    switch (testimonials.get(id)) {
      case (null) { Runtime.trap("Testimonial not found") };
      case (?_) {
        let updatedTestimonial : Testimonial = {
          id;
          clientName;
          review;
          rating;
          avatarInitials;
        };
        testimonials.add(id, updatedTestimonial);
      };
    };
  };

  public shared ({ caller }) func deleteTestimonial(id : TestimonialId) : async () {
    assertAccessControlAdmin(caller);
    if (not testimonials.containsKey(id)) {
      Runtime.trap("Testimonial not found");
    };
    testimonials.remove(id);
  };

  public query ({ caller }) func getTestimonials() : async [Testimonial] {
    testimonials.values().toArray().sort();
  };

  // Site Settings Functions
  public shared ({ caller }) func updateSiteSettings(whatsappNumber : Text, instagramHandle : Text, heroTagline : Text, aboutText : Text, instagramPosts : Nat, instagramFollowers : Nat, instagramFollowing : Nat) : async () {
    assertAccessControlAdmin(caller);
    siteSettingsV2 := ?{
      whatsappNumber;
      instagramHandle;
      instagramPosts;
      instagramFollowers;
      instagramFollowing;
      heroTagline;
      aboutText;
    };
  };

  public query ({ caller }) func getSiteSettings() : async ?SiteSettings {
    siteSettingsV2;
  };

  // Helper Functions
  func assertAccessControlAdmin(caller : Principal) {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("NotPermitted: Caller must have admin privileges. Access denied for principal " # caller.toText());
    };
  };
  system func postupgrade() {
    // Migrate legacy siteSettings to siteSettingsV2 (adds instagram stats defaulting to 0)
    switch (siteSettings) {
      case (?legacy) {
        if (siteSettingsV2 == null) {
          siteSettingsV2 := ?{
            whatsappNumber = legacy.whatsappNumber;
            instagramHandle = legacy.instagramHandle;
            instagramPosts = 0;
            instagramFollowers = 0;
            instagramFollowing = 0;
            heroTagline = legacy.heroTagline;
            aboutText = legacy.aboutText;
          };
        };
        siteSettings := null;
      };
      case null {};
    };
  };

};
