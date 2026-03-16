import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import { Check, ChevronRight, MessageCircle, ShoppingBag } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useCart } from "../context/CartContext";

const STEPS = ["Review Cart", "Your Details", "Confirmation"];

interface OrderDetails {
  name: string;
  phone: string;
  address: string;
}

function buildWhatsAppMessage(
  items: { name: string; quantity: number }[],
  details: OrderDetails,
) {
  const itemsList = items.map((i) => `• ${i.name} x${i.quantity}`).join("\n");
  const msg = `Hello Nimo's Beauty Loft! 🌸\n\nI'd like to place an order:\n\n${itemsList}\n\n👤 Name: ${details.name}\n📞 Phone: ${details.phone}\n📍 Delivery Address: ${details.address}\n\nKindly confirm availability and pricing. Thank you!`;
  return `https://wa.me/254112096201?text=${encodeURIComponent(msg)}`;
}

function saveOrder(
  details: OrderDetails,
  items: { name: string; quantity: number }[],
) {
  const orders = JSON.parse(localStorage.getItem("nimo_orders") ?? "[]");
  orders.push({
    id: Date.now(),
    name: details.name,
    phone: details.phone,
    address: details.address,
    items,
    status: "Pending",
    createdAt: new Date().toISOString(),
  });
  localStorage.setItem("nimo_orders", JSON.stringify(orders));
}

export default function Checkout() {
  const { items, clearCart } = useCart();
  const [step, setStep] = useState(0);
  const [details, setDetails] = useState<OrderDetails>({
    name: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState<Partial<OrderDetails>>({});

  const validate = () => {
    const e: Partial<OrderDetails> = {};
    if (!details.name.trim()) e.name = "Please enter your full name";
    if (!details.phone.trim()) e.phone = "Please enter your phone number";
    if (!details.address.trim())
      e.address = "Please enter your delivery address";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validate()) return;
    saveOrder(
      details,
      items.map((i) => ({ name: i.name, quantity: i.quantity })),
    );
    clearCart();
    setStep(2);
  };

  return (
    <div className="min-h-screen hero-bg">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-border sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-baseline gap-1.5">
            <span className="font-parisienne text-2xl text-primary">
              Nimo's
            </span>
            <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
              Beauty Loft
            </span>
          </Link>
          <span className="text-sm text-muted-foreground font-medium">
            Checkout
          </span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-10">
        {/* Step indicators */}
        {step < 2 && (
          <div className="flex items-center justify-center mb-10 gap-0">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center">
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      i < step
                        ? "bg-accent text-white"
                        : i === step
                          ? "bg-primary text-white"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {i < step ? <Check size={14} /> : i + 1}
                  </div>
                  <span
                    className={`text-xs font-medium whitespace-nowrap ${
                      i === step ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {s}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`h-0.5 w-14 sm:w-20 mx-2 mb-5 transition-all ${
                      i < step ? "bg-accent" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-3xl p-6 shadow-lilac">
                <h2 className="font-playfair text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <ShoppingBag size={22} className="text-accent" />
                  Review Your Cart
                </h2>
                {items.length === 0 ? (
                  <div
                    className="text-center py-12"
                    data-ocid="checkout.empty_state"
                  >
                    <p className="text-muted-foreground mb-4">
                      Your cart is empty.
                    </p>
                    <Link to="/">
                      <Button variant="outline" className="rounded-full">
                        Browse Products
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {items.map((item, idx) => (
                        <div
                          key={item.id}
                          className="flex gap-3 items-center"
                          data-ocid={`checkout.item.${idx + 1}`}
                        >
                          <div className="w-14 h-14 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm text-foreground truncate">
                              {item.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {item.category}
                            </p>
                          </div>
                          <span className="text-sm font-bold text-foreground">
                            ×{item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                    <Separator className="mb-6" />
                    <div className="flex justify-between text-sm mb-6">
                      <span className="text-muted-foreground">Total</span>
                      <span className="font-semibold italic">
                        Price on order
                      </span>
                    </div>
                    <Button
                      className="btn-accent w-full rounded-full py-5 text-base"
                      onClick={() => setStep(1)}
                      data-ocid="checkout.continue_button"
                    >
                      Continue <ChevronRight size={16} />
                    </Button>
                  </>
                )}
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-3xl p-6 shadow-lilac">
                <h2 className="font-playfair text-2xl font-bold text-foreground mb-6">
                  Your Details
                </h2>
                <div className="space-y-5">
                  <div>
                    <Label
                      htmlFor="name"
                      className="text-sm font-semibold mb-1.5 block"
                    >
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      value={details.name}
                      onChange={(e) =>
                        setDetails((d) => ({ ...d, name: e.target.value }))
                      }
                      placeholder="e.g. Grace Wanjiru"
                      className="rounded-xl"
                      data-ocid="checkout.input"
                    />
                    {errors.name && (
                      <p
                        className="text-xs text-destructive mt-1"
                        data-ocid="checkout.error_state"
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label
                      htmlFor="phone"
                      className="text-sm font-semibold mb-1.5 block"
                    >
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={details.phone}
                      onChange={(e) =>
                        setDetails((d) => ({ ...d, phone: e.target.value }))
                      }
                      placeholder="e.g. 0712 345 678"
                      className="rounded-xl"
                      data-ocid="checkout.input"
                    />
                    {errors.phone && (
                      <p
                        className="text-xs text-destructive mt-1"
                        data-ocid="checkout.error_state"
                      >
                        {errors.phone}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label
                      htmlFor="address"
                      className="text-sm font-semibold mb-1.5 block"
                    >
                      Delivery Address *
                    </Label>
                    <Input
                      id="address"
                      value={details.address}
                      onChange={(e) =>
                        setDetails((d) => ({ ...d, address: e.target.value }))
                      }
                      placeholder="e.g. Murang'a Town, near KCB"
                      className="rounded-xl"
                      data-ocid="checkout.input"
                    />
                    {errors.address && (
                      <p
                        className="text-xs text-destructive mt-1"
                        data-ocid="checkout.error_state"
                      >
                        {errors.address}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-8 flex gap-3">
                  <Button
                    variant="outline"
                    className="rounded-full flex-1"
                    onClick={() => setStep(0)}
                    data-ocid="checkout.cancel_button"
                  >
                    Back
                  </Button>
                  <Button
                    className="btn-accent rounded-full flex-1 py-5 text-base"
                    onClick={handlePlaceOrder}
                    data-ocid="checkout.submit_button"
                  >
                    Place Order 🎉
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, type: "spring" }}
            >
              <div
                className="bg-white rounded-3xl p-8 shadow-lilac text-center"
                data-ocid="checkout.success_state"
              >
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <Check size={36} className="text-green-600" />
                </div>
                <h2 className="font-playfair text-3xl font-bold text-foreground mb-3">
                  Order Received! 🎉
                </h2>
                <p className="text-muted-foreground mb-2 leading-relaxed">
                  Thank you
                  {details.name ? ` ${details.name.split(" ")[0]}` : ""}! We'll
                  contact you on{" "}
                  <span className="font-semibold text-foreground">
                    {details.phone}
                  </span>{" "}
                  to confirm your order and arrange delivery in Murang'a.
                </p>
                <p className="text-sm text-muted-foreground mb-8 italic">
                  You ask, we deliver. 💕
                </p>
                <div className="flex flex-col gap-3">
                  <a
                    href={buildWhatsAppMessage(
                      items.length > 0
                        ? items.map((i) => ({
                            name: i.name,
                            quantity: i.quantity,
                          }))
                        : (JSON.parse(
                            localStorage.getItem("nimo_orders") ?? "[]",
                          ).slice(-1)[0]?.items ?? []),
                      details,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid="checkout.whatsapp_button"
                  >
                    <Button
                      className="w-full rounded-full py-5 text-base gap-2"
                      style={{ backgroundColor: "#25D366", color: "white" }}
                    >
                      <MessageCircle size={18} /> Confirm via WhatsApp
                    </Button>
                  </a>
                  <Link to="/">
                    <Button variant="outline" className="w-full rounded-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
