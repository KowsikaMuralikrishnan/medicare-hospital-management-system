import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Package, Plus, Search, Edit2, AlertTriangle, X, Save, CheckCircle } from 'lucide-react';

export default function PharmacyInventory() {
  const { inventory, updateInventoryItem, addInventoryItem } = useData();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [showAdd, setShowAdd] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ name: '', category: '', stock: '', unit: '', price: '', reorderLevel: '', supplier: '', expiryDate: '' });

  const categories = ['All', ...new Set(inventory.map(i => i.category))];
  const filtered = inventory.filter(i => {
    const matchSearch = i.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = filter === 'all' || filter === 'All' || i.category === filter;
    return matchSearch && matchCat;
  });

  const lowStock = inventory.filter(i => i.stock <= i.reorderLevel);

  const handleAdd = () => {
    if (!form.name || !form.stock) return;
    addInventoryItem({
      name: form.name,
      category: form.category || 'General',
      stock: parseInt(form.stock),
      unit: form.unit || 'units',
      price: parseFloat(form.price) || 0,
      reorderLevel: parseInt(form.reorderLevel) || 50,
      supplier: form.supplier || 'Unknown',
      expiryDate: form.expiryDate || '2027-12-31',
    });
    setShowAdd(false);
    setForm({ name: '', category: '', stock: '', unit: '', price: '', reorderLevel: '', supplier: '', expiryDate: '' });
  };

  const handleEdit = () => {
    if (!editItem) return;
    updateInventoryItem(editItem.id, {
      stock: parseInt(form.stock) || editItem.stock,
      price: parseFloat(form.price) || editItem.price,
      reorderLevel: parseInt(form.reorderLevel) || editItem.reorderLevel,
    });
    setEditItem(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-800">Pharmacy Inventory</h1>
          <p className="text-surface-400 mt-1">Manage medicine stock levels</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="btn btn-primary"><Plus className="w-4 h-4" /> Add Item</button>
      </div>

      {lowStock.length > 0 && (
        <div className="p-4 bg-warning-50 border border-warning-100 rounded-xl flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-warning-500 shrink-0" />
          <p className="text-sm text-warning-700"><strong>{lowStock.length} items</strong> are below reorder level and need restocking.</p>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search medicines..." className="input pl-10" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filter === cat ? 'bg-purple-500 text-white' : 'bg-surface-100 text-surface-500 hover:bg-surface-200'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr><th>Medicine</th><th>Category</th><th>Stock</th><th>Unit</th><th>Price</th><th>Reorder Level</th><th>Supplier</th><th>Expiry</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filtered.map(item => (
              <tr key={item.id}>
                <td className="font-medium text-surface-800">{item.name}</td>
                <td><span className="badge badge-neutral">{item.category}</span></td>
                <td>
                  <span className={`font-semibold ${item.stock <= item.reorderLevel ? 'text-danger-500' : 'text-surface-700'}`}>
                    {item.stock}
                  </span>
                  {item.stock <= item.reorderLevel && <AlertTriangle className="w-3 h-3 text-danger-400 inline ml-1" />}
                </td>
                <td>{item.unit}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>{item.reorderLevel}</td>
                <td>{item.supplier}</td>
                <td>{item.expiryDate}</td>
                <td>
                  <button onClick={() => { setEditItem(item); setForm({ stock: item.stock.toString(), price: item.price.toString(), reorderLevel: item.reorderLevel.toString() }); }} className="btn btn-secondary btn-sm">
                    <Edit2 className="w-3 h-3" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {(showAdd || editItem) && (
        <div className="modal-overlay" onClick={() => { setShowAdd(false); setEditItem(null); }}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="text-lg font-bold text-surface-800">{editItem ? 'Edit Item' : 'Add New Item'}</h3>
              <button onClick={() => { setShowAdd(false); setEditItem(null); }} className="p-1 hover:bg-surface-100 rounded-lg"><X className="w-5 h-5 text-surface-400" /></button>
            </div>
            <div className="modal-body space-y-3">
              {showAdd && (
                <>
                  <div><label className="block text-sm font-medium text-surface-600 mb-1">Name *</label><input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="input" /></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className="block text-sm font-medium text-surface-600 mb-1">Category</label><input value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className="input" /></div>
                    <div><label className="block text-sm font-medium text-surface-600 mb-1">Unit</label><input value={form.unit} onChange={e => setForm(p => ({ ...p, unit: e.target.value }))} placeholder="tablets" className="input" /></div>
                  </div>
                  <div><label className="block text-sm font-medium text-surface-600 mb-1">Supplier</label><input value={form.supplier} onChange={e => setForm(p => ({ ...p, supplier: e.target.value }))} className="input" /></div>
                  <div><label className="block text-sm font-medium text-surface-600 mb-1">Expiry Date</label><input type="date" value={form.expiryDate} onChange={e => setForm(p => ({ ...p, expiryDate: e.target.value }))} className="input" /></div>
                </>
              )}
              <div className="grid grid-cols-3 gap-3">
                <div><label className="block text-sm font-medium text-surface-600 mb-1">Stock *</label><input type="number" value={form.stock} onChange={e => setForm(p => ({ ...p, stock: e.target.value }))} className="input" /></div>
                <div><label className="block text-sm font-medium text-surface-600 mb-1">Price ($)</label><input type="number" step="0.01" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} className="input" /></div>
                <div><label className="block text-sm font-medium text-surface-600 mb-1">Reorder Level</label><input type="number" value={form.reorderLevel} onChange={e => setForm(p => ({ ...p, reorderLevel: e.target.value }))} className="input" /></div>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={() => { setShowAdd(false); setEditItem(null); }} className="btn btn-secondary">Cancel</button>
              <button onClick={editItem ? handleEdit : handleAdd} className="btn btn-primary"><Save className="w-4 h-4" /> {editItem ? 'Update' : 'Add Item'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
