import { Component, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Analytics } from "@vercel/analytics/react";
import heroSlide1 from "./assets/hero-slide-1.jpg";
// `hero-slide-2.jpg` eski projelerde her zaman bulunmadığından, blog görselini
// güvenilir bir yedek olarak kullanıyoruz. Böylece eksik eski dosya derlemeyi durdurmaz.
import heroSlide2 from "./assets/blog-cinema-01-reading-room.png";
import aboutPhoto from "./assets/kaan-about.jpg";
import servicesHeroRoom from "./assets/services-hero-room.jpg";
import processHeroDesk from "./assets/process-hero-desk.jpg";
import contentHeroMic from "./assets/content-hero-mic-clean.jpg";
import kaanOzkanLogo2026 from "./assets/kaan-ozkan-logo-2026.jpeg";
import kaanOzkanEmblem from "./assets/kaan-ozkan-emblem.png";
import serviceIndividualImage from "./assets/service-individual-therapy.jpg";
import serviceCoupleImage from "./assets/service-couple-consultation.jpg";
import serviceOnlineConsultationImage from "./assets/service-online-consultation.jpg";
import serviceSingleConsultationImage from "./assets/service-single-consultation-v1.png";
import servicePsychosocialImage from "./assets/service-psychosocial.jpg";
import serviceDivorceGriefImage from "./assets/service-divorce-grief.jpg";
import serviceIndividualCinemaV2 from "./assets/service-individual-cinema-v2.png";
import processCinemaV2 from "./assets/process-cinema-v2.png";
import processConsultationCinemaV3 from "./assets/process-consultation-cinema-v3.png";
import servicePsychosocialCinemaV2 from "./assets/service-psychosocial-cinema-v2.png";
import serviceGriefCinemaV2 from "./assets/service-grief-cinema-v2.png";
import processPracticeAbstractV2 from "./assets/process-practice-abstract-v2.png";
import servicePsychosocialFamilyV3 from "./assets/service-psychosocial-family-v3.png";
import servicesHeroCinemaV1 from "./assets/services-hero-cinema-v1.png";
import servicePsychosocialSupportV3 from "./assets/service-psychosocial-support-v3.png";
import serviceDivorceGriefCoupleV3 from "./assets/service-divorce-grief-couple-v3.png";
import contactHeroCinemaV1 from "./assets/contact-hero-cinema-v1.png";
import contactPhoneCinemaV1 from "./assets/contact-phone-cinema-v1.png";
import contactEmailCinemaV1 from "./assets/contact-email-cinema-v1.png";
import contactInstagramCinemaV1 from "./assets/contact-instagram-cinema-v1.png";
import contactAppointmentCinemaV1 from "./assets/contact-appointment-cinema-v1.png";
import appointmentSunlitThresholdV1 from "./assets/appointment-sunlit-threshold-v1.png";
import homeLightCinemaHero from "./assets/home-light-cinema-hero-v1.png";
import blogEditorialSunlit from "./assets/blog-editorial-sunlit-v1.png";
import blogEditorialConnection from "./assets/blog-editorial-connection-v1.png";
import adminIntroScene from "./assets/admin-intro-counseling-v1.png";
import blogCinemaReadingRoom from "./assets/blog-cinema-01-reading-room.png";
import blogCinemaStudio from "./assets/blog-cinema-02-studio.png";
import blogCinemaJournal from "./assets/blog-cinema-03-journal.png";
import blogCinemaGallery from "./assets/blog-cinema-04-gallery.png";
import { supabase } from "./supabase";
import Maintenance from "./Maintenance";
import SilentThresholdIntro from "./components/SilentThresholdIntro";

// Onaylanan açılış canlıda etkindir; localhost'ta ?intro=legacy ile karşılaştırılabilir.
const USE_SILENT_THRESHOLD_INTRO = !(import.meta.env.DEV && new URLSearchParams(window.location.search).get("intro") === "legacy");

const certificateMedia = import.meta.glob("./assets/certificates/*", { eager: true, import: "default" });
const certificateImage = (file) => certificateMedia[`./assets/certificates/${file}`];
const ABOUT_CERTIFICATES = [
  { file: "WhatsApp Image 2026-10-16 at 10.12.57.jpeg", title: "Aile Danışmanlığı", issuer: "İstanbul Aydın Üniversitesi", year: "2025", category: "Uzmanlık Eğitimi", featured: true },
  { file: "7.jpeg", title: "Otizm Farkındalık Eğitimi", issuer: "Yıldız Teknik Üniversitesi", year: "2024", category: "Çocuk & Aile", featured: true },
  { file: "18.jpeg", title: "Öfke Yönetimi", issuer: "Global Enstitü", year: "2026", category: "Kişisel Gelişim", featured: true },
  { file: "3.jpeg", title: "İnsan ve Sağlık Sempozyumu", issuer: "İstanbul Aydın Üniversitesi", year: "2017", category: "Akademik Katılım" },
  { file: "4.jpeg", title: "V. Sosyal Hizmet Öğrenci Kongresi", issuer: "Sosyal Hizmet Öğrenci Kongresi", year: "2019", category: "Akademik Katılım" },
  { file: "5.jpeg", title: "Kongre Teşekkür Belgesi", issuer: "V. Sosyal Hizmet Öğrenci Kongresi", year: "2019", category: "Akademik Katılım" },
  { file: "6.jpeg", title: "Erken Çocuklukta Drama Etkinlikleri", issuer: "Millî Eğitim Bakanlığı", year: "2024", category: "Çocuk & Aile" },
  { file: "8.jpeg", title: "Çocuklarda Mahremiyet Eğitimi", issuer: "Yıldız Teknik Üniversitesi", year: "2024", category: "Çocuk & Aile" },
  { file: "9.jpeg", title: "Afet ve Acil Durum Farkındalık", issuer: "Millî Eğitim Bakanlığı", year: "2024", category: "Psikososyal Destek" },
  { file: "10.jpeg", title: "Çocukla İletişim", issuer: "Millî Eğitim Bakanlığı", year: "2024", category: "Çocuk & Aile" },
  { file: "11.jpeg", title: "Türkiye Bağımlılıkla Mücadele Eğitimi", issuer: "Millî Eğitim Bakanlığı", year: "2015", category: "Psikososyal Destek" },
  { file: "12.jpeg", title: "Tütün, Alkol ve Madde Bağımlılığı", issuer: "Millî Eğitim Bakanlığı", year: "2024", category: "Psikososyal Destek" },
  { file: "13.jpeg", title: "Madde Bağımlılığı Farkındalık Eğitimi", issuer: "Millî Eğitim Bakanlığı", year: "2024", category: "Psikososyal Destek" },
  { file: "14.jpeg", title: "Gönüllülük ve Sosyal Sorumluluk", issuer: "Toplum Gönüllüleri Vakfı", year: "2024", category: "Sosyal Sorumluluk" },
  { file: "15.jpeg", title: "Proje Hazırlama Teknikleri", issuer: "Millî Eğitim Bakanlığı", year: "2025", category: "Mesleki Gelişim" },
  { file: "16.jpeg", title: "Kadının Güçlenmesi Çalıştayı", issuer: "Kırşehir Aile ve Sosyal Hizmetler", year: "2025", category: "Sosyal Sorumluluk" },
  { file: "17.jpeg", title: "Aile ve Dayanışma Çalıştayı", issuer: "Yurt-Ay-Der Kırşehir", year: "Katılım", category: "Aile Çalışmaları" },
  { file: "19.jpeg", title: "Öfke Kontrolü", issuer: "Global Enstitü", year: "2026", category: "Kişisel Gelişim" },
  { file: "20.jpeg", title: "Kişilik Analizi", issuer: "Global Enstitü", year: "2026", category: "Kişisel Gelişim" },
  { file: "21.jpeg", title: "Kişilik Analizi Eğitimi", issuer: "Global Enstitü", year: "2026", category: "Kişisel Gelişim" },
  { file: "WhatsApp Image 2026-10-16 at 10.12.58.jpeg", title: "III. Sosyal Hizmet Öğrenci Kongresi", issuer: "Sosyal Hizmet Öğrenci Kongresi", year: "2017", category: "Akademik Katılım" },
];

const PROFESSIONAL_CV = {
  summary: [
    "İstanbul Aydın Üniversitesi Sağlık Bilimleri Fakültesi Sosyal Hizmet Anabilim Dalı mezunuyum. Öğrencilik yıllarımda rehabilitasyon merkezleri, huzurevleri, sivil toplum kuruluşları ve vakıflarda gönüllü olarak saha deneyimi edindim.",
    "Asudem Yaşam ve Sağlık Merkezi, Toplum Gönüllüleri Vakfı, Sulukule Gönüllüleri Derneği, İstanbul Florya ÇODEM ve Kırşehir Aile, Çalışma ve Sosyal Hizmetler İl Müdürlüğü farklı sosyal hizmet uygulamalarını yakından tanıma fırsatı sundu.",
    "Mesleki yolculuğumda yerinde ev incelemesi, sosyal inceleme raporu hazırlama, ilk görüşme ve değerlendirme, vaka sonlandırma, güç odaklı yaklaşım ve baskı karşıtı uygulama başlıklarında aktif görev aldım."
  ],
  experience: [
    { year: "2023 —", title: "Sosyal Hizmet Uzmanı", place: "Kırşehir Belediyesi", text: "Sosyal yardım ve saha uygulamalarında aktif mesleki çalışma." },
    { year: "2021 — 2022", title: "Sağlık Asteğmen / Personel İşlem Subaylığı", place: "Kara Kuvvetleri Komutanlığı · Tunceli 4. Komando Tugayı", text: "Sağlık ve personel süreçlerinde görev deneyimi." },
    { year: "Saha deneyimi", title: "Sosyal Yardım Merkezi", place: "Kırşehir Belediyesi · Hayrevi", text: "Yerinde ev incelemesi, sosyal inceleme raporları, müracaatçı görüşmeleri ve güç odaklı sosyal hizmet uygulamaları." }
  ],
  education: { title: "Sosyal Hizmet", place: "İstanbul Aydın Üniversitesi · Sağlık Bilimleri Fakültesi", date: "Eylül 2016 — Haziran 2021" },
  activities: ["İstanbul Aydın Üniversitesi Sosyal Hizmet Kulübü Genel Sekreterliği", "İstanbul Aydın Üniversitesi Kulübü Başkan Yardımcılığı", "İstanbul Aydın Üniversitesi Kulüp Başkanlığı"],
  trainings: ["Amatör Telsizcilik Belgesi · Kıyı Emniyeti Genel Müdürlüğü · Şubat 2026", "Aile Danışmanlığı · İstanbul Aydın Üniversitesi · 450 saat · Aralık 2024", "Sosyal Hizmet Öğrenci Kongresi / Hapishanede Çocuk Olmak · TCPS · 2017", "Türkiye Bağımlılıkla Mücadele Eğitimi · Kırşehir Halk Eğitimi Merkezi · 2015—2016", "Afet ve Acil Durum Farkındalık Eğitimi · Hayat Boyu Öğrenme Genel Müdürlüğü · 2024", "Tütün, Alkol ve Madde Bağımlılığı · Hayat Boyu Öğrenme Genel Müdürlüğü · 2024", "Erken Çocuklukta Drama Etkinlikleri · Hayat Boyu Öğrenme Genel Müdürlüğü · 2024", "Madde Bağımlılığı Farkındalık Eğitimi · Hayat Boyu Öğrenme Genel Müdürlüğü · 2024", "Çocukla İletişim · Hayat Boyu Öğrenme Genel Müdürlüğü · 2024", "İnsan ve Sağlık Sempozyumu · İstanbul Aydın Üniversitesi · 2017", "III. Sosyal Hizmet Öğrenci Kongresi · Yıldız Teknik Üniversitesi · 2017", "V. Sosyal Hizmet Öğrenci Kongresi · Yıldız Teknik Üniversitesi · 2019", "Sosyal Hizmeti Yeniden Düşünmek · Kadıköy Belediyesi & Friedrich Ebert Stiftung", "EURIE / Eurasia Higher Education Summit · İstanbul Aydın Üniversitesi", "20 Kasım Dünya Çocuk Hakları Günü Semineri · Bakırköy Belediyesi Çocuk Hakları Zirvesi"],
  skills: ["Kentsel dönüşüm ve sosyal hizmet araştırmasında araştırmacı ve kulüp başkanı sunuculuğu", "Saha deneyimi kapsamında geliştirilmiş görüşme formu uygulaması", "Hak temelli sosyal hizmet uygulamaları ve dezavantajlı gruplarla çalışma", "Sulukule Gönüllüleri Derneği bünyesinde gönüllü stajyerlik", "Toplum Gönüllüleri Vakfı bünyesinde gönüllü faaliyetler"],
  interests: ["İleri derece sürüş teknikleri", "Makale okumak", "Amatör telsizcilik (C sınıfı)", "Tactical atıcılık"],
  links: [{ label: "Web Sayfası", value: "ailedanismanikaanozkan.com", href: "https://www.ailedanismanikaanozkan.com" }, { label: "Instagram", value: "@ailedanismanikaanozkan", href: "https://www.instagram.com/ailedanismanikaanozkan" }, { label: "Spotify Podcast", value: "Sosyal Hizmet Diyalogları", href: "https://open.spotify.com" }, { label: "LinkedIn", value: "Kaan Özkan", href: "https://www.linkedin.com/in/kaan-özkan-130b94206/" }]
};

// Randevu saatleri hem ziyaretçi formu hem de yönetim paneli tarafından kullanılır.
// Supabase tarafındaki get_public_appointment_slots fonksiyonu bu saatlerin açık/dolu
// durumunu güvenli biçimde döndürür.
const APPOINTMENT_WEEKDAY_TIMES = ["08:30", "09:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:30", "18:30", "19:30", "20:30", "21:30", "22:30", "23:30", "00:30"];
const APPOINTMENT_WEEKEND_TIMES = ["08:30", "09:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:30", "17:30", "18:30", "19:30", "20:30", "21:30", "22:30", "23:30", "00:30", "01:30", "02:30"];
const toCounselingLanguage = (value = "") => String(value)
  .replace(/psikoterapötik/gi, "danışmanlık odaklı")
  .replace(/psikoterapileri/gi, "psikososyal danışmanlık yaklaşımları")
  .replace(/psikoterapi/gi, "psikososyal danışmanlık")
  .replace(/terapist/gi, "uzman")
  .replace(/terapiler sonucu/gi, "danışmanlık sürecinde")
  .replace(/terapiler/gi, "danışmanlık görüşmeleri")
  .replace(/terapisine/gi, "danışmanlık sürecine")
  .replace(/terapisinin/gi, "danışmanlık sürecinin")
  .replace(/terapisinde/gi, "danışmanlık sürecinde")
  .replace(/terapisiyle/gi, "danışmanlıkla")
  .replace(/terapisi/gi, "danışmanlığı")
  .replace(/terapide/gi, "danışmanlıkta")
  .replace(/terapiden/gi, "danışmanlıktan")
  .replace(/terapiye/gi, "danışmanlığa")
  .replace(/terapinin/gi, "danışmanlığın")
  .replace(/terapiyi/gi, "danışmanlığı")
  .replace(/terapi/gi, "danışmanlık")
  .replace(/therapy/gi, "counseling")
  .replace(/(^|[.!?]\s+)(danışmanlık|psikososyal danışmanlık|uzman)/g, (match, prefix, word) => `${prefix}${word.charAt(0).toLocaleUpperCase("tr-TR")}${word.slice(1)}`);
const getAppointmentTimes = (date) => {
  const day = date ? new Date(`${date}T12:00:00`).getDay() : 1;
  return day === 0 || day === 6 ? APPOINTMENT_WEEKEND_TIMES : APPOINTMENT_WEEKDAY_TIMES;
};
const isDefaultAppointmentSlotOpen = (date, time) => {
  if (!date) return true;
  const day = new Date(`${date}T12:00:00`).getDay();
  // Hafta içi mesai sonrası; hafta sonu ise günün tüm standart saatleri açık.
  return day === 0 || day === 6 || ["18:30", "19:30", "20:30", "21:30", "22:30", "23:30", "00:30"].includes(time);
};

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
  testimonialsEyebrow: "DEĞERLİ YORUMLARINIZ",
  testimonialsTitle: "Paylaştığınız her deneyim bizim için kıymetli.",
  testimonialsDescription: "Danışanların süreç sonrasında sosyal medya ve mesaj yoluyla paylaştığı geri bildirimlerden bazıları.",
  testimonialsNote: "Paylaşımlar yalnızca açık izinle, kişiyi tanımlayabilecek ayrıntılar azaltılarak yayımlanır. Danışmanlık deneyimi ve sonuçları kişiden kişiye farklılık gösterebilir.",
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


const defaultBlogAuthors = [];

const defaultBlogContent = {
  heroEyebrow: "BLOG",
  heroTitle: "Bilgi, farkındalık",
  heroAccent: "ve güçlü yarınlar.",
  heroDescription:
    "Sosyal hizmet, psikososyal destek ve yaşamın farklı alanlarına dair güncel yazılar, rehberler ve içerikler.",
  heroImage:
    "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=2000&q=90",
  categories: blogCategories,
  authors: defaultBlogAuthors,
  posts: defaultBlogPosts.map((post, index) => ({
    ...post,
    id: post.slug,
    authorSlug: "",
    status: "published",
    featured: index === defaultBlogPosts.length - 1,
    sortOrder: index + 1,
  })),
};


const bilgeAkarPost20260831 = {
  "id": "bilge-akar-babalarda-dogum-sonrasi-depresyonu",
  "slug": "babalarda-dogum-sonrasi-depresyonu",
  "category": "AİLE & İLİŞKİLER",
  "date": "31 Ağustos 2026",
  "readTime": "20 dk okuma",
  "title": "BABALARDA DOĞUM SONRASI DEPRESYONU",
  "excerpt": "Doğum sonrası depresyonunun babalardaki yaygınlığı, belirleyicileri, aile ve çocuk üzerindeki yansımaları ile destek ve müdahale önerilerini ele alan kapsamlı bir inceleme.",
  "image": "/babalarda-dogum-sonrasi-depresyonu-kapak.jpeg",
  "body": [
    {
      "type": "heading",
      "text": "Giriş"
    },
    {
      "type": "paragraph",
      "text": "Dünya Sağlık Örgütü verilerine göre doğum sonrası depresyonunun, dünya genelinde en yaygın ruh sağlığı sorunlarından biri olacağı ve küresel çapta ikinci önde gelen engellilik nedeni haline geleceği tahmin edilmektedir (1). Tarihsel olarak doğum sonrası depresyonu genellikle anneler ile ilişkilendirilmiş olsa da son yıllarda bu durumun babalar üzerindeki olumsuz etkileri ve önemi giderek daha fazla kabul görmektedir (2,3,4). Erkekler doğum sürecinde kadınlarla aynı fizyolojik, anatomik ve hormonal değişimleri doğrudan yaşamasalar da hayatlarındaki bu radikal değişim ile birlikte özellikle yeni rolleri ve sorumlulukları çerçevesinde son derece önemli psikolojik değişiklikler yaşamaktadırlar (2)."
    },
    {
      "type": "paragraph",
      "text": "Bebek beklerken genellikle neşeli ve tatmin edici bir ebeveynlik yolculuğu hayal edilse de (5,6), gerçek hayatın getirdiği yeni sorumluluklar, uykusuzluk ve bebekle ilişki kurma çabası yeni ebeveynleri hazırlıksız yakalayabilmektedir (7). Sonuç olarak, ebeveynliğe geçiş dönemi birçok yeni baba için ebeveynlik yeteneklerinden şüphe duydukları, kendilerini yalnız ve desteksiz hissettikleri (8,9) oldukça zorlu bir kriz süreci haline gelebilmektedir. Babalıkta yaşanan bu psikolojik sıkıntılar ve sessizce taşınan yükler, zamanında fark edilmediğinde babalarda doğum sonrası depresyonunun gelişmesine zemin hazırlayabilmektedir. Bu yazıda da babalarda görülen doğum sonrası depresyonunun yaygınlığı, doğum sonrası depresyonunun babalardaki belirleyicileri, babalarda görülen doğum sonrası depresyonunun yansımaları ve babaların sorun ve ihtiyaçlarının giderilebilmesi için neler yapılması gerektiği üzerinde durulmuştur."
    },
    {
      "type": "heading",
      "text": "Babalarda Görülen Doğum Sonrası Depresyonunun Yaygınlığı"
    },
    {
      "type": "paragraph",
      "text": "Doğum sonrası depresyonu yalnızca annelere özgü bir durum değildir. Yapılan geniş çaplı araştırmalar babaların da bu süreçte ciddi bir risk altında olduğunu göstermektedir. 30'dan fazla ülkede 1 milyondan fazla katılımcı ile gerçekleştirilen kapsamlı bir meta-analiz, babaların da doğum sonrası depresyonu yaşadığını, prevalans (yaygınlık) oranlarının doğum öncesi dönemde %9,76 civarındayken doğum sonrasında %8,75'e kadar değiştiğini ve bu durumun bir yıldan fazla sürebildiğini ortaya koymuştur (10). Farklı epidemiyolojik veriler de yaklaşık her 10 babadan 1'inin (%10) doğum sonrasındaki ilk yıl içinde bu depresif süreci deneyimlediğini doğrulamaktadır (11). Bu oran, genel yetişkin erkek nüfusundaki majör depresyon yaygınlığının (%5) yaklaşık iki katıdır (12)."
    },
    {
      "type": "paragraph",
      "text": "Babalarda görülen doğum sonrası depresyonu oranları, çalışmalarda kullanılan ölçüm araçlarına (EPDS, Kessler-6, CES-D vb.), farklı kesme puanlarına, değerlendirme zamanlamalarına ve yerel sosyokültürel/ekonomik dinamiklere bağlı olarak dünya genelinde %1,2 ila %25,5 (bazı araştırmalarda %1,8 ile %55) gibi oldukça geniş bir yelpazede rapor edilmektedir (13,14,15,16). Örneğin, Amerika Birleşik Devletleri'nde babaların yaklaşık %5 ila %10'u (bazı ulusal örneklemlerde %10,3'ü) bu durumdan muzdariptir (17). Avustralya'da babaların %9,7'si ilk yılda psikolojik sıkıntı bildirmektedir (18). Brezilya'da babalardaki doğum sonrası depresyonu oranı %12, Çin'de ise doğumdan 8 hafta sonra %3,1 seviyesinde gözlenmiştir (19). Şili'de yapılan bir araştırma %18,5'lik bir yaygınlık bildirirken (10), İrlanda'da özellikle çalışan babalar arasında bu oran %19,4'e kadar yükselmektedir (20). Türkiye ve İsveç'te de babalarda görülen doğum sonrası depresyonunun yaygınlık oranları sırasıyla %1,8 ila %47 arasında değişmektedir (10)."
    },
    {
      "type": "paragraph",
      "text": "Annelerin aksine babalarda görülen doğum sonrası depresyonu annelerde görülen doğum sonrası depresyonundan daha kademeli olarak gelişme eğilimindedir. Doğum öncesi dönemde depresyon oranı doğumdan kısa bir süre sonra azalmakta ancak ilk yıl boyunca artmaktadır (21). Babalar açısından en çarpıcı istatistik ise partnerin durumuna bağlıdır. Eşi doğum sonrası depresyonu yaşayan babalarda depresif semptomların görülme sıklığı dramatik bir şekilde %24 ila %50 gibi çok yüksek seviyelerde olmaktadır (22)."
    },
    {
      "type": "heading",
      "text": "Doğum Sonrası Depresyonunun Babalardaki Belirleyicileri"
    },
    {
      "type": "paragraph",
      "text": "Babalarda doğum sonrası depresyonunun ortaya çıkışı tek bir nedene bağlı olmayıp, çok faktörlü bir yapıya sahiptir (2,23). Araştırmalar, bu durumu tetikleyen başlıca risk faktörlerini şu şekilde sınıflandırmaktadır (Şekil 1):"
    },
    {
      "type": "riskTable",
      "caption": "Şekil 1: Doğum Sonrası Depresyonunun Babalardaki Belirleyicileri",
      "columns": [
        {
          "title": "BİREYSEL & BİYOLOJİK BELİRLEYİCİLER",
          "items": [
            "Geçmiş Ruh Sağlığı Öyküsü",
            "Hormonal Değişiklikler",
            "Kronik Uyku Bozuklukları"
          ]
        },
        {
          "title": "AİLEVİ & İLİŞKİSEL BELİRLEYİCİLER",
          "items": [
            "Maternal Depresyon",
            "Evlilik Sorunları",
            "Perinatal ve Bebekle İlgili Faktörler"
          ]
        },
        {
          "title": "SOSYO-EKONOMİK & KÜLTÜREL BELİRLEYİCİLER",
          "items": [
            "İşsizlik ve Maddi Kaygılar",
            "Sosyal Destek Eksikliği",
            "“Erkeklik” Rolünün Yarattığı Stres"
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "text": "Babalardaki doğum sonrası depresyonunun en güçlü ve en tutarlı belirleyicisi eşin depresyonda olmasıdır (13,24,25,26). Eşleri doğum sonrası depresyonu yaşayan babaların, eşleri depresyonda olmayan babalara kıyasla doğum sonrasındaki ilk haftalarda depresyona girme riski tam 2,5 kat daha fazladır (27). Babalarda daha önce yaşanmış bir depresyon öyküsü (28,29) ve psikiyatrik tedavi geçmişi (30,31) de doğum sonrası dönemde depresif semptomların gelişmesindeki en kuvvetli risk faktörüdür. Cui ve arkadaşları (32) ve Chhabra ve arkadaşları (33) tarafından yürütülen çalışmalarda da evlilik ile ilgili sorunlar diğerlerinin yanı sıra bir risk faktörü olarak tanımlanmaktadır. Evlilik ilişkisindeki çatışmalardaki artış, babalarda görülen doğum sonrası depresyonunu 5 kat artırmaktadır."
    },
    {
      "type": "paragraph",
      "text": "Yeni bir bebeğin getirdiği ek ekonomik yükler altındayken yaşanan işsizlik (34) ve düşük gelir düzeyi (35) gibi istihdam kaygıları babalarda ağır strese yol açabilmektedir. İşsiz babalarda depresyon görülme riski, çalışan babalara kıyasla 6 kat daha fazladır (35). Sosyal destek eksikliği de babalar arasında doğum sonrası depresyonunun önemli bir belirleyicisidir (36,37). Söz konusu bu sosyal destek eksikliği, babaların deneyimledikleri stresin artmasına, başa çıkma mekanizmalarının azalmasına ve izolasyon duygularına yol açabilmektedir (38,39)."
    },
    {
      "type": "paragraph",
      "text": "Erkekler doğum yapmasa da babalığa geçişte hormonal dalgalanmalar yaşamaktadırlar. Bebekle bağ kurmayı kolaylaştıran testosterondaki düşüş ile östrojen, kortizol, vazopressin ve prolaktindeki artışlar, aynı zamanda babayı klinik depresyon semptomlarına karşı hassaslaştırabilmektedir (21). Bebeğin gece uyanmaları ve bakım ihtiyaçları nedeniyle yaşanan uykusuzluk ve bozulan sirkadiyen ritimler (40) de babalarda depresyon riskini artırmaktadır."
    },
    {
      "type": "paragraph",
      "text": "Toplumun erkekten beklediği \"güçlü görünme ve kırılganlık göstermeme” gibi geleneksel roller erkeklerin yardım isteme davranışlarını engelleyebilmektedir (41). Bu durum da babaların ruh sağlıklarına olumsuz yansıyabilmektedir. Tüm bu faktörlerin yanı sıra planlanmamış gebelikler (31,42,43), travmatik veya acil sezaryen doğum deneyimleri (44), emzirme problemleri (44,45) ve bebeğin teselli edilemeyen zor mizaçlı yapısı (sürekli ağlama) (45) da babalardaki stresi dramatik şekilde tetikleyen diğer unsurlardır."
    },
    {
      "type": "heading",
      "text": "Babalarda Görülen Doğum Sonrası Depresyonunun Yansımaları"
    },
    {
      "type": "paragraph",
      "text": "Doğum sonrası depresyonu yalnızca babayı etkileyen bir ruh sağlığı sorunu değildir. Aile sistemleri teorisine göre (46), bir aile üyesini etkileyen her durum doğrudan ya da dolaylı olarak tüm üyeleri ve ilişkileri etkilemektedir (22). Babalarda görülen doğum sonrası depresyonunun yarattığı zincirleme etkiler şu şekildedir (Şekil 2):"
    },
    {
      "type": "impactDiagram",
      "caption": "Şekil 2: Babalarda Görülen Doğum Sonrası Depresyonunun Yansımaları",
      "items": [
        "BABA",
        "ANNE",
        "BEBEK",
        "AİLE"
      ]
    },
    {
      "type": "heading",
      "text": "Babadaki Etkileri"
    },
    {
      "type": "paragraph",
      "text": "Depresyon yaşayan babalarda ciddi düzeyde değersizlik hissi, anhedoni (hiçbir şeyden keyif alamama), kronik yorgunluk ve karar verme güçlüğü görülebilmektedir (47). Daha da endişe verici olanı, doğum sonrası depresyonu yaşayan babaların yaklaşık %11'i intihar veya hem kendilerine hem de bebeklerine zarar verme gibi son derece utanç ve suçluluk uyandıran dürtüsel düşüncelerle baş etmek zorunda kalabilmektedir (45). Ayrıca, babalar istenmeyen olumsuz duygularını artan madde kötüye kullanımı ve kaçışçı eğilimler de dahil olmak üzere uyumsuz başa çıkma mekanizmaları (48) yoluyla dışsallaştırabilmektedir (49,50). Bu uyumsuz başa çıkma yöntemleri, babayı ve diğerlerini tehlikeye atarak, zaten stresli olan bir ebeveynlik geçişi dönemine daha fazla gerginlik katmaktadır (51)."
    },
    {
      "type": "heading",
      "text": "İlişki ve Eş Üzerindeki Etkileri"
    },
    {
      "type": "paragraph",
      "text": "Babalarda görülen doğum sonrası depresyonu, ilişki memnuniyetinin azalması (3,26,52), yakınlık eksikliği ve cinsel sorunlar gibi evlilik sorunları (53) ile ilişkilendirilmektedir. Ayrıca ayrılık veya boşanmayı da beraberinde getirebilmektedir (54). Söz konusu depresyon, öfke, düşmanlık, güvensizlik (55,56) ve yakın partner şiddeti (57) ile karakterize edilen partnerler arasındaki bozulmuş kişilerarası etkileşimlerle de ilişkilidir. Bu etkileşimli özellikler, annelerin depresyon semptomlarını daha da zorlaştırabilmektedir (58). Depresif olmayan erkeklerle karşılaştırıldığında, depresif babalar partnerleriyle etkileşimlerde daha az olumlu ve öfkeli ifadelerden daha fazla yararlanmaktadırlar. Bu da depresif semptomatoloji, itme gibi orta derecede fiziksel saldırganlık ve şiddetli saldırganlık gösterme olasılığını artırmaktadır (59). Babalar normalde anneler için en kritik destek kaynağı olarak görülmektedir. Ancak kendileri depresyonda olduğunda eşlerine bu desteği sunamamaktadırlar. Bu durum, annenin doğum sonrası depresyonunun sürmesine ve depresif ataklarının nüksetmesine yol açabilmekte ve her iki ebeveynin de aynı anda depresif olma riskini beraberinde getirebilmektedir (45)."
    },
    {
      "type": "heading",
      "text": "Bebekle Bağ Kurma ve Ebeveynlik Davranışlarına Etkisi"
    },
    {
      "type": "paragraph",
      "text": "Depresyon, babanın bebeği ile sağlıklı bir güvenli bağlanma geliştirmesini engelleyebilmektedir (21). Depresif babalar bebeklerine karşı daha az sıcaklık ve ilgi gösterirken, daha fazla psikolojik kontrol sergilemekte (60) ve okuma-oyun gibi gelişimsel faaliyetlere neredeyse hiç katılmamaktadırlar (61). Bebeklerinin ağlamaları karşısında yoğun bir yetersizlik ve güçsüzlük hissi yaşayarak ebeveynlikten tamamen vazgeçebilmekte veya bebeğe karşı öfke, kızgınlık ve nefret geliştirebilmektedirler (45)."
    },
    {
      "type": "heading",
      "text": "Çocuk Gelişimi Üzerindeki Uzun Vadeli Etkileri"
    },
    {
      "type": "paragraph",
      "text": "Babanın doğum sonrası depresyonu yaşaması, çocukların duygusal, sosyal ve bilişsel gelişimi üzerinde uzun vadeli etkiler bırakabilmektedir. Örneğin, babası depresif olan çocukların, babası sağlıklı olan akranlarına kıyasla 7 yaşına kadar herhangi bir ruhsal bozukluk yaşama olasılığı tam iki kat fazladır (29). Babanın doğum sonrası depresyonu yaşaması aynı zamanda, aşırı bebek ağlaması (62,63,64) çocukların duygusal ve davranışsal gelişimindeki sorunlar (29,63) ve dil gelişimi (61) dahil olmak üzere zor çocuk mizacına da yol açabilmektedir. Bebeklik döneminde ebeveynlerin depresyonu nedeniyle maruz kalınan tepkisiz ve kaotik ortam, bebekte stres hormonu olan kortizolün kronik olarak yükselmesine neden olabilmektedir (65). Bu durum, bebeğin fizyolojik büyümesini ve bağışıklık sistemini zayıflatmakla kalmamakta (66) aynı zamanda yaşam boyu duygu düzenlemede kritik rol oynayan orbitofrontal korteksin sağlıklı olgunlaşmasını da engelleyebilmektedir (67). Depresyon veya başka bir ruh sağlığı sorunu olan bir babayla yaşayan çocukların duygusal veya davranışsal sorunlar geliştirme riski %33 ila %70 oranında artmaktadır (68) Baba depresyonundaki artışlar ayrıca 0 ila 4 yaş arasındaki çocuklarda artan saldırganlıkla da ilişkilidir (69). Baba depresyonu aynı zamanda 4 ve 5 yaşındaki çocuklarda davranışsal, duygusal ve sosyal gelişimdeki gecikmelerle pozitif olarak ilişkili görülmektedir (70). Bunlara ek olarak, babalarda görülen doğum sonrası depresyonunun en kritik boyutu ise, dengeli tutumlar sergilemeyen depresif bir babanın varlığı, çocuk istismarı ve bebek cinayeti (infantisid) risklerini de artırabilmektedir (21)."
    },
    {
      "type": "heading",
      "text": "Sonuç ve Öneriler"
    },
    {
      "type": "paragraph",
      "text": "Babalarda görülen doğum sonrası depresyonu, sadece babaların kendilerini değil, tüm aileyi ve gelecek nesilleri tehdit eden kritik bir halk sağlığı sorunu olarak karşımıza çıkmaktadır. Bu doğrultuda, babalara ihtiyaç duydukları desteği sunabilmek adına şu adımların atılması gerekmektedir:"
    },
    {
      "type": "recommendation",
      "number": 1,
      "text": "Babalara Özel Rutin Tarama Araçlarının Geliştirilmesi: Mevcut klinik tarama testleri erkeklerde depresif semptomları yakalamada yetersiz kalabilmektedir. Babaların doğum öncesi ve sonrası süreçlerde ruh sağlığı profesyonelleri tarafından rutin olarak ve erkeklere duyarlı ölçekler ile ruh sağlığı taramasından geçirilmesi gerekmektedir."
    },
    {
      "type": "recommendation",
      "number": 2,
      "text": "Aile Merkezli ve Çift Odaklı Müdahaleler: Sağlık sistemi sadece anneyi odak noktası yapan geleneksel yaklaşımdan sıyrılarak, her iki ebeveyni de kapsayan aile merkezli bir bakım modelini benimsemelidir. Eşlerin gebelik sürecinden itibaren birlikte katılacağı psikoeğitim programları, ortak ebeveynlik eğitimleri ve çift terapileri, çiftler arasındaki desteği artırarak evlilik memnuniyetsizliği ve karşılıklı depresyon riskini büyük ölçüde hafifletecektir."
    },
    {
      "type": "recommendation",
      "number": 3,
      "text": "Ücretli Babalık İzni ve Esnek Çalışma Politikaları: Devlet düzeyinde ve çalışma kültüründe köklü değişiklikler yapılmalıdır. Çünkü babalık izni gibi toplumdan gelen destek, babaların doğum sonrası dönemdeki değişikliklere uyum sağlamalarına yardımcı olacaktır (21). Örneğin, İsveç'te babaları babalık izni haklarını kullanmaya teşvik etmek için babalık izni politikasında değişiklikler yapılmıştır (71). “Baba kotası” uygulaması ile baba izni için 450 günlük ebeveyn izni arasında 30 gün ayrılmaktadır. Bu, babaların babalık izni için 30 gün kullanmadıklarında, ebeveyn izni günlerini kaybedileceği anlamına gelmektedir. İsveç'teki babaların “baba kotasına” ek olarak, ailelerine evde destek olmak için 10 günlük babalık izni ve ödeneği de vardır. Bu ebeveyn izni, bir çocuk 18 aylık olana kadar herhangi bir zamanda kullanılabilmektedir. Söz konusu bu durumların, aile yaşamına olumlu yansıyacağı değerlendirilmektedir."
    },
    {
      "type": "recommendation",
      "number": 4,
      "text": "Akran Destek Ağlarının Kurulması: Babaların ebeveynlik stresini, çaresizlik hissini ve izolasyon duygularını azaltmak amacıyla “babadan babaya” akran destek grupları kurulmalıdır (72,73). Benzer süreçlerden geçen diğer babalarla güvenli bir ortamda konuşabilmenin babaların deneyimledikleri yalnızlık hislerinin azaltılmasına ve durumlarının normalleştirilmesine yardımcı olacağı düşünülmektedir."
    },
    {
      "type": "recommendation",
      "number": 5,
      "text": "Sağlık Profesyonellerinin Kapsamlı Eğitimi: Doğum kliniklerinde görev yapan profesyoneller babanın perinatal dönemdeki rolü ve ruh sağlığı riskleri konusunda eğitilmelidir. Sağlık çalışanlarının babaları sürece dahil etmesi (74), onların ebeveynlik becerileri edinmelerini kolaylaştıracak ve “kenara atılmışlık” hissini ortadan kaldıracaktır (51)."
    },
    {
      "type": "recommendation",
      "number": 6,
      "text": "Toplumsal Farkındalık ve Damgalama (Stigma) ile Mücadele: Erkeklerin ruh sağlığı sorunları yaşayabileceği gerçeği topluma anlatılmalı, erkeklerin zayıflıklarını gizlemek zorunda hissettikleri geleneksel kalıplar ve toplumsal baskılar ile mücadele edilmelidir. Babaların yardım aramaları teşvik edilmeli ve hissettikleri duyguların anormal olmadığı, tedavi edilebilir tıbbi bir süreç olduğu vurgulanmalıdır."
    },
    {
      "type": "heading",
      "text": "Kaynakça"
    },
    {
      "type": "references",
      "items": [
        "Dois, A., Uribe, C., Villarroel, L., & Contreras, A. (2012). Factores de riesgo asociados a síntomas depresivos post parto en mujeres de bajo riesgo obstétrico atendidas en el sistema público. Revista Médica de CChile, 140(6), 719-725.",
        "Pérez, F., & Brahm, P. (2017). Depresión posparto en padres: por qué también es importante? Revista Chilena de Pediatría, 88(5), 582-585.",
        "Bielawska‐Batorowicz, E., & Kossakowska‐Petrycka, K. (2006). Depressive mood in men after the birth of their offspring in relation to a partner's depression, social support, fathers' personality and prenatal expectations. Journal of Reproductive and Infant Psychology, 24(1), 21-29.",
        "Garfield, C. F., & Isacco, A. (2009). Urban fathers' role in maternal postpartum mental health. Fathering, 7(3), 286.",
        "Davis, K. D. M., Lu, L., Williams, B., Roas-Gomez, M. V., Leziak, K., Jackson, J., ... & Yee, L. M. (2022). The stress of parenting in the postpartum period during the COVID-19 pandemic. Women's Health Reports, 3(1), whr-2022.",
        "Nyström, K., & Öhrling, K. (2004). Parenthood experiences during the child's first year: literature review. Journal of Advanced Nursing, 46(3), 319-330.",
        "Rodriguez, A., & Adamsons, K. (2012). Parenting expectations: Younger and older first-time parents. Marriage & Family Review, 48(3), 248-271.",
        "Lévesque, S., Bisson, V., Charton, L., & Fernet, M. (2020). Parenting and relational well-being during the transition to parenthood: Challenges for first-time parents. Journal of Child and Family Studies, 29(7), 1938-1956.",
        "Sanders, R., Lehmann, J., & Gardner, F. (2022). Parents’ emotional responses to early parenthood. Journal of Family Issues, 43(7), 1874-1897.",
        "Caparros-Gonzalez, R. A., Romero-Gonzalez, B., & Peralta-Ramirez, M. I. (2018). Depresión posparto, un problema de salud pública mundial. Revista Panamericana de Salud Pública, 42, e97.",
        "Rao W. W., Zhu X.-M., Zong Q. Q., Zhang Q., Hall B. J., Ungvari G. S., & Xiang Y. T. (2020). Prevalence of prenatal and postpartum depression in fathers: A comprehensive meta-analysis of observational surveys. Journal of Affective Disorders, 263, 491–499.",
        "Kessler, R. C., Berglund, P., Demler, O., Jin, R., Koretz, D., Merikangas, K. R., ... & Wang, P. S. (2003). The epidemiology of major depressive disorder: results from the National Comorbidity Survey Replication (NCS-R). Jama, 289(23), 3095-3105.",
        "Soliday, E., McCluskey-Fawcett, K., & O'Brien, M. (1999). Postpartum affect and depressive symptoms in mothers and fathers. American Journal of Orthopsychiatry, 69(1), 30.",
        "Pinheiro, R. T., Magalhães, P. V. S., Horta, B. L., Pinheiro, K. A. T., Da Silva, R. A., & Pinto, R. H. (2006). Is paternal postpartum depression associated with maternal postpartum depression? Population‐based study in Brazil. Acta Psychiatrica Scandinavica, 113(3), 230-232.",
        "Gjerdingen, D. K., & Center, B. A. (2003). First-time parents’ prenatal to postpartum changes in health, and the relation of postpartum health to work and partner characteristics. The Journal of the American Board of Family Practice, 16(4), 304-311.",
        "Quinlivan, J. A., & Condon, J. (2005). Anxiety and depression in fathers in teenage pregnancy. Australian & New Zealand Journal of Psychiatry, 39(10), 915-920.",
        "Centers for Disease Control and Prevention. (n.d.). Depression among women. Retrieved from http://www.cdc.gov/reproductivehealth/depression/",
        "Giallo, R., D'Esposito, F., Cooklin, A., Mensah, F., Lucas, N., Wade, C., & Nicholson, J. M. (2013). Psychosocial risk factors associated with fathers' mental health in the postnatal period: Results from a population-based study. Social Psychiatry and Psychiatric Epidemiology, 48, 563–573.",
        "Lai, B. P., Tang, A. K., Lee, D. T., Yip, A. S., & Chung, T. K. (2010). Detecting postnatal depression in Chinese men: a comparison of three instruments. Psychiatry Research, 180(2-3), 80-85.",
        "Philpott, L. F., & Corcoran, P. (2018). Paternal postnatal depression in Ireland: Prevalence and associated factors. Midwifery, 56, 121-127.",
        "Kim, P., & Swain, J. E. (2007). Sad dads: paternal postpartum depression. Psychiatry, 4(2), 35.",
        "Goodman, J. H. (2004). Paternal postpartum depression, its relationship to maternal postpartum depression, and implications for family health. Journal of Advanced Nursing, 45(1), 26-35.",
        "Baldoni, F., & Ceccarelli, L. (2010). La depressione perinatale paterna. Una rassegna della ricerca clinica ed empirica. Infanzia e Adolescenza, 9(2), 79-92.",
        "Deater-Deckard, K., Pickering, K., Dunn, J.F., & Golding, J. (1998). Family structure and depressive symptoms in men preceding and following the birth of a child. Am J Psychiatry, 155(6), 818–823.",
        "Ballard, C.G., Davis, R., Cullen, P.C., et al. (1994). Prevalence of postnatal psychiatric morbidity in mothers and fathers. Br J Psychiatry, 164(6), 782–788.",
        "Dudley, M., Roy, K., Kelk, N., & Bernard, D. (2001). Psychological correlates of depression in fathers and mothers in the first postnatal year. J Reproduc Infant Psychol, 19(3), 187–202.",
        "Matthey, S., Barnett, B., Ungerer, J., & Waters, B. (2000). Paternal and maternal depressed mood during the transition to parenthood. Journal of Affective Disorders, 60(2), 75-85.",
        "Areias, M. E. G., Kumar, R., Barros, H., & Figueiredo, E. (1996). Correlates of postnatal depression in mothers and fathers. The British Journal of Psychiatry, 169(1), 36-41.",
        "Ramchandani, P. G., Stein, A., O'CONNOR, T. G., Heron, J. O. N., Murray, L., & Evans, J. (2008). Depression in men in the postnatal period and later child psychopathology: a population cohort study. Journal of the American Academy of Child & Adolescent Psychiatry, 47(4), 390-398.",
        "Suto, M., Isogai, E., Mizutani, F., Kakee, N., Misago, C., & Takehara, K. (2016). Prevalence and factors associated with postpartum depression in fathers: A regional, longitudinal study in Japan. Research in nursing & health, 39(4), 253-262.",
        "Nishimura, A., & Ohashi, K. (2010). Risk factors of paternal depression in the early postnatal period in Japan. Nursing & Health Sciences, 12(2), 170-176.",
        "Cui, Y., Deng, Y., Zhou, B., Zeng, Y., & Cheng, A.S. (2020). Prevalence and Factors Associated with Male Postnatal Depression in China. J. Men’s Health, 17, 22–27.",
        "Chhabra, J., Li, W., & McDermott, B. (2022). Predictive Factors for Depression and Anxiety in Men During the Perinatal Period: A Mixed Methods Study. Am. J. Men’s Health, 16, 155798832210794.",
        "Roubinov, D. S., Luecken, L. J., Crnic, K. A., & Gonzales, N. A. (2014). Postnatal depression in Mexican American fathers: Demographic, cultural, and familial predictors. Journal of Affective Disorders, 154, 360–368.",
        "Ansari, N. S., Shah, J., Dennis, C. L., & Shah, P. S. (2021). Risk factors for postpartum depressive symptoms among fathers: A systematic review and meta‐analysis. Acta Obstetricia et Gynecologica Scandinavica, 100(7), 1186-1199.",
        "Mao, Q., Zhu, L.X., Su, X.Y. (2011). A comparison of postnatal depression and related factors between Chinese new mothers and fathers. J Clin Nurs, 20, 645-652.",
        "Gao, L.L., Chan, S.W.C., & Mao, Q. (2009). Depression, perceived stress, and social support among first-time Chinese mothers and fathers in the postpartum period. Res Nurs Heal, 32, 50-58.",
        "Cameron, E. E., Sedov, I. D., & Tomfohr-Madsen, L. M. (2016). Prevalence of paternal depression in pregnancy and the postpartum: An updated meta-analysis. Journal of Affective Disorders, 206, 189–203.",
        "Leung, B. M., Letourneau, Y., N. L., Giesbrecht, G. F., Ntanda, N., Hart, M., & A. T. The, A. T. (2017). Predictors of postpartum depression in partnered mothers and fathers from a longitudinal cohort. Community Mental Health Journal, 53(4), 420–431.",
        "Gallaher, K. G. H., Slyepchenko, A., Frey, B. N., Urstad, K., & Dørheim, S. K. (2018). The role of circadian rhythms in postpartum sleep and mood. Sleep Medicine Clinics, 13(3), 359-374.",
        "Álvarez-García, P., García-Fernández, R., Martín-Vázquez, C., Calvo-Ayuso, N., & Quiroga-Sánchez, E. (2024). Postpartum depression in fathers: A systematic review. Journal of Clinical Medicine, 13(10), 2949.",
        "Gao, L. L., Chan, S. W. C., & Mao, Q. (2009). Depression, perceived stress, and social support among first‐time Chinese mothers and fathers in the postpartum period. Research in Nursing & Health, 32(1), 50-58.",
        "Koh, Y. W., Chui, C. Y., Tang, C. S. K., & Lee, A. M. (2014). The prevalence and risk factors of paternal depression from the antenatal to the postpartum period and the relationships between antenatal and postpartum depression among fathers in Hong Kong. Depression Research and Treatment, 2014(1), 127632.",
        "Pedersen, S. C., Maindal, H. T., & Ryom, K. (2021). “I wanted to be there as a father, but I couldn’t”: A qualitative study of fathers’ experiences of postpartum depression and their help-seeking behavior. American Journal of Men's Health, 15(3), 15579883211024375.",
        "Richardson, T. N., Graf, M. D., Hicks, L., & Caiola, C. (2025). “Whispered on Only the Darkest Corners of the Internet:”: A Qualitative Descriptive Study Exploring Fathers’ Experiences with Paternal Postpartum Depression on Reddit. Global Qualitative Nursing Research, 12, 23333936251374618.",
        "Klein D. M., & White J. M. (1995). Family Theories: An Introduction. Sage, Thousand Oaks, CA.",
        "American Psychiatric Association. (2022). Diagnostic and statistical manual of mental disorders (5th ed., Text rev.; DSM-5-TR). American Psychiatric Publishing.",
        "Gentile, S., & Fusco, M. L. (2017). Untreated perinatal paternal depression: Effects on offspring. Psychiatry Research, 252, 325-332.",
        "Domoney, J., Trevillion, K., & Challacombe, F. L. (2020). Developing an intervention for paternal perinatal depression: An international Delphi study. Journal of Affective Disorders Reports, 2, 100033.",
        "Psouni, E., Agebjörn, J., & Linder, H. (2017). Symptoms of depression in Swedish fathers in the postnatal period and development of a screening tool. Scandinavian Journal of Psychology, 58(6), 485-496.",
        "Chua, J. Y. X., Chan, Y. H., & Shorey, S. (2024). Development of the Paternal Involvement in Early Infancy Scale (PEACE) for fathers in Singapore. Journal of Pediatric Nursing, 79, 213-224.",
        "Buist, A., Morse, C. A., & Durkin, S. (2002). Men's adjustment to fatherhood: Implications for obstetric health care. Journal of Obstetric, Gynecologic, and Neonatal Nursing, 32(2), 172–180.",
        "Meighan, M., Davis, M. W., Thomas, S. P., & Droppleman, P. G. (1999). Living with postpartum depression: The father's experience. The American Journal of Maternal/Child Nursing, 24(4), 202–208.",
        "Sayers, C., Kohn, C., Fresco, D., Bellack, A., & Sarwer, D. (2001). Marital cognitions and depression in the context of marital discord. Cognitive Therapy and Research, 25(6), 713–732.",
        "Feldbau-Kohn, S., Heyman, R. E., & O′Leary, K. D. (1998). Major depressive disorder and depressive symptomatology as predictors of husband to wife physical aggression. Violence and Victims, 13(4), 347–360.",
        "Kahn, J., Coyne, J., & Margolin, G. (1985). Depression and marital disagreement: The social construction of despair. Journal of Social and Personal Relations, 2, 447–461.",
        "Vaeth, P. A., Ramisetty-Mikler, S., & Caetano, R. (2010). Depression among couples in the United States in the context of intimate partner violence. Journal of Interpersonal Violence, 25(5), 771–790.",
        "Cohen, M., Schei, B., Ansara, D., Gallop, R., Stuckless, N., & Stewart, D. (2002). A history of personal violence and postpartum depression: Is there a link? Archive of Women's Mental Health, 4(3), 83–92.",
        "Pan, H. S., Neidig, P. H., & O′Leary, K. D. (1994). Predicting mild and severe husband-to-wife physical aggression. Journal of Consulting and Clinical Psychology, 62(5), 975–981.",
        "Cummings, E. M., Keller, P. S., & Davies, P. T. (2005). Towards a family process model of maternal and paternal depressive symptoms: Exploring multiple relations with child and family functioning. Journal of Child Psychology & Psychiatry, 46(5), 479–489.",
        "Paulson, J. F., Keefe, H. A., & Leiferman, J. A. (2009). Early parental depression and child language development. Journal of Child Psychology & Psychiatry, 50(3), 254–262.",
        "Hanington, L., Ramchandani, P., & Stein, A. (2010). Parental depression and child temperament: Assessing child to parent effects in a longitudinal population study. Infant Behavior & Development, 33, 88–95.",
        "Kvalevaag, A. L., Ramchandani, P. G., Hove, O., Assmus, J., Eberhard-Gran, M., & Biringer, E. (2013). Paternal mental health and socioemotional and behavioral development in their children. Pediatrics, 131, e463–e469.",
        "Perren, S., von Wyl, A., Burgin, D., Simoni, H., & von Klitzing, K. (2005). Depressive symptoms and psychosocial stress across the transition to parenthood: Associations with parental psychopathology and child difficulty. Journal of Psychosomatic Obstetrics and Gynaecology, 26, 173–183.",
        "Cicchetti, D., & Rogosch, F. A. (2001). Diverse patterns of neuroendocrine activity in maltreated children. Development and Psychopathology, 13(3), 677-693.",
        "Federenko, I. S., & Wadhwa, P. D. (2004). Women's mental health during pregnancy influences fetal and infant developmental and health outcomes. CNS Spectrums, 9(3), 198-206.",
        "Schore, A. N. (2005). Back to basics: Attachment, affect regulation, and the developing right brain: Linking developmental neuroscience to pediatrics. Pediatrics in Review, 26(6), 204-217.",
        "Weitzman, M., Rosenthal, D. G., & Liu, Y. H. (2011). Paternal depressive symptoms and child behavioral or emotional problems in the United States. Pediatrics, 128(6), 1126-1134.",
        "Narayanan, M.K., & Naerde, A. (2016). Associations between maternal and paternal depressive symptoms and early child behavior problems: testing a mutually adjusted prospective longitudinal model. J Affect Disord, 196, 181–189.",
        "Fletcher, R. J., Feeman, E., Garfield, C., & Vimpani, G. (2011). The effects of early paternal depression on children's development. Medical Journal of Australia, 195(11-12), 685-689.",
        "Kozorovitskiy, Y., Hughes, M., Lee, K., & Gould, E. (2006). Fatherhood affects dendritic spines and vasopressin V1a receptors in the primate prefrontal cortex. Nature Neuroscience, 9(9), 1094-1095.",
        "Habib, C. (2012). Paternal perinatal depression: An overview and suggestions towards an intervention model. Journal of Family Studies, 18(1), 4-16.",
        "Kumar, S. V., Oliffe, J. L., & Kelly, M. T. (2018). Promoting postpartum mental health in fathers: recommendations for nurse practitioners. American Journal of Men's Health, 12(2), 221-228.",
        "Rodríguez-Muñoz, M.F., Olivares, M.E., Izquierdo, N., Soto, C., & Huynh-Nhu, L. (2016). Prevención de La Depresión Perinatal. Clin Salud, 27, 97–99."
      ]
    }
  ],
  "quote": "",
  "status": "published",
  "featured": false,
  "sortOrder": 999999,
  "authorSlug": "",
  "sourceAuthorName": "Bilge AKAR"
};

const erkekRuhSagligiPost20260920 = {
  "id": "erkek-ruh-sagligi-ve-yardim-arama-20260920",
  "slug": "erkek-ruh-sagligi-ve-yardim-arama",
  "category": "PSİKOSOSYAL DESTEK",
  "date": "20 Eylül 2026",
  "readTime": "15 dk okuma",
  "title": "ERKEK RUH SAĞLIĞI VE YARDIM ARAMA: ENGELLER VE ÇÖZÜM YOLLARI",
  "excerpt": "Erkeklerin ruh sağlığı sorunlarında profesyonel yardım aramasını etkileyen toplumsal, psikososyal, ekonomik ve hizmet düzeyindeki engelleri; yardım aramayı kolaylaştıran yaklaşımlar ve çözüm yollarıyla birlikte ele alan kapsamlı bir inceleme.",
  "image": heroSlide2,
  "body": [
    {
      "type": "heading",
      "text": "Giriş"
    },
    {
      "type": "paragraph",
      "text": "Yardım arama, bir bireyin karşılaştığı zorluklar kendi başa çıkma kaynaklarını aştığında tetiklenen (1), farkındalık, sorun tanıma ve sorunu tanımlamayla başlayan kasıtlı (2,3) bir başa çıkma mekanizmasıdır (1). Ancak dünya genelindeki araştırmalar, ruh sağlığı sorunu yaşayan bireylerin profesyonel destek alma konusunda sıklıkla isteksiz olduğunu ve özellikle de erkeklerin tüm demografik gruplar arasında yardım arama olasılığı en düşük kitleyi oluşturduğunu göstermektedir (4,5,6,7,8). Örneğin Türkiye'de yapılan bir çalışma da son 12 ayda ruh sağlığı desteğine ihtiyaç duyduğunu belirten kadınların %91'inin yardım aradığını, erkeklerde ise bu oranın yalnızca %9 seviyesinde kaldığını ortaya koymaktadır (9)."
    },
    {
      "type": "paragraph",
      "text": "Yardım arama oranlarındaki bu düşüklük, ciddi bir halk sağlığı krizini beraberinde getirmektedir. Tamamlanmış intiharların %75’inden fazlası erkekler tarafından gerçekleştirilmektedir (10). Bu durum Türkiye istatistiklerinde de benzer şekilde, erkeklerde kadınlara kıyasla yaklaşık 2 kat daha yüksek intihar oranlarıyla kendini göstermektedir (11). Ayrıca erkekler, yaşadıkları psikolojik sıkıntıları doğrudan ifade etmek yerine çoğunlukla alkol ve madde bağımlılığı ve agresif davranışlar (5,7,12,13,14,15) gibi dolaylı yollarla dışa vurmaktadır. Bu durum, tanı sürecini etkileyerek erkeklerin deneyimledikleri ruh sağlığı sorunlarının yanlış teşhis edilmesine veya hiç teşhis edilmemesine neden olabilmektedir (16,17,18). Dolayısıyla başkalarından destek alamama, erkeklerin ruh sağlığı sorunlarının ele alınmadığı ve genellikle zaman içinde kötüleştiği bir kısır döngü yaratmaktadır (19). Erkek ruh sağlığında yaşanan bu tablonun temel nedenlerini anlamak toplumsal engelleri, psikososyal dinamikleri ve çözüme yönelik kolaylaştırıcı faktörleri incelemeyi gerektirmektedir. Bundan sonraki bölümde yardım aramayı engelleyen ve kolaylaştıran faktörler üzerinde durulmuştur."
    },
    {
      "type": "heading",
      "text": "Yardım Aramayı Engelleyen ve Kolaylaştıran Faktörler"
    },
    {
      "type": "riskTable",
      "caption": "Tablo 1: Yardım aramayı engelleyen ve kolaylaştıran faktörler",
      "columns": [
        {
          "title": "ENGELLER",
          "items": [
            "Hegemonik Erkeklik Normları",
            "Algılanan Toplumsal ve Öz Damgalanma",
            "Düşük Ruh Sağlığı Okuryazarlığı ve İletişim Engelleri",
            "İşlevsel Olmayan Başa Çıkma Stratejileri",
            "Yapısal, Ekonomik ve Hizmet Düzeyindeki Yetersizlikler"
          ]
        },
        {
          "title": "KOLAYLAŞTIRICILAR",
          "items": [
            "Pozitif Erkeklik ve Güç Temelli Yaklaşımlar",
            "“Erkek Dostu” ve Doğrudan İletişim Kampanyaları",
            "Eyleme ve Birlikteliğe Dayalı Destek Modelleri",
            "Kişiselleştirilmiş, Kontrol Veren ve Anonim Destekler"
          ]
        }
      ]
    },
    {
      "type": "heading",
      "text": "1. Yardım Aramanın Önündeki Engeller"
    },
    {
      "type": "recommendation",
      "text": "Hegemonik Erkeklik Normları: Toplumun erkeklere yüklediği “sert olma, dayanıklılık, duygusal kısıtlayıcılık ve kendine güven (kendi kendine yetme)” gibi beklentileri yardım arama davranışının önündeki en belirgin engeldir (15,20,21,22,23). Yardım istemek, genellikle erkekliğin toplumsal beklentileriyle uyumsuz olarak algılanmaktadır. Nitekim birçok erkek, utanç duygusu ya da zayıf olarak algılanma korkusu nedeniyle profesyonel ruh sağlığı hizmetleri aramaktan kaçınmaktadır (20,24,25,26,27,28,29). Ramaeker ve Petrie’nin (30) çalışmasında da kırılganlığı kabul etmenin erkeklik algılarıyla çeliştiği ve bunun bireylerin sosyal izolasyonlarını ve psikolojik sıkıntılarını daha da şiddetlendirdiği bulunmuştur."
    },
    {
      "type": "recommendation",
      "text": "Algılanan Toplumsal ve Öz Damgalanma: Psikolojik destek almanın akran grubu veya toplum tarafından etiketlenme, alay edilme ve reddedilmeyle sonuçlanacağı korkusu son derece yaygındır (20). Toplumsal damgalanmanın birey tarafından içselleştirilmesiyle oluşan öz damgalanma, erkeklerin kendini değersiz hissetmesine (31) neden olarak yardım aramamasına yol açabilmektedir."
    },
    {
      "type": "recommendation",
      "text": "Düşük Ruh Sağlığı Okuryazarlığı ve İletişim Engelleri: Duyguların inkârı ve düşük ruh sağlığı okuryazarlığı da genellikle yardım aramamaya neden olabilmektedir (32,33,34). Sıkıntıyı yorumlama, yönetme ve iletme ile ilgili sorunlar, Biddle ve arkadaşları (5) tarafından belirtildiği gibi erkeklerin bir kaçınma döngüsüne yakalanmasını beraberinde getirebilmektedir. Başka bir ifadeyle, erkekler arasında sıkıntıları baskılama, sorunu küçümseme ve ancak kontrolü tamamen kaybetme veya “dibe vurma” (hitting rock bottom) noktasında yardım arama döngüsü sıklıkla gözlemlenmektedir (35)."
    },
    {
      "type": "recommendation",
      "text": "İşlevsel Olmayan Başa Çıkma Stratejileri: Duyguları ve acıyı uyuşturmak amacıyla alkol/madde kullanımı ve agresif tutumlar (5,7,14,15,20) gibi davranışlar geleneksel erkeklik kültüründe kabul gören ancak sorunu daha da derinleştiren kaçış mekanizmalarıdır."
    },
    {
      "type": "recommendation",
      "text": "Yapısal, Ekonomik ve Hizmet Düzeyindeki Yetersizlikler: Psikoterapi ve danışmanlık gibi psikiyatrik ilaç tedavisinin kapsamında olmayan ruh sağlığı hizmetleri çoğunlukla özel kurumlar tarafından sunulmaktadır (36). Bu durum, işsizlik ve yoksulluk gibi ekonomik sorunlar yaşayan ve ailesinin geçimini sağlama yönündeki geleneksel erkeklik rolünün baskısı altında olan erkeklerin bu hizmetlere erişimini zorlaştırmaktadır (35). Gizlilik ihlali kaygıları (37), ruh sağlığı uzmanları (38) ve ilaç tedavisi hakkındaki olumsuz algılar (39) ve “erkek dostu” olmayan hizmet tasarımları da söz konusu hizmetlere erişimin önünde bir engel olarak değerlendirilmektedir (40,41)."
    },
    {
      "type": "heading",
      "text": "2. Yardım Aramayı Kolaylaştıran Faktörler"
    },
    {
      "type": "recommendation",
      "text": "Pozitif Erkeklik ve Güç Temelli Yaklaşımlar: Erkekliği olumsuzlamak yerine erkeklerin ruh sağlıklarını ve refahlarını desteklemek için esnek norm ve değerlerin geliştirilmesi gerekmektedir (41,42). Alternatif olarak, erkekleri erkekliklerinin adaptif ve sağlıklı yönlerini belirlemede desteklemeyi ve tedavinin erkeklerin ihtiyaçlarını karşılayacak şekilde nasıl uyarlanabileceğine odaklanmayı amaçlayan güç temelli bir “pozitif erkeklik” modeli önerilmektedir (41,43). Örneğin, kendine güven, erkeklerde duygusal başa çıkmayı kolaylaştırabilmektedir (41)."
    },
    {
      "type": "recommendation",
      "text": "“Erkek Dostu” ve Doğrudan İletişim Kampanyaları: Erkeklerin yaşamlarıyla alakalı (sosyal medya, oyun web siteleri, maçlar vb.) ve onları temsil eden doğrudan, olumlu ve çözüm odaklı bir dil kullanan kampanyalar farkındalık yaratmada oldukça etkilidir. İlgili kamu figürlerini kullanmak, profesyonel yardım arayışını erkeklik kimliğine dahil etmeye yardımcı olabilmekte ve yardım aramanın sorunlarla başa çıkmak için bir strateji olduğu mesajını pekiştirebilmektedir (20)."
    },
    {
      "type": "recommendation",
      "text": "Eyleme ve Birlikteliğe Dayalı Destek Modelleri: Toplum düzeyinde, erkeklerin sağlığını ve iyi oluşunu geliştirmeye yönelik müdahalelerin erkekleri sürece dahil etmede etkili olabileceğine ilişkin kanıtlar giderek artmaktadır. Bu müdahalelerin etkili olabilmesi için toplum üyelerinin müdahalelerin tasarlanması ve uygulanmasına dahil edilmesi ve çalışmaların yerel olarak değer verilen erkeklik normlarına dayandırılması önem taşımaktadır (44,45,46). Örneğin birçok ülkede, sosyal olarak izole olan ve ruhsal hastalık açısından hassas durumdaki yaşlı erkekler, “Men’s Shed/Erkekler Kulübesi” girişiminden yararlanmıştır. Bu girişimde erkekler arası dayanışma, birlikte bir şeyler yapma (örneğin marangozluk) ve birbirlerini dolaylı biçimde destekleme ön plandadır. Destek, yüz yüze olmaktan ziyade “omuz omuza” bir etkileşim biçimi üzerinden sağlanmaktadır (47)."
    },
    {
      "type": "recommendation",
      "text": "Kişiselleştirilmiş, Kontrol Veren ve Anonim Destekler: Tedavinin ortak karar verme ve kontrolü içerecek şekilde uyarlanması da erkeklerin tedavileri ve iyileşmeleri üzerinde bir kontrol duygusunu sürdürmelerine olanak tanıyabilmektedir (43,48). Bu da erkeklerin yardım arama davranışlarını kolaylaştırabilmektedir. Erkekler aynı zamanda arama motorları aracılığıyla çevrimiçi desteğe erişimi diğer yöntemlere tercih etmektedir (49,50). Erkekler bunu bağımsız olmanın ve kendi sorunlarını çözmenin bir yolu olarak görmektedirler (50)."
    },
    {
      "type": "heading",
      "text": "Sonuç ve Öneriler"
    },
    {
      "type": "paragraph",
      "text": "Erkeklerin ruh sağlığı sorunları için yardım aramakta isteksiz kalması, bireysel bir tercihten ziyade sosyokültürel faktörlerin, geleneksel toplumsal cinsiyet kalıplarının ve hizmet sunumundaki yetersizliklerin bir sonucu olarak değerlendirilmektedir. Erkek ruh sağlığında yaşanan bu krizi aşmak ve erken müdahale imkanlarını artırmak için şu somut adımlar atılmalıdır:"
    },
    {
      "type": "recommendation",
      "text": "Söylem ve Dil Değişimi: Yardım arama eylemi bir zayıflık değil, kişisel güçlenme stratejisi olarak yeniden çerçevelenmelidir."
    },
    {
      "type": "recommendation",
      "text": "Kültürel ve Toplumsal Cinsiyete Duyarlı Hizmet Tasarımı: Ruh sağlığı ve sosyal hizmet sunumlarında erkeklerin ihtiyaçlarına uygun, eylem odaklı, özerkliği koruyan ve toplumsal cinsiyete duyarlı müdahale modelleri geliştirilmelidir."
    },
    {
      "type": "recommendation",
      "text": "Erken Yaşta Okuryazarlık ve Eğitimin Güçlendirilmesi: Okul müfredatlarına ruh sağlığı okuryazarlığı dahil edilmeli, erkek çocukların duygusal ifade ve yardım arama becerileri küçük yaşlardan itibaren desteklenmelidir."
    },
    {
      "type": "recommendation",
      "text": "Toplumsal ve Gayri Resmi Destek Ağlarının Yaygınlaştırılması: Akran desteğini besleyen topluluk projeleri (Men's Shed benzeri yapılar) teşvik edilmeli, öğretmenler, mentörler ve gençlik çalışanları erken uyarı ve yönlendirme süreçlerine dahil edilmelidir."
    },
    {
      "type": "heading",
      "text": "KAYNAKÇA"
    },
    {
      "type": "references",
      "items": [
        "Chan M. E. (2013). Antecedents of instrumental interpersonal help-seeking: An integrative review. Applied Psychology, 62, 571-596.",
        "Cornally N., McCarthy G. (2011). Help-seeking behaviour: A concept analysis. International Journal of Nursing Practice, 17, 280-288.",
        "Rickwood D., Deane F. P., Wilson C. J., Ciarrochi J. (2005). Young people’s help-seeking for mental health problems. Australian e-Journal for the Advancement of Mental Health, 4, 218-251.",
        "Barney L. J., Griffiths K. M., Jorm A. F., Christensen H. (2006). Stigma about depression and its impact on help-seeking intentions. Australian and New Zealand Journal of Psychiatry, 40, 51-54.",
        "Biddle L., Donovan J., Sharp D., Gunnell D. (2007). Explaining non-help-seeking amongst young adults with mental distress: A dynamic interpretive model of illness behaviour. Sociology of Health & Illness, 29, 983-1002.",
        "Biddle L., Gunnell D., Sharp D., Donovan J. L. (2004). Factors influencing help seeking in mentally distressed young adults: A cross-sectional survey. British Journal of General Practice, 54, 248-253.",
        "Mackenzie C. S., Gekoski W. L., Knox V. J. (2006). Age, gender, and the underutilization of mental health services: The influence of help-seeking attitudes. Aging & Mental Health, 10, 574-582.",
        "Nam S. K., Chu H. J., Lee M. K., Lee J. H., Kim N., Lee S. M. (2010). A meta-analysis of gender differences in attitudes toward seeking professional psychological help. Journal of American College Health, 59, 110-116.",
        "Ministry of Health of the Republic of Türkiye, General Directorate of Health Services, Department of Research, Development and Health Technology Assessment. (2025, February 19). Turkey Mental Health Profile-2 Results Report.",
        "Australian Bureau of Statistics. (2022). Causes of Death, Australia, 2020.",
        "World Health Organization. (2026). Erişim tarihi, 14 Eylül 2026. Erişim adresi, https://www.who.int/data/gho/data/themes/mental-health/suicide-rates",
        "Doornbos M. M., Zandee G. L., Bjelland C. (2024). Men’s mental health–Conceptualization, effects, and coping. Archives of Psychiatric Nursing, 50, 100–107.",
        "Scott J. (2018). Gender role conflict, traditional masculinity ideology, and help-seeking experiences of substance dependent men: A mixed methods study [Doctoral dissertation, University of Saskatchewan].",
        "Cleary A. (2012). Suicidal action, emotional expression, and the performance of masculinities. Social Science & Medicine, 74, 498-505.",
        "Möller-Leimkühler A. M. (2003). The gender gap in suicide and premature death or: Why are men so vulnerable? European Archives of Psychiatry and Clinical Neuroscience, 253, 1-8.",
        "Mahalik, J. R., & Rochlen, A. B. (2006). Men’s likely responses to clinical depression: What are they and do masculinity norms predict them? Sex roles, 55(9), 659-667.",
        "Ross, C. E., & Mirowsky, J. (1984). Men who cry. Social Psychology Quarterly, 138-146.",
        "Salk, R. H., Hyde, J. S., & Abramson, L. Y. (2017). Gender differences in depression in representative national samples: Meta-analyses of diagnoses and symptoms. Psychological Bulletin, 143(8), 783.",
        "Mokhwelepa, L. W., & Sumbane, G. O. (2025). Men’s mental health matters: the impact of traditional masculinity norms on men’s willingness to seek mental health support; a systematic review of literature. American Journal of Men's Health, 19(3), 15579883251321670.",
        "Lynch, L., Long, M., & Moorhead, A. (2018). Young men, help-seeking, and mental health services: Exploring barriers and solutions. American Journal of Men's Health, 12(1), 138-149.",
        "Garrett, M. F., Cutrer-Párraga, E. A., Allen, G. K., Young, E. L., Urbina, K. J., & Hull, I. M. (2025). “It Would Ruin My Life”: Pacific Islander Male Adolescents’ Perceptions of Mental Health Help-Seeking—An Interpretative Phenomenological Analysis Focus Group Study. International Journal of Environmental Research and Public Health, 22(1), 62.",
        "Topkaya, N. (2014). Gender, Self-stigma, and Public Stigma in Predicting Attitudes toward Psychological Help-seeking. Educ Sci Theor Pract, 14(2), 480-487.",
        "Vogel, D. L., Edwards, S. R., Hammer, J. H., & Hubbard, A. (2011). “Boys don’t cry”: Examination of the links between endorsement of masculine norms, self-stigma, and help-seeking attitudes for men from diverse backgrounds. J Couns Psychol, 58(3), 368–382.",
        "Emslie C., Ridge D., Ziebland S., Hunt K. (2006). Men’s accounts of depression: Reconstructing or resisting hegemonic masculinity? Social Science & Medicine, 62(9), 2246–2257.",
        "Gulliver A., Griffiths K. M., Christensen H. (2012). Barriers and facilitators to mental health help-seeking for young elite athletes: A qualitative study. BMC Psychiatry, 12, 1–14.",
        "Lysova A., Hanson K., Dixon L., Douglas E. M., Hines D. A., Celi E. M. (2022). Internal and external barriers to help seeking: Voices of men who experienced abuse in the intimate relationships. International Journal of Offender Therapy and Comparative Criminology, 66(5), 538–559.",
        "McKenzie S. K., Collings S., Jenkin G., River J. (2018). Masculinity, social connectedness, and mental health: Men’s diverse patterns of practice. American Journal of Men’s Health, 12(5), 1247–1261.",
        "Oliffe J. L., Broom A., Rossnagel E., Kelly M. T., Affleck W., Rice S. M. (2020). Help-seeking prior to male suicide: Bereaved men perspectives. Social Science & Medicine, 261, 113173.",
        "Wiggins A. Y. (2024). Addressing stigma and help-seeking barriers for men. In Bates D. (Ed.), Mental health counseling for men: Practical strategies and effective engagement (pp. 1–22). IGI Global.",
        "Ramaeker J., Petrie T. A. (2019). “Man up!”: Exploring intersections of sport participation, masculinity, psychological distress, and help-seeking attitudes and intentions. Psychology of Men & Masculinities, 20(4), 515.",
        "Kim, S., & Kim, D. (2025). Mental health help-seeking among Korean men: the influence of stigma, masculine norms, and face. BMC psychology, 13(1), 461.",
        "Hernan A., Philpot B., Edmonds A., Reddy P. (2010). Healthy minds for country youth: Help-seeking for depression among rural adolescents. Australian Journal of Rural Health, 18, 118-124.",
        "Rickwood D., Deane F. P., Wilson C. J. (2007). When and how do young people seek professional help for mental health problems? Medical Journal of Australia, 187, S35-S39.",
        "Wilson C. J., & Deane F. P. (2001). Adolescent opinions about reducing help-seeking barriers and increasing appropriate help engagement. Journal of Educational and Psychological Consultation, 12, 345-364.",
        "Akçay, S., Akar, B., & Köse, Ö. (2026). “We Don't Stay Where We Feel Weak”: Experiences of Men Discontinuing Mental Health Services in Türkiye. Journal of Marital and Family Therapy, 52(2), e70126.",
        "RUSİHAK. (2008). Akıl ve ruh sağlığı alanında insan hakları: 2018 Türkiye raporu sorunlar ve çözüm önerileri. Karika Matbaacılık.",
        "van der Schyff, E. L., Amon, K. L., Ridout, B., Forsyth, R., & Campbell, A. J. (2023). Mental health help-seeking behavior of male video game players: an online survey. Cyberpsychol Behav Soc Netw, 26(9), 717–723.",
        "Ellis, L. A., Collin, P., Hurley, P. J., Davenport, T. A., Burns, J. M., & Hickie, I. B. (2013). Young men’s attitudes and behaviour in relation to mental health and technology: implications for the development of online mental health services. BMC Psychiatry, 13(1), 119.",
        "Brown, J. S. L., Sagar-Ouriaghli, I., & Sullivan, L. (2019). Help-seeking among men for mental health problems. In: Barry JA, Kingerlee R, Seager M, Sullivan L (eds) The Palgrave handbook of male psychology and mental health. Springer International Publishing, pp 397–415.",
        "Seidler, Z. E., Dawes, A. J., Rice, S. M., Oliffe, J. L., & Dhillon, H. M. (2016). The role of masculinity in men’s help-seeking for depression: a systematic review. Clin Psychol Rev, 49, 106–118.",
        "Englar-Carlson, M., & Kiselica, M. S. (2013). Affirming the strengths in men: A positive masculinity approach to assisting male clients. Journal of Counseling & Development, 91(4), 399–409.",
        "Wilson, M., Gwyther, K., Swann, R., Casey, K., Featherston, R., Oliffe, J. L., Englar-Carlson, M., & Rice, S. M. (2022). Operationalizing positive masculinity: A theoretical synthesis and school-based framework to engage boys and young men. Health Promotion International, 37(1), 1-15.",
        "Seidler, Z. E., Rice, S. M., River, J., Oliffe, J. L., & Dhillon, H. M. (2018). Men’s mental health services: The case for a masculinities model. The Journal of Men’s Studies, 26(1), 92–104.",
        "Костенко, M. A. (2013). Psychosocial assistance to men of working age in the context of sociodemographic policy: statement on the context of the problem. Социальная интеграция и развитие этнокультур в евразийском пространстве. 1, 153–157 (in Russian).",
        "Robertson, S., Gough, B., Hanna, E., Raine, G., Robinson, M., Seims, A. et al. (2018). Successful mental health promotion with men: evidence from “tacit knowledge”. Health Prom Int, 33(2), 334–344.",
        "Рахлина, E. B. (2017). Psychological work with men who use violence in close relationships. Experience of a psychologist of the Saint Petersburg publically funded organization “Stork” Centre for Social Assistance to Family and Children of the Pushkin District. Социальное обслуживание семей и детей: научно- методический сборник. Вып. 11: Социальная работа с мужчинами, 11, 108–122 (in Russian).",
        "Robertson, S. (2007). Understanding men and health: masculinities, identity and well-being. Maidenhead: Open University Press.",
        "Rice, S., Telford, N., Rickwood, D. J., & Parker, A. (2018). Young men’s access to community-based mental health care: Qualitative analysis of barriers and facilitators. Journal of Mental Health (Abingdon, England), 27(1), 59–65.",
        "Best, P., Gil-Rodriguez, E., Manktelow, R., & Taylor, B. J. (2016). Seeking help from everyone and no-one: conceptualizing the online help-seeking process among adolescent males. Qual Health Res, 26(8),1067–1077.",
        "Ellis, L. A., Collin, P., Hurley, P. J., Davenport, T. A., Burns, J. M., & Hickie, I. B. (2013). Young men’s attitudes and behaviour in relation to mental health and technology: implications for the development of online mental health services. BMC Psychiatry, 13(1), 119."
      ]
    }
  ],
  "quote": "",
  "status": "published",
  "featured": true,
  "sortOrder": 999998,
  "authorSlug": "",
  "sourceAuthorName": ""
};

const normalizeAuthorName = (value = "") =>
  String(value)
    .toLocaleLowerCase("tr-TR")
    .replace(/\s+/g, " ")
    .trim();

const mergeBilgeAkarArticle = (content) => {
  const next = {
    ...defaultBlogContent,
    ...(content || {}),
    posts: Array.isArray(content?.posts) ? content.posts : defaultBlogContent.posts,
    categories: Array.isArray(content?.categories) ? content.categories : defaultBlogContent.categories,
    authors: Array.isArray(content?.authors) ? content.authors : defaultBlogContent.authors,
  };

  const bilge = (next.authors || []).find(
    (author) => normalizeAuthorName(author?.name) === normalizeAuthorName("Bilge AKAR")
  );

  const preparedBilge = {
    ...bilgeAkarPost20260831,
    authorSlug: bilge?.slug || "",
    authorName: bilge?.name || "Bilge AKAR",
    authorRole: bilge?.role || "Sosyal Hizmet Uzmanı & Doktora Öğrencisi",
    authorImage: bilge?.image || "",
  };

  const preparedMenMentalHealth = {
    ...erkekRuhSagligiPost20260920,
  };

  const upsertPost = (posts, prepared) => {
    const exists = posts.some((post) => post.slug === prepared.slug || post.id === prepared.id);
    if (!exists) return [...posts, prepared];
    return posts.map((post) =>
      post.slug === prepared.slug || post.id === prepared.id
        ? {
            // Bu yazılar ilk açılışta hazır içerikle eklenir. Sonrasında admin
            // panelinden yapılan başlık/kapak/metin düzenlemelerini varsayılan
            // veriyle ezme; aksi halde yeni kapak görseli sayfada eski hâline döner.
            ...prepared,
            ...post,
            body: Array.isArray(post.body) && post.body.length ? post.body : prepared.body,
            image: post.image || prepared.image,
            authorSlug: post.authorSlug || prepared.authorSlug || "",
            authorName: post.authorName || prepared.authorName || "",
            authorRole: post.authorRole || prepared.authorRole || "",
            authorImage: post.authorImage || prepared.authorImage || "",
          }
        : post
    );
  };

  const postsWithBilge = upsertPost(next.posts || [], preparedBilge);
  const postsWithBoth = upsertPost(postsWithBilge, preparedMenMentalHealth);
  const categories = [...(next.categories || [])];

  for (const category of [preparedBilge.category, preparedMenMentalHealth.category]) {
    if (!categories.some((item) => normalizeAuthorName(item) === normalizeAuthorName(category))) {
      categories.push(category);
    }
  }

  return {
    ...next,
    categories,
    posts: postsWithBoth,
  };
};

const blogRichBodyToEditorText = (body) => {
  if (!Array.isArray(body)) return String(body || "");
  return body
    .map((block) => {
      if (typeof block === "string") return block;
      if (!block || typeof block !== "object") return "";
      if (block.type === "heading") return `## ${block.text || ""}`;
      if (block.type === "paragraph") return block.text || "";
      if (block.type === "recommendation") return `${block.number || ""}. ${block.text || ""}`;
      if (block.type === "references") return (block.items || []).join("\n");
      if (block.type === "riskTable") {
        return [
          block.caption || "",
          ...(block.columns || []).map((column) =>
            [column.title, ...(column.items || [])].filter(Boolean).join(" — ")
          ),
        ].filter(Boolean).join("\n");
      }
      if (block.type === "impactDiagram") {
        return [block.caption || "", ...(block.items || [])].filter(Boolean).join(" — ");
      }
      return block.text || "";
    })
    .filter(Boolean)
    .join("\n\n");
};

const hasRichBlogBody = (body) =>
  Array.isArray(body) && body.some((block) => block && typeof block === "object");



const prepareBlogImageForUpload = async (file, options = {}) => {
  const maxInputBytes = options.maxInputBytes || 20 * 1024 * 1024;
  const targetBytes = options.targetBytes || 4 * 1024 * 1024;
  const maxDimension = options.maxDimension || 2560;

  if (!file) throw new Error("Görsel seçilmedi.");
  if (!String(file.type || "").startsWith("image/")) {
    throw new Error("Lütfen bir görsel dosyası seçin.");
  }
  if (file.size > maxInputBytes) {
    throw new Error("Görsel en fazla 20 MB olabilir.");
  }

  let source = null;
  let objectUrl = "";

  try {
    if (typeof createImageBitmap === "function") {
      source = await createImageBitmap(file);
    } else {
      objectUrl = URL.createObjectURL(file);
      source = await new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error("Görsel tarayıcıda açılamadı."));
        image.src = objectUrl;
      });
    }

    const naturalWidth = source.width || source.naturalWidth || 0;
    const naturalHeight = source.height || source.naturalHeight || 0;
    if (!naturalWidth || !naturalHeight) throw new Error("Görsel boyutları okunamadı.");

    const baseScale = Math.min(1, maxDimension / Math.max(naturalWidth, naturalHeight));
    let width = Math.max(1, Math.round(naturalWidth * baseScale));
    let height = Math.max(1, Math.round(naturalHeight * baseScale));

    const makeBlob = async (w, h, quality) => {
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) throw new Error("Görsel işlenemedi.");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, w, h);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(source, 0, 0, w, h);

      return await new Promise((resolve, reject) => {
        canvas.toBlob(
          (blob) => blob ? resolve(blob) : reject(new Error("Görsel dönüştürülemedi.")),
          "image/jpeg",
          quality
        );
      });
    };

    let blob = null;
    const qualities = [0.90, 0.84, 0.78, 0.72, 0.66, 0.60, 0.54];

    for (let pass = 0; pass < 5; pass += 1) {
      for (const quality of qualities) {
        blob = await makeBlob(width, height, quality);
        if (blob.size <= targetBytes) break;
      }
      if (blob?.size <= targetBytes) break;
      width = Math.max(900, Math.round(width * 0.80));
      height = Math.max(900, Math.round(height * 0.80));
    }

    if (!blob || blob.size > targetBytes) {
      throw new Error("Görsel 4 MB altına indirilemedi.");
    }

    const baseName = String(file.name || "blog-gorsel")
      .replace(/\.[^.]+$/, "")
      .replace(/[^\w\-]+/g, "-") || "blog-gorsel";

    return {
      file: new File([blob], `${baseName}.jpg`, {
        type: "image/jpeg",
        lastModified: Date.now(),
      }),
      extension: "jpg",
      contentType: "image/jpeg",
      compressed: true,
    };
  } finally {
    if (source && typeof source.close === "function") {
      try { source.close(); } catch {}
    }
    if (objectUrl) URL.revokeObjectURL(objectUrl);
  }
};

const fileToBlogDataUrl = async (file) => {
  const prepared = await prepareBlogImageForUpload(file, {
    targetBytes: 550 * 1024,
    maxDimension: 1600,
  });

  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("Görsel dahili olarak hazırlanamadı."));
    reader.readAsDataURL(prepared.file);
  });
};

// Yönetim panelindeki yerel önizleme yerine, ziyaretçilerin göreceği gerçek
// public URL'yi doğrular. Storage public değilse bozuk bağlantı kaydedilmez.
const verifyPublicBlogImageUrl = (url) =>
  new Promise((resolve, reject) => {
    if (!url) {
      reject(new Error("Görsel bağlantısı oluşturulamadı."));
      return;
    }
    const probe = new Image();
    const timeout = window.setTimeout(() => {
      probe.onload = null;
      probe.onerror = null;
      reject(new Error("Yüklenen görsel public URL üzerinden doğrulanamadı."));
    }, 12000);
    probe.onload = () => {
      window.clearTimeout(timeout);
      resolve(url);
    };
    probe.onerror = () => {
      window.clearTimeout(timeout);
      reject(new Error("Yüklenen görsel ziyaretçiler için açılamadı. Bucket'ın public ayarını kontrol edin."));
    };
    probe.src = `${url}${url.includes("?") ? "&" : "?"}v=${Date.now()}`;
  });

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

const withRequestTimeout = async (
  request,
  timeoutMs = 20000,
  message = "İşlem zaman aşımına uğradı. İnternet bağlantınızı kontrol edip tekrar deneyin."
) => {
  let timeoutId;
  try {
    return await Promise.race([
      Promise.resolve(request),
      new Promise((_, reject) => {
        timeoutId = globalThis.setTimeout(() => reject(new Error(message)), timeoutMs);
      }),
    ]);
  } finally {
    globalThis.clearTimeout(timeoutId);
  }
};

const pressCoverage = [
  {
    id: "kirsehir-manset-2026",
    source: "Kırşehir Manşet",
    date: "13 Eylül 2026",
    title: "Bağbaşı Aile Yaşam Merkezi’nde Ücretsiz Psikoterapi ve Danışmanlık Dönemi",
    excerpt: "Kırşehir Belediyesi’nin Bağbaşı Aile Yaşam Merkezi’nde sunduğu ücretsiz psikolojik destek ve danışmanlık hizmetleri basında yer aldı.",
    image: "/press/press-kirsehir-manset.webp",
    url: "https://kirsehirmanset.com/haber/bagbasi-aile-yasam-merkezinde-ucretsiz-psikoterapi-ve-danismanlik-donemi-e9fad",
  },
  {
    id: "kirsehir-memleket-eylul-2026",
    source: "Kırşehir Memleket",
    date: "10 Eylül 2026",
    title: "Kırşehir Bağbaşı Aile Yaşam Merkezi’nden Ücretsiz Psikolojik Danışmanlık Desteği",
    excerpt: "Bireysel, çift ve aile danışmanlığından stres, kaygı ve iletişim çalışmalarına uzanan ücretsiz destek programı duyuruldu.",
    image: "/press/press-kirsehir-manset.webp",
    url: "https://www.kirsehirmemleket.com.tr/kirsehir-bagbasi-aile-yasam-merkezinden-ucretsiz-psikolojik-danismanlik-destegi",
  },
  {
    id: "kirsehir-belediyesi-ocak-2026",
    source: "Kırşehir Belediyesi",
    date: "07 Ocak 2026",
    title: "Bağbaşı Aile Yaşam Merkezi Psikososyal Danışmanlık Hizmetleri Veriyor",
    excerpt: "Sosyal Hizmet Uzmanı ve Aile Danışmanı Kaan Özkan tarafından yürütülen danışmanlık alanları Kırşehir Belediyesi’nin resmî haberinde tanıtıldı.",
    image: null,
    url: "https://www.kirsehir.bel.tr/haberler/bagbasi-aile-yasam-merkezi-psikososyal-danismanlik-hizmetleri-veriyor",
  },
  {
    id: "sondakika-ocak-2026",
    source: "SonDakika.com",
    date: "07 Ocak 2026",
    title: "Kırşehir Belediyesi’nden Ücretsiz Psikososyal Danışmanlık Hizmeti",
    excerpt: "Bağbaşı Aile Yaşam Merkezi’nde sunulan psikososyal danışmanlık hizmetlerinin kapsamı ulusal haber platformunda yer buldu.",
    image: null,
    url: "https://www.sondakika.com/guncel/haber-kirsehir-de-ucretsiz-psikososyal-danismanlik-hizmetleri-19433590/",
  },
  {
    id: "kirsehir-memleket-ocak-2026",
    source: "Kırşehir Memleket",
    date: "Ocak 2026",
    title: "Psikososyal Yardım Kırşehir’de Başladı",
    excerpt: "Kırşehir’de bireyler, çiftler ve aileler için erişilebilir psikososyal desteğin başlaması yerel basına yansıdı.",
    image: null,
    url: "https://www.kirsehirmemleket.com.tr/psikososyal-yardim-kirsehirde-basladi",
  },
  {
    id: "kirsehir-ses-haber-2026",
    source: "Kırşehir Ses Haber",
    date: "Facebook paylaşımı",
    title: "Kırşehir Belediyesi’nden Ücretsiz Psikolojik ve Aile Danışmanlığı",
    excerpt: "Ücretsiz psikolojik ve aile danışmanlığı hizmetleri Kırşehir Ses Haber’in sosyal medya kanalında okuyucularla paylaşıldı.",
    image: null,
    url: "https://www.facebook.com/kirsehirseshaber/posts/k%C4%B1r%C5%9Fehir-belediyesinden-%C3%BCcretsiz-psikolojik-ve-aile-dan%C4%B1%C5%9Fmanl%C4%B1%C4%9F%C4%B1k%C4%B1r%C5%9Fehir-belediy/122190642194850726/",
  },
  {
    id: "kirsehir-haber40-ocak-2026",
    source: "Kırşehir Haber 40",
    date: "07 Ocak 2026",
    title: "Kırşehir’de Ücretsiz Aile ve Çocuk Danışmanlığı",
    excerpt: "Bağbaşı Aile Yaşam Merkezi’nde bireyler, aileler ve çocuklar için sunulan ücretsiz danışmanlık hizmetleri haberleştirildi.",
    image: "/press/press-kirsehir-haber40.jpg",
    url: "https://www.kirsehirhaber40.com/kirsehirde-ucretsiz-aile-ve-cocuk-danismanligi",
  },
];

const detailedServicePages = {
  "bireysel-danismanlik": {
    no: "01", eyebrow: "BİREYSEL DANIŞMANLIK", title: "Bireysel Danışmanlık", accent: "Detaylı Bilgi", icon: "user",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1800&q=88",
    intro: "Kaygıdan sınır koymaya, duygusal iyi oluştan yaşam becerilerine uzanan bireysel çalışma alanları.",
    paragraphs: [
  "01. Kaygı ve Yaşam Olaylarına Uyum Güçlüğü",
  "Kaygı, belirsizlik ve yaşamda meydana gelen önemli değişimler karşısında ortaya çıkabilen doğal bir psikolojik tepkidir. Ancak kaygının yoğunlaşması; kişinin düşüncelerini, duygularını, ilişkilerini ve günlük işlevselliğini belirgin biçimde etkilediğinde profesyonel destek gerektirebilir. Bireysel terapide kaygının hangi yaşam olayları, düşünce örüntüleri ve davranışlarla ilişkili olduğu değerlendirilir; kişinin belirsizlikle baş etme, problem çözme ve psikolojik esnekliğini geliştirmesi desteklenir. Amaç kaygıyı tamamen ortadan kaldırmak değil, kişinin kaygıya rağmen yaşamını daha kontrollü ve işlevsel biçimde sürdürebilmesini sağlamaktır.",
  "Bilişsel Davranışçı ve Duygu Düzenleme Temelli yaklaşımların kaygı belirtilerinin azaltılmasında etkili olduğu gösterilmektedir. Yaşam olaylarına uyum sürecinde ise bireysel psikolojik özelliklerin yanında sosyal destek, yaşam koşulları ve çevresel kaynakların da değerlendirilmesi önem taşır.",
  "02. Öfke Yönetimi ve Duygu Düzenleme",
  `Öfke, tek başına olumsuz veya patolojik bir duygu değildir; çoğu zaman kişinin sınırlarının ihlal edildiğini, ihtiyaçlarının karşılanmadığını veya kendisini tehdit altında hissettiğini gösteren önemli bir duygusal sinyaldir. Sorun, öfkenin yoğunluğu ve kişinin bu duyguyla nasıl başa çıktığıyla ilgilidir. Bireysel terapide öfkeyi yalnızca "kontrol edilmesi gereken" bir tepki olarak değil; düşünceler, bedensel uyarılma, geçmiş deneyimler ve kişilerarası ilişkilerle birlikte değerlendirmek amaçlanır.`,
  "Duygu düzenleme çalışmaları kapsamında kişinin duygusunu fark etmesi, adlandırması, tetikleyicilerini tanıması ve daha işlevsel tepki seçenekleri geliştirmesi üzerinde durulur. Araştırmalar, duygu düzenleme güçlüklerinin depresyon ve anksiyete gibi farklı psikolojik sorunlarla ilişkili olduğunu; duygu düzenleme becerilerini hedefleyen terapötik yaklaşımların ise çeşitli içselleştirici belirtilerde etkili olabildiğini göstermektedir.",
  "03. Benlik Saygısı ve Özgüven",
  `Benlik saygısı, kişinin kendisini değerlendirme biçimini; özgüven ise belirli alanlarda başa çıkma ve yeterlilik kapasitesine ilişkin algısını ifade eder. Bu alanlardaki güçlükler çoğu zaman yalnızca "kendine güvenememe" şeklinde ortaya çıkmaz; kişinin sürekli kendisini başkalarıyla kıyaslaması, hata yapmaktan kaçınması, eleştiriyi kişisel değeriyle ilişkilendirmesi veya ilişkilerinde kendi ihtiyaçlarını geri plana atması biçiminde de görülebilir.`,
  "Bireysel terapide kişinin kendisi hakkında geliştirdiği temel inançlar, geçmiş deneyimlerin bugünkü benlik algısına etkisi ve özdeğerini hangi koşullara bağladığı ele alınabilir. Amaç yapay biçimde olumlu düşünmeye çalışmak değil; kişinin güçlü ve gelişime açık yönlerini daha gerçekçi biçimde değerlendirebilmesini, başarısızlık ve eleştiriyi kişisel değersizlikle eşitlememesini ve özdeğerini daha sağlam bir zeminde yapılandırmasını desteklemektir. Psikoterapi araştırmaları da terapi sonrasında benlik saygısında anlamlı iyileşmeler görülebileceğini göstermektedir.",
  "04. Duygusal İyi Oluş",
  `Duygusal iyi oluş yalnızca "mutlu hissetmek" anlamına gelmez. Kişinin olumlu ve olumsuz duygularını tanıyabilmesi, yaşamındaki zorluklarla baş edebilmesi, ilişkilerinden anlam ve doyum elde edebilmesi ve yaşadığı duyguları kendisine zarar vermeden yönetebilmesiyle ilişkilidir.`,
  "Bireysel terapide kişinin yaşamındaki stres kaynakları, ihtiyaçları, değerleri, ilişkileri ve günlük işlevselliği birlikte değerlendirilir. Süreç yalnızca psikolojik belirtileri azaltmaya değil, kişinin yaşamıyla kurduğu ilişkiyi güçlendirmeye de odaklanır. Bu nedenle terapide öz bakım, sosyal bağlar, yaşam dengesi, anlam, kişisel hedefler ve baş etme kaynakları da ele alınabilir. Klinik psikoloji açısından belirtilerin azaltılması kadar kişinin sürdürülebilir bir psikolojik işlevsellik geliştirmesi de önemlidir.",
  "05. Psikososyal Güçlenme ve Dayanıklılık",
  "Psikolojik dayanıklılık, kişinin hiçbir zaman zorlanmaması veya güçlü görünmesi anlamına gelmez. Dayanıklılık; stres, kayıp, belirsizlik ve yaşamın zorlu koşulları karşısında kişinin yeniden denge kurabilme, kaynaklarını kullanabilme ve yaşamına devam edebilme kapasitesidir. Bu kapasite sabit bir kişilik özelliği olarak değerlendirilmemekte; öğrenilebilen ve geliştirilebilen yönleri bulunduğu kabul edilmektedir.",
  "Bireysel terapide kişinin güçlü yönleri, baş etme biçimleri, sosyal destek ağı, yaşam kaynakları ve çevresel koşulları birlikte değerlendirilir. Sosyal hizmet yaklaşımının kişi-çevre perspektifi doğrultusunda yalnızca bireyin içsel özelliklerine değil; aile, sosyal çevre, ekonomik koşullar ve mevcut destek sistemlerine de bakılır. Güncel meta-analizler, özellikle bilişsel davranışçı, mindfulness ve bütünleştirici müdahalelerin psikolojik dayanıklılığı artırmada olumlu sonuçlar verebildiğini göstermektedir.",
  "06. Sınır Koyma ve Sağlıklı İletişim",
  `Sağlıklı sınırlar, kişinin hem kendi ihtiyaçlarını ve değerlerini koruyabilmesini hem de karşısındaki kişinin sınırlarına saygı gösterebilmesini sağlar. Sınır koymak yalnızca "hayır" diyebilmek değildir; kişinin neye ihtiyaç duyduğunu fark etmesi, bunu uygun biçimde ifade etmesi ve ilişkilerinde karşılıklılığı koruyabilmesidir.`,
  "Terapide kişinin sınır koymakta neden zorlandığı; reddedilme korkusu, suçluluk, onaylanma ihtiyacı, çatışmadan kaçınma, aşırı sorumluluk alma veya geçmiş ilişki deneyimleri üzerinden değerlendirilebilir. İletişim çalışmalarıyla birlikte kişinin kendisini saldırganlaşmadan, pasifleşmeden veya kendisini yok saymadan ifade edebilmesi hedeflenir. Sosyal hizmet perspektifinde ise sağlıklı iletişim yalnızca bireysel bir beceri değil, kişinin ilişkisel çevresi ve yaşam koşulları içinde değerlendirilmesi gereken bir sosyal işlevsellik alanıdır.",
  "07. Ayrılık, Kayıp ve Yas Süreçleri",
  "Ayrılık, ilişki kaybı, boşanma, yakın bir kişinin kaybı, iş veya yaşam düzenindeki önemli değişiklikler kişinin alıştığı dünyada ciddi bir kırılma oluşturabilir. Yas tepkileri yalnızca üzüntüden ibaret değildir; özlem, öfke, suçluluk, boşluk, şaşkınlık, kaygı ve geleceğe ilişkin belirsizlik gibi farklı duygular aynı süreçte ortaya çıkabilir. Bu tepkilerin biçimi ve yoğunluğu kişiden kişiye değişebilir.",
  `Bireysel terapide amaç kişiye "unutmayı" öğretmek veya yaşadığı kaybı hızla geride bırakmasını beklemek değildir. Kayıp deneyiminin anlamlandırılması, duyguların güvenli biçimde işlenmesi, günlük yaşamın yeniden yapılandırılması ve kişinin geleceğe yeniden yatırım yapabilmesi desteklenir. Klinik değerlendirmede doğal yas tepkileri ile işlevselliği belirgin biçimde bozan ve süreklilik kazanan klinik tablolar birbirinden ayrılır. Yas çalışmalarında psikoterapötik yaklaşımların özellikle klinik düzeyde ve uzamış belirtilerde yararlı olabileceğine ilişkin güçlü kanıtlar bulunmaktadır.`,
  "08. Kişisel Farkındalık ve Yaşam Becerileri",
  "Kişisel farkındalık, kişinin yalnızca kendisi hakkında düşünmesi değil; duygu, düşünce, ihtiyaç, değer, sınır ve davranışları arasındaki ilişkiyi daha açık biçimde görebilmesidir. Bireysel terapide kişinin yaşamında tekrar eden örüntüler, karar verme biçimleri, ilişkilerdeki tutumu, kaçınma davranışları ve geleceğe ilişkin hedefleri birlikte değerlendirilebilir.",
  "Bu süreçte problem çözme, karar verme, stresle baş etme, zaman ve yaşam düzenini oluşturma, ihtiyaçları ifade etme ve kişisel hedef belirleme gibi yaşam becerileri de güçlendirilebilir. Amaç danışanın terapi sürecine bağımlı hale gelmesi değil; zaman içerisinde kendi yaşamını daha bilinçli değerlendirebilen, seçimlerinin sorumluluğunu üstlenebilen ve karşılaştığı güçlüklerde kullanabileceği psikolojik ve sosyal kaynakları tanıyabilen bir işlevsellik geliştirmesidir. Bu yaklaşım, klinik psikolojinin bireysel işleyişe odaklanan yönüyle sosyal hizmetin güçler ve kişi-çevre perspektifini bir araya getirir."
]
  },
  "cift-danismanligi": {
    no: "02", eyebrow: "ÇİFT DANIŞMANLIĞI", title: "Çift Danışmanlığı", accent: "İlişkiyi Birlikte Anlamak", icon: "heart",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1800&q=88",
    intro: "İletişim, güven, çatışma, bağlanma ve ortak yaşam dinamiklerinin bütüncül biçimde ele alındığı çalışma alanı.",
    paragraphs: [
  "Çift terapisi; evli, nişanlı, birlikte yaşayan veya romantik ilişkisini sürdüren çiftlerin ilişkilerinde ortaya çıkan iletişim, duygusal yakınlık, güven, çatışma, sınırlar ve ilişkiyi sürdürme gibi güçlüklerin bütüncül biçimde ele alındığı psikoterapötik bir süreçtir.",
  `Terapi sürecinde yalnızca "sorun nedir?" sorusuna değil, çiftin yaşadığı sorunun nasıl oluştuğuna, nasıl sürdürüldüğüne ve iki partnerin birbirleriyle kurduğu etkileşim döngüsüne de odaklanılır. Bireysel özelliklerin yanı sıra ilişkinin geçmişi, bağlanma örüntüleri, yaşam koşulları, ailelerle ilişkiler, sosyal çevre ve önemli yaşam geçişleri de değerlendirilir.`,
  "Amaç taraflardan birini haklı, diğerini haksız ilan etmek ya da her koşulda ilişkiyi sürdürmek değildir. Temel hedef; çiftin birbirini daha iyi anlamasını, ihtiyaçlarını daha sağlıklı ifade edebilmesini, ilişkisel güveni güçlendirmesini ve birlikte daha işlevsel kararlar alabilmesini desteklemektir. Çift terapilerine ilişkin araştırmalar, özellikle ilişki doyumu ve iletişim üzerinde anlamlı iyileşmeler sağlanabildiğini göstermektedir.",
  "01. İletişim ve Etkileşim Örüntüleri",
  "Çiftler arasındaki iletişim sorunları yalnızca konuşma sıklığı veya birbirini dinlememe ile sınırlı değildir. Eleştiri, savunmaya geçme, geri çekilme, yanlış anlaşılmalar, duyguları ifade etmekte zorlanma ve aynı tartışmaların tekrar tekrar yaşanması ilişkinin zaman içerisinde yıpranmasına neden olabilir.",
  "Çift terapisinde iletişim, iki partnerin birbirleriyle nasıl etkileşim kurduğu ve belirli sorunlar karşısında hangi döngüye girdikleri üzerinden değerlendirilir. Amaç yalnızca daha iyi konuşmayı öğretmek değil; partnerlerin ihtiyaçlarını, duygularını ve beklentilerini daha açık ve güvenli biçimde ifade edebilmelerini desteklemektir. Araştırmalar, iletişim kalitesinin ilişki doyumuyla ilişkili olduğunu ve iletişimin konuya göre değişebildiğini göstermektedir.",
  "02. Çatışma ve Problem Çözme",
  "Her yakın ilişkide farklı beklentilerin ve ihtiyaçların bulunması doğaldır. Bu nedenle çatışmanın varlığı tek başına ilişkinin sağlıksız olduğu anlamına gelmez. Daha önemli olan, çiftin anlaşmazlıkları nasıl ele aldığı ve çatışma sonrasında ilişkiyi nasıl yeniden düzenleyebildiğidir.",
  "Çift terapisinde tekrarlayan tartışmaların altında bulunan ihtiyaçlar, düşünceler ve duygusal etkileşim döngüleri değerlendirilir. Suçlama, küçümseme, savunma veya geri çekilme gibi ilişkiyi zorlaştıran örüntüler fark edilerek daha işlevsel problem çözme, müzakere ve çatışma yönetimi becerileri geliştirilmeye çalışılır.",
  "Amaç çiftin her konuda aynı düşünmesini sağlamak değil; farklılıkların ilişki içindeki güveni, saygıyı ve iş birliğini bozmayacak şekilde yönetilebilmesini desteklemektir.",
  "03. Güven, Kırılmalar ve İlişkisel Güvenin Yeniden Yapılandırılması",
  "Güven, romantik ilişkinin temel yapı taşlarından biridir. Yalan söyleme, gizlilik, sadakatle ilgili kırılmalar, verilen sözlerin tutulmaması, yoğun kıskançlık veya geçmiş deneyimlerin bugünkü ilişkiye taşınması güven duygusunu zedeleyebilir.",
  "Terapi sürecinde güven sorunu yalnızca yaşanan olay üzerinden değil, olayın partnerler açısından taşıdığı anlam üzerinden değerlendirilir. Kırılmanın ardından ortaya çıkan öfke, korku, değersizlik, kuşku veya geri çekilme gibi tepkiler ele alınarak çiftin güveni yeniden oluşturabilmesi için gerekli ilişkisel koşullar üzerinde çalışılır.",
  `Burada amaç yaşanan olayı yok saymak veya hızla "affetmek" değildir. Öncelikle güvenin hangi noktada zarar gördüğünü anlamak, sorumlulukları netleştirmek ve ilişkinin yeniden yapılandırılabilmesi için gerçekçi bir zemin oluşturmak hedeflenir.`,
  "04. Bağlanma, Duygusal Yakınlık ve İlişkisel İhtiyaçlar",
  "Bir çift ilişkisinde insanların yalnızca davranışları değil, güvenli bağ kurma ve duygusal olarak görülme ihtiyaçları da önemlidir. Bazı ilişkilerde bir partner yakınlık ararken diğer partner geri çekilebilir; bazı ilişkilerde ise terk edilme korkusu, aşırı güvence arama veya duygusal uzaklaşma tekrar eden bir döngü oluşturabilir.",
  "Çift terapisinde partnerlerin birbirlerinden hangi duygusal ihtiyaçları bekledikleri ve bu ihtiyaçların ilişki içinde nasıl ifade edildiği incelenebilir. Bağlanma temelli yaklaşımlar, ilişkinin görünen çatışmasının altında bulunan güven, yakınlık, kabul edilme ve desteklenme ihtiyaçlarının anlaşılmasına yardımcı olabilir.",
  `Bu yaklaşımda amaç partnerlere değişmez "bağlanma stilleri" etiketi koymak değil; ilişkide tekrar eden örüntüleri fark ederek daha güvenli ve esnek bir ilişki kurabilmelerini desteklemektir. İlişki terapilerinde farklı kuramsal yaklaşımların ilişki doyumu üzerinde olumlu sonuçlar sağlayabildiğine dair kapsamlı kanıtlar bulunmaktadır.`,
  "05. Sınırlar, Bireysellik ve İlişkisel Denge",
  "Sağlıklı bir çift ilişkisi yalnızca birlikte hareket etmekten değil, iki bireyin kendi sınırlarını ve bireysel alanlarını koruyabilmesinden de oluşur. Ailelerle ilişkiler, arkadaşlıklar, kişisel zaman, ekonomik konular, özel alan ve karar verme süreçleri sınırların önemli olduğu alanlardan bazılarıdır.",
  "Çift terapisinde sınırların aşırı katı, aşırı geçirgen veya belirsiz hale gelmesinin ilişki üzerindeki etkileri değerlendirilebilir. Bir partnerin sürekli geri planda kalması, diğerinin tüm kararları üstlenmesi veya çiftin kendi sınırlarını geniş aile ya da sosyal çevreden ayırmakta zorlanması gibi durumlar ele alınabilir.",
  `Amaç bağımsızlık ile yakınlık arasında sağlıklı bir denge kurmak; "ilişkide olmak" ile "kendini kaybetmek" arasındaki farkı görünür hale getirmektir.`,
  "06. İlişki Geçişleri ve Evlilik Öncesi Dönem",
  "Çift terapisi yalnızca sorunların yoğunlaştığı ilişkiler için değildir. İlişkinin yeni bir döneme geçtiği zamanlarda da profesyonel destek yararlı olabilir.",
  "Nişanlanma, birlikte yaşamaya başlama, evlilik kararı, farklı bir şehre taşınma, çocuk sahibi olma veya ilişkinin geleceğiyle ilgili önemli kararlar çiftin mevcut dengesini değiştirebilir. Bu geçiş dönemlerinde beklentilerin, değerlerin ve yaşam planlarının konuşulması gelecekte ortaya çıkabilecek çatışmaların daha erken fark edilmesine yardımcı olabilir.",
  "Evlilik öncesi çift danışmanlığında özellikle iletişim, çatışma çözme, evlilik beklentileri ve ilişkinin güçlü/gelişime açık yönleri ele alınabilir. Sistematik çalışmalar, evlilik ve ilişki programlarının ilişki doyumu ve iletişim gibi alanlarda olumlu sonuçlar sağlayabildiğini göstermektedir.",
  "07. Ayrılık, İlişkiyi Sürdürme ve İlişkinin Sonlandırılmasına Dair Kararsızlık",
  "Her çift terapisinin amacı ilişkiyi mutlaka sürdürmek değildir. Bazı çiftler ilişkilerini güçlendirmek isterken bazı çiftler ayrılık konusunda kararsız olabilir veya ilişkinin devam edip etmeyeceğini değerlendirmek isteyebilir.",
  "Bu tür durumlarda terapi; taraflardan birini ilişkiyi sürdürmeye ya da sona erdirmeye yönlendirmek yerine, ilişkinin mevcut durumunu daha açık değerlendirebilecekleri bir alan oluşturabilir. İlişkinin güçlü ve sorunlu yönleri, tekrar eden çatışmalar, duygusal bağ, beklentiler ve bireysel ihtiyaçlar birlikte ele alınabilir.",
  "İlişkinin sonlandırılması gündeme geldiğinde ise iletişimin daha sağlıklı biçimde yönetilmesi, duygusal sürecin anlaşılması ve özellikle çocukların bulunduğu ilişkilerde ebeveynlik sorumluluklarının mümkün olduğunca işlevsel biçimde yeniden düzenlenmesi değerlendirilebilir.",
  "08. Yaşam Değişiklikleri, Ortak Yaşam ve İş Birliği",
  "Romantik ilişkiler yaşam boyunca değişen koşullardan etkilenir. Ekonomik sorunlar, iş değişiklikleri, taşınma, çocuk sahibi olma, aile büyüklerine yönelik bakım sorumlulukları veya diğer önemli yaşam olayları çiftin ilişki dinamiklerini değiştirebilir.",
  "Çift terapisinde bu değişikliklerin ilişki üzerindeki etkisi değerlendirilirken yalnızca partnerlerin bireysel özelliklerine değil, içinde bulundukları sosyal ve ekonomik koşullara da bakılır. Sosyal hizmet perspektifinde ilişki, kişinin içinde bulunduğu aile ve sosyal çevreden bağımsız ele alınmaz.",
  `Amaç çiftin tüm yaşam sorunlarını yalnızca "ilişki problemi" olarak tanımlamak yerine, değişen koşullar karşısında birlikte hareket etme, görev paylaşımı yapma, sosyal kaynaklarını kullanma ve birbirlerine destek olma kapasitesini güçlendirmektir.`
]
  },
  "psikososyal-destek": {
    no: "03", eyebrow: "PSİKOSOSYAL DESTEK", title: "Psikososyal Destek", accent: "Güçlenme ve Uyum", icon: "shield",
    image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1800&q=88",
    intro: "Kayıp, yaşam geçişleri, sosyal destek, dayanıklılık ve günlük işlevsellik odağında bütüncül destek.",
    paragraphs: [
  "01. Yas ve Kayıp Süreçlerinde Psikososyal Destek",
  "Kayıp sonrasında ortaya çıkan üzüntü, özlem, öfke, suçluluk ve belirsizlik gibi tepkiler kişinin yaşamını farklı biçimlerde etkileyebilir. Destek sürecinde yasın kişisel ve sosyal boyutları birlikte değerlendirilerek duyguların işlenmesi, günlük yaşamın yeniden yapılandırılması ve sosyal destek kaynaklarının güçlendirilmesi amaçlanır. Yas sürecinde sosyal desteğin önemli bir koruyucu kaynak olduğu araştırmalarda vurgulanmaktadır.",
  "02. Yaşam Olaylarına ve Yaşam Geçişlerine Uyum",
  "Taşınma, iş kaybı, boşanma, emeklilik, hastalık, aile yapısındaki değişimler veya diğer önemli yaşam olayları kişinin alışılmış yaşam düzenini etkileyebilir. Psikososyal destek sürecinde bireyin bu değişimleri nasıl anlamlandırdığı, hangi baş etme kaynaklarına sahip olduğu ve yeni yaşam koşullarına nasıl uyum sağlayabileceği değerlendirilir.",
  "03. Sosyal Destek ve Koruyucu Kaynakların Güçlendirilmesi",
  "Psikolojik iyi oluş yalnızca bireyin içsel kaynaklarıyla açıklanamaz. Aile, arkadaşlık ilişkileri, topluluk bağları ve profesyonel destek sistemleri kişinin güçlüklerle baş etmesinde önemli kaynaklar oluşturabilir. Bu süreçte kişinin mevcut sosyal destek ağı değerlendirilir, zayıflayan ilişkilerin güçlendirilmesi ve ihtiyaç halinde yeni destek kaynaklarının oluşturulması desteklenir. Sosyo-ekolojik araştırmalar, sosyal desteğin özellikle aile ve topluluk düzeyinde önemli bir koruyucu faktör olduğunu göstermektedir.",
  "04. Psikososyal Dayanıklılık ve Baş Etme Kapasitesinin Güçlendirilmesi",
  "Psikososyal dayanıklılık, kişinin hiç zorlanmaması değil; zorlu yaşam koşulları karşısında yeniden denge kurabilme ve mevcut kaynaklarını kullanabilme kapasitesidir. Çalışmalarda dayanıklılığın bireysel özelliklerin yanı sıra aile, sosyal çevre ve daha geniş toplumsal koşullarla ilişkili olduğu gösterilmektedir. Bu nedenle destek sürecinde kişinin güçlü yönleri, baş etme becerileri ve çevresel kaynakları birlikte ele alınır.",
  "05. Günlük Yaşam İşlevselliğinin Desteklenmesi",
  "Yoğun stres, kayıp veya kriz dönemlerinde uyku, çalışma, sosyal ilişkiler, öz bakım ve günlük sorumluluklarda bozulmalar görülebilir. Psikososyal destek sürecinde kişinin yaşamını sürdürebilme kapasitesi değerlendirilir ve günlük işlevselliği yeniden yapılandırmaya yönelik pratik ve psikolojik baş etme stratejileri üzerinde çalışılır. Güncel araştırmalar, kriz sonrası iyileşmenin yalnızca belirti azalmasıyla değil, yaşam kalitesi ve işlevselliğin yeniden kazanılmasıyla da değerlendirilmesi gerektiğine dikkat çekmektedir.",
  "06. Sosyal ve Kurumsal Kaynaklara Yönlendirme",
  "Bazı psikososyal güçlüklerin çözümü yalnızca bireysel görüşmelerle mümkün olmayabilir. Ekonomik sorunlar, barınma, sosyal haklara erişim, eğitim, sağlık, aile hizmetleri veya hukuki süreçler gibi alanlarda uygun kurum ve hizmetlere erişim gerekebilir. Sosyal hizmet yaklaşımı doğrultusunda kişinin ihtiyaçları belirlenerek uygun sosyal ve kurumsal kaynaklara yönlendirilmesi desteklenir.",
  "07. Afet ve Kriz Sonrası Psikososyal Destek",
  `Afetler ve kriz durumları kişinin güvenlik algısını, sosyal çevresini, ekonomik koşullarını ve günlük yaşam düzenini aynı anda etkileyebilir. Bu süreçte amaç herkesi "travma hastası" olarak değerlendirmek değil; kişinin güvenlik, temel ihtiyaçlar, sosyal destek ve psikolojik baş etme kapasitesini değerlendirmek ve ihtiyaç duyduğu desteğe erişimini sağlamaktır. Psikolojik İlk Yardım yaklaşımı da kriz sonrasında kişiye onurunu, kültürel özelliklerini ve mevcut kapasitesini gözeten insani, destekleyici ve pratik yardım sunmayı temel alır.`,
  "08. Göç, Yer Değiştirme ve Yeni Yaşama Uyum",
  "Göç ve zorunlu yer değiştirme yalnızca fiziksel bir mekân değişikliği değildir; kişinin sosyal bağları, yaşam rolleri, kültürel aidiyeti ve güvenlik algısı üzerinde önemli değişiklikler yaratabilir. Psikososyal destek bu süreçte kişinin kayıplarını anlamlandırmasına, sosyal bağlarını yeniden oluşturmasına ve yeni yaşam çevresine uyumunu güçlendirmesine yardımcı olabilir."
]
  },
  "bosanma-ve-yas-danismanligi": {
    no: "04", eyebrow: "BOŞANMA VE YAS DANIŞMANLIĞI", title: "Boşanma ve Yas", accent: "Danışmanlığı", icon: "compass",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=88",
    intro: "Kayıp, değişim, duygusal düzenleme, yeni yaşam düzeni ve psikososyal uyumun birlikte ele alındığı danışmanlık süreci.",
    paragraphs: [
  "Boşanma yalnızca hukuki bir ilişkinin sona ermesi değildir. Çoğu zaman kişinin alıştığı yaşam düzeninin, ilişki biçiminin, aile içindeki rolünün, gelecek tasarımının, ekonomik ve sosyal düzeninin yeniden yapılandırılmasını gerektiren çok boyutlu bir yaşam geçişidir. Bu nedenle boşanma süreci; üzüntü, öfke, suçluluk, yalnızlık, belirsizlik, reddedilme, kaygı, özlem, değersizlik ve gelecek hakkında umutsuzluk gibi birbirinden farklı duygusal tepkilerin aynı dönemde yaşanabildiği karmaşık bir psikososyal süreçtir.",
  `Özellikle uzun süreli ilişkilerde kişi yalnızca eşini değil; birlikte kurduğu yaşamı, aile sistemini, gündelik rutinlerini, sosyal çevresini, ebeveynlik düzenini ve geleceğe ilişkin beklentilerini de yeniden değerlendirmek durumunda kalabilir. Bu nedenle boşanma sonrasında yaşanan güçlüğü yalnızca "ilişkinin bitmesine üzülmek" şeklinde değerlendirmek, sürecin psikolojik ve sosyal boyutlarını yeterince açıklamayabilir.`,
  "Boşanma ve Yas Danışmanlığı kapsamında temel amacım; yaşadığınız kayıp ve değişim deneyimini patolojikleştirmeden anlamlandırmanıza, yoğun duygusal yükünüzü düzenlemenize, işlevselliğinizi yeniden oluşturmanıza ve yaşamınızın bundan sonraki dönemini daha sağlıklı bir psikolojik ve sosyal zeminde yapılandırmanıza destek olmaktır.",
  "Boşanma sonrasında neler yaşanabilir?",
  `Boşanma öncesi, boşanma süreci ve boşanma sonrasında ortaya çıkan psikolojik tepkiler kişiden kişiye değişebilir. Bazı kişiler yoğun üzüntü ve özlem yaşarken, bazı kişiler öfke, rahatlama, suçluluk veya boşluk hissedebilir. Bazı kişiler ise uzun süre duygusal olarak donuklaşmış, kararsız veya "ne hissettiğini bilemez" durumda olabilir.`,
  "Klinik açıdan önemli olan, belirli bir duygunun yaşanıp yaşanmaması değil; bu duyguların yoğunluğu, sürekliliği, kişinin günlük yaşamına etkisi, işlevsellik düzeyi, baş etme kaynakları ve beraberinde ortaya çıkan psikolojik belirtilerin niteliğidir.",
  "Boşanma sonrasında özellikle;",
  "yoğun üzüntü ve özlem,",
  "öfke ve kırgınlık,",
  "suçluluk veya kendini sürekli sorgulama,",
  "reddedilmişlik veya değersizlik hissi,",
  "yalnızlık ve sosyal geri çekilme,",
  "yoğun kaygı ve belirsizlik,",
  "geleceği yeniden planlamakta zorlanma,",
  "uyku ve iştah değişiklikleri,",
  "dikkat ve motivasyon güçlükleri,",
  "tekrarlayan düşünceler ve geçmişi zihinde sürekli yeniden değerlendirme,",
  "yeni yaşam düzenine uyum sağlamakta zorlanma,",
  "çocuklarla ilgili ebeveynlik ve iletişim problemleri",
  "gibi güçlükler görülebilir.",
  "Bu belirtilerin ortaya çıkması tek başına psikiyatrik bir bozukluk olduğu anlamına gelmez. Yas, kayıp ve yaşam geçişlerine verilen tepkilerin önemli bir kısmı insanın uyum sürecinin doğal parçalarıdır. Klinik değerlendirmede amaç, normal ve beklenebilir duygusal tepkileri gereksiz biçimde hastalık olarak tanımlamak değil; kişinin işlevselliğini bozan, süreklilik kazanan veya başka klinik sorunlarla birlikte ortaya çıkan durumları uygun biçimde değerlendirmektir.",
  "Yakın bir kişinin ölümünün ardından gelişen ve belirli tanı ölçütlerini karşılayan bir durumdur. Boşanma sonrası yaşanan kayıp tepkisi doğrudan bu tanı kategorisiyle eşleştirilmemelidir. Bununla birlikte boşanma, klinik değerlendirmede depresif belirtiler, anksiyete, travma sonrası belirtiler veya uyum güçlükleri gibi başka psikolojik sorunların değerlendirilmesini gerektirebilir.",
  "Boşanma ve Yas Danışmanlığında psikolojik olarak neye odaklanıyoruz?",
  `Danışmanlık sürecinde yalnızca "boşanmayı atlatmaya" çalışmayız. Daha geniş bir perspektiften hareket ederiz.`,
  "Öncelikle kişinin yaşadığı kaybı ve mevcut psikolojik durumunu anlamaya çalışırız. Ardından boşanmanın kişinin düşünceleri, duyguları, davranışları, sosyal ilişkileri, ebeveynlik rolü ve yaşam koşulları üzerindeki etkilerini birlikte değerlendiririz.",
  "Süreç içerisinde özellikle şu alanlara odaklanılabilir:",
  "Kayıp ve yasın anlamlandırılması:\nİlişkinin sona ermesiyle birlikte ortaya çıkan duyguların tanınması, ifade edilmesi ve kişinin yaşadığı kaybın kendi yaşam öyküsü içerisindeki anlamının çalışılması.",
  "Duygusal düzenleme:\nÖfke, kaygı, suçluluk, yoğun üzüntü, özlem ve belirsizlik gibi duyguların bastırılması yerine tanınması, düzenlenmesi ve daha işlevsel biçimde yönetilmesi.",
  `Bilişsel süreçlerin ele alınması:\n"Ben nerede hata yaptım?", "Bir daha kimseye güvenemem", "Artık hayatım bitti", "Yeterince iyi değildim" veya "Her şey benim suçum" gibi kişinin psikolojik yükünü artırabilen katı ve işlevsiz düşünce örüntülerinin değerlendirilmesi.`,
  `Kimlik ve benlik algısı:\nÖzellikle uzun süreli ilişkilerden sonra kişinin "eş", "anne", "baba" veya "partner" rolünün ötesinde kendi bireysel kimliğini yeniden yapılandırabilmesine destek olmak.`,
  "Yeni yaşam düzenine uyum:\nGündelik yaşamın, sosyal ilişkilerin, kişisel hedeflerin, çalışma hayatının ve geleceğe yönelik planların yeniden oluşturulması.",
  "İlişki örüntülerinin değerlendirilmesi:\nKişinin geçmiş ilişkisinde tekrar eden iletişim, bağlanma, sınır, çatışma ve kişilerarası örüntülerin fark edilmesi; gelecekte benzer döngülerin tekrarlanma riskinin azaltılması.",
  "Ebeveynlik ve ortak ebeveynlik:\nÇocuk sahibi olan bireylerde boşanmayı yalnızca eşler arasındaki ilişkinin sona ermesi olarak değil, aynı zamanda yeni bir ebeveynlik ve aile organizasyonu süreci olarak ele almak.",
  "Araştırmalar, boşanma sonrasında çocukların psikolojik uyumunda yalnızca boşanmanın kendisinden ziyade ebeveynler arasındaki çatışma, iş birliği, destek ve ortak ebeveynlik biçiminin önemli bir rol oynadığını göstermektedir. Sistematik bir incelemede, yüksek düzeyde ebeveynler arası çatışmanın çocuklarda davranışsal sorunlar ile anksiyete, depresif belirtiler ve somatizasyonla ilişkili olduğu; ebeveynler arası destek ve iş birliğinin ise daha olumlu psikososyal sonuçlarla ilişkili olduğu bulunmuştur.",
  "Bu nedenle çocuklu boşanma süreçlerinde hedef, eski eşlerin yeniden bir araya gelmesini sağlamak değil; mümkün olduğunda çocuğun psikolojik güvenliğini gözeten, daha düşük çatışmalı ve işlevsel bir ebeveynlik sistemi oluşturmaktır.",
  "Hangi psikoterapi ve danışmanlık yaklaşımlarından yararlanıyorum?",
  "Danışmanlık sürecinde tek bir terapi modelini bütün danışanlara aynı şekilde uygulamak yerine, kişinin ihtiyaçlarına ve klinik değerlendirmesine göre bütüncül ve uyarlanabilir bir yaklaşım kullanmaktayım.",
  "Bilişsel Davranışçı Terapi yaklaşımı",
  "Kabul ve Kararlılık Terapisi (ACT)",
  "Anlatı ve Anlam Odaklı Yaklaşım",
  "Sistemik ve Aile Odaklı Yaklaşım",
  "Çözüm Odaklı yaklaşım",
  "Sosyal Hizmet ve Ekolojik Yaklaşım",
  "Danışmanlık süreci nasıl ilerliyor?",
  "1. Klinik ve Psikososyal Değerlendirme",
  "İlk aşamada boşanmanın hangi noktada olduğu, ilişkinin geçmişi, mevcut duygusal durum,",
  "2. Duygusal stabilizasyon ve kriz yönetimi",
  "3. Kayıp ve yasın çalışılması",
  "4. Bilişsel ve davranışsal yeniden yapılanma",
  "5. Kimlik ve yaşamın yeniden yapılandırılması",
  "6. Çocuklu boşanmalarda ebeveynlik ve ortak ebeveynlik",
  "7. Yeni yaşam düzeninin oluşturulması ve sürecin sonlandırılması",
  "Danışmanlıkta temel yaklaşımım",
  `Boşanma sonrasında amaç size "unutmayı" öğretmek değildir.`,
  "Amaç; yaşadığınız ilişkinin ve kaybın yaşamınızdaki anlamını anlayabilmeniz, geçmişin bütün ağırlığını geleceğe taşımadan ondan öğrendiklerinizi yanınıza alabilmeniz ve kendi yaşamınız üzerinde yeniden söz sahibi olabilmenizdir.",
  "Çünkü iyileşme her zaman geçmişi geride bırakmak anlamına gelmez.",
  "Bazen iyileşme;",
  `"Bunun başıma gelmemiş olmasını isterdim; ancak artık hayatımı bunun etrafında kurmak zorunda değilim."`,
  "diyebilecek psikolojik esnekliğe ulaşmaktır.",
  "Boşanma bir hayatın bittiği nokta olabilir; ancak psikolojik olarak çalışıldığında aynı zamanda kişinin kendisiyle, ihtiyaçlarıyla, sınırlarıyla, değerleriyle ve bundan sonraki yaşamıyla yeniden ilişki kurduğu bir geçiş dönemi de olabilir.",
  "Bu süreçte hedefim; yaşadığınız güçlüğün yalnızca yükünü değil, aynı zamanda sahip olduğunuz güçleri, kaynakları ve değişim kapasitesini de birlikte görünür hale getirmektir.",
  "Bilimsel Dayanak",
  "Bu danışmanlık çerçevesi; yas, psikoterapi, boşanma sonrası uyum, aile sistemleri, ortak ebeveynlik ve sosyal/psikolojik işlevsellik üzerine mevcut literatürün sentezine dayanmaktadır.",
  `Kızıltan ve Ulusoy'un DergiPark'ta yayımlanan doküman analizinde 2001-"2021 dönemindeki deneysel çalışmalarda yas müdahalelerinde kullanılan farklı psikolojik yaklaşımlar incelenmiş; yasın bireyler arasında farklılaşan bir süreç olduğu ve profesyonel müdahalenin kişinin gereksinimlerine göre ele alınması gerektiği vurgulanmıştır.`,
  "Yıldız Önal ve Köseoğlu'nun Türkiye'deki psikolojik danışmanlarla yaptığı nitel çalışmada ise yasın yalnızca ölümle sınırlı olmadığı, danışanların farklı yaşam kayıplarıyla da profesyonel destek sürecine başvurabildiği ve kültürel/toplumsal faktörlerin yas deneyiminin anlaşılmasında önemli olduğu belirtilmiştir.",
  `Boşanma sonrası çocuklara yönelik müdahaleleri değerlendiren meta-analiz, 30 çalışmadan elde edilen 4.344 kişilik veri setinde müdahalelerin özellikle boşanmaya uyum ve benlik saygısı gibi bazı sonuçlarda yarar sağlayabildiğini, ancak çocukların genel ruh sağlığı sonuçlarında bütüncül ve büyük etkiler ortaya koymadığını bildirmiştir. Bu nedenle "tek bir müdahale herkes için etkilidir" yaklaşımı yerine, müdahalenin çocuğun ve ailenin ihtiyaçlarına göre uyarlanması daha bilimsel bir yaklaşımdır.`,
  "Yas psikoterapileri üzerine 2024 tarihli sistematik derleme ve ağ meta-analizi, farklı psikoterapi modellerinin yas belirtileri üzerinde etkili olabildiğini; özellikle bilişsel davranışçı ve üçüncü dalga BDT yaklaşımlarının depresyon, anksiyete ve travma sonrası belirtiler gibi eşlik eden sorunlarda da yararlı olabileceğini göstermiştir.",
  "Bununla birlikte, yas ve boşanma sonrasında ortaya çıkan her üzüntü klinik bir bozukluk değildir. DSM-5-TR'de yer alan Uzamış Yas Bozukluğu ölüm sonrası kayıpla ilişkilidir ve belirli süre, belirti ve işlev kaybı ölçütlerinin karşılanmasını gerektirir. Bu nedenle boşanma sonrası yaşanan doğal yas tepkilerinin otomatik biçimde psikiyatrik bir bozukluk olarak değerlendirilmesi doğru değildir.",
  "Önemli etik sınır: Burada belirtilen yaklaşımlar danışanın değerlendirme sonuçlarına, mesleki yetkinlik alanına ve gereksinimlerine göre kullanılabilecek kuramsal çerçevelerdir. Her ekol her danışanda veya her boşanma sürecinde aynı şekilde uygulanmaz. Gerekli durumlarda psikiyatri, klinik psikoloji, hukuk, çocuk ve aile hizmetleri gibi ilgili profesyonel alanlara yönlendirme yapılması sürecin önemli bir parçasıdır."
]
  },
  "bekar-danismanligi": {
    no: "05", eyebrow: "BEKAR DANIŞMANLIĞI", title: "Bekar", accent: "Danışmanlığı", icon: "users",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1800&q=88",
    intro: "İlişki durumundan bağımsız psikolojik iyi oluş, özdeğer, ilişki örüntüleri ve sağlıklı sınırlar üzerine çalışma alanı.",
    paragraphs: [
  "Bekâr olmak tek başına psikolojik bir sorun, eksiklik veya tedavi edilmesi gereken bir durum değildir.",
  "Kişinin yaşamında romantik bir ilişkinin bulunmaması; kimi zaman bilinçli ve tercih edilen bir yaşam biçimi, kimi zaman yaşamın belirli bir dönemine ait geçici bir durum, kimi zaman ise kişinin istemediği halde içerisinde bulunduğu ve psikolojik olarak zorlandığı bir deneyim olabilir.",
  `Bu nedenle Bekar Danışmanlığı, kişiyi "bir ilişkiye sahip olmaya" yönlendiren bir yaklaşım değildir. Temel amaç; kişinin ilişki durumundan bağımsız olarak psikolojik iyi oluşunu güçlendirmesi, kendisini ve ilişki örüntülerini daha iyi tanıması, sağlıklı kişilerarası sınırlar geliştirmesi ve kendi değerleri doğrultusunda daha işlevsel bir yaşam kurabilmesine destek olmaktır.`,
  "Bekârlık deneyiminin kişinin yaşam doyumunu ve psikolojik iyi oluşunu nasıl etkilediği; sosyal destek, kişisel özellikler, ilişki beklentileri, yalnızlık, sosyal bağlar ve kişinin bekârlığı nasıl anlamlandırdığı gibi pek çok faktöre bağlı olarak değişebilmektedir.",
  "Bu nedenle danışmanlık sürecinde soru yalnızca:",
  `"Neden bir ilişkiniz yok?"`,
  "değildir.",
  "Daha kapsamlı sorular sorarız:",
  `"Bekârlık sizin için ne ifade ediyor?"`,
  `"Yalnızlık ile tek başına olmak arasındaki farkı nasıl yaşıyorsunuz?"`,
  `"Bir ilişkiye ne kadar ihtiyaç duyduğunuzu düşünüyorsunuz ve bu ihtiyacın ne kadarı sizin gerçek ihtiyaçlarınızdan, ne kadarı sosyal beklentilerden kaynaklanıyor?"`,
  `"İlişkilerinizde tekrar eden bir örüntü var mı?"`,
  `"Yakınlaşmak istediğiniz halde geri çekiliyor musunuz, yoksa yakınlık oluştuğunda kaygınız mı artıyor?"`,
  `"Bir ilişki içerisinde kendinizi kaybetme, terk edilme veya reddedilme korkusu yaşıyor musunuz?"`,
  "Bu sorular üzerinden kişinin yalnızca ilişki durumunu değil, benlik algısını, kişilerarası işlevselliğini ve psikolojik ihtiyaçlarını anlamaya çalışırız.",
  "Bekar Danışmanlığında hangi konular ele alınabilir?",
  "Bekârlık deneyiminin danışmanlık ihtiyacına dönüşmesi birbirinden oldukça farklı nedenlerle gerçekleşebilir.",
  "Bazı bireyler uzun süreli yalnızlıktan, sosyal çevrelerinin daralmasından veya yakın ilişki kuramamaktan dolayı zorlanabilir.",
  "Bazı bireyler geçmiş ilişkilerinde tekrar tekrar benzer sorunları yaşadıklarını fark edebilir.",
  "Bazı kişiler ise bir ilişki istemelerine rağmen yoğun reddedilme korkusu, sosyal kaygı, özgüven problemleri veya kişilerarası iletişim güçlükleri nedeniyle ilişki başlatmakta zorlanabilir.",
  "Bazıları ilişki başladığında terk edilme kaygısı yaşayabilir; bazıları ise yakınlık arttıkça geri çekilebilir.",
  "Bu nedenle danışmanlık sürecinde gerektiğinde;",
  "yalnızlık ve sosyal izolasyon,",
  "ilişki kurma ve sürdürme güçlükleri,",
  "sosyal kaygı,",
  "reddedilme duyarlılığı,",
  "düşük özdeğer ve özsaygı,",
  "kendini başkalarıyla kıyaslama,",
  `"herkesin hayatında biri var, benim neden yok?" düşünceleri,`,
  "yaş ve evlilik baskısı,",
  "aile ve sosyal çevrenin ilişki konusunda oluşturduğu baskı,",
  "geçmiş ilişkilerin etkileri,",
  "aldatılma veya terk edilme deneyimleri,",
  "güven problemi,",
  "duygusal bağımlılık,",
  "aşırı bağlanma veya ilişkiden kaçınma,",
  "sınır koyma güçlükleri,",
  "sağlıklı olmayan ilişkilere yönelme,",
  "ilişki seçimlerinde tekrar eden örüntüler,",
  "mükemmeliyetçi partner beklentileri,",
  "sürekli reddedilme veya beğenilmeme düşünceleri,",
  "ilişki konusunda umutsuzluk,",
  "sağlıklı iletişim ve ihtiyaç ifade etme becerileri",
  "gibi alanlar çalışılabilir.",
  `Buradaki temel yaklaşım, "sizi mutlaka bir ilişkiye sokmak" değil; neden belirli ilişki örüntülerinin ortaya çıktığını anlamak ve kişinin romantik ilişkilerle kurduğu ilişkiyi daha sağlıklı hale getirmektir.`,
  "Bekârlık ve yalnızlık aynı şey değildir",
  "Psikolojik açıdan önemli ayrımlardan biri bekârlık ile yalnızlığın birbirine eşit kabul edilmemesidir.",
  "Bir insan romantik ilişkisi olmadan da güçlü sosyal bağlara, arkadaşlıklara, aile ilişkilerine, mesleki aidiyete ve anlamlı bir yaşam alanına sahip olabilir.",
  "Bunun tersine kişi romantik bir ilişki içerisinde olduğu halde yoğun yalnızlık yaşayabilir.",
  "Türkiye'de yayımlanan nitel bir çalışmada 15 bekâr ve 15 evli bireyle yapılan görüşmelerde, bekâr katılımcıların yalnızlığı daha yoğun yaşadıkları ve bazı katılımcıların yalnızlıkla baş etmek için yalnızlığı besleyebilecek olumsuz başa çıkma biçimleri geliştirdikleri bildirilmiştir.",
  `"Artık birini bulmalıyım" düşüncesi neden önemli?`,
  "Bazı kişiler için bekârlığın yarattığı temel güçlük yalnız kalmak değil, bekâr kalma korkusudur.",
  `Daha güncel araştırmalarda da ilişkiyi "gerçek mutluluğun zorunlu koşulu" olarak gören düşüncelerin daha yüksek bekâr kalma korkusuyla ilişkili olduğu; bekâr kalma korkusunun ise günlük yaşam doyumunun daha düşük olmasıyla bağlantılı olduğu bulunmuştur.`,
  `Bu nedenle danışmanlık sürecinde bazen asıl çalışılması gereken konu "nasıl sevgili bulabilirim?" sorusu değil;`,
  `"Neden yalnız kalmayı bu kadar tehdit edici algılıyorum?" sorusudur.`,
  "Çünkü kişi yalnız kalmaktan yoğun biçimde korktuğunda;",
  "kendisine uygun olmayan ilişkilere razı olabilir,",
  "kırmızı bayrakları görmezden gelebilir,",
  "sınırlarını korumakta zorlanabilir,",
  "terk edilme ihtimali karşısında kendi ihtiyaçlarından vazgeçebilir",
  "veya ilişkinin sona ermesini önlemek için kendisini aşırı biçimde değiştirmeye çalışabilir.",
  "Bekâr kalmaktan korkan kişilerin eski partnerlerine yönelik özlem ve yeniden ilişki kurma girişimlerinin de daha yüksek olabildiğini gösteren çalışmalar bulunmaktadır.",
  "Dolayısıyla danışmanlıkta amaç yalnızca ilişki kurma ihtimalini artırmak değil, kişinin ilişki içerisinde kendi psikolojik bütünlüğünü koruyabilmesini sağlamaktır.",
  "Hangi psikoterapi yaklaşımlarından yararlanıyorum?",
  "Bekar Danışmanlığı tek bir terapi ekolüne bağlı standart bir protokol olarak uygulanmaz.",
  "Danışanın yaşadığı güçlük, klinik değerlendirme, hedefleri ve mevcut psikososyal koşulları doğrultusunda farklı kuramsal yaklaşımların kanıta dayalı tekniklerinden yararlanılabilir.",
  "Şema Odaklı Yaklaşım",
  "Bazı ilişki problemleri yalnızca bugünkü düşüncelerle açıklanamayabilir.",
  "Örneğin kişi tekrar tekrar;",
  "terk edilme korkusu yaşayan,",
  "kendisini değersiz hisseden,",
  "duygusal ihtiyaçlarını bastıran,",
  "partnerlerini idealize eden,",
  "aşırı fedakârlık yapan,",
  "hayır diyemeyen,",
  "yakınlık kurulduğunda geri çekilen",
  "veya sürekli ulaşılması zor kişilere yönelen bir ilişki örüntüsü gösterebilir.",
  "Bu durumda erken dönem yaşantıların ve kişinin geliştirdiği temel şemaların bugünkü ilişkilerinde nasıl tekrarlandığı değerlendirilebilir.",
  "Buradaki amaç çocukluk deneyimlerini suçlayıcı biçimde yorumlamak değil; kişinin bugünkü davranışlarının altında çalışan daha derin ilişki beklentilerini ve ihtiyaçlarını anlamaktır.",
  "Bağlanma Temelli Yaklaşım",
  "Yetişkin romantik ilişkilerinde bağlanma örüntüleri; yakınlık, güven, ayrılma, bağımsızlık ve duygusal ihtiyaçların ifade edilmesiyle ilişkili olabilir.",
  "Bağlanma temelli psikoterapi literatürünün gözden geçirmeleri; yetişkinlerle çalışırken içsel çalışma modellerinin ele alınması, terapötik ilişkinin güvenli bir temel olarak kullanılması, ilişki deneyimlerinin işlenmesi ve farklı bağlanma örüntülerinin anlaşılmasının klinik açıdan yararlı çerçeveler sunduğunu belirtmektedir.",
  "Geniş kapsamlı bir meta-analizde 224 çalışma ve yaklaşık 79.700 kişinin verileri incelenmiş; daha yüksek bağlanma kaygısı ve kaçınmasının depresyon, anksiyete ve yalnızlık gibi olumsuz ruhsal sonuçlarla ilişkili olduğu, buna karşılık yaşam doyumu ve özsaygıyla daha olumsuz ilişkiler gösterdiği bulunmuştur. Bağlanma kaygısının negatif ruh sağlığı göstergeleriyle ilişkisi kaçınmaya kıyasla daha güçlü bulunmuştur.",
  `Türkiye'deki çalışmalar da romantik ilişkilerde bağlanma örüntülerinin ilişki deneyimleriyle bağlantısını incelemektedir; ancak bu tür ilişkisel çalışmaların nedensellik kanıtlamadığı ve "bağlanma stilinin kader olmadığı" özellikle dikkate alınmalıdır.`,
  `Bu nedenle danışmanlıkta kişiye "Sen kaygılı bağlanıyorsun" şeklinde sabit bir kimlik vermek yerine, "Yakın ilişkilerde hangi ihtiyaç ve savunma örüntüleri tekrar ediyor?" sorusuna odaklanmak daha klinik olarak uygun bir yaklaşımdır.`,
  "Kabul ve Kararlılık Terapisi",
  "Kişilerarası Terapi ve Kişilerarası Beceri Çalışmaları",
  `Bazı danışanların temel güçlüğü "kendilik algısı"ndan çok kişilerarası ilişkilerin kurulması ve sürdürülmesi olabilir.`,
  "Bu durumda;",
  "iletişim başlatma,",
  "duygusal ihtiyaç ifade etme,",
  "çatışma çözme,",
  "sınır koyma,",
  "yakınlık kurma,",
  "sosyal destek geliştirme",
  "ve kişilerarası rollerle ilişkili güçlükler ele alınmaktadır.",
  "Özellikle sosyal izolasyon ve kişilerarası işlevsellikte bozulma bulunduğunda danışmanlık yalnızca romantik ilişkiye odaklanmamalıdır.",
  "Çünkü psikolojik olarak güçlü bir ilişki ağı yalnızca romantik partnerden oluşmaz.",
  "Çözüm Odaklı ve Güçler Perspektifi",
  "Sosyal hizmet perspektifinde birey yalnızca sorunlarıyla değil, sahip olduğu kaynaklar ve güçleriyle birlikte değerlendirilir.",
  "Bu nedenle danışmanlıkta;",
  `"Hayatınızda şu anda size iyi gelen ilişkiler hangileri?"`,
  `"Daha önce hangi sosyal durumlarda kendinizi yeterli hissettiniz?"`,
  `"Şu an sahip olduğunuz hangi kaynakları daha aktif kullanabilirsiniz?"`,
  `"Nasıl bir yaşam kurmak istiyorsunuz?"`,
  "gibi sorularla kişinin mevcut güçleri görünür hale getirilebilir.",
  `Bu yaklaşım, kişiyi "ilişki bulması gereken bir problem" olarak değil, kendi yaşamının aktif öznesi olarak ele alır.`,
  "Toplumun evlilik konusundaki beklentileri, aile baskısı, sosyal karşılaştırmalar, ekonomik koşullar, çalışma hayatı, yaş normları, sosyal çevrenin genişliği, yaşam alanı ve sosyal destek sistemleri kişinin bekârlık deneyimini etkileyebilir. Bu nedenle danışmanlık sürecinde yalnızca bireyin iç dünyasına değil, kişi-çevre etkileşimine de bakılır.",
  "Örneğin kişinin sosyal çevresinin son yıllarda daralması, farklı bir şehre taşınması, çalışma koşullarının sosyal ilişkileri azaltması veya ailesinin yoğun evlilik baskısı oluşturması psikolojik değerlendirmede göz önünde bulundurulabilir.",
  "Danışmanlık Süreci Nasıl İlerliyor?",
  "1. Ücretsiz Ön Görüşme",
  "Ön görüşmelerde kişinin yaşam öyküsü, mevcut sosyal çevresi, ilişki geçmişi, ilişki beklentileri, yalnızlık deneyimi, psikolojik belirtileri ve danışmanlıktan beklentileri değerlendirilir.",
  "Gerektiğinde standart psikolojik değerlendirme araçlarından yararlanılabilir.",
  "2. Sorunun Formülasyonu",
  "Kişinin yaşadığı güçlüğün;",
  "yalnızlık,",
  "sosyal kaygı,",
  "düşük özdeğer,",
  "geçmiş ilişki deneyimleri,",
  "bağlanma örüntüleri,",
  "kaçınma,",
  "reddedilme hassasiyeti,",
  "aile baskısı,",
  "sosyal çevre eksikliği,",
  "ilişki beklentilerindeki katılık",
  "gibi hangi faktörlerle bağlantılı olduğu birlikte değerlendirilir.",
  `Böylece genel bir "ilişki problemi" yerine kişiye özgü bir psikososyal formülasyon oluşturulur.`,
  "3. Duygusal ve Bilişsel Süreçlerin Çalışılması",
  "Bu aşamada kişinin yalnızlık, değersizlik, kaygı, öfke, kıyaslama veya umutsuzluk gibi duyguları ele alınmaktadır.",
  "4. İlişki Örüntülerinin İncelenmesi",
  "5. Özdeğer ve Psikolojik Bağımsızlığın Güçlendirilmesi",
  "Danışmanlık sürecinin önemli hedeflerinden biri kişinin kendi değerini ilişki durumundan bağımsız biçimde deneyimleyebilmesidir.",
  "6. Sosyal ve Davranışsal Alanın Güçlendirilmesi",
  "7. Sağlıklı İlişki Kurma ve Sınır Geliştirme",
  "8. Sürecin Değerlendirilmesi ve Sürdürülmesi",
  "Sürecin sonunda kişinin yalnızca danışmanlık sırasında değil, günlük yaşamda kullanabileceği psikolojik beceriler güçlendirilir.",
  `Hedef danışana sürekli olarak "ne yapması gerektiğini" söylemek değil; kendi kararlarını daha sağlıklı değerlendirebilecek psikolojik kapasiteyi geliştirmesine yardımcı olmaktır.`,
  "Kimler Bekar Danışmanlığından Yararlanabilir?",
  `Bekâr olduğu için kendisini "problemli" hissedenlerin değil; bekârlık deneyimiyle ilişkili bir konuda psikolojik veya psikososyal destek ihtiyacı hisseden yetişkinlerin başvurabileceği bir çalışma alanıdır.`,
  "Örneğin;",
  `"İlişki kurmak istiyorum ama neden sürekli aynı döngüye giriyorum?"`,
  `"İnsanlarla yakınlaşmakta zorlanıyorum."`,
  `"Bir ilişki istiyorum ama reddedilmekten çok korkuyorum."`,
  `"Yalnız kalmaktan korktuğum için yanlış ilişkilerde kalıyorum."`,
  `"İlişkim yokken kendimi değersiz hissediyorum."`,
  `"Ailem sürekli evlilik konusunda baskı yapıyor."`,
  `"İnsanlarla iletişim kuruyorum ama duygusal yakınlık geliştiremiyorum."`,
  `"Geçmiş ilişkim bittikten sonra kendimi toparlayamadım."`,
  `"Sürekli başkalarının ilişkileriyle kendi hayatımı karşılaştırıyorum."`,
  "gibi meseleler danışmanlık sürecinin çalışma alanına girmektedir.",
  "Etik Not: ''Bekârlığı bir klinik problem gibi sunmak bilimsel değildir.''"
]
  }
};


/* =========================================================
   STEP197 — PRIVACY-FIRST VISITOR ANALYTICS
   - Public pages only (admin/author portal excluded)
   - No raw IP is stored
   - IP geolocation is cached and stored only at approximate city level
   ========================================================= */
const ANALYTICS_VISITOR_KEY = "kaan_analytics_visitor_v1";
const ANALYTICS_SESSION_KEY = "kaan_analytics_session_v1";
const ANALYTICS_GEO_KEY = "kaan_analytics_geo_v1";

const analyticsId = (storage, key) => {
  try {
    const current = storage.getItem(key);
    if (current) return current;
    const next =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `v-${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
    storage.setItem(key, next);
    return next;
  } catch {
    return `v-${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
  }
};

const analyticsDevice = () => {
  const ua = navigator.userAgent || "";
  const width = window.innerWidth || 0;
  if (/iPad|Tablet|PlayBook|Silk/i.test(ua) || (width >= 700 && width <= 1100)) return "Tablet";
  if (/Mobi|Android|iPhone|iPod/i.test(ua) || width < 700) return "Mobil";
  return "Masaüstü";
};

const analyticsBrowser = () => {
  const ua = navigator.userAgent || "";
  if (/Edg\//.test(ua)) return "Edge";
  if (/OPR\//.test(ua)) return "Opera";
  if (/Chrome\//.test(ua) && !/Edg\//.test(ua)) return "Chrome";
  if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) return "Safari";
  if (/Firefox\//.test(ua)) return "Firefox";
  return "Diğer";
};

const analyticsOS = () => {
  const ua = navigator.userAgent || "";
  if (/iPhone|iPad|iPod/i.test(ua)) return "iOS";
  if (/Android/i.test(ua)) return "Android";
  if (/Windows/i.test(ua)) return "Windows";
  if (/Mac OS X|Macintosh/i.test(ua)) return "macOS";
  if (/Linux/i.test(ua)) return "Linux";
  return "Diğer";
};

const analyticsPageLabel = (hash = "") => {
  if (!hash || hash === "#/") return "Ana Sayfa";
  if (hash === "#/hakkimda") return "Hakkımda";
  if (hash === "#/hizmetler") return "Hizmetler";
  if (hash.startsWith("#/hizmetler/")) return "Hizmet Detayı";
  if (hash === "#/surec") return "Süreç";
  if (hash === "#/yorumlar") return "Değerli Yorumlarınız";
  if (hash === "#/icerikler") return "İçerikler";
  if (hash === "#/basinda-biz") return "Basında Biz";
  if (hash === "#/blog") return "Blog";
  if (hash.startsWith("#/blog/")) return "Blog Yazısı";
  if (hash === "#/yazar-basvuru") return "Yazar Başvurusu";
  if (hash === "#/yazarlar") return "Yazarlar";
  if (hash.startsWith("#/yazarlar/")) return "Yazar Profili";
  if (hash === "#/iletisim") return "İletişim";
  if (hash === "#/randevu") return "Randevu";
  if (hash === "#/gizlilik") return "Gizlilik";
  if (hash === "#/aydinlatma") return "Aydınlatma";
  if (hash === "#/cerez-politikasi") return "Çerez Politikası";
  return "Diğer";
};

const getApproxAnalyticsGeo = async () => {
  // Veri tasarrufu veya çok yavaş bağlantıda üçüncü taraf konum isteğini hiç
  // başlatma. Analitik kayıt yine oluşur; yalnızca yaklaşık konum boş kalır.
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (connection?.saveData || /(^|-)2g/.test(String(connection?.effectiveType || ""))) return {};

  try {
    const cached = JSON.parse(window.localStorage.getItem(ANALYTICS_GEO_KEY) || "null");
    if (cached?.savedAt && Date.now() - cached.savedAt < 24 * 60 * 60 * 1000) {
      return cached.data || {};
    }
  } catch {}

  try {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 3200);
    const response = await fetch(
      "https://ipwho.is/?fields=success,country,country_code,region,city,latitude,longitude,timezone",
      { signal: controller.signal }
    );
    window.clearTimeout(timeout);
    const data = await response.json();
    if (!data?.success) return {};
    const safe = {
      country: data.country || "",
      country_code: data.country_code || "",
      region: data.region || "",
      city: data.city || "",
      latitude:
        Number.isFinite(Number(data.latitude))
          ? Math.round(Number(data.latitude) * 10) / 10
          : null,
      longitude:
        Number.isFinite(Number(data.longitude))
          ? Math.round(Number(data.longitude) * 10) / 10
          : null,
      timezone: data.timezone?.id || data.timezone || "",
    };
    try {
      window.localStorage.setItem(
        ANALYTICS_GEO_KEY,
        JSON.stringify({ savedAt: Date.now(), data: safe })
      );
    } catch {}
    return safe;
  } catch {
    return {};
  }
};

const recordSiteVisit = async () => {
  if (typeof window === "undefined" || typeof navigator === "undefined") return;
  const hash = window.location.hash || "#/";
  if (
    hash === "#/admin" ||
    hash === "#/yazar-girisi" ||
    hash === "#/yazar-paneli"
  ) return;

  const visitorId = analyticsId(window.localStorage, ANALYTICS_VISITOR_KEY);
  const sessionId = analyticsId(window.sessionStorage, ANALYTICS_SESSION_KEY);
  const geo = await getApproxAnalyticsGeo();

  const payload = {
    visitor_id: visitorId,
    session_id: sessionId,
    path: hash || "#/",
    page_label: analyticsPageLabel(hash),
    page_title: document.title || "",
    referrer: document.referrer || "",
    device_type: analyticsDevice(),
    browser: analyticsBrowser(),
    operating_system: analyticsOS(),
    language: navigator.language || "",
    screen_size: `${window.screen?.width || 0}x${window.screen?.height || 0}`,
    timezone:
      geo.timezone ||
      Intl.DateTimeFormat().resolvedOptions().timeZone ||
      "",
    city: geo.city || "",
    region: geo.region || "",
    country: geo.country || "",
    country_code: geo.country_code || "",
    latitude: geo.latitude ?? null,
    longitude: geo.longitude ?? null,
    location_source: geo.city || geo.country ? "IP tabanlı yaklaşık" : "Konum yok",
  };

  try {
    await supabase.from("site_visits").insert(payload);
  } catch (error) {
    console.debug("Analytics kaydı atlandı:", error);
  }
};

const analyticsHost = (value = "") => {
  try {
    if (!value) return "Doğrudan";
    const host = new URL(value).hostname.replace(/^www\./, "");
    if (!host || host === window.location.hostname.replace(/^www\./, "")) return "Site içi";
    return host;
  } catch {
    return value ? "Diğer" : "Doğrudan";
  }
};

const getSharedBlogSlug = () => {
  if (typeof window === "undefined") return "";
  try {
    const params = new URLSearchParams(window.location.search || "");
    const querySlug = String(params.get("blog") || "").trim();
    if (querySlug) return createBlogSlug(decodeURIComponent(querySlug));
  } catch {}
  const hash = String(window.location.hash || "");
  if (!hash.startsWith("#/blog/")) return "";
  try {
    return createBlogSlug(decodeURIComponent(hash.slice("#/blog/".length).split(/[?&]/)[0].replace(/\/+$/, "")));
  } catch {
    return createBlogSlug(hash.slice("#/blog/".length).split(/[?&]/)[0].replace(/\/+$/, ""));
  }
};

function SiteApp() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
  const [homeTextSlide, setHomeTextSlide] = useState(0);
  const [showSiteIntro, setShowSiteIntro] = useState(() => {
    const hash = String(window.location.hash || "");
    const hasSharedBlog = Boolean(getSharedBlogSlug());
    if (USE_SILENT_THRESHOLD_INTRO && !hasSharedBlog && ["", "#/", "#/anasayfa", "#anasayfa"].includes(hash)) return true;
    return !hasSharedBlog && !hash.startsWith("#/") && !["#/admin", "#/yazar-girisi", "#/yazar-paneli"].includes(hash);
  });
  const [blogSlug, setBlogSlug] = useState(() => getSharedBlogSlug());
  const [blogContent, setBlogContent] = useState(() => mergeBilgeAkarArticle(defaultBlogContent));
  const [blogContentLoaded, setBlogContentLoaded] = useState(false);
  const [authorSlug, setAuthorSlug] = useState(() => {
    const hash = window.location.hash;
    return hash.startsWith("#/yazarlar/") ? hash.replace("#/yazarlar/", "") : "";
  });
  const [serviceDetailSlug, setServiceDetailSlug] = useState(() => {
    const hash = window.location.hash;
    return hash.startsWith("#/hizmetler/") ? hash.replace("#/hizmetler/", "") : "";
  });

  const defaultHomeContent = {
    eyebrow: "ÇİFT VE AİLE DANIŞMANI",
    titleLine: "Profesyonel",
    titleAccent: "Aile Danışmanlığı",
    description:
      "Her danışanın yaşam öyküsünü ve ihtiyaçlarını merkeze alan, güvenilir, etik ve profesyonel danışmanlık desteği.",
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
      image: aboutPhoto,
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
    if (!showSiteIntro || USE_SILENT_THRESHOLD_INTRO) return;

    const introTimer = window.setTimeout(() => {
      setShowSiteIntro(false);
    }, 3900);

    return () => window.clearTimeout(introTimer);
  }, [showSiteIntro]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroSlide((current) => (current + 1) % heroSlides.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, [heroSlides.length]);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [page, setPage] = useState(
    window.location.hash === "#/hakkimda"
      ? "about"
      : window.location.hash === "#/hizmetler" || window.location.hash.startsWith("#/hizmetler/")
      ? "services"
      : window.location.hash === "#/surec"
      ? "process"
      : window.location.hash === "#/yorumlar"
      ? "testimonials"
      : window.location.hash === "#/icerikler"
      ? "content"
      : window.location.hash === "#/basinda-biz"
      ? "press"
      : window.location.hash === "#/blog" || window.location.hash.startsWith("#/blog/") || Boolean(getSharedBlogSlug())
      ? "blog"
      : window.location.hash === "#/yazar-basvuru"
      ? "writerApplication"
      : window.location.hash === "#/yazarlar" || window.location.hash.startsWith("#/yazarlar/")
      ? "authors"
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
      : window.location.hash === "#/yazar-girisi" || window.location.hash === "#/yazar-paneli"
      ? "authorPortal"
      : "home"
  );

  // Her rota değişiminde yeni ekranın en üstten başlamasını garanti eder.
  // Hash değişimi sırasında tarayıcının önceki kaydırma konumunu geri yüklemesini
  // engellemek için render sonrasındaki karede de sıfırlıyoruz.
  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    const frame = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
    return () => {
      window.cancelAnimationFrame(frame);
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, [page, blogSlug, authorSlug, serviceDetailSlug]);

  useEffect(() => {
    const sharedSlug = getSharedBlogSlug();
    const params = new URLSearchParams(window.location.search || "");
    if (sharedSlug && params.get("blog")) {
      setPage("blog");
      setBlogSlug(sharedSlug);
      const cleanUrl = `${window.location.pathname}#/blog/${sharedSlug}`;
      window.history.replaceState(null, "", cleanUrl);
    }
  }, []);

  useEffect(() => {
    let idleId;
    let timeoutId;
    const run = () => Promise.resolve(recordSiteVisit()).catch(() => {});

    // Analitik, ilk ekranın boyanmasından sonra arka planda çalışır. Böylece
    // ziyaretçi ilk içerik için analitik/ağ isteğini beklemez.
    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(run, { timeout: 2400 });
    } else {
      timeoutId = window.setTimeout(run, 1400);
    }

    return () => {
      if (idleId && typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(idleId);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [page, blogSlug, authorSlug, serviceDetailSlug]);

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
    if (page !== "home") return undefined;
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
  }, [page]);

  useEffect(() => {
    if (page !== "services") return undefined;
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
  }, [page]);

  useEffect(() => {
    if (page !== "process") return undefined;
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
  }, [page]);

  useEffect(() => {
    if (page !== "about") return undefined;
    let active = true;
    const loadAboutContent = async () => {
      const { data, error } = await supabase.from("site_content").select("content").eq("id", "about").maybeSingle();
      if (!active) return;
      if (error) { console.error("Hakkımda içeriği yüklenemedi:", error); return; }
      if (data?.content) setAboutContent((current) => ({ ...current, ...data.content }));
    };
    loadAboutContent();
    return () => { active = false; };
  }, [page]);

  useEffect(() => {
    if (page !== "blog" && page !== "authors") return undefined;
    let active = true;

    const loadBlogContent = async () => {
      try {
        const { data, error } = await supabase
          .from("site_content")
          .select("content")
          .eq("id", "blog")
          .maybeSingle();

        if (!active) return;

        if (error) {
          console.error("Blog içeriği yüklenemedi:", error);
          setBlogContentLoaded(true);
          return;
        }

        if (data?.content) {
          setBlogContent((current) =>
            mergeBilgeAkarArticle({
              ...current,
              ...data.content,
              posts: Array.isArray(data.content.posts) ? data.content.posts : current.posts,
              categories: Array.isArray(data.content.categories) ? data.content.categories : current.categories,
              authors: Array.isArray(data.content.authors) ? data.content.authors : current.authors,
            })
          );
        }
      } catch (error) {
        if (active) console.error("Blog içeriği yüklenirken beklenmeyen hata:", error);
      } finally {
        if (active) setBlogContentLoaded(true);
      }
    };

    loadBlogContent();
    return () => { active = false; };
  }, [page, blogSlug, authorSlug]);

  useEffect(() => {
    const activeBlogPost = page === "blog" && blogSlug
      ? (Array.isArray(blogContent?.posts) ? blogContent.posts : []).find((post) => createBlogSlug(post.slug || post.title || "") === createBlogSlug(blogSlug))
      : null;
    const defaultSeo = {
      home: ["Kaan Özkan | Sosyal Hizmet Uzmanı & Aile Danışmanı", "Kaan Özkan ile bireysel, çift ve aile danışmanlığı; psikososyal destek ve profesyonel danışmanlık hizmetleri hakkında bilgi alın."],
      about: ["Hakkımda | Kaan Özkan", "Sosyal Hizmet Uzmanı ve Aile Danışmanı Kaan Özkan'ın mesleki yolculuğu, saha deneyimi ve danışmanlık yaklaşımı."],
      services: ["Çalışma Alanları | Kaan Özkan", "Bireysel danışmanlık, çift ve aile danışmanlığı, yas, boşanma ve farklı psikososyal güçlüklerde profesyonel çalışma alanlarını inceleyin."],
      process: ["Danışmanlık Süreci | Kaan Özkan", "Danışmanlık sürecinin nasıl ilerlediğini inceleyin."],
      testimonials: ["Değerli Yorumlarınız | Kaan Özkan", "Danışmanlık sürecine dair paylaşılan anonim danışan deneyimlerini ve değerli yorumları okuyun."],
      appointment: ["Randevu | Kaan Özkan", "Kaan Özkan ile ücretsiz ön görüşme talebinizi oluşturun; size uygun tarih ve saati seçin."],
      blog: ["Blog | Kaan Özkan", "Aile, ilişkiler, psikososyal destek, kişisel gelişim ve sosyal hizmet alanlarında bilgilendirici yazıları keşfedin."],
      contact: ["İletişim | Kaan Özkan", "Kaan Özkan ile telefon veya e-posta üzerinden iletişime geçin ve randevu süreci hakkında bilgi alın."],
      content: ["İçerikler | Kaan Özkan", "Podcast, video ve sosyal hizmet alanındaki güncel içerikleri inceleyin."],
      press: ["Basında Biz | Kaan Özkan", "Kaan Özkan'ın psikososyal danışmanlık ve aile danışmanlığı çalışmalarının basındaki yansımalarını inceleyin."],
      authors: ["Yazarlarımız | Kaan Özkan", "Sosyal hizmet, aile ve ilişkiler alanlarından yazarların güncel yazılarını ve profillerini keşfedin."],
      writerApplication: ["Yazar Başvurusu | Kaan Özkan", "Kaan Özkan blogunda yazmak için yazar başvurunuzu ve çalışma örneğinizi gönderin."],
      privacy: ["Gizlilik Politikası | Kaan Özkan", "Kaan Özkan web sitesi gizlilik politikası."],
      disclosure: ["KVKK Aydınlatma Metni | Kaan Özkan", "Kişisel verilerin işlenmesine ilişkin KVKK aydınlatma metni."],
      cookies: ["Çerez Politikası | Kaan Özkan", "Kaan Özkan web sitesi çerez politikası."],
      admin: ["Yönetim Paneli | Kaan Özkan", "Güvenli yönetim girişi."],
      authorPortal: ["Yazar Paneli | Kaan Özkan", "Güvenli yazar girişi."]
    };
    const seo = activeBlogPost
      ? [`${activeBlogPost.title} | Kaan Özkan`, activeBlogPost.excerpt || "Kaan Özkan blogunda güncel danışmanlık ve sosyal hizmet yazısı."]
      : defaultSeo[page];
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
    const privateScreen = page === "admin" || page === "authorPortal";
    meta("robots", privateScreen ? "noindex, nofollow, noarchive" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    meta("og:title", seo[0], true);
    meta("og:description", seo[1], true);
    meta("og:type", activeBlogPost ? "article" : "website", true);
    meta("og:locale", "tr_TR", true);
    meta("og:site_name", "Kaan Özkan | Sosyal Hizmet Uzmanı & Aile Danışmanı", true);
    meta("twitter:card", "summary_large_image");
    meta("twitter:title", seo[0]);
    meta("twitter:description", seo[1]);

    // STEP179 — Güncel site amblemini tarayıcı sekmesi ve sosyal paylaşım
    // görsel sinyallerinde kullan. Eski favicon/logo kalıntılarını temizle.
    document.head
      .querySelectorAll('link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]')
      .forEach((node) => node.remove());

    const favicon = document.createElement("link");
    favicon.rel = "icon";
    favicon.type = "image/png";
    favicon.href = kaanOzkanEmblem;
    document.head.appendChild(favicon);

    const shortcutIcon = document.createElement("link");
    shortcutIcon.rel = "shortcut icon";
    shortcutIcon.href = kaanOzkanEmblem;
    document.head.appendChild(shortcutIcon);

    const appleTouchIcon = document.createElement("link");
    appleTouchIcon.rel = "apple-touch-icon";
    appleTouchIcon.href = kaanOzkanEmblem;
    document.head.appendChild(appleTouchIcon);

    const socialLogoUrl = `${window.location.origin}/kaan-ozkan-share-logo.jpg?v=183`;
    meta("og:image", socialLogoUrl, true);
    meta("og:image:secure_url", socialLogoUrl, true);
    meta("og:image:type", "image/jpeg", true);
    meta("og:image:width", "1254", true);
    meta("og:image:height", "1254", true);
    meta("og:image:alt", "Kaan Özkan | Sosyal Hizmet Uzmanı & Aile Danışmanı", true);
    meta("twitter:image", socialLogoUrl);
    meta("twitter:card", "summary_large_image");

    // STEP123 -" Tek ve doğru ana alan adı (canonical) + sosyal URL sinyali.
    // Eski Vercel canonical etiketleri index.html'de kalsa bile temizlenir.
    const siteBaseUrl = "https://www.ailedanismanikaanozkan.com/";
    const currentHash = window.location.hash || "";
    const canonicalUrl = currentHash.startsWith("#/blog/")
      ? `${siteBaseUrl}${currentHash}`
      : siteBaseUrl;

    document.head.querySelectorAll('link[rel="canonical"]').forEach((node) => node.remove());
    const canonical = document.createElement("link");
    canonical.rel = "canonical";
    canonical.href = canonicalUrl;
    document.head.appendChild(canonical);
    meta("og:url", canonicalUrl, true);

    // Temel yapılandırılmış veri: Google'a site ve kişi ilişkisini daha net anlatır.
    const schemaId = "kaan-ozkan-seo-schema";
    document.getElementById(schemaId)?.remove();
    const schemaGraph = [
      {
        "@type": "WebSite",
        "@id": `${siteBaseUrl}#website`,
        url: siteBaseUrl,
        name: "Kaan Özkan | Sosyal Hizmet Uzmanı & Aile Danışmanı",
        inLanguage: "tr-TR"
      },
      {
        "@type": "Person",
        "@id": `${siteBaseUrl}#kaan-ozkan`,
        name: "Kaan Özkan",
        url: siteBaseUrl,
        jobTitle: "Sosyal Hizmet Uzmanı ve Aile Danışmanı",
        sameAs: ["https://www.instagram.com/ailedanismanikaanozkan/"]
      },
      {
        "@type": "WebPage",
        "@id": canonicalUrl,
        url: canonicalUrl,
        name: seo[0],
        description: seo[1],
        inLanguage: "tr-TR",
        isPartOf: { "@id": `${siteBaseUrl}#website` }
      }
    ];
    if (activeBlogPost) {
      schemaGraph.push({
        "@type": "BlogPosting",
        headline: activeBlogPost.title,
        description: activeBlogPost.excerpt || seo[1],
        mainEntityOfPage: canonicalUrl,
        image: activeBlogPost.image ? [activeBlogPost.image] : undefined,
        author: { "@type": "Person", name: activeBlogPost.author || "Kaan Özkan" },
        publisher: { "@id": `${siteBaseUrl}#kaan-ozkan` },
        inLanguage: "tr-TR"
      });
    }
    const schema = document.createElement("script");
    schema.id = schemaId;
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": schemaGraph
    });
    document.head.appendChild(schema);
  }, [page, blogSlug, blogContent]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
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

    /* 3D scroll geçiş sistemi */
    const cin3dObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("cin3d--visible");
            cin3dObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
    );

    document.querySelectorAll(".cin3d").forEach((el) => {
      cin3dObserver.observe(el);
    });

    document.querySelectorAll(".lcp__panel").forEach((el) => {
      cin3dObserver.observe(el);
    });

    /* =======================================================
       PERFORMANCE: rAF + cached parallax nodes + low-power mode
       Scroll sırasında her event'te DOM taraması / layout yapılmaz.
       ======================================================= */
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowCpu = Number(navigator.hardwareConcurrency || 8) <= 4;
    const lowMemory = "deviceMemory" in navigator && Number(navigator.deviceMemory || 8) <= 4;
    const compactViewport = window.matchMedia("(max-width: 900px)").matches;
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const dataSaver = Boolean(connection?.saveData) || /(^|-)2g/.test(String(connection?.effectiveType || ""));
    const liteMotion = prefersReducedMotion || lowCpu || lowMemory || compactViewport || dataSaver;

    document.documentElement.classList.toggle("perfLite", liteMotion);

    const heroBg = document.querySelector(".cinHero__bgImg");
    // Uzun sayfalarda her sahneye paralaks vermek düşük güçlü cihazlarda takılma
    // yaratıyordu. Sadece ilk altı sahne GPU hareketi alır; diğerleri sade kalır.
    const parallaxEls = liteMotion
      ? []
      : Array.from(document.querySelectorAll(".cin3dParallax")).slice(0, 6);

    let scrollRaf = 0;
    let lastProgress = -1;

    const renderScrollEffects = () => {
      scrollRaf = 0;

      const sy = window.scrollY || window.pageYOffset || 0;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const nextProgress = sy / max;

      // React state'i yalnızca görünür fark oluştuğunda güncelle.
      if (Math.abs(nextProgress - lastProgress) > 0.0025) {
        lastProgress = nextProgress;
        setScrollProgress(nextProgress);
      }

      if (liteMotion) return;

      if (heroBg) {
        // Hero çok aşağıdayken gereksiz GPU transform üretme.
        if (sy < window.innerHeight * 1.35) {
          heroBg.style.transform = `scale(1.06) translate3d(0, ${sy * 0.20}px, 0)`;
        }
      }

      const vh = window.innerHeight;
      for (const el of parallaxEls) {
        const rect = el.getBoundingClientRect();

        // Ekranın uzağındaki sahnelerde hiçbir transform hesabı yapma.
        if (rect.bottom < -vh * 0.30 || rect.top > vh * 1.30) continue;

        const center = rect.top + rect.height / 2;
        const progress = (vh / 2 - center) / vh;
        const depth = parseFloat(el.dataset.depth || "0.15");
        el.style.transform = `translate3d(0, ${progress * depth * 92}px, 0)`;
      }
    };

    const onScroll = () => {
      if (scrollRaf) return;
      scrollRaf = window.requestAnimationFrame(renderScrollEffects);
    };

    const onHashChange = () => {
      const nextPage =
        window.location.hash === "#/hakkimda"
          ? "about"
          : window.location.hash === "#/hizmetler" || window.location.hash.startsWith("#/hizmetler/")
          ? "services"
          : window.location.hash === "#/surec"
          ? "process"
          : window.location.hash === "#/yorumlar"
          ? "testimonials"
          : window.location.hash === "#/icerikler"
          ? "content"
          : window.location.hash === "#/basinda-biz"
          ? "press"
          : window.location.hash === "#/blog" || window.location.hash.startsWith("#/blog/")
          ? "blog"
          : window.location.hash === "#/yazar-basvuru"
          ? "writerApplication"
          : window.location.hash === "#/yazarlar" || window.location.hash.startsWith("#/yazarlar/")
          ? "authors"
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
          : window.location.hash === "#/yazar-girisi" || window.location.hash === "#/yazar-paneli"
          ? "authorPortal"
          : "home";
      setPage(nextPage);
      setBlogSlug(getSharedBlogSlug());
      setAuthorSlug(
        window.location.hash.startsWith("#/yazarlar/")
          ? window.location.hash.replace("#/yazarlar/", "")
          : ""
      );
      setServiceDetailSlug(
        window.location.hash.startsWith("#/hizmetler/")
          ? window.location.hash.replace("#/hizmetler/", "")
          : ""
      );
      setMenuOpen(false);
      window.scrollTo({ top: 0, behavior: "auto" });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onHashChange);
    renderScrollEffects();

    return () => {
      observer.disconnect();
      cin3dObserver.disconnect();
      if (scrollRaf) window.cancelAnimationFrame(scrollRaf);
      document.documentElement.classList.remove("perfLite");
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [page, blogSlug, authorSlug, serviceDetailSlug, blogContent.posts?.length]);

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

      {showSiteIntro && USE_SILENT_THRESHOLD_INTRO && (
        <SilentThresholdIntro onComplete={() => setShowSiteIntro(false)} />
      )}

      {showSiteIntro && !USE_SILENT_THRESHOLD_INTRO && (
        <div className="prm__wrap" aria-hidden="true">
          {/* Sinematik letterbox */}
          <div className="prm__bar prm__bar--t" />
          <div className="prm__bar prm__bar--b" />

          {/* Arka plan sahne */}
          <div className="prm__scene">
            <img className="prm__bg" src={heroSlide1} alt="" />
            <div className="prm__fog prm__fog--a" />
            <div className="prm__fog prm__fog--b" />
            <div className="prm__fog prm__fog--c" />
            <div className="prm__shade" />
            <div className="prm__vignette" />
            <div className="prm__grain" />
          </div>

          {/* Işık efektleri */}
          <div className="prm__rays">
            <div className="prm__ray prm__ray--1" />
            <div className="prm__ray prm__ray--2" />
            <div className="prm__ray prm__ray--3" />
          </div>

          {/* Çerçeve köşeleri */}
          <div className="prm__frame">
            <span className="prm__corner prm__corner--tl" />
            <span className="prm__corner prm__corner--tr" />
            <span className="prm__corner prm__corner--bl" />
            <span className="prm__corner prm__corner--br" />
            <span className="prm__hline prm__hline--t" />
            <span className="prm__hline prm__hline--b" />
            <span className="prm__vline prm__vline--l" />
            <span className="prm__vline prm__vline--r" />
          </div>

          {/* Ana içerik */}
          <div className="prm__stage">

            {/* 3D emblem */}
            <div className="prm__emblemWrap">
              <div className="prm__ring prm__ring--1" />
              <div className="prm__ring prm__ring--2" />
              <div className="prm__ring prm__ring--3" />
              <div className="prm__ring prm__ring--4" />
              <div className="prm__particles">
                <span /><span /><span /><span /><span /><span /><span /><span />
              </div>
              <div className="prm__emblemGlow" />
              <div className="prm__emblemBack"><img src={kaanOzkanEmblem} alt="" /></div>
              <div className="prm__emblemMid"><img src={kaanOzkanEmblem} alt="" /></div>
              <div className="prm__emblemFront"><img src={kaanOzkanEmblem} alt="" /></div>
              <div className="prm__sheen" />
            </div>

            {/* Metin */}
            <div className="prm__text">
              <span className="prm__badge">SOSYAL HİZMET UZMANI · AİLE DANIŞMANI</span>
              <h1 className="prm__title">KAAN <em>ÖZKAN</em></h1>
              <div className="prm__divider"><span /><i /><span /></div>
              <p className="prm__sub">Güven, etik ve insan odaklı profesyonel danışmanlık.</p>
            </div>

            {/* Alt bilgi çubuğu */}
            <div className="prm__footer">
              <span className="prm__footLine" />
              <span className="prm__footLabel">EST. 2024</span>
              <span className="prm__footDot" />
              <span className="prm__footLabel">İSTANBUL</span>
              <span className="prm__footDot" />
              <span className="prm__footLabel">TÜRKİYE</span>
              <span className="prm__footLine" />
            </div>
          </div>

          {/* Kapanış perdesi */}
          <div className="prm__curtain prm__curtain--l" />
          <div className="prm__curtain prm__curtain--r" />
          <div className="prm__flash" />
        </div>
      )}

      <div className="pageShell">
        <div
          className="scrollProgress"
          style={{ transform: `scaleX(${scrollProgress})` }}
          aria-hidden="true"
        />
        {page !== "admin" && page !== "authorPortal" && (
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
            <strong>İÇERİKLER</strong>
          </span>

          <span className="podcastTopStrip__center">
            <span className="podcastTopStrip__mic">🎙️</span>
            <span>Yeni podcast, video ve yazılar</span>
          </span>

          <span className="podcastTopStrip__listen">
            <span className="podcastTopStrip__play">▶</span>
            Keşfet
          </span>
        </a>
      )}
      <div inert={showSiteIntro && USE_SILENT_THRESHOLD_INTRO ? true : undefined} className={`step145Site ${USE_SILENT_THRESHOLD_INTRO ? "thresholdPreviewSite" : ""} ${showSiteIntro ? "step145Site--waiting" : "step145Site--ready"}`}>
      <header className={page === "admin" ? "topbar" : "topbar topbar--light"} style={page === "authorPortal" ? { display: "none" } : undefined}>
          <a href="#anasayfa" className="brand brand--newLogo brand--imageLogo" onClick={() => setMenuOpen(false)} aria-label="Kaan Özkan - Ana Sayfa">
            <span className="brandLogoArtwork" aria-hidden="true">
              <img src={kaanOzkanEmblem} alt="" decoding="async" />
            </span>
            <span className="brandLogoCopy">
              <small>SOSYAL HİZMET UZMANI &amp; AİLE DANIŞMANI</small>
              <strong>KAAN ÖZKAN</strong>
              <span className="brandLogoOrnament" aria-hidden="true">
                <svg viewBox="0 0 52 18" focusable="false">
                  <path d="M3 9h15M34 9h15" />
                  <path d="M18 9c5-1 8-4 10-8-5 1-8 4-10 8Z" />
                  <path d="M26 9c4-3 8-4 12-3-3 4-7 5-12 3Z" />
                  <path d="M24 10c-3 3-5 5-6 8 4-1 7-3 8-7" />
                  <path d="M28 10c3 2 6 4 9 4-2-4-5-5-9-4Z" />
                </svg>
              </span>
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
            <details className={`navContentMenu ${["content","blog","authors","writerApplication","press"].includes(page) ? "is-active" : ""}`}>
              <summary>
                İçerikler
                <span className="navContentMenu__chevron" aria-hidden="true">⌄</span>
              </summary>
              <div className="navContentMenu__panel">
                <a
                  href="#/blog"
                  className={page === "blog" ? "is-active" : ""}
                  onClick={(e) => { setMenuOpen(false); e.currentTarget.closest("details")?.removeAttribute("open"); }}
                >
                  <span className="navContentMenu__mark" aria-hidden="true">✦</span>
                  <span><strong>Blog</strong><small>Yazılar ve rehberler</small></span>
                </a>
                <a
                  href="#/yazarlar"
                  className={page === "authors" ? "is-active" : ""}
                  onClick={(e) => { setMenuOpen(false); e.currentTarget.closest("details")?.removeAttribute("open"); }}
                >
                  <span className="navContentMenu__mark" aria-hidden="true">✦</span>
                  <span><strong>Yazarlarımız</strong></span>
                </a>
                <a
                  href="#/icerikler"
                  className={page === "content" ? "is-active" : ""}
                  onClick={(e) => { setMenuOpen(false); e.currentTarget.closest("details")?.removeAttribute("open"); }}
                >
                  <span className="navContentMenu__mark" aria-hidden="true">✦</span>
                  <span><strong>Podcast & Video</strong><small>Dinle ve izle</small></span>
                </a>
                <a
                  href="#/basinda-biz"
                  className={page === "press" ? "is-active" : ""}
                  onClick={(e) => { setMenuOpen(false); e.currentTarget.closest("details")?.removeAttribute("open"); }}
                >
                  <span className="navContentMenu__mark" aria-hidden="true">✦</span>
                  <span><strong>Basında Biz</strong><small>Haberler ve yayınlar</small></span>
                </a>
              </div>
            </details>

            <a
              href="#/iletisim"
              className={page === "contact" ? "is-active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              İletişim
            </a>
          </nav>

          <div className="topActionStack">
            <a className="topCta" href="#/randevu">
              <Icon name="calendar" size={17} />
              RANDEVU AL
            </a>
            <a className="topWriterCta" href="#/yazar-basvuru">
              <span>YAZAR BAŞVURUSU</span><b>↗</b>
            </a>
          </div>

          <button className="menuBtn" onClick={() => setMenuOpen((v) => !v)} aria-label="Menüyü aç">
            <span />
            <span />
          </button>
        </header>

        {page === "about" ? (
          <AboutDetailPage content={aboutContent} />
        ) : page === "services" ? (
          serviceDetailSlug ? <ServiceArticlePage slug={serviceDetailSlug} fallbackContent={servicesContent} /> : <ServicesDetailPage content={servicesContent} />
        ) : page === "process" ? (
          <ProcessDetailPage content={processContent} />
        ) : page === "testimonials" ? (
          <TestimonialsPage content={processContent} />
        ) : page === "content" ? (
          <ContentDetailPage />
        ) : page === "press" ? (
          <PressPage />
        ) : page === "writerApplication" ? (
          <WriterApplicationPage />
        ) : page === "blog" ? (
          blogSlug ? <BlogArticlePage slug={blogSlug} content={blogContent} contentReady={blogContentLoaded} /> : <BlogPage content={blogContent} />
        ) : page === "authors" ? (
          authorSlug ? <AuthorProfilePage slug={authorSlug} content={blogContent} /> : <AuthorsPage content={blogContent} />
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
        ) : page === "authorPortal" ? (
          <AuthorPortalPage blogContent={blogContent} />
        ) : (
        <main className="lux155">
          <section
            className="lux155Hero"
            id="anasayfa"
            onMouseMove={handleHomeHeroPointer}
            onMouseLeave={resetHomeHeroPointer}
          >
            <div className="lux155Hero__media">
              <img
                className="lux155Hero__image"
                loading="eager"
                decoding="async"
                src={homeLightCinemaHero}
                alt=""
              />
              <div className="lux155Hero__veil" />
              <div className="lux155Hero__light lux155Hero__light--a" />
              <div className="lux155Hero__light lux155Hero__light--b" />
              <div className="lux155Hero__noise" />
            </div>

            <div className="lux155Hero__frame" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>

            <div className="lux155Hero__content">
              <div className="lux155Hero__copy" key={homeTextSlide}>
                <p className="lux155Hero__eyebrow">
                  {activeHomeText.eyebrow}
                </p>

                <h1>
                  <span>{activeHomeText.titleLine}</span>
                  <strong>{activeHomeText.titleAccent}</strong>
                </h1>

                <p className="lux155Hero__desc">
                  {activeHomeText.description}
                </p>

                <div className="lux155Hero__actions">
                  <a href="#/randevu" className="lux155Hero__primary">
                    <span>{homeContent.primaryCta}</span>
                    <i>↗</i>
                  </a>
                  <a href="#/hizmetler" className="lux155Hero__secondary">
                    <span>{homeContent.secondaryCta}</span>
                    <i>→</i>
                  </a>
                </div>
              </div>

              <div className="lux155Hero__signature">
                <div className="lux155Hero__signatureLine" />
                <span>
                  <small>SOSYAL HİZMET UZMANI &amp; AİLE DANIŞMANI</small>
                  <strong>Güvenle başlayan, kişiye özel bir süreç.</strong>
                </span>
              </div>
            </div>

            <div className="lux155Hero__rail">
              <div className="lux155Hero__railCard">
                <span>GÜVENLİ &amp; GİZLİ</span>
                <b>01</b>
              </div>
              <div className="lux155Hero__railCard">
                <span>PROFESYONEL DESTEK</span>
                <b>02</b>
              </div>
              <div className="lux155Hero__railCard">
                <span>KİŞİYE ÖZEL SÜREÇ</span>
                <b>03</b>
              </div>
            </div>

            <div className="lux155Hero__scroll" aria-hidden="true">
              <span />
              <small>KEŞFET</small>
            </div>
          </section>

          <section className="cin3d topCinePanel topCinePanel--story" aria-label="Butuncul danismanlik yaklasimi">
            <div className="topCinePanel__bg cin3dParallax" data-depth="0.11" aria-hidden="true">
              <img src={servicesHeroRoom} alt="" loading="lazy" decoding="async" />
              <div className="topCinePanel__veil" />
              <div className="topCinePanel__grain" />
            </div>

            <div className="topCinePanel__inner">
              <div className="topCinePanel__copy">
                <span className="topCinePanel__eyebrow">İNSAN ODAKLI DANIŞMANLIK</span>

                <h2>
                  Hikâyenizi yalnızca bir sorun olarak değil,
                  <em> bir bütün olarak </em>
                  ele alıyorum.
                </h2>

                <p>
                  Yaşam öykünüzü, ilişkilerinizi, sosyal çevrenizi ve güçlü yönlerinizi birlikte değerlendirerek
                  size özel, sürdürülebilir ve gerçekçi bir çalışma süreci oluşturmayı amaçlıyorum.
                </p>

                <a href="#/hakkimda" className="topCinePanel__cta">
                  Hakkımda Daha Fazla <span>↗</span>
                </a>
              </div>

              <div className="topCinePanel__visualStack" aria-hidden="true">
                <div className="topCinePanel__floating topCinePanel__floating--one">
                  <img src={serviceIndividualImage} alt="" loading="lazy" decoding="async" />
                </div>
                <div className="topCinePanel__floating topCinePanel__floating--two">
                  <img src={serviceCoupleImage} alt="" loading="lazy" decoding="async" />
                </div>
                <div className="topCinePanel__floating topCinePanel__floating--three">
                  <img src={servicePsychosocialImage} alt="" loading="lazy" decoding="async" />
                </div>
              </div>
            </div>

            <div className="topCinePanel__scrollHint" aria-hidden="true">
              <span />
              <small>DEVAM ET</small>
            </div>
          </section>

          <section className="cin3d topCinePanel topCinePanel--services" aria-label="Profesyonel calisma alanlari">
            <div className="topCinePanel__bg cin3dParallax" data-depth="0.14" aria-hidden="true">
              <img src={processHeroDesk} alt="" loading="lazy" decoding="async" />
              <div className="topCinePanel__veil topCinePanel__veil--services" />
              <div className="topCinePanel__grain" />
            </div>

            <div className="topCinePanel__inner topCinePanel__inner--services">
              <header className="topCineServices__head">
                <span>{homeContent.servicesEyebrow}</span>
                <h2>
                  Size uygun desteği
                  <strong> birlikte keşfedelim.</strong>
                </h2>
                <p>
                  Yaşadığınız travmatik olayları yalnızca tek bir sorun alanı üzerinden değil; kişilerarası
                  iletişiminiz, ilişkileriniz, yaşam konforunuz ve “Mikro - Mezzo - Makro” çevrenizle birlikte
                  değerlendiren bütüncül bir danışmanlık yaklaşımı.
                </p>
              </header>

              <div className="topCineServices__grid">
                <a href="#/hizmetler/bireysel-danismanlik" className="topCineServices__card">
                  <div className="topCineServices__cardBg">
                    <img src={serviceIndividualCinemaV2} alt="" loading="lazy" decoding="async" />
                    <div />
                  </div>
                  <div className="topCineServices__cardCopy">
                    <small>BİREYSEL ÇALIŞMA</small>
                    <h3>Bireysel Danışmanlık</h3>
                    <p>Anksiyete, Stres ve Duygu Düzenleme Güçlükleri</p>
                    <b>Detaylı İncele <i>↗</i></b>
                  </div>
                </a>

                <a href="#/hizmetler/cift-danismanligi" className="topCineServices__card">
                  <div className="topCineServices__cardBg">
                    <img src={serviceCoupleImage} alt="" loading="lazy" decoding="async" />
                    <div />
                  </div>
                  <div className="topCineServices__cardCopy">
                    <small>EVLİLİK & İLİŞKİ</small>
                    <h3>Evlilik Danışmanlığı</h3>
                    <p>İletişim Sorunları, İlişki Çatışmaları ve Güven Problemleri</p>
                    <b>Detaylı İncele <i>↗</i></b>
                  </div>
                </a>

                <a href="#/hizmetler/psikososyal-destek" className="topCineServices__card">
                  <div className="topCineServices__cardBg">
                    <img src={servicePsychosocialImage} alt="" loading="lazy" decoding="async" />
                    <div />
                  </div>
                  <div className="topCineServices__cardCopy">
                    <small>UYUM & DAYANIKLILIK</small>
                    <h3>Psikososyal Destek</h3>
                    <p>Yas ve Kayıp, Yaşam Olaylarına Uyum Sağlama ve Dayanıklılık</p>
                    <b>Detaylı İncele <i>↗</i></b>
                  </div>
                </a>
              </div>

              <a href="#/hizmetler/bekar-danismanligi" className="topCineServices__fifth">
                <div>
                  <small>ÖZDEĞER & İLİŞKİSEL FARKINDALIK</small>
                  <strong>Bekar Danışmanlığı</strong>
                  <p>Kendinizle, ilişkilerinizle ve yaşamınızla kurduğunuz bağa daha yakından bakmak için.</p>
                </div>
                <b>Tüm Alanı Keşfet <i>↗</i></b>
              </a>
            </div>

            <div className="topCinePanel__scrollHint" aria-hidden="true">
              <span />
              <small>ÇALIŞMA ALANLARI</small>
            </div>
          </section>

          <section className="cin3d cin3d--scope">
            <div className="cin3d__scopeInner">
              <div className="cin3d__scopeIcon"><Icon name="shield" size={22} /></div>
              <p>
                Danışmanlık hizmetleri sosyal hizmet ve aile danışmanlığı mesleki çerçevesinde sunulur.
              </p>
            </div>
          </section>

          <div className="lcp">
            <section className="lcp__panel lcp__panel--1">
              <div className="lcp__bg">
                <img src={serviceIndividualCinemaV2} alt="" loading="lazy" decoding="async" />
                <div className="lcp__veil" />
              </div>
              <div className="lcp__body">
                <div className="lcp__text">
                  <span className="lcp__tag">BİREYSEL GÖRÜŞME</span>
                  <h2 className="lcp__title">Kendinizi yeniden<br /><em>keşfetmek için</em><br />bir alan.</h2>
                  <p className="lcp__desc">Kaygı, öfke, benlik saygısı, duygusal dayanıklılık ve kişisel farkındalık üzerine bütüncül bireysel çalışma. Her seans, sizin hızınızda ilerler.</p>
                  <a href="#/hizmetler/bireysel-danismanlik" className="lcp__cta">Detaylı İncele <span>↗</span></a>
                </div>
                <div className="lcp__card">
                  <div className="lcp__cardImg">
                    <img src={processCinemaV2} alt="" loading="lazy" decoding="async" />
                  </div>
                  <div className="lcp__cardInfo">
                    <b>Güvenli Alan</b>
                    <p>Yargılanmadan dinlendiğiniz, kendinizi özgürce ifade edebildiğiniz profesyonel bir süreç.</p>
                  </div>
                  <div className="lcp__cardStats">
                    <span><b>Etik</b><small>Mesleki ilkeler</small></span>
                    <span><b>Gizli</b><small>Tam güvence</small></span>
                    <span><b>Özel</b><small>Size uygun</small></span>
                  </div>
                </div>
              </div>
            </section>

            <section className="lcp__panel lcp__panel--2">
              <div className="lcp__bg">
                <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=2400&q=95" alt="" loading="lazy" decoding="async" />
                <div className="lcp__veil lcp__veil--r" />
              </div>
              <div className="lcp__body lcp__body--flip">
                <div className="lcp__card">
                  <div className="lcp__cardImg">
                    <img src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=90" alt="" loading="lazy" decoding="async" />
                  </div>
                  <div className="lcp__cardInfo">
                    <b>İlişki Güçlendirme</b>
                    <p>Birbirinizi daha derin anlamak ve güvenli bir ilişki zemini inşa etmek için rehberlik.</p>
                  </div>
                </div>
                <div className="lcp__text">
                  <span className="lcp__tag">ÇİFT & AİLE DANIŞMANLIĞI</span>
                  <h2 className="lcp__title">İlişkiyi birlikte<br /><em>anlamak,</em><br />birlikte büyümek.</h2>
                  <p className="lcp__desc">İletişim çatışmaları, güven sorunları, duygusal uzaklaşma ve yaşam geçişlerinde çiftlere ve ailelere özel bütüncül danışmanlık.</p>
                  <a href="#/hizmetler/cift-danismanligi" className="lcp__cta">Detaylı İncele <span>↗</span></a>
                </div>
              </div>
            </section>

            <section className="lcp__panel lcp__panel--3">
              <div className="lcp__bg">
                <img src={servicePsychosocialFamilyV3} alt="" loading="lazy" decoding="async" />
                <div className="lcp__veil lcp__veil--ocean" />
              </div>
              <div className="lcp__body">
                <div className="lcp__text">
                  <span className="lcp__tag">PSİKOSOSYAL DESTEK</span>
                  <h2 className="lcp__title">Zor zamanlarda<br /><em>yanınızda,</em><br />güçlü yarınlar için.</h2>
                  <p className="lcp__desc">Kayıp, yas, göç, kriz ve yaşam geçişlerinde psikososyal güçlendirme. Sosyal destek ağınızı yeniden inşa edelim.</p>
                  <a href="#/hizmetler/psikososyal-destek" className="lcp__cta">Detaylı İncele <span>↗</span></a>
                </div>
                <div className="lcp__card">
                  <div className="lcp__cardImg">
                    <img src={servicePsychosocialFamilyV3} alt="" loading="lazy" decoding="async" />
                  </div>
                  <div className="lcp__cardInfo">
                    <b>Güçlenme Süreci</b>
                    <p>Zorluklar karşısında yeniden denge kurma ve mevcut kaynaklarınızı keşfetme yolculuğu.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="lcp__panel lcp__panel--4">
              <div className="lcp__bg">
                <img src={serviceGriefCinemaV2} alt="" loading="lazy" decoding="async" />
                <div className="lcp__veil lcp__veil--r" />
              </div>
              <div className="lcp__body lcp__body--flip">
                <div className="lcp__card">
                  <div className="lcp__cardImg">
                    <img src={serviceGriefCinemaV2} alt="" loading="lazy" decoding="async" />
                  </div>
                  <div className="lcp__cardInfo">
                    <b>Yeni Bir Başlangıç</b>
                    <p>Kayıpları anlamlandırarak, kimliğinizi yeniden yapılandırarak geleceğe güçlü adımlar atın.</p>
                  </div>
                </div>
                <div className="lcp__text">
                  <span className="lcp__tag">BOŞANMA & YAS DANIŞMANLIĞI</span>
                  <h2 className="lcp__title">Yeni bir sayfayı<br /><em>birlikte</em><br />açmak için.</h2>
                  <p className="lcp__desc">Boşanma süreci, ilişki kaybı ve yas — her biri çok boyutlu bir yaşam geçişidir. Duygusal yükünüzü hafifletmek için yanınızdayım.</p>
                  <a href="#/hizmetler/bosanma-ve-yas-danismanligi" className="lcp__cta">Detaylı İncele <span>↗</span></a>
                </div>
              </div>
            </section>
          </div>

          <section className="cin3d cin3d--trust">
            <div className="cin3d__trustBg" aria-hidden="true">
              <div className="cin3d__trustBgImg cin3dParallax" data-depth="0.18">
                <img loading="lazy" decoding="async" src={processCinemaV2} alt="" />
                <div className="cin3d__trustBgShade" />
              </div>
              <div className="cin3d__trustDecoRing" />
              <div className="cin3d__trustDecoRing cin3d__trustDecoRing--2" />
            </div>
            <div className="cin3d__trustContent">
              <div className="cin3d__trustMark">"</div>
              <span className="cin3d__eyebrow">{homeContent.trustStatementEyebrow}</span>
              <h2 className="cin3d__trustTitle">{homeContent.trustStatementTitle}</h2>
              <p className="cin3d__trustText">{homeContent.trustStatementText}</p>
              <a className="cin3d__trustCta" href="#/hakkimda">
                BENİ YAKINDAN TANIYIN
                <Icon name="arrow" size={16} />
              </a>
            </div>
          </section>

          <section className="homePress167" aria-labelledby="homePressTitle">
            <div className="homePress167__head">
              <div>
                <span className="homePress167__eyebrow">BASINDA BİZ</span>
                <h2 id="homePressTitle">Çalışmalarımızdan <em>basına yansıyanlar.</em></h2>
              </div>
              <div className="homePress167__intro">
                <p>Psikososyal danışmanlık ve aile danışmanlığı çalışmalarımızın yerel ve ulusal basındaki yansımalarından seçkiler.</p>
                <a href="#/basinda-biz">TÜM HABERLERİ GÖR <span>↗</span></a>
              </div>
            </div>

            <div className="homePress167__grid">
              {pressCoverage.slice(0, 3).map((item, index) => (
                <a
                  className="homePress167__card"
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  key={item.id}
                  aria-label={`${item.title} — ${item.source} kaynağında aç`}
                >
                  <div className={`homePress167__visual ${item.image ? "" : "homePress167__visual--plain"}`}>
                    {item.image ? (
                      <img src={item.image} alt="" loading="lazy" decoding="async" />
                    ) : (
                      <div className="homePress167__placeholder" aria-hidden="true">
                        <small>BASINDA</small>
                        <strong>BİZ</strong>
                      </div>
                    )}
                    <span>{item.source}</span>
                    <i>{String(index + 1).padStart(2, "0")}</i>
                  </div>
                  <div className="homePress167__body">
                    <small>{item.date}</small>
                    <h3>{item.title}</h3>
                    <p>{item.excerpt}</p>
                    <b>HABERİ KAYNAĞINDA OKU <span>↗</span></b>
                  </div>
                </a>
              ))}
            </div>
          </section>

          <section className="section contactSection" id="iletisim">
            <div className="contactLead reveal">
              <span className="sectionEyebrow">İLETİŞİME GEÇİN</span>
              <h2>İlk adımı birlikte atalım.</h2>
              <p>Görüşme ve randevu hakkında bilgi almak için telefon veya e-posta üzerinden iletişime geçebilirsiniz.</p>
            </div>

            <div className="contactBrand contactBrand--headerLogo reveal">
              <span className="brandLogoArtwork" aria-hidden="true">
                <img loading="lazy" decoding="async" src={kaanOzkanEmblem} alt="" />
              </span>
              <span className="brandLogoCopy">
                <small>SOSYAL HİZMET UZMANI &amp; AİLE DANIŞMANI</small>
                <strong>KAAN ÖZKAN</strong>
                <span className="brandLogoOrnament" aria-hidden="true">
                  <svg viewBox="0 0 52 18" focusable="false">
                    <path d="M3 9h15M34 9h15" />
                    <path d="M18 9c5-1 8-4 10-8-5 1-8 4-10 8Z" />
                    <path d="M26 9c4-3 8-4 12-3-3 4-7 5-12 3Z" />
                    <path d="M24 10c-3 3-5 5-6 8 4-1 7-3 8-7" />
                    <path d="M28 10c3 2 6 4 9 4-2-4-5-5-9-4Z" />
                  </svg>
                </span>
              </span>
            </div>

            <div className="contactGrid contactGrid--three">
              <a href="tel:+905376319317" className="contactCard reveal">
                <div className="contactIcon"><Icon name="phone" size={22} /></div>
                <strong>Telefon</strong>
                <span>+90 537 631 93 17</span>
              </a>

              <a href="mailto:ailedanismanikaanozkan@gmail.com" className="contactCard reveal">
                <div className="contactIcon"><Icon name="mail" size={22} /></div>
                <strong>E-posta</strong>
                <span>ailedanismanikaanozkan@gmail.com</span>
              </a>

              <a href="https://www.instagram.com/ailedanismanikaanozkan/" target="_blank" rel="noreferrer" className="contactCard reveal">
                <div className="contactIcon contactInstagramIcon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" role="img">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4.2" />
                    <circle cx="17.4" cy="6.7" r="1.1" className="instagramDot" />
                  </svg>
                </div>
                <strong>Instagram</strong>
                <span>@ailedanismanikaanozkan</span>
              </a>
            </div>
          </section>

          <footer className="premiumFooter">
            <div className="premiumFooter__top">
              <a href="#/anasayfa" className="premiumFooter__brand premiumFooter__brand--headerLogo">
                <span className="brandLogoArtwork" aria-hidden="true">
                  <img loading="lazy" decoding="async" src={kaanOzkanEmblem} alt="" />
                </span>
                <span className="brandLogoCopy">
                  <small>SOSYAL HİZMET UZMANI &amp; AİLE DANIŞMANI</small>
                  <strong>KAAN ÖZKAN</strong>
                  <span className="brandLogoOrnament" aria-hidden="true">
                  <svg viewBox="0 0 52 18" focusable="false">
                    <path d="M3 9h15M34 9h15" />
                    <path d="M18 9c5-1 8-4 10-8-5 1-8 4-10 8Z" />
                    <path d="M26 9c4-3 8-4 12-3-3 4-7 5-12 3Z" />
                    <path d="M24 10c-3 3-5 5-6 8 4-1 7-3 8-7" />
                    <path d="M28 10c3 2 6 4 9 4-2-4-5-5-9-4Z" />
                  </svg>
                </span>
                </span>
              </a>

              <div className="premiumFooter__nav">
                <a href="#/anasayfa">Ana Sayfa</a>
                <a href="#/hizmetler">Hizmetler</a>
                <a href="#/hakkimda">Hakkımda</a>
                <a href="#/surec">Süreç</a>
                <a href="#/icerikler">İçerikler</a>
                <a href="#/blog">Blog</a>
                <a href="#/basinda-biz">Basında Biz</a>
                <a href="#/iletisim">İletişim</a>
              </div>

              <div className="premiumFooter__contact">
                <a href="tel:+905376319317">
                  <small>Telefon</small>
                  <strong>+90 537 631 93 17</strong>
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
                <span>© 2026 Kaan Özkan · Tüm hakları saklıdır.</span>
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
                <span>•</span>
                <a href="#/yazar-girisi">Yazar Girişi</a>
              </div>
            </div>
          </footer>
        </main>
        )}
      </div>
          <Analytics />
      </div>
    </>
  );
}







// Bakım modu Hook çağrı sırasını etkilemeyecek ayrı bir sarmalayıcıda tutulur.
// Gerekirse yalnızca aşağıdaki değeri `true` yapmanız yeterlidir.
class SiteErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Site ekranı güvenli biçimde yakalandı:", error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main className="siteErrorBoundary" role="alert">
        <span>KAAN ÖZKAN</span>
        <h1>Bu ekran yüklenirken küçük bir sorun oluştu.</h1>
        <p>Sayfayı yenileyebilir veya ana sayfaya güvenle dönebilirsiniz.</p>
        <div>
          <button type="button" onClick={() => window.location.reload()}>Sayfayı Yenile</button>
          <a href="#/">Ana Sayfaya Dön</a>
        </div>
      </main>
    );
  }
}

function App() {
  const isMaintenanceMode = false;
  return isMaintenanceMode ? <Maintenance /> : <SiteErrorBoundary><SiteApp /></SiteErrorBoundary>;
}

function PressPage() {
  const sourceCount = new Set(pressCoverage.map((item) => item.source)).size;

  return (
    <main className="press167">
      <section className="press167Hero">
        <a className="press167Hero__back" href="#/">← ANA SAYFA</a>

        <div className="press167Hero__content">
          <span className="press167Hero__eyebrow">KAAN ÖZKAN · BASIN ARŞİVİ</span>
          <h1>Basında <em>Biz</em></h1>
          <p>
            Psikososyal destek, aile danışmanlığı ve toplumla yürüttüğümüz çalışmaların
            yerel ve ulusal basındaki yansımaları.
          </p>
          <button type="button" onClick={() => document.getElementById("press167Archive")?.scrollIntoView({ behavior: "smooth" })}>
            HABERLERİ İNCELE <Icon name="arrow" size={16} />
          </button>
        </div>

        <div className="press167Hero__stats" aria-label="Basın arşivi özeti">
          <div><strong>{String(pressCoverage.length).padStart(2, "0")}</strong><span>YAYIN</span></div>
          <i />
          <div><strong>{String(sourceCount).padStart(2, "0")}</strong><span>HABER KAYNAĞI</span></div>
        </div>
      </section>

      <section className="press167Lead">
        <span>GÖRÜNÜRLÜK DEĞİL, TOPLUMSAL FAYDA</span>
        <h2>Her haber, daha fazla kişinin <em>desteğe ulaşabilmesi</em> için açılan bir kapı.</h2>
        <p>
          Bu arşiv, çalışmalarımızı konu alan bağımsız haberleri bir araya getirir.
          Haber kartları sizi içeriğin yayımlandığı özgün kaynağa yönlendirir.
        </p>
      </section>

      <section className="press167Archive" id="press167Archive">
        <div className="press167Archive__head">
          <div><span>BASINDA YER ALANLAR</span><h2>Haber <em>Arşivi</em></h2></div>
          <p>{pressCoverage.length} yayın · En yeni haberlerden başlayarak</p>
        </div>

        <div className="press167Grid">
          {pressCoverage.map((item, index) => (
            <article className={`press167Card ${index === 0 ? "press167Card--featured" : ""} ${item.image ? "" : "press167Card--plain"}`} key={item.id}>
              <a className={`press167Card__visual ${item.image ? "" : "press167Card__visual--plain"}`} href={item.url} target="_blank" rel="noreferrer" aria-label={`${item.title} haberini aç`}>
                {item.image ? (
                  <img src={item.image} alt="" loading={index < 2 ? "eager" : "lazy"} decoding="async" />
                ) : (
                  <div className="press167Card__placeholder" aria-hidden="true">
                    <small>BASINDA</small>
                    <strong>BİZ</strong>
                  </div>
                )}
                <div className="press167Card__shade" />
                <span>{item.source}</span>
                <b>{String(index + 1).padStart(2, "0")}</b>
              </a>

              <div className="press167Card__body">
                <time>{item.date}</time>
                <h3><a href={item.url} target="_blank" rel="noreferrer">{item.title}</a></h3>
                <p>{item.excerpt}</p>
                <a className="press167Card__link" href={item.url} target="_blank" rel="noreferrer">
                  <span>HABERİ KAYNAĞINDA OKU</span><b>↗</b>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="press167Outro">
        <span>KAAN ÖZKAN</span>
        <h2>İnsan odaklı çalışmalar, <em>topluma dokunan izler.</em></h2>
        <div>
          <a href="#/hakkimda">HAKKIMDA <span>↗</span></a>
          <a href="#/iletisim">İLETİŞİME GEÇİN <span>↗</span></a>
        </div>
      </section>
    </main>
  );
}

function BlogPage({ content = defaultBlogContent }) {
  const [category, setCategory] = useState("Tümü");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(9);
  // Blogda tek, güçlü bir kapak kullanılır: daha hızlı açılır ve içerik odağı korunur.
  const cinemaSlides = useMemo(() => [blogEditorialSunlit], []);

  const categories = Array.isArray(content.categories) && content.categories.length
    ? content.categories
    : blogCategories;

  const authors = (Array.isArray(content.authors) ? content.authors : [])
    .filter((author)=>author?.slug && author?.name);

  const authorFor = (post) => {
    const slug = String(post?.authorSlug || "").trim();
    if (!slug) return null;
    return authors.find((author)=>String(author.slug || "").trim() === slug) || null;
  };

  const publishedPosts = (Array.isArray(content.posts) ? content.posts : [])
    .filter((post)=>post.status !== "draft")
    .sort((a,b)=>{
      const orderDiff = Number(b.sortOrder ?? 0) - Number(a.sortOrder ?? 0);
      if (orderDiff !== 0) return orderDiff;
      const aTime = Number(String(a.id || "").match(/blog-(\d+)/)?.[1] || 0);
      const bTime = Number(String(b.id || "").match(/blog-(\d+)/)?.[1] || 0);
      return bTime - aTime;
    });

  const featuredPost =
    publishedPosts.find((post)=>post.featured) ||
    publishedPosts[0] ||
    null;

  const latestPosts = publishedPosts
    .filter((post)=>post.slug !== featuredPost?.slug)
    .slice(0,3);

  const normalizedQuery = query.trim().toLocaleLowerCase("tr-TR");

  useEffect(() => {
    setVisibleCount(9);
  }, [category, normalizedQuery]);

  const filteredPosts = publishedPosts.filter((post)=>{
    const categoryMatch =
      category === "Tümü" ||
      String(post.category||"").toLocaleLowerCase("tr-TR") === category.toLocaleLowerCase("tr-TR");

    const author = authorFor(post);

    const queryMatch =
      !normalizedQuery ||
      `${post.title||""} ${post.excerpt||""} ${post.category||""} ${author?.name||""}`
        .toLocaleLowerCase("tr-TR")
        .includes(normalizedQuery);

    return categoryMatch && queryMatch;
  });

  return (
    <main className="blogV3">
      <section className="blogV3Hero">
        <div className="blogV3Hero__media blogV3Cinema" aria-hidden="true">
          {cinemaSlides.map((src, index) => (
            <div
              className={`blogV3Cinema__slide blogV3Cinema__slide--${index + 1}`}
              key={`blog-cinema-${index}`}
            >
              <img
                src={src}
                alt=""
                fetchPriority={index === 0 ? "high" : "auto"}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
              />
              <i className="blogV3Cinema__depth blogV3Cinema__depth--a"/>
              <i className="blogV3Cinema__depth blogV3Cinema__depth--b"/>
            </div>
          ))}
          <div className="blogV3Cinema__veil"/>
          <div className="blogV3Cinema__vignette"/>
          {cinemaSlides.length > 1 && <div className="blogV3Cinema__progress">
            <span/><span/><span/><span/>
          </div>}
          <div className="blogV3Hero__grain"/>
        </div>

        <div className="blogV3Hero__topline">
          <a href="#/" className="blogV3Hero__back">← ANA SAYFA</a>
        </div>

        <div className="blogV3Hero__stage">
          <div className="blogV3Hero__copy">
            <span className="blogV3Hero__eyebrow">KAAN ÖZKAN · YAZILAR</span>
            <h1>
              <span>Notlar</span>
              <strong>ve Perspektifler</strong>
            </h1>
            <p>
              Aile, ilişkiler ve sosyal yaşam üzerine; gündelik hayata temas eden,
              düşünmek için yer açan yazılar.
            </p>

            <div className="blogV3Hero__actions">
              <a href="#blogV3Archive">Yazılara Göz At <Icon name="arrow" size={15}/></a>
              <a href="#/yazarlar">Yazarları Tanı <span>↗</span></a>
              <a className="blogV3Hero__apply" href="#/yazar-basvuru">Yazar Başvurusu <span>↗</span></a>
            </div>
          </div>

        </div>

        <div className="blogV3Hero__scroll" aria-hidden="true">
          <i/>
          <span>SCROLL TO ENTER</span>
        </div>
      </section>

      <section className="blogV3Trust" aria-label="Blog yayın ilkeleri">
        <div><Icon name="shield" size={18}/><p><small>ÖZENLİ İÇERİK</small><strong>Bilgilendirme amaçlı, saygılı bir yayın dili</strong></p></div>
        <div><Icon name="users" size={18}/><p><small>EDİTÖRYAL İNCELEME</small><strong>Yazar başvuruları ve içerikler değerlendirilir</strong></p></div>
        <div><Icon name="heart" size={18}/><p><small>İNSAN ODAKLI</small><strong>Yaşama, ilişkilere ve sosyal bağlama yer açan notlar</strong></p></div>
      </section>

      {featuredPost && (
        <section className="blogV3Feature">
          <div className="blogV3SectionCode">
            <span>ÖNE ÇIKAN YAZI</span>
            <i/>
          </div>

          <div className="blogV3Feature__stage">
            <a className="blogV3Feature__visual" href={`#/blog/${featuredPost.slug}`}>
              <div className="blogV3Feature__image">
                <img src={featuredPost.image} alt={featuredPost.title}/>
                <div className="blogV3Feature__shine"/>
              </div>
            </a>

            <div className="blogV3Feature__content">
              <span className="blogV3Feature__category">{featuredPost.category}</span>
              <h2>
                <a href={`#/blog/${featuredPost.slug}`}>{featuredPost.title}</a>
              </h2>
              <p>{featuredPost.excerpt}</p>

              <div className="blogV3Feature__meta">
                <span>{featuredPost.date}</span>
                <i/>
                <span>{featuredPost.readTime}</span>
              </div>

              {authorFor(featuredPost) && (() => {
                const author = authorFor(featuredPost);
                return (
                  <a className="blogV3Feature__author" href={`#/yazarlar/${author.slug}`}>
                    <div>
                      {author.image
                        ? <img src={author.image} alt={author.name}/>
                        : <span>{author.name?.charAt(0)}</span>}
                    </div>
                    <p>
                      <small>YAZAR</small>
                      <strong>{author.name}</strong>
                      <em>{author.role || "Yazar"}</em>
                    </p>
                    <b>↗</b>
                  </a>
                );
              })()}

              <a className="blogV3Feature__read" href={`#/blog/${featuredPost.slug}`}>
                <span>YAZIYI OKU</span>
                <b>↗</b>
              </a>
            </div>
          </div>
        </section>
      )}

      <section className="blogV3Archive" id="blogV3Archive">
        <div className="blogV3Archive__head">
          <div>
            <span>YAZI ARŞİVİ</span>
            <h2>Okumaya <em>Devam Edin</em></h2>
          </div>
          <p>
            Konuya, yazara ya da bir kelimeye göre arayın; ilginizi çeken metinden
            devam edin.
          </p>
        </div>

        <div className="blogV3Tools">
          <label className="blogV3Search">
            <Icon name="search" size={16}/>
            <input
              value={query}
              onChange={(e)=>setQuery(e.target.value)}
              placeholder="Arşivde ara..."
            />
            <span>{String(filteredPosts.length).padStart(2,"0")} SONUÇ</span>
          </label>

          <div className="blogV3Categories">
            {categories.map((item)=>(
              <button
                type="button"
                key={item}
                className={category===item ? "is-active" : ""}
                onClick={()=>setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="blogV3Archive__resultLine" aria-live="polite">
          <span>{category === "Tümü" ? "Tüm yazılar" : category}</span>
          {normalizedQuery && <><i/> <b>“{query.trim()}” için arama sonuçları</b></>}
          {(normalizedQuery || category !== "Tümü") && <button type="button" onClick={()=>{setQuery("");setCategory("Tümü");}}>Filtreleri temizle</button>}
        </div>

        <div className="blogV3Mosaic">
          {filteredPosts.slice(0,visibleCount).map((post,index)=>{
            const author = authorFor(post);
            return (
              <article
                className="blogV3Card"
                key={post.id||post.slug}
              >
                <a className="blogV3Card__visual" href={`#/blog/${post.slug}`}>
                  <ReliableBlogPostImage src={post.image} alt={post.title}/>
                  <div className="blogV3Card__overlay"/>
                  <small>{post.category}</small>
                </a>

                <div className="blogV3Card__body">
                  <div className="blogV3Card__meta">
                    <time>{post.date}</time>
                    <span>{post.readTime}</span>
                  </div>

                  <h3><a href={`#/blog/${post.slug}`}>{post.title}</a></h3>
                  <p>{post.excerpt}</p>

                  <div className="blogV3Card__footer">
                    {author ? (
                      <a className="blogV3Card__author" href={`#/yazarlar/${author.slug}`}>
                        <div>
                          {author.image
                            ? <img src={author.image} alt={author.name}/>
                            : <span>{author.name?.charAt(0)}</span>}
                        </div>
                        <span>
                          <small>YAZAR</small>
                          <b>{author.name}</b>
                        </span>
                      </a>
                    ) : <span/>}

                    <a className="blogV3Card__arrow" href={`#/blog/${post.slug}`} aria-label="Yazıyı oku">↗</a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {filteredPosts.length === 0 && (
          <div className="blogV3Empty">
            <span>∅</span>
            <h3>Bu aramada bir dosya bulunamadı.</h3>
            <p>Farklı bir kategori veya arama kelimesi deneyebilirsiniz.</p>
          </div>
        )}

        {visibleCount < filteredPosts.length && (
          <button
            className="blogV3More"
            type="button"
            onClick={()=>setVisibleCount((value)=>value+6)}
          >
            <span>ARŞİVİ GENİŞLET</span>
            <Icon name="arrow" size={15}/>
          </button>
        )}
      </section>

      <section className="blogV3Manifesto">
        <span>DÜŞÜNMEK İÇİN YER AÇAN NOTLAR</span>
        <h2>
          Her metin bir cevap vermek zorunda değil.
          <em>Bazen doğru soruyu bırakması yeter.</em>
        </h2>
        <a href="#blogV3Archive">ARŞİVE DÖN ↗</a>
      </section>
    </main>
  );
}

function WriterApplicationPage() {
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", education: "", expertise: "", experienceYears: "", portfolioUrl: "", sampleTopic: "", intentLetter: "", consent: false,
  });
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [cvFile, setCvFile] = useState(null);
  const change = (key) => (event) => setForm((current) => ({ ...current, [key]: key === "consent" ? event.target.checked : event.target.value }));
  const submit = async (event) => {
    event.preventDefault();
    if (!form.consent) { setStatus("Başvuruyu gönderebilmek için aydınlatma metnini okuduğunuzu onaylamalısınız."); return; }
    setSaving(true); setStatus("");
    let cvPath = null;
    if (cvFile) {
      const allowedCvTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      if (!allowedCvTypes.includes(cvFile.type) || cvFile.size > 8 * 1024 * 1024) {
        setSaving(false); setStatus("CV yalnızca PDF, DOC veya DOCX formatında ve en fazla 8 MB olabilir."); return;
      }
      const cleanName = cvFile.name.toLocaleLowerCase("tr-TR").replace(/[^a-z0-9._-]+/g, "-");
      cvPath = `applications/${Date.now()}-${Math.random().toString(36).slice(2, 9)}-${cleanName}`;
      const { error: uploadError } = await supabase.storage.from("writer-cvs").upload(cvPath, cvFile, { cacheControl: "3600", upsert: false, contentType: cvFile.type });
      if (uploadError) { setSaving(false); setStatus(`CV yüklenemedi: ${uploadError.message || "Lütfen tekrar deneyin."}`); return; }
    }
    const { error } = await supabase.from("author_applications").insert({
      full_name: form.fullName.trim(), email: form.email.trim().toLowerCase(), phone: form.phone.trim() || null,
      education: form.education.trim(), expertise: form.expertise.trim(), experience_years: form.experienceYears.trim() || null,
      portfolio_url: form.portfolioUrl.trim() || null, sample_topic: form.sampleTopic.trim(), motivation: form.intentLetter.trim(), intent_letter: form.intentLetter.trim(), cv_path: cvPath,
    });
    if (error) {
      setStatus(error.code === "42P01" ? "Başvuru altyapısı henüz hazırlanmadı. Yönetici, SUPABASE-YAZAR-BASVURU-KURULUM.sql dosyasını bir kez çalıştırmalıdır." : `Başvuru gönderilemedi: ${error.message || "Lütfen tekrar deneyin."}`);
    } else {
      setStatus("Başvurunuz alındı. Uygunluk değerlendirmesinden sonra e-posta ile dönüş yapılacaktır.");
      setForm({ fullName: "", email: "", phone: "", education: "", expertise: "", experienceYears: "", portfolioUrl: "", sampleTopic: "", intentLetter: "", consent: false }); setCvFile(null);
    }
    setSaving(false);
  };

  return (
    <main className="writerApply">
      <section className="writerApply__hero">
        <a href="#/blog" className="writerApply__back">← BLOG'A DÖN</a>
        <div className="writerApply__heroCopy">
          <span>YAZAR BAŞVURUSU</span>
          <h1>İyi bir fikrin<br/><em>yeri burada.</em></h1>
          <p>Uzmanlık alanınızı, mesleki birikiminizi ve insana dair bakışınızı özenle paylaşmak için başvurun.</p>
        </div>
        <aside className="writerApply__criteria">
          <span>DEĞERLENDİRME ÖLÇÜTLERİ</span>
          <ul><li>İlgili alanda eğitim veya mesleki deneyim</li><li>Özgün, kaynaklı ve etik içerik yaklaşımı</li><li>Okurla açık ve saygılı bir dil kurabilme</li></ul>
        </aside>
      </section>
      <section className="writerApply__body">
        <div className="writerApply__intro"><span>BAŞVURU AKIŞI</span><h2>Önce sizi<br/><em>tanıyalım.</em></h2><p>Başvurular editoryal ekip tarafından incelenir. Uygun bulunan adaylara yazar profili ve güvenli içerik alanı tanımlanır; hiçbir metin editoryal onay olmadan yayımlanmaz.</p><div><b>01</b><p>Başvurunuz gelir</p><b>02</b><p>Uygunluk incelenir</p><b>03</b><p>Yazar alanınız açılır</p></div></div>
        <form className="writerApply__form" onSubmit={submit}>
          <div className="writerApply__formHead"><span>BAŞVURU FORMU</span><p><i>*</i> Zorunlu alanlar</p></div>
          <div className="writerApply__fields">
            <label><span>Ad Soyad <i>*</i></span><input required value={form.fullName} onChange={change("fullName")} placeholder="Adınız ve soyadınız"/></label>
            <label><span>E-posta <i>*</i></span><input required type="email" value={form.email} onChange={change("email")} placeholder="ornek@eposta.com"/></label>
            <label><span>Telefon</span><input value={form.phone} onChange={change("phone")} placeholder="İsterseniz ekleyin"/></label>
            <label><span>Deneyim yılı</span><input value={form.experienceYears} onChange={change("experienceYears")} placeholder="Örn. 4 yıl"/></label>
            <label className="is-wide"><span>Eğitim / Mezuniyet <i>*</i></span><input required value={form.education} onChange={change("education")} placeholder="Üniversite, bölüm, uzmanlık eğitimi..."/></label>
            <label className="is-wide"><span>Uzmanlık alanları <i>*</i></span><input required value={form.expertise} onChange={change("expertise")} placeholder="Örn. aile, çocuk, sosyal hizmet, psikososyal destek..."/></label>
            <label className="is-wide"><span>Portföy veya LinkedIn bağlantısı <small>(varsa)</small></span><input type="url" value={form.portfolioUrl} onChange={change("portfolioUrl")} placeholder="Varsa https:// bağlantınızı ekleyin"/></label>
            <label className="is-wide writerApply__cv"><span>CV / Özgeçmiş <small>(varsa)</small></span><input type="file" accept="application/pdf,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={(event)=>setCvFile(event.target.files?.[0] || null)}/><small>{cvFile ? `${cvFile.name} seçildi` : "PDF, DOC veya DOCX · En fazla 8 MB"}</small></label>
            <label className="is-wide"><span>İlk yazı için konu öneriniz <i>*</i></span><input required value={form.sampleTopic} onChange={change("sampleTopic")} placeholder="Okurla paylaşmak istediğiniz başlık"/></label>
            <label className="is-wide"><span>Niyet yazınız <i>*</i></span><textarea required rows="5" value={form.intentLetter} onChange={change("intentLetter")} placeholder="Yaklaşımınızı, deneyiminizi ve bu alana katkı sunma niyetinizi kısaca anlatın..."/></label>
          </div>
          <label className="writerApply__consent"><input type="checkbox" checked={form.consent} onChange={change("consent")}/><span>Kişisel verilerimin yazar başvurumun değerlendirilmesi amacıyla işlenmesine ilişkin <a href="#/aydinlatma" target="_blank">aydınlatma metnini</a> okudum.</span></label>
          {status && <p className={status.startsWith("Başvurunuz") ? "writerApply__message is-success" : "writerApply__message"}>{status}</p>}
          <button type="submit" disabled={saving}><span>{saving ? "GÖNDERİLİYOR..." : "BAŞVURUYU GÖNDER"}</span><b>↗</b></button>
        </form>
      </section>
    </main>
  );
}

const legalDocuments = {
  privacy: {
    eyebrow: "GİZLİLİK VE GÜVENLİK",
    title: "Gizlilik Politikası",
    intro: "Bu sayfa, siteyi kullanırken kişisel bilgilerinizin nasıl ele alındığını açık ve anlaşılır biçimde açıklar.",
    sections: [
      ["Kapsam", "Bu politika ailedanismanikaanozkan.com üzerinden sunulan bilgi, iletişim ve randevu talebi hizmetleri için geçerlidir."],
      ["Toplanan bilgiler", "İletişim veya randevu talebi gönderdiğinizde ad, yaş, telefon, e-posta ve talebinizle ilgili paylaştığınız bilgiler işlenebilir. Site kullanımına ilişkin sınırlı teknik kayıtlar da güvenlik ve performans amacıyla oluşabilir."],
      ["Kullanım amacı", "Bilgiler; talebinize dönüş yapmak, randevu sürecini yürütmek, hizmet kalitesini geliştirmek, güvenliği sağlamak ve yasal yükümlülükleri yerine getirmek amacıyla kullanılır."],
      ["Güvenlik ve saklama", "Bilgilere yalnızca işin gerektirdiği ölçüde erişilir. Veriler, ilgili amaç için gerekli süre boyunca ve mevzuatta öngörülen saklama süreleri çerçevesinde muhafaza edilir."],
      ["İletişim", "Gizlilikle ilgili sorularınızı ailedanismanikaanozkan@gmail.com adresine iletebilirsiniz."]
    ]
  },
  disclosure: {
    eyebrow: "6698 SAYILI KANUN",
    title: "KVKK Aydınlatma Metni",
    intro: "Kişisel verilerinizin işlenmesine ilişkin temel bilgileri, 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında burada bulabilirsiniz.",
    sections: [
      ["Veri sorumlusu", "Kişisel verileriniz, veri sorumlusu sıfatıyla Kaan Özkan tarafından işlenebilir. İletişim: ailedanismanikaanozkan@gmail.com."],
      ["İşlenen veri kategorileri", "İletişim ve randevu formları aracılığıyla kimlik ve iletişim bilgileri ile randevu talebiniz kapsamında doğrudan paylaştığınız bilgiler işlenebilir."],
      ["İşleme amaçları", "Veriler; iletişim kurmak, randevu talebini değerlendirmek, hizmet sürecini yürütmek, bilgi güvenliğini sağlamak, olası uyuşmazlıkları yönetmek ve yasal yükümlülükleri yerine getirmek için işlenebilir."],
      ["Toplama yöntemi ve hukuki sebep", "Veriler, internet sitesindeki formlar, e-posta veya telefon iletişimi aracılığıyla doğrudan sizden toplanır. İşleme; bir sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması, hukuki yükümlülüklerin yerine getirilmesi, meşru menfaat ve gerekli hâllerde açık rıza gibi Kanun'da yer alan işleme şartlarına dayanabilir."],
      ["Aktarım", "Veriler, yasal zorunluluklar dışında üçüncü kişilere satılmaz. Barındırma, veri tabanı ve teknik altyapı hizmeti sağlayıcılarına, yalnızca hizmetin sunulması ve güvenliğinin sağlanması için gerekli ölçüde ve mevzuata uygun olarak aktarılabilir."],
      ["Haklarınız ve başvuru", "Kanun'un 11. maddesi kapsamındaki bilgi talep etme, düzeltme, silme veya yok etme isteme ve işleme faaliyetlerine itiraz etme gibi haklarınızı kullanmak için talebinizi ailedanismanikaanozkan@gmail.com adresine iletebilirsiniz."]
    ]
  },
  cookies: {
    eyebrow: "ÇEREZLER VE TEKNİK VERİLER",
    title: "Çerez Politikası",
    intro: "Çerezler, sitenin güvenli ve işlevsel çalışmasına yardımcı olan küçük teknik kayıtlardır.",
    sections: [
      ["Zorunlu çerezler", "Sayfaların düzgün çalışması, güvenliğin sağlanması ve tercihlerin hatırlanması için zorunlu teknik kayıtlar kullanılabilir."],
      ["Analitik veriler", "Site performansını ve ziyaretçi deneyimini anlamak için toplulaştırılmış, mümkün olduğunca gizlilik odaklı analiz verileri kullanılabilir."],
      ["Tercihleriniz", "Tarayıcı ayarlarınızdan çerezleri silebilir veya engelleyebilirsiniz. Bazı çerezleri devre dışı bırakmanız sitenin belirli işlevlerini etkileyebilir."],
      ["İletişim", "Çerez uygulamalarıyla ilgili sorularınız için ailedanismanikaanozkan@gmail.com adresinden iletişime geçebilirsiniz."]
    ]
  }
};

function LegalPage({ type = "privacy" }) {
  const document = legalDocuments[type] || legalDocuments.privacy;
  const typeLabel = type === "disclosure" ? "AYDINLATMA" : type === "cookies" ? "ÇEREZLER" : "GİZLİLİK";

  return (
    <main className="legalPage">
      <section className="legalHero">
        <div className="legalHero__grid" aria-hidden="true" />
        <a className="legalBack" href="#/">← <span>ANA SAYFAYA DÖN</span></a>
        <div className="legalHero__copy">
          <span>{document.eyebrow}</span>
          <h1>{document.title}</h1>
          <p>{document.intro}</p>
        </div>
        <aside className="legalHero__card">
          <div className="legalHero__icon">§</div>
          <span>GÜNCEL BİLGİLENDİRME</span>
          <h2>Şeffaf ve anlaşılır</h2>
          <p>Bu metin, site üzerindeki veri işleme faaliyetleri için genel bilgilendirme sağlar.</p>
        </aside>
      </section>
      <section className="legalContent">
        <nav className="legalContent__toc" aria-label={`${document.title} başlıkları`}>
          <span>İÇİNDEKİLER</span>
          {document.sections.map(([heading], index) => <a key={heading} href={`#legal-${type}-${index + 1}`}>{String(index + 1).padStart(2, "0")} / {heading}</a>)}
        </nav>
        <article className="legalArticle">
          {document.sections.map(([heading, text], index) => (
            <section className="legalArticle__section" id={`legal-${type}-${index + 1}`} key={heading}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2>{heading}</h2>
              <p>{text}</p>
            </section>
          ))}
          <aside className="legalArticle__notice">
            <strong>Not</strong>
            <p>Bu metin genel site akışına göre hazırlanmıştır. Hukuki yükümlülüklerinizin eksiksiz doğrulanması için bir hukuk uzmanının incelemesi önerilir.</p>
          </aside>
        </article>
      </section>
    </main>
  );
}

function AuthorsPage({ content = defaultBlogContent }) {
  const authors = (Array.isArray(content.authors) ? content.authors : [])
    .filter((author)=>author?.slug && author?.name);

  const posts = (Array.isArray(content.posts) ? content.posts : [])
    .filter((post)=>post.status !== "draft");

  const countFor = (author) =>
    posts.filter((post)=>String(post.authorSlug||"")===String(author.slug||"")).length;

  return (
    <main className="authorsV3">
      <section className="authorsV3Hero">
        <a href="#/blog" className="authorsV3Hero__back">← BLOG'A DÖN</a>
        <div className="authorsV3Hero__copy">
          <h1>Yazarlar <em>ve Perspektifler</em></h1>
          <p>
            Farklı deneyim ve uzmanlık alanlarından gelen yazarların, insana ve
            ilişkilere dair notları.
          </p>
        </div>
      </section>

      <section className="authorsV3Grid">
        {authors.length ? authors.map((author)=>(
          <a href={`#/yazarlar/${author.slug}`} className="authorsV3Card" key={author.slug}>
            <div className="authorsV3Card__photo">
              {author.image
                ? <img src={author.image} alt={author.name}/>
                : <span>{author.name?.charAt(0)}</span>}
              <i/>
            </div>

            <div className="authorsV3Card__body">
              <span>YAZAR</span>
              <h2>{author.name}</h2>
              <p className="authorsV3Card__role">{author.role}</p>
              <p>{author.shortBio}</p>
              <div className="authorsV3Card__foot">
                <span><b>{String(countFor(author)).padStart(2,"0")}</b> YAYIN</span>
                <strong>PROFİLİ OKU ↗</strong>
              </div>
            </div>
          </a>
        )) : (
          <div className="authorsV3Empty">Henüz yazar eklenmedi.</div>
        )}
      </section>
    </main>
  );
}

function formatAuthorBiography(value = "") {
  const headingPattern = /^(mesleki uzmanlık alanları|uzmanlık alanları|eğitim|eğitim geçmişi|akademik eğitim|akademik geçmiş|akademik çalışmalar|akademik çalışma alanları|deneyim|mesleki deneyim|çalışma alanları|sertifikalar|ilgi alanları|üyelikler|projeler)(?:\s*:\s*|$)/i;

  return String(value)
    .replace(/\r\n?/g, "\n")
    .split(/\n\s*\n|\n(?=(?:Mesleki Uzmanlık Alanları|Uzmanlık Alanları|Eğitim(?: Geçmişi)?|Akademik Eğitim|Akademik Geçmiş|Akademik Çalışmalar|Akademik Çalışma Alanları|Deneyim|Mesleki Deneyim|Çalışma Alanları|Sertifikalar|İlgi Alanları|Üyelikler|Projeler)\s*:?)/i)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block, index) => {
      const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
      const firstLine = lines[0] || "";

      const headingMatch = firstLine.match(headingPattern);
      if (headingMatch) {
        const heading = headingMatch[0].replace(/:\s*$/, "").trim();
        const firstItem = firstLine.slice(headingMatch[0].length).replace(/^:\s*/, "").trim();
        const items = [firstItem, ...lines.slice(1)]
          .flatMap((line) => line.split(/\s*[•]\s*|\s*;\s*/))
          .map((line) => line.replace(/^[•\-–—]\s*/, "").trim())
          .filter(Boolean);
        return {
          type: "details",
          key: `bio-details-${index}`,
          heading,
          items: items.length ? items : ["Bilgi yakında eklenecek."],
        };
      }

      return { type: "paragraph", key: `bio-paragraph-${index}`, text: lines.join(" ") };
    });
}

function AuthorProfilePage({ slug, content = defaultBlogContent }) {
  const authors = (Array.isArray(content.authors) ? content.authors : [])
    .filter((item)=>item?.slug && item?.name);

  const author = authors.find((item)=>item.slug===slug);

  if (!author) {
    return <main className="blog99NotFound"><img src={kaanOzkanLogo2026} alt=""/><span>YAZARLAR</span><h1>Bu yazar bulunamadı.</h1><a href="#/yazarlar">Yazarlara Dön</a></main>;
  }

  const authorPosts = (Array.isArray(content.posts) ? content.posts : [])
    .filter((post)=>post.status !== "draft" && String(post.authorSlug||"")===String(author.slug||""))
    .sort((a,b)=>Number(b.sortOrder||0)-Number(a.sortOrder||0));
  const biographyBlocks = formatAuthorBiography(author.bio || author.shortBio);

  return (
    <main className="authorV3">
      <section className="authorV3Hero">
        <div className="authorV3Hero__ambient" aria-hidden="true"><img src={blogEditorialSunlit} alt="" /></div>
        <div className="authorV3Hero__top">
          <a href="#/yazarlar">← YAZARLAR</a>
          <span>YAZAR PROFİLİ</span>
        </div>

        <div className="authorV3Hero__layout">
          <div className="authorV3Hero__portrait">
            {author.image
              ? <img src={author.image} alt={author.name}/>
              : <span>{author.name?.charAt(0)}</span>}
            <div className="authorV3Hero__portraitFrame"/>
            <small>{author.role || "YAZAR"}</small>
          </div>

          <div className="authorV3Hero__copy">
            <span>HAKKINDA</span>
            <h1>{author.name}</h1>
            <p className="authorV3Hero__role">{author.role}</p>

            {author.shortBio && <p className="authorV3Hero__lead">{author.shortBio}</p>}

            <div className="authorV3Hero__stats">
              <article>
                <b>{String(authorPosts.length).padStart(2,"0")}</b>
                <small>YAYINLANMIŞ<br/>YAZI</small>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="authorV3Bio">
        <div className="authorV3Bio__label">
          <small>BİYOGRAFİ</small>
          <span>Çalışma yaklaşımı ve mesleki yolculuk</span>
        </div>
        <div className="authorV3Bio__content">
          {biographyBlocks.map((block) => block.type === "details" ? (
            <section className="authorV3Bio__details" key={block.key}>
              <h2>{block.heading}</h2>
              <ul>{block.items.map((item, index) => <li key={`${block.key}-${index}`}>{item}</li>)}</ul>
            </section>
          ) : <p key={block.key}>{block.text}</p>)}
        </div>
      </section>

      {authorPosts.length > 0 && (
        <section className="authorV3Works">
          <div className="authorV3Works__head">
            <span>YAZILAR</span>
            <h2>Yazarın <em>Yazıları</em></h2>
          </div>

          <div className="authorV3Works__grid">
            {authorPosts.map((post,index)=>(
              <a href={`#/blog/${post.slug}`} className="authorV3Work" key={post.id||post.slug}>
                <div>
                  <ReliableBlogPostImage src={post.image} alt={post.title}/>
                </div>
                <small>{post.category} · {post.readTime}</small>
                <h3>{post.title}</h3>
                <strong>YAZIYI OKU ↗</strong>
              </a>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

function ReliableBlogPostImage({ src, alt = "", className = "", eager = false }) {
  const fallback = defaultBlogContent.heroImage || servicesHeroRoom;
  const normalizedSrc = String(src || "").trim();
  const [resolvedSrc, setResolvedSrc] = useState(() => normalizedSrc || fallback);
  const [failedOnce, setFailedOnce] = useState(false);
  const blobUrlRef = useRef("");

  useEffect(() => {
    if (blobUrlRef.current) {
      try { URL.revokeObjectURL(blobUrlRef.current); } catch {}
      blobUrlRef.current = "";
    }
    setFailedOnce(false);
    setResolvedSrc(normalizedSrc || fallback);

    return () => {
      if (blobUrlRef.current) {
        try { URL.revokeObjectURL(blobUrlRef.current); } catch {}
        blobUrlRef.current = "";
      }
    };
  }, [normalizedSrc, fallback]);

  const tryBlobFallback = () => {
    if (failedOnce || !/^data:image\//i.test(normalizedSrc)) {
      setResolvedSrc(fallback);
      return;
    }

    setFailedOnce(true);

    try {
      const comma = normalizedSrc.indexOf(",");
      if (comma < 0) throw new Error("Geçersiz data görseli");

      const header = normalizedSrc.slice(0, comma);
      const payload = normalizedSrc.slice(comma + 1);
      const mime = header.match(/^data:([^;,]+)/i)?.[1] || "image/jpeg";
      const isBase64 = /;base64/i.test(header);
      const binary = isBase64 ? atob(payload) : decodeURIComponent(payload);

      // iOS WebView'da tek seferde çok büyük Uint8Array oluşturmak yerine
      // küçük parçalarla Blob üretmek daha kararlı çalışıyor.
      const chunkSize = 1024 * 64;
      const chunks = [];
      for (let offset = 0; offset < binary.length; offset += chunkSize) {
        const part = binary.slice(offset, offset + chunkSize);
        const bytes = new Uint8Array(part.length);
        for (let i = 0; i < part.length; i += 1) {
          bytes[i] = part.charCodeAt(i);
        }
        chunks.push(bytes);
      }

      const objectUrl = URL.createObjectURL(new Blob(chunks, { type: mime }));
      blobUrlRef.current = objectUrl;
      setResolvedSrc(objectUrl);
    } catch (error) {
      console.warn("Blog görseli alternatif biçimde açılamadı:", error);
      setResolvedSrc(fallback);
    }
  };

  return (
    <img
      className={className}
      src={resolvedSrc || fallback}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding={eager ? "sync" : "async"}
      onError={tryBlobFallback}
    />
  );
}

function BlogArticlePage({ slug, content = defaultBlogContent, contentReady = true }) {
  const posts=(Array.isArray(content.posts)?content.posts:[]).filter(post=>post.status!=="draft");
  const post=posts.find(item=>item.slug===slug);

  if(!post && !contentReady) {
    return (
      <main className="blog99Loading" aria-live="polite" aria-busy="true">
        <img src={kaanOzkanLogo2026} alt=""/>
        <span>BLOG</span>
        <div className="blog99Loading__line"/>
        <p>Yazı yükleniyor...</p>
      </main>
    );
  }

  if(!post) {
    return (
      <main className="blog99NotFound">
        <img src={kaanOzkanLogo2026} alt=""/>
        <span>BLOG</span>
        <h1>Bu yazı bulunamadı.</h1>
        <a href="#/blog">Blog'a Dön</a>
      </main>
    );
  }

  const paragraphs=Array.isArray(post.body)
    ? post.body
    : String(post.body||"").split(/\n\s*\n/).filter(Boolean);

  const authors=(Array.isArray(content.authors)?content.authors:[])
    .filter((item)=>item?.slug && item?.name);

  const postAuthorSlug=String(post.authorSlug||"").trim();
  const author=postAuthorSlug
    ? (authors.find((item)=>String(item.slug||"").trim()===postAuthorSlug)||null)
    : null;

  const articleShareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/?blog=${encodeURIComponent(post.slug)}`
      : `https://www.ailedanismanikaanozkan.com/?blog=${encodeURIComponent(post.slug)}`;

  const shareArticle=async()=>{
    try{
      if(navigator.share){
        await navigator.share({
          title:post.title,
          text:post.excerpt||"",
          url:articleShareUrl,
        });
        return;
      }

      await navigator.clipboard.writeText(articleShareUrl);
      window.alert("Yazının bağlantısı kopyalandı.");
    }catch(error){
      if(error?.name==="AbortError") return;

      try{
        await navigator.clipboard.writeText(articleShareUrl);
        window.alert("Yazının bağlantısı kopyalandı.");
      }catch{
        window.prompt("Yazının bağlantısını kopyalayın:",articleShareUrl);
      }
    }
  };

  const related=posts
    .filter((item)=>item.slug!==post.slug)
    .sort((a,b)=>{
      const aScore=(a.category===post.category ? 2 : 0)+(postAuthorSlug && a.authorSlug===postAuthorSlug ? 1 : 0);
      const bScore=(b.category===post.category ? 2 : 0)+(postAuthorSlug && b.authorSlug===postAuthorSlug ? 1 : 0);
      return bScore-aScore;
    })
    .slice(0,3);

  return (
    <main className="articleCinePage">
      <div className="articleCineProgress" aria-hidden="true"/>

      <section className="articleCineHero cin3d cin3d--visible articleV3Hero">
        <div className="articleCineHero__ambient" aria-hidden="true">
          <ReliableBlogPostImage src={post.image} alt="" eager />
          <span/>
        </div>

        <div className="articleCineHero__topbar">
          <a href="#/blog">← Blog'a Dön</a>
          <button type="button" onClick={shareArticle}>Paylaş ↗</button>
        </div>

        <div className="articleCineHero__inner">
          <div className="articleCineHero__copy">
            <span className="articleCineHero__eyebrow">{toCounselingLanguage(post.category)}</span>

            <h1>{toCounselingLanguage(post.title)}</h1>

            {post.excerpt && <p>{toCounselingLanguage(post.excerpt)}</p>}

            <div className="articleCineHero__meta">
              <time>{post.date}</time>
              <i/>
              <span>{post.readTime}</span>
            </div>

            {author && (
              <a className="articleCineHero__author" href={`#/yazarlar/${author.slug}`}>
                <div>
                  {author.image
                    ? <img src={author.image} alt={author.name}/>
                    : <span>{author.name?.charAt(0)}</span>}
                </div>

                <p>
                  <small>YAZAR</small>
                  <strong>{author.name}</strong>
                  <em>{author.role}</em>
                </p>

                <b>↗</b>
              </a>
            )}
          </div>

          <div className="articleCineHero__visual">
            <div className="articleCineHero__frame">
              <ReliableBlogPostImage src={post.image} alt={post.title} eager />
              <div className="articleCineHero__frameInfo">
                <span>{toCounselingLanguage(post.category)}</span>
                <small>{post.date} · {post.readTime}</small>
              </div>
            </div>
          </div>
        </div>

        <div className="articleCineHero__scroll" aria-hidden="true">
          <span/>
          <small>OKUMAYA BAŞLA</small>
        </div>
      </section>



      <section className={`articleCineBody ${author ? "has-author" : ""}`}>
        <article className="articleCineBody__article">
          {paragraphs.map((block,index)=>{
            const item = typeof block === "string" ? { type:"paragraph", text:block } : block;

            if(item?.type==="heading"){
              return (
                <div className="articleRichHeading articleRichHeading--plain" key={index}>
                  <h2>{toCounselingLanguage(item.text)}</h2>
                </div>
              );
            }

            if(item?.type==="riskTable"){
              return (
                <figure className="articleRichFigure articleRichFigure--risk" key={index}>
                  <div className={`articleRichRiskGrid ${(item.columns || []).length === 2 ? "is-two-columns" : ""}`}>
                    {(item.columns||[]).map((column,columnIndex)=>(
                      <section key={columnIndex}>
                        <div className="articleRichRiskGrid__head">
                          <h3>{toCounselingLanguage(column.title)}</h3>
                        </div>
                        <ul>
                          {(column.items||[]).map((entry,entryIndex)=><li key={entryIndex}>{toCounselingLanguage(entry)}</li>)}
                        </ul>
                      </section>
                    ))}
                  </div>
                  <figcaption>{toCounselingLanguage(item.caption)}</figcaption>
                </figure>
              );
            }

            if(item?.type==="impactDiagram"){
              return (
                <figure className="articleRichFigure articleRichFigure--impact" key={index}>
                  <div className="articleRichImpact articleRichImpact--source">
                    <div className="articleRichImpact__node is-top"><span>ANNE</span></div>
                    <div className="articleRichImpact__node is-left"><span>BABA</span></div>
                    <div className="articleRichImpact__node is-right"><span>BEBEK</span></div>
                    <div className="articleRichImpact__node is-bottom"><span>AİLE</span></div>

                    <div className="articleRichImpact__arrows" aria-hidden="true">
                      <span className="arrowStem arrowStem--vertical"></span>
                      <span className="arrowStem arrowStem--horizontal"></span>
                      <span className="arrowHead arrowHead--up"></span>
                      <span className="arrowHead arrowHead--down"></span>
                      <span className="arrowHead arrowHead--left"></span>
                      <span className="arrowHead arrowHead--right"></span>
                    </div>
                  </div>
                  <figcaption>{toCounselingLanguage(item.caption)}</figcaption>
                </figure>
              );
            }

            if(item?.type==="recommendation"){
              const parts=String(item.text||"").split(":");
              const recTitle=parts.length>1?parts.shift():"";
              const recBody=parts.join(":").trim();
              return (
                <section className="articlePlainRecommendation" key={index}>
                  {recTitle && <h3>{toCounselingLanguage(recTitle)}</h3>}
                  <p>{toCounselingLanguage(recBody || item.text)}</p>
                </section>
              );
            }

            if(item?.type==="references"){
              return (
                <div className="articleRichReferences" key={index}>
                  {(item.items||[]).map((reference,referenceIndex)=>(
                    <div className="articleRichReferences__plain articleRichReferences__numbered" key={referenceIndex}>
                      <span>{referenceIndex + 1}.</span>
                      <p>{toCounselingLanguage(String(reference||"").replace(/^\s*\d+\s*[-.)]\s*/, ""))}</p>
                    </div>
                  ))}
                </div>
              );
            }

            return (
              <div className="articleCineParagraph articleCineParagraph--plain" key={index}>
                <p>{toCounselingLanguage(item?.text || "")}</p>
              </div>
            );
          })}

          {post.quote && (
            <blockquote className="articleCineQuote">
              <span>“</span>
              <p>{toCounselingLanguage(post.quote)}</p>
            </blockquote>
          )}

          <div className="articleCineNote">
            <span>BİLGİLENDİRME</span>
            <p>
              Bu içerik genel bilgilendirme amacıyla hazırlanmıştır. Kişisel
              ihtiyaçların değerlendirilmesi için profesyonel görüşme gerekebilir.
            </p>
          </div>
        </article>

        <aside className="articleCineRail">
          <div className="articleCineRail__card">
            <span>YAZI BİLGİLERİ</span>

            <div className="articleCineRail__row">
              <small>KATEGORİ</small>
              <strong>{post.category}</strong>
            </div>

            <div className="articleCineRail__row">
              <small>OKUMA</small>
              <strong>{post.readTime}</strong>
            </div>

            <button type="button" onClick={shareArticle}>
              Yazıyı Paylaş
              <b>↗</b>
            </button>
          </div>

          {author && (
            <a className="articleCineRail__author" href={`#/yazarlar/${author.slug}`}>
              <div className="articleCineRail__avatar">
                {author.image
                  ? <img src={author.image} alt={author.name}/>
                  : <span>{author.name?.charAt(0)}</span>}
              </div>

              <small>YAZAR</small>
              <h3>{author.name}</h3>
              <p>{author.role}</p>
              <span>Yazar profilini görüntüle ↗</span>
            </a>
          )}
        </aside>
      </section>

      <section className="articleCineEnd">
        <div>
          <span>YAZININ SONU</span>
          <h2>
            Okuduğunuz için
            <strong>teşekkür ederiz.</strong>
          </h2>
          <p>
            İçeriği faydalı bulduysanız bağlantıyı paylaşarak daha fazla kişiye
            ulaşmasına katkı sağlayabilirsiniz.
          </p>
        </div>

        <button type="button" onClick={shareArticle}>
          Yazıyı Paylaş
          <span>↗</span>
        </button>
      </section>

      {related.length>0 && (
        <section className="articleCineRelated">
          <div className="articleCineRelated__head">
            <span>OKUMAYA DEVAM EDİN</span>
            <h2>Diğer yazılar</h2>
          </div>

          <div className="articleCineRelated__grid">
            {related.map((item,index)=>(
              <a
                className="articleCineRelated__card"
                href={`#/blog/${item.slug}`}
                key={item.slug}
              >
                <div>
                  <ReliableBlogPostImage src={item.image} alt={item.title}/>
                  <span>0{index+1}</span>
                </div>

                <small>{item.category}</small>
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
                <b>Yazıyı Oku ↗</b>
              </a>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

function ContactDetailPage() {
  return (
    <main className="contactCinePage">
      <section className="contactCineHero cin3d">
        <div className="contactCineHero__bg cin3dParallax" data-depth="0.13" aria-hidden="true">
          <img src={contactHeroCinemaV1} alt="" fetchPriority="high" decoding="async" />
          <div className="contactCineHero__veil" />
          <div className="contactCineHero__grain" />
        </div>

        <a className="contactCineHero__back" href="#/">
          <span>←</span>
          Ana Sayfaya Dön
        </a>

        <div className="contactCineHero__inner">
          <div className="contactCineHero__copy">
            <span className="contactCineHero__eyebrow">İLETİŞİM</span>
            <h1>
              İlk adımı
              <strong>birlikte atalım.</strong>
            </h1>
            <p>
              Görüşme ve randevu süreçleri hakkında bilgi almak için size uygun iletişim
              kanalını seçebilir, doğrudan ulaşabilirsiniz.
            </p>


          </div>

          <div className="contactCineHero__rail" aria-hidden="true">
            <div><b>01</b><span>TELEFON<br/>İLETİŞİMİ</span></div>
            <div><b>02</b><span>E-POSTA<br/>İLETİŞİMİ</span></div>
            <div><b>03</b><span>INSTAGRAM<br/>İLETİŞİMİ</span></div>
          </div>
        </div>

        <div className="contactCineHero__scroll" aria-hidden="true">
          <span />
          <small>İLETİŞİME GEÇ</small>
        </div>
      </section>

      <section className="contactCineIntro cin3d" id="contactCineChannels">
        <div className="contactCineIntro__inner">
          <span>DOĞRUDAN İLETİŞİM</span>
          <h2>
            Size uygun kanaldan
            <strong> ulaşabilirsiniz.</strong>
          </h2>
          <p>
            Görüşme ve randevu iletişimi telefon ve e-posta üzerinden yürütülür;
            güncel paylaşımlar ve bilgilendirici içerikler için Instagram hesabını da ziyaret edebilirsiniz.
          </p>
        </div>
      </section>

      <section className="contactCineChannels">
        <a className="contactCineChannel cin3d" href="tel:+905376319317">
          <div className="contactCineChannel__bg" aria-hidden="true">
            <img src={contactPhoneCinemaV1} alt="" loading="lazy" decoding="async" />
            <div />
          </div>

          <div className="contactCineChannel__inner">
            <span className="contactCineChannel__no">01</span>
            <div className="contactCineChannel__icon">
              <Icon name="phone" size={28} />
            </div>
            <span className="contactCineChannel__eyebrow">TELEFON</span>
            <h2>Doğrudan konuşmak için.</h2>
            <p>
              Görüşme ve randevu hakkında bilgi almak için telefon üzerinden doğrudan ulaşabilirsiniz.
            </p>
            <strong>+90 537 631 93 17</strong>
            <b>Şimdi Ara <span>↗</span></b>
          </div>
        </a>

        <a
          className="contactCineChannel contactCineChannel--reverse cin3d"
          href="mailto:ailedanismanikaanozkan@gmail.com"
        >
          <div className="contactCineChannel__bg" aria-hidden="true">
            <img src={contactEmailCinemaV1} alt="" loading="lazy" decoding="async" />
            <div />
          </div>

          <div className="contactCineChannel__inner">
            <span className="contactCineChannel__no">02</span>
            <div className="contactCineChannel__icon">
              <Icon name="mail" size={28} />
            </div>
            <span className="contactCineChannel__eyebrow">E-POSTA</span>
            <h2>Detaylı bilgi almak için.</h2>
            <p>
              Görüşme talebinizi ve merak ettiğiniz detayları e-posta üzerinden iletebilirsiniz.
            </p>
            <strong>ailedanismanikaanozkan@gmail.com</strong>
            <b>E-posta Gönder <span>↗</span></b>
          </div>
        </a>

        <a
          className="contactCineChannel cin3d"
          href="https://www.instagram.com/ailedanismanikaanozkan/"
          target="_blank"
          rel="noreferrer"
        >
          <div className="contactCineChannel__bg" aria-hidden="true">
            <img src={contactInstagramCinemaV1} alt="" loading="lazy" decoding="async" />
            <div />
          </div>

          <div className="contactCineChannel__inner">
            <span className="contactCineChannel__no">03</span>
            <div className="contactCineChannel__icon contactCineChannel__instagram" aria-hidden="true">
              <svg viewBox="0 0 24 24" role="img">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4.2" />
                <circle cx="17.4" cy="6.7" r="1.1" />
              </svg>
            </div>
            <span className="contactCineChannel__eyebrow">INSTAGRAM</span>
            <h2>Güncel içerikler için.</h2>
            <p>
              Güncel paylaşımlar, bilgilendirici içerikler ve duyurular için Instagram hesabını takip edebilirsiniz.
            </p>
            <strong>@ailedanismanikaanozkan</strong>
            <b>Profili Aç <span>↗</span></b>
          </div>
        </a>
      </section>

      <section className="contactCineAppointment cin3d">
        <div className="contactCineAppointment__bg" aria-hidden="true">
          <img src={contactAppointmentCinemaV1} alt="" loading="lazy" decoding="async" />
          <div />
        </div>

        <div className="contactCineAppointment__inner">
          <span>RANDEVU</span>
          <h2>
            Görüşmeye hazırsanız,
            <strong>ilk adımı şimdi atabilirsiniz.</strong>
          </h2>
          <p>
            Uygun hizmeti, görüşme biçimini ve tarih-saat seçeneğini belirleyerek
            güvenli randevu formunu kullanabilirsiniz.
          </p>

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
  const [availableTimes, setAvailableTimes] = useState([]);
  const [availabilityLoading, setAvailabilityLoading] = useState(false);
  const [availabilityError, setAvailabilityError] = useState("");
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
  const formattedAppointmentDate = form.date
    ? new Intl.DateTimeFormat("tr-TR", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(new Date(`${form.date}T12:00:00`))
    : "—";
  const can2 = form.service && form.format;
  const can3 = form.date && form.time;
  const phoneDigits = form.phone.replace(/\D/g, "");
  const hasValidPhone = phoneDigits.length >= 10 && phoneDigits.length <= 15;
  const hasValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
  const canSubmit = form.name.trim().length >= 3 && form.age.trim() && hasValidPhone && hasValidEmail && form.kvkk;

  useEffect(() => {
    if (!form.date) {
      setAvailableTimes([]);
      setAvailabilityError("");
      return;
    }

    let active = true;
    setAvailabilityLoading(true);
    setAvailabilityError("");

    supabase
      .rpc("get_public_appointment_slots", { target_date: form.date })
      .then(({ data, error }) => {
        if (!active) return;
        if (error) {
          console.error("Randevu uygunluğu alınamadı:", error);
          setAvailableTimes([]);
          setAvailabilityError("Bu tarihin uygunluk bilgisi şu anda alınamıyor. Lütfen başka bir tarih deneyin.");
          return;
        }

        const slots = (data || []).map((item) => ({
          time: String(item.slot_time || "").slice(0, 5),
          available: Boolean(item.is_available),
        }));
        setAvailableTimes(slots);
        if (form.time && !slots.some((slot) => slot.time === form.time && slot.available)) {
          setForm((current) => ({ ...current, time: "" }));
        }
      })
      .finally(() => {
        if (active) setAvailabilityLoading(false);
      });

    return () => {
      active = false;
    };
  }, [form.date]);

  const submit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    if (!canSubmit) {
      setSubmitError("Lütfen ad soyad, geçerli telefon ve e-posta bilgilerinizi girip aydınlatma metnini onaylayın.");
      return;
    }

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
      <main className="aptCineSuccess">
        <div className="aptCineSuccess__bg" aria-hidden="true">
          <img src={appointmentSunlitThresholdV1} alt="" />
          <div />
        </div>

        <div className="aptCineSuccess__card">
          <div className="aptCineSuccess__icon">
            <Icon name="check" size={34} />
          </div>

          <span>RANDEVU TALEBİ ALINDI</span>
          <h1>
            Teşekkürler,
            <strong>{form.name.split(" ")[0]}.</strong>
          </h1>

          <p>
            Randevu talebiniz güvenle kaydedildi. Uygunluk kontrolü tamamlandığında
            sizinle tercih ettiğiniz iletişim kanalı üzerinden dönüş yapılacaktır.
          </p>

          <div className="aptCineSuccess__summary">
            <div>
              <small>HİZMET</small>
              <strong>{services.find((s) => s[0] === form.service)?.[2]}</strong>
            </div>
            <div>
              <small>GÖRÜŞME</small>
              <strong>{form.format}</strong>
            </div>
            <div>
              <small>TARİH</small>
              <strong>{formattedAppointmentDate}</strong>
            </div>
            <div>
              <small>SAAT</small>
              <strong>{form.time}</strong>
            </div>
          </div>

          <section className="aptCineSuccess__next" aria-label="Randevu talebi sonraki adımlar">
            <span>SONRAKİ ADIMLAR</span>
            <ol>
              <li><b>1</b><p><strong>Uygunluk kontrol edilir</strong><small>Seçtiğiniz tarih ve saat değerlendirilir.</small></p></li>
              <li><b>2</b><p><strong>Sizinle iletişime geçilir</strong><small>Telefon veya e-posta üzerinden randevu teyidi paylaşılır.</small></p></li>
              <li><b>3</b><p><strong>Görüşme planlanır</strong><small>Görüşme biçimi ve gerekli bilgiler netleştirilir.</small></p></li>
            </ol>
          </section>

          <div className="aptCineSuccess__assurance">
            <Icon name="shield" size={18}/>
            <p>Bilgileriniz yalnızca randevu talebinin yürütülmesi amacıyla işlenir. Süreçle ilgili bir sorunuz olursa <a href="tel:+905376319317">bize ulaşabilirsiniz.</a></p>
          </div>

          <div className="aptCineSuccess__actions">
            <a className="is-secondary" href="tel:+905376319317">Sorularım Var <Icon name="phone" size={15} /></a>
            <a href="#/">Ana Sayfaya Dön <Icon name="arrow" size={15} /></a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="aptCinePage">
      <section className="aptCineHero cin3d">
        <div className="aptCineHero__bg cin3dParallax" data-depth="0.13" aria-hidden="true">
          <img src={appointmentSunlitThresholdV1} alt="" fetchPriority="high" decoding="async" />
          <div className="aptCineHero__veil" />
          <div className="aptCineHero__grain" />
        </div>

        <a className="aptCineHero__back" href="#/">
          <span>←</span>
          Ana Sayfaya Dön
        </a>

        <div className="aptCineHero__inner">
          <div className="aptCineHero__copy">
            <span className="aptCineHero__eyebrow">ÜCRETSİZ ÖN GÖRÜŞME</span>
            <h1>
              İlk adımı
              <strong>birlikte atalım.</strong>
            </h1>

            <p>
              İhtiyacınızı kısaca anlayalım, size uygun danışmanlık biçimini birlikte
              belirleyelim ve sürecin sizin için doğru olup olmadığını değerlendirelim.
            </p>

            <div className="aptCineHero__trust">
              <div>
                <Icon name="shield" size={19}/>
                <span><strong>Gizlilik</strong><small>Bilgileriniz özenle korunur.</small></span>
              </div>
              <div>
                <Icon name="clock" size={19}/>
                <span><strong>Ön Görüşme</strong><small>İhtiyacı netleştirme odaklı.</small></span>
              </div>
            </div>
          </div>

          <aside className="aptCineHero__rail" aria-hidden="true">
            <div><b>01</b><span>HİZMET<br/>SEÇİMİ</span></div>
            <div><b>02</b><span>TARİH &<br/>SAAT</span></div>
            <div><b>03</b><span>İLETİŞİM<br/>BİLGİLERİ</span></div>
          </aside>
        </div>

        <div className="aptCineHero__scroll" aria-hidden="true">
          <span />
          <small>RANDEVU OLUŞTUR</small>
        </div>
      </section>

      <section className="aptCineIntro cin3d">
        <div className="aptCineIntro__inner">
          <span>NASIL İLERLİYOR?</span>

          <h2>
            Üç adımda
            <strong>randevu talebinizi oluşturun.</strong>
          </h2>

          <p>
            Hizmet alanını seçin, size uygun tarih ve saati belirleyin,
            ardından iletişim bilgilerinizi bırakın.
          </p>
        </div>

        <div className="aptCineIntro__steps">
          {[
            ["01","Hizmeti seçin","Size en yakın çalışma alanını belirleyin."],
            ["02","Tarih ve saat","Uygun görüşme zamanını seçin."],
            ["03","Bilgilerinizi bırakın","Size ulaşabilmemiz için temel bilgileri girin."],
          ].map((item)=>(
            <article key={item[0]}>
              <span>{item[0]}</span>
              <h3>{item[1]}</h3>
              <p>{item[2]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="aptCineForm">
        <div className="aptCineForm__bg" aria-hidden="true">
          <img src={processHeroDesk} alt="" loading="lazy" decoding="async" />
          <div />
        </div>

        <div className="aptCineForm__shell">
          <aside className="aptCineProgress">
            <span>RANDEVU SÜRECİ</span>

            {[1,2,3].map((n)=>(
              <button
                key={n}
                type="button"
                className={step === n ? "is-current" : step > n ? "is-done" : ""}
                onClick={()=>{
                  if (n === 1) setStep(1);
                  if (n === 2 && can2) setStep(2);
                  if (n === 3 && can2 && can3) setStep(3);
                }}
              >
                <b>{step > n ? "✓" : `0${n}`}</b>
                <span>
                  <strong>{n === 1 ? "Hizmet Seçimi" : n === 2 ? "Tarih & Saat" : "İletişim Bilgileri"}</strong>
                  <small>{n === 1 ? "Çalışma alanı ve görüşme biçimi" : n === 2 ? "Uygun zaman seçimi" : "Randevu için temel bilgiler"}</small>
                </span>
              </button>
            ))}

            <div className="aptCineProgress__note">
              <Icon name="shield" size={18}/>
              <p>
                Randevu formunda yalnızca süreç için gerekli temel bilgiler talep edilir.
              </p>
            </div>
          </aside>

          <form className="aptCineCard" onSubmit={submit}>
            {step === 1 && (
              <div className="aptCineStep">
                <header>
                  <span>01 / HİZMET SEÇİMİ</span>
                  <h2>Hangi konuda görüşmek istersiniz?</h2>
                  <p>Kararsızsanız “Ön Görüşme” seçeneğini tercih edebilirsiniz.</p>
                </header>

                <div className="aptCineServices">
                  {services.map((service,index)=>(
                    <button
                      type="button"
                      key={service[0]}
                      className={form.service === service[0] ? "is-selected" : ""}
                      onClick={()=>setForm({...form,service:service[0]})}
                    >
                      <span className="aptCineServices__no">0{index+1}</span>
                      <div className="aptCineServices__icon">
                        <Icon name={service[1]} size={22}/>
                      </div>
                      <strong>{service[2]}</strong>
                      <p>{service[3]}</p>
                      <b>{form.service === service[0] ? "✓" : "↗"}</b>
                    </button>
                  ))}
                </div>

                <div className="aptCineFormat">
                  <span>GÖRÜŞME BİÇİMİ</span>
                  <div>
                    {[
                      ["Online Görüşme","video"],
                      ["Yüz Yüze Görüşme","map"],
                    ].map((item)=>(
                      <button
                        key={item[0]}
                        type="button"
                        className={form.format === item[0] ? "is-selected" : ""}
                        onClick={()=>setForm({...form,format:item[0]})}
                      >
                        <Icon name={item[1]} size={19}/>
                        <strong>{item[0]}</strong>
                        <span>{form.format === item[0] ? "✓" : ""}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="aptCineActions">
                  <span />
                  <button type="button" disabled={!can2} onClick={()=>setStep(2)}>
                    Tarih ve Saat Seç
                    <Icon name="arrow" size={15}/>
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="aptCineStep">
                <header>
                  <span>02 / TARİH & SAAT</span>
                  <h2>Size uygun zamanı seçin.</h2>
                  <p>Uygun tarih ve saat seçiminizi aşağıdaki alandan yapabilirsiniz.</p>
                </header>

                <div className="aptCineDate">
                  <label>
                    <span>GÖRÜŞME TARİHİ</span>
                    <input
                      type="date"
                      min={new Date().toISOString().slice(0, 10)}
                      value={form.date}
                      onChange={(e)=>setForm({...form,date:e.target.value,time:""})}
                    />
                  </label>

                  <div className="aptCineTimes">
                    <span>UYGUN SAAT</span>
                    <div>
                      {!form.date ? (
                        <p className="aptCineTimes__hint">Önce görüşme tarihi seçin.</p>
                      ) : availabilityLoading ? (
                        <p className="aptCineTimes__hint">Uygun saatler kontrol ediliyor...</p>
                      ) : availabilityError ? (
                        <p className="aptCineTimes__hint is-error">{availabilityError}</p>
                      ) : availableTimes.map((slot)=>(
                        <button
                          type="button"
                          key={slot.time}
                          className={`${form.time === slot.time ? "is-selected" : ""} ${!slot.available ? "is-unavailable" : ""}`}
                          disabled={!slot.available}
                          onClick={()=>setForm({...form,time:slot.time})}
                        >
                          {slot.time}{!slot.available ? " · Dolu" : ""}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="aptCineNotice">
                  <Icon name="info" size={18}/>
                  <p>
                    Seçtiğiniz randevu talebi kaydedildikten sonra uygunluk kontrol edilerek
                    sizinle iletişime geçilir.
                  </p>
                </div>

                <div className="aptCineActions">
                  <button type="button" className="is-secondary" onClick={()=>setStep(1)}>
                    ← Geri
                  </button>
                  <button type="button" disabled={!can3} onClick={()=>setStep(3)}>
                    Bilgilerime Geç
                    <Icon name="arrow" size={15}/>
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="aptCineStep">
                <header>
                  <span>03 / İLETİŞİM BİLGİLERİ</span>
                  <h2>Size nasıl ulaşabiliriz?</h2>
                  <p>Yalnızca randevu süreci için gerekli temel bilgileri istiyoruz.</p>
                </header>

                <div className="aptCineFields">
                  <label>
                    <span>Ad Soyad *</span>
                    <input
                      value={form.name}
                      onChange={(e)=>setForm({...form,name:e.target.value})}
                      placeholder="Adınız ve soyadınız"
                      required
                    />
                  </label>

                  <label>
                    <span>Yaş *</span>
                    <input
                      type="number"
                      min="1"
                      max="120"
                      value={form.age}
                      onChange={(e)=>setForm({...form,age:e.target.value})}
                      placeholder="Yaşınız"
                      required
                    />
                  </label>

                  <label>
                    <span>Telefon *</span>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e)=>setForm({...form,phone:e.target.value})}
                      placeholder="+90 5xx xxx xx xx"
                      required
                    />
                  </label>

                  <label>
                    <span>E-posta *</span>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e)=>setForm({...form,email:e.target.value})}
                      placeholder="ornek@email.com"
                      required
                    />
                  </label>

                  <label className="aptCineFields__full">
                    <span>Kısa Not <small>(isteğe bağlı)</small></span>
                    <textarea
                      rows="5"
                      value={form.note}
                      onChange={(e)=>setForm({...form,note:e.target.value})}
                      placeholder="Görüşme talebinizin genel çerçevesini kısaca yazabilirsiniz. Lütfen gerekli olmayan sağlık veya hassas kişisel bilgileri paylaşmayın."
                    />
                  </label>
                </div>

                <div className="aptCineKvkk">
                  <button
                    type="button"
                    className={form.kvkk ? "is-checked" : ""}
                    onClick={()=>setForm({...form,kvkk:!form.kvkk})}
                  >
                    {form.kvkk ? "✓" : ""}
                  </button>

                  <p>
                    <a href="#/aydinlatma" target="_blank">KVKK Aydınlatma Metni</a>'ni okudum
                    ve randevu süreci için gerekli kişisel verilerin işlenmesine ilişkin bilgilendirildim.
                  </p>
                </div>

                <div className="aptCineSensitive">
                  <Icon name="shield" size={19}/>
                  <p>
                    Ön görüşme formunda tanı, ilaç kullanımı, ayrıntılı sağlık geçmişi veya
                    gerekli olmayan hassas kişisel bilgilerinizi paylaşmayın.
                  </p>
                </div>

                {submitError && (
                  <div className="aptCineError" role="alert">
                    <Icon name="info" size={18}/>
                    <p>{submitError}</p>
                  </div>
                )}

                <div className="aptCineActions">
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
        </div>
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
    <main className="mediaCinePage">
      <section className="mediaCineHero cin3d">
        <div className="mediaCineHero__bg cin3dParallax" data-depth="0.13" aria-hidden="true">
          <img src={contentHeroMic} alt="" fetchPriority="high" decoding="async" />
          <div className="mediaCineHero__veil" />
          <div className="mediaCineHero__grain" />
        </div>

        <a className="mediaCineHero__back" href="#/">
          <span>←</span>
          Ana Sayfaya Dön
        </a>

        <div className="mediaCineHero__inner">
          <div className="mediaCineHero__copy">
            <span className="mediaCineHero__eyebrow">PODCAST & VİDEO</span>
            <h1>
              Dinleyin, izleyin,
              <strong>farklı bir açıdan düşünün.</strong>
            </h1>
            <p>
              İlişkiler, aile yaşamı, bireysel gelişim ve psikososyal güçlenme üzerine
              hazırlanan video ve podcast içeriklerini tek bir alanda keşfedin.
            </p>
          </div>

          <div className="mediaCineHero__rail" aria-hidden="true">
            <div><b>{String(videos.length).padStart(2,"0")}</b><span>YOUTUBE<br/>VİDEOSU</span></div>
            <div><b>{String(podcasts.length).padStart(2,"0")}</b><span>PODCAST<br/>BÖLÜMÜ</span></div>
            <div><b>{String(mediaItems.length).padStart(2,"0")}</b><span>TOPLAM<br/>İÇERİK</span></div>
          </div>
        </div>

        <div className="mediaCineHero__scroll" aria-hidden="true">
          <span />
          <small>İÇERİKLERE GÖZ AT</small>
        </div>
      </section>

      <section className="mediaCineIntro cin3d">
        <div className="mediaCineIntro__inner">
          <span>MEDYA KÜTÜPHANESİ</span>
          <h2>
            Size uygun içeriği
            <strong> seçip keşfedin.</strong>
          </h2>
          <p>
            Admin panelinden eklenen YouTube videoları ve Spotify podcast bölümleri
            burada otomatik olarak görünmeye devam eder.
          </p>
        </div>

        <div className="mediaCineTabs">
          <button
            type="button"
            className={tab === "videos" ? "is-active" : ""}
            onClick={() => setTab("videos")}
          >
            <Icon name="video" size={18}/>
            Videolar
          </button>

          <button
            type="button"
            className={tab === "podcasts" ? "is-active" : ""}
            onClick={() => setTab("podcasts")}
          >
            <Icon name="mic" size={18}/>
            Podcastler
          </button>
        </div>
      </section>

      {mediaLoading ? (
        <section className="mediaCineLoading">
          <div>İçerikler yükleniyor...</div>
        </section>
      ) : (
        <>
          {tab === "videos" && (
            <section className="mediaCineLibrary">
              <div className="mediaCineLibrary__head">
                <div>
                  <span>YOUTUBE VİDEOLARI</span>
                  <h2>İzleyerek keşfedin.</h2>
                </div>
                {channelLinks.youtubeChannelUrl && (
                  <a href={channelLinks.youtubeChannelUrl} target="_blank" rel="noreferrer">
                    YouTube Kanalına Git <Icon name="arrow" size={14}/>
                  </a>
                )}
              </div>

              {videos.length === 0 ? (
                <div className="mediaCineEmpty">Henüz yayınlanmış YouTube videosu bulunmuyor.</div>
              ) : (
                <div className="mediaCineVideoGrid">
                  {videos.map((video,index)=>{
                    const id = youtubeId(video.url);
                    return (
                      <article
                        className={`mediaCineVideoCard ${index===0 ? "is-featured" : ""}`}
                        key={video.id}
                        onClick={()=>openUrl(video.url)}
                      >
                        <div className="mediaCineVideoCard__visual">
                          {id ? (
                            <img
                              src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
                              onError={(e)=>{e.currentTarget.src=`https://img.youtube.com/vi/${id}/hqdefault.jpg`}}
                              alt={video.title}
                              loading="lazy"
                              decoding="async"
                            />
                          ) : (
                            <img src={serviceCoupleImage} alt="" loading="lazy" decoding="async" />
                          )}
                          <div className="mediaCineVideoCard__shade" />
                          <span className="mediaCineVideoCard__index">{String(index+1).padStart(2,"0")}</span>
                          <div className="mediaCineVideoCard__play"><span>▶</span></div>
                          {video.duration && <small>{video.duration}</small>}
                        </div>

                        <div className="mediaCineVideoCard__body">
                          <span>YOUTUBE · {video.category || "GENEL"}</span>
                          <h3>{video.title}</h3>
                          <p>{video.description}</p>
                          <b>Videoyu İzle <i>↗</i></b>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </section>
          )}

          {tab === "podcasts" && (
            <section className="mediaCineLibrary mediaCineLibrary--podcast">
              <div className="mediaCineLibrary__head">
                <div>
                  <span>PODCASTLER</span>
                  <h2>Dinleyerek derinleşin.</h2>
                </div>
                {channelLinks.spotifyChannelUrl && (
                  <a href={channelLinks.spotifyChannelUrl} target="_blank" rel="noreferrer">
                    Spotify'da Aç <Icon name="arrow" size={14}/>
                  </a>
                )}
              </div>

              {podcasts.length === 0 ? (
                <div className="mediaCineEmpty">Henüz yayınlanmış podcast bölümü bulunmuyor.</div>
              ) : (
                <div className="mediaCinePodcastGrid">
                  {podcasts.map((podcast,index)=>(
                    <article className="mediaCinePodcastCard" key={podcast.id}>
                      <div className="mediaCinePodcastCard__art">
                        <img
                          src={index % 2 === 0 ? servicePsychosocialImage : servicesHeroRoom}
                          alt=""
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="mediaCinePodcastCard__shade" />
                        <span>{String(index+1).padStart(2,"0")}</span>
                        <div className="mediaCinePodcastCard__disc"><Icon name="mic" size={30}/></div>
                      </div>

                      <div className="mediaCinePodcastCard__body">
                        <small>{podcast.category || "PODCAST"}</small>
                        <h3>{podcast.title}</h3>
                        <p>{podcast.description}</p>
                        <div>
                          <strong>{podcast.duration || "Podcast"}</strong>
                          <button type="button" onClick={()=>openUrl(podcast.url)}>
                            Spotify'da Dinle <span>↗</span>
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

      <section className="mediaCineOutro cin3d">
        <div className="mediaCineOutro__bg" aria-hidden="true">
          <img src={contentHeroMic} alt="" loading="lazy" decoding="async" />
          <div />
        </div>
        <div className="mediaCineOutro__inner">
          <span>YENİ İÇERİKLER</span>
          <h2>
            Takipte kalın,
            <strong>yeni yayınları kaçırmayın.</strong>
          </h2>
          <p>YouTube ve Spotify kanallarını takip ederek yeni video ve podcast yayınlarından haberdar olabilirsiniz.</p>
          <div className="mediaCineOutro__actions">
            {channelLinks.youtubeChannelUrl && (
              <a href={channelLinks.youtubeChannelUrl} target="_blank" rel="noreferrer">
                YouTube <Icon name="arrow" size={14}/>
              </a>
            )}
            {channelLinks.spotifyChannelUrl && (
              <a href={channelLinks.spotifyChannelUrl} target="_blank" rel="noreferrer">
                Spotify <Icon name="arrow" size={14}/>
              </a>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}


function AuthorPortalPage({ blogContent = defaultBlogContent }) {
  const AUTHOR_SESSION_KEY = "kaan_author_portal_session";
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [accountLoading, setAccountLoading] = useState(false);
  const [account, setAccount] = useState(null);
  const [authError, setAuthError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [submissionsLoading, setSubmissionsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [activeView, setActiveView] = useState("dashboard");
  const [designPreview, setDesignPreview] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const emptyForm = {
    title: "",
    category: "AİLE & İLİŞKİLER",
    excerpt: "",
    image: "",
    body: "",
    quote: "",
  };
  const [form, setForm] = useState(emptyForm);

  const categories = Array.from(
    new Set(
      (Array.isArray(blogContent?.categories) ? blogContent.categories : blogCategories)
        .filter((item) => item && item !== "Tümü")
    )
  );

  const previewAuthor = (Array.isArray(blogContent?.authors) ? blogContent.authors : [])[0] || null;
  const effectiveAccount = designPreview
    ? {
        author_slug: previewAuthor?.slug || "demo-yazar",
        display_name: previewAuthor?.name || "Örnek Yazar",
        role: "author",
        status: "active",
      }
    : account;

  const profile = (Array.isArray(blogContent?.authors) ? blogContent.authors : [])
    .find((item) => item?.slug && item.slug === effectiveAccount?.author_slug);

  const displayName = effectiveAccount?.display_name || profile?.name || "Yazar";
  const displayRole = profile?.role || "Yazar";
  const displayImage = profile?.image || "";

  const statusLabel = (status) => ({
    draft: "Taslak",
    submitted: "İncelemede",
    approved: "Yayınlandı",
    rejected: "Düzeltme İstendi",
  }[status] || status || "Taslak");

  const loadAccount = async (currentSession) => {
    if (!currentSession?.user?.id) return;
    setAccountLoading(true);
    setAuthError("");

    const { data, error } = await supabase
      .from("author_accounts")
      .select("user_id,author_slug,display_name,role,status")
      .eq("user_id", currentSession.user.id)
      .maybeSingle();

    if (error) {
      console.error("Yazar hesabı yüklenemedi:", error);
      setAuthError("Yazar hesabı doğrulanamadı. Yetki ayarlarını kontrol edin.");
      setAccount(null);
    } else if (!data || data.status !== "active" || data.role !== "author") {
      setAuthError("Bu hesap için aktif bir yazar profili tanımlanmamış.");
      setAccount(null);
    } else {
      setAccount(data);
    }
    setAccountLoading(false);
  };

  const loadSubmissions = async (currentSession = session) => {
    if (!currentSession?.user?.id) return;
    setSubmissionsLoading(true);
    setMessage("");

    const { data, error } = await supabase
      .from("author_submissions")
      .select("id,title,category,excerpt,image,body,quote,status,admin_note,published_post_id,created_at,updated_at")
      .eq("author_id", currentSession.user.id)
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("Yazar gönderileri yüklenemedi:", error);
      setMessage("Yazılarınız yüklenemedi.");
      setSubmissions([]);
    } else {
      setSubmissions(data || []);
    }
    setSubmissionsLoading(false);
  };

  useEffect(() => {
    let mounted = true;

    const restore = async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;

      const active = window.sessionStorage.getItem(AUTHOR_SESSION_KEY) === "active";
      if (data.session && active) {
        setSession(data.session);
        await loadAccount(data.session);
        await loadSubmissions(data.session);
      } else {
        setSession(null);
      }
      setAuthLoading(false);
    };

    restore();

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
      if (!mounted) return;
      setSession(nextSession || null);
      if (nextSession && window.sessionStorage.getItem(AUTHOR_SESSION_KEY) === "active") {
        await loadAccount(nextSession);
        await loadSubmissions(nextSession);
      } else if (!nextSession) {
        setAccount(null);
        setSubmissions([]);
      }
      setAuthLoading(false);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const openDesignPreview = () => {
    setDesignPreview(true);
    setAccount({
      author_slug: ((Array.isArray(blogContent?.authors) ? blogContent.authors : [])[0]?.slug) || "demo-yazar",
      display_name: ((Array.isArray(blogContent?.authors) ? blogContent.authors : [])[0]?.name) || "Örnek Yazar",
      role: "author",
      status: "active",
    });
    setSession({ user: { id: "design-preview" } });
    setSubmissions([
      {
        id: "preview-1",
        title: "Aile İçinde Sağlıklı İletişimin Temel Taşları",
        category: "AİLE & İLİŞKİLER",
        excerpt: "Aile içinde güvenli iletişim kurmak, yalnızca konuşmak değil; görülmek, anlaşılmak ve sınırları koruyabilmekle başlar.",
        image: "",
        body: "",
        quote: "",
        status: "submitted",
        admin_note: "",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "preview-2",
        title: "İlişkilerde Duygusal Yakınlık Nasıl Güçlenir?",
        category: "İLİŞKİLER",
        excerpt: "Duygusal yakınlığın oluşması için güven, açıklık ve karşılıklı merak gerekir.",
        image: "",
        body: "",
        quote: "",
        status: "draft",
        admin_note: "",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "preview-3",
        title: "Sınır Koymak Neden Zordur?",
        category: "BİREYSEL",
        excerpt: "Sağlıklı sınırlar, ilişkileri uzaklaştırmak yerine daha güvenli hale getirebilir.",
        image: "",
        body: "",
        quote: "",
        status: "approved",
        admin_note: "",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);
    setActiveView("dashboard");
    setMessage("Tasarım önizleme modu açık. Bu alanda yaptığınız değişiklikler Supabase'e kaydedilmez.");
    window.location.hash = "#/yazar-paneli";
  };

  const login = async (e) => {
    e.preventDefault();
    setAuthError("");

    if (!email.trim() || !password) {
      setAuthError("E-posta ve şifrenizi girin.");
      return;
    }

    setAuthLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error || !data?.session) {
      setAuthError("E-posta veya şifre hatalı.");
      setAuthLoading(false);
      return;
    }

    window.sessionStorage.setItem(AUTHOR_SESSION_KEY, "active");
    setSession(data.session);
    setPassword("");
    await loadAccount(data.session);
    await loadSubmissions(data.session);
    setAuthLoading(false);
    window.location.hash = "#/yazar-paneli";
  };

  const logout = async () => {
    window.sessionStorage.removeItem(AUTHOR_SESSION_KEY);
    if (!designPreview) await supabase.auth.signOut();
    setDesignPreview(false);
    setSession(null);
    setAccount(null);
    setSubmissions([]);
    setActiveView("dashboard");
    setForm(emptyForm);
    setEditingId(null);
    setMessage("");
    window.location.hash = "#/yazar-girisi";
  };

  const resetForm = () => {
    setForm({
      ...emptyForm,
      category: categories[0] || "GENEL",
    });
    setEditingId(null);
  };

  const editSubmission = (item) => {
    if (!["draft", "rejected"].includes(item.status)) return;
    setEditingId(item.id);
    setForm({
      title: item.title || "",
      category: item.category || categories[0] || "GENEL",
      excerpt: item.excerpt || "",
      image: item.image || "",
      body: item.body || "",
      quote: item.quote || "",
    });
    setActiveView("editor");
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const uploadImage = async (file) => {
    if (designPreview) { setMessage("Tasarım önizleme modunda görsel yükleme devre dışıdır."); return; }
    if (!file || !session?.user?.id) return;

    setUploading(true);
    setMessage("Kapak görseli hazırlanıyor...");

    try {
      const prepared = await prepareBlogImageForUpload(file);
      const safeName = createBlogSlug(file.name.replace(/\.[^.]+$/, "")) || "yazi-kapak";
      const filePath = `author-submissions/${session.user.id}/${Date.now()}-${safeName}.${prepared.extension}`;

      const { error } = await supabase.storage
        .from("blog-images")
        .upload(filePath, prepared.file, {
          cacheControl: "3600",
          upsert: false,
          contentType: prepared.contentType,
        });

      if (error) throw new Error(error.message || "Storage yüklemesi başarısız.");

      const { data } = supabase.storage.from("blog-images").getPublicUrl(filePath);
      if (!data?.publicUrl) throw new Error("Kapak bağlantısı oluşturulamadı.");

      setForm((current) => ({ ...current, image: data.publicUrl }));
      setMessage(
        prepared.compressed
          ? "Kapak görseli optimize edildi ve hazır."
          : "Kapak görseli hazır."
      );
    } catch (error) {
      console.error("Yazar kapak görseli yüklenemedi:", error);
      setMessage(`Görsel yüklenemedi: ${error?.message || "Lütfen tekrar deneyin."}`);
    } finally {
      setUploading(false);
    }
  };

  const saveSubmission = async (targetStatus = "draft") => {
    if (designPreview) {
      setMessage(targetStatus === "submitted"
        ? "Önizleme: Yazı editör incelemesine gönderilmiş gibi gösterildi."
        : "Önizleme: Taslak kaydedilmiş gibi gösterildi.");
      setActiveView("dashboard");
      return;
    }
    if (!session?.user?.id || !account?.author_slug) return;

    if (!form.title.trim() || !form.excerpt.trim() || !form.body.trim() || !form.image.trim()) {
      setMessage("Başlık, kısa açıklama, kapak görseli ve yazı içeriği zorunludur.");
      return;
    }

    const payload = {
      author_id: session.user.id,
      author_slug: account.author_slug,
      title: form.title.trim(),
      category: form.category.trim() || "GENEL",
      excerpt: form.excerpt.trim(),
      image: form.image.trim(),
      body: form.body.trim(),
      quote: form.quote.trim(),
      status: targetStatus,
      admin_note: targetStatus === "submitted" ? "" : undefined,
      updated_at: new Date().toISOString(),
    };

    setMessage(targetStatus === "submitted" ? "Yazınız incelemeye gönderiliyor..." : "Taslak kaydediliyor...");

    let result;
    if (editingId) {
      result = await supabase
        .from("author_submissions")
        .update(payload)
        .eq("id", editingId)
        .eq("author_id", session.user.id)
        .select("id")
        .single();
    } else {
      result = await supabase
        .from("author_submissions")
        .insert(payload)
        .select("id")
        .single();
    }

    if (result.error) {
      console.error("Yazar gönderisi kaydedilemedi:", result.error);
      setMessage("Yazı kaydedilemedi. Lütfen tekrar deneyin.");
      return;
    }

    await loadSubmissions();
    resetForm();
    setActiveView("dashboard");
    setMessage(
      targetStatus === "submitted"
        ? "Yazınız başarıyla incelemeye gönderildi. Yayınlanmadan önce editör onayından geçecektir."
        : "Taslağınız başarıyla kaydedildi."
    );
  };

  const deleteDraft = async (item) => {
    if (designPreview) {
      setSubmissions((items)=>items.filter((entry)=>entry.id!==item.id));
      setMessage("Önizleme kaydı listeden kaldırıldı.");
      return;
    }
    if (!["draft", "rejected"].includes(item.status)) return;
    if (!window.confirm(`"${item.title}" taslağını silmek istediğinize emin misiniz?`)) return;

    const { error } = await supabase
      .from("author_submissions")
      .delete()
      .eq("id", item.id)
      .eq("author_id", session.user.id);

    if (error) {
      setMessage("Taslak silinemedi.");
      return;
    }

    await loadSubmissions();
    setMessage("Taslak silindi.");
  };

  if (authLoading) {
    return (
      <main className="authorPortal authorPortal--loading">
        <div className="authorPortalLoading">
          <img src={kaanOzkanEmblem} alt="" />
          <span />
          <p>Yazar alanı hazırlanıyor</p>
        </div>
      </main>
    );
  }

  if (!designPreview && (!session || !account)) {
    return (
      <main className="authorPortal authorPortalLogin">
        <div className="authorPortalLogin__visual">
          <div className="authorPortalLogin__visualMedia">
            <img src={servicesHeroRoom} alt="" />
            <span />
          </div>

          <a className="authorPortalLogin__home" href="#/anasayfa">
            <img src={kaanOzkanEmblem} alt="" />
            <span>
              <small>SOSYAL HİZMET UZMANI &amp; AİLE DANIŞMANI</small>
              <strong>KAAN ÖZKAN</strong>
            </span>
          </a>

          <div className="authorPortalLogin__statement">
            <span>YAZAR PORTALI</span>
            <h1>Bilginizi,<br/><em>özenle paylaşın.</em></h1>
            <p>
              Yazarlarımız için hazırlanan güvenli içerik alanı.
              Yazılarınızı oluşturun, taslak olarak saklayın ve editör incelemesine gönderin.
            </p>
          </div>

          <div className="authorPortalLogin__visualFoot">
            <span>KAAN ÖZKAN · YAYIN PLATFORMU</span>
            <i/>
            <span>GÜVENLİ YAZAR ERİŞİMİ</span>
          </div>
        </div>

        <div className="authorPortalLogin__panel">
          <div className="authorPortalLogin__panelInner">
            <div className="authorPortalLogin__mark">
              <img src={kaanOzkanEmblem} alt="" />
            </div>

            <div className="authorPortalLogin__heading">
              <span>HOŞ GELDİNİZ</span>
              <h2>Yazar Girişi</h2>
              <p>Size tanımlanan e-posta ve şifre ile güvenli yazar alanına giriş yapın.</p>
            </div>

            <form className="authorPortalLogin__form" onSubmit={login}>
              <label>
                <span>E-POSTA ADRESİ</span>
                <div>
                  <Icon name="mail" size={17}/>
                  <input
                    type="email"
                    autoComplete="email"
                    placeholder="ornek@mail.com"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                </div>
              </label>

              <label>
                <span>ŞİFRE</span>
                <div>
                  <Icon name="lock" size={17}/>
                  <input
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                  />
                  <button type="button" onClick={()=>setShowPassword((v)=>!v)}>
                    {showPassword ? "Gizle" : "Göster"}
                  </button>
                </div>
              </label>

              {authError && <div className="authorPortalLogin__error">{authError}</div>}

              <button className="authorPortalLogin__submit" type="submit" disabled={authLoading || accountLoading}>
                <span>{authLoading || accountLoading ? "Giriş yapılıyor..." : "Yazar Alanına Giriş"}</span>
                <b>↗</b>
              </button>

              <button className="authorPortalLogin__preview" type="button" onClick={openDesignPreview}>
                <span>Tasarımı Hesapsız Önizle</span>
                <b>→</b>
              </button>
            </form>

            <div className="authorPortalLogin__security">
              <span>◆</span>
              <p>
                <strong>Güvenli erişim</strong>
                Hesabınız yalnızca size ait yazıları görüntüleyebilir ve düzenleyebilir.
              </p>
            </div>

            <a className="authorPortalLogin__back" href="#/anasayfa">← Siteye dön</a>
          </div>
        </div>
      </main>
    );
  }

  const publishedCount = submissions.filter((item)=>item.status==="approved").length;
  const reviewCount = submissions.filter((item)=>item.status==="submitted").length;
  const draftCount = submissions.filter((item)=>["draft","rejected"].includes(item.status)).length;

  return (
    <main className="authorPortal authorPortalDash">
      <aside className="authorPortalSide">
        <a className="authorPortalSide__brand" href="#/anasayfa">
          <img src={kaanOzkanEmblem} alt="" />
          <span>
            <small>YAZAR PORTALI</small>
            <strong>KAAN ÖZKAN</strong>
          </span>
        </a>

        <div className="authorPortalSide__profile">
          <div className="authorPortalSide__avatar">
            {displayImage ? <img src={displayImage} alt={displayName}/> : <span>{displayName.charAt(0)}</span>}
          </div>
          <div>
            <small>HOŞ GELDİNİZ</small>
            <strong>{displayName}</strong>
            <span>{displayRole}</span>
          </div>
        </div>

        <nav className="authorPortalSide__nav">
          <button className={activeView==="dashboard" ? "is-active" : ""} onClick={()=>setActiveView("dashboard")}>
            <span>01</span><b>Yazılarım</b>
          </button>
          <button className={activeView==="editor" ? "is-active" : ""} onClick={()=>{resetForm();setActiveView("editor");}}>
            <span>02</span><b>Yeni Yazı</b>
          </button>
        </nav>

        <div className="authorPortalSide__bottom">
          <a href={`#/yazarlar/${effectiveAccount?.author_slug || ""}`}>Yazar profilimi gör ↗</a>
          <button type="button" onClick={logout}>Güvenli Çıkış</button>
        </div>
      </aside>

      <section className="authorPortalMain">
        <header className="authorPortalMain__top">
          <div>
            {designPreview && <div className="authorPortalPreviewBadge">TASARIM ÖNİZLEME</div>}
            <span>YAZAR ÇALIŞMA ALANI</span>
            <h1>{activeView==="editor" ? (editingId ? "Yazınızı düzenleyin." : "Yeni bir yazı oluşturun.") : "İçeriklerinizi yönetin."}</h1>
          </div>
          <div className="authorPortalMain__topActions">
            <a href="#/blog">Blogu Gör</a>
            <button type="button" onClick={()=>{resetForm();setActiveView("editor");}}>+ Yeni Yazı</button>
          </div>
        </header>

        {message && <div className="authorPortalMessage">{message}</div>}

        {activeView === "dashboard" ? (
          <>
            <div className="authorPortalStats">
              <article><small>TOPLAM İÇERİK</small><strong>{submissions.length}</strong><span>Tüm gönderimleriniz</span></article>
              <article><small>İNCELEMEDE</small><strong>{reviewCount}</strong><span>Editör onayı bekliyor</span></article>
              <article><small>YAYINLANDI</small><strong>{publishedCount}</strong><span>Blogda yayında</span></article>
              <article><small>TASLAK</small><strong>{draftCount}</strong><span>Üzerinde çalışabilirsiniz</span></article>
            </div>

            <div className="authorPortalList">
              <div className="authorPortalList__head">
                <div>
                  <span>İÇERİK ARŞİVİNİZ</span>
                  <h2>Yazılarım</h2>
                </div>
                <button type="button" onClick={()=>loadSubmissions()} disabled={submissionsLoading}>
                  {submissionsLoading ? "Yenileniyor..." : "Listeyi Yenile"}
                </button>
              </div>

              {submissionsLoading ? (
                <div className="authorPortalEmpty">Yazılarınız yükleniyor...</div>
              ) : submissions.length === 0 ? (
                <div className="authorPortalEmpty">
                  <span>✦</span>
                  <h3>Henüz bir yazınız yok.</h3>
                  <p>İlk içeriğinizi hazırlamak için yeni yazı oluşturabilirsiniz.</p>
                  <button type="button" onClick={()=>{resetForm();setActiveView("editor");}}>İlk Yazımı Oluştur</button>
                </div>
              ) : (
                <div className="authorPortalList__items">
                  {submissions.map((item)=>(
                    <article className="authorPortalItem" key={item.id}>
                      <div className="authorPortalItem__image">
                        {item.image ? <img src={item.image} alt=""/> : <span>✦</span>}
                      </div>
                      <div className="authorPortalItem__copy">
                        <div>
                          <span className={`authorPortalStatus is-${item.status}`}>{statusLabel(item.status)}</span>
                          <small>{item.category}</small>
                        </div>
                        <h3>{item.title}</h3>
                        <p>{item.excerpt}</p>
                        {item.admin_note && <em>Editör notu: {item.admin_note}</em>}
                        <span>Son güncelleme: {item.updated_at ? new Date(item.updated_at).toLocaleDateString("tr-TR") : "—"}</span>
                      </div>
                      <div className="authorPortalItem__actions">
                        {["draft","rejected"].includes(item.status) ? (
                          <>
                            <button type="button" onClick={()=>editSubmission(item)}>Düzenle</button>
                            <button type="button" className="is-delete" onClick={()=>deleteDraft(item)}>Sil</button>
                          </>
                        ) : item.status === "approved" && item.published_post_id ? (
                          <a href="#/blog">Blogda Gör ↗</a>
                        ) : (
                          <span>İnceleme sürecinde</span>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="authorPortalEditor">
            <div className="authorPortalEditor__head">
              <div>
                <span>{editingId ? "İÇERİĞİ DÜZENLE" : "YENİ İÇERİK"}</span>
                <h2>Yazınızı hazırlayın.</h2>
                <p>Yayınlamadan önce editör incelemesine gönderebilirsiniz. Taslaklar yalnızca size görünür.</p>
              </div>
              <button type="button" onClick={()=>{resetForm();setActiveView("dashboard");}}>Kapat ×</button>
            </div>

            <div className="authorPortalEditor__grid">
              <div className="authorPortalEditor__fields">
                <label className="is-wide">
                  <span>YAZI BAŞLIĞI</span>
                  <input
                    value={form.title}
                    onChange={(e)=>setForm({...form,title:e.target.value})}
                    placeholder="Okuyucuya ne anlatmak istiyorsunuz?"
                  />
                </label>

                <label>
                  <span>KATEGORİ</span>
                  <select value={form.category} onChange={(e)=>setForm({...form,category:e.target.value})}>
                    {(categories.length ? categories : ["GENEL"]).map((item)=><option key={item} value={item}>{item}</option>)}
                  </select>
                </label>

                <label className="is-wide">
                  <span>KISA AÇIKLAMA</span>
                  <textarea
                    rows="4"
                    value={form.excerpt}
                    onChange={(e)=>setForm({...form,excerpt:e.target.value})}
                    placeholder="Yazının kısa özetini 2–3 cümleyle anlatın."
                  />
                  <small>{form.excerpt.length} karakter</small>
                </label>

                <label className="is-wide">
                  <span>YAZI İÇERİĞİ</span>
                  <textarea
                    className="authorPortalEditor__body"
                    rows="18"
                    value={form.body}
                    onChange={(e)=>setForm({...form,body:e.target.value})}
                    placeholder={"Paragraflar arasında bir boş satır bırakabilirsiniz.\n\nYazınızı burada hazırlayın..."}
                  />
                  <small>Yaklaşık {Math.max(1, Math.ceil(form.body.trim().split(/\s+/).filter(Boolean).length / 200))} dk okuma</small>
                </label>

                <label className="is-wide">
                  <span>ÖNE ÇIKAN ALINTI <em>OPSİYONEL</em></span>
                  <textarea
                    rows="3"
                    value={form.quote}
                    onChange={(e)=>setForm({...form,quote:e.target.value})}
                    placeholder="Yazı içinde vurgulanmasını istediğiniz kısa bir cümle."
                  />
                </label>
              </div>

              <aside className="authorPortalEditor__aside">
                <div className="authorPortalCover">
                  <span>KAPAK GÖRSELİ</span>
                  <div className="authorPortalCover__preview">
                    {form.image ? <img src={form.image} alt="Kapak önizleme"/> : <div><b>✦</b><p>Kapak görselinizi yükleyin</p></div>}
                  </div>
                  <label className="authorPortalCover__upload">
                    <input type="file" accept="image/png,image/jpeg,image/webp" onChange={(e)=>uploadImage(e.target.files?.[0])}/>
                    <span>{uploading ? "Yükleniyor..." : "Görsel Yükle"}</span>
                  </label>
                  <input
                    value={form.image}
                    onChange={(e)=>setForm({...form,image:e.target.value})}
                    placeholder="veya görsel URL"
                  />
                </div>

                <div className="authorPortalGuide">
                  <span>YAYIN REHBERİ</span>
                  <ul>
                    <li><b>01</b><p>Başlık açık ve sade olsun.</p></li>
                    <li><b>02</b><p>Paragrafları kısa ve okunabilir tutun.</p></li>
                    <li><b>03</b><p>Kaynak gösterilmesi gereken bilgileri belirtin.</p></li>
                    <li><b>04</b><p>Danışan veya üçüncü kişilere ait özel bilgi kullanmayın.</p></li>
                  </ul>
                </div>
              </aside>
            </div>

            <div className="authorPortalEditor__savebar">
              <div>
                <strong>Yazınız siz göndermeden yayınlanmaz.</strong>
                <span>İncelemeye gönderilen içerik editör onayından sonra blogda yayınlanır.</span>
              </div>
              <div>
                <button type="button" className="is-draft" onClick={()=>saveSubmission("draft")}>Taslak Kaydet</button>
                <button type="button" className="is-submit" onClick={()=>saveSubmission("submitted")}>İncelemeye Gönder ↗</button>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

function AdminDemoPage() {
  const ADMIN_SESSION_KEY = "kaan_admin_browser_session";
  const ADMIN_BLOG_DRAFT_KEY = "kaan_admin_blog_draft_v1";
  const ADMIN_INACTIVITY_MS = 30 * 60 * 1000;
  const [activeTab, setActiveTab] = useState("dashboard");
  const adminScrollPositionsRef = useRef({});
  const adminTabRestoreRef = useRef("");
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
  const [availabilityDate, setAvailabilityDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [availabilityRecords, setAvailabilityRecords] = useState([]);
  const [availabilityAdminLoading, setAvailabilityAdminLoading] = useState(false);
  const [availabilitySaving, setAvailabilitySaving] = useState(false);
  const [availabilityAdminMessage, setAvailabilityAdminMessage] = useState("");


  const [analyticsRows, setAnalyticsRows] = useState([]);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [analyticsError, setAnalyticsError] = useState("");
  const [analyticsRange, setAnalyticsRange] = useState("7");
  const [analyticsLastUpdated, setAnalyticsLastUpdated] = useState(null);
  const [analyticsSearch, setAnalyticsSearch] = useState("");

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
  const [blogEditorRefreshing, setBlogEditorRefreshing] = useState(false);
  const [blogEditorSaving, setBlogEditorSaving] = useState(false);
  const [blogEditorMessage, setBlogEditorMessage] = useState("");
  const blogEditorLoadedUserRef = useRef("");
  const blogEditorLoadPromiseRef = useRef(null);
  const [newBlogCategory, setNewBlogCategory] = useState("");
  const [blogImageUploading, setBlogImageUploading] = useState(false);
  const [blogImageSelectedName, setBlogImageSelectedName] = useState("");
  const [blogImageLocalPreview, setBlogImageLocalPreview] = useState("");
  const [blogImageUploadError, setBlogImageUploadError] = useState("");
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [blogDraftReady, setBlogDraftReady] = useState(false);
  const [blogForm, setBlogForm] = useState({
    title: "",
    slug: "",
    category: "AİLE & İLİŞKİLER",
    date: new Date().toLocaleDateString("tr-TR", { day: "2-digit", month: "long", year: "numeric" }),
    readTime: "5 dk okuma",
    excerpt: "",
    image: "",
    body: "",
    richBody: null,
    bodyDirty: false,
    quote: "",
    status: "published",
    featured: false,
    sortOrder: 100,
    authorSlug: "",
  });
  const [editingAuthorSlug, setEditingAuthorSlug] = useState(null);
  const [authorImageUploading, setAuthorImageUploading] = useState(false);
  const [authorForm, setAuthorForm] = useState({
    name: "",
    slug: "",
    role: "",
    image: "",
    shortBio: "",
    bio: "",
  });

  const sessionUserId = session?.user?.id || "";

  const getBlogDraftStorageKey = () =>
    `${ADMIN_BLOG_DRAFT_KEY}_${sessionUserId || "browser"}`;

  const clearBlogDraft = () => {
    try { window.sessionStorage.removeItem(getBlogDraftStorageKey()); } catch {}
  };

  const switchAdminTab = (nextTab) => {
    adminScrollPositionsRef.current[activeTab] = window.scrollY || window.pageYOffset || 0;
    adminTabRestoreRef.current = nextTab;
    setActiveTab(nextTab);
  };


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

  const [authorSubmissions, setAuthorSubmissions] = useState([]);
  const [authorSubmissionsLoading, setAuthorSubmissionsLoading] = useState(false);
  const [authorSubmissionsMessage, setAuthorSubmissionsMessage] = useState("");
  const [writerApplications, setWriterApplications] = useState([]);
  const [writerApplicationsLoading, setWriterApplicationsLoading] = useState(false);
  const [writerApplicationsMessage, setWriterApplicationsMessage] = useState("");
  const [writerApplicationFilter, setWriterApplicationFilter] = useState("pending");
  const [writerApplicationQuery, setWriterApplicationQuery] = useState("");

  const writerApplicationCounts = useMemo(() => ({
    all: writerApplications.length,
    pending: writerApplications.filter((item) => item.status === "pending").length,
    accepted: writerApplications.filter((item) => item.status === "accepted").length,
    rejected: writerApplications.filter((item) => item.status === "rejected").length,
  }), [writerApplications]);

  const visibleWriterApplications = useMemo(() => {
    const query = writerApplicationQuery.trim().toLocaleLowerCase("tr-TR");
    return writerApplications.filter((item) => {
      const statusMatches = writerApplicationFilter === "all" || item.status === writerApplicationFilter;
      const textMatches = !query || `${item.full_name || ""} ${item.email || ""} ${item.expertise || ""} ${item.sample_topic || ""}`.toLocaleLowerCase("tr-TR").includes(query);
      return statusMatches && textMatches;
    });
  }, [writerApplications, writerApplicationFilter, writerApplicationQuery]);

  useEffect(() => {
    const timer = window.setTimeout(() => setAdminIntroVisible(false), 2650);
    return () => window.clearTimeout(timer);
  }, []);

  // Yönetici panelindeki yazı taslağı, sekme değiştirirken veya sayfa yanlışlıkla
  // yenilenirken kaybolmasın. Oturum tabanlıdır; başka kullanıcıların tarayıcısına taşınmaz.
  useEffect(() => {
    if (!sessionUserId) {
      setBlogDraftReady(false);
      return;
    }

    try {
      const raw = window.sessionStorage.getItem(getBlogDraftStorageKey());
      if (raw) {
        const draft = JSON.parse(raw);
        if (draft?.form && typeof draft.form === "object") {
          setBlogForm((current) => ({ ...current, ...draft.form }));
          setEditingBlogId(draft.editingBlogId || null);
          setBlogImageSelectedName(draft.blogImageSelectedName || "");
        }
      }
    } catch (error) {
      console.warn("Blog taslağı geri yüklenemedi:", error);
    } finally {
      setBlogDraftReady(true);
    }
  }, [sessionUserId]);

  useEffect(() => {
    if (!sessionUserId || !blogDraftReady) return;

    const hasDraft = Boolean(
      blogForm.title || blogForm.excerpt || blogForm.body || blogForm.quote || blogForm.image || editingBlogId
    );
    if (!hasDraft) {
      clearBlogDraft();
      return;
    }

    // Data URL'ler tarayıcının oturum alanını gereksiz şişirmesin. Storage'a yüklenmiş
    // görsellerin URL'si korunur; sayfayı yenilemeden sekme değiştirmede seçili görsel state'te kalır.
    const persistentImage = String(blogForm.image || "").startsWith("data:") ? "" : blogForm.image;
    try {
      window.sessionStorage.setItem(
        getBlogDraftStorageKey(),
        JSON.stringify({
          version: 1,
          savedAt: new Date().toISOString(),
          editingBlogId,
          blogImageSelectedName: persistentImage ? blogImageSelectedName : "",
          form: { ...blogForm, image: persistentImage },
        })
      );
    } catch (error) {
      console.warn("Blog taslağı tarayıcıda saklanamadı:", error);
    }
  }, [sessionUserId, blogDraftReady, blogForm, editingBlogId, blogImageSelectedName]);

  useEffect(() => {
    if (adminTabRestoreRef.current !== activeTab) return;
    const target = Number(adminScrollPositionsRef.current[activeTab] || 0);
    const frame = window.requestAnimationFrame(() => {
      window.scrollTo({ top: target, behavior: "auto" });
      adminTabRestoreRef.current = "";
    });
    return () => window.cancelAnimationFrame(frame);
  }, [activeTab]);


  const loadAnalytics = async () => {
    setAnalyticsLoading(true);
    setAnalyticsError("");

    const days = Math.max(1, Number(analyticsRange || 7));
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

    const { data, error } = await supabase
      .from("site_visits")
      .select(
        "id,visitor_id,session_id,path,page_label,page_title,referrer,device_type,browser,operating_system,language,screen_size,timezone,city,region,country,country_code,latitude,longitude,location_source,created_at"
      )
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .limit(5000);

    if (error) {
      console.error("Ziyaretçi analitiği yüklenemedi:", error);
      setAnalyticsRows([]);
      setAnalyticsError(
        "Analitik verileri yüklenemedi. Önce ZIP içindeki SUPABASE-ZIYARETCI-ANALITIK-KURULUM.sql dosyasını Supabase SQL Editor'de bir kez çalıştırın."
      );
    } else {
      setAnalyticsRows(data || []);
      setAnalyticsLastUpdated(new Date());
    }

    setAnalyticsLoading(false);
  };

  useEffect(() => {
    if (session && activeTab === "analytics") {
      loadAnalytics();
    }
  }, [session, activeTab, analyticsRange]);

  useEffect(() => {
    if (!session || activeTab !== "analytics") return undefined;
    const timer = window.setInterval(loadAnalytics, 60000);
    return () => window.clearInterval(timer);
  }, [session, activeTab, analyticsRange]);

  const analyticsSummary = useMemo(() => {
    const rows = analyticsRows || [];
    const visitors = new Set(rows.map((row) => row.visitor_id).filter(Boolean));
    const sessions = new Map();

    rows.forEach((row) => {
      const key = row.session_id || row.visitor_id || row.id;
      if (!sessions.has(key)) sessions.set(key, []);
      sessions.get(key).push(row);
    });

    const sessionList = [...sessions.values()];
    const bounceSessions = sessionList.filter((items) => items.length <= 1).length;
    const avgPages = sessionList.length ? rows.length / sessionList.length : 0;
    const bounceRate = sessionList.length ? (bounceSessions / sessionList.length) * 100 : 0;

    const todayKey = new Date().toLocaleDateString("tr-TR");
    const todayViews = rows.filter(
      (row) => new Date(row.created_at).toLocaleDateString("tr-TR") === todayKey
    ).length;

    const group = (keyFn) => {
      const map = new Map();
      rows.forEach((row) => {
        const key = keyFn(row) || "Bilinmiyor";
        map.set(key, (map.get(key) || 0) + 1);
      });
      return [...map.entries()]
        .map(([label, value]) => ({ label, value }))
        .sort((a, b) => b.value - a.value);
    };

    const pages = group((row) => row.page_label || row.path || "Diğer");
    const devices = group((row) => row.device_type || "Bilinmiyor");
    const browsers = group((row) => row.browser || "Bilinmiyor");
    const systems = group((row) => row.operating_system || "Bilinmiyor");
    const countries = group((row) => row.country || "Bilinmiyor");
    const cities = group((row) =>
      row.city
        ? `${row.city}${row.country ? `, ${row.country}` : ""}`
        : row.country || "Bilinmiyor"
    );
    const sources = group((row) => analyticsHost(row.referrer));

    const days = Math.max(1, Number(analyticsRange || 7));
    const trend = [];
    for (let offset = days - 1; offset >= 0; offset -= 1) {
      const date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() - offset);
      const next = new Date(date);
      next.setDate(next.getDate() + 1);
      const count = rows.filter((row) => {
        const at = new Date(row.created_at);
        return at >= date && at < next;
      }).length;
      trend.push({
        label: date.toLocaleDateString("tr-TR", { day: "2-digit", month: "2-digit" }),
        value: count,
      });
    }

    return {
      pageViews: rows.length,
      uniqueVisitors: visitors.size,
      sessions: sessionList.length,
      avgPages,
      bounceRate,
      todayViews,
      pages,
      devices,
      browsers,
      systems,
      countries,
      cities,
      sources,
      trend,
    };
  }, [analyticsRows, analyticsRange]);

  const analyticsRecentRows = useMemo(() => {
    const query = analyticsSearch.trim().toLocaleLowerCase("tr-TR");
    if (!query) return analyticsRows.slice(0, 120);
    return analyticsRows
      .filter((row) =>
        [
          row.city,
          row.region,
          row.country,
          row.page_label,
          row.path,
          row.device_type,
          row.browser,
          row.operating_system,
        ]
          .filter(Boolean)
          .join(" ")
          .toLocaleLowerCase("tr-TR")
          .includes(query)
      )
      .slice(0, 120);
  }, [analyticsRows, analyticsSearch]);

  const AnalyticsSparkline = ({ data = [] }) => {
    const width = 760;
    const height = 220;
    const pad = 18;
    const max = Math.max(1, ...data.map((item) => Number(item.value) || 0));
    const points = data.map((item, index) => {
      const x =
        data.length <= 1
          ? width / 2
          : pad + (index / (data.length - 1)) * (width - pad * 2);
      const y = height - pad - ((Number(item.value) || 0) / max) * (height - pad * 2);
      return { ...item, x, y };
    });
    const polyline = points.map((point) => `${point.x},${point.y}`).join(" ");

    return (
      <div className="adminAnalyticsChart">
        <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Ziyaret trendi">
          <defs>
            <linearGradient id="analyticsArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(186,137,69,.28)" />
              <stop offset="100%" stopColor="rgba(186,137,69,0)" />
            </linearGradient>
          </defs>
          {[0.25,0.5,0.75].map((ratio)=>(
            <line
              key={ratio}
              x1={pad}
              x2={width-pad}
              y1={height*ratio}
              y2={height*ratio}
              className="adminAnalyticsChart__grid"
            />
          ))}
          {points.length > 1 && (
            <polygon
              points={`${points[0].x},${height-pad} ${polyline} ${points[points.length-1].x},${height-pad}`}
              fill="url(#analyticsArea)"
            />
          )}
          <polyline points={polyline} className="adminAnalyticsChart__line" />
          {points.map((point,index)=>(
            <g key={`${point.label}-${index}`}>
              <circle cx={point.x} cy={point.y} r="4.5" className="adminAnalyticsChart__dot" />
              {(data.length <= 14 || index % Math.ceil(data.length / 8) === 0 || index === data.length-1) && (
                <text x={point.x} y={height-2} textAnchor="middle">{point.label}</text>
              )}
            </g>
          ))}
        </svg>
      </div>
    );
  };

  const AnalyticsBars = ({ items = [], limit = 6 }) => {
    const visible = items.slice(0, limit);
    const max = Math.max(1, ...visible.map((item) => item.value));
    return (
      <div className="adminAnalyticsBars">
        {visible.length === 0 ? (
          <p className="adminAnalyticsEmptyMini">Henüz veri yok.</p>
        ) : visible.map((item) => (
          <div className="adminAnalyticsBar" key={item.label}>
            <div>
              <span>{item.label}</span>
              <b>{item.value}</b>
            </div>
            <i><em style={{ width: `${Math.max(4,(item.value/max)*100)}%` }} /></i>
          </div>
        ))}
      </div>
    );
  };

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

  const loadAvailability = async () => {
    if (!availabilityDate) return;
    setAvailabilityAdminLoading(true);
    setAvailabilityAdminMessage("");

    const { data, error } = await supabase
      .from("appointment_availability")
      .select("appointment_date,appointment_time,is_open")
      .eq("appointment_date", availabilityDate)
      .order("appointment_time", { ascending: true });

    if (error) {
      console.error("Randevu uygunluk ayarları yüklenemedi:", error);
      setAvailabilityRecords([]);
      setAvailabilityAdminMessage("Saat ayarları henüz hazırlanmadı. ZIP içindeki SUPABASE-RANDEVU-MUSAITLIK-KURULUM.sql dosyasını Supabase SQL Editor'de bir kez çalıştırın.");
    } else {
      setAvailabilityRecords(data || []);
    }
    setAvailabilityAdminLoading(false);
  };

  const isSlotOpen = (time) => {
    const record = availabilityRecords.find(
      (item) => String(item.appointment_time || "").slice(0, 5) === time
    );
    return record ? Boolean(record.is_open) : isDefaultAppointmentSlotOpen(availabilityDate, time);
  };

  const saveAvailability = async (changes) => {
    setAvailabilitySaving(true);
    setAvailabilityAdminMessage("");
    const rows = changes.map(([appointment_time, is_open]) => ({
      appointment_date: availabilityDate,
      appointment_time,
      is_open,
    }));
    const { error } = await supabase
      .from("appointment_availability")
      .upsert(rows, { onConflict: "appointment_date,appointment_time" });

    if (error) {
      console.error("Randevu uygunluk ayarları kaydedilemedi:", error);
      setAvailabilityAdminMessage("Saat ayarı kaydedilemedi. SQL kurulumunu ve yönetici yetkilerini kontrol edin.");
    } else {
      setAvailabilityRecords((current) => {
        const next = current.filter(
          (item) => !changes.some(([time]) => String(item.appointment_time || "").slice(0, 5) === time)
        );
        return [
          ...next,
          ...rows.map((row) => ({ ...row })),
        ].sort((a, b) => String(a.appointment_time).localeCompare(String(b.appointment_time)));
      });
      setAvailabilityAdminMessage(changes.length > 1 ? "Günün saatleri güncellendi." : "Saat durumu güncellendi.");
    }
    setAvailabilitySaving(false);
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
    if (session && activeTab === "appointments") loadAvailability();
  }, [session, activeTab, availabilityDate]);

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
    clearBlogDraft();
    setEditingBlogId(null);
    setBlogImageSelectedName("");
    setBlogImageUploadError("");
    setBlogImageLocalPreview((current)=>{ if(current?.startsWith("blob:")) URL.revokeObjectURL(current); return ""; });
    setBlogForm({
      title: "",
      slug: "",
      category: "AİLE & İLİŞKİLER",
      date: new Date().toLocaleDateString("tr-TR", { day: "2-digit", month: "long", year: "numeric" }),
      readTime: "5 dk okuma",
      excerpt: "",
      image: "",
      body: "",
      richBody: null,
      bodyDirty: false,
      quote: "",
      status: "published",
      featured: false,
      sortOrder:
        Math.max(
          0,
          ...(blogEditor.posts || []).map((post)=>Number(post.sortOrder || 0))
        ) + 1,
      authorSlug: "",
    });
  };

  const loadBlogEditor = async ({ force = false } = {}) => {
    const userId = sessionUserId;
    if (!userId) return false;
    if (!force && blogEditorLoadedUserRef.current === userId) return true;
    if (blogEditorLoadPromiseRef.current) return blogEditorLoadPromiseRef.current;

    const initialLoad = blogEditorLoadedUserRef.current !== userId;
    if (initialLoad) setBlogEditorLoading(true);
    else setBlogEditorRefreshing(true);
    setBlogEditorMessage(initialLoad ? "" : "Blog verisi arka planda yenileniyor...");

    const loadPromise = (async () => {
      try {
        const { data, error } = await withRequestTimeout(
          supabase
            .from("site_content")
            .select("content")
            .eq("id", "blog")
            .maybeSingle(),
          20000,
          "Blog verisi zamanında yüklenemedi. Lütfen tekrar deneyin."
        );

        if (error) throw error;

        const remote = data?.content || {};
        const next = mergeBilgeAkarArticle({
          ...defaultBlogContent,
          ...remote,
          posts: Array.isArray(remote.posts) ? remote.posts : [],
          categories: Array.isArray(remote.categories) ? remote.categories : blogCategories,
          authors: Array.isArray(remote.authors)
            ? remote.authors.filter((author) => author?.slug && author?.name)
            : [],
        });
        setBlogEditor(next);
        blogEditorLoadedUserRef.current = userId;
        setBlogEditorMessage(
          `Blog verisi yüklendi · ${next.posts.length} yazı · ${next.authors.length} yazar`
        );
        return true;
      } catch (error) {
        console.error("Blog içeriği yüklenemedi:", error);
        setBlogEditorMessage(`Blog içeriği yüklenemedi: ${error?.message || "Bilinmeyen hata"}`);
        return false;
      } finally {
        setBlogEditorLoading(false);
        setBlogEditorRefreshing(false);
        blogEditorLoadPromiseRef.current = null;
      }
    })();

    blogEditorLoadPromiseRef.current = loadPromise;
    return loadPromise;
  };

  const readLatestBlogEditor = async () => {
    const { data, error } = await withRequestTimeout(
      supabase
        .from("site_content")
        .select("content, updated_at")
        .eq("id", "blog")
        .maybeSingle(),
      20000,
      "Güncel blog verisi zamanında alınamadı. Lütfen tekrar deneyin."
    );

    if (error) throw error;

    const remote = data?.content || {};
    return mergeBilgeAkarArticle({
      ...defaultBlogContent,
      ...remote,
      posts: Array.isArray(remote.posts) ? remote.posts : defaultBlogContent.posts,
      categories: Array.isArray(remote.categories) ? remote.categories : defaultBlogContent.categories,
      authors: Array.isArray(remote.authors)
        ? remote.authors.filter((author) => author?.slug && author?.name)
        : defaultBlogContent.authors,
    });
  };

  const persistBlogEditor = async (
    nextContent,
    successMessage = "Blog başarıyla güncellendi.",
    verify = null
  ) => {
    setBlogEditorSaving(true);
    setBlogEditorMessage("Değişiklikler Supabase'e kaydediliyor...");

    const write = async (contentToSave) => {
      const { error } = await withRequestTimeout(
        supabase
          .from("site_content")
          .upsert(
            {
              id: "blog",
              content: contentToSave,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "id" }
          ),
        25000,
        "Blog kaydı zaman aşımına uğradı. İnternet bağlantınızı kontrol edip tekrar deneyin."
      );

      if (error) throw error;
      return contentToSave;
    };

    try {
      await write(nextContent);

      // Supabase'den tekrar okuyup gerçekten kalıcı olup olmadığını doğrula.
      await new Promise((resolve) => window.setTimeout(resolve, 220));
      let verifiedContent = await readLatestBlogEditor();

      // Aynı anda başka eski bir sekme/veri yazdıysa bir kez daha güncel veri üzerinden düzelt.
      if (typeof verify === "function" && !verify(verifiedContent)) {
        const repairedContent = {
          ...verifiedContent,
          ...nextContent,
          posts: Array.isArray(nextContent.posts) ? nextContent.posts : verifiedContent.posts,
          authors: Array.isArray(nextContent.authors) ? nextContent.authors : verifiedContent.authors,
          categories: Array.isArray(nextContent.categories) ? nextContent.categories : verifiedContent.categories,
        };

        await write(repairedContent);
        await new Promise((resolve) => window.setTimeout(resolve, 220));
        verifiedContent = await readLatestBlogEditor();

        if (!verify(verifiedContent)) {
          throw new Error("Kaydedilen blog verisi doğrulama sırasında bulunamadı.");
        }
      }

      const finalContent = {
        ...defaultBlogContent,
        ...verifiedContent,
        posts: Array.isArray(verifiedContent.posts) ? verifiedContent.posts : [],
        authors: Array.isArray(verifiedContent.authors)
          ? verifiedContent.authors.filter((author) => author?.slug && author?.name)
          : [],
        categories: Array.isArray(verifiedContent.categories)
          ? verifiedContent.categories
          : blogCategories,
      };

      setBlogEditor(finalContent);
      setBlogEditorMessage(successMessage);
      setBlogEditorSaving(false);
      return finalContent;
    } catch (error) {
      console.error("Blog kalıcı kayıt hatası:", error);
      setBlogEditorMessage(
        `Kayıt kalıcı olarak doğrulanamadı: ${error?.message || "Supabase yetkilerini ve bağlantıyı kontrol edin."}`
      );
      setBlogEditorSaving(false);
      return false;
    }
  };


  const loadAuthorSubmissionsAdmin = async () => {
    setAuthorSubmissionsLoading(true);
    setAuthorSubmissionsMessage("");

    const { data, error } = await supabase
      .from("author_submissions")
      .select("id,author_id,author_slug,title,category,excerpt,image,body,quote,status,admin_note,published_post_id,created_at,updated_at")
      .in("status", ["submitted", "rejected", "approved"])
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("Yazar gönderimleri yüklenemedi:", error);
      setAuthorSubmissionsMessage("Yazar gönderimleri yüklenemedi. author_submissions tablosunu ve RLS yetkilerini kontrol edin.");
      setAuthorSubmissions([]);
    } else {
      setAuthorSubmissions(data || []);
    }

    setAuthorSubmissionsLoading(false);
  };

  const loadWriterApplicationsAdmin = async () => {
    setWriterApplicationsLoading(true);
    setWriterApplicationsMessage("");
    const { data, error } = await supabase
      .from("author_applications")
      .select("id,full_name,email,phone,education,expertise,experience_years,portfolio_url,sample_topic,motivation,intent_letter,cv_path,status,admin_note,created_at,updated_at")
      .order("created_at", { ascending: false });
    if (error) {
      setWriterApplicationsMessage(
        error.code === "42P01"
          ? "Başvuru altyapısı henüz kurulmadı. SUPABASE-YAZAR-BASVURU-KURULUM.sql dosyasını Supabase SQL Editor'de bir kez çalıştırın."
          : error.code === "42501"
            ? "Başvurular için yönetici izni bulunamadı. SUPABASE-ADMIN-CV-GUVENLIK-KURULUM.sql dosyasını çalıştırıp yönetici hesabınızla çıkış-giriş yapın."
            : "Yazar başvuruları yüklenemedi."
      );
      setWriterApplications([]);
    } else setWriterApplications(data || []);
    setWriterApplicationsLoading(false);
  };

  useEffect(() => {
    if (!sessionUserId) {
      blogEditorLoadedUserRef.current = "";
      blogEditorLoadPromiseRef.current = null;
    }
  }, [sessionUserId]);

  useEffect(() => {
    if (sessionUserId && activeTab === "blog") {
      loadBlogEditor();
    }
  }, [sessionUserId, activeTab]);

  useEffect(() => {
    if (sessionUserId && activeTab === "blog") {
      loadAuthorSubmissionsAdmin();
    }
  }, [sessionUserId, activeTab]);

  useEffect(() => {
    if (sessionUserId && activeTab === "blog") loadWriterApplicationsAdmin();
  }, [sessionUserId, activeTab]);

  const reviewWriterApplication = async (application, status) => {
    const note = window.prompt(
      status === "accepted" ? `${application.full_name} için yönetici notu (isteğe bağlı):` : `${application.full_name} için iletilecek kısa not:`,
      application.admin_note || ""
    );
    if (note === null) return;
    const { error } = await supabase.from("author_applications").update({ status, admin_note: String(note || "").trim(), updated_at: new Date().toISOString() }).eq("id", application.id);
    if (error) { setWriterApplicationsMessage("Başvuru durumu güncellenemedi."); return; }
    setWriterApplicationsMessage(status === "accepted" ? "Başvuru kabul edildi. Aşağıdaki Yazarlarımız alanından profili oluşturup güvenli yazar hesabını tanımlayabilirsiniz." : "Başvuru notla birlikte reddedildi.");
    await loadWriterApplicationsAdmin();
  };

  const saveWriterApplicationNote = async (application) => {
    const note = window.prompt(`${application.full_name} için yönetici notu:`, application.admin_note || "");
    if (note === null) return;
    const { error } = await supabase
      .from("author_applications")
      .update({ admin_note: String(note).trim(), updated_at: new Date().toISOString() })
      .eq("id", application.id);
    if (error) { setWriterApplicationsMessage("Yönetici notu kaydedilemedi."); return; }
    setWriterApplicationsMessage("Yönetici notu kaydedildi.");
    await loadWriterApplicationsAdmin();
  };

  const openWriterApplicationCv = async (application) => {
    if (!application.cv_path) return;
    const { data, error } = await supabase.storage.from("writer-cvs").createSignedUrl(application.cv_path, 2 * 60);
    if (error || !data?.signedUrl) { setWriterApplicationsMessage(error?.code === "42501" ? "CV için yönetici izni bulunamadı. Güvenlik kurulumunu kontrol edin." : "CV bağlantısı oluşturulamadı. Storage kurulumunu kontrol edin."); return; }
    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  };

  const startAuthorFromApplication = (application) => {
    setEditingAuthorSlug(null);
    setAuthorForm({ name: application.full_name || "", slug: createBlogSlug(application.full_name || ""), role: "", image: "", shortBio: application.expertise || "", bio: [application.education, application.expertise, application.experience_years ? `${application.experience_years} deneyim` : "", application.motivation].filter(Boolean).join("\n\n") });
    setWriterApplicationsMessage("Bilgiler yazar formuna aktarıldı. Unvanı ve fotoğrafı ekleyip yazarı kaydedin.");
    window.setTimeout(() => document.querySelector(".admin125Authors__form")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  const rejectAuthorSubmission = async (submission) => {
    const note = window.prompt(
      `"${submission.title}" için yazara iletilecek düzeltme notunu yazın:`,
      submission.admin_note || ""
    );
    if (note === null) return;

    const { error } = await supabase
      .from("author_submissions")
      .update({
        status: "rejected",
        admin_note: note.trim(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", submission.id);

    if (error) {
      setAuthorSubmissionsMessage("Gönderim yazara geri gönderilemedi.");
      return;
    }

    setAuthorSubmissionsMessage("İçerik düzeltme notuyla yazara geri gönderildi.");
    await loadAuthorSubmissionsAdmin();
  };

  const publishAuthorSubmission = async (submission) => {
    if (!window.confirm(`"${submission.title}" yazısını blogda yayınlamak istediğinize emin misiniz?`)) return;

    setAuthorSubmissionsMessage("Yazı hazırlanıyor ve bloga ekleniyor...");

    try {
      const latest = await readLatestBlogEditor();
      const author = (latest.authors || []).find(
        (item) => String(item.slug || "").trim() === String(submission.author_slug || "").trim()
      );

      if (!author) {
        setAuthorSubmissionsMessage("Bu gönderimin yazar profili blogdaki yazarlarla eşleşmedi.");
        return;
      }

      let slug = createBlogSlug(submission.title);
      const duplicate = (latest.posts || []).some((post)=>post.slug === slug);
      if (duplicate) slug = `${slug}-${Date.now().toString().slice(-5)}`;

      const postId = `blog-${Date.now()}`;
      const wordCount = String(submission.body || "").trim().split(/\s+/).filter(Boolean).length;
      const readTime = `${Math.max(1, Math.ceil(wordCount / 200))} dk okuma`;
      const nextSortOrder = Math.max(
        0,
        ...(latest.posts || []).map((post)=>Number(post.sortOrder || 0))
      ) + 1;

      const post = {
        id: postId,
        slug,
        title: String(submission.title || "").trim(),
        category: String(submission.category || "GENEL").trim(),
        date: new Date().toLocaleDateString("tr-TR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
        readTime,
        excerpt: String(submission.excerpt || "").trim(),
        image: String(submission.image || "").trim(),
        body: String(submission.body || "")
          .split(/\n\s*\n/)
          .map((item)=>item.trim())
          .filter(Boolean),
        quote: String(submission.quote || "").trim(),
        status: "published",
        featured: false,
        sortOrder: nextSortOrder,
        authorSlug: author.slug,
        authorName: author.name,
        authorRole: author.role,
        authorImage: author.image,
      };

      const categoryName = post.category;
      const categories = (latest.categories || blogCategories).some(
        (item)=>String(item || "").trim().toLocaleLowerCase("tr-TR") === categoryName.toLocaleLowerCase("tr-TR")
      )
        ? (latest.categories || blogCategories)
        : ["Tümü", ...(latest.categories || blogCategories).filter((item)=>item !== "Tümü"), categoryName];

      const saved = await persistBlogEditor(
        {
          ...latest,
          posts: [...(latest.posts || []), post],
          categories,
          authors: latest.authors || [],
        },
        `Yazar gönderimi yayınlandı: ${post.title}`,
        (content) => Array.isArray(content?.posts) && content.posts.some((item)=>item.id === postId)
      );

      if (!saved) {
        setAuthorSubmissionsMessage("Yazı bloga eklenemedi.");
        return;
      }

      const { error } = await supabase
        .from("author_submissions")
        .update({
          status: "approved",
          admin_note: "",
          published_post_id: postId,
          updated_at: new Date().toISOString(),
        })
        .eq("id", submission.id);

      if (error) {
        console.error("Gönderim onay durumu güncellenemedi:", error);
        setAuthorSubmissionsMessage("Yazı yayınlandı; ancak gönderim durumu güncellenemedi.");
      } else {
        setAuthorSubmissionsMessage("Yazı başarıyla yayınlandı ve yazar profiline bağlandı.");
      }

      await loadAuthorSubmissionsAdmin();
    } catch (error) {
      console.error("Yazar gönderimi yayınlama hatası:", error);
      setAuthorSubmissionsMessage(`Yayınlama başarısız: ${error?.message || "Bilinmeyen hata"}`);
    }
  };

  const saveBlogSettings = async (e) => {
    e.preventDefault();
    await persistBlogEditor(blogEditor, "Blog üst alanı başarıyla güncellendi.");
  };

  const addBlogCategory = async (e) => {
    e.preventDefault();
    const clean = String(newBlogCategory || "").trim();
    if (!clean) {
      setBlogEditorMessage("Kategori adı boş bırakılamaz.");
      return;
    }

    const current = Array.isArray(blogEditor.categories) && blogEditor.categories.length
      ? blogEditor.categories
      : blogCategories;

    const exists = current.some(
      (item) => String(item || "").trim().toLocaleLowerCase("tr-TR") === clean.toLocaleLowerCase("tr-TR")
    );

    if (exists) {
      setBlogEditorMessage("Bu kategori zaten mevcut.");
      return;
    }

    const nextCategories = [
      "Tümü",
      ...current.filter((item) => item && item !== "Tümü"),
      clean,
    ].filter((item, index, arr) => arr.indexOf(item) === index);

    const ok = await persistBlogEditor(
      { ...blogEditor, categories: nextCategories },
      `"${clean}" kategorisi eklendi.`
    );

    if (ok) {
      setNewBlogCategory("");
      setBlogForm((currentForm) => ({ ...currentForm, category: clean }));
    }
  };

  const deleteBlogCategory = async (categoryName) => {
    if (!categoryName || categoryName === "Tümü") return;

    const usedBy = (blogEditor.posts || []).filter(
      (post) => String(post.category || "").trim().toLocaleLowerCase("tr-TR") === String(categoryName).trim().toLocaleLowerCase("tr-TR")
    );

    if (usedBy.length) {
      setBlogEditorMessage(`"${categoryName}" kategorisi ${usedBy.length} yazıda kullanılıyor. Önce bu yazıların kategorisini değiştirin.`);
      return;
    }

    if (!window.confirm(`"${categoryName}" kategorisini silmek istediğinize emin misiniz?`)) return;

    const nextCategories = (blogEditor.categories || blogCategories).filter(
      (item) => item !== categoryName
    );

    await persistBlogEditor(
      { ...blogEditor, categories: nextCategories },
      `"${categoryName}" kategorisi silindi.`
    );
  };

  const saveBlogPost = async (e) => {
    e.preventDefault();

    if (blogImageUploading) {
      setBlogEditorMessage("Görsel hâlâ hazırlanıyor. Hazırlama tamamlandıktan sonra tekrar yayınlayın.");
      return;
    }

    if (!blogForm.title.trim()) {
      setBlogEditorMessage("Yazı başlığı zorunludur.");
      return;
    }
    if (!blogForm.excerpt.trim()) {
      setBlogEditorMessage("Kısa açıklama zorunludur.");
      return;
    }
    if (!blogForm.body.trim()) {
      setBlogEditorMessage("Yazı içeriği zorunludur.");
      return;
    }
    if (!blogForm.image.trim()) {
      setBlogEditorMessage("Blog kapak görseli zorunludur. Görsel seçildikten sonra 'HAZIR' yazısını görmelisiniz.");
      return;
    }

    setBlogEditorSaving(true);
    setBlogEditorMessage("Yazı Supabase'e kaydediliyor...");

    try {
      // ÖNEMLİ: Form kaydedilirken önce Supabase'deki EN GÜNCEL blog verisini al.
      // Böylece eski admin state'i, yeni eklenen yazarları veya yazıları geri silemez.
      const latest = await readLatestBlogEditor();

      let slug = createBlogSlug(blogForm.slug || blogForm.title);
      const duplicate = (latest.posts || []).find(
        (post) => post.slug === slug && (post.id || post.slug) !== editingBlogId
      );
      if (duplicate) slug = `${slug}-${Date.now().toString().slice(-5)}`;

      const id = editingBlogId || `blog-${Date.now()}`;
      let posts = [...(latest.posts || [])];

      if (blogForm.featured) {
        posts = posts.map((post) => ({ ...post, featured: false }));
      }

      const availableAuthors = (latest.authors || []).filter((author) => author?.slug && author?.name);
      const selectedAuthorSlug = String(blogForm.authorSlug || "").trim();
      const selectedAuthor = selectedAuthorSlug
        ? (
            availableAuthors.find(
              (author) => String(author.slug || "").trim() === selectedAuthorSlug
            ) || null
          )
        : null;

      const nextSortOrder = editingBlogId
        ? Number(blogForm.sortOrder || 100)
        : Math.max(
            0,
            ...(latest.posts || []).map((post)=>Number(post.sortOrder || 0))
          ) + 1;

      const item = {
        id,
        slug,
        title: blogForm.title.trim(),
        category: blogForm.category.trim() || "GENEL",
        date: blogForm.date.trim(),
        readTime: blogForm.readTime.trim() || "5 dk okuma",
        excerpt: blogForm.excerpt.trim(),
        image: blogForm.image.trim(),
        body:
          Array.isArray(blogForm.richBody) && !blogForm.bodyDirty
            ? blogForm.richBody
            : blogForm.body.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean),
        quote: blogForm.quote.trim(),
        status: blogForm.status,
        featured: Boolean(blogForm.featured),
        sortOrder: nextSortOrder,
        authorSlug: selectedAuthor?.slug || "",
        authorName: selectedAuthor?.name || "",
        authorRole: selectedAuthor?.role || "",
        authorImage: selectedAuthor?.image || "",
      };

      const index = posts.findIndex((post) => (post.id || post.slug) === editingBlogId);
      if (index >= 0) posts[index] = item;
      else posts.push(item);

      const categoryName = item.category.trim();
      const existingCategories = Array.isArray(latest.categories) && latest.categories.length
        ? latest.categories
        : blogCategories;

      const categories = existingCategories.some(
        (categoryItem) =>
          String(categoryItem || "").trim().toLocaleLowerCase("tr-TR") ===
          categoryName.toLocaleLowerCase("tr-TR")
      )
        ? existingCategories
        : ["Tümü", ...existingCategories.filter((categoryItem) => categoryItem !== "Tümü"), categoryName];

      const nextContent = {
        ...latest,
        posts,
        categories,
        authors: latest.authors || [],
      };

      const saved = await persistBlogEditor(
        nextContent,
        editingBlogId ? "Blog yazısı kalıcı olarak güncellendi." : "Yeni blog yazısı kalıcı olarak yayınlandı.",
        (content) =>
          Array.isArray(content?.posts) &&
          content.posts.some((post) => (post.id || post.slug) === id && post.slug === slug)
      );

      if (saved) resetBlogForm();
    } catch (error) {
      console.error("Blog yazısı kayıt hazırlama hatası:", error);
      setBlogEditorMessage(`Blog yazısı kaydedilemedi: ${error?.message || "Bilinmeyen hata"}`);
      setBlogEditorSaving(false);
    }
  };

  const getOrderedBlogPosts = (items = blogEditor.posts || []) =>
    [...items].sort((a,b)=>{
      const orderDiff = Number(b.sortOrder ?? 0) - Number(a.sortOrder ?? 0);
      if (orderDiff !== 0) return orderDiff;

      const aTime = Number(String(a.id || "").match(/blog-(\d+)/)?.[1] || 0);
      const bTime = Number(String(b.id || "").match(/blog-(\d+)/)?.[1] || 0);
      return bTime - aTime;
    });

  const moveBlogPost = async (post, direction) => {
    if (blogEditorSaving) return;

    try {
      const latest = await readLatestBlogEditor();
      const ordered = getOrderedBlogPosts(latest.posts || []);
      const currentIndex = ordered.findIndex(
        (item) => (item.id || item.slug) === (post.id || post.slug)
      );

      if (currentIndex < 0) {
        setBlogEditorMessage("Yazı sıralama listesinde bulunamadı.");
        return;
      }

      const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
      if (targetIndex < 0 || targetIndex >= ordered.length) return;

      // Önce tüm kayıtları güvenli ve benzersiz bir sıra numarasına normalize et.
      const normalized = ordered.map((item, index) => ({
        ...item,
        sortOrder: ordered.length - index,
      }));

      const current = normalized[currentIndex];
      const target = normalized[targetIndex];
      const currentOrder = current.sortOrder;

      normalized[currentIndex] = { ...current, sortOrder: target.sortOrder };
      normalized[targetIndex] = { ...target, sortOrder: currentOrder };

      const byId = new Map(
        normalized.map((item) => [String(item.id || item.slug), item])
      );

      const posts = (latest.posts || []).map(
        (item) => byId.get(String(item.id || item.slug)) || item
      );

      await persistBlogEditor(
        { ...latest, posts },
        direction === "up"
          ? "Yazı bir sıra yukarı taşındı."
          : "Yazı bir sıra aşağı taşındı.",
        (content) => {
          const verifyOrdered = getOrderedBlogPosts(content.posts || []);
          const verifyIndex = verifyOrdered.findIndex(
            (item) => (item.id || item.slug) === (post.id || post.slug)
          );
          return verifyIndex === targetIndex;
        }
      );
    } catch (error) {
      console.error("Blog sıralama hatası:", error);
      setBlogEditorMessage(`Sıralama güncellenemedi: ${error?.message || "Bilinmeyen hata"}`);
    }
  };

  const editBlogPost = (post) => {
    setEditingBlogId(post.id || post.slug);
    setBlogImageUploadError("");
    setBlogForm({
      title: post.title || "",
      slug: post.slug || "",
      category: post.category || "GENEL",
      date: post.date || "",
      readTime: post.readTime || "5 dk okuma",
      excerpt: post.excerpt || "",
      image: post.image || "",
      body: blogRichBodyToEditorText(post.body),
      richBody: hasRichBlogBody(post.body) ? post.body : null,
      bodyDirty: false,
      quote: post.quote || "",
      status: post.status || "published",
      featured: Boolean(post.featured),
      sortOrder: post.sortOrder ?? 100,
      authorSlug: post.authorSlug || "",
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

    if (!String(file.type || "").startsWith("image/")) {
      setBlogEditorMessage("Görsel hazırlanamadı: Lütfen JPG, PNG veya WebP bir görsel seçin.");
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setBlogEditorMessage("Görsel hazırlanamadı: Görsel en fazla 20 MB olabilir.");
      return;
    }

    setBlogImageSelectedName(file.name || "Seçilen görsel");
    setBlogImageUploadError("");
    setBlogImageUploading(true);
    setBlogEditorMessage("Görsel optimize ediliyor ve güvenli depolamaya yükleniyor...");

    const previewUrl = URL.createObjectURL(file);
    setBlogImageLocalPreview((current) => {
      if (current?.startsWith("blob:")) {
        try { URL.revokeObjectURL(current); } catch {}
      }
      return previewUrl;
    });

    try {
      // Görseli JSON içine base64 olarak gömmeyin. Büyük veri site_content
      // kaydını taşırarak yazıların eski hâle dönmesine sebep oluyordu.
      const prepared = await prepareBlogImageForUpload(file, {
        // Yönetim panelinin ve mobil cihazların daha akıcı kalması için kapak
        // görsellerini, görsel kaliteyi koruyarak makul bir web boyutuna indir.
        targetBytes: 2.5 * 1024 * 1024,
        maxDimension: 2048,
      });
      const safeName = createBlogSlug(file.name.replace(/\.[^.]+$/, "")) || "blog-kapak";
      const filePath = `blog-covers/${Date.now()}-${safeName}.${prepared.extension}`;
      const { error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(filePath, prepared.file, {
          cacheControl: "31536000",
          upsert: false,
          contentType: prepared.contentType,
        });

      if (uploadError) {
        throw new Error(uploadError.message || "Supabase Storage yüklemesi başarısız oldu.");
      }

      const { data: publicUrlData } = supabase.storage
        .from("blog-images")
        .getPublicUrl(filePath);
      const publicUrl = publicUrlData?.publicUrl;
      if (!publicUrl) throw new Error("Yüklenen görselin bağlantısı oluşturulamadı.");

      await verifyPublicBlogImageUrl(publicUrl);

      setBlogImageLocalPreview((current) => {
        if (current?.startsWith("blob:")) {
          try { URL.revokeObjectURL(current); } catch {}
        }
        return publicUrl;
      });

      setBlogForm((current) => ({ ...current, image: publicUrl }));
      setBlogEditorMessage("✓ Görsel Supabase Storage'a yüklendi. Yazıyı şimdi yayınlayabilirsiniz.");
    } catch (error) {
      console.error("Blog görsel hazırlama hatası:", error);
      // Storage şeması, yetki veya bağlantı sorunu yaşadığında yeni yazının
      // yayınlanmasını engelleme. Küçük/optimize edilmiş yedek görsel doğrudan
      // blog kaydında saklanır ve ReliableBlogPostImage tarafından güvenli açılır.
      try {
        const embeddedImage = await fileToBlogDataUrl(file);
        if (embeddedImage?.startsWith("data:image/")) {
          setBlogForm((current) => ({ ...current, image: embeddedImage }));
          setBlogImageUploadError("");
          setBlogEditorMessage(
            "✓ Storage erişilemedi; görsel optimize edilerek yazıya eklendi. Yazıyı şimdi yayınlayabilirsiniz."
          );
          return;
        }
      } catch (fallbackError) {
        console.error("Görsel yedek hazırlama hatası:", fallbackError);
      }
      setBlogForm((current)=>({ ...current, image: "" }));
      const uploadMessage = error?.message || "Bilinmeyen hata.";
      setBlogImageUploadError(uploadMessage);
      setBlogEditorMessage(`Görsel Storage'a yüklenemedi: ${uploadMessage}`);
    } finally {
      setBlogImageUploading(false);
    }
  };

  const resetAuthorForm = () => {
    setEditingAuthorSlug(null);
    setAuthorForm({ name: "", slug: "", role: "", image: "", shortBio: "", bio: "" });
  };

  const uploadAuthorImage = async (file) => {
    if (!file) return;

    setAuthorImageUploading(true);
    setBlogEditorMessage("Yazar fotoğrafı hazırlanıyor...");

    try {
      const prepared = await prepareBlogImageForUpload(file, { maxDimension: 2200 });
      const safeName = createBlogSlug(file.name.replace(/\.[^.]+$/, "")) || "yazar";
      const filePath = `authors/${Date.now()}-${safeName}.${prepared.extension}`;

      const { error } = await supabase.storage
        .from("blog-images")
        .upload(filePath, prepared.file, {
          cacheControl: "3600",
          upsert: false,
          contentType: prepared.contentType,
        });

      if (error) throw new Error(error.message || "Yazar fotoğrafı yüklenemedi.");

      const { data } = supabase.storage.from("blog-images").getPublicUrl(filePath);
      if (!data?.publicUrl) throw new Error("Yazar fotoğrafı bağlantısı oluşturulamadı.");

      setAuthorForm((current)=>({ ...current, image: data.publicUrl }));
      setBlogEditorMessage(
        prepared.compressed
          ? "Yazar fotoğrafı optimize edildi ve başarıyla yüklendi. Yazarı kaydetmeyi unutmayın."
          : "Yazar fotoğrafı başarıyla yüklendi. Yazarı kaydetmeyi unutmayın."
      );
    } catch (error) {
      console.error("Yazar fotoğrafı yükleme hatası:", error);
      // Storage şeması geçici olarak bozuksa profil fotoğrafı eklemeyi
      // engelleme: blog kapaklarındaki gibi küçük, optimize edilmiş bir
      // data URL yedeği kullan. Böylece yazar kaydı yine kaydedilebilir.
      const isStorageSchemaIssue = /database schema.*(invalid|incompatible)|schema.*out of sync/i.test(
        String(error?.message || "")
      );
      if (isStorageSchemaIssue) {
        try {
          const embeddedImage = await fileToBlogDataUrl(file);
          if (embeddedImage?.startsWith("data:image/")) {
            setAuthorForm((current) => ({ ...current, image: embeddedImage }));
            setBlogEditorMessage(
              "✓ Storage geçici olarak kullanılamıyor; yazar fotoğrafı optimize edilerek profile eklendi. Şimdi Yazarı Güncelle'yi seçin."
            );
            return;
          }
        } catch (fallbackError) {
          console.error("Yazar fotoğrafı yedek hazırlama hatası:", fallbackError);
        }
      }
      setBlogEditorMessage(`Yazar fotoğrafı yüklenemedi: ${error?.message || "Lütfen tekrar deneyin."}`);
    } finally {
      setAuthorImageUploading(false);
    }
  };

  const saveAuthor = async (e) => {
    e.preventDefault();

    if (!authorForm.name.trim() || !authorForm.role.trim() || !authorForm.image.trim() || !authorForm.bio.trim()) {
      setBlogEditorMessage("Yazar adı, unvanı, fotoğrafı ve biyografisi zorunludur.");
      return;
    }

    setBlogEditorSaving(true);
    setBlogEditorMessage("");

    try {
      // Her kayıtta önce sunucudaki güncel blog JSON'unu al.
      // Böylece eski state ile kayıt yapıp mevcut yazarları/yazıları silme problemi oluşmaz.
      const latest = await readLatestBlogEditor();

      let slug = createBlogSlug(authorForm.slug || authorForm.name);
      if (!slug) slug = `yazar-${Date.now()}`;

      const authors = [...(latest.authors || [])];
      const duplicate = authors.find(
        (author) => author.slug === slug && author.slug !== editingAuthorSlug
      );
      if (duplicate) slug = `${slug}-${Date.now().toString().slice(-4)}`;

      const item = {
        slug,
        name: authorForm.name.trim(),
        role: authorForm.role.trim(),
        image: authorForm.image.trim(),
        shortBio: authorForm.shortBio.trim() || authorForm.bio.trim().slice(0, 180),
        bio: authorForm.bio.trim(),
      };

      const index = authors.findIndex((author) => author.slug === editingAuthorSlug);
      if (index >= 0) authors[index] = item;
      else authors.push(item);

      const posts = (latest.posts || []).map((post) => {
        if (!editingAuthorSlug || post.authorSlug !== editingAuthorSlug) return post;
        return {
          ...post,
          authorSlug: slug,
          authorName: item.name,
          authorRole: item.role,
          authorImage: item.image,
        };
      });

      const nextContent = {
        ...latest,
        authors,
        posts,
      };

      const saved = await persistBlogEditor(
        nextContent,
        editingAuthorSlug
          ? "Yazar kalıcı olarak güncellendi."
          : "Yeni yazar kalıcı olarak eklendi.",
        (content) =>
          Array.isArray(content?.authors) &&
          content.authors.some(
            (author) =>
              author.slug === slug &&
              author.name === item.name &&
              author.image === item.image
          )
      );

      if (saved) {
        resetAuthorForm();

        // Yeni yazar listeye eklenir; herhangi bir yazıya otomatik atanmaz.
        setBlogForm((current) => ({
          ...current,
          authorSlug: current.authorSlug || "",
        }));
      }
    } catch (error) {
      console.error("Yazar kayıt hazırlama hatası:", error);
      setBlogEditorMessage(`Yazar kaydedilemedi: ${error?.message || "Bilinmeyen hata"}`);
      setBlogEditorSaving(false);
    }
  };

  const editAuthor = (author) => {
    setEditingAuthorSlug(author.slug);
    setAuthorForm({ name: author.name || "", slug: author.slug || "", role: author.role || "", image: author.image || "", shortBio: author.shortBio || "", bio: author.bio || "" });
    window.setTimeout(()=>document.querySelector(".admin125Authors__form")?.scrollIntoView({behavior:"smooth",block:"start"}),50);
  };

  const deleteAuthor = async (author) => {
    const authors = Array.isArray(blogEditor.authors) ? blogEditor.authors : [];
    if (!window.confirm(`${author.name} yazar profilini silmek istediğinize emin misiniz?`)) return;

    const nextAuthors = authors.filter((item) => item.slug !== author.slug);
    const nextPosts = (blogEditor.posts || []).map((post) =>
      post.authorSlug === author.slug
        ? {
            ...post,
            authorSlug: "",
            authorName: "",
            authorRole: "",
            authorImage: "",
          }
        : post
    );

    const ok = await persistBlogEditor(
      { ...blogEditor, authors: nextAuthors, posts: nextPosts },
      "Yazar profili silindi."
    );

    if (ok && editingAuthorSlug === author.slug) resetAuthorForm();
    if (ok && blogForm.authorSlug === author.slug) {
      setBlogForm((current) => ({ ...current, authorSlug: "" }));
    }
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
        <div className="admin92Intro__image" aria-hidden="true"><img src={adminIntroScene} alt="" /></div>
        <div className="admin92Intro__shade" aria-hidden="true" />
        <div className="admin92Intro__curtain admin92Intro__curtain--left" aria-hidden="true" />
        <div className="admin92Intro__curtain admin92Intro__curtain--right" aria-hidden="true" />
        <span className="admin92Intro__reveal" aria-hidden="true" />
      </main>
    );
  }

  if (authLoading) {
    return (
      <main className="admin70Login">
        <div className="admin70Login__card">
          <div className="admin70Login__logo admin70Login__logo--image">
            <img src={kaanOzkanLogo2026} alt="Kaan Özkan" />
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
        <div className="admin70Login__scene" aria-hidden="true"><img src={blogEditorialSunlit} alt="" /></div>
        <div className="admin70Login__cinema" aria-hidden="true">
          <span>KAAN ÖZKAN · YÖNETİM</span>
          <strong>Her detay<br /><em>yerli yerinde.</em></strong>
          <p>İçerik, randevu ve yayınlar için sakin, güvenli bir kontrol alanı.</p>
          <i />
        </div>
        <form className="admin70Login__card" onSubmit={login}>
          <div className="admin70Login__logo admin70Login__logo--image">
            <img src={kaanOzkanLogo2026} alt="Kaan Özkan" />
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
            <img src={kaanOzkanLogo2026} alt="Kaan Özkan" />
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
            ["analytics", "users", "Ziyaretçi Analitiği"],
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
              onClick={() => switchAdminTab(key)}
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
        {activeTab === "dashboard" && (
          <div className="adminDashboardAmbient" aria-hidden="true">
            <img src={blogEditorialSunlit} alt="" />
            <span />
          </div>
        )}
        <header className="adminDemo__topbar">
          <div className="admin92TopbarCopy">
            <span>YÖNETİM PANELİ</span>
            {activeTab === "dashboard" && <p>Hoş geldiniz, Kaan Özkan -'-</p>}
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
                : activeTab === "analytics"
                ? "Ziyaretçi Analitiği"
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
                  <button type="button" onClick={() => switchAdminTab("appointments")}>
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
                <button type="button" onClick={() => switchAdminTab("appointments")}>
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
                        <span>Detay Maddeleri -" Her satıra bir madde yazın</span>
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
              <button type="button" onClick={()=>{loadBlogEditor({ force: true });loadAuthorSubmissionsAdmin();loadWriterApplicationsAdmin();}} disabled={blogEditorLoading || blogEditorRefreshing || authorSubmissionsLoading || writerApplicationsLoading}>
                {blogEditorLoading || blogEditorRefreshing || authorSubmissionsLoading || writerApplicationsLoading ? "Yenileniyor..." : "Blogu Yenile"}
              </button>
            </div>

            {blogEditorMessage && (
              <div className={`admin100Blog__message ${blogEditorMessage.includes("başarı") || blogEditorMessage.includes("silindi") || blogEditorMessage.includes("güncellendi") || blogEditorMessage.includes("yüklendi") ? "is-success" : blogEditorMessage.includes("kaydediliyor") || blogEditorMessage.includes("yenileniyor") ? "is-progress" : "is-error"}`}>
                {blogEditorMessage}
              </div>
            )}

            {blogEditorLoading ? (
              <div className="admin100Blog__loading">Blog içeriği yükleniyor...</div>
            ) : (
              <>

                <section className="adminWriterApplications">
                  <div className="adminWriterApplications__head">
                    <div><span>YAZAR BAŞVURULARI</span><h3>Yeni sesleri değerlendirin.</h3><p>Blogdaki başvuru formundan gelen adaylar burada incelenir. Kabul ettiğiniz adayın bilgilerini tek tıkla yazar formuna aktarabilirsiniz.</p></div>
                    <div className="adminWriterApplications__count"><strong>{writerApplicationCounts.pending}</strong><span>bekleyen</span></div>
                  </div>
                  <div className="adminWriterApplications__tools">
                    <div role="tablist" aria-label="Başvuru durumu filtresi">
                      {[["pending","Bekleyen",writerApplicationCounts.pending],["accepted","Kabul",writerApplicationCounts.accepted],["rejected","Reddedilen",writerApplicationCounts.rejected],["all","Tümü",writerApplicationCounts.all]].map(([value,label,count])=><button key={value} type="button" role="tab" aria-selected={writerApplicationFilter===value} className={writerApplicationFilter===value ? "is-active" : ""} onClick={()=>setWriterApplicationFilter(value)}>{label}<b>{count}</b></button>)}
                    </div>
                    <label><Icon name="search" size={14}/><input value={writerApplicationQuery} onChange={(event)=>setWriterApplicationQuery(event.target.value)} placeholder="Ad, e-posta veya uzmanlık ara" aria-label="Yazar başvurularında ara"/></label>
                  </div>
                  {writerApplicationsMessage && <div className="adminWriterApplications__message">{writerApplicationsMessage}</div>}
                  {writerApplicationsLoading ? <div className="adminWriterApplications__empty">Başvurular yükleniyor...</div> : writerApplications.length === 0 ? <div className="adminWriterApplications__empty"><span>✦</span><div><strong>Yeni yazar başvurusu yok.</strong><p>Başvuru formu tamamlandığında adaylar burada görünecek.</p></div></div> : visibleWriterApplications.length === 0 ? <div className="adminWriterApplications__empty"><span>⌕</span><div><strong>Bu filtrede başvuru bulunamadı.</strong><p>Durum filtresini veya arama ifadesini değiştirebilirsiniz.</p></div></div> : <div className="adminWriterApplications__list">{visibleWriterApplications.map((application)=><article className="adminWriterApplications__item" key={application.id}><div className="adminWriterApplications__identity"><span>{application.full_name?.charAt(0) || "Y"}</span><div><small>{application.status === "accepted" ? "KABUL EDİLDİ" : application.status === "rejected" ? "REDDEDİLDİ" : "YENİ BAŞVURU"}</small><h4>{application.full_name}</h4><p>{application.email}{application.phone ? ` · ${application.phone}` : ""}</p></div></div><div className="adminWriterApplications__details"><p><b>Eğitim</b>{application.education}</p><p><b>Uzmanlık</b>{application.expertise}</p><p><b>Deneyim</b>{application.experience_years || "Belirtilmedi"}</p><p><b>Konu önerisi</b>{application.sample_topic}</p>{application.portfolio_url && <a href={application.portfolio_url} target="_blank" rel="noreferrer">Portföyü aç ↗</a>}{application.cv_path && <button type="button" className="adminWriterApplications__cv" onClick={()=>openWriterApplicationCv(application)}>CV'yi görüntüle ↗</button>}</div><div className="adminWriterApplications__motivation"><b>Niyet yazısı</b><p>{application.intent_letter || application.motivation}</p>{application.admin_note && <p className="adminWriterApplications__note"><small>YÖNETİCİ NOTU</small>{application.admin_note}</p>}</div><div className="adminWriterApplications__actions"><button type="button" onClick={()=>saveWriterApplicationNote(application)}>Not {application.admin_note ? "Düzenle" : "Ekle"}</button>{application.status !== "accepted" && <button type="button" className="is-approve" onClick={()=>reviewWriterApplication(application,"accepted")}>Kabul Et</button>}{application.status === "accepted" && <button type="button" onClick={()=>startAuthorFromApplication(application)}>Yazar Olarak Tanımla</button>}{application.status !== "rejected" && <button type="button" className="is-reject" onClick={()=>reviewWriterApplication(application,"rejected")}>Reddet</button>}</div></article>)}</div>}
                </section>

                <section className="adminAuthorInbox">
                  <div className="adminAuthorInbox__head">
                    <div>
                      <span>YAZAR GÖNDERİMLERİ</span>
                      <h3>İnceleme Kutusu</h3>
                      <p>Yazarların panelden gönderdiği içerikler burada görünür. Onayladığınız yazı otomatik olarak ilgili yazar profiline bağlanır.</p>
                    </div>
                    <div className="adminAuthorInbox__count">
                      <strong>{authorSubmissions.filter((item)=>item.status==="submitted").length}</strong>
                      <span>bekleyen</span>
                    </div>
                  </div>

                  {authorSubmissionsMessage && <div className="adminAuthorInbox__message">{authorSubmissionsMessage}</div>}

                  {authorSubmissionsLoading ? (
                    <div className="adminAuthorInbox__empty">Yazar gönderimleri yükleniyor...</div>
                  ) : authorSubmissions.filter((item)=>item.status==="submitted").length === 0 ? (
                    <div className="adminAuthorInbox__empty">
                      <span>✓</span>
                      <div>
                        <strong>Bekleyen gönderim yok.</strong>
                        <p>Yeni bir yazar içeriği gönderildiğinde burada görünecek.</p>
                      </div>
                    </div>
                  ) : (
                    <div className="adminAuthorInbox__list">
                      {authorSubmissions.filter((item)=>item.status==="submitted").map((submission)=>{
                        const author = (blogEditor.authors || []).find((item)=>item.slug===submission.author_slug);
                        return (
                          <article className="adminAuthorInbox__item" key={submission.id}>
                            <div className="adminAuthorInbox__cover">
                              {submission.image ? <img src={submission.image} alt=""/> : <span>✦</span>}
                            </div>
                            <div className="adminAuthorInbox__copy">
                              <div>
                                <span>İNCELEME BEKLİYOR</span>
                                <small>{submission.category}</small>
                              </div>
                              <h4>{submission.title}</h4>
                              <p>{submission.excerpt}</p>
                              <div className="adminAuthorInbox__author">
                                {author?.image ? <img src={author.image} alt=""/> : <span>{(author?.name || "Y").charAt(0)}</span>}
                                <p>
                                  <strong>{author?.name || submission.author_slug}</strong>
                                  <small>{author?.role || "Yazar"}</small>
                                </p>
                              </div>
                            </div>
                            <div className="adminAuthorInbox__actions">
                              <button type="button" onClick={()=>window.open(`#/yazarlar/${submission.author_slug}`,"_blank")}>Yazar Profili</button>
                              <button type="button" className="is-reject" onClick={()=>rejectAuthorSubmission(submission)}>Düzeltme İste</button>
                              <button type="button" className="is-approve" onClick={()=>publishAuthorSubmission(submission)}>Yayınla ↗</button>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  )}
                </section>

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

                <section className="admin142Categories">
                  <div className="admin100Blog__sectionHead">
                    <span>02</span>
                    <div>
                      <strong>Blog Kategorileri</strong>
                      <small>Kendi kategorilerinizi oluşturun; yeni yazı hazırlarken listeden seçin.</small>
                    </div>
                  </div>

                  <form className="admin142Categories__create" onSubmit={addBlogCategory}>
                    <label>
                      <span>Yeni Kategori</span>
                      <input
                        value={newBlogCategory}
                        onChange={(e)=>setNewBlogCategory(e.target.value)}
                        placeholder="Örn. Ebeveynlik, İlişkiler, Çocuk & Ergen..."
                      />
                    </label>
                    <button type="submit" disabled={blogEditorSaving}>
                      {blogEditorSaving ? "Kaydediliyor..." : "Kategori Ekle"}
                    </button>
                  </form>

                  <div className="admin142Categories__list">
                    {(blogEditor.categories || blogCategories)
                      .filter((item)=>item && item!=="Tümü")
                      .map((item)=>{
                        const count = (blogEditor.posts || []).filter(
                          (post)=>String(post.category||"").trim().toLocaleLowerCase("tr-TR")===String(item).trim().toLocaleLowerCase("tr-TR")
                        ).length;
                        return <div className="admin142Categories__item" key={item}>
                          <div>
                            <strong>{item}</strong>
                            <small>{count ? `${count} yazıda kullanılıyor` : "Henüz kullanılmıyor"}</small>
                          </div>
                          <button type="button" onClick={()=>deleteBlogCategory(item)} disabled={blogEditorSaving || count>0}>
                            {count>0 ? "Kullanımda" : "Sil"}
                          </button>
                        </div>;
                      })}
                  </div>
                </section>

                <section className="admin125Authors">
                  <div className="admin100Blog__sectionHead">
                    <span>03</span>
                    <div><strong>Yazarlarımız</strong><small>Yeni yazar ekleyin, fotoğraf ve biyografi yönetin.</small></div>
                  </div>
                  <div className="admin125Authors__layout">
                    <form className="admin125Authors__form" onSubmit={saveAuthor}>
                      <div className="admin125Authors__fields">
                        <label><span>Ad Soyad *</span><input value={authorForm.name} onChange={(e)=>setAuthorForm({...authorForm,name:e.target.value,slug:editingAuthorSlug?authorForm.slug:createBlogSlug(e.target.value)})} placeholder="Yazarın adı soyadı"/></label>
                        <label><span>Unvan *</span><input value={authorForm.role} onChange={(e)=>setAuthorForm({...authorForm,role:e.target.value})} placeholder="Örn. Sosyal Hizmet Uzmanı"/></label>
                        <label className="is-wide"><span>Kısa Biyografi</span><textarea rows="3" value={authorForm.shortBio} onChange={(e)=>setAuthorForm({...authorForm,shortBio:e.target.value})} placeholder="Yazar kartında görünecek kısa tanıtım..."/></label>
                        <label className="is-wide"><span>Biyografi *</span><textarea rows="7" value={authorForm.bio} onChange={(e)=>setAuthorForm({...authorForm,bio:e.target.value})} placeholder="Yazarın eğitimi, çalışma alanları, yaklaşımı ve deneyimi..."/></label>
                        <label className="is-wide"><span>Profil Linki</span><div className="admin125Authors__slug"><b>/yazarlar/</b><input value={authorForm.slug} onChange={(e)=>setAuthorForm({...authorForm,slug:createBlogSlug(e.target.value)})}/></div></label>
                      </div>
                      <aside className="admin125Authors__photo">
                        <span>YAZAR FOTOĞRAFI *</span>
                        <div>{authorForm.image?<img src={authorForm.image} alt="Yazar önizleme"/>:<div className="admin125Authors__placeholder"><Icon name="user" size={32}/><small>Fotoğraf seçilmedi</small></div>}</div>
                        <label><input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e)=>{ const file=e.target.files?.[0]; uploadAuthorImage(file); e.target.value=""; }}/><Icon name="image" size={16}/>{authorImageUploading?"Yükleniyor...":"Bilgisayardan Fotoğraf Seç"}</label>
                        <small>JPG, PNG veya WebP · Maksimum 20 MB · Görsel yazıya doğrudan eklenir</small>
                        <input value={authorForm.image} onChange={(e)=>setAuthorForm({...authorForm,image:e.target.value})} placeholder="veya https:// görsel adresi"/>
                      </aside>
                      <div className="admin125Authors__actions">
                        {editingAuthorSlug&&<button type="button" className="is-secondary" onClick={resetAuthorForm}>İptal</button>}
                        <button type="submit" disabled={blogEditorSaving||authorImageUploading}>{blogEditorSaving?"Kaydediliyor...":editingAuthorSlug?"Yazarı Güncelle":"Yeni Yazar Ekle"}</button>
                      </div>
                    </form>
                    <div className="admin125Authors__list">
                      {(blogEditor.authors || defaultBlogAuthors).map((author)=><article key={author.slug}><img src={author.image} alt={author.name}/><div><strong>{author.name}</strong><small>{author.role}</small><p>{author.shortBio}</p></div><div className="admin125Authors__itemActions"><button type="button" onClick={()=>editAuthor(author)}>Düzenle</button><button type="button" className="is-delete" onClick={()=>deleteAuthor(author)}>Sil</button></div></article>)}
                    </div>
                  </div>
                </section>

                <form className="admin100Blog__editor" onSubmit={saveBlogPost}>
                  <div className="admin100Blog__sectionHead">
                    <span>04</span>
                    <div>
                      <strong>{editingBlogId ? "Yazıyı Düzenle" : "Yeni Blog Yazısı"}</strong>
                      <small>Başlık, kapak görseli ve yazı içeriğini tek ekrandan hazırlayın.</small>
                    </div>
                    {(editingBlogId || blogForm.title || blogForm.body || blogForm.excerpt) && (
                      <button type="button" className="admin100Blog__cancel" onClick={resetBlogForm}>
                        {editingBlogId ? "Düzenlemeyi İptal Et" : "Taslağı Temizle"}
                      </button>
                    )}
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
                          <span>Yazar</span>
                          <select value={blogForm.authorSlug} onChange={(e)=>setBlogForm({...blogForm,authorSlug:e.target.value})}>
                            <option value="">Yazar seçin</option>
                            {(blogEditor.authors || defaultBlogAuthors).filter((author)=>author?.slug && author?.name).map((author)=><option key={author.slug} value={author.slug}>{author.name}</option>)}
                          </select>
                        </label>

                        <label>
                          <span>Kategori</span>
                          <select value={blogForm.category} onChange={(e)=>setBlogForm({...blogForm,category:e.target.value})}>
                            <option value="">Kategori seçin</option>
                            {(blogEditor.categories || blogCategories)
                              .filter((item)=>item && item!=="Tümü")
                              .map((item)=><option key={item} value={item}>{item}</option>)}
                          </select>
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
                        {Array.isArray(blogForm.richBody) && !blogForm.bodyDirty && (
                          <small className="adminRichBodyNotice">
                            Bu yazıda tablo/şekil gibi özel bloklar var. Kategori, kapak, yazar veya tarih değiştirip kaydetmeniz içerik düzenini bozmaz.
                          </small>
                        )}
                        <textarea
                          rows="18"
                          value={blogForm.body}
                          onChange={(e)=>setBlogForm({...blogForm,body:e.target.value,bodyDirty:true})}
                          placeholder={"Yazınızı buraya yazın.\n\nYeni paragraf için bir boş satır bırakın.\n\nPanel paragrafları otomatik ayırır."}
                        />
                      </label>

                      <label>
                        <span>Öne Çıkan Alıntı -" İsteğe Bağlı</span>
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
                        {(blogImageLocalPreview || blogForm.image) ? (
                          <img
                            src={blogImageLocalPreview || blogForm.image}
                            alt="Blog kapak önizleme"
                            onError={(e)=>{e.currentTarget.style.display="none"}}
                          />
                        ) : (
                          <div><Icon name="image" size={30}/><p>Henüz görsel seçilmedi</p></div>
                        )}
                      </div>

                      <label className="admin100Blog__upload" htmlFor="adminBlogCoverInput">
                        <input
                          id="adminBlogCoverInput"
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          onClick={(e)=>{ e.currentTarget.value = ""; }}
                          onChange={(e)=>{ const file=e.currentTarget.files?.[0]; if (file) uploadBlogImage(file); }}
                        />
                        <Icon name="plus" size={17}/>
                        {blogImageUploading
                          ? "Görsel Hazırlanıyor..."
                          : blogImageUploadError
                          ? "Yükleme Hatası — Tekrar Dene"
                          : blogForm.image
                          ? "✓ Görsel Hazır — Değiştir"
                          : blogImageSelectedName
                          ? `${blogImageSelectedName}`
                          : "Bilgisayardan Görsel Seç"}
                      </label>

                      {blogImageSelectedName && (
                        <div className={`admin100Blog__uploadStatus ${blogForm.image ? "is-ok" : blogImageUploading ? "is-loading" : blogImageUploadError ? "is-error" : "is-waiting"}`}>
                          <strong>{blogForm.image ? "HAZIR" : blogImageUploading ? "YÜKLENİYOR" : blogImageUploadError ? "YÜKLEME HATASI" : "BEKLİYOR"}</strong>
                          <span>{blogImageUploadError || blogImageSelectedName}</span>
                        </div>
                      )}

                      <small>JPG, PNG veya WebP · Maksimum 20 MB · Görsel Supabase Storage'a yüklenir ve optimize edilir</small>

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
                      {blogEditorMessage && (
                    <small className={blogEditorMessage.includes("başarı") || blogEditorMessage.includes("yayınlandı") || blogEditorMessage.includes("güncellendi") ? "is-success" : blogEditorMessage.includes("kaydediliyor") || blogEditorMessage.includes("yenileniyor") ? "is-progress" : ""} role="status" aria-live="polite">
                          {blogEditorMessage}
                        </small>
                      )}
                    </div>
                    <button type="submit" disabled={blogEditorSaving || blogImageUploading}>
                      {blogEditorSaving ? "Kaydediliyor..." : editingBlogId ? "Yazıyı Güncelle" : "Yazıyı Yayınla"}
                      {!blogEditorSaving && <Icon name="arrow" size={15}/>}
                    </button>
                  </div>
                </form>

                <section className="admin100Blog__library">
                  <div className="admin100Blog__sectionHead">
                    <span>04</span>
                    <div>
                      <strong>Blog Yazıları</strong>
                      <small>{(blogEditor.posts || []).length} kayıt · Yeni yazılar otomatik en üstte. ↑ ↓ ile sıralamayı değiştirebilirsiniz.</small>
                    </div>
                  </div>

                  <div className="admin100Blog__list">
                    {getOrderedBlogPosts()
                      .map((post,index)=>(
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
                          <small className="admin100Blog__orderLabel">Görünüm sırası: {index + 1}</small>
                        </div>
                        <div className="admin100Blog__actions">
                          <div className="admin100Blog__moveActions">
                            <button
                              type="button"
                              disabled={index === 0 || blogEditorSaving}
                              onClick={()=>moveBlogPost(post,"up")}
                              title="Yazıyı bir sıra yukarı taşı"
                            >
                              ↑ Yukarı
                            </button>
                            <button
                              type="button"
                              disabled={index === getOrderedBlogPosts().length - 1 || blogEditorSaving}
                              onClick={()=>moveBlogPost(post,"down")}
                              title="Yazıyı bir sıra aşağı taşı"
                            >
                              ↓ Aşağı
                            </button>
                          </div>
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

        {activeTab === "analytics" && (
          <section className="adminAnalytics">
            <div className="adminAnalyticsHero">
              <div className="adminAnalyticsHero__copy">
                <span>CANLI ZİYARETÇİ İÇGÖRÜLERİ</span>
                <h2>Sitenizin dijital nabzı.</h2>
                <p>
                  Ziyaretçilerin hangi sayfalara geldiğini, yaklaşık şehir/ülke bilgisini,
                  cihaz ve tarayıcı dağılımını tek ekrandan izleyin. Ham IP adresi saklanmaz.
                </p>
              </div>

              <div className="adminAnalyticsHero__controls">
                <div className="adminAnalyticsRange">
                  {[
                    ["1","24 Saat"],
                    ["7","7 Gün"],
                    ["30","30 Gün"],
                    ["90","90 Gün"],
                  ].map(([value,label])=>(
                    <button
                      key={value}
                      type="button"
                      className={analyticsRange===value ? "is-active" : ""}
                      onClick={()=>setAnalyticsRange(value)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <button
                  className="adminAnalyticsRefresh"
                  type="button"
                  onClick={loadAnalytics}
                  disabled={analyticsLoading}
                >
                  <Icon name="users" size={16} />
                  {analyticsLoading ? "Yenileniyor" : "Veriyi Yenile"}
                </button>
                {analyticsLastUpdated && (
                  <small>
                    Son güncelleme {analyticsLastUpdated.toLocaleTimeString("tr-TR",{hour:"2-digit",minute:"2-digit"})}
                  </small>
                )}
              </div>
            </div>

            {analyticsError && (
              <div className="adminAnalyticsError">
                <Icon name="info" size={19}/>
                <div>
                  <strong>Analitik kurulumu gerekiyor</strong>
                  <p>{analyticsError}</p>
                </div>
              </div>
            )}

            <div className="adminAnalyticsKpis">
              {[
                ["Sayfa Görüntüleme", analyticsSummary.pageViews, "Seçili dönemde toplam"],
                ["Tekil Ziyaretçi", analyticsSummary.uniqueVisitors, "Anonim cihaz kimliği"],
                ["Oturum", analyticsSummary.sessions, "Ayrı ziyaret oturumları"],
                ["Bugünkü Görüntüleme", analyticsSummary.todayViews, "Bugün kaydedilen"],
                ["Oturum Başına Sayfa", analyticsSummary.avgPages.toFixed(1), "Ortalama gezinme"],
                ["Tek Sayfa Oranı", `%${analyticsSummary.bounceRate.toFixed(0)}`, "1 sayfalık oturum"],
              ].map(([label,value,note],index)=>(
                <article key={label}>
                  <div className="adminAnalyticsKpis__top">
                    <span>0{index+1}</span>
                    <Icon name={index===1 ? "users" : index===3 ? "calendar" : "edit"} size={18}/>
                  </div>
                  <strong>{value}</strong>
                  <h3>{label}</h3>
                  <p>{note}</p>
                </article>
              ))}
            </div>

            <div className="adminAnalyticsGrid adminAnalyticsGrid--hero">
              <article className="adminAnalyticsPanel adminAnalyticsPanel--trend">
                <div className="adminAnalyticsPanel__head">
                  <div>
                    <span>ZİYARET TRENDİ</span>
                    <h3>Günlük sayfa görüntülemeleri</h3>
                  </div>
                  <b>{analyticsSummary.pageViews}</b>
                </div>
                {analyticsLoading && analyticsRows.length===0 ? (
                  <div className="adminAnalyticsLoader">Analitik verileri hazırlanıyor...</div>
                ) : (
                  <AnalyticsSparkline data={analyticsSummary.trend}/>
                )}
              </article>

              <article className="adminAnalyticsPanel adminAnalyticsPanel--location">
                <div className="adminAnalyticsPanel__head">
                  <div>
                    <span>KONUM</span>
                    <h3>En yoğun şehirler</h3>
                  </div>
                  <Icon name="users" size={20}/>
                </div>
                <AnalyticsBars items={analyticsSummary.cities} limit={7}/>
                <p className="adminAnalyticsPrivacy">
                  Konumlar IP üzerinden yaklaşık şehir/ülke seviyesindedir; GPS kullanılmaz.
                </p>
              </article>
            </div>

            <div className="adminAnalyticsGrid adminAnalyticsGrid--three">
              <article className="adminAnalyticsPanel">
                <div className="adminAnalyticsPanel__head">
                  <div>
                    <span>İÇERİK</span>
                    <h3>En çok görüntülenen sayfalar</h3>
                  </div>
                </div>
                <AnalyticsBars items={analyticsSummary.pages} limit={7}/>
              </article>

              <article className="adminAnalyticsPanel">
                <div className="adminAnalyticsPanel__head">
                  <div>
                    <span>CİHAZ</span>
                    <h3>Cihaz dağılımı</h3>
                  </div>
                </div>
                <AnalyticsBars items={analyticsSummary.devices} limit={7}/>
                <div className="adminAnalyticsSplitMeta">
                  {analyticsSummary.systems.slice(0,4).map(item=>(
                    <span key={item.label}>{item.label}<b>{item.value}</b></span>
                  ))}
                </div>
              </article>

              <article className="adminAnalyticsPanel">
                <div className="adminAnalyticsPanel__head">
                  <div>
                    <span>KAYNAK</span>
                    <h3>Ziyaret nereden geldi?</h3>
                  </div>
                </div>
                <AnalyticsBars items={analyticsSummary.sources} limit={7}/>
                <div className="adminAnalyticsSplitMeta">
                  {analyticsSummary.browsers.slice(0,4).map(item=>(
                    <span key={item.label}>{item.label}<b>{item.value}</b></span>
                  ))}
                </div>
              </article>
            </div>

            <div className="adminAnalyticsMapCard">
              <div className="adminAnalyticsPanel__head">
                <div>
                  <span>COĞRAFİ DAĞILIM</span>
                  <h3>Ülke ve şehir kırılımı</h3>
                </div>
                <b>{analyticsSummary.countries.length} ülke</b>
              </div>
              <div className="adminAnalyticsCountries">
                {analyticsSummary.countries.slice(0,12).map((item,index)=>(
                  <article key={item.label}>
                    <span>{String(index+1).padStart(2,"0")}</span>
                    <div>
                      <strong>{item.label}</strong>
                      <i><em style={{width:`${Math.max(4,(item.value/Math.max(1,analyticsSummary.countries[0]?.value||1))*100)}%`}}/></i>
                    </div>
                    <b>{item.value}</b>
                  </article>
                ))}
                {analyticsSummary.countries.length===0 && (
                  <p className="adminAnalyticsEmptyMini">Konum verisi henüz oluşmadı.</p>
                )}
              </div>
            </div>

            <div className="adminAnalyticsRecent">
              <div className="adminAnalyticsRecent__head">
                <div>
                  <span>SON ZİYARETLER</span>
                  <h3>Ziyaret akışı</h3>
                  <p>En yeni 120 sayfa görüntülemesi.</p>
                </div>
                <label>
                  <Icon name="search" size={15}/>
                  <input
                    value={analyticsSearch}
                    onChange={(e)=>setAnalyticsSearch(e.target.value)}
                    placeholder="Şehir, sayfa, cihaz ara..."
                  />
                </label>
              </div>

              <div className="adminAnalyticsTableWrap">
                <table className="adminAnalyticsTable">
                  <thead>
                    <tr>
                      <th>Zaman</th>
                      <th>Konum</th>
                      <th>Sayfa</th>
                      <th>Cihaz</th>
                      <th>Tarayıcı</th>
                      <th>Kaynak</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analyticsRecentRows.map((row)=>(
                      <tr key={row.id}>
                        <td>
                          <strong>{new Date(row.created_at).toLocaleTimeString("tr-TR",{hour:"2-digit",minute:"2-digit"})}</strong>
                          <small>{new Date(row.created_at).toLocaleDateString("tr-TR")}</small>
                        </td>
                        <td>
                          <strong>{row.city || row.country || "Bilinmiyor"}</strong>
                          <small>{row.city && row.country ? row.country : row.region || row.location_source || "—"}</small>
                        </td>
                        <td>
                          <strong>{row.page_label || "Sayfa"}</strong>
                          <small>{row.path || "#/"}</small>
                        </td>
                        <td>
                          <strong>{row.device_type || "—"}</strong>
                          <small>{row.operating_system || row.screen_size || "—"}</small>
                        </td>
                        <td>
                          <strong>{row.browser || "—"}</strong>
                          <small>{row.language || "—"}</small>
                        </td>
                        <td>
                          <strong>{analyticsHost(row.referrer)}</strong>
                          <small>{row.referrer ? "Yönlendirme" : "Doğrudan giriş"}</small>
                        </td>
                      </tr>
                    ))}
                    {!analyticsLoading && analyticsRecentRows.length===0 && (
                      <tr>
                        <td colSpan="6" className="adminAnalyticsTable__empty">
                          Henüz görüntülenecek ziyaret kaydı yok.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
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

            <section className="admin185Availability" aria-labelledby="availability-title">
              <div className="admin185Availability__heading">
                <div>
                  <span>SAAT UYGUNLUĞU</span>
                  <h3 id="availability-title">Gün ve saatleri yönetin</h3>
                  <p>Hafta içi 08:30–16:30 kapalı; 18:30–00:30 açıktır. Hafta sonu 08:30–02:30 açıktır. İstediğiniz günü buradan istisna olarak düzenleyebilirsiniz.</p>
                </div>
                <label>
                  <span>Tarih</span>
                  <input
                    type="date"
                    min={new Date().toISOString().slice(0, 10)}
                    value={availabilityDate}
                    onChange={(event) => setAvailabilityDate(event.target.value)}
                  />
                </label>
              </div>

              <div className="admin185Availability__toolbar">
                <strong>{availabilityDate ? new Date(`${availabilityDate}T12:00:00`).toLocaleDateString("tr-TR", { weekday: "long", day: "numeric", month: "long" }) : "Tarih seçin"}</strong>
                <div>
                  <button
                    type="button"
                    onClick={() => saveAvailability(getAppointmentTimes(availabilityDate).map((time) => [time, true]))}
                    disabled={availabilityAdminLoading || availabilitySaving}
                  >
                    Tümünü Aç
                  </button>
                  <button
                    type="button"
                    className="is-close"
                    onClick={() => saveAvailability(getAppointmentTimes(availabilityDate).map((time) => [time, false]))}
                    disabled={availabilityAdminLoading || availabilitySaving}
                  >
                    Günü Kapat
                  </button>
                </div>
              </div>

              {availabilityAdminMessage && <p className={`admin185Availability__message ${availabilityAdminMessage.includes("güncellendi") ? "is-success" : "is-error"}`}>{availabilityAdminMessage}</p>}

              <div className="admin185Availability__slots">
                {getAppointmentTimes(availabilityDate).map((time) => {
                  const occupied = appointments.some(
                    (item) => item.appointment_date === availabilityDate && String(item.appointment_time || "").slice(0, 5) === time && item.status !== "cancelled"
                  );
                  const open = isSlotOpen(time);
                  return (
                    <button
                      key={time}
                      type="button"
                      className={`${open ? "is-open" : "is-closed"} ${occupied ? "is-occupied" : ""}`}
                      onClick={() => saveAvailability([[time, !open]])}
                      disabled={availabilityAdminLoading || availabilitySaving || occupied}
                      title={occupied ? "Bu saat için aktif bir randevu var" : open ? "Saati kapat" : "Saati aç"}
                    >
                      <strong>{time}</strong>
                      <span>{occupied ? "Dolu" : open ? "Açık" : "Kapalı"}</span>
                    </button>
                  );
                })}
              </div>
            </section>

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

const PROCESS_FALLBACK_TESTIMONIALS = [
    { no: "01", title: "Danışan Yorumu", person: "Danışan", text: `Sevgili Kaan Hocam, o kadar iyi geldiniz ki.. Yıllardır üstesinden gelemediğim ailevi problemlerime, eşimle olan sıkıntılarıma ve aile huzurumuza seanslarınızla ne kadar iyi geldiğinizi anlatamam size.\n\nSeanslarınız oldukça içten, özverili, hassas ve güven veriyor olması benim için çok önemliydi. Bu önyargılarımı ve ailevi problemlerimizi sizlerle aştım. Ne kadar teşekkür etsem azdır.\n\nEmeğinize sağlık 🙏🏻` },
    { no: "02", title: "Danışan Yorumu", person: "Danışan", text: `Kaan Bey ile 3 Kasım 2024 tarihinde online olarak terapiye başladık ve hayatımın en doğru kararı olduğunu söyleyebilirim.\n\nBenim majör depresyon ve OKB problemim vardı. Tırnak eti yolma, sürekli sayı sayma, güvensizlik, kaygı problemleri ve en önemlisi de öz saygım yoktu.\n\nTerapiler sonucu bunların geçmişten gelen travmalara bağlı olduğunu çözdük ve onara onara devam ettik. Kendisinin içten ve samimi konuşmaları beni çok rahatlatıyor, terapi günü gelsin istiyordum. Terapiden sonra çok mutlu olmaya başladım. Kendime olan özgüvenim yavaş yavaş yerine gelmeye ve depresyon halinden çıkmaya başladım.\n\nKaan Bey'in verdiği ödevleri, stres anında yapmam gerekenleri yaptım. Sayı saymaktan kurtuldum, tırnak eti yolma durumunu aştım. Sınır koymayı, hayır demeyi, kendim için bir şeyler yapmayı çok sevdim…\n\nKaan Bey'i iyi ki tanıdım, iyi ki bu mesleği seçmiş ve bizim gibi bazı problemleri olan insanların hayatlarına küçük dokunuşlarla yeniden gelmesini sağlıyor.\n\nHer şey için çok teşekkür ediyorum. Başarılarınızın devamını diliyorum…` },
    { no: "03", title: "Çift Danışan Yorumu", person: "Çift Danışan", text: `Seansa başlamadan önce birbirimize karşı vakit ayıramıyorduk, şimdi ise daha çok zaman geçiriyoruz, birbirimizi anlıyoruz, daha çok dinliyoruz.\n\nSeansdan önce öfkeli ve kıskançlık vardı ama şu anda onların hepsi bitti ve daha çok sevgi ve dinlemeye başladık. Tek değil de bir olduğumuzu anladık.\n\nBu konuda senin de katkın var, çok teşekkür ediyoruz.` },
    { no: "04", title: "Danışan Yorumu", person: "S.K.", text: `Yoğun ve yüksek düzeyde stres, anksiyete ve kaygı bozukluğu yaşıyordum. Uzun zamandır süren bu rahatsız olduğum konuları Kaan Hoca ile pürüzsüz şekilde sabırla aştık.\n\nAlanında oldukça uzman ve işini layıkıyla yapan birisi. Toplu taşımalara binme, akşam dışarı çıkamama gibi korkularım vardı. Hepsini aştık. OKB'den kurtulduğuma inanamıyorum.` },
    { no: "05", title: "Danışan Yorumu", person: "C.A.", text: `Ekonomik özgürlüğüm yoktu, çıkış yolum yoktu, her türlü şiddeti kabul etmiştim, kendimi insan haricinde her türlü nesne gibi sıradan, basit ve değersiz görüyordum.\n\nKaan Hocamızdan zamanında destek alan bir arkadaşımızın tavsiyesi ile benim de kendisiyle yolum kesişti. Bu kadar değişeceğime hiç ümidim yoktu.\n\nÖn görüşmeden itibaren o kadar işini bilerek yaptığını hissettirdi ki… Terapist unvanından ziyade "yol gösterici, arabulucu, destek verici" nitelikleri ve beni her koşulda inanarak desteklemesi beni yeniden ayağa kaldırdı.\n\nFlört şiddetimi artık rızamla, sesimi çıkararak ve haklarımı arayarak bitirmeme yardımcı oldu.\n\nKadınların; her şeyi kabul edici, ses çıkarmayan, sorgusuz onaylayan değil, tam tersine şiddet karşısında haklarını arayan, sesini çıkaran, erkek şiddetinin karşısında dimdik durması gerektiğinin özgüvenini bana aşıladı.\n\nTeşekkür ediyorum.` },
    { no: "06", title: "Danışan Yorumu", person: "E.Y.", text: `Eşimle 13 yıllık evlilik birlikteliğimiz vardı. Yıllarca evlilik içerisinde sevgi ve saygı olmadan rutine getirdiğimizi Kaan Bey ile keşfettik.\n\nBirbirimize söylemeye cesaret edemediğimiz, yıllarca içimizde biriktirdiğimiz her şeyi çift terapisi ile ilk kez saygı çerçevesinde konuşabildik.\n\nAile danışmanlığını sürekli yuva kuran bir yer olarak düşünüyordum. Ama bir kadın olarak boşanmanın da evlilik kadar normal bir şey olduğunu anladık.\n\nBoşanma sürecinde yardımları için çok teşekkür ederim. Yıpranmadık, sağlıklı yas sürecine girdik ve atlattık.` },
    { no: "07", title: "Çift Danışan Yorumu", person: "Y.K. - B.A.", text: `Biz evlilik yolunda sürekli inişli-çıkışlı ilişkiye sahip toksik bir çifttik. Baskılar, psikolojik şiddet karşılıklı ve sürekliydi.\n\nTavsiye üzerine Kaan Bey'i keşfettik. Evliliğe dair anlatılan "korkunç" hikâyeleri uzmanından sağlıklı bir şekilde dinleyerek kendimize ve davranışlarımıza dair ders çıkardık.\n\nİlişkideki birbirimize olan bağımlılığımızı ciddi oranda aştık.\n\nMeğerse çift olmak hayatı birbirine zindan etmek değil, herkes için devam eden hayatta birbirini gerçekten anlamak ve destek olmak demekmiş.\n\nKendisini herkese tavsiye ediyoruz.` },
    { no: "08", title: "Danışan Yorumu", person: "Danışan", text: `Kaan hocam iyi akşamlar. Bugün sizinle online olarak yaptığımız sürecin sonuna gelmenin heyecanı ile size teşekkür etmek için yazmak istedim.\n\nÖncelikle benim hayallerimin önünü sonsuza kadar açtığınız için, bana yeni bakış açıları kazandırdığınız için, hiç bilmediğim şeyleri öğrettiğiniz için minnettarım. 🙏🏻\n\nBoşanmadan önce ve boşanma sürecinde korkularımla yüzleşip özgürleştirdiğiniz için teşekkür borçluyum size.\n\nŞu an sınırlarım yok ve "elalem ne der" zerre umurumda değil.\n\nSayenizde güçlüyüm, güçlendim ve bütün kadınlara güçlerinin ne olduğunu hep anlatacağım. -'-🏻🙂` },
    { no: "09", title: "Danışan Yorumu", person: "Danışan", text: `Ben 24 Ekim 2025 tarihi ile sizinle seansa başladım. Üniversite öğrencisiyim, bu yüzden aşırı derecede stres, anksiyete ve panik atak problemleri yaşıyordum.\n\nAma seanslara başladıktan sonra stresle başa çıkmayı, kontrol altına almayı öğrendim.\n\nAyrıca hayır diyememe ve sınır koyamama gibi problemlerim de vardı. Artık kendi değerimi biliyor ve sınır koyabiliyorum.\n\nİyi ki sizinle tanışıp seanslara devam ettim. Size çok teşekkür ederim.` },
    { no: "10", title: "Danışan Yorumu", person: "Danışan", text: `Terapi sürecine dair tüm çekincelerimle kapınızı çalmıştım. İlk günden itibaren kurduğunuz güvenli alan hayatımda çok anlamlı bir dönüm noktası oldu.\n\nSayenizde artık hayata ve olaylara çok daha sağlam bir pencereden bakıyorum.\n\nProfesyonelliğiniz ve her seanstan yeni bir farkındalıkla ayrılmamı sağladığınız için size gönülden teşekkür ederim.\n\nDesteğiniz, sabrınız ve rehberliğiniz benim için çok değerliydi, bana çok iyi geldiniz.\n\nİyi ki yollarımız kesişmiş. 🙏🏻` },
];

function ProcessDetailPage({ content }) {

  const steps = content.steps?.length ? content.steps : defaultProcessContent.steps;
  const trustItems = content.trustItems?.length ? content.trustItems : defaultProcessContent.trustItems;
  const testimonials = content.testimonials?.length ? content.testimonials : PROCESS_FALLBACK_TESTIMONIALS;

  // Süreç sahneleri hizmet kartlarından bağımsız ilerler; aynı koltuk/deniz
  // karesinin tekrar etmemesi için her adımda farklı bir danışmanlık bağlamı kullanılır.
  const processVisuals = [
    serviceCoupleImage,
    servicesHeroRoom,
    processPracticeAbstractV2,
    serviceDivorceGriefImage,
    processConsultationCinemaV3,
  ];
  // Küçük yan görseller ana süreç görsellerinden ayrıdır. Böylece 03. adım için
  // üretilen görsel, Ekol/Hedef Belirleme kartının içinde tekrar görünmez.
  const processInsetVisuals = [
    processCinemaV2,
    homeLightCinemaHero,
    servicePsychosocialFamilyV3,
    heroSlide1,
    blogCinemaStudio,
  ];

  const stepMeta = [
    "TANIŞMA · İHTİYAÇ · ÇERÇEVE",
    "ÖNCELİK · HEDEF · YOL HARİTASI",
    "FARKINDALIK · UYGULAMA · DEĞİŞİM",
    "İLERLEME · GÖZDEN GEÇİRME · DENGE",
    "KAZANIM · SÜRDÜRME · DESTEK",
  ];

  const stepQuote = [
    "İlk görüşme, yalnızca sorunu anlatmak değil; sürecin nasıl ilerleyeceğini birlikte anlamak için güvenli bir başlangıçtır.",
    "Her danışanın ihtiyacı farklıdır. Bu nedenle hedefler hazır bir kalıptan değil, sizin yaşamınızdan oluşturulur.",
    "Değişim yalnızca konuşmakla değil; fark edilen örüntüleri gerçek yaşamda yeni davranışlarla deneyimlemekle güçlenir.",
    "Süreç boyunca ilerleme birlikte değerlendirilir; ihtiyaç olduğunda çalışma biçimi yeniden şekillendirilir.",
    "Amaç danışmanlığa bağımlılık değil, kazandığınız farkındalık ve becerileri kendi yaşamınızda sürdürebilmektir.",
  ];

  return (
    <main className="processCinePage">
      <section className="processCineHero cin3d">
        <div className="processCineHero__bg cin3dParallax" data-depth="0.13" aria-hidden="true">
          <img src={processConsultationCinemaV3} alt="" fetchPriority="high" decoding="async" />
          <div className="processCineHero__veil" />
          <div className="processCineHero__grain" />
        </div>

        <a className="processCineHero__back" href="#/">
          <span>←</span>
          Ana Sayfaya Dön
        </a>

        <div className="processCineHero__inner">
          <div className="processCineHero__copy">
            <span className="processCineHero__eyebrow">{content.heroEyebrow}</span>
            <h1>
              {content.heroTitle}
              <strong>{content.heroAccent}</strong>
            </h1>
            <p>{content.heroDescription}</p>
            <a href="#processCineFlow" className="processCineHero__cta">
              Süreci Keşfedin
              <Icon name="arrow" size={16} />
            </a>
          </div>

          <div className="processCineHero__rail" aria-hidden="true">
            <div><b>İLK</b><span>ÖN<br/>GÖRÜŞME</span></div>
            <div><b>5</b><span>ADIMLIK<br/>SÜREÇ</span></div>
            <div><b>ESNEK</b><span>KİŞİYE<br/>ÖZEL</span></div>
          </div>
        </div>

        <div className="processCineHero__scroll" aria-hidden="true">
          <span />
          <small>KEŞFET</small>
        </div>
      </section>

      <section className="processCineIntro processCineManifesto cin3d" id="processCineFlow">
        <div className="processCineIntro__inner">
          <div className="processCineManifesto__lead">
            <span><i />{content.sectionEyebrow}</span>
            <h2>{content.sectionTitle}</h2>
            <p>Her adım; ihtiyaçlarınıza, yaşam ritminize ve hedeflerinize göre birlikte şekillenir.</p>
          </div>
          <div className="processCineManifesto__statement">
            <b><em>5</em><i /> ADIM</b>
            <p>Süreç doğrusal ve katı bir plan değildir. İhtiyaçlarınıza, yaşam koşullarınıza ve ilerlemenize göre birlikte şekillenen esnek bir çalışma alanıdır.</p>
            <div className="processCineManifesto__values"><span>GÜVEN</span><span>DİYALOG</span><span>DENGE</span></div>
          </div>
        </div>
      </section>

      <div className="processCineSteps">
        {steps.map((step, index) => (
          <section
            className={`processCineStep cin3d ${index % 2 === 1 ? "processCineStep--reverse" : ""}`}
            key={step.no}
          >
            <div className="processCineStep__bg cin3dParallax" data-depth={index % 2 === 0 ? "0.12" : "0.16"} aria-hidden="true">
              <img
                src={processVisuals[index % processVisuals.length]}
                alt=""
                loading="lazy"
                decoding="async"
              />
              <div className="processCineStep__veil" />
              <div className="processCineStep__grain" />
            </div>

            <div className="processCineStep__inner">
              <article className="processCineStep__copy">
                <span className="processCineStep__number">{step.no}</span>
                <span className="processCineStep__eyebrow">DANIŞMANLIK SÜRECİ</span>
                <h2>{step.title}</h2>
                <p>{step.text}</p>

                <div className="processCineStep__meta">
                  <Icon name={step.icon || "check"} size={18} />
                  <span>{stepMeta[index] || "KİŞİYE ÖZEL · ESNEK · BÜTÜNCÜL"}</span>
                </div>
              </article>

              <aside className="processCineStep__glass">
                <div className="processCineStep__glassImage">
                  <img
                    src={processInsetVisuals[index % processInsetVisuals.length]}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                  <div />
                </div>
                <blockquote>{stepQuote[index] || step.text}</blockquote>
                <small>KAAN ÖZKAN · DANIŞMANLIK SÜRECİ</small>
              </aside>
            </div>

            <div className="processCineStep__edge" aria-hidden="true" />
          </section>
        ))}
      </div>

      <section className="processCineTrust cin3d">
        <div className="processCineTrust__bg" aria-hidden="true">
          <img src={processConsultationCinemaV3} alt="" loading="lazy" decoding="async" />
          <div />
        </div>

        <div className="processCineTrust__inner">
          <header>
            <span>SÜRECİN TEMELİ</span>
            <h2>Güvenli, esnek ve kişiye özel.</h2>
          </header>

          <div className="processCineTrust__grid">
            {trustItems.map((item, index) => (
              <article key={`${item.title}-${index}`}>
                <div><Icon name={item.icon || "check"} size={22} /></div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>

          <a className="processCineTrust__cta" href="#/randevu">
            Ücretsiz Ön Görüşme
            <Icon name="arrow" size={16} />
          </a>
        </div>
      </section>

      <section className="processReviewsGateway cin3d" aria-labelledby="processReviewsTitle">
        <div className="processReviewsGateway__copy">
          <span>DEĞERLİ YORUMLARINIZ</span>
          <h2 id="processReviewsTitle">Her deneyim, bu yolculuğa bırakılmış kıymetli bir iz.</h2>
          <p>{content.testimonialsDescription}</p>
          <a href="#/yorumlar">
            Tüm Değerli Yorumları Okuyun
            <Icon name="arrow" size={17} />
          </a>
        </div>

        <div className="processReviewsGateway__preview" aria-label="Yorumlardan kısa alıntılar">
          <div className="processReviewsGateway__count">
            <strong>{String(testimonials.length).padStart(2, "0")}</strong>
            <span>PAYLAŞILAN<br />DENEYİM</span>
          </div>
          {testimonials.slice(0, 2).map((item) => (
            <article key={item.no}>
              <span>“</span>
              <p>{item.text.split("\n")[0]}</p>
              <small>{item.person} · {item.title}</small>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function TestimonialsPage({ content }) {
  const testimonials = content.testimonials?.length ? content.testimonials : PROCESS_FALLBACK_TESTIMONIALS;

  return (
    <main className="reviewsPremPage">
      <section className="reviewsPremHero">
        <a className="reviewsPremHero__back" href="#/surec">
          <span>←</span>
          Sürece Dön
        </a>

        <div className="reviewsPremHero__ornament" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <div className="reviewsPremHero__inner">
          <div className="reviewsPremHero__copy">
            <span>DEĞERLİ YORUMLARINIZ</span>
            <h1>Paylaştığınız her deneyim <em>bizim için kıymetli.</em></h1>
            <p>{toCounselingLanguage(content.testimonialsDescription)}</p>
          </div>

          <div className="reviewsPremHero__number" aria-label={`${testimonials.length} paylaşılan deneyim`}>
            <strong>{String(testimonials.length).padStart(2, "0")}</strong>
            <span>GERÇEK<br />DENEYİM</span>
          </div>
        </div>

        <div className="reviewsPremHero__principles" aria-label="Yorum ilkeleri">
          <span><Icon name="shield" size={16} /> Gizlilikle paylaşılır</span>
          <span><Icon name="check" size={16} /> Metinler korunur</span>
          <span><Icon name="heart" size={16} /> Deneyime saygı duyulur</span>
        </div>
      </section>

      <section className="reviewsPremCollection" aria-labelledby="reviewsCollectionTitle">
        <header className="reviewsPremCollection__head">
          <div>
            <span>PAYLAŞILANLAR</span>
            <h2 id="reviewsCollectionTitle">Süreçten kalan<br /><em>değerli cümleler.</em></h2>
          </div>
          <p>Her yorum kendi anlatımı ve duygusuyla korunur. Yalnızca paylaşım izni bulunan metinler kullanılır; kişiyi tanımlayabilecek ayrıntılar azaltılarak mahremiyet korunur.</p>
        </header>

        <div className="reviewsPremGrid">
          {testimonials.map((item, index) => (
            <article className={`reviewsPremCard ${index === 0 ? "reviewsPremCard--featured" : ""}`} key={item.no}>
              <div className="reviewsPremCard__top">
                <span className="reviewsPremCard__quote">“</span>
                <small>{String(index + 1).padStart(2, "0")}</small>
              </div>
              <p>{toCounselingLanguage(item.text)}</p>
              <footer>
                <div>
                  <strong>{item.person}</strong>
                  <span>{toCounselingLanguage(item.title)}</span>
                </div>
                <span className="reviewsPremCard__mark"><Icon name="check" size={13} /> Paylaşılan mesaj</span>
              </footer>
            </article>
          ))}
        </div>

        <div className="reviewsPremNote">
          <Icon name="info" size={18} />
          <p>Paylaşımlar yalnızca açık izinle, kişiyi tanımlayabilecek bilgiler azaltılarak yayımlanır. {toCounselingLanguage(content.testimonialsNote)}</p>
        </div>
      </section>

      <section className="reviewsPremCta">
        <div>
          <span>SİZİN SÜRECİNİZ</span>
          <h2>Hazır olduğunuz yerden, birlikte başlayabiliriz.</h2>
        </div>
        <a href="#/randevu">
          Ücretsiz Ön Görüşme
          <Icon name="arrow" size={17} />
        </a>
      </section>
    </main>
  );
}

const getServicePreview = (value, maxLength = 360) => {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  if (text.length <= maxLength) return text;
  const sentenceEnd = text.lastIndexOf(". ", maxLength);
  const safeEnd = sentenceEnd > 160 ? sentenceEnd + 1 : maxLength;
  return `${text.slice(0, safeEnd).trim()}…`;
};

function ServicesDetailPage({ content }) {
  const serviceCards = [
    {
      no: "01", icon: "user", slug: "bireysel-danismanlik",
      eyebrow: "BİREYSEL ÇALIŞMA",
      title: "Bireysel Danışmanlık",
      short: getServicePreview(toCounselingLanguage(content.individualShort)),
      image: serviceIndividualCinemaV2,
      meta: "Kaygı · Duygu Düzenleme · Özdeğer",
      quote: "Kendinizi daha yakından anlamak ve yaşamınızda daha işlevsel bir denge kurmak için.",
    },
    {
      no: "02", icon: "heart", slug: "cift-danismanligi",
      eyebrow: "İLİŞKİ & İLETİŞİM",
      title: "Çift Danışmanlığı",
      short: getServicePreview(toCounselingLanguage(content.coupleShort)),
      image: serviceCoupleImage,
      meta: "İletişim · Güven · Bağlanma",
      quote: "İlişkinizi yalnızca çatışmalar üzerinden değil, kurduğunuz bağın bütünü üzerinden ele almak için.",
    },
    {
      no: "03", icon: "shield", slug: "psikososyal-destek",
      eyebrow: "GÜÇLENME & UYUM",
      title: "Psikososyal Destek",
      short: getServicePreview(content.psychosocialShort),
      image: servicePsychosocialSupportV3,
      meta: "Yas · Uyum · Dayanıklılık",
      quote: "Zorlu yaşam dönemlerinde yalnızca soruna değil, sahip olduğunuz kaynaklara da birlikte bakmak için.",
    },
    {
      no: "04", icon: "compass", slug: "bosanma-ve-yas-danismanligi",
      eyebrow: "KAYIP & YENİDEN YAPILANMA",
      title: "Boşanma ve Yas Danışmanlığı",
      short: "Boşanma, kayıp ve yaşamın yeniden yapılandırıldığı dönemlerde psikolojik ve sosyal uyuma odaklanan bütüncül danışmanlık.",
      image: serviceDivorceGriefCoupleV3,
      meta: "Kayıp · Uyum · Yeniden Yapılanma",
      quote: "Bir dönemin sona ermesini, yaşamınızın tamamının sona ermesi gibi yaşamamak için yeni bir alan açmak.",
    },
    {
      no: "05", icon: "users", slug: "bekar-danismanligi",
      eyebrow: "ÖZDEĞER & İLİŞKİSEL FARKINDALIK",
      title: "Bekar Danışmanlığı",
      short: "İlişki durumundan bağımsız psikolojik iyi oluş, özdeğer, ilişki örüntüleri, sosyal bağlar ve sağlıklı sınırlar üzerine çalışma.",
      image: serviceSingleConsultationImage,
      meta: "Özdeğer · İlişkiler · Sınırlar",
      quote: "Kendinizle kurduğunuz ilişkiyi güçlendirmek, gelecekte kuracağınız ilişkilerin de zeminini güçlendirir.",
    },
  ];

  return (
    <main className="svcCinePage">
      <section className="svcCineHero cin3d">
        <div className="svcCineHero__bg cin3dParallax" data-depth="0.12" aria-hidden="true">
          <img src={servicesHeroCinemaV1} alt="" />
          <div className="svcCineHero__veil" />
          <div className="svcCineHero__grain" />
        </div>

        <a className="svcCineHero__back" href="#/">
          <span>←</span>
          Ana Sayfaya Dön
        </a>

        <div className="svcCineHero__inner">
          <div className="svcCineHero__copy">
            <span className="svcCineHero__eyebrow">{content.heroEyebrow}</span>
            <h1>
              {content.heroTitle}
              <strong>{content.heroAccent}</strong>
            </h1>
            <p>{content.heroDescription}</p>
            <a href="#svcCineAreas" className="svcCineHero__cta">
              Çalışma Alanlarını Keşfedin
              <Icon name="arrow" size={16}/>
            </a>
          </div>

          <div className="svcCineHero__rail" aria-hidden="true">
            <div><b>5</b><span>ÇALIŞMA<br/>ALANI</span></div>
            <div><b>ETİK</b><span>GİZLİLİKLE<br/>YÜRÜTÜLEN</span></div>
            <div><b>ESNEK</b><span>BÜTÜNCÜL<br/>BAKIŞ</span></div>
          </div>
        </div>

        <div className="svcCineHero__scroll" aria-hidden="true">
          <span />
          <small>KEŞFET</small>
        </div>
      </section>

      <section className="svcOnlineConsultation cin3d" id="svcCineAreas">
        <div className="svcOnlineConsultation__photo" aria-hidden="true">
          <div
            className="svcOnlineConsultation__photoWash"
            style={{ backgroundImage: `url(${serviceOnlineConsultationImage})` }}
          />
          <img src={serviceOnlineConsultationImage} alt="" loading="lazy" decoding="async" />
          <div className="svcOnlineConsultation__photoVeil" />
        </div>
        <div className="svcOnlineConsultation__content">
          <span>UZAKTAN GÖRÜŞME</span>
          <h2>Online <em>Danışmanlık</em></h2>
          <p>
            Bulunduğunuz yerden, güvenli ve planlı bir görüşme düzeniyle danışmanlık sürecine katılabilirsiniz.
            Uygunluk, görüşme biçimi ve ihtiyaçlarınız ilk iletişimde birlikte değerlendirilir.
          </p>
          <a href="#/randevu">
            Online görüşme planlayın
            <Icon name="arrow" size={16}/>
          </a>
        </div>
      </section>

      <div className="svcCinePanels">
        {serviceCards.map((service, index) => (
          <section
            className={`svcCinePanel cin3d ${index % 2 === 1 ? "svcCinePanel--reverse" : ""}`}
            key={service.slug}
          >
            <div className="svcCinePanel__bg cin3dParallax" data-depth={index % 2 === 0 ? "0.12" : "0.16"} aria-hidden="true">
              <img src={service.image} alt="" loading="lazy" decoding="async" onError={(e)=>{e.currentTarget.style.display="none"}} />
              <div className="svcCinePanel__veil" />
              <div className="svcCinePanel__grain" />
            </div>

            <div className="svcCinePanel__inner">
              <article className="svcCinePanel__copy">
                <span className="svcCinePanel__eyebrow">{service.eyebrow}</span>
                <h2>{service.title}</h2>
                <p>{service.short}</p>

                <div className="svcCinePanel__meta">
                  <Icon name={service.icon} size={18}/>
                  <span>{service.meta}</span>
                </div>

                <a href={`#/hizmetler/${service.slug}`} className="svcCinePanel__cta">
                  Detaylı Bilgi
                  <span>↗</span>
                </a>
              </article>

              <aside className="svcCinePanel__glass">
                <div className="svcCinePanel__glassImage">
                  <img src={service.image} alt="" loading="lazy" decoding="async" />
                  <div />
                </div>
                <blockquote>{service.quote}</blockquote>
                <small>KAAN ÖZKAN · AİLE DANIŞMANLIĞI</small>
              </aside>
            </div>

            <div className="svcCinePanel__edge" aria-hidden="true" />
          </section>
        ))}
      </div>

      <section className="svcCineTrust cin3d">
        <div className="svcCineTrust__bg" aria-hidden="true">
          <img src={servicesHeroRoom} alt="" loading="lazy" decoding="async" />
          <div />
        </div>
        <div className="svcCineTrust__content">
          <div className="svcCineTrust__icon"><Icon name="shield" size={25}/></div>
          <span>ETİK & GİZLİLİK</span>
          <h2>Her süreç kişiye özgü değerlendirilir.</h2>
          <p>
            Görüşmeler mesleki sınırlar, gizlilik ve kişiye özgü değerlendirme ilkeleri çerçevesinde yürütülür.
            Danışmanlık sürecinin çerçevesi ihtiyaçlarınıza göre birlikte belirlenir.
          </p>
          <a href="#/surec">
            Süreci İnceleyin
            <Icon name="arrow" size={16}/>
          </a>
        </div>
      </section>
    </main>
  );
}

function serviceParagraphKind(text) {
  if (/^\d{1,2}\.\s/.test(text)) return "numbered";
  if (/^\d+\.\s/.test(text)) return "numbered";
  if (text.length < 95 && /[?:]$/.test(text)) return "heading";
  const exactHeadings = [
    `Kayıp ve yasın anlamlandırılması:", "Duygusal düzenleme:", "Bilişsel süreçlerin ele alınması:`,
    `Kimlik ve benlik algısı:", "Yeni yaşam düzenine uyum:", "İlişki örüntülerinin değerlendirilmesi:`,
    `Ebeveynlik ve ortak ebeveynlik:", "Bilişsel Davranışçı Terapi yaklaşımı", "Kabul ve Kararlılık Terapisi (ACT)`,
    `Anlatı ve Anlam Odaklı Yaklaşım", "Sistemik ve Aile Odaklı Yaklaşım", "Çözüm Odaklı yaklaşım`,
    `Sosyal Hizmet ve Ekolojik Yaklaşım", "Şema Odaklı Yaklaşım", "Bağlanma Temelli Yaklaşım`,
    `Kabul ve Kararlılık Terapisi", "Kişilerarası Terapi ve Kişilerarası Beceri Çalışmaları`,
    "Çözüm Odaklı ve Güçler Perspektifi"
  ];
  if (exactHeadings.includes(text)) return "heading";
  if (text.length < 82 && !/[.!?]$/.test(text)) return "heading";
  return "body";
}

function ServiceArticlePage({ slug, fallbackContent }) {
  const sourceService = detailedServicePages[slug];
  const service = sourceService ? {
    ...sourceService,
    eyebrow: toCounselingLanguage(sourceService.eyebrow),
    title: toCounselingLanguage(sourceService.title),
    accent: toCounselingLanguage(sourceService.accent),
    intro: toCounselingLanguage(sourceService.intro),
    paragraphs: sourceService.paragraphs.map(toCounselingLanguage),
  } : null;
  if (!service) return <ServicesDetailPage content={fallbackContent} />;

  const sections = [];
  let current = { title: "", paragraphs: [] };
  service.paragraphs.forEach((paragraph) => {
    const kind = serviceParagraphKind(paragraph);
    if (kind === "numbered" || kind === "heading") {
      if (current.title || current.paragraphs.length) sections.push(current);
      current = { title: paragraph, paragraphs: [] };
    } else {
      current.paragraphs.push(paragraph);
    }
  });
  if (current.title || current.paragraphs.length) sections.push(current);

  return (
    <main className="svc105Article">
      <section className="svc105ArticleHero">
        <div className="svc105ArticleHero__image">
          <img src={service.image} alt="" aria-hidden="true" onError={(e)=>{e.currentTarget.style.display="none"}} />
          <div />
        </div>
        <a className="svc105ArticleBack" href="#/hizmetler">← Hizmetlere Dön</a>
        <div className="svc105ArticleHero__copy">
          <div className="svc108HeroIdentity">
            <b>{service.no}</b>
            <i />
            <span>{service.eyebrow}</span>
          </div>
          <h1>{service.title}<strong>{service.accent}</strong></h1>
          <p>{service.intro}</p>
          <div className="svc108HeroMeta">
            <span>DETAYLI ÇALIŞMA ALANI</span>
            <span>KAAN ÖZKAN</span>
          </div>
        </div>
        <div className="svc105ArticleHero__no" aria-hidden="true">{service.no}</div>
      </section>

      <section className="svc105ArticleLayout">
        <aside className="svc105ArticleNav">
          <span>BU SAYFADA</span>
          {sections.slice(0, 10).map((section, index) => (
            section.title ? <a key={index} href={`#svc105-section-${index}`}><b>{String(index + 1).padStart(2,"0")}</b>{section.title.replace(/^\d{1,2}\.\s*/, "")}</a> : null
          ))}
          <a className="svc105ArticleNav__cta" href="#/randevu">Ücretsiz Ön Görüşme <Icon name="arrow" size={14}/></a>
        </aside>

        <article className="svc105ArticleBody">
          <div className="svc105ArticleLead">
            <span>DETAYLI BİLGİ</span>
            <p>Bu sayfadaki içerik, ilgili çalışma alanının kapsamını ve danışmanlık sürecinde ele alınabilecek konuları ayrıntılı biçimde açıklamaktadır.</p>
          </div>
          {sections.map((section, index) => (
            <section className="svc105ArticleSection" id={`svc105-section-${index}`} key={index}>
              {section.title && <h2>{section.title}</h2>}
              {section.paragraphs.map((paragraph, pIndex) => <p key={pIndex}>{paragraph}</p>)}
            </section>
          ))}
          <div className="svc105ArticleEnd">
            <span>SONRAKİ ADIM</span>
            <h2>Size uygun süreci birlikte değerlendirelim.</h2>
            <p>İlk görüşmede ihtiyaçlarınız ve danışmanlık sürecine ilişkin beklentileriniz birlikte ele alınır.</p>
            <a href="#/randevu">Ücretsiz Ön Görüşme <Icon name="arrow" size={16}/></a>
          </div>
        </article>
      </section>
    </main>
  );
}

function AboutDetailPage({ content = defaultAboutContent }) {
  const [activeCertificate, setActiveCertificate] = useState(null);
  const [certificateArchiveOpen, setCertificateArchiveOpen] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);
  const certificateArchiveRef = useRef(null);
  const certificateModalRef = useRef(null);
  const cvArchiveRef = useRef(null);

  const resetOverlayScroll = (overlay) => {
    if (!overlay) return;
    overlay.scrollTop = 0;
    overlay.scrollLeft = 0;
    const panel = overlay.querySelector("[data-about-overlay-panel]");
    if (panel) {
      panel.scrollTop = 0;
      panel.scrollLeft = 0;
    }
  };

  const currentOverlay = () => (activeCertificate
    ? certificateModalRef.current
    : cvOpen
      ? cvArchiveRef.current
      : certificateArchiveOpen
        ? certificateArchiveRef.current
        : null);

  // Arşivler açıldığında yalnızca ilk konumları sıfırlanır; kullanıcı kaydırırken
  // bu işlem tekrar çalışmaz ve sayfanın doğal kaydırması korunur.
  useLayoutEffect(() => {
    const overlay = currentOverlay();
    if (!overlay) return undefined;
    resetOverlayScroll(overlay);
    return undefined;
  }, [activeCertificate, certificateArchiveOpen, cvOpen]);

  useEffect(() => {
    const overlay = currentOverlay();
    if (!overlay) return undefined;
    const onWheel = (event) => {
      if (!event.deltaY) return;
      const maxScroll = Math.max(0, overlay.scrollHeight - overlay.clientHeight);
      const nextScroll = Math.min(maxScroll, Math.max(0, overlay.scrollTop + event.deltaY));
      if (nextScroll !== overlay.scrollTop) {
        overlay.scrollTop = nextScroll;
        event.preventDefault();
      }
    };
    overlay.addEventListener("wheel", onWheel, { passive: false });
    return () => overlay.removeEventListener("wheel", onWheel);
  }, [activeCertificate, certificateArchiveOpen, cvOpen]);

  const openCvArchive = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    setCvOpen(true);
  };

  const openCertificateArchive = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    setCertificateArchiveOpen(true);
  };
  const paragraphs = Array.isArray(content.paragraphs)
    ? content.paragraphs
    : String(content.paragraphs || "").split(/\n\s*\n/).map((item) => item.trim()).filter(Boolean);
  const featuredCertificates = ABOUT_CERTIFICATES.filter((certificate) => certificate.featured);

  return (
    <main className="about158">
      <section className="about158Hero">
        <a href="#/" className="about158Back">
          <span>←</span>
          <small>ANA SAYFAYA DÖN</small>
        </a>

        <div className="about158Hero__shell">
          <div className="about158Hero__copy about159Hero__copy">
            <div className="about159Cine" aria-hidden="true">
              <span className="about159Cine__beam about159Cine__beam--1" />
              <span className="about159Cine__beam about159Cine__beam--2" />
              <span className="about159Cine__line about159Cine__line--1" />
              <span className="about159Cine__line about159Cine__line--2" />
              <span className="about159Cine__glow" />
            </div>

            <div className="about158Eyebrow">
              <span>02</span>
              <i />
              <small>{content.eyebrow}</small>
            </div>

            <h1>
              İnsanı anlamak,
              <strong>değişime eşlik etmektir.</strong>
            </h1>

            <p className="about158Hero__lead">
              Sosyal hizmetin bütüncül bakışını aile danışmanlığıyla bir araya getiriyor;
              bireyin yaşam öyküsünü, ilişkilerini ve güçlü yönlerini birlikte değerlendiriyorum.
            </p>

            <div className="about158Hero__identity">
              <span>
                <small>{content.profileEyebrow}</small>
                <b>{content.profileName}</b>
                <em>{content.role}</em>
              </span>
              <i />
            </div>

            <div className="about158Hero__actions">
              <a href="#/randevu" className="about158Hero__primary">
                Ücretsiz Ön Görüşme <span>↗</span>
              </a>
              <a href="#about158Story" className="about158Hero__secondary">
                Hikâyemi Oku <span>↓</span>
              </a>
            </div>
          </div>

          <div className="about158PhotoWrap">
            <div className="about158Photo">
              <img
                loading="eager"
                decoding="async"
                fetchPriority="high"
                src={aboutPhoto}
                alt={`Sosyal Hizmet Uzmanı ve Aile Danışmanı ${content.profileName}`}
              />
              <div className="about158Photo__shade" />
              <div className="about158Photo__light" />
              <div className="about158Photo__caption about159Photo__captionMinimal">
                <em>01 / 03</em>
              </div>
            </div>

            <div className="about158PhotoMeta">
              <span>GÜVEN</span>
              <i />
              <span>ETİK</span>
              <i />
              <span>İNSAN ODAKLI</span>
            </div>
          </div>
        </div>
      </section>

      <section className="about158Story" id="about158Story">
        <div className="about158Story__intro">
          <span>{content.storyLabel}</span>
          <h2>Mesleki yolculuğum ve yaklaşımım.</h2>
          <p>
            Her danışanın yaşam öyküsü kendine özgüdür. Bu nedenle hazır kalıplar yerine
            kişinin ihtiyaçlarını, çevresini ve mevcut kaynaklarını birlikte değerlendiren
            bir çalışma anlayışını benimsiyorum.
          </p>
        </div>

        <div className="about158Story__layout">
          <aside className="about158Facts">
            <div className="about158Facts__item">
              <span>01</span>
              <div>
                <small>EĞİTİM</small>
                <b>İstanbul Aydın Üniversitesi</b>
                <p>Sağlık Bilimleri Fakültesi · Sosyal Hizmet</p>
              </div>
            </div>

            <div className="about158Facts__item">
              <span>02</span>
              <div>
                <small>DENEYİM</small>
                <b>Saha ve danışmanlık çalışmaları</b>
                <p>Gönüllü projeler, uygulamalı stajlar ve sosyal hizmet kurumları.</p>
              </div>
            </div>

            <div className="about158Facts__item">
              <span>03</span>
              <div>
                <small>YAKLAŞIM</small>
                <b>Bütüncül ve güç odaklı</b>
                <p>Birey, aile, sosyal çevre ve yaşam deneyimlerini birlikte ele alan yaklaşım.</p>
              </div>
            </div>
          </aside>

          <article className="about158Article">
            {paragraphs.map((paragraph, index) => (
              <p className={index === 0 ? "about158Article__lead" : ""} key={index}>
                {paragraph}
              </p>
            ))}

            <blockquote className="about158Quote">
              <span>“</span>
              <p>Her bireyin geçmişi, güçlü yönleri ve değişim kapasitesi vardır. Danışmanlık sürecindeki temel hedefim, bu potansiyelin ortaya çıkmasına eşlik etmektir.</p>
            </blockquote>
          </article>
        </div>
      </section>

      <section className="aboutCv">
        <div className="aboutCv__inner">
          <div className="aboutCv__copy">
            <span>MESLEKİ ÖZGEÇMİŞ</span>
            <h2>Sahadan öğrenen,<br /><em>gelişimi sürdüren</em> bir yolculuk.</h2>
            <p>{PROFESSIONAL_CV.summary[0]}</p>
            <div className="aboutCv__facts">
              <span><b>2016—</b><small>SOSYAL HİZMET YOLCULUĞU</small></span>
              <span><b>450</b><small>SAAT AİLE DANIŞMANLIĞI</small></span>
              <span><b>{ABOUT_CERTIFICATES.length}+</b><small>EĞİTİM & KATILIM</small></span>
            </div>
          </div>
          <div className="aboutCv__side">
            <span className="aboutCv__sideNo" aria-hidden="true">CV</span>
            <div className="aboutCv__role"><small>GÜNCEL GÖREV</small><b>Sosyal Hizmet Uzmanı</b><p>Kırşehir Belediyesi · 2023 —</p></div>
            <button type="button" onClick={openCvArchive}><span><small>TÜM DENEYİM & EĞİTİMLER</small><b>Özgeçmişi İncele</b></span><i>↗</i></button>
          </div>
        </div>
      </section>

      <section className="aboutCerts" id="sertifikalar">
        <div className="aboutCerts__topline" aria-hidden="true">
          <span />
          <small>MESLEKİ GELİŞİM ARŞİVİ</small>
          <span />
        </div>

        <div className="aboutCerts__head">
          <div>
            <span>02 / EĞİTİMLER & SERTİFİKALAR</span>
            <h2>Öğrenmeye devam eden,<br /><em>gelişimi önemseyen</em> bir yaklaşım.</h2>
          </div>
          <p>
            Mesleki uygulamayı güncel bilgi, etik ilkeler ve farklı uzmanlık eğitimleriyle sürekli besliyorum.
            Aşağıda eğitim ve katılım belgelerimin seçili arşivini inceleyebilirsiniz.
          </p>
        </div>

        <div className="aboutCerts__metrics">
          <div><strong>{ABOUT_CERTIFICATES.length}</strong><span>SERTİFİKA & KATILIM</span></div>
          <div><strong>450</strong><span>SAAT AİLE DANIŞMANLIĞI</span></div>
          <div><strong>2015—26</strong><span>SÜREKLİ MESLEKİ GELİŞİM</span></div>
        </div>

        <div className="aboutCerts__featured">
          {featuredCertificates.map((certificate, index) => (
            <button
              type="button"
              className={`aboutCerts__feature aboutCerts__feature--${index + 1}`}
              key={certificate.file}
              onClick={() => setActiveCertificate(certificate)}
              aria-label={`${certificate.title} belgesini görüntüle`}
            >
              <img src={certificateImage(certificate.file)} alt="" loading={index === 0 ? "eager" : "lazy"} decoding="async" />
              <span className="aboutCerts__featureShade" />
              <span className="aboutCerts__featureInfo">
                <small>{certificate.category}</small>
                <b>{certificate.title}</b>
                <em>{certificate.issuer} · {certificate.year}</em>
              </span>
              <span className="aboutCerts__open">BELGEYİ İNCELE <i>↗</i></span>
            </button>
          ))}
        </div>

        <button type="button" className="aboutCerts__archiveTrigger" onClick={openCertificateArchive}>
          <span><small>TÜM EĞİTİMLER & KATILIM BELGELERİ</small><b>{ABOUT_CERTIFICATES.length} belgelik sertifika arşivini inceleyin.</b></span>
          <i>ARŞİVİ AÇ <em>↗</em></i>
        </button>
      </section>

      <section className="about158Principles">
        <div className="about158Principles__head">
          <span>ÇALIŞMA PRENSİPLERİ</span>
          <h2>Profesyonel ilişkinin temelinde güven vardır.</h2>
        </div>

        <div className="about158Principles__grid">
          <article>
            <span>01</span>
            <Icon name="shield" size={22} />
            <h3>{content.profileItem1}</h3>
            <p>Mesleki sınırlar, saygı ve profesyonel sorumluluk çerçevesinde ilerleyen süreç.</p>
          </article>
          <article>
            <span>02</span>
            <Icon name="lock" size={22} />
            <h3>{content.profileItem2}</h3>
            <p>Görüşmelerde mahremiyeti ve etik ilkeleri merkeze alan güvenli çalışma alanı.</p>
          </article>
          <article>
            <span>03</span>
            <Icon name="heart" size={22} />
            <h3>{content.profileItem3}</h3>
            <p>Kişinin yaşam öyküsüne, ihtiyaçlarına ve güçlü yönlerine göre şekillenen destek.</p>
          </article>
        </div>
      </section>

      <section className="about158Cta">
        <div>
          <span>İLK ADIM</span>
          <h2>Tanışmak ve süreci birlikte değerlendirmek için.</h2>
          <p>İlk görüşmede ihtiyaçlarınızı ve size uygun çalışma biçimini birlikte değerlendirebiliriz.</p>
        </div>
        <a href="#/randevu">
          <span>Ücretsiz Ön Görüşme</span>
          <i>↗</i>
        </a>
      </section>

      {activeCertificate && createPortal((
        <div ref={certificateModalRef} className="aboutCertsModal" role="dialog" aria-modal="true" aria-label={`${activeCertificate.title} belgesi`} onClick={() => setActiveCertificate(null)}>
          <div className="aboutCertsModal__panel" data-about-overlay-panel onClick={(event) => event.stopPropagation()}>
            <button type="button" className="aboutCertsModal__close" onClick={() => setActiveCertificate(null)} aria-label="Belgeyi kapat">×</button>
            <div className="aboutCertsModal__image"><img src={certificateImage(activeCertificate.file)} alt={activeCertificate.title} /></div>
            <div className="aboutCertsModal__meta">
              <span>{activeCertificate.category}</span>
              <h3>{activeCertificate.title}</h3>
              <p>{activeCertificate.issuer} · {activeCertificate.year}</p>
              <small>Belge görselini kapatmak için dış alana tıklayabilirsiniz.</small>
            </div>
          </div>
        </div>
      ), document.body)}

      {certificateArchiveOpen && createPortal((
        <div ref={certificateArchiveRef} className="aboutCertsArchive" role="dialog" aria-modal="true" aria-label="Tüm sertifikalar" onClick={() => setCertificateArchiveOpen(false)}>
          <section className="aboutCertsArchive__panel" data-about-overlay-panel onClick={(event) => event.stopPropagation()}>
            <header className="aboutCertsArchive__head">
              <div><span>MESLEKİ GELİŞİM ARŞİVİ</span><h2>Tüm eğitimler<br /><em>ve sertifikalar.</em></h2></div>
              <button type="button" onClick={() => setCertificateArchiveOpen(false)} aria-label="Sertifika arşivini kapat">KAPAT <i>×</i></button>
            </header>
            <p className="aboutCertsArchive__intro">Belgeyi büyük ve okunur biçimde incelemek için seçiniz.</p>
            <div className="aboutCertsArchive__grid">
              {ABOUT_CERTIFICATES.map((certificate, index) => (
                <button type="button" className="aboutCertsArchive__card" key={certificate.file} onClick={() => setActiveCertificate(certificate)} aria-label={`${certificate.title} belgesini görüntüle`}>
                  <span className="aboutCertsArchive__thumb"><img src={certificateImage(certificate.file)} alt="" loading="lazy" decoding="async" /><i>+</i></span>
                  <span><em>{String(index + 1).padStart(2, "0")}</em><small>{certificate.category}</small></span>
                  <b>{certificate.title}</b>
                  <p>{certificate.issuer} <i>·</i> {certificate.year}</p>
                </button>
              ))}
            </div>
          </section>
        </div>
      ), document.body)}

      {cvOpen && createPortal((
        <div ref={cvArchiveRef} className="aboutCvArchive" role="dialog" aria-modal="true" aria-label="Mesleki özgeçmiş" onClick={() => setCvOpen(false)}>
          <section className="aboutCvArchive__panel" data-about-overlay-panel onClick={(event) => event.stopPropagation()}>
            <header className="aboutCvArchive__head">
              <div><span>MESLEKİ ÖZGEÇMİŞ</span><h2>Deneyim, eğitim<br /><em>ve sürekli gelişim.</em></h2></div>
              <button type="button" onClick={() => setCvOpen(false)} aria-label="Özgeçmişi kapat">KAPAT <i>×</i></button>
            </header>
            <section className="aboutCvArchive__summary"><span>01 / MESLEKİ PROFİL</span>{PROFESSIONAL_CV.summary.map((item, index) => <p key={index}>{item}</p>)}</section>
            <section className="aboutCvArchive__section"><span>02 / İŞ DENEYİMİ</span><div className="aboutCvArchive__timeline">{PROFESSIONAL_CV.experience.map((item) => <article key={item.title}><em>{item.year}</em><div><h3>{item.title}</h3><b>{item.place}</b><p>{item.text}</p></div></article>)}</div></section>
            <section className="aboutCvArchive__split"><div><span>03 / EĞİTİM</span><h3>{PROFESSIONAL_CV.education.title}</h3><b>{PROFESSIONAL_CV.education.place}</b><p>{PROFESSIONAL_CV.education.date}</p></div><div><span>04 / ÜNİVERSİTE FAALİYETLERİ</span><ul>{PROFESSIONAL_CV.activities.map((item) => <li key={item}>{item}</li>)}</ul><small>Türkçe · Anadili</small></div></section>
            <section className="aboutCvArchive__section"><span>05 / SERTİFİKA, SEMİNER & KURSLAR</span><div className="aboutCvArchive__trainingGrid">{PROFESSIONAL_CV.trainings.map((item, index) => <article key={item}><b>{String(index + 1).padStart(2, "0")}</b><p>{item}</p></article>)}</div><button type="button" className="aboutCvArchive__certLink" onClick={() => { setCvOpen(false); setCertificateArchiveOpen(true); }}>Belgelerin görsel arşivini aç <i>↗</i></button></section>
            <section className="aboutCvArchive__split aboutCvArchive__split--final"><div><span>06 / STAJ & BECERİLER</span><ul>{PROFESSIONAL_CV.skills.map((item) => <li key={item}>{item}</li>)}</ul></div><div><span>07 / İLGİ ALANLARI</span><ul>{PROFESSIONAL_CV.interests.map((item) => <li key={item}>{item}</li>)}</ul><nav>{PROFESSIONAL_CV.links.map((item) => <a key={item.label} href={item.href} target="_blank" rel="noreferrer"><small>{item.label}</small><b>{item.value} ↗</b></a>)}</nav></div></section>
          </section>
        </div>
      ), document.body)}
    </main>
  );
}



export default App;

