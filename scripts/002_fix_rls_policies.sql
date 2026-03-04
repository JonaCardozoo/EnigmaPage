-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Authenticated users can manage products" ON products;
DROP POLICY IF EXISTS "Anyone can view active products" ON products;
DROP POLICY IF EXISTS "Authenticated users can view inquiries" ON inquiries;
DROP POLICY IF EXISTS "Authenticated users can delete inquiries" ON inquiries;

-- Products policies (allow all operations for now - simple store without auth)
CREATE POLICY "Anyone can view products" ON products
  FOR SELECT USING (true);

CREATE POLICY "Anyone can insert products" ON products
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update products" ON products
  FOR UPDATE USING (true);

CREATE POLICY "Anyone can delete products" ON products
  FOR DELETE USING (true);

-- Inquiries policies (allow all operations)
CREATE POLICY "Anyone can view inquiries" ON inquiries
  FOR SELECT USING (true);

CREATE POLICY "Anyone can update inquiries" ON inquiries
  FOR UPDATE USING (true);

CREATE POLICY "Anyone can delete inquiries" ON inquiries
  FOR DELETE USING (true);
