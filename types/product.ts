export interface Product {
  id_product: string;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  category_id: string;
  brand: string;
  sku: string;
  image_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  category?: Category;
}

export interface Category {
  id_category: string;
  name: string;
  description?: string;
  image_url?: string;
  is_active: boolean;
  created_at: string;
}

export interface InventoryMovement {
  id_movement: string;
  product_id: string;
  movement_type: 'purchase' | 'sale' | 'adjustment' | 'return';
  quantity: number;
  unit_price?: number;
  provider_id?: string;
  notes?: string;
  created_at: string;
  product?: Product;
  provider?: Provider;
}

export interface Order {
  id_order: string;
  customer_id: string;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  shipping_address: string;
  payment_method: string;
  created_at: string;
  customer?: Customer;
  items?: OrderItem[];
}

export interface OrderItem {
  id_order_item: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  created_at: string;
  product?: Product;
}

export interface Customer {
  id_customer: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  address?: string;
  created_at: string;
}

export interface Provider {
  id_provider: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  contact_person?: string;
  is_active: boolean;
  created_at: string;
}


