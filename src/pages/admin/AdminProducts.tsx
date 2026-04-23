import { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Pencil, Trash2, X, Save } from 'lucide-react';
import { products as defaultProducts, categories, Product } from '@/data/products';
import { toast } from 'sonner';

const AdminProducts = () => {
  const [productList, setProductList] = useState<Product[]>(defaultProducts);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('All');
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const emptyProduct: Product = {
    id: '', name: '', price: 0, originalPrice: 0, image: '', category: 'Electronics',
    description: '', stockQuantity: 10, rating: 4.0, reviewCount: 0,
  };

  const filtered = useMemo(() => {
    let result = productList;
    if (filterCat !== 'All') result = result.filter((p) => p.category === filterCat);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q));
    }
    return result;
  }, [productList, filterCat, search]);

  const handleSave = (product: Product) => {
    if (!product.name || !product.price) { toast.error('Name and price are required'); return; }
    if (isAdding) {
      const newP = { ...product, id: `custom-${Date.now()}`, reviewCount: 0 };
      setProductList([newP, ...productList]);
      toast.success('Product added!');
    } else {
      setProductList(productList.map((p) => (p.id === product.id ? product : p)));
      toast.success('Product updated!');
    }
    setEditProduct(null);
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    setProductList(productList.filter((p) => p.id !== id));
    toast.success('Product deleted');
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>Products ({productList.length})</h1>
        <button onClick={() => { setIsAdding(true); setEditProduct({ ...emptyProduct }); }} className="btn-primary flex items-center gap-2 px-4 py-2 text-sm">
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className="w-full rounded-xl border pl-10 pr-4 py-2.5 text-sm outline-none focus:border-primary" />
        </div>
        <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)} className="rounded-xl border px-3 py-2.5 text-sm outline-none bg-card focus:border-primary">
          <option>All</option>
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* Product Table */}
      <div className="rounded-xl border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left px-4 py-3 font-semibold">Product</th>
                <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Category</th>
                <th className="text-right px-4 py-3 font-semibold">Price</th>
                <th className="text-right px-4 py-3 font-semibold hidden md:table-cell">Stock</th>
                <th className="text-right px-4 py-3 font-semibold hidden md:table-cell">Rating</th>
                <th className="text-center px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 50).map((product) => (
                <tr key={product.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={product.image} alt={product.name} className="h-10 w-10 rounded-lg object-cover" />
                      <span className="font-medium truncate max-w-[200px]">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell"><span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium">{product.category}</span></td>
                  <td className="px-4 py-3 text-right font-semibold">₹{product.price.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3 text-right hidden md:table-cell">{product.stockQuantity}</td>
                  <td className="px-4 py-3 text-right hidden md:table-cell">⭐ {product.rating}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => { setIsAdding(false); setEditProduct({ ...product }); }} className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"><Pencil className="h-3.5 w-3.5" /></button>
                      <button onClick={() => handleDelete(product.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length > 50 && <p className="text-xs text-muted-foreground text-center py-3">Showing 50 of {filtered.length} products</p>}
      </div>

      {/* Edit/Add Modal — portaled to document.body to avoid overflow clipping */}
      {createPortal(
        <AnimatePresence>
          {editProduct && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 z-[9998]" onClick={() => { setEditProduct(null); setIsAdding(false); }} />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-card rounded-2xl border shadow-2xl z-[9999] p-6 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">{isAdding ? 'Add Product' : 'Edit Product'}</h3>
                <button onClick={() => { setEditProduct(null); setIsAdding(false); }} className="p-1 hover:bg-muted rounded-lg"><X className="h-5 w-5" /></button>
              </div>
              <div className="space-y-3">
                <div><label className="block text-sm font-medium mb-1">Name *</label><input type="text" value={editProduct.name} onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })} className="w-full rounded-xl border px-3 py-2 text-sm outline-none focus:border-primary" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="block text-sm font-medium mb-1">Price (₹) *</label><input type="number" value={editProduct.price} onChange={(e) => setEditProduct({ ...editProduct, price: +e.target.value })} className="w-full rounded-xl border px-3 py-2 text-sm outline-none focus:border-primary" /></div>
                  <div><label className="block text-sm font-medium mb-1">Original Price</label><input type="number" value={editProduct.originalPrice || ''} onChange={(e) => setEditProduct({ ...editProduct, originalPrice: +e.target.value })} className="w-full rounded-xl border px-3 py-2 text-sm outline-none focus:border-primary" /></div>
                </div>
                <div><label className="block text-sm font-medium mb-1">Category</label>
                  <select value={editProduct.category} onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })} className="w-full rounded-xl border px-3 py-2 text-sm outline-none bg-card focus:border-primary">
                    {categories.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div><label className="block text-sm font-medium mb-1">Image URL</label><input type="url" value={editProduct.image} onChange={(e) => setEditProduct({ ...editProduct, image: e.target.value })} placeholder="https://..." className="w-full rounded-xl border px-3 py-2 text-sm outline-none focus:border-primary" /></div>
                <div><label className="block text-sm font-medium mb-1">Description</label><textarea value={editProduct.description} onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })} rows={3} className="w-full rounded-xl border px-3 py-2 text-sm outline-none focus:border-primary resize-none" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="block text-sm font-medium mb-1">Stock</label><input type="number" value={editProduct.stockQuantity} onChange={(e) => setEditProduct({ ...editProduct, stockQuantity: +e.target.value })} className="w-full rounded-xl border px-3 py-2 text-sm outline-none focus:border-primary" /></div>
                  <div><label className="block text-sm font-medium mb-1">Rating</label><input type="number" step="0.1" min="0" max="5" value={editProduct.rating} onChange={(e) => setEditProduct({ ...editProduct, rating: +e.target.value })} className="w-full rounded-xl border px-3 py-2 text-sm outline-none focus:border-primary" /></div>
                </div>
                <button onClick={() => handleSave(editProduct)} className="btn-primary w-full flex items-center justify-center gap-2 py-2.5 text-sm mt-2">
                  <Save className="h-4 w-4" /> {isAdding ? 'Add Product' : 'Save Changes'}
                </button>
              </div>
            </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};

export default AdminProducts;
