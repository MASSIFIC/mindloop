import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Star, CheckCircle, Clock, Truck, Sliders, ShieldCheck, Database, Loader2 } from 'lucide-react';
import { MoroccanOrder } from '../types';

interface RayBanDropSectionProps {
  imageLeft: string;
  imageFront: string;
  onOrderPlaced: (order: MoroccanOrder) => void;
}

const MOROCCAN_CITIES = [
  "Casablanca", "Rabat", "Marrakech", "Tangier", "Agadir",
  "Fez", "Meknès", "Oujda", "Kenitra", "Tetouan", "Nador", "Salé"
];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, delay, ease: "easeOut" },
});

export default function RayBanDropSection({ imageLeft, imageFront, onOrderPlaced }: RayBanDropSectionProps) {
  // Image switcher state
  const [activeImage, setActiveImage] = useState<'left' | 'front'>('left');
  
  // Checkout form states
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState(MOROCCAN_CITIES[0]);
  const [address, setAddress] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<MoroccanOrder | null>(null);

  // Administrative / Ledger States
  const [historicalOrders, setHistoricalOrders] = useState<MoroccanOrder[]>([]);
  const [showLedger, setShowLedger] = useState(false);

  // WhatsApp Support Settings
  const [whatsappNumber, setWhatsappNumber] = useState(() => {
    return localStorage.getItem('mindloop_whatsapp_number') || '+212716892921';
  });

  const handleSaveWhatsappNumber = (val: string) => {
    setWhatsappNumber(val);
    localStorage.setItem('mindloop_whatsapp_number', val);
  };

  const getWhatsAppUrl = (order: MoroccanOrder, num: string) => {
    const cleanNum = num.replace(/[+\s-]/g, '');
    const text = `Hello Mindloop, I want to verify my Ray-Ban Meta Smart Glasses COD Order:

• Order ID: ${order.id}
• Recipient: ${order.fullName}
• Phone: ${order.phone}
• City: ${order.city}
• Shipping Address: ${order.address}
• Quantity: ${order.quantity} x Unit(s)
• Total Price: ${order.totalPriceDH.toLocaleString()} DH

Please confirm my fast delivery shipping slot!`;
    return `https://wa.me/${cleanNum}?text=${encodeURIComponent(text)}`;
  };

  // Load orders on load
  useEffect(() => {
    const saved = localStorage.getItem('mindloop_orders');
    if (saved) {
      try {
        setHistoricalOrders(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handlePlaceOrder = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !address) return;

    setIsSubmitting(true);

    // Simulate luxury fulfillment queue
    setTimeout(() => {
      const newOrder: MoroccanOrder = {
        id: `MLP-${Math.floor(100000 + Math.random() * 900000)}`,
        fullName,
        phone,
        city,
        address,
        quantity,
        totalPriceDH: quantity * 5000,
        status: 'Confirmed',
        createdAt: new Date().toISOString()
      };

      // Save order
      const updatedList = [newOrder, ...historicalOrders];
      setHistoricalOrders(updatedList);
      localStorage.setItem('mindloop_orders', JSON.stringify(updatedList));
      
      onOrderPlaced(newOrder);
      setPlacedOrder(newOrder);
      setIsSubmitting(false);

      // Clean form
      setFullName('');
      setPhone('');
      setAddress('');
      setQuantity(1);
    }, 1500);
  };

  const handleUpdateStatus = (orderId: string, nextStatus: 'Confirmed' | 'Shipped' | 'Delivered') => {
    const updated = historicalOrders.map(order => {
      if (order.id === orderId) {
        return { ...order, status: nextStatus };
      }
      return order;
    });
    setHistoricalOrders(updated);
    localStorage.setItem('mindloop_orders', JSON.stringify(updated));
  };

  const handleDeleteOrder = (orderId: string) => {
    const updated = historicalOrders.filter(order => order.id !== orderId);
    setHistoricalOrders(updated);
    localStorage.setItem('mindloop_orders', JSON.stringify(updated));
  };

  return (
    <section id="ray-ban-drop" className="relative bg-black px-8 md:px-28 py-32 md:py-40 border-t border-border/30 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Hardware Drop Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div>
            <motion.span 
              {...fadeUp(0.1)}
              className="text-xs font-mono tracking-[4px] uppercase text-muted-foreground block mb-3"
            >
              MINDLOOP HARDWARE DROPS • #01
            </motion.span>
            <motion.h2 
              {...fadeUp(0.2)}
              className="text-4xl md:text-6xl font-sans font-medium tracking-tight text-foreground"
            >
              Ray-Ban Meta <span className="font-serif italic font-normal text-white">Smart Glasses</span>
            </motion.h2>
          </div>
          <motion.div 
            {...fadeUp(0.3)}
            className="flex items-center gap-2 bg-neutral-900 border border-white/5 py-1 px-3 rounded-full text-xs font-mono text-muted-foreground/90"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            IN STOCK (MOROCCO HUB) — COURIER EXPEDITED
          </motion.div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left: Product Images & Specs */}
          <div className="flex flex-col gap-8">
            <motion.div 
              {...fadeUp(0.2)}
              className="liquid-glass rounded-2xl border border-white/5 p-4 flex flex-col items-center select-none"
            >
              {/* Main Image Display */}
              <div className="relative w-full aspect-square bg-neutral-950/80 rounded-xl overflow-hidden flex items-center justify-center p-6 border border-white/5">
                <AnimatePresence mode="wait">
                  {activeImage === 'left' ? (
                    <motion.img
                      key="img-left"
                      src={imageLeft}
                      alt="Ray Ban Meta Wayfarer Left Perspective"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain filter brightness-105"
                    />
                  ) : (
                    <motion.img
                      key="img-front"
                      src={imageFront}
                      alt="Ray Ban Meta Wayfarer Front Perspective"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain filter brightness-110"
                    />
                  )}
                </AnimatePresence>
                
                {/* Image Switch Action buttons */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                  <button 
                    onClick={() => setActiveImage('left')}
                    className={`px-3 py-1.5 rounded-full font-sans text-xs font-medium tracking-wide transition-all border ${
                      activeImage === 'left' 
                      ? 'bg-foreground text-background border-foreground font-semibold' 
                      : 'bg-black/70 text-muted-foreground hover:text-foreground border-white/10'
                    }`}
                  >
                    Angled Perspective
                  </button>
                  <button 
                    onClick={() => setActiveImage('front')}
                    className={`px-3 py-1.5 rounded-full font-sans text-xs font-medium tracking-wide transition-all border ${
                      activeImage === 'front' 
                      ? 'bg-foreground text-background border-foreground font-semibold' 
                      : 'bg-black/70 text-muted-foreground hover:text-foreground border-white/10'
                    }`}
                  >
                    Straight Perspective
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Spec Sheets Sheet */}
            <motion.div 
              {...fadeUp(0.35)}
              className="grid grid-cols-2 gap-4 text-xs font-mono"
            >
              {[
                { label: "CAMERA", value: "Ultra-wide 12 MP front" },
                { label: "AUDIO", value: "Open-ear spatial speakers" },
                { label: "CHIPSET", value: "Qualcomm Snapdragon AR1 Gen 1" },
                { label: "STORAGE", value: "32 GB flash memory" },
                { label: "WEIGHT", value: "Lightweight Wayfarer build" },
                { label: "INTEGRATION", value: "Real-time Meta AI + voice" }
              ].map((spec) => (
                <div key={spec.label} className="p-4 rounded-xl border border-white/5 bg-neutral-950/70">
                  <span className="text-muted-foreground block text-[10px] tracking-[1.5px] mb-1">{spec.label}</span>
                  <span className="text-foreground tracking-wide font-medium">{spec.value}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Checkout COD Form */}
          <div className="flex flex-col gap-6">
            <AnimatePresence mode="wait">
              {!placedOrder ? (
                <motion.div
                  key="checkout-wrapper"
                  {...fadeUp(0.35)}
                  className="liquid-glass rounded-2xl border border-white/15 p-8 flex flex-col gap-6"
                >
                  <div>
                    <h3 className="text-xl font-sans font-semibold text-foreground flex items-center gap-2 mb-2">
                      <ShoppingBag className="w-5 h-5" /> Express COD Checkout
                    </h3>
                    <p className="text-muted-foreground text-sm tracking-wide leading-relaxed">
                      Moroccan orders are dispatched via partner couriers with Cash on Delivery (COD). No credit card required. Free express shipping.
                    </p>
                  </div>

                  {/* Pricing block */}
                  <div className="p-4 rounded-xl border border-white/5 bg-neutral-950/75 flex justify-between items-center">
                    <div>
                      <span className="text-muted-foreground text-[10px] font-mono tracking-[1.5px] uppercase block">PRICE (COD)</span>
                      <span className="text-2xl font-sans font-bold text-foreground">5,000 DH</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono bg-white/10 text-foreground py-1 px-3 rounded-full font-semibold">
                        PAY AT DOORWAY
                      </span>
                    </div>
                  </div>

                  {/* Booking form */}
                  <form onSubmit={handlePlaceOrder} className="flex flex-col gap-4">
                    
                    {/* Full Name */}
                    <div className="flex flex-col gap-1">
                      <label className="text-muted-foreground text-xs font-mono tracking-[1px]">FULL NAME</label>
                      <input
                        type="text"
                        required
                        disabled={isSubmitting}
                        placeholder="e.g., Youssef Alami"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground outline-none focus:border-white/40 transition-colors"
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="flex flex-col gap-1">
                      <label className="text-muted-foreground text-xs font-mono tracking-[1px] flex justify-between">
                        <span>PHONE NUMBER</span>
                        <span className="text-muted-foreground/50 text-[10px]">COURIER REQUISITE</span>
                      </label>
                      <input
                        type="tel"
                        required
                        disabled={isSubmitting}
                        placeholder="e.g., +212 612 345678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground outline-none focus:border-white/40 transition-colors"
                      />
                    </div>

                    {/* City Selection */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-muted-foreground text-xs font-mono tracking-[1px]">SHIPPING CITY</label>
                        <select
                          disabled={isSubmitting}
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground outline-none focus:border-white/40 transition-colors cursor-pointer"
                        >
                          {MOROCCAN_CITIES.map((c) => (
                            <option key={c} value={c} className="bg-black text-foreground">{c}</option>
                          ))}
                        </select>
                      </div>

                      {/* Quantity */}
                      <div className="flex flex-col gap-1">
                        <label className="text-muted-foreground text-xs font-mono tracking-[1px]">QUANTITY</label>
                        <div className="flex items-center bg-neutral-950 border border-white/10 rounded-xl px-2">
                          <button
                            type="button"
                            disabled={isSubmitting || quantity <= 1}
                            onClick={() => setQuantity(prev => prev - 1)}
                            className="w-8 h-10 flex items-center justify-center text-foreground font-semibold hover:bg-white/5 active:scale-90 transition-all rounded"
                          >
                            -
                          </button>
                          <span className="flex-grow text-center text-sm font-semibold">{quantity}</span>
                          <button
                            type="button"
                            disabled={isSubmitting || quantity >= 5}
                            onClick={() => setQuantity(prev => prev + 1)}
                            className="w-8 h-10 flex items-center justify-center text-foreground font-semibold hover:bg-white/5 active:scale-90 transition-all rounded"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="flex flex-col gap-1">
                      <label className="text-muted-foreground text-xs font-mono tracking-[1px]">DELIVERY ADDRESS</label>
                      <textarea
                        required
                        rows={2}
                        disabled={isSubmitting}
                        placeholder="e.g., No. 45 Avenue Hassan II, Appt 6"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground outline-none focus:border-white/40 resize-none transition-colors"
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-foreground text-background py-4 font-sans font-bold text-xs tracking-[2px] rounded-xl uppercase hover:bg-neutral-100 transition-colors cursor-pointer flex items-center justify-center gap-2 mt-4"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          CONFIRMING DROP RESERVATION...
                        </>
                      ) : (
                        `PLACE CASH ON DELIVERY ORDER — ${(quantity * 5000).toLocaleString()} DH`
                      )}
                    </motion.button>
                  </form>

                  {/* Trust Badge icons */}
                  <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground pt-2 border-t border-white/5">
                    <span className="flex items-center gap-1.5"><Truck className="w-3.5 h-3.5 text-foreground" /> Free Expedited Shipping</span>
                    <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-foreground" /> 1-Year Brand Warranty</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="order-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="liquid-glass rounded-2xl border border-emerald-500/30 bg-emerald-950/5 p-8 flex flex-col gap-6"
                >
                  <div className="text-center py-4 border-b border-white/5 pb-6">
                    <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-sans font-bold text-foreground">Drop Reserved</h3>
                    <p className="text-muted-foreground text-sm tracking-wide mt-2">
                      Your high-tech wearable order is registered!
                    </p>
                  </div>

                  {/* WhatsApp Verification Callout to Confirm Order */}
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-5 flex flex-col gap-3.5 text-center items-center shadow-md">
                    <span className="text-[10px] font-mono tracking-[2px] uppercase bg-emerald-500/20 text-emerald-400 py-1 px-3 rounded-full font-bold flex items-center gap-1.5 animate-pulse">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      Moroccan Courier Requisite
                    </span>
                    <p className="text-muted-foreground text-xs leading-relaxed max-w-sm">
                      WhatsApp validation is required for instant shipping scheduling. Verify your order with our dispatch team to lock in priority delivery!
                    </p>
                    <a
                      href={getWhatsAppUrl(placedOrder, whatsappNumber)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-sans font-bold text-xs tracking-[1.5px] uppercase rounded-xl py-3.5 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.004 2c-5.518 0-9.996 4.477-9.996 9.996 0 1.764.459 3.486 1.332 5.013l-1.34 4.904 5.022-1.317c1.472.8 3.12 1.22 4.802 1.22 5.517 0 9.996-4.477 9.996-9.996C22.004 6.477 17.525 2 12.004 2zm3.89 14.5c-.24.67-.123 1.222-.05 1.55.15.54.51.81.71.91.43.2.98.05 1.15-.36.21-.51.13-.91.08-1.02-.05-.11-.2-.17-.43-.28-.56-.28-.86-.42-1.08-.18-.11.13-.3.44-.38.56-.23-.27-.58-.6-.89-.87-.39-.33-.76-.68-.94-.83.21-.24.5-.59.7-.85.15-.22.1-.48-.02-.63-.26-.35-.63-.85-.86-1.15-.21-.28-.42-.23-.58-.23h-.49c-.21 0-.61.08-.94.43-.33.35-1.25 1.22-1.25 2.97 0 1.75 1.27 3.43 1.45 3.67.18.23 2.5 3.82 6.06 5.35.84.36 1.5.58 2.01.74.85.27 1.62.23 2.23.14.68-.1 1.39-.56 1.58-1.1s.19-1.01.14-1.11z"/>
                      </svg>
                      CONFIRM & VERIFY VIA WHATSAPP (INSTANT)
                    </a>
                  </div>

                  {/* Complete invoice details */}
                  <div className="p-5 rounded-xl bg-neutral-950/80 border border-white/5 font-mono text-xs flex flex-col gap-3">
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-muted-foreground">ORDER ID</span>
                      <span className="text-foreground font-bold">{placedOrder.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">RECIPIENT</span>
                      <span className="text-foreground">{placedOrder.fullName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">SHIPPING LOCATION</span>
                      <span className="text-foreground">{placedOrder.city}, Morocco</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">QUANTITY</span>
                      <span className="text-foreground">{placedOrder.quantity} Unit(s)</span>
                    </div>
                    <div className="flex justify-between border-t border-white/5 pt-2 text-sm">
                      <span className="text-muted-foreground">PAYMENT QUEUE (COD)</span>
                      <span className="text-foreground font-bold">{placedOrder.totalPriceDH.toLocaleString()} DH</span>
                    </div>
                  </div>

                  {/* Action button to order again */}
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => setPlacedOrder(null)}
                      className="w-full bg-white/10 text-foreground py-3 text-xs tracking-[1px] font-mono rounded-xl hover:bg-white/15 transition-all text-center"
                    >
                      PLACE ANOTHER RESERVATION
                    </button>
                    <button
                      onClick={() => {
                        setShowLedger(true);
                        setPlacedOrder(null);
                      }}
                      className="w-full bg-transparent border border-white/10 text-muted-foreground py-3 text-xs tracking-[1px] font-mono rounded-xl hover:text-foreground transition-all"
                    >
                      OPEN HARDWARE LEDGER
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Ledger Portal Toggle */}
        <div className="mt-20 border-t border-white/5 pt-8 flex justify-center">
          <button
            onClick={() => setShowLedger(prev => !prev)}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-950 border border-white/10 text-xs font-mono tracking-[1px] text-muted-foreground hover:text-foreground hover:border-white/30 transition-all duration-300"
          >
            <Database className="w-4 h-4" /> 
            {showLedger ? "HIDE LOCAL HARDWARE LEDGER" : "GO TO ADMINISTRATIVE FULFILLMENT LEDGER"}
          </button>
        </div>

        {/* Interactive Fulfillment Dashboard section */}
        <AnimatePresence>
          {showLedger && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden mt-8"
            >
              <div className="p-6 md:p-8 rounded-2xl bg-neutral-950 border border-white/5 flex flex-col gap-6">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-lg font-sans font-semibold text-foreground flex items-center gap-2">
                      <Sliders className="w-5 h-5 text-muted-foreground" /> Admin Fulfillment Console
                    </h3>
                    <p className="text-muted-foreground text-xs font-mono tracking-[0.5px] mt-1">
                      Direct client-side database loop (`localStorage`). Simulate fulfillment flow.
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono bg-white/5 text-muted-foreground py-1 px-3 rounded-full">
                      {historicalOrders.length} REGISTERED ORDER(S)
                    </span>
                  </div>
                </div>

                {/* Interactive WhatsApp settings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 rounded-xl border border-white/5 bg-neutral-900/35 text-xs">
                  <div>
                    <span className="text-foreground font-sans font-semibold block mb-1">WhatsApp Store Verification Phone Number</span>
                    <p className="text-muted-foreground leading-relaxed">
                      This is the WhatsApp number that clients will contact to auto-confirm their Cash on Delivery (COD) order. Enter your own WhatsApp number to test the redirect integration!
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative flex-grow">
                      <input 
                        type="text"
                        className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-2.5 text-foreground outline-none focus:border-emerald-500/50 font-mono text-center tracking-wider transition-all"
                        placeholder="e.g. +212600000000"
                        value={whatsappNumber}
                        onChange={(e) => handleSaveWhatsappNumber(e.target.value)}
                      />
                    </div>
                    <span className="bg-emerald-500/10 text-emerald-400 font-bold px-3 py-2 rounded-xl text-[10px] tracking-widest font-mono uppercase border border-emerald-500/20 whitespace-nowrap">
                      ACTIVE LINK
                    </span>
                  </div>
                </div>

                {historicalOrders.length === 0 ? (
                  <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
                    <Clock className="w-8 h-8 text-muted-foreground/40 mx-auto mb-3" />
                    <p className="text-muted-foreground text-sm font-mono">No simulation orders loaded in memory.</p>
                    <p className="text-muted-foreground/60 text-xs font-mono mt-1">Submit the order form above to populate data.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left font-mono text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 text-muted-foreground text-[10px]">
                          <th className="py-3 px-2">ID</th>
                          <th className="py-3 px-2">CLIENT</th>
                          <th className="py-3 px-2">CONTACT</th>
                          <th className="py-3 px-2">LOCATION</th>
                          <th className="py-3 px-2 text-right">VALUE</th>
                          <th className="py-3 px-2 text-center">STATUS</th>
                          <th className="py-3 px-2 text-right">ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {historicalOrders.map((order) => (
                          <tr key={order.id} className="hover:bg-white/5">
                            <td className="py-4 px-2 font-bold text-foreground">{order.id}</td>
                            <td className="py-4 px-2">{order.fullName}</td>
                            <td className="py-4 px-2 text-muted-foreground">{order.phone}</td>
                            <td className="py-4 px-2">{order.city}</td>
                            <td className="py-4 px-2 text-right font-bold text-foreground">
                              {order.totalPriceDH.toLocaleString()} DH
                            </td>
                            <td className="py-4 px-2 text-center">
                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                order.status === 'Confirmed' ? 'bg-amber-400/10 text-amber-300' :
                                order.status === 'Shipped' ? 'bg-sky-400/10 text-sky-300' :
                                'bg-emerald-400/10 text-emerald-300'
                              }`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="py-4 px-2 text-right flex items-center justify-end gap-1.5 flex-wrap">
                              {order.status === 'Confirmed' && (
                                <button
                                  onClick={() => handleUpdateStatus(order.id, 'Shipped')}
                                  className="px-2 py-1 bg-white/5 hover:bg-sky-400/15 text-sky-300 rounded font-semibold text-[10px]"
                                >
                                  Ship Product
                                </button>
                              )}
                              {order.status === 'Shipped' && (
                                <button
                                  onClick={() => handleUpdateStatus(order.id, 'Delivered')}
                                  className="px-2 py-1 bg-white/5 hover:bg-emerald-400/15 text-emerald-300 rounded font-semibold text-[10px]"
                                >
                                  Deliver
                                </button>
                              )}
                              <button
                                onClick={() => handleDeleteOrder(order.id)}
                                className="px-2 py-1 bg-white/5 hover:bg-rose-500/15 text-rose-400 rounded transition-all text-[10px]"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
