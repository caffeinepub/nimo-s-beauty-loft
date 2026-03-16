import CartDrawer from "../components/CartDrawer";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Gallery from "../components/Gallery";
import Hero from "../components/Hero";
import InstagramSection from "../components/InstagramSection";
import Navbar from "../components/Navbar";
import Philosophy from "../components/Philosophy";
import Products from "../components/Products";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <CartDrawer />
      <main>
        <Hero />
        <Philosophy />
        <Services />
        <Products />
        <Gallery />
        <Testimonials />
        <InstagramSection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
