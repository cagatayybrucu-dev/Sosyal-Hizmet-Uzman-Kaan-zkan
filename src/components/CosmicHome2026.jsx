import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import serviceIndividualOne from "../assets/services-2026/individual-01.jpeg";
import serviceIndividualTwo from "../assets/services-2026/individual-02.jpeg";
import serviceDivorceGrief from "../assets/services-2026/divorce-grief.jpeg";
import servicePremarital from "../assets/services-2026/premarital-hd-v2.png";
import serviceFamily from "../assets/services-2026/family-counseling.jpeg";
import journalFallbackOne from "../assets/blog-editorial-sunlit-v1.png";
import journalFallbackTwo from "../assets/blog-cinema-02-studio.png";
import journalFallbackThree from "../assets/blog-cinema-03-journal.png";
import finalScene from "../assets/contact-appointment-cinema-v1.png";
import brandMark from "../assets/kaan-ozkan-family-mark-2026.png";
import homeLightCinema from "../assets/home-light-cinema-hero-v1.png";

const JOURNEY_SCENES = [
  {
    no: "01",
    label: "AİLE DANIŞMANLIĞI",
    title: "Aynı evin içinde, yeniden duyulmak.",
    text: "İletişim, roller, sınırlar, karar alma ve çatışma çözme becerilerini bütüncül bir aile sistemi içinde ele alan danışmanlık alanı.",
    href: "#/hizmetler/aile-danismanligi",
    images: [serviceFamily],
  },
  {
    no: "02",
    label: "BOŞANMA VE YAS",
    title: "Bir sonun ardından, yaşamı yeniden kurmak.",
    text: "Kayıp, ayrılık ve boşanmanın getirdiği duygusal yükle baş etme; yeni yaşam düzenine ve ortak ebeveynliğe uyum süreci.",
    href: "#/hizmetler/bosanma-ve-yas-danismanligi",
    images: [serviceDivorceGrief],
  },
  {
    no: "03",
    label: "EVLİLİK ÖNCESİ",
    title: "Birlikte yaşama, birbirini tanımakla başlar.",
    text: "İletişim, empati, roller, köken aileler ve olası çatışma alanları üzerine ortak bir anlayış geliştirme süreci.",
    href: "#/hizmetler/evlilik-oncesi-danismanlik",
    images: [servicePremarital],
  },
  {
    no: "04",
    label: "BİREYSEL DANIŞMANLIK",
    title: "Kendini anlamak, değişimin ilk alanıdır.",
    text: "Duygu, düşünce ve davranışları fark etme; stresle baş etme, karar verme, öz güven ve olumlu benlik algısını güçlendirme alanı.",
    href: "#/hizmetler/bireysel-danismanlik",
    images: [serviceIndividualOne, serviceIndividualTwo],
  },
];

const WORK_AREAS = [
  { no: "01", title: "Aile içinde yeniden bağ kurmak.", label: "AİLE DANIŞMANLIĞI", href: "#/hizmetler/aile-danismanligi", image: serviceFamily },
  { no: "02", title: "Kayıptan sonra yaşamı yeniden kurmak.", label: "BOŞANMA VE YAS", href: "#/hizmetler/bosanma-ve-yas-danismanligi", image: serviceDivorceGrief },
  { no: "03", title: "Evliliğe birlikte hazırlanmak.", label: "EVLİLİK ÖNCESİ", href: "#/hizmetler/evlilik-oncesi-danismanlik", image: servicePremarital },
  { no: "04", title: "Kendimi daha iyi anlamak.", label: "BİREYSEL DANIŞMANLIK", href: "#/hizmetler/bireysel-danismanlik", image: serviceIndividualTwo },
];

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export default function CosmicHome2026({ articles = [] }) {
  const journeyRef = useRef(null);
  const stageRef = useRef(null);
  const [scene, setScene] = useState(0);

  useEffect(() => {
    const journey = journeyRef.current;
    const stage = stageRef.current;
    if (!journey || !stage) return undefined;

    let frame = 0;
    let activeScene = -1;

    const render = () => {
      frame = 0;
      const rect = journey.getBoundingClientRect();
      const travel = Math.max(1, journey.offsetHeight - window.innerHeight);
      const progress = clamp(-rect.top / travel);
      const nextScene = Math.min(JOURNEY_SCENES.length - 1, Math.floor(Math.min(progress, 0.9999) * JOURNEY_SCENES.length));
      const wave = Math.sin(progress * Math.PI * 4);

      stage.style.setProperty("--journey", progress.toFixed(4));
      stage.style.setProperty("--journey-turn", `${(progress * 26 - 13).toFixed(2)}deg`);
      stage.style.setProperty("--journey-tilt", `${(wave * 2.5).toFixed(2)}deg`);
      stage.style.setProperty("--journey-scale", `${(0.78 + Math.sin(progress * Math.PI) * 0.42).toFixed(3)}`);
      stage.style.setProperty("--journey-x", `${(Math.sin(progress * Math.PI * 3) * 9).toFixed(2)}vw`);
      stage.style.setProperty("--journey-y", `${(Math.cos(progress * Math.PI * 2) * 5).toFixed(2)}vh`);

      if (nextScene !== activeScene) {
        activeScene = nextScene;
        setScene(nextScene);
      }
    };

    const requestRender = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(render);
    };

    render();
    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("resize", requestRender);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestRender);
      window.removeEventListener("resize", requestRender);
    };
  }, []);

  const visibleArticles = (Array.isArray(articles) ? articles : []).filter((article) => article?.status !== "draft").slice(0, 3);
  const articleFallbacks = [journalFallbackOne, journalFallbackTwo, journalFallbackThree];

  return (
    <main className="cosmic2026" id="anasayfa">
      <section className="cosmic2026Hero">
        <img className="cosmic2026Hero__room" src={homeLightCinema} alt="Gün ışığı alan sakin bir görüşme alanı" />
        <div className="cosmic2026Hero__veil" aria-hidden="true" />
        <div className="cosmic2026Noise" aria-hidden="true" />
        <div className="cosmic2026Hero__halo" aria-hidden="true" />
        <div className="cosmic2026Hero__orb" aria-hidden="true"><i /><i /><i /><span /></div>
        <p className="cosmic2026Eyebrow">SOSYAL HİZMET UZMANI · KAAN ÖZKAN</p>
        <h1><span>İNSAN</span><em>İLİŞKİLERİYLE</em><span>ŞEKİLLENİR.</span></h1>
        <div className="cosmic2026Hero__bottom">
          <p>İnsan–aile–çevre–toplum katmanlarında ilerleyen, güçlenme ve sürdürülebilir değişim odaklı bir görüşme alanı.</p>
          <div><a href="#/randevu">RANDEVU TALEBİ <b>↗</b></a><a href="#sosyal-ekosistem" onClick={(event) => { event.preventDefault(); journeyRef.current?.scrollIntoView({ behavior: "smooth" }); }}>YOLCULUĞU BAŞLAT <b>↓</b></a></div>
        </div>
        <div className="cosmic2026Hero__index" aria-hidden="true"><span>01</span><i /><span>04</span></div>
      </section>

      <section className="cosmic2026Journey" id="sosyal-ekosistem" ref={journeyRef}>
        <div className="cosmic2026Stage" ref={stageRef} data-scene={scene}>
          <div className="cosmic2026Stage__grid" aria-hidden="true" />
          <div className="cosmic2026Stage__stars" aria-hidden="true" />

          <div className="cosmic2026Cinema" aria-hidden="true">
            {JOURNEY_SCENES.map((item, index) => (
              <figure className={`cosmic2026Cinema__scene ${scene === index ? "is-active" : ""}`} key={item.no}>
                <div className={`cosmic2026Cinema__media ${item.images.length > 1 ? "has-pair" : ""}`}>
                  {item.images.map((image, imageIndex) => (
                    <img src={image} alt="" key={image} className={`cosmic2026Cinema__image cosmic2026Cinema__image--${imageIndex + 1}`} />
                  ))}
                  <span className="cosmic2026Cinema__wash" />
                </div>
                <figcaption><small>{item.no}</small><strong>{item.label}</strong><i /></figcaption>
              </figure>
            ))}
          </div>

          <div className="cosmic2026Stage__label" aria-hidden="true">BAĞ<br />UYUM<br />DEĞİŞİM</div>
          <div className="cosmic2026Stage__scenes">
            {JOURNEY_SCENES.map((item, index) => (
              <article className={`cosmic2026Scene ${scene === index ? "cosmic2026Scene--active" : ""}`} key={item.no}>
                <span>{item.no} / {item.label}</span><h2>{item.title}</h2><p>{item.text}</p><a href={item.href}>DETAYLI BİLGİ <b>↗</b></a>
              </article>
            ))}
          </div>
          <div className="cosmic2026Stage__progress" aria-label={`Yolculuk sahnesi ${scene + 1} / ${JOURNEY_SCENES.length}`}>
            {JOURNEY_SCENES.map((item, index) => <i className={index <= scene ? "is-active" : ""} key={item.no} />)}
          </div>
          <div className="cosmic2026Stage__count" aria-hidden="true">0{scene + 1}</div>
        </div>
      </section>

      <section className="cosmic2026Impact">
        <p>YAKLAŞIM / 2026</p>
        <h2>HER İNSAN,<br /><em>BİR SİSTEMİN</em><br />İÇİNDE YAŞAR.</h2>
        <div><span>Yalnızca soruna değil, sorunun oluştuğu ilişkilere, çevreye ve yaşam koşullarına bakmak.</span><a href="#/hakkimda">YAKLAŞIMI İNCELE ↗</a></div>
      </section>

      <section className="cosmic2026Areas" aria-labelledby="cosmicAreasTitle">
        <header><p>ÇALIŞMA ALANLARI</p><h2 id="cosmicAreasTitle">Size en yakın<br /><em>cümleden başlayın.</em></h2></header>
        <div className="cosmic2026Areas__grid">
          {WORK_AREAS.map((item) => (
            <a href={item.href} className="cosmic2026Area" key={item.no}>
              <img src={item.image} alt="" loading="lazy" decoding="async" /><div />
              <span>{item.no}</span><small>{item.label}</small><h3>{item.title}</h3><b>ALANI KEŞFET ↗</b>
            </a>
          ))}
        </div>
      </section>

      <section className="cosmic2026Process">
        <div className="cosmic2026Process__title"><p>GÖRÜŞME SÜRECİ</p><h2>ÜÇ ADIM.<br />TEK BİR<br /><em>BAŞLANGIÇ.</em></h2></div>
        <ol>
          <li><span>01</span><div><b>İhtiyacı anlatın</b><p>Çalışmak istediğiniz alanı seçin veya ön görüşmeyle birlikte netleştirin.</p></div></li>
          <li><span>02</span><div><b>Zamanı belirleyin</b><p>Size uygun gün, saat ve görüşme biçimini randevu ekranından seçin.</p></div></li>
          <li><span>03</span><div><b>Yol haritasını kurun</b><p>İlk görüşmede ihtiyaçları, sınırları ve sonraki adımları birlikte belirleyin.</p></div></li>
        </ol>
        <a href="#/randevu">RANDEVU ADIMLARINI BAŞLAT <span>↗</span></a>
      </section>

      {visibleArticles.length > 0 && (
        <section className="cosmic2026Journal" aria-labelledby="cosmicJournalTitle">
          <header><p>SAHA NOTLARI</p><h2 id="cosmicJournalTitle">YAVAŞ OKU.<br /><em>DERİN DÜŞÜN.</em></h2><a href="#/blog">TÜM YAZILAR ↗</a></header>
          <div>{visibleArticles.map((article, index) => <a href={`#/blog/${article.slug}`} key={article.id || article.slug}><figure><img src={article.image || articleFallbacks[index]} alt="" loading="lazy" decoding="async" /><span>0{index + 1}</span></figure><small>{article.category} · {article.readTime || "OKUMA"}</small><h3>{article.title}</h3><p>{article.excerpt}</p><b>OKUMAYA BAŞLA ↗</b></a>)}</div>
        </section>
      )}

      <section className="cosmic2026Final">
        <img src={finalScene} alt="" loading="lazy" decoding="async" /><div className="cosmic2026Final__veil" />
        <div className="cosmic2026Final__copy"><p>YOLCULUĞUN İLK ADIMI</p><h2>ANLATMAK,<br /><em>ALANI DEĞİŞTİRİR.</em></h2><span>Görüşme alanını seçin, uygun zamanı belirleyin ve randevu talebinizi güvenle oluşturun.</span><div><a href="#/randevu">RANDEVU TALEBİ ↗</a><a href="#/iletisim">İLETİŞİM →</a></div></div>
      </section>

      <footer className="cosmic2026Footer"><div><img src={brandMark} alt="" /><span><small>SOSYAL HİZMET UZMANI</small><b>KAAN ÖZKAN</b></span></div><nav><a href="#/hizmetler">Çalışma Alanları</a><a href="#/hakkimda">Hakkımda</a><a href="#/blog">Yazılar</a><a href="#/iletisim">İletişim</a></nav><p>© 2026 Kaan Özkan · Tüm hakları saklıdır.</p></footer>

      {typeof document !== "undefined" && createPortal(<a className="cosmic2026Sticky" href="#/randevu"><span>RANDEVU</span><b>↗</b></a>, document.body)}
    </main>
  );
}
