-- Esquema completo de la base de datos para el e-commerce
-- Incluye tabla users propia para autenticación independiente

-- Tabla de usuarios (nueva - independiente de Supabase Auth)
CREATE TABLE public.users (
  id_user uuid NOT NULL DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  password_hash text NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  role text DEFAULT 'customer'::text CHECK (role = ANY (ARRAY['admin'::text, 'manager'::text, 'customer'::text])),
  avatar_url text,
  phone text,
  address text,
  city text,
  state text,
  postal_code text,
  country text DEFAULT 'México'::text,
  is_active boolean DEFAULT true,
  email_verified boolean DEFAULT false,
  last_login timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT users_pkey PRIMARY KEY (id_user)
);

-- Tabla de categorías
CREATE TABLE public.categories (
  id_category uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  image_url text,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT categories_pkey PRIMARY KEY (id_category)
);

-- Tabla de productos
CREATE TABLE public.products (
  id_product uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric NOT NULL,
  stock_quantity integer NOT NULL DEFAULT 0,
  category_id uuid,
  brand text,
  sku text NOT NULL UNIQUE,
  image_url text,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT products_pkey PRIMARY KEY (id_product),
  CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id_category)
);

-- Tabla de clientes (modificada para usar users)
CREATE TABLE public.customers (
  id_customer uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text,
  address text,
  city text,
  state text,
  postal_code text,
  country text DEFAULT 'México'::text,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT customers_pkey PRIMARY KEY (id_customer),
  CONSTRAINT customers_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id_user)
);

-- Tabla de proveedores
CREATE TABLE public.providers (
  id_provider uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text,
  address text,
  contact_person text,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT providers_pkey PRIMARY KEY (id_provider)
);

-- Tabla de órdenes
CREATE TABLE public.orders (
  id_order uuid NOT NULL DEFAULT gen_random_uuid(),
  customer_id uuid,
  total_amount numeric NOT NULL,
  subtotal numeric NOT NULL,
  tax_amount numeric DEFAULT 0,
  shipping_amount numeric DEFAULT 0,
  status text DEFAULT 'pending'::text CHECK (status = ANY (ARRAY['pending'::text, 'confirmed'::text, 'shipped'::text, 'delivered'::text, 'cancelled'::text])),
  shipping_address text,
  billing_address text,
  payment_method text,
  payment_status text DEFAULT 'pending'::text CHECK (payment_status = ANY (ARRAY['pending'::text, 'paid'::text, 'failed'::text, 'refunded'::text])),
  tracking_number text,
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT orders_pkey PRIMARY KEY (id_order),
  CONSTRAINT orders_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(id_customer)
);

-- Tabla de items de órdenes
CREATE TABLE public.order_items (
  id_order_item uuid NOT NULL DEFAULT gen_random_uuid(),
  order_id uuid,
  product_id uuid,
  quantity integer NOT NULL,
  unit_price numeric NOT NULL,
  total_price numeric NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT order_items_pkey PRIMARY KEY (id_order_item),
  CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id_order),
  CONSTRAINT order_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id_product)
);

-- Tabla de movimientos de inventario
CREATE TABLE public.inventory_movements (
  id_movement uuid NOT NULL DEFAULT gen_random_uuid(),
  product_id uuid,
  movement_type text CHECK (movement_type = ANY (ARRAY['purchase'::text, 'sale'::text, 'adjustment'::text, 'return'::text])),
  quantity integer NOT NULL,
  unit_price numeric,
  provider_id uuid,
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT inventory_movements_pkey PRIMARY KEY (id_movement),
  CONSTRAINT inventory_movements_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id_product),
  CONSTRAINT inventory_movements_provider_id_fkey FOREIGN KEY (provider_id) REFERENCES public.providers(id_provider)
);

-- Índices para optimizar consultas
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);
CREATE INDEX idx_inventory_movements_product_id ON inventory_movements(product_id);
CREATE INDEX idx_customers_user_id ON customers(user_id);

-- Validaciones adicionales
ALTER TABLE products ADD CONSTRAINT check_positive_price CHECK (price > 0);
ALTER TABLE products ADD CONSTRAINT check_positive_stock CHECK (stock_quantity >= 0);
ALTER TABLE order_items ADD CONSTRAINT check_positive_quantity CHECK (quantity > 0);
ALTER TABLE order_items ADD CONSTRAINT check_positive_unit_price CHECK (unit_price > 0);
ALTER TABLE inventory_movements ADD CONSTRAINT check_non_zero_quantity CHECK (quantity != 0);

-- Función para actualizar timestamp de updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para actualizar updated_at automáticamente
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_providers_updated_at BEFORE UPDATE ON providers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Función para actualizar stock automáticamente
CREATE OR REPLACE FUNCTION update_product_stock()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.movement_type = 'purchase' OR NEW.movement_type = 'return' THEN
    UPDATE products 
    SET stock_quantity = stock_quantity + NEW.quantity
    WHERE id_product = NEW.product_id;
  ELSIF NEW.movement_type = 'sale' THEN
    UPDATE products 
    SET stock_quantity = stock_quantity - NEW.quantity
    WHERE id_product = NEW.product_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar stock automáticamente
CREATE TRIGGER update_stock_on_movement
  AFTER INSERT ON inventory_movements
  FOR EACH ROW EXECUTE FUNCTION update_product_stock();

-- Insertar usuario administrador por defecto
-- Contraseña: admin123 (hash bcrypt)
INSERT INTO users (email, password_hash, first_name, last_name, role, is_active, email_verified) 
VALUES (
  'admin@ejemplo.com', 
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- admin123
  'Administrador',
  'Sistema',
  'admin',
  true,
  true
);

-- Insertar categorías de ejemplo
INSERT INTO categories (name, description) VALUES
('Maquillaje', 'Productos de maquillaje y cosméticos'),
('Skincare', 'Productos para el cuidado de la piel'),
('Fragancias', 'Perfumes y fragancias'),
('Accesorios', 'Accesorios de belleza y moda');

-- Insertar productos de ejemplo
INSERT INTO products (name, description, price, stock_quantity, category_id, brand, sku) VALUES
('Base de Maquillaje', 'Base de maquillaje de larga duración', 299.99, 50, (SELECT id_category FROM categories WHERE name = 'Maquillaje'), 'BeautyBrand', 'SKU001'),
('Crema Hidratante', 'Crema hidratante para todo tipo de piel', 199.99, 30, (SELECT id_category FROM categories WHERE name = 'Skincare'), 'SkinCare', 'SKU002'),
('Perfume Floral', 'Perfume con notas florales', 599.99, 20, (SELECT id_category FROM categories WHERE name = 'Fragancias'), 'FragranceCo', 'SKU003');


