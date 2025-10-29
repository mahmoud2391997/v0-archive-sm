import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../App';
import CustomerModal from '../components/CustomerModal';
import { ChatIcon, PencilIcon } from '../components/Icon';
import { useToasts } from '../components/Toast';
import { PROJECTS } from '../services/mockData';
import { AppDispatch, RootState } from '../src/store';
import { createCustomer, deleteCustomer, fetchCustomers, setParams, updateCustomer } from '../src/store/slices/customersSlice';
import { Branch, Customer, WhatsAppSettings } from '../types';

interface CustomersProps {
    whatsappSettings: WhatsAppSettings;
    branches: Branch[];
}

const Customers: React.FC<CustomersProps> = ({ whatsappSettings, branches }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { addToast } = useToasts();
    const { user } = useContext(AuthContext);
    const { items: customers, loading, error, pagination, params } = useSelector((state: RootState) => state.customers);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [isWhatsappModalOpen, setWhatsappModalOpen] = useState(false);
    const [customerForWhatsapp, setCustomerForWhatsapp] = useState<Customer | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [projectFilter, setProjectFilter] = useState<string>('all');

    // Load customers on mount and when params change
    useEffect(() => {
        dispatch(fetchCustomers({
            q: searchTerm || undefined,
            projectId: projectFilter !== 'all' ? parseInt(projectFilter, 10) : undefined,
            page: params.page,
            limit: params.limit
        }));
    }, [dispatch, searchTerm, projectFilter, params.page, params.limit]);

    const handleSave = async (customer: Customer) => {
        try {
            if (customer.id) {
                await dispatch(updateCustomer({ id: customer.id, data: customer })).unwrap();
                addToast('تم تحديث العميل بنجاح!', 'success');
            } else {
                await dispatch(createCustomer(customer)).unwrap();
                addToast('تم إضافة العميل بنجاح!', 'success');
            }
            setIsModalOpen(false);
            setSelectedCustomer(null);
        } catch (error: any) {
            addToast(error.message || 'حدث خطأ في حفظ العميل', 'error');
        }
    };

    const handleDelete = async (customer: Customer) => {
        if (window.confirm(`هل أنت متأكد من حذف العميل "${customer.name}"؟`)) {
            try {
                await dispatch(deleteCustomer(customer.id)).unwrap();
                addToast('تم حذف العميل بنجاح!', 'success');
            } catch (error: any) {
                addToast(error.message || 'حدث خطأ في حذف العميل', 'error');
            }
        }
    };

    const handleAddNew = () => {
        setSelectedCustomer({} as Customer);
        setIsModalOpen(true);
    };
    
    const handleEdit = (customer: Customer) => {
        setSelectedCustomer(customer);
        setIsModalOpen(true);
    };
    
    const handleOpenWhatsappModal = (customer: Customer) => {
        setCustomerForWhatsapp(customer);
        setWhatsappModalOpen(true);
    };

    const getProjectName = (projectId?: number) => {
        if (!projectId) return 'N/A';
        return PROJECTS.find(p => p.id === projectId)?.name || 'غير معروف';
    };

    const getBranchName = (branchId?: number) => {
        if (!branchId) return 'N/A';
        
        // Try both string and number comparison to handle type mismatches
        const branch = branches.find(b => 
            b.id === String(branchId) || 
            b.id === branchId.toString() ||
            Number(b.id) === branchId
        );
        
        return branch?.name || 'غير معروف';
    };

    const formatBalance = (balance: number) => {
        const color = balance > 0 ? '#ef4444' : balance < 0 ? '#10b981' : 'var(--text-primary)';
        const text = balance > 0 ? `مدين بـ ${balance.toLocaleString()}` : balance < 0 ? `دائن بـ ${(-balance).toLocaleString()}` : 'لا يوجد رصيد';
        return <span style={{ color, fontWeight: 600 }}>{text}</span>;
    };

    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
        dispatch(setParams({ page: 1 })); // Reset to first page on search
    };

    const handleProjectFilterChange = (value: string) => {
        setProjectFilter(value);
        dispatch(setParams({ page: 1 })); // Reset to first page on filter change
    };

    const handlePageChange = (newPage: number) => {
        dispatch(setParams({ page: newPage }));
    };

    return (
        <>
            <div className="glass-pane customers-container" style={{ padding: '1.5rem' }}>
                <div className="customers-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 className="customers-title" style={{ fontSize: '1.25rem', fontWeight: 600 }}>إدارة العملاء</h3>
                     <div className="customers-filters" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <input
                            type="text"
                            placeholder="ابحث بالاسم أو الهاتف..."
                            value={searchTerm}
                            onChange={e => handleSearchChange(e.target.value)}
                            className="form-input customers-search"
                            style={{ width: '250px' }}
                        />
                        <select
                            value={projectFilter}
                            onChange={e => handleProjectFilterChange(e.target.value)}
                            className="form-select customers-filter"
                            style={{ width: '200px' }}
                        >
                            <option value="all">كل المشاريع</option>
                            {PROJECTS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                        </select>
                        <div className="customers-actions">
                            <button onClick={handleAddNew} className="btn btn-primary customers-button">
                                إضافة عميل جديد
                            </button>
                        </div>
                    </div>
                </div>
                <div className="customers-table-wrapper table-wrapper">
                    <table className="customers-table">
                        <thead>
                            <tr>
                                <th>الاسم</th>
                                <th>الهاتف</th>
                                <th>المشروع</th>
                                <th>الفرع</th>
                                <th>أضيف بواسطة</th>
                                <th>الرصيد</th>
                                <th>إجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={7} style={{ textAlign: 'center', padding: '2rem' }}>
                                        جاري التحميل...
                                    </td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan={7} style={{ textAlign: 'center', padding: '2rem', color: '#ef4444' }}>
                                        خطأ في تحميل العملاء: {error}
                                    </td>
                                </tr>
                            ) : customers.length === 0 ? (
                                <tr>
                                    <td colSpan={7} style={{ textAlign: 'center', padding: '2rem' }}>
                                        لا توجد عملاء
                                    </td>
                                </tr>
                            ) : (
                                customers.map((c, index) => (
                                    <tr key={c.id || `customer-${index}`}>
                                        <td>{c.name}</td>
                                        <td>{c.phone}</td>
                                        <td>{getProjectName(c.projectId)}</td>
                                        <td>{getBranchName(c.branchId)}</td>
                                        <td>{c.addedBy}</td>
                                        <td className="customers-balance">{formatBalance(c.balance)}</td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <button onClick={() => handleEdit(c)} style={{color: '#f59e0b', background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem'}} title="تعديل"><PencilIcon style={{width:'20px', height:'20px'}}/></button>
                                                <button onClick={() => handleDelete(c)} style={{color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem'}} title="حذف">🗑️</button>
                                                {whatsappSettings.isEnabled && c.id !== 4 && (
                                                    <button onClick={() => handleOpenWhatsappModal(c)} style={{color: '#10b981', background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem'}} title="إرسال رسالة واتساب"><ChatIcon style={{width:'20px', height:'20px'}}/></button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                
                {/* Pagination */}
                {pagination && pagination.totalPages > 1 && (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                        <button 
                            onClick={() => handlePageChange(pagination.currentPage - 1)}
                            disabled={!pagination.hasPrevPage}
                            className="btn btn-ghost"
                            style={{ opacity: pagination.hasPrevPage ? 1 : 0.5 }}
                        >
                            السابق
                        </button>
                        <span>
                            صفحة {pagination.currentPage} من {pagination.totalPages} 
                            ({pagination.totalItems} عميل)
                        </span>
                        <button 
                            onClick={() => handlePageChange(pagination.currentPage + 1)}
                            disabled={!pagination.hasNextPage}
                            className="btn btn-ghost"
                            style={{ opacity: pagination.hasNextPage ? 1 : 0.5 }}
                        >
                            التالي
                        </button>
                    </div>
                )}
            </div>
            {isModalOpen && (
                <CustomerModal 
                    customer={selectedCustomer}
                    onClose={() => { setIsModalOpen(false); setSelectedCustomer(null); }}
                    onSave={handleSave}
                    branches={branches}
                    existingCustomers={customers}
                    currentUser={user}
                />
            )}
             {isWhatsappModalOpen && customerForWhatsapp && (
                <WhatsAppModal
                    customer={customerForWhatsapp}
                    onClose={() => setWhatsappModalOpen(false)}
                    settings={whatsappSettings}
                />
            )}
        </>
    );
};

// --- WhatsApp Modal Component ---
const WhatsAppModal: React.FC<{customer: Customer, onClose: () => void, settings: WhatsAppSettings}> = ({ customer, onClose, settings }) => {
    const { addToast } = useToasts();
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (!message.trim()) {
            addToast('لا يمكن إرسال رسالة فارغة.', 'error');
            return;
        }
        // This is a simulation of a real API call.
        console.group("WhatsApp API Call Simulation");
        console.log("Endpoint:", `https://graph.facebook.com/vXX.X/${settings.phoneNumberId}/messages`);
        console.log("Authorization:", `Bearer ${settings.apiKey}`);
        console.log("Recipient:", customer.phone);
        console.log("Message:", message);
        console.groupEnd();

        addToast(`تم إرسال الرسالة إلى ${customer.name} (محاكاة).`, 'success');
        onClose();
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content glass-pane" onClick={e => e.stopPropagation()} style={{ maxWidth: '40rem' }}>
                <div className="modal-header">
                    <h2 style={{fontSize: '1.5rem', fontWeight: 600}}>إرسال رسالة واتساب</h2>
                </div>
                <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <p><strong>إلى:</strong> {customer.name} ({customer.phone})</p>
                    <div>
                        <label className="form-label">محتوى الرسالة</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="form-input"
                            rows={5}
                            placeholder="اكتب رسالتك الترويجية هنا..."
                        />
                    </div>
                </div>
                <div className="modal-footer" style={{ justifyContent: 'flex-end', gap: '1rem' }}>
                    <button onClick={onClose} className="btn btn-ghost">إلغاء</button>
                    <button onClick={handleSend} className="btn btn-secondary">إرسال</button>
                </div>
            </div>
        </div>
    );
};

export default Customers;
