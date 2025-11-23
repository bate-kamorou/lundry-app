// FIX: Import React to resolve "Cannot find namespace 'React'" error.
import type React from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface Customer {
  id: string;
  name: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  unitPrice: number;
}

export type ViewType = 'dashboard' | 'orders' | 'pickup' | 'delivery' | 'subscriptions' | 'customer' | 'staff' | 'settings';

export interface NavItem {
  id: ViewType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface SavedOrder {
  id: string;
  date: string;
  customerName: string;
  clientNumber: string;
  service: string;
  totalAmount: number;
  deliveryDate: string;
  status: string;
  items: OrderItem[];
  pickupType?: string;
  deliveryType?: string;
}