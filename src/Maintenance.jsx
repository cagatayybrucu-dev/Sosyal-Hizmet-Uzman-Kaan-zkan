import React from 'react';

export default function Maintenance() {
  return (
    <div style={styles.container}>
      {/* CSS Animasyonları & Sinematik Efektler */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;800;900&family=Space+Grotesk:wght@500;700&display=swap');

        @keyframes bgZoom {
          0% { transform: scale(1); }
          50% { transform: scale(1.08); }
          100% { transform: scale(1); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.15); }
        }
        @keyframes floatBadge {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>

      {/* Arka Plan Sinematik Görseli & Zoom Efekti */}
      <div style={styles.bgImageLayer}></div>
      <div style={styles.bgOverlay}></div>

      {/* Sinematik Işık Küreleri */}
      <div style={styles.glowBlue}></div>
      <div style={styles.glowPurple}></div>

      {/* Grid / Izgara Dokusu */}
      <div style={styles.gridOverlay}></div>

      {/* Ana İçerik Konteynırı */}
      <div style={styles.content}>
        
        {/* CB Labs Üst Rozet */}
        <div style={styles.brandBadge}>
          <div style={styles.brandIcon}>CB</div>
          <span style={styles.brandText}>CB LABS &bull; NEXT-GEN PLATFORM</span>
        </div>

        {/* Dev Sinematik Başlık */}
        <h1 style={styles.mainTitle}>
           <br />
          <span style={styles.gradientText}>DAHA GÜÇLÜ,DAHA HIZLI</span>
        </h1>

        {/* Açıklama */}
        <p style={styles.subTitle}>
          <strong style={{ color: '#ffffff', fontWeight: 600 }}>CB Labs</strong> altyapısında geleceğin teknolojilerini entegre edeceğimiz kapsamlı bir dönüşüm başlattık. Çok daha hızlı, güçlü ve kusursuz bir deneyimle çok yakında yayındayız.
        </p>

        {/* Canlı Sistem Durum Çubuğu */}
        <div style={styles.statusCard}>
          <div style={styles.statusHeader}>
            <span style={styles.livePulse}></span>
            <span style={styles.statusTitle}>GÜNCELLEME DEVAM EDİYOR</span>
          </div>
          <p style={styles.statusDesc}>Tüm veriler güvende &bull; Sunucu yükseltmeleri devam ediyor</p>
        </div>

        {/* Alt Bilgi */}
        <div style={styles.footerNotice}>
          Anlayışınız ve sabrınız için teşekkür ederiz.
          <br />
          <span style={{ fontSize: '12px', color: '#52525b', marginTop: '6px', display: 'inline-block' }}>
            &copy; {new Date().getFullYear()} CB Labs. Tüm hakları saklıdır.
          </span>
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
    backgroundColor: '#030305',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999999,
    fontFamily: '"Plus Jakarta Sans", -apple-system, sans-serif',
    overflow: 'hidden',
  },
  bgImageLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'brightness(0.35) contrast(1.2) saturate(1.1)',
    animation: 'bgZoom 25s infinite ease-in-out',
    pointerEvents: 'none',
  },
  bgOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle at center, rgba(3, 3, 5, 0.4) 0%, rgba(3, 3, 5, 0.92) 80%, #030305 100%)',
    pointerEvents: 'none',
  },
  glowBlue: {
    position: 'absolute',
    top: '15%',
    left: '15%',
    width: '55vw',
    height: '55vw',
    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.22) 0%, rgba(0,0,0,0) 70%)',
    animation: 'pulseGlow 10s infinite ease-in-out',
    pointerEvents: 'none',
  },
  glowPurple: {
    position: 'absolute',
    bottom: '10%',
    right: '10%',
    width: '50vw',
    height: '50vw',
    background: 'radial-gradient(circle, rgba(147, 51, 234, 0.18) 0%, rgba(0,0,0,0) 70%)',
    animation: 'pulseGlow 12s infinite ease-in-out 3s',
    pointerEvents: 'none',
  },
  gridOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
    backgroundSize: '40px 40px',
    pointerEvents: 'none',
  },
  content: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '880px',
    width: '92%',
    padding: '48px 32px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '32px',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 40px 100px rgba(0, 0, 0, 0.7)',
  },
  brandBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '12px',
    padding: '8px 20px 8px 10px',
    borderRadius: '100px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(10px)',
    marginBottom: '32px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
    animation: 'floatBadge 5s ease-in-out infinite',
  },
  brandIcon: {
    width: '34px',
    height: '34px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '800',
    fontSize: '13px',
    color: '#ffffff',
    letterSpacing: '0.5px',
    boxShadow: '0 0 15px rgba(99, 102, 241, 0.5)',
  },
  brandText: {
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '2px',
    color: '#e4e4e7',
    fontFamily: '"Space Grotesk", sans-serif',
  },
  mainTitle: {
    fontSize: 'clamp(38px, 6.5vw, 76px)',
    fontWeight: '900',
    lineHeight: '1.05',
    letterSpacing: '-2px',
    marginBottom: '24px',
    textTransform: 'uppercase',
  },
  gradientText: {
    background: 'linear-gradient(135deg, #60a5fa 0%, #a855f7 50%, #ffffff 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    filter: 'drop-shadow(0 0 35px rgba(99, 102, 241, 0.3))',
  },
  subTitle: {
    fontSize: 'clamp(15px, 2vw, 18px)',
    color: '#a1a1aa',
    lineHeight: '1.7',
    maxWidth: '640px',
    marginBottom: '36px',
    fontWeight: '400',
  },
  statusCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
    padding: '16px 28px',
    borderRadius: '16px',
    backgroundColor: 'rgba(59, 130, 246, 0.06)',
    border: '1px solid rgba(59, 130, 246, 0.2)',
    marginBottom: '36px',
  },
  statusHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  livePulse: {
    width: '9px',
    height: '9px',
    borderRadius: '50%',
    backgroundColor: '#3b82f6',
    boxShadow: '0 0 14px #3b82f6',
  },
  statusTitle: {
    fontSize: '12px',
    fontWeight: '800',
    letterSpacing: '2px',
    color: '#93c5fd',
    fontFamily: '"Space Grotesk", sans-serif',
  },
  statusDesc: {
    fontSize: '13px',
    color: '#71717a',
    margin: 0,
  },
  footerNotice: {
    fontSize: '14px',
    color: '#a1a1aa',
    lineHeight: '1.5',
    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
    paddingTop: '24px',
    width: '100%',
    maxWidth: '480px',
  },
};