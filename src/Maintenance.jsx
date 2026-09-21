import React from 'react';

export default function Maintenance() {
  return (
    <div style={styles.container}>
      {/* CSS Animasyonları ve Efektleri */}
      <style>{`
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        @keyframes floatLogo {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>

      {/* Arka Plan Sinematik Derinlik Işıkları */}
      <div style={styles.bgGlowContainer}>
        <div style={styles.glowBlue}></div>
        <div style={styles.glowPurple}></div>
      </div>

      {/* Sinematik Arka Plan Dokusu/Grid */}
      <div style={styles.gridOverlay}></div>

      {/* Ana Tam Ekran İçerik */}
      <div style={styles.content}>
        
        {/* Şirket Markası / Logo Alanı */}
        <div style={styles.brandBadge}>
          <div style={styles.brandIcon}>CB</div>
          <span style={styles.brandText}>CB LABS</span>
        </div>

        {/* Sinematik Ana Başlık */}
        <h1 style={styles.mainTitle}>
          GELECEĞİ <br />
          <span style={styles.gradientText}>YENİDEN TASARLIYORUZ</span>
        </h1>

        <p style={styles.subTitle}>
          <strong style={{ color: '#ffffff' }}>CB Labs</strong> platformunda kapsamlı bir altyapı ve tasarım güncellemesi gerçekleştiriyoruz. Çok yakında daha güçlü ve kusursuz bir deneyimle buradayız.
        </p>

        {/* Durum Göstergesi / Status */}
        <div style={styles.statusBox}>
          <span style={styles.livePulse}></span>
          <span style={styles.statusText}>SİSTEM GÜNCELLEMESİ DEVAM EDİYOR</span>
        </div>

        {/* Dipnot */}
        <div style={styles.footerNotice}>
          © {new Date().getFullYear()} CB Labs. Anlayışınız için teşekkür ederiz.
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: '#050508',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999999,
    fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    overflow: 'hidden',
  },
  bgGlowContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
  },
  glowBlue: {
    position: 'absolute',
    top: '20%',
    left: '20%',
    width: '50vw',
    height: '50vw',
    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.18) 0%, rgba(0,0,0,0) 70%)',
    animation: 'pulseGlow 8s infinite ease-in-out',
  },
  glowPurple: {
    position: 'absolute',
    bottom: '10%',
    right: '15%',
    width: '45vw',
    height: '45vw',
    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(0,0,0,0) 70%)',
    animation: 'pulseGlow 10s infinite ease-in-out 2s',
  },
  gridOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 0)`,
    backgroundSize: '32px 32px',
    opacity: 0.6,
    pointerEvents: 'none',
  },
  content: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '850px',
    width: '90%',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  brandBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '12px',
    padding: '8px 20px 8px 12px',
    borderRadius: '100px',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    backdropFilter: 'blur(12px)',
    marginBottom: '36px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
    animation: 'floatLogo 6s ease-in-out infinite',
  },
  brandIcon: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '800',
    fontSize: '13px',
    color: '#ffffff',
    letterSpacing: '0.5px',
  },
  brandText: {
    fontSize: '14px',
    fontWeight: '700',
    letterSpacing: '2px',
    color: '#f4f4f5',
  },
  mainTitle: {
    fontSize: 'clamp(36px, 6vw, 68px)',
    fontWeight: '900',
    lineHeight: '1.08',
    letterSpacing: '-1.5px',
    marginBottom: '24px',
    textTransform: 'uppercase',
  },
  gradientText: {
    background: 'linear-gradient(135deg, #60a5fa 0%, #c084fc 50%, #ffffff 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subTitle: {
    fontSize: 'clamp(15px, 2vw, 18px)',
    color: '#9ca3af',
    lineHeight: '1.6',
    maxWidth: '620px',
    marginBottom: '40px',
    fontWeight: '400',
  },
  statusBox: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 22px',
    borderRadius: '12px',
    backgroundColor: 'rgba(59, 130, 246, 0.08)',
    border: '1px solid rgba(59, 130, 246, 0.25)',
    marginBottom: '48px',
  },
  livePulse: {
    width: '9px',
    height: '9px',
    borderRadius: '50%',
    backgroundColor: '#3b82f6',
    boxShadow: '0 0 12px #3b82f6',
  },
  statusText: {
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '1.5px',
    color: '#93c5fd',
  },
  footerNotice: {
    fontSize: '13px',
    color: '#52525b',
    letterSpacing: '0.5px',
  },
};