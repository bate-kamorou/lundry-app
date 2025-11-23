CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    customer_name TEXT NOT NULL,
    client_number TEXT NOT NULL,
    service TEXT NOT NULL,
    total_amount NUMERIC NOT NULL,
    delivery_date DATE,
    status TEXT DEFAULT 'En cours',
    pickup_charge NUMERIC DEFAULT 0,
    delivery_charge NUMERIC DEFAULT 0,
    pickup_type TEXT,
    delivery_type TEXT
);

CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id TEXT REFERENCES orders(id) ON DELETE CASCADE,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price NUMERIC NOT NULL
);
