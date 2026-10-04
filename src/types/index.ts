export interface CountryOption {
  name: string;
  code: string;
  flag: string;
  format: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  phone: string;
  country: {
    name: string;
    code: string;
    flag: string;
  };
  gender: 'Male' | 'Female' | 'Other';
  role: string;
  createdAt: string;
}

export interface DatabaseStatus {
  status: 'connected' | 'disconnected' | 'connecting';
  engine: string;
  latencyMs: number;
  activeConnections: number;
  uptimeSeconds: number;
  tables: {
    users: number;
    bakery_products: number;
    bakery_orders: number;
    inquiries: number;
  };
  totalQueriesExecuted: number;
  serverTimestamp: string;
}

export interface BakeryProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
}

export interface BakeryOrder {
  orderId: string;
  customerName: string;
  phone: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  totalAmount: number;
  paymentMethod: string;
  status: 'Order Placed' | 'Baking in Oven' | 'Ready for Delivery' | 'Completed';
  createdAt: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  features: string[];
  metrics: string;
  demoType: 'bakery' | 'mart' | 'clinic';
}
