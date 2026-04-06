import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, AlertCircle, Edit } from 'lucide-react';

const EditRowModal = ({ isOpen, onClose, currentData, handleUpdate, statusMsg }) => {
  const [formData, setFormData] = useState({});

  // Sync state when modal opens with new data
  useEffect(() => {
    if (currentData) {
      setFormData(currentData);
    }
  }, [currentData, isOpen]);

  if (!isOpen || !currentData) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleUpdate(formData);
  };

  // Exclude primary keys or un-updatable fields visually if logic dictates, 
  // but for simplicity we render inputs for all string/number values
  const fields = Object.keys(formData).filter(key => 
      typeof formData[key] !== 'object' && 
      key !== 'idKey' && key !== 'primaryValue' // internal metadata we might inject
  );

  return (
    <div className="modal-overlay">
      <div className="modal-content animate-modal-in">
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
             <div className="stat-icon" style={{ padding: '0.5rem' }}>
                <Edit size={20} />
             </div>
             <h3 className="font-bold text-foreground" style={{ fontSize: '1.25rem' }}>Update Record</h3>
          </div>
          <button onClick={onClose} className="modal-close-btn" type="button">
            <X size={20} />
          </button>
        </div>
        
        <div className="modal-body custom-scrollbar">
          <form onSubmit={onSubmit}>
            <div className="form-grid">
              {fields.map(key => (
                <div key={key}>
                  <label className="form-label">{key.replace(/_/g, ' ').toUpperCase()}</label>
                  <input 
                    name={key} 
                    value={formData[key] || ''} 
                    onChange={handleChange} 
                    className="glass-input" 
                  />
                </div>
              ))}
            </div>

            {statusMsg && statusMsg.text && (
              <div className={`alert-box animate-fade ${statusMsg.type === 'success' ? 'alert-success' : 'alert-error'}`} style={{ marginTop: '1.5rem' }}>
                {statusMsg.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                <span>{statusMsg.text}</span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid hsla(var(--glass-border), 0.3)' }}>
              <button type="button" onClick={onClose} className="btn-ghost">Cancel</button>
              <button type="submit" className="btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditRowModal;
