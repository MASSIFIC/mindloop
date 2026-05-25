/**
 * Shared Type Definitions for Mindloop Platform
 */

export interface MoroccanOrder {
  id: string;
  fullName: string;
  phone: string;
  city: string;
  address: string;
  quantity: number;
  totalPriceDH: number;
  status: 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered';
  createdAt: string;
}

export interface NewsletterSubscription {
  email: string;
  createdAt: string;
}

export interface PlatformCard {
  id: string;
  name: string;
  logoUrl: string;
  description: string;
}

export interface FeatureColumn {
  title: string;
  description: string;
}
