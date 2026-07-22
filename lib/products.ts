import { query, queryOne } from './db';

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  base_price: number;
  deposit_amount: number;
  category: string;
  is_active: boolean;
  image_url: string;
  setup_time_minutes: number;
  teardown_time_minutes: number;
  capacity: number;
  length_ft: number;
  width_ft: number;
  height_ft: number;
  wet_dry: string | null;
  special_requirements: string | null;
  created_at: string;
}

export interface ProductImage {
  id: number;
  product_id: number;
  image_url: string;
  sort_order: number;
}

export interface AddOn {
  id: number;
  name: string;
  price: number;
  description: string | null;
  is_active: boolean;
}

export async function getActiveProducts(): Promise<Product[]> {
  return query<Product>('SELECT * FROM products WHERE is_active = true ORDER BY name ASC');
}

// Distinct category names that currently have at least one active product.
// Used to hide catalog sections that have no inventory yet (they reappear
// automatically once matching products are seeded).
export async function getActiveCategories(): Promise<string[]> {
  const rows = await query<{ category: string }>(
    "SELECT DISTINCT category FROM products WHERE is_active = true AND category IS NOT NULL"
  );
  return rows.map((r) => r.category);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return queryOne<Product>('SELECT * FROM products WHERE slug = $1 AND is_active = true', [slug]);
}

export async function getProductsByCategories(categories: string[]): Promise<Product[]> {
  const placeholders = categories.map((_, i) => '$' + (i + 1)).join(', ');
  return query<Product>(
    'SELECT * FROM products WHERE is_active = true AND category = ANY(ARRAY[' + placeholders + ']) ORDER BY name ASC',
    categories
  );
}

export async function getAllProducts(): Promise<Product[]> {
  return query<Product>('SELECT * FROM products ORDER BY name ASC');
}

export async function updateProduct(id: number, data: Partial<Product>): Promise<Product | null> {
  const fields = Object.keys(data).filter(k => k !== 'id' && k !== 'created_at');
  const values = fields.map(f => (data as any)[f]);
  const setClause = fields.map((f, i) => f + ' = $' + (i + 1)).join(', ');
  return queryOne<Product>(
    'UPDATE products SET ' + setClause + ' WHERE id = $' + (fields.length + 1) + ' RETURNING *',
    [...values, id]
  );
}

export async function getProductImages(productId: number): Promise<ProductImage[]> {
  return query<ProductImage>(
    'SELECT * FROM product_images WHERE product_id = $1 ORDER BY sort_order ASC',
    [productId]
  );
}

export async function getActiveAddOns(): Promise<AddOn[]> {
  return query<AddOn>('SELECT * FROM add_ons WHERE is_active = true ORDER BY price ASC');
}
