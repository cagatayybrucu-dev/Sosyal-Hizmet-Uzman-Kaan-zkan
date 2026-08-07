import { useEffect, useState } from "react";

function App() {
  const [introDone, setIntroDone] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIntroDone(true), 1900);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.14 }
    );

    const revealItems = document.querySelectorAll(".reveal");
    revealItems.forEach((item) => observer.observe(item));

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="app">
      <div className={`intro ${introDone ? "intro--hidden" : ""}`}>
        <div className="intro__glow" />
        <div className="intro__content">
          <div className="brandMark brandMark--intro" aria-hidden="true">
            <span className="brandMark__k">K</span>
            <span className="brandMark__o">Ö</span>
          </div>

          <div className="intro__copy">
            <span>SOSYAL HİZMET UZMANI</span>
            <strong>KAAN ÖZKAN</strong>
          </div>

          <div className="intro__line">
            <span />
          </div>
        </div>
      </div>

      <div className="siteBackground" aria-hidden="true">
        <div className="siteBackground__orb siteBackground__orb--one" />
        <div className="siteBackground__orb siteBackground__orb--two" />
        <div className="siteBackground__grid" />
        <div className="siteBackground__grain" />
      </div>

      <header className="header">
        <a className="brand" href="#anasayfa" onClick={closeMenu}>
          <div className="brandMark" aria-hidden="true">
            <span className="brandMark__k">K</span>
            <span className="brandMark__o">Ö</span>
          </div>

          <div className="brandCopy">
            <span className="brandCopy__top">SOSYAL HİZMET UZMANI</span>
            <strong className="brandCopy__bottom">KAAN ÖZKAN</strong>
          </div>
        </a>

        <nav className={`nav ${menuOpen ? "nav--open" : ""}`}>
          <a href="#anasayfa" onClick={closeMenu}>Ana Sayfa</a>
          <a href="#hakkimda" onClick={closeMenu}>Hakkımda</a>
          <a href="#hizmetler" onClick={closeMenu}>Hizmetler</a>
          <a href="#surec" onClick={closeMenu}>Süreç</a>
          <a href="#iletisim" onClick={closeMenu}>İletişim</a>
        </nav>

        <div className="headerActions">
          <a className="headerCta" href="#iletisim">
            Randevu Al
            <span>↗</span>
          </a>

          <button
            className={`menuToggle ${menuOpen ? "menuToggle--open" : ""}`}
            onClick={() => setMenuOpen((value) => !value)}
            aria-label="Menüyü aç/kapat"
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
              Hayatın zor
              <br />
              anlarında
              <br />
              <span>yanınızdayım.</span>
            </h1>

            <p className="hero__text">
              Danışan odaklı, etik ve güvenilir bir yaklaşımla bireysel
              ihtiyaçlarınıza yönelik profesyonel sosyal hizmet desteği.
            </p>

            <div className="hero__actions">
              <a className="primaryButton" href="#iletisim">
                Randevu Oluştur
                <span>→</span>
              </a>

              <a className="textButton" href="#hakkimda">
                Beni Tanıyın
                <span>↘</span>
              </a>
            </div>

            <div className="hero__stats">
              <div>
                <strong>%100</strong>
                <span>Gizlilik</span>
              </div>
              <i />
              <div>
                <strong>Online</strong>
                <span>Görüşme</span>
              </div>
              <i />
              <div>
                <strong>Etik</strong>
                <span>Yaklaşım</span>
              </div>
            </div>
          </div>

          <div className="hero__visual" aria-hidden="true">
            <div className="hero__halo" />
            <div className="hero__word">DESTEK</div>

            <div className="floatingCard floatingCard--main">
              <div className="floatingCard__top">
                <span className="availabilityDot" />
                Görüşmeye açık
              </div>

              <div className="floatingCard__symbol">✦</div>

              <div>
                <p className="floatingCard__mini">PROFESYONEL DESTEK</p>
                <h2>Yanınızdayım.</h2>
                <p>
                  Bireysel görüşmeler, danışmanlık ve sosyal destek
                  süreçlerinde güvenli ve profesyonel yaklaşım.
                </p>
              </div>

              <div className="floatingCard__bottom">
                <span>Güvenli alan</span>
                <strong>↗</strong>
              </div>
            </div>

            <div className="floatingChip floatingChip--one">GİZLİLİK</div>
            <div className="floatingChip floatingChip--two">GÜVEN</div>
          </div>

          <div className="scrollHint">
            <span />
            Aşağı Kaydır
          </div>
        </section>

        <section className="section services" id="hizmetler">
          <div className="sectionIntro reveal">
            <div className="sectionIntro__number">01</div>
            <div>
              <p className="sectionKicker">HİZMETLER</p>
              <h2>Size nasıl destek olabilirim?</h2>
            </div>
          </div>

          <div className="serviceGrid">
            <article className="serviceCard reveal">
              <div className="serviceCard__index">01</div>
              <div className="serviceCard__icon">◯</div>
              <h3>Bireysel Görüşme</h3>
              <p>
                Kişisel ihtiyaçlarınıza yönelik güvenli, gizli ve
                profesyonel değerlendirme süreçleri.
              </p>
              <a href="#iletisim">Detaylı Bilgi <span>→</span></a>
            </article>

            <article className="serviceCard reveal">
              <div className="serviceCard__index">02</div>
              <div className="serviceCard__icon">◇</div>
              <h3>Sosyal Danışmanlık</h3>
              <p>
                Sosyal destek mekanizmaları, haklar, kaynaklar ve uygun
                hizmetlere yönlendirme.
              </p>
              <a href="#iletisim">Detaylı Bilgi <span>→</span></a>
            </article>

            <article className="serviceCard reveal">
              <div className="serviceCard__index">03</div>
              <div className="serviceCard__icon">◎</div>
              <h3>Online Görüşme</h3>
              <p>
                Bulunduğunuz yerden güvenli ve kolay şekilde çevrim içi
                profesyonel destek.
              </p>
              <a href="#iletisim">Detaylı Bilgi <span>→</span></a>
            </article>
          </div>
        </section>

        <section className="section about" id="hakkimda">
          <div className="sectionLabel reveal">
            <span>02</span>
            HAKKIMDA
          </div>

          <div className="aboutGrid">
            <div className="aboutHeadline reveal">
              <h2>
                Her bireyin hikâyesi
                <span> kendine özgüdür.</span>
              </h2>
            </div>

            <div className="aboutCopy reveal">
              <p>
                Sosyal hizmet yaklaşımımın merkezinde güven, gizlilik ve
                danışanın ihtiyaçlarını anlamak yer alır.
              </p>
              <p>
                Yaşamınızda karşılaştığınız sosyal, bireysel veya ailevi
                süreçlerde doğru kaynaklara ulaşmanız ve çözüm yolları
                oluşturmanız için yanınızdayım.
              </p>

              <a className="inlineLink" href="#iletisim">
                Benimle İletişime Geç
                <span>↗</span>
              </a>
            </div>
          </div>
        </section>

        <section className="section process" id="surec">
          <div className="sectionIntro reveal">
            <div className="sectionIntro__number">03</div>
            <div>
              <p className="sectionKicker">SÜREÇ</p>
              <h2>Üç adımda görüşmeye başlayın.</h2>
            </div>
          </div>

          <div className="processGrid">
            <article className="processItem reveal">
              <span>01</span>
              <div>
                <h3>İletişime Geçin</h3>
                <p>
                  İletişim kanallarından randevu talebinizi oluşturun.
                </p>
              </div>
            </article>

            <article className="processItem reveal">
              <span>02</span>
              <div>
                <h3>Zaman Belirleyelim</h3>
                <p>
                  Size uygun görüşme günü ve saatini birlikte planlayalım.
                </p>
              </div>
            </article>

            <article className="processItem reveal">
              <span>03</span>
              <div>
                <h3>Görüşmeye Başlayalım</h3>
                <p>
                  Güvenli ve profesyonel bir ortamda sürecinizi birlikte
                  değerlendirelim.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="contact" id="iletisim">
          <div className="contact__orb" aria-hidden="true" />

          <div className="contact__content reveal">
            <p className="sectionKicker">İLETİŞİM</p>
            <h2>
              İlk adımı
              <br />
              birlikte atalım.
            </h2>
            <p className="contact__text">
              Görüşme ve randevu hakkında bilgi almak için iletişime
              geçebilirsiniz.
            </p>

            <a className="circleCta" href="mailto:iletisim@example.com">
              <span>Randevu Oluştur</span>
              <strong>↗</strong>
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <a className="brand brand--footer" href="#anasayfa">
          <div className="brandMark" aria-hidden="true">
            <span className="brandMark__k">K</span>
            <span className="brandMark__o">Ö</span>
          </div>

          <div className="brandCopy">
            <span className="brandCopy__top">SOSYAL HİZMET UZMANI</span>
            <strong className="brandCopy__bottom">KAAN ÖZKAN</strong>
          </div>
        </a>

        <p>© 2026 Kaan Özkan. Tüm hakları saklıdır.</p>
      </footer>
    </div>
  );
}

export default App;