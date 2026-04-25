import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Receipt, Plus, Trash2, Printer, CheckCircle, X, DollarSign } from 'lucide-react';

export default function BillingInvoice() {
  const { getAllPatients } = useAuth();
  const { invoices, createInvoice, updateInvoice } = useData();
  const patients = getAllPatients();

  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ patientId: '', items: [{ desc: '', amount: '' }] });
  const [success, setSuccess] = useState(false);

  const addItem = () => setForm(prev => ({ ...prev, items: [...prev.items, { desc: '', amount: '' }] }));
  const removeItem = (i) => setForm(prev => ({ ...prev, items: prev.items.filter((_, idx) => idx !== i) }));
  const updateItem = (i, field, value) => setForm(prev => ({ ...prev, items: prev.items.map((item, idx) => idx === i ? { ...item, [field]: value } : item) }));

  const total = form.items.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);

  const handleCreate = () => {
    if (!form.patientId || form.items.some(i => !i.desc || !i.amount)) return;
    const patient = patients.find(p => p.id === form.patientId);
    createInvoice({
      patientId: form.patientId,
      patientName: patient?.name || 'Unknown',
      items: form.items.map(i => ({ desc: i.desc, amount: parseFloat(i.amount) })),
      total,
    });
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setShowCreate(false);
      setForm({ patientId: '', items: [{ desc: '', amount: '' }] });
    }, 2000);
  };

  const handlePrint = (inv) => {
    const itemsHtml = inv.items.map(i => `<tr><td style="padding:8px;border:1px solid #e5e7eb">${i.desc}</td><td style="padding:8px;border:1px solid #e5e7eb;text-align:right">$${i.amount.toFixed(2)}</td></tr>`).join('');
    const w = window.open('', '_blank');
    w.document.write(`<html><head><title>Invoice ${inv.id}</title><style>body{font-family:Arial,sans-serif;padding:40px;max-width:800px;margin:auto}h1{color:#047857}table{width:100%;border-collapse:collapse;margin:16px 0}th{background:#f0fdf4;padding:8px;text-align:left;border:1px solid #e5e7eb;font-size:13px}td{font-size:13px}.total{font-size:18px;font-weight:bold;text-align:right;margin-top:16px}</style></head><body>
    <h1>MediCare Invoice</h1>
    <p><strong>Invoice #:</strong> ${inv.id}</p>
    <p><strong>Patient:</strong> ${inv.patientName}</p>
    <p><strong>Date:</strong> ${inv.date}</p>
    <p><strong>Status:</strong> ${inv.status}</p>
    <table><thead><tr><th>Description</th><th style="text-align:right">Amount</th></tr></thead><tbody>${itemsHtml}</tbody></table>
    <p class="total">Total: $${inv.total.toFixed(2)}</p>
    <hr style="margin-top:40px;border-color:#e5e7eb"><p style="text-align:center;color:#9ca3af;font-size:12px">MediCare Clinic Management System</p></body></html>`);
    w.document.close();
    w.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-800">Billing & Invoices</h1>
          <p className="text-surface-400 mt-1">Generate invoices and manage billing</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="btn btn-primary"><Plus className="w-4 h-4" /> New Invoice</button>
      </div>

      {/* Create Modal */}
      {showCreate && (
        <div className="modal-overlay" onClick={() => setShowCreate(false)}>
          <div className="modal-content max-w-lg" onClick={e => e.stopPropagation()}>
            {success ? (
              <div className="p-8 text-center">
                <CheckCircle className="w-12 h-12 text-success-500 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-surface-800">Invoice Created!</h3>
              </div>
            ) : (
              <>
                <div className="modal-header">
                  <h3 className="text-lg font-bold text-surface-800">Create Invoice</h3>
                  <button onClick={() => setShowCreate(false)} className="p-1 hover:bg-surface-100 rounded-lg"><X className="w-5 h-5 text-surface-400" /></button>
                </div>
                <div className="modal-body space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-600 mb-1.5">Patient *</label>
                    <select value={form.patientId} onChange={e => setForm(prev => ({ ...prev, patientId: e.target.value }))} className="input">
                      <option value="">Select patient</option>
                      {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-surface-600">Items *</label>
                      <button onClick={addItem} className="btn btn-secondary btn-sm"><Plus className="w-3 h-3" /> Add Item</button>
                    </div>
                    <div className="space-y-2">
                      {form.items.map((item, i) => (
                        <div key={i} className="flex gap-2 items-center">
                          <input value={item.desc} onChange={e => updateItem(i, 'desc', e.target.value)} placeholder="Description" className="input flex-1 text-sm" />
                          <input value={item.amount} onChange={e => updateItem(i, 'amount', e.target.value)} placeholder="Amount" type="number" className="input w-24 text-sm" />
                          {form.items.length > 1 && (
                            <button onClick={() => removeItem(i)} className="p-1.5 hover:bg-danger-50 rounded-lg">
                              <Trash2 className="w-3.5 h-3.5 text-danger-400" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-3 bg-surface-50 rounded-xl flex items-center justify-between">
                    <span className="font-semibold text-surface-700">Total</span>
                    <span className="text-xl font-bold text-primary-600">${total.toFixed(2)}</span>
                  </div>
                </div>
                <div className="modal-footer">
                  <button onClick={() => setShowCreate(false)} className="btn btn-secondary">Cancel</button>
                  <button onClick={handleCreate} className="btn btn-primary"><Receipt className="w-4 h-4" /> Create Invoice</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Invoices Table */}
      {invoices.length === 0 ? (
        <div className="card">
          <div className="card-body text-center py-12">
            <Receipt className="w-12 h-12 text-surface-200 mx-auto mb-3" />
            <p className="text-surface-500">No invoices yet</p>
          </div>
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Patient</th>
                <th>Date</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map(inv => (
                <tr key={inv.id}>
                  <td className="font-medium text-surface-800">{inv.id}</td>
                  <td>{inv.patientName}</td>
                  <td>{inv.date}</td>
                  <td>{inv.items.length} item(s)</td>
                  <td className="font-semibold text-surface-800">${inv.total.toFixed(2)}</td>
                  <td><span className={`badge ${inv.status === 'paid' ? 'badge-success' : 'badge-warning'}`}>{inv.status}</span></td>
                  <td>
                    <div className="flex gap-1">
                      {inv.status === 'pending' && (
                        <button onClick={() => updateInvoice(inv.id, { status: 'paid', paymentMethod: 'Cash' })} className="btn btn-primary btn-sm">
                          <DollarSign className="w-3 h-3" /> Pay
                        </button>
                      )}
                      <button onClick={() => handlePrint(inv)} className="btn btn-secondary btn-sm">
                        <Printer className="w-3 h-3" /> Print
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
