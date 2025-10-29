import React, { useEffect, useState } from 'react';
import { Supplier, Supply } from '../types';

interface SupplyModalProps {
  supply: Supply | null;
  onClose: () => void;
  onSave: (supply: Supply) => void;
  suppliers: Supplier[];
}

const SupplyModal: React.FC<SupplyModalProps> = ({ supply, onClose, onSave, suppliers }) => {
  const [formData, setFormData] = useState<Supply>({
    id: -1,
    name: '',
    sku: '',
    category: '',
    unitPrice: 0,
    baseUnit: 'pcs',
    supplierId: suppliers[0]?.id || 1,
    description: '',
    density: undefined,
    minStock: undefined,
    reorderPoint: undefined,
    leadTime: undefined,
    createdAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0]
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  useEffect(() => {
    if (supply) {
      setFormData({
        ...supply,
        updatedAt: new Date().toISOString().split('T')[0]
      });
    }
  }, [supply]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    // Handle numeric values
    if (type === 'number') {
      setFormData({
        ...formData,
        [name]: value === '' ? undefined : parseFloat(value)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'اسم المادة مطلوب';
    }
    
    if (!formData.sku.trim()) {
      newErrors.sku = 'الرمز التعريفي مطلوب';
    }
    
    if (!formData.category.trim()) {
      newErrors.category = 'الفئة مطلوبة';
    }
    
    if (formData.unitPrice <= 0) {
      newErrors.unitPrice = 'سعر الوحدة يجب أن يكون أكبر من صفر';
    }
    
    if (!formData.baseUnit) {
      newErrors.baseUnit = 'وحدة القياس مطلوبة';
    }
    
    if (!formData.supplierId) {
      newErrors.supplierId = 'المورد مطلوب';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
    }
  };
  
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content glass-pane" onClick={e => e.stopPropagation()} style={{ width: '800px', maxWidth: '95%', maxHeight: '95vh', overflow: 'auto', borderRadius: '1rem' }}>
        <div className="modal-header" style={{ 
          borderBottom: '1px solid var(--surface-border)', 
          marginBottom: '1.5rem',
          paddingBottom: '1rem',
          background: 'linear-gradient(to right, var(--primary-glow-1) 0%, var(--primary-glow-2) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          <h2 style={{fontSize: '1.75rem', fontWeight: 700, margin: 0}}>{supply ? '✏️ تعديل مادة' : '✨ إضافة مادة جديدة'}</h2>
          <button onClick={onClose} style={{
            background: 'var(--surface-bg)', 
            border: '1px solid var(--surface-border)', 
            color: 'var(--text-secondary)', 
            fontSize: '1.5rem', 
            cursor: 'pointer',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s',
          }} onMouseEnter={(e) => { e.currentTarget.style.background = '#ef4444'; e.currentTarget.style.color = '#fff'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--surface-bg)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div style={{padding: '2rem'}}>
            <div className="form-row" style={{ gap: '1rem', marginBottom: '1.25rem' }}>
              <div className="form-group">
                <label htmlFor="name" style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.875rem' }}>اسم المادة *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input-enhanced"
                  placeholder="أدخل اسم المادة"
                />
                {errors.name && <div className="error-message" style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.name}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="sku" style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.875rem' }}>الرمز التعريفي (SKU) *</label>
                <input
                  type="text"
                  id="sku"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  className="form-input-enhanced"
                  placeholder="مثال: SUP-001"
                />
                {errors.sku && <div className="error-message" style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.sku}</div>}
              </div>
            </div>
            
            <div className="form-row" style={{ gap: '1rem', marginBottom: '1.25rem' }}>
              <div className="form-group">
                <label htmlFor="category" style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.875rem' }}>الفئة *</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="form-input-enhanced"
                  placeholder="مثال: Raw Material"
                />
                {errors.category && <div className="error-message" style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.category}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="supplierId" style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.875rem' }}>المورد *</label>
                <select
                  id="supplierId"
                  name="supplierId"
                  value={formData.supplierId}
                  onChange={handleChange}
                  className="form-select-enhanced"
                >
                  {suppliers.map(supplier => (
                    <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                  ))}
                </select>
                {errors.supplierId && <div className="error-message" style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.supplierId}</div>}
              </div>
            </div>
            
            <div className="form-row" style={{ gap: '1rem', marginBottom: '1.25rem' }}>
              <div className="form-group">
                <label htmlFor="unitPrice" style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.875rem' }}>سعر الوحدة *</label>
                <input
                  type="number"
                  id="unitPrice"
                  name="unitPrice"
                  value={formData.unitPrice}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  className="form-input-enhanced"
                />
                {errors.unitPrice && <div className="error-message" style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.unitPrice}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="baseUnit" style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.875rem' }}>وحدة القياس *</label>
                <select
                  id="baseUnit"
                  name="baseUnit"
                  value={formData.baseUnit}
                  onChange={handleChange}
                  className="form-select-enhanced"
                >
                  <option value="pcs">قطعة</option>
                  <option value="g">جرام</option>
                  <option value="ml">مليلتر</option>
                  <option value="kg">كيلوجرام</option>
                  <option value="l">لتر</option>
                </select>
                {errors.baseUnit && <div className="error-message" style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.baseUnit}</div>}
              </div>
            </div>
            
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="description" style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.875rem' }}>الوصف</label>
              <textarea
                id="description"
                name="description"
                value={formData.description || ''}
                onChange={handleChange}
                rows={3}
                placeholder="وصف إضافي للمادة (اختياري)"
                className="form-textarea-enhanced"
              />
            </div>
            
            <div style={{ 
              marginTop: '2rem', 
              padding: '1.25rem', 
              background: 'linear-gradient(135deg, var(--primary-glow-1) 0%, var(--primary-glow-2) 100%)',
              borderRadius: '0.75rem', 
              border: 'none',
              boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.2)' 
            }}>
              <h4 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 700, color: '#fff' }}>📦 إعدادات المخزون</h4>
              <div className="form-row" style={{ gap: '1rem' }}>
                <div className="form-group">
                  <label htmlFor="minStock" style={{ color: 'rgba(255,255,255,0.95)', fontWeight: 500, marginBottom: '0.5rem', fontSize: '0.875rem' }}>الحد الأدنى للمخزون</label>
                  <input
                    type="number"
                    id="minStock"
                    name="minStock"
                    value={formData.minStock || ''}
                    onChange={handleChange}
                    min="0"
                    placeholder="مثال: 100"
                    className="form-input-enhanced"
                    style={{
                      background: 'rgba(255,255,255,0.15)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      color: '#fff'
                    }}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="reorderPoint" style={{ color: 'rgba(255,255,255,0.95)', fontWeight: 500, marginBottom: '0.5rem', fontSize: '0.875rem' }}>نقطة إعادة الطلب</label>
                  <input
                    type="number"
                    id="reorderPoint"
                    name="reorderPoint"
                    value={formData.reorderPoint || ''}
                    onChange={handleChange}
                    min="0"
                    placeholder="مثال: 150"
                    className="form-input-enhanced"
                    style={{
                      background: 'rgba(255,255,255,0.15)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      color: '#fff'
                    }}
                  />
                </div>
              </div>
            </div>
            
            <div style={{ 
              marginTop: '1.5rem', 
              padding: '1.25rem', 
              background: 'var(--surface-bg)',
              borderRadius: '0.75rem', 
              border: '1px solid var(--surface-border)',
              boxShadow: '0 2px 4px var(--surface-shadow)'
            }}>
              <h4 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>⚙️ تفاصيل تقنية (اختياري)</h4>
              <div className="form-row" style={{ gap: '1rem' }}>
                <div className="form-group">
                  <label htmlFor="density" style={{ color: 'var(--text-primary)', fontWeight: 500, marginBottom: '0.5rem', fontSize: '0.875rem' }}>الكثافة (g/ml)</label>
                  <input
                    type="number"
                    id="density"
                    name="density"
                    value={formData.density || ''}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    placeholder="مثال: 1.0"
                    className="form-input-enhanced"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="leadTime" style={{ color: 'var(--text-primary)', fontWeight: 500, marginBottom: '0.5rem', fontSize: '0.875rem' }}>وقت التوريد (أيام)</label>
                  <input
                    type="number"
                    id="leadTime"
                    name="leadTime"
                    value={formData.leadTime || ''}
                    onChange={handleChange}
                    min="0"
                    placeholder="مثال: 7"
                    className="form-input-enhanced"
                  />
                </div>
              </div>
            </div>
            </div>
          </div>
          
          <div className="modal-footer" style={{
            justifyContent: 'flex-end', 
            gap: '1rem',
            padding: '1.5rem 2rem',
            background: 'var(--surface-bg)',
            borderTop: '1px solid var(--surface-border)',
            marginTop: '2rem'
          }}>
            <button 
              type="button" 
              onClick={onClose} 
              className="btn btn-ghost"
              style={{
                padding: '0.75rem 1.5rem',
                fontSize: '1rem'
              }}
            >
              إلغاء
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              style={{
                padding: '0.75rem 1.5rem',
                fontSize: '1rem'
              }}
            >
              حفظ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SupplyModal;
