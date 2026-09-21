import React from 'react';

export default function Maintenance() {
  return (
    <div style={styles.overlay}>
      {/* Arka planda sinematik ışık süzmesi efekti */}
      <div style={styles.glow}></div>

      <div style={styles.card}>
        <div style={styles.badge}>
          <span style={styles.pulseDot}></span> SİTE BAKIMDA
        </div>

        <h1 style={styles.title}>Daha İyi Bir Deneyim İçin Yenileniyoruz</h1>

        <p style={styles.description}>
          Sitemizde köklü güncellemeler yapıyoruz. Sizlere daha kaliteli ve hızlı 
          bir hizmet sunabilmek adına kısa bir süreliğine bakım modundayız.
        </p>

        <div style={styles.footerText}>
          Anlayışınız ve sabrınız için teşekkür ederiz.
        </div>
      </div>
    </div>
  );
}

// Inline stiller
const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: '#0a0a0c',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99999,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    width: '600px',
    height: '600px',
    background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(0,0,0,0) 70%)',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
  },
  card: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '520px',
    width: '90%',
    padding: '40px',
    borderRadius: '24px',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(16px)',
    boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4)',
    textAlign: 'center',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 16px',
    borderRadius: '20px',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    border: '1px solid rgba(99, 102, 241, 0.3)',
    color: '#818cf8',
    fontSize: '12px',
    fontWeight: '600',
    letterSpacing: '1px',
    marginBottom: '24px',
  },
  pulseDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#6366f1',
    boxShadow: '0 0 10px #6366f1',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    lineHeight: '1.3',
    marginBottom: '16px',
    background: 'linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  description: {
    fontSize: '15px',
    color: '#a1a1aa',
    lineHeight: '1.6',
    marginBottom: '28px',
  },
  footerText: {
    fontSize: '13px',
    color: '#71717a',
    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
    paddingTop: '20px',
  },
};