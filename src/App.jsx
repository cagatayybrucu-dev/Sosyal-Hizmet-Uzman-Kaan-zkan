import { useEffect, useState } from "react";
import heroSlide1 from "./assets/hero-slide-1.jpg";
import heroSlide2 from "./assets/hero-slide-2.jpg";
import aboutPhoto from "./assets/kaan-about.jpg";

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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [page, setPage] = useState(
    window.location.hash === "#/hakkimda"
      ? "about"
      : window.location.hash === "#/hizmetler"
      ? "services"
      : window.location.hash === "#/surec"
      ? "process"
      : "home"
  );

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
            <a href="#/hizmetler" onClick={() => setMenuOpen(false)}>Hizmetler</a>
            <a href="#/hakkimda" onClick={() => setMenuOpen(false)}>Hakkımda</a>
            <a href="#/surec" onClick={() => setMenuOpen(false)}>Süreç</a>
            <a href="#iletisim" onClick={() => setMenuOpen(false)}>İletişim</a>
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
        ) : (
        <main>
          <section className="premiumSliderHero" id="anasayfa">
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
                  <p>Bilimsel temelli, etik ve insan odaklı bir yaklaşım.</p>
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

          <section className="aboutTeaser reveal">
            <div className="aboutTeaser__left">
              <span>HAKKIMDA</span>
              <h2>Kaan Özkan’ı ve mesleki yaklaşımını daha yakından tanıyın.</h2>
            </div>

            <div className="aboutTeaser__right">
              <p>
                Eğitim, saha deneyimi, danışmanlık yaklaşımı ve çalışma alanlarının
                tamamı ayrı Hakkımda sayfasında.
              </p>

              <a href="#/hakkimda">
                DETAYLI HAKKIMDA
                <Icon name="arrow" size={16} />
              </a>
            </div>
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

        <footer className="footer">
          <div className="footerBrand">
            <div className="brandMark">KÖ</div>
            <div>
              <strong>KAAN ÖZKAN</strong>
              <span>SOSYAL HİZMET UZMANI</span>
              <p>Güvenli alan. Net yol. Profesyonel destek.</p>
            </div>
          </div>

          <div className="footerCols">
            <div><span>HIZLI LİNKLER</span><a href="#anasayfa">Ana Sayfa</a><a href="#hizmetler">Hizmetler</a><a href="#/hakkimda">Hakkımda</a><a href="#surec">Süreç</a></div>
            <div><span>İLETİŞİM</span><a href="tel:+900000000000">Telefon</a><a href="mailto:iletisim@example.com">E-posta</a><a href="#iletisim">Randevu</a></div>
          </div>

          <div className="footerBottom">© 2026 Kaan Özkan — Tüm hakları saklıdır.</div>
        </footer>
      </div>
    </>
  );
}




function ProcessDetailPage() {
  const steps = [
    {
      no: "01",
      icon: "search",
      title: "İlk Temas & İhtiyacı Anlama",
      text: "İlk görüşmede başvuru nedeninizi, mevcut yaşam koşullarınızı, önceliklerinizi ve beklentilerinizi birlikte değerlendiririz.",
      detail: "Amaç, süreci acele etmeden doğru çerçevede anlamak ve güvenli bir çalışma zemini oluşturmaktır.",
    },
    {
      no: "02",
      icon: "compass",
      title: "Bütüncül Değerlendirme",
      text: "Yaşanan güçlüğü yalnızca tek bir belirti üzerinden değil; bireysel, ailevi, sosyal ve çevresel etkenlerle birlikte ele alırım.",
      detail: "Güçlü yönleriniz, destek kaynaklarınız ve değişimi etkileyebilecek yaşam dinamikleri birlikte görünür hale gelir.",
    },
    {
      no: "03",
      icon: "bulb",
      title: "Kişiye Özgü Yol Haritası",
      text: "İhtiyaçlar ve hedefler doğrultusunda gerçekçi, uygulanabilir ve sürdürülebilir bir danışmanlık planı oluştururuz.",
      detail: "Her sürecin kendine özgü olduğunu kabul eder; hazır kalıplar yerine kişiye göre şekillenen bir yaklaşım benimserim.",
    },
    {
      no: "04",
      icon: "route",
      title: "Görüşme & Uygulama Süreci",
      text: "Belirlenen hedefler doğrultusunda görüşmeler ilerler; yeni bakış açıları, iletişim becerileri ve işlevsel başa çıkma yolları üzerinde çalışılır.",
      detail: "Süreç boyunca danışanın aktif katılımı, kendi kaynaklarını fark etmesi ve değişimin öznesi olması temel önceliktir.",
    },
    {
      no: "05",
      icon: "check",
      title: "Takip & Değerlendirme",
      text: "Belirli aralıklarla ilerleme birlikte gözden geçirilir, değişen ihtiyaçlar değerlendirilir ve yol haritası gerektiğinde güncellenir.",
      detail: "Amaç yalnızca kısa vadeli rahatlama değil, yaşamın içinde sürdürülebilir kazanımlar oluşturabilmektir.",
    },
    {
      no: "06",
      icon: "heart",
      title: "Güçlenme & Sürdürülebilirlik",
      text: "Sürecin sonunda kişinin kendi kararlarını daha güvenle alabilmesi ve yaşamındaki zorluklarla daha işlevsel başa çıkabilmesi hedeflenir.",
      detail: "Danışmanlık, bağımlılık yaratan değil; bireyin kendi gücünü ve kapasitesini görünür kılan profesyonel bir iş birliğidir.",
    },
  ];

  return (
    <main className="processDetailPage">
      <section className="processDetailHero">
        <div className="processDetailHero__grid" />
        <div className="processDetailHero__glow processDetailHero__glow--one" />
        <div className="processDetailHero__glow processDetailHero__glow--two" />

        <a className="processBack" href="#/">
          <span>←</span>
          Ana Sayfaya Dön
        </a>

        <div className="processDetailHero__copy">
          <div className="processDetailEyebrow">
            <span />
            DANIŞMANLIK SÜRECİ
          </div>

          <h1>
            Süreç nasıl
            <br />
            <strong>ilerliyor?</strong>
          </h1>

          <p>
            Danışmanlık sürecini yalnızca konuşulan bir görüşme olarak değil;
            güvenli bir ilişki içinde ihtiyaçların anlaşıldığı, hedeflerin
            netleştiği ve değişimin birlikte yapılandırıldığı profesyonel bir
            çalışma süreci olarak görüyorum.
          </p>

          <div className="processHeroTrust">
            <div>
              <Icon name="lock" size={22} />
              <span>Gizlilik</span>
            </div>
            <div>
              <Icon name="shield" size={22} />
              <span>Etik Yaklaşım</span>
            </div>
            <div>
              <Icon name="users" size={22} />
              <span>Danışan Odaklı</span>
            </div>
          </div>
        </div>

        <aside className="processHeroCard">
          <div className="processHeroCard__ornament">
            <span />
            <b>✦</b>
            <span />
          </div>

          <div className="processHeroCard__icon">
            <Icon name="route" size={40} />
          </div>

          <span>6 ADIMDA PROFESYONEL SÜREÇ</span>
          <h2>Net, güvenli ve kişiye özgü bir yol haritası.</h2>
          <p>
            Her görüşmenin amacı, sizi hazır bir kalıba uydurmak değil;
            ihtiyaçlarınızı ve yaşam koşullarınızı doğru anlayarak size özgü bir
            çalışma zemini oluşturmaktır.
          </p>

          <a href="#iletisim">
            Randevu Oluştur
            <Icon name="arrow" size={16} />
          </a>
        </aside>
      </section>

      <section className="processRoadmap">
        <div className="processRoadmap__head">
          <span>ADIM ADIM</span>
          <h2>Danışmanlık yolculuğunun temel aşamaları.</h2>
        </div>

        <div className="processRoadmap__line" />

        <div className="processRoadmap__grid">
          {steps.map((step) => (
            <article className="processPremiumCard" key={step.no}>
              <div className="processPremiumCard__top">
                <span className="processPremiumCard__no">{step.no}</span>
                <div className="processPremiumCard__icon">
                  <Icon name={step.icon} size={25} />
                </div>
              </div>

              <h3>{step.title}</h3>
              <p>{step.text}</p>

              <div className="processPremiumCard__detail">
                <span>✦</span>
                <p>{step.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="processPrinciples">
        <div className="processPrinciples__head">
          <span>ÇALIŞMA İLKELERİ</span>
          <h2>Süreç boyunca değişmeyen üç temel ilke.</h2>
        </div>

        <div className="processPrinciples__grid">
          <article>
            <div><Icon name="lock" size={28} /></div>
            <span>01</span>
            <h3>Gizlilik</h3>
            <p>Paylaşımlarınız profesyonel etik ve güven çerçevesinde ele alınır.</p>
          </article>

          <article>
            <div><Icon name="user" size={28} /></div>
            <span>02</span>
            <h3>Kişiye Özgülük</h3>
            <p>Her danışanın yaşam öyküsü, ihtiyaçları ve hedefleri kendine özgüdür.</p>
          </article>

          <article>
            <div><Icon name="check" size={28} /></div>
            <span>03</span>
            <h3>Sürdürülebilirlik</h3>
            <p>Amaç yalnızca anlık çözüm değil, yaşamın içinde kullanılabilir kazanımlardır.</p>
          </article>
        </div>
      </section>

      <section className="processFinalCta">
        <div className="processFinalCta__glow" />
        <div>
          <span>İLK ADIM</span>
          <h2>
            Süreci konuşmak için
            <strong> ilk görüşmeyi planlayalım.</strong>
          </h2>
          <p>
            Görüşme öncesinde aklınızdaki soruları paylaşabilir, çalışma sürecinin
            sizin için uygun olup olmadığını birlikte değerlendirebiliriz.
          </p>
        </div>

        <a href="#iletisim">
          RANDEVU AL
          <Icon name="arrow" size={18} />
        </a>
      </section>
    </main>
  );
}

function ServicesDetailPage() {
  const groups = [
    {
      no: "01",
      icon: "heart",
      title: "Duygusal İyi Oluş",
      items: [
        "Anksiyete Bozuklukları",
        "Depresif Belirtiler",
        "Yaygın Kaygı Bozukluğu",
        "Panik Bozukluk",
        "Obsesif Düşünce Örüntüleri",
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
        "Dikkat Eksikliği ve Hiperaktivite Bozukluğu (DEHB/ADHD) ile ilişkili psikososyal sorunlar",
        "Kişilik Örüntülerine Bağlı İlişki ve Uyum Güçlükleri",
        "Bipolar Bozukluk Tanısı Bulunan Bireylerin Psikososyal Destek Süreçleri",
        "Madde Bağımlılığı ve Davranışsal Bağımlılıklar",
      ],
    },
  ];

  return (
    <main className="servicesDetailPage">
      <section className="servicesDetailHero">
        <div className="servicesDetailHero__grid" />
        <div className="servicesDetailHero__glow servicesDetailHero__glow--one" />
        <div className="servicesDetailHero__glow servicesDetailHero__glow--two" />

        <a className="servicesBack" href="#/">
          <span>←</span>
          Ana Sayfaya Dön
        </a>

        <div className="servicesDetailHero__copy">
          <div className="servicesDetailEyebrow">
            <span />
            HİZMETLER
          </div>

          <h1>
            Profesyonel
            <br />
            <strong>Çalışma Alanlarım.</strong>
          </h1>

          <p>
            Danışmanlık sürecinde her bireyin yaşam öyküsünü, ilişkilerini,
            sosyal çevresini ve kişisel kaynaklarını birlikte değerlendiriyor;
            ihtiyaçlara göre şekillenen etik, güvenli ve bütüncül bir çalışma
            yaklaşımı benimsiyorum.
          </p>

          <div className="servicesDetailHero__meta">
            <div><strong>01</strong><span>Bireysel</span></div>
            <div><strong>02</strong><span>Aile & Çift</span></div>
            <div><strong>03</strong><span>Online</span></div>
            <div><strong>04</strong><span>Psikososyal</span></div>
          </div>
        </div>

        <aside className="servicesDetailIntroCard">
          <div className="servicesDetailIntroCard__icon">
            <Icon name="compass" size={34} />
          </div>
          <span>PROFESYONEL DESTEK</span>
          <h2>Size uygun çalışma alanını birlikte belirleyelim.</h2>
          <p>
            İlk görüşmede ihtiyaçlarınızı, beklentilerinizi ve sürecin sizin için
            nasıl yapılandırılabileceğini birlikte değerlendiririz.
          </p>
          <a href="#iletisim">
            Randevu Oluştur
            <Icon name="arrow" size={16} />
          </a>
        </aside>
      </section>

      <section className="servicesDetailGridSection">
        <div className="servicesDetailSectionHead">
          <span>UZMANLIK ALANLARI</span>
          <h2>Çalışma alanlarını dört ana başlık altında inceleyebilirsiniz.</h2>
        </div>

        <div className="servicesDetailGrid">
          {groups.map((group) => (
            <article className="servicesDetailCard" key={group.no}>
              <div className="servicesDetailCard__top">
                <div>
                  <span className="servicesDetailCard__no">{group.no}</span>
                  <h3>{group.title}</h3>
                </div>
                <div className="servicesDetailCard__icon">
                  <Icon name={group.icon} size={25} />
                </div>
              </div>

              <div className="servicesDetailCard__list">
                {group.items.map((item) => (
                  <div className="servicesDetailItem" key={item}>
                    <span>✦</span>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="servicesDetailNote">
        <div className="servicesDetailNote__icon">
          <Icon name="shield" size={25} />
        </div>
        <div>
          <span>ÖNEMLİ NOT</span>
          <h3>Kişiye özgü, etik ve profesyonel değerlendirme.</h3>
          <p>
            Danışmanlık süreci kişisel ihtiyaçlar doğrultusunda planlanır.
            Gerektiğinde farklı uzmanlık alanlarına veya sağlık hizmetlerine
            yönlendirme yapılması, profesyonel ve etik yaklaşımın bir parçasıdır.
          </p>
        </div>
        <a href="#iletisim">
          GÖRÜŞME PLANLA
          <Icon name="arrow" size={16} />
        </a>
      </section>
    </main>
  );
}

function AboutDetailPage() {
  const values = [
    { icon: "user", title: "İnsan Odaklı", text: "Değeri merkeze alan yaklaşım" },
    { icon: "shield", title: "Gizlilik ve Güven", text: "Etik ilkelere bağlı, güvenli süreç" },
    { icon: "check", title: "Çözüm Odaklı", text: "Güç odaklı ve sürdürülebilir çözümler" },
    { icon: "heart", title: "Bütüncül Bakış", text: "Bireyi sosyal çevresiyle birlikte ele alırım" },
  ];

  const specialties = [
    "Aile Danışmanlığı",
    "Çift Danışmanlığı",
    "Bireysel Danışmanlık",
    "Psikososyal Destek",
  ];

  return (
    <main className="goldAbout">
      <section className="goldAboutHero">
        <div className="goldAboutHero__grid" />
        <div className="goldAboutHero__glow goldAboutHero__glow--one" />
        <div className="goldAboutHero__glow goldAboutHero__glow--two" />

        <a className="goldBack" href="#/">
          <span>←</span>
          Ana Sayfaya Dön
        </a>

        <div className="goldAboutHero__left">
          <div className="goldEyebrow"><span />HAKKIMDA</div>

          <h1>
            Merhabalar,
            <br />
            ben <strong>Kaan ÖZKAN.</strong>
          </h1>

          <p className="goldLead">
            Sosyal hizmetin bilimsel yaklaşımı ve aile danışmanlığının bütüncül
            bakış açısıyla; bireylerin, çiftlerin ve ailelerin yaşam
            yolculuklarında yanında olmayı, güçlü yönlerini ortaya çıkarmayı ve
            sürdürülebilir bir değişim sürecine eşlik etmeyi kendime mesleki bir
            amaç edindim.
          </p>

          <div className="goldValues">
            {values.map((item) => (
              <article className="goldValueCard" key={item.title}>
                <div className="goldValueIcon"><Icon name={item.icon} size={28} /></div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>

        <aside className="goldProfile">
          <div className="goldProfile__inner">
            <div className="goldProfile__photo">
              <img src={aboutPhoto} alt="Kaan Özkan" />
              <div className="goldProfile__photoShade" />
            </div>

            <div className="goldProfile__content">
              <div className="goldProfile__ornament">
                <span />
                <b>✦</b>
                <span />
              </div>

              <div className="goldProfile__role">
                <span />
                AİLE DANIŞMANI
                <span />
              </div>

              <h2>
                Kaan
                <strong>ÖZKAN</strong>
              </h2>

              <div className="goldProfile__shineLine" />

              <p className="goldProfile__bio">
                Aile danışmanlığı, sosyal hizmet uygulamaları ve psikososyal
                müdahale alanlarında; birey, çift ve ailelere profesyonel destek
                sunuyorum.
              </p>

              <ul className="goldSpecialties">
                {specialties.map((item) => (
                  <li key={item}>
                    <span>✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="goldSignature">Kaan Özkan</div>
            </div>
          </div>
        </aside>
      </section>

      <section className="goldAboutBody">
        <div className="goldAboutBody__heading">
          <span>MESLEKİ YOLCULUK</span>
          <h2>Deneyim, saha ve danışmanlık yaklaşımım.</h2>
        </div>

        <div className="goldAboutBody__copy">
          <p>
            İstanbul Aydın Üniversitesi Sağlık Bilimleri Fakültesi Sosyal Hizmet
            Bölümü'nden mezun olduktan sonra mesleki gelişimimi yalnızca
            üniversite eğitimiyle sınırlandırmadım. Eğitim hayatım boyunca farklı
            yaş grupları ve farklı yaşam deneyimlerine sahip bireylerle
            çalışabilmek amacıyla gönüllü projelerde, uygulamalı stajlarda ve saha
            araştırmalarında aktif olarak yer aldım.
          </p>

          <p>
            Üniversite yıllarında çocuk koruma sistemi, yaşlı bakım hizmetleri,
            rehabilitasyon merkezleri, sivil toplum kuruluşları ve sosyal hizmet
            kurumlarında görev alarak sosyal hizmet disiplininin farklı uygulama
            alanlarını yakından tanıdım.
          </p>

          <p>
            Meslek hayatıma Kırşehir Belediyesi Sosyal Yardım Merkezi'nde Sosyal
            Çalışmacı olarak başladım. Ardından Kırşehir Belediyesi Engelsiz
            Yaşam Merkezi, BEGEM ve Bağbaşı Aile Yaşam Merkezi'nde Sosyal
            Çalışmacı ve Aile Danışmanı olarak görev aldım.
          </p>

          <p>
            Çalışmalarımda güç odaklı yaklaşım, ekolojik sistem yaklaşımı, çözüm
            odaklı görüşme teknikleri ve aile danışmanlığı ilkelerinden
            yararlanıyor; her danışanın yaşam öyküsünü kendine özgü bir bütün
            olarak değerlendiriyorum.
          </p>
        </div>
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

/* COMPACT ABOUT TEASER — homepage stays clean */
.aboutTeaser{
  margin:0 5.2%;
  padding:34px 38px;
  display:grid;
  grid-template-columns:1.15fr .85fr;
  gap:40px;
  align-items:center;
  border:1px solid rgba(79,156,243,.12);
  border-radius:18px;
  background:
    radial-gradient(circle at 85% 18%,rgba(47,128,237,.07),transparent 26%),
    linear-gradient(145deg,#071421,#06101b);
  box-shadow:0 24px 60px rgba(0,0,0,.18);
}
.aboutTeaser__left>span{
  color:#4f9cf3;
  font-size:8px;
  letter-spacing:.2em;
}
.aboutTeaser__left h2{
  margin-top:10px;
  max-width:760px;
  font-family:Georgia,"Times New Roman",serif;
  font-size:clamp(28px,3.3vw,46px);
  font-weight:400;
  line-height:1.05;
  letter-spacing:-.03em;
}
.aboutTeaser__right p{
  color:#7f8c9e;
  font-size:11px;
  line-height:1.75;
}
.aboutTeaser__right a{
  margin-top:20px;
  display:inline-flex;
  align-items:center;
  gap:10px;
  color:#5ba9ff;
  font-size:8px;
  font-weight:700;
  letter-spacing:.08em;
}
.aboutTeaser__right a svg{transition:transform .25s ease}
.aboutTeaser__right a:hover svg{transform:translateX(4px)}

@media(max-width:820px){
  .aboutTeaser{
    margin:0 18px;
    padding:28px 24px;
    grid-template-columns:1fr;
    gap:22px;
  }
}

/* DETAILED ABOUT PAGE */
.aboutActions{display:flex;flex-wrap:wrap;gap:10px}

.aboutDetailPage{
  min-height:100vh;
  background:
    radial-gradient(circle at 80% 10%,rgba(47,128,237,.10),transparent 24%),
    linear-gradient(180deg,#020811,#04101d 48%,#020811);
}
.aboutDetailHero{
  position:relative;
  min-height:760px;
  padding:64px 6% 86px;
  display:grid;
  grid-template-columns:1.2fr .8fr;
  align-items:center;
  gap:7vw;
  overflow:hidden;
  border-bottom:1px solid var(--line);
}
.aboutDetailHero__glow{
  position:absolute;
  right:-180px;top:-80px;
  width:650px;height:650px;
  border-radius:50%;
  background:rgba(47,128,237,.11);
  filter:blur(120px);
}
.aboutDetailHero__grid{
  position:absolute;inset:0;
  background-image:
    linear-gradient(rgba(255,255,255,.014) 1px,transparent 1px),
    linear-gradient(90deg,rgba(255,255,255,.014) 1px,transparent 1px);
  background-size:70px 70px;
  mask-image:linear-gradient(to bottom,black,transparent 93%);
}
.aboutBack{
  position:absolute;
  z-index:3;
  left:6%;top:34px;
  display:inline-flex;
  align-items:center;
  gap:11px;
  color:#718097;
  font-size:8px;
  letter-spacing:.12em;
}
.aboutBack span{color:#5ba9ff;font-size:15px}
.aboutDetailHero__content{position:relative;z-index:2;max-width:840px}
.aboutDetailHero__eyebrow{
  display:flex;align-items:center;gap:10px;
  color:#4f9cf3;font-size:8px;letter-spacing:.22em;
}
.aboutDetailHero__eyebrow span{width:20px;height:1px;background:#4f9cf3}
.aboutDetailHero h1{
  margin-top:26px;
  font-family:Georgia,"Times New Roman",serif;
  font-size:clamp(58px,6.5vw,106px);
  font-weight:400;line-height:.92;letter-spacing:-.055em;
}
.aboutDetailHero h1 strong{
  color:#5aa7ff;font-weight:400;
}
.aboutDetailHero__lead{
  max-width:760px;margin-top:30px;
  color:#a0aaba;font-size:15px;line-height:1.9;
}
.aboutDetailHero__tags{
  margin-top:34px;display:flex;flex-wrap:wrap;gap:9px;
}
.aboutDetailHero__tags span{
  padding:9px 12px;
  border:1px solid rgba(91,169,255,.12);
  border-radius:999px;
  background:rgba(47,128,237,.035);
  color:#71849b;font-size:7px;letter-spacing:.1em;
}
.aboutIdentityCard{
  position:relative;z-index:2;
  min-height:480px;padding:38px;
  display:flex;flex-direction:column;justify-content:flex-end;
  overflow:hidden;
  border:1px solid rgba(255,255,255,.09);
  border-radius:28px;
  background:
    radial-gradient(circle at 70% 18%,rgba(47,128,237,.13),transparent 28%),
    linear-gradient(150deg,rgba(12,28,49,.92),rgba(5,13,24,.82));
  box-shadow:0 44px 110px rgba(0,0,0,.32),inset 0 1px 0 rgba(255,255,255,.04);
}
.aboutIdentityCard__mark{
  position:absolute;top:56px;left:50%;transform:translateX(-50%);
  color:transparent;-webkit-text-stroke:1px rgba(91,169,255,.44);
  font-family:Georgia,"Times New Roman",serif;
  font-size:112px;letter-spacing:-.14em;
}
.aboutIdentityCard>span{color:#5d6d82;font-size:7px;letter-spacing:.26em}
.aboutIdentityCard h2{margin-top:10px;font-family:Georgia,"Times New Roman",serif;font-size:36px;font-weight:400}
.aboutIdentityCard p{margin-top:14px;color:#77869b;font-size:11px;line-height:1.75}
.aboutIdentityCard__line{height:1px;margin:25px 0 17px;background:linear-gradient(90deg,#4f9cf3,transparent)}
.aboutIdentityCard__mini{display:flex;gap:16px;color:#4b5c72;font-size:6px;letter-spacing:.13em}

.aboutStory{
  padding:110px 6%;
  display:grid;
  grid-template-columns:220px 1fr;
  gap:7vw;
  border-bottom:1px solid var(--line);
  background:#020a14;
}
.aboutStory__side{position:sticky;top:130px;height:max-content}
.aboutStory__side>span{color:#4f9cf3;font-size:9px}
.aboutStory__side strong{display:block;margin-top:15px;color:#dfe7f1;font-size:9px;letter-spacing:.16em}
.aboutStory__side p{margin-top:9px;color:#56657a;font-size:9px;line-height:1.6}
.aboutStory__content{max-width:1000px}
.aboutStoryBlock{padding:0 0 46px;margin-bottom:46px;border-bottom:1px solid var(--line)}
.aboutStoryBlock:last-child{margin-bottom:0}
.aboutStoryBlock__label{color:#4f9cf3;font-size:8px;letter-spacing:.19em}
.aboutStoryBlock p{
  margin-top:20px;color:#9aa5b4;
  font-size:14px;line-height:1.95;
}
.aboutStoryBlock p+p{margin-top:24px}

.aboutValuesPanel{
  padding:110px 6%;
  border-bottom:1px solid var(--line);
  background:
    radial-gradient(circle at 85% 22%,rgba(47,128,237,.06),transparent 24%),
    linear-gradient(180deg,#03101d,#020a14);
}
.aboutValuesPanel__intro{
  display:grid;grid-template-columns:110px 1fr;gap:20px;margin-bottom:48px;
}
.aboutValuesPanel__intro>span{color:#39495e;font-size:9px}
.aboutValuesPanel__intro p{color:#4f9cf3;font-size:8px;letter-spacing:.22em}
.aboutValuesPanel__intro h2{
  max-width:840px;margin-top:12px;
  font-family:Georgia,"Times New Roman",serif;
  font-size:clamp(38px,4.6vw,68px);
  font-weight:400;line-height:1.02;
}
.aboutValuesGrid{
  display:grid;grid-template-columns:repeat(4,1fr);gap:10px;
}
.aboutValuesGrid article{
  min-height:250px;padding:28px;
  border:1px solid var(--line);border-radius:16px;
  background:linear-gradient(145deg,#071421,#06101b);
}
.aboutValuesGrid article>div{
  width:46px;height:46px;display:grid;place-items:center;
  border:1px solid rgba(91,169,255,.15);
  border-radius:10px;color:#5ba9ff;
}
.aboutValuesGrid h3{margin-top:28px;font-size:15px;font-weight:500}
.aboutValuesGrid p{margin-top:12px;color:#718096;font-size:10px;line-height:1.7}
.aboutValuesPanel__text{
  max-width:1000px;margin-top:40px;
  color:#93a0b2;font-size:13px;line-height:1.9;
}

.aboutExpertise{
  padding:110px 6%;
  border-bottom:1px solid var(--line);
  background:#020a14;
}
.aboutExpertise__heading>span{color:#4f9cf3;font-size:8px;letter-spacing:.2em}
.aboutExpertise__heading h2{
  max-width:840px;margin-top:14px;
  font-family:Georgia,"Times New Roman",serif;
  font-size:clamp(38px,4.5vw,66px);
  font-weight:400;line-height:1.03;
}
.aboutExpertise__chips{
  margin-top:38px;display:flex;flex-wrap:wrap;gap:9px;
}
.aboutExpertise__chips span{
  padding:10px 13px;
  border:1px solid rgba(255,255,255,.07);
  border-radius:999px;
  background:#071421;color:#728198;
  font-size:8px;
}
.aboutExpertise__copy{
  margin-top:50px;display:grid;grid-template-columns:1fr 1fr;gap:50px;
}
.aboutExpertise__copy p{color:#95a0b0;font-size:13px;line-height:1.9}

.aboutAcademic{
  padding:110px 6%;
  display:grid;grid-template-columns:120px 1fr;gap:40px;
  border-bottom:1px solid var(--line);
  background:linear-gradient(180deg,#020a14,#03101d);
}
.aboutAcademic__number{color:#39495e;font-size:9px}
.aboutAcademic__content{max-width:1000px}
.aboutAcademic__content>span{color:#4f9cf3;font-size:8px;letter-spacing:.2em}
.aboutAcademic h2{
  margin-top:14px;
  font-family:Georgia,"Times New Roman",serif;
  font-size:clamp(38px,4.5vw,66px);
  font-weight:400;line-height:1.03;
}
.aboutAcademic p{margin-top:28px;color:#94a0b1;font-size:13px;line-height:1.9}

.aboutClosing{
  position:relative;overflow:hidden;
  padding:120px 6%;
  background:#020811;
}
.aboutClosing__glow{
  position:absolute;right:-150px;top:-180px;
  width:650px;height:650px;border-radius:50%;
  background:rgba(47,128,237,.10);filter:blur(120px);
}
.aboutClosing>div:last-child{position:relative;z-index:2;max-width:980px}
.aboutClosing>div>span{color:#4f9cf3;font-size:8px;letter-spacing:.21em}
.aboutClosing h2{
  margin-top:16px;
  font-family:Georgia,"Times New Roman",serif;
  font-size:clamp(44px,5.3vw,78px);
  font-weight:400;line-height:1.01;
}
.aboutClosing h2 strong{color:#4f9cf3;font-weight:400}
.aboutClosing p{margin-top:26px;color:#94a0b1;font-size:13px;line-height:1.9}
.aboutClosing__actions{margin-top:38px;display:flex;gap:10px}

@media(max-width:900px){
  .aboutDetailHero{grid-template-columns:1fr;min-height:auto;padding:95px 20px 70px}
  .aboutBack{left:20px;top:25px}
  .aboutIdentityCard{min-height:420px}
  .aboutStory{grid-template-columns:1fr;padding:80px 20px}
  .aboutStory__side{position:static}
  .aboutValuesPanel,.aboutExpertise,.aboutAcademic,.aboutClosing{padding:80px 20px}
  .aboutValuesPanel__intro,.aboutAcademic{grid-template-columns:1fr}
  .aboutValuesGrid{grid-template-columns:repeat(2,1fr)}
  .aboutExpertise__copy{grid-template-columns:1fr;gap:20px}
}
@media(max-width:560px){
  .aboutDetailHero h1{font-size:52px}
  .aboutDetailHero__lead{font-size:13px}
  .aboutIdentityCard{padding:28px;min-height:390px}
  .aboutIdentityCard__mark{font-size:92px}
  .aboutStoryBlock p,.aboutValuesPanel__text,.aboutExpertise__copy p,.aboutAcademic p,.aboutClosing p{font-size:12px}
  .aboutValuesGrid{grid-template-columns:1fr}
  .aboutValuesGrid article{min-height:210px}
  .aboutClosing__actions{flex-direction:column}
  .aboutClosing__actions .btn{width:100%}
}

/* STEP 26 — RESTORED PREMIUM TOP NAV */
.topbar{
  height:98px;
  padding:0 4.8%;
  gap:28px;
  background:
    linear-gradient(180deg,rgba(4,11,21,.96),rgba(3,9,18,.92));
  border-bottom:1px solid rgba(255,255,255,.07);
  box-shadow:
    0 14px 40px rgba(0,0,0,.20),
    inset 0 -1px 0 rgba(79,156,243,.025);
}

.brand{
  gap:16px;
}

.brandMark{
  width:52px;
  height:52px;
  padding:0;
  display:grid;
  place-items:center;
  border:1px solid rgba(95,173,255,.16);
  border-radius:14px;
  background:
    linear-gradient(145deg,rgba(47,128,237,.07),rgba(255,255,255,.015));
  color:#f7f9fc;
  font-size:28px;
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.04),
    0 10px 28px rgba(0,0,0,.14);
}

.brandMark:before{
  display:none;
}

.brandText{
  gap:6px;
}

.brandText strong{
  font-size:13px;
  font-weight:600;
  letter-spacing:.16em;
  color:#f3f7fb;
}

.brandText span{
  font-size:8px;
  letter-spacing:.28em;
  color:#65758a;
}

.nav{
  display:flex;
  align-items:center;
  gap:9px;
  padding:8px;
  border:1px solid rgba(255,255,255,.075);
  border-radius:18px;
  background:
    linear-gradient(180deg,rgba(13,27,47,.82),rgba(5,13,24,.80));
  box-shadow:
    0 16px 42px rgba(0,0,0,.24),
    inset 0 1px 0 rgba(255,255,255,.035);
  backdrop-filter:blur(18px);
  -webkit-backdrop-filter:blur(18px);
}

.nav a{
  position:relative;
  min-width:118px;
  height:50px;
  padding:0 20px;
  display:flex;
  align-items:center;
  justify-content:center;
  border:1px solid transparent;
  border-radius:12px;
  color:#a9b4c3;
  font-size:12.5px;
  font-weight:600;
  letter-spacing:.015em;
  transition:
    color .28s ease,
    background .28s ease,
    border-color .28s ease,
    transform .28s ease,
    box-shadow .28s ease;
}

.nav a::before{
  content:"";
  position:absolute;
  inset:0;
  border-radius:12px;
  opacity:0;
  background:
    linear-gradient(145deg,rgba(47,128,237,.12),rgba(255,255,255,.018));
  transition:opacity .28s ease;
}

.nav a::after{
  content:"";
  position:absolute;
  left:50%;
  bottom:7px;
  width:0;
  height:2px;
  transform:translateX(-50%);
  border-radius:999px;
  background:linear-gradient(90deg,transparent,#65b3ff,transparent);
  box-shadow:0 0 12px rgba(86,166,255,.48);
  transition:width .28s ease;
}

.nav a:hover{
  color:#fff;
  border-color:rgba(91,169,255,.18);
  transform:translateY(-1px);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.05),
    0 10px 28px rgba(0,0,0,.16);
}

.nav a:hover::before{opacity:1}
.nav a:hover::after{width:52%}

/* Keep Ana Sayfa looking selected on the homepage */
.nav a:first-child{
  color:#fff;
  border-color:rgba(91,169,255,.22);
  background:
    linear-gradient(145deg,rgba(38,112,220,.18),rgba(19,57,111,.08));
}

.nav a:first-child::after{
  width:44%;
}

.topCta{
  min-height:50px;
  padding:0 22px;
  gap:10px;
  border-radius:12px;
  border-color:rgba(87,165,255,.28);
  background:
    linear-gradient(145deg,rgba(47,128,237,.10),rgba(255,255,255,.018));
  color:#f4f8fd;
  font-size:10px;
  font-weight:700;
  letter-spacing:.08em;
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.045),
    0 12px 30px rgba(0,0,0,.15);
}

.topCta:hover{
  background:
    linear-gradient(145deg,rgba(47,128,237,.18),rgba(255,255,255,.025));
  border-color:rgba(98,176,255,.40);
  transform:translateY(-1px);
}

@media(max-width:1180px){
  .topbar{padding:0 3.5%;gap:18px}
  .nav{gap:5px;padding:6px}
  .nav a{
    min-width:98px;
    height:46px;
    padding:0 14px;
    font-size:11px;
  }
  .topCta{padding:0 16px}
}

@media(max-width:900px){
  .topbar{
    height:78px;
    padding:0 18px;
  }

  .brandMark{
    width:46px;
    height:46px;
    border-radius:12px;
    font-size:24px;
  }

  .brandText strong{font-size:10px}
  .brandText span{font-size:6px}

  .nav{
    position:fixed;
    top:78px;
    left:14px;
    right:14px;
    max-height:0;
    overflow:hidden;
    display:flex;
    flex-direction:column;
    align-items:stretch;
    gap:8px;
    padding:0 12px;
    border:0;
    border-radius:0 0 20px 20px;
    background:rgba(3,10,19,.98);
    box-shadow:0 28px 60px rgba(0,0,0,.42);
    transition:max-height .35s ease,padding .35s ease,border-color .35s ease;
  }

  .nav--open{
    max-height:440px;
    padding:14px 12px 18px;
    border:1px solid rgba(255,255,255,.08);
  }

  .nav a,
  .nav a:hover{
    width:100%;
    min-width:0;
    height:54px;
    padding:0 18px;
    justify-content:flex-start;
    border:1px solid rgba(255,255,255,.06);
    border-radius:12px;
    background:rgba(255,255,255,.018);
    color:#c8d2df;
    font-size:13px;
    transform:none;
  }

  .nav a:first-child{
    border-color:rgba(91,169,255,.22);
    background:linear-gradient(145deg,rgba(47,128,237,.14),rgba(255,255,255,.02));
    color:#fff;
  }

  .nav a::after{display:none}
  .nav a::before{
    background:linear-gradient(90deg,rgba(47,128,237,.10),transparent);
  }
}

/* STEP 27 — ABOUT PROFILE PHOTO CARD */
.aboutIdentityCard{
  padding-top:270px;
}
.aboutIdentityCard__photoWrap{
  position:absolute;
  top:24px;
  left:24px;
  right:24px;
  height:225px;
  overflow:hidden;
  border:1px solid rgba(255,255,255,.08);
  border-radius:20px;
  background:#071421;
  box-shadow:
    0 24px 60px rgba(0,0,0,.30),
    inset 0 1px 0 rgba(255,255,255,.04);
}
.aboutIdentityCard__photo{
  width:100%;
  height:100%;
  object-fit:cover;
  object-position:center 46%;
  filter:saturate(.88) contrast(1.04) brightness(.86);
  transform:scale(1.03);
}
.aboutIdentityCard__photoShade{
  position:absolute;
  inset:0;
  pointer-events:none;
  background:
    linear-gradient(180deg,transparent 45%,rgba(5,13,24,.42) 100%),
    radial-gradient(circle at 75% 30%,rgba(70,151,255,.10),transparent 32%);
}
@media(max-width:900px){
  .aboutIdentityCard{
    padding-top:245px;
  }
  .aboutIdentityCard__photoWrap{
    height:200px;
  }
}
@media(max-width:560px){
  .aboutIdentityCard{
    padding-top:225px;
  }
  .aboutIdentityCard__photoWrap{
    top:18px;
    left:18px;
    right:18px;
    height:185px;
    border-radius:17px;
  }
}

/* STEP 28 — GOLD PREMIUM ABOUT */
.goldAbout{
  min-height:100vh;
  background:radial-gradient(circle at 78% 18%,rgba(43,99,160,.12),transparent 27%),linear-gradient(180deg,#020914 0%,#020a14 52%,#020811 100%);
  color:#f6f2eb;
}
.goldAboutHero{
  position:relative;min-height:calc(100vh - 98px);padding:118px 3.2% 86px;
  display:grid;grid-template-columns:.92fr 1.08fr;gap:5.5vw;align-items:center;
  overflow:hidden;border-bottom:1px solid rgba(255,255,255,.055);
}
.goldAboutHero__grid{position:absolute;inset:0;opacity:.25;background-image:linear-gradient(rgba(255,255,255,.017) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.017) 1px,transparent 1px);background-size:70px 70px;mask-image:linear-gradient(to bottom,black,transparent 95%);pointer-events:none}
.goldAboutHero__glow{position:absolute;border-radius:50%;filter:blur(110px);pointer-events:none}
.goldAboutHero__glow--one{width:520px;height:520px;right:8%;top:9%;background:rgba(43,120,215,.10)}
.goldAboutHero__glow--two{width:360px;height:360px;left:-120px;bottom:5%;background:rgba(180,111,32,.045)}
.goldBack{position:absolute;left:3.2%;top:34px;z-index:4;display:inline-flex;align-items:center;gap:12px;color:#a7a098;font-size:9px}
.goldBack span{color:#d69033;font-size:17px}
.goldAboutHero__left{position:relative;z-index:3;max-width:760px}
.goldEyebrow{display:flex;align-items:center;gap:14px;color:#db963d;font-size:9px;font-weight:700;letter-spacing:.15em}
.goldEyebrow>span{width:28px;height:2px;background:linear-gradient(90deg,#efb054,#b56b21);box-shadow:0 0 12px rgba(224,151,59,.35)}
.goldAboutHero h1{margin-top:28px;font-family:Georgia,"Times New Roman",serif;font-size:clamp(62px,6.2vw,112px);font-weight:400;line-height:.86;letter-spacing:-.055em;color:#f6f4f0}
.goldAboutHero h1 strong{color:transparent;font-weight:400;background:linear-gradient(180deg,#efb25e 0%,#d78b33 58%,#b96820 100%);-webkit-background-clip:text;background-clip:text}
.goldLead{max-width:710px;margin-top:34px;color:#c4c0ba;font-size:14px;line-height:1.95}
.goldValues{margin-top:44px;display:grid;grid-template-columns:repeat(4,1fr);gap:11px}
.goldValueCard{min-height:210px;padding:25px 20px;border:1px solid rgba(224,155,70,.20);border-radius:15px;background:linear-gradient(155deg,rgba(8,23,38,.94),rgba(4,14,25,.88));box-shadow:inset 0 1px 0 rgba(255,255,255,.025),0 20px 45px rgba(0,0,0,.14);transition:.3s}
.goldValueCard:hover{transform:translateY(-5px);border-color:rgba(231,164,79,.36);box-shadow:0 28px 55px rgba(0,0,0,.20)}
.goldValueIcon{width:52px;height:52px;display:grid;place-items:center;border:1px solid rgba(235,168,81,.24);border-radius:12px;color:#eea94f;background:rgba(208,126,30,.04)}
.goldValueCard h3{margin-top:23px;color:#f3eee8;font-size:14px;font-weight:600}
.goldValueCard p{margin-top:12px;color:#918d87;font-size:10px;line-height:1.65}

.goldProfile{position:relative;z-index:3;padding:18px;border:1px solid rgba(224,155,70,.24);border-radius:28px;background:linear-gradient(145deg,rgba(10,25,41,.92),rgba(4,13,24,.88));box-shadow:0 44px 110px rgba(0,0,0,.36),inset 0 1px 0 rgba(255,255,255,.035)}
.goldProfile:before{content:"";position:absolute;top:-2px;left:28%;right:28%;height:2px;background:linear-gradient(90deg,transparent,#67b9ff,transparent);box-shadow:0 0 20px rgba(74,160,255,.46)}
.goldProfile__inner{min-height:650px;padding:18px;display:grid;grid-template-columns:.98fr 1.02fr;gap:26px;border:1px solid rgba(255,255,255,.065);border-radius:21px;background:radial-gradient(circle at 72% 12%,rgba(43,111,197,.07),transparent 24%),linear-gradient(145deg,rgba(5,18,31,.96),rgba(4,13,23,.94))}
.goldProfile__photo{position:relative;min-height:610px;overflow:hidden;border:1px solid rgba(221,157,79,.24);border-radius:20px;background:#06101c;box-shadow:0 24px 55px rgba(0,0,0,.24)}
.goldProfile__photo img{width:100%;height:100%;object-fit:cover;object-position:center 43%;filter:saturate(.92) contrast(1.05) brightness(.88);transform:scale(1.01)}
.goldProfile__photoShade{position:absolute;inset:0;background:linear-gradient(180deg,transparent 62%,rgba(3,10,18,.25) 100%),radial-gradient(circle at 80% 18%,rgba(206,135,49,.05),transparent 30%);pointer-events:none}
.goldProfile__content{position:relative;padding:24px 24px 22px 10px;display:flex;flex-direction:column;justify-content:center}
.goldProfile__ornament{display:flex;align-items:center;justify-content:center;gap:15px;color:#d18b35}
.goldProfile__ornament span{height:1px;flex:1;background:linear-gradient(90deg,transparent,rgba(221,151,65,.38))}
.goldProfile__ornament span:last-child{background:linear-gradient(90deg,rgba(221,151,65,.38),transparent)}
.goldProfile__ornament b{font-size:21px;font-weight:400}
.goldProfile__role{margin-top:22px;display:flex;align-items:center;justify-content:center;gap:12px;color:#df963c;font-size:11px;font-weight:600;letter-spacing:.36em}
.goldProfile__role span{width:30px;height:1px;background:linear-gradient(90deg,#d18b35,transparent)}
.goldProfile__role span:last-child{background:linear-gradient(90deg,transparent,#d18b35)}
.goldProfile h2{margin-top:18px;font-family:Georgia,"Times New Roman",serif;font-size:clamp(48px,4.4vw,78px);font-weight:400;line-height:.82;letter-spacing:-.045em}
.goldProfile h2 strong{display:block;margin-top:9px;color:transparent;font-weight:400;background:linear-gradient(180deg,#efb15a,#c97c28);-webkit-background-clip:text;background-clip:text}
.goldProfile__shineLine{height:1px;margin:28px 0;background:linear-gradient(90deg,rgba(209,139,53,.35),#f0ad55,rgba(209,139,53,.35));box-shadow:0 0 15px rgba(218,146,57,.34)}
.goldProfile__bio{color:#c8c3bb;font-size:12px;line-height:1.85}
.goldSpecialties{margin:28px 0 0;padding:0;list-style:none;display:flex;flex-direction:column;gap:17px}
.goldSpecialties li{display:flex;align-items:center;gap:13px;color:#eee9e2;font-size:12px}
.goldSpecialties li span{width:23px;height:23px;flex:0 0 auto;display:grid;place-items:center;border:1px solid #c37a28;border-radius:50%;color:#e5a348;font-size:10px}
.goldSignature{margin-top:36px;color:#d28b35;font-family:"Segoe Script","Brush Script MT",cursive;font-size:31px;transform:rotate(-4deg);transform-origin:left center}

.goldAboutBody{padding:110px 6%;display:grid;grid-template-columns:.65fr 1.35fr;gap:7vw;border-bottom:1px solid rgba(255,255,255,.055);background:#020a14}
.goldAboutBody__heading>span{color:#d8923a;font-size:8px;letter-spacing:.2em}
.goldAboutBody__heading h2{margin-top:14px;font-family:Georgia,"Times New Roman",serif;font-size:clamp(36px,4vw,58px);font-weight:400;line-height:1.04}
.goldAboutBody__copy{columns:2;column-gap:50px}
.goldAboutBody__copy p{break-inside:avoid;margin:0 0 26px;color:#9a9a98;font-size:12px;line-height:1.95}

@media(max-width:1180px){
  .goldAboutHero{grid-template-columns:1fr;padding:110px 4% 70px}
  .goldProfile{max-width:920px}
  .goldValues{grid-template-columns:repeat(2,1fr)}
}
@media(max-width:820px){
  .goldAboutHero{padding:90px 18px 60px}
  .goldBack{left:18px;top:22px}
  .goldAboutHero h1{font-size:clamp(50px,13vw,72px)}
  .goldLead{font-size:13px}
  .goldValues{grid-template-columns:1fr 1fr}
  .goldProfile{padding:12px;border-radius:22px}
  .goldProfile__inner{grid-template-columns:1fr;min-height:auto;padding:12px}
  .goldProfile__photo{min-height:480px}
  .goldProfile__content{padding:30px 18px 24px}
  .goldAboutBody{padding:80px 20px;grid-template-columns:1fr}
  .goldAboutBody__copy{columns:1}
}
@media(max-width:520px){
  .goldValues{grid-template-columns:1fr}
  .goldValueCard{min-height:170px}
  .goldProfile__photo{min-height:410px}
  .goldProfile__role{font-size:9px;letter-spacing:.25em}
  .goldProfile h2{font-size:54px}
  .goldSignature{font-size:26px}
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

`;

export default App;
