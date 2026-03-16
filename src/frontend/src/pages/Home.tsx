import About from "../components/About";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Gallery from "../components/Gallery";
import Hero from "../components/Hero";
import InstagramSection from "../components/InstagramSection";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
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
