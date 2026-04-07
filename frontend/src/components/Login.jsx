import React, { useState } from 'react';
import axios from 'axios';
import { UserCircle, Lock, ShieldCheck, AlertCircle } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post('/api/login', { email, password });
      if (res.data.success) {
        onLogin(res.data.user);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Connection to server failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0d2a4a 0%, #174261 100%)',
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        background: 'white',
        border: '4px solid #00acb1',
        boxShadow: '20px 20px 0px rgba(0, 0, 0, 0.2)',
        padding: '40px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ 
            display: 'inline-flex', 
            padding: '15px', 
            background: '#f0f9fa', 
            border: '2px solid #00acb1', 
            marginBottom: '15px' 
          }}>
            <ShieldCheck size={40} color="#00acb1" />
          </div>
          <h1 style={{ 
            fontSize: '24px', 
            fontWeight: '800', 
            color: '#0d2a4a', 
            margin: '0',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Staff Portal
          </h1>
          <p style={{ color: '#64748b', fontSize: '14px', marginTop: '5px' }}>
            University Accommodation Management
          </p>
        </div>

        {error && (
          <div style={{
            background: '#fee2e2',
            borderLeft: '4px solid #ef4444',
            padding: '12px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: '#991b1b',
            fontSize: '14px',
            fontWeight: '600'
          }}>
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '12px', 
              fontWeight: '700', 
              color: '#0d2a4a', 
              textTransform: 'uppercase',
              marginBottom: '8px'
            }}>
              University Email
            </label>
            <div style={{ position: 'relative' }}>
              <UserCircle size={18} style={{ 
                position: 'absolute', 
                left: '12px', 
                top: '50%', 
                transform: 'translateY(-50%)',
                color: '#94a3b8'
              }} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="staff@univ.edu"
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 40px',
                  border: '2px solid #e2e8f0',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#00acb1'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              />
            </div>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '12px', 
              fontWeight: '700', 
              color: '#0d2a4a', 
              textTransform: 'uppercase',
              marginBottom: '8px'
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ 
                position: 'absolute', 
                left: '12px', 
                top: '50%', 
                transform: 'translateY(-50%)',
                color: '#94a3b8'
              }} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 40px',
                  border: '2px solid #e2e8f0',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#00acb1'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              background: '#00acb1',
              color: 'white',
              border: 'none',
              fontSize: '14px',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '4px 4px 0px #087d81',
              transition: 'all 0.1s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseDown={(e) => {
              if (!loading) {
                e.target.style.transform = 'translate(2px, 2px)';
                e.target.style.boxShadow = '2px 2px 0px #087d81';
              }
            }}
            onMouseUp={(e) => {
              if (!loading) {
                e.target.style.transform = 'translate(0px, 0px)';
                e.target.style.boxShadow = '4px 4px 0px #087d81';
              }
            }}
          >
            {loading ? 'Authenticating...' : 'Sign In to Portal'}
          </button>
        </form>

        <div style={{ 
          marginTop: '30px', 
          paddingTop: '20px', 
          borderTop: '1px solid #f1f5f9',
          textAlign: 'center',
          fontSize: '13px',
          color: '#64748b'
        }}>
          Authorized Staff Personnel Only. <br/>
          <span style={{ fontWeight: '700', color: '#0d2a4a' }}>Security Level: High</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
