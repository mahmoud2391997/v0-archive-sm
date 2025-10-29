import React, { useEffect, useState } from 'react';
import { AdjustmentsIcon, CalendarIcon, ChevronDownIcon, ChevronUpIcon, DocumentTextIcon, LocationMarkerIcon, PlusIcon, SearchIcon, TrashIcon, UserIcon, XIcon } from '../components/Icon';
import { useToasts } from '../components/Toast';
import { useAppDispatch, useAppSelector } from '../src/store/hooks';
import { fetchBranches } from '../src/store/slices/branchSlice';
import { createVoucher, deleteVoucher, fetchVouchers } from '../src/store/slices/vouchersSlice';

const InventoryVouchers: React.FC = () => {
    const dispatch = useAppDispatch();
    const { addToast } = useToasts();
    const vouchers = useAppSelector(s => s.vouchers.items);
    const branches = useAppSelector(s => s.branches.branches);
    const [filters, setFilters] = useState({
        search: '',
        branch: 'all',
        source: 'all',
        warehouse: 'all',
        client: 'all',
        id: '',
        supplier: 'all'
    });
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [newVoucher, setNewVoucher] = useState<{ date: string; type: 'up'|'down'; branchId: string; description?: string; details?: string }>({
        date: new Date().toISOString(),
        type: 'up',
        branchId: '',
        description: '',
        details: ''
    });
    const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});

    useEffect(() => {
        dispatch(fetchVouchers());
        if (!branches?.length) dispatch(fetchBranches({ page: 1, limit: 100 }));
    }, [dispatch]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFilters(prev => ({...prev, [e.target.name]: e.target.value}));
    };
    
    // Validation functions
    const validateVoucher = (voucher: typeof newVoucher): {[key: string]: string} => {
        const errors: {[key: string]: string} = {};
        
        if (!voucher.branchId || voucher.branchId === '') {
            errors.branchId = 'يرجى اختيار الفرع';
        }
        
        if (!voucher.description || voucher.description.trim() === '') {
            errors.description = 'وصف الإذن مطلوب';
        } else if (voucher.description.trim().length < 3) {
            errors.description = 'وصف الإذن يجب أن يكون 3 أحرف على الأقل';
        }
        
        if (voucher.details && voucher.details.trim().length > 500) {
            errors.details = 'التفاصيل يجب أن تكون أقل من 500 حرف';
        }
        
        return errors;
    };

    const handleVoucherChange = (field: string, value: string) => {
        setNewVoucher(prev => ({...prev, [field]: value}));
        
        // Clear validation error for this field
        if (validationErrors[field]) {
            setValidationErrors(prev => {
                const newErrors = {...prev};
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const handleCreateVoucher = () => {
        const errors = validateVoucher(newVoucher);
        setValidationErrors(errors);
        
        if (Object.keys(errors).length > 0) {
            addToast('يرجى تصحيح الأخطاء قبل المتابعة', 'error');
                                    return;
                                }
        
                                dispatch(createVoucher({
                                    date: newVoucher.date,
                                    type: newVoucher.type,
                                    branchId: newVoucher.branchId,
                                    description: newVoucher.description,
                                    details: newVoucher.details,
                                } as any))
                                  .unwrap()
          .then(() => { 
              addToast('تم إنشاء إذن مخزني بنجاح', 'success'); 
              setNewVoucher({
                  date: new Date().toISOString(),
                  type: 'up',
                  branchId: '',
                  description: '',
                  details: ''
              });
              setValidationErrors({});
              setIsCreateModalOpen(false);
              dispatch(fetchVouchers()); 
          })
          .catch(() => addToast('فشل في إنشاء الإذن', 'error'));
    };

    const handleCloseModal = () => {
        setIsCreateModalOpen(false);
        setNewVoucher({
            date: new Date().toISOString(),
            type: 'up',
            branchId: '',
            description: '',
            details: ''
        });
        setValidationErrors({});
    };
    
    return (
        <div className="inventory-vouchers-container-enhanced">
            {/* Enhanced Header */}
            <div className="inventory-vouchers-header-enhanced">
                <div className="inventory-vouchers-title-section">
                    <h1 className="inventory-vouchers-title">
                        <DocumentTextIcon style={{ width: '28px', height: '28px', marginLeft: '0.75rem' }} />
                        إدارة الإذون المخزنية
                    </h1>
                    <p className="inventory-vouchers-subtitle">
                        إدارة وإصدار إذون الإضافة والصرف للمخزون
                    </p>
                        </div>
                
                {/* Enhanced Search */}
                <div className="inventory-vouchers-search-enhanced">
                    <div className="search-input-wrapper">
                        <SearchIcon className="search-icon" />
                        <input 
                            type="text" 
                            name="search" 
                            placeholder="ابحث في الإذون..." 
                            value={filters.search} 
                            onChange={handleFilterChange} 
                            className="search-input-enhanced"
                        />
                    </div>
                </div>
            </div>

            {/* Create Voucher Button */}
            <div className="inventory-vouchers-actions">
                <button 
                    className="btn btn-primary-enhanced create-voucher-main-btn"
                    onClick={() => setIsCreateModalOpen(true)}
                >
                    <PlusIcon style={{ width: '20px', height: '20px', marginLeft: '0.5rem' }} />
                    إنشاء إذن مخزني جديد
                </button>
            </div>
            {/* Enhanced Filters */}
            <div className="inventory-vouchers-filters-enhanced">
                <div className="filters-header">
                    <h3 className="filters-title">
                        <AdjustmentsIcon style={{ width: '20px', height: '20px', marginLeft: '0.5rem' }} />
                        فلاتر البحث
                    </h3>
                    <button 
                        className="btn btn-ghost btn-sm clear-filters-btn"
                        onClick={() => setFilters({
                            search: '',
                            branch: 'all',
                            source: 'all',
                            warehouse: 'all',
                            client: 'all',
                            id: '',
                            supplier: 'all'
                        })}
                    >
                        مسح الفلاتر
                    </button>
                </div>
                
                <div className="filters-grid">
                    <div className="filter-group">
                        <label className="filter-label">
                            <LocationMarkerIcon style={{ width: '14px', height: '14px', marginLeft: '0.25rem' }} />
                            الفرع
                        </label>
                        <select name="branch" value={filters.branch} onChange={handleFilterChange} className="filter-select">
                            <option value="all">🏢 كل الفروع</option>
                            {(branches || []).map((b: any) => (
                                <option key={String(b._id || b.id)} value={String(b._id || b.id)}>
                                    🏪 {b.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="filter-group">
                        <label className="filter-label">مصدر الإذن</label>
                        <select name="source" value={filters.source} onChange={handleFilterChange} className="filter-select">
                            <option value="all">📋 كل المصادر</option>
                            <option value="manual">✋ يدوي</option>
                            <option value="system">🤖 تلقائي</option>
                        </select>
                    </div>
                    
                    <div className="filter-group">
                        <label className="filter-label">المستودع</label>
                        <select name="warehouse" value={filters.warehouse} onChange={handleFilterChange} className="filter-select">
                            <option value="all">🏭 كل المستودعات</option>
                        </select>
                    </div>
                    
                    <div className="filter-group">
                        <label className="filter-label">العميل</label>
                        <select name="client" value={filters.client} onChange={handleFilterChange} className="filter-select">
                            <option value="all">👥 كل العملاء</option>
                        </select>
                    </div>
                    
                    <div className="filter-group">
                        <label className="filter-label">الرقم المعرف</label>
                        <input 
                            type="text" 
                            name="id" 
                            placeholder="أدخل الرقم المعرف..." 
                            value={filters.id} 
                            onChange={handleFilterChange} 
                            className="filter-input" 
                        />
                    </div>
                    
                    <div className="filter-group">
                        <label className="filter-label">المورد</label>
                        <select name="supplier" value={filters.supplier} onChange={handleFilterChange} className="filter-select">
                            <option value="all">🏢 كل الموردين</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Enhanced Vouchers List */}
            <div className="inventory-vouchers-list-enhanced">
                <div className="vouchers-list-header">
                    <h3 className="vouchers-list-title">
                        <DocumentTextIcon style={{ width: '20px', height: '20px', marginLeft: '0.5rem' }} />
                        قائمة الإذون المخزنية ({vouchers.length})
                    </h3>
                </div>
                
                <div className="vouchers-grid">
                {vouchers.map((voucher: any) => (
                        <div key={String(voucher._id || voucher.id)} className="voucher-card-enhanced">
                            <div className="voucher-card-header">
                                <div className="voucher-type-indicator">
                                    <div className={`voucher-type-icon ${voucher.type === 'up' ? 'voucher-add' : 'voucher-remove'}`}>
                            {voucher.type === 'up' ? 
                                            <ChevronUpIcon style={{width: 24, height: 24}} /> : 
                                            <ChevronDownIcon style={{width: 24, height: 24}} />}
                                    </div>
                                    <div className="voucher-type-text">
                                        <span className="voucher-type-label">
                                            {voucher.type === 'up' ? 'إذن إضافة' : 'إذن صرف'}
                                        </span>
                                        <span className="voucher-id">#{String(voucher._id || voucher.id).slice(-8)}</span>
                                    </div>
                                </div>
                                
                                <div className="voucher-status">
                                    <span className={`status-badge status-${voucher.status?.toLowerCase() || 'draft'}`}>
                                        {voucher.status || 'مسودة'}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="voucher-card-content">
                                <div className="voucher-description">
                                    <h4 className="voucher-title">
                                        {voucher.description || 'إذن مخزني'}
                                    </h4>
                                    {voucher.details && (
                                        <p className="voucher-details">
                                            {voucher.details}
                                        </p>
                                    )}
                                </div>
                                
                                <div className="voucher-meta">
                                    <div className="voucher-meta-item">
                                        <LocationMarkerIcon style={{ width: '16px', height: '16px', marginLeft: '0.25rem' }} />
                                        <span>{branches.find((b: any) => String(b._id || b.id) === String(voucher.branchId))?.name || 'غير محدد'}</span>
                                    </div>
                                    
                                    <div className="voucher-meta-item">
                                        <CalendarIcon style={{ width: '16px', height: '16px', marginLeft: '0.25rem' }} />
                                        <span>{new Date(voucher.date).toLocaleDateString('ar-EG')}</span>
                                    </div>
                                    
                                    {voucher.createdBy && (
                                        <div className="voucher-meta-item">
                                            <UserIcon style={{ width: '16px', height: '16px', marginLeft: '0.25rem' }} />
                                            <span>{voucher.createdBy}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="voucher-card-actions">
                                <button 
                                    className="btn btn-ghost btn-sm voucher-action-btn"
                                    title="عرض التفاصيل"
                                >
                                    👁️ عرض
                                </button>
                                
                                <button 
                                    className="btn btn-ghost btn-sm voucher-action-btn"
                                    title="تعديل الإذن"
                                >
                                    ✏️ تعديل
                                </button>
                                
                                <button 
                                    className="btn btn-ghost btn-sm voucher-delete-btn"
                                    onClick={() => {
                                        const id = String(voucher._id || voucher.id);
                                        dispatch(deleteVoucher(id))
                                          .unwrap()
                                          .then(() => { 
                                              addToast('تم حذف الإذن بنجاح', 'success'); 
                                              dispatch(fetchVouchers()); 
                                          })
                                          .catch(() => addToast('فشل في حذف الإذن', 'error'));
                                    }}
                                    title="حذف الإذن"
                                >
                                    <TrashIcon style={{width: 16, height: 16}} />
                                    حذف
                                </button>
                            </div>
                        </div>
                    ))}
                    
                    {vouchers.length === 0 && (
                        <div className="vouchers-empty-state">
                            <div className="empty-state-icon">
                                <DocumentTextIcon style={{ width: '48px', height: '48px' }} />
                            </div>
                            <h3 className="empty-state-title">لا توجد إذون مخزنية</h3>
                            <p className="empty-state-description">
                                لم يتم إنشاء أي إذون مخزنية بعد. ابدأ بإنشاء إذن جديد.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Create Voucher Modal */}
            {isCreateModalOpen && (
                <div className="modal-backdrop" onClick={handleCloseModal}>
                    <div className="modal-content create-voucher-modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2 className="modal-title">
                                <PlusIcon style={{ width: '24px', height: '24px', marginLeft: '0.75rem' }} />
                                إنشاء إذن مخزني جديد
                            </h2>
                            <button 
                                className="modal-close-btn"
                                onClick={handleCloseModal}
                            >
                                <XIcon style={{ width: '20px', height: '20px' }} />
                            </button>
                        </div>
                        
                        <div className="modal-body">
                            <div className="create-voucher-form-modal">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label-enhanced">
                                            <CalendarIcon style={{ width: '16px', height: '16px', marginLeft: '0.25rem' }} />
                                            التاريخ <span className="required">*</span>
                                        </label>
                                        <input 
                                            type="datetime-local" 
                                            className={`form-input-enhanced ${validationErrors.date ? 'input-error' : ''}`}
                                            value={new Date(newVoucher.date).toISOString().slice(0,16)} 
                                            onChange={e => handleVoucherChange('date', new Date(e.target.value).toISOString())} 
                                        />
                                        {validationErrors.date && (
                                            <div className="error-message">{validationErrors.date}</div>
                                        )}
                                    </div>
                                    
                                    <div className="form-group">
                                        <label className="form-label-enhanced">
                                            <DocumentTextIcon style={{ width: '16px', height: '16px', marginLeft: '0.25rem' }} />
                                            نوع الإذن <span className="required">*</span>
                                        </label>
                                        <select 
                                            className={`form-select-enhanced ${validationErrors.type ? 'input-error' : ''}`}
                                            value={newVoucher.type} 
                                            onChange={e => handleVoucherChange('type', e.target.value)}
                                        >
                                            <option value="up">📈 إذن إضافة</option>
                                            <option value="down">📉 إذن صرف</option>
                                        </select>
                                        {validationErrors.type && (
                                            <div className="error-message">{validationErrors.type}</div>
                                        )}
                                    </div>
                                    
                                    <div className="form-group">
                                        <label className="form-label-enhanced">
                                            <LocationMarkerIcon style={{ width: '16px', height: '16px', marginLeft: '0.25rem' }} />
                                            الفرع <span className="required">*</span>
                                        </label>
                                        <select 
                                            className={`form-select-enhanced ${validationErrors.branchId ? 'input-error' : ''}`}
                                            value={newVoucher.branchId} 
                                            onChange={e => handleVoucherChange('branchId', e.target.value)}
                                        >
                                            <option value="">🏢 اختر الفرع</option>
                                            {(branches || []).map((b: any) => (
                                                <option key={String(b._id || b.id)} value={String(b._id || b.id)}>
                                                    🏪 {b.name}
                                                </option>
                                            ))}
                                        </select>
                                        {validationErrors.branchId && (
                                            <div className="error-message">{validationErrors.branchId}</div>
                                        )}
                                    </div>
                                    
                                    <div className="form-group form-group-full">
                                        <label className="form-label-enhanced">
                                            الوصف <span className="required">*</span>
                                        </label>
                                        <input 
                                            type="text" 
                                            className={`form-input-enhanced ${validationErrors.description ? 'input-error' : ''}`}
                                            placeholder="وصف الإذن..."
                                            value={newVoucher.description || ''} 
                                            onChange={e => handleVoucherChange('description', e.target.value)} 
                                        />
                                        {validationErrors.description && (
                                            <div className="error-message">{validationErrors.description}</div>
                                        )}
                                    </div>
                                    
                                    <div className="form-group form-group-full">
                                        <label className="form-label-enhanced">
                                            التفاصيل
                                        </label>
                                        <textarea 
                                            className={`form-textarea-enhanced ${validationErrors.details ? 'input-error' : ''}`}
                                            placeholder="تفاصيل إضافية..."
                                            value={newVoucher.details || ''} 
                                            onChange={e => handleVoucherChange('details', e.target.value)} 
                                            rows={3}
                                        />
                                        {validationErrors.details && (
                                            <div className="error-message">{validationErrors.details}</div>
                                        )}
                                        <div className="character-count">
                                            {newVoucher.details?.length || 0}/500 حرف
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="modal-footer">
                            <button 
                                className="btn btn-ghost"
                                onClick={handleCloseModal}
                            >
                                إلغاء
                            </button>
                            <button 
                                className="btn btn-primary-enhanced"
                                onClick={handleCreateVoucher}
                            >
                                <PlusIcon style={{ width: '18px', height: '18px', marginLeft: '0.5rem' }} />
                                إنشاء الإذن
                            </button>
                        </div>
                    </div>
            </div>
            )}
        </div>
    );
};

export default InventoryVouchers;
