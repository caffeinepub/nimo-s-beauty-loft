import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useNavigate } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "../context/CartContext";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, itemCount } =
    useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    closeCart();
    navigate({ to: "/checkout" });
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent
        side="right"
        className="w-full sm:w-[420px] p-0 flex flex-col"
        data-ocid="cart.panel"
      >
        <SheetHeader className="px-6 py-5 border-b border-border">
          <SheetTitle className="font-playfair text-xl flex items-center gap-2">
            <ShoppingBag size={20} className="text-accent" />
            Your Cart
            {itemCount > 0 && (
              <span className="ml-1 bg-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <AnimatePresence mode="popLayout">
            {items.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center justify-center py-20 text-center"
                data-ocid="cart.empty_state"
              >
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                  <ShoppingBag size={32} className="text-muted-foreground" />
                </div>
                <p className="font-playfair text-lg font-semibold text-foreground mb-2">
                  Your cart is empty
                </p>
                <p className="text-sm text-muted-foreground">
                  Start shopping to add items here ✨
                </p>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {items.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex gap-3 items-start"
                    data-ocid={`cart.item.${idx + 1}`}
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-muted">
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
                      <p className="text-xs text-muted-foreground mb-2">
                        {item.category}
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-sm font-semibold w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="p-1.5 text-muted-foreground hover:text-destructive transition-colors mt-0.5"
                      aria-label="Remove item"
                      data-ocid={`cart.delete_button.${idx + 1}`}
                    >
                      <Trash2 size={15} />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        {items.length > 0 && (
          <div className="border-t border-border px-6 py-5 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Order total</span>
              <span className="text-sm font-semibold text-foreground italic">
                Price on order
              </span>
            </div>
            <Separator />
            <Button
              className="btn-accent w-full rounded-full text-base py-5"
              onClick={handleCheckout}
              data-ocid="cart.checkout_button"
            >
              Proceed to Checkout →
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
