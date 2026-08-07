import { useEffect, useState } from "react";

function App() {
  const [introVisible, setIntroVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroTilt, setHeroTilt] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    topic: "",
    message: "",
  });
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let introTimer;
    let raf1;
    let raf2;

    const beginIntroCountdown = () => {
      // Two RAFs force at least one real visual paint before the countdown starts.
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => {
          introTimer = window.setTimeout(() => {
            setIntroVisible(false);
          }, 2200);
        });
      });
    };

    if (document.readyState === "complete") {
      beginIntroCountdown();
    } else {
      window.addEventListener("load", beginIntroCountdown, { once: true });
    }

    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress =
        maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;

      setScrollProgress(progress);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.14 }
    );

    const items = document.querySelectorAll(".reveal");
    items.forEach((item) => observer.observe(item));

    return () => {
      window.removeEventListener("load", beginIntroCountdown);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      clearTimeout(introTimer);
      observer.disconnect();
    };
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const subject = encodeURIComponent(
      `Randevu Talebi - ${formData.name || "Yeni Danışan"}`
    );

    const body = encodeURIComponent(
      [
        `Ad Soyad: ${formData.name}`,
        `İletişim: ${formData.contact}`,
        `Görüşme Konusu: ${formData.topic}`,
        "",
        "Mesaj:",
        formData.message,
      ].join("\n")
    );

    window.location.href = `mailto:iletisim@example.com?subject=${subject}&body=${body}`;
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <style>{styles}</style>

      <div className="app">
        <div
          className="scrollProgress"
          style={{ transform: `scaleX(${scrollProgress / 100})` }}
          aria-hidden="true"
        />

        <div className={`intro ${introVisible ? "intro--visible" : "intro--hidden"}`}>
          <div className="intro__ambient intro__ambient--one" />
          <div className="intro__ambient intro__ambient--two" />
          <div className="intro__grid" />

          <div className="intro__content">
            <div className="intro__frame">
              <span className="intro__corner intro__corner--tl" />
              <span className="intro__corner intro__corner--tr" />
              <span className="intro__corner intro__corner--bl" />
              <span className="intro__corner intro__corner--br" />

              <KaanLogo large />

              <div className="intro__subcopy">
                <span>GÜVEN</span>
                <i />
                <span>GİZLİLİK</span>
                <i />
                <span>PROFESYONELLİK</span>
              </div>
            </div>

            <div className="intro__loader">
              <span />
            </div>

            <p className="intro__status">Profesyonel destek alanı hazırlanıyor</p>
          </div>
        </div>

        <div className="siteBackground" aria-hidden="true">
          <div className="siteBackground__orb siteBackground__orb--one" />
          <div className="siteBackground__orb siteBackground__orb--two" />
          <div className="siteBackground__grid" />
        </div>

        <header className={`premiumHeader ${scrolled ? "premiumHeader--scrolled" : ""}`}>
          <a className="brand" href="#anasayfa" onClick={closeMenu}>
            <KaanLogo />
          </a>

          <nav className={`premiumNav ${menuOpen ? "premiumNav--open" : ""}`}>
            <a href="#anasayfa" onClick={closeMenu}>Ana Sayfa</a>
            <a href="#hakkimda" onClick={closeMenu}>Hakkımda</a>
            <a href="#hizmetler" onClick={closeMenu}>Hizmetler</a>
            <a href="#surec" onClick={closeMenu}>Süreç</a>
            <a href="#iletisim" onClick={closeMenu}>İletişim</a>
          </nav>

          <div className="headerActions">
            <a className="headerPhone" href="tel:+900000000000">
              <span className="headerPhone__icon">◌</span>
              <span className="headerPhone__text">İletişim</span>
            </a>

            <a className="headerCta" href="#iletisim">
              Randevu Al
              <span>↗</span>
            </a>

            <button
              className={`menuToggle ${menuOpen ? "menuToggle--open" : ""}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menüyü aç veya kapat"
            >
              <span />
              <span />
            </button>
          </div>
        </header>

        <main>
          <section className="hero" id="anasayfa">
            <div className="hero__content">
              <div className="hero__eyebrow">
                <span className="pulseDot" />
                Profesyonel sosyal hizmet desteği
              </div>

              <h1 className="hero__title">
                <span className="heroLine heroLine--one">Birlikte daha güçlü</span>
                <span className="heroLine heroLine--two">bir başlangıç</span>
                <span className="heroLine heroLine--three">mümkün.</span>
              </h1>

              <p className="hero__text">
                Hayatın zorlu dönemlerinde; güven, gizlilik ve profesyonel
                sosyal hizmet desteğiyle yanınızdayım.
              </p>

              <div className="hero__actions">
                <a className="primaryButton" href="#iletisim">
                  Randevu Oluştur <span>→</span>
                </a>
                <a className="textButton" href="#hakkimda">
                  Beni Tanıyın <span>↘</span>
                </a>
              </div>

              <div className="hero__stats">
                <div><strong>%100</strong><span>Gizlilik</span></div>
                <i />
                <div><strong>Online</strong><span>Görüşme</span></div>
                <i />
                <div><strong>Etik</strong><span>Yaklaşım</span></div>
              </div>
            </div>

            <div
              className="hero__visual"
              aria-hidden="true"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const px = (e.clientX - rect.left) / rect.width - 0.5;
                const py = (e.clientY - rect.top) / rect.height - 0.5;
                setHeroTilt({ x: px, y: py });
              }}
              onMouseLeave={() => setHeroTilt({ x: 0, y: 0 })}
              style={{
                "--mx": heroTilt.x,
                "--my": heroTilt.y,
              }}
            >
              <div className="heroStage">
                <div className="heroStage__ambient" />
                <div className="heroStage__ring heroStage__ring--one" />
                <div className="heroStage__ring heroStage__ring--two" />
                <div className="heroStage__ring heroStage__ring--three" />

                <div className="heroStage__monolith">
                  <div className="heroStage__shine" />
                  <div className="heroStage__edge heroStage__edge--left" />
                  <div className="heroStage__edge heroStage__edge--right" />

                  <div className="heroStage__mark">KÖ</div>

                  <div className="heroStage__copy">
                    <span>SOSYAL HİZMET UZMANI</span>
                    <strong>KAAN ÖZKAN</strong>
                  </div>
                </div>

                <div className="floatingCard">
                  <div className="floatingCard__top">
                    <span className="availabilityDot" />
                    Görüşmeye açık
                  </div>

                  <div className="floatingCard__symbol">✦</div>

                  <p className="floatingCard__mini">PROFESYONEL DESTEK</p>
                  <h2>Yanınızdayım.</h2>
                  <p>
                    Bireysel görüşmeler, danışmanlık ve sosyal destek
                    süreçlerinde güvenli ve profesyonel yaklaşım.
                  </p>

                  <div className="floatingCard__bottom">
                    <span>Güvenli alan</span>
                    <strong>↗</strong>
                  </div>
                </div>

                <div className="floatingChip floatingChip--one">GİZLİLİK</div>
                <div className="floatingChip floatingChip--two">GÜVEN</div>

                <div className="heroStage__micro heroStage__micro--one">
                  01 / BİREYSEL DESTEK
                </div>
                <div className="heroStage__micro heroStage__micro--two">
                  02 / ONLINE GÖRÜŞME
                </div>
              </div>
            </div>
          </section>

          <section className="section services" id="hizmetler">
            <div className="services__ambient services__ambient--one" />
            <div className="services__ambient services__ambient--two" />

            <div className="sectionIntro reveal">
              <span>01</span>
              <div>
                <p>HİZMETLER</p>
                <h2>
                  İhtiyacınıza göre
                  <br />
                  <span>kişiselleştirilmiş destek.</span>
                </h2>
              </div>
            </div>

            <div className="servicesFeature reveal">
              <div className="servicesFeature__copy">
                <span className="servicesFeature__eyebrow">YAKLAŞIM</span>
                <h3>
                  Her görüşme,
                  <br />
                  size özel bir alan.
                </h3>
                <p>
                  Sürecin merkezinde sizin ihtiyaçlarınız, hedefleriniz ve
                  yaşam koşullarınız yer alır. Destek planı bu doğrultuda
                  şekillenir.
                </p>
              </div>

              <div className="servicesFeature__orbit" aria-hidden="true">
                <div className="servicesFeature__orbitRing servicesFeature__orbitRing--one" />
                <div className="servicesFeature__orbitRing servicesFeature__orbitRing--two" />
                <div className="servicesFeature__center">KÖ</div>
                <span className="servicesFeature__node servicesFeature__node--one">GÜVEN</span>
                <span className="servicesFeature__node servicesFeature__node--two">ETİK</span>
                <span className="servicesFeature__node servicesFeature__node--three">DESTEK</span>
              </div>
            </div>

            <div className="serviceGrid">
              {[
                {
                  n: "01",
                  icon: "◯",
                  title: "Bireysel Görüşme",
                  text: "Kişisel ihtiyaçlarınıza yönelik güvenli, gizli ve profesyonel değerlendirme süreçleri.",
                  tag: "BİREYSEL DESTEK",
                },
                {
                  n: "02",
                  icon: "◇",
                  title: "Sosyal Danışmanlık",
                  text: "Sosyal destek mekanizmaları, haklar, kaynaklar ve uygun hizmetlere yönlendirme.",
                  tag: "YÖNLENDİRME",
                },
                {
                  n: "03",
                  icon: "◎",
                  title: "Online Görüşme",
                  text: "Bulunduğunuz yerden güvenli ve kolay şekilde çevrim içi profesyonel destek.",
                  tag: "ONLINE",
                },
              ].map((item) => (
                <article className="serviceCard reveal" key={item.n}>
                  <div className="serviceCard__glow" />
                  <div className="serviceCard__head">
                    <span className="serviceCard__index">{item.n}</span>
                    <span className="serviceCard__tag">{item.tag}</span>
                  </div>

                  <div className="serviceCard__iconWrap">
                    <div className="serviceCard__icon">{item.icon}</div>
                    <span className="serviceCard__pulse" />
                  </div>

                  <h3>{item.title}</h3>
                  <p>{item.text}</p>

                  <div className="serviceCard__footer">
                    <a href="#iletisim">
                      Detaylı Bilgi
                      <span>→</span>
                    </a>

                    <div className="serviceCard__miniLine" />
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="section about" id="hakkimda">
            <div className="about__ambient about__ambient--one" />
            <div className="about__ambient about__ambient--two" />

            <div className="sectionLabel reveal">
              <span>02</span>
              HAKKIMDA
            </div>

            <div className="aboutGrid">
              <div className="aboutHeadline reveal">
                <p className="aboutHeadline__eyebrow">YAKLAŞIM & DEĞERLER</p>
                <h2>
                  Her bireyin hikâyesi
                  <span> kendine özgüdür.</span>
                </h2>

                <div className="aboutHeadline__line" />
              </div>

              <div className="aboutCopy reveal">
                <p className="aboutCopy__lead">
                  Sosyal hizmet yaklaşımımın merkezinde güven, gizlilik ve
                  danışanın ihtiyaçlarını anlamak yer alır.
                </p>

                <p>
                  Yaşamınızda karşılaştığınız sosyal, bireysel veya ailevi
                  süreçlerde doğru kaynaklara ulaşmanız ve çözüm yolları
                  oluşturmanız için yanınızdayım.
                </p>

                <a href="#iletisim">
                  Benimle İletişime Geç
                  <span>↗</span>
                </a>
              </div>
            </div>

            <div className="aboutShowcase">
              <div className="aboutProfile reveal">
                <div className="aboutProfile__glow" />

                <div className="aboutProfile__monogram">
                  <span>K</span>
                  <strong>Ö</strong>
                </div>

                <div className="aboutProfile__meta">
                  <span>SOSYAL HİZMET UZMANI</span>
                  <h3>Kaan Özkan</h3>
                  <p>
                    Profesyonel, etik ve danışan odaklı sosyal hizmet yaklaşımı.
                  </p>
                </div>

                <div className="aboutProfile__signature">
                  KÖ
                </div>
              </div>

              <div className="aboutValues">
                {[
                  {
                    n: "01",
                    title: "Gizlilik",
                    text: "Görüşmeleriniz ve paylaştığınız bilgiler profesyonel etik çerçevesinde ele alınır.",
                  },
                  {
                    n: "02",
                    title: "Danışan Odaklılık",
                    text: "Her süreç kişisel ihtiyaçlarınız, yaşam koşullarınız ve hedefleriniz doğrultusunda şekillenir.",
                  },
                  {
                    n: "03",
                    title: "Çözüm Odaklı Yaklaşım",
                    text: "Mevcut kaynakları görünür hale getirerek uygulanabilir ve sürdürülebilir yollar oluşturulur.",
                  },
                ].map((item) => (
                  <article className="aboutValue reveal" key={item.n}>
                    <div className="aboutValue__top">
                      <span>{item.n}</span>
                      <i />
                    </div>

                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="aboutQuote reveal">
              <span className="aboutQuote__mark">“</span>
              <p>
                Güvenli bir alan, doğru destek ve birlikte belirlenen adımlar;
                değişimin başlangıcı olabilir.
              </p>
              <div className="aboutQuote__author">
                <span />
                Kaan Özkan
              </div>
            </div>
          </section>

          <section className="section process" id="surec">
            <div className="sectionIntro reveal">
              <span>03</span>
              <div>
                <p>SÜREÇ</p>
                <h2>Üç adımda görüşmeye başlayın.</h2>
              </div>
            </div>

            <div className="processGrid">
              <article className="processItem reveal">
                <span>01</span>
                <div><h3>İletişime Geçin</h3><p>Randevu talebinizi oluşturun.</p></div>
              </article>
              <article className="processItem reveal">
                <span>02</span>
                <div><h3>Zaman Belirleyelim</h3><p>Size uygun görüşme gününü birlikte planlayalım.</p></div>
              </article>
              <article className="processItem reveal">
                <span>03</span>
                <div><h3>Görüşmeye Başlayalım</h3><p>Sürecinizi güvenli ve profesyonel bir ortamda değerlendirelim.</p></div>
              </article>
            </div>
          </section>

          <section className="contact" id="iletisim">
            <div className="contact__orb contact__orb--one" />
            <div className="contact__orb contact__orb--two" />
            <div className="contact__grid" />

            <div className="contact__header reveal">
              <div className="contact__headerIndex">04</div>

              <div>
                <p className="contact__eyebrow">İLETİŞİM & RANDEVU</p>
                <h2>
                  İlk adımı
                  <br />
                  <span>birlikte atalım.</span>
                </h2>
              </div>
            </div>

            <div className="contactLayout">
              <div className="contactInfo reveal">
                <p className="contactInfo__lead">
                  Görüşme süreci, uygunluk ve randevu hakkında bilgi almak
                  için iletişime geçebilirsiniz.
                </p>

                <div className="contactInfo__list">
                  <a href="tel:+900000000000" className="contactInfo__item">
                    <div>
                      <span>TELEFON</span>
                      <strong>+90 000 000 00 00</strong>
                    </div>
                    <i>↗</i>
                  </a>

                  <a href="mailto:iletisim@example.com" className="contactInfo__item">
                    <div>
                      <span>E-POSTA</span>
                      <strong>iletisim@example.com</strong>
                    </div>
                    <i>↗</i>
                  </a>

                  <a
                    href="https://wa.me/900000000000"
                    target="_blank"
                    rel="noreferrer"
                    className="contactInfo__item"
                  >
                    <div>
                      <span>WHATSAPP</span>
                      <strong>Mesaj Gönder</strong>
                    </div>
                    <i>↗</i>
                  </a>
                </div>

                <div className="contactInfo__note">
                  <span className="availabilityDot" />
                  <div>
                    <strong>Randevu taleplerine açık</strong>
                    <p>
                      Uygun görüşme zamanı iletişim sonrasında birlikte
                      planlanır.
                    </p>
                  </div>
                </div>
              </div>

              <form className="contactForm reveal" onSubmit={handleFormSubmit}>
                <div className="contactForm__top">
                  <span>RANDEVU TALEBİ</span>
                  <strong>01 — 04</strong>
                </div>

                <div className="contactForm__row">
                  <label>
                    <span>Ad Soyad</span>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      placeholder="Adınızı ve soyadınızı yazın"
                      required
                    />
                  </label>

                  <label>
                    <span>Telefon / E-posta</span>
                    <input
                      type="text"
                      name="contact"
                      value={formData.contact}
                      onChange={handleFormChange}
                      placeholder="Size ulaşabileceğimiz bilgi"
                      required
                    />
                  </label>
                </div>

                <label>
                  <span>Görüşme Konusu</span>
                  <select
                    name="topic"
                    value={formData.topic}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="">Bir konu seçin</option>
                    <option value="Bireysel Görüşme">Bireysel Görüşme</option>
                    <option value="Sosyal Danışmanlık">Sosyal Danışmanlık</option>
                    <option value="Online Görüşme">Online Görüşme</option>
                    <option value="Genel Bilgi">Genel Bilgi</option>
                  </select>
                </label>

                <label>
                  <span>Kısaca paylaşmak istediğiniz konu</span>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    placeholder="Dilerseniz görüşme talebiniz hakkında kısa bir not bırakabilirsiniz."
                    rows="5"
                  />
                </label>

                <div className="contactForm__bottom">
                  <p>
                    Gönder butonu cihazınızdaki e-posta uygulamasını açar.
                  </p>

                  <button type="submit">
                    Talep Oluştur
                    <span>↗</span>
                  </button>
                </div>
              </form>
            </div>

            <div className="contactMarquee" aria-hidden="true">
              <div>
                GÜVENLİ ALAN <span>•</span> GİZLİLİK <span>•</span>
                PROFESYONEL DESTEK <span>•</span> KAAN ÖZKAN <span>•</span>
                GÜVENLİ ALAN <span>•</span> GİZLİLİK <span>•</span>
                PROFESYONEL DESTEK <span>•</span> KAAN ÖZKAN
              </div>
            </div>
          </section>
        </main>

        <div className="mobileQuickBar">
          <a href="tel:+900000000000">
            <span>◌</span>
            Ara
          </a>

          <a
            href="https://wa.me/900000000000"
            target="_blank"
            rel="noreferrer"
          >
            <span>↗</span>
            WhatsApp
          </a>

          <a href="#iletisim">
            <span>＋</span>
            Randevu
          </a>
        </div>

        <footer className="premiumFooter">
          <div className="premiumFooter__top">
            <div className="premiumFooter__brand reveal">
              <KaanLogo />

              <p>
                Güven, gizlilik ve profesyonel yaklaşım odağında sosyal
                hizmet desteği.
              </p>
            </div>

            <div className="premiumFooter__nav reveal">
              <div>
                <span>MENÜ</span>
                <a href="#anasayfa">Ana Sayfa</a>
                <a href="#hakkimda">Hakkımda</a>
                <a href="#hizmetler">Hizmetler</a>
                <a href="#surec">Süreç</a>
              </div>

              <div>
                <span>İLETİŞİM</span>
                <a href="tel:+900000000000">Telefon</a>
                <a href="mailto:iletisim@example.com">E-posta</a>
                <a
                  href="https://wa.me/900000000000"
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            <div className="premiumFooter__cta reveal">
              <span>RANDEVU</span>
              <h3>
                Konuşmaya
                <br />
                hazır mısınız?
              </h3>

              <a href="#iletisim">
                Randevu Oluştur
                <strong>↗</strong>
              </a>
            </div>
          </div>

          <div className="premiumFooter__line" />

          <div className="premiumFooter__bottom">
            <p>© 2026 Kaan Özkan. Tüm hakları saklıdır.</p>

            <div>
              <span>SOSYAL HİZMET UZMANI</span>
              <i />
              <span>KAAN ÖZKAN</span>
            </div>

            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Yukarı Dön
              <span>↑</span>
            </button>
          </div>

          <div className="premiumFooter__watermark" aria-hidden="true">
            KAAN ÖZKAN
          </div>
        </footer>
      </div>
    </>
  );
}

function KaanLogo({ large = false }) {
  return (
    <div className={`kaanLogo ${large ? "kaanLogo--large" : ""}`}>
      <div className="kaanLogo__mark" aria-hidden="true">
        <svg
          className="kaanLogo__svg"
          viewBox="0 0 160 110"
          role="img"
          aria-label="KÖ monogram"
        >
          <defs>
            <linearGradient id="koSilver" x1="0" x2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="55%" stopColor="#d9e2ee" />
              <stop offset="100%" stopColor="#9fb0c4" />
            </linearGradient>

            <linearGradient id="koBlue" x1="0" x2="1">
              <stop offset="0%" stopColor="#7fc1ff" />
              <stop offset="55%" stopColor="#4da2ff" />
              <stop offset="100%" stopColor="#2f80ed" />
            </linearGradient>

            <filter id="koGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="2.6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path
            className="kaanLogo__framePath"
            d="M16 18 H78"
            stroke="url(#koSilver)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          <path
            className="kaanLogo__framePath"
            d="M16 18 V92 H77"
            stroke="url(#koSilver)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            className="kaanLogo__framePath kaanLogo__framePath--blue"
            d="M82 18 H144 V92 H85"
            stroke="url(#koBlue)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            className="kaanLogo__kStroke"
            d="M42 34 V78 M42 57 L68 35 M42 57 L70 80"
            stroke="url(#koSilver)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <circle
            className="kaanLogo__oRing"
            cx="104"
            cy="57"
            r="23"
            fill="none"
            stroke="url(#koBlue)"
            strokeWidth="6"
            filter="url(#koGlow)"
          />

          <circle cx="97" cy="27" r="2.5" fill="#7fc1ff" />
          <circle cx="111" cy="27" r="2.5" fill="#7fc1ff" />
        </svg>
      </div>

      <div className="kaanLogo__copy">
        <span>SOSYAL HİZMET UZMANI</span>
        <strong>KAAN ÖZKAN</strong>
      </div>
    </div>
  );
}

const styles = `
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");

:root{--bg:#040812;--soft:#07101d;--line:rgba(255,255,255,.075);--white:#f7f9fc;--muted:#7f8b9c;--blue:#2f80ed;--blue2:#63b2ff;--green:#39d98a}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{margin:0;min-width:320px;overflow-x:hidden;background:var(--bg);color:var(--white);font-family:Inter,Arial,sans-serif}
a{text-decoration:none;color:inherit}
button{font:inherit}
.app{position:relative;min-height:100vh;overflow:hidden;background:#040812}
.siteBackground{position:fixed;inset:0;z-index:0;pointer-events:none;background:radial-gradient(circle at 82% 22%,rgba(35,102,203,.14),transparent 28%),linear-gradient(180deg,#040812,#03070e)}
.siteBackground__orb{position:absolute;border-radius:50%;filter:blur(120px);opacity:.17}
.siteBackground__orb--one{width:580px;height:580px;right:-180px;top:40px;background:#1f69da}
.siteBackground__orb--two{width:460px;height:460px;left:-190px;top:52%;background:#123e85}
.siteBackground__grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px);background-size:72px 72px;mask-image:linear-gradient(to bottom,#000,transparent 92%)}

/* STEP 1 — PREMIUM LOGO + NAVBAR */
.premiumHeader{position:fixed;z-index:1000;top:0;left:0;width:100%;height:108px;padding:0 5.5%;display:flex;align-items:center;justify-content:space-between;gap:30px;border-bottom:1px solid rgba(255,255,255,.045);background:rgba(3,8,17,.58);backdrop-filter:blur(22px);-webkit-backdrop-filter:blur(22px);transition:height .35s ease,background .35s ease,border-color .35s ease,box-shadow .35s ease}
.premiumHeader--scrolled{height:84px;background:rgba(2,7,15,.87);border-color:rgba(255,255,255,.075);box-shadow:0 14px 45px rgba(0,0,0,.18)}
.brand{display:flex;align-items:center;min-width:max-content}
.kaanLogo{display:inline-flex;align-items:center;gap:16px}
.kaanLogo__mark{position:relative;width:88px;height:62px;display:grid;place-items:center;filter:drop-shadow(0 0 16px rgba(64,145,255,.08));transition:transform .35s ease,filter .35s ease}
.kaanLogo__svg{display:block;width:100%;height:100%;overflow:visible}
.kaanLogo__framePath{opacity:.88}
.kaanLogo__framePath--blue{opacity:.92}
.kaanLogo__kStroke{transition:filter .35s ease,transform .35s ease;transform-origin:55px 57px}
.kaanLogo__oRing{transition:filter .35s ease,transform .35s ease;transform-origin:104px 57px}
.kaanLogo__copy{display:flex;flex-direction:column;gap:7px;line-height:1}
.kaanLogo__copy span{font-size:11px;font-weight:500;letter-spacing:.31em;color:#f1f5fa}
.kaanLogo__copy strong{font-size:9px;font-weight:500;letter-spacing:.55em;color:#5faeff}
.brand:hover .kaanLogo__mark{transform:translateY(-2px);filter:drop-shadow(0 0 22px rgba(64,145,255,.22))}
.brand:hover .kaanLogo__kStroke{filter:drop-shadow(0 0 5px rgba(255,255,255,.18));transform:scale(1.025)}
.brand:hover .kaanLogo__oRing{filter:drop-shadow(0 0 7px rgba(72,153,255,.45));transform:scale(1.03)}
.kaanLogo--large{flex-direction:column;gap:22px;text-align:center}
.kaanLogo--large .kaanLogo__mark{width:154px;height:106px}
.kaanLogo--large .kaanLogo__copy{align-items:center;gap:10px}
.kaanLogo--large .kaanLogo__copy span{font-size:12px;letter-spacing:.42em}
.kaanLogo--large .kaanLogo__copy strong{font-size:11px;letter-spacing:.6em}
.premiumNav{display:flex;align-items:center;gap:36px}
.premiumNav a{position:relative;padding:12px 0;color:#818d9e;font-size:11px;font-weight:400;transition:color .3s ease}
.premiumNav a:after{content:"";position:absolute;left:50%;bottom:3px;width:0;height:1px;background:linear-gradient(90deg,transparent,#63b2ff,transparent);transform:translateX(-50%);transition:width .3s ease}
.premiumNav a:hover{color:#fff}
.premiumNav a:hover:after{width:110%}
.headerActions{display:flex;align-items:center;gap:16px;min-width:max-content}
.headerPhone{display:flex;align-items:center;gap:9px;color:#8490a1;font-size:11px}
.headerPhone__icon{font-size:19px;color:#9aabbd}
.headerCta{display:flex;align-items:center;gap:16px;padding:14px 23px;border:1px solid rgba(103,178,255,.24);border-radius:999px;background:linear-gradient(135deg,#1858c4,#3688f4);box-shadow:inset 0 1px 0 rgba(255,255,255,.16),0 12px 38px rgba(14,78,181,.2);font-size:11px;font-weight:600;transition:transform .3s ease,box-shadow .3s ease}
.headerCta:hover{transform:translateY(-2px);box-shadow:inset 0 1px 0 rgba(255,255,255,.18),0 18px 46px rgba(14,78,181,.32)}
.menuToggle{width:49px;height:49px;border:1px solid var(--line);border-radius:50%;display:none;align-items:center;justify-content:center;flex-direction:column;gap:7px;background:rgba(255,255,255,.035);cursor:pointer}
.menuToggle span{width:18px;height:1px;background:#eaf0f7;transition:.3s}
.menuToggle--open span:first-child{transform:translateY(4px) rotate(45deg)}
.menuToggle--open span:last-child{transform:translateY(-4px) rotate(-45deg)}

/* STEP 2 — CINEMATIC OPENING */
.intro{position:fixed;inset:0;z-index:2147483000;display:grid;place-items:center;overflow:hidden;background:radial-gradient(circle at 50% 48%,rgba(42,111,222,.13),transparent 26%),linear-gradient(180deg,#01040a 0%,#030814 52%,#01040a 100%);transition:opacity .7s cubic-bezier(.2,.75,.2,1),visibility .7s ease}
.intro--visible{opacity:1;visibility:visible;pointer-events:auto}
.intro--hidden{opacity:0;visibility:hidden;pointer-events:none}
.intro__ambient{position:absolute;border-radius:50%;filter:blur(110px);opacity:.2}
.intro__ambient--one{width:520px;height:520px;top:-180px;right:10%;background:#1f69da;animation:introAmbientOne 3.4s ease-in-out infinite alternate}
.intro__ambient--two{width:460px;height:460px;left:8%;bottom:-180px;background:#123e85;opacity:.13;animation:introAmbientTwo 3.8s ease-in-out infinite alternate}
.intro__grid{position:absolute;inset:0;opacity:.7;background-image:linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px);background-size:68px 68px;mask-image:radial-gradient(circle at center,black 0%,rgba(0,0,0,.78) 36%,transparent 76%)}
.intro__content{position:relative;display:flex;flex-direction:column;align-items:center;transition:transform .8s ease,filter .8s ease;animation:introMaster 1s .08s both cubic-bezier(.16,.8,.2,1)}
.intro__frame{position:relative;min-width:min(620px,86vw);padding:56px 70px 46px;display:flex;flex-direction:column;align-items:center}
.intro__frame:before{content:"";position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,.045),rgba(255,255,255,.01));border:1px solid rgba(255,255,255,.055);border-radius:28px;backdrop-filter:blur(8px);box-shadow:0 40px 120px rgba(0,0,0,.3),inset 0 1px 0 rgba(255,255,255,.04)}
.intro__corner{position:absolute;z-index:3;width:28px;height:28px}
.intro__corner:before,.intro__corner:after{content:"";position:absolute;background:linear-gradient(90deg,#eef6ff,#62b0ff)}
.intro__corner:before{width:28px;height:1px}.intro__corner:after{width:1px;height:28px}
.intro__corner--tl{top:18px;left:18px}.intro__corner--tr{top:18px;right:18px;transform:rotate(90deg)}.intro__corner--br{right:18px;bottom:18px;transform:rotate(180deg)}.intro__corner--bl{left:18px;bottom:18px;transform:rotate(270deg)}
.intro__frame>.kaanLogo{position:relative;z-index:2;animation:introLogo 1.05s .16s both cubic-bezier(.16,.8,.2,1)}
.intro__frame>.kaanLogo .kaanLogo__mark{animation:introMarkGlow 1.5s .4s both}
.intro__subcopy{position:relative;z-index:2;margin-top:30px;display:flex;align-items:center;gap:16px;color:#59687a;font-size:8px;letter-spacing:.24em;animation:introSubcopy .7s .75s both}
.intro__subcopy i{width:26px;height:1px;background:linear-gradient(90deg,transparent,rgba(99,178,255,.55),transparent)}
.intro__loader{width:min(390px,72vw);height:1px;margin-top:28px;overflow:hidden;background:rgba(255,255,255,.06)}
.intro__loader span{display:block;width:48%;height:100%;background:linear-gradient(90deg,transparent,#6bb6ff,#2f80ed,transparent);animation:introLoader 1.5s .35s infinite ease-in-out}
.intro__status{margin-top:14px;color:#3f4c5f;font-size:8px;letter-spacing:.25em;text-transform:uppercase;animation:introStatus .8s .9s both}

@keyframes introMaster{from{opacity:0;transform:translateY(28px) scale(.97);filter:blur(10px)}to{opacity:1;transform:none;filter:none}}
@keyframes introLogo{from{opacity:0;transform:translateY(18px) scale(.94)}to{opacity:1;transform:none}}
@keyframes introMarkGlow{0%{filter:drop-shadow(0 0 0 rgba(64,145,255,0))}55%{filter:drop-shadow(0 0 28px rgba(64,145,255,.4))}100%{filter:drop-shadow(0 0 16px rgba(64,145,255,.16))}}
@keyframes introSubcopy{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
@keyframes introStatus{from{opacity:0}to{opacity:1}}
@keyframes introLoader{from{transform:translateX(-140%)}to{transform:translateX(310%)}}
@keyframes introAmbientOne{from{transform:translate(0,0) scale(.9)}to{transform:translate(-65px,55px) scale(1.08)}}
@keyframes introAmbientTwo{from{transform:translate(0,0)}to{transform:translate(60px,-45px)}}

/* EXISTING PAGE */
main,.hero,.section,.contact,footer{position:relative;z-index:1}
.hero{min-height:100vh;padding:165px 6.5% 90px;display:grid;grid-template-columns:1.05fr .95fr;align-items:center;gap:7vw;border-bottom:1px solid var(--line)}
.hero__content{max-width:820px}
.hero__eyebrow{width:fit-content;margin-bottom:30px;padding:8px 14px;display:flex;align-items:center;gap:10px;border:1px solid rgba(99,176,255,.16);border-radius:999px;background:rgba(47,128,237,.05);color:#91bde9;font-size:9px;letter-spacing:.18em;text-transform:uppercase}
.pulseDot{width:7px;height:7px;border-radius:50%;background:#63b2ff;box-shadow:0 0 14px #63b2ff}
.hero__title{display:flex;flex-direction:column;font-size:clamp(58px,6.4vw,108px);font-weight:400;letter-spacing:-.064em;line-height:.91}
.heroLine{display:block;width:max-content;max-width:100%;color:#f7f9fc;animation:heroLineIn .9s both cubic-bezier(.16,.8,.2,1)}
.heroLine--one{animation-delay:1.55s}
.heroLine--two{animation-delay:1.68s}
.heroLine--three{animation-delay:1.81s;color:transparent;background:linear-gradient(90deg,#f6f9ff 0%,#77bcff 47%,#2f80ed 100%);-webkit-background-clip:text;background-clip:text;text-shadow:0 0 50px rgba(54,137,255,.08)}
.hero__text{max-width:560px;margin-top:34px;color:#8490a2;font-size:15px;line-height:1.85}
.hero__actions{display:flex;align-items:center;gap:22px;margin-top:38px}
.primaryButton{min-width:208px;padding:16px 22px;display:flex;justify-content:space-between;gap:26px;border-radius:999px;background:linear-gradient(135deg,#1759c6,#3184ef);box-shadow:0 16px 42px rgba(16,84,194,.28);font-size:12px;font-weight:600}
.textButton{padding:15px 0 9px;display:flex;gap:16px;border-bottom:1px solid rgba(255,255,255,.16);color:#98a4b4;font-size:12px}
.hero__stats{display:flex;align-items:center;gap:24px;margin-top:60px}
.hero__stats div{display:flex;flex-direction:column;gap:5px}
.hero__stats strong{font-size:13px}.hero__stats span{color:#4b586a;font-size:8px;letter-spacing:.17em;text-transform:uppercase}.hero__stats i{width:1px;height:30px;background:rgba(255,255,255,.09)}
.hero__visual{position:relative;min-height:640px;display:grid;place-items:center;perspective:1100px}
.heroStage{position:relative;width:min(620px,100%);height:620px;display:grid;place-items:center;transform-style:preserve-3d;transform:rotateX(calc(var(--my) * -4deg)) rotateY(calc(var(--mx) * 5deg));transition:transform .18s ease-out}
.heroStage__ambient{position:absolute;width:560px;height:560px;border-radius:50%;background:radial-gradient(circle,rgba(49,130,242,.26) 0%,rgba(27,80,158,.085) 42%,transparent 68%);filter:blur(2px);animation:stagePulse 5s ease-in-out infinite alternate}
.heroStage__ring{position:absolute;border:1px solid rgba(97,172,255,.12);border-radius:50%;box-shadow:inset 0 0 45px rgba(43,122,239,.025)}
.heroStage__ring--one{width:500px;height:500px;animation:ringSpin 24s linear infinite}
.heroStage__ring--two{width:390px;height:390px;border-style:dashed;opacity:.52;animation:ringSpinReverse 19s linear infinite}
.heroStage__ring--three{width:286px;height:286px;opacity:.38;animation:ringPulse 4s ease-in-out infinite alternate}
.heroStage__monolith{position:absolute;z-index:1;width:270px;height:455px;border:1px solid rgba(255,255,255,.11);border-radius:34px;background:linear-gradient(160deg,rgba(19,39,68,.78),rgba(5,13,25,.72) 55%,rgba(11,31,58,.72));box-shadow:0 55px 120px rgba(0,0,0,.44),inset 0 1px 0 rgba(255,255,255,.08);backdrop-filter:blur(18px);overflow:hidden;transform:translate3d(calc(var(--mx) * 18px),calc(var(--my) * 14px),-18px) rotate(-7deg);transition:transform .18s ease-out}
.heroStage__monolith:before{content:"";position:absolute;inset:0;background:linear-gradient(120deg,transparent 18%,rgba(255,255,255,.055) 38%,transparent 55%);transform:translateX(-90%);animation:monolithSweep 4.8s 1.6s infinite}
.heroStage__shine{position:absolute;top:-80px;right:-80px;width:220px;height:220px;border-radius:50%;background:rgba(61,147,255,.18);filter:blur(55px)}
.heroStage__edge{position:absolute;width:1px;height:66%;top:17%;background:linear-gradient(transparent,rgba(100,181,255,.6),transparent);opacity:.5}
.heroStage__edge--left{left:15px}.heroStage__edge--right{right:15px}
.heroStage__mark{position:absolute;top:72px;left:50%;transform:translateX(-50%);color:transparent;-webkit-text-stroke:1px rgba(125,192,255,.48);font-size:92px;font-weight:500;letter-spacing:-.14em;text-shadow:0 0 30px rgba(46,128,237,.14)}
.heroStage__copy{position:absolute;left:0;right:0;bottom:52px;display:flex;flex-direction:column;align-items:center;gap:9px;text-align:center}
.heroStage__copy span{color:#6f7f95;font-size:7px;letter-spacing:.3em}
.heroStage__copy strong{color:#6db4ff;font-size:10px;font-weight:500;letter-spacing:.5em}
.floatingCard{position:absolute;z-index:4;right:-4px;bottom:40px;width:330px;min-height:360px;padding:28px;border:1px solid rgba(255,255,255,.1);border-radius:26px;background:linear-gradient(145deg,rgba(18,33,55,.82),rgba(7,15,27,.62));backdrop-filter:blur(24px);box-shadow:0 42px 95px rgba(0,0,0,.42);transform:translate3d(calc(var(--mx) * -24px),calc(var(--my) * -18px),55px);transition:transform .18s ease-out}
.floatingCard__top{display:flex;align-items:center;gap:10px;color:#69778a;font-size:8px;letter-spacing:.17em;text-transform:uppercase}
.availabilityDot{width:7px;height:7px;border-radius:50%;background:#39d98a;box-shadow:0 0 14px #39d98a}
.floatingCard__symbol{width:62px;height:62px;margin-top:45px;display:grid;place-items:center;border:1px solid rgba(95,174,255,.2);border-radius:50%;color:#63b2ff;font-size:25px;background:rgba(47,128,237,.035)}
.floatingCard__mini{margin-top:20px!important;color:#4c6b91!important;font-size:7px!important;letter-spacing:.22em}
.floatingCard h2{margin-top:8px;font-size:30px;font-weight:500;letter-spacing:-.035em}.floatingCard p{max-width:285px;margin-top:14px;color:#8491a3;font-size:11px;line-height:1.72}
.floatingCard__bottom{position:absolute;left:28px;right:28px;bottom:24px;padding-top:16px;display:flex;justify-content:space-between;border-top:1px solid rgba(255,255,255,.08);color:#657286;font-size:9px}
.floatingChip{position:absolute;z-index:5;padding:10px 16px;border:1px solid rgba(255,255,255,.1);border-radius:999px;background:rgba(9,19,34,.72);backdrop-filter:blur(14px);color:#718096;font-size:7px;letter-spacing:.2em;box-shadow:0 16px 35px rgba(0,0,0,.22)}
.floatingChip--one{top:20%;right:3%;transform:translate3d(calc(var(--mx) * -34px),calc(var(--my) * -22px),70px);animation:chipFloat 4.4s ease-in-out infinite}
.floatingChip--two{left:1%;bottom:24%;transform:translate3d(calc(var(--mx) * 30px),calc(var(--my) * 18px),60px);animation:chipFloat 5s .6s ease-in-out infinite}
.heroStage__micro{position:absolute;z-index:2;color:#34445a;font-size:7px;letter-spacing:.2em;writing-mode:vertical-rl;text-orientation:mixed}
.heroStage__micro--one{left:11%;top:22%}.heroStage__micro--two{right:10%;bottom:18%;transform:rotate(180deg)}
.section{padding:145px 6.5%}
.services{position:relative;overflow:hidden;background:linear-gradient(180deg,#07101d 0%,#050b14 58%,#040812 100%)}
.services__ambient{position:absolute;border-radius:50%;filter:blur(100px);pointer-events:none}
.services__ambient--one{width:430px;height:430px;right:-150px;top:80px;background:rgba(34,102,211,.12)}
.services__ambient--two{width:360px;height:360px;left:-130px;bottom:130px;background:rgba(31,76,152,.08)}
.sectionIntro{position:relative;z-index:2;display:grid;grid-template-columns:120px 1fr;margin-bottom:70px}.sectionIntro>span{color:#39465a;font-size:10px}.sectionIntro p,.sectionLabel,.contact__content>p{color:#4f9eff;font-size:9px;letter-spacing:.32em}.sectionIntro h2{max-width:900px;margin-top:18px;font-size:clamp(46px,5.2vw,78px);font-weight:400;letter-spacing:-.055em;line-height:.98}.sectionIntro h2 span{color:#445368}
.servicesFeature{position:relative;z-index:2;min-height:320px;margin-bottom:28px;padding:48px 52px;display:grid;grid-template-columns:1fr .85fr;align-items:center;gap:60px;overflow:hidden;border:1px solid rgba(255,255,255,.08);border-radius:28px;background:linear-gradient(135deg,rgba(13,27,47,.82),rgba(6,14,26,.62));box-shadow:0 40px 90px rgba(0,0,0,.24),inset 0 1px 0 rgba(255,255,255,.035)}
.servicesFeature:before{content:"";position:absolute;inset:0;background:linear-gradient(120deg,transparent 10%,rgba(255,255,255,.025) 38%,transparent 68%)}
.servicesFeature__copy{position:relative;z-index:2;max-width:600px}
.servicesFeature__eyebrow{color:#5faeff;font-size:8px;letter-spacing:.28em}
.servicesFeature h3{margin-top:18px;font-size:clamp(35px,4vw,58px);font-weight:400;letter-spacing:-.055em;line-height:1}
.servicesFeature p{max-width:540px;margin-top:22px;color:#7d899b;font-size:13px;line-height:1.85}
.servicesFeature__orbit{position:relative;z-index:2;width:260px;height:260px;margin-left:auto;display:grid;place-items:center}
.servicesFeature__orbitRing{position:absolute;border:1px solid rgba(99,178,255,.14);border-radius:50%}
.servicesFeature__orbitRing--one{width:230px;height:230px;animation:ringSpin 24s linear infinite}
.servicesFeature__orbitRing--two{width:170px;height:170px;border-style:dashed;opacity:.5;animation:ringSpinReverse 17s linear infinite}
.servicesFeature__center{width:96px;height:96px;display:grid;place-items:center;border:1px solid rgba(108,181,255,.23);border-radius:50%;background:radial-gradient(circle,rgba(48,130,239,.12),rgba(5,15,29,.8));color:#67b4ff;font-size:35px;font-weight:400;letter-spacing:-.12em;box-shadow:0 0 45px rgba(47,128,237,.12)}
.servicesFeature__node{position:absolute;padding:8px 12px;border:1px solid rgba(255,255,255,.08);border-radius:999px;background:rgba(6,15,27,.78);color:#617087;font-size:6px;letter-spacing:.18em;backdrop-filter:blur(10px)}
.servicesFeature__node--one{top:10px;right:-8px}.servicesFeature__node--two{left:-14px;bottom:58px}.servicesFeature__node--three{right:10px;bottom:12px}
.serviceGrid{position:relative;z-index:2;display:grid;grid-template-columns:repeat(3,1fr);gap:1px;border:1px solid var(--line);border-radius:24px;overflow:hidden;background:var(--line)}
.serviceCard{position:relative;min-height:450px;padding:36px;overflow:hidden;background:linear-gradient(180deg,#07101d 0%,#06101c 100%);transition:transform .4s ease,background .4s ease}
.serviceCard:before{content:"";position:absolute;inset:0;opacity:0;background:linear-gradient(145deg,rgba(47,128,237,.07),transparent 50%);transition:opacity .4s ease}
.serviceCard:hover{background:#091523}.serviceCard:hover:before{opacity:1}
.serviceCard__glow{position:absolute;top:-120px;right:-80px;width:240px;height:240px;border-radius:50%;background:rgba(51,132,242,.12);filter:blur(60px);opacity:0;transition:opacity .45s ease}
.serviceCard:hover .serviceCard__glow{opacity:1}
.serviceCard__head{position:relative;z-index:2;display:flex;align-items:center;justify-content:space-between}
.serviceCard__index{color:#3c485a;font-size:8px;letter-spacing:.18em}
.serviceCard__tag{padding:7px 10px;border:1px solid rgba(255,255,255,.07);border-radius:999px;color:#516078;font-size:6px;letter-spacing:.17em}
.serviceCard__iconWrap{position:relative;z-index:2;width:84px;height:84px;margin-top:74px;display:grid;place-items:center}
.serviceCard__iconWrap:before{content:"";position:absolute;inset:0;border:1px solid rgba(99,178,255,.16);border-radius:50%;transition:transform .4s ease,border-color .4s ease}
.serviceCard:hover .serviceCard__iconWrap:before{transform:scale(1.08) rotate(12deg);border-color:rgba(99,178,255,.28)}
.serviceCard__icon{color:#63b2ff;font-size:34px;transition:transform .4s ease}
.serviceCard:hover .serviceCard__icon{transform:translateY(-3px) rotate(6deg)}
.serviceCard__pulse{position:absolute;width:7px;height:7px;right:6px;top:13px;border-radius:50%;background:#3f94f5;box-shadow:0 0 14px rgba(63,148,245,.8)}
.serviceCard h3{position:relative;z-index:2;margin-top:28px;font-size:24px;font-weight:500;letter-spacing:-.04em}
.serviceCard p{position:relative;z-index:2;max-width:305px;margin-top:16px;color:#748096;font-size:12px;line-height:1.8}
.serviceCard__footer{position:absolute;z-index:2;left:36px;right:36px;bottom:30px;display:flex;align-items:center;justify-content:space-between}
.serviceCard__footer a{display:inline-flex;align-items:center;gap:12px;color:#8d99aa;font-size:9px;transition:color .3s ease}
.serviceCard__footer a span{transition:transform .3s ease}.serviceCard__footer a:hover{color:#63b2ff}.serviceCard__footer a:hover span{transform:translateX(5px)}
.serviceCard__miniLine{width:54px;height:1px;background:linear-gradient(90deg,rgba(99,178,255,.55),transparent)}
.about{position:relative;overflow:hidden;border-block:1px solid var(--line);background:linear-gradient(180deg,#040812 0%,#050b14 60%,#040812 100%)}
.about__ambient{position:absolute;border-radius:50%;filter:blur(110px);pointer-events:none}
.about__ambient--one{width:430px;height:430px;right:-140px;top:8%;background:rgba(47,128,237,.09)}
.about__ambient--two{width:350px;height:350px;left:-140px;bottom:12%;background:rgba(27,73,145,.07)}
.sectionLabel{position:relative;z-index:2;display:flex;gap:24px;color:#4f9eff;font-size:9px;letter-spacing:.32em}.sectionLabel span{color:#39465a}
.aboutGrid{position:relative;z-index:2;display:grid;grid-template-columns:1.15fr .85fr;gap:8vw;margin-top:68px}
.aboutHeadline__eyebrow{margin-bottom:18px;color:#5faeff;font-size:8px;letter-spacing:.28em}
.aboutHeadline h2{font-size:clamp(46px,5.4vw,80px);font-weight:400;letter-spacing:-.06em;line-height:1.02}.aboutHeadline h2 span{color:#354255}
.aboutHeadline__line{width:120px;height:1px;margin-top:32px;background:linear-gradient(90deg,#63b2ff,transparent)}
.aboutCopy{padding-top:18px}.aboutCopy p{margin-bottom:24px;color:#8793a5;font-size:13px;line-height:1.9}.aboutCopy__lead{color:#a4afbd!important;font-size:15px!important}
.aboutCopy a{display:inline-flex;align-items:center;gap:18px;padding-bottom:9px;border-bottom:1px solid rgba(255,255,255,.17);font-size:11px}.aboutCopy a span{transition:transform .3s ease}.aboutCopy a:hover span{transform:translate(4px,-4px)}
.aboutShowcase{position:relative;z-index:2;margin-top:84px;display:grid;grid-template-columns:.9fr 1.1fr;gap:28px;align-items:stretch}
.aboutProfile{position:relative;min-height:520px;padding:42px;overflow:hidden;border:1px solid rgba(255,255,255,.08);border-radius:28px;background:linear-gradient(145deg,rgba(14,30,52,.82),rgba(6,14,25,.7));box-shadow:0 36px 88px rgba(0,0,0,.28),inset 0 1px 0 rgba(255,255,255,.04)}
.aboutProfile:before{content:"";position:absolute;inset:0;background:linear-gradient(120deg,transparent 18%,rgba(255,255,255,.025) 40%,transparent 63%)}
.aboutProfile__glow{position:absolute;top:-110px;right:-90px;width:280px;height:280px;border-radius:50%;background:rgba(47,128,237,.18);filter:blur(65px)}
.aboutProfile__monogram{position:absolute;top:64px;left:50%;transform:translateX(-50%);width:210px;height:210px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(103,178,255,.14);border-radius:50%;background:radial-gradient(circle,rgba(47,128,237,.08),rgba(6,14,26,.25) 56%,transparent 72%);box-shadow:inset 0 0 60px rgba(47,128,237,.05)}
.aboutProfile__monogram:before,.aboutProfile__monogram:after{content:"";position:absolute;border:1px solid rgba(99,178,255,.08);border-radius:50%}.aboutProfile__monogram:before{width:165px;height:165px}.aboutProfile__monogram:after{width:250px;height:250px;border-style:dashed;animation:ringSpin 26s linear infinite}
.aboutProfile__monogram span,.aboutProfile__monogram strong{font-size:76px;font-weight:400;letter-spacing:-.16em;line-height:1}
.aboutProfile__monogram span{color:#f6f9ff}.aboutProfile__monogram strong{color:#63b2ff;text-shadow:0 0 28px rgba(72,153,255,.25)}
.aboutProfile__meta{position:absolute;left:42px;right:42px;bottom:52px}
.aboutProfile__meta>span{color:#5a6a80;font-size:7px;letter-spacing:.28em}.aboutProfile__meta h3{margin-top:10px;font-size:34px;font-weight:500;letter-spacing:-.045em}.aboutProfile__meta p{max-width:360px;margin-top:14px;color:#758196;font-size:12px;line-height:1.75}
.aboutProfile__signature{position:absolute;right:28px;bottom:20px;color:transparent;-webkit-text-stroke:1px rgba(255,255,255,.05);font-size:74px;font-weight:600;letter-spacing:-.16em}
.aboutValues{display:grid;grid-template-columns:1fr;gap:1px;border:1px solid var(--line);border-radius:28px;overflow:hidden;background:var(--line)}
.aboutValue{position:relative;min-height:172px;padding:30px 34px;background:#07101d;transition:background .35s ease}
.aboutValue:hover{background:#091523}
.aboutValue__top{display:flex;align-items:center;justify-content:space-between}.aboutValue__top span{color:#4f9eff;font-size:8px;letter-spacing:.18em}.aboutValue__top i{width:58px;height:1px;background:linear-gradient(90deg,rgba(99,178,255,.45),transparent)}
.aboutValue h3{margin-top:24px;font-size:22px;font-weight:500;letter-spacing:-.03em}.aboutValue p{max-width:620px;margin-top:11px;color:#748095;font-size:12px;line-height:1.75}
.aboutQuote{position:relative;z-index:2;margin-top:28px;padding:46px 52px;border:1px solid rgba(255,255,255,.075);border-radius:26px;background:linear-gradient(135deg,rgba(8,18,32,.78),rgba(5,11,20,.58));overflow:hidden}
.aboutQuote__mark{position:absolute;right:38px;top:-26px;color:rgba(99,178,255,.07);font-family:Georgia,serif;font-size:180px;line-height:1}
.aboutQuote>p{position:relative;max-width:900px;font-size:clamp(24px,3vw,40px);font-weight:300;letter-spacing:-.035em;line-height:1.35;color:#cbd4df}
.aboutQuote__author{margin-top:28px;display:flex;align-items:center;gap:14px;color:#5f6e83;font-size:8px;letter-spacing:.18em;text-transform:uppercase}.aboutQuote__author span{width:42px;height:1px;background:#477fb9}
.process{background:linear-gradient(180deg,#040812,#07101d)}.processGrid{display:grid;grid-template-columns:repeat(3,1fr);border-block:1px solid var(--line)}.processItem{min-height:280px;padding:38px;display:flex;flex-direction:column;justify-content:space-between;border-right:1px solid var(--line)}.processItem:last-child{border-right:0}.processItem>span{color:#4f9eff;font-size:9px}.processItem h3{font-size:21px;font-weight:500}.processItem p{margin-top:14px;color:#6d798c;font-size:12px;line-height:1.75}
.contact{position:relative;min-height:900px;padding:140px 6.5% 110px;overflow:hidden;background:linear-gradient(180deg,#06101d 0%,#040913 100%)}
.contact__orb{position:absolute;border-radius:50%;filter:blur(100px);pointer-events:none}.contact__orb--one{width:620px;height:620px;right:-170px;top:100px;background:rgba(42,125,240,.13)}.contact__orb--two{width:430px;height:430px;left:-170px;bottom:40px;background:rgba(24,71,145,.09)}
.contact__grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.015) 1px,transparent 1px);background-size:72px 72px;mask-image:linear-gradient(to bottom,black,transparent 94%);pointer-events:none}
.contact__header{position:relative;z-index:2;display:grid;grid-template-columns:120px 1fr;margin-bottom:72px}.contact__headerIndex{padding-top:7px;color:#39465a;font-size:10px;letter-spacing:.18em}.contact__eyebrow{color:#4f9eff;font-size:9px;letter-spacing:.32em}.contact__header h2{margin-top:18px;font-size:clamp(58px,7vw,106px);font-weight:400;letter-spacing:-.07em;line-height:.91}.contact__header h2 span{color:#445368}
.contactLayout{position:relative;z-index:2;display:grid;grid-template-columns:.78fr 1.22fr;gap:28px;align-items:stretch}
.contactInfo{min-height:620px;padding:42px;border:1px solid rgba(255,255,255,.075);border-radius:28px;background:linear-gradient(145deg,rgba(11,24,42,.78),rgba(5,13,24,.62));box-shadow:0 35px 90px rgba(0,0,0,.24),inset 0 1px 0 rgba(255,255,255,.035)}
.contactInfo__lead{max-width:500px;color:#93a0b2;font-size:15px;line-height:1.85}
.contactInfo__list{margin-top:46px;border-top:1px solid var(--line)}
.contactInfo__item{padding:22px 0;display:flex;align-items:center;justify-content:space-between;gap:20px;border-bottom:1px solid var(--line);transition:padding .3s ease,background .3s ease}
.contactInfo__item:hover{padding-left:10px}
.contactInfo__item>div{display:flex;flex-direction:column;gap:7px}.contactInfo__item span{color:#4e5d72;font-size:7px;letter-spacing:.22em}.contactInfo__item strong{font-size:13px;font-weight:500;color:#d9e1eb}.contactInfo__item i{font-style:normal;color:#65b3ff;font-size:18px;transition:transform .3s ease}.contactInfo__item:hover i{transform:translate(4px,-4px)}
.contactInfo__note{margin-top:40px;padding:20px 22px;display:flex;gap:14px;border:1px solid rgba(83,173,255,.1);border-radius:18px;background:rgba(47,128,237,.035)}.contactInfo__note>span{margin-top:4px;flex:0 0 auto}.contactInfo__note strong{font-size:11px;font-weight:500}.contactInfo__note p{margin-top:7px;color:#647287;font-size:10px;line-height:1.6}
.contactForm{min-height:620px;padding:42px;border:1px solid rgba(255,255,255,.085);border-radius:28px;background:linear-gradient(145deg,rgba(15,30,51,.84),rgba(6,14,25,.72));box-shadow:0 38px 95px rgba(0,0,0,.28),inset 0 1px 0 rgba(255,255,255,.04)}
.contactForm__top{display:flex;align-items:center;justify-content:space-between;margin-bottom:38px}.contactForm__top span{color:#63b2ff;font-size:8px;letter-spacing:.28em}.contactForm__top strong{color:#445369;font-size:8px;font-weight:500;letter-spacing:.15em}
.contactForm__row{display:grid;grid-template-columns:1fr 1fr;gap:18px}
.contactForm label{display:flex;flex-direction:column;gap:10px;margin-bottom:20px}.contactForm label>span{color:#718096;font-size:8px;letter-spacing:.14em;text-transform:uppercase}
.contactForm input,.contactForm select,.contactForm textarea{width:100%;border:1px solid rgba(255,255,255,.08);border-radius:16px;outline:none;background:rgba(3,9,17,.46);color:#edf3fa;font:inherit;font-size:12px;transition:border-color .3s ease,background .3s ease,box-shadow .3s ease}
.contactForm input,.contactForm select{height:54px;padding:0 17px}.contactForm textarea{padding:16px 17px;resize:vertical;min-height:130px}
.contactForm input::placeholder,.contactForm textarea::placeholder{color:#435066}.contactForm select{color:#7f8da1}.contactForm select option{background:#07101d;color:#e8eef6}
.contactForm input:focus,.contactForm select:focus,.contactForm textarea:focus{border-color:rgba(99,178,255,.34);background:rgba(6,16,29,.72);box-shadow:0 0 0 4px rgba(47,128,237,.045)}
.contactForm__bottom{margin-top:6px;padding-top:24px;display:flex;align-items:center;justify-content:space-between;gap:24px;border-top:1px solid var(--line)}.contactForm__bottom p{max-width:330px;color:#4f5d71;font-size:9px;line-height:1.6}
.contactForm__bottom button{min-width:175px;padding:15px 20px;border:1px solid rgba(106,180,255,.24);border-radius:999px;display:flex;align-items:center;justify-content:space-between;gap:22px;background:linear-gradient(135deg,#1759c6,#3386f2);color:#fff;cursor:pointer;box-shadow:0 14px 40px rgba(17,84,190,.22);font-size:11px;font-weight:600;transition:transform .3s ease,box-shadow .3s ease}.contactForm__bottom button:hover{transform:translateY(-2px);box-shadow:0 20px 48px rgba(17,84,190,.34)}
.contactMarquee{position:relative;z-index:2;margin-top:56px;overflow:hidden;border-block:1px solid rgba(255,255,255,.055);padding:18px 0;color:#2f3d50;white-space:nowrap}.contactMarquee>div{width:max-content;font-size:9px;letter-spacing:.32em;animation:contactMarquee 24s linear infinite}.contactMarquee span{margin:0 22px;color:#397bc9}
@keyframes contactMarquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.scrollProgress{position:fixed;top:0;left:0;z-index:99999;width:100%;height:2px;transform-origin:left center;background:linear-gradient(90deg,#2f80ed,#69b7ff,#d9ecff);box-shadow:0 0 15px rgba(76,159,255,.45);pointer-events:none}
.premiumFooter{position:relative;z-index:1;overflow:hidden;padding:88px 6.5% 34px;border-top:1px solid var(--line);background:radial-gradient(circle at 85% 15%,rgba(39,108,213,.08),transparent 27%),#02060d}
.premiumFooter__top{position:relative;z-index:2;display:grid;grid-template-columns:1.05fr .9fr .85fr;gap:7vw;align-items:start}
.premiumFooter__brand .kaanLogo{transform:scale(.92);transform-origin:left center}.premiumFooter__brand>p{max-width:330px;margin-top:28px;color:#596779;font-size:11px;line-height:1.8}
.premiumFooter__nav{display:grid;grid-template-columns:1fr 1fr;gap:54px}.premiumFooter__nav>div{display:flex;flex-direction:column;align-items:flex-start}.premiumFooter__nav span,.premiumFooter__cta>span{margin-bottom:22px;color:#46556b;font-size:7px;letter-spacing:.25em}.premiumFooter__nav a{position:relative;margin-bottom:13px;color:#8793a4;font-size:11px;transition:color .3s ease,transform .3s ease}.premiumFooter__nav a:hover{color:#fff;transform:translateX(4px)}
.premiumFooter__cta h3{font-size:29px;font-weight:400;letter-spacing:-.045em;line-height:1.05}.premiumFooter__cta>a{width:100%;max-width:220px;margin-top:26px;padding:14px 18px;display:flex;align-items:center;justify-content:space-between;border:1px solid rgba(102,178,255,.18);border-radius:999px;background:rgba(47,128,237,.06);color:#dce8f6;font-size:10px;transition:background .3s ease,border-color .3s ease,transform .3s ease}.premiumFooter__cta>a strong{color:#65b3ff;font-size:16px;font-weight:400}.premiumFooter__cta>a:hover{transform:translateY(-2px);background:rgba(47,128,237,.12);border-color:rgba(102,178,255,.28)}
.premiumFooter__line{position:relative;z-index:2;height:1px;margin:70px 0 26px;background:linear-gradient(90deg,rgba(255,255,255,.08),rgba(99,178,255,.12),rgba(255,255,255,.04))}
.premiumFooter__bottom{position:relative;z-index:2;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:24px}.premiumFooter__bottom>p{color:#3f4c5e;font-size:8px;letter-spacing:.05em}.premiumFooter__bottom>div{display:flex;align-items:center;gap:12px;color:#39475b;font-size:7px;letter-spacing:.18em}.premiumFooter__bottom>div i{width:22px;height:1px;background:#2d3d52}.premiumFooter__bottom button{justify-self:end;border:0;outline:0;background:transparent;color:#66758a;font:inherit;font-size:8px;letter-spacing:.12em;display:flex;align-items:center;gap:10px;cursor:pointer;transition:color .3s ease}.premiumFooter__bottom button span{color:#65b3ff;font-size:14px}.premiumFooter__bottom button:hover{color:#fff}
.premiumFooter__watermark{position:absolute;right:-35px;bottom:-38px;color:transparent;-webkit-text-stroke:1px rgba(255,255,255,.018);font-size:clamp(90px,11vw,190px);font-weight:700;letter-spacing:-.075em;white-space:nowrap;user-select:none;pointer-events:none}
.reveal{opacity:0;transform:translateY(30px);filter:blur(6px);transition:.8s}.reveal.is-visible{opacity:1;transform:none;filter:none}



@keyframes heroLineIn{from{opacity:0;transform:translateY(34px);filter:blur(8px)}to{opacity:1;transform:none;filter:none}}
@keyframes stagePulse{from{transform:scale(.92);opacity:.65}to{transform:scale(1.08);opacity:1}}
@keyframes ringSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes ringSpinReverse{from{transform:rotate(360deg)}to{transform:rotate(0deg)}}
@keyframes ringPulse{from{transform:scale(.9);opacity:.25}to{transform:scale(1.08);opacity:.5}}
@keyframes monolithSweep{0%,15%{transform:translateX(-100%)}45%,100%{transform:translateX(140%)}}
@keyframes chipFloat{0%,100%{margin-top:0}50%{margin-top:-10px}}




/* STEP 8 — MOBILE + SMALL SCREEN OPTIMIZATION */

/* INTRO: iOS Safari paint-safe overlay */

@media(max-width:900px){
  .intro{
    position:fixed;
    inset:0;
    width:100vw;
    min-height:100vh;
    min-height:100svh;
    height:100vh;
    height:100svh;
    padding:18px;
    z-index:2147483000;
    opacity:1;
    visibility:visible;
    pointer-events:auto;
    transform:translateZ(0);
    -webkit-transform:translateZ(0);
    -webkit-backface-visibility:hidden;
    backface-visibility:hidden;
    contain:layout paint;
  }
  .intro__content{
    width:100%;
    max-width:520px;
    opacity:1;
  }
  .intro__frame{
    width:min(92vw,520px);
    min-width:0;
  }
}

.mobileQuickBar{display:none}


@supports (height: 100dvh){
  .intro{min-height:100dvh;height:100dvh}
}

@media(max-width:900px){
  .intro{
    min-height:100svh;
    height:100svh;
    padding:24px 16px;
    background:
      radial-gradient(circle at 50% 42%,rgba(47,128,237,.18),transparent 30%),
      linear-gradient(180deg,#01040a 0%,#030814 55%,#01040a 100%);
  }
  .intro__content{
    width:100%;
    max-width:520px;
    transform:none;
  }
  .intro__frame{
    width:min(92vw,520px);
    min-width:0;
    padding:42px 24px 34px;
  }
  .intro__frame>.kaanLogo{
    transform:none !important;
  }
  .kaanLogo--large .kaanLogo__mark{
    width:132px;
    height:92px;
  }
  .kaanLogo--large .kaanLogo__copy span{
    font-size:10px;
    letter-spacing:.32em;
  }
  .kaanLogo--large .kaanLogo__copy strong{
    font-size:9px;
    letter-spacing:.46em;
  }
  .intro__subcopy{
    margin-top:24px;
    gap:10px;
    font-size:6px;
    letter-spacing:.16em;
  }
  .intro__subcopy i{width:16px}
  .intro__loader{
    width:min(74vw,330px);
    margin-top:22px;
  }
  .intro__status{
    margin-top:12px;
    font-size:6px;
    letter-spacing:.16em;
    text-align:center;
  }
  .intro__grid{opacity:.48}
}

@media(max-width:900px){
  body{padding-bottom:72px}
  .premiumHeader{border-bottom-color:rgba(255,255,255,.07)}
  .hero{padding-top:122px}
  .hero__content{max-width:100%}
  .hero__title{letter-spacing:-.055em}
  .hero__text{max-width:620px}
  .hero__stats{overflow-x:auto;scrollbar-width:none}
  .hero__stats::-webkit-scrollbar{display:none}
  .hero__visual{overflow:visible}
  .heroStage{width:100%;max-width:520px}
  .serviceCard,.aboutValue,.processItem{transition:none}
  .contactForm input,.contactForm select,.contactForm textarea{font-size:16px}
  .mobileQuickBar{
    position:fixed;
    left:12px;
    right:12px;
    bottom:12px;
    z-index:1600;
    min-height:58px;
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:1px;
    overflow:hidden;
    border:1px solid rgba(255,255,255,.10);
    border-radius:18px;
    background:rgba(3,8,17,.88);
    backdrop-filter:blur(20px);
    -webkit-backdrop-filter:blur(20px);
    box-shadow:0 18px 48px rgba(0,0,0,.34);
  }
  .mobileQuickBar a{
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    gap:5px;
    color:#8e9bad;
    font-size:9px;
    letter-spacing:.05em;
  }
  .mobileQuickBar a:nth-child(2){
    background:rgba(47,128,237,.06);
    color:#dbeafe;
  }
  .mobileQuickBar a:nth-child(3){
    background:linear-gradient(135deg,rgba(23,89,198,.94),rgba(49,132,239,.94));
    color:#fff;
  }
  .mobileQuickBar a span{
    color:#63b2ff;
    font-size:16px;
  }
  .mobileQuickBar a:nth-child(3) span{color:#fff}
}

@media(max-width:700px){
  .premiumHeader{padding-inline:16px}
  .kaanLogo__copy span{font-size:7px;letter-spacing:.16em}
  .kaanLogo__copy strong{font-size:6px;letter-spacing:.26em}
  .hero{padding-inline:16px}
  .hero__eyebrow{max-width:100%;white-space:normal;line-height:1.4}
  .hero__title{font-size:clamp(46px,14vw,68px)}
  .hero__text{font-size:13px;line-height:1.75}
  .hero__stats{gap:18px}
  .hero__stats div{min-width:max-content}
  .section,.contact{padding-inline:16px}
  .servicesFeature{border-radius:22px}
  .serviceGrid,.aboutValues{border-radius:22px}
  .aboutProfile,.aboutQuote,.contactInfo,.contactForm{border-radius:22px}
  .aboutProfile__meta h3{font-size:30px}
  .contact__header h2{font-size:clamp(50px,14vw,72px)}
  .premiumFooter{padding-inline:16px}
}

@media(max-width:430px){
  .premiumHeader{height:74px}
  .premiumHeader--scrolled{height:68px}
  .premiumNav{top:74px}
  .premiumHeader--scrolled .premiumNav{top:68px}
  .kaanLogo__mark{width:46px;height:37px}
  .kaanLogo__k{left:7px;font-size:24px}
  .kaanLogo__o{right:-9px;font-size:23px}
  .kaanLogo__copy{gap:5px}
  .kaanLogo__copy span{font-size:6px;letter-spacing:.12em}
  .kaanLogo__copy strong{font-size:5px;letter-spacing:.2em}
  .menuToggle{width:44px;height:44px}
  .hero{padding-top:108px;padding-bottom:70px}
  .hero__eyebrow{margin-bottom:22px;padding:7px 11px;font-size:6px}
  .hero__title{font-size:clamp(44px,13.6vw,60px);line-height:.94}
  .hero__text{margin-top:26px}
  .hero__actions{margin-top:30px}
  .hero__stats{margin-top:44px}
  .hero__visual{min-height:455px}
  .heroStage{height:455px}
  .heroStage__ring--one{width:320px;height:320px}
  .heroStage__ring--two{width:255px;height:255px}
  .heroStage__ring--three{width:190px;height:190px}
  .heroStage__monolith{width:180px;height:320px}
  .heroStage__mark{top:56px;font-size:68px}
  .heroStage__copy{bottom:40px}
  .floatingCard{width:235px;min-height:295px;padding:20px;right:-2px}
  .floatingCard__symbol{width:52px;height:52px;margin-top:34px;font-size:21px}
  .floatingCard h2{font-size:24px}
  .floatingCard p{font-size:9px}
  .floatingCard__bottom{left:20px;right:20px;bottom:20px}
  .section{padding-top:90px;padding-bottom:90px}
  .sectionIntro{margin-bottom:44px}
  .sectionIntro h2{font-size:38px}
  .servicesFeature{padding:28px 20px}
  .servicesFeature h3{font-size:32px}
  .serviceCard{min-height:400px;padding:28px}
  .serviceCard__footer{left:28px;right:28px}
  .aboutHeadline h2{font-size:39px}
  .aboutProfile{min-height:450px}
  .aboutProfile__monogram{top:54px;width:165px;height:165px}
  .aboutProfile__monogram:before{width:125px;height:125px}
  .aboutProfile__monogram:after{width:198px;height:198px}
  .aboutProfile__monogram span,.aboutProfile__monogram strong{font-size:58px}
  .aboutQuote>p{font-size:23px}
  .processItem{padding:30px;min-height:230px}
  .contact{padding-top:90px}
  .contactInfo,.contactForm{padding:26px 20px}
  .contactForm__bottom p{font-size:8px}
  .premiumFooter__nav{grid-template-columns:1fr;gap:30px}
  .premiumFooter__watermark{font-size:72px}
}

@media(max-width:360px){
  .kaanLogo__copy{display:none}
  .hero__title{font-size:42px}
  .hero__stats{gap:13px}
  .hero__stats strong{font-size:11px}
  .hero__visual{min-height:430px}
  .heroStage{transform:scale(.94)!important}
  .contact__header h2{font-size:48px}
  .mobileQuickBar{left:8px;right:8px;bottom:8px}
}


::selection{background:rgba(47,128,237,.34);color:#fff}
a,button,input,select,textarea{touch-action:manipulation}
button:focus-visible,a:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{outline:2px solid rgba(99,178,255,.7);outline-offset:3px}
@media(prefers-reduced-motion:reduce){
  html{scroll-behavior:auto}
  .intro__ambient,.intro__grid,.intro__loader span{animation:none!important}
  .intro__content,.intro__frame>.kaanLogo,.intro__subcopy,.intro__status{
    animation:none!important;
    opacity:1!important;
    transform:none!important;
    filter:none!important;
  }
}

@media(max-width:1100px){.headerPhone{display:none}.premiumNav{gap:22px}.hero{padding-inline:5%;grid-template-columns:1fr .8fr}.section,.contact{padding-inline:5%}}

@supports (height: 100dvh){
  .intro{min-height:100dvh;height:100dvh}
}

@media(max-width:900px){
  .intro{
    min-height:100svh;
    height:100svh;
    padding:24px 16px;
    background:
      radial-gradient(circle at 50% 42%,rgba(47,128,237,.18),transparent 30%),
      linear-gradient(180deg,#01040a 0%,#030814 55%,#01040a 100%);
  }
  .intro__content{
    width:100%;
    max-width:520px;
    transform:none;
  }
  .intro__frame{
    width:min(92vw,520px);
    min-width:0;
    padding:42px 24px 34px;
  }
  .intro__frame>.kaanLogo{
    transform:none !important;
  }
  .kaanLogo--large .kaanLogo__mark{
    width:132px;
    height:92px;
  }
  .kaanLogo--large .kaanLogo__copy span{
    font-size:10px;
    letter-spacing:.32em;
  }
  .kaanLogo--large .kaanLogo__copy strong{
    font-size:9px;
    letter-spacing:.46em;
  }
  .intro__subcopy{
    margin-top:24px;
    gap:10px;
    font-size:6px;
    letter-spacing:.16em;
  }
  .intro__subcopy i{width:16px}
  .intro__loader{
    width:min(74vw,330px);
    margin-top:22px;
  }
  .intro__status{
    margin-top:12px;
    font-size:6px;
    letter-spacing:.16em;
    text-align:center;
  }
  .intro__grid{opacity:.48}
}

@media(max-width:900px){
.premiumHeader{height:82px;padding:0 20px}.premiumHeader--scrolled{height:74px}
.kaanLogo__mark{width:72px;height:50px}.kaanLogo__copy span{font-size:8px;letter-spacing:.22em}.kaanLogo__copy strong{font-size:7px;letter-spacing:.38em}
.headerCta{display:none}.menuToggle{display:flex}
.premiumNav{position:fixed;top:82px;left:0;right:0;max-height:0;overflow:hidden;display:flex;flex-direction:column;align-items:stretch;gap:0;padding:0 20px;background:rgba(2,7,15,.97);backdrop-filter:blur(20px);transition:.4s}
.premiumHeader--scrolled .premiumNav{top:74px}.premiumNav--open{max-height:360px;padding:12px 20px 22px;border-bottom:1px solid var(--line)}.premiumNav a{padding:15px 0;border-bottom:1px solid rgba(255,255,255,.05);font-size:12px}.premiumNav a:after{display:none}
.hero{min-height:auto;padding:130px 20px 90px;grid-template-columns:1fr;gap:62px}.hero__title{font-size:clamp(50px,15vw,76px)}.hero__actions{flex-direction:column;align-items:stretch}.primaryButton,.textButton{width:100%}.textButton{justify-content:space-between}.hero__visual{min-height:560px}.heroStage{height:550px;transform:none!important}.heroStage__ring--one{width:430px;height:430px}.heroStage__ring--two{width:330px;height:330px}.heroStage__ring--three{width:245px;height:245px}.heroStage__monolith{width:230px;height:390px;transform:rotate(-6deg)!important}.heroStage__mark{font-size:78px}.floatingCard{width:285px;min-height:335px;right:0;bottom:15px;transform:none!important}.floatingChip,.heroStage__micro{display:none}
.section{padding:100px 20px}.sectionIntro{grid-template-columns:1fr;gap:22px}.sectionIntro h2{font-size:47px}.servicesFeature{grid-template-columns:1fr;gap:35px;padding:36px 28px}.servicesFeature__orbit{margin:0 auto}.serviceGrid{grid-template-columns:1fr}.aboutGrid{grid-template-columns:1fr;gap:46px}.aboutHeadline h2{font-size:48px}.aboutShowcase{grid-template-columns:1fr}.aboutProfile{min-height:500px}.processGrid{grid-template-columns:1fr}.processItem{border-right:0;border-bottom:1px solid var(--line)}.contact{min-height:auto;padding:105px 20px 90px}.contact__header{grid-template-columns:1fr;gap:22px}.contact__header h2{font-size:clamp(54px,16vw,78px)}.contactLayout{grid-template-columns:1fr}.contactInfo,.contactForm{min-height:auto}.contactForm__row{grid-template-columns:1fr}.contactForm__bottom{align-items:flex-start;flex-direction:column}.contactForm__bottom button{width:100%}.premiumFooter{padding:72px 20px 30px}.premiumFooter__top{grid-template-columns:1fr;gap:50px}.premiumFooter__nav{max-width:420px}.premiumFooter__line{margin-top:55px}.premiumFooter__bottom{grid-template-columns:1fr;justify-items:start}.premiumFooter__bottom button{justify-self:start}.premiumFooter__watermark{right:-15px;bottom:-10px;font-size:90px}
}
@media(max-width:520px){.premiumFooter__nav{grid-template-columns:1fr 1fr;gap:34px}.premiumFooter__cta h3{font-size:26px}.premiumFooter__bottom>div{flex-wrap:wrap}.contactInfo,.contactForm{padding:28px 22px}.contactInfo__lead{font-size:13px}.contactForm__top{margin-bottom:30px}.contactInfo__item strong{font-size:11px}.contactMarquee{margin-top:44px}.aboutShowcase{margin-top:64px}.aboutProfile{min-height:470px;padding:30px}.aboutProfile__meta{left:30px;right:30px}.aboutProfile__monogram{width:180px;height:180px}.aboutProfile__monogram:before{width:140px;height:140px}.aboutProfile__monogram:after{width:215px;height:215px}.aboutProfile__monogram span,.aboutProfile__monogram strong{font-size:64px}.aboutValue{padding:28px}.aboutQuote{padding:34px 28px}.aboutQuote>p{font-size:26px}.servicesFeature{padding:30px 22px}.servicesFeature h3{font-size:36px}.servicesFeature__orbit{width:220px;height:220px}.servicesFeature__orbitRing--one{width:200px;height:200px}.servicesFeature__orbitRing--two{width:145px;height:145px}.servicesFeature__center{width:82px;height:82px;font-size:30px}.serviceCard{min-height:420px;padding:30px}.serviceCard__footer{left:30px;right:30px}.hero__visual{min-height:510px}.heroStage{height:500px}.heroStage__ring--one{width:360px;height:360px}.heroStage__ring--two{width:285px;height:285px}.heroStage__ring--three{width:210px;height:210px}.heroStage__monolith{width:205px;height:350px}.floatingCard{width:255px;min-height:315px;padding:22px}.floatingCard h2{font-size:26px}.floatingCard p{font-size:10px}.floatingCard__bottom{left:22px;right:22px}.intro__frame{min-width:90vw;padding:46px 24px 38px}.intro__subcopy{gap:10px;font-size:6px;letter-spacing:.17em}.intro__subcopy i{width:15px}.intro__status{font-size:6px;letter-spacing:.18em}.kaanLogo{gap:12px}.kaanLogo__mark{width:64px;height:45px}.kaanLogo__copy span{font-size:7px;letter-spacing:.17em}.kaanLogo__copy strong{font-size:6px;letter-spacing:.3em}.hero__eyebrow{font-size:7px}.hero__stats{gap:13px;justify-content:space-between}.sectionIntro h2,.aboutGrid h2{font-size:41px}}
`;

export default App;
