import { SiWhatsapp } from "react-icons/si";

const WA_NUMBER = "2540112096201";
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi Nimo's Beauty Loft, I'd like to book an appointment")}`;

export default function FloatingWhatsApp() {
  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-wa"
      aria-label="Chat on WhatsApp"
      data-ocid="whatsapp.button"
    >
      <SiWhatsapp size={26} color="white" />
    </a>
  );
}
