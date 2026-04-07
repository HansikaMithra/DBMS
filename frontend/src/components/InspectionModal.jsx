import React from 'react';
import { X, CheckCircle2, AlertCircle, ClipboardCheck } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '600px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
             <div className="stat-icon" style={{ padding: '0.5rem' }}>
                <ClipboardCheck size={20} />
             </div>
             <h3 className="font-bold text-foreground" style={{ fontSize: '1.25rem' }}>{title}</h3>
          </div>
          <button onClick={onClose} className="modal-close-btn">
            <X size={20} />
          </button>
        </div>
        <div className="modal-body custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

const InspectionModal = ({ isOpen, onClose, formData, handleInputChange, handleSubmit, statusMsg }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Record New Property Inspection">
      <form onSubmit={handleSubmit}>
        <section className="form-group">
          <p className="form-section-title">Inspection Details</p>
          <div className="form-grid">
            <div style={{ gridColumn: '1 / -1' }}>
              <label className="form-label">Hall Name *</label>
              <input 
                required 
                name="hall_name" 
                value={formData.hall_name} 
                onChange={handleInputChange} 
                className="glass-input" 
                placeholder="e.g. Hall A" 
              />
            </div>
            <div>
              <label className="form-label">Staff ID *</label>
              <input 
                required 
                type="number" 
                name="staff_id" 
                value={formData.staff_id} 
                onChange={handleInputChange} 
                className="glass-input" 
                placeholder="e.g. 1" 
              />
            </div>
            <div>
              <label className="form-label">Inspection Date *</label>
              <input 
                required 
                type="date" 
                name="date" 
                value={formData.date} 
                onChange={handleInputChange} 
                className="glass-input" 
                style={{ colorScheme: 'dark' }} 
              />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  name="status" 
                  checked={formData.status} 
                  onChange={(e) => handleInputChange({ target: { name: 'status', value: e.target.checked }})} 
                  style={{ width: '1.25rem', height: '1.25rem' }}
                />
                <span className="font-medium">Property is in Satisfactory Condition</span>
              </label>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label className="form-label">Inspection Comments</label>
              <textarea 
                name="comments" 
                value={formData.comments} 
                onChange={handleInputChange} 
                className="glass-input" 
                style={{ minHeight: '100px', paddingTop: '0.75rem' }} 
                placeholder="Describe the condition or issues found..."
              ></textarea>
            </div>
          </div>
        </section>

        {statusMsg.text && (
          <div className={`alert-box animate-fade ${statusMsg.type === 'success' ? 'alert-success' : 'alert-error'}`} style={{ marginBottom: '1.5rem', marginTop: '1.5rem' }}>
            {statusMsg.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span>{statusMsg.text}</span>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid hsla(var(--glass-border), 0.3)' }}>
          <button type="button" onClick={onClose} className="btn-ghost">Cancel</button>
          <button type="submit" className="btn-primary">
            Save Inspection Record
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default InspectionModal;
