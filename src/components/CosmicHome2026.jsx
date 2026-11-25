import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import serviceIndividualCinema from "../assets/service-individual-cinema-v2.png";
import serviceRelationshipCinema from "../assets/service-divorce-grief-couple-v3.png";
import servicePsychosocialCinema from "../assets/service-psychosocial-family-v3.png";
import serviceFirstStepCinema from "../assets/appointment-sunlit-threshold-v1.png";
import journalFallbackOne from "../assets/blog-editorial-sunlit-v1.png";
import journalFallbackTwo from "../assets/blog-cinema-02-studio.png";
import journalFallbackThree from "../assets/blog-cinema-03-journal.png";
import finalScene from "../assets/contact-appointment-cinema-v1.png";
import emblem from "../assets/kaan-ozkan-emblem.png";

const JOURNEY_SCENES = [
  {
    no: "01",
    label: "BİREY",
    title: "Her şey bir insanla başlar.",
    text: "Duygular, deneyimler, sınırlar ve güçlü yönler; görünen sorunun çok ötesinde, kişiye özgü bir dünya oluşturur.",
  },
  {
    no: "02",
    label: "İLİŞKİ",
    title: "Hiçbir hikâye tek başına yazılmaz.",
    text: "Bağ kurma biçimimiz, duyulma ihtiyacımız ve çatışma döngülerimiz ilişkisel alanın içinde anlam kazanır.",
  },
  {
    no: "03",
    label: "AİLE",
    title: "Yakın çevre, hayatın taşıyıcı dokusudur.",
    text: "Roller, sınırlar, geçmişten gelen örüntüler ve günlük yaşam koşulları kişinin hareket alanını şekillendirir.",
  },
  {
    no: "04",
    label: "TOPLUM",
    title: "İnsan, çevresinden bağımsız değildir.",
    text: "Ekonomik, kültürel ve toplumsal koşullar deneyimlerin arka planını oluşturur; çözüm de bu bütünün içinde gelişir.",
  },
  {
    no: "05",
    label: "GÜÇLENME",
    title: "Katmanlar görünür olduğunda yol belirir.",
    text: "Amaç yalnızca güçlüğü azaltmak değil; kaynakları, seçenekleri ve sürdürülebilir değişim kapasitesini birlikte büyütmektir.",
  },
];

const WORK_AREAS = [
  { no: "01", title: "Kendimi anlamak istiyorum.", label: "BİREYSEL ÇALIŞMA", href: "#/hizmetler/bireysel-danismanlik", image: serviceIndividualCinema },
  { no: "02", title: "İlişkimizde iletişim zorlaştı.", label: "İLİŞKİ & İLETİŞİM", href: "#/hizmetler/cift-danismanligi", image: serviceRelationshipCinema },
  { no: "03", title: "Bir kayıp veya değişim yaşıyorum.", label: "PSİKOSOSYAL DESTEK", href: "#/hizmetler/psikososyal-destek", image: servicePsychosocialCinema },
  { no: "04", title: "Nereden başlayacağımı bilmiyorum.", label: "ÜCRETSİZ ÖN GÖRÜŞME", href: "#/randevu", image: serviceFirstStepCinema },
];

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export default function CosmicHome2026({ articles = [], pressCoverage = [] }) {
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
  const visiblePress = (Array.isArray(pressCoverage) ? pressCoverage : []).slice(0, 5);

  return (
    <main className="cosmic2026" id="anasayfa">
      <section className="cosmic2026Hero">
        <div className="cosmic2026Noise" aria-hidden="true" />
        <div className="cosmic2026Hero__halo" aria-hidden="true" />
        <div className="cosmic2026Hero__orb" aria-hidden="true"><i /><i /><i /><span /></div>
        <p className="cosmic2026Eyebrow">SOSYAL HİZMET UZMANI · KAAN ÖZKAN</p>
        <h1><span>İNSAN</span><em>İLİŞKİLERİYLE</em><span>ŞEKİLLENİR.</span></h1>
        <div className="cosmic2026Hero__bottom">
          <p>İnsan–aile–çevre–toplum katmanlarında ilerleyen, güçlenme ve sürdürülebilir değişim odaklı bir görüşme alanı.</p>
          <div><a href="#/randevu">RANDEVU TALEBİ <b>↗</b></a><a href="#sosyal-ekosistem">YOLCULUĞU BAŞLAT <b>↓</b></a></div>
        </div>
        <div className="cosmic2026Hero__index" aria-hidden="true"><span>01</span><i /><span>05</span></div>
      </section>

      <section className="cosmic2026Journey" id="sosyal-ekosistem" ref={journeyRef}>
        <div className="cosmic2026Stage" ref={stageRef} data-scene={scene}>
          <div className="cosmic2026Stage__grid" aria-hidden="true" />
          <div className="cosmic2026Stage__stars" aria-hidden="true" />

          <div className="cosmic2026Sculpture" aria-hidden="true">
            <div className="cosmic2026Sculpture__axis">
              <div className="cosmic2026Core"><span /><i /></div>
              <div className="cosmic2026Ring cosmic2026Ring--one"><span className="cosmic2026Node cosmic2026Node--one" /><span className="cosmic2026Node cosmic2026Node--two" /></div>
              <div className="cosmic2026Ring cosmic2026Ring--two"><span className="cosmic2026Node cosmic2026Node--three" /></div>
              <div className="cosmic2026Ring cosmic2026Ring--three"><span className="cosmic2026Node cosmic2026Node--four" /><span className="cosmic2026Node cosmic2026Node--five" /></div>
              <div className="cosmic2026Meridian cosmic2026Meridian--one" />
              <div className="cosmic2026Meridian cosmic2026Meridian--two" />
            </div>
          </div>

          <div className="cosmic2026Stage__label" aria-hidden="true">İNSAN<br />İLİŞKİ<br />ÇEVRE</div>
          <div className="cosmic2026Stage__scenes">
            {JOURNEY_SCENES.map((item, index) => (
              <article className={`cosmic2026Scene ${scene === index ? "cosmic2026Scene--active" : ""}`} key={item.no}>
                <span>{item.no} / {item.label}</span><h2>{item.title}</h2><p>{item.text}</p>
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

      {visiblePress.length > 0 && (
        <section className="cosmic2026Press" aria-label="Basında yer alan çalışmalar">
          <p>BASINDA / SEÇİLİ YAYINLAR</p>
          <div>{visiblePress.map((item, index) => <a href={item.url} target="_blank" rel="noreferrer" key={item.id || item.url}><span>0{index + 1}</span><b>{item.source}</b><em>{item.title}</em><i>↗</i></a>)}</div>
        </section>
      )}

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

      <footer className="cosmic2026Footer"><div><img src={emblem} alt="" /><span><small>SOSYAL HİZMET UZMANI</small><b>KAAN ÖZKAN</b></span></div><nav><a href="#/hizmetler">Çalışma Alanları</a><a href="#/hakkimda">Hakkımda</a><a href="#/blog">Yazılar</a><a href="#/basinda-biz">Basında</a><a href="#/iletisim">İletişim</a></nav><p>© 2026 Kaan Özkan · Tüm hakları saklıdır.</p></footer>

      {typeof document !== "undefined" && createPortal(<a className="cosmic2026Sticky" href="#/randevu"><span>RANDEVU</span><b>↗</b></a>, document.body)}
    </main>
  );
}
