import React from 'react';

export default function TestPage() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: 'white', fontSize: '2rem', marginBottom: '1rem' }}>Test Page with Inline Styles</h1>
      
      <p style={{ color: 'lightgray', marginBottom: '1rem' }}>
        This page uses inline styles to test if React rendering is working correctly.
      </p>
      
      <div style={{ 
        backgroundColor: 'rgba(30, 41, 59, 0.8)', 
        padding: '1rem', 
        borderRadius: '0.5rem',
        border: '2px solid #3b82f6',
        marginBottom: '1rem'
      }}>
        <h2 style={{ color: '#3b82f6', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Test Box</h2>
        <p style={{ color: 'white' }}>If you can see this styled box, React is working correctly.</p>
      </div>
      
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button style={{ 
          backgroundColor: '#3b82f6', 
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '0.25rem',
          border: 'none',
          cursor: 'pointer'
        }}>
          Test Button 1
        </button>
        
        <button style={{ 
          backgroundColor: '#4b5563', 
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '0.25rem',
          border: 'none',
          cursor: 'pointer'
        }}>
          Test Button 2
        </button>
      </div>
    </div>
  );
}
