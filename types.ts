export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  type: 'subscription' | 'lifetime';
  features: string[];
  image: string;
  badge?: string;
  status: 'safe' | 'updating' | 'risk';
  rating: number;
  reviews: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface UserProfile {
  email: string;
  name: string;
  avatar: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  date: string;
  status: 'approved' | 'pending';
  total: number;
  licenseKeys?: { productId: string; key: string }[];
}

export interface SensitivityData {
  general: number;
  redDot: number;
  scope2x: number;
  scope4x: number;
  sniper: number;
  freeLook: number;
  dpi: number;
  explanation: string;
}

export interface UserDeviceData {
  phoneModel: string;
  developerModeEnabled: boolean;
  dpiKnown: boolean;
  currentDpi?: number;
  hudFingers: number;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}