import { useEffect, useState } from "react";
import heroSlide1 from "./assets/hero-slide-1.jpg";
import heroSlide2 from "./assets/hero-slide-2.jpg";
import aboutPhoto from "./assets/kaan-about.jpg";
import servicesHeroRoom from "./assets/services-hero-room.jpg";
import processHeroDesk from "./assets/process-hero-desk.jpg";

const Icon = ({ name, size = 22 }) => {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  const icons = {
    shield: (
      <svg {...common}><path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6l-7-3Z"/><path d="m9.5 12 1.6 1.6 3.5-3.6"/></svg>
    ),
    lock: (
      <svg {...common}><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>
    ),
    user: (
      <svg {...common}><circle cx="12" cy="8" r="3.5"/><path d="M5 20c.7-4 3-6 7-6s6.3 2 7 6"/></svg>
    ),
    chat: (
      <svg {...common}><path d="M5 18 3.5 21l4-1.3A9 9 0 1 0 5 18Z"/><path d="M8 10h8M8 14h5"/></svg>
    ),
    users: (
      <svg {...common}><circle cx="9" cy="8" r="3"/><circle cx="16.5" cy="9.5" r="2.5"/><path d="M3.5 19c.7-3.5 2.7-5.5 5.5-5.5S13.8 15.5 14.5 19"/><path d="M14 14c3.3 0 5.3 1.7 6 5"/></svg>
    ),
    online: (
      <svg {...common}><rect x="3" y="5" width="18" height="13" rx="2"/><path d="M8 21h8M12 18v3"/><path d="m9.5 11 1.8 1.8 3.6-3.7"/></svg>
    ),
    heart: (
      <svg {...common}><path d="M20.8 4.8a5.2 5.2 0 0 0-7.4 0L12 6.2l-1.4-1.4a5.2 5.2 0 0 0-7.4 7.4L12 21l8.8-8.8a5.2 5.2 0 0 0 0-7.4Z"/></svg>
    ),
    compass: (
      <svg {...common}><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z"/></svg>
    ),
    search: (
      <svg {...common}><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>
    ),
    bulb: (
      <svg {...common}><path d="M9 18h6M10 21h4"/><path d="M8 14a6 6 0 1 1 8 0c-1 .8-1 1.5-1 2H9c0-.5 0-1.2-1-2Z"/></svg>
    ),
    route: (
      <svg {...common}><path d="M5 19c5 0 3-7 8-7h2"/><circle cx="5" cy="19" r="2"/><circle cx="17" cy="12" r="2"/><path d="M17 10V5M14 7l3-3 3 3"/></svg>
    ),
    check: (
      <svg {...common}><circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/></svg>
    ),
    phone: (
      <svg {...common}><path d="M6.5 3.5 4 6c1.5 7 7 12.5 14 14l2.5-2.5-4-3-2 2c-3-1.3-5.7-4-7-7l2-2-3-4Z"/></svg>
    ),
    mail: (
      <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>
    ),
    whatsapp: (
      <svg {...common}><path d="M5 19.2 3.7 22l3-1A9.3 9.3 0 1 0 5 19.2Z"/><path d="M8.5 8.5c.7 3 3 5.3 6 6l1.2-1.2 2 1.4c-.3 1.7-1.7 2.8-3.4 2.4-4.2-1-7.4-4.2-8.4-8.4-.4-1.7.7-3 2.4-3.4l1.4 2-1.2 1.2Z"/></svg>
    ),
    pin: (
      <svg {...common}><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>
    ),
    calendar: (
      <svg {...common}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18"/></svg>
    ),
    arrow: (
      <svg {...common}><path d="M5 12h14M14 7l5 5-5 5"/></svg>
    ),
  };

  return icons[name] || icons.check;
};

const services = [
  {
    icon: "user",
    title: "Bireysel Görüşme",
    text: "Kişisel ihtiyaçlarınızı anlamaya, mevcut güçlerinizi görünür kılmaya ve uygun destek yollarını birlikte belirlemeye odaklanan görüşmeler.",
  },
  {
    icon: "compass",
    title: "Sosyal Danışmanlık",
    text: "Sosyal haklar, destek mekanizmaları, kurumlar ve uygun hizmetlere erişim konusunda profesyonel yönlendirme.",
  },
  {
    icon: "users",
    title: "Aile & Sosyal Destek",
    text: "Aile içi süreçler, bakım sorumlulukları ve sosyal çevreyle ilişkili konularda değerlendirme ve destek planlaması.",
  },
  {
    icon: "online",
    title: "Online Görüşme",
    text: "Bulunduğunuz yerden güvenli, pratik ve planlı şekilde çevrim içi görüşme imkânı.",
  },
];

const values = [
  { icon: "shield", title: "Etik Yaklaşım", text: "Mesleki ilkelere bağlı süreç" },
  { icon: "lock", title: "Gizlilik", text: "Güvenli ve mahrem görüşme alanı" },
  { icon: "heart", title: "Kişiye Özgü", text: "Hazır kalıplar değil, size özel yol haritası" },
  { icon: "check", title: "Bütüncül Bakış", text: "Birey, aile ve sosyal çevre birlikte değerlendirilir" },
];

const process = [
  { n: "01", icon: "search", title: "İhtiyacı Anlama", text: "Sizi, mevcut durumu ve önceliklerinizi bütüncül şekilde değerlendiririz." },
  { n: "02", icon: "bulb", title: "Yol Haritası", text: "Uygun kaynakları, seçenekleri ve izlenebilecek adımları birlikte belirleriz." },
  { n: "03", icon: "route", title: "Uygulama", text: "Belirlenen planı gerçek yaşam koşullarınıza uygun şekilde adım adım hayata geçiririz." },
  { n: "04", icon: "check", title: "Takip & Değerlendirme", text: "Süreci gözden geçirir, ihtiyaç oldukça planı günceller ve ilerlemeyi destekleriz." },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);
  const [heroTouchStart, setHeroTouchStart] = useState(null);

  const heroSlides = [
    {
      image: heroSlide1,
      eyebrow: "SOSYAL HİZMET UZMANI & AİLE DANIŞMANI",
      icon: "users",
      title: "Çift ve Aile",
      accent: "Danışmanlığı",
      script: "Ücretsiz Ön Görüşme",
      description:
        "İlişkilerde iletişimi güçlendirmek, anlayışı artırmak ve birlikte daha sağlıklı bir yol almak için ilk adımı birlikte atalım.",
    },
    {
      image: heroSlide2,
      eyebrow: "BİREYSEL & PSİKOSOSYAL DANIŞMANLIK",
      icon: "heart",
      title: "Kendinizi Yeniden",
      accent: "Keşfedin",
      script: "Ücretsiz Ön Görüşme",
      description:
        "Kaygı, stres, yaşam olayları ve duygusal güçlüklerle başa çıkarken güçlü yönlerinizi fark edebileceğiniz güvenli ve profesyonel bir alan.",
    },
  ];

  const nextHeroSlide = () => {
    setHeroSlide((current) => (current + 1) % heroSlides.length);
  };

  const prevHeroSlide = () => {
    setHeroSlide((current) =>
      current === 0 ? heroSlides.length - 1 : current - 1
    );
  };

  const activeHero = heroSlides[heroSlide];

  useEffect(() => {
    if (heroPaused) return;

    const timer = window.setInterval(() => {
      setHeroSlide((current) => (current + 1) % heroSlides.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, [heroPaused]);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [page, setPage] = useState(
    window.location.hash === "#/hakkimda"
      ? "about"
      : window.location.hash === "#/hizmetler"
      ? "services"
      : window.location.hash === "#/surec"
      ? "process"
      : window.location.hash === "#/gizlilik"
      ? "privacy"
      : window.location.hash === "#/aydinlatma"
      ? "disclosure"
      : window.location.hash === "#/cerez-politikasi"
      ? "cookies"
      : "home"
  );

  useEffect(() => {
    const seo = {
      home: ["Kaan Özkan | Sosyal Hizmet Uzmanı & Aile Danışmanı", "Kaan Özkan ile bireysel, çift ve aile danışmanlığı; psikososyal destek ve profesyonel danışmanlık hizmetleri hakkında bilgi alın."],
      about: ["Hakkımda | Kaan Özkan", "Sosyal Hizmet Uzmanı ve Aile Danışmanı Kaan Özkan'ın mesleki yolculuğu, saha deneyimi ve danışmanlık yaklaşımı."],
      services: ["Çalışma Alanları | Kaan Özkan", "Bireysel danışmanlık, çift ve aile danışmanlığı, yas, boşanma ve farklı psikososyal güçlüklerde profesyonel çalışma alanlarını inceleyin."],
      process: ["Danışmanlık Süreci | Kaan Özkan", "Danışmanlık sürecinin nasıl ilerlediğini inceleyin."],
      privacy: ["Gizlilik Politikası | Kaan Özkan", "Kaan Özkan web sitesi gizlilik politikası."],
      disclosure: ["KVKK Aydınlatma Metni | Kaan Özkan", "Kişisel verilerin işlenmesine ilişkin KVKK aydınlatma metni."],
      cookies: ["Çerez Politikası | Kaan Özkan", "Kaan Özkan web sitesi çerez politikası."]
    }[page];
    if (!seo) return;
    document.title = seo[0];
    const meta = (key, value, property = false) => {
      const attr = property ? "property" : "name";
      let el = document.head.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.content = value;
    };
    meta("description", seo[1]);
    meta("og:title", seo[0], true);
    meta("og:description", seo[1], true);
    meta("og:type", "website", true);
    meta("twitter:card", "summary_large_image");
    meta("twitter:title", seo[0]);
    meta("twitter:description", seo[1]);
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? window.scrollY / max : 0);
    };

    const onHashChange = () => {
      const nextPage =
        window.location.hash === "#/hakkimda"
          ? "about"
          : window.location.hash === "#/hizmetler"
          ? "services"
          : window.location.hash === "#/surec"
          ? "process"
          : window.location.hash === "#/gizlilik"
          ? "privacy"
          : window.location.hash === "#/aydinlatma"
          ? "disclosure"
          : window.location.hash === "#/cerez-politikasi"
          ? "cookies"
          : "home";
      setPage(nextPage);
      setMenuOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onHashChange);
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  return (
    <>
      <style>{styles}</style>

      <div className="pageShell">
        <div
          className="scrollProgress"
          style={{ transform: `scaleX(${scrollProgress})` }}
          aria-hidden="true"
        />
        <header className="topbar">
          <a href="#anasayfa" className="brand" onClick={() => setMenuOpen(false)}>
            <div className="brandMark">KÖ</div>
            <div className="brandText">
              <strong>KAAN ÖZKAN</strong>
              <span>SOSYAL HİZMET UZMANI</span>
            </div>
          </a>

          <nav className={menuOpen ? "nav nav--open" : "nav"}>
            <a href="#anasayfa" onClick={() => setMenuOpen(false)}>Ana Sayfa</a>
            <a
              href="#/hizmetler"
              className={page === "services" ? "is-active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              Hizmetler
            </a>
            <a
              href="#/hakkimda"
              className={page === "about" ? "is-active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              Hakkımda
            </a>
            <a
              href="#/surec"
              className={page === "process" ? "is-active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              Süreç
            </a>
            <a
              href="#iletisim"
              className={
                page === "home" && window.location.hash === "#iletisim"
                  ? "is-active"
                  : ""
              }
              onClick={() => setMenuOpen(false)}
            >
              İletişim
            </a>
          </nav>

          <a className="topCta" href="#iletisim">
            <Icon name="calendar" size={17} />
            RANDEVU AL
          </a>

          <button className="menuBtn" onClick={() => setMenuOpen((v) => !v)} aria-label="Menüyü aç">
            <span />
            <span />
          </button>
        </header>

        {page === "about" ? (
          <AboutDetailPage />
        ) : page === "services" ? (
          <ServicesDetailPage />
        ) : page === "process" ? (
          <ProcessDetailPage />
        ) : page === "privacy" ? (
          <LegalPage type="privacy" />
        ) : page === "disclosure" ? (
          <LegalPage type="disclosure" />
        ) : page === "cookies" ? (
          <LegalPage type="cookies" />
        ) : (
        <main>
          <section
            className="premiumSliderHero"
            id="anasayfa"
            onTouchStart={(e) => {
              setHeroPaused(true);
              setHeroTouchStart(e.touches[0].clientX);
            }}
            onTouchEnd={(e) => {
              if (heroTouchStart !== null) {
                const distance = heroTouchStart - e.changedTouches[0].clientX;

                if (Math.abs(distance) > 45) {
                  if (distance > 0) {
                    nextHeroSlide();
                  } else {
                    prevHeroSlide();
                  }
                }
              }

              setHeroTouchStart(null);
              setHeroPaused(false);
            }}
          >
            <div className="premiumSliderHero__bg">
              {heroSlides.map((slide, index) => (
                <img
                  key={slide.title}
                  src={slide.image}
                  alt=""
                  className={index === heroSlide ? "is-active" : ""}
                />
              ))}
              <div className="premiumSliderHero__shade" />
              <div className="premiumSliderHero__goldGlow" />
            </div>

            <button
              className="premiumSliderHero__arrow premiumSliderHero__arrow--left"
              aria-label="Önceki slayt"
              onClick={prevHeroSlide}
            >
              ‹
            </button>

            <div className="premiumSliderHero__content" key={heroSlide}>
              <div className="premiumSliderHero__icon">
                <Icon name={activeHero.icon} size={36} />
              </div>

              <div className="premiumSliderHero__eyebrow">
                <span />
                {activeHero.eyebrow}
              </div>

              <h1>
                {activeHero.title}
                <br />
                <strong>{activeHero.accent}</strong>
              </h1>

              <div className="premiumSliderHero__script">
                {activeHero.script}
              </div>

              <div className="premiumSliderHero__line" />

              <p>{activeHero.description}</p>

              <div className="premiumSliderHero__actions">
                <a href="#iletisim" className="premiumSliderHero__primary">
                  ÜCRETSİZ ÖN GÖRÜŞME
                  <Icon name="arrow" size={18} />
                </a>

                <a href="#/hizmetler" className="premiumSliderHero__secondary">
                  ÇALIŞMA ALANLARINI İNCELE
                </a>
              </div>
            </div>

            <button
              className="premiumSliderHero__arrow premiumSliderHero__arrow--right"
              aria-label="Sonraki slayt"
              onClick={nextHeroSlide}
            >
              ›
            </button>

            <div className="premiumSliderHero__dots">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.title}
                  className={index === heroSlide ? "is-active" : ""}
                  aria-label={`${index + 1}. slayta geç`}
                  onClick={() => setHeroSlide(index)}
                />
              ))}

              <span
                key={`${heroSlide}-${heroPaused}`}
                className={
                  heroPaused
                    ? "premiumSliderHero__timer is-paused"
                    : "premiumSliderHero__timer"
                }
                aria-hidden="true"
              />
            </div>

            <div className="premiumSliderHero__features">
              <div>
                <span className="premiumSliderHero__featureIcon">
                  <Icon name="shield" size={30} />
                </span>
                <div>
                  <strong>Gizlilik</strong>
                  <p>Tüm görüşmeler etik ve gizlilik ilkeleriyle yürütülür.</p>
                </div>
              </div>

              <div>
                <span className="premiumSliderHero__featureIcon">
                  <Icon name="user" size={30} />
                </span>
                <div>
                  <strong>Kişiye Özgü Yaklaşım</strong>
                  <p>Her danışanın ihtiyacına göre özel bir yol haritası oluşturulur.</p>
                </div>
              </div>

              <div>
                <span className="premiumSliderHero__featureIcon">
                  <Icon name="heart" size={30} />
                </span>
                <div>
                  <strong>Bütüncül Bakış</strong>
                  <p>Birey, ilişkiler ve sosyal çevre birlikte değerlendirilir.</p>
                </div>
              </div>

              <div>
                <span className="premiumSliderHero__featureIcon">
                  <Icon name="check" size={30} />
                </span>
                <div>
                  <strong>Profesyonel Destek</strong>
                  <p>Etik, insan odaklı ve mesleki sınırlar içinde yürütülen profesyonel destek.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="homeServicesShowcase">
            <div className="homeServicesShowcase__head reveal">
              <div>
                <span className="homeServicesShowcase__eyebrow">PROFESYONEL ÇALIŞMA ALANLARI</span>
                <h2>
                  Size uygun desteği
                  <strong> birlikte keşfedelim.</strong>
                </h2>
              </div>

              <p>
                Yaşadığınız güçlüğü yalnızca tek bir başlık üzerinden değil;
                ilişkileriniz, yaşam deneyimleriniz ve sosyal çevrenizle birlikte
                değerlendiren bütüncül bir danışmanlık yaklaşımı.
              </p>
            </div>

            <div className="homeServicesShowcase__grid">
              <article className="homeServiceFeature reveal">
                <div className="homeServiceFeature__icon">
                  <Icon name="heart" size={25} />
                </div>
                <span>01</span>
                <h3>Bireysel Danışmanlık</h3>
                <ul>
                  <li>Anksiyete, stres ve duygu düzenleme güçlükleri</li>
                  <li>Özsaygı, benlik algısı ve psikososyal güçlenme</li>
                </ul>
                <a href="#/hizmetler">
                  Detaylı Bilgi
                  <Icon name="arrow" size={15} />
                </a>
              </article>

              <article className="homeServiceFeature reveal">
                <div className="homeServiceFeature__icon">
                  <Icon name="users" size={25} />
                </div>
                <span>02</span>
                <h3>Çift & Aile Danışmanlığı</h3>
                <ul>
                  <li>İletişim sorunları, ilişki çatışmaları ve güven problemleri</li>
                  <li>Ayrılık, boşanma ve aile içi roller üzerine destek</li>
                </ul>
                <a href="#/hizmetler">
                  Detaylı Bilgi
                  <Icon name="arrow" size={15} />
                </a>
              </article>

              <article className="homeServiceFeature reveal">
                <div className="homeServiceFeature__icon">
                  <Icon name="shield" size={25} />
                </div>
                <span>03</span>
                <h3>Psikososyal Destek</h3>
                <ul>
                  <li>Yas ve kayıp, yaşam olaylarına uyum ve dayanıklılık</li>
                  <li>Bağımlılık ve farklı psikososyal güçlüklerde destek süreci</li>
                </ul>
                <a href="#/hizmetler">
                  Detaylı Bilgi
                  <Icon name="arrow" size={15} />
                </a>
              </article>
            </div>

            <div className="homeServicesShowcase__footer reveal">
              <div className="homeServicesShowcase__benefit">
                <div className="homeServicesShowcase__benefitIcon">
                  <Icon name="compass" size={31} />
                </div>
                <div>
                  <span>DANIŞMANLIĞIN ODAĞI</span>
                  <h3>Güçlü yönlerinizi görünür hale getiren, kişiye özgü bir yol haritası.</h3>
                  <p>
                    Amaç yalnızca mevcut güçlüğü konuşmak değil; yaşam kalitenizi,
                    ilişkilerinizi ve başa çıkma kaynaklarınızı sürdürülebilir biçimde güçlendirmektir.
                  </p>
                </div>
              </div>

              <a className="homeServicesShowcase__all" href="#/hizmetler">
                <span>TÜM</span>
                <strong>HİZMETLER</strong>
                <Icon name="arrow" size={22} />
              </a>
            </div>
          </section>


          

          <section className="homeScopeStrip reveal">
            <div><Icon name="shield" size={20} /></div>
            <p>
              Danışmanlık hizmetleri sosyal hizmet ve aile danışmanlığı kapsamında sunulur;
              tanı ve tıbbi tedavi gerektiren durumlarda ilgili sağlık profesyonellerine yönlendirme yapılır.
            </p>
          </section>

          <section className="homeTrustStatement reveal">
            <div className="homeTrustStatement__mark">“</div>
            <div>
              <span>KAAN ÖZKAN</span>
              <h2>Her birey, yaşadığı problemden çok daha fazlasıdır.</h2>
              <p>
                Danışmanlıkta temel hedefim; yaşadığınız güçlüğün ötesinde güçlü
                yönlerinizi, kaynaklarınızı ve değişim kapasitenizi birlikte
                görünür hale getirmektir.
              </p>
            </div>
            <a href="#/hakkimda">
              YAKLAŞIMIMI TANIYIN
              <Icon name="arrow" size={16} />
            </a>
          </section>

          <section className="section contactSection" id="iletisim">
            <div className="contactLead reveal">
              <span className="sectionEyebrow">İLETİŞİME GEÇİN</span>
              <h2>İlk adımı birlikte atalım.</h2>
              <p>Görüşme ve randevu hakkında bilgi almak için size uygun kanaldan iletişime geçebilirsiniz.</p>
            </div>

            <div className="contactGrid">
              <a href="tel:+900000000000" className="contactCard reveal">
                <div className="contactIcon"><Icon name="phone" size={27} /></div>
                <strong>Telefon</strong>
                <span>+90 000 000 00 00</span>
              </a>

              <a href="mailto:iletisim@example.com" className="contactCard reveal">
                <div className="contactIcon"><Icon name="mail" size={27} /></div>
                <strong>E-posta</strong>
                <span>iletisim@example.com</span>
              </a>

              <a href="https://wa.me/900000000000" className="contactCard reveal" target="_blank" rel="noreferrer">
                <div className="contactIcon contactIcon--green"><Icon name="whatsapp" size={27} /></div>
                <strong>WhatsApp</strong>
                <span>Mesaj Gönder</span>
              </a>

              <div className="contactCard reveal">
                <div className="contactIcon"><Icon name="pin" size={27} /></div>
                <strong>Konum</strong>
                <span>Türkiye</span>
              </div>

              <a href="#iletisim" className="contactCard contactCard--cta reveal">
                <div className="contactIcon"><Icon name="calendar" size={27} /></div>
                <strong>Randevu Alın</strong>
                <span>Size uygun zamanı planlayalım</span>
                <Icon name="arrow" size={17} />
              </a>
            </div>
          </section>
        </main>
        )}

        <footer className="premiumFooter">
          <div className="premiumFooter__glow premiumFooter__glow--one" />
          <div className="premiumFooter__glow premiumFooter__glow--two" />

          <div className="premiumFooter__top">
            <div className="premiumFooter__brand">
              <div className="premiumFooter__brandRow">
                <div className="premiumFooter__mark">KÖ</div>
                <div>
                  <strong>KAAN ÖZKAN</strong>
                  <span>SOSYAL HİZMET UZMANI & AİLE DANIŞMANI</span>
                </div>
              </div>

              <p>
                Bilimsel, etik ve insan odaklı bir yaklaşımla; bireylerin,
                çiftlerin ve ailelerin yaşam yolculuklarında profesyonel destek.
              </p>

              <div className="premiumFooter__badges">
                <span><Icon name="shield" size={15} /> Gizlilik</span>
                <span><Icon name="heart" size={15} /> Danışan Odaklı</span>
                <span><Icon name="check" size={15} /> Etik Yaklaşım</span>
              </div>
            </div>

            <div className="premiumFooter__nav">
              <span className="premiumFooter__title">HIZLI BAĞLANTILAR</span>
              <a href="#/">Ana Sayfa <Icon name="arrow" size={14} /></a>
              <a href="#/hakkimda">Hakkımda <Icon name="arrow" size={14} /></a>
              <a href="#/hizmetler">Hizmetler <Icon name="arrow" size={14} /></a>
              <a href="#/surec">Süreç <Icon name="arrow" size={14} /></a>
              <a href="#iletisim">İletişim <Icon name="arrow" size={14} /></a>
            </div>

            <div className="premiumFooter__contact">
              <span className="premiumFooter__title">İLETİŞİM & RANDEVU</span>

              <a href="tel:+900000000000" className="premiumFooter__contactRow">
                <div><Icon name="phone" size={18} /></div>
                <span>
                  <small>Telefon</small>
                  <strong>+90 000 000 00 00</strong>
                </span>
              </a>

              <a href="mailto:iletisim@example.com" className="premiumFooter__contactRow">
                <div><Icon name="mail" size={18} /></div>
                <span>
                  <small>E-posta</small>
                  <strong>iletisim@example.com</strong>
                </span>
              </a>

              <a
                href="https://wa.me/900000000000"
                className="premiumFooter__contactRow"
                target="_blank"
                rel="noreferrer"
              >
                <div><Icon name="whatsapp" size={18} /></div>
                <span>
                  <small>WhatsApp</small>
                  <strong>Mesaj Gönder</strong>
                </span>
              </a>

              <a href="#iletisim" className="premiumFooter__cta">
                ÜCRETSİZ ÖN GÖRÜŞME
                <Icon name="arrow" size={16} />
              </a>
            </div>
          </div>

          <div className="premiumFooter__bottom">
            <span>© 2026 Kaan Özkan — Tüm hakları saklıdır.</span>

            <div className="premiumFooter__legal">
              <a href="#/gizlilik">Gizlilik</a>
              <span>•</span>
              <a href="#/aydinlatma">Aydınlatma Metni</a>
              <span>•</span>
              <a href="#/cerez-politikasi">Çerez Politikası</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}




function ProcessDetailPage() {
  const steps = [
    {
      no: "01",
      icon: "message",
      title: "Ön Görüşme",
      text: "Tanışma ve ihtiyaçların belirlenmesi amacıyla ön görüşme gerçekleştirilir. Sürecin çerçevesi birlikte netleştirilir.",
    },
    {
      no: "02",
      icon: "target",
      title: "Hedef Belirleme",
      text: "Önceliklerinize göre hedefler belirlenir ve bu hedeflere ulaşmak için kişiye özgü bir yol haritası oluşturulur.",
    },
    {
      no: "03",
      icon: "user",
      title: "Çalışma ve Uygulama",
      text: "Belirlenen hedeflere yönelik psikososyal destek yöntemleri kullanılarak farkındalık ve değişim süreci başlatılır.",
    },
    {
      no: "04",
      icon: "chart",
      title: "Değerlendirme",
      text: "İlerleme düzenli olarak değerlendirilir, ihtiyaçlara göre planlama gözden geçirilir ve yeniden şekillendirilir.",
    },
    {
      no: "05",
      icon: "check",
      title: "Sürdürme ve Destek",
      text: "Kazanımların kalıcı hale gelmesi için destek sürdürülür ve gerektiğinde yeni hedefler belirlenir.",
    },
  ];

  return (
    <main className="prc53">
      <section className="prc53Hero">
        <img
          className="prc53Hero__image"
          src={processHeroDesk}
          alt="Defter, kalem, dünya küresi ve kum saati bulunan profesyonel çalışma masası"
        />
        <div className="prc53Hero__shade" />

        <a className="prc53Back" href="#/">
          <span>←</span>
          Ana Sayfaya Dön
        </a>

        <div className="prc53Hero__copy">
          <span className="prc53Eyebrow">SÜREÇ</span>

          <h1>
            Nasıl
            <br />
            <strong>Çalışıyoruz?</strong>
          </h1>

          <i />

          <p>
            Danışmanlık süreci, sizin ihtiyaçlarınıza ve hedeflerinize uygun
            şekilde planlanır. Güvenli, saygılı ve iş birliğine dayalı bir süreç
            yürütürüz.
          </p>
        </div>
      </section>

      <section className="prc53Flow">
        <div className="prc53SectionTitle">
          <span>ÇALIŞMA SÜRECİM</span>
          <h2>Süreç, kişiye özel ve esnek bir şekilde ilerler.</h2>
        </div>

        <div className="prc53Steps">
          {steps.map((step) => (
            <article className="prc53Step" key={step.no}>
              <div className="prc53Step__number">{step.no}</div>

              <div className="prc53Step__icon">
                <Icon name={step.icon} size={34} />
              </div>

              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>

        <div className="prc53Trust">
          <div>
            <div className="prc53Trust__icon"><Icon name="shield" size={27} /></div>
            <p><strong>Gizlilik Esastır</strong><span>Tüm görüşmeler gizlilik ilkesi çerçevesinde yürütülür.</span></p>
          </div>

          <div>
            <div className="prc53Trust__icon"><Icon name="user" size={27} /></div>
            <p><strong>Size Özel Yaklaşım</strong><span>Her danışanın ihtiyaçları farklıdır. Size uygun bir yol haritası oluşturulur.</span></p>
          </div>

          <div>
            <div className="prc53Trust__icon"><Icon name="calendar" size={27} /></div>
            <p><strong>Esnek Görüşme Seçenekleri</strong><span>Görüşme biçimi ve sıklığı ihtiyaçlara göre birlikte planlanır.</span></p>
          </div>

          <div>
            <div className="prc53Trust__icon"><Icon name="heart" size={27} /></div>
            <p><strong>Sürekli Destek</strong><span>Süreç boyunca ilerleme değerlendirilir ve ihtiyaç halinde destek devam eder.</span></p>
          </div>
        </div>
      </section>

      <section className="prc53Principles">
        <div className="prc53Principles__mark">KÖ</div>
        <div>
          <span>SÜREÇ İLKELERİMİZ</span>
          <h3>Gönüllülük, gizlilik, saygı, yargılamadan kabul ve iş birliği.</h3>
          <p>
            Danışmanlık süreci sizin hızınızda ve sizinle birlikte ilerler.
            İhtiyaçlar, hedefler ve sürecin yönü düzenli olarak birlikte değerlendirilir.
          </p>
        </div>
      </section>
    </main>
  );
}

function ServicesDetailPage() {
  const quickServices = [
    {
      icon: "user",
      title: "Bireysel Danışmanlık",
      text: "Kaygı, stres, özsaygı, duygu düzenleme, yaşam olaylarına uyum ve kişisel güçlenme süreçlerinde profesyonel destek.",
    },
    {
      icon: "users",
      title: "Aile Danışmanlığı",
      text: "İletişim problemleri, çatışmalar, aile içi roller, sınırlar ve ilişkilerin güçlendirilmesine yönelik danışmanlık.",
    },
    {
      icon: "heart",
      title: "Evlilik & Çift Danışmanlığı",
      text: "İlişki sorunları, iletişim, güven, bağlanma, ayrılık ve boşanma süreçlerinde yapılandırılmış destek.",
    },
    {
      icon: "compass",
      title: "Psikososyal Destek",
      text: "Zorlayıcı yaşam olayları, kayıp, değişim ve uyum süreçlerinde bireyin kişisel ve sosyal kaynaklarını güçlendiren destek.",
    },
    {
      icon: "message",
      title: "Gençlere Yönelik Destek",
      text: "Ergenlik ve genç yetişkinlik döneminde özsaygı, iletişim, kimlik gelişimi, aile ilişkileri ve yaşam uyumuna yönelik destek.",
    },
  ];

  const groups = [
    {
      no: "01",
      icon: "heart",
      title: "Duygusal İyi Oluş",
      items: [
        "Kaygı ve Anksiyete ile İlişkili Psikososyal Güçlükler",
        "Depresif Belirtilerle Baş Etme ve Psikososyal Destek",
        "Yoğun ve Süreğen Kaygıyla Baş Etme Süreçleri",
        "Panik Belirtileriyle Baş Etme ve Psikososyal Destek",
        "Tekrarlayıcı ve Zorlayıcı Düşünce Örüntüleriyle Baş Etme",
        "Dürtü Kontrol Güçlükleri",
      ],
    },
    {
      no: "02",
      icon: "users",
      title: "İlişkiler & Aile",
      items: [
        "Kişilerarası İlişki Problemleri",
        "Çift ve Evlilik Çatışmaları",
        "İletişim Sorunları",
        "Güven Problemleri",
        "Bağlanma Örüntüleri",
        "Duygusal Bağımlılık",
        "Ayrılık ve/veya Boşanma Süreçleri",
      ],
    },
    {
      no: "03",
      icon: "shield",
      title: "Benlik & Dayanıklılık",
      items: [
        "Yas ve Kayıp Süreci Danışmanlığı",
        "Özsaygı ve Kendilik Algısı",
        "Özşefkat Geliştirme",
        "Kimlik ve Benlik Gelişimi",
        "Öfke Yönetimi",
        "Duygu Düzenleme Güçlükleri",
        "Stres Yönetimi",
        "Yaşam Olaylarına Uyum Süreçleri",
      ],
    },
    {
      no: "04",
      icon: "check",
      title: "Psikososyal Destek",
      items: [
        "DEHB/ADHD ile ilişkili psikososyal ve uyum güçlüklerinde destek",
        "Kişilik Örüntülerine Bağlı İlişki ve Uyum Güçlükleri",
        "Bipolar bozukluk tanısı bulunan bireylerde psikososyal destek ve yaşam düzenine uyum süreçleri",
        "Madde ve davranışsal bağımlılıklarla ilişkili psikososyal destek süreçleri",
      ],
    },
  ];

  return (
    <main className="svc52">
      <section className="svc52Hero">
        <img className="svc52Hero__image" src={servicesHeroRoom} alt="Sıcak ve sakin danışmanlık görüşme ortamı" />
        <div className="svc52Hero__shade" />
        <a className="svc52Back" href="#/"><span>←</span> Ana Sayfaya Dön</a>

        <div className="svc52Hero__copy">
          <span className="svc52Eyebrow">HİZMETLER</span>
          <h1>Size Nasıl Destek<br/><strong>Olabilirim?</strong></h1>
          <i />
          <p>
            Danışan odaklı, etik değerlere bağlı ve bütüncül bir yaklaşımla;
            bireysel, ilişkisel ve aile yaşamınızda karşılaştığınız güçlüklerde
            profesyonel destek sunuyorum.
          </p>
        </div>
      </section>

      <section className="svc52Quick">
        <div className="svc52SectionTitle">
          <span>ÇALIŞMA ALANLARIM</span>
          <h2>Size uygun desteği birlikte belirleyelim.</h2>
        </div>

        <div className="svc52QuickGrid">
          {quickServices.map((item) => (
            <article className="svc52QuickCard" key={item.title}>
              <div className="svc52QuickIcon"><Icon name={item.icon} size={34} /></div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <a href="#svc52-detay">Detaylı Bilgi <Icon name="arrow" size={15}/></a>
            </article>
          ))}
        </div>

        <div className="svc52Trust">
          <div><Icon name="shield" size={29}/><p><strong>Gizlilik ve Güvenlik</strong><span>Görüşmeler gizlilik ve etik ilkeler çerçevesinde yürütülür.</span></p></div>
          <div><Icon name="user" size={29}/><p><strong>Bireye Özgü Yaklaşım</strong><span>Her danışanın yaşam öyküsü ve ihtiyacı kendine özgüdür.</span></p></div>
          <div><Icon name="calendar" size={29}/><p><strong>Esnek Görüşme</strong><span>Uygun görüşme biçimi ve süreç birlikte planlanır.</span></p></div>
          <div><Icon name="heart" size={29}/><p><strong>Etik & Profesyonel</strong><span>Mesleki sınırlar içinde insan odaklı bir yaklaşım benimsenir.</span></p></div>
        </div>
      </section>

      <section id="svc52-detay" className="servicesDetailGridSection svc52Details">
        <div className="servicesDetailSectionHead">
          <span>PROFESYONEL ÇALIŞMA ALANLARIM</span>
          <h2>Destek sunduğum konuları ayrıntılı inceleyebilirsiniz.</h2>
        </div>
        <div className="servicesDetailGrid">
          {groups.map((group) => (
            <article className="servicesDetailCard" key={group.no}>
              <div className="servicesDetailCard__top">
                <div><span className="servicesDetailCard__no">{group.no}</span><h3>{group.title}</h3></div>
                <div className="servicesDetailCard__icon"><Icon name={group.icon} size={25}/></div>
              </div>
              <div className="servicesDetailCard__list">
                {group.items.map((item) => (
                  <div className="servicesDetailItem" key={item}><span>✦</span><p>{item}</p></div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="svc52Scope">
        <div className="svc52Scope__mark">KO</div>
        <div>
          <span>HİZMET KAPSAMI</span>
          <h3>Danışmanlık ve psikososyal destek; tanı veya tıbbi tedavi yerine geçmez.</h3>
          <p>
            Çalışmalar sosyal hizmet ve aile danışmanlığı çerçevesinde yürütülür.
            Klinik değerlendirme, psikiyatrik tanı, ilaç düzenlemesi veya tıbbi
            tedavi gerektiren durumlarda uygun sağlık profesyonellerine yönlendirme yapılır.
          </p>
        </div>
      </section>
    </main>
  );
}

function LegalPage({ type }) {
  const content = {
    privacy: {
      eyebrow: "GİZLİLİK",
      title: "Gizlilik Politikası",
      intro:
        "Bu sayfa, internet sitesini ziyaret ettiğinizde paylaşılan bilgilerin hangi çerçevede ele alındığını açıklamak amacıyla hazırlanmıştır.",
      sections: [
        {
          title: "1. Genel Yaklaşım",
          text:
            "Kaan Özkan tarafından sunulan danışmanlık hizmetlerinde mahremiyet, etik sorumluluk ve kişisel verilerin korunması temel öncelikler arasındadır. İnternet sitesi üzerinden elde edilen bilgiler yalnızca ilgili hizmetlerin yürütülmesi, iletişim kurulması ve kullanıcı deneyiminin iyileştirilmesi amacıyla değerlendirilir.",
        },
        {
          title: "2. Toplanabilecek Bilgiler",
          text:
            "Site üzerinden iletişim veya randevu talebi oluşturmanız halinde ad-soyad, telefon numarası, e-posta adresi, tercih edilen görüşme bilgileri ve tarafınızca paylaşılan mesaj içeriği gibi veriler işlenebilir. Teknik olarak zorunlu olması halinde cihaz ve bağlantı bilgileri gibi sınırlı teknik veriler de oluşabilir.",
        },
        {
          title: "3. Kullanım Amaçları",
          text:
            "Toplanan bilgiler; iletişim taleplerine yanıt verilmesi, görüşme süreçlerinin planlanması, hizmet kalitesinin sürdürülmesi, hukuki yükümlülüklerin yerine getirilmesi ve bilgi güvenliğinin sağlanması amaçlarıyla kullanılabilir.",
        },
        {
          title: "4. Gizlilik ve Güvenlik",
          text:
            "Kişisel verilerin yetkisiz erişim, kayıp, kötüye kullanım veya açıklanmaya karşı korunması için uygun teknik ve idari tedbirlerin uygulanması hedeflenir. Danışmanlık görüşmelerinin içeriği ayrıca mesleki etik ve gizlilik ilkeleri kapsamında değerlendirilir.",
        },
        {
          title: "5. Üçüncü Taraflar",
          text:
            "Kişisel veriler, yalnızca hizmetin teknik olarak yürütülmesi için gerekli olması veya kanuni bir yükümlülüğün bulunması halinde ilgili hizmet sağlayıcılar ya da yetkili kamu kurumlarıyla sınırlı şekilde paylaşılabilir.",
        },
        {
          title: "6. Güncellemeler",
          text:
            "Bu politika, sitenin işleyişi veya mevzuattaki değişiklikler doğrultusunda güncellenebilir. Güncel metin her zaman bu sayfa üzerinden yayımlanır.",
        },
      ],
    },
    disclosure: {
      eyebrow: "KVKK",
      title: "Kişisel Verilerin İşlenmesine İlişkin Aydınlatma Metni",
      intro:
        "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında; hangi bilgilerin, hangi amaçlarla ve hangi yöntemlerle işlendiğini açık ve anlaşılır şekilde bilmeniz için bu metin hazırlanmıştır.",
      sections: [
        {
          title: "1. Veri Sorumlusu",
          text:
            "Bu internet sitesi ve danışmanlık süreçleri kapsamında işlenen kişisel veriler bakımından veri sorumlusu Kaan Özkan'dır. Veri sorumlusuna ait kesin iletişim adresi, telefon ve e-posta bilgileri randevu sistemi yayına alınmadan önce bu metinde ayrıca belirtilecektir.",
        },
        {
          title: "2. Hangi Bilgileri İstiyoruz?",
          text:
            "Ön görüşme ve randevu talebinin oluşturulabilmesi için yalnızca ihtiyaçla bağlantılı verilerin alınması hedeflenmektedir. Bunlar; ad-soyad, yaş, telefon numarası, e-posta adresi, tercih edilen görüşme türü, uygun tarih/saat bilgisi ve isteğe bağlı kısa açıklama alanıdır. Kesin doğum tarihi gibi süreç için zorunlu olmayan ek verilerin talep edilmemesi esastır.",
        },
        {
          title: "3. Bu Bilgileri Neden İstiyoruz?",
          text:
            "Ad-soyad bilgisi başvuruyu doğru kişiyle eşleştirmek; yaş bilgisi görüşme ve danışmanlık sürecini uygun şekilde değerlendirmek; telefon ve e-posta bilgileri sizinle iletişim kurmak ve randevu hakkında bilgilendirme yapmak; görüşme türü ile tarih/saat tercihleri randevuyu planlamak; kısa açıklama alanı ise başvuru konusunun genel çerçevesini önceden anlayabilmek amacıyla kullanılacaktır.",
        },
        {
          title: "4. Hassas ve Sağlıkla İlgili Bilgiler",
          text:
            "Sağlık bilgileri ile bazı kişisel bilgiler özel nitelikli kişisel veri niteliğinde olabilir ve daha sıkı korunmaları gerekir. Bu nedenle ön görüşme formunda tanı, ilaç kullanımı, ayrıntılı sağlık geçmişi, cinsel hayat, biyometrik veya benzeri hassas bilgilerin paylaşılması talep edilmeyecektir. Kullanıcıların da randevu öncesi serbest metin alanında gerekli olmayan hassas bilgileri paylaşmamaları istenecektir.",
        },
        {
          title: "5. Kişisel Verilerin İşlenme Amaçları",
          text:
            "Kişisel veriler; ön görüşme ve randevu taleplerinin alınması, sizinle iletişim kurulması, randevunun planlanması ve yönetilmesi, danışmanlık hizmetinin organizasyonu, bilgi güvenliğinin sağlanması, olası uyuşmazlıklarda hakların tesisi veya korunması ve yürürlükteki mevzuattan doğan yükümlülüklerin yerine getirilmesi amaçlarıyla, amaçla bağlantılı, sınırlı ve ölçülü şekilde işlenebilir.",
        },
        {
          title: "6. Toplama Yöntemi ve Hukuki Sebep",
          text:
            "Kişisel veriler; internet sitesindeki form, telefon, e-posta, WhatsApp ve benzeri iletişim kanalları üzerinden elektronik veya sözlü yollarla elde edilebilir. Her veri işleme faaliyeti için 6698 sayılı Kanunda yer alan uygun işleme şartı ayrıca belirlenir. Açık rızanın gerekli olduğu bir işlem bulunması halinde açık rıza, bu aydınlatma metninden ayrı ve belirli bir konuya ilişkin olarak alınır.",
        },
        {
          title: "7. Kişisel Veriler Kimlerle Paylaşılabilir?",
          text:
            "Kişisel veriler, yalnızca hizmetin yürütülmesi için gerekli olduğu ölçüde ve hukuki şartların bulunması halinde; randevu, e-posta, barındırma veya bilgi teknolojileri gibi teknik hizmet sağlayıcılarla ve kanunen yetkili kamu kurum ve kuruluşlarıyla paylaşılabilir. Kullanılacak gerçek hizmet sağlayıcılar randevu altyapısı kesinleştikten sonra bu metinde açıkça belirtilecektir.",
        },
        {
          title: "8. Saklama Süresi",
          text:
            "Kişisel veriler, işlendikleri amaç için gerekli olan süre ve ilgili mevzuatta öngörülen saklama süreleri boyunca tutulur; işleme amacı ve hukuki saklama gerekliliği ortadan kalktığında mevzuata uygun şekilde silinir, yok edilir veya anonim hale getirilir. Randevu altyapısı tamamlandığında her veri kategorisi için uygulanacak saklama süreleri ayrıca netleştirilecektir.",
        },
        {
          title: "9. KVKK Kapsamındaki Haklarınız",
          text:
            "6698 sayılı Kanunun 11. maddesi kapsamında; kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, işleme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme, yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme, eksik veya yanlış işlenmiş verilerin düzeltilmesini isteme ve Kanunda öngörülen diğer hakları kullanma imkanınız bulunmaktadır.",
        },
        {
          title: "10. Başvuru ve İletişim",
          text:
            "KVKK kapsamındaki başvuruların hangi e-posta veya fiziksel adres üzerinden yapılacağı, gerçek iletişim bilgileri kesinleştiğinde bu bölümde yayımlanacaktır. Başvuru kanalının kolay erişilebilir ve kimlik doğrulamaya elverişli şekilde sunulması planlanmaktadır.",
        },
      ],
    },
    cookies: {
      eyebrow: "ÇEREZLER",
      title: "Çerez Politikası",
      intro:
        "Bu politika, internet sitesinde kullanılan veya ileride kullanılabilecek çerez ve benzeri teknolojiler hakkında şeffaf bilgi sunmak amacıyla hazırlanmıştır.",
      sections: [
        {
          title: "1. Çerez Nedir?",
          text:
            "Çerezler, internet sitesini ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza kaydedilebilen küçük veri dosyalarıdır. Site işlevlerinin çalışmasını sağlamak, tercihleri hatırlamak veya kullanım hakkında sınırlı bilgi edinmek amacıyla kullanılabilir.",
        },
        {
          title: "2. Zorunlu Çerezler",
          text:
            "Sitenin güvenli ve temel şekilde çalışması için gerekli olan çerezler, ilgili hizmetin sunulabilmesi amacıyla kullanılabilir. Bu çerezler olmadan bazı temel site fonksiyonları düzgün çalışmayabilir.",
        },
        {
          title: "3. Analitik ve Tercih Çerezleri",
          text:
            "İleride ziyaretçi istatistikleri, performans ölçümü veya kullanıcı tercihlerini hatırlamak amacıyla analitik ya da tercih çerezleri kullanılması halinde, kullanılan araçlar ve hukuki dayanakları bu politika üzerinde açıkça belirtilecektir.",
        },
        {
          title: "4. Reklam ve Pazarlama Çerezleri",
          text:
            "Bu sürümde reklam veya hedefli pazarlama amaçlı çerez kullanımına ilişkin bir sistem tanımlanmamıştır. Böyle bir teknoloji eklenmesi halinde gerekli bilgilendirme ve uygun olduğu ölçüde tercih/rıza mekanizması ayrıca uygulanacaktır.",
        },
        {
          title: "5. Çerez Tercihleri",
          text:
            "Tarayıcı ayarlarınız üzerinden çerezleri silebilir, engelleyebilir veya belirli çerez türlerine ilişkin tercihlerinizi değiştirebilirsiniz. Zorunlu çerezlerin engellenmesi bazı site özelliklerinin çalışmasını etkileyebilir.",
        },
        {
          title: "6. Güncelleme",
          text:
            "Siteye yeni analiz, reklam, üçüncü taraf hizmet veya çerez teknolojileri eklenmesi durumunda bu politika gerçek kullanım biçimine göre güncellenecektir.",
        },
      ],
    },
  }[type];

  return (
    <main className="legalPage">
      <section className="legalHero">
        <div className="legalHero__grid" />
        <div className="legalHero__glow" />

        <a href="#/" className="legalBack">
          <span>←</span>
          Ana Sayfaya Dön
        </a>

        <div className="legalHero__copy">
          <span>{content.eyebrow}</span>
          <h1>{content.title}</h1>
          <p>{content.intro}</p>
        </div>

        <aside className="legalHero__card">
          <div className="legalHero__icon">
            <Icon name={type === "cookies" ? "settings" : "shield"} size={31} />
          </div>
          <span>BİLGİLENDİRME</span>
          <h2>Şeffaflık, gizlilik ve güven.</h2>
          <p>
            Bu metinler sitenin mevcut yapısına göre hazırlanmış başlangıç
            metinleridir. Randevu sistemi ve gerçek iletişim altyapısı
            tamamlandığında son kez güncellenecektir.
          </p>
        </aside>
      </section>

      <section className="legalContent">
        <div className="legalContent__toc">
          <span>İÇERİK</span>
          {content.sections.map((section) => (
            <a key={section.title} href={`#legal-${section.title.split(".")[0]}`}>
              {section.title}
            </a>
          ))}
        </div>

        <article className="legalArticle">
          {content.sections.map((section) => (
            <section
              key={section.title}
              id={`legal-${section.title.split(".")[0]}`}
              className="legalArticle__section"
            >
              <h2>{section.title}</h2>
              <p>{section.text}</p>
            </section>
          ))}

          <div className="legalArticle__notice">
            <Icon name="info" size={22} />
            <div>
              <strong>Son kontrol notu</strong>
              <p>
                İletişim ve randevu altyapısı tamamlandığında veri sorumlusu
                iletişim bilgileri, kullanılan üçüncü taraf hizmetler ve gerçek
                çerez/veri akışları bu metinlerle eşleştirilmelidir.
              </p>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}

function AboutDetailPage() {
  return (
    <main className="aboutDirectPage">
      <section className="aboutDirectHeader">
        <a href="#/" className="aboutDirectBack">← Ana Sayfaya Dön</a>

        <div className="aboutDirectHeader__title">
          <span>HAKKIMDA</span>
          <h1>Kaan <strong>ÖZKAN</strong></h1>
          <p>Sosyal Hizmet Uzmanı & Aile Danışmanı</p>
        </div>
      </section>

      <section className="aboutDirectLayout">
        <article className="aboutDirectArticle">
          <div className="aboutDirectArticle__topline">
            <span>BENİM HİKÂYEM • TAM METİN</span>
            <div />
          </div>

              <p>Merhabalar, ben Kaan ÖZKAN. Sosyal Hizmet Uzmanı ve Aile Danışmanıyım. Meslek hayatımı yalnızca bireylerin yaşadığı sorunları çözmeye değil; onların yaşam öykülerini anlamaya, güçlü yönlerini ortaya çıkarmaya ve sürdürülebilir bir değişim sürecine eşlik etmeye adadım. İnsan davranışını yalnızca bireysel özellikler üzerinden değil; aile, çevre, sosyal sistemler ve yaşam deneyimleriyle birlikte değerlendiren bütüncül bir bakış açısını benimsiyorum.</p>
              <p>İstanbul Aydın Üniversitesi Sağlık Bilimleri Fakültesi Sosyal Hizmet Bölümü'nden mezun olduktan sonra mesleki gelişimimi yalnızca üniversite eğitimiyle sınırlandırmadım. Eğitim hayatım boyunca farklı yaş grupları ve farklı yaşam deneyimlerine sahip bireylerle çalışabilmek amacıyla gönüllü projelerde, uygulamalı stajlarda ve saha araştırmalarında aktif olarak yer aldım. Böylece sosyal hizmetin teorik yönünü gerçek yaşam deneyimleriyle birleştirme fırsatı elde ettim.</p>
              <p>Üniversite yıllarında çocuk koruma sistemi, yaşlı bakım hizmetleri, rehabilitasyon merkezleri, sivil toplum kuruluşları ve sosyal hizmet kurumlarında görev alarak sosyal hizmet disiplininin farklı uygulama alanlarını yakından tanıdım. Sulukule Gönüllüleri Derneği, Toplum Gönüllüleri Vakfı (TOG), Florya Çocuk Destek Merkezi (ÇODEM), Kırşehir Aile ve Sosyal Hizmetler İl Müdürlüğü ile palyatif bakım hizmeti sunan Asudem Yaşam ve Sağlık Merkezi gibi kurumlarda yürüttüğüm gönüllülük ve staj çalışmaları; çocuk koruma, sosyal destek mekanizmaları, dezavantajlı gruplarla çalışma, yaşlı refahı ve psikososyal değerlendirme alanlarında önemli saha deneyimleri kazanmamı sağladı.</p>
              <p>Meslek hayatıma Kırşehir Belediyesi bünyesinde Sosyal Yardım Merkezi'nde Sosyal Çalışmacı olarak başladım. Bu görev sürecinde yüzlerce müracaatçıyla birebir görüşmeler gerçekleştirdim; sosyal inceleme raporlarının hazırlanması, yerinde ev ziyaretleri, psikososyal değerlendirme süreçleri, sosyal yardım mekanizmalarının planlanması ve vaka yönetimi çalışmalarında aktif sorumluluk üstlendim. Her müracaatçının yaşam öyküsünün birbirinden farklı olduğunu, etkili bir sosyal hizmet müdahalesinin ise ancak bireyin sosyal çevresi, aile yapısı, ekonomik koşulları ve psikolojik ihtiyaçları birlikte değerlendirildiğinde mümkün olabileceğini bu süreçte daha derinden deneyimledim.</p>
              <p>Daha sonra Kırşehir Belediyesi Engelsiz Yaşam Merkezi, BEGEM (Beceri ve Meslek Edindirme Merkezi) ve Bağbaşı Aile Yaşam Merkezi'nde Sosyal Çalışmacı ve Aile Danışmanı olarak görev aldım. Çocuklar, ergenler, yetişkinler, çiftler, aileler ve engelli bireylerle yürüttüğüm danışmanlık süreçlerinde yalnızca mevcut problemleri çözmeye odaklanmak yerine; bireylerin kendi potansiyellerini fark etmelerini, sağlıklı ilişki becerileri geliştirmelerini ve yaşam kalitelerini artırmalarını hedefleyen koruyucu, önleyici ve güçlendirici müdahaleler geliştirdim.</p>
              <p>Aile danışmanlığı, sosyal hizmet uygulamaları, psikososyal müdahale, travma, kriz yönetimi, çocuk koruma, iletişim becerileri ve mesleki gelişim alanlarında çok sayıda eğitim programına katılarak kendimi sürekli geliştirmeye devam ettim. Çünkü insan davranışını anlamanın ve etkili bir danışmanlık hizmeti sunmanın, yaşam boyu öğrenmeyi benimsemekten geçtiğine inanıyorum.</p>
              <p>Meslek yaşamım boyunca sosyal hizmetin temel değerleri olan insan hakları, sosyal adalet, eşitlik, etik sorumluluk, gizlilik ve insan onuruna saygı ilkelerini çalışmalarımın merkezine yerleştirdim. Danışmanlık sürecini yalnızca öneriler sunulan bir görüşme olarak değil; danışanın kendisini güven içerisinde ifade edebildiği, yargılanmadan dinlendiği ve değişim için cesaretlendirildiği profesyonel bir iş birliği süreci olarak görüyorum.</p>
              <p>Çalışmalarımda ağırlıklı olarak bireysel danışmanlık, aile danışmanlığı ve çift danışmanlığı alanlarında hizmet vermekteyim. İletişim problemleri, evlilik ve ilişki çatışmaları, boşanma süreci, güven sorunları, öfke yönetimi, kaygı, yaşam olaylarına uyum güçlüğü, ebeveynlik becerileri, aile içi roller, sınır koyma, benlik saygısı, duygusal dayanıklılık ve psikososyal güçlenme gibi birçok konuda danışanlarıma profesyonel destek sunuyorum.</p>
              <p>Mesleki uygulamalarımda sosyal hizmetin güç odaklı yaklaşımı, ekolojik sistem yaklaşımı, çözüm odaklı görüşme teknikleri ve aile danışmanlığı ilkelerinden yararlanıyor; her danışanın yaşam öyküsünü kendine özgü bir bütün olarak değerlendiriyorum. Benim için hiçbir danışan yalnızca yaşadığı problemden ibaret değildir. Her bireyin geçmişi, yaşam deneyimleri, güçlü yönleri ve değişim kapasitesi vardır. Danışmanlık sürecindeki temel hedefim, bu potansiyelin ortaya çıkmasına rehberlik etmektir.</p>
              <p>Akademik gelişimime ve mesleki üretkenliğime de büyük önem veriyorum. Üniversite yıllarında İstanbul Aydın Üniversitesi Sosyal Hizmet Kulübü'nde önce Genel Sekreter, ardından Kulüp Başkanı olarak görev aldım. Bu süreçte çok sayıda bilimsel etkinlik, sosyal sorumluluk projesi, seminer ve öğrenci organizasyonunun planlanması ve yürütülmesinde aktif rol üstlendim. Ayrıca ulusal kongreler, sempozyumlar ve akademik toplantılara katılarak sosyal hizmet alanındaki güncel gelişmeleri yakından takip etmeyi sürdürdüm.</p>
              <p>Sahadaki çalışmalarımın yanı sıra, bilgi ve deneyimlerimi daha geniş kitlelere ulaştırmayı mesleki sorumluluğumun bir parçası olarak görüyorum. Bu doğrultuda dijital platformlarda sosyal hizmet, aile danışmanlığı, psikososyal güçlenme, sağlıklı ilişkiler, ebeveynlik ve kişisel gelişim konularında bilimsel temelli içerikler üretiyor; toplumun ruh sağlığı okuryazarlığını artırmaya katkı sunmayı amaçlıyorum.</p>
              <p>Benim için başarılı bir danışmanlık süreci; danışanın yalnızca sorunlarını konuştuğu değil, kendisini yeniden keşfettiği, yaşamına farklı bir bakış açısıyla yön verebildiği ve geleceğe daha güçlü adımlarla ilerleyebildiği bir gelişim yolculuğudur.</p>
              <p>Her bireyin yaşamında zaman zaman desteğe ihtiyaç duyabileceğine inanıyorum. Doğru zamanda alınan profesyonel destek; yalnızca mevcut sorunların çözümüne değil, daha sağlıklı ilişkiler kurmaya, psikolojik dayanıklılığı artırmaya ve yaşam kalitesini yükseltmeye de önemli katkılar sağlar.</p>
              <p>Eğer siz de yaşamınızın herhangi bir döneminde profesyonel bir bakış açısına ihtiyaç duyuyor, kendinizi daha iyi anlamak, ilişkilerinizi güçlendirmek veya yaşadığınız güçlüklerle daha sağlıklı başa çıkabilmek için güvenilir bir danışmanlık süreci arıyorsanız, bu yolculukta size bilimsel, etik ve insan odaklı bir yaklaşımla eşlik etmekten memnuniyet duyarım.</p>
              <p>Boşanma Danışmanlığı ve Yas Danışmanlığı başta olmak üzere yaşamın farklı dönemlerinde ortaya çıkan psikososyal güçlükler üzerine yoğunlaşmaktayım. Danışanlarımla yürüttüğüm profesyonel süreçlerde, her bireyin yaşam öyküsünü, aile dinamiklerini, sosyal çevresini ve kişisel kaynaklarını birlikte değerlendirerek bilimsel temelli, etik ilkelere bağlı ve kişiye özgü bir danışmanlık yaklaşımı benimsiyorum.</p>
        </article>

        <aside className="aboutDirectProfile">
          <div className="aboutDirectProfile__photo">
            <img src={aboutPhoto} alt="Sosyal Hizmet Uzmanı ve Aile Danışmanı Kaan Özkan" />
          </div>

          <div className="aboutDirectProfile__body">
            <span>AİLE DANIŞMANI</span>
            <h2>Kaan Özkan</h2>
            <p>Sosyal Hizmet Uzmanı</p>

            <div className="aboutDirectProfile__line" />

            <div className="aboutDirectProfile__items">
              <div><Icon name="shield" size={18} /><span>Etik yaklaşım</span></div>
              <div><Icon name="lock" size={18} /><span>Gizlilik</span></div>
              <div><Icon name="heart" size={18} /><span>İnsan odaklı destek</span></div>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}

const styles = `
:root{
  --bg:#020811;
  --bg2:#04101d;
  --panel:#071321;
  --panel2:#091827;
  --line:rgba(255,255,255,.08);
  --line2:rgba(102,174,255,.16);
  --text:#f5f7fb;
  --muted:#8b97a8;
  --muted2:#556477;
  --blue:#2f80ed;
  --blue2:#62b0ff;
  --green:#28d17c;
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{
  margin:0;
  min-width:320px;
  background:var(--bg);
  color:var(--text);
  font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;
  -webkit-font-smoothing:antialiased;
}
a{text-decoration:none;color:inherit}
button{font:inherit}
.pageShell{min-height:100vh;background:linear-gradient(180deg,#020811 0%,#03101d 45%,#020811 100%)}
.topbar{
  position:sticky;
  top:0;
  z-index:1000;
  height:88px;
  padding:0 5.2%;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:30px;
  border-bottom:1px solid rgba(255,255,255,.06);
  background:rgba(2,8,17,.88);
  backdrop-filter:blur(18px);
}
.brand{display:flex;align-items:center;gap:14px;min-width:max-content}
.brandMark{
  width:46px;height:46px;display:grid;place-items:center;
  color:#f4f7fb;font-family:Georgia,"Times New Roman",serif;
  font-size:27px;letter-spacing:-.12em;
  border-right:1px solid rgba(255,255,255,.14);
  padding-right:10px;
}
.brandText{display:flex;flex-direction:column;gap:4px}
.brandText strong{font-size:12px;letter-spacing:.18em;font-weight:500}
.brandText span{font-size:7px;letter-spacing:.34em;color:#6f7e90}
.nav{display:flex;align-items:center;gap:34px}
.nav a{position:relative;color:#9aa5b4;font-size:10px;padding:10px 0}
.nav a:after{content:"";position:absolute;left:0;bottom:1px;width:0;height:1px;background:#4d9fff;transition:.25s}
.nav a:hover{color:#fff}.nav a:hover:after{width:100%}
.topCta{
  display:flex;align-items:center;gap:10px;
  padding:11px 17px;border:1px solid rgba(78,154,248,.28);
  border-radius:7px;background:rgba(47,128,237,.035);
  color:#f2f6fb;font-size:9px;letter-spacing:.08em;
}
.menuBtn{display:none;width:43px;height:43px;border:1px solid var(--line);border-radius:50%;background:transparent;align-items:center;justify-content:center;flex-direction:column;gap:6px}
.menuBtn span{width:17px;height:1px;background:#dfe6ef}

.hero{
  position:relative;
  min-height:calc(100vh - 88px);
  padding:78px 5.2% 58px;
  display:grid;
  grid-template-columns:1.03fr .97fr;
  align-items:center;
  gap:5vw;
  overflow:hidden;
  border-bottom:1px solid var(--line);
  background:
    radial-gradient(circle at 78% 27%,rgba(35,97,196,.13),transparent 28%),
    linear-gradient(90deg,#020811 0%,#03101b 55%,#041223 100%);
}
.heroGlow{position:absolute;border-radius:50%;filter:blur(110px);pointer-events:none}
.heroGlow--one{width:440px;height:440px;left:-170px;top:15%;background:rgba(31,82,164,.08)}
.heroGlow--two{width:520px;height:520px;right:-130px;top:12%;background:rgba(47,128,237,.11)}
.heroCopy{position:relative;z-index:5}
.eyebrow{display:flex;align-items:center;gap:10px;color:#4f9cf3;font-size:8px;letter-spacing:.2em}
.eyebrow span{width:18px;height:1px;background:#4d9fff}
.hero h1{
  margin-top:22px;font-family:Georgia,"Times New Roman",serif;
  font-size:clamp(58px,6vw,100px);font-weight:400;letter-spacing:-.045em;line-height:.94;
}
.hero h1 strong{color:#4d98ff;font-weight:400}
.heroLead{max-width:610px;margin-top:24px;color:#9aa5b4;font-size:13px;line-height:1.8}
.valueStrip{max-width:760px;margin-top:28px;display:grid;grid-template-columns:repeat(4,1fr);border-block:1px solid var(--line)}
.valueItem{min-height:78px;padding:15px 14px 15px 0;display:flex;align-items:center;gap:11px;border-right:1px solid var(--line)}
.valueItem:not(:first-child){padding-left:14px}.valueItem:last-child{border-right:0}
.valueIcon{width:34px;height:34px;flex:0 0 auto;display:grid;place-items:center;border:1px solid rgba(80,158,255,.16);border-radius:8px;background:rgba(47,128,237,.045);color:#5da9ff}
.valueItem strong{display:block;font-size:7px;letter-spacing:.13em}.valueItem span{display:block;margin-top:5px;color:#647286;font-size:7px;line-height:1.4}
.heroActions{display:flex;gap:10px;margin-top:28px}
.btn{display:inline-flex;align-items:center;justify-content:space-between;gap:20px;min-width:180px;padding:13px 17px;border-radius:6px;font-size:8px;font-weight:600;letter-spacing:.07em}
.btnPrimary{background:linear-gradient(135deg,#1763d8,#338af5);box-shadow:0 14px 38px rgba(20,91,205,.23)}
.btnGhost{border:1px solid var(--line);background:rgba(255,255,255,.015);color:#c8d2de}
.btnSmall{margin-top:24px;min-width:210px}
.heroTrust{margin-top:28px;display:flex;align-items:center;gap:14px}
.trustDots{display:flex}.trustDots span{width:28px;height:28px;margin-left:-6px;display:grid;place-items:center;border:2px solid #020811;border-radius:50%;background:#0d1a2c;color:#7ba8dd;font-size:6px}.trustDots span:first-child{margin-left:0;background:#194f9d;color:#fff}
.heroTrust strong{display:block;font-size:8px;color:#ccd5df}.heroTrust p{margin-top:4px;color:#4f5e72;font-size:7px}

.heroVisual{position:relative;z-index:4;min-height:610px;display:grid;place-items:center}
.visualGrid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px);background-size:48px 48px;mask-image:radial-gradient(circle at center,#000 0%,transparent 73%);opacity:.5}
.visualRing{position:absolute;border:1px solid rgba(74,151,248,.11);border-radius:50%}
.visualRing--one{width:500px;height:500px}.visualRing--two{width:360px;height:360px;border-style:dashed;opacity:.45}
.heroPanel{
  position:relative;z-index:3;width:min(390px,78%);min-height:505px;padding:30px;
  border:1px solid rgba(255,255,255,.1);border-radius:26px;
  background:linear-gradient(150deg,rgba(13,29,50,.92),rgba(5,13,24,.82));
  box-shadow:0 46px 110px rgba(0,0,0,.42),inset 0 1px 0 rgba(255,255,255,.04);
}
.panelTop{display:flex;align-items:center;gap:8px;color:#5a6a7f;font-size:7px;letter-spacing:.18em}
.onlineDot{width:7px;height:7px;border-radius:50%;background:#33d683;box-shadow:0 0 12px rgba(51,214,131,.8)}
.panelLogo{height:245px;display:grid;place-items:center;color:transparent;-webkit-text-stroke:1px rgba(91,169,255,.48);font-family:Georgia,"Times New Roman",serif;font-size:112px;letter-spacing:-.12em;text-shadow:0 0 36px rgba(47,128,237,.12)}
.panelText{text-align:center}.panelText span{font-size:7px;letter-spacing:.28em;color:#65758a}.panelText strong{display:block;margin-top:8px;color:#60adff;font-size:11px;font-weight:500;letter-spacing:.36em}.panelText p{margin-top:12px;color:#718096;font-size:9px}
.panelMetrics{margin-top:25px;padding-top:20px;border-top:1px solid var(--line);display:grid;grid-template-columns:repeat(3,1fr)}
.panelMetrics div{text-align:center;border-right:1px solid var(--line)}.panelMetrics div:last-child{border-right:0}.panelMetrics strong{display:block;color:#5ba9ff;font-size:8px}.panelMetrics span{display:block;margin-top:5px;color:#4f5e72;font-size:6px;letter-spacing:.1em}
.floatCard{position:absolute;z-index:5;min-width:165px;padding:14px;display:flex;align-items:center;gap:11px;border:1px solid var(--line);border-radius:14px;background:rgba(6,15,27,.78);backdrop-filter:blur(15px);box-shadow:0 20px 45px rgba(0,0,0,.28);color:#5ba9ff}
.floatCard strong{display:block;color:#c7d2df;font-size:8px}.floatCard span{display:block;margin-top:4px;color:#536277;font-size:7px}.floatCard--a{right:0;top:18%}.floatCard--b{left:0;bottom:22%}
.heroMini{position:absolute;z-index:5;right:3%;bottom:3%;width:220px;padding:18px;border:1px solid var(--line);border-radius:15px;background:rgba(6,15,27,.84);box-shadow:0 20px 45px rgba(0,0,0,.25)}
.heroMini span{color:#4f9cf3;font-size:6px;letter-spacing:.17em}.heroMini strong{display:block;margin-top:8px;font-family:Georgia,"Times New Roman",serif;font-size:22px;font-weight:400}.heroMini p{margin-top:8px;color:#677589;font-size:8px;line-height:1.55}

.section{padding:86px 5.2%}
.sectionTop{display:flex;align-items:flex-end;justify-content:space-between;gap:30px;margin-bottom:34px}
.sectionEyebrow{color:#4f9cf3;font-size:8px;letter-spacing:.2em}
.sectionTop h2,.aboutText h2,.contactLead h2{
  max-width:900px;margin-top:9px;font-family:Georgia,"Times New Roman",serif;
  font-size:clamp(34px,4vw,58px);font-weight:400;letter-spacing:-.035em;
}
.sectionLink{display:flex;align-items:center;gap:9px;color:#4f9cf3;font-size:8px;letter-spacing:.08em}

.servicesSection{background:linear-gradient(180deg,#03101d,#020a14);border-bottom:1px solid var(--line)}
.serviceGrid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
.serviceCard{min-height:300px;padding:25px;border:1px solid var(--line);border-radius:15px;background:linear-gradient(145deg,#071421,#06101b);box-shadow:inset 0 1px 0 rgba(255,255,255,.025)}
.serviceIcon{width:42px;height:42px;display:grid;place-items:center;border:1px solid rgba(79,156,243,.15);border-radius:9px;background:rgba(47,128,237,.04);color:#4f9cf3}
.serviceCard h3{margin-top:25px;font-family:Georgia,"Times New Roman",serif;font-size:20px;font-weight:400}
.serviceCard p{margin-top:13px;color:#7b8798;font-size:10px;line-height:1.7}
.serviceCard a{margin-top:24px;display:flex;align-items:center;gap:8px;color:#4f9cf3;font-size:7px;letter-spacing:.08em}

.aboutSection{background:#020a14;border-bottom:1px solid var(--line)}
.aboutCard{display:grid;grid-template-columns:.82fr 1.18fr;gap:42px;align-items:stretch}
.aboutMonogram{min-height:390px;display:flex;flex-direction:column;align-items:center;justify-content:center;border:1px solid var(--line);border-radius:16px;background:radial-gradient(circle at center,rgba(47,128,237,.08),transparent 55%),linear-gradient(145deg,#071421,#06101b)}
.aboutMonogramRing{width:190px;height:190px;display:grid;place-items:center;border:1px solid rgba(79,156,243,.14);border-radius:50%;color:transparent;-webkit-text-stroke:1px rgba(91,169,255,.5);font-family:Georgia,"Times New Roman",serif;font-size:70px;letter-spacing:-.1em}
.aboutMonogram span{margin-top:22px;color:#59697e;font-size:7px;letter-spacing:.28em}
.aboutText{padding:24px 0}
.aboutText p{max-width:760px;margin-top:18px;color:#8793a4;font-size:12px;line-height:1.8}
.aboutStats{margin-top:30px;display:grid;grid-template-columns:repeat(4,1fr);border-block:1px solid var(--line)}
.aboutStats div{padding:18px 16px 18px 0;border-right:1px solid var(--line)}.aboutStats div:not(:first-child){padding-left:16px}.aboutStats div:last-child{border-right:0}.aboutStats strong{display:block;font-size:16px;font-weight:500}.aboutStats span{display:block;margin-top:5px;color:#5d6c80;font-size:7px}

.processSection{background:linear-gradient(180deg,#020a14,#03101d);border-bottom:1px solid var(--line)}
.processLine{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid rgba(79,156,243,.16)}
.processStep{position:relative;min-height:230px;padding:28px 20px 0 0;border-right:1px solid var(--line)}.processStep:not(:first-child){padding-left:20px}.processStep:last-child{border-right:0}
.stepNumber{position:absolute;top:-15px;left:0;width:30px;height:30px;display:grid;place-items:center;border:1px solid rgba(79,156,243,.3);border-radius:50%;background:#0a2e61;color:#fff;font-size:8px;box-shadow:0 0 18px rgba(47,128,237,.22)}
.processStep:not(:first-child) .stepNumber{left:20px}
.stepIcon{width:48px;height:48px;margin-top:22px;display:grid;place-items:center;border:1px solid rgba(79,156,243,.14);border-radius:50%;color:#5ba9ff}
.processStep h3{margin-top:17px;font-size:13px;font-weight:500}.processStep p{margin-top:10px;color:#718096;font-size:9px;line-height:1.65}

.contactSection{background:#020a14}
.contactLead{margin-bottom:30px}.contactLead p{max-width:620px;margin-top:13px;color:#7e8a9b;font-size:11px;line-height:1.7}
.contactGrid{display:grid;grid-template-columns:repeat(5,1fr);gap:10px}
.contactCard{min-height:145px;padding:20px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;border:1px solid var(--line);border-radius:12px;background:linear-gradient(145deg,#071421,#06101b)}
.contactIcon{color:#4f9cf3}.contactIcon--green{color:#28d17c}.contactCard strong{margin-top:12px;font-size:11px;font-weight:500}.contactCard span{margin-top:7px;color:#667589;font-size:8px}
.contactCard--cta{border-color:rgba(79,156,243,.45);background:linear-gradient(145deg,rgba(18,63,130,.28),rgba(6,16,28,.95));color:#fff}.contactCard--cta>svg{margin-top:10px;color:#4f9cf3}

.footer{padding:48px 5.2% 22px;border-top:1px solid var(--line);background:#01060d}
.footerBrand{display:flex;align-items:center;gap:18px}.footerBrand>div:last-child{display:flex;flex-direction:column;gap:5px}.footerBrand strong{font-size:11px;letter-spacing:.18em}.footerBrand span{color:#657488;font-size:7px;letter-spacing:.28em}.footerBrand p{margin-top:8px;color:#46556a;font-size:8px}
.footerCols{margin-top:35px;display:grid;grid-template-columns:1fr 1fr;gap:50px;max-width:500px}.footerCols>div{display:flex;flex-direction:column;align-items:flex-start}.footerCols span{margin-bottom:13px;color:#526176;font-size:7px;letter-spacing:.18em}.footerCols a{margin-bottom:8px;color:#788598;font-size:8px}
.footerBottom{margin-top:30px;padding-top:18px;border-top:1px solid rgba(255,255,255,.055);color:#3d4a5d;font-size:7px}


/* PREMIUM MOTION LAYER */
.scrollProgress{
  position:fixed;
  top:0;
  left:0;
  z-index:5000;
  width:100%;
  height:2px;
  transform-origin:left center;
  background:linear-gradient(90deg,#2f80ed,#68b7ff,#d9efff);
  box-shadow:0 0 15px rgba(78,158,255,.45);
  pointer-events:none;
}
.reveal{
  opacity:0;
  transform:translateY(34px);
  filter:blur(7px);
  transition:
    opacity .8s cubic-bezier(.16,.8,.2,1),
    transform .8s cubic-bezier(.16,.8,.2,1),
    filter .8s ease;
}
.revealRight{
  transform:translateX(42px);
}
.reveal.is-visible{
  opacity:1;
  transform:none;
  filter:none;
}
.serviceCard:nth-child(2).reveal{transition-delay:.06s}
.serviceCard:nth-child(3).reveal{transition-delay:.12s}
.serviceCard:nth-child(4).reveal{transition-delay:.18s}
.processStep:nth-child(2).reveal{transition-delay:.06s}
.processStep:nth-child(3).reveal{transition-delay:.12s}
.processStep:nth-child(4).reveal{transition-delay:.18s}
.contactCard:nth-child(2).reveal{transition-delay:.05s}
.contactCard:nth-child(3).reveal{transition-delay:.1s}
.contactCard:nth-child(4).reveal{transition-delay:.15s}
.contactCard:nth-child(5).reveal{transition-delay:.2s}

.heroPanel{
  transition:transform .45s ease,border-color .45s ease,box-shadow .45s ease;
}
.heroPanel:hover{
  transform:translateY(-6px);
  border-color:rgba(88,164,255,.2);
  box-shadow:0 56px 130px rgba(0,0,0,.5),0 0 45px rgba(47,128,237,.08),inset 0 1px 0 rgba(255,255,255,.05);
}
.floatCard{
  animation:floatSoft 4.8s ease-in-out infinite;
}
.floatCard--b{animation-delay:.7s}
.heroMini{animation:floatSoft 5.4s .3s ease-in-out infinite}
.visualRing--one{animation:rotateSlow 28s linear infinite}
.visualRing--two{animation:rotateReverse 22s linear infinite}
.panelLogo{
  animation:logoBreath 4.6s ease-in-out infinite alternate;
}
.valueIcon,.serviceIcon,.contactIcon,.stepIcon{
  transition:transform .35s ease,border-color .35s ease,background .35s ease;
}
.valueItem:hover .valueIcon,
.serviceCard:hover .serviceIcon,
.contactCard:hover .contactIcon,
.processStep:hover .stepIcon{
  transform:translateY(-3px) scale(1.04);
  border-color:rgba(90,170,255,.28);
  background:rgba(47,128,237,.075);
}
.serviceCard,.contactCard,.processStep{
  transition:transform .35s ease,border-color .35s ease,background .35s ease,box-shadow .35s ease;
}
.serviceCard:hover,.contactCard:hover{
  transform:translateY(-5px);
  border-color:rgba(79,156,243,.18);
  box-shadow:0 24px 60px rgba(0,0,0,.18);
}
.processStep:hover{
  background:rgba(47,128,237,.025);
}
.btn,.topCta,.sectionLink{
  transition:transform .3s ease,box-shadow .3s ease,color .3s ease,border-color .3s ease;
}
.btn:hover,.topCta:hover{
  transform:translateY(-2px);
}
.btnPrimary:hover{
  box-shadow:0 20px 48px rgba(20,91,205,.34);
}
.btnGhost:hover,.topCta:hover{
  border-color:rgba(79,156,243,.28);
}
.sectionLink:hover{color:#86c1ff}
.heroCopy{
  animation:heroCopyIn .9s .1s both cubic-bezier(.16,.8,.2,1);
}
.heroVisual{
  animation:heroVisualIn .95s .2s both cubic-bezier(.16,.8,.2,1);
}
@keyframes heroCopyIn{
  from{opacity:0;transform:translateY(28px);filter:blur(8px)}
  to{opacity:1;transform:none;filter:none}
}
@keyframes heroVisualIn{
  from{opacity:0;transform:translateX(38px);filter:blur(8px)}
  to{opacity:1;transform:none;filter:none}
}
@keyframes floatSoft{
  0%,100%{transform:translateY(0)}
  50%{transform:translateY(-8px)}
}
@keyframes rotateSlow{
  from{transform:rotate(0)}
  to{transform:rotate(360deg)}
}
@keyframes rotateReverse{
  from{transform:rotate(360deg)}
  to{transform:rotate(0)}
}
@keyframes logoBreath{
  from{text-shadow:0 0 24px rgba(47,128,237,.09)}
  to{text-shadow:0 0 42px rgba(47,128,237,.2)}
}
@media(prefers-reduced-motion:reduce){
  html{scroll-behavior:auto}
  *,*::before,*::after{
    animation-duration:.01ms!important;
    animation-iteration-count:1!important;
    transition-duration:.01ms!important;
  }
  .reveal{opacity:1!important;transform:none!important;filter:none!important}
}

@media(max-width:1050px){
  .nav{gap:20px}.hero{grid-template-columns:1fr;gap:40px}.heroVisual{min-height:560px}.valueStrip{max-width:none}
  .serviceGrid{grid-template-columns:repeat(2,1fr)}.contactGrid{grid-template-columns:repeat(3,1fr)}
}
@media(max-width:820px){
  .topbar{height:76px;padding:0 18px}.nav{position:fixed;top:76px;left:0;right:0;max-height:0;overflow:hidden;display:flex;flex-direction:column;align-items:stretch;gap:0;padding:0 20px;background:rgba(2,8,17,.98);transition:.3s}.nav--open{max-height:350px;padding:12px 20px 20px;border-bottom:1px solid var(--line)}.nav a{padding:13px 0;border-bottom:1px solid var(--line)}.topCta{display:none}.menuBtn{display:flex}
  .hero{padding:56px 18px}.hero h1{font-size:clamp(50px,13vw,74px)}.valueStrip{grid-template-columns:repeat(2,1fr)}.valueItem:nth-child(2){border-right:0}.valueItem:nth-child(3),.valueItem:nth-child(4){border-top:1px solid var(--line)}.heroActions{flex-direction:column}.btn{width:100%}
  .section{padding:70px 18px}.sectionTop{align-items:flex-start;flex-direction:column}.aboutCard{grid-template-columns:1fr}.processLine{grid-template-columns:1fr;border-top:0}.processStep,.processStep:not(:first-child){padding:24px 0 24px 62px;border-right:0;border-bottom:1px solid var(--line)}.stepNumber,.processStep:not(:first-child) .stepNumber{left:0;top:26px}.stepIcon{margin-top:0}.contactGrid{grid-template-columns:repeat(2,1fr)}
}
@media(max-width:560px){
  .brandText strong{font-size:9px}.brandText span{font-size:6px}.brandMark{width:39px;height:39px;font-size:22px}
  .hero{padding-top:44px}.heroLead{font-size:12px}.valueStrip{grid-template-columns:1fr}.valueItem,.valueItem:not(:first-child){padding:13px 0;border-right:0;border-top:1px solid var(--line)}.valueItem:first-child{border-top:0}
  .heroVisual{min-height:470px}.visualRing--one{width:350px;height:350px}.visualRing--two{width:270px;height:270px}.heroPanel{width:82%;min-height:410px;padding:24px}.panelLogo{height:190px;font-size:86px}.floatCard{display:none}.heroMini{right:0;bottom:0;width:185px}
  .serviceGrid{grid-template-columns:1fr}.aboutMonogram{min-height:320px}.aboutMonogramRing{width:155px;height:155px;font-size:58px}.aboutStats{grid-template-columns:repeat(2,1fr)}.aboutStats div{border-bottom:1px solid var(--line)}.aboutStats div:nth-child(2){border-right:0}.aboutStats div:nth-child(3),.aboutStats div:nth-child(4){border-bottom:0}
  .contactGrid{grid-template-columns:1fr 1fr}.contactCard--cta{grid-column:1/-1}
}

/* STEP 29 — PREMIUM PROFESSIONAL SERVICES */
.premiumServicesSection{
  position:relative;
  padding-top:100px;
  padding-bottom:105px;
  overflow:hidden;
  background:
    radial-gradient(circle at 12% 15%,rgba(210,139,53,.045),transparent 24%),
    radial-gradient(circle at 88% 72%,rgba(47,128,237,.055),transparent 27%);
}
.premiumServicesSection:before{
  content:"";
  position:absolute;
  inset:0;
  pointer-events:none;
  opacity:.22;
  background-image:
    linear-gradient(rgba(255,255,255,.015) 1px,transparent 1px),
    linear-gradient(90deg,rgba(255,255,255,.015) 1px,transparent 1px);
  background-size:72px 72px;
}
.premiumServicesHead{
  position:relative;
  z-index:2;
  display:grid;
  grid-template-columns:1.15fr .85fr;
  gap:50px;
  align-items:end;
  margin-bottom:42px;
}
.premiumServicesEyebrow{
  display:inline-flex;
  align-items:center;
  gap:12px;
  color:#d89139;
  font-size:8px;
  font-weight:700;
  letter-spacing:.20em;
}
.premiumServicesEyebrow:before{
  content:"";
  width:28px;
  height:1px;
  background:linear-gradient(90deg,#eda94e,#9d5b1e);
}
.premiumServicesHead h2{
  margin-top:13px;
  max-width:720px;
  font-family:Georgia,"Times New Roman",serif;
  font-size:clamp(42px,4.7vw,70px);
  font-weight:400;
  line-height:.98;
  letter-spacing:-.04em;
  color:#f4f1ec;
}
.premiumServicesHead h2 em{
  display:block;
  font-style:normal;
  color:transparent;
  background:linear-gradient(180deg,#efb15b,#ca7c29);
  -webkit-background-clip:text;
  background-clip:text;
}
.premiumServicesHead>p{
  max-width:520px;
  padding-left:25px;
  border-left:1px solid rgba(217,145,57,.30);
  color:#939ba5;
  font-size:12px;
  line-height:1.85;
}
.premiumServicesGrid{
  position:relative;
  z-index:2;
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:14px;
}
.premiumServiceCard{
  position:relative;
  min-height:480px;
  padding:25px 23px 28px;
  overflow:hidden;
  border:1px solid rgba(218,147,61,.16);
  border-radius:17px;
  background:
    radial-gradient(circle at 100% 0,rgba(54,132,226,.07),transparent 31%),
    linear-gradient(155deg,rgba(8,23,39,.96),rgba(4,13,24,.94));
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.025),
    0 24px 55px rgba(0,0,0,.17);
  transition:transform .32s ease,border-color .32s ease,box-shadow .32s ease;
}
.premiumServiceCard:after{
  content:"";
  position:absolute;
  left:20%;right:20%;bottom:-1px;
  height:1px;
  opacity:.5;
  background:linear-gradient(90deg,transparent,#d88c34,transparent);
}
.premiumServiceCard:hover{
  transform:translateY(-7px);
  border-color:rgba(229,158,71,.32);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.035),
    0 34px 70px rgba(0,0,0,.25),
    0 0 35px rgba(193,116,29,.04);
}
.premiumServiceCardTop{
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding-bottom:20px;
  border-bottom:1px solid rgba(255,255,255,.065);
}
.premiumServiceNumber{
  font-family:Georgia,"Times New Roman",serif;
  color:#485364;
  font-size:28px;
  letter-spacing:-.05em;
}
.premiumServiceIcon{
  width:47px;
  height:47px;
  display:grid;
  place-items:center;
  border:1px solid rgba(221,151,66,.24);
  border-radius:12px;
  color:#e49b43;
  background:rgba(197,119,29,.045);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.025);
}
.premiumServiceList{
  margin-top:18px;
  display:flex;
  flex-direction:column;
}
.premiumServiceItem{
  min-height:57px;
  padding:12px 0;
  display:grid;
  grid-template-columns:16px 1fr;
  gap:9px;
  align-items:start;
  border-bottom:1px solid rgba(255,255,255,.045);
  color:#d1d4d7;
  font-size:11px;
  font-weight:500;
  line-height:1.55;
}
.premiumServiceItem:last-child{border-bottom:0}
.premiumServiceDot{
  padding-top:1px;
  color:#d58b35;
  font-size:9px;
  text-shadow:0 0 10px rgba(213,139,53,.28);
}
.premiumServicesNote{
  position:relative;
  z-index:2;
  margin-top:18px;
  padding:20px 24px;
  display:grid;
  grid-template-columns:auto 1fr auto;
  gap:16px;
  align-items:center;
  border:1px solid rgba(255,255,255,.065);
  border-radius:14px;
  background:linear-gradient(90deg,rgba(7,20,34,.92),rgba(5,15,27,.88));
}
.premiumServicesNote>span{
  color:#df963d;
  font-size:16px;
}
.premiumServicesNote p{
  color:#828d9a;
  font-size:10px;
  line-height:1.6;
}
.premiumServicesNote a{
  display:flex;
  align-items:center;
  gap:10px;
  color:#e6a24b;
  font-size:8px;
  font-weight:700;
  letter-spacing:.10em;
}
@media(max-width:1180px){
  .premiumServicesGrid{grid-template-columns:repeat(2,1fr)}
  .premiumServiceCard{min-height:auto}
}
@media(max-width:760px){
  .premiumServicesSection{padding-top:72px;padding-bottom:72px}
  .premiumServicesHead{grid-template-columns:1fr;gap:22px}
  .premiumServicesHead h2{font-size:clamp(38px,11vw,54px)}
  .premiumServicesHead>p{padding-left:18px}
  .premiumServicesGrid{grid-template-columns:1fr}
  .premiumServiceCard{padding:22px 20px}
  .premiumServiceItem{font-size:12px}
  .premiumServicesNote{grid-template-columns:auto 1fr}
  .premiumServicesNote a{grid-column:2}
}

/* STEP 30 — DEDICATED PREMIUM SERVICES PAGE */
.servicesDetailPage{
  min-height:100vh;
  color:#f5f1eb;
  background:
    radial-gradient(circle at 78% 10%,rgba(44,111,200,.10),transparent 25%),
    linear-gradient(180deg,#020914 0%,#020a14 55%,#020811 100%);
}
.servicesDetailHero{
  position:relative;
  min-height:680px;
  padding:112px 5.2% 76px;
  display:grid;
  grid-template-columns:1.15fr .85fr;
  gap:6vw;
  align-items:center;
  overflow:hidden;
  border-bottom:1px solid rgba(255,255,255,.055);
}
.servicesDetailHero__grid{
  position:absolute;inset:0;pointer-events:none;opacity:.25;
  background-image:
    linear-gradient(rgba(255,255,255,.016) 1px,transparent 1px),
    linear-gradient(90deg,rgba(255,255,255,.016) 1px,transparent 1px);
  background-size:70px 70px;
  mask-image:linear-gradient(to bottom,black,transparent 94%);
}
.servicesDetailHero__glow{position:absolute;border-radius:50%;filter:blur(110px);pointer-events:none}
.servicesDetailHero__glow--one{width:560px;height:560px;right:-100px;top:5%;background:rgba(47,128,237,.11)}
.servicesDetailHero__glow--two{width:350px;height:350px;left:-130px;bottom:0;background:rgba(205,131,38,.05)}
.servicesBack{
  position:absolute;left:5.2%;top:32px;z-index:5;
  display:flex;align-items:center;gap:11px;color:#928f89;font-size:8px;letter-spacing:.08em;
}
.servicesBack span{color:#dd963d;font-size:16px}
.servicesDetailHero__copy{position:relative;z-index:3;max-width:840px}
.servicesDetailEyebrow{display:flex;align-items:center;gap:13px;color:#dc943b;font-size:9px;font-weight:700;letter-spacing:.18em}
.servicesDetailEyebrow span{width:27px;height:1px;background:linear-gradient(90deg,#efad52,#9f5d1f)}
.servicesDetailHero h1{
  margin-top:24px;font-family:Georgia,"Times New Roman",serif;
  font-size:clamp(62px,6.5vw,108px);font-weight:400;line-height:.88;letter-spacing:-.055em;
}
.servicesDetailHero h1 strong{
  color:transparent;font-weight:400;
  background:linear-gradient(180deg,#efb15b,#c87b28);
  -webkit-background-clip:text;background-clip:text;
}
.servicesDetailHero__copy>p{
  max-width:720px;margin-top:30px;color:#aba8a3;font-size:14px;line-height:1.9;
}
.servicesDetailHero__meta{
  margin-top:34px;display:grid;grid-template-columns:repeat(4,1fr);
  border-block:1px solid rgba(255,255,255,.065);
}
.servicesDetailHero__meta div{padding:18px 18px 18px 0;border-right:1px solid rgba(255,255,255,.055)}
.servicesDetailHero__meta div:not(:first-child){padding-left:18px}
.servicesDetailHero__meta div:last-child{border-right:0}
.servicesDetailHero__meta strong{display:block;color:#dd943b;font-size:8px}
.servicesDetailHero__meta span{display:block;margin-top:7px;color:#69778a;font-size:8px}

.servicesDetailIntroCard{
  position:relative;z-index:3;min-height:400px;padding:38px;
  border:1px solid rgba(221,151,65,.22);border-radius:25px;
  background:
    radial-gradient(circle at 78% 12%,rgba(47,128,237,.08),transparent 27%),
    linear-gradient(145deg,rgba(9,24,40,.94),rgba(4,13,24,.92));
  box-shadow:0 40px 100px rgba(0,0,0,.32),inset 0 1px 0 rgba(255,255,255,.035);
}
.servicesDetailIntroCard:before{
  content:"";position:absolute;left:25%;right:25%;top:-1px;height:1px;
  background:linear-gradient(90deg,transparent,#e4a24d,transparent);
}
.servicesDetailIntroCard__icon{
  width:62px;height:62px;display:grid;place-items:center;
  border:1px solid rgba(229,161,75,.26);border-radius:15px;
  color:#e5a04a;background:rgba(200,119,28,.045);
}
.servicesDetailIntroCard>span{display:block;margin-top:30px;color:#d89037;font-size:8px;letter-spacing:.2em}
.servicesDetailIntroCard h2{
  margin-top:12px;font-family:Georgia,"Times New Roman",serif;font-size:36px;font-weight:400;line-height:1.08;
}
.servicesDetailIntroCard p{margin-top:18px;color:#8d969f;font-size:11px;line-height:1.8}
.servicesDetailIntroCard a{
  margin-top:28px;padding:14px 17px;display:flex;align-items:center;justify-content:space-between;
  border:1px solid rgba(224,153,67,.24);border-radius:9px;
  background:linear-gradient(135deg,rgba(190,111,24,.16),rgba(47,128,237,.045));
  color:#eca94f;font-size:9px;font-weight:700;letter-spacing:.08em;
}

.servicesDetailGridSection{
  padding:100px 5.2%;
  background:
    radial-gradient(circle at 10% 20%,rgba(200,129,40,.035),transparent 22%),
    #020a14;
}
.servicesDetailSectionHead>span{color:#d88f38;font-size:8px;letter-spacing:.2em}
.servicesDetailSectionHead h2{
  max-width:850px;margin-top:12px;font-family:Georgia,"Times New Roman",serif;
  font-size:clamp(38px,4.5vw,64px);font-weight:400;line-height:1.03;
}
.servicesDetailGrid{margin-top:40px;display:grid;grid-template-columns:repeat(2,1fr);gap:14px}
.servicesDetailCard{
  min-height:500px;padding:30px;
  border:1px solid rgba(222,151,65,.16);border-radius:18px;
  background:
    radial-gradient(circle at 100% 0,rgba(47,128,237,.06),transparent 27%),
    linear-gradient(150deg,rgba(8,22,38,.96),rgba(4,13,24,.94));
  box-shadow:inset 0 1px 0 rgba(255,255,255,.025),0 24px 55px rgba(0,0,0,.16);
  transition:transform .32s ease,border-color .32s ease,box-shadow .32s ease;
}
.servicesDetailCard:hover{
  transform:translateY(-6px);border-color:rgba(232,163,80,.32);
  box-shadow:0 34px 70px rgba(0,0,0,.23);
}
.servicesDetailCard__top{display:flex;align-items:center;justify-content:space-between;gap:20px;padding-bottom:22px;border-bottom:1px solid rgba(255,255,255,.06)}
.servicesDetailCard__no{color:#5a6471;font-family:Georgia,"Times New Roman",serif;font-size:26px}
.servicesDetailCard h3{margin-top:8px;font-family:Georgia,"Times New Roman",serif;font-size:25px;font-weight:400}
.servicesDetailCard__icon{
  width:51px;height:51px;display:grid;place-items:center;border:1px solid rgba(226,156,71,.24);
  border-radius:13px;color:#df983f;background:rgba(190,111,24,.04);
}
.servicesDetailCard__list{margin-top:12px}
.servicesDetailItem{
  min-height:56px;padding:13px 0;display:grid;grid-template-columns:17px 1fr;gap:10px;align-items:start;
  border-bottom:1px solid rgba(255,255,255,.045);
}
.servicesDetailItem:last-child{border-bottom:0}
.servicesDetailItem>span{color:#d88f38;font-size:9px;padding-top:2px}
.servicesDetailItem p{color:#c7c9ca;font-size:11px;line-height:1.6}

.servicesDetailNote{
  margin:0 5.2% 90px;padding:30px 34px;display:grid;grid-template-columns:auto 1fr auto;
  align-items:center;gap:24px;border:1px solid rgba(222,151,65,.15);border-radius:18px;
  background:linear-gradient(145deg,#071421,#06101b);
}
.servicesDetailNote__icon{
  width:52px;height:52px;display:grid;place-items:center;border:1px solid rgba(224,153,67,.24);
  border-radius:13px;color:#e19a42;
}
.servicesDetailNote span{color:#d88f38;font-size:7px;letter-spacing:.18em}
.servicesDetailNote h3{margin-top:7px;font-size:15px;font-weight:500}
.servicesDetailNote p{margin-top:7px;max-width:780px;color:#7f8995;font-size:10px;line-height:1.7}
.servicesDetailNote>a{display:flex;align-items:center;gap:10px;color:#e5a149;font-size:8px;font-weight:700;letter-spacing:.08em}

@media(max-width:980px){
  .servicesDetailHero{grid-template-columns:1fr;padding:100px 20px 65px}
  .servicesBack{left:20px;top:24px}
  .servicesDetailIntroCard{max-width:700px}
}
@media(max-width:760px){
  .servicesDetailHero h1{font-size:clamp(50px,13vw,72px)}
  .servicesDetailHero__meta{grid-template-columns:repeat(2,1fr)}
  .servicesDetailHero__meta div:nth-child(2){border-right:0}
  .servicesDetailHero__meta div:nth-child(3),.servicesDetailHero__meta div:nth-child(4){border-top:1px solid rgba(255,255,255,.055)}
  .servicesDetailGridSection{padding:75px 18px}
  .servicesDetailGrid{grid-template-columns:1fr}
  .servicesDetailCard{min-height:auto;padding:24px 21px}
  .servicesDetailItem p{font-size:12px}
  .servicesDetailNote{margin:0 18px 72px;grid-template-columns:auto 1fr;padding:24px 20px}
  .servicesDetailNote>a{grid-column:2}
}

/* STEP 31 — DEDICATED PREMIUM PROCESS PAGE */
.processDetailPage{
  min-height:100vh;
  color:#f5f1eb;
  background:
    radial-gradient(circle at 82% 12%,rgba(45,111,200,.10),transparent 25%),
    linear-gradient(180deg,#020914 0%,#020a14 58%,#020811 100%);
}
.processDetailHero{
  position:relative;
  min-height:690px;
  padding:112px 5.2% 76px;
  display:grid;
  grid-template-columns:1.12fr .88fr;
  gap:6vw;
  align-items:center;
  overflow:hidden;
  border-bottom:1px solid rgba(255,255,255,.055);
}
.processDetailHero__grid{
  position:absolute;inset:0;pointer-events:none;opacity:.24;
  background-image:
    linear-gradient(rgba(255,255,255,.016) 1px,transparent 1px),
    linear-gradient(90deg,rgba(255,255,255,.016) 1px,transparent 1px);
  background-size:72px 72px;
  mask-image:linear-gradient(to bottom,black,transparent 94%);
}
.processDetailHero__glow{position:absolute;border-radius:50%;filter:blur(110px);pointer-events:none}
.processDetailHero__glow--one{width:560px;height:560px;right:-110px;top:2%;background:rgba(47,128,237,.11)}
.processDetailHero__glow--two{width:330px;height:330px;left:-130px;bottom:0;background:rgba(205,131,38,.05)}
.processBack{
  position:absolute;left:5.2%;top:32px;z-index:5;
  display:flex;align-items:center;gap:11px;color:#928f89;font-size:8px;letter-spacing:.08em;
}
.processBack span{color:#dd963d;font-size:16px}
.processDetailHero__copy{position:relative;z-index:3;max-width:830px}
.processDetailEyebrow{display:flex;align-items:center;gap:13px;color:#dc943b;font-size:9px;font-weight:700;letter-spacing:.18em}
.processDetailEyebrow span{width:28px;height:1px;background:linear-gradient(90deg,#efad52,#9f5d1f)}
.processDetailHero h1{
  margin-top:24px;font-family:Georgia,"Times New Roman",serif;
  font-size:clamp(62px,6.5vw,108px);font-weight:400;line-height:.88;letter-spacing:-.055em;
}
.processDetailHero h1 strong{
  color:transparent;font-weight:400;
  background:linear-gradient(180deg,#efb15b,#c87b28);
  -webkit-background-clip:text;background-clip:text;
}
.processDetailHero__copy>p{
  max-width:720px;margin-top:30px;color:#aaa7a2;font-size:14px;line-height:1.9;
}
.processHeroTrust{
  margin-top:34px;display:grid;grid-template-columns:repeat(3,1fr);
  border-block:1px solid rgba(255,255,255,.065);
}
.processHeroTrust div{
  min-height:76px;padding:15px 18px 15px 0;display:flex;align-items:center;gap:12px;
  border-right:1px solid rgba(255,255,255,.055);color:#d9923a;
}
.processHeroTrust div:not(:first-child){padding-left:18px}
.processHeroTrust div:last-child{border-right:0}
.processHeroTrust span{color:#8d97a3;font-size:9px}

.processHeroCard{
  position:relative;z-index:3;min-height:430px;padding:38px;
  border:1px solid rgba(221,151,65,.22);border-radius:25px;
  background:
    radial-gradient(circle at 80% 10%,rgba(47,128,237,.08),transparent 28%),
    linear-gradient(145deg,rgba(9,24,40,.94),rgba(4,13,24,.92));
  box-shadow:0 40px 100px rgba(0,0,0,.32),inset 0 1px 0 rgba(255,255,255,.035);
}
.processHeroCard:before{
  content:"";position:absolute;left:25%;right:25%;top:-1px;height:1px;
  background:linear-gradient(90deg,transparent,#e4a24d,transparent);
}
.processHeroCard__ornament{display:flex;align-items:center;gap:13px;color:#d9943b}
.processHeroCard__ornament span{height:1px;flex:1;background:linear-gradient(90deg,transparent,rgba(221,151,65,.35))}
.processHeroCard__ornament span:last-child{background:linear-gradient(90deg,rgba(221,151,65,.35),transparent)}
.processHeroCard__ornament b{font-weight:400}
.processHeroCard__icon{
  width:68px;height:68px;margin-top:30px;display:grid;place-items:center;
  border:1px solid rgba(229,161,75,.25);border-radius:16px;
  color:#e5a04a;background:rgba(200,119,28,.045);
}
.processHeroCard>span{display:block;margin-top:28px;color:#d89037;font-size:8px;letter-spacing:.2em}
.processHeroCard h2{
  margin-top:12px;font-family:Georgia,"Times New Roman",serif;
  font-size:36px;font-weight:400;line-height:1.08;
}
.processHeroCard p{margin-top:18px;color:#8d969f;font-size:11px;line-height:1.8}
.processHeroCard a{
  margin-top:28px;padding:14px 17px;display:flex;align-items:center;justify-content:space-between;
  border:1px solid rgba(224,153,67,.24);border-radius:9px;
  background:linear-gradient(135deg,rgba(190,111,24,.16),rgba(47,128,237,.045));
  color:#eca94f;font-size:9px;font-weight:700;letter-spacing:.08em;
}

.processRoadmap{
  position:relative;
  padding:100px 5.2%;
  background:
    radial-gradient(circle at 10% 18%,rgba(200,129,40,.035),transparent 22%),
    #020a14;
}
.processRoadmap__head>span{color:#d88f38;font-size:8px;letter-spacing:.2em}
.processRoadmap__head h2{
  max-width:850px;margin-top:12px;font-family:Georgia,"Times New Roman",serif;
  font-size:clamp(38px,4.5vw,64px);font-weight:400;line-height:1.03;
}
.processRoadmap__line{
  height:1px;margin-top:42px;
  background:linear-gradient(90deg,transparent,#d88f38 15%,rgba(79,156,243,.35) 50%,#d88f38 85%,transparent);
  opacity:.5;
}
.processRoadmap__grid{margin-top:20px;display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.processPremiumCard{
  min-height:420px;padding:28px;
  border:1px solid rgba(222,151,65,.16);border-radius:18px;
  background:
    radial-gradient(circle at 100% 0,rgba(47,128,237,.055),transparent 27%),
    linear-gradient(150deg,rgba(8,22,38,.96),rgba(4,13,24,.94));
  box-shadow:inset 0 1px 0 rgba(255,255,255,.025),0 24px 55px rgba(0,0,0,.16);
  transition:transform .32s ease,border-color .32s ease,box-shadow .32s ease;
}
.processPremiumCard:hover{transform:translateY(-6px);border-color:rgba(232,163,80,.32);box-shadow:0 34px 70px rgba(0,0,0,.23)}
.processPremiumCard__top{display:flex;align-items:center;justify-content:space-between;padding-bottom:20px;border-bottom:1px solid rgba(255,255,255,.06)}
.processPremiumCard__no{font-family:Georgia,"Times New Roman",serif;color:#566170;font-size:28px}
.processPremiumCard__icon{
  width:51px;height:51px;display:grid;place-items:center;border:1px solid rgba(226,156,71,.24);
  border-radius:13px;color:#df983f;background:rgba(190,111,24,.04);
}
.processPremiumCard h3{
  margin-top:26px;font-family:Georgia,"Times New Roman",serif;font-size:25px;font-weight:400;line-height:1.15;
}
.processPremiumCard>p{margin-top:15px;color:#b8b8b6;font-size:11px;line-height:1.75}
.processPremiumCard__detail{
  margin-top:22px;padding-top:18px;display:grid;grid-template-columns:18px 1fr;gap:10px;
  border-top:1px solid rgba(255,255,255,.05);
}
.processPremiumCard__detail>span{color:#d88f38;font-size:9px}
.processPremiumCard__detail p{color:#77818e;font-size:9px;line-height:1.7}

.processPrinciples{
  padding:100px 5.2%;
  border-top:1px solid rgba(255,255,255,.05);
  border-bottom:1px solid rgba(255,255,255,.05);
  background:linear-gradient(180deg,#020a14,#03101d);
}
.processPrinciples__head>span{color:#d88f38;font-size:8px;letter-spacing:.2em}
.processPrinciples__head h2{
  max-width:800px;margin-top:12px;font-family:Georgia,"Times New Roman",serif;
  font-size:clamp(38px,4.4vw,62px);font-weight:400;
}
.processPrinciples__grid{margin-top:40px;display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.processPrinciples__grid article{
  min-height:270px;padding:30px;border:1px solid rgba(222,151,65,.15);border-radius:17px;
  background:linear-gradient(145deg,#071421,#06101b);
}
.processPrinciples__grid article>div{
  width:50px;height:50px;display:grid;place-items:center;border:1px solid rgba(225,155,70,.23);
  border-radius:13px;color:#e09a42;
}
.processPrinciples__grid article>span{display:block;margin-top:25px;color:#586475;font-size:8px}
.processPrinciples__grid h3{margin-top:8px;font-family:Georgia,"Times New Roman",serif;font-size:25px;font-weight:400}
.processPrinciples__grid p{margin-top:12px;color:#808b98;font-size:10px;line-height:1.7}

.processFinalCta{
  position:relative;overflow:hidden;margin:0;padding:90px 5.2%;
  display:grid;grid-template-columns:1fr auto;gap:50px;align-items:center;
  background:#020811;
}
.processFinalCta__glow{
  position:absolute;right:-100px;top:-180px;width:520px;height:520px;border-radius:50%;
  background:rgba(47,128,237,.09);filter:blur(110px);
}
.processFinalCta>div:not(.processFinalCta__glow){position:relative;z-index:2;max-width:920px}
.processFinalCta span{color:#d88f38;font-size:8px;letter-spacing:.2em}
.processFinalCta h2{
  margin-top:12px;font-family:Georgia,"Times New Roman",serif;
  font-size:clamp(38px,4.5vw,64px);font-weight:400;line-height:1.04;
}
.processFinalCta h2 strong{color:#d9923a;font-weight:400}
.processFinalCta p{max-width:760px;margin-top:18px;color:#87919e;font-size:11px;line-height:1.75}
.processFinalCta>a{
  position:relative;z-index:2;min-width:190px;padding:16px 19px;display:flex;align-items:center;justify-content:space-between;
  border:1px solid rgba(224,153,67,.26);border-radius:10px;
  background:linear-gradient(135deg,rgba(193,114,27,.19),rgba(47,128,237,.05));
  color:#e9a54d;font-size:9px;font-weight:700;letter-spacing:.08em;
}

@media(max-width:980px){
  .processDetailHero{grid-template-columns:1fr;padding:100px 20px 65px}
  .processBack{left:20px;top:24px}
  .processHeroCard{max-width:720px}
  .processRoadmap__grid{grid-template-columns:repeat(2,1fr)}
}
@media(max-width:760px){
  .processDetailHero h1{font-size:clamp(50px,13vw,72px)}
  .processHeroTrust{grid-template-columns:1fr}
  .processHeroTrust div,.processHeroTrust div:not(:first-child){padding:13px 0;border-right:0;border-bottom:1px solid rgba(255,255,255,.055)}
  .processHeroTrust div:last-child{border-bottom:0}
  .processRoadmap,.processPrinciples{padding:75px 18px}
  .processRoadmap__grid,.processPrinciples__grid{grid-template-columns:1fr}
  .processPremiumCard{min-height:auto;padding:24px 21px}
  .processPremiumCard>p{font-size:12px}
  .processFinalCta{padding:75px 18px;grid-template-columns:1fr}
  .processFinalCta>a{width:100%}
}

/* STEP 32 — FLAGSHIP PREMIUM HOME */
.hero{
  min-height:calc(100vh - 98px);
  padding-top:92px;
  padding-bottom:72px;
  background:
    radial-gradient(circle at 78% 25%,rgba(47,128,237,.14),transparent 29%),
    radial-gradient(circle at 8% 88%,rgba(202,126,34,.035),transparent 23%),
    linear-gradient(90deg,#020811 0%,#03101b 55%,#041223 100%);
}
.heroStatusLine{
  width:max-content;
  max-width:100%;
  margin-top:18px;
  padding:8px 12px;
  display:flex;
  align-items:center;
  gap:9px;
  border:1px solid rgba(255,255,255,.065);
  border-radius:999px;
  background:rgba(255,255,255,.018);
  color:#728297;
  font-size:7px;
  letter-spacing:.12em;
}
.heroStatusLine__dot{
  width:6px;height:6px;border-radius:50%;
  background:#34d486;
  box-shadow:0 0 12px rgba(52,212,134,.75);
}
.hero h1{
  max-width:1000px;
  font-size:clamp(64px,6.6vw,112px);
}
.hero h1 strong{
  background:linear-gradient(90deg,#f6f3ed 0%,#e4a34d 42%,#bc6e24 100%);
  -webkit-background-clip:text;
  background-clip:text;
  color:transparent;
}
.heroLead{
  max-width:690px;
  color:#a5adba;
  font-size:14px;
}
.valueStrip{
  max-width:820px;
  border:1px solid rgba(255,255,255,.065);
  border-radius:14px;
  overflow:hidden;
  background:rgba(4,14,25,.34);
}
.valueItem{
  padding-top:18px;
  padding-bottom:18px;
}
.valueIcon{
  border-color:rgba(222,151,65,.18);
  color:#d9953d;
  background:rgba(194,114,26,.035);
}
.btnPrimary{
  background:linear-gradient(135deg,#b86b24,#e39a41);
  box-shadow:0 14px 38px rgba(173,97,22,.20);
}
.btnPrimary:hover{
  box-shadow:0 20px 48px rgba(183,106,29,.30);
}
.heroPanel{
  border-color:rgba(222,151,65,.14);
  background:
    radial-gradient(circle at 68% 12%,rgba(47,128,237,.09),transparent 28%),
    linear-gradient(150deg,rgba(13,29,50,.94),rgba(5,13,24,.86));
}
.panelLogo{
  -webkit-text-stroke:1px rgba(224,151,65,.48);
  text-shadow:0 0 36px rgba(202,126,34,.10);
}
.panelText strong{color:#e09a43}
.panelMetrics strong{color:#d9943c}
.floatCard{border-color:rgba(222,151,65,.13)}
.floatCard,.heroMini{background:rgba(6,15,27,.86)}
.floatCard>svg{color:#dc963e}

.homePremiumBridge{
  padding:100px 5.2%;
  border-bottom:1px solid rgba(255,255,255,.055);
  background:
    radial-gradient(circle at 90% 20%,rgba(47,128,237,.055),transparent 23%),
    linear-gradient(180deg,#020a14,#03101d);
}
.homePremiumBridge__intro{
  display:grid;
  grid-template-columns:.85fr 1.15fr;
  gap:50px;
  align-items:end;
}
.homePremiumBridge__intro>span{
  color:#d88f38;
  font-size:8px;
  font-weight:700;
  letter-spacing:.2em;
}
.homePremiumBridge__intro h2{
  font-family:Georgia,"Times New Roman",serif;
  font-size:clamp(40px,4.6vw,66px);
  font-weight:400;
  line-height:1.02;
}
.homePremiumBridge__intro p{
  grid-column:2;
  max-width:720px;
  color:#818d9c;
  font-size:11px;
  line-height:1.8;
}
.homePremiumBridge__cards{
  margin-top:44px;
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:13px;
}
.homeRouteCard{
  min-height:330px;
  padding:28px;
  display:flex;
  flex-direction:column;
  border:1px solid rgba(221,151,65,.15);
  border-radius:18px;
  background:
    radial-gradient(circle at 100% 0,rgba(47,128,237,.055),transparent 27%),
    linear-gradient(150deg,rgba(8,22,38,.96),rgba(4,13,24,.94));
  box-shadow:0 22px 52px rgba(0,0,0,.16);
  transition:transform .3s ease,border-color .3s ease,box-shadow .3s ease;
}
.homeRouteCard:hover{
  transform:translateY(-6px);
  border-color:rgba(229,160,75,.32);
  box-shadow:0 34px 70px rgba(0,0,0,.23);
}
.homeRouteCard__top{
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding-bottom:20px;
  border-bottom:1px solid rgba(255,255,255,.055);
}
.homeRouteCard__top>span{
  color:#596575;
  font-family:Georgia,"Times New Roman",serif;
  font-size:28px;
}
.homeRouteCard__top>div{
  width:50px;height:50px;
  display:grid;place-items:center;
  border:1px solid rgba(225,155,70,.22);
  border-radius:13px;
  color:#df983f;
  background:rgba(190,111,24,.04);
}
.homeRouteCard h3{
  margin-top:28px;
  font-family:Georgia,"Times New Roman",serif;
  font-size:27px;
  font-weight:400;
}
.homeRouteCard p{
  margin-top:14px;
  color:#858f9c;
  font-size:10px;
  line-height:1.75;
}
.homeRouteCard>strong{
  margin-top:auto;
  padding-top:26px;
  display:flex;
  align-items:center;
  gap:9px;
  color:#d9933b;
  font-size:8px;
  letter-spacing:.08em;
}
.homeTrustStatement{
  position:relative;
  margin:0;
  padding:76px 5.2%;
  display:grid;
  grid-template-columns:auto 1fr auto;
  align-items:center;
  gap:35px;
  overflow:hidden;
  border-bottom:1px solid rgba(255,255,255,.055);
  background:
    radial-gradient(circle at 82% 20%,rgba(202,126,34,.05),transparent 20%),
    #020811;
}
.homeTrustStatement__mark{
  color:#d88f38;
  font-family:Georgia,"Times New Roman",serif;
  font-size:92px;
  line-height:.6;
  opacity:.55;
}
.homeTrustStatement span{
  color:#d88f38;
  font-size:7px;
  letter-spacing:.18em;
}
.homeTrustStatement h2{
  max-width:900px;
  margin-top:8px;
  font-family:Georgia,"Times New Roman",serif;
  font-size:clamp(32px,3.8vw,56px);
  font-weight:400;
  line-height:1.04;
}
.homeTrustStatement p{
  max-width:830px;
  margin-top:14px;
  color:#7e8997;
  font-size:10px;
  line-height:1.75;
}
.homeTrustStatement>a{
  min-width:190px;
  padding:14px 16px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:16px;
  border:1px solid rgba(221,151,65,.20);
  border-radius:9px;
  color:#df993f;
  font-size:8px;
  font-weight:700;
  letter-spacing:.07em;
}

@media(max-width:980px){
  .homePremiumBridge__intro{grid-template-columns:1fr}
  .homePremiumBridge__intro p{grid-column:1}
  .homePremiumBridge__cards{grid-template-columns:1fr}
  .homeRouteCard{min-height:260px}
  .homeTrustStatement{grid-template-columns:auto 1fr}
  .homeTrustStatement>a{grid-column:2;width:max-content}
}
@media(max-width:760px){
  .hero{padding-top:60px}
  .hero h1{font-size:clamp(50px,13vw,72px)}
  .homePremiumBridge{padding:75px 18px}
  .homeTrustStatement{padding:60px 18px;grid-template-columns:1fr}
  .homeTrustStatement__mark{font-size:65px}
  .homeTrustStatement>a{grid-column:1;width:100%}
}

/* STEP 33 — HOME HERO READABILITY + PREMIUM RIGHT CARD */
.valueItem strong{
  font-size:9px;
  letter-spacing:.11em;
}
.valueItem span{
  margin-top:6px;
  font-size:8px;
  line-height:1.5;
}
.valueIcon{
  width:39px;
  height:39px;
}
.heroLead{
  font-size:15px;
  line-height:1.9;
}

/* Premium right-side card enhancement */
.heroPanel{
  overflow:visible;
}
.heroPanel:before{
  content:"";
  position:absolute;
  inset:18px;
  pointer-events:none;
  border:1px solid rgba(229,160,75,.07);
  border-radius:18px;
}
.heroPanel__badge{
  position:absolute;
  top:22px;
  right:22px;
  z-index:5;
  padding:7px 10px;
  border:1px solid rgba(224,153,67,.18);
  border-radius:999px;
  background:rgba(201,119,30,.045);
  color:#dc963e;
  font-size:6px;
  font-weight:700;
  letter-spacing:.14em;
}
.heroPanel__orb{
  position:absolute;
  left:50%;
  top:42%;
  width:210px;
  height:210px;
  transform:translate(-50%,-50%);
  border-radius:50%;
  border:1px solid rgba(222,151,65,.10);
  box-shadow:
    0 0 0 22px rgba(222,151,65,.018),
    0 0 70px rgba(222,151,65,.07);
  pointer-events:none;
}
.heroPanel__orb:before,
.heroPanel__orb:after{
  content:"";
  position:absolute;
  border-radius:50%;
  border:1px dashed rgba(93,169,255,.10);
}
.heroPanel__orb:before{inset:22px}
.heroPanel__orb:after{inset:48px}
.heroPanel__quote{
  margin-top:20px;
  padding:16px 17px;
  border:1px solid rgba(255,255,255,.055);
  border-radius:12px;
  background:linear-gradient(145deg,rgba(255,255,255,.02),rgba(47,128,237,.025));
}
.heroPanel__quote span{
  display:block;
  color:#d9923a;
  font-size:6px;
  letter-spacing:.16em;
}
.heroPanel__quote p{
  margin-top:8px;
  color:#9aa4b0;
  font-family:Georgia,"Times New Roman",serif;
  font-size:13px;
  line-height:1.5;
}
.heroPanel__quote strong{
  display:block;
  margin-top:9px;
  color:#586779;
  font-size:7px;
  font-weight:500;
  letter-spacing:.11em;
}
.heroPanel__miniCta{
  margin-top:16px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:16px;
  padding:13px 14px;
  border:1px solid rgba(224,153,67,.16);
  border-radius:10px;
  background:linear-gradient(135deg,rgba(190,111,24,.11),rgba(47,128,237,.025));
  color:#e2a049;
  font-size:7px;
  font-weight:700;
  letter-spacing:.08em;
}
.heroPanel__miniCta svg{
  transition:transform .25s ease;
}
.heroPanel__miniCta:hover svg{
  transform:translateX(3px);
}

@media(max-width:820px){
  .valueItem strong{font-size:10px}
  .valueItem span{font-size:9px}
  .heroLead{font-size:13px}
  .heroPanel__quote p{font-size:12px}
}

/* STEP 34 — HOME SERVICES SHOWCASE */
.homeServicesShowcase{
  position:relative;
  padding:96px 5.2% 100px;
  overflow:hidden;
  border-bottom:1px solid rgba(255,255,255,.055);
  background:
    radial-gradient(circle at 8% 14%,rgba(208,132,36,.045),transparent 22%),
    radial-gradient(circle at 92% 78%,rgba(47,128,237,.05),transparent 24%),
    linear-gradient(180deg,#03101d 0%,#020a14 100%);
}
.homeServicesShowcase:before{
  content:"";
  position:absolute;
  inset:0;
  pointer-events:none;
  opacity:.18;
  background-image:
    linear-gradient(rgba(255,255,255,.014) 1px,transparent 1px),
    linear-gradient(90deg,rgba(255,255,255,.014) 1px,transparent 1px);
  background-size:72px 72px;
}
.homeServicesShowcase__head{
  position:relative;
  z-index:2;
  display:grid;
  grid-template-columns:1.1fr .9fr;
  gap:56px;
  align-items:end;
}
.homeServicesShowcase__eyebrow{
  display:inline-flex;
  align-items:center;
  gap:12px;
  color:#d8923a;
  font-size:8px;
  font-weight:700;
  letter-spacing:.20em;
}
.homeServicesShowcase__eyebrow:before{
  content:"";
  width:28px;
  height:1px;
  background:linear-gradient(90deg,#eda94e,#9d5b1e);
}
.homeServicesShowcase__head h2{
  margin-top:13px;
  max-width:780px;
  font-family:Georgia,"Times New Roman",serif;
  font-size:clamp(42px,4.8vw,70px);
  font-weight:400;
  line-height:.98;
  letter-spacing:-.04em;
  color:#f4f1ec;
}
.homeServicesShowcase__head h2 strong{
  display:block;
  color:transparent;
  font-weight:400;
  background:linear-gradient(180deg,#efb15b,#c97d29);
  -webkit-background-clip:text;
  background-clip:text;
}
.homeServicesShowcase__head>p{
  max-width:560px;
  padding-left:24px;
  border-left:1px solid rgba(221,151,65,.24);
  color:#919aa6;
  font-size:12px;
  line-height:1.85;
}
.homeServicesShowcase__grid{
  position:relative;
  z-index:2;
  margin-top:42px;
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:14px;
}
.homeServiceFeature{
  min-height:310px;
  padding:27px;
  display:flex;
  flex-direction:column;
  border:1px solid rgba(221,151,65,.15);
  border-radius:18px;
  background:
    radial-gradient(circle at 100% 0,rgba(47,128,237,.055),transparent 28%),
    linear-gradient(150deg,rgba(8,22,38,.96),rgba(4,13,24,.94));
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.025),
    0 24px 55px rgba(0,0,0,.16);
  transition:transform .32s ease,border-color .32s ease,box-shadow .32s ease;
}
.homeServiceFeature:hover{
  transform:translateY(-6px);
  border-color:rgba(230,161,76,.31);
  box-shadow:0 34px 70px rgba(0,0,0,.23);
}
.homeServiceFeature__icon{
  width:48px;
  height:48px;
  display:grid;
  place-items:center;
  border:1px solid rgba(225,155,70,.23);
  border-radius:13px;
  color:#df983f;
  background:rgba(190,111,24,.04);
}
.homeServiceFeature>span{
  margin-top:22px;
  color:#566170;
  font-family:Georgia,"Times New Roman",serif;
  font-size:23px;
}
.homeServiceFeature h3{
  margin-top:8px;
  font-family:Georgia,"Times New Roman",serif;
  font-size:27px;
  font-weight:400;
}
.homeServiceFeature ul{
  margin:18px 0 0;
  padding:0;
  list-style:none;
}
.homeServiceFeature li{
  position:relative;
  padding:10px 0 10px 17px;
  border-bottom:1px solid rgba(255,255,255,.045);
  color:#9199a3;
  font-size:10px;
  line-height:1.65;
}
.homeServiceFeature li:before{
  content:"✦";
  position:absolute;
  left:0;
  top:11px;
  color:#d88f38;
  font-size:8px;
}
.homeServiceFeature li:last-child{border-bottom:0}
.homeServiceFeature a{
  margin-top:auto;
  padding-top:22px;
  display:flex;
  align-items:center;
  justify-content:flex-end;
  gap:9px;
  color:#d9933b;
  font-size:8px;
  font-weight:700;
  letter-spacing:.08em;
}
.homeServiceFeature a svg{transition:transform .25s ease}
.homeServiceFeature a:hover svg{transform:translateX(4px)}
.homeServicesShowcase__footer{
  position:relative;
  z-index:2;
  margin-top:16px;
  display:grid;
  grid-template-columns:1fr 170px;
  gap:14px;
}
.homeServicesShowcase__benefit{
  min-height:145px;
  padding:27px 30px;
  display:grid;
  grid-template-columns:auto 1fr;
  gap:22px;
  align-items:center;
  border:1px solid rgba(221,151,65,.14);
  border-radius:18px;
  background:
    radial-gradient(circle at 8% 50%,rgba(207,133,38,.06),transparent 25%),
    linear-gradient(135deg,rgba(15,31,45,.95),rgba(7,18,31,.94));
}
.homeServicesShowcase__benefitIcon{
  width:66px;
  height:66px;
  display:grid;
  place-items:center;
  border:1px solid rgba(225,155,70,.22);
  border-radius:16px;
  color:#dc963e;
  background:rgba(190,111,24,.04);
}
.homeServicesShowcase__benefit span{
  color:#d88f38;
  font-size:7px;
  font-weight:700;
  letter-spacing:.18em;
}
.homeServicesShowcase__benefit h3{
  margin-top:6px;
  font-family:Georgia,"Times New Roman",serif;
  font-size:22px;
  font-weight:400;
}
.homeServicesShowcase__benefit p{
  margin-top:7px;
  color:#7e8996;
  font-size:9px;
  line-height:1.65;
}
.homeServicesShowcase__all{
  min-height:145px;
  padding:24px;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  border:1px solid rgba(223,151,65,.24);
  border-radius:18px;
  background:linear-gradient(145deg,rgba(181,105,28,.22),rgba(69,109,142,.18));
  color:#f2ede6;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.035),0 20px 45px rgba(0,0,0,.16);
  transition:transform .3s ease,border-color .3s ease,box-shadow .3s ease;
}
.homeServicesShowcase__all:hover{
  transform:translateY(-5px);
  border-color:rgba(236,169,85,.4);
  box-shadow:0 28px 60px rgba(0,0,0,.23);
}
.homeServicesShowcase__all span{
  color:#c6b7a3;
  font-size:7px;
  letter-spacing:.18em;
}
.homeServicesShowcase__all strong{
  margin-top:5px;
  font-size:12px;
  letter-spacing:.08em;
}
.homeServicesShowcase__all svg{
  margin-top:14px;
  color:#e3a149;
}
@media(max-width:980px){
  .homeServicesShowcase__head{grid-template-columns:1fr;gap:20px}
  .homeServicesShowcase__head>p{padding-left:18px}
  .homeServicesShowcase__grid{grid-template-columns:1fr}
  .homeServiceFeature{min-height:255px}
}
@media(max-width:760px){
  .homeServicesShowcase{padding:72px 18px}
  .homeServicesShowcase__head h2{font-size:clamp(38px,11vw,54px)}
  .homeServicesShowcase__footer{grid-template-columns:1fr}
  .homeServicesShowcase__benefit{grid-template-columns:1fr;text-align:left}
  .homeServicesShowcase__all{min-height:110px}
}

/* STEP 35 — PREMIUM COUCH SLIDER HERO */
.premiumSliderHero{
  position:relative;
  min-height:calc(100vh - 98px);
  padding:110px 7% 210px;
  display:flex;
  align-items:center;
  overflow:hidden;
  border-bottom:1px solid rgba(255,255,255,.055);
  background:#020811;
}
.premiumSliderHero__bg{
  position:absolute;
  inset:0;
  overflow:hidden;
}
.premiumSliderHero__bg img{
  width:100%;
  height:100%;
  object-fit:cover;
  object-position:71% center;
  filter:saturate(.92) contrast(1.03) brightness(.72);
  transform:scale(1.025);
}
.premiumSliderHero__shade{
  position:absolute;
  inset:0;
  background:
    linear-gradient(90deg,
      rgba(2,8,17,.99) 0%,
      rgba(2,8,17,.97) 24%,
      rgba(2,8,17,.83) 44%,
      rgba(2,8,17,.30) 67%,
      rgba(2,8,17,.10) 100%),
    linear-gradient(180deg,rgba(2,8,17,.08),rgba(2,8,17,.18));
}
.premiumSliderHero__goldGlow{
  position:absolute;
  left:20%;
  top:16%;
  width:420px;
  height:420px;
  border-radius:50%;
  background:rgba(202,126,34,.05);
  filter:blur(95px);
}
.premiumSliderHero__content{
  position:relative;
  z-index:5;
  max-width:760px;
}
.premiumSliderHero__icon{
  width:58px;
  height:58px;
  display:grid;
  place-items:center;
  margin-bottom:22px;
  color:#e0a04a;
  border:1px solid rgba(226,158,74,.22);
  border-radius:15px;
  background:rgba(193,112,25,.045);
}
.premiumSliderHero__eyebrow{
  display:flex;
  align-items:center;
  gap:12px;
  color:#d88f38;
  font-size:8px;
  font-weight:700;
  letter-spacing:.2em;
}
.premiumSliderHero__eyebrow span{
  width:28px;
  height:1px;
  background:linear-gradient(90deg,#efa94d,#9b5b1f);
}
.premiumSliderHero h1{
  margin-top:22px;
  font-family:Georgia,"Times New Roman",serif;
  font-size:clamp(64px,6.5vw,108px);
  font-weight:400;
  line-height:.87;
  letter-spacing:-.055em;
  color:#f5f2ed;
}
.premiumSliderHero h1 strong{
  color:transparent;
  font-weight:400;
  background:linear-gradient(180deg,#efb15b,#c97b29);
  -webkit-background-clip:text;
  background-clip:text;
}
.premiumSliderHero__script{
  margin-top:18px;
  color:#df963d;
  font-family:"Segoe Script","Brush Script MT",cursive;
  font-size:clamp(32px,3.4vw,55px);
  line-height:1;
  transform:rotate(-2deg);
  transform-origin:left;
}
.premiumSliderHero__line{
  width:86px;
  height:2px;
  margin-top:26px;
  background:linear-gradient(90deg,#d9923a,#f0b059);
  box-shadow:0 0 12px rgba(219,145,56,.28);
}
.premiumSliderHero__content>p{
  max-width:650px;
  margin-top:24px;
  color:#ddd8d0;
  font-size:14px;
  line-height:1.9;
  text-shadow:0 2px 18px rgba(0,0,0,.25);
}
.premiumSliderHero__actions{
  margin-top:30px;
  display:flex;
  gap:12px;
  flex-wrap:wrap;
}
.premiumSliderHero__primary,
.premiumSliderHero__secondary{
  min-height:52px;
  padding:0 22px;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:18px;
  border-radius:999px;
  font-size:9px;
  font-weight:700;
  letter-spacing:.07em;
  transition:transform .3s ease,box-shadow .3s ease,border-color .3s ease;
}
.premiumSliderHero__primary{
  min-width:240px;
  color:#fff;
  border:1px solid rgba(238,171,87,.30);
  background:linear-gradient(135deg,#b86b24,#e2a04a);
  box-shadow:0 18px 45px rgba(178,101,22,.23);
}
.premiumSliderHero__secondary{
  color:#d4d5d6;
  border:1px solid rgba(255,255,255,.09);
  background:rgba(4,13,24,.48);
  backdrop-filter:blur(10px);
}
.premiumSliderHero__primary:hover,
.premiumSliderHero__secondary:hover{
  transform:translateY(-2px);
}
.premiumSliderHero__primary:hover{
  box-shadow:0 24px 55px rgba(178,101,22,.32);
}
.premiumSliderHero__secondary:hover{
  border-color:rgba(226,158,74,.24);
}

.premiumSliderHero__arrow{
  position:absolute;
  z-index:6;
  top:50%;
  width:52px;
  height:52px;
  margin-top:-55px;
  display:grid;
  place-items:center;
  border:1px solid rgba(222,151,65,.30);
  border-radius:50%;
  background:rgba(3,10,19,.52);
  backdrop-filter:blur(10px);
  color:#e3a149;
  font-size:31px;
  line-height:1;
}
.premiumSliderHero__arrow--left{left:24px}
.premiumSliderHero__arrow--right{right:24px}

.premiumSliderHero__dots{
  position:absolute;
  z-index:6;
  left:50%;
  bottom:174px;
  display:flex;
  gap:10px;
  transform:translateX(-50%);
}
.premiumSliderHero__dots span{
  width:10px;
  height:10px;
  border-radius:50%;
  background:rgba(255,255,255,.40);
}
.premiumSliderHero__dots .is-active{
  width:20px;
  border-radius:999px;
  background:#d89a46;
}

.premiumSliderHero__features{
  position:absolute;
  z-index:6;
  left:2%;
  right:2%;
  bottom:20px;
  min-height:145px;
  padding:20px 28px;
  display:grid;
  grid-template-columns:repeat(4,1fr);
  align-items:center;
  border:1px solid rgba(222,151,65,.22);
  border-radius:20px;
  background:rgba(3,12,23,.90);
  backdrop-filter:blur(18px);
  box-shadow:0 20px 55px rgba(0,0,0,.28);
}
.premiumSliderHero__features>div{
  min-height:92px;
  padding:0 24px;
  display:flex;
  align-items:center;
  gap:18px;
  border-right:1px solid rgba(222,151,65,.17);
}
.premiumSliderHero__features>div:first-child{padding-left:6px}
.premiumSliderHero__features>div:last-child{
  border-right:0;
  padding-right:6px;
}
.premiumSliderHero__featureIcon{
  width:54px;
  height:54px;
  flex:0 0 auto;
  display:grid;
  place-items:center;
  color:#dfa04a;
}
.premiumSliderHero__features strong{
  display:block;
  color:#f1ede6;
  font-size:13px;
  font-weight:500;
}
.premiumSliderHero__features p{
  margin-top:6px;
  color:#9ba1a9;
  font-size:9px;
  line-height:1.6;
}

@media(max-width:1100px){
  .premiumSliderHero{
    padding-left:7%;
    padding-right:7%;
  }
  .premiumSliderHero__features{
    grid-template-columns:repeat(2,1fr);
  }
  .premiumSliderHero__features>div:nth-child(2){
    border-right:0;
  }
  .premiumSliderHero__features>div:nth-child(3),
  .premiumSliderHero__features>div:nth-child(4){
    border-top:1px solid rgba(222,151,65,.14);
    padding-top:16px;
  }
  .premiumSliderHero{
    padding-bottom:270px;
  }
  .premiumSliderHero__dots{bottom:235px}
}
@media(max-width:760px){
  .premiumSliderHero{
    min-height:auto;
    padding:80px 20px 430px;
    align-items:flex-start;
  }
  .premiumSliderHero__bg img{
    object-position:70% center;
  }
  .premiumSliderHero__shade{
    background:
      linear-gradient(180deg,rgba(2,8,17,.96) 0%,rgba(2,8,17,.88) 45%,rgba(2,8,17,.40) 100%),
      linear-gradient(90deg,rgba(2,8,17,.78),rgba(2,8,17,.14));
  }
  .premiumSliderHero h1{
    font-size:clamp(50px,14vw,72px);
  }
  .premiumSliderHero__script{
    font-size:35px;
  }
  .premiumSliderHero__content>p{
    font-size:13px;
  }
  .premiumSliderHero__actions{
    flex-direction:column;
  }
  .premiumSliderHero__primary,
  .premiumSliderHero__secondary{
    width:100%;
  }
  .premiumSliderHero__arrow{
    width:44px;
    height:44px;
    top:auto;
    bottom:365px;
  }
  .premiumSliderHero__arrow--left{left:16px}
  .premiumSliderHero__arrow--right{right:16px}
  .premiumSliderHero__dots{bottom:376px}
  .premiumSliderHero__features{
    left:14px;
    right:14px;
    bottom:14px;
    grid-template-columns:1fr;
    padding:12px 18px;
  }
  .premiumSliderHero__features>div,
  .premiumSliderHero__features>div:first-child,
  .premiumSliderHero__features>div:last-child{
    min-height:80px;
    padding:12px 0;
    border-right:0;
    border-top:1px solid rgba(222,151,65,.12);
  }
  .premiumSliderHero__features>div:first-child{border-top:0}
}

/* STEP 36 — REAL 2-SLIDE HERO */
.premiumSliderHero__bg img{
  position:absolute;
  inset:0;
  width:100%;
  height:100%;
  object-fit:cover;
  object-position:71% center;
  opacity:0;
  transform:scale(1.06);
  transition:
    opacity .75s ease,
    transform 1.1s cubic-bezier(.16,.8,.2,1);
}
.premiumSliderHero__bg img.is-active{
  opacity:1;
  transform:scale(1.025);
}
.premiumSliderHero__content{
  animation:heroSlideContentIn .62s cubic-bezier(.16,.8,.2,1) both;
}
@keyframes heroSlideContentIn{
  from{
    opacity:0;
    transform:translateY(22px);
    filter:blur(5px);
  }
  to{
    opacity:1;
    transform:none;
    filter:none;
  }
}
.premiumSliderHero__dots button{
  appearance:none;
  border:0;
  padding:0;
  width:10px;
  height:10px;
  border-radius:50%;
  cursor:pointer;
  background:rgba(255,255,255,.40);
  transition:width .3s ease,background .3s ease,transform .3s ease;
}
.premiumSliderHero__dots button:hover{
  transform:scale(1.15);
}
.premiumSliderHero__dots button.is-active{
  width:24px;
  border-radius:999px;
  background:#d89a46;
}
.premiumSliderHero__arrow{
  cursor:pointer;
  transition:transform .25s ease,border-color .25s ease,background .25s ease;
}
.premiumSliderHero__arrow:hover{
  transform:scale(1.06);
  border-color:rgba(234,168,83,.50);
  background:rgba(3,10,19,.72);
}

/* STEP 37 — TOK / PREMIUM "ÜCRETSİZ ÖN GÖRÜŞME" TYPOGRAPHY */
.premiumSliderHero__script{
  margin-top:22px;
  display:inline-block;
  color:#e0a04a;
  font-family:Georgia,"Times New Roman",serif;
  font-size:clamp(25px,2.35vw,39px);
  font-weight:700;
  line-height:1.08;
  letter-spacing:-.025em;
  text-transform:none;
  transform:none;
  text-shadow:0 8px 28px rgba(0,0,0,.28);
}
.premiumSliderHero__script:after{
  content:"";
  display:block;
  width:46%;
  height:1px;
  margin-top:11px;
  background:linear-gradient(90deg,#e2a04a,rgba(226,160,74,0));
}
.premiumSliderHero__line{
  display:none;
}
@media(max-width:760px){
  .premiumSliderHero__script{
    font-size:27px;
    letter-spacing:-.02em;
  }
}

/* STEP 39 — AUTOPLAY + HOVER PAUSE + MOBILE SWIPE */
.premiumSliderHero{
  touch-action:pan-y;
}
.premiumSliderHero__dots{
  align-items:center;
}
.premiumSliderHero__timer{
  position:relative;
  width:52px;
  height:2px;
  margin-left:5px;
  overflow:hidden;
  border-radius:999px;
  background:rgba(255,255,255,.14);
}
.premiumSliderHero__timer:after{
  content:"";
  position:absolute;
  inset:0;
  transform-origin:left center;
  background:linear-gradient(90deg,#c97b29,#efa94d);
  animation:heroAutoTimer 6.5s linear forwards;
}
.premiumSliderHero__timer.is-paused:after{
  animation-play-state:paused;
}
@keyframes heroAutoTimer{
  from{transform:scaleX(0)}
  to{transform:scaleX(1)}
}
@media(max-width:760px){
  .premiumSliderHero__timer{width:38px}
}

/* STEP 41 — ROUTE-AWARE PREMIUM ACTIVE NAV */
.nav a:first-child{
  color:#a9b4c3;
  border-color:transparent;
  background:transparent;
  box-shadow:none;
}
.nav a:first-child::after{
  width:0;
}

.nav a.is-active{
  color:#fff;
  border-color:rgba(226,158,74,.30);
  background:
    radial-gradient(circle at 50% 0%,rgba(223,151,63,.10),transparent 62%),
    linear-gradient(145deg,rgba(189,108,26,.17),rgba(47,128,237,.055));
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.055),
    0 10px 28px rgba(0,0,0,.18),
    0 0 26px rgba(202,126,34,.05);
}

.nav a.is-active::before{
  opacity:1;
}

.nav a.is-active::after{
  width:54%;
  background:linear-gradient(90deg,transparent,#e0a04a,transparent);
  box-shadow:0 0 12px rgba(224,160,74,.44);
}

.nav a.is-active:hover{
  color:#fff;
  border-color:rgba(235,169,84,.38);
}

@media(max-width:900px){
  .nav a:first-child{
    color:#c8d2df;
    border-color:rgba(255,255,255,.06);
    background:rgba(255,255,255,.018);
  }

  .nav a.is-active{
    color:#fff;
    border-color:rgba(226,158,74,.28);
    background:
      linear-gradient(90deg,rgba(190,111,24,.16),rgba(47,128,237,.035));
    box-shadow:
      inset 3px 0 0 #d9953d,
      inset 0 1px 0 rgba(255,255,255,.04);
  }
}

/* STEP 42 — PREMIUM FOOTER */
.premiumFooter{
  position:relative;
  overflow:hidden;
  padding:72px 5.2% 24px;
  border-top:1px solid rgba(255,255,255,.06);
  background:
    radial-gradient(circle at 10% 20%,rgba(205,131,38,.045),transparent 23%),
    radial-gradient(circle at 88% 75%,rgba(47,128,237,.05),transparent 25%),
    #01060d;
}
.premiumFooter__glow{
  position:absolute;
  border-radius:50%;
  filter:blur(100px);
  pointer-events:none;
}
.premiumFooter__glow--one{
  width:320px;height:320px;
  left:-100px;top:-80px;
  background:rgba(202,126,34,.05);
}
.premiumFooter__glow--two{
  width:360px;height:360px;
  right:-120px;bottom:-120px;
  background:rgba(47,128,237,.05);
}
.premiumFooter__top{
  position:relative;
  z-index:2;
  display:grid;
  grid-template-columns:1.25fr .65fr .9fr;
  gap:60px;
  align-items:start;
}
.premiumFooter__brandRow{
  display:flex;
  align-items:center;
  gap:16px;
}
.premiumFooter__mark{
  width:58px;
  height:58px;
  display:grid;
  place-items:center;
  border:1px solid rgba(226,158,74,.20);
  border-radius:15px;
  background:linear-gradient(145deg,rgba(190,111,24,.08),rgba(47,128,237,.025));
  color:#f5f1eb;
  font-family:Georgia,"Times New Roman",serif;
  font-size:29px;
  letter-spacing:-.12em;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.035);
}
.premiumFooter__brandRow strong{
  display:block;
  color:#f3f0eb;
  font-size:13px;
  font-weight:600;
  letter-spacing:.16em;
}
.premiumFooter__brandRow span{
  display:block;
  margin-top:6px;
  color:#727f90;
  font-size:7px;
  letter-spacing:.22em;
}
.premiumFooter__brand>p{
  max-width:560px;
  margin-top:22px;
  color:#7f8996;
  font-size:11px;
  line-height:1.8;
}
.premiumFooter__badges{
  margin-top:24px;
  display:flex;
  flex-wrap:wrap;
  gap:8px;
}
.premiumFooter__badges span{
  padding:8px 10px;
  display:flex;
  align-items:center;
  gap:7px;
  border:1px solid rgba(221,151,65,.14);
  border-radius:999px;
  background:rgba(190,111,24,.025);
  color:#918a80;
  font-size:7px;
}
.premiumFooter__badges svg{color:#d9953d}

.premiumFooter__title{
  display:block;
  margin-bottom:18px;
  color:#d8923a;
  font-size:7px;
  font-weight:700;
  letter-spacing:.18em;
}
.premiumFooter__nav{
  display:flex;
  flex-direction:column;
}
.premiumFooter__nav a{
  min-height:39px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:14px;
  border-bottom:1px solid rgba(255,255,255,.045);
  color:#a5adb8;
  font-size:10px;
  transition:color .25s ease,padding-left .25s ease;
}
.premiumFooter__nav a:hover{
  color:#fff;
  padding-left:4px;
}
.premiumFooter__nav svg{color:#d9953d}

.premiumFooter__contact{
  display:flex;
  flex-direction:column;
}
.premiumFooter__contactRow{
  padding:11px 0;
  display:grid;
  grid-template-columns:38px 1fr;
  gap:12px;
  align-items:center;
  border-bottom:1px solid rgba(255,255,255,.045);
}
.premiumFooter__contactRow>div{
  width:36px;
  height:36px;
  display:grid;
  place-items:center;
  border:1px solid rgba(221,151,65,.15);
  border-radius:10px;
  color:#d9953d;
}
.premiumFooter__contactRow small{
  display:block;
  color:#596879;
  font-size:7px;
}
.premiumFooter__contactRow strong{
  display:block;
  margin-top:4px;
  color:#b9c1cb;
  font-size:9px;
  font-weight:500;
}
.premiumFooter__cta{
  margin-top:18px;
  min-height:48px;
  padding:0 17px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:16px;
  border:1px solid rgba(225,155,70,.25);
  border-radius:10px;
  background:linear-gradient(135deg,rgba(187,106,24,.18),rgba(47,128,237,.04));
  color:#e3a149;
  font-size:8px;
  font-weight:700;
  letter-spacing:.08em;
  transition:transform .28s ease,border-color .28s ease,box-shadow .28s ease;
}
.premiumFooter__cta:hover{
  transform:translateY(-2px);
  border-color:rgba(234,168,83,.40);
  box-shadow:0 18px 40px rgba(0,0,0,.18);
}
.premiumFooter__bottom{
  position:relative;
  z-index:2;
  margin-top:48px;
  padding-top:20px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:24px;
  border-top:1px solid rgba(255,255,255,.055);
  color:#475366;
  font-size:7px;
}
.premiumFooter__legal{
  display:flex;
  align-items:center;
  gap:9px;
}
.premiumFooter__legal a{
  color:#596779;
  transition:color .25s ease;
}
.premiumFooter__legal a:hover{color:#aeb7c1}
.premiumFooter:after{
  content:"KÖ";
  position:absolute;
  right:2%;
  bottom:-52px;
  color:transparent;
  -webkit-text-stroke:1px rgba(255,255,255,.022);
  font-family:Georgia,"Times New Roman",serif;
  font-size:165px;
  letter-spacing:-.14em;
  pointer-events:none;
}

@media(max-width:980px){
  .premiumFooter__top{
    grid-template-columns:1fr 1fr;
  }
  .premiumFooter__brand{
    grid-column:1/-1;
  }
}
@media(max-width:700px){
  .premiumFooter{
    padding:58px 18px 90px;
  }
  .premiumFooter__top{
    grid-template-columns:1fr;
    gap:42px;
  }
  .premiumFooter__brand{
    grid-column:auto;
  }
  .premiumFooter__brandRow strong{
    font-size:11px;
  }
  .premiumFooter__brand>p{
    font-size:10px;
  }
  .premiumFooter__bottom{
    flex-direction:column;
    align-items:flex-start;
  }
  .premiumFooter__legal{
    flex-wrap:wrap;
  }
}

/* STEP 43 — GLOBAL TYPOGRAPHY HIERARCHY / READABILITY */

/* Header navigation */
.nav a{
  font-size:11px;
  line-height:1.25;
}
.headerCta{
  font-size:10px;
}

/* Hero */
.premiumSliderHero__eyebrow{
  font-size:10px;
  line-height:1.4;
}
.premiumSliderHero__content>p{
  font-size:15px;
  line-height:1.85;
}
.premiumSliderHero__primary,
.premiumSliderHero__secondary{
  font-size:10px;
}
.premiumSliderHero__features strong{
  font-size:14px;
}
.premiumSliderHero__features p{
  font-size:11px;
  line-height:1.6;
}

/* Homepage services showcase */
.homeServicesShowcase__eyebrow{
  font-size:10px;
}
.homeServicesShowcase__head>p{
  font-size:13px;
  line-height:1.8;
}
.homeServiceFeature li{
  font-size:11px;
  line-height:1.65;
}
.homeServiceFeature a{
  font-size:10px;
}
.homeServicesShowcase__benefit span{
  font-size:10px;
}
.homeServicesShowcase__benefit p{
  font-size:11px;
  line-height:1.65;
}
.homeServicesShowcase__all span{
  font-size:10px;
}
.homeServicesShowcase__all strong{
  font-size:13px;
}

/* Homepage quote / approach section */
.homeTrustStatement span{
  font-size:10px;
}
.homeTrustStatement p{
  font-size:12px;
  line-height:1.75;
}
.homeTrustStatement>a{
  font-size:10px;
}

/* About page */
.aboutPage__eyebrow,
.aboutPage__label,
.aboutPage__cardEyebrow{
  font-size:10px;
}
.aboutPage__lead,
.aboutPage__body p{
  font-size:12px;
  line-height:1.85;
}
.aboutPage__card p,
.aboutPage__miniCard p{
  font-size:11px;
  line-height:1.7;
}
.aboutPage__tag,
.aboutPage__chip{
  font-size:10px;
}

/* Services page */
.servicesPage__eyebrow,
.servicesPage__label,
.servicesPage__cardEyebrow{
  font-size:10px;
}
.servicesPage__lead,
.servicesPage__intro p{
  font-size:12px;
  line-height:1.8;
}
.servicesPage__card p,
.servicesPage__card li,
.servicesPage__note p{
  font-size:11px;
  line-height:1.7;
}
.servicesPage__chip{
  font-size:10px;
}

/* Process page */
.processPage__eyebrow,
.processPage__label,
.processPage__cardEyebrow{
  font-size:10px;
}
.processPage__lead,
.processPage__intro p{
  font-size:12px;
  line-height:1.8;
}
.processPage__step p,
.processPage__principle p,
.processPage__trust p{
  font-size:11px;
  line-height:1.7;
}
.processPage__step span,
.processPage__chip{
  font-size:10px;
}

/* Contact */
.contact .sectionEyebrow,
.contact .label{
  font-size:10px;
}
.contact p,
.contact .contactSub,
.contact .contactItem span{
  font-size:12px;
  line-height:1.7;
}
.contact .contactItem strong{
  font-size:12px;
}

/* Premium footer */
.premiumFooter__brandRow span{
  font-size:10px;
}
.premiumFooter__brand>p{
  font-size:12px;
  line-height:1.75;
}
.premiumFooter__badges span{
  font-size:10px;
}
.premiumFooter__title{
  font-size:10px;
}
.premiumFooter__nav a{
  font-size:11px;
}
.premiumFooter__contactRow small{
  font-size:10px;
}
.premiumFooter__contactRow strong{
  font-size:11px;
}
.premiumFooter__cta{
  font-size:10px;
}
.premiumFooter__bottom{
  font-size:10px;
}

/* Generic small UI text safety net */
.eyebrow,
.sectionEyebrow,
.kicker,
.label{
  font-size:10px;
}

/* Mobile: avoid tiny text while keeping layout compact */
@media(max-width:760px){
  .nav a{
    font-size:12px;
  }
  .premiumSliderHero__eyebrow{
    font-size:9px;
  }
  .premiumSliderHero__content>p{
    font-size:14px;
    line-height:1.75;
  }
  .premiumSliderHero__features strong{
    font-size:13px;
  }
  .premiumSliderHero__features p{
    font-size:10.5px;
  }
  .homeServicesShowcase__head>p,
  .aboutPage__lead,
  .servicesPage__lead,
  .processPage__lead{
    font-size:12px;
  }
  .homeServiceFeature li,
  .homeServicesShowcase__benefit p,
  .homeTrustStatement p{
    font-size:11px;
  }
  .premiumFooter__brand>p,
  .premiumFooter__nav a,
  .premiumFooter__contactRow strong{
    font-size:11px;
  }
  .premiumFooter__bottom{
    font-size:9.5px;
  }
}

/* STEP 45 — DIRECT ABOUT PAGE */
.aboutDirectPage{
  min-height:100vh;
  background:
    radial-gradient(circle at 85% 8%,rgba(47,128,237,.08),transparent 25%),
    linear-gradient(180deg,#020914,#020a14 50%,#020811);
  color:#f5f1eb;
}
.aboutDirectHeader{
  position:relative;
  padding:70px 6% 46px;
  border-bottom:1px solid rgba(255,255,255,.055);
}
.aboutDirectBack{
  display:inline-flex;
  color:#96918b;
  font-size:11px;
}
.aboutDirectHeader__title{
  margin-top:42px;
}
.aboutDirectHeader__title>span{
  color:#d9953d;
  font-size:11px;
  font-weight:700;
  letter-spacing:.20em;
}
.aboutDirectHeader__title h1{
  margin-top:10px;
  font-family:Georgia,"Times New Roman",serif;
  font-size:clamp(58px,6vw,94px);
  font-weight:400;
  line-height:.92;
}
.aboutDirectHeader__title h1 strong{
  color:#d9953d;
  font-weight:400;
}
.aboutDirectHeader__title p{
  margin-top:15px;
  color:#a4adb9;
  font-size:15px;
}

.aboutDirectLayout{
  padding:70px 6% 110px;
  display:grid;
  grid-template-columns:minmax(0,1fr) 340px;
  gap:70px;
  align-items:start;
}
.aboutDirectArticle{
  max-width:920px;
}
.aboutDirectArticle__topline{
  margin-bottom:28px;
  display:flex;
  align-items:center;
  gap:18px;
}
.aboutDirectArticle__topline span{
  color:#d9953d;
  font-size:11px;
  font-weight:700;
  letter-spacing:.18em;
}
.aboutDirectArticle__topline div{
  flex:1;
  height:1px;
  background:linear-gradient(90deg,rgba(217,149,61,.55),transparent);
}
.aboutDirectArticle p{
  margin:0 0 30px;
  color:#c1c5ca;
  font-size:17px;
  line-height:1.95;
  letter-spacing:.003em;
}
.aboutDirectArticle p:first-of-type{
  padding:28px 30px;
  border-left:3px solid #d9953d;
  border-radius:0 15px 15px 0;
  background:linear-gradient(90deg,rgba(217,149,61,.07),rgba(47,128,237,.02));
  color:#ede8e1;
  font-family:Georgia,"Times New Roman",serif;
  font-size:20px;
  line-height:1.8;
}
.aboutDirectProfile{
  position:sticky;
  top:120px;
  overflow:hidden;
  border:1px solid rgba(222,151,65,.20);
  border-radius:22px;
  background:linear-gradient(145deg,rgba(9,24,40,.96),rgba(4,13,24,.94));
  box-shadow:0 34px 80px rgba(0,0,0,.26);
}
.aboutDirectProfile__photo{
  height:360px;
  overflow:hidden;
}
.aboutDirectProfile__photo img{
  width:100%;
  height:100%;
  object-fit:cover;
  object-position:center 42%;
  filter:saturate(.93) contrast(1.04) brightness(.9);
}
.aboutDirectProfile__body{
  padding:25px 25px 28px;
}
.aboutDirectProfile__body>span{
  color:#d9953d;
  font-size:11px;
  font-weight:700;
  letter-spacing:.20em;
}
.aboutDirectProfile h2{
  margin-top:8px;
  font-family:Georgia,"Times New Roman",serif;
  font-size:35px;
  font-weight:400;
}
.aboutDirectProfile__body>p{
  margin-top:7px;
  color:#929cab;
  font-size:13px;
}
.aboutDirectProfile__line{
  height:1px;
  margin:22px 0;
  background:linear-gradient(90deg,#d9953d,transparent);
}
.aboutDirectProfile__items{
  display:flex;
  flex-direction:column;
  gap:13px;
}
.aboutDirectProfile__items div{
  display:flex;
  align-items:center;
  gap:11px;
  color:#aeb6c0;
  font-size:12px;
}
.aboutDirectProfile__items svg{
  color:#d9953d;
}
@media(max-width:900px){
  .aboutDirectHeader{padding:55px 20px 38px}
  .aboutDirectLayout{
    padding:55px 20px 85px;
    grid-template-columns:1fr;
    gap:45px;
  }
  .aboutDirectProfile{
    position:static;
    max-width:520px;
    order:-1;
  }
}
@media(max-width:600px){
  .aboutDirectHeader__title h1{font-size:54px}
  .aboutDirectHeader__title p{font-size:14px}
  .aboutDirectArticle p{
    font-size:15px;
    line-height:1.85;
  }
  .aboutDirectArticle p:first-of-type{
    padding:22px 20px;
    font-size:17px;
    line-height:1.75;
  }
  .aboutDirectProfile__photo{height:320px}
}

/* STEP 47 — PREMIUM LEGAL PAGES */
.legalPage{
  min-height:100vh;
  background:
    radial-gradient(circle at 82% 8%,rgba(47,128,237,.08),transparent 25%),
    linear-gradient(180deg,#020914,#020a14 52%,#020811);
  color:#f4f1ec;
}
.legalHero{
  position:relative;
  min-height:520px;
  padding:105px 6% 70px;
  display:grid;
  grid-template-columns:1.1fr .9fr;
  gap:7vw;
  align-items:center;
  overflow:hidden;
  border-bottom:1px solid rgba(255,255,255,.055);
}
.legalHero__grid{
  position:absolute;inset:0;pointer-events:none;opacity:.20;
  background-image:
    linear-gradient(rgba(255,255,255,.015) 1px,transparent 1px),
    linear-gradient(90deg,rgba(255,255,255,.015) 1px,transparent 1px);
  background-size:72px 72px;
  mask-image:linear-gradient(to bottom,black,transparent 94%);
}
.legalHero__glow{
  position:absolute;right:-100px;top:-80px;
  width:560px;height:560px;border-radius:50%;
  background:rgba(47,128,237,.09);filter:blur(110px);
}
.legalBack{
  position:absolute;left:6%;top:32px;z-index:4;
  display:flex;align-items:center;gap:11px;
  color:#9b958e;font-size:11px;
}
.legalBack span{color:#d9953d;font-size:17px}
.legalHero__copy{position:relative;z-index:2;max-width:850px}
.legalHero__copy>span{
  color:#d9953d;font-size:10px;font-weight:700;letter-spacing:.2em;
}
.legalHero h1{
  margin-top:15px;
  font-family:Georgia,"Times New Roman",serif;
  font-size:clamp(48px,5.5vw,82px);
  font-weight:400;line-height:.96;letter-spacing:-.045em;
}
.legalHero__copy>p{
  max-width:720px;margin-top:24px;
  color:#aeb4bc;font-size:14px;line-height:1.85;
}
.legalHero__card{
  position:relative;z-index:2;
  min-height:310px;padding:32px;
  border:1px solid rgba(222,151,65,.20);
  border-radius:22px;
  background:
    radial-gradient(circle at 80% 12%,rgba(47,128,237,.07),transparent 28%),
    linear-gradient(145deg,rgba(9,24,40,.95),rgba(4,13,24,.93));
  box-shadow:0 34px 80px rgba(0,0,0,.25);
}
.legalHero__icon{
  width:58px;height:58px;display:grid;place-items:center;
  border:1px solid rgba(226,158,74,.22);
  border-radius:14px;color:#d9953d;
}
.legalHero__card>span{
  display:block;margin-top:26px;
  color:#d9953d;font-size:9px;font-weight:700;letter-spacing:.18em;
}
.legalHero__card h2{
  margin-top:10px;
  font-family:Georgia,"Times New Roman",serif;
  font-size:31px;font-weight:400;line-height:1.08;
}
.legalHero__card p{
  margin-top:16px;color:#8893a0;font-size:11px;line-height:1.75;
}
.legalContent{
  padding:85px 6% 110px;
  display:grid;
  grid-template-columns:260px minmax(0,900px);
  justify-content:center;
  gap:7vw;
}
.legalContent__toc{
  position:sticky;top:120px;height:max-content;
  display:flex;flex-direction:column;
}
.legalContent__toc>span{
  margin-bottom:17px;
  color:#d9953d;font-size:9px;font-weight:700;letter-spacing:.18em;
}
.legalContent__toc a{
  padding:11px 0;
  border-bottom:1px solid rgba(255,255,255,.05);
  color:#737f8e;font-size:10px;line-height:1.45;
  transition:color .25s ease,padding-left .25s ease;
}
.legalContent__toc a:hover{
  color:#d7dbe0;padding-left:4px;
}
.legalArticle__section{
  padding:0 0 34px;
  margin-bottom:34px;
  border-bottom:1px solid rgba(255,255,255,.055);
  scroll-margin-top:120px;
}
.legalArticle__section h2{
  font-family:Georgia,"Times New Roman",serif;
  font-size:28px;font-weight:400;
}
.legalArticle__section p{
  margin-top:15px;
  color:#b5bac1;font-size:15px;line-height:1.9;
}
.legalArticle__notice{
  margin-top:42px;padding:24px;
  display:grid;grid-template-columns:auto 1fr;gap:16px;
  border:1px solid rgba(222,151,65,.17);
  border-radius:15px;
  background:linear-gradient(145deg,rgba(217,149,61,.05),rgba(47,128,237,.025));
}
.legalArticle__notice>svg{color:#d9953d}
.legalArticle__notice strong{
  color:#e8e2da;font-size:12px;
}
.legalArticle__notice p{
  margin-top:7px;color:#8994a0;font-size:11px;line-height:1.7;
}
@media(max-width:900px){
  .legalHero{grid-template-columns:1fr;padding:95px 20px 60px}
  .legalBack{left:20px;top:24px}
  .legalHero__card{max-width:680px}
  .legalContent{grid-template-columns:1fr;padding:70px 20px 90px}
  .legalContent__toc{position:static}
}
@media(max-width:600px){
  .legalHero h1{font-size:48px}
  .legalHero__copy>p{font-size:13px}
  .legalArticle__section h2{font-size:25px}
  .legalArticle__section p{font-size:14px;line-height:1.82}
}

/* STEP 48 — UST PANEL OKUNABILIRLIK */
.nav a{font-size:13px;font-weight:600;letter-spacing:.015em}
.headerCta{font-size:12px;font-weight:700}
@media(max-width:900px){.nav a{font-size:14px}.headerCta{font-size:12px}}

/* STEP 49 — KVKK clarity/readability */
.legalArticle__section:nth-of-type(4){
  padding:26px 28px;
  border:1px solid rgba(217,149,61,.18);
  border-radius:16px;
  background:linear-gradient(145deg,rgba(217,149,61,.055),rgba(47,128,237,.025));
}
.legalArticle__section:nth-of-type(4) h2{
  color:#e4a24b;
}

/* STEP 50 — ACCESSIBILITY + PROFESSIONAL DETAILS */
html{
  scroll-behavior:smooth;
  scroll-padding-top:110px;
}
a:focus-visible,
button:focus-visible,
input:focus-visible,
textarea:focus-visible,
select:focus-visible,
[tabindex]:focus-visible{
  outline:2px solid #d9953d;
  outline-offset:4px;
  border-radius:6px;
}
button,
a{
  -webkit-tap-highlight-color:rgba(217,149,61,.14);
}
button{
  font:inherit;
}
img{
  max-width:100%;
}
@media(max-width:600px){
  .nav a,
  .headerCta,
  button,
  a{
    min-height:44px;
  }
}
@media(prefers-reduced-motion:reduce){
  html{scroll-behavior:auto}
  *,
  *::before,
  *::after{
    animation-duration:.01ms !important;
    animation-iteration-count:1 !important;
    transition-duration:.01ms !important;
    scroll-behavior:auto !important;
  }
}

/* STEP 51 — FINAL CONTENT / PROFESSIONAL SCOPE */
.homeScopeStrip{
  margin:0;
  padding:18px 5.2%;
  display:flex;
  align-items:center;
  gap:14px;
  border-top:1px solid rgba(255,255,255,.045);
  border-bottom:1px solid rgba(255,255,255,.045);
  background:rgba(3,12,22,.62);
}
.homeScopeStrip>div{
  width:38px;height:38px;flex:0 0 auto;
  display:grid;place-items:center;
  border:1px solid rgba(222,151,65,.17);
  border-radius:10px;color:#d9953d;
}
.homeScopeStrip p{
  max-width:980px;
  color:#8f99a5;
  font-size:11px;
  line-height:1.65;
}
.servicesScopeNote{
  margin:0 5.2% 18px;
  padding:25px 28px;
  display:grid;
  grid-template-columns:auto 1fr;
  gap:18px;
  align-items:start;
  border:1px solid rgba(222,151,65,.16);
  border-radius:16px;
  background:
    linear-gradient(145deg,rgba(217,149,61,.05),rgba(47,128,237,.025));
}
.servicesScopeNote__icon{
  width:48px;height:48px;
  display:grid;place-items:center;
  border:1px solid rgba(222,151,65,.20);
  border-radius:12px;color:#d9953d;
}
.servicesScopeNote span{
  color:#d9953d;font-size:10px;font-weight:700;letter-spacing:.16em;
}
.servicesScopeNote h3{
  margin-top:7px;
  color:#ece7e0;
  font-family:Georgia,"Times New Roman",serif;
  font-size:22px;font-weight:400;line-height:1.2;
}
.servicesScopeNote p{
  margin-top:9px;
  color:#8e99a5;
  font-size:11px;
  line-height:1.7;
}
@media(max-width:700px){
  .homeScopeStrip{padding:17px 18px;align-items:flex-start}
  .homeScopeStrip p{font-size:10.5px}
  .servicesScopeNote{margin:0 18px 18px;padding:22px 20px}
  .servicesScopeNote h3{font-size:20px}
}

/* STEP 52 — APPROVED VISUAL STYLE / SERVICES */
.svc52{background:#03101f;color:#f6f2eb;min-height:100vh}
.svc52Hero{position:relative;height:430px;overflow:hidden;border-bottom:1px solid rgba(218,151,65,.35)}
.svc52Hero__image{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:72% center}
.svc52Hero__shade{position:absolute;inset:0;background:linear-gradient(90deg,#061426 0%,rgba(6,20,38,.98) 31%,rgba(6,20,38,.70) 48%,rgba(6,20,38,.08) 78%)}
.svc52Back{position:absolute;z-index:3;left:5.3%;top:27px;color:#aeb6c0;font-size:10px;display:flex;gap:8px;align-items:center}
.svc52Back span{color:#d99a4a;font-size:16px}
.svc52Hero__copy{position:absolute;z-index:2;left:6.2%;top:105px;width:min(520px,42vw)}
.svc52Eyebrow{color:#dda04f;font-size:14px;font-weight:800;letter-spacing:.08em}
.svc52Hero h1{margin:14px 0 0;font:400 clamp(43px,4.1vw,65px)/.98 Georgia,"Times New Roman",serif;letter-spacing:-.035em}
.svc52Hero h1 strong{font-weight:400}
.svc52Hero__copy i{display:block;width:39px;height:2px;background:#d99a4a;margin:23px 0 20px}
.svc52Hero__copy p{max-width:530px;color:#e0e4e8;font-size:14px;line-height:1.7}
.svc52Quick{padding:25px 3.6% 42px;background:radial-gradient(circle at 50% 0,rgba(33,89,143,.08),transparent 32%),#061426}
.svc52SectionTitle{text-align:center;margin-bottom:22px}
.svc52SectionTitle span{display:inline-flex;align-items:center;gap:16px;color:#dda04f;font-size:13px;font-weight:800;letter-spacing:.06em}
.svc52SectionTitle span:before,.svc52SectionTitle span:after{content:"";width:50px;height:1px;background:rgba(218,151,65,.45)}
.svc52SectionTitle h2{margin-top:6px;font:400 22px/1.2 Georgia,"Times New Roman",serif;color:#eee9e2}
.svc52QuickGrid{display:grid;grid-template-columns:repeat(5,1fr);gap:13px;max-width:1450px;margin:auto}
.svc52QuickCard{min-height:275px;padding:22px 18px 18px;text-align:center;border:1px solid rgba(218,151,65,.52);border-radius:12px;background:linear-gradient(180deg,rgba(8,28,50,.9),rgba(5,20,37,.96));box-shadow:0 18px 45px rgba(0,0,0,.18);transition:.3s ease}
.svc52QuickCard:hover{transform:translateY(-5px);border-color:#d99a4a;box-shadow:0 24px 55px rgba(0,0,0,.28)}
.svc52QuickIcon{width:66px;height:66px;margin:0 auto 15px;display:grid;place-items:center;border:2px solid #d99a4a;border-radius:50%;color:#d99a4a}
.svc52QuickCard h3{font-size:15px;color:#f5f0e9;margin-bottom:11px}
.svc52QuickCard p{color:#c2c9d1;font-size:11.5px;line-height:1.65;min-height:92px}
.svc52QuickCard a{margin-top:11px;padding-top:13px;border-top:1px solid rgba(218,151,65,.30);display:flex;justify-content:center;align-items:center;gap:8px;color:#dda04f;font-size:11px;font-weight:700}
.svc52Trust{max-width:1450px;margin:20px auto 0;padding:20px 25px;display:grid;grid-template-columns:repeat(4,1fr);border:1px solid rgba(255,255,255,.07);border-radius:13px;background:rgba(7,26,46,.86);box-shadow:0 15px 38px rgba(0,0,0,.20)}
.svc52Trust>div{display:flex;align-items:center;gap:15px;padding:0 20px;border-right:1px solid rgba(218,151,65,.24);color:#d99a4a}
.svc52Trust>div:last-child{border-right:0}
.svc52Trust p{display:flex;flex-direction:column;gap:5px}
.svc52Trust strong{color:#f3eee8;font-size:11.5px}
.svc52Trust span{color:#aeb8c3;font-size:9.5px;line-height:1.5}
.svc52Details{padding-top:60px!important}
.svc52Scope{margin:0 3.6% 55px;padding:25px 35px;display:grid;grid-template-columns:90px 1fr;align-items:center;gap:25px;border:1px solid rgba(218,151,65,.45);border-radius:14px;background:linear-gradient(90deg,#f4e8d8,#fff8ec);color:#142033;box-shadow:0 20px 50px rgba(0,0,0,.16)}
.svc52Scope__mark{width:70px;height:70px;display:grid;place-items:center;border:1px solid rgba(170,108,39,.45);border-radius:50%;font:400 25px Georgia,serif;color:#b97830}
.svc52Scope span{color:#a8682d;font-size:9px;font-weight:800;letter-spacing:.14em}
.svc52Scope h3{margin-top:5px;font:700 18px/1.25 Georgia,serif}
.svc52Scope p{margin-top:7px;font-size:11px;line-height:1.65;color:#3e4650}
@media(max-width:1050px){
 .svc52QuickGrid{grid-template-columns:repeat(2,1fr)}
 .svc52QuickCard:last-child{grid-column:1/-1}
 .svc52Trust{grid-template-columns:repeat(2,1fr);gap:20px}
 .svc52Trust>div{border-right:0}
}
@media(max-width:700px){
 .svc52Hero{height:530px}
 .svc52Hero__image{object-position:66% center}
 .svc52Hero__shade{background:linear-gradient(180deg,rgba(4,16,31,.30),rgba(4,16,31,.96) 58%,#061426 100%)}
 .svc52Hero__copy{left:20px;right:20px;top:auto;bottom:34px;width:auto}
 .svc52Hero h1{font-size:46px}
 .svc52Hero__copy p{font-size:12.5px}
 .svc52Quick{padding:25px 18px 35px}
 .svc52QuickGrid{grid-template-columns:1fr}
 .svc52QuickCard:last-child{grid-column:auto}
 .svc52Trust{grid-template-columns:1fr;padding:20px}
 .svc52Trust>div{padding:10px 0}
 .svc52Scope{margin:0 18px 35px;padding:23px 20px;grid-template-columns:1fr}
 .svc52Scope__mark{width:58px;height:58px}
}

/* STEP 53 — PROCESS PAGE / APPROVED MATCHING DESIGN */
.prc53{
  min-height:100vh;
  color:#f5f0e9;
  background:#04101f;
}
.prc53Hero{
  position:relative;
  height:430px;
  overflow:hidden;
  border-bottom:1px solid rgba(218,151,65,.38);
}
.prc53Hero__image{
  position:absolute;
  inset:0;
  width:100%;
  height:100%;
  object-fit:cover;
  object-position:72% center;
}
.prc53Hero__shade{
  position:absolute;
  inset:0;
  background:
    linear-gradient(90deg,#061426 0%,rgba(6,20,38,.98) 31%,rgba(6,20,38,.72) 48%,rgba(6,20,38,.08) 79%);
}
.prc53Back{
  position:absolute;
  z-index:3;
  left:5.3%;
  top:27px;
  display:flex;
  align-items:center;
  gap:8px;
  color:#aeb6c0;
  font-size:10px;
}
.prc53Back span{color:#d99a4a;font-size:16px}
.prc53Hero__copy{
  position:absolute;
  z-index:2;
  left:6.2%;
  top:104px;
  width:min(545px,43vw);
}
.prc53Eyebrow{
  color:#dda04f;
  font-size:14px;
  font-weight:800;
  letter-spacing:.08em;
}
.prc53Hero h1{
  margin:14px 0 0;
  font:400 clamp(43px,4.1vw,65px)/.98 Georgia,"Times New Roman",serif;
  letter-spacing:-.035em;
}
.prc53Hero h1 strong{font-weight:400}
.prc53Hero__copy i{
  display:block;
  width:39px;height:2px;
  margin:23px 0 20px;
  background:#d99a4a;
}
.prc53Hero__copy p{
  max-width:540px;
  color:#e0e4e8;
  font-size:14px;
  line-height:1.7;
}

.prc53Flow{
  padding:24px 3.6% 30px;
  background:
    radial-gradient(circle at 50% 0,rgba(33,89,143,.08),transparent 33%),
    #061426;
}
.prc53SectionTitle{
  text-align:center;
  margin-bottom:28px;
}
.prc53SectionTitle span{
  display:inline-flex;
  align-items:center;
  gap:16px;
  color:#dda04f;
  font-size:13px;
  font-weight:800;
  letter-spacing:.06em;
}
.prc53SectionTitle span:before,
.prc53SectionTitle span:after{
  content:"";
  width:50px;height:1px;
  background:rgba(218,151,65,.48);
}
.prc53SectionTitle h2{
  margin-top:7px;
  color:#eee9e2;
  font:400 22px/1.2 Georgia,"Times New Roman",serif;
}

/* New linked roadmap card design */
.prc53Steps{
  position:relative;
  z-index:1;
  max-width:1450px;
  margin:auto;
  display:grid;
  grid-template-columns:repeat(5,1fr);
  gap:18px;
}
.prc53Steps:before{
  content:"";
  position:absolute;
  z-index:-1;
  left:7%;
  right:7%;
  top:54px;
  height:1px;
  background:linear-gradient(90deg,transparent,rgba(218,151,65,.58) 10%,rgba(218,151,65,.58) 90%,transparent);
}
.prc53Step{
  position:relative;
  min-height:278px;
  padding:27px 20px 22px;
  text-align:left;
  overflow:visible;
  border:1px solid rgba(218,151,65,.55);
  border-radius:12px;
  background:
    radial-gradient(circle at 100% 0,rgba(36,90,143,.08),transparent 30%),
    linear-gradient(145deg,rgba(8,29,52,.94),rgba(4,17,32,.98));
  box-shadow:0 18px 48px rgba(0,0,0,.19);
  transition:transform .3s ease,border-color .3s ease,box-shadow .3s ease;
}
.prc53Step:not(:last-child):after{
  content:"";
  position:absolute;
  top:52px;
  right:-24px;
  width:10px;height:10px;
  border-radius:50%;
  background:#d99a4a;
  border:3px solid #061426;
  box-shadow:0 0 0 1px rgba(218,151,65,.38);
}
.prc53Step:hover{
  transform:translateY(-6px);
  border-color:#dda04f;
  box-shadow:0 28px 64px rgba(0,0,0,.28);
}
.prc53Step__number{
  position:absolute;
  top:18px;
  left:18px;
  width:38px;height:38px;
  display:grid;
  place-items:center;
  border:1px solid rgba(218,151,65,.52);
  border-radius:50%;
  color:#dda04f;
  background:rgba(218,151,65,.035);
  font:700 12px Georgia,"Times New Roman",serif;
}
.prc53Step__icon{
  width:58px;height:58px;
  margin:7px 0 22px auto;
  display:grid;
  place-items:center;
  color:#d99a4a;
}
.prc53Step h3{
  color:#f5f0e9;
  font-size:15px;
  margin-bottom:12px;
}
.prc53Step p{
  color:#c2c9d1;
  font-size:11.5px;
  line-height:1.7;
}

.prc53Trust{
  max-width:1450px;
  margin:22px auto 0;
  padding:15px 18px;
  display:grid;
  grid-template-columns:repeat(4,1fr);
  border:1px solid rgba(218,151,65,.35);
  border-radius:13px;
  background:linear-gradient(180deg,rgba(7,26,46,.92),rgba(5,20,37,.96));
  box-shadow:0 15px 38px rgba(0,0,0,.20);
}
.prc53Trust>div{
  min-height:112px;
  padding:15px 20px;
  display:grid;
  grid-template-columns:48px 1fr;
  gap:13px;
  align-items:center;
  border-right:1px solid rgba(218,151,65,.25);
}
.prc53Trust>div:last-child{border-right:0}
.prc53Trust__icon{
  width:46px;height:46px;
  display:grid;
  place-items:center;
  border:1px solid rgba(218,151,65,.42);
  border-radius:50%;
  color:#d99a4a;
}
.prc53Trust p{
  display:flex;
  flex-direction:column;
  gap:6px;
}
.prc53Trust strong{
  color:#f3eee8;
  font-size:11.5px;
}
.prc53Trust span{
  color:#aeb8c3;
  font-size:9.5px;
  line-height:1.5;
}

.prc53Principles{
  margin:18px 3.6% 55px;
  min-height:118px;
  display:grid;
  grid-template-columns:160px 1fr;
  overflow:hidden;
  border:1px solid rgba(218,151,65,.50);
  border-radius:14px;
  background:linear-gradient(90deg,#f1e3d1,#fff7eb);
  color:#142033;
  box-shadow:0 20px 50px rgba(0,0,0,.16);
}
.prc53Principles__mark{
  display:grid;
  place-items:center;
  border-right:1px solid rgba(167,103,35,.32);
  background:#071426;
  color:#d99a4a;
  font:400 31px Georgia,"Times New Roman",serif;
  letter-spacing:-.10em;
}
.prc53Principles>div:last-child{
  padding:22px 28px;
}
.prc53Principles span{
  color:#a8682d;
  font-size:9px;
  font-weight:800;
  letter-spacing:.14em;
}
.prc53Principles h3{
  margin-top:4px;
  font:700 18px/1.25 Georgia,"Times New Roman",serif;
}
.prc53Principles p{
  margin-top:7px;
  color:#3e4650;
  font-size:11px;
  line-height:1.65;
}

@media(max-width:1050px){
  .prc53Steps{grid-template-columns:repeat(2,1fr)}
  .prc53Steps:before,.prc53Step:after{display:none!important}
  .prc53Step:last-child{grid-column:1/-1}
  .prc53Trust{grid-template-columns:repeat(2,1fr)}
  .prc53Trust>div:nth-child(2){border-right:0}
  .prc53Trust>div:nth-child(3),
  .prc53Trust>div:nth-child(4){border-top:1px solid rgba(218,151,65,.18)}
}
@media(max-width:700px){
  .prc53Hero{height:530px}
  .prc53Hero__image{object-position:66% center}
  .prc53Hero__shade{
    background:linear-gradient(180deg,rgba(4,16,31,.28),rgba(4,16,31,.96) 58%,#061426 100%);
  }
  .prc53Hero__copy{
    left:20px;right:20px;top:auto;bottom:34px;width:auto;
  }
  .prc53Hero h1{font-size:46px}
  .prc53Hero__copy p{font-size:12.5px}
  .prc53Flow{padding:24px 18px 30px}
  .prc53Steps{grid-template-columns:1fr}
  .prc53Step:last-child{grid-column:auto}
  .prc53Trust{grid-template-columns:1fr;padding:14px}
  .prc53Trust>div,
  .prc53Trust>div:nth-child(2),
  .prc53Trust>div:nth-child(3),
  .prc53Trust>div:nth-child(4){
    border-right:0;
    border-top:1px solid rgba(218,151,65,.18);
  }
  .prc53Trust>div:first-child{border-top:0}
  .prc53Principles{
    margin:18px 18px 35px;
    grid-template-columns:1fr;
  }
  .prc53Principles__mark{
    min-height:78px;
    border-right:0;
    border-bottom:1px solid rgba(167,103,35,.32);
  }
}

/* STEP 54 — PROCESS HERO IMAGE FIT FIX */
.prc53Hero__image{
  object-fit:cover;
  object-position:66% 50%;
  transform:scale(1);
}
@media(min-width:1200px){
  .prc53Hero__image{
    object-position:68% 48%;
  }
}
@media(max-width:700px){
  .prc53Hero__image{
    object-position:72% 50%;
  }
}

`;

export default App;