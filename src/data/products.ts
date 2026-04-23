export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  description: string;
  stockQuantity: number;
  rating: number;
  reviewCount: number;
}

export const categories = ['Electronics', 'Mobiles', 'Fashion', 'Shoes', 'Home', 'Sports', 'Appliances', 'Beauty'] as const;

export const categoryIcons: Record<string, string> = {
  Electronics: '💻',
  Mobiles: '📱',
  Fashion: '👗',
  Shoes: '👟',
  Home: '🏠',
  Sports: '⚽',
  Appliances: '🔌',
  Beauty: '💄',
};

// Helper to generate products
const p = (id: string, name: string, price: number, originalPrice: number, image: string, category: string, description: string, rating: number, reviewCount: number, images?: string[]): Product => ({
  id, name, price, originalPrice, image, images: images || [image], category, description, stockQuantity: Math.floor(Math.random() * 20) + 5, rating, reviewCount,
});

export const products: Product[] = [
  // === Electronics (15) ===
  p('e1', 'Wireless Noise-Cancelling Headphones', 4999, 7999, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80', 'Electronics', 'Premium over-ear headphones with active noise cancellation, 30-hour battery, Bluetooth 5.3.', 4.5, 2847, ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80','https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=80','https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=600&q=80']),
  p('e2', 'Smart Watch Pro', 12999, 19999, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80', 'Electronics', 'Advanced smartwatch with health monitoring, GPS, and AMOLED display.', 4.3, 1523),
  p('e3', 'Portable Bluetooth Speaker', 2499, 3999, 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80', 'Electronics', 'Waterproof portable speaker with 360° sound and 20-hour battery.', 4.1, 987),
  p('e4', 'Mechanical Keyboard RGB', 5499, 7999, 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&q=80', 'Electronics', 'Premium mechanical keyboard with hot-swappable switches and per-key RGB.', 4.7, 3421),
  p('e5', 'Ultra-Wide Monitor 34"', 29999, 44999, 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&q=80', 'Electronics', '34-inch curved QHD monitor with 144Hz refresh rate.', 4.6, 892),
  p('e6', 'Wireless Charging Pad', 1299, 1999, 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&q=80', 'Electronics', 'Fast wireless charger compatible with all Qi-enabled devices.', 4.0, 654),
  p('e7', 'Drone Camera 4K', 34999, 49999, 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=600&q=80', 'Electronics', 'Professional drone with 4K camera and 30-min flight time.', 4.4, 432),
  p('e8', 'Noise-Cancelling Earbuds', 6999, 9999, 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=600&q=80', 'Electronics', 'True wireless earbuds with adaptive noise cancellation and spatial audio.', 4.2, 1876),
  p('e9', 'USB-C Hub 8-in-1', 2999, 4499, 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=600&q=80', 'Electronics', 'Multi-port hub with HDMI, USB-A, SD card, and 100W PD charging.', 4.3, 1234),
  p('e10', 'Webcam 4K Ultra HD', 4499, 6999, 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=600&q=80', 'Electronics', '4K webcam with auto-focus, noise-cancelling mic, and privacy cover.', 4.1, 876),
  p('e11', 'Wireless Mouse Ergonomic', 1999, 2999, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80', 'Electronics', 'Ergonomic wireless mouse with silent clicks and 12-month battery.', 4.4, 2345),
  p('e12', 'Portable SSD 1TB', 5999, 8999, 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=600&q=80', 'Electronics', 'Ultra-fast portable SSD with 1050MB/s read speed and shock resistant.', 4.6, 1567),
  p('e13', 'Smart LED Strip 5m', 1499, 2499, 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80', 'Electronics', 'WiFi-enabled LED strip with 16M colors and voice control.', 4.0, 3456),
  p('e14', 'Action Camera Waterproof', 8999, 14999, 'https://images.unsplash.com/photo-1526406915894-7bcd65f60845?w=600&q=80', 'Electronics', 'Waterproof action camera with 4K60fps, stabilization, and touchscreen.', 4.5, 987),
  p('e15', 'Smart Home Speaker', 3999, 5999, 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=600&q=80', 'Electronics', 'Voice-controlled smart speaker with premium audio and smart home hub.', 4.2, 2134),

  // === Mobiles (13) ===
  p('m1', 'Galaxy Ultra 5G 256GB', 79999, 99999, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80', 'Mobiles', '6.8" Dynamic AMOLED, Snapdragon 8 Gen 3, 200MP camera, 5000mAh.', 4.6, 8765),
  p('m2', 'iPhone 16 Pro 128GB', 119999, 134999, 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&q=80', 'Mobiles', 'A18 Pro chip, 48MP camera system, titanium design, all-day battery.', 4.7, 12345),
  p('m3', 'OnePlus 12 Pro', 49999, 64999, 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80', 'Mobiles', 'Snapdragon 8 Gen 3, 100W fast charging, Hasselblad cameras.', 4.5, 5432),
  p('m4', 'Pixel 9 Pro', 84999, 99999, 'https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=600&q=80', 'Mobiles', 'Google Tensor G4, Magic Eraser, 7 years updates, 50MP camera.', 4.4, 3456),
  p('m5', 'Redmi Note 14 Pro+', 19999, 24999, 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&q=80', 'Mobiles', '200MP camera, MediaTek Dimensity 7300, 120Hz AMOLED, 5000mAh.', 4.3, 15678),
  p('m6', 'Realme GT 7 Pro', 34999, 42999, 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=600&q=80', 'Mobiles', 'Snapdragon 8 Elite, 120W charging, underwater photography.', 4.2, 4321),
  p('m7', 'Samsung Galaxy A55', 27999, 34999, 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&q=80', 'Mobiles', 'Super AMOLED 120Hz, 50MP OIS camera, IP67 water resistant.', 4.1, 7654),
  p('m8', 'Vivo V40 Pro', 39999, 49999, 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&q=80', 'Mobiles', 'Zeiss cameras, 3D curved display, 80W fast charge, 5500mAh.', 4.3, 2345),
  p('m9', 'Nothing Phone 3', 32999, 39999, 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&q=80', 'Mobiles', 'Glyph interface, Snapdragon 8s Gen 3, 50MP dual camera.', 4.4, 3210),
  p('m10', 'Motorola Edge 50', 24999, 29999, 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&q=80', 'Mobiles', '6.7" pOLED 144Hz, 50MP OIS, 68W TurboPower, vegan leather.', 4.0, 1876),
  p('m11', 'iQOO 13', 44999, 54999, 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&q=80', 'Mobiles', 'Snapdragon 8 Elite, 120W flashcharge, gaming-grade display.', 4.5, 2567),
  p('m12', 'POCO F7 Ultra', 37999, 44999, 'https://images.unsplash.com/photo-1567581935884-3349723552ca?w=600&q=80', 'Mobiles', 'Snapdragon 8 Elite, 120W HyperCharge, liquid cooling, 6000mAh.', 4.3, 4567),
  p('m13', 'Samsung Galaxy Z Flip 6', 99999, 119999, 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&q=80', 'Mobiles', 'Foldable design, Flex Mode, 50MP camera, Galaxy AI features.', 4.2, 3456),

  // === Fashion (14) ===
  p('f1', 'Premium Leather Backpack', 3999, 5999, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80', 'Fashion', 'Full-grain leather backpack with laptop compartment.', 4.6, 1243),
  p('f2', 'Classic Aviator Sunglasses', 2999, 4499, 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80', 'Fashion', 'Polarized UV400 sunglasses with titanium frames.', 4.3, 2156),
  p('f3', 'Minimalist Watch Rose Gold', 7999, 11999, 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80', 'Fashion', 'Rose gold watch with sapphire crystal and Italian leather strap.', 4.8, 876),
  p('f4', 'Canvas Tote Bag', 1499, 1999, 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=80', 'Fashion', 'Eco-friendly canvas tote with reinforced handles.', 4.1, 543),
  p('f5', 'Cashmere Scarf', 3499, 4999, 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600&q=80', 'Fashion', '100% cashmere scarf in herringbone pattern.', 4.5, 321),
  p('f6', 'Leather Chelsea Boots', 6999, 9999, 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=600&q=80', 'Fashion', 'Goodyear welt construction Chelsea boots with leather sole.', 4.4, 765),
  p('f7', 'Silk Pocket Square Set', 1299, 1799, 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=600&q=80', 'Fashion', 'Set of 4 hand-rolled silk pocket squares.', 4.0, 198),
  p('f8', 'Wool Fedora Hat', 1999, 2999, 'https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?w=600&q=80', 'Fashion', 'Premium wool fedora with grosgrain ribbon band.', 4.2, 234),
  p('f9', 'Denim Jacket Classic', 2999, 4499, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80', 'Fashion', 'Classic wash denim jacket with brass buttons and chest pockets.', 4.3, 1567),
  p('f10', 'Linen Shirt Sky Blue', 1799, 2499, 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80', 'Fashion', 'Breathable pure linen shirt, perfect for summer.', 4.1, 876),
  p('f11', 'Leather Belt Premium', 999, 1499, 'https://images.unsplash.com/photo-1553704571-c32d20e6c74c?w=600&q=80', 'Fashion', 'Full-grain leather belt with brushed nickel buckle.', 4.4, 2345),
  p('f12', 'Printed Cotton Kurti', 799, 1299, 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&q=80', 'Fashion', 'Elegant printed cotton kurti with mandarin collar.', 4.2, 4567),
  p('f13', 'Chino Pants Slim Fit', 1999, 2999, 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80', 'Fashion', 'Stretch cotton chinos with slim fit and tapered leg.', 4.3, 1890),
  p('f14', 'Embroidered Shawl', 2499, 3999, 'https://images.unsplash.com/photo-1601244005535-a48d21d951ac?w=600&q=80', 'Fashion', 'Hand-embroidered Pashmina shawl in floral motif.', 4.6, 567),

  // === Shoes (13) ===
  p('sh1', 'Air Max Sneakers', 7999, 10999, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80', 'Shoes', 'Iconic Air Max with visible air cushioning and lightweight mesh.', 4.7, 5432, ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80','https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80']),
  p('sh2', 'Classic White Sneakers', 3499, 4999, 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80', 'Shoes', 'Minimalist white leather sneakers for everyday wear.', 4.5, 3210),
  p('sh3', 'Trail Running Shoes', 4999, 6999, 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80', 'Shoes', 'Rugged trail shoes with waterproof membrane and aggressive tread.', 4.3, 1876),
  p('sh4', 'Suede Loafers', 3999, 5999, 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&q=80', 'Shoes', 'Elegant suede loafers with cushioned insole.', 4.4, 987),
  p('sh5', 'High-Top Canvas Sneakers', 2499, 3499, 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80', 'Shoes', 'Classic high-top canvas with vulcanized rubber sole.', 4.2, 2543),
  p('sh6', 'Sports Sandals', 1499, 1999, 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&q=80', 'Shoes', 'Adjustable sports sandals with cushioned footbed and arch support.', 4.0, 3456),
  p('sh7', 'Formal Oxford Shoes', 5999, 8999, 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&q=80', 'Shoes', 'Classic leather Oxford shoes with Goodyear welt construction.', 4.5, 1234),
  p('sh8', 'Slip-On Casual Shoes', 1999, 2999, 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&q=80', 'Shoes', 'Comfortable slip-on canvas shoes with memory foam insole.', 4.1, 4567),
  p('sh9', 'Basketball Shoes Pro', 6999, 9999, 'https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=600&q=80', 'Shoes', 'High-performance basketball shoes with ankle support and cushioning.', 4.6, 2345),
  p('sh10', 'Hiking Boots Waterproof', 5499, 7999, 'https://images.unsplash.com/photo-1520219306100-ec4afeeefe58?w=600&q=80', 'Shoes', 'Waterproof leather hiking boots with Vibram outsole.', 4.4, 1678),
  p('sh11', 'Kolhapuri Chappals', 999, 1499, 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&q=80', 'Shoes', 'Handcrafted leather Kolhapuri chappals in traditional design.', 4.3, 5678),
  p('sh12', 'Running Shoes Ultralight', 3999, 5999, 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80', 'Shoes', 'Ultralight running shoes with responsive foam cushioning.', 4.5, 3456),
  p('sh13', 'Flip Flops Premium', 699, 999, 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&q=80', 'Shoes', 'Premium rubber flip flops with textured footbed.', 3.9, 6789),

  // === Home (13) ===
  p('h1', 'Ceramic Pour-Over Coffee Set', 1799, 2499, 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80', 'Home', 'Artisan ceramic pour-over coffee dripper and carafe set.', 4.3, 654),
  p('h2', 'Scented Soy Candle Trio', 1299, 1999, 'https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=600&q=80', 'Home', 'Hand-poured soy candles in cedar, lavender, and vanilla.', 4.5, 1234),
  p('h3', 'Linen Throw Blanket', 2499, 3499, 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80', 'Home', 'Stonewashed European linen throw with fringed edges.', 4.6, 432),
  p('h4', 'Indoor Herb Garden Kit', 1499, 1999, 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80', 'Home', 'Self-watering herb garden with basil, mint, cilantro seeds.', 4.1, 321),
  p('h5', 'Copper Desk Lamp', 3499, 4999, 'https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=600&q=80', 'Home', 'Adjustable copper lamp with warm LED and marble base.', 4.4, 567),
  p('h6', 'Handwoven Wall Tapestry', 3999, 5999, 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=600&q=80', 'Home', 'Bohemian macramé wall hanging from natural cotton rope.', 4.7, 876),
  p('h7', 'Japanese Tea Set', 2299, 2999, 'https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?w=600&q=80', 'Home', 'Traditional ceramic tea set with teapot and four cups.', 4.5, 345),
  p('h8', 'Bamboo Cutting Board Set', 1299, 1999, 'https://images.unsplash.com/photo-1594226801341-41427b4e5c22?w=600&q=80', 'Home', 'Set of 3 organic bamboo cutting boards with juice grooves.', 4.2, 2345),
  p('h9', 'Wall Clock Modern', 1799, 2499, 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=600&q=80', 'Home', 'Minimalist wall clock with silent sweep movement.', 4.3, 1567),
  p('h10', 'Cotton Bedsheet Set', 1999, 2999, 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80', 'Home', '300 thread count Egyptian cotton bedsheet with 2 pillowcases.', 4.4, 3456),
  p('h11', 'Terracotta Planter Set', 999, 1499, 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&q=80', 'Home', 'Set of 3 handcrafted terracotta planters in assorted sizes.', 4.1, 2345),
  p('h12', 'Brass Diya Set', 599, 999, 'https://images.unsplash.com/photo-1604422792558-6c2c10e63e95?w=600&q=80', 'Home', 'Traditional brass diyas for festive decoration, set of 6.', 4.5, 4567),
  p('h13', 'Wooden Photo Frame Set', 1499, 2299, 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&q=80', 'Home', 'Set of 5 wood photo frames in gallery wall arrangement.', 4.0, 1234),

  // === Sports (13) ===
  p('s1', 'Yoga Mat Premium', 1999, 2999, 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&q=80', 'Sports', 'Extra-thick natural rubber yoga mat with alignment markers.', 4.4, 2143),
  p('s2', 'Stainless Steel Water Bottle', 899, 1299, 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80', 'Sports', 'Double-wall insulated bottle, cold 24h / hot 12h.', 4.6, 3876),
  p('s3', 'Cricket Bat English Willow', 4999, 7999, 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&q=80', 'Sports', 'Grade A English willow bat with premium cane handle.', 4.5, 5678),
  p('s4', 'Resistance Band Set', 799, 1299, 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=600&q=80', 'Sports', 'Set of 5 resistance bands for full-body workouts.', 4.2, 987),
  p('s5', 'Fitness Tracker Band', 2999, 4999, 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&q=80', 'Sports', 'Heart rate, sleep tracking, 7-day battery fitness band.', 4.3, 2345),
  p('s6', 'Foam Roller Recovery', 1099, 1699, 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80', 'Sports', 'High-density textured foam roller for muscle recovery.', 4.1, 765),
  p('s7', 'Sports Duffel Bag', 1799, 2499, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80', 'Sports', 'Water-resistant duffel with shoe compartment.', 4.0, 432),
  p('s8', 'Badminton Racket Pro', 2999, 4499, 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&q=80', 'Sports', 'Lightweight carbon fiber racket with nano-tech string.', 4.4, 3456),
  p('s9', 'Football Size 5', 1299, 1799, 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=600&q=80', 'Sports', 'FIFA-approved match ball with thermal bonding.', 4.3, 4567),
  p('s10', 'Gym Gloves with Wrist Support', 699, 999, 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80', 'Sports', 'Breathable mesh gym gloves with padded palm and wrist wrap.', 4.1, 2345),
  p('s11', 'Skipping Rope Speed', 499, 799, 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=600&q=80', 'Sports', 'Adjustable speed rope with ball bearings and foam handles.', 4.2, 5678),
  p('s12', 'Dumbbells Set 10kg Pair', 2499, 3499, 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80', 'Sports', 'Rubber-coated hex dumbbells, anti-roll design.', 4.5, 1876),
  p('s13', 'Table Tennis Set', 1499, 2199, 'https://images.unsplash.com/photo-1558657795-32a1da21ee96?w=600&q=80', 'Sports', 'Pro table tennis set with 2 rackets, 3 balls and net.', 4.0, 1234),

  // === Appliances (13) ===
  p('a1', 'Air Fryer 4.5L Digital', 4999, 7999, 'https://images.unsplash.com/photo-1648655986109-2e867644c31a?w=600&q=80', 'Appliances', 'Digital air fryer with 8 preset programs and rapid air tech.', 4.5, 6789),
  p('a2', 'Instant Pot Pressure Cooker', 5999, 8999, 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=600&q=80', 'Appliances', '7-in-1 electric pressure cooker with 14 smart programs.', 4.6, 4567),
  p('a3', 'Robot Vacuum Cleaner', 14999, 24999, 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80', 'Appliances', 'Smart robot vacuum with LiDAR navigation and mopping.', 4.3, 2345),
  p('a4', 'Hand Blender 1000W', 1999, 2999, 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&q=80', 'Appliances', 'Powerful hand blender with multiple attachments and variable speed.', 4.2, 3456),
  p('a5', 'Electric Kettle 1.5L', 1299, 1999, 'https://images.unsplash.com/photo-1594226801341-41427b4e5c22?w=600&q=80', 'Appliances', 'Stainless steel electric kettle with temperature control.', 4.4, 5678),
  p('a6', 'Mixer Grinder 750W', 3499, 4999, 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&q=80', 'Appliances', '3-jar mixer grinder with overload protection.', 4.3, 7890),
  p('a7', 'Microwave Oven 25L', 7999, 11999, 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=600&q=80', 'Appliances', 'Convection microwave with 200 auto-cook recipes.', 4.1, 3456),
  p('a8', 'Induction Cooktop', 2499, 3499, 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80', 'Appliances', '2100W induction cooktop with 7 preset menus and timer.', 4.2, 4567),
  p('a9', 'Water Purifier RO+UV', 9999, 14999, 'https://images.unsplash.com/photo-1585007600263-71228e4e8d74?w=600&q=80', 'Appliances', '8-stage RO+UV+UF water purifier with mineral enhancer.', 4.5, 5678),
  p('a10', 'Iron Box Steam', 1499, 2299, 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=600&q=80', 'Appliances', 'Steam iron with ceramic soleplate and anti-drip feature.', 4.0, 2345),
  p('a11', 'Sandwich Maker 3-in-1', 1799, 2499, 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&q=80', 'Appliances', 'Sandwich, grill and waffle maker with non-stick plates.', 4.3, 3456),
  p('a12', 'Ceiling Fan BLDC Energy Saver', 3999, 5999, 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80', 'Appliances', 'BLDC motor ceiling fan with remote, saves 65% energy.', 4.4, 6789),
  p('a13', 'Toaster 2-Slice', 1299, 1799, 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&q=80', 'Appliances', 'Pop-up toaster with 7 browning levels and defrost function.', 4.1, 2345),

  // === Beauty (13) ===
  p('b1', 'Face Serum Vitamin C', 799, 1299, 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80', 'Beauty', '20% Vitamin C serum with hyaluronic acid for glowing skin.', 4.4, 8765),
  p('b2', 'Hair Dryer Professional 2200W', 2999, 4499, 'https://images.unsplash.com/photo-1522338140-7f76603237c1?w=600&q=80', 'Beauty', 'Ionic hair dryer with 3 heat settings and cool shot button.', 4.3, 3456),
  p('b3', 'Beard Trimmer Kit', 1999, 2999, 'https://images.unsplash.com/photo-1621607512214-68297480165e?w=600&q=80', 'Beauty', 'Cordless beard trimmer with 20 length settings and titanium blade.', 4.5, 5678),
  p('b4', 'Sunscreen SPF 50+ PA+++', 499, 799, 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80', 'Beauty', 'Lightweight matte sunscreen with no white cast, 80ml.', 4.2, 12345),
  p('b5', 'Hair Straightener Ceramic', 1799, 2799, 'https://images.unsplash.com/photo-1522338140-7f76603237c1?w=600&q=80', 'Beauty', 'Ceramic plate straightener with adjustable temp up to 230°C.', 4.1, 2345),
  p('b6', 'Lipstick Matte Set of 6', 899, 1499, 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&q=80', 'Beauty', 'Long-lasting matte lipsticks in 6 trending shades.', 4.3, 4567),
  p('b7', 'Face Wash Charcoal', 349, 499, 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80', 'Beauty', 'Activated charcoal face wash for deep pore cleansing.', 4.0, 6789),
  p('b8', 'Perfume Set Gift Box', 2499, 3999, 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=80', 'Beauty', 'Set of 4 Premium eau de parfum in a luxury gift box.', 4.6, 2345),
  p('b9', 'Night Cream Anti-Aging', 999, 1599, 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80', 'Beauty', 'Retinol + collagen night cream for wrinkle reduction.', 4.2, 3456),
  p('b10', 'Kajal Waterproof', 199, 349, 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&q=80', 'Beauty', 'Smudge-proof waterproof kajal with 12-hour stay.', 4.4, 9876),
  p('b11', 'Body Lotion Shea Butter', 399, 599, 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80', 'Beauty', 'Deep moisturizing body lotion with shea butter and aloe.', 4.1, 5678),
  p('b12', 'Makeup Brush Set 12-Piece', 1299, 1999, 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80', 'Beauty', 'Professional makeup brush set with synthetic bristles and case.', 4.3, 3456),
  p('b13', 'Hair Oil Ayurvedic', 299, 499, 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80', 'Beauty', 'Ayurvedic hair oil with amla, bhringraj, and coconut oil.', 4.5, 7890),
];
