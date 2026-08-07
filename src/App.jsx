import { useEffect, useState } from "react";
import "./index.css";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app">

      {/* AÇILIŞ ANİMASYONU */}
      <div className={`intro ${!loading ? "introHidden" : ""}`}>
        <div className="introContent">
          <span className="introLine"></span>

          <h1>
            SOSYAL HİZMET
            <span>UZMANI</span>
          </h1>

          <p>Profesyonel • Güvenilir • Etik</p>
        </div>
      </div>


      {/* ARKA PLAN EFEKTLERİ */}
      <div className="backgroundEffects">
        <div className="glow glowOne"></div>
        <div className="glow glowTwo"></div>
        <div className="gridBackground"></div>
      </div>


      {/* HEADER */}
      <header className="header">

        <a href="#anasayfa" className="logo">
          <span className="logoIcon">S</span>

          <div className="logoText">
            <strong>Sosyal Hizmet</strong>
            <span>Uzmanı</span>
          </div>
        </a>


        <nav>
          <a href="#anasayfa">Ana Sayfa</a>
          <a href="#hakkimda">Hakkımda</a>
          <a href="#hizmetler">Hizmetler</a>
          <a href="#iletisim">İletişim</a>
        </nav>


        <a href="#iletisim" className="menuButton">
          Randevu Al
          <span>↗</span>
        </a>

      </header>


      {/* HERO */}
      <main>

        <section className="hero" id="anasayfa">

          <div className="heroNoise"></div>


          <div className="heroText">

            <div className="heroBadge">
              <span></span>
              Profesyonel Sosyal Hizmet Desteği
            </div>


            <h1>
              Hayatın Zor
              <br />

              <span className="gradientText">
                Anlarında
              </span>

              <br />

              Yanınızdayım.
            </h1>


            <p className="heroDescription">
              Danışan odaklı, etik ve güvenilir yaklaşım ile
              bireysel ihtiyaçlarınıza yönelik profesyonel
              sosyal hizmet desteği.
            </p>


            <div className="heroButtons">

              <a href="#iletisim" className="mainButton">
                Randevu Oluştur
                <span>→</span>
              </a>


              <a href="#hakkimda" className="secondaryButton">
                Beni Tanıyın
              </a>

            </div>


            <div className="heroStats">

              <div>
                <strong>100%</strong>
                <span>Gizlilik</span>
              </div>

              <div className="statLine"></div>

              <div>
                <strong>Online</strong>
                <span>Görüşme</span>
              </div>

              <div className="statLine"></div>

              <div>
                <strong>Etik</strong>
                <span>Yaklaşım</span>
              </div>

            </div>

          </div>


          {/* SAĞ TARAF */}
          <div className="heroVisual">

            <div className="visualGlow"></div>


            <div className="bigText">
              DESTEK
            </div>


            <div className="heroCard">

              <div className="cardTop">

                <span className="onlineDot"></span>

                <span>
                  Görüşmeye Açık
                </span>

              </div>


              <div className="cardIcon">
                ✦
              </div>


              <h3>
                Yanınızdayım.
              </h3>


              <p>
                Bireysel görüşmeler, sosyal danışmanlık
                ve destek süreçlerinde profesyonel yaklaşım.
              </p>


              <div className="cardBottom">

                <span>
                  Güvenli Alan
                </span>

                <span>
                  ↗
                </span>

              </div>

            </div>

          </div>


          <div className="scrollText">
            <span></span>
            Aşağı Kaydır
          </div>

        </section>



        {/* HİZMETLER */}
        <section className="services" id="hizmetler">

          <div className="sectionHeading">

            <span className="sectionNumber">
              01
            </span>


            <div>
              <p className="sectionMiniTitle">
                HİZMETLER
              </p>

              <h2>
                Size nasıl
                <br />
                destek olabilirim?
              </h2>
            </div>

          </div>


          <div className="cards">


            <div className="card">

              <div className="cardNumber">
                01
              </div>

              <div className="serviceIcon">
                ◯
              </div>

              <h3>
                Bireysel Görüşme
              </h3>

              <p>
                Kişisel ihtiyaçlarınıza yönelik güvenli,
                gizli ve profesyonel değerlendirme süreçleri.
              </p>

              <a href="#iletisim">
                Detaylı Bilgi
                <span>→</span>
              </a>

            </div>



            <div className="card">

              <div className="cardNumber">
                02
              </div>

              <div className="serviceIcon">
                ◇
              </div>

              <h3>
                Sosyal Danışmanlık
              </h3>

              <p>
                Sosyal destek mekanizmaları, haklar,
                kaynaklar ve uygun hizmetlere yönlendirme.
              </p>

              <a href="#iletisim">
                Detaylı Bilgi
                <span>→</span>
              </a>

            </div>



            <div className="card">

              <div className="cardNumber">
                03
              </div>

              <div className="serviceIcon">
                ◎
              </div>

              <h3>
                Online Görüşme
              </h3>

              <p>
                Bulunduğunuz yerden güvenli ve kolay
                şekilde çevrim içi profesyonel destek.
              </p>

              <a href="#iletisim">
                Detaylı Bilgi
                <span>→</span>
              </a>

            </div>

          </div>

        </section>



        {/* HAKKIMDA */}
        <section className="about" id="hakkimda">

          <div className="aboutLabel">
            <span>02</span>
            HAKKIMDA
          </div>


          <div className="aboutContent">

            <h2>
              Her bireyin hikâyesi
              <span> kendine özgüdür.</span>
            </h2>


            <div className="aboutText">

              <p>
                Sosyal hizmet yaklaşımımın merkezinde
                güven, gizlilik ve danışanın ihtiyaçlarını
                anlamak yer alır.
              </p>

              <p>
                Yaşamınızda karşılaştığınız sosyal,
                bireysel veya ailevi süreçlerde doğru
                kaynaklara ulaşmanız ve çözüm yolları
                oluşturmanız için yanınızdayım.
              </p>

              <a href="#iletisim">
                Benimle İletişime Geç
                <span>↗</span>
              </a>

            </div>

          </div>

        </section>



        {/* SÜREÇ */}
        <section className="process">

          <div className="sectionHeading">

            <span className="sectionNumber">
              03
            </span>


            <div>
              <p className="sectionMiniTitle">
                SÜREÇ
              </p>

              <h2>
                Üç adımda
                <br />
                görüşmeye başlayın.
              </h2>
            </div>

          </div>


          <div className="processGrid">

            <div className="processItem">

              <span>01</span>

              <h3>
                İletişime Geçin
              </h3>

              <p>
                İletişim formu veya telefon üzerinden
                randevu talebinizi oluşturun.
              </p>

            </div>


            <div className="processItem">

              <span>02</span>

              <h3>
                Zaman Belirleyelim
              </h3>

              <p>
                Size uygun görüşme günü ve saatini
                birlikte planlayalım.
              </p>

            </div>


            <div className="processItem">

              <span>03</span>

              <h3>
                Görüşmeye Başlayalım
              </h3>

              <p>
                Güvenli ve profesyonel bir ortamda
                sürecinizi birlikte değerlendirelim.
              </p>

            </div>

          </div>

        </section>



        {/* İLETİŞİM */}
        <section className="contact" id="iletisim">

          <div className="contactGlow"></div>


          <p>
            İLETİŞİM
          </p>


          <h2>
            İlk adımı
            <br />
            birlikte atalım.
          </h2>


          <span className="contactDescription">
            Görüşme ve randevu hakkında bilgi almak
            için iletişime geçebilirsiniz.
          </span>


          <a href="mailto:iletisim@example.com" className="contactButton">
            Randevu Oluştur
            <span>↗</span>
          </a>

        </section>

      </main>



      {/* FOOTER */}
      <footer>

        <div>
          <strong>
            Sosyal Hizmet Uzmanı
          </strong>

          <p>
            Profesyonel sosyal hizmet desteği.
          </p>
        </div>


        <span>
          © 2026 Tüm Hakları Saklıdır.
        </span>

      </footer>

    </div>
  );
}

export default App;