import { useEffect, useState } from "react";
import heroSlide1 from "./assets/hero-slide-1.jpg";
import heroSlide2 from "./assets/hero-slide-2.jpg";
import aboutPhoto from "./assets/kaan-about.jpg";
import servicesHeroRoom from "./assets/services-hero-room.jpg";
import processHeroDesk from "./assets/process-hero-desk.jpg";
import contentHeroMic from "./assets/content-hero-mic-clean.jpg";
import kaanOzkanEmblem from "./assets/kaan-ozkan-emblem.png";
import { supabase } from "./supabase";

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


const defaultProcessContent = {
  heroEyebrow: "SÜREÇ",
  heroTitle: "Nasıl",
  heroAccent: "Çalışıyoruz?",
  heroDescription: "Danışmanlık süreci, sizin ihtiyaçlarınıza ve hedeflerinize uygun şekilde planlanır. Güvenli, saygılı ve iş birliğine dayalı bir süreç yürütürüz.",
  sectionEyebrow: "ÇALIŞMA SÜRECİM",
  sectionTitle: "Süreç, kişiye özel ve esnek bir şekilde ilerler.",
  steps: [
    { no: "01", icon: "message", title: "Ön Görüşme", text: "Tanışma ve ihtiyaçların belirlenmesi amacıyla ön görüşme gerçekleştirilir. Sürecin çerçevesi birlikte netleştirilir." },
    { no: "02", icon: "target", title: "Hedef Belirleme", text: "Önceliklerinize göre hedefler belirlenir ve bu hedeflere ulaşmak için kişiye özgü bir yol haritası oluşturulur." },
    { no: "03", icon: "user", title: "Çalışma ve Uygulama", text: "Belirlenen hedeflere yönelik psikososyal destek yöntemleri kullanılarak farkındalık ve değişim süreci başlatılır." },
    { no: "04", icon: "chart", title: "Değerlendirme", text: "İlerleme düzenli olarak değerlendirilir, ihtiyaçlara göre planlama gözden geçirilir ve yeniden şekillendirilir." },
    { no: "05", icon: "check", title: "Sürdürme ve Destek", text: "Kazanımların kalıcı hale gelmesi için destek sürdürülür ve gerektiğinde yeni hedefler belirlenir." }
  ],
  trustItems: [
    { icon: "shield", title: "Gizlilik Esastır", text: "Tüm görüşmeler gizlilik ilkesi çerçevesinde yürütülür." },
    { icon: "user", title: "Size Özel Yaklaşım", text: "Her danışanın ihtiyaçları farklıdır. Size uygun bir yol haritası oluşturulur." },
    { icon: "calendar", title: "Esnek Görüşme Seçenekleri", text: "Görüşme biçimi ve sıklığı ihtiyaçlara göre birlikte planlanır." },
    { icon: "heart", title: "Sürekli Destek", text: "Süreç boyunca ilerleme değerlendirilir ve ihtiyaç halinde destek devam eder." }
  ],
  testimonialsEyebrow: "DANIŞAN DENEYİMLERİ",
  testimonialsTitle: "Süreçten kalan gerçek mesajlar.",
  testimonialsDescription: "Danışanların süreç sonrasında sosyal medya ve mesaj yoluyla paylaştığı geri bildirimlerden bazıları.",
  testimonialsNote: "Paylaşımlar danışanların kendi ifadeleridir. Danışmanlık deneyimi ve sonuçları kişiden kişiye farklılık gösterebilir.",
  testimonials: []
};

const defaultAboutContent = {
  eyebrow: "HAKKIMDA",
  firstName: "Kaan",
  lastName: "ÖZKAN",
  role: "Sosyal Hizmet Uzmanı & Aile Danışmanı",
  storyLabel: "BENİM HİKÂYEM • TAM METİN",
  paragraphs: [
    "Merhabalar, ben Kaan ÖZKAN. Sosyal Hizmet Uzmanı ve Aile Danışmanıyım. Meslek hayatımı yalnızca bireylerin yaşadığı sorunları çözmeye değil; onların yaşam öykülerini anlamaya, güçlü yönlerini ortaya çıkarmaya ve sürdürülebilir bir değişim sürecine eşlik etmeye adadım. İnsan davranışını yalnızca bireysel özellikler üzerinden değil; aile, çevre, sosyal sistemler ve yaşam deneyimleriyle birlikte değerlendiren bütüncül bir bakış açısını benimsiyorum.",
    "İstanbul Aydın Üniversitesi Sağlık Bilimleri Fakültesi Sosyal Hizmet Bölümü'nden mezun olduktan sonra mesleki gelişimimi yalnızca üniversite eğitimiyle sınırlandırmadım. Eğitim hayatım boyunca farklı yaş grupları ve farklı yaşam deneyimlerine sahip bireylerle çalışabilmek amacıyla gönüllü projelerde, uygulamalı stajlarda ve saha araştırmalarında aktif olarak yer aldım. Böylece sosyal hizmetin teorik yönünü gerçek yaşam deneyimleriyle birleştirme fırsatı elde ettim.",
    "Üniversite yıllarında çocuk koruma sistemi, yaşlı bakım hizmetleri, rehabilitasyon merkezleri, sivil toplum kuruluşları ve sosyal hizmet kurumlarında görev alarak sosyal hizmet disiplininin farklı uygulama alanlarını yakından tanıdım. Sulukule Gönüllüleri Derneği, Toplum Gönüllüleri Vakfı (TOG), Florya Çocuk Destek Merkezi (ÇODEM), Kırşehir Aile ve Sosyal Hizmetler İl Müdürlüğü ile palyatif bakım hizmeti sunan Asudem Yaşam ve Sağlık Merkezi gibi kurumlarda yürüttüğüm gönüllülük ve staj çalışmaları; çocuk koruma, sosyal destek mekanizmaları, dezavantajlı gruplarla çalışma, yaşlı refahı ve psikososyal değerlendirme alanlarında önemli saha deneyimleri kazanmamı sağladı.",
    "Meslek hayatıma Kırşehir Belediyesi bünyesinde Sosyal Yardım Merkezi'nde Sosyal Çalışmacı olarak başladım. Bu görev sürecinde yüzlerce müracaatçıyla birebir görüşmeler gerçekleştirdim; sosyal inceleme raporlarının hazırlanması, yerinde ev ziyaretleri, psikososyal değerlendirme süreçleri, sosyal yardım mekanizmalarının planlanması ve vaka yönetimi çalışmalarında aktif sorumluluk üstlendim. Her müracaatçının yaşam öyküsünün birbirinden farklı olduğunu, etkili bir sosyal hizmet müdahalesinin ise ancak bireyin sosyal çevresi, aile yapısı, ekonomik koşulları ve psikolojik ihtiyaçları birlikte değerlendirildiğinde mümkün olabileceğini bu süreçte daha derinden deneyimledim.",
    "Daha sonra Kırşehir Belediyesi Engelsiz Yaşam Merkezi, BEGEM (Beceri ve Meslek Edindirme Merkezi) ve Bağbaşı Aile Yaşam Merkezi'nde Sosyal Çalışmacı ve Aile Danışmanı olarak görev aldım. Çocuklar, ergenler, yetişkinler, çiftler, aileler ve engelli bireylerle yürüttüğüm danışmanlık süreçlerinde yalnızca mevcut problemleri çözmeye odaklanmak yerine; bireylerin kendi potansiyellerini fark etmelerini, sağlıklı ilişki becerileri geliştirmelerini ve yaşam kalitelerini artırmalarını hedefleyen koruyucu, önleyici ve güçlendirici müdahaleler geliştirdim.",
    "Aile danışmanlığı, sosyal hizmet uygulamaları, psikososyal müdahale, travma, kriz yönetimi, çocuk koruma, iletişim becerileri ve mesleki gelişim alanlarında çok sayıda eğitim programına katılarak kendimi sürekli geliştirmeye devam ettim. Çünkü insan davranışını anlamanın ve etkili bir danışmanlık hizmeti sunmanın, yaşam boyu öğrenmeyi benimsemekten geçtiğine inanıyorum.",
    "Meslek yaşamım boyunca sosyal hizmetin temel değerleri olan insan hakları, sosyal adalet, eşitlik, etik sorumluluk, gizlilik ve insan onuruna saygı ilkelerini çalışmalarımın merkezine yerleştirdim. Danışmanlık sürecini yalnızca öneriler sunulan bir görüşme olarak değil; danışanın kendisini güven içerisinde ifade edebildiği, yargılanmadan dinlendiği ve değişim için cesaretlendirildiği profesyonel bir iş birliği süreci olarak görüyorum.",
    "Çalışmalarımda ağırlıklı olarak bireysel danışmanlık, aile danışmanlığı ve çift danışmanlığı alanlarında hizmet vermekteyim. İletişim problemleri, evlilik ve ilişki çatışmaları, boşanma süreci, güven sorunları, öfke yönetimi, kaygı, yaşam olaylarına uyum güçlüğü, ebeveynlik becerileri, aile içi roller, sınır koyma, benlik saygısı, duygusal dayanıklılık ve psikososyal güçlenme gibi birçok konuda danışanlarıma profesyonel destek sunuyorum.",
    "Mesleki uygulamalarımda sosyal hizmetin güç odaklı yaklaşımı, ekolojik sistem yaklaşımı, çözüm odaklı görüşme teknikleri ve aile danışmanlığı ilkelerinden yararlanıyor; her danışanın yaşam öyküsünü kendine özgü bir bütün olarak değerlendiriyorum. Benim için hiçbir danışan yalnızca yaşadığı problemden ibaret değildir. Her bireyin geçmişi, yaşam deneyimleri, güçlü yönleri ve değişim kapasitesi vardır. Danışmanlık sürecindeki temel hedefim, bu potansiyelin ortaya çıkmasına rehberlik etmektir.",
    "Akademik gelişimime ve mesleki üretkenliğime de büyük önem veriyorum. Üniversite yıllarında İstanbul Aydın Üniversitesi Sosyal Hizmet Kulübü'nde önce Genel Sekreter, ardından Kulüp Başkanı olarak görev aldım. Bu süreçte çok sayıda bilimsel etkinlik, sosyal sorumluluk projesi, seminer ve öğrenci organizasyonunun planlanması ve yürütülmesinde aktif rol üstlendim. Ayrıca ulusal kongreler, sempozyumlar ve akademik toplantılara katılarak sosyal hizmet alanındaki güncel gelişmeleri yakından takip etmeyi sürdürdüm.",
    "Sahadaki çalışmalarımın yanı sıra, bilgi ve deneyimlerimi daha geniş kitlelere ulaştırmayı mesleki sorumluluğumun bir parçası olarak görüyorum. Bu doğrultuda dijital platformlarda sosyal hizmet, aile danışmanlığı, psikososyal güçlenme, sağlıklı ilişkiler, ebeveynlik ve kişisel gelişim konularında bilimsel temelli içerikler üretiyor; toplumun ruh sağlığı okuryazarlığını artırmaya katkı sunmayı amaçlıyorum.",
    "Benim için başarılı bir danışmanlık süreci; danışanın yalnızca sorunlarını konuştuğu değil, kendisini yeniden keşfettiği, yaşamına farklı bir bakış açısıyla yön verebildiği ve geleceğe daha güçlü adımlarla ilerleyebildiği bir gelişim yolculuğudur.",
    "Her bireyin yaşamında zaman zaman desteğe ihtiyaç duyabileceğine inanıyorum. Doğru zamanda alınan profesyonel destek; yalnızca mevcut sorunların çözümüne değil, daha sağlıklı ilişkiler kurmaya, psikolojik dayanıklılığı artırmaya ve yaşam kalitesini yükseltmeye de önemli katkılar sağlar.",
    "Eğer siz de yaşamınızın herhangi bir döneminde profesyonel bir bakış açısına ihtiyaç duyuyor, kendinizi daha iyi anlamak, ilişkilerinizi güçlendirmek veya yaşadığınız güçlüklerle daha sağlıklı başa çıkabilmek için güvenilir bir danışmanlık süreci arıyorsanız, bu yolculukta size bilimsel, etik ve insan odaklı bir yaklaşımla eşlik etmekten memnuniyet duyarım.",
    "Boşanma Danışmanlığı ve Yas Danışmanlığı başta olmak üzere yaşamın farklı dönemlerinde ortaya çıkan psikososyal güçlükler üzerine yoğunlaşmaktayım. Danışanlarımla yürüttüğüm profesyonel süreçlerde, her bireyin yaşam öyküsünü, aile dinamiklerini, sosyal çevresini ve kişisel kaynaklarını birlikte değerlendirerek bilimsel temelli, etik ilkelere bağlı ve kişiye özgü bir danışmanlık yaklaşımı benimsiyorum."
  ],
  profileEyebrow: "AİLE DANIŞMANI",
  profileName: "Kaan Özkan",
  profileRole: "Sosyal Hizmet Uzmanı",
  profileItem1: "Etik yaklaşım",
  profileItem2: "Gizlilik",
  profileItem3: "İnsan odaklı destek",
};


const defaultBlogPosts = [
  {
    slug: "aile-icinde-saglikli-iletisim",
    category: "AİLE & İLİŞKİLER",
    date: "12 Mayıs 2026",
    readTime: "5 dk okuma",
    title: "Aile İçinde Sağlıklı İletişim Nasıl Kurulur?",
    excerpt:
      "Aile ilişkilerinde iletişim, anlayış ve empati temelinde güçlü bağlar kurmanın yolları.",
    image:
      "https://images.unsplash.com/photo-1504151932400-72d4384f04b3?auto=format&fit=crop&w=1600&q=88",
    body: [
      "Aile içindeki iletişim yalnızca konuşmak değil; karşımızdaki kişiyi anlamaya çalışmak, duyulduğunu hissettirmek ve güvenli bir ilişki alanı oluşturabilmektir. Sağlıklı iletişim, çatışmaların hiç yaşanmadığı bir ortam değil; anlaşmazlıkların saygılı ve yapıcı biçimde ele alınabildiği bir ilişkisel yapıdır.",
      "Günlük yaşamın yoğunluğu, ekonomik sorumluluklar, ebeveynlik rolleri ve bireysel ihtiyaçlar aile üyelerinin birbirini gerçekten dinlemesini zorlaştırabilir. Bu nedenle iletişimde kullanılan dil kadar zamanlama, beden dili ve duyguların nasıl ifade edildiği de önemlidir.",
      "Aile üyelerinin birbirlerinin sınırlarına saygı göstermesi, eleştiri yerine ihtiyaçlarını ifade etmesi ve sorun karşısında kişiyi değil davranışı konuşması iletişimi güçlendiren temel adımlardandır.",
    ],
  },
  {
    slug: "zor-duygularla-bas-etme",
    category: "KİŞİSEL GELİŞİM",
    date: "09 Mayıs 2026",
    readTime: "6 dk okuma",
    title: "Zor Duygularla Baş Etmenin 7 Yolu",
    excerpt:
      "Kaygı, stres ve üzüntü gibi duygularla daha sağlıklı bir ilişki kurabilmek için uygulanabilir öneriler.",
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1600&q=88",
    body: [
      "Zor duygular çoğu zaman ortadan kaldırılması gereken bir problem gibi görülür. Oysa duygular, yaşamımızdaki ihtiyaçları, sınırları ve değişimleri fark etmemize yardımcı olan önemli sinyallerdir.",
      "Duyguyu bastırmak yerine adlandırmak, bedendeki etkisini fark etmek ve yaşanan olayı daha geniş bir çerçevede değerlendirmek baş etme kapasitesini güçlendirebilir.",
      "Uyku, hareket, sosyal destek, günlük rutin ve sınır koyma becerileri psikososyal dayanıklılığın önemli parçalarıdır. Gerektiğinde profesyonel destek almak da sürecin sağlıklı biçimde ele alınmasına yardımcı olabilir.",
    ],
  },
  {
    slug: "kayip-sonrasi-psikososyal-destek",
    category: "PSİKOSOSYAL DESTEK",
    date: "05 Mayıs 2026",
    readTime: "7 dk okuma",
    title: "Kayıp Sonrası Psikososyal Destek",
    excerpt:
      "Kayıp yaşayan bireylerin duygusal sürecini anlamak ve bu süreçte desteklenmenin önemini ele alan bir rehber.",
    image:
      "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?auto=format&fit=crop&w=1600&q=88",
    body: [
      "Kayıp sonrası yas süreci kişiden kişiye farklı ilerler. Her bireyin kayba verdiği anlam, yaşam öyküsü, sosyal çevresi ve mevcut kaynakları bu deneyimin biçimini etkileyebilir.",
      "Bu dönemde duyguların doğrusal bir sırayla ilerlemesi beklenmemelidir. Bazı günler daha güçlü hissedilirken bazı günler kayıp yeniden yoğun biçimde hissedilebilir.",
      "Sosyal destek kaynaklarının güçlendirilmesi, günlük yaşam işlevselliğinin korunması ve bireyin kendi temposuna saygı gösterilmesi psikososyal destek sürecinin önemli parçalarıdır.",
    ],
  },
  {
    slug: "sosyal-hizmet-nedir",
    category: "SOSYAL HİZMET",
    date: "02 Mayıs 2026",
    readTime: "4 dk okuma",
    title: "Sosyal Hizmet Nedir, Nasıl Fayda Sağlar?",
    excerpt:
      "Sosyal hizmetin birey, aile ve toplum için sunduğu destek mekanizmalarını daha yakından tanıyın.",
    image:
      "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1600&q=88",
    body: [
      "Sosyal hizmet; bireylerin, ailelerin ve toplumların yaşam koşullarını güçlendirmeyi, sosyal işlevselliği desteklemeyi ve uygun kaynaklara erişimi kolaylaştırmayı amaçlayan profesyonel bir disiplindir.",
      "Sosyal hizmet uygulamalarında birey yalnızca yaşadığı sorun üzerinden değerlendirilmez. Aile ilişkileri, ekonomik koşullar, sosyal çevre, yaşam deneyimleri ve mevcut destek kaynakları birlikte ele alınır.",
      "Amaç, bireyin güçlü yönlerini görünür hale getirerek kendi yaşamı üzerindeki etkisini artırmak ve ihtiyaç duyduğu sosyal destek mekanizmalarına erişimini kolaylaştırmaktır.",
    ],
  },
  {
    slug: "goc-ve-yer-degistirme-sonrasi-uyum",
    category: "ÖNE ÇIKAN YAZI",
    date: "28 Nisan 2026",
    readTime: "10 dk okuma",
    title: "Göç ve Yer Değiştirme Sonrası Uyum Süreci",
    excerpt:
      "Yeni bir yere uyum sağlamak zaman alabilir. Bu süreçte yaşanabilecek duygular, zorluklar ve baş etme yolları üzerine kapsamlı bir rehber.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=90",
    body: [
      "Göç ve yer değiştirme yalnızca fiziksel bir değişiklik değildir. Bireyin sosyal çevresi, rutinleri, aidiyet duygusu, destek kaynakları ve günlük yaşam alışkanlıkları aynı anda değişebilir.",
      "Yeni bir çevreye uyum sağlama sürecinde özlem, belirsizlik, yalnızlık ve yabancılık hissi görülebilir. Bu duygular çoğu zaman uyum sürecinin doğal bir parçasıdır.",
      "Yeni sosyal bağlar kurmak, günlük rutinleri yeniden oluşturmak, ulaşılabilir hedefler belirlemek ve geçmişte işe yarayan baş etme kaynaklarını hatırlamak uyumu destekleyebilir.",
      "Uyum sürecinin kişiye özgü olduğu unutulmamalıdır. Bireyin yaşam öyküsü, yaşadığı değişimin niteliği ve sosyal destek ağı sürecin hızını ve biçimini etkiler.",
    ],
  },
];

const blogCategories = [
  "Tümü",
  "Aile & İlişkiler",
  "Psikososyal Destek",
  "Kişisel Gelişim",
  "Sosyal Hizmet",
  "Çocuk & Ergen",
];


const defaultBlogContent = {
  heroEyebrow: "BLOG",
  heroTitle: "Bilgi, farkındalık",
  heroAccent: "ve güçlü yarınlar.",
  heroDescription:
    "Sosyal hizmet, psikososyal destek ve yaşamın farklı alanlarına dair güncel yazılar, rehberler ve içerikler.",
  heroImage:
    "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=2000&q=90",
  categories: blogCategories,
  posts: defaultBlogPosts.map((post, index) => ({
    ...post,
    id: post.slug,
    status: "published",
    featured: index === defaultBlogPosts.length - 1,
    sortOrder: index + 1,
  })),
};

const createBlogSlug = (value = "") =>
  value
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);
  const [heroTouchStart, setHeroTouchStart] = useState(null);
  const [homeTextSlide, setHomeTextSlide] = useState(0);
  const [showSiteIntro, setShowSiteIntro] = useState(
    () => window.location.hash !== "#/admin"
  );
  const [blogSlug, setBlogSlug] = useState(() => {
    const hash = window.location.hash;
    return hash.startsWith("#/blog/") ? hash.replace("#/blog/", "") : "";
  });
  const [blogContent, setBlogContent] = useState(defaultBlogContent);

  const defaultHomeContent = {
    eyebrow: "ÇİFT VE AİLE DANIŞMANI",
    titleLine: "Profesyonel",
    titleAccent: "Aile Danışmanlığı",
    description:
      "Danışan odaklı yaklaşım ile güvenilir, etik ve çözüm odaklı sosyal hizmet ve aile danışmanlığı desteği.",
    primaryCta: "Ücretsiz Ön Görüşme",
    secondaryCta: "Çalışma Alanları",
    trust1Title: "Güvenli & Gizli",
    trust1Text: "Görüşmeler gizlilik ve etik ilkeler çerçevesinde yürütülür.",
    trust2Title: "Profesyonel Destek",
    trust2Text: "Mesleki sınırlar içinde, insan odaklı profesyonel destek.",
    trust3Title: "Kişiye Özel Yaklaşım",
    trust3Text: "Her danışanın yaşam öyküsü ve ihtiyaçları kendine özgüdür.",
    servicesEyebrow: "PROFESYONEL ÇALIŞMA ALANLARI",
    servicesTitle: "Size uygun desteği",
    servicesTitleAccent: " birlikte keşfedelim.",
    servicesDescription:
      "Yaşadığınız güçlüğü yalnızca tek bir başlık üzerinden değil; ilişkileriniz, yaşam deneyimleriniz ve sosyal çevrenizle birlikte değerlendiren bütüncül bir danışmanlık yaklaşımı.",
    service1Title: "Bireysel Danışmanlık",
    service1Item1: "Anksiyete, stres ve duygu düzenleme güçlükleri",
    service1Item2: "Özsaygı, benlik algısı ve psikososyal güçlenme",
    service2Title: "Evlilik, Çift ve Bekâr Danışmanlığı",
    service2Item1: "İletişim sorunları, ilişki çatışmaları ve güven problemleri",
    service2Item2: "Ayrılık, boşanma ve aile içi roller üzerine destek",
    service3Title: "Psikososyal Destek",
    service3Item1: "Yas ve kayıp, yaşam olaylarına uyum ve dayanıklılık",
    service3Item2: "Bağımlılık ve farklı psikososyal güçlüklerde destek süreci",
    trustStatementEyebrow: "KAAN ÖZKAN",
    trustStatementTitle: "Her birey, yaşadığı problemden çok daha fazlasıdır.",
    trustStatementText:
      "Danışmanlık sürecinde yalnızca yaşadığınız soruna değil, o sorunla baş ederken geliştirdiğiniz becerilere, sahip olduğunuz içsel güce ve çevrenizdeki destek kaynaklarına da bakarız. Çünkü değişim; eksik olduğunuz yönleri tamamlamaktan çok, zaten sahip olduğunuz gücü fark ederek onu yaşamınızda etkili bir kaynağa dönüştürmekle başlar.",
  };

  const [homeContent, setHomeContent] = useState(defaultHomeContent);

  const homeHeroTextSlides = [
    {
      eyebrow: homeContent.eyebrow,
      titleLine: homeContent.titleLine,
      titleAccent: homeContent.titleAccent,
      description: homeContent.description,
    },
    {
      eyebrow: "BİREYSEL DANIŞMANLIK",
      titleLine: "Kendinizi",
      titleAccent: "Yeniden Keşfedin",
      description:
        "Yaşamın getirdiği güçlükleri daha yakından anlamak, güçlü yönlerinizi fark etmek ve size özgü bir yol haritası oluşturmak için profesyonel destek.",
    },
    {
      eyebrow: "PSİKOSOSYAL DESTEK",
      titleLine: "Gücünüzü",
      titleAccent: "Harekete Geçirin",
      description:
        "Değişen yaşam koşulları, kayıp, uyum ve zorlayıcı süreçlerde içsel kaynaklarınızı güçlendiren, insan odaklı ve bütüncül bir yaklaşım.",
    },
  ];

  const activeHomeText = homeHeroTextSlides[homeTextSlide];


  const defaultServicesContent = {
    heroEyebrow: "HİZMETLER",
    heroTitle: "Çalışma",
    heroAccent: "Alanlarım",
    heroDescription:
      "Her danışanın yaşam öyküsü, ihtiyaçları ve güçlü yönleri farklıdır. Çalışma alanları bu farklılıklar dikkate alınarak değerlendirilir.",
    quickTitle: "Profesyonel Çalışma Alanlarım",
    quickDescription:
      "İhtiyacınıza en yakın başlığı seçerek detaylı çalışma alanlarını inceleyebilirsiniz.",

    individualTitle: "Bireysel Danışmanlık",
    individualShort:
      "Duygusal iyi oluş, benlik, dayanıklılık, kaygı, stres ve yaşam olaylarına uyum süreçlerinde kişiye özgü destek.",
    individualItems: [
      "Kaygı ve yaşam olaylarına uyum güçlüğü",
      "Öfke yönetimi ve duygu düzenleme",
      "Benlik saygısı ve özgüven",
      "Duygusal iyi oluş",
      "Psikososyal güçlenme ve dayanıklılık",
      "Sınır koyma ve sağlıklı iletişim",
      "Ayrılık, kayıp ve yas süreçleri",
      "Kişisel farkındalık ve yaşam becerileri"
    ],

    familyTitle: "Evlilik, Çift ve Bekâr Danışmanlığı",
    familyShort:
      "Aile içi iletişim, roller, sınırlar, ebeveynlik ve yaşam değişikliklerine uyum süreçlerinin birlikte değerlendirilmesi.",
    familyItems: [
      "Aile içi iletişim problemleri",
      "Aile içi roller ve sınırlar",
      "Ebeveynlik becerileri",
      "Aile içi çatışmalar",
      "Evlenme sürecinde olan bireyler/çiftler",
      "Nişan sürecinde olan bireyler/çiftler",
      "Güven, bağlanma ve ayrılık sürecinde olan bireyler/çiftler",
      "Boşanma sürecinde olan bireyler/çiftler",
      "Yaşam değişikliklerine ailece uyum",
      "Aile ilişkilerinde güven ve iş birliği"
    ],

    coupleTitle: "Çift Danışmanlığı",
    coupleShort:
      "İlişki dinamikleri, iletişim, güven, çatışma ve ayrılık süreçlerinde çift odaklı değerlendirme ve destek.",
    coupleItems: [
      "İletişim problemleri",
      "Evlilik ve ilişki çatışmaları",
      "Güven sorunları",
      "Bağlanma ve duygusal ihtiyaçlar",
      "Sınır koyma",
      "Ayrılık ve boşanma süreci"
    ],

    psychosocialTitle: "Psikososyal Destek",
    psychosocialShort:
      "Yaşam olayları, kayıp, yas, sosyal çevre ve bireysel kaynakların birlikte ele alındığı güçlendirme odaklı destek.",
    psychosocialItems: [
      "Yas ve kayıp süreçleri",
      "Yaşam olaylarına uyum",
      "Sosyal destek kaynaklarının güçlendirilmesi",
      "Psikososyal dayanıklılık",
      "Günlük yaşam işlevselliğinin desteklenmesi",
      "Uygun sosyal kaynaklara yönlendirme",
      "Afet sonrası psikososyal destek",
      "Kayıp sonrası psikososyal destek",
      "Uyum sonrası psikososyal destek",
      "Göç ve yer değiştirme sonrası psikososyal destek"
    ]
  };

  const [servicesContent, setServicesContent] = useState(defaultServicesContent);
  const [processContent, setProcessContent] = useState(defaultProcessContent);
  const [aboutContent, setAboutContent] = useState(defaultAboutContent);

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
    if (!showSiteIntro) return;

    const introTimer = window.setTimeout(() => {
      setShowSiteIntro(false);
    }, 2100);

    return () => window.clearTimeout(introTimer);
  }, [showSiteIntro]);

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
      : window.location.hash === "#/icerikler"
      ? "content"
      : window.location.hash === "#/blog" || window.location.hash.startsWith("#/blog/")
      ? "blog"
      : window.location.hash === "#/iletisim"
      ? "contact"
      : window.location.hash === "#/randevu"
      ? "appointment"
      : window.location.hash === "#/gizlilik"
      ? "privacy"
      : window.location.hash === "#/aydinlatma"
      ? "disclosure"
      : window.location.hash === "#/cerez-politikasi"
      ? "cookies"
      : window.location.hash === "#/admin"
      ? "admin"
      : "home"
  );

  useEffect(() => {
    if (page !== "home") return;

    const timer = window.setInterval(() => {
      setHomeTextSlide((current) => (current + 1) % homeHeroTextSlides.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [page]);

  useEffect(() => {
    if (page === "home") setHomeTextSlide(0);
  }, [page]);

  useEffect(() => {
    let active = true;

    const loadHomeContent = async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("content")
        .eq("id", "homepage")
        .maybeSingle();

      if (!active) return;

      if (error) {
        console.error("Ana sayfa içeriği yüklenemedi:", error);
        return;
      }

      if (data?.content) {
        setHomeContent((current) => ({
          ...current,
          ...data.content,
        }));
      }
    };

    loadHomeContent();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;

    const loadServicesContent = async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("content")
        .eq("id", "services")
        .maybeSingle();

      if (!active) return;

      if (error) {
        console.error("Hizmetler içeriği yüklenemedi:", error);
        return;
      }

      if (data?.content) {
        setServicesContent((current) => ({
          ...current,
          ...data.content,
        }));
      }
    };

    loadServicesContent();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;

    const loadProcessContent = async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("content")
        .eq("id", "process")
        .maybeSingle();

      if (!active) return;
      if (error) {
        console.error("Süreç içeriği yüklenemedi:", error);
        return;
      }
      if (data?.content) {
        setProcessContent((current) => ({ ...current, ...data.content }));
      }
    };

    loadProcessContent();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    let active = true;
    const loadAboutContent = async () => {
      const { data, error } = await supabase.from("site_content").select("content").eq("id", "about").maybeSingle();
      if (!active) return;
      if (error) { console.error("Hakkımda içeriği yüklenemedi:", error); return; }
      if (data?.content) setAboutContent((current) => ({ ...current, ...data.content }));
    };
    loadAboutContent();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    let active = true;

    const loadBlogContent = async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("content")
        .eq("id", "blog")
        .maybeSingle();

      if (!active) return;
      if (error) {
        console.error("Blog içeriği yüklenemedi:", error);
        return;
      }

      if (data?.content) {
        setBlogContent((current) => ({
          ...current,
          ...data.content,
          posts: Array.isArray(data.content.posts) ? data.content.posts : current.posts,
          categories: Array.isArray(data.content.categories) ? data.content.categories : current.categories,
        }));
      }
    };

    loadBlogContent();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    const seo = {
      home: ["Kaan Özkan | Sosyal Hizmet Uzmanı & Aile Danışmanı", "Kaan Özkan ile bireysel, çift ve aile danışmanlığı; psikososyal destek ve profesyonel danışmanlık hizmetleri hakkında bilgi alın."],
      about: ["Hakkımda | Kaan Özkan", "Sosyal Hizmet Uzmanı ve Aile Danışmanı Kaan Özkan'ın mesleki yolculuğu, saha deneyimi ve danışmanlık yaklaşımı."],
      services: ["Çalışma Alanları | Kaan Özkan", "Bireysel danışmanlık, çift ve aile danışmanlığı, yas, boşanma ve farklı psikososyal güçlüklerde profesyonel çalışma alanlarını inceleyin."],
      process: ["Danışmanlık Süreci | Kaan Özkan", "Danışmanlık sürecinin nasıl ilerlediğini inceleyin."],
      blog: ["Blog | Kaan Özkan", "Aile, ilişkiler, psikososyal destek, kişisel gelişim ve sosyal hizmet alanlarında bilgilendirici yazıları keşfedin."],
      contact: ["İletişim | Kaan Özkan", "Kaan Özkan ile telefon veya e-posta üzerinden iletişime geçin ve randevu süreci hakkında bilgi alın."],
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

    const motionTargets = document.querySelectorAll(
      ".reveal, .svc52SectionTitle, .svc73Card, .svc52Trust, .aboutDirectHeader__title, .aboutDirectArticle, .contact80Hero__copy, .contact80Intro, .contact80Card, .contact80Appointment, .prc53SectionTitle, .prc53Step, .prc53Trust > div, .prc53Testimonials__head, .prc53TestimonialCard"
    );

    motionTargets.forEach((el, index) => {
      el.classList.add("motionReveal");
      el.style.setProperty("--motion-delay", `${Math.min(index % 5, 4) * 70}ms`);
      observer.observe(el);
    });

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
          : window.location.hash === "#/icerikler"
          ? "content"
          : window.location.hash === "#/blog" || window.location.hash.startsWith("#/blog/")
          ? "blog"
          : window.location.hash === "#/iletisim"
          ? "contact"
          : window.location.hash === "#/randevu"
          ? "appointment"
          : window.location.hash === "#/gizlilik"
          ? "privacy"
          : window.location.hash === "#/aydinlatma"
          ? "disclosure"
          : window.location.hash === "#/cerez-politikasi"
          ? "cookies"
          : window.location.hash === "#/admin"
          ? "admin"
          : "home";
      setPage(nextPage);
      setBlogSlug(
        window.location.hash.startsWith("#/blog/")
          ? window.location.hash.replace("#/blog/", "")
          : ""
      );
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
  }, [page]);

  const handleHomeHeroPointer = (event) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const hero = event.currentTarget;
    const rect = hero.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    hero.style.setProperty("--hero-x", x.toFixed(3));
    hero.style.setProperty("--hero-y", y.toFixed(3));
  };

  const resetHomeHeroPointer = (event) => {
    event.currentTarget.style.setProperty("--hero-x", "0");
    event.currentTarget.style.setProperty("--hero-y", "0");
  };

  return (
    <>
      <style>{styles}</style>

      {showSiteIntro && (
        <div className="site95Intro" aria-hidden="true">
          <div className="site95Intro__halo" />
          <div className="site95Intro__content">
            <div className="site95Intro__logo">
              <img src={kaanOzkanEmblem} alt="" />
            </div>

            <span className="site95Intro__eyebrow">HOŞ GELDİNİZ</span>
            <strong className="site95Intro__name">KAAN ÖZKAN</strong>
            <p className="site95Intro__role">
              Sosyal Hizmet Uzmanı <i>·</i> Aile Danışmanı
            </p>

            <div className="site95Intro__progress"><span /></div>
          </div>
        </div>
      )}

      <div className="pageShell">
        <div
          className="scrollProgress"
          style={{ transform: `scaleX(${scrollProgress})` }}
          aria-hidden="true"
        />
        {page !== "admin" && (
        <a
          className="podcastTopStrip podcastTopStrip--spotify"
          href="#/icerikler"
          onClick={() => setMenuOpen(false)}
          aria-label="Podcast içeriklerine git"
        >
          <span className="podcastTopStrip__brand">
            <span className="podcastTopStrip__spotifyIcon" aria-hidden="true">
              <svg viewBox="0 0 24 24" role="img">
                <circle cx="12" cy="12" r="12" fill="currentColor" />
                <path
                  d="M17.55 16.42a.74.74 0 0 1-1.02.25c-2.8-1.71-6.32-2.1-10.46-1.15a.74.74 0 1 1-.33-1.44c4.53-1.04 8.42-.6 11.56 1.31.35.22.46.67.25 1.03Zm1.46-3.24a.92.92 0 0 1-1.27.3c-3.2-1.96-8.08-2.53-11.86-1.38a.92.92 0 1 1-.54-1.76c4.33-1.31 9.7-.68 13.37 1.56.43.26.56.83.3 1.28Zm.13-3.37C15.3 7.53 8.96 7.32 5.29 8.43a1.11 1.11 0 1 1-.65-2.12c4.21-1.28 11.22-1.03 15.63 1.58a1.11 1.11 0 0 1-1.13 1.92Z"
                  fill="#16b957"
                />
              </svg>
            </span>
            <strong>PODCAST</strong>
          </span>

          <span className="podcastTopStrip__center">
            <span className="podcastTopStrip__mic">🎙️</span>
            <span>Yeni bölümler ve içerikler burada</span>
          </span>

          <span className="podcastTopStrip__listen">
            <span className="podcastTopStrip__play">▶</span>
            Şimdi Dinle
          </span>
        </a>
      )}
      <header className={page === "admin" ? "topbar" : "topbar topbar--light"}>
          <a href="#anasayfa" className="brand brand--newLogo" onClick={() => setMenuOpen(false)}>
            <span className="brandEmblemWrap">
              <img
                loading="lazy" decoding="async" className="brandEmblem"
                src={kaanOzkanEmblem}
                alt=""
                aria-hidden="true"
              />
            </span>
            <span className="brandIdentity">
              <small>SOSYAL HİZMET UZMANI</small>
              <em>AİLE DANIŞMANI</em>
              <strong>KAAN ÖZKAN</strong>
            </span>
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
              href="#/icerikler"
              className={page === "content" ? "is-active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              İçerikler
            </a>

            <a
              href="#/blog"
              className={page === "blog" ? "is-active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              Blog
            </a>

            <a
              href="#/iletisim"
              className={page === "contact" ? "is-active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              İletişim
            </a>
          </nav>

          <a className="topCta" href="#/randevu">
            <Icon name="calendar" size={17} />
            RANDEVU AL
          </a>

          <button className="menuBtn" onClick={() => setMenuOpen((v) => !v)} aria-label="Menüyü aç">
            <span />
            <span />
          </button>
        </header>

        {page === "about" ? (
          <AboutDetailPage content={aboutContent} />
        ) : page === "services" ? (
          <ServicesDetailPage content={servicesContent} />
        ) : page === "process" ? (
          <ProcessDetailPage content={processContent} />
        ) : page === "content" ? (
          <ContentDetailPage />
        ) : page === "blog" ? (
          blogSlug ? <BlogArticlePage slug={blogSlug} content={blogContent} /> : <BlogPage content={blogContent} />
        ) : page === "contact" ? (
          <ContactDetailPage />
        ) : page === "appointment" ? (
          <AppointmentDemoPage />
        ) : page === "privacy" ? (
          <LegalPage type="privacy" />
        ) : page === "disclosure" ? (
          <LegalPage type="disclosure" />
        ) : page === "cookies" ? (
          <LegalPage type="cookies" />
        ) : page === "admin" ? (
          <AdminDemoPage />
        ) : (
        <main>
          <section
              className="lightHomeHero"
              id="anasayfa"
              onMouseMove={handleHomeHeroPointer}
              onMouseLeave={resetHomeHeroPointer}
            >
            <div className="lightHomeHero__visual">
              <img
                loading="lazy" decoding="async" src={servicesHeroRoom}
                alt="Sıcak ve sakin bir danışmanlık görüşme ortamı"
              />
              <div className="lightHomeHero__visualShade" />
            </div>

            <div className="lightHomeHero__content">
              <div className="lightHomeHero__rotator" key={homeTextSlide}>
                <span className="lightHomeHero__eyebrow">{activeHomeText.eyebrow}</span>

                <h1>
                  {activeHomeText.titleLine}
                  <strong>{activeHomeText.titleAccent}</strong>
                </h1>

                <p>{activeHomeText.description}</p>
              </div>

              <div className="lightHomeHero__actions">
                <a href="#/randevu" className="lightHomeHero__primary">
                  {homeContent.primaryCta}
                </a>

                <a href="#/hizmetler" className="lightHomeHero__secondary">
                  {homeContent.secondaryCta}
                </a>
              </div>
            </div>

            <div className="lightHomeHero__trust">
              <article>
                <div><Icon name="shield" size={25} /></div>
                <span>
                  <strong>{homeContent.trust1Title}</strong>
                  <p>{homeContent.trust1Text}</p>
                </span>
              </article>

              <article>
                <div><Icon name="check" size={25} /></div>
                <span>
                  <strong>{homeContent.trust2Title}</strong>
                  <p>{homeContent.trust2Text}</p>
                </span>
              </article>

              <article>
                <div><Icon name="user" size={25} /></div>
                <span>
                  <strong>{homeContent.trust3Title}</strong>
                  <p>{homeContent.trust3Text}</p>
                </span>
              </article>
            </div>
          </section>

          <section className="homeServicesShowcase">
            <div className="homeServicesShowcase__head reveal">
              <div>
                <span className="homeServicesShowcase__eyebrow">{homeContent.servicesEyebrow}</span>
                <h2>
                  {homeContent.servicesTitle}
                  <strong>{homeContent.servicesTitleAccent}</strong>
                </h2>
              </div>

              <p>{homeContent.servicesDescription}</p>
            </div>

            <div className="homeServicesShowcase__grid">
              <article className="homeServiceFeature reveal">
                <div className="homeServiceFeature__icon">
                  <Icon name="heart" size={25} />
                </div>
                <span>01</span>
                <h3>{homeContent.service1Title}</h3>
                <ul>
                  <li>{homeContent.service1Item1}</li>
                  <li>{homeContent.service1Item2}</li>
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
                <h3>{homeContent.service2Title}</h3>
                <ul>
                  <li>{homeContent.service2Item1}</li>
                  <li>{homeContent.service2Item2}</li>
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
                <h3>{homeContent.service3Title}</h3>
                <ul>
                  <li>{homeContent.service3Item1}</li>
                  <li>{homeContent.service3Item2}</li>
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
                    Amaç yalnızca sorunlar karşısında baş etme kapasitenizi arttırmak değil;
                    konfor alanınızın kalitesini, ilişkilerinizdeki çatışmayı ve bireysel iyilik
                    halinizi pozitif davranışçı bakış açısıyla güçlendirmektir.
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


          

          <section className="homeEditorialVisuals reveal" aria-label="Kaan Özkan ve danışmanlık yaklaşımı">
            <div className="homeEditorialVisuals__portrait">
              <img loading="lazy" decoding="async" src={aboutPhoto} alt="Sosyal Hizmet Uzmanı ve Aile Danışmanı Kaan Özkan" />
              <div className="homeEditorialVisuals__caption">
                <span>KAAN ÖZKAN</span>
                <strong>İnsan odaklı, etik ve kişiye özgü yaklaşım.</strong>
                <a href="#/hakkimda">Hakkımda <Icon name="arrow" size={14}/></a>
              </div>
            </div>

            <div className="homeEditorialVisuals__side">
              <article>
                <img loading="lazy" decoding="async" src={processHeroDesk} alt="Profesyonel danışmanlık süreci" />
                <div><span>01</span><strong>Profesyonel Süreç</strong></div>
              </article>
              <article>
                <img loading="lazy" decoding="async" src={heroSlide2} alt="Psikososyal destek ve danışmanlık" />
                <div><span>02</span><strong>Güvenli Görüşme Alanı</strong></div>
              </article>
            </div>
          </section>

          <section className="homeScopeStrip reveal">
            <div><Icon name="shield" size={20} /></div>
            <p>
              Danışmanlık hizmetleri sosyal hizmet müdahale yaklaşımları ve aile danışmanlığı kapsamında sunulur.
            </p>
          </section>

          <section className="homeTrustStatement reveal">
            <div className="homeTrustStatement__mark">“</div>
            <div>
              <span>{homeContent.trustStatementEyebrow}</span>
              <h2>{homeContent.trustStatementTitle}</h2>
              <p>{homeContent.trustStatementText}</p>
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
              <p>Görüşme ve randevu hakkında bilgi almak için telefon veya e-posta üzerinden iletişime geçebilirsiniz.</p>
            </div>

            <div className="contactGrid">
              <a href="tel:+905376319371" className="contactCard reveal">
                <div className="contactIcon"><Icon name="phone" size={22} /></div>
                <strong>Telefon</strong>
                <span>+90 537 631 93 71</span>
              </a>

              <a href="mailto:ailedanismanikaanozkan@gmail.com" className="contactCard reveal">
                <div className="contactIcon"><Icon name="mail" size={22} /></div>
                <strong>E-posta</strong>
                <span>ailedanismanikaanozkan@gmail.com</span>
              </a>
            </div>
          </section>

          <footer className="premiumFooter">
            <div className="premiumFooter__top">
              <a href="#/anasayfa" className="premiumFooter__brand">
                <span className="brandEmblemWrap">
                  <img loading="lazy" decoding="async" className="brandEmblem" src={kaanOzkanEmblem} alt="" aria-hidden="true" />
                </span>
                <span>
                  <strong>KAAN ÖZKAN</strong>
                  <small>SOSYAL HİZMET UZMANI · AİLE DANIŞMANI</small>
                </span>
              </a>

              <div className="premiumFooter__nav">
                <a href="#/anasayfa">Ana Sayfa</a>
                <a href="#/hizmetler">Hizmetler</a>
                <a href="#/hakkimda">Hakkımda</a>
                <a href="#/surec">Süreç</a>
                <a href="#/icerikler">İçerikler</a>
                <a href="#/blog">Blog</a>
                <a href="#/iletisim">İletişim</a>
              </div>

              <div className="premiumFooter__contact">
                <a href="tel:+905376319371">
                  <small>Telefon</small>
                  <strong>+90 537 631 93 71</strong>
                </a>
                <a href="mailto:ailedanismanikaanozkan@gmail.com">
                  <small>E-posta</small>
                  <strong>ailedanismanikaanozkan@gmail.com</strong>
                </a>
              </div>

              <a href="#/randevu" className="premiumFooter__cta">
                ÜCRETSİZ ÖN GÖRÜŞME
                <Icon name="arrow" size={16} />
              </a>
            </div>

            <div className="premiumFooter__bottom">
              <div className="premiumFooter__copyright">
                <span>© 2026 Kaan Özkan — Tüm hakları saklıdır.</span>
                <span className="premiumFooter__creator">
                  Web Tasarım &amp; Geliştirme <strong>CB Labs</strong>
                  <i>·</i>
                  
                </span>
              </div>
              <div className="premiumFooter__legal">
                <a href="#/gizlilik">Gizlilik</a>
                <span>•</span>
                <a href="#/aydinlatma">Aydınlatma Metni</a>
                <span>•</span>
                <a href="#/cerez-politikasi">Çerez Politikası</a>
              </div>
            </div>
          </footer>
        </main>
        )}
      </div>
    </>
  );
}







function BlogPage({ content = defaultBlogContent }) {
  const [category, setCategory] = useState("Tümü");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(4);

  const categories = Array.isArray(content.categories) && content.categories.length
    ? content.categories
    : blogCategories;

  const publishedPosts = (Array.isArray(content.posts) ? content.posts : [])
    .filter((post) => post.status !== "draft")
    .sort((a, b) => Number(a.sortOrder || 999) - Number(b.sortOrder || 999));

  const normalizedQuery = query.trim().toLocaleLowerCase("tr-TR");
  const filteredPosts = publishedPosts.filter((post) => {
    const categoryMatch =
      category === "Tümü" ||
      String(post.category || "").toLocaleLowerCase("tr-TR").includes(category.toLocaleLowerCase("tr-TR"));
    const queryMatch =
      !normalizedQuery ||
      `${post.title || ""} ${post.excerpt || ""} ${post.category || ""}`
        .toLocaleLowerCase("tr-TR")
        .includes(normalizedQuery);
    return categoryMatch && queryMatch;
  });

  const featured =
    publishedPosts.find((post) => post.featured) ||
    publishedPosts[publishedPosts.length - 1];

  const featuredId = featured?.id || featured?.slug;
  const cardPosts = filteredPosts
    .filter((post) => (post.id || post.slug) !== featuredId)
    .slice(0, visibleCount);

  return (
    <main className="blog98Page">
      <section className="blog98Hero">
        <div className="blog98Hero__image" aria-hidden="true">
          <img
            src={content.heroImage || defaultBlogContent.heroImage}
            alt=""
            onError={(e)=>{e.currentTarget.src=servicesHeroRoom}}
          />
        </div>
        <div className="blog98Hero__shade" />

        <div className="blog98Hero__copy">
          <span>{content.heroEyebrow || "BLOG"}</span>
          <h1>
            {content.heroTitle || "Bilgi, farkındalık"}
            <strong>{content.heroAccent || "ve güçlü yarınlar."}</strong>
          </h1>
          <p>{content.heroDescription || defaultBlogContent.heroDescription}</p>
          <a href="#blog98Yazilar">
            TÜM YAZILARI KEŞFET
            <Icon name="arrow" size={16}/>
          </a>
        </div>
      </section>

      <section className="blog98Content" id="blog98Yazilar">
        <div className="blog98Toolbar">
          <div className="blog98Categories">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                className={category === item ? "is-active" : ""}
                onClick={() => { setCategory(item); setVisibleCount(4); }}
              >
                {item}
              </button>
            ))}
          </div>

          <label className="blog98Search">
            <Icon name="search" size={18}/>
            <input
              value={query}
              onChange={(e)=>{setQuery(e.target.value);setVisibleCount(4);}}
              placeholder="Ara..."
            />
          </label>
        </div>

        <div className="blog98Grid">
          {cardPosts.map((post) => (
            <article className="blog98Card" key={post.id || post.slug}>
              <a className="blog98Card__image" href={`#/blog/${post.slug}`}>
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  decoding="async"
                  onError={(e)=>{e.currentTarget.src=servicesHeroRoom}}
                />
              </a>

              <div className="blog98Card__body">
                <div className="blog98Card__meta">
                  <span>{post.category}</span>
                  <time>{post.date}</time>
                </div>

                <h2><a href={`#/blog/${post.slug}`}>{post.title}</a></h2>
                <p>{post.excerpt}</p>

                <div className="blog98Card__footer">
                  <small><Icon name="clock" size={15}/>{post.readTime}</small>
                  <a href={`#/blog/${post.slug}`}>
                    Devamını Oku
                    <Icon name="arrow" size={14}/>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {cardPosts.length === 0 && (
          <div className="blog98Empty">Aramanızla eşleşen bir yazı bulunamadı.</div>
        )}

        {visibleCount < filteredPosts.filter((post)=>(post.id || post.slug)!==featuredId).length && (
          <button
            className="blog98More"
            type="button"
            onClick={()=>setVisibleCount((current)=>current+4)}
          >
            DAHA FAZLA YAZI YÜKLE
            <span>↻</span>
          </button>
        )}

        {featured && (
          <article className="blog98Featured">
            <div className="blog98Featured__copy">
              <span>ÖNE ÇIKAN YAZI</span>
              <h2>{featured.title}</h2>
              <p>{featured.excerpt}</p>
              <a href={`#/blog/${featured.slug}`}>
                YAZININ TAMAMINI OKU
                <Icon name="arrow" size={16}/>
              </a>

              <div className="blog98Featured__meta">
                <small><Icon name="clock" size={14}/>{featured.readTime}</small>
                <small><Icon name="calendar" size={14}/>{featured.date}</small>
              </div>
            </div>

            <a className="blog98Featured__image" href={`#/blog/${featured.slug}`}>
              <img
                src={featured.image}
                alt={featured.title}
                loading="lazy"
                decoding="async"
                onError={(e)=>{e.currentTarget.src=processHeroDesk}}
              />
            </a>
          </article>
        )}
      </section>
    </main>
  );
}

function BlogArticlePage({ slug, content = defaultBlogContent }) {
  const posts = (Array.isArray(content.posts) ? content.posts : []).filter((post)=>post.status !== "draft");
  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    return (
      <main className="blog99NotFound">
        <img src={kaanOzkanEmblem} alt="" />
        <span>BLOG</span>
        <h1>Bu yazı bulunamadı.</h1>
        <p>Yazı kaldırılmış veya bağlantısı değiştirilmiş olabilir.</p>
        <a href="#/blog">Blog'a Dön</a>
      </main>
    );
  }

  const related = posts.filter((item) => item.slug !== post.slug).slice(0, 3);
  const paragraphs = Array.isArray(post.body)
    ? post.body
    : String(post.body || "").split(/\n\s*\n/).map((item)=>item.trim()).filter(Boolean);

  return (
    <main className="blog99Article">
      <section className="blog99Hero">
        <a href="#/blog" className="blog99Back">← Blog'a Dön</a>
        <div className="blog99Hero__image">
          <img src={post.image} alt={post.title} onError={(e)=>{e.currentTarget.src=servicesHeroRoom}} />
        </div>
        <div className="blog99Hero__shade" />
        <div className="blog99Hero__copy">
          <span>{post.category}</span>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
          <div>
            <small><Icon name="calendar" size={15}/>{post.date}</small>
            <small><Icon name="clock" size={15}/>{post.readTime}</small>
          </div>
        </div>
      </section>

      <section className="blog99Body">
        <article>
          <div className="blog99Lead">
            <span>KAAN ÖZKAN</span>
            <strong>Sosyal Hizmet Uzmanı · Aile Danışmanı</strong>
          </div>

          {paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}

          {post.quote && <blockquote>“{post.quote}”</blockquote>}

          <p>
            Bu içerik genel bilgilendirme amacıyla hazırlanmıştır. Kişisel
            ihtiyaçların değerlendirilmesi ve uygun destek sürecinin belirlenmesi
            için profesyonel görüşme gerekebilir.
          </p>
        </article>

        <aside>
          <div className="blog99Aside__brand">
            <img src={kaanOzkanEmblem} alt="" />
            <span><strong>Kaan Özkan</strong><small>Sosyal Hizmet Uzmanı · Aile Danışmanı</small></span>
          </div>
          <p>Danışmanlık süreci hakkında bilgi almak veya ön görüşme oluşturmak için iletişime geçebilirsiniz.</p>
          <a href="#/randevu">Ücretsiz Ön Görüşme<Icon name="arrow" size={15}/></a>
        </aside>
      </section>

      <section className="blog99Related">
        <div className="blog99Related__head">
          <span>DİĞER YAZILAR</span>
          <h2>Okumaya devam edin.</h2>
        </div>
        <div className="blog99Related__grid">
          {related.map((item) => (
            <a href={`#/blog/${item.slug}`} key={item.id || item.slug}>
              <img src={item.image} alt="" loading="lazy" onError={(e)=>{e.currentTarget.src=servicesHeroRoom}}/>
              <span>{item.category}</span>
              <strong>{item.title}</strong>
              <small>{item.readTime}</small>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}


function ContactDetailPage() {
  return (
    <main className="contact80Page">
      <section className="contact80Hero">
        <a className="contact80Back" href="#/">
          <span>←</span>
          Ana Sayfaya Dön
        </a>

        <div className="contact80Hero__copy">
          <span>İLETİŞİM</span>
          <h1>
            İletişime
            <strong>Geçin</strong>
          </h1>
          <p>
            Görüşme ve randevu süreçleri hakkında bilgi almak için telefon veya
            e-posta üzerinden doğrudan iletişime geçebilirsiniz.
          </p>
        </div>

        <div className="contact80Hero__mark">
          <div className="brandEmblemWrap">
            <img className="brandEmblem" src={kaanOzkanEmblem} alt="" aria-hidden="true" />
          </div>
          <div>
            <small>SOSYAL HİZMET UZMANI</small>
            <span>AİLE DANIŞMANI</span>
            <strong>KAAN ÖZKAN</strong>
          </div>
        </div>
      </section>

      <section className="contact80Body">
        <div className="contact80Intro">
          <span>DOĞRUDAN İLETİŞİM</span>
          <h2>Size uygun kanaldan ulaşabilirsiniz.</h2>
          <p>
            Mesajlaşma uygulamaları ve konum bilgisi yerine, iletişim yalnızca
            telefon ve e-posta üzerinden yürütülmektedir.
          </p>
        </div>

        <div className="contact80Grid">
          <a className="contact80Card" href="tel:+905376319371">
            <div className="contact80Card__icon">
              <Icon name="phone" size={26} />
            </div>
            <span>TELEFON</span>
            <strong>+90 537 631 93 71</strong>
            <p>Görüşme ve randevu hakkında bilgi almak için arayabilirsiniz.</p>
            <b>
              Ara <Icon name="arrow" size={15} />
            </b>
          </a>

          <a
            className="contact80Card"
            href="mailto:ailedanismanikaanozkan@gmail.com"
          >
            <div className="contact80Card__icon">
              <Icon name="mail" size={26} />
            </div>
            <span>E-POSTA</span>
            <strong>ailedanismanikaanozkan@gmail.com</strong>
            <p>
              Detaylı bilgi ve görüşme talebinizi e-posta üzerinden iletebilirsiniz.
            </p>
            <b>
              E-posta Gönder <Icon name="arrow" size={15} />
            </b>
          </a>
        </div>

        <div className="contact80Appointment">
          <div>
            <span>RANDEVU</span>
            <h3>Doğrudan randevu talebi oluşturmak ister misiniz?</h3>
            <p>
              Uygun hizmeti, görüşme biçimini ve tarih-saat seçeneğini belirleyerek
              güvenli randevu formunu kullanabilirsiniz.
            </p>
          </div>

          <a href="#/randevu">
            Ücretsiz Ön Görüşme
            <Icon name="arrow" size={16} />
          </a>
        </div>
      </section>
    </main>
  );
}

function AppointmentDemoPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [form, setForm] = useState({
    service: "",
    format: "",
    date: "",
    time: "",
    name: "",
    age: "",
    phone: "",
    email: "",
    note: "",
    kvkk: false,
  });

  const services = [
    ["individual", "user", "Bireysel Danışmanlık", "Bireysel güçlükler, yaşam olayları ve psikososyal destek süreçleri."],
    ["family", "users", "Aile Danışmanlığı", "Aile içi iletişim, roller, sınırlar ve ilişki dinamikleri."],
    ["couple", "heart", "Çift Danışmanlığı", "İletişim, güven, çatışma, ayrılık ve ilişki süreçleri."],
    ["other", "message", "Kararsızım / Ön Görüşme", "Hangi hizmetin uygun olduğunu ilk görüşmede birlikte değerlendirelim."],
  ];
  const times = ["10:00","11:30","13:00","14:30","16:00","17:30","19:00"];

  const can2 = form.service && form.format;
  const can3 = form.date && form.time;
  const canSubmit = form.name.trim() && form.age.trim() && form.phone.trim() && form.email.trim() && form.kvkk;

  const submit = async (e) => {
    e.preventDefault();
    if (!canSubmit || submitting) return;

    setSubmitting(true);
    setSubmitError("");

    const selectedService =
      services.find((service) => service[0] === form.service)?.[2] || form.service;

    try {
      const { error } = await supabase
        .from("appointments")
        .insert({
          service: selectedService,
          format: form.format,
          appointment_date: form.date,
          appointment_time: form.time,
          full_name: form.name.trim(),
          age: Number(form.age),
          phone: form.phone.trim(),
          email: form.email.trim().toLowerCase(),
          note: form.note.trim() || null,
          status: "pending",
        });

      if (error) {
        if (error.code === "23505") {
          setSubmitError(
            "Seçtiğiniz tarih ve saat az önce başka bir randevu için ayrılmış olabilir. Lütfen geri dönüp farklı bir saat seçin."
          );
          return;
        }

        console.error("Randevu kayıt hatası:", error);
        setSubmitError(
          "Randevu talebiniz şu anda kaydedilemedi. Lütfen birkaç dakika sonra tekrar deneyin."
        );
        return;
      }

      setSubmitted(true);
    } catch (error) {
      console.error("Supabase bağlantı hatası:", error);
      setSubmitError(
        "Bağlantı sırasında bir sorun oluştu. İnternet bağlantınızı kontrol edip tekrar deneyin."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main className="apt60Success">
        <div className="apt60Success__card">
          <div className="apt60Success__icon"><Icon name="check" size={36} /></div>
          <span>RANDEVU TALEBİ ALINDI</span>
          <h1>Teşekkürler, {form.name.split(" ")[0]}.</h1>
          <p>
            Randevu talebiniz başarıyla kaydedildi. Talebiniz incelendikten sonra
            sizinle telefon veya e-posta üzerinden iletişime geçilecektir.
          </p>
          <div className="apt60Success__summary">
            <div><small>Hizmet</small><strong>{services.find((s) => s[0] === form.service)?.[2]}</strong></div>
            <div><small>Görüşme</small><strong>{form.format}</strong></div>
            <div><small>Tarih</small><strong>{form.date}</strong></div>
            <div><small>Saat</small><strong>{form.time}</strong></div>
          </div>
          <a href="#/">Ana Sayfaya Dön <Icon name="arrow" size={15} /></a>
        </div>
      </main>
    );
  }

  return (
    <main className="apt60">
      <section className="apt60Hero">
        <div className="apt60Hero__grid" />
        <a className="apt60Back" href="#/"><span>←</span> Ana Sayfaya Dön</a>

        <div className="apt60Hero__copy">
          <span>ÜCRETSİZ ÖN GÖRÜŞME</span>
          <h1>İlk adımı<br/><strong>birlikte atalım.</strong></h1>
          <p>
            İhtiyacınızı kısaca anlayalım, uygun danışmanlık biçimini birlikte
            belirleyelim ve sürecin sizin için doğru olup olmadığını değerlendirelim.
          </p>

          <div className="apt60Hero__trust">
            <div><Icon name="shield" size={20}/><span><strong>Gizlilik</strong><small>Bilgileriniz özenle korunur.</small></span></div>
            <div><Icon name="clock" size={20}/><span><strong>Ücretsiz Ön Görüşme</strong><small>İhtiyacı netleştirme odaklı.</small></span></div>
          </div>
        </div>

        <aside className="apt60Hero__aside">
          <span>NASIL İLERLİYOR?</span>
          {[
            ["01","Hizmeti seçin","Size en yakın çalışma alanını belirleyin."],
            ["02","Tarih ve saat","Uygun görüşme zamanını seçin."],
            ["03","Bilgilerinizi bırakın","Size ulaşabilmemiz için temel bilgileri girin."],
            ["04","Onay","Gerçek sistemde talep onay sürecine geçer."],
          ].map((x) => (
            <div key={x[0]}><b>{x[0]}</b><p><strong>{x[1]}</strong><small>{x[2]}</small></p></div>
          ))}
        </aside>
      </section>

      <section className="apt60FormArea">
        <div className="apt60Progress">
          {[1,2,3].map((n) => (
            <div key={n} className={step >= n ? "is-active" : ""}>
              <span>{step > n ? "✓" : n}</span>
              <p>{n === 1 ? "Hizmet" : n === 2 ? "Zaman" : "Bilgiler"}</p>
            </div>
          ))}
        </div>

        <form className="apt60Card" onSubmit={submit}>
          {step === 1 && (
            <div className="apt60Step">
              <div className="apt60Step__head">
                <span>01 / HİZMET SEÇİMİ</span>
                <h2>Hangi konuda görüşmek istersiniz?</h2>
                <p>Kararsızsanız “Ön Görüşme” seçeneğini tercih edebilirsiniz.</p>
              </div>

              <div className="apt60Services">
                {services.map((s) => (
                  <button key={s[0]} type="button" className={form.service === s[0] ? "is-selected" : ""} onClick={() => setForm({...form, service:s[0]})}>
                    <div><Icon name={s[1]} size={25}/></div>
                    <strong>{s[2]}</strong>
                    <p>{s[3]}</p>
                    <span>{form.service === s[0] ? "✓" : "→"}</span>
                  </button>
                ))}
              </div>

              <div className="apt60Format">
                <span>GÖRÜŞME BİÇİMİ</span>
                <div>
                  {[
                    ["Online Görüşme","video"],
                    ["Yüz Yüze Görüşme","map"],
                  ].map((x) => (
                    <button key={x[0]} type="button" className={form.format === x[0] ? "is-selected" : ""} onClick={() => setForm({...form, format:x[0]})}>
                      <Icon name={x[1]} size={20}/><strong>{x[0]}</strong>
                    </button>
                  ))}
                </div>
              </div>

              <div className="apt60Actions">
                <span />
                <button type="button" disabled={!can2} onClick={() => setStep(2)}>Tarih ve Saat Seç <Icon name="arrow" size={15}/></button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="apt60Step">
              <div className="apt60Step__head">
                <span>02 / TARİH & SAAT</span>
                <h2>Size uygun zamanı seçin.</h2>
                <p>Şimdilik demo saatler gösteriliyor; gerçek müsaitlik takvime bağlanacak.</p>
              </div>

              <div className="apt60DateGrid">
                <label>
                  <span>Görüşme Tarihi</span>
                  <input type="date" value={form.date} onChange={(e) => setForm({...form, date:e.target.value, time:""})}/>
                </label>
                <div className="apt60Times">
                  <span>Uygun Saat</span>
                  <div>
                    {times.map((t) => <button key={t} type="button" className={form.time === t ? "is-selected" : ""} onClick={() => setForm({...form,time:t})}>{t}</button>)}
                  </div>
                </div>
              </div>

              <div className="apt60Notice"><Icon name="info" size={19}/><p>Gerçek sistemde dolu saatler otomatik kapanacak ve aynı saate iki kişi randevu oluşturamayacak.</p></div>

              <div className="apt60Actions">
                <button type="button" className="is-secondary" onClick={() => setStep(1)}>← Geri</button>
                <button type="button" disabled={!can3} onClick={() => setStep(3)}>Bilgilerime Geç <Icon name="arrow" size={15}/></button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="apt60Step">
              <div className="apt60Step__head">
                <span>03 / İLETİŞİM BİLGİLERİ</span>
                <h2>Size nasıl ulaşabiliriz?</h2>
                <p>Yalnızca randevu süreci için gerekli temel bilgileri istiyoruz.</p>
              </div>

              <div className="apt60Fields">
                <label><span>Ad Soyad *</span><input value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} placeholder="Adınız ve soyadınız" required/></label>
                <label><span>Yaş *</span><input type="number" min="1" max="120" value={form.age} onChange={(e)=>setForm({...form,age:e.target.value})} placeholder="Yaşınız" required/></label>
                <label><span>Telefon *</span><input type="tel" value={form.phone} onChange={(e)=>setForm({...form,phone:e.target.value})} placeholder="+90 5xx xxx xx xx" required/></label>
                <label><span>E-posta *</span><input type="email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} placeholder="ornek@email.com" required/></label>
                <label className="apt60Fields__full">
                  <span>Kısa Not <small>(isteğe bağlı)</small></span>
                  <textarea rows="5" value={form.note} onChange={(e)=>setForm({...form,note:e.target.value})} placeholder="Görüşme talebinizin genel çerçevesini kısaca yazabilirsiniz. Lütfen gerekli olmayan sağlık veya hassas kişisel bilgileri paylaşmayın."/>
                </label>
              </div>

              <div className="apt60Kvkk">
                <button type="button" className={form.kvkk ? "is-checked" : ""} onClick={()=>setForm({...form,kvkk:!form.kvkk})}>{form.kvkk ? "✓" : ""}</button>
                <p><a href="#/aydinlatma" target="_blank">KVKK Aydınlatma Metni</a>'ni okudum ve randevu süreci için gerekli kişisel verilerin işlenmesine ilişkin bilgilendirildim.</p>
              </div>

              <div className="apt60Sensitive"><Icon name="shield" size={20}/><p>Ön görüşme formunda tanı, ilaç kullanımı, ayrıntılı sağlık geçmişi veya gerekli olmayan hassas kişisel bilgilerinizi paylaşmayın.</p></div>

              {submitError && (
                <div className="apt70SubmitError" role="alert">
                  <Icon name="info" size={19} />
                  <p>{submitError}</p>
                </div>
              )}

              <div className="apt60Actions">
                <button
                  type="button"
                  className="is-secondary"
                  onClick={()=>setStep(2)}
                  disabled={submitting}
                >
                  ← Geri
                </button>
                <button type="submit" disabled={!canSubmit || submitting}>
                  {submitting ? "Randevu Kaydediliyor..." : "Randevu Talebini Oluştur"}
                  {!submitting && <Icon name="arrow" size={15}/>}
                </button>
              </div>
            </div>
          )}
        </form>
      </section>
    </main>
  );
}

function ContentDetailPage() {
  const [tab, setTab] = useState("videos");
  const [mediaItems, setMediaItems] = useState([]);
  const [mediaLoading, setMediaLoading] = useState(true);
  const [channelLinks, setChannelLinks] = useState({
    youtubeChannelUrl: "",
    spotifyChannelUrl: "",
  });

  useEffect(() => {
    let active = true;

    const loadMedia = async () => {
      setMediaLoading(true);

      const [{ data: items, error: itemsError }, { data: links, error: linksError }] =
        await Promise.all([
          supabase
            .from("media_contents")
            .select("id,type,title,description,category,url,duration,status,sort_order,created_at")
            .eq("status", "published")
            .order("sort_order", { ascending: true })
            .order("created_at", { ascending: false }),
          supabase
            .from("site_content")
            .select("content")
            .eq("id", "media_channels")
            .maybeSingle(),
        ]);

      if (!active) return;

      if (itemsError) {
        console.error("İçerikler yüklenemedi:", itemsError);
      } else {
        setMediaItems(items || []);
      }

      if (linksError) {
        console.error("Kanal bağlantıları yüklenemedi:", linksError);
      } else if (links?.content) {
        setChannelLinks((current) => ({ ...current, ...links.content }));
      }

      setMediaLoading(false);
    };

    loadMedia();

    return () => {
      active = false;
    };
  }, []);

  const videos = mediaItems.filter((item) => item.type === "youtube");
  const podcasts = mediaItems.filter((item) => item.type === "podcast");

  const youtubeId = (url) => {
    if (!url) return "";
    try {
      const parsed = new URL(url);
      if (parsed.hostname.includes("youtu.be")) return parsed.pathname.slice(1);
      if (parsed.searchParams.get("v")) return parsed.searchParams.get("v");
      const match = parsed.pathname.match(/\/(embed|shorts)\/([^/?]+)/);
      return match ? match[2] : "";
    } catch {
      return "";
    }
  };

  const openUrl = (url) => {
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="cnt57">
      <section className="cnt57Hero">
        <img
          loading="lazy" decoding="async" className="cnt57Hero__image"
          src={contentHeroMic}
          alt="Profesyonel podcast mikrofonu ve sıcak stüdyo ortamı"
        />
        <div className="cnt57Hero__shade" />

        <a className="cnt57Back" href="#/">
          <span>←</span>
          Ana Sayfaya Dön
        </a>

        <div className="cnt57Hero__copy">
          <span className="cnt57Eyebrow">İÇERİKLER</span>
          <h1>
            Videolar &
            <br />
            <strong>Podcastler</strong>
          </h1>
          <i />
          <p>
            İlişkiler, aile yaşamı, bireysel gelişim ve psikososyal güçlenme
            üzerine hazırlanan video ve podcast içerikleri.
          </p>
          <div className="cnt57Signature">Kaan Özkan</div>
        </div>

        <blockquote className="cnt57Quote">
          <b>“</b>
          <p>Bilgi, dönüştürür.<br/>Farkındalık, özgürleştirir.<br/>Paylaştıkça çoğalır.</p>
          <b>”</b>
        </blockquote>
      </section>

      <section className="cnt57Body">
        <div className="cnt57Tabs">
          <button
            type="button"
            className={tab === "videos" ? "is-active" : ""}
            onClick={() => setTab("videos")}
          >
            <Icon name="video" size={19} />
            VİDEOLAR
          </button>
          <button
            type="button"
            className={tab === "podcasts" ? "is-active" : ""}
            onClick={() => setTab("podcasts")}
          >
            <Icon name="mic" size={19} />
            PODCASTLER
          </button>
        </div>

        {mediaLoading ? (
          <div className="cnt74Loading">İçerikler yükleniyor...</div>
        ) : (
          <>
            {tab === "videos" && (
              <section className="cnt57Section">
                <div className="cnt57Section__head">
                  <div>
                    <Icon name="video" size={18} />
                    <span>YOUTUBE VİDEOLARI</span>
                  </div>
                  {channelLinks.youtubeChannelUrl && (
                    <a
                      href={channelLinks.youtubeChannelUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      YOUTUBE KANALINA GİT <Icon name="arrow" size={14} />
                    </a>
                  )}
                </div>

                {videos.length === 0 ? (
                  <div className="cnt74Empty">
                    Henüz yayınlanmış YouTube videosu bulunmuyor.
                  </div>
                ) : (
                  <div className="cnt57VideoGrid">
                    {videos.map((video, index) => {
                      const id = youtubeId(video.url);
                      return (
                        <article
                          className="cnt57VideoCard"
                          key={video.id}
                          onClick={() => openUrl(video.url)}
                        >
                          <div className="cnt57VideoCard__thumb">
                            {id ? (
                              <img
                                loading="lazy" decoding="async" src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
                                alt={video.title}
                              />
                            ) : (
                              <div className={"cnt57VideoCard__fallback cnt57VideoCard__fallback--" + ((index % 4) + 1)}>
                                <span>{video.title}</span>
                              </div>
                            )}
                            <div className="cnt57Play">▶</div>
                            {video.duration && <small>{video.duration}</small>}
                          </div>

                          <div className="cnt57VideoCard__body">
                            <h3>{video.title}</h3>
                            <p>{video.description}</p>
                            <div>
                              <span>YouTube</span>
                              {video.category && (
                                <>
                                  <span>•</span>
                                  <span>{video.category}</span>
                                </>
                              )}
                              <b><Icon name="arrow" size={14} /></b>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                )}
              </section>
            )}

            {tab === "podcasts" && (
              <section className="cnt57Section">
                <div className="cnt57Section__head">
                  <div>
                    <Icon name="mic" size={18} />
                    <span>PODCASTLER</span>
                  </div>
                  {channelLinks.spotifyChannelUrl && (
                    <a
                      href={channelLinks.spotifyChannelUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      SPOTIFY'DA AÇ <Icon name="arrow" size={14} />
                    </a>
                  )}
                </div>

                {podcasts.length === 0 ? (
                  <div className="cnt74Empty">
                    Henüz yayınlanmış podcast bölümü bulunmuyor.
                  </div>
                ) : (
                  <div className="cnt57PodcastGrid">
                    {podcasts.map((podcast, index) => (
                      <article className="cnt57PodcastCard" key={podcast.id}>
                        <div className="cnt57PodcastArt">
                          <div className="cnt57PodcastArt__ring">
                            <Icon name={index % 2 === 0 ? "mic" : "message"} size={34} />
                          </div>
                          <span>KAAN ÖZKAN</span>
                        </div>

                        <div className="cnt57PodcastInfo">
                          <small>#{String(index + 1).padStart(2, "0")}</small>
                          <h3>{podcast.title}</h3>
                          <p>{podcast.description}</p>
                          <div>
                            <strong>{podcast.duration || "Podcast"}</strong>
                            <button
                              type="button"
                              onClick={() => openUrl(podcast.url)}
                            >
                              ▶ Spotify'da Dinle
                            </button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </section>
            )}
          </>
        )}

        <div className="cnt74Channels">
          <div className="cnt74Channels__copy">
            <div className="cnt57Subscribe__icon">🔔</div>
            <div>
              <strong>Yeni içeriklerden haberdar olun.</strong>
              <p>
                YouTube kanalını ve Spotify podcast yayınlarını doğrudan takip
                edebilirsiniz.
              </p>
            </div>
          </div>

          <div className="cnt74Channels__buttons">
            {channelLinks.youtubeChannelUrl && (
              <a href={channelLinks.youtubeChannelUrl} target="_blank" rel="noreferrer">
                ▶ YouTube Kanalı
              </a>
            )}
            {channelLinks.spotifyChannelUrl && (
              <a
                className="is-spotify"
                href={channelLinks.spotifyChannelUrl}
                target="_blank"
                rel="noreferrer"
              >
                ● Spotify Podcast
              </a>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function AdminDemoPage() {
  const ADMIN_SESSION_KEY = "kaan_admin_browser_session";
  const ADMIN_INACTIVITY_MS = 30 * 60 * 1000;
  const [activeTab, setActiveTab] = useState("dashboard");
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [adminIntroVisible, setAdminIntroVisible] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [appointmentsLoading, setAppointmentsLoading] = useState(false);
  const [appointmentsError, setAppointmentsError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [appointmentFilter, setAppointmentFilter] = useState("all");

  const emptyHomeEditor = {
    eyebrow: "",
    titleLine: "",
    titleAccent: "",
    description: "",
    primaryCta: "",
    secondaryCta: "",
    trust1Title: "",
    trust1Text: "",
    trust2Title: "",
    trust2Text: "",
    trust3Title: "",
    trust3Text: "",
    servicesEyebrow: "",
    servicesTitle: "",
    servicesTitleAccent: "",
    servicesDescription: "",
    service1Title: "",
    service1Item1: "",
    service1Item2: "",
    service2Title: "",
    service2Item1: "",
    service2Item2: "",
    service3Title: "",
    service3Item1: "",
    service3Item2: "",
    trustStatementEyebrow: "",
    trustStatementTitle: "",
    trustStatementText: "",
  };
  const [homeEditor, setHomeEditor] = useState(emptyHomeEditor);
  const [homeEditorLoading, setHomeEditorLoading] = useState(false);
  const [homeEditorSaving, setHomeEditorSaving] = useState(false);
  const [homeEditorMessage, setHomeEditorMessage] = useState("");

  const emptyServicesEditor = {
    heroEyebrow: "",
    heroTitle: "",
    heroAccent: "",
    heroDescription: "",
    quickTitle: "",
    quickDescription: "",
    individualTitle: "",
    individualShort: "",
    individualItems: [],
    familyTitle: "",
    familyShort: "",
    familyItems: [],
    coupleTitle: "",
    coupleShort: "",
    coupleItems: [],
    psychosocialTitle: "",
    psychosocialShort: "",
    psychosocialItems: [],
  };
  const [servicesEditor, setServicesEditor] = useState(emptyServicesEditor);
  const [servicesEditorLoading, setServicesEditorLoading] = useState(false);
  const [servicesEditorSaving, setServicesEditorSaving] = useState(false);
  const [servicesEditorMessage, setServicesEditorMessage] = useState("");
  const [processEditor, setProcessEditor] = useState(defaultProcessContent);
  const [processEditorLoading, setProcessEditorLoading] = useState(false);
  const [processEditorSaving, setProcessEditorSaving] = useState(false);
  const [processEditorMessage, setProcessEditorMessage] = useState("");
  const [aboutEditor, setAboutEditor] = useState(defaultAboutContent);
  const [aboutEditorLoading, setAboutEditorLoading] = useState(false);
  const [aboutEditorSaving, setAboutEditorSaving] = useState(false);
  const [aboutEditorMessage, setAboutEditorMessage] = useState("");
  const [blogEditor, setBlogEditor] = useState(defaultBlogContent);
  const [blogEditorLoading, setBlogEditorLoading] = useState(false);
  const [blogEditorSaving, setBlogEditorSaving] = useState(false);
  const [blogEditorMessage, setBlogEditorMessage] = useState("");
  const [blogImageUploading, setBlogImageUploading] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [blogForm, setBlogForm] = useState({
    title: "",
    slug: "",
    category: "AİLE & İLİŞKİLER",
    date: new Date().toLocaleDateString("tr-TR", { day: "2-digit", month: "long", year: "numeric" }),
    readTime: "5 dk okuma",
    excerpt: "",
    image: "",
    body: "",
    quote: "",
    status: "published",
    featured: false,
    sortOrder: 100,
  });


  const [mediaItems, setMediaItems] = useState([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [mediaSaving, setMediaSaving] = useState(false);
  const [mediaMessage, setMediaMessage] = useState("");
  const [mediaForm, setMediaForm] = useState({
    type: "youtube",
    title: "",
    description: "",
    category: "",
    url: "",
    duration: "",
    status: "published",
    sort_order: 100,
  });
  const [channelEditor, setChannelEditor] = useState({
    youtubeChannelUrl: "",
    spotifyChannelUrl: "",
  });

  useEffect(() => {
    const timer = window.setTimeout(() => setAdminIntroVisible(false), 1700);
    return () => window.clearTimeout(timer);
  }, []);

  const loadAppointments = async () => {
    setAppointmentsLoading(true);
    setAppointmentsError("");

    const { data, error } = await supabase
      .from("appointments")
      .select(
        "id,service,format,appointment_date,appointment_time,full_name,age,phone,email,note,status,created_at"
      )
      .order("appointment_date", { ascending: true })
      .order("appointment_time", { ascending: true });

    if (error) {
      console.error("Randevular yüklenemedi:", error);
      setAppointmentsError(
        "Randevular yüklenemedi. Supabase RLS yetkilerini kontrol edin."
      );
      setAppointments([]);
    } else {
      setAppointments(data || []);
    }

    setAppointmentsLoading(false);
  };

  useEffect(() => {
    let mounted = true;

    const restoreSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;

      const browserSessionActive =
        window.sessionStorage.getItem(ADMIN_SESSION_KEY) === "active";

      if (data.session && !browserSessionActive) {
        await supabase.auth.signOut();
        if (!mounted) return;
        setSession(null);
        setAuthError(
          "Tarayıcı oturumu kapandığı için güvenlik amacıyla yeniden giriş yapmanız gerekiyor."
        );
      } else {
        setSession(data.session || null);
      }

      setAuthLoading(false);
    };

    restoreSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, nextSession) => {
        if (!mounted) return;
        setSession(nextSession);
        setAuthLoading(false);
      }
    );

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!session) return;

    let timeoutId;

    const signOutForInactivity = async () => {
      window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
      await supabase.auth.signOut();
      setActiveTab("dashboard");
      setAuthError(
        "30 dakika boyunca işlem yapılmadığı için oturumunuz güvenlik amacıyla kapatıldı."
      );
    };

    const resetTimer = () => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(signOutForInactivity, ADMIN_INACTIVITY_MS);
    };

    const activityEvents = [
      "mousedown",
      "keydown",
      "touchstart",
      "scroll",
      "pointerdown",
    ];

    activityEvents.forEach((eventName) =>
      window.addEventListener(eventName, resetTimer, { passive: true })
    );

    resetTimer();

    return () => {
      window.clearTimeout(timeoutId);
      activityEvents.forEach((eventName) =>
        window.removeEventListener(eventName, resetTimer)
      );
    };
  }, [session]);


  useEffect(() => {
    if (session) loadAppointments();
    else setAppointments([]);
  }, [session]);

  useEffect(() => {
    if (session && activeTab === "homepage") {
      loadHomeEditor();
    }
  }, [session, activeTab]);

  useEffect(() => {
    if (session && activeTab === "services") {
      loadServicesEditor();
    }
  }, [session, activeTab]);

  useEffect(() => {
    if (session && activeTab === "about") loadAboutEditor();
  }, [session, activeTab]);

  useEffect(() => {
    if (session && activeTab === "content") {
      loadMediaAdmin();
    }
  }, [session, activeTab]);

  useEffect(() => {
    if (session && activeTab === "blog") {
      loadBlogEditor();
    }
  }, [session, activeTab]);

  useEffect(() => {
    if (session && activeTab === "process") {
      loadProcessEditor();
    }
  }, [session, activeTab]);

  const login = async (e) => {
    e.preventDefault();
    setAuthError("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      console.error("Admin giriş hatası:", error);
      setAuthError("E-posta veya şifre hatalı.");
      return;
    }

    if (data?.session) {
      window.sessionStorage.setItem(ADMIN_SESSION_KEY, "active");
      setSession(data.session);
      setPassword("");
    }
  };

  const logout = async () => {
    window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
    await supabase.auth.signOut();
    setSession(null);
    setActiveTab("dashboard");
    setAuthError("");
  };

  const updateAppointmentStatus = async (id, status) => {
    setUpdatingId(id);
    setAppointmentsError("");

    const { error } = await supabase
      .from("appointments")
      .update({ status })
      .eq("id", id);

    if (error) {
      console.error("Randevu durum güncelleme hatası:", error);
      setAppointmentsError(
        "Randevu durumu güncellenemedi. Yetki ayarlarını kontrol edin."
      );
    } else {
      setAppointments((items) =>
        items.map((item) =>
          item.id === id ? { ...item, status } : item
        )
      );
    }

    setUpdatingId(null);
  };


  const deleteAppointment = async (id) => {
    const confirmed = window.confirm(
      "Bu randevu kaydını kalıcı olarak silmek istediğinize emin misiniz? Bu işlem geri alınamaz."
    );
    if (!confirmed) return;

    setUpdatingId(id);
    setAppointmentsError("");

    const { error } = await supabase
      .from("appointments")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Randevu silme hatası:", error);
      setAppointmentsError(
        "Randevu silinemedi. Supabase yetkilerini kontrol edin."
      );
    } else {
      setAppointments((items) => items.filter((item) => item.id !== id));
    }

    setUpdatingId(null);
  };

  const normalizeLines = (value) =>
    value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

  const loadAboutEditor = async () => {
    setAboutEditorLoading(true);
    setAboutEditorMessage("");
    const { data, error } = await supabase.from("site_content").select("content").eq("id", "about").maybeSingle();
    if (error) {
      console.error("Hakkımda içeriği yüklenemedi:", error);
      setAboutEditorMessage("Hakkımda içeriği yüklenemedi.");
    } else {
      setAboutEditor({ ...defaultAboutContent, ...(data?.content || {}) });
    }
    setAboutEditorLoading(false);
  };

  const saveAboutEditor = async (e) => {
    e.preventDefault();
    setAboutEditorSaving(true);
    setAboutEditorMessage("");
    const payload = {
      ...aboutEditor,
      paragraphs: Array.isArray(aboutEditor.paragraphs)
        ? aboutEditor.paragraphs
        : aboutEditor.paragraphs.split(/\n\s*\n/).map((item) => item.trim()).filter(Boolean),
    };
    const { error } = await supabase.from("site_content").upsert(
      { id: "about", content: payload, updated_at: new Date().toISOString() },
      { onConflict: "id" }
    );
    if (error) {
      console.error("Hakkımda kaydedilemedi:", error);
      setAboutEditorMessage("Kaydetme başarısız. Yetki ayarlarını kontrol edin.");
    } else {
      setAboutEditor(payload);
      setAboutEditorMessage("Hakkımda sayfası başarıyla güncellendi.");
    }
    setAboutEditorSaving(false);
  };

  const loadServicesEditor = async () => {
    setServicesEditorLoading(true);
    setServicesEditorMessage("");

    const { data, error } = await supabase
      .from("site_content")
      .select("content")
      .eq("id", "services")
      .maybeSingle();

    if (error) {
      console.error("Hizmetler içeriği yüklenemedi:", error);
      setServicesEditorMessage("Hizmetler içeriği yüklenemedi.");
    } else {
      setServicesEditor({
        ...emptyServicesEditor,
        ...(data?.content || {}),
      });
    }

    setServicesEditorLoading(false);
  };

  const saveServicesEditor = async (e) => {
    e.preventDefault();
    setServicesEditorSaving(true);
    setServicesEditorMessage("");

    const payload = {
      ...servicesEditor,
      individualItems: Array.isArray(servicesEditor.individualItems)
        ? servicesEditor.individualItems
        : normalizeLines(servicesEditor.individualItems),
      familyItems: Array.isArray(servicesEditor.familyItems)
        ? servicesEditor.familyItems
        : normalizeLines(servicesEditor.familyItems),
      coupleItems: Array.isArray(servicesEditor.coupleItems)
        ? servicesEditor.coupleItems
        : normalizeLines(servicesEditor.coupleItems),
      psychosocialItems: Array.isArray(servicesEditor.psychosocialItems)
        ? servicesEditor.psychosocialItems
        : normalizeLines(servicesEditor.psychosocialItems),
    };

    const { error } = await supabase
      .from("site_content")
      .upsert(
        {
          id: "services",
          content: payload,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );

    if (error) {
      console.error("Hizmetler kaydedilemedi:", error);
      setServicesEditorMessage("Kaydetme başarısız. Yetki ayarlarını kontrol edin.");
    } else {
      setServicesEditorMessage("Hizmetler başarıyla güncellendi.");
      setServicesEditor(payload);
    }

    setServicesEditorSaving(false);
  };

  const loadProcessEditor = async () => {
    setProcessEditorLoading(true);
    setProcessEditorMessage("");
    const { data, error } = await supabase
      .from("site_content")
      .select("content")
      .eq("id", "process")
      .maybeSingle();

    if (error) {
      console.error("Süreç içeriği yüklenemedi:", error);
      setProcessEditorMessage("Süreç içeriği yüklenemedi.");
    } else {
      setProcessEditor({ ...defaultProcessContent, ...(data?.content || {}) });
    }
    setProcessEditorLoading(false);
  };

  const saveProcessEditor = async (e) => {
    e.preventDefault();
    setProcessEditorSaving(true);
    setProcessEditorMessage("");
    const { error } = await supabase.from("site_content").upsert(
      { id: "process", content: processEditor, updated_at: new Date().toISOString() },
      { onConflict: "id" }
    );
    if (error) {
      console.error("Süreç kaydedilemedi:", error);
      setProcessEditorMessage("Kaydetme başarısız. Yetki ayarlarını kontrol edin.");
    } else {
      setProcessEditorMessage("Süreç sayfası başarıyla güncellendi.");
    }
    setProcessEditorSaving(false);
  };

  const updateProcessStep = (index, key, value) => {
    setProcessEditor((current) => ({
      ...current,
      steps: current.steps.map((item, i) => i === index ? { ...item, [key]: value } : item)
    }));
  };
  const updateProcessTrust = (index, key, value) => {
    setProcessEditor((current) => ({
      ...current,
      trustItems: current.trustItems.map((item, i) => i === index ? { ...item, [key]: value } : item)
    }));
  };
  const updateProcessTestimonial = (index, key, value) => {
    setProcessEditor((current) => ({
      ...current,
      testimonials: current.testimonials.map((item, i) => i === index ? { ...item, [key]: value } : item)
    }));
  };
  const addProcessTestimonial = () => {
    setProcessEditor((current) => ({
      ...current,
      testimonials: [...(current.testimonials || []), {
        no: String((current.testimonials?.length || 0) + 1).padStart(2, "0"),
        title: "Danışan Yorumu", person: "Danışan", text: ""
      }]
    }));
  };
  const removeProcessTestimonial = (index) => {
    setProcessEditor((current) => ({
      ...current,
      testimonials: current.testimonials.filter((_, i) => i !== index)
        .map((item, i) => ({ ...item, no: String(i + 1).padStart(2, "0") }))
    }));
  };

  const loadHomeEditor = async () => {
    setHomeEditorLoading(true);
    setHomeEditorMessage("");

    const { data, error } = await supabase
      .from("site_content")
      .select("content")
      .eq("id", "homepage")
      .maybeSingle();

    if (error) {
      console.error("Ana sayfa içeriği yüklenemedi:", error);
      setHomeEditorMessage("Ana sayfa içeriği yüklenemedi.");
    } else {
      setHomeEditor({
        ...emptyHomeEditor,
        ...(data?.content || {}),
      });
    }

    setHomeEditorLoading(false);
  };

  const saveHomeEditor = async (e) => {
    e.preventDefault();
    setHomeEditorSaving(true);
    setHomeEditorMessage("");

    const { error } = await supabase
      .from("site_content")
      .upsert(
        {
          id: "homepage",
          content: homeEditor,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );

    if (error) {
      console.error("Ana sayfa kaydedilemedi:", error);
      setHomeEditorMessage("Kaydetme başarısız. Yetki ayarlarını kontrol edin.");
    } else {
      setHomeEditorMessage("Ana sayfa başarıyla güncellendi.");
    }

    setHomeEditorSaving(false);
  };


  const resetBlogForm = () => {
    setEditingBlogId(null);
    setBlogForm({
      title: "",
      slug: "",
      category: "AİLE & İLİŞKİLER",
      date: new Date().toLocaleDateString("tr-TR", { day: "2-digit", month: "long", year: "numeric" }),
      readTime: "5 dk okuma",
      excerpt: "",
      image: "",
      body: "",
      quote: "",
      status: "published",
      featured: false,
      sortOrder: (blogEditor.posts?.length || 0) + 1,
    });
  };

  const loadBlogEditor = async () => {
    setBlogEditorLoading(true);
    setBlogEditorMessage("");

    const { data, error } = await supabase
      .from("site_content")
      .select("content")
      .eq("id", "blog")
      .maybeSingle();

    if (error) {
      console.error("Blog içeriği yüklenemedi:", error);
      setBlogEditorMessage("Blog içeriği yüklenemedi.");
    } else {
      const next = {
        ...defaultBlogContent,
        ...(data?.content || {}),
        posts: Array.isArray(data?.content?.posts) ? data.content.posts : defaultBlogContent.posts,
        categories: Array.isArray(data?.content?.categories) ? data.content.categories : defaultBlogContent.categories,
      };
      setBlogEditor(next);
    }

    setBlogEditorLoading(false);
  };

  const persistBlogEditor = async (nextContent, successMessage = "Blog başarıyla güncellendi.") => {
    setBlogEditorSaving(true);
    setBlogEditorMessage("");

    const { error } = await supabase
      .from("site_content")
      .upsert(
        {
          id: "blog",
          content: nextContent,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );

    if (error) {
      console.error("Blog kaydedilemedi:", error);
      setBlogEditorMessage("Blog kaydedilemedi. Supabase yetkilerini kontrol edin.");
      setBlogEditorSaving(false);
      return false;
    }

    setBlogEditor(nextContent);
    setBlogEditorMessage(successMessage);
    setBlogEditorSaving(false);
    return true;
  };

  const saveBlogSettings = async (e) => {
    e.preventDefault();
    await persistBlogEditor(blogEditor, "Blog üst alanı başarıyla güncellendi.");
  };

  const saveBlogPost = async (e) => {
    e.preventDefault();

    if (!blogForm.title.trim() || !blogForm.excerpt.trim() || !blogForm.body.trim() || !blogForm.image.trim()) {
      setBlogEditorMessage("Başlık, kısa açıklama, görsel ve yazı içeriği zorunludur.");
      return;
    }

    let slug = createBlogSlug(blogForm.slug || blogForm.title);
    const duplicate = (blogEditor.posts || []).find(
      (post) => post.slug === slug && (post.id || post.slug) !== editingBlogId
    );
    if (duplicate) slug = `${slug}-${Date.now().toString().slice(-5)}`;

    const id = editingBlogId || `blog-${Date.now()}`;
    let posts = [...(blogEditor.posts || [])];

    if (blogForm.featured) {
      posts = posts.map((post) => ({ ...post, featured: false }));
    }

    const item = {
      id,
      slug,
      title: blogForm.title.trim(),
      category: blogForm.category.trim() || "GENEL",
      date: blogForm.date.trim(),
      readTime: blogForm.readTime.trim() || "5 dk okuma",
      excerpt: blogForm.excerpt.trim(),
      image: blogForm.image.trim(),
      body: blogForm.body.split(/\n\s*\n/).map((p)=>p.trim()).filter(Boolean),
      quote: blogForm.quote.trim(),
      status: blogForm.status,
      featured: Boolean(blogForm.featured),
      sortOrder: Number(blogForm.sortOrder || 100),
    };

    const index = posts.findIndex((post) => (post.id || post.slug) === editingBlogId);
    if (index >= 0) posts[index] = item;
    else posts.push(item);

    const nextContent = { ...blogEditor, posts };
    const ok = await persistBlogEditor(
      nextContent,
      editingBlogId ? "Blog yazısı başarıyla güncellendi." : "Yeni blog yazısı başarıyla yayınlandı."
    );

    if (ok) resetBlogForm();
  };

  const editBlogPost = (post) => {
    setEditingBlogId(post.id || post.slug);
    setBlogForm({
      title: post.title || "",
      slug: post.slug || "",
      category: post.category || "GENEL",
      date: post.date || "",
      readTime: post.readTime || "5 dk okuma",
      excerpt: post.excerpt || "",
      image: post.image || "",
      body: Array.isArray(post.body) ? post.body.join("\n\n") : post.body || "",
      quote: post.quote || "",
      status: post.status || "published",
      featured: Boolean(post.featured),
      sortOrder: post.sortOrder ?? 100,
    });
    window.setTimeout(() => {
      document.querySelector(".admin100Blog__editor")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const deleteBlogPost = async (post) => {
    const confirmed = window.confirm(`"${post.title}" yazısını kalıcı olarak silmek istediğinize emin misiniz?`);
    if (!confirmed) return;

    const posts = (blogEditor.posts || []).filter((item)=>(item.id || item.slug)!==(post.id || post.slug));
    await persistBlogEditor({ ...blogEditor, posts }, "Blog yazısı silindi.");
    if (editingBlogId === (post.id || post.slug)) resetBlogForm();
  };

  const toggleBlogPostStatus = async (post) => {
    const posts = (blogEditor.posts || []).map((item) =>
      (item.id || item.slug) === (post.id || post.slug)
        ? { ...item, status: item.status === "draft" ? "published" : "draft" }
        : item
    );
    await persistBlogEditor({ ...blogEditor, posts }, "Yayın durumu güncellendi.");
  };

  const featureBlogPost = async (post) => {
    const posts = (blogEditor.posts || []).map((item) => ({
      ...item,
      featured: (item.id || item.slug) === (post.id || post.slug),
    }));
    await persistBlogEditor({ ...blogEditor, posts }, "Öne çıkan yazı güncellendi.");
  };

  const uploadBlogImage = async (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setBlogEditorMessage("Lütfen JPG, PNG veya WebP görsel seçin.");
      return;
    }
    if (file.size > 6 * 1024 * 1024) {
      setBlogEditorMessage("Görsel en fazla 6 MB olabilir.");
      return;
    }

    setBlogImageUploading(true);
    setBlogEditorMessage("");

    const extension = (file.name.split(".").pop() || "jpg").toLowerCase();
    const safeName = createBlogSlug(file.name.replace(/\.[^.]+$/, "")) || "blog-gorsel";
    const filePath = `${Date.now()}-${safeName}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("blog-images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });

    if (uploadError) {
      console.error("Blog görsel yükleme hatası:", uploadError);
      setBlogEditorMessage(
        "Görsel yüklenemedi. Supabase Storage içinde blog-images bucket ve yetkilerini kontrol edin."
      );
      setBlogImageUploading(false);
      return;
    }

    const { data } = supabase.storage.from("blog-images").getPublicUrl(filePath);
    setBlogForm((current) => ({ ...current, image: data.publicUrl }));
    setBlogEditorMessage("Görsel başarıyla yüklendi. Yazıyı kaydetmeyi unutmayın.");
    setBlogImageUploading(false);
  };

  const loadMediaAdmin = async () => {
    setMediaLoading(true);
    setMediaMessage("");

    const [{ data: items, error: itemsError }, { data: links, error: linksError }] =
      await Promise.all([
        supabase
          .from("media_contents")
          .select("id,type,title,description,category,url,duration,status,sort_order,created_at")
          .order("created_at", { ascending: false }),
        supabase
          .from("site_content")
          .select("content")
          .eq("id", "media_channels")
          .maybeSingle(),
      ]);

    if (itemsError) {
      console.error("Medya içerikleri yüklenemedi:", itemsError);
      setMediaMessage("İçerikler yüklenemedi.");
    } else {
      setMediaItems(items || []);
    }

    if (linksError) {
      console.error("Kanal linkleri yüklenemedi:", linksError);
    } else if (links?.content) {
      setChannelEditor((current) => ({ ...current, ...links.content }));
    }

    setMediaLoading(false);
  };

  const saveChannelLinks = async () => {
    setMediaSaving(true);
    setMediaMessage("");

    const { error } = await supabase
      .from("site_content")
      .upsert(
        {
          id: "media_channels",
          content: channelEditor,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );

    if (error) {
      console.error("Kanal bağlantıları kaydedilemedi:", error);
      setMediaMessage("YouTube / Spotify kanal bağlantıları kaydedilemedi.");
    } else {
      setMediaMessage("Kanal bağlantıları başarıyla kaydedildi.");
    }

    setMediaSaving(false);
  };

  const addContent = async (e) => {
    e.preventDefault();
    if (!mediaForm.title.trim() || !mediaForm.url.trim()) return;

    setMediaSaving(true);
    setMediaMessage("");

    const { error } = await supabase.from("media_contents").insert({
      type: mediaForm.type,
      title: mediaForm.title.trim(),
      description: mediaForm.description.trim(),
      category: mediaForm.category.trim() || null,
      url: mediaForm.url.trim(),
      duration: mediaForm.duration.trim() || null,
      status: mediaForm.status,
      sort_order: Number(mediaForm.sort_order) || 100,
    });

    if (error) {
      console.error("İçerik eklenemedi:", error);
      setMediaMessage("İçerik eklenemedi. Linki ve yetkileri kontrol edin.");
    } else {
      setMediaMessage("İçerik başarıyla eklendi.");
      setMediaForm({
        type: "youtube",
        title: "",
        description: "",
        category: "",
        url: "",
        duration: "",
        status: "published",
        sort_order: 100,
      });
      await loadMediaAdmin();
    }

    setMediaSaving(false);
  };

  const updateMediaStatus = async (id, status) => {
    setMediaSaving(true);
    setMediaMessage("");

    const { error } = await supabase
      .from("media_contents")
      .update({ status })
      .eq("id", id);

    if (error) {
      console.error("İçerik durumu değiştirilemedi:", error);
      setMediaMessage("İçerik durumu değiştirilemedi.");
    } else {
      setMediaItems((items) =>
        items.map((item) => (item.id === id ? { ...item, status } : item))
      );
    }

    setMediaSaving(false);
  };

  const removeContent = async (id) => {
    if (!window.confirm("Bu içeriği silmek istediğinize emin misiniz?")) return;

    setMediaSaving(true);
    setMediaMessage("");

    const { error } = await supabase
      .from("media_contents")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("İçerik silinemedi:", error);
      setMediaMessage("İçerik silinemedi.");
    } else {
      setMediaItems((items) => items.filter((item) => item.id !== id));
      setMediaMessage("İçerik silindi.");
    }

    setMediaSaving(false);
  };

  const statusLabel = (status) =>
    status === "approved"
      ? "Onaylandı"
      : status === "cancelled"
      ? "İptal"
      : "Bekliyor";

  const pendingCount = appointments.filter(
    (item) => item.status === "pending"
  ).length;

  const filteredAppointments =
    appointmentFilter === "all"
      ? appointments
      : appointments.filter((item) => item.status === appointmentFilter);

  const stats = [
    { label: "Toplam İçerik", value: mediaItems.length, icon: "video" },
    {
      label: "Yayındaki",
      value: mediaItems.filter((x) => x.status === "published").length,
      icon: "check",
    },
    {
      label: "Bekleyen Randevu",
      value: pendingCount,
      icon: "calendar",
    },
    {
      label: "Toplam Randevu",
      value: appointments.length,
      icon: "users",
    },
  ];

  if (adminIntroVisible) {
    return (
      <main className="admin92Intro">
        <div className="admin92Intro__ambient admin92Intro__ambient--one" />
        <div className="admin92Intro__ambient admin92Intro__ambient--two" />

        <div className="admin92Intro__center">
          <div className="admin92Intro__emblem">
            <img src={kaanOzkanEmblem} alt="Kaan Özkan" />
          </div>
          <span className="admin92Intro__eyebrow">YÖNETİM SİSTEMİ</span>
          <h1>KAAN ÖZKAN</h1>
          <p>Sosyal Hizmet Uzmanı · Aile Danışmanı</p>

          <div className="admin92Intro__line">
            <span />
          </div>

          <div className="admin92Intro__credit">
            <small>Web Tasarım &amp; Geliştirme</small>
            <strong>CB LABS</strong>
            <i>·</i>
            <span>Çağatay Burucu</span>
          </div>
        </div>
      </main>
    );
  }

  if (authLoading) {
    return (
      <main className="admin70Login">
        <div className="admin70Login__card">
          <div className="admin70Login__logo admin70Login__logo--image">
            <img src={kaanOzkanEmblem} alt="Kaan Özkan" />
          </div>
          <span>YÖNETİM PANELİ</span>
          <h1>Panel hazırlanıyor...</h1>
        </div>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="admin70Login">
        <div className="admin70Login__glow" />
        <form className="admin70Login__card" onSubmit={login}>
          <div className="admin70Login__logo admin70Login__logo--image">
            <img src={kaanOzkanEmblem} alt="Kaan Özkan" />
          </div>
          <span>GÜVENLİ YÖNETİM PANELİ</span>
          <h1>Yönetici Girişi</h1>
          <p>
            Randevuları görüntülemek ve yönetmek için yetkili hesabınızla giriş yapın.
          </p>

          <div className="admin93SecurityNote">
            <Icon name="shield" size={15} />
            <span>30 dk hareketsizlikte otomatik çıkış · Tarayıcı kapanınca yeniden giriş</span>
          </div>

          <label>
            <span>E-posta</span>
            <input
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@ornek.com"
              required
            />
          </label>

          <label>
            <span>Şifre</span>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </label>

          {authError && <div className="admin70Login__error">{authError}</div>}

          <button type="submit">
            GİRİŞ YAP
            <Icon name="arrow" size={16} />
          </button>

          <a href="#/">← Siteye Dön</a>

          <div className="admin92LoginCredit">
            <span>Designed &amp; Developed by</span>
            <strong>CB LABS</strong>
            <i>·</i>
            <b>Çağatay Burucu</b>
          </div>
        </form>
      </main>
    );
  }

  return (
    <main className="adminDemo">
      <aside className="adminDemo__sidebar">
        <div className="adminDemo__brand">
          <div className="adminDemo__mark adminDemo__mark--image">
            <img src={kaanOzkanEmblem} alt="Kaan Özkan" />
          </div>
          <div>
            <strong>KAAN ÖZKAN</strong>
            <span>Sosyal Hizmet Uzmanı · Aile Danışmanı</span>
          </div>
        </div>

        <nav className="adminDemo__menu">
          {[
            ["dashboard", "grid", "Dashboard"],
            ["homepage", "edit", "Ana Sayfa"],
            ["about", "user", "Hakkımda"],
            ["services", "grid", "Hizmetler"],
            ["process", "chart", "Süreç"],
            ["blog", "edit", "Blog"],
            ["appointments", "calendar", "Randevular"],
            ["content", "video", "YouTube & Podcast"],
            ["articles", "edit", "İçerikler"],
            ["users", "users", "Kullanıcılar"],
            ["settings", "settings", "Ayarlar"],
          ].map(([key, icon, label]) => (
            <button
              key={key}
              type="button"
              className={activeTab === key ? "is-active" : ""}
              onClick={() => setActiveTab(key)}
            >
              <Icon name={icon} size={19} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="adminDemo__sidebarFooter">
          <div className="adminDemo__user">
            <div>{(session.user.email || "AD").slice(0, 2).toUpperCase()}</div>
            <span>
              <strong>{session.user.email}</strong>
              <small>Yönetici</small>
            </span>
          </div>

          <button className="admin70Logout" type="button" onClick={logout}>
            Çıkış Yap
          </button>

          <a href="#/">Siteye Dön <Icon name="arrow" size={14} /></a>

          <div className="admin92SidebarCredit">
            <small>Web Tasarım &amp; Geliştirme</small>
            <strong>CB LABS</strong>
            <span>Çağatay Burucu</span>
          </div>
        </div>
      </aside>

      <section className="adminDemo__main">
        <header className="adminDemo__topbar">
          <div className="admin92TopbarCopy">
            <span>YÖNETİM PANELİ</span>
            {activeTab === "dashboard" && <p>Hoş geldiniz, Kaan Özkan 👋</p>}
            <h1>
              {activeTab === "dashboard"
                ? "Genel Bakış"
                : activeTab === "homepage"
                ? "Ana Sayfa"
                : activeTab === "about"
                ? "Hakkımda"
                : activeTab === "services"
                ? "Hizmetler"
                : activeTab === "process"
                ? "Süreç"
                : activeTab === "blog"
                ? "Blog Yönetimi"
                : activeTab === "content"
                ? "YouTube & Podcast"
                : activeTab === "articles"
                ? "İçerik Yönetimi"
                : activeTab === "appointments"
                ? "Randevular"
                : activeTab === "users"
                ? "Kullanıcılar"
                : "Ayarlar"}
            </h1>
          </div>

          <div className="adminDemo__demoBadge adminDemo__demoBadge--live">
            <span />
            SUPABASE BAĞLI
          </div>
        </header>

        {activeTab === "dashboard" && (
          <>
            <div className="adminDemo__stats">
              {stats.map((item) => (
                <article key={item.label}>
                  <div><Icon name={item.icon} size={23} /></div>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </article>
              ))}
            </div>

            <div className="adminDemo__dashboardGrid">
              <article className="adminDemo__panel">
                <div className="adminDemo__panelHead">
                  <div>
                    <span>SON RANDEVULAR</span>
                    <h2>Randevu akışı</h2>
                  </div>
                  <button type="button" onClick={() => setActiveTab("appointments")}>
                    Tümünü Gör
                  </button>
                </div>

                <div className="admin70MiniAppointments">
                  {appointmentsLoading ? (
                    <p>Randevular yükleniyor...</p>
                  ) : appointments.length === 0 ? (
                    <p>Henüz randevu kaydı bulunmuyor.</p>
                  ) : (
                    appointments.slice(0, 5).map((item) => (
                      <div key={item.id}>
                        <span>
                          <strong>{item.full_name}</strong>
                          <small>
                            {item.appointment_date} • {String(item.appointment_time).slice(0, 5)}
                          </small>
                        </span>
                        <b className={`admin70Status admin70Status--${item.status}`}>
                          {statusLabel(item.status)}
                        </b>
                      </div>
                    ))
                  )}
                </div>
              </article>

              <article className="adminDemo__panel adminDemo__welcome">
                <span>GERÇEK RANDEVU YÖNETİMİ</span>
                <h2>Yeni talepleri tek panelden yönetin.</h2>
                <p>
                  Siteden oluşturulan randevular Supabase veritabanından canlı
                  olarak alınır. Bekleyen talepleri onaylayabilir veya iptal
                  edebilirsiniz.
                </p>
                <button type="button" onClick={() => setActiveTab("appointments")}>
                  Randevulara Git
                  <Icon name="arrow" size={16} />
                </button>
              </article>
            </div>
          </>
        )}

        {activeTab === "homepage" && (
          <section className="admin72Cms">
            <div className="admin72Cms__head">
              <div>
                <span>SİTE İÇERİKLERİ / ANA SAYFA</span>
                <h2>Ana sayfadaki yazıları düzenleyin.</h2>
                <p>
                  Buradaki değişiklikler kaydedildiğinde ziyaretçilerin gördüğü
                  ana sayfaya yansır. Tasarım ve kod yapısı değişmez.
                </p>
              </div>
              <button type="button" onClick={loadHomeEditor} disabled={homeEditorLoading}>
                {homeEditorLoading ? "Yükleniyor..." : "İçeriği Yenile"}
              </button>
            </div>

            {homeEditorLoading ? (
              <div className="admin72Cms__loading">Ana sayfa içeriği yükleniyor...</div>
            ) : (
              <form className="admin72Cms__form" onSubmit={saveHomeEditor}>
                <div className="admin72Cms__section">
                  <div className="admin72Cms__sectionTitle">
                    <span>01</span>
                    <div>
                      <strong>Hero Alanı</strong>
                      <small>Sayfanın ilk görünen büyük başlık alanı.</small>
                    </div>
                  </div>

                  <div className="admin72Cms__fields">
                    <label><span>Üst Etiket</span><input value={homeEditor.eyebrow} onChange={(e)=>setHomeEditor({...homeEditor,eyebrow:e.target.value})}/></label>
                    <label><span>Başlık 1. Satır</span><input value={homeEditor.titleLine} onChange={(e)=>setHomeEditor({...homeEditor,titleLine:e.target.value})}/></label>
                    <label><span>Gold Başlık</span><input value={homeEditor.titleAccent} onChange={(e)=>setHomeEditor({...homeEditor,titleAccent:e.target.value})}/></label>
                    <label className="admin72Cms__full"><span>Açıklama</span><textarea rows="4" value={homeEditor.description} onChange={(e)=>setHomeEditor({...homeEditor,description:e.target.value})}/></label>
                    <label><span>Birincil Buton</span><input value={homeEditor.primaryCta} onChange={(e)=>setHomeEditor({...homeEditor,primaryCta:e.target.value})}/></label>
                    <label><span>İkincil Buton</span><input value={homeEditor.secondaryCta} onChange={(e)=>setHomeEditor({...homeEditor,secondaryCta:e.target.value})}/></label>
                  </div>
                </div>

                <div className="admin72Cms__section">
                  <div className="admin72Cms__sectionTitle">
                    <span>02</span>
                    <div>
                      <strong>Güven Kartları</strong>
                      <small>Hero alanının altındaki üç kısa bilgi kartı.</small>
                    </div>
                  </div>

                  <div className="admin72Cms__fields">
                    <label><span>1. Kart Başlığı</span><input value={homeEditor.trust1Title} onChange={(e)=>setHomeEditor({...homeEditor,trust1Title:e.target.value})}/></label>
                    <label><span>1. Kart Açıklaması</span><input value={homeEditor.trust1Text} onChange={(e)=>setHomeEditor({...homeEditor,trust1Text:e.target.value})}/></label>
                    <label><span>2. Kart Başlığı</span><input value={homeEditor.trust2Title} onChange={(e)=>setHomeEditor({...homeEditor,trust2Title:e.target.value})}/></label>
                    <label><span>2. Kart Açıklaması</span><input value={homeEditor.trust2Text} onChange={(e)=>setHomeEditor({...homeEditor,trust2Text:e.target.value})}/></label>
                    <label><span>3. Kart Başlığı</span><input value={homeEditor.trust3Title} onChange={(e)=>setHomeEditor({...homeEditor,trust3Title:e.target.value})}/></label>
                    <label><span>3. Kart Açıklaması</span><input value={homeEditor.trust3Text} onChange={(e)=>setHomeEditor({...homeEditor,trust3Text:e.target.value})}/></label>
                  </div>
                </div>

                <div className="admin72Cms__section">
                  <div className="admin72Cms__sectionTitle">
                    <span>03</span>
                    <div>
                      <strong>Çalışma Alanları</strong>
                      <small>Ana sayfadaki üç hizmet kartı ve bölüm başlığı.</small>
                    </div>
                  </div>

                  <div className="admin72Cms__fields">
                    <label><span>Bölüm Etiketi</span><input value={homeEditor.servicesEyebrow} onChange={(e)=>setHomeEditor({...homeEditor,servicesEyebrow:e.target.value})}/></label>
                    <label><span>Bölüm Başlığı</span><input value={homeEditor.servicesTitle} onChange={(e)=>setHomeEditor({...homeEditor,servicesTitle:e.target.value})}/></label>
                    <label><span>Gold Başlık</span><input value={homeEditor.servicesTitleAccent} onChange={(e)=>setHomeEditor({...homeEditor,servicesTitleAccent:e.target.value})}/></label>
                    <label className="admin72Cms__full"><span>Bölüm Açıklaması</span><textarea rows="4" value={homeEditor.servicesDescription} onChange={(e)=>setHomeEditor({...homeEditor,servicesDescription:e.target.value})}/></label>

                    <label><span>1. Hizmet Başlığı</span><input value={homeEditor.service1Title} onChange={(e)=>setHomeEditor({...homeEditor,service1Title:e.target.value})}/></label>
                    <label><span>1. Hizmet / Madde 1</span><input value={homeEditor.service1Item1} onChange={(e)=>setHomeEditor({...homeEditor,service1Item1:e.target.value})}/></label>
                    <label><span>1. Hizmet / Madde 2</span><input value={homeEditor.service1Item2} onChange={(e)=>setHomeEditor({...homeEditor,service1Item2:e.target.value})}/></label>

                    <label><span>2. Hizmet Başlığı</span><input value={homeEditor.service2Title} onChange={(e)=>setHomeEditor({...homeEditor,service2Title:e.target.value})}/></label>
                    <label><span>2. Hizmet / Madde 1</span><input value={homeEditor.service2Item1} onChange={(e)=>setHomeEditor({...homeEditor,service2Item1:e.target.value})}/></label>
                    <label><span>2. Hizmet / Madde 2</span><input value={homeEditor.service2Item2} onChange={(e)=>setHomeEditor({...homeEditor,service2Item2:e.target.value})}/></label>

                    <label><span>3. Hizmet Başlığı</span><input value={homeEditor.service3Title} onChange={(e)=>setHomeEditor({...homeEditor,service3Title:e.target.value})}/></label>
                    <label><span>3. Hizmet / Madde 1</span><input value={homeEditor.service3Item1} onChange={(e)=>setHomeEditor({...homeEditor,service3Item1:e.target.value})}/></label>
                    <label><span>3. Hizmet / Madde 2</span><input value={homeEditor.service3Item2} onChange={(e)=>setHomeEditor({...homeEditor,service3Item2:e.target.value})}/></label>
                  </div>
                </div>

                <div className="admin72Cms__section">
                  <div className="admin72Cms__sectionTitle">
                    <span>04</span>
                    <div>
                      <strong>Yaklaşım Mesajı</strong>
                      <small>Ana sayfanın altındaki büyük alıntı bölümü.</small>
                    </div>
                  </div>

                  <div className="admin72Cms__fields">
                    <label><span>Etiket</span><input value={homeEditor.trustStatementEyebrow} onChange={(e)=>setHomeEditor({...homeEditor,trustStatementEyebrow:e.target.value})}/></label>
                    <label className="admin72Cms__full"><span>Büyük Başlık</span><input value={homeEditor.trustStatementTitle} onChange={(e)=>setHomeEditor({...homeEditor,trustStatementTitle:e.target.value})}/></label>
                    <label className="admin72Cms__full"><span>Açıklama</span><textarea rows="4" value={homeEditor.trustStatementText} onChange={(e)=>setHomeEditor({...homeEditor,trustStatementText:e.target.value})}/></label>
                  </div>
                </div>

                {homeEditorMessage && (
                  <div className={`admin72Cms__message ${homeEditorMessage.includes("başarıyla") ? "is-success" : "is-error"}`}>
                    {homeEditorMessage}
                  </div>
                )}

                <div className="admin72Cms__save">
                  <div>
                    <strong>Değişiklikleri yayınla</strong>
                    <span>Kaydettiğiniz içerik ana sayfada kullanılacaktır.</span>
                  </div>
                  <button type="submit" disabled={homeEditorSaving}>
                    {homeEditorSaving ? "Kaydediliyor..." : "Ana Sayfayı Kaydet"}
                    {!homeEditorSaving && <Icon name="check" size={16}/>}
                  </button>
                </div>
              </form>
            )}
          </section>
        )}

        {activeTab === "about" && (
          <section className="admin73Cms">
            <div className="admin73Cms__head">
              <div>
                <span>SİTE İÇERİKLERİ / HAKKIMDA</span>
                <h2>Hakkımda sayfasını düzenleyin.</h2>
                <p>Sayfadaki tanıtım yazısını ve profil kartındaki bilgileri kod açmadan değiştirebilirsiniz.</p>
              </div>
              <button type="button" onClick={loadAboutEditor} disabled={aboutEditorLoading}>
                {aboutEditorLoading ? "Yükleniyor..." : "İçeriği Yenile"}
              </button>
            </div>
            {aboutEditorLoading ? (
              <div className="admin73Cms__loading">Hakkımda içeriği yükleniyor...</div>
            ) : (
              <form className="admin73Cms__form" onSubmit={saveAboutEditor}>
                <div className="admin73Cms__section">
                  <div className="admin73Cms__sectionTitle"><span>01</span><div><strong>Sayfa Üst Alanı</strong><small>Başlık ve mesleki unvan.</small></div></div>
                  <div className="admin73Cms__fields">
                    <label><span>Üst Etiket</span><input value={aboutEditor.eyebrow} onChange={(e)=>setAboutEditor({...aboutEditor,eyebrow:e.target.value})}/></label>
                    <label><span>Ad</span><input value={aboutEditor.firstName} onChange={(e)=>setAboutEditor({...aboutEditor,firstName:e.target.value})}/></label>
                    <label><span>Soyad</span><input value={aboutEditor.lastName} onChange={(e)=>setAboutEditor({...aboutEditor,lastName:e.target.value})}/></label>
                    <label><span>Mesleki Unvan</span><input value={aboutEditor.role} onChange={(e)=>setAboutEditor({...aboutEditor,role:e.target.value})}/></label>
                    <label className="admin73Cms__full"><span>Metin Bölümü Etiketi</span><input value={aboutEditor.storyLabel} onChange={(e)=>setAboutEditor({...aboutEditor,storyLabel:e.target.value})}/></label>
                  </div>
                </div>
                <div className="admin73Cms__section">
                  <div className="admin73Cms__sectionTitle"><span>02</span><div><strong>Hakkımda Metni</strong><small>Paragraflar arasında bir boş satır bırakın.</small></div></div>
                  <div className="admin73Cms__fields">
                    <label className="admin73Cms__full"><span>Tam Hakkımda Yazısı</span>
                      <textarea rows="28" value={Array.isArray(aboutEditor.paragraphs) ? aboutEditor.paragraphs.join("\n\n") : aboutEditor.paragraphs || ""} onChange={(e)=>setAboutEditor({...aboutEditor,paragraphs:e.target.value})}/>
                    </label>
                  </div>
                </div>
                <div className="admin73Cms__section">
                  <div className="admin73Cms__sectionTitle"><span>03</span><div><strong>Profil Kartı</strong><small>Sağdaki fotoğraf kartının yazıları.</small></div></div>
                  <div className="admin73Cms__fields">
                    <label><span>Üst Unvan</span><input value={aboutEditor.profileEyebrow} onChange={(e)=>setAboutEditor({...aboutEditor,profileEyebrow:e.target.value})}/></label>
                    <label><span>Ad Soyad</span><input value={aboutEditor.profileName} onChange={(e)=>setAboutEditor({...aboutEditor,profileName:e.target.value})}/></label>
                    <label><span>Alt Unvan</span><input value={aboutEditor.profileRole} onChange={(e)=>setAboutEditor({...aboutEditor,profileRole:e.target.value})}/></label>
                    <label><span>1. Özellik</span><input value={aboutEditor.profileItem1} onChange={(e)=>setAboutEditor({...aboutEditor,profileItem1:e.target.value})}/></label>
                    <label><span>2. Özellik</span><input value={aboutEditor.profileItem2} onChange={(e)=>setAboutEditor({...aboutEditor,profileItem2:e.target.value})}/></label>
                    <label><span>3. Özellik</span><input value={aboutEditor.profileItem3} onChange={(e)=>setAboutEditor({...aboutEditor,profileItem3:e.target.value})}/></label>
                  </div>
                </div>
                {aboutEditorMessage && <div className={`admin73Cms__message ${aboutEditorMessage.includes("başarıyla") ? "is-success" : "is-error"}`}>{aboutEditorMessage}</div>}
                <div className="admin73Cms__savebar">
                  <div><strong>Hakkımda sayfasını yayınla</strong><span>Değişiklikler canlı sayfada kullanılacaktır.</span></div>
                  <button type="submit" disabled={aboutEditorSaving}>{aboutEditorSaving ? "Kaydediliyor..." : "Hakkımda Sayfasını Kaydet"}</button>
                </div>
              </form>
            )}
          </section>
        )}

        {activeTab === "services" && (
          <section className="admin73Cms">
            <div className="admin73Cms__head">
              <div>
                <span>SİTE İÇERİKLERİ / HİZMETLER</span>
                <h2>Hizmetler sayfasını düzenleyin.</h2>
                <p>
                  Başlıkları, açıklamaları ve detaylı bilgi maddelerini kod
                  açmadan değiştirebilirsiniz.
                </p>
              </div>
              <button type="button" onClick={loadServicesEditor} disabled={servicesEditorLoading}>
                {servicesEditorLoading ? "Yükleniyor..." : "İçeriği Yenile"}
              </button>
            </div>

            {servicesEditorLoading ? (
              <div className="admin73Cms__loading">Hizmetler içeriği yükleniyor...</div>
            ) : (
              <form className="admin73Cms__form" onSubmit={saveServicesEditor}>
                <div className="admin73Cms__section">
                  <div className="admin73Cms__sectionTitle">
                    <span>01</span>
                    <div>
                      <strong>Sayfa Üst Alanı</strong>
                      <small>Hizmetler sayfasının hero başlık ve açıklaması.</small>
                    </div>
                  </div>

                  <div className="admin73Cms__fields">
                    <label><span>Üst Etiket</span><input value={servicesEditor.heroEyebrow} onChange={(e)=>setServicesEditor({...servicesEditor,heroEyebrow:e.target.value})}/></label>
                    <label><span>Ana Başlık</span><input value={servicesEditor.heroTitle} onChange={(e)=>setServicesEditor({...servicesEditor,heroTitle:e.target.value})}/></label>
                    <label><span>Gold Başlık</span><input value={servicesEditor.heroAccent} onChange={(e)=>setServicesEditor({...servicesEditor,heroAccent:e.target.value})}/></label>
                    <label className="admin73Cms__full"><span>Hero Açıklaması</span><textarea rows="4" value={servicesEditor.heroDescription} onChange={(e)=>setServicesEditor({...servicesEditor,heroDescription:e.target.value})}/></label>
                    <label><span>Bölüm Başlığı</span><input value={servicesEditor.quickTitle} onChange={(e)=>setServicesEditor({...servicesEditor,quickTitle:e.target.value})}/></label>
                    <label><span>Bölüm Açıklaması</span><input value={servicesEditor.quickDescription} onChange={(e)=>setServicesEditor({...servicesEditor,quickDescription:e.target.value})}/></label>
                  </div>
                </div>

                {[
                  ["02","Bireysel Danışmanlık","individual"],
                  ["03","Aile Danışmanlığı","family"],
                  ["04","Çift Danışmanlığı","couple"],
                  ["05","Psikososyal Destek","psychosocial"],
                ].map(([no,label,key]) => (
                  <div className="admin73Cms__section" key={key}>
                    <div className="admin73Cms__sectionTitle">
                      <span>{no}</span>
                      <div>
                        <strong>{label}</strong>
                        <small>Kart başlığı, kısa açıklaması ve detay maddeleri.</small>
                      </div>
                    </div>

                    <div className="admin73Cms__fields">
                      <label>
                        <span>Başlık</span>
                        <input
                          value={servicesEditor[`${key}Title`] || ""}
                          onChange={(e)=>setServicesEditor({...servicesEditor,[`${key}Title`]:e.target.value})}
                        />
                      </label>

                      <label className="admin73Cms__full">
                        <span>Kısa Açıklama</span>
                        <textarea
                          rows="3"
                          value={servicesEditor[`${key}Short`] || ""}
                          onChange={(e)=>setServicesEditor({...servicesEditor,[`${key}Short`]:e.target.value})}
                        />
                      </label>

                      <label className="admin73Cms__full">
                        <span>Detay Maddeleri — Her satıra bir madde yazın</span>
                        <textarea
                          rows="9"
                          value={
                            Array.isArray(servicesEditor[`${key}Items`])
                              ? servicesEditor[`${key}Items`].join("\n")
                              : servicesEditor[`${key}Items`] || ""
                          }
                          onChange={(e)=>setServicesEditor({...servicesEditor,[`${key}Items`]:e.target.value})}
                        />
                      </label>
                    </div>
                  </div>
                ))}

                {servicesEditorMessage && (
                  <div className={`admin73Cms__message ${servicesEditorMessage.includes("başarıyla") ? "is-success" : "is-error"}`}>
                    {servicesEditorMessage}
                  </div>
                )}

                <div className="admin73Cms__save">
                  <div>
                    <strong>Değişiklikleri yayınla</strong>
                    <span>Kaydettiğiniz içerikler Hizmetler sayfasında kullanılacaktır.</span>
                  </div>
                  <button type="submit" disabled={servicesEditorSaving}>
                    {servicesEditorSaving ? "Kaydediliyor..." : "Hizmetleri Kaydet"}
                    {!servicesEditorSaving && <Icon name="check" size={16}/>}
                  </button>
                </div>
              </form>
            )}
          </section>
        )}

        {activeTab === "blog" && (
          <section className="admin100Blog">
            <div className="admin100Blog__head">
              <div>
                <span>BLOG YÖNETİMİ</span>
                <h2>Yazıları kod bilmeden yönetin.</h2>
                <p>
                  Yeni yazı ekleyin, görsel yükleyin, mevcut yazıları düzenleyin,
                  taslağa alın veya öne çıkan yazıyı tek tıkla değiştirin.
                </p>
              </div>
              <button type="button" onClick={loadBlogEditor} disabled={blogEditorLoading}>
                {blogEditorLoading ? "Yükleniyor..." : "Blogu Yenile"}
              </button>
            </div>

            {blogEditorMessage && (
              <div className={`admin100Blog__message ${blogEditorMessage.includes("başarı") || blogEditorMessage.includes("silindi") || blogEditorMessage.includes("güncellendi") || blogEditorMessage.includes("yüklendi") ? "is-success" : "is-error"}`}>
                {blogEditorMessage}
              </div>
            )}

            {blogEditorLoading ? (
              <div className="admin100Blog__loading">Blog içeriği yükleniyor...</div>
            ) : (
              <>
                <form className="admin100Blog__settings" onSubmit={saveBlogSettings}>
                  <div className="admin100Blog__sectionHead">
                    <span>01</span>
                    <div>
                      <strong>Blog Sayfası Üst Alanı</strong>
                      <small>Blog sayfasının büyük karşılama alanındaki metin ve görsel.</small>
                    </div>
                  </div>

                  <div className="admin100Blog__settingsGrid">
                    <label><span>Üst Etiket</span><input value={blogEditor.heroEyebrow || ""} onChange={(e)=>setBlogEditor({...blogEditor,heroEyebrow:e.target.value})}/></label>
                    <label><span>Ana Başlık</span><input value={blogEditor.heroTitle || ""} onChange={(e)=>setBlogEditor({...blogEditor,heroTitle:e.target.value})}/></label>
                    <label><span>Gold Başlık</span><input value={blogEditor.heroAccent || ""} onChange={(e)=>setBlogEditor({...blogEditor,heroAccent:e.target.value})}/></label>
                    <label className="is-wide"><span>Açıklama</span><textarea rows="3" value={blogEditor.heroDescription || ""} onChange={(e)=>setBlogEditor({...blogEditor,heroDescription:e.target.value})}/></label>
                    <label className="is-wide"><span>Hero Görsel URL</span><input value={blogEditor.heroImage || ""} onChange={(e)=>setBlogEditor({...blogEditor,heroImage:e.target.value})}/></label>
                  </div>

                  <button className="admin100Blog__goldButton" type="submit" disabled={blogEditorSaving}>
                    {blogEditorSaving ? "Kaydediliyor..." : "Blog Üst Alanını Kaydet"}
                  </button>
                </form>

                <form className="admin100Blog__editor" onSubmit={saveBlogPost}>
                  <div className="admin100Blog__sectionHead">
                    <span>02</span>
                    <div>
                      <strong>{editingBlogId ? "Yazıyı Düzenle" : "Yeni Blog Yazısı"}</strong>
                      <small>Başlık, kapak görseli ve yazı içeriğini tek ekrandan hazırlayın.</small>
                    </div>
                    {editingBlogId && <button type="button" className="admin100Blog__cancel" onClick={resetBlogForm}>Düzenlemeyi İptal Et</button>}
                  </div>

                  <div className="admin100Blog__editorGrid">
                    <div className="admin100Blog__fields">
                      <label>
                        <span>Yazı Başlığı *</span>
                        <input
                          value={blogForm.title}
                          onChange={(e)=>setBlogForm({...blogForm,title:e.target.value,slug:editingBlogId ? blogForm.slug : createBlogSlug(e.target.value)})}
                          placeholder="Örn. Aile İçinde Sağlıklı İletişim"
                        />
                      </label>

                      <div className="admin100Blog__row">
                        <label>
                          <span>Kategori</span>
                          <input
                            list="blog-category-options"
                            value={blogForm.category}
                            onChange={(e)=>setBlogForm({...blogForm,category:e.target.value})}
                            placeholder="Kategori"
                          />
                          <datalist id="blog-category-options">
                            {(blogEditor.categories || blogCategories).filter((item)=>item!=="Tümü").map((item)=><option key={item} value={item}/>)}
                          </datalist>
                        </label>
                        <label>
                          <span>Okuma Süresi</span>
                          <input value={blogForm.readTime} onChange={(e)=>setBlogForm({...blogForm,readTime:e.target.value})} placeholder="5 dk okuma"/>
                        </label>
                      </div>

                      <div className="admin100Blog__row">
                        <label><span>Tarih</span><input value={blogForm.date} onChange={(e)=>setBlogForm({...blogForm,date:e.target.value})}/></label>
                        <label><span>Sıralama</span><input type="number" value={blogForm.sortOrder} onChange={(e)=>setBlogForm({...blogForm,sortOrder:e.target.value})}/></label>
                      </div>

                      <label>
                        <span>Kısa Açıklama *</span>
                        <textarea rows="4" value={blogForm.excerpt} onChange={(e)=>setBlogForm({...blogForm,excerpt:e.target.value})} placeholder="Kartta ve yazı girişinde görünecek kısa açıklama..."/>
                      </label>

                      <label>
                        <span>Yazının Tamamı *</span>
                        <textarea
                          rows="18"
                          value={blogForm.body}
                          onChange={(e)=>setBlogForm({...blogForm,body:e.target.value})}
                          placeholder={"Yazınızı buraya yazın.\n\nYeni paragraf için bir boş satır bırakın.\n\nPanel paragrafları otomatik ayırır."}
                        />
                      </label>

                      <label>
                        <span>Öne Çıkan Alıntı — İsteğe Bağlı</span>
                        <textarea rows="3" value={blogForm.quote} onChange={(e)=>setBlogForm({...blogForm,quote:e.target.value})} placeholder="Yazının içinde büyük alıntı olarak gösterilecek kısa cümle..."/>
                      </label>

                      <div className="admin100Blog__row">
                        <label>
                          <span>Yayın Durumu</span>
                          <select value={blogForm.status} onChange={(e)=>setBlogForm({...blogForm,status:e.target.value})}>
                            <option value="published">Yayında</option>
                            <option value="draft">Taslak</option>
                          </select>
                        </label>
                        <label className="admin100Blog__check">
                          <input type="checkbox" checked={blogForm.featured} onChange={(e)=>setBlogForm({...blogForm,featured:e.target.checked})}/>
                          <span>Bu yazıyı öne çıkar</span>
                        </label>
                      </div>
                    </div>

                    <aside className="admin100Blog__imageBox">
                      <span>KAPAK GÖRSELİ *</span>
                      <div className="admin100Blog__preview">
                        {blogForm.image ? (
                          <img src={blogForm.image} alt="Blog kapak önizleme" onError={(e)=>{e.currentTarget.style.display="none"}}/>
                        ) : (
                          <div><Icon name="image" size={30}/><p>Henüz görsel seçilmedi</p></div>
                        )}
                      </div>

                      <label className="admin100Blog__upload">
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          onChange={(e)=>uploadBlogImage(e.target.files?.[0])}
                        />
                        <Icon name="plus" size={17}/>
                        {blogImageUploading ? "Görsel Yükleniyor..." : "Bilgisayardan Görsel Seç"}
                      </label>

                      <small>JPG, PNG veya WebP · Maksimum 6 MB</small>

                      <div className="admin100Blog__or"><span/>veya<span/></div>

                      <label className="admin100Blog__url">
                        <span>Görsel URL</span>
                        <input value={blogForm.image} onChange={(e)=>setBlogForm({...blogForm,image:e.target.value})} placeholder="https://..."/>
                      </label>

                      <label className="admin100Blog__slug">
                        <span>Yazı Linki</span>
                        <div><b>/blog/</b><input value={blogForm.slug} onChange={(e)=>setBlogForm({...blogForm,slug:createBlogSlug(e.target.value)})}/></div>
                      </label>
                    </aside>
                  </div>

                  <div className="admin100Blog__publishBar">
                    <div>
                      <strong>{editingBlogId ? "Değişiklikleri kaydet" : "Yazıyı bloga ekle"}</strong>
                      <span>Kaydedildiğinde blog kartı ve detay sayfası otomatik oluşur.</span>
                    </div>
                    <button type="submit" disabled={blogEditorSaving || blogImageUploading}>
                      {blogEditorSaving ? "Kaydediliyor..." : editingBlogId ? "Yazıyı Güncelle" : "Yazıyı Yayınla"}
                      {!blogEditorSaving && <Icon name="arrow" size={15}/>}
                    </button>
                  </div>
                </form>

                <section className="admin100Blog__library">
                  <div className="admin100Blog__sectionHead">
                    <span>03</span>
                    <div>
                      <strong>Blog Yazıları</strong>
                      <small>{(blogEditor.posts || []).length} kayıt · Düzenleme, yayın ve öne çıkarma kontrolleri.</small>
                    </div>
                  </div>

                  <div className="admin100Blog__list">
                    {(blogEditor.posts || [])
                      .slice()
                      .sort((a,b)=>Number(a.sortOrder||999)-Number(b.sortOrder||999))
                      .map((post)=>(
                      <article key={post.id || post.slug}>
                        <img src={post.image} alt="" onError={(e)=>{e.currentTarget.src=servicesHeroRoom}}/>
                        <div className="admin100Blog__postCopy">
                          <div>
                            <span>{post.category}</span>
                            {post.featured && <b>ÖNE ÇIKAN</b>}
                            <em className={post.status === "draft" ? "is-draft" : ""}>{post.status === "draft" ? "TASLAK" : "YAYINDA"}</em>
                          </div>
                          <strong>{post.title}</strong>
                          <small>{post.date} · {post.readTime} · /blog/{post.slug}</small>
                        </div>
                        <div className="admin100Blog__actions">
                          <button type="button" onClick={()=>editBlogPost(post)}>Düzenle</button>
                          <button type="button" onClick={()=>toggleBlogPostStatus(post)}>{post.status === "draft" ? "Yayınla" : "Taslağa Al"}</button>
                          {!post.featured && <button type="button" onClick={()=>featureBlogPost(post)}>Öne Çıkar</button>}
                          <a href={`#/blog/${post.slug}`} target="_blank" rel="noreferrer">Görüntüle</a>
                          <button type="button" className="is-delete" onClick={()=>deleteBlogPost(post)}>Sil</button>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              </>
            )}
          </section>
        )}

        {activeTab === "appointments" && (
          <section className="admin70Appointments">
            <div className="admin70Appointments__head">
              <div>
                <span>RANDEVU YÖNETİMİ</span>
                <h2>Danışan randevu talepleri</h2>
                <p>
                  Bekleyen, onaylanan ve iptal edilen randevuları filtreleyebilir;
                  gerektiğinde kayıtları kalıcı olarak silebilirsiniz.
                </p>
              </div>

              <button type="button" onClick={loadAppointments} disabled={appointmentsLoading}>
                {appointmentsLoading ? "Yenileniyor..." : "Listeyi Yenile"}
              </button>
            </div>

            <div className="admin76Filters">
              {[
                ["all", "Tümü", appointments.length],
                ["pending", "Bekleyen", appointments.filter((item)=>item.status==="pending").length],
                ["approved", "Onaylanan", appointments.filter((item)=>item.status==="approved").length],
                ["cancelled", "İptal Edilen", appointments.filter((item)=>item.status==="cancelled").length],
              ].map(([key,label,count]) => (
                <button
                  key={key}
                  type="button"
                  className={appointmentFilter === key ? "is-active" : ""}
                  onClick={()=>setAppointmentFilter(key)}
                >
                  <span>{label}</span>
                  <b>{count}</b>
                </button>
              ))}
            </div>

            {appointmentsError && (
              <div className="admin70Appointments__error">
                <Icon name="info" size={18} />
                <p>{appointmentsError}</p>
              </div>
            )}

            {appointmentsLoading ? (
              <div className="admin70Appointments__empty">Randevular yükleniyor...</div>
            ) : filteredAppointments.length === 0 ? (
              <div className="admin70Appointments__empty">
                Bu filtrede randevu kaydı bulunmuyor.
              </div>
            ) : (
              <div className="admin70Appointments__list">
                {filteredAppointments.map((item) => (
                  <article className="admin70AppointmentCard" key={item.id}>
                    <div className="admin70AppointmentCard__top">
                      <div>
                        <span className={`admin70Status admin70Status--${item.status}`}>
                          {statusLabel(item.status)}
                        </span>
                        <h3>{item.full_name}</h3>
                        <p>{item.service} • {item.format}</p>
                      </div>

                      <div className="admin70AppointmentCard__date">
                        <strong>{item.appointment_date}</strong>
                        <span>{String(item.appointment_time).slice(0, 5)}</span>
                      </div>
                    </div>

                    <div className="admin70AppointmentCard__details">
                      <div>
                        <small>Telefon</small>
                        <a href={`tel:${item.phone}`}>{item.phone}</a>
                      </div>
                      <div>
                        <small>E-posta</small>
                        <a href={`mailto:${item.email}`}>{item.email}</a>
                      </div>
                      <div>
                        <small>Yaş</small>
                        <strong>{item.age}</strong>
                      </div>
                      <div>
                        <small>Kayıt Tarihi</small>
                        <strong>
                          {new Date(item.created_at).toLocaleString("tr-TR")}
                        </strong>
                      </div>
                    </div>

                    {item.note && (
                      <div className="admin70AppointmentCard__note">
                        <small>Danışan Notu</small>
                        <p>{item.note}</p>
                      </div>
                    )}

                    <div className="admin70AppointmentCard__actions">
                      <button
                        type="button"
                        className="is-approve"
                        disabled={updatingId === item.id || item.status === "approved"}
                        onClick={() => updateAppointmentStatus(item.id, "approved")}
                      >
                        <Icon name="check" size={15} />
                        Onayla
                      </button>

                      <button
                        type="button"
                        className="is-cancel"
                        disabled={updatingId === item.id || item.status === "cancelled"}
                        onClick={() => updateAppointmentStatus(item.id, "cancelled")}
                      >
                        İptal Et
                      </button>

                      <button
                        type="button"
                        className="is-delete"
                        disabled={updatingId === item.id}
                        onClick={() => deleteAppointment(item.id)}
                      >
                        Kalıcı Sil
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === "process" && (
          <section className="admin73Cms admin81Process">
            <div className="admin73Cms__head">
              <div>
                <span>SİTE İÇERİKLERİ / SÜREÇ</span>
                <h2>Süreç sayfasındaki tüm metinleri düzenleyin.</h2>
                <p>Üst alan, süreç adımları, güven kartları ve danışan yorumlarını kod açmadan yönetebilirsiniz.</p>
              </div>
              <button type="button" onClick={loadProcessEditor} disabled={processEditorLoading}>
                {processEditorLoading ? "Yükleniyor..." : "İçeriği Yenile"}
              </button>
            </div>

            {processEditorMessage && <div className="admin73Cms__message">{processEditorMessage}</div>}

            {processEditorLoading ? <div className="admin73Cms__loading">Süreç içeriği yükleniyor...</div> : (
              <form className="admin73Cms__form" onSubmit={saveProcessEditor}>
                <div className="admin73Cms__section">
                  <div className="admin73Cms__sectionTitle"><span>01</span><div><strong>Sayfa Üst Alanı</strong><small>Süreç sayfasının ana başlık ve açıklaması.</small></div></div>
                  <div className="admin73Cms__fields">
                    <label><span>Üst Etiket</span><input value={processEditor.heroEyebrow} onChange={(e)=>setProcessEditor({...processEditor,heroEyebrow:e.target.value})}/></label>
                    <label><span>Başlık</span><input value={processEditor.heroTitle} onChange={(e)=>setProcessEditor({...processEditor,heroTitle:e.target.value})}/></label>
                    <label><span>Vurgulu Başlık</span><input value={processEditor.heroAccent} onChange={(e)=>setProcessEditor({...processEditor,heroAccent:e.target.value})}/></label>
                    <label className="is-wide"><span>Açıklama</span><textarea rows="4" value={processEditor.heroDescription} onChange={(e)=>setProcessEditor({...processEditor,heroDescription:e.target.value})}/></label>
                    <label><span>Bölüm Etiketi</span><input value={processEditor.sectionEyebrow} onChange={(e)=>setProcessEditor({...processEditor,sectionEyebrow:e.target.value})}/></label>
                    <label><span>Bölüm Başlığı</span><input value={processEditor.sectionTitle} onChange={(e)=>setProcessEditor({...processEditor,sectionTitle:e.target.value})}/></label>
                  </div>
                </div>

                <div className="admin73Cms__section">
                  <div className="admin73Cms__sectionTitle"><span>02</span><div><strong>Süreç Adımları</strong><small>Beş adımın başlığını ve açıklamasını ayrı ayrı değiştirin.</small></div></div>
                  <div className="admin81Process__stack">
                    {processEditor.steps.map((item,index)=>(
                      <div className="admin81Process__item" key={index}>
                        <b>{item.no}. ADIM</b>
                        <input value={item.title} onChange={(e)=>updateProcessStep(index,"title",e.target.value)} placeholder="Başlık"/>
                        <textarea rows="3" value={item.text} onChange={(e)=>updateProcessStep(index,"text",e.target.value)} placeholder="Açıklama"/>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="admin73Cms__section">
                  <div className="admin73Cms__sectionTitle"><span>03</span><div><strong>Güven Kartları</strong><small>Gizlilik, yaklaşım, görüşme ve destek kartlarını yönetin.</small></div></div>
                  <div className="admin81Process__stack">
                    {processEditor.trustItems.map((item,index)=>(
                      <div className="admin81Process__item" key={index}>
                        <b>KART {index+1}</b>
                        <input value={item.title} onChange={(e)=>updateProcessTrust(index,"title",e.target.value)} placeholder="Kart başlığı"/>
                        <textarea rows="2" value={item.text} onChange={(e)=>updateProcessTrust(index,"text",e.target.value)} placeholder="Kart açıklaması"/>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="admin73Cms__section">
                  <div className="admin73Cms__sectionTitle"><span>04</span><div><strong>Danışan Deneyimleri</strong><small>Başlıkları, açıklamayı, alt notu ve yorumların tamamını yönetin.</small></div></div>
                  <div className="admin73Cms__fields">
                    <label><span>Üst Etiket</span><input value={processEditor.testimonialsEyebrow} onChange={(e)=>setProcessEditor({...processEditor,testimonialsEyebrow:e.target.value})}/></label>
                    <label><span>Başlık</span><input value={processEditor.testimonialsTitle} onChange={(e)=>setProcessEditor({...processEditor,testimonialsTitle:e.target.value})}/></label>
                    <label className="is-wide"><span>Açıklama</span><textarea rows="3" value={processEditor.testimonialsDescription} onChange={(e)=>setProcessEditor({...processEditor,testimonialsDescription:e.target.value})}/></label>
                    <label className="is-wide"><span>Bilgilendirme Notu</span><textarea rows="3" value={processEditor.testimonialsNote} onChange={(e)=>setProcessEditor({...processEditor,testimonialsNote:e.target.value})}/></label>
                  </div>

                  <div className="admin81Process__testimonialHead">
                    <strong>Yorumlar</strong>
                    <button type="button" onClick={addProcessTestimonial}>+ Yeni Yorum Ekle</button>
                  </div>
                  <div className="admin81Process__stack">
                    {(processEditor.testimonials || []).map((item,index)=>(
                      <div className="admin81Process__item admin81Process__testimonial" key={index}>
                        <div className="admin81Process__itemTop"><b>YORUM {index+1}</b><button type="button" onClick={()=>removeProcessTestimonial(index)}>Sil</button></div>
                        <div className="admin81Process__row">
                          <input value={item.person} onChange={(e)=>updateProcessTestimonial(index,"person",e.target.value)} placeholder="İsim / rumuz"/>
                          <input value={item.title} onChange={(e)=>updateProcessTestimonial(index,"title",e.target.value)} placeholder="Yorum türü"/>
                        </div>
                        <textarea rows="7" value={item.text} onChange={(e)=>updateProcessTestimonial(index,"text",e.target.value)} placeholder="Danışan yorumunun tamamı"/>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="admin73Cms__savebar">
                  <div><strong>Süreç sayfasını yayınla</strong><span>Kaydettiğiniz değişiklikler canlı süreç sayfasında kullanılacaktır.</span></div>
                  <button type="submit" disabled={processEditorSaving}>{processEditorSaving ? "Kaydediliyor..." : "Süreç Sayfasını Kaydet"}</button>
                </div>
              </form>
            )}
          </section>
        )}

        {activeTab === "content" && (
          <section className="admin74Media">
            <div className="admin74Media__head">
              <div>
                <span>YOUTUBE & PODCAST YÖNETİMİ</span>
                <h2>İçerikleri kod açmadan yayınlayın.</h2>
                <p>
                  YouTube video linklerini, Spotify podcast bölümlerini ve kanal
                  bağlantılarını buradan yönetebilirsiniz.
                </p>
              </div>
              <button type="button" onClick={loadMediaAdmin} disabled={mediaLoading}>
                {mediaLoading ? "Yükleniyor..." : "İçeriği Yenile"}
              </button>
            </div>

            <div className="admin74Media__channels">
              <div className="admin74Media__channelTitle">
                <span>01</span>
                <div>
                  <strong>Kanal Bağlantıları</strong>
                  <small>YouTube kanalınız ve Spotify podcast sayfanız.</small>
                </div>
              </div>

              <div className="admin74Media__channelFields">
                <label>
                  <span>YouTube Kanal Linki</span>
                  <input
                    value={channelEditor.youtubeChannelUrl}
                    onChange={(e)=>setChannelEditor({...channelEditor,youtubeChannelUrl:e.target.value})}
                    placeholder="https://www.youtube.com/@kanaliniz"
                  />
                </label>
                <label>
                  <span>Spotify Podcast / Show Linki</span>
                  <input
                    value={channelEditor.spotifyChannelUrl}
                    onChange={(e)=>setChannelEditor({...channelEditor,spotifyChannelUrl:e.target.value})}
                    placeholder="https://open.spotify.com/show/..."
                  />
                </label>
              </div>

              <button
                className="admin74Media__channelSave"
                type="button"
                onClick={saveChannelLinks}
                disabled={mediaSaving}
              >
                Kanal Bağlantılarını Kaydet
                <Icon name="check" size={15}/>
              </button>
            </div>

            <div className="admin74Media__grid">
              <article className="admin74Media__panel">
                <div className="admin74Media__panelHead">
                  <span>02 / YENİ İÇERİK</span>
                  <h3>Video veya podcast ekleyin.</h3>
                </div>

                <form className="admin74Media__form" onSubmit={addContent}>
                  <label>
                    <span>İçerik Türü</span>
                    <select
                      value={mediaForm.type}
                      onChange={(e)=>setMediaForm({...mediaForm,type:e.target.value})}
                    >
                      <option value="youtube">YouTube Video</option>
                      <option value="podcast">Spotify Podcast</option>
                    </select>
                  </label>

                  <label>
                    <span>Başlık</span>
                    <input
                      value={mediaForm.title}
                      onChange={(e)=>setMediaForm({...mediaForm,title:e.target.value})}
                      placeholder="İçerik başlığı"
                      required
                    />
                  </label>

                  <label>
                    <span>Kategori</span>
                    <input
                      value={mediaForm.category}
                      onChange={(e)=>setMediaForm({...mediaForm,category:e.target.value})}
                      placeholder="İlişkiler / Aile / Bireysel"
                    />
                  </label>

                  <label>
                    <span>Süre</span>
                    <input
                      value={mediaForm.duration}
                      onChange={(e)=>setMediaForm({...mediaForm,duration:e.target.value})}
                      placeholder="12:45"
                    />
                  </label>

                  <label className="admin74Media__full">
                    <span>{mediaForm.type === "youtube" ? "YouTube Video Linki" : "Spotify Bölüm Linki"}</span>
                    <input
                      value={mediaForm.url}
                      onChange={(e)=>setMediaForm({...mediaForm,url:e.target.value})}
                      placeholder={mediaForm.type === "youtube" ? "https://youtu.be/..." : "https://open.spotify.com/episode/..."}
                      required
                    />
                  </label>

                  <label className="admin74Media__full">
                    <span>Kısa Açıklama</span>
                    <textarea
                      rows="5"
                      value={mediaForm.description}
                      onChange={(e)=>setMediaForm({...mediaForm,description:e.target.value})}
                      placeholder="İçerik hakkında kısa açıklama..."
                    />
                  </label>

                  <label>
                    <span>Yayın Durumu</span>
                    <select
                      value={mediaForm.status}
                      onChange={(e)=>setMediaForm({...mediaForm,status:e.target.value})}
                    >
                      <option value="published">Hemen Yayınla</option>
                      <option value="draft">Taslak</option>
                    </select>
                  </label>

                  <label>
                    <span>Sıralama</span>
                    <input
                      type="number"
                      value={mediaForm.sort_order}
                      onChange={(e)=>setMediaForm({...mediaForm,sort_order:e.target.value})}
                    />
                  </label>

                  <button type="submit" disabled={mediaSaving}>
                    {mediaSaving ? "Kaydediliyor..." : "İçeriği Ekle"}
                    {!mediaSaving && <Icon name="plus" size={16}/>}
                  </button>
                </form>
              </article>

              <article className="admin74Media__panel">
                <div className="admin74Media__panelHead">
                  <span>03 / YAYIN AKIŞI</span>
                  <h3>Eklenen içerikler</h3>
                </div>

                {mediaLoading ? (
                  <div className="admin74Media__empty">İçerikler yükleniyor...</div>
                ) : mediaItems.length === 0 ? (
                  <div className="admin74Media__empty">Henüz içerik eklenmedi.</div>
                ) : (
                  <div className="admin74Media__list">
                    {mediaItems.map((item) => (
                      <div className="admin74Media__item" key={item.id}>
                        <div className="admin74Media__type">
                          <Icon name={item.type === "youtube" ? "video" : "mic"} size={18}/>
                        </div>
                        <div className="admin74Media__itemCopy">
                          <strong>{item.title}</strong>
                          <span>
                            {item.type === "youtube" ? "YouTube" : "Spotify Podcast"}
                            {item.category ? ` • ${item.category}` : ""}
                          </span>
                          <small>{item.url}</small>
                        </div>
                        <div className="admin74Media__itemActions">
                          <b className={item.status === "published" ? "is-live" : ""}>
                            {item.status === "published" ? "Yayında" : "Taslak"}
                          </b>
                          <button
                            type="button"
                            onClick={()=>updateMediaStatus(item.id,item.status === "published" ? "draft" : "published")}
                            disabled={mediaSaving}
                          >
                            {item.status === "published" ? "Taslağa Al" : "Yayınla"}
                          </button>
                          <button
                            type="button"
                            className="is-delete"
                            onClick={()=>removeContent(item.id)}
                            disabled={mediaSaving}
                          >
                            Sil
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            </div>

            {mediaMessage && (
              <div className={`admin74Media__message ${mediaMessage.includes("başarıyla") || mediaMessage.includes("silindi") ? "is-success" : "is-error"}`}>
                {mediaMessage}
              </div>
            )}
          </section>
        )}

        {["articles", "users", "settings"].includes(activeTab) && (
          <article className="adminDemo__panel adminDemo__placeholder">
            <div className="adminDemo__placeholderIcon">
              <Icon
                name={
                  activeTab === "users"
                    ? "users"
                    : activeTab === "settings"
                    ? "settings"
                    : "edit"
                }
                size={35}
              />
            </div>
            <span>SONRAKİ MODÜL</span>
            <h2>
              {activeTab === "users"
                ? "Admin ve moderatör hesapları burada yönetilecek."
                : activeTab === "settings"
                ? "Site ve panel ayarları burada yer alacak."
                : "Blog ve diğer site içerikleri burada yönetilecek."}
            </h2>
          </article>
        )}
      </section>
    </main>
  );
}

function ProcessDetailPage({ content }) {
  const [showAllTestimonials, setShowAllTestimonials] = useState(false);
  const [timelineProgress, setTimelineProgress] = useState(0);

  useEffect(() => {
    const updateTimeline = () => {
      const flow = document.querySelector(".prc53Flow");
      if (!flow) return;
      const rect = flow.getBoundingClientRect();
      const start = window.innerHeight * 0.72;
      const distance = Math.max(rect.height - window.innerHeight * 0.28, 1);
      const progress = Math.max(0, Math.min(1, (start - rect.top) / distance));
      setTimelineProgress(progress);
    };

    updateTimeline();
    window.addEventListener("scroll", updateTimeline, { passive: true });
    window.addEventListener("resize", updateTimeline);
    return () => {
      window.removeEventListener("scroll", updateTimeline);
      window.removeEventListener("resize", updateTimeline);
    };
  }, []);


  const fallbackTestimonials = [
    { no: "01", title: "Danışan Yorumu", person: "Danışan", text: `Sevgili Kaan Hocam, o kadar iyi geldiniz ki.. Yıllardır üstesinden gelemediğim ailevi problemlerime, eşimle olan sıkıntılarıma ve aile huzurumuza seanslarınızla ne kadar iyi geldiğinizi anlatamam size.\n\nSeanslarınız oldukça içten, özverili, hassas ve güven veriyor olması benim için çok önemliydi. Bu önyargılarımı ve ailevi problemlerimizi sizlerle aştım. Ne kadar teşekkür etsem azdır.\n\nEmeğinize sağlık 🙏🏻` },
    { no: "02", title: "Danışan Yorumu", person: "Danışan", text: `Kaan Bey ile 3 Kasım 2024 tarihinde online olarak terapiye başladık ve hayatımın en doğru kararı olduğunu söyleyebilirim.\n\nBenim majör depresyon ve OKB problemim vardı. Tırnak eti yolma, sürekli sayı sayma, güvensizlik, kaygı problemleri ve en önemlisi de öz saygım yoktu.\n\nTerapiler sonucu bunların geçmişten gelen travmalara bağlı olduğunu çözdük ve onara onara devam ettik. Kendisinin içten ve samimi konuşmaları beni çok rahatlatıyor, terapi günü gelsin istiyordum. Terapiden sonra çok mutlu olmaya başladım. Kendime olan özgüvenim yavaş yavaş yerine gelmeye ve depresyon halinden çıkmaya başladım.\n\nKaan Bey’in verdiği ödevleri, stres anında yapmam gerekenleri yaptım. Sayı saymaktan kurtuldum, tırnak eti yolma durumunu aştım. Sınır koymayı, hayır demeyi, kendim için bir şeyler yapmayı çok sevdim…\n\nKaan Bey’i iyi ki tanıdım, iyi ki bu mesleği seçmiş ve bizim gibi bazı problemleri olan insanların hayatlarına küçük dokunuşlarla yeniden gelmesini sağlıyor.\n\nHer şey için çok teşekkür ediyorum. Başarılarınızın devamını diliyorum…` },
    { no: "03", title: "Çift Danışan Yorumu", person: "Çift Danışan", text: `Seansa başlamadan önce birbirimize karşı vakit ayıramıyorduk, şimdi ise daha çok zaman geçiriyoruz, birbirimizi anlıyoruz, daha çok dinliyoruz.\n\nSeansdan önce öfkeli ve kıskançlık vardı ama şu anda onların hepsi bitti ve daha çok sevgi ve dinlemeye başladık. Tek değil de bir olduğumuzu anladık.\n\nBu konuda senin de katkın var, çok teşekkür ediyoruz.` },
    { no: "04", title: "Danışan Yorumu", person: "S.K.", text: `Yoğun ve yüksek düzeyde stres, anksiyete ve kaygı bozukluğu yaşıyordum. Uzun zamandır süren bu rahatsız olduğum konuları Kaan Hoca ile pürüzsüz şekilde sabırla aştık.\n\nAlanında oldukça uzman ve işini layıkıyla yapan birisi. Toplu taşımalara binme, akşam dışarı çıkamama gibi korkularım vardı. Hepsini aştık. OKB’den kurtulduğuma inanamıyorum.` },
    { no: "05", title: "Danışan Yorumu", person: "C.A.", text: `Ekonomik özgürlüğüm yoktu, çıkış yolum yoktu, her türlü şiddeti kabul etmiştim, kendimi insan haricinde her türlü nesne gibi sıradan, basit ve değersiz görüyordum.\n\nKaan Hocamızdan zamanında destek alan bir arkadaşımızın tavsiyesi ile benim de kendisiyle yolum kesişti. Bu kadar değişeceğime hiç ümidim yoktu.\n\nÖn görüşmeden itibaren o kadar işini bilerek yaptığını hissettirdi ki… Terapist unvanından ziyade “yol gösterici, arabulucu, destek verici” nitelikleri ve beni her koşulda inanarak desteklemesi beni yeniden ayağa kaldırdı.\n\nFlört şiddetimi artık rızamla, sesimi çıkararak ve haklarımı arayarak bitirmeme yardımcı oldu.\n\nKadınların; her şeyi kabul edici, ses çıkarmayan, sorgusuz onaylayan değil, tam tersine şiddet karşısında haklarını arayan, sesini çıkaran, erkek şiddetinin karşısında dimdik durması gerektiğinin özgüvenini bana aşıladı.\n\nTeşekkür ediyorum.` },
    { no: "06", title: "Danışan Yorumu", person: "E.Y.", text: `Eşimle 13 yıllık evlilik birlikteliğimiz vardı. Yıllarca evlilik içerisinde sevgi ve saygı olmadan rutine getirdiğimizi Kaan Bey ile keşfettik.\n\nBirbirimize söylemeye cesaret edemediğimiz, yıllarca içimizde biriktirdiğimiz her şeyi çift terapisi ile ilk kez saygı çerçevesinde konuşabildik.\n\nAile danışmanlığını sürekli yuva kuran bir yer olarak düşünüyordum. Ama bir kadın olarak boşanmanın da evlilik kadar normal bir şey olduğunu anladık.\n\nBoşanma sürecinde yardımları için çok teşekkür ederim. Yıpranmadık, sağlıklı yas sürecine girdik ve atlattık.` },
    { no: "07", title: "Çift Danışan Yorumu", person: "Y.K. – B.A.", text: `Biz evlilik yolunda sürekli inişli-çıkışlı ilişkiye sahip toksik bir çifttik. Baskılar, psikolojik şiddet karşılıklı ve sürekliydi.\n\nTavsiye üzerine Kaan Bey’i keşfettik. Evliliğe dair anlatılan “korkunç” hikâyeleri uzmanından sağlıklı bir şekilde dinleyerek kendimize ve davranışlarımıza dair ders çıkardık.\n\nİlişkideki birbirimize olan bağımlılığımızı ciddi oranda aştık.\n\nMeğerse çift olmak hayatı birbirine zindan etmek değil, herkes için devam eden hayatta birbirini gerçekten anlamak ve destek olmak demekmiş.\n\nKendisini herkese tavsiye ediyoruz.` },
    { no: "08", title: "Danışan Yorumu", person: "Danışan", text: `Kaan hocam iyi akşamlar. Bugün sizinle online olarak yaptığımız sürecin sonuna gelmenin heyecanı ile size teşekkür etmek için yazmak istedim.\n\nÖncelikle benim hayallerimin önünü sonsuza kadar açtığınız için, bana yeni bakış açıları kazandırdığınız için, hiç bilmediğim şeyleri öğrettiğiniz için minnettarım. 🙏🏻\n\nBoşanmadan önce ve boşanma sürecinde korkularımla yüzleşip özgürleştirdiğiniz için teşekkür borçluyum size.\n\nŞu an sınırlarım yok ve “elalem ne der” zerre umurumda değil.\n\nSayenizde güçlüyüm, güçlendim ve bütün kadınlara güçlerinin ne olduğunu hep anlatacağım. 💪🏻🙂` },
    { no: "09", title: "Danışan Yorumu", person: "Danışan", text: `Ben 24 Ekim 2025 tarihi ile sizinle seansa başladım. Üniversite öğrencisiyim, bu yüzden aşırı derecede stres, anksiyete ve panik atak problemleri yaşıyordum.\n\nAma seanslara başladıktan sonra stresle başa çıkmayı, kontrol altına almayı öğrendim.\n\nAyrıca hayır diyememe ve sınır koyamama gibi problemlerim de vardı. Artık kendi değerimi biliyor ve sınır koyabiliyorum.\n\nİyi ki sizinle tanışıp seanslara devam ettim. Size çok teşekkür ederim.` },
    { no: "10", title: "Danışan Yorumu", person: "Danışan", text: `Terapi sürecine dair tüm çekincelerimle kapınızı çalmıştım. İlk günden itibaren kurduğunuz güvenli alan hayatımda çok anlamlı bir dönüm noktası oldu.\n\nSayenizde artık hayata ve olaylara çok daha sağlam bir pencereden bakıyorum.\n\nProfesyonelliğiniz ve her seanstan yeni bir farkındalıkla ayrılmamı sağladığınız için size gönülden teşekkür ederim.\n\nDesteğiniz, sabrınız ve rehberliğiniz benim için çok değerliydi, bana çok iyi geldiniz.\n\nİyi ki yollarımız kesişmiş. 🙏🏻` },
  ];
  const steps = content.steps?.length ? content.steps : defaultProcessContent.steps;
  const trustItems = content.trustItems?.length ? content.trustItems : defaultProcessContent.trustItems;
  const testimonials = content.testimonials?.length ? content.testimonials : fallbackTestimonials;
  const visibleTestimonials = showAllTestimonials ? testimonials : testimonials.slice(0, 3);

  return (
    <main className="prc53">
      <section className="prc53Hero">
        <img loading="eager" decoding="async" fetchPriority="high" className="prc53Hero__image" src={processHeroDesk} alt="Defter, kalem, dünya küresi ve kum saati bulunan profesyonel çalışma masası" />
        <div className="prc53Hero__shade" />
        <a className="prc53Back" href="#/"><span>←</span>Ana Sayfaya Dön</a>
        <div className="prc53Hero__copy">
          <span className="prc53Eyebrow">{content.heroEyebrow}</span>
          <h1>{content.heroTitle}<br /><strong>{content.heroAccent}</strong></h1>
          <i />
          <p>{content.heroDescription}</p>
        </div>
      </section>

      <section className="prc53Flow">
        <div className="prc53SectionTitle"><span>{content.sectionEyebrow}</span><h2>{content.sectionTitle}</h2></div>
        <div className="prc53Steps" style={{ "--timeline-progress": timelineProgress }}>
          <div className="prc53TimelineTrack" aria-hidden="true">
            <span />
          </div>
          {steps.map((step, index) => (
            <article
              className={`prc53Step ${timelineProgress >= index / Math.max(steps.length - 1, 1) ? "is-timeline-active" : ""}`}
              key={step.no}
            >
              <div className="prc53Step__number">{step.no}</div>
              <div className="prc53Step__icon"><Icon name={step.icon} size={34} /></div>
              <h3>{step.title}</h3><p>{step.text}</p>
            </article>
          ))}
        </div>
        <div className="prc53Trust">
          {trustItems.map((item, index) => (
            <div key={`${item.title}-${index}`}>
              <div className="prc53Trust__icon"><Icon name={item.icon || "check"} size={27} /></div>
              <p><strong>{item.title}</strong><span>{item.text}</span></p>
            </div>
          ))}
        </div>
      </section>

      <section className="prc53Testimonials">
        <div className="prc53Testimonials__head">
          <div><span>{content.testimonialsEyebrow}</span><h2>{content.testimonialsTitle}</h2></div>
          <p>{content.testimonialsDescription}</p>
        </div>
        <div className={`prc53Testimonials__grid ${showAllTestimonials ? "is-expanded" : ""}`}>
          {visibleTestimonials.map((item) => (
            <article className="prc53TestimonialCard" key={item.no}>
              <div className="prc53TestimonialCard__top"><span className="prc53TestimonialCard__quote">“</span><small>{item.no}</small></div>
              <p>{item.text}</p>
              <div className="prc53TestimonialCard__footer">
                <div><strong>{item.person}</strong><span>{item.title}</span></div>
                <div className="prc53TestimonialCard__verified"><Icon name="check" size={15} />Mesaj</div>
              </div>
            </article>
          ))}
        </div>
        <div className="prc53Testimonials__actions">
          <button type="button" onClick={() => setShowAllTestimonials((value) => !value)}>
            {showAllTestimonials ? "Daha Az Göster" : "Daha Fazla Yorum"}<Icon name="arrow" size={16} />
          </button>
        </div>
        <div className="prc53Testimonials__note"><Icon name="info" size={17} /><p>{content.testimonialsNote}</p></div>
      </section>
    </main>
  );
}

function ServicesDetailPage({ content }) {
  const serviceCards = [
    {
      no: "01",
      icon: "user",
      title: content.individualTitle,
      short: content.individualShort,
      items: content.individualItems || [],
    },
    {
      no: "02",
      icon: "users",
      title: content.familyTitle,
      short: content.familyShort,
      items: content.familyItems || [],
    },
    {
      no: "03",
      icon: "heart",
      title: content.coupleTitle,
      short: content.coupleShort,
      items: content.coupleItems || [],
    },
    {
      no: "04",
      icon: "shield",
      title: content.psychosocialTitle,
      short: content.psychosocialShort,
      items: content.psychosocialItems || [],
    },
  ];

  return (
    <main className="svc52">
      <section className="svc52Hero">
        <img
          loading="lazy" decoding="async" className="svc52Hero__image"
          src={servicesHeroRoom}
          alt="Sakin ve profesyonel danışmanlık görüşme ortamı"
        />
        <div className="svc52Hero__shade" />

        <a className="svc52Back" href="#/">
          <span>←</span>
          Ana Sayfaya Dön
        </a>

        <div className="svc52Hero__copy">
          <span className="svc52Eyebrow">{content.heroEyebrow}</span>
          <h1>
            {content.heroTitle}
            <br />
            <strong>{content.heroAccent}</strong>
          </h1>
          <i />
          <p>{content.heroDescription}</p>
        </div>
      </section>

      <section className="svc52Quick">
        <div className="svc52SectionTitle">
          <span>{content.quickTitle}</span>
          <h2>İhtiyacınıza uygun desteği birlikte belirleyelim.</h2>
          <p>{content.quickDescription}</p>
        </div>

        <div className="svc73Grid">
          {serviceCards.map((service) => (
            <details className="svc73Card" key={service.no}>
              <summary>
                <div className="svc73Card__top">
                  <span className="svc73Card__no">{service.no}</span>
                  <div className="svc73Card__icon">
                    <Icon name={service.icon} size={27} />
                  </div>
                </div>

                <h3>{service.title}</h3>
                <p>{service.short}</p>

                <div className="svc73Card__action">
                  <span>Detaylı Bilgi</span>
                  <b>+</b>
                </div>
              </summary>

              <div className="svc73Card__details">
                <ul>
                  {service.items.map((item, index) => (
                    <li key={`${service.no}-${index}`}>{item}</li>
                  ))}
                </ul>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="svc52Trust">
        <div><Icon name="shield" size={22} /></div>
        <p>
          <strong>Gizlilik ve etik yaklaşım</strong>
          <span>
            Görüşmeler mesleki sınırlar, gizlilik ve kişiye özgü değerlendirme
            ilkeleri çerçevesinde yürütülür.
          </span>
        </p>
      </section>
    </main>
  );
}

function AboutDetailPage({ content = defaultAboutContent }) {
  const paragraphs = Array.isArray(content.paragraphs)
    ? content.paragraphs
    : String(content.paragraphs || "").split(/\n\s*\n/).map((item) => item.trim()).filter(Boolean);

  return (
    <main className="aboutDirectPage">
      <section className="aboutDirectHeader">
        <a href="#/" className="aboutDirectBack">← Ana Sayfaya Dön</a>
        <div className="aboutDirectHeader__title">
          <span>{content.eyebrow}</span>
          <h1>{content.firstName} <strong>{content.lastName}</strong></h1>
          <p>{content.role}</p>
        </div>
      </section>
      <section className="aboutDirectLayout">
        <article className="aboutDirectArticle">
          <div className="aboutDirectArticle__topline"><span>{content.storyLabel}</span><div /></div>
          {paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </article>
        <aside className="aboutDirectProfile">
          <div className="aboutDirectProfile__photo">
            <img loading="lazy" decoding="async" src={aboutPhoto} alt={`Sosyal Hizmet Uzmanı ve Aile Danışmanı ${content.profileName}`} />
          </div>
          <div className="aboutDirectProfile__body">
            <span>{content.profileEyebrow}</span>
            <h2>{content.profileName}</h2>
            <p>{content.profileRole}</p>
            <div className="aboutDirectProfile__line" />
            <div className="aboutDirectProfile__items">
              <div><Icon name="shield" size={18} /><span>{content.profileItem1}</span></div>
              <div><Icon name="lock" size={18} /><span>{content.profileItem2}</span></div>
              <div><Icon name="heart" size={18} /><span>{content.profileItem3}</span></div>
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

/* STEP 55 — PREMIUM ADMIN PANEL DEMO */
.adminDemo{
  min-height:100vh;
  display:grid;
  grid-template-columns:260px 1fr;
  background:
    radial-gradient(circle at 90% 0%,rgba(47,128,237,.06),transparent 26%),
    #020914;
  color:#f5f1eb;
}
.adminDemo__sidebar{
  position:sticky;
  top:0;
  height:100vh;
  padding:22px 17px;
  display:flex;
  flex-direction:column;
  border-right:1px solid rgba(255,255,255,.06);
  background:linear-gradient(180deg,#04101e,#020914);
}
.adminDemo__brand{
  display:flex;
  align-items:center;
  gap:12px;
  padding:7px 6px 24px;
  border-bottom:1px solid rgba(255,255,255,.055);
}
.adminDemo__mark{
  width:46px;height:46px;
  display:grid;place-items:center;
  border:1px solid rgba(218,151,65,.25);
  border-radius:12px;
  color:#d99a4a;
  font:400 20px Georgia,"Times New Roman",serif;
}
.adminDemo__brand strong{
  display:block;
  font-size:12px;
}
.adminDemo__brand span{
  display:block;
  margin-top:4px;
  color:#667487;
  font-size:9px;
}
.adminDemo__menu{
  margin-top:22px;
  display:flex;
  flex-direction:column;
  gap:7px;
}
.adminDemo__menu button{
  min-height:44px;
  padding:0 13px;
  display:flex;
  align-items:center;
  gap:12px;
  border:1px solid transparent;
  border-radius:10px;
  background:transparent;
  color:#7e8998;
  cursor:pointer;
  text-align:left;
  font-size:11px;
}
.adminDemo__menu button:hover{
  color:#d5dbe1;
  background:rgba(255,255,255,.025);
}
.adminDemo__menu button.is-active{
  color:#f4eee7;
  border-color:rgba(218,151,65,.22);
  background:linear-gradient(90deg,rgba(184,105,27,.16),rgba(47,128,237,.035));
  box-shadow:inset 3px 0 0 #d99a4a;
}
.adminDemo__menu svg{
  color:#d99a4a;
}
.adminDemo__sidebarFooter{
  margin-top:auto;
  padding-top:18px;
  border-top:1px solid rgba(255,255,255,.055);
}
.adminDemo__user{
  display:flex;
  align-items:center;
  gap:10px;
}
.adminDemo__user>div{
  width:38px;height:38px;
  display:grid;place-items:center;
  border-radius:50%;
  background:rgba(218,151,65,.10);
  color:#d99a4a;
  font-size:10px;
}
.adminDemo__user span{
  display:flex;
  flex-direction:column;
  gap:3px;
}
.adminDemo__user strong{font-size:10px}
.adminDemo__user small{color:#5d6a7b;font-size:8px}
.adminDemo__sidebarFooter>a{
  margin-top:14px;
  min-height:39px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  color:#7d8795;
  font-size:9px;
}
.adminDemo__main{
  min-width:0;
  padding:34px 3.4% 70px;
}
.adminDemo__topbar{
  display:flex;
  align-items:flex-end;
  justify-content:space-between;
  gap:25px;
  margin-bottom:27px;
}
.adminDemo__topbar span{
  color:#d99a4a;
  font-size:9px;
  font-weight:700;
  letter-spacing:.16em;
}
.adminDemo__topbar h1{
  margin-top:6px;
  font:400 38px Georgia,"Times New Roman",serif;
}
.adminDemo__demoBadge{
  padding:9px 12px;
  display:flex;
  align-items:center;
  gap:8px;
  border:1px solid rgba(52,212,134,.18);
  border-radius:999px;
  color:#86d7ad!important;
  font-size:8px!important;
}
.adminDemo__demoBadge>span{
  width:7px;height:7px;
  border-radius:50%;
  background:#34d486;
  box-shadow:0 0 12px rgba(52,212,134,.55);
}
.adminDemo__stats{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:12px;
}
.adminDemo__stats article{
  min-height:130px;
  padding:19px;
  border:1px solid rgba(218,151,65,.13);
  border-radius:14px;
  background:linear-gradient(145deg,#07182a,#04111e);
}
.adminDemo__stats article>div{
  width:40px;height:40px;
  display:grid;place-items:center;
  border:1px solid rgba(218,151,65,.19);
  border-radius:11px;
  color:#d99a4a;
}
.adminDemo__stats span{
  display:block;
  margin-top:14px;
  color:#778496;
  font-size:9px;
}
.adminDemo__stats strong{
  display:block;
  margin-top:3px;
  font:400 30px Georgia,"Times New Roman",serif;
}
.adminDemo__dashboardGrid{
  margin-top:13px;
  display:grid;
  grid-template-columns:1.3fr .7fr;
  gap:13px;
}
.adminDemo__panel{
  padding:23px;
  border:1px solid rgba(218,151,65,.13);
  border-radius:15px;
  background:
    radial-gradient(circle at 100% 0,rgba(47,128,237,.04),transparent 28%),
    linear-gradient(145deg,#07182a,#04111e);
  box-shadow:0 20px 50px rgba(0,0,0,.14);
}
.adminDemo__panelHead{
  display:flex;
  justify-content:space-between;
  gap:20px;
  align-items:center;
  padding-bottom:17px;
  border-bottom:1px solid rgba(255,255,255,.05);
}
.adminDemo__panelHead span{
  color:#d99a4a;
  font-size:8px;
  font-weight:700;
  letter-spacing:.15em;
}
.adminDemo__panelHead h2{
  margin-top:5px;
  font:400 23px Georgia,"Times New Roman",serif;
}
.adminDemo__panelHead button,
.adminDemo__panelHead>b{
  padding:9px 12px;
  border:1px solid rgba(218,151,65,.18);
  border-radius:8px;
  background:rgba(218,151,65,.04);
  color:#d99a4a;
  font-size:8px;
}
.adminDemo__miniList{
  margin-top:10px;
}
.adminDemo__miniList>div{
  min-height:58px;
  display:grid;
  grid-template-columns:38px 1fr auto;
  align-items:center;
  gap:11px;
  border-bottom:1px solid rgba(255,255,255,.045);
}
.adminDemo__miniIcon{
  width:34px;height:34px;
  display:grid;place-items:center;
  border:1px solid rgba(218,151,65,.15);
  border-radius:9px;
  color:#d99a4a;
}
.adminDemo__miniList span{
  display:flex;
  flex-direction:column;
  gap:4px;
}
.adminDemo__miniList strong{font-size:10px}
.adminDemo__miniList small{color:#667487;font-size:8px}
.adminDemo__miniList b,
.adminDemo__contentList b{
  padding:6px 8px;
  border-radius:999px;
  background:rgba(218,151,65,.08);
  color:#c79258;
  font-size:7px;
}
.adminDemo__miniList b.is-live,
.adminDemo__contentList b.is-live{
  color:#79d9a4;
  background:rgba(52,212,134,.08);
}
.adminDemo__welcome{
  display:flex;
  flex-direction:column;
  min-height:320px;
}
.adminDemo__welcome>span{
  color:#d99a4a;
  font-size:8px;
  font-weight:700;
  letter-spacing:.15em;
}
.adminDemo__welcome h2{
  margin-top:13px;
  font:400 30px/1.05 Georgia,"Times New Roman",serif;
}
.adminDemo__welcome p{
  margin-top:15px;
  color:#8994a1;
  font-size:10px;
  line-height:1.75;
}
.adminDemo__welcome button{
  margin-top:auto;
  min-height:45px;
  padding:0 14px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  border:1px solid rgba(218,151,65,.20);
  border-radius:9px;
  background:linear-gradient(135deg,rgba(183,106,28,.16),rgba(47,128,237,.03));
  color:#d99a4a;
  cursor:pointer;
  font-size:9px;
}
.adminDemo__contentGrid{
  display:grid;
  grid-template-columns:.9fr 1.1fr;
  gap:13px;
}
.adminDemo__form{
  margin-top:18px;
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:14px;
}
.adminDemo__form label{
  display:flex;
  flex-direction:column;
  gap:7px;
}
.adminDemo__form label>span{
  color:#7b8795;
  font-size:9px;
}
.adminDemo__form input,
.adminDemo__form select,
.adminDemo__form textarea{
  width:100%;
  border:1px solid rgba(255,255,255,.075);
  border-radius:9px;
  background:#03101d;
  color:#e6e8ea;
  padding:12px 13px;
  outline:none;
  font-size:10px;
}
.adminDemo__form input:focus,
.adminDemo__form select:focus,
.adminDemo__form textarea:focus{
  border-color:rgba(218,151,65,.40);
}
.adminDemo__full{
  grid-column:1/-1;
}
.adminDemo__submit{
  grid-column:1/-1;
  min-height:48px;
  padding:0 15px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  border:1px solid rgba(218,151,65,.25);
  border-radius:9px;
  background:linear-gradient(135deg,#a85e20,#d8963f);
  color:#fff;
  cursor:pointer;
  font-size:9px;
  font-weight:700;
}
.adminDemo__contentList{
  margin-top:10px;
}
.adminDemo__contentList>div{
  min-height:72px;
  display:grid;
  grid-template-columns:38px 1fr auto auto;
  gap:11px;
  align-items:center;
  border-bottom:1px solid rgba(255,255,255,.045);
}
.adminDemo__contentType{
  width:34px;height:34px;
  display:grid;place-items:center;
  border:1px solid rgba(218,151,65,.15);
  border-radius:9px;
  color:#d99a4a;
}
.adminDemo__contentList span{
  min-width:0;
  display:flex;
  flex-direction:column;
  gap:4px;
}
.adminDemo__contentList strong{font-size:10px}
.adminDemo__contentList small{color:#758192;font-size:8px}
.adminDemo__contentList em{
  max-width:280px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  color:#4e5d70;
  font-size:7px;
  font-style:normal;
}
.adminDemo__contentList button{
  padding:7px 9px;
  border:1px solid rgba(255,110,110,.15);
  border-radius:7px;
  background:rgba(255,80,80,.04);
  color:#c87979;
  cursor:pointer;
  font-size:8px;
}
.adminDemo__placeholder{
  min-height:420px;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  text-align:center;
}
.adminDemo__placeholderIcon{
  width:72px;height:72px;
  display:grid;place-items:center;
  border:1px solid rgba(218,151,65,.20);
  border-radius:18px;
  color:#d99a4a;
}
.adminDemo__placeholder>span{
  margin-top:25px;
  color:#d99a4a;
  font-size:8px;
  font-weight:700;
  letter-spacing:.15em;
}
.adminDemo__placeholder h2{
  max-width:650px;
  margin-top:10px;
  font:400 31px Georgia,"Times New Roman",serif;
}
.adminDemo__placeholder p{
  max-width:650px;
  margin-top:13px;
  color:#82909e;
  font-size:10px;
  line-height:1.7;
}
@media(max-width:1000px){
  .adminDemo{
    grid-template-columns:210px 1fr;
  }
  .adminDemo__stats{
    grid-template-columns:repeat(2,1fr);
  }
  .adminDemo__dashboardGrid,
  .adminDemo__contentGrid{
    grid-template-columns:1fr;
  }
}
@media(max-width:700px){
  .adminDemo{
    display:block;
  }
  .adminDemo__sidebar{
    position:relative;
    width:100%;
    height:auto;
    padding:14px;
  }
  .adminDemo__menu{
    display:grid;
    grid-template-columns:repeat(2,1fr);
  }
  .adminDemo__sidebarFooter{
    display:none;
  }
  .adminDemo__main{
    padding:24px 14px 60px;
  }
  .adminDemo__topbar{
    align-items:flex-start;
    flex-direction:column;
  }
  .adminDemo__stats{
    grid-template-columns:1fr 1fr;
  }
  .adminDemo__form{
    grid-template-columns:1fr;
  }
  .adminDemo__full,
  .adminDemo__submit{
    grid-column:auto;
  }
  .adminDemo__contentList>div{
    grid-template-columns:34px 1fr auto;
  }
  .adminDemo__contentList b{
    display:none;
  }
}

/* STEP 57 — PREMIUM CONTENT / VIDEO & PODCAST PAGE */
.cnt57{
  min-height:100vh;
  background:#03101f;
  color:#f4efe8;
}
.cnt57Hero{
  position:relative;
  height:410px;
  overflow:hidden;
  border-bottom:1px solid rgba(218,151,65,.37);
}
.cnt57Hero__image{
  position:absolute;
  inset:0;
  width:100%;
  height:100%;
  object-fit:cover;
  object-position:69% center;
}
.cnt57Hero__shade{
  position:absolute;
  inset:0;
  background:
    linear-gradient(90deg,#061426 0%,rgba(6,20,38,.98) 31%,rgba(6,20,38,.67) 51%,rgba(6,20,38,.12) 78%),
    linear-gradient(180deg,rgba(0,0,0,.05),rgba(0,0,0,.2));
}
.cnt57Back{
  position:absolute;
  z-index:3;
  left:5.3%;
  top:26px;
  display:flex;
  align-items:center;
  gap:8px;
  color:#aeb6c0;
  font-size:10px;
}
.cnt57Back span{color:#d99a4a;font-size:16px}
.cnt57Hero__copy{
  position:absolute;
  z-index:2;
  left:6.2%;
  top:86px;
  width:min(540px,43vw);
}
.cnt57Eyebrow{
  color:#dda04f;
  font-size:14px;
  font-weight:800;
  letter-spacing:.08em;
}
.cnt57Hero h1{
  margin:12px 0 0;
  font:400 clamp(44px,4.15vw,67px)/.96 Georgia,"Times New Roman",serif;
  letter-spacing:-.035em;
}
.cnt57Hero h1 strong{
  color:#d99a4a;
  font-weight:400;
}
.cnt57Hero__copy i{
  display:block;
  width:39px;
  height:2px;
  margin:20px 0 17px;
  background:#d99a4a;
}
.cnt57Hero__copy p{
  max-width:530px;
  color:#dce1e6;
  font-size:13px;
  line-height:1.7;
}
.cnt57Signature{
  margin-top:14px;
  color:#d99a4a;
  font-family:"Segoe Script","Brush Script MT",cursive;
  font-size:23px;
  transform:rotate(-4deg);
  transform-origin:left center;
}
.cnt57Quote{
  position:absolute;
  z-index:2;
  top:95px;
  right:7%;
  width:280px;
  padding-left:28px;
  border-left:1px solid rgba(218,151,65,.42);
}
.cnt57Quote b{
  display:block;
  color:#d99a4a;
  font:400 42px/1 Georgia,serif;
}
.cnt57Quote b:last-child{text-align:right}
.cnt57Quote p{
  margin:2px 0;
  color:#eee8e0;
  font:400 17px/1.7 Georgia,"Times New Roman",serif;
}

.cnt57Body{
  position:relative;
  padding:0 4.6% 55px;
  background:
    radial-gradient(circle at 50% 0,rgba(47,128,237,.05),transparent 30%),
    #03101f;
}
.cnt57Tabs{
  width:min(510px,90vw);
  height:54px;
  position:relative;
  z-index:5;
  top:-27px;
  margin:0 auto -8px;
  display:grid;
  grid-template-columns:1fr 1fr;
  overflow:hidden;
  border:1px solid rgba(218,151,65,.52);
  border-radius:999px;
  background:#071526;
  box-shadow:0 18px 40px rgba(0,0,0,.24);
}
.cnt57Tabs button{
  display:flex;
  align-items:center;
  justify-content:center;
  gap:10px;
  border:0;
  background:transparent;
  color:#e5e8eb;
  cursor:pointer;
  font-size:11px;
  font-weight:700;
}
.cnt57Tabs button.is-active{
  background:linear-gradient(90deg,#bb772b,#d9a650);
  color:#fff;
}
.cnt57Section{
  max-width:1480px;
  margin:0 auto;
  padding-top:18px;
}
.cnt57Section__head{
  margin-bottom:16px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:20px;
}
.cnt57Section__head>div{
  display:flex;
  align-items:center;
  gap:8px;
  color:#d99a4a;
}
.cnt57Section__head span{
  color:#f0ebe4;
  font:400 16px Georgia,"Times New Roman",serif;
}
.cnt57Section__head>a{
  display:flex;
  align-items:center;
  gap:8px;
  color:#d99a4a;
  font-size:9px;
  font-weight:700;
}
.cnt57VideoGrid{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:14px;
}
.cnt57VideoCard{
  overflow:hidden;
  border:1px solid rgba(218,151,65,.38);
  border-radius:12px;
  background:linear-gradient(180deg,#07192c,#051423);
  cursor:pointer;
  transition:.3s ease;
}
.cnt57VideoCard:hover{
  transform:translateY(-5px);
  border-color:#d99a4a;
  box-shadow:0 24px 55px rgba(0,0,0,.25);
}
.cnt57VideoCard__thumb{
  height:178px;
  position:relative;
  overflow:hidden;
  background:#071426;
}
.cnt57VideoCard__thumb>img{
  width:100%;
  height:100%;
  object-fit:cover;
}
.cnt57VideoCard__fallback{
  width:100%;
  height:100%;
  padding:18px;
  display:flex;
  align-items:flex-start;
  justify-content:flex-start;
  background:
    radial-gradient(circle at 78% 42%,rgba(217,154,74,.26),transparent 22%),
    linear-gradient(135deg,#091a2d,#1a1515);
}
.cnt57VideoCard__fallback--2{
  background:
    radial-gradient(circle at 78% 42%,rgba(217,154,74,.21),transparent 24%),
    linear-gradient(135deg,#16150f,#071729);
}
.cnt57VideoCard__fallback--3{
  background:
    radial-gradient(circle at 78% 42%,rgba(217,154,74,.18),transparent 22%),
    linear-gradient(135deg,#081828,#191612);
}
.cnt57VideoCard__fallback--4{
  background:
    radial-gradient(circle at 78% 42%,rgba(217,154,74,.25),transparent 22%),
    linear-gradient(135deg,#14110e,#071629);
}
.cnt57VideoCard__fallback span{
  max-width:72%;
  color:#f1eee9;
  text-transform:uppercase;
  font-size:20px;
  font-weight:800;
  line-height:1.08;
}
.cnt57Play{
  position:absolute;
  left:50%;
  top:50%;
  width:46px;
  height:32px;
  display:grid;
  place-items:center;
  transform:translate(-50%,-50%);
  border-radius:8px;
  background:#e21c1c;
  color:white;
  font-size:14px;
  box-shadow:0 10px 28px rgba(0,0,0,.28);
}
.cnt57VideoCard__thumb small{
  position:absolute;
  right:8px;
  bottom:7px;
  padding:3px 5px;
  border-radius:4px;
  background:rgba(0,0,0,.77);
  color:#fff;
  font-size:8px;
}
.cnt57VideoCard__body{
  padding:14px 15px 13px;
}
.cnt57VideoCard__body h3{
  font:400 17px/1.1 Georgia,"Times New Roman",serif;
}
.cnt57VideoCard__body p{
  min-height:38px;
  margin-top:6px;
  color:#8c98a5;
  font-size:9.5px;
  line-height:1.55;
}
.cnt57VideoCard__body>div{
  margin-top:11px;
  display:flex;
  align-items:center;
  gap:8px;
  color:#778492;
  font-size:8px;
}
.cnt57VideoCard__body b{
  margin-left:auto;
  width:29px;height:29px;
  display:grid;place-items:center;
  border:1px solid rgba(218,151,65,.45);
  border-radius:50%;
  color:#d99a4a;
}
.cnt57Hint{
  margin-top:14px;
  padding:13px 15px;
  display:flex;
  align-items:center;
  gap:10px;
  border:1px solid rgba(218,151,65,.12);
  border-radius:10px;
  color:#d99a4a;
  background:rgba(218,151,65,.025);
}
.cnt57Hint p{
  color:#758393;
  font-size:9px;
}

.cnt57PodcastGrid{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:14px;
}
.cnt57PodcastCard{
  min-height:190px;
  padding:12px;
  display:grid;
  grid-template-columns:115px 1fr;
  gap:14px;
  border:1px solid rgba(218,151,65,.35);
  border-radius:12px;
  background:linear-gradient(145deg,#07192c,#051423);
}
.cnt57PodcastArt{
  position:relative;
  display:flex;
  align-items:center;
  justify-content:center;
  flex-direction:column;
  overflow:hidden;
  border:1px solid rgba(218,151,65,.32);
  border-radius:8px;
  color:#d99a4a;
  background:
    radial-gradient(circle at 50% 45%,rgba(218,151,65,.08),transparent 36%),
    #061526;
}
.cnt57PodcastArt__ring{
  width:68px;height:68px;
  display:grid;
  place-items:center;
  border:1px solid rgba(218,151,65,.22);
  border-radius:50%;
}
.cnt57PodcastArt>span{
  position:absolute;
  left:0;right:0;bottom:9px;
  text-align:center;
  color:#8d704b;
  font-size:6px;
  letter-spacing:.13em;
}
.cnt57PodcastInfo{
  display:flex;
  flex-direction:column;
  min-width:0;
}
.cnt57PodcastInfo>small{
  color:#d99a4a;
  font-size:9px;
}
.cnt57PodcastInfo h3{
  margin-top:7px;
  font:400 18px/1.08 Georgia,"Times New Roman",serif;
}
.cnt57PodcastInfo p{
  margin-top:8px;
  color:#8d98a5;
  font-size:9px;
  line-height:1.5;
}
.cnt57PodcastInfo>div{
  margin-top:auto;
  display:flex;
  align-items:center;
  justify-content:space-between;
}
.cnt57PodcastInfo strong{
  color:#d99a4a;
  font:400 14px Georgia,serif;
}
.cnt57PodcastInfo button{
  min-height:34px;
  padding:0 13px;
  border:1px solid rgba(218,151,65,.30);
  border-radius:6px;
  background:linear-gradient(135deg,#8f581f,#bb7a2d);
  color:#fff;
  cursor:pointer;
  font-size:9px;
}
.cnt57PodcastInfo button:disabled{
  opacity:.45;
  cursor:not-allowed;
}

.cnt57Subscribe{
  max-width:1480px;
  min-height:78px;
  margin:16px auto 0;
  padding:13px 17px;
  display:grid;
  grid-template-columns:48px 1fr auto;
  gap:15px;
  align-items:center;
  border:1px solid rgba(218,151,65,.25);
  border-radius:11px;
  background:linear-gradient(90deg,#07182a,#041321);
}
.cnt57Subscribe__icon{
  width:42px;height:42px;
  display:grid;place-items:center;
  border:1px solid rgba(218,151,65,.26);
  border-radius:50%;
  font-size:17px;
}
.cnt57Subscribe strong{
  color:#eee9e2;
  font:400 14px Georgia,serif;
}
.cnt57Subscribe p{
  margin-top:4px;
  color:#7f8b98;
  font-size:9px;
}
.cnt57Subscribe>a{
  min-height:42px;
  padding:0 16px;
  display:flex;
  align-items:center;
  border:1px solid rgba(218,151,65,.38);
  border-radius:8px;
  color:#d99a4a;
  font-size:9px;
  font-weight:700;
}

@media(max-width:1100px){
  .cnt57Quote{display:none}
  .cnt57VideoGrid{grid-template-columns:repeat(2,1fr)}
  .cnt57PodcastGrid{grid-template-columns:repeat(2,1fr)}
}
@media(max-width:700px){
  .cnt57Hero{height:530px}
  .cnt57Hero__image{object-position:68% center}
  .cnt57Hero__shade{
    background:linear-gradient(180deg,rgba(4,16,31,.25),rgba(4,16,31,.96) 56%,#061426 100%);
  }
  .cnt57Hero__copy{
    left:20px;right:20px;top:auto;bottom:35px;width:auto;
  }
  .cnt57Hero h1{font-size:48px}
  .cnt57Hero__copy p{font-size:12px}
  .cnt57Body{padding:0 18px 40px}
  .cnt57Tabs{width:92%}
  .cnt57Section__head{align-items:flex-start}
  .cnt57Section__head>a{display:none}
  .cnt57VideoGrid,.cnt57PodcastGrid{grid-template-columns:1fr}
  .cnt57VideoCard__thumb{height:205px}
  .cnt57PodcastCard{grid-template-columns:100px 1fr}
  .cnt57Subscribe{
    grid-template-columns:42px 1fr;
  }
  .cnt57Subscribe>a{
    grid-column:1/-1;
    justify-content:center;
  }
}

/* STEP 58 — CLEAN CONTENT HERO / NO DUPLICATE TEXT / SHARPER IMAGE */
.cnt57Hero{
  height:420px;
  background:#03101f;
}
.cnt57Hero__image{
  object-fit:cover;
  object-position:center center;
  transform:none;
  filter:saturate(1.06) contrast(1.06) brightness(1.03);
}
.cnt57Hero__shade{
  background:
    linear-gradient(90deg,
      #061426 0%,
      rgba(6,20,38,.98) 27%,
      rgba(6,20,38,.75) 40%,
      rgba(6,20,38,.16) 60%,
      rgba(3,11,21,.16) 100%),
    linear-gradient(180deg,rgba(0,0,0,.03),rgba(0,0,0,.15));
}
.cnt57Hero__copy{
  top:82px;
}
.cnt57Quote{
  top:104px;
  right:6.2%;
  width:285px;
  padding:6px 0 6px 28px;
  background:linear-gradient(90deg,rgba(3,11,21,.35),transparent);
  backdrop-filter:blur(1px);
}
.cnt57Quote p{
  text-shadow:0 2px 12px rgba(0,0,0,.7);
}
@media(max-width:1100px){
  .cnt57Hero__image{
    object-position:58% center;
  }
}
@media(max-width:700px){
  .cnt57Hero{
    height:535px;
  }
  .cnt57Hero__image{
    object-position:59% center;
  }
  .cnt57Hero__shade{
    background:
      linear-gradient(180deg,rgba(4,16,31,.10),rgba(4,16,31,.78) 47%,#061426 82%);
  }
}

/* STEP 60 — PREMIUM RANDEVU */
.apt60{min-height:100vh;background:#020914;color:#f4efe8}.apt60Hero{position:relative;min-height:560px;padding:110px 6% 72px;display:grid;grid-template-columns:1.08fr .72fr;gap:7vw;align-items:center;overflow:hidden;border-bottom:1px solid rgba(255,255,255,.055);background:radial-gradient(circle at 80% 25%,rgba(47,128,237,.08),transparent 28%),radial-gradient(circle at 10% 75%,rgba(218,151,65,.035),transparent 22%),#020914}.apt60Hero__grid{position:absolute;inset:0;opacity:.18;background-image:linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px);background-size:72px 72px;mask-image:linear-gradient(to bottom,black,transparent 93%)}.apt60Back{position:absolute;top:30px;left:6%;z-index:3;display:flex;gap:9px;align-items:center;color:#8c97a4;font-size:10px}.apt60Back span{color:#d9953d;font-size:17px}.apt60Hero__copy,.apt60Hero__aside{position:relative;z-index:2}.apt60Hero__copy>span,.apt60Step__head>span{color:#d9953d;font-size:10px;font-weight:800;letter-spacing:.18em}.apt60Hero h1{margin-top:15px;font:400 clamp(54px,6vw,92px)/.92 Georgia,serif;letter-spacing:-.05em}.apt60Hero h1 strong{color:#d9953d;font-weight:400}.apt60Hero__copy>p{max-width:720px;margin-top:25px;color:#abb3bd;font-size:15px;line-height:1.85}.apt60Hero__trust{margin-top:30px;display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.apt60Hero__trust>div{min-height:77px;padding:14px;display:grid;grid-template-columns:34px 1fr;gap:9px;align-items:center;border:1px solid rgba(218,151,65,.13);border-radius:12px;background:rgba(7,22,39,.6)}.apt60Hero__trust svg{color:#d9953d}.apt60Hero__trust span,.apt60Hero__aside p{display:flex;flex-direction:column;gap:4px}.apt60Hero__trust strong,.apt60Hero__aside strong{font-size:10px}.apt60Hero__trust small,.apt60Hero__aside small{color:#738090;font-size:8px;line-height:1.4}.apt60Hero__aside{padding:28px;border:1px solid rgba(218,151,65,.2);border-radius:20px;background:linear-gradient(145deg,#08192c,#04111f);box-shadow:0 34px 80px rgba(0,0,0,.25)}.apt60Hero__aside>span{color:#d9953d;font-size:9px;font-weight:800;letter-spacing:.17em}.apt60Hero__aside>div{min-height:76px;display:grid;grid-template-columns:42px 1fr;gap:13px;align-items:center;border-bottom:1px solid rgba(255,255,255,.05)}.apt60Hero__aside>div:last-child{border-bottom:0}.apt60Hero__aside b{width:36px;height:36px;display:grid;place-items:center;border:1px solid rgba(218,151,65,.22);border-radius:50%;color:#d9953d;font:400 11px Georgia,serif}.apt60FormArea{padding:65px 5% 100px;background:#03101f}.apt60Progress{width:min(620px,94vw);margin:0 auto 28px;display:grid;grid-template-columns:repeat(3,1fr);position:relative}.apt60Progress:before{content:"";position:absolute;left:16%;right:16%;top:18px;height:1px;background:rgba(218,151,65,.2)}.apt60Progress>div{position:relative;z-index:1;text-align:center;color:#5f6d7d}.apt60Progress span{width:37px;height:37px;margin:auto;display:grid;place-items:center;border:1px solid rgba(255,255,255,.09);border-radius:50%;background:#04111f;font-size:10px}.apt60Progress p{margin-top:7px;font-size:8px;font-weight:700}.apt60Progress>div.is-active{color:#d9953d}.apt60Progress>div.is-active span{border-color:rgba(218,151,65,.55);background:rgba(218,151,65,.08)}.apt60Card{max-width:1100px;margin:auto;border:1px solid rgba(218,151,65,.16);border-radius:20px;background:linear-gradient(145deg,#07182a,#04111e);box-shadow:0 28px 75px rgba(0,0,0,.2)}.apt60Step{padding:34px}.apt60Step__head h2{margin-top:7px;font:400 clamp(29px,3vw,42px)/1.05 Georgia,serif}.apt60Step__head p{margin-top:9px;color:#7f8b99;font-size:11px}.apt60Services{margin-top:27px;display:grid;grid-template-columns:repeat(2,1fr);gap:12px}.apt60Services button{position:relative;min-height:145px;padding:20px;text-align:left;border:1px solid rgba(255,255,255,.07);border-radius:14px;background:#041321;color:#f2eee8;cursor:pointer}.apt60Services button:hover,.apt60Services button.is-selected{border-color:rgba(218,151,65,.45);background:linear-gradient(145deg,rgba(174,101,27,.09),#041321)}.apt60Services button>div{width:43px;height:43px;display:grid;place-items:center;border:1px solid rgba(218,151,65,.18);border-radius:10px;color:#d9953d}.apt60Services strong{display:block;margin-top:14px;font:400 19px Georgia,serif}.apt60Services p{max-width:85%;margin-top:7px;color:#7d8997;font-size:9.5px;line-height:1.6}.apt60Services button>span{position:absolute;right:17px;bottom:16px;color:#d9953d}.apt60Format{margin-top:26px;padding-top:22px;border-top:1px solid rgba(255,255,255,.05)}.apt60Format>span,.apt60DateGrid label>span,.apt60Times>span,.apt60Fields label>span{color:#8793a1;font-size:9px}.apt60Format>div{margin-top:11px;display:grid;grid-template-columns:1fr 1fr;gap:11px}.apt60Format button,.apt60Times button{min-height:52px;border:1px solid rgba(255,255,255,.07);border-radius:9px;background:#03101d;color:#8f9aa8;cursor:pointer}.apt60Format button{display:flex;align-items:center;justify-content:center;gap:10px}.apt60Format button svg{color:#d9953d}.apt60Format button.is-selected,.apt60Times button.is-selected{border-color:rgba(218,151,65,.55);background:rgba(218,151,65,.08);color:#e3a14c}.apt60Actions{margin-top:29px;padding-top:20px;display:flex;justify-content:space-between;gap:12px;border-top:1px solid rgba(255,255,255,.05)}.apt60Actions button{min-height:48px;padding:0 18px;display:flex;align-items:center;gap:10px;border:1px solid rgba(218,151,65,.27);border-radius:9px;background:linear-gradient(135deg,#a85e20,#d8963f);color:#fff;cursor:pointer;font-size:9px;font-weight:700}.apt60Actions button:disabled{opacity:.32;cursor:not-allowed}.apt60Actions button.is-secondary{background:transparent;border-color:rgba(255,255,255,.08);color:#8895a4}.apt60DateGrid{margin-top:27px;display:grid;grid-template-columns:.75fr 1.25fr;gap:28px}.apt60DateGrid label,.apt60Times,.apt60Fields label{display:flex;flex-direction:column;gap:8px}.apt60DateGrid input,.apt60Fields input,.apt60Fields textarea{width:100%;padding:12px 13px;border:1px solid rgba(255,255,255,.08);border-radius:9px;background:#03101d;color:#eef0f2}.apt60DateGrid input{min-height:53px;color-scheme:dark}.apt60Times>div{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}.apt60Notice,.apt60Sensitive{margin-top:24px;padding:14px 16px;display:flex;gap:11px;border:1px solid rgba(218,151,65,.13);border-radius:10px;background:rgba(218,151,65,.025);color:#d9953d}.apt60Notice p,.apt60Sensitive p{color:#7d8997;font-size:9.5px;line-height:1.6}.apt60Fields{margin-top:27px;display:grid;grid-template-columns:1fr 1fr;gap:14px}.apt60Fields input{min-height:48px}.apt60Fields__full{grid-column:1/-1}.apt60Kvkk{margin-top:22px;padding:16px;display:grid;grid-template-columns:27px 1fr;gap:12px;border:1px solid rgba(255,255,255,.06);border-radius:10px;background:#03101d}.apt60Kvkk>button{width:25px;height:25px;border:1px solid rgba(218,151,65,.35);border-radius:6px;background:transparent;color:#d9953d;cursor:pointer}.apt60Kvkk p{color:#7f8b99;font-size:9px;line-height:1.65}.apt60Kvkk a{color:#d9953d;text-decoration:underline}.apt60Success{min-height:100vh;padding:30px 18px;display:grid;place-items:center;background:#020914;color:#f4efe8}.apt60Success__card{width:min(660px,100%);padding:42px;text-align:center;border:1px solid rgba(218,151,65,.2);border-radius:22px;background:linear-gradient(145deg,#08192c,#04111e)}.apt60Success__icon{width:72px;height:72px;margin:auto;display:grid;place-items:center;border:1px solid rgba(52,212,134,.25);border-radius:50%;color:#67d99a}.apt60Success__card>span{display:block;margin-top:24px;color:#d9953d;font-size:9px;font-weight:800}.apt60Success h1{margin-top:9px;font:400 42px Georgia,serif}.apt60Success__card>p{margin:14px auto 0;max-width:540px;color:#8995a3;font-size:11px;line-height:1.7}.apt60Success__summary{margin-top:26px;display:grid;grid-template-columns:1fr 1fr;gap:8px;text-align:left}.apt60Success__summary>div{padding:13px;border:1px solid rgba(255,255,255,.06);border-radius:9px;background:#03101d}.apt60Success__summary small{display:block;color:#637184;font-size:8px}.apt60Success__summary strong{display:block;margin-top:4px;font-size:10px}.apt60Success__card>a{width:100%;min-height:48px;margin-top:22px;padding:0 15px;display:flex;align-items:center;justify-content:space-between;border:1px solid rgba(218,151,65,.25);border-radius:9px;color:#d9953d}
@media(max-width:900px){.apt60Hero{grid-template-columns:1fr;padding:100px 20px 65px}.apt60Back{left:20px}.apt60DateGrid{grid-template-columns:1fr}}
@media(max-width:650px){.apt60Hero h1{font-size:52px}.apt60Hero__copy>p{font-size:13px}.apt60Hero__trust{grid-template-columns:1fr}.apt60FormArea{padding:55px 16px 80px}.apt60Step{padding:24px 18px}.apt60Services,.apt60Format>div,.apt60Fields{grid-template-columns:1fr}.apt60Times>div{grid-template-columns:repeat(3,1fr)}.apt60Fields__full{grid-column:auto}.apt60Success__card{padding:31px 20px}.apt60Success__summary{grid-template-columns:1fr}}

/* STEP 61 — RANDEVU FORMU OKUNABİLİRLİK */
.apt60Fields label>span{
  color:#b7c0cb;
  font-size:13px;
  font-weight:600;
  letter-spacing:.015em;
}
.apt60Fields label>span small{
  color:#8d99a7;
  font-size:12px;
  font-weight:400;
}
.apt60Fields input,
.apt60Fields textarea{
  font-size:14px;
  line-height:1.55;
}
.apt60Fields input::placeholder,
.apt60Fields textarea::placeholder{
  color:#6f7c8c;
  font-size:13px;
  opacity:1;
}
.apt60Kvkk p{
  font-size:11.5px;
  line-height:1.7;
}
.apt60Sensitive p,
.apt60Notice p{
  font-size:11.5px;
  line-height:1.65;
}
.apt60Step__head p{
  font-size:13px;
  line-height:1.65;
}
.apt60DateGrid label>span,
.apt60Times>span,
.apt60Format>span{
  color:#aab4c0;
  font-size:12px;
  font-weight:700;
  letter-spacing:.04em;
}
.apt60Times button{
  font-size:15px;
}
@media(max-width:650px){
  .apt60Fields label>span{font-size:14px}
  .apt60Fields label>span small{font-size:12px}
  .apt60Fields input,.apt60Fields textarea{font-size:16px}
  .apt60Fields input::placeholder,.apt60Fields textarea::placeholder{font-size:14px}
  .apt60Kvkk p,.apt60Sensitive p,.apt60Notice p{font-size:12px}
}

/* STEP 62 — AÇIK / SICAK ANA SAYFA DENEMESİ */
.topbar--light{
  min-height:112px;
  padding:0 5.1%;
  border-bottom:1px solid rgba(130,103,63,.12);
  background:rgba(250,248,244,.96);
  box-shadow:0 8px 28px rgba(72,56,36,.06);
  backdrop-filter:blur(14px);
}
.topbar--light .brand{
  gap:16px;
}
.topbar--light .brandMark{
  width:58px;
  height:58px;
  border:0;
  border-radius:0;
  background:transparent;
  color:#9d783a;
  font:400 37px/1 Georgia,"Times New Roman",serif;
  letter-spacing:-.12em;
  box-shadow:none;
}
.topbar--light .brandText{
  display:flex;
  flex-direction:column;
  justify-content:center;
}
.topbar--light .brandText span{
  order:1;
  color:#59606a;
  font-size:11px;
  font-weight:500;
  letter-spacing:.02em;
}
.topbar--light .brandText strong{
  order:2;
  margin-top:2px;
  color:#181c22;
  font:600 19px/1.15 Georgia,"Times New Roman",serif;
  letter-spacing:0;
}
.topbar--light .nav{
  padding:8px;
  border:0;
  background:transparent;
  box-shadow:none;
}
.topbar--light .nav a{
  min-height:49px;
  padding:0 20px;
  display:flex;
  align-items:center;
  border-radius:0;
  color:#20242a;
  font-size:14px;
  font-weight:500;
}
.topbar--light .nav a:hover,
.topbar--light .nav a.is-active{
  color:#8e6b34;
  background:transparent;
}
.topbar--light .nav a.is-active:after{
  background:#a27b3d;
}
.topbar--light .topCta{
  min-height:50px;
  padding:0 25px;
  border:1px solid #9a7438;
  border-radius:5px;
  background:linear-gradient(135deg,#a27a3b,#8c682f);
  color:#fff;
  box-shadow:0 8px 22px rgba(139,103,47,.15);
  font-size:12px;
  font-weight:700;
}
.topbar--light .topCta svg{
  display:none;
}
.topbar--light .menuBtn span{
  background:#252a30;
}

.lightHomeHero{
  position:relative;
  min-height:790px;
  overflow:hidden;
  color:#202329;
  background:
    radial-gradient(circle at 25% 10%,rgba(255,255,255,.96),transparent 42%),
    linear-gradient(100deg,#f8f7f4 0%,#f4f2ee 56%,#e8dfd3 100%);
  border-bottom:1px solid rgba(139,107,57,.10);
}
.lightHomeHero__visual{
  position:absolute;
  z-index:0;
  top:0;
  right:0;
  width:48%;
  height:100%;
  overflow:hidden;
}
.lightHomeHero__visual img{
  width:100%;
  height:100%;
  object-fit:cover;
  object-position:52% center;
  filter:saturate(.88) brightness(1.15) contrast(.88);
}
.lightHomeHero__visualShade{
  position:absolute;
  inset:0;
  background:
    linear-gradient(90deg,#f4f2ee 0%,rgba(244,242,238,.88) 11%,rgba(244,242,238,.22) 37%,rgba(244,242,238,0) 66%),
    linear-gradient(180deg,rgba(255,255,255,.08),rgba(112,82,42,.05));
}
.lightHomeHero__content{
  position:relative;
  z-index:2;
  width:min(740px,53%);
  padding:118px 0 230px 9.2%;
}
.lightHomeHero__eyebrow{
  display:block;
  margin-bottom:23px;
  color:#2d3035;
  font-size:14px;
  font-weight:600;
  letter-spacing:.10em;
}
.lightHomeHero h1{
  margin:0;
  color:#181b20;
  font:400 clamp(55px,5vw,82px)/.98 Georgia,"Times New Roman",serif;
  letter-spacing:-.045em;
}
.lightHomeHero h1 strong{
  display:block;
  margin-top:9px;
  color:#9a743a;
  font-weight:400;
}
.lightHomeHero__content>p{
  max-width:600px;
  margin-top:28px;
  color:#3f454c;
  font-size:17px;
  line-height:1.72;
}
.lightHomeHero__actions{
  margin-top:32px;
  display:flex;
  gap:17px;
  flex-wrap:wrap;
}
.lightHomeHero__actions a{
  min-height:56px;
  padding:0 29px;
  display:flex;
  align-items:center;
  justify-content:center;
  border-radius:6px;
  font-size:14px;
  font-weight:600;
  transition:transform .25s ease,box-shadow .25s ease;
}
.lightHomeHero__actions a:hover{
  transform:translateY(-2px);
}
.lightHomeHero__primary{
  min-width:225px;
  border:1px solid #9b7539;
  background:linear-gradient(135deg,#aa8241,#92703a);
  color:#fff;
  box-shadow:0 12px 30px rgba(132,97,43,.17);
}
.lightHomeHero__secondary{
  min-width:190px;
  border:1px solid rgba(132,101,54,.72);
  background:rgba(255,255,255,.42);
  color:#7a6038;
}
.lightHomeHero__trust{
  position:absolute;
  z-index:4;
  left:9.2%;
  bottom:32px;
  width:min(820px,66%);
  display:grid;
  grid-template-columns:repeat(3,1fr);
  border:1px solid rgba(122,102,75,.12);
  border-radius:8px;
  overflow:hidden;
  background:rgba(248,247,244,.82);
  box-shadow:0 18px 45px rgba(72,58,39,.08);
  backdrop-filter:blur(15px);
}
.lightHomeHero__trust article{
  min-height:137px;
  padding:23px 20px;
  display:grid;
  grid-template-columns:40px 1fr;
  gap:13px;
  align-items:start;
  border-right:1px solid rgba(122,102,75,.10);
}
.lightHomeHero__trust article:last-child{
  border-right:0;
}
.lightHomeHero__trust article>div{
  color:#9b763a;
}
.lightHomeHero__trust span{
  display:block;
}
.lightHomeHero__trust strong{
  display:block;
  color:#23272c;
  font-size:13px;
  font-weight:700;
}
.lightHomeHero__trust p{
  margin-top:9px;
  color:#5e646c;
  font-size:11px;
  line-height:1.65;
}

/* ana sayfanın bir sonraki bölümüne geçişi daha doğal yap */
.lightHomeHero + .homeServicesShowcase{
  border-top:0;
  box-shadow:inset 0 35px 70px rgba(0,0,0,.025);
}

@media(max-width:1050px){
  .topbar--light .nav a{
    padding:0 12px;
    font-size:12px;
  }
  .lightHomeHero__content{
    width:60%;
    padding-left:6%;
  }
  .lightHomeHero__trust{
    left:6%;
    width:80%;
  }
}
@media(max-width:760px){
  .topbar--light{
    min-height:82px;
    padding:0 18px;
  }
  .topbar--light .brandMark{
    width:43px;
    height:43px;
    font-size:28px;
  }
  .topbar--light .brandText span{
    font-size:8px;
  }
  .topbar--light .brandText strong{
    font-size:15px;
  }
  .topbar--light .nav{
    background:#faf8f4;
    border:1px solid rgba(139,107,57,.10);
  }
  .topbar--light .nav a{
    color:#25292e;
    font-size:14px;
  }
  .topbar--light .topCta{
    display:none;
  }

  .lightHomeHero{
    min-height:930px;
    background:#f5f2ed;
  }
  .lightHomeHero__visual{
    top:0;
    width:100%;
    height:46%;
  }
  .lightHomeHero__visual img{
    object-position:center 55%;
  }
  .lightHomeHero__visualShade{
    background:
      linear-gradient(180deg,rgba(245,242,237,.04) 0%,rgba(245,242,237,.12) 48%,#f5f2ed 100%);
  }
  .lightHomeHero__content{
    width:auto;
    padding:410px 22px 330px;
  }
  .lightHomeHero__eyebrow{
    font-size:12px;
  }
  .lightHomeHero h1{
    font-size:49px;
  }
  .lightHomeHero__content>p{
    font-size:14px;
  }
  .lightHomeHero__actions{
    display:grid;
    grid-template-columns:1fr;
  }
  .lightHomeHero__actions a{
    width:100%;
  }
  .lightHomeHero__trust{
    left:18px;
    right:18px;
    bottom:25px;
    width:auto;
    grid-template-columns:1fr;
  }
  .lightHomeHero__trust article{
    min-height:auto;
    padding:16px 18px;
    border-right:0;
    border-bottom:1px solid rgba(122,102,75,.10);
  }
  .lightHomeHero__trust article:last-child{
    border-bottom:0;
  }
}

/* =========================================================
   STEP 63 — TÜM KAMUSAL SİTE / AÇIK SICAK PREMIUM TEMA
   Admin paneli bilerek koyu bırakılmıştır.
   ========================================================= */
:root{
  --warm-bg:#f7f4ef;
  --warm-bg-2:#f0ebe3;
  --warm-card:#fffdf9;
  --warm-ink:#1f2328;
  --warm-copy:#5b6269;
  --warm-muted:#858b91;
  --warm-gold:#9b7438;
  --warm-gold-2:#b18748;
  --warm-border:rgba(128,98,55,.16);
  --warm-shadow:0 22px 60px rgba(84,64,39,.09);
}

/* -------- MAIN / HOME LOWER SECTIONS -------- */
.pageShell{
  background:var(--warm-bg);
}
.homeServicesShowcase{
  color:var(--warm-ink);
  background:
    radial-gradient(circle at 88% 10%,rgba(177,135,72,.08),transparent 24%),
    linear-gradient(180deg,#f7f4ef,#f2ede5);
  border-top:1px solid var(--warm-border);
  border-bottom:1px solid var(--warm-border);
}
.homeServicesShowcase__eyebrow,
.sectionEyebrow{
  color:var(--warm-gold)!important;
}
.homeServicesShowcase__head h2,
.homeTrustStatement h2,
.contactLead h2{
  color:#202329!important;
}
.homeServicesShowcase__head p,
.homeServiceFeature p,
.homeServicesShowcase__benefit p,
.homeTrustStatement p,
.contactLead p{
  color:var(--warm-copy)!important;
}
.homeServicesShowcase__grid{
  gap:16px;
}
.homeServiceFeature{
  border:1px solid var(--warm-border)!important;
  background:rgba(255,253,249,.84)!important;
  box-shadow:0 15px 40px rgba(84,64,39,.055);
}
.homeServiceFeature:hover{
  border-color:rgba(155,116,56,.34)!important;
  box-shadow:var(--warm-shadow);
}
.homeServiceFeature h3{
  color:#23262b!important;
}
.homeServiceFeature__icon{
  color:var(--warm-gold)!important;
  border-color:rgba(155,116,56,.20)!important;
  background:rgba(155,116,56,.045)!important;
}
.homeServicesShowcase__all{
  color:var(--warm-gold)!important;
  border-color:rgba(155,116,56,.28)!important;
}
.homeServicesShowcase__footer{
  border-color:var(--warm-border)!important;
  background:linear-gradient(90deg,#e7ddd0,#f6f1ea)!important;
  color:#24272b!important;
  box-shadow:var(--warm-shadow);
}
.homeServicesShowcase__benefitIcon{
  color:var(--warm-gold)!important;
  border-color:rgba(155,116,56,.26)!important;
}
.homeScopeStrip{
  border-color:var(--warm-border)!important;
  background:#eee8df!important;
}
.homeScopeStrip>div{
  color:var(--warm-gold)!important;
  border-color:rgba(155,116,56,.22)!important;
}
.homeScopeStrip p{
  color:#646a70!important;
}
.homeTrustStatement{
  color:#24272b!important;
  background:
    radial-gradient(circle at 12% 50%,rgba(155,116,56,.07),transparent 24%),
    #f8f5f0!important;
  border-color:var(--warm-border)!important;
}
.homeTrustStatement__mark{
  color:var(--warm-gold)!important;
}

/* -------- CONTACT SECTION -------- */
.contactSection{
  color:var(--warm-ink)!important;
  background:
    radial-gradient(circle at 80% 15%,rgba(155,116,56,.07),transparent 24%),
    linear-gradient(180deg,#f4efe8,#ece5dc)!important;
  border-color:var(--warm-border)!important;
}
.contactCard{
  border-color:var(--warm-border)!important;
  background:rgba(255,253,249,.86)!important;
  box-shadow:0 15px 38px rgba(84,64,39,.055)!important;
}
.contactCard strong,
.contactCard h3{
  color:#24272b!important;
}
.contactCard p,
.contactCard span{
  color:#676d73!important;
}
.contactIcon{
  color:var(--warm-gold)!important;
  border-color:rgba(155,116,56,.22)!important;
  background:rgba(155,116,56,.04)!important;
}
.contactCard--cta{
  background:linear-gradient(145deg,#a47d41,#8e6932)!important;
  color:#fff!important;
}
.contactCard--cta strong,
.contactCard--cta p,
.contactCard--cta span{
  color:#fff!important;
}

/* -------- FOOTER -------- */
.premiumFooter{
  color:#25282d!important;
  background:
    radial-gradient(circle at 85% 0,rgba(155,116,56,.075),transparent 25%),
    linear-gradient(180deg,#eee7dd,#e7ded1)!important;
  border-top:1px solid rgba(128,98,55,.18)!important;
}
.premiumFooter__glow{
  opacity:.18!important;
}
.premiumFooter__mark{
  color:var(--warm-gold)!important;
  border-color:rgba(155,116,56,.30)!important;
}
.premiumFooter__brand strong,
.premiumFooter__title,
.premiumFooter__contact strong{
  color:#24272b!important;
}
.premiumFooter__brand span,
.premiumFooter__brand p,
.premiumFooter__nav a,
.premiumFooter__contact span,
.premiumFooter__contactRow,
.premiumFooter__bottom,
.premiumFooter__legal a{
  color:#666d74!important;
}
.premiumFooter__nav a:hover,
.premiumFooter__legal a:hover{
  color:var(--warm-gold)!important;
}
.premiumFooter__cta{
  border-color:#987038!important;
  background:linear-gradient(135deg,#a57c3d,#8e682f)!important;
  color:white!important;
}

/* -------- ABOUT -------- */
.aboutDirectPage{
  color:var(--warm-ink)!important;
  background:
    radial-gradient(circle at 85% 8%,rgba(155,116,56,.08),transparent 23%),
    linear-gradient(180deg,#f7f4ef,#f0ebe3)!important;
}
.aboutDirectBack{
  color:#777d82!important;
}
.aboutDirectBack span{
  color:var(--warm-gold)!important;
}
.aboutDirectHeader{
  border-bottom-color:var(--warm-border)!important;
}
.aboutDirectHeader__title>span,
.aboutDirectArticle__topline{
  color:var(--warm-gold)!important;
}
.aboutDirectHeader__title h1,
.aboutDirectArticle h2{
  color:#202329!important;
}
.aboutDirectHeader__title p,
.aboutDirectArticle p{
  color:#545b62!important;
}
.aboutDirectLayout{
  border-color:var(--warm-border)!important;
}
.aboutDirectProfile{
  border-color:var(--warm-border)!important;
  background:rgba(255,253,249,.88)!important;
  box-shadow:var(--warm-shadow)!important;
}
.aboutDirectProfile__photo{
  background:#e8e1d7!important;
}
.aboutDirectProfile__body>span{
  color:var(--warm-gold)!important;
}
.aboutDirectProfile__body h2{
  color:#22262b!important;
}
.aboutDirectProfile__body p,
.aboutDirectProfile__items span{
  color:#626970!important;
}
.aboutDirectProfile__line{
  background:rgba(155,116,56,.28)!important;
}

/* -------- SERVICES -------- */
.svc52{
  color:var(--warm-ink)!important;
  background:var(--warm-bg)!important;
}
.svc52Hero{
  border-bottom-color:rgba(155,116,56,.28)!important;
  background:#efe8df!important;
}
.svc52Hero__image{
  filter:saturate(.90) brightness(1.13) contrast(.90)!important;
}
.svc52Hero__shade{
  background:
    linear-gradient(90deg,#f7f4ef 0%,rgba(247,244,239,.98) 31%,rgba(247,244,239,.76) 49%,rgba(247,244,239,.07) 78%)!important;
}
.svc52Back{
  color:#6d7379!important;
}
.svc52Back span,
.svc52Eyebrow{
  color:var(--warm-gold)!important;
}
.svc52Hero h1{
  color:#202329!important;
}
.svc52Hero__copy i{
  background:var(--warm-gold)!important;
}
.svc52Hero__copy p{
  color:#545b62!important;
}
.svc52Quick{
  background:
    radial-gradient(circle at 50% 0,rgba(155,116,56,.07),transparent 31%),
    #f4efe8!important;
}
.svc52SectionTitle span{
  color:var(--warm-gold)!important;
}
.svc52SectionTitle span:before,
.svc52SectionTitle span:after{
  background:rgba(155,116,56,.36)!important;
}
.svc52SectionTitle h2{
  color:#24272b!important;
}
.svc52QuickCard,
.servicesDetailCard{
  border-color:var(--warm-border)!important;
  background:rgba(255,253,249,.92)!important;
  box-shadow:0 15px 40px rgba(84,64,39,.055)!important;
}
.svc52QuickCard:hover,
.servicesDetailCard:hover{
  border-color:rgba(155,116,56,.38)!important;
  box-shadow:var(--warm-shadow)!important;
}
.svc52QuickIcon,
.servicesDetailCard__icon{
  color:var(--warm-gold)!important;
  border-color:rgba(155,116,56,.28)!important;
}
.svc52QuickCard h3,
.servicesDetailCard h3,
.servicesDetailSectionHead h2{
  color:#24272b!important;
}
.svc52QuickCard p,
.servicesDetailItem p,
.servicesDetailSectionHead p{
  color:#646b72!important;
}
.svc52QuickCard a,
.servicesDetailCard__no,
.servicesDetailItem span,
.servicesDetailSectionHead span{
  color:var(--warm-gold)!important;
}
.svc52Trust{
  border-color:var(--warm-border)!important;
  background:#ebe4da!important;
  box-shadow:0 13px 35px rgba(84,64,39,.055)!important;
}
.svc52Trust>div{
  color:var(--warm-gold)!important;
  border-color:rgba(155,116,56,.20)!important;
}
.svc52Trust strong{
  color:#272a2e!important;
}
.svc52Trust span{
  color:#676d74!important;
}
.servicesDetailGridSection,
.svc52Details{
  background:#f7f4ef!important;
}
.svc52Scope{
  border-color:rgba(155,116,56,.28)!important;
  background:linear-gradient(90deg,#e8ded1,#fbf7f1)!important;
  color:#23272c!important;
}
.svc52Scope__mark,
.svc52Scope span{
  color:var(--warm-gold)!important;
}

/* -------- PROCESS -------- */
.prc53{
  color:var(--warm-ink)!important;
  background:var(--warm-bg)!important;
}
.prc53Hero{
  border-bottom-color:rgba(155,116,56,.28)!important;
  background:#efe8df!important;
}
.prc53Hero__image{
  filter:saturate(.90) brightness(1.10) contrast(.90)!important;
}
.prc53Hero__shade{
  background:
    linear-gradient(90deg,#f7f4ef 0%,rgba(247,244,239,.98) 31%,rgba(247,244,239,.75) 49%,rgba(247,244,239,.07) 78%)!important;
}
.prc53Back{
  color:#6d7379!important;
}
.prc53Back span,
.prc53Eyebrow{
  color:var(--warm-gold)!important;
}
.prc53Hero h1{
  color:#202329!important;
}
.prc53Hero__copy i{
  background:var(--warm-gold)!important;
}
.prc53Hero__copy p{
  color:#545b62!important;
}
.prc53Flow{
  background:
    radial-gradient(circle at 50% 0,rgba(155,116,56,.065),transparent 30%),
    #f4efe8!important;
}
.prc53SectionTitle span{
  color:var(--warm-gold)!important;
}
.prc53SectionTitle span:before,
.prc53SectionTitle span:after,
.prc53Steps:before{
  background:rgba(155,116,56,.34)!important;
}
.prc53SectionTitle h2{
  color:#25282d!important;
}
.prc53Step{
  border-color:var(--warm-border)!important;
  background:rgba(255,253,249,.92)!important;
  box-shadow:0 16px 42px rgba(84,64,39,.06)!important;
}
.prc53Step:hover{
  border-color:rgba(155,116,56,.40)!important;
  box-shadow:var(--warm-shadow)!important;
}
.prc53Step__number{
  border-color:rgba(155,116,56,.42)!important;
  color:var(--warm-gold)!important;
  background:#fbf8f3!important;
}
.prc53Step__icon{
  color:var(--warm-gold)!important;
}
.prc53Step h3{
  color:#24272b!important;
}
.prc53Step p{
  color:#646b72!important;
}
.prc53Trust{
  border-color:var(--warm-border)!important;
  background:#ebe4da!important;
}
.prc53Trust>div{
  border-color:rgba(155,116,56,.20)!important;
}
.prc53Trust__icon{
  color:var(--warm-gold)!important;
  border-color:rgba(155,116,56,.30)!important;
}
.prc53Trust strong{
  color:#25282d!important;
}
.prc53Trust span{
  color:#666d74!important;
}
.prc53Principles{
  border-color:rgba(155,116,56,.30)!important;
  background:linear-gradient(90deg,#e7ddd0,#fbf7f1)!important;
  color:#24272b!important;
}
.prc53Principles__mark{
  background:#9b7438!important;
  color:white!important;
}
.prc53Principles span{
  color:var(--warm-gold)!important;
}

/* -------- CONTENTS / VIDEOS & PODCASTS -------- */
.cnt57{
  color:var(--warm-ink)!important;
  background:var(--warm-bg)!important;
}
.cnt57Hero{
  border-bottom-color:rgba(155,116,56,.26)!important;
  background:#eee7dd!important;
}
.cnt57Hero__image{
  filter:saturate(.84) brightness(1.12) contrast(.91)!important;
}
.cnt57Hero__shade{
  background:
    linear-gradient(90deg,#f7f4ef 0%,rgba(247,244,239,.98) 30%,rgba(247,244,239,.74) 48%,rgba(247,244,239,.10) 77%)!important;
}
.cnt57Back{
  color:#6d7379!important;
}
.cnt57Back span,
.cnt57Eyebrow,
.cnt57Signature{
  color:var(--warm-gold)!important;
}
.cnt57Hero h1{
  color:#202329!important;
}
.cnt57Hero h1 strong{
  color:var(--warm-gold)!important;
}
.cnt57Hero__copy i{
  background:var(--warm-gold)!important;
}
.cnt57Hero__copy p{
  color:#545b62!important;
}
.cnt57Quote{
  border-color:rgba(155,116,56,.32)!important;
  background:rgba(250,247,242,.43)!important;
}
.cnt57Quote b{
  color:var(--warm-gold)!important;
}
.cnt57Quote p{
  color:#33373c!important;
  text-shadow:none!important;
}
.cnt57Body{
  background:
    radial-gradient(circle at 50% 0,rgba(155,116,56,.06),transparent 28%),
    #f5f1ea!important;
}
.cnt57Tabs{
  border-color:rgba(155,116,56,.38)!important;
  background:#fffaf4!important;
  box-shadow:0 15px 38px rgba(84,64,39,.10)!important;
}
.cnt57Tabs button{
  color:#5c6268!important;
}
.cnt57Tabs button.is-active{
  background:linear-gradient(90deg,#aa8141,#927039)!important;
  color:white!important;
}
.cnt57Section__head>div,
.cnt57Section__head>a{
  color:var(--warm-gold)!important;
}
.cnt57Section__head span{
  color:#24272b!important;
}
.cnt57VideoCard,
.cnt57PodcastCard{
  border-color:var(--warm-border)!important;
  background:#fffdf9!important;
  box-shadow:0 14px 36px rgba(84,64,39,.055)!important;
}
.cnt57VideoCard:hover{
  border-color:rgba(155,116,56,.38)!important;
  box-shadow:var(--warm-shadow)!important;
}
.cnt57VideoCard__body h3,
.cnt57PodcastInfo h3{
  color:#25282d!important;
}
.cnt57VideoCard__body p,
.cnt57PodcastInfo p{
  color:#676e75!important;
}
.cnt57VideoCard__body>div{
  color:#858b91!important;
}
.cnt57VideoCard__body b,
.cnt57PodcastArt,
.cnt57PodcastArt__ring,
.cnt57PodcastInfo>small,
.cnt57PodcastInfo strong{
  color:var(--warm-gold)!important;
  border-color:rgba(155,116,56,.26)!important;
}
.cnt57PodcastArt{
  background:#eee7dd!important;
}
.cnt57PodcastInfo button{
  background:linear-gradient(135deg,#9d7437,#b28645)!important;
  border-color:#9d7437!important;
}
.cnt57Hint,
.cnt57Subscribe{
  border-color:var(--warm-border)!important;
  background:#ebe4da!important;
}
.cnt57Hint{
  color:var(--warm-gold)!important;
}
.cnt57Hint p,
.cnt57Subscribe p{
  color:#686f76!important;
}
.cnt57Subscribe strong{
  color:#25282d!important;
}
.cnt57Subscribe__icon{
  border-color:rgba(155,116,56,.28)!important;
}
.cnt57Subscribe>a{
  color:var(--warm-gold)!important;
  border-color:rgba(155,116,56,.36)!important;
}

/* -------- APPOINTMENT -------- */
.apt60{
  color:var(--warm-ink)!important;
  background:var(--warm-bg)!important;
}
.apt60Hero{
  border-bottom-color:var(--warm-border)!important;
  background:
    radial-gradient(circle at 80% 25%,rgba(155,116,56,.08),transparent 28%),
    radial-gradient(circle at 10% 75%,rgba(255,255,255,.90),transparent 26%),
    linear-gradient(180deg,#f7f4ef,#eee7dd)!important;
}
.apt60Hero__grid{
  opacity:.30!important;
  background-image:
    linear-gradient(rgba(128,98,55,.035) 1px,transparent 1px),
    linear-gradient(90deg,rgba(128,98,55,.035) 1px,transparent 1px)!important;
}
.apt60Back{
  color:#6d747a!important;
}
.apt60Back span,
.apt60Hero__copy>span,
.apt60Step__head>span{
  color:var(--warm-gold)!important;
}
.apt60Hero h1{
  color:#202329!important;
}
.apt60Hero h1 strong{
  color:var(--warm-gold)!important;
}
.apt60Hero__copy>p{
  color:#555c63!important;
}
.apt60Hero__trust>div{
  border-color:var(--warm-border)!important;
  background:rgba(255,253,249,.70)!important;
}
.apt60Hero__trust svg{
  color:var(--warm-gold)!important;
}
.apt60Hero__trust strong,
.apt60Hero__aside strong{
  color:#282b30!important;
}
.apt60Hero__trust small,
.apt60Hero__aside small{
  color:#70777e!important;
}
.apt60Hero__aside{
  border-color:var(--warm-border)!important;
  background:rgba(255,253,249,.88)!important;
  box-shadow:var(--warm-shadow)!important;
}
.apt60Hero__aside>span,
.apt60Hero__aside b{
  color:var(--warm-gold)!important;
}
.apt60Hero__aside b{
  border-color:rgba(155,116,56,.30)!important;
}
.apt60Hero__aside>div{
  border-color:rgba(128,98,55,.10)!important;
}
.apt60FormArea{
  background:
    radial-gradient(circle at 50% 0,rgba(155,116,56,.055),transparent 28%),
    #f3eee7!important;
}
.apt60Progress>div{
  color:#8b9095!important;
}
.apt60Progress>div.is-active{
  color:var(--warm-gold)!important;
}
.apt60Progress span{
  border-color:rgba(128,98,55,.18)!important;
  background:#fffdf9!important;
}
.apt60Progress>div.is-active span{
  border-color:rgba(155,116,56,.50)!important;
  background:#efe4d4!important;
}
.apt60Progress:before{
  background:rgba(155,116,56,.24)!important;
}
.apt60Card{
  border-color:var(--warm-border)!important;
  background:#fffdf9!important;
  box-shadow:var(--warm-shadow)!important;
}
.apt60Step__head h2{
  color:#23262b!important;
}
.apt60Step__head p{
  color:#696f75!important;
}
.apt60Services button{
  border-color:var(--warm-border)!important;
  background:#f8f4ee!important;
  color:#25282d!important;
}
.apt60Services button:hover,
.apt60Services button.is-selected{
  border-color:rgba(155,116,56,.44)!important;
  background:#f0e7da!important;
}
.apt60Services button>div,
.apt60Services button>span{
  color:var(--warm-gold)!important;
  border-color:rgba(155,116,56,.22)!important;
}
.apt60Services p{
  color:#686f76!important;
}
.apt60Format{
  border-color:rgba(128,98,55,.10)!important;
}
.apt60Format>span,
.apt60DateGrid label>span,
.apt60Times>span,
.apt60Fields label>span{
  color:#666d73!important;
}
.apt60Format button,
.apt60Times button,
.apt60DateGrid input,
.apt60Fields input,
.apt60Fields textarea,
.apt60Kvkk{
  border-color:var(--warm-border)!important;
  background:#f8f4ee!important;
  color:#282c31!important;
}
.apt60DateGrid input{
  color-scheme:light!important;
}
.apt60Format button svg{
  color:var(--warm-gold)!important;
}
.apt60Format button.is-selected,
.apt60Times button.is-selected{
  border-color:rgba(155,116,56,.48)!important;
  background:#eee3d3!important;
  color:var(--warm-gold)!important;
}
.apt60Actions{
  border-color:rgba(128,98,55,.10)!important;
}
.apt60Actions button{
  background:linear-gradient(135deg,#a47b3d,#8f6931)!important;
  border-color:#966e33!important;
}
.apt60Actions button.is-secondary{
  background:transparent!important;
  color:#737a80!important;
  border-color:rgba(128,98,55,.18)!important;
}
.apt60Notice,
.apt60Sensitive{
  border-color:var(--warm-border)!important;
  background:#f3ece2!important;
  color:var(--warm-gold)!important;
}
.apt60Notice p,
.apt60Sensitive p,
.apt60Kvkk p{
  color:#656c72!important;
}
.apt60Kvkk>button{
  border-color:rgba(155,116,56,.38)!important;
  color:var(--warm-gold)!important;
}
.apt60Kvkk a{
  color:var(--warm-gold)!important;
}
.apt60Success{
  color:var(--warm-ink)!important;
  background:linear-gradient(180deg,#f7f4ef,#eee7dd)!important;
}
.apt60Success__card{
  border-color:var(--warm-border)!important;
  background:#fffdf9!important;
  box-shadow:var(--warm-shadow)!important;
}
.apt60Success__card>span,
.apt60Success__card>a{
  color:var(--warm-gold)!important;
}
.apt60Success h1{
  color:#24272b!important;
}
.apt60Success__card>p{
  color:#676e75!important;
}
.apt60Success__summary>div{
  border-color:var(--warm-border)!important;
  background:#f6f1ea!important;
}
.apt60Success__summary small{
  color:#878c91!important;
}
.apt60Success__summary strong{
  color:#292c31!important;
}

/* -------- LEGAL / KVKK / PRIVACY / COOKIES -------- */
.legalPage{
  color:var(--warm-ink)!important;
  background:
    radial-gradient(circle at 82% 8%,rgba(155,116,56,.07),transparent 25%),
    linear-gradient(180deg,#f7f4ef,#eee8df)!important;
}
.legalHero{
  border-color:var(--warm-border)!important;
}
.legalHero__grid{
  opacity:.25!important;
  background-image:
    linear-gradient(rgba(128,98,55,.03) 1px,transparent 1px),
    linear-gradient(90deg,rgba(128,98,55,.03) 1px,transparent 1px)!important;
}
.legalHero__glow{
  background:rgba(155,116,56,.07)!important;
}
.legalBack{
  color:#6d747a!important;
}
.legalBack span,
.legalHero__copy>span,
.legalHero__card>span,
.legalContent__toc>span{
  color:var(--warm-gold)!important;
}
.legalHero h1,
.legalHero__card h2,
.legalArticle__section h2{
  color:#23262b!important;
}
.legalHero__copy>p,
.legalHero__card p,
.legalArticle__section p,
.legalArticle__notice p{
  color:#626970!important;
}
.legalHero__card{
  border-color:var(--warm-border)!important;
  background:#fffdf9!important;
  box-shadow:var(--warm-shadow)!important;
}
.legalHero__icon{
  color:var(--warm-gold)!important;
  border-color:rgba(155,116,56,.25)!important;
}
.legalContent__toc a{
  color:#777d83!important;
  border-color:rgba(128,98,55,.10)!important;
}
.legalContent__toc a:hover{
  color:var(--warm-gold)!important;
}
.legalArticle__section{
  border-color:rgba(128,98,55,.11)!important;
}
.legalArticle__notice,
.legalArticle__section:nth-of-type(4){
  border-color:var(--warm-border)!important;
  background:#f2eadf!important;
}
.legalArticle__notice>svg,
.legalArticle__section:nth-of-type(4) h2{
  color:var(--warm-gold)!important;
}

/* -------- GLOBAL PUBLIC MOBILE POLISH -------- */
@media(max-width:760px){
  .svc52Hero__shade,
  .prc53Hero__shade,
  .cnt57Hero__shade{
    background:
      linear-gradient(180deg,rgba(247,244,239,.04) 0%,rgba(247,244,239,.12) 43%,#f7f4ef 100%)!important;
  }
  .svc52Hero__copy p,
  .prc53Hero__copy p,
  .cnt57Hero__copy p{
    color:#4f565d!important;
  }
  .svc52Hero h1,
  .prc53Hero h1,
  .cnt57Hero h1{
    text-shadow:0 2px 15px rgba(255,255,255,.45);
  }
}

/* =========================================================
   STEP 64 — AÇIK TEMA / GERÇEK NATIVE PREMIUM POLISH
   Sadece renk açmak yerine bölüm, kart ve tipografi dili
   açık tasarıma göre yeniden rafine edildi.
   ========================================================= */

/* genel ferahlık */
body{
  background:#f6f2ec;
}
main{
  overflow-x:hidden;
}
section{
  scroll-margin-top:110px;
}

/* ana sayfa alt bölümleri artık daha açık ve katmanlı */
.homeServicesShowcase,
.homeTrustStatement,
.contactSection{
  position:relative;
}
.homeServicesShowcase:before,
.homeTrustStatement:before,
.contactSection:before{
  content:"";
  position:absolute;
  left:5.2%;
  right:5.2%;
  top:0;
  height:1px;
  background:linear-gradient(90deg,transparent,rgba(155,116,56,.18),transparent);
}
.homeServicesShowcase__head,
.homeTrustStatement__inner,
.contactSection__inner{
  max-width:1420px;
  margin-left:auto;
  margin-right:auto;
}

/* hizmet kartlarını “dark card recolor” hissinden çıkar */
.homeServiceFeature{
  position:relative;
  overflow:hidden;
  border-radius:18px!important;
  background:
    radial-gradient(circle at 90% 0%,rgba(177,135,72,.06),transparent 30%),
    linear-gradient(180deg,#fffdf9,#faf6ef)!important;
}
.homeServiceFeature:after{
  content:"";
  position:absolute;
  left:0;
  top:0;
  width:100%;
  height:3px;
  background:linear-gradient(90deg,#a77d3e,rgba(167,125,62,.15),transparent);
  opacity:.75;
}
.homeServiceFeature__icon{
  width:54px!important;
  height:54px!important;
  border-radius:14px!important;
  background:#f2e8d9!important;
}
.homeServiceFeature h3{
  margin-top:20px!important;
  font:400 24px/1.08 Georgia,"Times New Roman",serif!important;
}
.homeServiceFeature p{
  font-size:12px!important;
  line-height:1.72!important;
}
.homeServicesShowcase__benefit{
  min-height:120px;
  padding:22px!important;
}
.homeServicesShowcase__benefit strong{
  color:#282b30!important;
  font-size:12px!important;
}
.homeServicesShowcase__benefit p{
  font-size:10.5px!important;
  line-height:1.6!important;
}

/* güven alanını açık temada daha editorial yap */
.homeTrustStatement{
  padding-top:84px!important;
  padding-bottom:84px!important;
}
.homeTrustStatement__inner{
  border:1px solid rgba(128,98,55,.13);
  border-radius:24px;
  padding:46px;
  background:
    radial-gradient(circle at 92% 12%,rgba(177,135,72,.08),transparent 24%),
    rgba(255,253,249,.72);
  box-shadow:0 25px 70px rgba(84,64,39,.075);
}
.homeTrustStatement h2{
  font-size:clamp(38px,4vw,60px)!important;
  line-height:1.02!important;
}
.homeTrustStatement p{
  font-size:13px!important;
  line-height:1.8!important;
}
.homeTrustStatement__mark{
  font-size:74px!important;
  opacity:.22!important;
}

/* iletişim kartları */
.contactCard{
  border-radius:18px!important;
  background:linear-gradient(180deg,#fffdf9,#faf6ef)!important;
}
.contactCard:hover{
  transform:translateY(-4px);
  border-color:rgba(155,116,56,.32)!important;
  box-shadow:0 24px 55px rgba(84,64,39,.10)!important;
}
.contactIcon{
  width:52px!important;
  height:52px!important;
  border-radius:14px!important;
}
.contactCard h3,
.contactCard strong{
  font-size:15px!important;
}
.contactCard p,
.contactCard span{
  font-size:11px!important;
  line-height:1.6!important;
}

/* hakkımda: daha ferah editorial sayfa */
.aboutDirectLayout{
  max-width:1500px;
  margin:0 auto;
}
.aboutDirectArticle{
  background:rgba(255,253,249,.62);
  border:1px solid rgba(128,98,55,.10);
  border-radius:24px;
  padding:40px 42px;
  box-shadow:0 22px 60px rgba(84,64,39,.055);
}
.aboutDirectArticle p{
  font-size:16px!important;
  line-height:1.95!important;
}
.aboutDirectArticle p:first-of-type{
  border-left:3px solid #9b7438!important;
  border-radius:0 14px 14px 0!important;
  background:#f1e7d8!important;
  color:#30343a!important;
}
.aboutDirectProfile{
  border-radius:24px!important;
}
.aboutDirectProfile__body{
  padding:28px!important;
}

/* hizmetler: kart yerleşimi light-native */
.svc52QuickCard{
  position:relative;
  border-radius:18px!important;
  overflow:hidden;
}
.svc52QuickCard:before{
  content:"";
  position:absolute;
  left:0;
  right:0;
  top:0;
  height:3px;
  background:linear-gradient(90deg,#9b7438,rgba(155,116,56,.16),transparent);
}
.svc52QuickIcon{
  background:#f0e5d5!important;
}
.svc52QuickCard h3{
  font:400 19px/1.1 Georgia,"Times New Roman",serif!important;
}
.svc52QuickCard p{
  font-size:12px!important;
  line-height:1.68!important;
}
.servicesDetailCard{
  border-radius:20px!important;
  padding:27px!important;
}
.servicesDetailCard__top{
  padding-bottom:18px!important;
  border-bottom:1px solid rgba(128,98,55,.10);
}
.servicesDetailItem{
  min-height:48px;
  align-items:flex-start!important;
}
.servicesDetailItem p{
  font-size:12px!important;
  line-height:1.62!important;
}

/* süreç: açık temaya özgü timeline görünümü */
.prc53Steps{
  gap:16px!important;
}
.prc53Step{
  min-height:300px!important;
  border-radius:20px!important;
  padding:32px 22px 24px!important;
}
.prc53Step:before{
  content:"";
  position:absolute;
  left:22px;
  right:22px;
  bottom:0;
  height:4px;
  border-radius:999px 999px 0 0;
  background:linear-gradient(90deg,#a37a3c,rgba(163,122,60,.14));
}
.prc53Step__number{
  width:42px!important;
  height:42px!important;
  box-shadow:0 7px 18px rgba(91,66,34,.08);
}
.prc53Step h3{
  font:400 20px/1.08 Georgia,"Times New Roman",serif!important;
}
.prc53Step p{
  font-size:12px!important;
  line-height:1.7!important;
}
.prc53Trust{
  border-radius:18px!important;
  background:linear-gradient(90deg,#e9dfd2,#f3ede4)!important;
}

/* içerikler: daha medya-magazine hissi */
.cnt57VideoCard,
.cnt57PodcastCard{
  border-radius:18px!important;
  overflow:hidden;
}
.cnt57VideoCard__thumb{
  height:190px!important;
}
.cnt57VideoCard__body{
  padding:18px!important;
}
.cnt57VideoCard__body h3{
  font-size:20px!important;
}
.cnt57VideoCard__body p{
  font-size:11px!important;
  line-height:1.65!important;
}
.cnt57PodcastCard{
  padding:16px!important;
}
.cnt57PodcastInfo h3{
  font-size:19px!important;
}
.cnt57PodcastInfo p{
  font-size:10.5px!important;
  line-height:1.6!important;
}
.cnt57Subscribe{
  border-radius:18px!important;
  padding:18px 22px!important;
}

/* randevu: form kartlarını daha açık, büyük ve kullanıcı dostu yap */
.apt60Card{
  border-radius:26px!important;
}
.apt60Step{
  padding:42px!important;
}
.apt60Step__head h2{
  font-size:clamp(34px,3.4vw,48px)!important;
}
.apt60Step__head p{
  font-size:14px!important;
}
.apt60Services{
  gap:16px!important;
}
.apt60Services button{
  min-height:165px!important;
  border-radius:18px!important;
  padding:24px!important;
}
.apt60Services strong{
  font-size:21px!important;
}
.apt60Services p{
  font-size:11.5px!important;
}
.apt60Fields{
  gap:18px!important;
}
.apt60Fields label>span{
  font-size:13px!important;
  font-weight:700!important;
}
.apt60Fields input,
.apt60Fields textarea{
  border-radius:12px!important;
  font-size:15px!important;
}
.apt60Fields input{
  min-height:54px!important;
}
.apt60Fields textarea{
  min-height:150px;
}
.apt60Kvkk{
  border-radius:13px!important;
}
.apt60Kvkk p{
  font-size:11.5px!important;
}
.apt60Sensitive p{
  font-size:11.5px!important;
}

/* yasal sayfalar daha okunaklı */
.legalContent{
  max-width:1450px;
  margin:0 auto;
}
.legalHero__card{
  border-radius:22px!important;
}
.legalArticle__section{
  padding:0 0 38px!important;
  margin-bottom:38px!important;
}
.legalArticle__section h2{
  font-size:30px!important;
}
.legalArticle__section p{
  font-size:15px!important;
  line-height:1.9!important;
}

/* footer'da açık temaya uygun daha premium final */
.premiumFooter{
  padding-top:72px!important;
}
.premiumFooter__top{
  border-bottom:1px solid rgba(128,98,55,.12)!important;
}
.premiumFooter__bottom{
  border-top-color:rgba(128,98,55,.08)!important;
}
.premiumFooter__nav a{
  font-size:11px!important;
}
.premiumFooter__cta{
  border-radius:8px!important;
  box-shadow:0 12px 28px rgba(128,92,38,.12);
}

/* mobil */
@media(max-width:760px){
  .homeTrustStatement__inner{
    padding:28px 20px;
    border-radius:18px;
  }
  .aboutDirectArticle{
    padding:26px 20px;
    border-radius:18px;
  }
  .aboutDirectArticle p{
    font-size:15px!important;
    line-height:1.82!important;
  }
  .svc52QuickCard,
  .servicesDetailCard,
  .prc53Step,
  .cnt57VideoCard,
  .cnt57PodcastCard{
    border-radius:16px!important;
  }
  .apt60Step{
    padding:28px 18px!important;
  }
  .apt60Services button{
    min-height:150px!important;
    padding:20px!important;
  }
  .apt60Fields label>span{
    font-size:14px!important;
  }
  .apt60Fields input,
  .apt60Fields textarea{
    font-size:16px!important;
  }
}

/* STEP 67 — FINAL LOGO HEADER FIX */
.brand--newLogo{
  display:flex!important;
  align-items:center!important;
  gap:13px!important;
  min-width:300px!important;
  height:auto!important;
  overflow:visible!important;
}
.brandEmblemWrap{
  width:68px!important;
  height:68px!important;
  flex:0 0 68px!important;
  display:flex!important;
  align-items:center!important;
  justify-content:center!important;
  background:transparent!important;
  border:0!important;
  box-shadow:none!important;
  overflow:visible!important;
}
.brandEmblem{
  display:block!important;
  width:100%!important;
  height:100%!important;
  object-fit:contain!important;
  opacity:1!important;
  visibility:visible!important;
  filter:none!important;
  mix-blend-mode:normal!important;
}
.brandIdentity{
  display:flex!important;
  flex-direction:column!important;
  justify-content:center!important;
  line-height:1!important;
  white-space:nowrap!important;
}
.brandIdentity small{
  order:1;
  margin-bottom:4px;
  color:#757066!important;
  font-size:8.5px!important;
  font-weight:700!important;
  letter-spacing:.12em!important;
}
.brandIdentity strong{
  order:2;
  color:#1f2328!important;
  font:600 18px/1.05 Georgia,"Times New Roman",serif!important;
  letter-spacing:.015em!important;
}
.brandIdentity em{
  order:3;
  margin-top:5px;
  color:#9b7438!important;
  font-size:8px!important;
  font-style:normal!important;
  font-weight:700!important;
  letter-spacing:.15em!important;
}
.topbar:not(.topbar--light) .brandIdentity small{
  color:#8c98a6!important;
}
.topbar:not(.topbar--light) .brandIdentity strong{
  color:#f3eee7!important;
}
.topbar:not(.topbar--light) .brandIdentity em{
  color:#d59a4b!important;
}
@media(max-width:1050px){
  .brand--newLogo{min-width:245px!important;gap:10px!important}
  .brandEmblemWrap{width:56px!important;height:56px!important;flex-basis:56px!important}
  .brandIdentity strong{font-size:16px!important}
  .brandIdentity small{font-size:7.5px!important}
  .brandIdentity em{font-size:7px!important}
}
@media(max-width:760px){
  .brand--newLogo{min-width:190px!important;gap:8px!important}
  .brandEmblemWrap{width:46px!important;height:46px!important;flex-basis:46px!important}
  .brandIdentity strong{font-size:14px!important}
  .brandIdentity small{font-size:6.5px!important;letter-spacing:.08em!important}
  .brandIdentity em{font-size:6.5px!important;letter-spacing:.10em!important}
}

/* STEP68 FIXED */
.podcastTopStrip{min-height:34px;padding:7px 5%;display:flex;align-items:center;justify-content:center;gap:9px;position:relative;z-index:1001;background:linear-gradient(90deg,#315c47,#46765d,#315c47);color:#fff;text-decoration:none;font-size:11px}.podcastTopStrip__icon{color:#e0bd72;font-size:8px}.podcastTopStrip strong{letter-spacing:.11em;text-transform:uppercase}.podcastTopStrip__copy{color:rgba(255,255,255,.82)}.podcastTopStrip b{margin-left:8px;color:#f2dfae;font-size:10px}
.lightHomeHero__content{padding-top:105px!important}.lightHomeHero h1{max-width:690px}.lightHomeHero h1 strong{max-width:650px}
.apt60Hero__aside strong{font-size:16px!important;line-height:1.4!important}.apt60Hero__aside small{font-size:12px!important;line-height:1.65!important}.apt60Hero__trust strong{font-size:14px!important}.apt60Hero__trust small{font-size:11.5px!important;line-height:1.55!important}.apt60Hero__trust>div{padding:18px 16px!important}
.svc68CategoryDetails{padding:80px 6%;border-top:1px solid rgba(128,98,55,.12);background:#f3eee7}.svc68CategoryDetails__head{max-width:850px;margin:0 auto 34px;text-align:center}.svc68CategoryDetails__head>span{color:#9b7438;font-size:10px;font-weight:800;letter-spacing:.16em}.svc68CategoryDetails__head h2{margin:10px 0 12px;color:#24272b;font:400 clamp(32px,3.4vw,48px)/1.05 Georgia,"Times New Roman",serif}.svc68CategoryDetails__grid{max-width:1120px;margin:0 auto;display:grid;gap:14px}.svc68Detail{overflow:hidden;border:1px solid rgba(128,98,55,.16);border-radius:17px;background:#fffdf9}.svc68Detail summary{min-height:84px;padding:18px 24px;display:flex;align-items:center;justify-content:space-between;gap:20px;cursor:pointer;list-style:none}.svc68Detail summary::-webkit-details-marker{display:none}.svc68Detail summary>span{display:flex;align-items:center;gap:16px}.svc68Detail summary small{width:38px;height:38px;display:grid;place-items:center;border:1px solid rgba(155,116,56,.28);border-radius:50%;color:#9b7438;font-size:9px}.svc68Detail summary strong{color:#25282d;font:400 20px/1.1 Georgia,"Times New Roman",serif}.svc68Detail summary b{color:#9b7438;font-size:10px}.svc68Detail[open] summary{border-bottom:1px solid rgba(128,98,55,.10);background:#faf5ed}.svc68Detail__body{padding:25px 30px 30px 78px}.svc68Detail__body ul{margin:0;padding:0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px 26px;list-style:none}.svc68Detail__body li{position:relative;padding-left:18px;color:#34383d;font-size:12px;line-height:1.55}.svc68Detail__body li:before{content:"";position:absolute;left:0;top:.58em;width:6px;height:6px;border-radius:50%;background:#a47b3d}
@media(max-width:760px){.podcastTopStrip{min-height:32px;padding:7px 12px;font-size:9px}.podcastTopStrip__copy{display:none}.podcastTopStrip b{font-size:9px}.svc68CategoryDetails{padding:58px 18px}.svc68Detail summary{padding:15px}.svc68Detail summary strong{font-size:17px}.svc68Detail__body{padding:20px 18px 24px}.svc68Detail__body ul{grid-template-columns:1fr}}

/* STEP 69 — CURRENT FILE REPAIR + REQUESTED SERVICE DETAILS */
.apt60Hero__trust{grid-template-columns:repeat(2,minmax(0,1fr))!important}
.apt60Hero__trust strong{font-size:15px!important;line-height:1.35!important}
.apt60Hero__trust small{font-size:12px!important;line-height:1.55!important}
.apt60Hero__aside>span{font-size:13px!important;font-weight:800!important;letter-spacing:.08em!important}
.apt60Hero__aside strong{font-size:16px!important;line-height:1.4!important}
.apt60Hero__aside small{font-size:12.5px!important;line-height:1.6!important}
.svc52QuickGrid--four{grid-template-columns:repeat(4,minmax(0,1fr))!important}
.svc52QuickCard button{margin-top:auto;display:flex;align-items:center;gap:8px;border:0;background:transparent;color:#9b7438;font:700 10px/1.2 inherit;cursor:pointer;padding:15px 0 0}
.svc52QuickCard.is-active{border-color:rgba(155,116,56,.48)!important;background:#f3e9da!important;box-shadow:0 20px 50px rgba(84,64,39,.10)!important}
.svc69DetailSection{scroll-margin-top:145px}
.svc69DetailCard{max-width:1120px;margin:0 auto!important}
.svc69DetailList{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 28px!important}
.svc69DetailList .servicesDetailItem{min-height:55px!important}
.svc69DetailList .servicesDetailItem p{font-size:13px!important;line-height:1.65!important}
@media(max-width:1100px){.svc52QuickGrid--four{grid-template-columns:repeat(2,minmax(0,1fr))!important}}
@media(max-width:700px){.apt60Hero__trust{grid-template-columns:1fr!important}.svc52QuickGrid--four{grid-template-columns:1fr!important}.svc69DetailList{grid-template-columns:1fr!important}.svc69DetailSection{scroll-margin-top:115px}}

/* STEP 69 — SÜREÇ / DANIŞAN DENEYİMLERİ */
.prc53Testimonials{position:relative;padding:86px 6% 92px;overflow:hidden;border-top:1px solid rgba(128,98,55,.13);background:radial-gradient(circle at 88% 0,rgba(155,116,56,.09),transparent 25%),radial-gradient(circle at 4% 80%,rgba(114,145,116,.07),transparent 24%),linear-gradient(180deg,#f7f3ed 0%,#eee7dd 100%)}
.prc53Testimonials:before{content:"";position:absolute;width:360px;height:360px;right:-190px;top:120px;border:1px solid rgba(155,116,56,.11);border-radius:50%;box-shadow:0 0 0 40px rgba(155,116,56,.025),0 0 0 82px rgba(155,116,56,.018);pointer-events:none}
.prc53Testimonials__head{position:relative;z-index:1;max-width:1400px;margin:0 auto 34px;display:grid;grid-template-columns:1.1fr .9fr;gap:60px;align-items:end}
.prc53Testimonials__head>div>span{display:block;margin-bottom:10px;color:#9b7438;font-size:10px;font-weight:800;letter-spacing:.18em}.prc53Testimonials__head h2{max-width:760px;margin:0;color:#24272b;font:400 clamp(36px,4.2vw,58px)/1.03 Georgia,"Times New Roman",serif;letter-spacing:-.025em}.prc53Testimonials__head>p{max-width:520px;color:#666d73;font-size:12px;line-height:1.75}
.prc53Testimonials__grid{position:relative;z-index:1;max-width:1400px;margin:0 auto;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;align-items:start}.prc53Testimonials__grid.is-expanded{grid-template-columns:repeat(2,minmax(0,1fr))}
.prc53TestimonialCard{position:relative;overflow:hidden;padding:27px 26px 23px;border:1px solid rgba(128,98,55,.16);border-radius:20px;background:radial-gradient(circle at 92% 3%,rgba(155,116,56,.07),transparent 25%),rgba(255,253,249,.94);box-shadow:0 18px 46px rgba(84,64,39,.065);transition:transform .28s ease,border-color .28s ease,box-shadow .28s ease}.prc53TestimonialCard:hover{transform:translateY(-4px);border-color:rgba(155,116,56,.34);box-shadow:0 28px 58px rgba(84,64,39,.10)}.prc53TestimonialCard:after{content:"";position:absolute;left:0;top:0;width:3px;height:100%;background:linear-gradient(180deg,#a47b3d,rgba(164,123,61,.08))}
.prc53TestimonialCard__top{display:flex;align-items:flex-start;justify-content:space-between;gap:16px}.prc53TestimonialCard__quote{height:35px;color:#ad8243;font:400 54px/.8 Georgia,"Times New Roman",serif}.prc53TestimonialCard__top small{width:32px;height:32px;display:grid;place-items:center;border:1px solid rgba(155,116,56,.18);border-radius:50%;color:#9b7438;font-size:8px;font-weight:800;background:#f5ede2}
.prc53TestimonialCard>p{margin:14px 0 25px;color:#3e4449;font-size:12.5px;line-height:1.78;white-space:pre-line}.prc53TestimonialCard__footer{padding-top:17px;display:flex;justify-content:space-between;align-items:center;gap:15px;border-top:1px solid rgba(128,98,55,.10)}.prc53TestimonialCard__footer>div:first-child{display:flex;flex-direction:column;gap:4px}.prc53TestimonialCard__footer strong{color:#25282d;font:600 13px Georgia,"Times New Roman",serif}.prc53TestimonialCard__footer span{color:#858a8f;font-size:8.5px;letter-spacing:.05em}.prc53TestimonialCard__verified{display:flex;align-items:center;gap:5px;color:#55705f;font-size:8px;font-weight:700}
.prc53Testimonials__actions{position:relative;z-index:1;max-width:1400px;margin:28px auto 0;display:flex;justify-content:center}.prc53Testimonials__actions button{min-width:210px;min-height:48px;padding:0 20px;display:flex;align-items:center;justify-content:center;gap:12px;border:1px solid #977039;border-radius:9px;background:linear-gradient(135deg,#a77e40,#8e692f);color:#fff;cursor:pointer;font-size:10px;font-weight:800;letter-spacing:.04em;box-shadow:0 12px 28px rgba(128,92,38,.13);transition:transform .25s ease,box-shadow .25s ease}.prc53Testimonials__actions button:hover{transform:translateY(-2px);box-shadow:0 18px 34px rgba(128,92,38,.18)}
.prc53Testimonials__note{position:relative;z-index:1;max-width:830px;margin:20px auto 0;padding:12px 15px;display:flex;align-items:flex-start;justify-content:center;gap:9px;border:1px solid rgba(128,98,55,.11);border-radius:10px;color:#9b7438;background:rgba(255,253,249,.52)}.prc53Testimonials__note p{color:#777d82;font-size:9.5px;line-height:1.6}
@media(max-width:1000px){.prc53Testimonials__head{grid-template-columns:1fr;gap:16px}.prc53Testimonials__grid,.prc53Testimonials__grid.is-expanded{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:650px){.prc53Testimonials{padding:64px 18px 70px}.prc53Testimonials__head h2{font-size:38px}.prc53Testimonials__head>p{font-size:12px}.prc53Testimonials__grid,.prc53Testimonials__grid.is-expanded{grid-template-columns:1fr}.prc53TestimonialCard{padding:23px 20px 20px;border-radius:16px}.prc53TestimonialCard>p{font-size:13px;line-height:1.75}.prc53Testimonials__actions button{width:100%}}

/* STEP 70 — SUPABASE GERÇEK RANDEVU KAYDI */
.apt70SubmitError{
  margin-top:20px;
  padding:14px 16px;
  display:flex;
  align-items:flex-start;
  gap:11px;
  border:1px solid rgba(176,78,58,.22);
  border-radius:12px;
  background:rgba(176,78,58,.055);
  color:#a04d3c;
}
.apt70SubmitError p{
  margin:0;
  color:#7d4c42;
  font-size:12px;
  line-height:1.65;
}
.apt60Actions button:disabled{
  cursor:not-allowed!important;
}

/* STEP 71 — GERÇEK ADMIN RANDEVU YÖNETİMİ */
.admin70Login{
  min-height:100vh;
  padding:30px 18px;
  display:grid;
  place-items:center;
  position:relative;
  overflow:hidden;
  background:
    radial-gradient(circle at 75% 12%,rgba(47,128,237,.09),transparent 28%),
    radial-gradient(circle at 12% 85%,rgba(218,151,65,.055),transparent 24%),
    #020914;
  color:#f4efe8;
}
.admin70Login__glow{
  position:absolute;
  width:500px;height:500px;
  border-radius:50%;
  background:rgba(47,128,237,.07);
  filter:blur(110px);
}
.admin70Login__card{
  position:relative;
  z-index:2;
  width:min(440px,100%);
  padding:36px;
  border:1px solid rgba(218,151,65,.20);
  border-radius:20px;
  background:linear-gradient(145deg,rgba(8,24,42,.97),rgba(3,13,25,.97));
  box-shadow:0 38px 90px rgba(0,0,0,.35);
}
.admin70Login__logo{
  width:58px;height:58px;
  display:grid;place-items:center;
  border:1px solid rgba(218,151,65,.28);
  border-radius:15px;
  color:#d9953d;
  font:400 24px Georgia,"Times New Roman",serif;
}
.admin70Login__card>span{
  display:block;
  margin-top:24px;
  color:#d9953d;
  font-size:9px;
  font-weight:800;
  letter-spacing:.16em;
}
.admin70Login h1{
  margin-top:8px;
  font:400 38px Georgia,"Times New Roman",serif;
}
.admin70Login p{
  margin-top:12px;
  color:#8995a3;
  font-size:11px;
  line-height:1.7;
}
.admin70Login label{
  margin-top:17px;
  display:flex;
  flex-direction:column;
  gap:7px;
}
.admin70Login label>span{
  color:#7d8997;
  font-size:9px;
}
.admin70Login input{
  min-height:48px;
  padding:0 13px;
  border:1px solid rgba(255,255,255,.08);
  border-radius:9px;
  background:#03101d;
  color:#fff;
}
.admin70Login button{
  width:100%;
  min-height:49px;
  margin-top:21px;
  padding:0 15px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  border:1px solid rgba(218,151,65,.30);
  border-radius:9px;
  background:linear-gradient(135deg,#a85e20,#d8963f);
  color:#fff;
  cursor:pointer;
  font-size:9px;
  font-weight:800;
}
.admin70Login__card>a{
  min-height:42px;
  margin-top:10px;
  display:flex;
  align-items:center;
  justify-content:center;
  color:#788595;
  font-size:9px;
}
.admin70Login__error{
  margin-top:13px;
  padding:10px 12px;
  border:1px solid rgba(255,100,100,.18);
  border-radius:8px;
  background:rgba(255,70,70,.045);
  color:#d79393;
  font-size:9px;
}
.admin70Logout{
  width:100%;
  min-height:36px;
  margin-top:12px;
  border:1px solid rgba(218,151,65,.14);
  border-radius:8px;
  background:rgba(218,151,65,.035);
  color:#a99378;
  cursor:pointer;
  font-size:8px;
}
.adminDemo__demoBadge--live{
  border-color:rgba(52,212,134,.18)!important;
  color:#78d9a1!important;
}
.adminDemo__demoBadge--live span{
  background:#4ed58a!important;
}
.admin70MiniAppointments{
  display:grid;
  gap:8px;
}
.admin70MiniAppointments>div{
  min-height:58px;
  padding:10px 12px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:14px;
  border:1px solid rgba(255,255,255,.055);
  border-radius:9px;
  background:#041321;
}
.admin70MiniAppointments span{
  display:flex;
  flex-direction:column;
  gap:4px;
}
.admin70MiniAppointments strong{
  color:#e8ecf0;
  font-size:10px;
}
.admin70MiniAppointments small{
  color:#6f7d8d;
  font-size:8px;
}
.admin70MiniAppointments>p{
  color:#748193;
  font-size:10px;
}
.admin70Appointments{
  display:grid;
  gap:18px;
}
.admin70Appointments__head{
  padding:24px 26px;
  display:flex;
  align-items:flex-end;
  justify-content:space-between;
  gap:20px;
  border:1px solid rgba(218,151,65,.12);
  border-radius:15px;
  background:linear-gradient(145deg,#07182a,#04111e);
}
.admin70Appointments__head>div>span{
  color:#d9953d;
  font-size:9px;
  font-weight:800;
  letter-spacing:.14em;
}
.admin70Appointments__head h2{
  margin-top:6px;
  font:400 30px Georgia,"Times New Roman",serif;
}
.admin70Appointments__head p{
  margin-top:7px;
  color:#798696;
  font-size:10px;
}
.admin70Appointments__head>button{
  min-height:39px;
  padding:0 14px;
  border:1px solid rgba(218,151,65,.20);
  border-radius:8px;
  background:rgba(218,151,65,.04);
  color:#d9953d;
  cursor:pointer;
  font-size:8px;
}
.admin70Appointments__list{
  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  gap:13px;
}
.admin70AppointmentCard{
  padding:21px;
  border:1px solid rgba(255,255,255,.07);
  border-radius:15px;
  background:
    radial-gradient(circle at 100% 0,rgba(47,128,237,.04),transparent 30%),
    linear-gradient(145deg,#07182a,#04111e);
  box-shadow:0 15px 35px rgba(0,0,0,.12);
}
.admin70AppointmentCard__top{
  display:flex;
  align-items:flex-start;
  justify-content:space-between;
  gap:20px;
}
.admin70AppointmentCard__top h3{
  margin-top:8px;
  font:400 22px Georgia,"Times New Roman",serif;
}
.admin70AppointmentCard__top p{
  margin-top:5px;
  color:#7b8796;
  font-size:9px;
}
.admin70AppointmentCard__date{
  text-align:right;
}
.admin70AppointmentCard__date strong{
  display:block;
  color:#d9953d;
  font:400 14px Georgia,serif;
}
.admin70AppointmentCard__date span{
  display:block;
  margin-top:4px;
  color:#f1ece5;
  font:400 19px Georgia,serif;
}
.admin70Status{
  display:inline-flex;
  align-items:center;
  width:max-content;
  min-height:24px;
  padding:0 8px;
  border-radius:999px;
  font-size:7px;
  font-weight:800;
  letter-spacing:.05em;
}
.admin70Status--pending{
  border:1px solid rgba(230,172,70,.18);
  background:rgba(230,172,70,.06);
  color:#d9a64f;
}
.admin70Status--approved{
  border:1px solid rgba(52,212,134,.18);
  background:rgba(52,212,134,.055);
  color:#72d79d;
}
.admin70Status--cancelled{
  border:1px solid rgba(225,92,92,.18);
  background:rgba(225,92,92,.05);
  color:#d27f7f;
}
.admin70AppointmentCard__details{
  margin-top:18px;
  padding-top:16px;
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:12px;
  border-top:1px solid rgba(255,255,255,.055);
}
.admin70AppointmentCard__details>div{
  display:flex;
  flex-direction:column;
  gap:5px;
}
.admin70AppointmentCard__details small,
.admin70AppointmentCard__note small{
  color:#657386;
  font-size:7px;
  font-weight:700;
  letter-spacing:.08em;
  text-transform:uppercase;
}
.admin70AppointmentCard__details a,
.admin70AppointmentCard__details strong{
  color:#cdd4dc;
  font-size:9px;
  line-height:1.5;
  word-break:break-word;
}
.admin70AppointmentCard__note{
  margin-top:15px;
  padding:13px;
  border:1px solid rgba(218,151,65,.10);
  border-radius:9px;
  background:rgba(218,151,65,.025);
}
.admin70AppointmentCard__note p{
  margin-top:7px;
  color:#909baa;
  font-size:9px;
  line-height:1.65;
  white-space:pre-line;
}
.admin70AppointmentCard__actions{
  margin-top:16px;
  display:flex;
  gap:8px;
}
.admin70AppointmentCard__actions button{
  min-height:38px;
  padding:0 13px;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:7px;
  border-radius:8px;
  cursor:pointer;
  font-size:8px;
  font-weight:800;
}
.admin70AppointmentCard__actions .is-approve{
  border:1px solid rgba(52,212,134,.20);
  background:rgba(52,212,134,.055);
  color:#72d79d;
}
.admin70AppointmentCard__actions .is-cancel{
  border:1px solid rgba(225,92,92,.18);
  background:rgba(225,92,92,.045);
  color:#d27f7f;
}
.admin70AppointmentCard__actions button:disabled{
  opacity:.38;
  cursor:not-allowed;
}
.admin70Appointments__error{
  padding:13px 15px;
  display:flex;
  align-items:flex-start;
  gap:10px;
  border:1px solid rgba(225,92,92,.16);
  border-radius:10px;
  background:rgba(225,92,92,.04);
  color:#d27f7f;
}
.admin70Appointments__error p{
  color:#ba8383;
  font-size:9px;
}
.admin70Appointments__empty{
  min-height:180px;
  display:grid;
  place-items:center;
  border:1px dashed rgba(255,255,255,.08);
  border-radius:13px;
  color:#6e7b8b;
  font-size:10px;
}
@media(max-width:1000px){
  .admin70Appointments__list{grid-template-columns:1fr}
}
@media(max-width:700px){
  .admin70Login__card{padding:28px 22px}
  .admin70Appointments__head{
    align-items:flex-start;
    flex-direction:column;
  }
  .admin70AppointmentCard__details{
    grid-template-columns:1fr;
  }
  .admin70AppointmentCard__actions{
    display:grid;
    grid-template-columns:1fr 1fr;
  }
}

/* STEP 72 — ANA SAYFA CMS */
.admin72Cms{display:grid;gap:16px}
.admin72Cms__head{padding:25px 27px;display:flex;align-items:flex-end;justify-content:space-between;gap:20px;border:1px solid rgba(218,151,65,.12);border-radius:16px;background:linear-gradient(145deg,#07182a,#04111e)}
.admin72Cms__head>div>span{color:#d9953d;font-size:9px;font-weight:800;letter-spacing:.15em}
.admin72Cms__head h2{margin-top:7px;font:400 30px Georgia,"Times New Roman",serif;color:#f0ebe5}
.admin72Cms__head p{max-width:650px;margin-top:8px;color:#7d8998;font-size:10px;line-height:1.6}
.admin72Cms__head>button{min-height:40px;padding:0 14px;border:1px solid rgba(218,151,65,.20);border-radius:8px;background:rgba(218,151,65,.04);color:#d9953d;cursor:pointer;font-size:8px}
.admin72Cms__form{display:grid;gap:13px}
.admin72Cms__section{padding:24px;border:1px solid rgba(255,255,255,.065);border-radius:15px;background:linear-gradient(145deg,#07182a,#04111e)}
.admin72Cms__sectionTitle{display:flex;align-items:center;gap:13px;padding-bottom:18px;border-bottom:1px solid rgba(255,255,255,.055)}
.admin72Cms__sectionTitle>span{width:37px;height:37px;display:grid;place-items:center;border:1px solid rgba(218,151,65,.23);border-radius:50%;color:#d9953d;font-size:8px}
.admin72Cms__sectionTitle>div{display:flex;flex-direction:column;gap:4px}
.admin72Cms__sectionTitle strong{color:#ece7e1;font:400 18px Georgia,"Times New Roman",serif}
.admin72Cms__sectionTitle small{color:#687587;font-size:8px}
.admin72Cms__fields{margin-top:19px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:13px}
.admin72Cms__fields label{display:flex;flex-direction:column;gap:7px}
.admin72Cms__fields label>span{color:#7e8b9a;font-size:8px;font-weight:700;letter-spacing:.05em}
.admin72Cms__fields input,.admin72Cms__fields textarea{width:100%;padding:12px 13px;border:1px solid rgba(255,255,255,.075);border-radius:9px;background:#03101d;color:#e8edf1;outline:none;font-size:10px;line-height:1.6}
.admin72Cms__fields input{min-height:45px}
.admin72Cms__fields input:focus,.admin72Cms__fields textarea:focus{border-color:rgba(218,151,65,.40)}
.admin72Cms__full{grid-column:1/-1}
.admin72Cms__loading{min-height:180px;display:grid;place-items:center;border:1px dashed rgba(255,255,255,.08);border-radius:13px;color:#6f7d8d;font-size:10px}
.admin72Cms__message{padding:12px 14px;border-radius:9px;font-size:9px}
.admin72Cms__message.is-success{border:1px solid rgba(52,212,134,.18);background:rgba(52,212,134,.05);color:#72d79d}
.admin72Cms__message.is-error{border:1px solid rgba(225,92,92,.18);background:rgba(225,92,92,.045);color:#d27f7f}
.admin72Cms__save{padding:19px 21px;display:flex;align-items:center;justify-content:space-between;gap:20px;border:1px solid rgba(218,151,65,.14);border-radius:13px;background:linear-gradient(90deg,rgba(218,151,65,.035),rgba(47,128,237,.025))}
.admin72Cms__save>div{display:flex;flex-direction:column;gap:5px}
.admin72Cms__save strong{color:#ece7e1;font:400 15px Georgia,"Times New Roman",serif}
.admin72Cms__save span{color:#6e7b8b;font-size:8px}
.admin72Cms__save button{min-height:43px;padding:0 16px;display:flex;align-items:center;gap:9px;border:1px solid rgba(218,151,65,.30);border-radius:8px;background:linear-gradient(135deg,#a85e20,#d8963f);color:#fff;cursor:pointer;font-size:8px;font-weight:800}
.admin72Cms__save button:disabled{opacity:.45;cursor:not-allowed}
@media(max-width:760px){.admin72Cms__head,.admin72Cms__save{align-items:flex-start;flex-direction:column}.admin72Cms__fields{grid-template-columns:1fr}.admin72Cms__full{grid-column:auto}.admin72Cms__save button{width:100%;justify-content:center}}

/* STEP 73 — HİZMETLER CMS + YENİ AÇILIR KARTLAR */
.svc73Grid{max-width:1240px;margin:34px auto 0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}
.svc73Card{overflow:hidden;border:1px solid rgba(128,98,55,.16);border-radius:19px;background:#fffdf9;box-shadow:0 15px 40px rgba(84,64,39,.055)}
.svc73Card summary{padding:24px;cursor:pointer;list-style:none}
.svc73Card summary::-webkit-details-marker{display:none}
.svc73Card__top{display:flex;align-items:center;justify-content:space-between}
.svc73Card__no{color:#9b7438;font-size:9px;font-weight:800;letter-spacing:.08em}
.svc73Card__icon{width:48px;height:48px;display:grid;place-items:center;border:1px solid rgba(155,116,56,.20);border-radius:13px;background:#f1e6d7;color:#9b7438}
.svc73Card h3{margin-top:20px;color:#25282d;font:400 24px/1.08 Georgia,"Times New Roman",serif}
.svc73Card summary>p{min-height:58px;margin-top:10px;color:#646b72;font-size:12px;line-height:1.68}
.svc73Card__action{margin-top:20px;padding-top:16px;display:flex;align-items:center;justify-content:space-between;border-top:1px solid rgba(128,98,55,.10);color:#9b7438}
.svc73Card__action span{font-size:9px;font-weight:800;letter-spacing:.06em}
.svc73Card__action b{font:400 21px Georgia,serif}
.svc73Card[open] .svc73Card__action b{transform:rotate(45deg)}
.svc73Card__details{padding:0 24px 24px;border-top:1px solid rgba(128,98,55,.08);background:#faf6ef}
.svc73Card__details ul{padding:20px 0 0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px 18px;list-style:none}
.svc73Card__details li{position:relative;padding-left:16px;color:#3e4449;font-size:11.5px;line-height:1.55}
.svc73Card__details li:before{content:"";position:absolute;left:0;top:.58em;width:6px;height:6px;border-radius:50%;background:#a47b3d}

.admin73Cms{display:grid;gap:16px}
.admin73Cms__head{padding:25px 27px;display:flex;align-items:flex-end;justify-content:space-between;gap:20px;border:1px solid rgba(218,151,65,.12);border-radius:16px;background:linear-gradient(145deg,#07182a,#04111e)}
.admin73Cms__head>div>span{color:#d9953d;font-size:9px;font-weight:800;letter-spacing:.15em}.admin73Cms__head h2{margin-top:7px;font:400 30px Georgia,"Times New Roman",serif;color:#f0ebe5}.admin73Cms__head p{max-width:650px;margin-top:8px;color:#7d8998;font-size:10px;line-height:1.6}
.admin73Cms__head>button{min-height:40px;padding:0 14px;border:1px solid rgba(218,151,65,.20);border-radius:8px;background:rgba(218,151,65,.04);color:#d9953d;cursor:pointer;font-size:8px}
.admin73Cms__form{display:grid;gap:13px}.admin73Cms__section{padding:24px;border:1px solid rgba(255,255,255,.065);border-radius:15px;background:linear-gradient(145deg,#07182a,#04111e)}
.admin73Cms__sectionTitle{display:flex;align-items:center;gap:13px;padding-bottom:18px;border-bottom:1px solid rgba(255,255,255,.055)}.admin73Cms__sectionTitle>span{width:37px;height:37px;display:grid;place-items:center;border:1px solid rgba(218,151,65,.23);border-radius:50%;color:#d9953d;font-size:8px}.admin73Cms__sectionTitle>div{display:flex;flex-direction:column;gap:4px}.admin73Cms__sectionTitle strong{color:#ece7e1;font:400 18px Georgia,"Times New Roman",serif}.admin73Cms__sectionTitle small{color:#687587;font-size:8px}
.admin73Cms__fields{margin-top:19px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:13px}.admin73Cms__fields label{display:flex;flex-direction:column;gap:7px}.admin73Cms__fields label>span{color:#7e8b9a;font-size:8px;font-weight:700;letter-spacing:.05em}.admin73Cms__fields input,.admin73Cms__fields textarea{width:100%;padding:12px 13px;border:1px solid rgba(255,255,255,.075);border-radius:9px;background:#03101d;color:#e8edf1;outline:none;font-size:10px;line-height:1.6}.admin73Cms__fields input{min-height:45px}.admin73Cms__fields input:focus,.admin73Cms__fields textarea:focus{border-color:rgba(218,151,65,.40)}.admin73Cms__full{grid-column:1/-1}
.admin73Cms__loading{min-height:180px;display:grid;place-items:center;border:1px dashed rgba(255,255,255,.08);border-radius:13px;color:#6f7d8d;font-size:10px}.admin73Cms__message{padding:12px 14px;border-radius:9px;font-size:9px}.admin73Cms__message.is-success{border:1px solid rgba(52,212,134,.18);background:rgba(52,212,134,.05);color:#72d79d}.admin73Cms__message.is-error{border:1px solid rgba(225,92,92,.18);background:rgba(225,92,92,.045);color:#d27f7f}
.admin73Cms__save{padding:19px 21px;display:flex;align-items:center;justify-content:space-between;gap:20px;border:1px solid rgba(218,151,65,.14);border-radius:13px;background:linear-gradient(90deg,rgba(218,151,65,.035),rgba(47,128,237,.025))}.admin73Cms__save>div{display:flex;flex-direction:column;gap:5px}.admin73Cms__save strong{color:#ece7e1;font:400 15px Georgia,"Times New Roman",serif}.admin73Cms__save span{color:#6e7b8b;font-size:8px}.admin73Cms__save button{min-height:43px;padding:0 16px;display:flex;align-items:center;gap:9px;border:1px solid rgba(218,151,65,.30);border-radius:8px;background:linear-gradient(135deg,#a85e20,#d8963f);color:#fff;cursor:pointer;font-size:8px;font-weight:800}
@media(max-width:760px){.svc73Grid{grid-template-columns:1fr}.svc73Card__details ul{grid-template-columns:1fr}.admin73Cms__head,.admin73Cms__save{align-items:flex-start;flex-direction:column}.admin73Cms__fields{grid-template-columns:1fr}.admin73Cms__full{grid-column:auto}.admin73Cms__save button{width:100%;justify-content:center}}

/* STEP 74 — YOUTUBE & SPOTIFY GERÇEK CMS */
.cnt74Loading,.cnt74Empty{min-height:170px;display:grid;place-items:center;border:1px dashed rgba(128,98,55,.18);border-radius:15px;background:rgba(255,253,249,.55);color:#777d83;font-size:11px}
.cnt74Channels{margin-top:30px;padding:20px 22px;display:flex;align-items:center;justify-content:space-between;gap:20px;border:1px solid rgba(128,98,55,.16);border-radius:18px;background:#ebe4da}
.cnt74Channels__copy{display:flex;align-items:center;gap:14px}.cnt74Channels__copy>div:last-child{display:flex;flex-direction:column;gap:5px}.cnt74Channels__copy strong{color:#25282d;font-size:13px}.cnt74Channels__copy p{color:#686f76;font-size:10.5px;line-height:1.55}
.cnt74Channels__buttons{display:flex;gap:9px;flex-wrap:wrap}.cnt74Channels__buttons a{min-height:42px;padding:0 14px;display:flex;align-items:center;border:1px solid rgba(155,116,56,.28);border-radius:8px;background:#fffaf4;color:#8e6932;font-size:9px;font-weight:800}.cnt74Channels__buttons a.is-spotify{border-color:rgba(47,111,75,.24);background:#edf5ef;color:#3e7554}

.admin74Media{display:grid;gap:15px}.admin74Media__head,.admin74Media__channels,.admin74Media__panel{border:1px solid rgba(255,255,255,.065);border-radius:15px;background:linear-gradient(145deg,#07182a,#04111e)}
.admin74Media__head{padding:25px 27px;display:flex;align-items:flex-end;justify-content:space-between;gap:20px}.admin74Media__head>div>span,.admin74Media__panelHead>span{color:#d9953d;font-size:9px;font-weight:800;letter-spacing:.14em}.admin74Media__head h2{margin-top:7px;color:#f0ebe5;font:400 30px Georgia,"Times New Roman",serif}.admin74Media__head p{max-width:650px;margin-top:8px;color:#7d8998;font-size:10px;line-height:1.6}.admin74Media__head>button{min-height:40px;padding:0 14px;border:1px solid rgba(218,151,65,.20);border-radius:8px;background:rgba(218,151,65,.04);color:#d9953d;cursor:pointer;font-size:8px}
.admin74Media__channels{padding:22px}.admin74Media__channelTitle{display:flex;align-items:center;gap:13px;padding-bottom:17px;border-bottom:1px solid rgba(255,255,255,.055)}.admin74Media__channelTitle>span{width:37px;height:37px;display:grid;place-items:center;border:1px solid rgba(218,151,65,.23);border-radius:50%;color:#d9953d;font-size:8px}.admin74Media__channelTitle>div{display:flex;flex-direction:column;gap:4px}.admin74Media__channelTitle strong{color:#ece7e1;font:400 18px Georgia,"Times New Roman",serif}.admin74Media__channelTitle small{color:#687587;font-size:8px}
.admin74Media__channelFields{margin-top:16px;display:grid;grid-template-columns:1fr 1fr;gap:12px}.admin74Media__channelFields label,.admin74Media__form label{display:flex;flex-direction:column;gap:7px}.admin74Media__channelFields span,.admin74Media__form label>span{color:#7e8b9a;font-size:8px;font-weight:700}.admin74Media__channelFields input,.admin74Media__form input,.admin74Media__form textarea,.admin74Media__form select{width:100%;padding:12px 13px;border:1px solid rgba(255,255,255,.075);border-radius:9px;background:#03101d;color:#e8edf1;outline:none;font-size:10px}.admin74Media__channelFields input,.admin74Media__form input,.admin74Media__form select{min-height:45px}.admin74Media__channelSave{min-height:40px;margin-top:13px;padding:0 14px;display:flex;align-items:center;gap:8px;border:1px solid rgba(218,151,65,.25);border-radius:8px;background:rgba(218,151,65,.055);color:#d9953d;cursor:pointer;font-size:8px;font-weight:800}
.admin74Media__grid{display:grid;grid-template-columns:.9fr 1.1fr;gap:15px}.admin74Media__panel{padding:22px}.admin74Media__panelHead{padding-bottom:17px;border-bottom:1px solid rgba(255,255,255,.055)}.admin74Media__panelHead h3{margin-top:6px;color:#ece7e1;font:400 20px Georgia,"Times New Roman",serif}
.admin74Media__form{margin-top:17px;display:grid;grid-template-columns:1fr 1fr;gap:12px}.admin74Media__full{grid-column:1/-1}.admin74Media__form>button{grid-column:1/-1;min-height:44px;padding:0 14px;display:flex;align-items:center;justify-content:center;gap:9px;border:1px solid rgba(218,151,65,.30);border-radius:8px;background:linear-gradient(135deg,#a85e20,#d8963f);color:#fff;cursor:pointer;font-size:8px;font-weight:800}
.admin74Media__list{margin-top:16px;display:grid;gap:8px}.admin74Media__item{padding:12px;display:grid;grid-template-columns:38px 1fr auto;gap:11px;align-items:center;border:1px solid rgba(255,255,255,.055);border-radius:10px;background:#03101d}.admin74Media__type{width:38px;height:38px;display:grid;place-items:center;border:1px solid rgba(218,151,65,.15);border-radius:9px;color:#d9953d}.admin74Media__itemCopy{min-width:0;display:flex;flex-direction:column;gap:4px}.admin74Media__itemCopy strong{color:#e7ebef;font-size:10px}.admin74Media__itemCopy span{color:#7d8998;font-size:8px}.admin74Media__itemCopy small{max-width:360px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#59687a;font-size:7px}
.admin74Media__itemActions{display:flex;align-items:center;gap:6px}.admin74Media__itemActions b{min-height:24px;padding:0 8px;display:flex;align-items:center;border-radius:999px;background:rgba(230,172,70,.06);color:#d9a64f;font-size:7px}.admin74Media__itemActions b.is-live{background:rgba(52,212,134,.055);color:#72d79d}.admin74Media__itemActions button{min-height:30px;padding:0 8px;border:1px solid rgba(255,255,255,.08);border-radius:7px;background:transparent;color:#8f9aa8;cursor:pointer;font-size:7px}.admin74Media__itemActions button.is-delete{border-color:rgba(225,92,92,.15);color:#d27f7f}.admin74Media__empty{min-height:170px;margin-top:16px;display:grid;place-items:center;border:1px dashed rgba(255,255,255,.08);border-radius:10px;color:#6f7d8d;font-size:9px}.admin74Media__message{padding:12px 14px;border-radius:9px;font-size:9px}.admin74Media__message.is-success{border:1px solid rgba(52,212,134,.18);background:rgba(52,212,134,.05);color:#72d79d}.admin74Media__message.is-error{border:1px solid rgba(225,92,92,.18);background:rgba(225,92,92,.045);color:#d27f7f}
@media(max-width:1000px){.admin74Media__grid{grid-template-columns:1fr}.cnt74Channels{align-items:flex-start;flex-direction:column}}
@media(max-width:700px){.admin74Media__head{align-items:flex-start;flex-direction:column}.admin74Media__channelFields,.admin74Media__form{grid-template-columns:1fr}.admin74Media__full{grid-column:auto}.admin74Media__item{grid-template-columns:38px 1fr}.admin74Media__itemActions{grid-column:1/-1;justify-content:flex-end}.cnt74Channels__buttons{width:100%}.cnt74Channels__buttons a{flex:1;justify-content:center}}

/* STEP 75 — SPOTIFY TARZI ÜST PODCAST ŞERİDİ */
.podcastTopStrip--spotify{
  min-height:44px!important;
  padding:0!important;
  display:grid!important;
  grid-template-columns:170px 1fr 180px!important;
  align-items:center!important;
  gap:0!important;
  position:relative!important;
  z-index:1200!important;
  overflow:hidden!important;
  background:linear-gradient(90deg,#13b957 0%,#19bd5b 48%,#15b557 100%)!important;
  color:#fff!important;
  border:0!important;
  box-shadow:
    inset 0 -1px 0 rgba(0,0,0,.11),
    0 2px 12px rgba(20,95,53,.08)!important;
  text-decoration:none!important;
}
.podcastTopStrip__brand{
  height:44px;
  padding:0 17px;
  display:flex;
  align-items:center;
  gap:9px;
  border-right:1px solid rgba(255,255,255,.22);
}
.podcastTopStrip__spotifyIcon{
  width:22px;
  height:22px;
  display:block;
  flex:0 0 22px;
  color:#fff;
}
.podcastTopStrip__spotifyIcon svg{
  width:100%;
  height:100%;
  display:block;
}
.podcastTopStrip__brand strong{
  color:#fff!important;
  font-size:10px!important;
  font-weight:900!important;
  line-height:1!important;
  letter-spacing:.06em!important;
}
.podcastTopStrip__center{
  min-width:0;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:8px;
  color:#fff!important;
  font-size:11px!important;
  font-weight:700!important;
  line-height:1.2;
}
.podcastTopStrip__mic{
  font-size:12px;
}
.podcastTopStrip__listen{
  justify-self:center;
  min-height:27px;
  padding:0 14px;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:7px;
  border-radius:999px;
  background:#f8fff9;
  color:#15964a!important;
  font-size:9px;
  font-weight:900;
  box-shadow:0 4px 12px rgba(0,0,0,.08);
  transition:transform .2s ease,box-shadow .2s ease;
}
.podcastTopStrip--spotify:hover .podcastTopStrip__listen{
  transform:translateY(-1px);
  box-shadow:0 6px 15px rgba(0,0,0,.12);
}
.podcastTopStrip__play{
  font-size:8px;
}
@media(max-width:760px){
  .podcastTopStrip--spotify{
    min-height:38px!important;
    grid-template-columns:auto 1fr auto!important;
  }
  .podcastTopStrip__brand{
    height:38px;
    padding:0 10px;
    gap:6px;
  }
  .podcastTopStrip__spotifyIcon{
    width:19px;
    height:19px;
    flex-basis:19px;
  }
  .podcastTopStrip__brand strong{
    font-size:8px!important;
  }
  .podcastTopStrip__center{
    padding:0 8px;
    font-size:9px!important;
  }
  .podcastTopStrip__center span:last-child{
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .podcastTopStrip__listen{
    margin-right:8px;
    min-height:25px;
    padding:0 10px;
    font-size:8px;
  }
}
@media(max-width:480px){
  .podcastTopStrip__center{
    justify-content:flex-start;
  }
  .podcastTopStrip__center span:last-child{
    max-width:135px;
  }
  .podcastTopStrip__listen{
    padding:0 8px;
  }
}

/* STEP 76 — RANDEVU FİLTRE + KALICI SİLME */
.admin76Filters{
  display:flex;
  flex-wrap:wrap;
  gap:8px;
}
.admin76Filters button{
  min-height:37px;
  padding:0 12px;
  display:flex;
  align-items:center;
  gap:8px;
  border:1px solid rgba(255,255,255,.07);
  border-radius:9px;
  background:#041321;
  color:#8794a3;
  cursor:pointer;
  font-size:8px;
  transition:border-color .2s ease,background .2s ease,color .2s ease;
}
.admin76Filters button b{
  min-width:22px;
  height:22px;
  padding:0 6px;
  display:grid;
  place-items:center;
  border-radius:999px;
  background:rgba(255,255,255,.05);
  color:#a9b3bd;
  font-size:7px;
}
.admin76Filters button.is-active{
  border-color:rgba(218,151,65,.28);
  background:rgba(218,151,65,.06);
  color:#d9953d;
}
.admin76Filters button.is-active b{
  background:rgba(218,151,65,.12);
  color:#e1ad65;
}
.admin70AppointmentCard__actions{
  flex-wrap:wrap;
}
.admin70AppointmentCard__actions .is-delete{
  border:1px solid rgba(225,92,92,.26);
  background:rgba(225,92,92,.08);
  color:#ef8e8e;
}
.admin70AppointmentCard__actions .is-delete:hover{
  background:rgba(225,92,92,.14);
}
@media(max-width:700px){
  .admin76Filters{
    display:grid;
    grid-template-columns:1fr 1fr;
  }
  .admin76Filters button{
    justify-content:space-between;
  }
  .admin70AppointmentCard__actions{
    grid-template-columns:1fr 1fr!important;
  }
  .admin70AppointmentCard__actions .is-delete{
    grid-column:1/-1;
  }
}

/* STEP 77 — ANA SAYFA PREMIUM HAREKET EFEKTLERİ */

/* Hero giriş animasyonları */
@keyframes homeHeroFadeUp {
  from { opacity:0; transform:translateY(24px); }
  to { opacity:1; transform:translateY(0); }
}
@keyframes homeHeroFadeIn {
  from { opacity:0; }
  to { opacity:1; }
}
@keyframes homeHeroSlowZoom {
  from { transform:scale(1.02); }
  to { transform:scale(1.07); }
}
@keyframes homeTrustRise {
  from { opacity:0; transform:translateY(18px); }
  to { opacity:1; transform:translateY(0); }
}

/* Sağdaki hero görseline çok yavaş sinematik hareket */
.lightHomeHero__visual img{
  animation:homeHeroSlowZoom 18s ease-in-out infinite alternate;
  transform-origin:center center;
  will-change:transform;
}

/* Hero metinleri sırayla gelsin */
.lightHomeHero__eyebrow{
  opacity:0;
  animation:homeHeroFadeUp .7s cubic-bezier(.22,.61,.36,1) .08s forwards;
}
.lightHomeHero h1{
  opacity:0;
  animation:homeHeroFadeUp .85s cubic-bezier(.22,.61,.36,1) .18s forwards;
}
.lightHomeHero__content>p{
  opacity:0;
  animation:homeHeroFadeUp .82s cubic-bezier(.22,.61,.36,1) .34s forwards;
}
.lightHomeHero__actions{
  opacity:0;
  animation:homeHeroFadeUp .78s cubic-bezier(.22,.61,.36,1) .48s forwards;
}
.lightHomeHero__trust{
  opacity:0;
  animation:homeTrustRise .85s cubic-bezier(.22,.61,.36,1) .62s forwards;
}

/* Butonları daha canlı ama sakin yap */
.lightHomeHero__primary,
.lightHomeHero__secondary{
  position:relative;
  overflow:hidden;
  transition:
    transform .28s ease,
    box-shadow .28s ease,
    border-color .28s ease;
}
.lightHomeHero__primary:before,
.lightHomeHero__secondary:before{
  content:"";
  position:absolute;
  top:0;
  left:-120%;
  width:70%;
  height:100%;
  background:linear-gradient(
    110deg,
    transparent,
    rgba(255,255,255,.26),
    transparent
  );
  transform:skewX(-18deg);
  transition:left .75s ease;
  pointer-events:none;
}
.lightHomeHero__primary:hover:before,
.lightHomeHero__secondary:hover:before{
  left:150%;
}
.lightHomeHero__primary:hover,
.lightHomeHero__secondary:hover{
  transform:translateY(-3px);
}
.lightHomeHero__primary:hover{
  box-shadow:0 18px 38px rgba(132,97,43,.22);
}

/* Çalışma alanı kartları */
.homeServiceFeature{
  transform:translateY(0);
  transition:
    transform .32s cubic-bezier(.22,.61,.36,1),
    box-shadow .32s ease,
    border-color .32s ease;
}
.homeServiceFeature:hover{
  transform:translateY(-7px) scale(1.01);
}
.homeServiceFeature__icon{
  transition:
    transform .32s ease,
    background .32s ease;
}
.homeServiceFeature:hover .homeServiceFeature__icon{
  transform:translateY(-2px) rotate(-3deg) scale(1.05);
}
.homeServiceFeature:after{
  transform:scaleX(.30);
  transform-origin:left center;
  transition:transform .38s ease;
}
.homeServiceFeature:hover:after{
  transform:scaleX(1);
}

/* Hizmet kartlarının link oku mikro hareket */
.homeServiceFeature a svg,
.homeServicesShowcase__all svg,
.homeTrustStatement a svg{
  transition:transform .25s ease;
}
.homeServiceFeature a:hover svg,
.homeServicesShowcase__all:hover svg,
.homeTrustStatement a:hover svg{
  transform:translateX(4px);
}

/* Güven / yaklaşım bölümü */
.homeTrustStatement__inner{
  transition:
    transform .35s ease,
    box-shadow .35s ease,
    border-color .35s ease;
}
.homeTrustStatement__inner:hover{
  transform:translateY(-4px);
  border-color:rgba(155,116,56,.23);
  box-shadow:0 30px 76px rgba(84,64,39,.10);
}

/* İletişim kartları */
.contactCard{
  transition:
    transform .3s ease,
    box-shadow .3s ease,
    border-color .3s ease;
}
.contactCard:hover{
  transform:translateY(-6px);
}

/* Scroll ile zaten reveal sınıfı olan bölümlerde daha akıcı görünüm */
.reveal{
  transition:
    opacity .8s cubic-bezier(.22,.61,.36,1),
    transform .8s cubic-bezier(.22,.61,.36,1)!important;
}

/* Erişilebilirlik: kullanıcı animasyonu azaltmak isterse kapat */
@media (prefers-reduced-motion: reduce){
  .lightHomeHero__visual img,
  .lightHomeHero__eyebrow,
  .lightHomeHero h1,
  .lightHomeHero__content>p,
  .lightHomeHero__actions,
  .lightHomeHero__trust{
    animation:none!important;
    opacity:1!important;
    transform:none!important;
  }
  .homeServiceFeature,
  .contactCard,
  .homeTrustStatement__inner,
  .reveal{
    transition:none!important;
  }
}

/* Mobilde efektleri daha sakin tut */
@media(max-width:760px){
  .lightHomeHero__visual img{
    animation-duration:24s;
  }
  .homeServiceFeature:hover,
  .contactCard:hover,
  .homeTrustStatement__inner:hover{
    transform:none;
  }
}

/* STEP 78 — İÇERİK DÜZELTMELERİ + HEADER HİYERARŞİSİ */
.brandIdentity small{
  order:1!important;
  margin:0 0 3px!important;
  color:#6f6b64!important;
  font-size:8px!important;
  font-weight:800!important;
  letter-spacing:.13em!important;
}
.brandIdentity em{
  order:2!important;
  margin:0 0 5px!important;
  color:#9b7438!important;
  font-size:9px!important;
  font-style:normal!important;
  font-weight:800!important;
  letter-spacing:.12em!important;
}
.brandIdentity strong{
  order:3!important;
  color:#1f2328!important;
  font:600 18px/1.05 Georgia,"Times New Roman",serif!important;
  letter-spacing:.02em!important;
}

/* Danışmanlığın Odağı: koyu premium zemin + beyaz okunaklı metin */
.homeServicesShowcase__footer{
  background:
    radial-gradient(circle at 14% 25%,rgba(194,151,82,.16),transparent 28%),
    linear-gradient(135deg,#20252a,#11171c)!important;
  border-color:rgba(196,151,80,.22)!important;
  color:#fff!important;
}
.homeServicesShowcase__benefit{
  color:#fff!important;
}
.homeServicesShowcase__benefit span{
  color:#d7a85d!important;
}
.homeServicesShowcase__benefit h3,
.homeServicesShowcase__benefit strong{
  color:#fff!important;
}
.homeServicesShowcase__benefit p{
  color:#eef1f2!important;
  font-size:12px!important;
  line-height:1.75!important;
}
.homeServicesShowcase__benefitIcon{
  color:#e0b56e!important;
  border-color:rgba(224,181,110,.35)!important;
  background:rgba(255,255,255,.035)!important;
}
.homeServicesShowcase__all{
  color:#e3b66e!important;
  border-color:rgba(227,182,110,.35)!important;
}
.homeServicesShowcase__all span,
.homeServicesShowcase__all strong{
  color:#fff!important;
}

/* Yeni uzun yaklaşım metninin okunabilirliği */
.homeTrustStatement p{
  max-width:900px!important;
  font-size:14px!important;
  line-height:1.82!important;
}

/* Kapsam şeridi */
.homeScopeStrip p{
  color:#3f454b!important;
  font-size:11.5px!important;
  line-height:1.65!important;
}

@media(max-width:760px){
  .brandIdentity small{font-size:6.5px!important}
  .brandIdentity em{font-size:7px!important}
  .brandIdentity strong{font-size:14px!important}
  .homeServicesShowcase__benefit p{font-size:11px!important}
  .homeTrustStatement p{font-size:12.5px!important}
}

/* STEP 79 — PERFORMANS / MOBİL AÇILIŞ OPTİMİZASYONU */

/* Tarayıcı ekran dışında kalan ağır bölümleri ilk açılışta çizmek zorunda kalmaz. */
.homeServicesShowcase,
.homeTrustStatement,
.homeTestimonials,
.homeContact,
.lightHomeContact,
.svc52Quick,
.svc52Trust,
.cnt57Body,
.processPage,
.aboutPage{
  content-visibility:auto;
  contain-intrinsic-size:1px 700px;
}

/* Görsel çizimini daha stabil ve GPU dostu tut. */
img{
  max-width:100%;
}
.lightHomeHero__visual,
.lightHomeHero__visual img{
  backface-visibility:hidden;
}

/* Masaüstünde premium animasyon korunur; telefonda LCP ve GPU yükünü azalt. */
@media(max-width:760px){
  .lightHomeHero__visual img{
    animation:none!important;
    transform:none!important;
  }

  .lightHomeHero__primary:before,
  .lightHomeHero__secondary:before{
    display:none!important;
  }

  .homeServiceFeature,
  .contactCard,
  .homeTrustStatement__inner{
    will-change:auto!important;
  }
}

/* Arka plandaki sekmede gereksiz animasyon tüketimini durdurmaya yardımcı olur. */
@media(prefers-reduced-motion:reduce){
  *,
  *::before,
  *::after{
    scroll-behavior:auto!important;
    animation-duration:.01ms!important;
    animation-iteration-count:1!important;
    transition-duration:.01ms!important;
  }
}

/* STEP 80 — AYRI İLETİŞİM SAYFASI */
.contact80Page{
  min-height:100vh;
  color:#202329;
  background:
    radial-gradient(circle at 84% 8%,rgba(155,116,56,.085),transparent 24%),
    linear-gradient(180deg,#f7f4ef,#eee7dd);
}
.contact80Hero{
  position:relative;
  min-height:430px;
  padding:78px 7% 70px;
  display:grid;
  grid-template-columns:1.1fr .9fr;
  gap:50px;
  align-items:center;
  overflow:hidden;
  border-bottom:1px solid rgba(128,98,55,.15);
}
.contact80Hero:before{
  content:"";
  position:absolute;
  width:520px;
  height:520px;
  right:-220px;
  top:-170px;
  border:1px solid rgba(155,116,56,.10);
  border-radius:50%;
  box-shadow:
    0 0 0 45px rgba(155,116,56,.025),
    0 0 0 95px rgba(155,116,56,.018);
  pointer-events:none;
}
.contact80Back{
  position:absolute;
  left:7%;
  top:24px;
  display:flex;
  align-items:center;
  gap:8px;
  color:#6d747a;
  font-size:10px;
  font-weight:700;
}
.contact80Back span{
  color:#9b7438;
}
.contact80Hero__copy{
  position:relative;
  z-index:1;
}
.contact80Hero__copy>span,
.contact80Intro>span,
.contact80Appointment>div>span{
  color:#9b7438;
  font-size:10px;
  font-weight:800;
  letter-spacing:.17em;
}
.contact80Hero__copy h1{
  margin:11px 0 18px;
  color:#202329;
  font:400 clamp(54px,6vw,84px)/.96 Georgia,"Times New Roman",serif;
  letter-spacing:-.04em;
}
.contact80Hero__copy h1 strong{
  display:block;
  color:#9b7438;
  font-weight:400;
}
.contact80Hero__copy p{
  max-width:620px;
  color:#575e65;
  font-size:15px;
  line-height:1.78;
}
.contact80Hero__mark{
  position:relative;
  z-index:1;
  justify-self:end;
  width:min(390px,100%);
  padding:28px;
  display:flex;
  align-items:center;
  gap:18px;
  border:1px solid rgba(128,98,55,.15);
  border-radius:22px;
  background:rgba(255,253,249,.74);
  box-shadow:0 24px 62px rgba(84,64,39,.08);
}
.contact80Hero__mark>div:last-child{
  display:flex;
  flex-direction:column;
  gap:5px;
}
.contact80Hero__mark small{
  color:#6f6b64;
  font-size:8px;
  font-weight:800;
  letter-spacing:.12em;
}
.contact80Hero__mark span{
  color:#9b7438;
  font-size:9px;
  font-weight:800;
  letter-spacing:.10em;
}
.contact80Hero__mark strong{
  color:#24272b;
  font:600 22px Georgia,"Times New Roman",serif;
}
.contact80Body{
  padding:78px 7% 90px;
}
.contact80Intro{
  max-width:850px;
  margin:0 auto 34px;
  text-align:center;
}
.contact80Intro h2{
  margin:10px 0 13px;
  color:#24272b;
  font:400 clamp(34px,4vw,52px)/1.04 Georgia,"Times New Roman",serif;
}
.contact80Intro p{
  color:#666d73;
  font-size:12px;
  line-height:1.75;
}
.contact80Grid{
  max-width:1100px;
  margin:0 auto;
  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  gap:16px;
}
.contact80Card{
  min-height:280px;
  padding:27px;
  display:flex;
  flex-direction:column;
  align-items:flex-start;
  border:1px solid rgba(128,98,55,.16);
  border-radius:21px;
  background:
    radial-gradient(circle at 92% 0,rgba(155,116,56,.07),transparent 25%),
    #fffdf9;
  box-shadow:0 18px 45px rgba(84,64,39,.06);
  transition:transform .28s ease,border-color .28s ease,box-shadow .28s ease;
}
.contact80Card:hover{
  transform:translateY(-6px);
  border-color:rgba(155,116,56,.34);
  box-shadow:0 28px 58px rgba(84,64,39,.10);
}
.contact80Card__icon{
  width:55px;
  height:55px;
  display:grid;
  place-items:center;
  border:1px solid rgba(155,116,56,.22);
  border-radius:15px;
  background:#f2e8d9;
  color:#9b7438;
}
.contact80Card>span{
  margin-top:22px;
  color:#9b7438;
  font-size:9px;
  font-weight:800;
  letter-spacing:.13em;
}
.contact80Card>strong{
  margin-top:7px;
  color:#25282d;
  font:400 24px/1.22 Georgia,"Times New Roman",serif;
  overflow-wrap:anywhere;
}
.contact80Card>p{
  margin-top:12px;
  color:#686f76;
  font-size:11.5px;
  line-height:1.7;
}
.contact80Card>b{
  margin-top:auto;
  padding-top:21px;
  display:flex;
  align-items:center;
  gap:9px;
  color:#9b7438;
  font-size:9px;
  font-weight:800;
}
.contact80Appointment{
  max-width:1100px;
  margin:18px auto 0;
  padding:24px 25px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:30px;
  border:1px solid rgba(128,98,55,.15);
  border-radius:18px;
  background:linear-gradient(90deg,#e9dfd2,#f8f3ec);
}
.contact80Appointment h3{
  margin-top:6px;
  color:#25282d;
  font:400 22px Georgia,"Times New Roman",serif;
}
.contact80Appointment p{
  max-width:690px;
  margin-top:7px;
  color:#686f76;
  font-size:10.5px;
  line-height:1.6;
}
.contact80Appointment>a{
  min-height:48px;
  padding:0 17px;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:10px;
  flex-shrink:0;
  border:1px solid #987038;
  border-radius:9px;
  background:linear-gradient(135deg,#a57c3d,#8e682f);
  color:#fff;
  font-size:9px;
  font-weight:800;
  box-shadow:0 12px 28px rgba(128,92,38,.12);
}
@media(max-width:850px){
  .contact80Hero{
    grid-template-columns:1fr;
    padding-top:90px;
  }
  .contact80Hero__mark{
    justify-self:start;
  }
}
@media(max-width:650px){
  .contact80Hero{
    padding:82px 18px 52px;
  }
  .contact80Back{
    left:18px;
  }
  .contact80Hero__copy h1{
    font-size:52px;
  }
  .contact80Hero__copy p{
    font-size:13px;
  }
  .contact80Hero__mark{
    width:100%;
    padding:20px;
  }
  .contact80Body{
    padding:58px 18px 70px;
  }
  .contact80Grid{
    grid-template-columns:1fr;
  }
  .contact80Card{
    min-height:245px;
    padding:22px;
  }
  .contact80Card>strong{
    font-size:20px;
  }
  .contact80Appointment{
    align-items:flex-start;
    flex-direction:column;
  }
  .contact80Appointment>a{
    width:100%;
  }
}

/* STEP 81 — SÜREÇ CMS */
.admin81Process__stack{display:grid;gap:12px}
.admin81Process__item{padding:16px;border:1px solid rgba(255,255,255,.07);border-radius:12px;background:#061522;display:grid;gap:10px}
.admin81Process__item>b{color:#d69a4c;font-size:8px;letter-spacing:.13em}
.admin81Process__item input,.admin81Process__item textarea{width:100%;border:1px solid rgba(255,255,255,.08);border-radius:8px;background:#03101b;color:#dce3e8;padding:11px 12px;outline:none;font:inherit}
.admin81Process__item textarea{resize:vertical;line-height:1.6}
.admin81Process__row{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.admin81Process__testimonialHead,.admin81Process__itemTop{display:flex;align-items:center;justify-content:space-between;gap:12px}
.admin81Process__testimonialHead{margin:20px 0 10px;color:#dce3e8}
.admin81Process__testimonialHead button{border:1px solid rgba(214,154,76,.25);border-radius:8px;background:rgba(214,154,76,.08);color:#d69a4c;padding:9px 12px;cursor:pointer}
.admin81Process__itemTop button{border:1px solid rgba(225,92,92,.25);border-radius:7px;background:rgba(225,92,92,.08);color:#ef8e8e;padding:7px 10px;cursor:pointer}
@media(max-width:700px){.admin81Process__row{grid-template-columns:1fr}}

/* STEP 82 — İÇERİKLER + HİZMETLER GÖRSEL FIX */

/* Performans optimizasyonundaki content-visibility,
   gövdeden yukarı taşan sekmeleri kırpıyordu. İçerikler sayfasında kapatıyoruz. */
.cnt57Body{
  content-visibility:visible!important;
  contain:none!important;
  overflow:visible!important;
}

/* Video sayısı 1-2 olduğunda kartın ekranın dörtte biri kadar garip kalmasını engeller.
   Çok video varsa da düzenli kart genişliğiyle devam eder. */
.cnt57VideoGrid{
  grid-template-columns:repeat(auto-fill,minmax(285px,340px))!important;
  justify-content:start!important;
  align-items:stretch!important;
  gap:18px!important;
}
.cnt57VideoCard{
  width:100%!important;
  min-width:0!important;
}
.cnt57VideoCard__thumb{
  height:auto!important;
  aspect-ratio:16/9!important;
}

/* Video / Podcast sekmesi hero ile gövde arasında tam görünsün. */
.cnt57Tabs{
  overflow:hidden!important;
  z-index:20!important;
  top:-27px!important;
}
.cnt57Section{
  padding-top:25px!important;
}

/* Hizmetler sayfasında artık tek bir "Gizlilik ve etik yaklaşım" satırı var.
   Eski 4 kolon CSS'i yazıyı ilk çeyreğe sıkıştırıyordu. */
.svc52Trust{
  width:calc(100% - 7.2%)!important;
  max-width:1240px!important;
  margin:20px auto 36px!important;
  padding:22px 28px!important;
  display:block!important;
  grid-template-columns:none!important;
}
.svc52Trust>div{
  width:100%!important;
  padding:0!important;
  display:grid!important;
  grid-template-columns:48px 1fr!important;
  align-items:center!important;
  gap:17px!important;
  border-right:0!important;
}
.svc52Trust>div>svg,
.svc52Trust>div>div:first-child{
  flex:0 0 auto;
}
.svc52Trust p{
  width:100%!important;
  gap:6px!important;
}
.svc52Trust strong{
  font-size:13px!important;
  line-height:1.35!important;
}
.svc52Trust span{
  max-width:900px!important;
  font-size:11px!important;
  line-height:1.65!important;
}

/* Açık temada barın daha okunaklı ve dengeli görünmesi */
.svc52Trust{
  border-color:rgba(155,116,56,.20)!important;
  background:linear-gradient(90deg,#ebe3d8,#f1ebe3)!important;
  box-shadow:0 14px 34px rgba(84,64,39,.06)!important;
}
.svc52Trust>div{
  color:#a27839!important;
}
.svc52Trust strong{
  color:#292c30!important;
}
.svc52Trust span{
  color:#626970!important;
}

@media(max-width:760px){
  .cnt57VideoGrid{
    grid-template-columns:1fr!important;
  }
  .svc52Trust{
    width:calc(100% - 36px)!important;
    padding:19px!important;
  }
  .svc52Trust>div{
    grid-template-columns:38px 1fr!important;
    gap:13px!important;
  }
  .svc52Trust strong{
    font-size:12px!important;
  }
  .svc52Trust span{
    font-size:10.5px!important;
  }
}

/* STEP 83 — HOME RETURN FIX + CB LABS CREDIT */
.premiumFooter__copyright{display:flex;flex-direction:column;gap:7px}
.premiumFooter__creator{display:flex;align-items:center;flex-wrap:wrap;gap:7px;color:rgba(230,234,239,.48);font-size:9px;letter-spacing:.045em}
.premiumFooter__creator strong{color:#c59a58;font-weight:700;letter-spacing:.06em}
.premiumFooter__creator i{color:rgba(197,154,88,.55);font-style:normal}
@media(max-width:760px){.premiumFooter__creator{justify-content:center;font-size:8.5px}}

/* STEP 85 — AUTO HERO TEXT ROTATOR */
.lightHomeHero__rotator{
  will-change:transform,opacity,filter;
  animation:homeHeroTextIn .78s cubic-bezier(.16,.8,.2,1) both;
}
.lightHomeHero__rotator .lightHomeHero__eyebrow{
  animation:homeHeroEyebrowIn .68s .04s cubic-bezier(.16,.8,.2,1) both;
}
.lightHomeHero__rotator h1{
  animation:homeHeroTitleIn .76s .10s cubic-bezier(.16,.8,.2,1) both;
}
.lightHomeHero__rotator h1 strong{
  animation:homeHeroAccentIn .82s .18s cubic-bezier(.16,.8,.2,1) both;
}
.lightHomeHero__rotator>p{
  animation:homeHeroDescriptionIn .72s .27s cubic-bezier(.16,.8,.2,1) both;
}
@keyframes homeHeroTextIn{
  from{opacity:.15}
  to{opacity:1}
}
@keyframes homeHeroEyebrowIn{
  from{opacity:0;transform:translateY(8px)}
  to{opacity:1;transform:none}
}
@keyframes homeHeroTitleIn{
  from{opacity:0;transform:translateY(22px);filter:blur(4px)}
  to{opacity:1;transform:none;filter:none}
}
@keyframes homeHeroAccentIn{
  from{opacity:0;transform:translateY(14px)}
  to{opacity:1;transform:none}
}
@keyframes homeHeroDescriptionIn{
  from{opacity:0;transform:translateY(12px)}
  to{opacity:1;transform:none}
}
@media (prefers-reduced-motion:reduce){
  .lightHomeHero__rotator,
  .lightHomeHero__rotator .lightHomeHero__eyebrow,
  .lightHomeHero__rotator h1,
  .lightHomeHero__rotator h1 strong,
  .lightHomeHero__rotator>p{
    animation:none!important;
  }
}

/* STEP 87 — HERO TEXT SPACING FIX */
.lightHomeHero__content{
  display:flex!important;
  flex-direction:column!important;
  justify-content:center!important;
}

.lightHomeHero__rotator{
  display:flex!important;
  flex-direction:column!important;
  align-items:flex-start!important;
  min-height:350px!important;
}

.lightHomeHero__rotator .lightHomeHero__eyebrow{
  margin-bottom:18px!important;
}

.lightHomeHero__rotator h1{
  margin:0!important;
  display:flex!important;
  flex-direction:column!important;
  gap:2px!important;
  line-height:.98!important;
}

.lightHomeHero__rotator h1 strong{
  display:block!important;
  margin-top:4px!important;
  line-height:.96!important;
}

.lightHomeHero__rotator>p{
  margin-top:30px!important;
  max-width:610px!important;
  line-height:1.72!important;
}

.lightHomeHero__actions{
  margin-top:28px!important;
}

/* Uzun gold başlıklar açıklamaya yaklaşmasın */
.lightHomeHero__rotator h1 + p{
  padding-top:2px!important;
}

/* Her slaytta sabit görsel hiyerarşi */
@media(min-width:761px){
  .lightHomeHero__rotator h1{
    min-height:205px!important;
    justify-content:flex-start!important;
  }
  .lightHomeHero__rotator>p{
    min-height:52px!important;
  }
}

@media(max-width:760px){
  .lightHomeHero__rotator{
    min-height:auto!important;
  }
  .lightHomeHero__rotator .lightHomeHero__eyebrow{
    margin-bottom:12px!important;
  }
  .lightHomeHero__rotator h1{
    gap:0!important;
    line-height:1!important;
  }
  .lightHomeHero__rotator h1 strong{
    margin-top:3px!important;
    line-height:.98!important;
  }
  .lightHomeHero__rotator>p{
    margin-top:22px!important;
    line-height:1.65!important;
  }
  .lightHomeHero__actions{
    margin-top:23px!important;
  }
}

/* STEP 89 — PREMIUM GLOBAL MOTION + HERO 3D + PROCESS TIMELINE */

/* Smooth route entrance */
.pageShell main{
  animation:premiumPageEnter .62s cubic-bezier(.16,.8,.2,1) both;
}
@keyframes premiumPageEnter{
  from{opacity:0;transform:translateY(10px);filter:blur(4px)}
  to{opacity:1;transform:none;filter:none}
}

/* Global scroll reveal system */
.motionReveal{
  opacity:0;
  transform:translateY(28px) scale(.992);
  filter:blur(6px);
  transition:
    opacity .78s cubic-bezier(.16,.8,.2,1) var(--motion-delay,0ms),
    transform .78s cubic-bezier(.16,.8,.2,1) var(--motion-delay,0ms),
    filter .72s ease var(--motion-delay,0ms);
  will-change:opacity,transform,filter;
}
.motionReveal.is-visible{
  opacity:1;
  transform:none;
  filter:none;
}

/* Home hero — subtle mouse parallax */
.lightHomeHero{
  --hero-x:0;
  --hero-y:0;
  perspective:1400px;
}
.lightHomeHero__visual{
  transform:
    translate3d(
      calc(var(--hero-x) * -7px),
      calc(var(--hero-y) * -5px),
      0
    )
    scale(1.018);
  transition:transform .28s cubic-bezier(.2,.7,.2,1);
  will-change:transform;
}
.lightHomeHero__visual img{
  transform:
    translate3d(
      calc(var(--hero-x) * 11px),
      calc(var(--hero-y) * 8px),
      0
    )
    scale(1.035);
  transition:transform .32s cubic-bezier(.2,.7,.2,1);
  will-change:transform;
}
.lightHomeHero__visualShade{
  transform:translate3d(calc(var(--hero-x) * -3px),0,0);
  transition:transform .32s cubic-bezier(.2,.7,.2,1);
}
.lightHomeHero__content{
  transform:
    translate3d(
      calc(var(--hero-x) * 2px),
      calc(var(--hero-y) * 1.5px),
      0
    );
  transition:transform .34s cubic-bezier(.2,.7,.2,1);
}
.lightHomeHero__trust{
  transform:
    translate3d(
      calc(var(--hero-x) * 3px),
      calc(var(--hero-y) * 2px),
      0
    );
  transition:transform .36s cubic-bezier(.2,.7,.2,1),box-shadow .3s ease;
}
.lightHomeHero__rotator h1{
  overflow:visible;
}
.lightHomeHero__rotator h1 strong{
  transform-origin:left center;
}

/* Process timeline — scroll controlled gold progress */
.prc53Steps{
  --timeline-progress:0;
}
.prc53TimelineTrack{
  position:absolute;
  z-index:-1;
  left:7%;
  right:7%;
  top:54px;
  height:2px;
  overflow:hidden;
  border-radius:999px;
  background:rgba(218,151,65,.14);
  pointer-events:none;
}
.prc53TimelineTrack span{
  display:block;
  width:100%;
  height:100%;
  transform:scaleX(var(--timeline-progress));
  transform-origin:left center;
  background:linear-gradient(90deg,#a87335,#e0a654,#f0c47a);
  box-shadow:0 0 16px rgba(218,151,65,.38);
  transition:transform .14s linear;
}
.prc53Steps:before{opacity:.22}
.prc53Step{
  transition:
    transform .42s cubic-bezier(.16,.8,.2,1),
    border-color .42s ease,
    box-shadow .42s ease,
    opacity .42s ease;
}
.prc53Step.is-timeline-active{
  border-color:rgba(224,166,84,.86);
  box-shadow:0 22px 58px rgba(0,0,0,.25),0 0 0 1px rgba(218,151,65,.06);
}
.prc53Step.is-timeline-active .prc53Step__number{
  color:#fff4e4;
  border-color:#e0a654;
  background:linear-gradient(135deg,#9b6b31,#d99a4a);
  box-shadow:0 0 22px rgba(218,151,65,.22);
}
.prc53Step.is-timeline-active .prc53Step__icon{
  color:#e6ad61;
  transform:translateY(-2px) scale(1.04);
}
.prc53Step__number,
.prc53Step__icon{
  transition:transform .38s ease,color .38s ease,background .38s ease,border-color .38s ease,box-shadow .38s ease;
}

/* Desktop hover polish */
@media (hover:hover) and (pointer:fine){
  .svc73Card,
  .contact80Card,
  .homeServiceFeature,
  .prc53TestimonialCard{
    transition:transform .35s cubic-bezier(.16,.8,.2,1),box-shadow .35s ease,border-color .35s ease;
  }
  .svc73Card:hover,
  .contact80Card:hover,
  .homeServiceFeature:hover,
  .prc53TestimonialCard:hover{
    transform:translateY(-5px);
  }
}

/* Mobile: motion stays elegant and lightweight */
@media(max-width:760px){
  .pageShell main{animation-duration:.45s}
  .motionReveal{
    transform:translateY(18px);
    filter:blur(3px);
    transition-duration:.62s;
  }
  .lightHomeHero__visual,
  .lightHomeHero__visual img,
  .lightHomeHero__visualShade,
  .lightHomeHero__content,
  .lightHomeHero__trust{
    transform:none!important;
  }
  .prc53TimelineTrack{
    left:30px;
    right:auto;
    top:0;
    bottom:0;
    width:2px;
    height:auto;
  }
  .prc53TimelineTrack span{
    width:100%;
    height:100%;
    transform:scaleY(var(--timeline-progress));
    transform-origin:center top;
  }
}

/* Accessibility + battery friendly fallback */
@media(prefers-reduced-motion:reduce){
  html{scroll-behavior:auto}
  .pageShell main,
  .motionReveal,
  .lightHomeHero__visual,
  .lightHomeHero__visual img,
  .lightHomeHero__visualShade,
  .lightHomeHero__content,
  .lightHomeHero__trust,
  .prc53TimelineTrack span,
  .prc53Step,
  .prc53Step__number,
  .prc53Step__icon{
    animation:none!important;
    transition:none!important;
    transform:none!important;
    filter:none!important;
  }
  .motionReveal{opacity:1!important}
}

/* STEP 90 — HERO 3D MOTION SOFTENING */
/* Sağ görsel artık çok hafif hareket eder; sol içerik ve alt kartlar sabit kalır. */
.lightHomeHero__visual{
  transform:
    translate3d(
      calc(var(--hero-x) * -2.2px),
      calc(var(--hero-y) * -1.6px),
      0
    )
    scale(1.008)!important;
  transition:transform .48s cubic-bezier(.2,.7,.2,1)!important;
}

.lightHomeHero__visual img{
  transform:
    translate3d(
      calc(var(--hero-x) * 2.8px),
      calc(var(--hero-y) * 2px),
      0
    )
    scale(1.012)!important;
  transition:transform .52s cubic-bezier(.2,.7,.2,1)!important;
}

.lightHomeHero__visualShade{
  transform:none!important;
  transition:none!important;
}

.lightHomeHero__content{
  transform:none!important;
  transition:none!important;
}

.lightHomeHero__trust{
  transform:none!important;
  transition:box-shadow .3s ease!important;
}

@media(max-width:760px){
  .lightHomeHero__visual,
  .lightHomeHero__visual img{
    transform:none!important;
  }
}

/* STEP 91 — PREMIUM FOOTER REDESIGN */
.premiumFooter{
  position:relative;
  overflow:hidden;
  margin-top:0!important;
  padding:0!important;
  border-top:1px solid rgba(164,118,57,.12)!important;
  background:
    radial-gradient(circle at 14% 18%, rgba(188,145,83,.10), transparent 30%),
    linear-gradient(180deg,#f5efe7 0%,#eee5d8 100%)!important;
  color:#24282d!important;
}

.premiumFooter:before{
  content:"";
  position:absolute;
  inset:0;
  pointer-events:none;
  background:
    linear-gradient(90deg,transparent,rgba(255,255,255,.45),transparent);
  opacity:.22;
}

.premiumFooter__top{
  position:relative;
  z-index:1;
  width:min(1380px,calc(100% - 64px))!important;
  margin:0 auto!important;
  padding:54px 0 42px!important;
  display:grid!important;
  grid-template-columns:1.25fr .72fr 1fr!important;
  grid-template-areas:
    "brand nav contact"
    "cta cta cta"!important;
  align-items:start!important;
  gap:42px 58px!important;
}

.premiumFooter__brand{
  grid-area:brand!important;
  display:flex!important;
  align-items:center!important;
  gap:16px!important;
  text-decoration:none!important;
  color:inherit!important;
  min-width:0!important;
}

.premiumFooter__brand .brandEmblemWrap{
  width:58px!important;
  height:58px!important;
  flex:0 0 58px!important;
  display:grid!important;
  place-items:center!important;
  border:1px solid rgba(162,116,55,.18)!important;
  border-radius:18px!important;
  background:rgba(255,255,255,.54)!important;
  box-shadow:0 14px 34px rgba(90,63,31,.07)!important;
}

.premiumFooter__brand .brandEmblem{
  width:40px!important;
  height:40px!important;
  object-fit:contain!important;
}

.premiumFooter__brand>span:last-child{
  display:flex!important;
  flex-direction:column!important;
  gap:6px!important;
}

.premiumFooter__brand strong{
  font-family:Georgia,"Times New Roman",serif!important;
  font-size:23px!important;
  letter-spacing:.01em!important;
  color:#22262b!important;
  line-height:1!important;
}

.premiumFooter__brand small{
  font-size:10px!important;
  letter-spacing:.12em!important;
  color:#7c8085!important;
  line-height:1.5!important;
}

.premiumFooter__nav{
  grid-area:nav!important;
  display:grid!important;
  grid-template-columns:1fr!important;
  gap:12px!important;
  align-content:start!important;
}

.premiumFooter__nav:before{
  content:"MENÜ";
  display:block;
  margin-bottom:4px;
  font-size:9px;
  font-weight:800;
  letter-spacing:.18em;
  color:#a77736;
}

.premiumFooter__nav a{
  width:max-content!important;
  color:#62676c!important;
  font-size:11px!important;
  line-height:1.35!important;
  text-decoration:none!important;
  transition:color .22s ease,transform .22s ease!important;
}

.premiumFooter__nav a:hover{
  color:#9e7136!important;
  transform:translateX(3px)!important;
}

.premiumFooter__contact{
  grid-area:contact!important;
  display:grid!important;
  gap:14px!important;
}

.premiumFooter__contact:before{
  content:"İLETİŞİM";
  display:block;
  margin-bottom:0;
  font-size:9px;
  font-weight:800;
  letter-spacing:.18em;
  color:#a77736;
}

.premiumFooter__contact a{
  display:grid!important;
  grid-template-columns:72px 1fr!important;
  align-items:start!important;
  gap:12px!important;
  padding:0!important;
  text-decoration:none!important;
  color:inherit!important;
}

.premiumFooter__contact small{
  font-size:9px!important;
  letter-spacing:.07em!important;
  color:#8b8f93!important;
  line-height:1.6!important;
}

.premiumFooter__contact strong{
  font-size:12px!important;
  line-height:1.55!important;
  font-weight:650!important;
  color:#25292e!important;
  overflow-wrap:anywhere!important;
}

.premiumFooter__cta{
  grid-area:cta!important;
  margin-top:6px!important;
  min-height:54px!important;
  padding:0 22px!important;
  border-radius:16px!important;
  display:flex!important;
  align-items:center!important;
  justify-content:space-between!important;
  gap:18px!important;
  text-decoration:none!important;
  color:#fff!important;
  background:linear-gradient(135deg,#9f7135,#b8833d)!important;
  border:1px solid rgba(116,76,25,.18)!important;
  box-shadow:0 16px 34px rgba(122,84,34,.16)!important;
  font-size:10px!important;
  font-weight:800!important;
  letter-spacing:.11em!important;
  transition:transform .24s ease,box-shadow .24s ease,filter .24s ease!important;
}

.premiumFooter__cta:hover{
  transform:translateY(-2px)!important;
  box-shadow:0 20px 38px rgba(122,84,34,.22)!important;
  filter:saturate(1.05)!important;
}

.premiumFooter__bottom{
  position:relative;
  z-index:1;
  width:min(1380px,calc(100% - 64px))!important;
  margin:0 auto!important;
  padding:22px 0 28px!important;
  border-top:1px solid rgba(140,103,59,.14)!important;
  display:flex!important;
  align-items:flex-end!important;
  justify-content:space-between!important;
  gap:28px!important;
}

.premiumFooter__copyright{
  display:flex!important;
  flex-direction:column!important;
  gap:8px!important;
}

.premiumFooter__copyright>span:first-child{
  font-size:9px!important;
  color:#777d82!important;
  letter-spacing:.02em!important;
}

.premiumFooter__creator{
  display:flex!important;
  align-items:center!important;
  flex-wrap:wrap!important;
  gap:7px!important;
  color:#92979b!important;
  font-size:8.5px!important;
  letter-spacing:.045em!important;
}

.premiumFooter__creator strong{
  color:#a77736!important;
  font-weight:800!important;
}

.premiumFooter__legal{
  display:flex!important;
  align-items:center!important;
  justify-content:flex-end!important;
  flex-wrap:wrap!important;
  gap:10px!important;
}

.premiumFooter__legal a{
  font-size:9px!important;
  color:#777d82!important;
  text-decoration:none!important;
  transition:color .2s ease!important;
}

.premiumFooter__legal a:hover{
  color:#a77736!important;
}

.premiumFooter__legal span{
  color:#b6a895!important;
  font-size:8px!important;
}

@media(max-width:900px){
  .premiumFooter__top{
    width:min(100% - 36px,760px)!important;
    grid-template-columns:1fr 1fr!important;
    grid-template-areas:
      "brand brand"
      "nav contact"
      "cta cta"!important;
    gap:34px 28px!important;
    padding:42px 0 34px!important;
  }
  .premiumFooter__bottom{
    width:min(100% - 36px,760px)!important;
  }
}

@media(max-width:620px){
  .premiumFooter__top{
    grid-template-columns:1fr!important;
    grid-template-areas:
      "brand"
      "nav"
      "contact"
      "cta"!important;
    gap:28px!important;
    padding:36px 0 30px!important;
  }
  .premiumFooter__brand{
    align-items:flex-start!important;
  }
  .premiumFooter__nav{
    grid-template-columns:repeat(2,minmax(0,1fr))!important;
    gap:12px 18px!important;
  }
  .premiumFooter__nav:before{
    grid-column:1/-1!important;
  }
  .premiumFooter__contact a{
    grid-template-columns:62px 1fr!important;
  }
  .premiumFooter__bottom{
    align-items:flex-start!important;
    flex-direction:column!important;
    gap:16px!important;
    padding:20px 0 24px!important;
  }
  .premiumFooter__legal{
    justify-content:flex-start!important;
  }
}

/* STEP 92 — LIGHT PREMIUM ADMIN + CB LABS OPENING */

/* --- Opening sequence --- */
.admin92Intro{
  min-height:100vh;
  position:relative;
  overflow:hidden;
  display:grid;
  place-items:center;
  background:
    radial-gradient(circle at 18% 18%,rgba(192,145,76,.12),transparent 28%),
    radial-gradient(circle at 82% 72%,rgba(224,190,139,.16),transparent 30%),
    linear-gradient(135deg,#fbf8f3 0%,#f4ede4 52%,#eee4d6 100%);
  color:#22272d;
}
.admin92Intro:before{
  content:"";
  position:absolute;
  inset:0;
  opacity:.20;
  background-image:
    linear-gradient(rgba(146,106,50,.08) 1px,transparent 1px),
    linear-gradient(90deg,rgba(146,106,50,.08) 1px,transparent 1px);
  background-size:54px 54px;
  mask-image:linear-gradient(to bottom,rgba(0,0,0,.45),transparent 78%);
}
.admin92Intro__ambient{
  position:absolute;
  border-radius:50%;
  filter:blur(12px);
  opacity:.42;
}
.admin92Intro__ambient--one{
  width:340px;height:340px;left:-130px;top:-80px;
  background:rgba(205,159,91,.18);
  animation:admin92Float 5s ease-in-out infinite alternate;
}
.admin92Intro__ambient--two{
  width:300px;height:300px;right:-90px;bottom:-110px;
  background:rgba(165,120,62,.13);
  animation:admin92Float 6s ease-in-out infinite alternate-reverse;
}
.admin92Intro__center{
  position:relative;
  z-index:2;
  width:min(520px,calc(100% - 38px));
  text-align:center;
  animation:admin92IntroIn .85s cubic-bezier(.16,.8,.2,1) both;
}
.admin92Intro__emblem{
  width:92px;height:92px;margin:0 auto 22px;
  display:grid;place-items:center;
  border-radius:28px;
  border:1px solid rgba(165,119,54,.20);
  background:rgba(255,255,255,.72);
  box-shadow:0 24px 60px rgba(102,72,36,.13);
}
.admin92Intro__emblem img{width:66px;height:66px;object-fit:contain}
.admin92Intro__eyebrow{
  display:block;margin-bottom:10px;
  font-size:9px;font-weight:800;letter-spacing:.25em;color:#a77736;
}
.admin92Intro h1{
  margin:0;font:500 clamp(35px,5vw,56px) Georgia,"Times New Roman",serif;
  letter-spacing:.02em;color:#20252a;
}
.admin92Intro p{
  margin:10px 0 0;color:#777d82;font-size:11px;letter-spacing:.09em;
}
.admin92Intro__line{
  width:190px;height:1px;margin:28px auto 20px;overflow:hidden;background:rgba(166,120,57,.16);
}
.admin92Intro__line span{
  display:block;width:100%;height:100%;
  transform-origin:left;
  background:linear-gradient(90deg,#976a31,#d5a257);
  animation:admin92Line 1.35s .15s cubic-bezier(.16,.8,.2,1) both;
}
.admin92Intro__credit{
  display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:7px;
  color:#8d9195;font-size:8.5px;letter-spacing:.08em;
  animation:admin92Credit .7s .5s ease both;
}
.admin92Intro__credit strong{color:#a77736;letter-spacing:.16em}
.admin92Intro__credit i{font-style:normal;color:#c0a177}
.admin92Intro__credit span{font-weight:700;color:#4c5156}
@keyframes admin92IntroIn{
  from{opacity:0;transform:translateY(18px) scale(.985);filter:blur(7px)}
  to{opacity:1;transform:none;filter:none}
}
@keyframes admin92Line{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes admin92Credit{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@keyframes admin92Float{to{transform:translate3d(18px,12px,0) scale(1.05)}}

/* --- Login --- */
.admin70Login{
  min-height:100vh!important;
  padding:42px 20px!important;
  display:grid!important;
  place-items:center!important;
  position:relative!important;
  overflow:hidden!important;
  background:
    radial-gradient(circle at 18% 15%,rgba(191,145,77,.11),transparent 28%),
    radial-gradient(circle at 88% 82%,rgba(191,145,77,.10),transparent 30%),
    linear-gradient(135deg,#fbf8f3,#f1e9de)!important;
}
.admin70Login__glow{
  width:540px!important;height:540px!important;left:50%!important;top:44%!important;
  transform:translate(-50%,-50%)!important;
  filter:blur(80px)!important;
  background:rgba(199,151,82,.12)!important;
}
.admin70Login__card{
  position:relative!important;
  z-index:2!important;
  width:min(450px,100%)!important;
  padding:38px 38px 28px!important;
  border:1px solid rgba(151,108,50,.16)!important;
  border-radius:28px!important;
  background:rgba(255,255,255,.86)!important;
  box-shadow:0 30px 80px rgba(83,59,31,.12)!important;
  backdrop-filter:blur(18px)!important;
  color:#252a2f!important;
  animation:admin92LoginIn .72s cubic-bezier(.16,.8,.2,1) both!important;
}
.admin70Login__logo--image{
  width:74px!important;height:74px!important;margin:0 auto 18px!important;
  border-radius:22px!important;
  border:1px solid rgba(163,117,52,.17)!important;
  background:#fff!important;
  box-shadow:0 13px 34px rgba(110,76,35,.10)!important;
  display:grid!important;place-items:center!important;
}
.admin70Login__logo--image img{width:52px;height:52px;object-fit:contain}
.admin70Login__card>span{
  display:block!important;text-align:center!important;color:#a77736!important;
  font-size:9px!important;font-weight:800!important;letter-spacing:.19em!important;
}
.admin70Login h1{
  margin:10px 0 8px!important;text-align:center!important;
  color:#24282d!important;font:500 34px Georgia,"Times New Roman",serif!important;
}
.admin70Login p{
  max-width:330px!important;margin:0 auto 24px!important;text-align:center!important;
  color:#7c8186!important;font-size:10px!important;line-height:1.7!important;
}
.admin70Login label{gap:7px!important;margin-top:13px!important}
.admin70Login label>span{color:#6f7479!important;font-size:9px!important;font-weight:700!important}
.admin70Login input{
  min-height:49px!important;padding:0 14px!important;
  border:1px solid #ded5ca!important;border-radius:13px!important;
  background:#fbfaf8!important;color:#24282d!important;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.7)!important;
}
.admin70Login input:focus{
  outline:none!important;border-color:#b88746!important;
  box-shadow:0 0 0 4px rgba(184,135,70,.09)!important;
}
.admin70Login button{
  min-height:50px!important;margin-top:18px!important;border-radius:13px!important;
  border:1px solid #a87738!important;
  background:linear-gradient(135deg,#a77736,#bf8a43)!important;
  color:#fff!important;box-shadow:0 14px 28px rgba(142,98,44,.18)!important;
}
.admin70Login__card>a{
  margin-top:17px!important;color:#777d82!important;font-size:9px!important;
}
.admin70Login__error{
  border-color:#e8c5c5!important;background:#fff2f1!important;color:#ae4747!important;
}
.admin92LoginCredit{
  margin-top:22px;padding-top:18px;border-top:1px solid #ece4da;
  display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px;
  color:#a0a3a6;font-size:7.7px;letter-spacing:.055em;
}
.admin92LoginCredit strong{color:#a77736;letter-spacing:.14em}
.admin92LoginCredit i{font-style:normal;color:#c4a87f}
.admin92LoginCredit b{color:#686d72;font-weight:700}
@keyframes admin92LoginIn{
  from{opacity:0;transform:translateY(18px) scale(.985)}
  to{opacity:1;transform:none}
}

/* --- Main admin shell --- */
.adminDemo{
  min-height:100vh!important;
  display:grid!important;
  grid-template-columns:264px minmax(0,1fr)!important;
  background:#f6f2ed!important;
  color:#252a2f!important;
}
.adminDemo__sidebar{
  position:sticky!important;top:0!important;height:100vh!important;
  padding:24px 18px 18px!important;
  background:rgba(255,255,255,.92)!important;
  border-right:1px solid #e7ded3!important;
  box-shadow:12px 0 40px rgba(82,58,30,.035)!important;
}
.adminDemo__brand{
  padding:3px 4px 23px!important;
  display:flex!important;align-items:center!important;gap:13px!important;
  border-bottom:1px solid #eee6dd!important;
}
.adminDemo__mark--image{
  width:48px!important;height:48px!important;border-radius:15px!important;
  border:1px solid rgba(160,114,51,.16)!important;background:#fff!important;
  box-shadow:0 10px 26px rgba(95,67,35,.08)!important;
  display:grid!important;place-items:center!important;
}
.adminDemo__mark--image img{width:35px;height:35px;object-fit:contain}
.adminDemo__brand strong{
  color:#25292e!important;font:700 14px Georgia,"Times New Roman",serif!important;
  letter-spacing:.035em!important;
}
.adminDemo__brand span{
  max-width:150px!important;margin-top:3px!important;color:#8a8f94!important;
  font-size:7.8px!important;line-height:1.45!important;letter-spacing:.04em!important;
}
.adminDemo__menu{
  margin-top:20px!important;display:grid!important;gap:7px!important;
}
.adminDemo__menu button{
  min-height:44px!important;padding:0 12px!important;
  border:1px solid transparent!important;border-radius:12px!important;
  background:transparent!important;color:#5e646a!important;
  font-size:9.5px!important;font-weight:650!important;
  transition:.22s ease!important;
}
.adminDemo__menu button:hover{
  transform:translateX(2px)!important;color:#9c6f35!important;background:#faf6f0!important;
}
.adminDemo__menu button.is-active{
  color:#8b612f!important;
  border-color:rgba(177,127,59,.15)!important;
  background:linear-gradient(135deg,#fbf5ea,#f1dfbd)!important;
  box-shadow:0 10px 24px rgba(146,103,48,.08)!important;
}
.adminDemo__menu svg{color:#a77736!important}
.adminDemo__sidebarFooter{
  border-top:1px solid #eee6dd!important;padding-top:16px!important;
}
.adminDemo__user{
  padding:11px!important;border:1px solid #e7dfd5!important;border-radius:14px!important;
  background:#fbfaf8!important;
}
.adminDemo__user>div{
  background:linear-gradient(135deg,#d7ab64,#a97838)!important;color:#fff!important;
}
.adminDemo__user strong{color:#34393e!important}
.adminDemo__user small{color:#92969a!important}
.admin70Logout{
  margin-top:10px!important;border-color:#e8ddd1!important;background:#fff!important;color:#8b5f31!important;
}
.adminDemo__sidebarFooter>a{color:#777d82!important}
.admin92SidebarCredit{
  margin-top:16px;padding-top:14px;border-top:1px solid #efe7de;
  display:flex;align-items:center;gap:5px;flex-wrap:wrap;
  color:#aaa5a0;font-size:7px;letter-spacing:.05em;
}
.admin92SidebarCredit small{width:100%;color:#a6a09a}
.admin92SidebarCredit strong{color:#a77736;letter-spacing:.13em}
.admin92SidebarCredit span{color:#74797e;font-weight:700}

/* --- Main content --- */
.adminDemo__main{
  min-width:0!important;padding:30px 34px 42px!important;
  background:
    radial-gradient(circle at 100% 0,rgba(202,157,94,.10),transparent 22%),
    #f6f2ed!important;
}
.adminDemo__topbar{
  min-height:84px!important;padding:0 0 22px!important;margin-bottom:18px!important;
  border-bottom:1px solid #e5dcd2!important;
  display:flex!important;align-items:flex-end!important;justify-content:space-between!important;
}
.admin92TopbarCopy>span{
  color:#a77736!important;font-size:8px!important;font-weight:800!important;letter-spacing:.17em!important;
}
.admin92TopbarCopy>p{
  margin:4px 0 2px;color:#25292e;font-size:11px;font-weight:700;
}
.adminDemo__topbar h1{
  margin-top:4px!important;color:#20252a!important;
  font:500 32px Georgia,"Times New Roman",serif!important;
}
.adminDemo__demoBadge{
  min-height:36px!important;padding:0 13px!important;border:1px solid #dfe7dc!important;
  background:#f6fbf5!important;color:#478153!important;border-radius:999px!important;
}
.adminDemo__demoBadge>span{background:#55a061!important;box-shadow:0 0 0 4px rgba(85,160,97,.11)!important}

/* Dashboard KPI cards */
.adminDemo__stats{
  grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:14px!important;
}
.adminDemo__stats article{
  min-height:128px!important;padding:20px!important;
  border:1px solid #e7ded4!important;border-radius:18px!important;
  background:rgba(255,255,255,.88)!important;
  box-shadow:0 14px 34px rgba(82,59,32,.055)!important;
}
.adminDemo__stats article>div{
  width:42px!important;height:42px!important;border-radius:13px!important;
  color:#fff!important;border:0!important;
  background:linear-gradient(135deg,#cf9a49,#a87534)!important;
  box-shadow:0 8px 20px rgba(161,113,50,.17)!important;
}
.adminDemo__stats article:nth-child(2)>div{background:linear-gradient(135deg,#c589aa,#9c597e)!important}
.adminDemo__stats article:nth-child(3)>div{background:linear-gradient(135deg,#75b878,#4d9255)!important}
.adminDemo__stats article:nth-child(4)>div{background:linear-gradient(135deg,#668fe0,#4168c3)!important}
.adminDemo__stats span{color:#81868b!important;font-size:9px!important}
.adminDemo__stats strong{color:#25292e!important;font:600 29px Georgia,"Times New Roman",serif!important}

/* Panels */
.adminDemo__dashboardGrid{gap:16px!important}
.adminDemo__panel,
.admin72Cms__head,
.admin72Cms__section,
.admin74Media__panel,
.admin70Appointments__head,
.admin70Appointments__list,
.admin74Media{
  border-color:#e7ded4!important;
  background:rgba(255,255,255,.90)!important;
  box-shadow:0 14px 34px rgba(82,59,32,.05)!important;
}
.adminDemo__panel{border-radius:18px!important;padding:22px!important}
.adminDemo__panelHead{border-bottom-color:#eee6dd!important}
.adminDemo__panelHead span,
.admin72Cms__head>div>span,
.admin74Media__head>span,
.admin70Appointments__head>div>span{
  color:#a77736!important;
}
.adminDemo__panelHead h2,
.admin72Cms__head h2,
.admin74Media__head h2,
.admin70Appointments__head h2,
.adminDemo__welcome h2{
  color:#25292e!important;
}
.adminDemo__miniList>div,
.adminDemo__contentList>div,
.admin74Media__item{
  border-color:#eee7df!important;
}
.adminDemo__miniList strong,
.adminDemo__contentList strong,
.admin74Media__item strong{color:#30353a!important}
.adminDemo__miniList small,
.adminDemo__contentList small,
.admin74Media__item small{color:#8d9296!important}

/* CMS light skin */
.admin72Cms__head{border-radius:18px!important}
.admin72Cms__head p{color:#7e8388!important}
.admin72Cms__head>button,
.adminDemo__panelHead button,
.admin70Appointments__head>button{
  border-color:#dbc8ae!important;background:#fffaf3!important;color:#9c6e34!important;
}
.admin72Cms__section{border-radius:18px!important}
.admin72Cms__sectionTitle{border-bottom-color:#ece4da!important}
.admin72Cms__sectionTitle>span{
  border-color:#d8bc93!important;color:#a77736!important;background:#fbf6ee!important;
}
.admin72Cms__sectionTitle strong{color:#2b3035!important}
.admin72Cms__sectionTitle small{color:#94989b!important}
.admin72Cms__fields label>span{color:#777c81!important}
.admin72Cms__fields input,
.admin72Cms__fields textarea,
.adminDemo__form input,
.adminDemo__form select,
.adminDemo__form textarea,
.admin74Media input,
.admin74Media select,
.admin74Media textarea{
  border-color:#e0d7cc!important;background:#fbfaf8!important;color:#252a2f!important;
}
.admin72Cms__fields input:focus,
.admin72Cms__fields textarea:focus,
.adminDemo__form input:focus,
.adminDemo__form select:focus,
.adminDemo__form textarea:focus{
  border-color:#b98747!important;box-shadow:0 0 0 3px rgba(185,135,71,.08)!important;
}
.admin72Cms__save,
.adminDemo__submit{
  background:linear-gradient(135deg,#a77736,#bd8842)!important;color:#fff!important;
  border-color:#9e6e34!important;
}

/* Appointment table */
.admin70Appointments__head p{color:#80858a!important}
.admin70Appointments__list{border-radius:18px!important;overflow:hidden!important}
.admin70Appointments__row{
  border-bottom-color:#eee6dd!important;background:transparent!important;
}
.admin70Appointments__row:hover{background:#fbf8f4!important}
.admin70Appointments__row strong{color:#2d3237!important}
.admin70Appointments__row small{color:#8c9195!important}
.admin70Status--pending{background:#fff3df!important;color:#a66b13!important;border-color:#f0d5aa!important}
.admin70Status--approved{background:#eaf6ec!important;color:#3b7f49!important;border-color:#c9e6ce!important}
.admin70Status--cancelled{background:#fff0ef!important;color:#aa4c4c!important;border-color:#efcdca!important}

/* Media admin */
.admin74Media__message.is-success{background:#edf8ef!important;border-color:#cae8cf!important;color:#3f7b49!important}
.admin74Media__message.is-error{background:#fff1ef!important;border-color:#efcfca!important;color:#a64d47!important}

/* Generic admin text cleanup */
.adminDemo p,
.admin72Cms p,
.admin74Media p,
.admin70Appointments p{color:#7b8085!important}
.adminDemo__placeholderIcon{background:#f7efe4!important;color:#a77736!important}
.adminDemo__placeholder>span{color:#a77736!important}
.adminDemo__placeholder h2{color:#2c3136!important}
.adminDemo__placeholder p{color:#858a8e!important}

/* Responsive */
@media(max-width:1050px){
  .adminDemo{grid-template-columns:220px minmax(0,1fr)!important}
  .adminDemo__main{padding:26px 24px 38px!important}
  .adminDemo__stats{grid-template-columns:repeat(2,minmax(0,1fr))!important}
}
@media(max-width:760px){
  .admin92Intro__emblem{width:78px;height:78px;border-radius:23px}
  .admin92Intro__emblem img{width:56px;height:56px}
  .adminDemo{
    display:block!important;
  }
  .adminDemo__sidebar{
    position:relative!important;height:auto!important;
    border-right:0!important;border-bottom:1px solid #e7ded3!important;
  }
  .adminDemo__menu{
    grid-template-columns:repeat(2,minmax(0,1fr))!important;
  }
  .adminDemo__sidebarFooter{margin-top:20px!important}
  .adminDemo__main{padding:22px 16px 32px!important}
  .adminDemo__topbar{align-items:flex-start!important;gap:16px!important}
  .adminDemo__stats{grid-template-columns:1fr 1fr!important}
}
@media(max-width:520px){
  .admin70Login__card{padding:30px 22px 24px!important;border-radius:22px!important}
  .adminDemo__menu{grid-template-columns:1fr!important}
  .adminDemo__stats{grid-template-columns:1fr!important}
  .adminDemo__topbar{flex-direction:column!important}
}

@media(prefers-reduced-motion:reduce){
  .admin92Intro__center,
  .admin92Intro__line span,
  .admin92Intro__credit,
  .admin92Intro__ambient,
  .admin70Login__card{
    animation:none!important;
  }
}

/* STEP 93 — ADMIN SESSION SECURITY */
.admin93SecurityNote{
  margin:0 auto 18px;
  max-width:350px;
  min-height:38px;
  padding:9px 11px;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:8px;
  border:1px solid rgba(167,119,54,.14);
  border-radius:12px;
  background:#fbf6ee;
  color:#8b6a3f;
  font-size:8px;
  line-height:1.45;
  letter-spacing:.02em;
}
.admin93SecurityNote svg{
  flex:0 0 auto;
  color:#a77736;
}

/* STEP 94 — ADMIN CMS LIGHT FIX (HİZMETLER + SÜREÇ + KAYIT ALANI) */

/* Hizmetler ve Süreç sekmelerinde kalan koyu eski tema tamamen kaldırılır */
.admin73Cms{
  display:grid!important;
  gap:16px!important;
  color:#292e33!important;
}

.admin73Cms__head{
  padding:24px 26px!important;
  display:flex!important;
  align-items:flex-end!important;
  justify-content:space-between!important;
  gap:20px!important;
  border:1px solid #e6ddd2!important;
  border-radius:18px!important;
  background:rgba(255,255,255,.92)!important;
  box-shadow:0 14px 34px rgba(82,59,32,.05)!important;
}

.admin73Cms__head>div>span{
  color:#a77736!important;
  font-size:9px!important;
  font-weight:800!important;
  letter-spacing:.15em!important;
}

.admin73Cms__head h2{
  margin-top:7px!important;
  color:#25292e!important;
  font:500 29px Georgia,"Times New Roman",serif!important;
}

.admin73Cms__head p{
  max-width:680px!important;
  margin-top:8px!important;
  color:#7e8388!important;
  font-size:10px!important;
  line-height:1.65!important;
}

.admin73Cms__head>button{
  min-height:41px!important;
  padding:0 14px!important;
  border:1px solid #d9c5a9!important;
  border-radius:11px!important;
  background:#fffaf3!important;
  color:#9c6e34!important;
  cursor:pointer!important;
  font-size:8.5px!important;
  font-weight:700!important;
  box-shadow:0 8px 18px rgba(120,83,38,.06)!important;
}

.admin73Cms__head>button:hover{
  background:#f8efe2!important;
  border-color:#cda76f!important;
}

.admin73Cms__form{
  display:grid!important;
  gap:14px!important;
}

.admin73Cms__section{
  padding:23px!important;
  border:1px solid #e7ded4!important;
  border-radius:18px!important;
  background:rgba(255,255,255,.92)!important;
  box-shadow:0 14px 34px rgba(82,59,32,.045)!important;
}

.admin73Cms__sectionTitle{
  display:flex!important;
  align-items:center!important;
  gap:13px!important;
  padding-bottom:17px!important;
  border-bottom:1px solid #eee6dd!important;
}

.admin73Cms__sectionTitle>span{
  width:38px!important;
  height:38px!important;
  display:grid!important;
  place-items:center!important;
  flex:0 0 38px!important;
  border:1px solid #dbc39f!important;
  border-radius:50%!important;
  color:#a77736!important;
  background:#fbf6ee!important;
  font-size:8px!important;
  font-weight:800!important;
}

.admin73Cms__sectionTitle>div{
  display:flex!important;
  flex-direction:column!important;
  gap:4px!important;
}

.admin73Cms__sectionTitle strong{
  color:#2b3035!important;
  font:500 18px Georgia,"Times New Roman",serif!important;
}

.admin73Cms__sectionTitle small{
  color:#92979b!important;
  font-size:8.5px!important;
  line-height:1.5!important;
}

.admin73Cms__fields{
  margin-top:18px!important;
  display:grid!important;
  grid-template-columns:repeat(2,minmax(0,1fr))!important;
  gap:13px!important;
}

.admin73Cms__fields label{
  display:flex!important;
  flex-direction:column!important;
  gap:7px!important;
}

.admin73Cms__fields label>span{
  color:#777c81!important;
  font-size:8.5px!important;
  font-weight:700!important;
  letter-spacing:.04em!important;
}

.admin73Cms__fields input,
.admin73Cms__fields textarea{
  width:100%!important;
  padding:12px 13px!important;
  border:1px solid #e0d7cc!important;
  border-radius:10px!important;
  background:#fbfaf8!important;
  color:#252a2f!important;
  outline:none!important;
  font-size:10px!important;
  line-height:1.6!important;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.7)!important;
}

.admin73Cms__fields input{
  min-height:45px!important;
}

.admin73Cms__fields textarea{
  resize:vertical!important;
}

.admin73Cms__fields input:focus,
.admin73Cms__fields textarea:focus{
  border-color:#b98747!important;
  box-shadow:0 0 0 3px rgba(185,135,71,.08)!important;
}

.admin73Cms__full,
.admin73Cms__fields .is-wide{
  grid-column:1/-1!important;
}

.admin73Cms__loading{
  min-height:180px!important;
  display:grid!important;
  place-items:center!important;
  border:1px dashed #d9c9b5!important;
  border-radius:16px!important;
  background:#fbfaf8!important;
  color:#7d8388!important;
  font-size:10px!important;
}

.admin73Cms__message{
  padding:12px 14px!important;
  border-radius:11px!important;
  font-size:9px!important;
  border:1px solid #e5ddd4!important;
  background:#fff!important;
  color:#6f7479!important;
}

.admin73Cms__message.is-success{
  border-color:#c9e6ce!important;
  background:#edf8ef!important;
  color:#3f7b49!important;
}

.admin73Cms__message.is-error{
  border-color:#efcfca!important;
  background:#fff1ef!important;
  color:#a64d47!important;
}

/* Hizmetler kaydet alanı */
.admin73Cms__save{
  padding:18px 20px!important;
  display:flex!important;
  align-items:center!important;
  justify-content:space-between!important;
  gap:20px!important;
  border:1px solid #e2d4c3!important;
  border-radius:16px!important;
  background:linear-gradient(135deg,#fffaf3,#f5eadb)!important;
  box-shadow:0 12px 28px rgba(111,77,35,.06)!important;
}

.admin73Cms__save>div{
  display:flex!important;
  flex-direction:column!important;
  gap:5px!important;
}

.admin73Cms__save strong{
  color:#2e3338!important;
  font:500 15px Georgia,"Times New Roman",serif!important;
}

.admin73Cms__save span{
  color:#7f8489!important;
  font-size:8.5px!important;
}

.admin73Cms__save button{
  min-height:44px!important;
  padding:0 17px!important;
  display:flex!important;
  align-items:center!important;
  justify-content:center!important;
  gap:9px!important;
  border:1px solid #9f7036!important;
  border-radius:11px!important;
  background:linear-gradient(135deg,#a77736,#bf8a43)!important;
  color:#fff!important;
  cursor:pointer!important;
  font-size:8.5px!important;
  font-weight:800!important;
  box-shadow:0 12px 24px rgba(139,95,40,.16)!important;
}

/* Süreç sayfası tekrar eden kartlar */
.admin81Process__stack{
  display:grid!important;
  gap:12px!important;
  margin-top:18px!important;
}

.admin81Process__item{
  padding:16px!important;
  border:1px solid #e7ded4!important;
  border-radius:14px!important;
  background:#fbfaf8!important;
  display:grid!important;
  gap:10px!important;
  box-shadow:0 8px 20px rgba(82,59,32,.035)!important;
}

.admin81Process__item>b,
.admin81Process__itemTop>b{
  color:#a77736!important;
  font-size:8px!important;
  font-weight:800!important;
  letter-spacing:.13em!important;
}

.admin81Process__item input,
.admin81Process__item textarea{
  width:100%!important;
  border:1px solid #e0d7cc!important;
  border-radius:10px!important;
  background:#fff!important;
  color:#252a2f!important;
  padding:11px 12px!important;
  outline:none!important;
  font:inherit!important;
  font-size:10px!important;
  line-height:1.6!important;
}

.admin81Process__item input:focus,
.admin81Process__item textarea:focus{
  border-color:#b98747!important;
  box-shadow:0 0 0 3px rgba(185,135,71,.08)!important;
}

.admin81Process__item textarea{
  resize:vertical!important;
}

.admin81Process__row{
  display:grid!important;
  grid-template-columns:1fr 1fr!important;
  gap:10px!important;
}

.admin81Process__testimonialHead,
.admin81Process__itemTop{
  display:flex!important;
  align-items:center!important;
  justify-content:space-between!important;
  gap:12px!important;
}

.admin81Process__testimonialHead{
  margin:21px 0 10px!important;
  color:#30353a!important;
}

.admin81Process__testimonialHead strong{
  font:500 15px Georgia,"Times New Roman",serif!important;
}

.admin81Process__testimonialHead button{
  border:1px solid #d8bd96!important;
  border-radius:10px!important;
  background:#fff7eb!important;
  color:#a16e31!important;
  padding:9px 12px!important;
  cursor:pointer!important;
  font-size:8.5px!important;
  font-weight:700!important;
}

.admin81Process__itemTop button{
  border:1px solid #eccbc7!important;
  border-radius:9px!important;
  background:#fff2f0!important;
  color:#b45750!important;
  padding:7px 10px!important;
  cursor:pointer!important;
  font-size:8px!important;
  font-weight:700!important;
}

/* Ekran görüntüsündeki bozuk Süreç kayıt bölümü */
.admin73Cms__savebar{
  padding:20px 22px!important;
  display:flex!important;
  align-items:center!important;
  justify-content:space-between!important;
  gap:24px!important;
  border:1px solid #dfcfbb!important;
  border-radius:17px!important;
  background:
    radial-gradient(circle at 100% 0,rgba(197,150,82,.09),transparent 28%),
    linear-gradient(135deg,#fffaf3,#f2e5d3)!important;
  box-shadow:0 15px 34px rgba(103,72,34,.075)!important;
}

.admin73Cms__savebar>div{
  min-width:0!important;
  display:flex!important;
  flex-direction:column!important;
  gap:6px!important;
}

.admin73Cms__savebar strong{
  color:#2b3035!important;
  font:500 17px Georgia,"Times New Roman",serif!important;
}

.admin73Cms__savebar span{
  color:#7d8287!important;
  font-size:9px!important;
  line-height:1.55!important;
}

.admin73Cms__savebar button{
  flex:0 0 auto!important;
  min-height:47px!important;
  padding:0 20px!important;
  border:1px solid #9a6c33!important;
  border-radius:12px!important;
  background:linear-gradient(135deg,#9f7135,#bd8842)!important;
  color:#fff!important;
  cursor:pointer!important;
  font-size:8.5px!important;
  font-weight:800!important;
  letter-spacing:.05em!important;
  box-shadow:0 13px 28px rgba(131,89,38,.17)!important;
  transition:transform .2s ease,box-shadow .2s ease!important;
}

.admin73Cms__savebar button:hover{
  transform:translateY(-1px)!important;
  box-shadow:0 17px 32px rgba(131,89,38,.22)!important;
}

.admin73Cms__savebar button:disabled,
.admin73Cms__save button:disabled{
  opacity:.5!important;
  cursor:not-allowed!important;
  transform:none!important;
}

/* Admin içerik alanlarının eski koyu arka planlarını bastır */
.adminDemo__main .admin73Cms,
.adminDemo__main .admin81Process{
  background:transparent!important;
}

@media(max-width:760px){
  .admin73Cms__head,
  .admin73Cms__save,
  .admin73Cms__savebar{
    align-items:flex-start!important;
    flex-direction:column!important;
  }

  .admin73Cms__fields{
    grid-template-columns:1fr!important;
  }

  .admin73Cms__full,
  .admin73Cms__fields .is-wide{
    grid-column:auto!important;
  }

  .admin73Cms__save button,
  .admin73Cms__savebar button{
    width:100%!important;
  }

  .admin81Process__row{
    grid-template-columns:1fr!important;
  }
}

/* STEP95 — PREMIUM PUBLIC SITE OPENING */
.site95Intro{
  position:fixed;
  inset:0;
  z-index:999999;
  display:grid;
  place-items:center;
  overflow:hidden;
  background:
    radial-gradient(circle at 50% 48%,rgba(183,132,64,.12),transparent 26%),
    linear-gradient(135deg,#fbf8f3 0%,#f4ede3 52%,#faf6f0 100%);
  animation:site95Exit .48s cubic-bezier(.72,0,.2,1) 1.62s forwards;
}

.site95Intro__halo{
  position:absolute;
  left:50%;
  top:50%;
  width:430px;
  height:430px;
  transform:translate(-50%,-50%);
  border-radius:50%;
  background:rgba(191,145,80,.08);
  filter:blur(65px);
  animation:site95Halo 1.45s ease both;
}

.site95Intro__content{
  position:relative;
  z-index:2;
  width:min(90vw,620px);
  display:flex;
  flex-direction:column;
  align-items:center;
  text-align:center;
}

.site95Intro__logo{
  width:96px;
  height:96px;
  display:grid;
  place-items:center;
  overflow:hidden;
  border:1px solid rgba(177,130,67,.18);
  border-radius:27px;
  background:rgba(255,255,255,.86);
  box-shadow:
    0 22px 52px rgba(94,67,34,.10),
    inset 0 1px 0 rgba(255,255,255,.95);
  opacity:0;
  animation:site95Logo .72s cubic-bezier(.2,.82,.2,1) .06s forwards;
}

.site95Intro__logo img{
  width:72%;
  height:72%;
  object-fit:contain;
}

.site95Intro__eyebrow{
  margin-top:22px;
  color:#a57538;
  font-size:9px;
  font-weight:800;
  letter-spacing:.31em;
  opacity:0;
  animation:site95Reveal .5s ease .28s forwards;
}

.site95Intro__name{
  margin-top:12px;
  color:#22272c;
  font:500 clamp(40px,4.5vw,60px)/1 Georgia,"Times New Roman",serif;
  letter-spacing:.075em;
  opacity:0;
  animation:site95Reveal .58s cubic-bezier(.2,.8,.2,1) .38s forwards;
}

.site95Intro__role{
  margin:14px 0 0;
  color:#777d82;
  font-size:9px;
  font-weight:500;
  letter-spacing:.08em;
  opacity:0;
  animation:site95Reveal .5s ease .5s forwards;
}

.site95Intro__role i{
  margin:0 5px;
  color:#b18145;
  font-style:normal;
}

.site95Intro__progress{
  width:150px;
  height:1px;
  margin-top:23px;
  overflow:hidden;
  background:rgba(165,117,56,.13);
  opacity:0;
  animation:site95Reveal .35s ease .58s forwards;
}

.site95Intro__progress span{
  display:block;
  width:55%;
  height:100%;
  background:linear-gradient(90deg,transparent,#aa7839,#c39a63);
  animation:site95Progress 1.05s cubic-bezier(.2,.72,.2,1) .58s both;
}

@keyframes site95Logo{
  from{opacity:0;transform:translateY(15px) scale(.87);filter:blur(7px)}
  to{opacity:1;transform:translateY(0) scale(1);filter:blur(0)}
}

@keyframes site95Reveal{
  from{opacity:0;transform:translateY(8px);filter:blur(4px)}
  to{opacity:1;transform:translateY(0);filter:blur(0)}
}

@keyframes site95Progress{
  from{transform:translateX(-110%)}
  to{transform:translateX(185%)}
}

@keyframes site95Halo{
  from{opacity:0;transform:translate(-50%,-50%) scale(.7)}
  to{opacity:1;transform:translate(-50%,-50%) scale(1)}
}

@keyframes site95Exit{
  from{opacity:1;visibility:visible}
  to{opacity:0;visibility:hidden;pointer-events:none}
}

@media(max-width:640px){
  .site95Intro__logo{width:84px;height:84px;border-radius:24px}
  .site95Intro__eyebrow{font-size:8px;margin-top:19px}
  .site95Intro__name{font-size:39px;letter-spacing:.05em}
  .site95Intro__role{font-size:8px}
}

@media(prefers-reduced-motion:reduce){
  .site95Intro{animation-duration:.18s;animation-delay:.55s}
  .site95Intro__logo,
  .site95Intro__eyebrow,
  .site95Intro__name,
  .site95Intro__role,
  .site95Intro__progress,
  .site95Intro__progress span,
  .site95Intro__halo{
    animation-duration:.01ms!important;
    animation-delay:0ms!important;
  }
}

/* STEP98 — PREMIUM EDITORIAL BLOG */
.blog98Page{
  background:#f6f1ea;
  color:#222427;
}
.blog98Hero{
  position:relative;
  min-height:520px;
  overflow:hidden;
  display:flex;
  align-items:center;
  padding:70px 7%;
}
.blog98Hero__image{
  position:absolute;
  inset:0;
}
.blog98Hero__image img{
  width:100%;
  height:100%;
  object-fit:cover;
}
.blog98Hero__shade{
  position:absolute;
  inset:0;
  background:
    linear-gradient(90deg,rgba(15,14,12,.92) 0%,rgba(20,18,15,.78) 36%,rgba(18,16,13,.2) 70%,rgba(18,16,13,.08) 100%),
    linear-gradient(180deg,rgba(0,0,0,.05),rgba(0,0,0,.28));
}
.blog98Hero__copy{
  position:relative;
  z-index:2;
  width:min(620px,94%);
  color:#fff;
}
.blog98Hero__copy>span{
  display:block;
  margin-bottom:22px;
  color:#d9ab68;
  font-size:10px;
  font-weight:800;
  letter-spacing:.18em;
}
.blog98Hero__copy h1{
  margin:0;
  max-width:600px;
  font:500 clamp(48px,5vw,78px)/.96 Georgia,"Times New Roman",serif;
  letter-spacing:-.035em;
}
.blog98Hero__copy h1 strong{
  display:block;
  margin-top:4px;
  color:#e2b66f;
  font-weight:500;
}
.blog98Hero__copy p{
  max-width:520px;
  margin:28px 0 30px;
  color:rgba(255,255,255,.78);
  font-size:13px;
  line-height:1.85;
}
.blog98Hero__copy>a{
  width:max-content;
  min-height:48px;
  padding:0 22px;
  display:flex;
  align-items:center;
  gap:14px;
  border:1px solid rgba(255,255,255,.72);
  border-radius:999px;
  color:#fff;
  font-size:9px;
  font-weight:800;
  letter-spacing:.08em;
  transition:.25s ease;
}
.blog98Hero__copy>a:hover{
  color:#1d1b18;
  background:#fff;
  transform:translateY(-2px);
}
.blog98Content{
  padding:22px 7% 78px;
}
.blog98Toolbar{
  margin-bottom:25px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:20px;
}
.blog98Categories{
  display:flex;
  align-items:center;
  gap:11px;
  flex-wrap:wrap;
}
.blog98Categories button{
  min-height:38px;
  padding:0 17px;
  border:1px solid #ded4c7;
  border-radius:999px;
  background:rgba(255,255,255,.56);
  color:#59544d;
  cursor:pointer;
  font-size:8px;
  font-weight:650;
  transition:.2s ease;
}
.blog98Categories button:hover,
.blog98Categories button.is-active{
  border-color:#20201e;
  color:#fff;
  background:#20201e;
}
.blog98Search{
  width:185px;
  min-height:40px;
  padding:0 14px;
  display:flex;
  align-items:center;
  gap:8px;
  border:1px solid #dcd2c5;
  border-radius:999px;
  background:rgba(255,255,255,.6);
}
.blog98Search input{
  width:100%;
  border:0;
  outline:0;
  background:transparent;
  color:#282725;
  font-size:9px;
}
.blog98Grid{
  display:grid;
  grid-template-columns:repeat(4,minmax(0,1fr));
  gap:20px;
}
.blog98Card{
  overflow:hidden;
  border:1px solid #ded4c7;
  border-radius:10px;
  background:rgba(255,255,255,.6);
  box-shadow:0 14px 34px rgba(76,57,36,.045);
  transition:.28s ease;
}
.blog98Card:hover{
  transform:translateY(-5px);
  box-shadow:0 22px 45px rgba(76,57,36,.09);
}
.blog98Card__image{
  height:230px;
  display:block;
  overflow:hidden;
}
.blog98Card__image img{
  width:100%;
  height:100%;
  object-fit:cover;
  transition:transform .6s cubic-bezier(.2,.7,.2,1);
}
.blog98Card:hover .blog98Card__image img{transform:scale(1.045)}
.blog98Card__body{
  min-height:310px;
  padding:18px 17px 15px;
  display:flex;
  flex-direction:column;
}
.blog98Card__meta{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:10px;
}
.blog98Card__meta span{
  padding:5px 8px;
  border-radius:999px;
  background:#eee5dc;
  color:#765b3d;
  font-size:6.7px;
  font-weight:800;
  letter-spacing:.04em;
}
.blog98Card__meta time{
  color:#999087;
  font-size:7px;
}
.blog98Card h2{
  margin:18px 0 11px;
  color:#252522;
  font:500 23px/1.07 Georgia,"Times New Roman",serif;
}
.blog98Card h2 a{transition:color .2s ease}
.blog98Card h2 a:hover{color:#a6773d}
.blog98Card__body>p{
  color:#77716b;
  font-size:9px;
  line-height:1.7;
}
.blog98Card__footer{
  margin-top:auto;
  padding-top:19px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:10px;
}
.blog98Card__footer small,
.blog98Card__footer>a{
  display:flex;
  align-items:center;
  gap:6px;
  color:#77716a;
  font-size:7.5px;
}
.blog98Card__footer>a{
  color:#292824;
  font-weight:800;
}
.blog98Empty{
  padding:60px 20px;
  text-align:center;
  color:#8a8278;
  border:1px dashed #d9ccbd;
  border-radius:15px;
}
.blog98More{
  min-height:45px;
  margin:30px auto 35px;
  padding:0 26px;
  display:flex;
  align-items:center;
  gap:24px;
  border:1px solid #cfc2b3;
  border-radius:999px;
  background:rgba(255,255,255,.52);
  color:#4e4b46;
  cursor:pointer;
  font-size:8px;
  font-weight:800;
  letter-spacing:.05em;
}
.blog98More span{font-size:17px}
.blog98Featured{
  min-height:400px;
  overflow:hidden;
  display:grid;
  grid-template-columns:34% 66%;
  border-radius:12px;
  background:#181816;
  box-shadow:0 20px 55px rgba(49,38,25,.11);
}
.blog98Featured__copy{
  padding:48px 42px;
  display:flex;
  flex-direction:column;
  justify-content:center;
  color:#fff;
}
.blog98Featured__copy>span{
  color:#d7a65f;
  font-size:8px;
  font-weight:800;
  letter-spacing:.16em;
}
.blog98Featured__copy h2{
  margin:18px 0;
  font:500 37px/1.02 Georgia,"Times New Roman",serif;
}
.blog98Featured__copy p{
  color:#c7c1b8;
  font-size:10px;
  line-height:1.75;
}
.blog98Featured__copy>a{
  width:max-content;
  min-height:44px;
  margin-top:24px;
  padding:0 17px;
  display:flex;
  align-items:center;
  gap:12px;
  border-radius:999px;
  background:#dfb068;
  color:#27231d;
  font-size:8px;
  font-weight:800;
}
.blog98Featured__meta{
  margin-top:27px;
  display:flex;
  gap:20px;
}
.blog98Featured__meta small{
  display:flex;
  align-items:center;
  gap:6px;
  color:#bdb5ab;
  font-size:7px;
}
.blog98Featured__image{
  display:block;
  min-height:400px;
  overflow:hidden;
}
.blog98Featured__image img{
  width:100%;
  height:100%;
  object-fit:cover;
  transition:transform .7s ease;
}
.blog98Featured:hover .blog98Featured__image img{transform:scale(1.025)}

/* ARTICLE */
.blog99Article{
  background:#f7f2eb;
  color:#242522;
}
.blog99Hero{
  position:relative;
  min-height:570px;
  overflow:hidden;
  display:flex;
  align-items:flex-end;
  padding:60px 8%;
  color:#fff;
}
.blog99Back{
  position:absolute;
  z-index:4;
  left:5%;
  top:34px;
  font-size:8px;
  letter-spacing:.05em;
  color:rgba(255,255,255,.85);
}
.blog99Hero__image,
.blog99Hero__shade{
  position:absolute;
  inset:0;
}
.blog99Hero__image img{
  width:100%;
  height:100%;
  object-fit:cover;
}
.blog99Hero__shade{
  background:
    linear-gradient(180deg,rgba(0,0,0,.18),rgba(0,0,0,.76)),
    linear-gradient(90deg,rgba(17,15,12,.45),transparent);
}
.blog99Hero__copy{
  position:relative;
  z-index:3;
  max-width:840px;
}
.blog99Hero__copy>span{
  color:#e0b36c;
  font-size:9px;
  font-weight:800;
  letter-spacing:.15em;
}
.blog99Hero__copy h1{
  margin:15px 0;
  font:500 clamp(44px,5vw,72px)/1 Georgia,"Times New Roman",serif;
  letter-spacing:-.035em;
}
.blog99Hero__copy>p{
  max-width:680px;
  color:rgba(255,255,255,.82);
  font-size:12px;
  line-height:1.75;
}
.blog99Hero__copy>div{
  margin-top:22px;
  display:flex;
  gap:20px;
}
.blog99Hero__copy small{
  display:flex;
  align-items:center;
  gap:7px;
  color:rgba(255,255,255,.72);
  font-size:8px;
}
.blog99Body{
  width:min(1160px,90%);
  margin:0 auto;
  padding:68px 0;
  display:grid;
  grid-template-columns:minmax(0,1fr) 300px;
  gap:70px;
  align-items:start;
}
.blog99Body>article{
  color:#494943;
  font:400 17px/1.95 Georgia,"Times New Roman",serif;
}
.blog99Lead{
  margin-bottom:30px;
  padding-bottom:22px;
  display:flex;
  flex-direction:column;
  gap:5px;
  border-bottom:1px solid #dfd5c8;
}
.blog99Lead span{
  color:#a57942;
  font:800 8px/1 Arial,sans-serif;
  letter-spacing:.16em;
}
.blog99Lead strong{
  color:#343431;
  font:600 10px/1.3 Arial,sans-serif;
}
.blog99Body>article p{margin-bottom:25px}
.blog99Body blockquote{
  margin:42px 0;
  padding:30px 34px;
  border-left:3px solid #b4864e;
  background:#efe5d8;
  color:#3d3933;
  font:500 26px/1.45 Georgia,"Times New Roman",serif;
}
.blog99Body aside{
  position:sticky;
  top:120px;
  padding:24px;
  border:1px solid #dfd4c6;
  border-radius:16px;
  background:#fffaf4;
  box-shadow:0 18px 40px rgba(71,52,31,.06);
}
.blog99Aside__brand{
  display:flex;
  align-items:center;
  gap:12px;
}
.blog99Aside__brand img{
  width:46px;
  height:46px;
  object-fit:contain;
}
.blog99Aside__brand span{
  display:flex;
  flex-direction:column;
  gap:3px;
}
.blog99Aside__brand strong{
  color:#2e2f2d;
  font:600 15px Georgia,"Times New Roman",serif;
}
.blog99Aside__brand small{
  color:#928a80;
  font-size:7px;
}
.blog99Body aside>p{
  margin:20px 0;
  color:#777068;
  font-size:9px;
  line-height:1.7;
}
.blog99Body aside>a{
  min-height:42px;
  padding:0 14px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  border-radius:10px;
  background:#a8793d;
  color:#fff;
  font-size:8px;
  font-weight:800;
}
.blog99Related{
  padding:58px 7% 80px;
  border-top:1px solid #e1d7ca;
}
.blog99Related__head span{
  color:#a87a40;
  font-size:8px;
  font-weight:800;
  letter-spacing:.15em;
}
.blog99Related__head h2{
  margin:8px 0 25px;
  font:500 35px Georgia,"Times New Roman",serif;
}
.blog99Related__grid{
  display:grid;
  grid-template-columns:repeat(3,minmax(0,1fr));
  gap:18px;
}
.blog99Related__grid>a{
  display:grid;
  grid-template-columns:125px 1fr;
  grid-template-rows:auto auto auto;
  gap:5px 15px;
  padding:12px;
  border:1px solid #ded4c7;
  border-radius:12px;
  background:rgba(255,255,255,.58);
}
.blog99Related__grid img{
  grid-row:1/4;
  width:125px;
  height:105px;
  object-fit:cover;
  border-radius:8px;
}
.blog99Related__grid span{
  color:#a27743;
  font-size:7px;
  font-weight:800;
}
.blog99Related__grid strong{
  color:#34332f;
  font:500 17px/1.15 Georgia,"Times New Roman",serif;
}
.blog99Related__grid small{
  color:#90877e;
  font-size:7px;
}

@media(max-width:1100px){
  .blog98Grid{grid-template-columns:repeat(2,minmax(0,1fr))}
  .blog98Featured{grid-template-columns:42% 58%}
  .blog99Body{grid-template-columns:minmax(0,1fr) 260px;gap:40px}
}
@media(max-width:760px){
  .blog98Hero{min-height:540px;padding:60px 7%}
  .blog98Hero__shade{background:linear-gradient(90deg,rgba(15,14,12,.9),rgba(15,14,12,.48))}
  .blog98Hero__copy h1{font-size:48px}
  .blog98Toolbar{align-items:flex-start;flex-direction:column}
  .blog98Categories{width:100%;overflow:auto;flex-wrap:nowrap;padding-bottom:3px}
  .blog98Categories button{flex:0 0 auto}
  .blog98Search{width:100%}
  .blog98Grid{grid-template-columns:1fr}
  .blog98Card__image{height:260px}
  .blog98Featured{grid-template-columns:1fr}
  .blog98Featured__copy{padding:36px 28px}
  .blog98Featured__image{min-height:310px}
  .blog99Hero{min-height:600px;padding:60px 6% 48px}
  .blog99Hero__copy h1{font-size:45px}
  .blog99Body{grid-template-columns:1fr;width:min(90%,760px);gap:35px}
  .blog99Body aside{position:relative;top:auto}
  .blog99Related__grid{grid-template-columns:1fr}
}
@media(max-width:520px){
  .blog98Content{padding-left:5%;padding-right:5%}
  .blog98Hero__copy h1{font-size:42px}
  .blog98Card__body{min-height:285px}
  .blog98Featured__copy h2{font-size:31px}
  .blog99Hero__copy h1{font-size:39px}
  .blog99Body>article{font-size:16px}
  .blog99Body blockquote{font-size:22px;padding:25px}
  .blog99Related__grid>a{grid-template-columns:100px 1fr}
  .blog99Related__grid img{width:100px;height:95px}
}

/* STEP100 — NO-CODE BLOG ADMIN */
.admin100Blog{display:grid;gap:16px}
.admin100Blog__head,
.admin100Blog__settings,
.admin100Blog__editor,
.admin100Blog__library{
  border:1px solid #e5dbcf;
  border-radius:19px;
  background:rgba(255,255,255,.92);
  box-shadow:0 15px 38px rgba(79,55,29,.05);
}
.admin100Blog__head{
  padding:24px 26px;
  display:flex;align-items:flex-end;justify-content:space-between;gap:20px;
}
.admin100Blog__head>div>span{color:#a77736;font-size:8px;font-weight:800;letter-spacing:.17em}
.admin100Blog__head h2{margin:7px 0 5px;color:#272b30;font:500 29px Georgia,"Times New Roman",serif}
.admin100Blog__head p{max-width:690px;color:#7e8388;font-size:9px;line-height:1.65}
.admin100Blog__head>button{
  min-height:40px;padding:0 14px;border:1px solid #dcc8ac;border-radius:11px;
  background:#fff9f0;color:#9c6e34;cursor:pointer;font-size:8px;font-weight:750;
}
.admin100Blog__loading{padding:70px 20px;text-align:center;border:1px dashed #dccdbc;border-radius:18px;background:#fbf8f4;color:#85898d;font-size:9px}
.admin100Blog__message{padding:12px 15px;border-radius:11px;font-size:8.5px}
.admin100Blog__message.is-success{border:1px solid #c9e6ce;background:#edf8ef;color:#3f7b49}
.admin100Blog__message.is-error{border:1px solid #efcfca;background:#fff1ef;color:#a64d47}
.admin100Blog__settings,.admin100Blog__editor,.admin100Blog__library{padding:23px}
.admin100Blog__sectionHead{display:flex;align-items:center;gap:13px;padding-bottom:17px;border-bottom:1px solid #eee5da}
.admin100Blog__sectionHead>span{
  width:38px;height:38px;display:grid;place-items:center;flex:0 0 38px;
  border:1px solid #dbc39f;border-radius:50%;background:#fbf6ee;color:#a77736;font-size:8px;font-weight:800;
}
.admin100Blog__sectionHead>div{display:flex;flex-direction:column;gap:4px}
.admin100Blog__sectionHead strong{color:#2b3035;font:500 18px Georgia,"Times New Roman",serif}
.admin100Blog__sectionHead small{color:#92979b;font-size:8px}
.admin100Blog__sectionHead .admin100Blog__cancel{margin-left:auto;padding:8px 11px;border:1px solid #e4cfc0;border-radius:9px;background:#fff7f2;color:#a25c3e;cursor:pointer;font-size:7.5px;font-weight:700}
.admin100Blog__settingsGrid{margin-top:18px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
.admin100Blog label{display:flex;flex-direction:column;gap:7px}
.admin100Blog label>span,.admin100Blog__imageBox>span{color:#777c81;font-size:8px;font-weight:750;letter-spacing:.035em}
.admin100Blog input,.admin100Blog textarea,.admin100Blog select{
  width:100%;border:1px solid #dfd5ca;border-radius:10px;background:#fbfaf8;color:#282d32;
  outline:none;padding:11px 12px;font-size:9px;line-height:1.55;
}
.admin100Blog input:focus,.admin100Blog textarea:focus,.admin100Blog select:focus{border-color:#b98747;box-shadow:0 0 0 3px rgba(185,135,71,.08)}
.admin100Blog textarea{resize:vertical}
.admin100Blog .is-wide{grid-column:1/-1}
.admin100Blog__goldButton{
  min-height:43px;margin-top:15px;padding:0 16px;border:1px solid #9d6e34;border-radius:10px;
  background:linear-gradient(135deg,#a77736,#bd8842);color:#fff;cursor:pointer;font-size:8px;font-weight:800;
}
.admin100Blog__editorGrid{margin-top:18px;display:grid;grid-template-columns:minmax(0,1fr) 310px;gap:20px;align-items:start}
.admin100Blog__fields{display:grid;gap:12px}
.admin100Blog__row{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.admin100Blog__check{
  min-height:43px;padding:0 12px;flex-direction:row!important;align-items:center!important;
  border:1px solid #e0d6ca;border-radius:10px;background:#fbfaf8;
}
.admin100Blog__check input{width:15px;height:15px;padding:0;accent-color:#a77736}
.admin100Blog__check span{font-size:8px!important}
.admin100Blog__imageBox{
  position:sticky;top:115px;padding:16px;border:1px solid #e2d7ca;border-radius:14px;background:#f8f3ec;
  display:grid;gap:11px;
}
.admin100Blog__preview{height:220px;overflow:hidden;border:1px solid #ded4c8;border-radius:11px;background:#eee7de}
.admin100Blog__preview img{width:100%;height:100%;object-fit:cover}
.admin100Blog__preview>div{width:100%;height:100%;display:grid;place-items:center;align-content:center;gap:8px;color:#aa9d8d}
.admin100Blog__preview p{font-size:8px!important}
.admin100Blog__upload{
  min-height:43px;display:flex!important;flex-direction:row!important;align-items:center!important;justify-content:center;gap:8px!important;
  border:1px solid #a77736;border-radius:10px;background:#a77736;color:#fff!important;cursor:pointer;font-size:8px;font-weight:800;
}
.admin100Blog__upload input{display:none}
.admin100Blog__imageBox>small{color:#9a9188;font-size:7px;text-align:center}
.admin100Blog__or{display:flex;align-items:center;gap:9px;color:#a09990;font-size:7px}
.admin100Blog__or span{height:1px;flex:1;background:#ddd1c3}
.admin100Blog__slug>div{display:flex;align-items:center;border:1px solid #dfd5ca;border-radius:10px;background:#fff;overflow:hidden}
.admin100Blog__slug b{padding-left:10px;color:#a77736;font-size:8px}
.admin100Blog__slug input{border:0!important;box-shadow:none!important;background:transparent}
.admin100Blog__publishBar{
  margin-top:20px;padding:17px 18px;display:flex;align-items:center;justify-content:space-between;gap:20px;
  border:1px solid #dfcfbb;border-radius:15px;background:linear-gradient(135deg,#fffaf3,#f2e5d3);
}
.admin100Blog__publishBar>div{display:flex;flex-direction:column;gap:4px}
.admin100Blog__publishBar strong{color:#2c3135;font:500 15px Georgia,"Times New Roman",serif}
.admin100Blog__publishBar span{color:#83878b;font-size:8px}
.admin100Blog__publishBar button{
  min-height:44px;padding:0 17px;display:flex;align-items:center;gap:9px;border:1px solid #986a32;border-radius:10px;
  background:linear-gradient(135deg,#9f7135,#bd8842);color:#fff;cursor:pointer;font-size:8px;font-weight:800;
}
.admin100Blog__list{margin-top:16px;display:grid;gap:10px}
.admin100Blog__list article{
  min-height:105px;padding:10px;display:grid;grid-template-columns:135px minmax(0,1fr) auto;gap:14px;align-items:center;
  border:1px solid #e6ddd3;border-radius:13px;background:#fbfaf8;
}
.admin100Blog__list article>img{width:135px;height:86px;object-fit:cover;border-radius:9px}
.admin100Blog__postCopy{min-width:0;display:flex;flex-direction:column;gap:7px}
.admin100Blog__postCopy>div{display:flex;align-items:center;gap:6px;flex-wrap:wrap}
.admin100Blog__postCopy>div span,.admin100Blog__postCopy>div b,.admin100Blog__postCopy>div em{
  padding:4px 7px;border-radius:999px;font-size:6px;font-style:normal;font-weight:800;letter-spacing:.04em;
}
.admin100Blog__postCopy>div span{background:#efe6dc;color:#755b3e}
.admin100Blog__postCopy>div b{background:#fff0d6;color:#9b651e}
.admin100Blog__postCopy>div em{background:#eaf5ec;color:#3e7d48}
.admin100Blog__postCopy>div em.is-draft{background:#f0f0ef;color:#777}
.admin100Blog__postCopy>strong{overflow:hidden;text-overflow:ellipsis;color:#303439;font:500 15px Georgia,"Times New Roman",serif}
.admin100Blog__postCopy>small{color:#95918c;font-size:7px}
.admin100Blog__actions{display:flex;flex-direction:column;gap:5px;min-width:92px}
.admin100Blog__actions button,.admin100Blog__actions a{
  min-height:27px;padding:0 8px;display:flex;align-items:center;justify-content:center;border:1px solid #ded2c4;border-radius:7px;
  background:#fff;color:#625b53;cursor:pointer;font-size:6.8px;font-weight:700;
}
.admin100Blog__actions .is-delete{border-color:#eccbc7;background:#fff2f0;color:#b45750}
.blog99NotFound{
  min-height:70vh;display:grid;place-items:center;align-content:center;gap:10px;padding:50px 20px;text-align:center;background:#f7f2eb;color:#2a2d30;
}
.blog99NotFound img{width:72px;height:72px;object-fit:contain}
.blog99NotFound>span{color:#a77736;font-size:8px;font-weight:800;letter-spacing:.17em}
.blog99NotFound h1{font:500 38px Georgia,"Times New Roman",serif}
.blog99NotFound p{color:#858078;font-size:10px}
.blog99NotFound a{margin-top:8px;padding:12px 18px;border-radius:999px;background:#a77736;color:#fff;font-size:8px;font-weight:800}
@media(max-width:950px){
  .admin100Blog__editorGrid{grid-template-columns:1fr}
  .admin100Blog__imageBox{position:relative;top:auto}
  .admin100Blog__list article{grid-template-columns:110px minmax(0,1fr)}
  .admin100Blog__list article>img{width:110px}
  .admin100Blog__actions{grid-column:1/-1;flex-direction:row;flex-wrap:wrap}
}
@media(max-width:650px){
  .admin100Blog__head,.admin100Blog__publishBar{align-items:flex-start;flex-direction:column}
  .admin100Blog__settingsGrid,.admin100Blog__row{grid-template-columns:1fr}
  .admin100Blog .is-wide{grid-column:auto}
  .admin100Blog__publishBar button,.admin100Blog__head>button{width:100%;justify-content:center}
  .admin100Blog__list article{grid-template-columns:1fr}
  .admin100Blog__list article>img{width:100%;height:180px}
}

/* STEP101 FIXED — HOMEPAGE VISUAL RHYTHM + BLOG ADMIN READABILITY */
.homeEditorialVisuals{
  width:min(1380px,90%);
  margin:42px auto 24px;
  display:grid;
  grid-template-columns:1.45fr .9fr;
  gap:16px;
}
.homeEditorialVisuals__portrait,
.homeEditorialVisuals__side article{
  position:relative;
  overflow:hidden;
  border-radius:18px;
  background:#e9e0d5;
  box-shadow:0 18px 48px rgba(83,59,31,.08);
}
.homeEditorialVisuals__portrait{min-height:410px}
.homeEditorialVisuals__portrait>img,
.homeEditorialVisuals__side article>img{
  width:100%;height:100%;object-fit:cover;display:block;
  transition:transform .65s cubic-bezier(.2,.72,.2,1);
}
.homeEditorialVisuals__portrait:hover>img,
.homeEditorialVisuals__side article:hover>img{transform:scale(1.025)}
.homeEditorialVisuals__portrait:after,
.homeEditorialVisuals__side article:after{
  content:"";position:absolute;inset:0;pointer-events:none;
  background:linear-gradient(180deg,transparent 45%,rgba(17,15,12,.72) 100%);
}
.homeEditorialVisuals__caption{
  position:absolute;z-index:2;left:28px;right:28px;bottom:26px;
  display:grid;gap:8px;color:#fff;
}
.homeEditorialVisuals__caption>span{font-size:9px;font-weight:800;letter-spacing:.17em;color:#e3b66f}
.homeEditorialVisuals__caption>strong{max-width:520px;font:500 29px/1.08 Georgia,"Times New Roman",serif}
.homeEditorialVisuals__caption>a{
  width:max-content;margin-top:4px;display:flex;align-items:center;gap:8px;
  color:#fff;font-size:9px;font-weight:750;
}
.homeEditorialVisuals__side{display:grid;grid-template-rows:1fr 1fr;gap:16px}
.homeEditorialVisuals__side article{min-height:197px}
.homeEditorialVisuals__side article>div{
  position:absolute;z-index:2;left:20px;right:20px;bottom:18px;
  display:flex;align-items:center;gap:10px;color:#fff;
}
.homeEditorialVisuals__side article>div span{
  width:29px;height:29px;display:grid;place-items:center;border-radius:50%;
  border:1px solid rgba(255,255,255,.55);font-size:7px;font-weight:800;
}
.homeEditorialVisuals__side article>div strong{font:500 18px Georgia,"Times New Roman",serif}

/* Blog admin — readable scale. This overrides only typography/spacing. */
.admin100Blog__head>div>span{font-size:11px!important}
.admin100Blog__head h2{font-size:34px!important}
.admin100Blog__head p{font-size:13px!important;line-height:1.65!important}
.admin100Blog__head>button{font-size:11px!important;min-height:44px!important;padding:0 17px!important}
.admin100Blog__message{font-size:12px!important;padding:14px 16px!important}
.admin100Blog__loading{font-size:13px!important}
.admin100Blog__sectionHead>span{font-size:10px!important;width:42px!important;height:42px!important;flex-basis:42px!important}
.admin100Blog__sectionHead strong{font-size:22px!important}
.admin100Blog__sectionHead small{font-size:11px!important;line-height:1.5!important}
.admin100Blog__sectionHead .admin100Blog__cancel{font-size:10px!important;padding:9px 12px!important}
.admin100Blog label>span,.admin100Blog__imageBox>span{font-size:11px!important;line-height:1.4!important}
.admin100Blog input,.admin100Blog textarea,.admin100Blog select{
  font-size:13px!important;line-height:1.6!important;padding:12px 13px!important;
}
.admin100Blog input,.admin100Blog select{min-height:45px!important}
.admin100Blog__goldButton{font-size:11px!important;min-height:46px!important}
.admin100Blog__check span{font-size:11px!important}
.admin100Blog__preview p{font-size:11px!important}
.admin100Blog__upload{font-size:11px!important;min-height:46px!important}
.admin100Blog__imageBox>small{font-size:10px!important;line-height:1.4!important}
.admin100Blog__or{font-size:10px!important}
.admin100Blog__slug b{font-size:11px!important}
.admin100Blog__publishBar strong{font-size:19px!important}
.admin100Blog__publishBar span{font-size:11px!important;line-height:1.45!important}
.admin100Blog__publishBar button{font-size:11px!important;min-height:47px!important;padding:0 19px!important}
.admin100Blog__list{gap:12px!important}
.admin100Blog__list article{
  min-height:132px!important;padding:14px!important;
  grid-template-columns:150px minmax(0,1fr) 118px!important;gap:18px!important;
}
.admin100Blog__list article>img{width:150px!important;height:102px!important}
.admin100Blog__postCopy{gap:9px!important}
.admin100Blog__postCopy>div span,
.admin100Blog__postCopy>div b,
.admin100Blog__postCopy>div em{font-size:9px!important;padding:5px 8px!important}
.admin100Blog__postCopy>strong{font-size:20px!important;line-height:1.15!important}
.admin100Blog__postCopy>small{font-size:10px!important;line-height:1.45!important}
.admin100Blog__actions{min-width:118px!important;gap:7px!important}
.admin100Blog__actions button,.admin100Blog__actions a{
  min-height:32px!important;padding:0 10px!important;font-size:9px!important;border-radius:8px!important;
}

@media(max-width:950px){
  .homeEditorialVisuals{grid-template-columns:1fr}
  .homeEditorialVisuals__side{grid-template-columns:1fr 1fr;grid-template-rows:none}
  .admin100Blog__list article{grid-template-columns:125px minmax(0,1fr)!important}
  .admin100Blog__list article>img{width:125px!important;height:95px!important}
  .admin100Blog__actions{grid-column:1/-1!important;flex-direction:row!important;flex-wrap:wrap!important}
}
@media(max-width:650px){
  .homeEditorialVisuals{width:90%;margin-top:28px}
  .homeEditorialVisuals__portrait{min-height:420px}
  .homeEditorialVisuals__side{grid-template-columns:1fr}
  .homeEditorialVisuals__side article{min-height:220px}
  .homeEditorialVisuals__caption{left:20px;right:20px;bottom:20px}
  .homeEditorialVisuals__caption>strong{font-size:25px}
  .admin100Blog__head h2{font-size:29px!important}
  .admin100Blog__settings,.admin100Blog__editor,.admin100Blog__library{padding:18px!important}
  .admin100Blog__list article{grid-template-columns:1fr!important}
  .admin100Blog__list article>img{width:100%!important;height:210px!important}
  .admin100Blog__postCopy>strong{font-size:19px!important}
}

`;

export default App;