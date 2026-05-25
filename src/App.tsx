/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import MissionSection from './components/MissionSection';
import SolutionSection from './components/SolutionSection';
import RayBanDropSection from './components/RayBanDropSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

// Static image asset imports (resolved beautifully by Vite's asset compiler)
import avatar1 from './assets/images/avatar_1_1779564565386.png';
import avatar2 from './assets/images/avatar_2_1779564582948.png';
import avatar3 from './assets/images/avatar_3_1779564601010.png';
import imageLeft from './assets/images/meta_rayban_1_1779564469733.png';
import imageFront from './assets/images/meta_rayban_2_1779564488448.png';

import { MoroccanOrder, NewsletterSubscription } from './types';

export default function App() {
  const [subscribers, setSubscribers] = useState<NewsletterSubscription[]>([]);
  const [orders, setOrders] = useState<MoroccanOrder[]>([]);

  // Track subscriptions
  const handleSubscribe = (email: string) => {
    const newSub: NewsletterSubscription = {
      email,
      createdAt: new Date().toISOString()
    };
    const updated = [newSub, ...subscribers];
    setSubscribers(updated);
    
    // Persist subscriptions in localStorage
    localStorage.setItem('mindloop_subscribers', JSON.stringify(updated));
    console.log(`Subscribed: ${email}`);
  };

  // Track order notifications
  const handleOrderPlaced = (newOrder: MoroccanOrder) => {
    setOrders([newOrder, ...orders]);
    console.log(`Order registered in pipeline: ${newOrder.id}`);
  };

  return (
    <div className="relative min-h-screen bg-black text-foreground antialiased selection:bg-white selection:text-black">
      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Hero Section */}
      <HeroSection 
        avatar1={avatar1} 
        avatar2={avatar2} 
        avatar3={avatar3} 
        onSubscribe={handleSubscribe} 
      />

      {/* 4. Mission Section */}
      <MissionSection />

      {/* 5. Solution Section */}
      <SolutionSection />

      {/* Exclusive Product Drop: Ray-Ban Meta Smart Glasses */}
      <RayBanDropSection 
        imageLeft={imageLeft} 
        imageFront={imageFront} 
        onOrderPlaced={handleOrderPlaced}
      />

      {/* 6. CTA Section */}
      <CTASection />

      {/* 7. Footer */}
      <Footer />
    </div>
  );
}
