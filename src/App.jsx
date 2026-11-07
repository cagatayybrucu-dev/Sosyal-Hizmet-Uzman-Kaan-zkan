import { useCallback, useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { supabase } from "./supabase";
import heroImage from "./assets/home-light-cinema-hero-v1.png";
import journalImage from "./assets/blog-cinema-03-journal.png";
import readingImage from "./assets/blog-cinema-01-reading-room.png";
import galleryImage from "./assets/blog-cinema-04-gallery.png";
import editorialImage from "./assets/blog-editorial-sunlit-v1.png";
import portraitImage from "./assets/kaan-about.jpg";

const TOPICS = ["Gündelik Hayat", "Toplum", "Dayanışma", "Gençlik", "Kültür", "Haftanın Sorusu"];
const ARTICLE_IMAGES = [readingImage, journalImage, galleryImage, editorialImage];
const BLOCKED_TITLES = ["aile danışman", "çift danışman", "evlilik danışman", "randevu", "boşanma danışman"];
const SAMPLE_POSTS = [
  { id: "s1", author_name: "Meydan Editörü", author_username: "meydan", topic: "Haftanın Sorusu", content: "Bazen bir toplumu anlamanın en iyi yolu büyük cümlelerden değil, insanların gündelik hayatta birbirine nasıl davrandığından geçer. Sizce son yıllarda en çok ne değişti?", created_at: new Date().toISOString(), likes: 18, comments: 4, is_featured: true },
  { id: "s2", author_name: "Meydan Editörü", author_username: "meydan", topic: "Dayanışma", content: "Dayanışma yalnızca zor zamanda yardım etmek değildir. Birini gerçekten dinlemek, görünmeyen emeği fark etmek ve küçük bir iyiliği alışkanlığa dönüştürmektir.", created_at: new Date(Date.now() - 86400000).toISOString(), likes: 12, comments: 2 },
  { id: "s3", author_name: "Meydan Editörü", author_username: "meydan", topic: "Meydan Kültürü", content: "Bu alan kusursuz cevaplar için değil; düşünmek, karşılaşmak ve birbirimizi daha iyi anlamak için var. Saygılı, açık ve insana yakışır bir dil hepimizin ortak sorumluluğu.", created_at: new Date(Date.now() - 172800000).toISOString(), likes: 9, comments: 1 },
];

const fallbackArticles = [
  { id: "f1", slug: "dayanisma-kucuk-bir-fiil", title: "Dayanışma: Büyük Bir Kavram, Küçük Bir Fiil", excerpt: "Birlikte yaşamanın gündelik ayrıntıları üzerine kısa bir düşünce.", category: "Toplum", authorName: "Kaan Özkan", authorRole: "Sosyal Hizmet Uzmanı", publishedAt: "2026-10-01", image: readingImage },
  { id: "f2", slug: "kentte-gorunmeyen-baglar", title: "Kentte Görünmeyen Bağlar", excerpt: "Bir sokağı mahalleye, kalabalığı topluma dönüştüren bağlara yakından bakış.", category: "Gündelik Hayat", authorName: "Kaan Özkan", authorRole: "Sosyal Hizmet Uzmanı", publishedAt: "2026-09-18", image: journalImage },
  { id: "f3", slug: "insani-dinlemek", title: "İnsanı Gerçekten Dinlemek", excerpt: "Cevap vermek için değil, anlamak için dinlemenin toplumsal değeri.", category: "İnsan Hikâyeleri", authorName: "Kaan Özkan", authorRole: "Sosyal Hizmet Uzmanı", publishedAt: "2026-08-24", image: galleryImage },
];

const cleanRole = (value = "") => String(value).replace(/\s*[&·,-]?\s*(Aile|Evlilik ve İlişki|Çift) Danışmanı/gi, "").replace(/\s{2,}/g, " ").replace(/^[&·,-]+|[&·,-]+$/g, "").trim() || "Yazar";
const slugify = (value = "") => String(value).toLocaleLowerCase("tr-TR").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ı/g, "i").replace(/ğ/g, "g").replace(/ş/g, "s").replace(/ç/g, "c").replace(/ö/g, "o").replace(/ü/g, "u").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const formatDate = (value) => new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric" }).format(value ? new Date(value) : new Date());
const path = () => (window.location.hash.slice(1) || "/").split("?")[0];
const go = (to) => { window.location.hash = to; };

function useRoute() {
  const [route, setRoute] = useState(path());
  useEffect(() => {
    const update = () => { setRoute(path()); window.scrollTo({ top: 0, behavior: "auto" }); };
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);
  return route;
}

function App() {
  const route = useRoute();
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [articles, setArticles] = useState(fallbackArticles);
  const [authors, setAuthors] = useState([]);
  const [posts, setPosts] = useState(SAMPLE_POSTS);
  const [communityReady, setCommunityReady] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [intro, setIntro] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const loadProfile = useCallback(async (user) => {
    if (!user) return setProfile(null);
    const { data } = await supabase.from("community_profiles").select("*").eq("id", user.id).maybeSingle();
    setProfile(data || null);
  }, []);

  const loadCommunity = useCallback(async () => {
    const { data, error } = await supabase.from("community_posts").select("*").eq("status", "published").order("is_featured", { ascending: false }).order("created_at", { ascending: false });
    if (error) { setCommunityReady(false); return; }
    const ids = (data || []).map((item) => item.id);
    let likes = [], comments = [];
    if (ids.length) {
      const [likeResult, commentResult] = await Promise.all([
        supabase.from("community_likes").select("post_id,user_id").in("post_id", ids),
        supabase.from("community_comments").select("id,post_id").in("post_id", ids).eq("status", "published"),
      ]);
      likes = likeResult.data || []; comments = commentResult.data || [];
    }
    setPosts((data || []).map((item) => ({ ...item, likes: likes.filter((x) => x.post_id === item.id).length, comments: comments.filter((x) => x.post_id === item.id).length, liked: likes.some((x) => x.post_id === item.id && x.user_id === session?.user?.id) })));
    setCommunityReady(true);
  }, [session?.user?.id]);

  useEffect(() => {
    const timer = window.setTimeout(() => setIntro(false), 1500);
    supabase.auth.getSession().then(({ data }) => setSession(data.session || null));
    const { data: auth } = supabase.auth.onAuthStateChange((_event, next) => setSession(next));
    return () => { window.clearTimeout(timer); auth.subscription.unsubscribe(); };
  }, []);

  useEffect(() => {
    Promise.resolve().then(() => Promise.all([loadProfile(session?.user), loadCommunity()]));
  }, [session?.user, loadProfile, loadCommunity]);

  useEffect(() => {
    supabase.from("site_content").select("content").eq("id", "blog").maybeSingle().then(({ data }) => {
      const content = data?.content;
      if (!content) return;
      const nextArticles = (Array.isArray(content.posts) ? content.posts : [])
        .filter((post) => post.status !== "draft" && !BLOCKED_TITLES.some((term) => String(post.title || "").toLocaleLowerCase("tr-TR").includes(term)))
        .map((post, index) => ({ ...post, id: post.id || post.slug || index, slug: slugify(post.slug || post.title), excerpt: post.excerpt || post.summary || "İnsan, toplum ve yaşama dair editoryal bir okuma.", category: post.category || "Toplum", authorName: post.authorName || post.author || "Kaan Özkan", authorRole: cleanRole(post.authorRole), publishedAt: post.publishedAt || post.date, image: post.image || post.coverImage || ARTICLE_IMAGES[index % ARTICLE_IMAGES.length] }));
      if (nextArticles.length) setArticles(nextArticles);
      setAuthors((Array.isArray(content.authors) ? content.authors : []).map((author) => ({ ...author, role: cleanRole(author.role) })));
    });
  }, []);

  const page = route === "/" ? <Home articles={articles} posts={posts} authors={authors} />
    : route === "/dergi" ? <Editorial articles={articles} />
    : route.startsWith("/dergi/") ? <Article article={articles.find((item) => item.slug === route.split("/")[2])} articles={articles} />
    : route === "/meydan" ? <Community posts={posts} ready={communityReady} session={session} onAuth={() => setAuthOpen(true)} onReload={loadCommunity} />
    : route === "/yazarlar" ? <Authors authors={authors} articles={articles} />
    : route === "/hakkimda" ? <About />
    : route === "/profil" ? <Profile key={profile?.updated_at || profile?.id || "profile"} session={session} profile={profile} onAuth={() => setAuthOpen(true)} onProfile={() => loadProfile(session?.user)} />
    : route === "/yonetim" ? <Admin profile={profile} onReload={loadCommunity} />
    : <NotFound />;

  return <div className="siteApp">
    {intro && <div className="cinematicIntro"><span>KAAN ÖZKAN</span><i /><strong>İNSAN · TOPLUM · YAŞAM</strong></div>}
    <Header session={session} profile={profile} menuOpen={menuOpen} setMenuOpen={setMenuOpen} onAuth={() => setAuthOpen(true)} />
    <main className="pageTransition" key={route}>{page}</main>
    <Footer />
    {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    <Analytics />
  </div>;
}

function Header({ session, profile, menuOpen, setMenuOpen, onAuth }) {
  const closeMenu = () => setMenuOpen(false);
  return <header className="siteHeader">
    <button className="brand" onClick={() => go("/")}><b>KO</b><span>Kaan Özkan<small>İnsan · Toplum · Yaşam</small></span></button>
    <button className="navToggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menüyü aç">{menuOpen ? "KAPAT" : "MENÜ"}</button>
    <nav className={menuOpen ? "siteNav isOpen" : "siteNav"}>
      <a href="#/dergi" onClick={closeMenu}>Dergi</a><a href="#/meydan" onClick={closeMenu}>Meydan</a><a href="#/yazarlar" onClick={closeMenu}>Yazarlar</a><a href="#/hakkimda" onClick={closeMenu}>Hakkımda</a>
      {session ? <a className="profileChip" href="#/profil" onClick={closeMenu}>{profile?.display_name || "Profilim"}</a> : <button className="headerJoin" onClick={() => { closeMenu(); onAuth(); }}>Aramıza katıl</button>}
    </nav>
  </header>;
}

function Home({ articles, posts, authors }) {
  const featured = articles[0];
  return <div className="page homePage">
    <section className="homeHero">
      <img src={heroImage} alt="Işık alan editoryal çalışma odası" />
      <div className="homeHeroShade" />
      <div className="homeHeroCopy reveal"><span className="eyebrow">BAĞIMSIZ DİJİTAL DERGİ & TOPLULUK</span><h1>İnsanı anlamak,<br /><em>toplumu okumak.</em></h1><p>Gündelik hayatın içinden düşünceler, araştırmalar ve gerçek insan hikâyeleri için sakin bir buluşma alanı.</p><div><button className="button buttonLight" onClick={() => go("/dergi")}>Dergiyi keşfet <b>↗</b></button><button className="textButton" onClick={() => go("/meydan")}>Meydana katıl →</button></div></div>
      <div className="heroIndex"><b>01</b><span /><small>Düşünce<br />Hikâye<br />Topluluk</small></div>
    </section>
    <div className="movingLine"><span>İNSAN HİKÂYELERİ · TOPLUM · SOSYAL HİZMET · KÜLTÜR · GÜNDELİK HAYAT · </span><span>İNSAN HİKÂYELERİ · TOPLUM · SOSYAL HİZMET · KÜLTÜR · GÜNDELİK HAYAT · </span></div>
    <section className="sectionPad homeStatement"><span className="sectionNo">01 — NİYET</span><div><h2>Hızlı hükümlerin değil,<br /><em>derinlikli karşılaşmaların</em> peşindeyiz.</h2><p>Bu site bir hizmet vitrini değil. Okumak, yazmak, soru sormak ve başkasının hikâyesine dikkatle yaklaşmak için kurulmuş bağımsız bir yayın alanı.</p></div></section>
    {featured && <section className="homeFeature sectionPad"><SectionHeading no="02" kicker="DERGİDEN" title="Öne çıkan okuma" link="/dergi" /><div className="featureGrid"><button className="featureImage" onClick={() => go(`/dergi/${featured.slug}`)}><img src={featured.image} alt="" /><span>OKUMAYA BAŞLA ↗</span></button><div className="featureCopy"><span>{featured.category}</span><h2>{featured.title}</h2><p>{featured.excerpt}</p><small>{featured.authorName} · {formatDate(featured.publishedAt)}</small><button className="arrowButton" onClick={() => go(`/dergi/${featured.slug}`)}>Yazıyı oku <b>→</b></button></div></div><div className="editorialGrid">{articles.slice(1, 4).map((article, index) => <ArticleCard key={article.id} article={article} index={index + 2} />)}</div></section>}
    <section className="homeCommunity sectionPad"><SectionHeading no="03" kicker="MEYDAN" title="Söz, topluluğun" link="/meydan" /><div className="communityPreview"><div className="communityIntro"><h3>Bir cümle bazen<br />yeni bir pencere açar.</h3><p>Düşünceni paylaş, başkalarının deneyimlerine kulak ver, beğen ve konuşmaya katıl.</p><button className="button buttonDark" onClick={() => go("/meydan")}>Meydana gir →</button></div><div>{posts.slice(0, 3).map((post) => <CommunityCard key={post.id} post={post} compact />)}</div></div></section>
    <section className="homeAuthors sectionPad"><SectionHeading no="04" kicker="YAZARLAR" title="Farklı sesler, ortak merak" link="/yazarlar" /><div className="authorStrip">{(authors.length ? authors : [{ name: "Kaan Özkan", role: "Sosyal Hizmet Uzmanı", image: portraitImage }, { name: "Bilge Akar", role: "Sosyal Hizmet Uzmanı & Araştırmacı" }, { name: "Ceren Kaplan", role: "Sosyal Hizmet Uzmanı" }]).slice(0, 4).map((author, index) => <div className="authorMini" key={author.slug || author.name}><span>{String(index + 1).padStart(2, "0")}</span>{author.image ? <img src={author.image} alt={author.name} /> : <i>{author.name?.[0]}</i>}<h3>{author.name}</h3><p>{author.role}</p></div>)}</div></section>
    <section className="homeAbout"><img src={portraitImage} alt="Kaan Özkan" /><div><span className="eyebrow">EDİTÖDEN</span><h2>İyi bir metin,<br /><em>insanın yanında durur.</em></h2><p>Bu alanı sosyal hizmetin insana ve topluma dikkatle bakma disiplininden beslenen; ama herkesin söz söyleyebildiği bağımsız bir yayın olarak tasarladım.</p><button className="arrowButton arrowButtonLight" onClick={() => go("/hakkimda")}>Hikâyeyi oku <b>→</b></button></div></section>
  </div>;
}

function SectionHeading({ no, kicker, title, link }) { return <div className="sectionHeading"><span>{no} — {kicker}</span><h2>{title}</h2>{link && <button onClick={() => go(link)}>Tümünü gör ↗</button>}</div>; }
function ArticleCard({ article, index }) { return <article className="editorialCard" onClick={() => go(`/dergi/${article.slug}`)}><div><img src={article.image} alt="" /><span>{String(index).padStart(2, "0")}</span></div><small>{article.category}</small><h3>{article.title}</h3><p>{article.excerpt}</p><footer>{article.authorName}<b>↗</b></footer></article>; }

function Editorial({ articles }) {
  const [query, setQuery] = useState(""); const [category, setCategory] = useState("Tümü");
  const categories = ["Tümü", ...new Set(articles.map((x) => x.category).filter(Boolean))];
  const filtered = articles.filter((x) => (category === "Tümü" || x.category === category) && `${x.title} ${x.excerpt}`.toLocaleLowerCase("tr-TR").includes(query.toLocaleLowerCase("tr-TR")));
  return <div className="page editorialPage"><section className="simpleHero editorialHero"><span className="eyebrow">DİJİTAL DERGİ</span><h1>Yavaş oku.<br /><em>Derin düşün.</em></h1><p>İnsan, toplum, kültür ve gündelik hayata farklı pencerelerden bakan uzun okumalar.</p></section><section className="archive sectionPad"><div className="archiveTools"><div className="filterRow">{categories.slice(0, 7).map((item) => <button className={category === item ? "active" : ""} onClick={() => setCategory(item)} key={item}>{item}</button>)}</div><label>⌕<input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Yazılarda ara" /></label></div><div className="editorialGrid editorialGridWide">{filtered.map((article, index) => <ArticleCard key={article.id} article={article} index={index + 1} />)}</div>{!filtered.length && <div className="emptyState">Aramana uygun bir yazı bulunamadı.</div>}</section></div>;
}

function Article({ article, articles }) {
  if (!article) return <NotFound />;
  const body = Array.isArray(article.body) ? article.body : Array.isArray(article.content) ? article.content : [];
  return <div className="page articlePage"><article><header className="articleHero"><div><span>{article.category} · {formatDate(article.publishedAt)}</span><h1>{article.title}</h1><p>{article.excerpt}</p><small>{article.authorName} — {cleanRole(article.authorRole)}</small></div><img src={article.image} alt="" /></header><div className="articleBody"><aside><span>PAYLAŞ</span><a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(location.href)}`} target="_blank" rel="noreferrer">in</a><button onClick={() => navigator.clipboard?.writeText(location.href)}>⛓</button></aside><div className="prose"><p className="lead">{article.excerpt}</p>{body.length ? body.map((block, index) => <ArticleBlock key={index} block={block} />) : <><p>Bu yazı, gündelik hayatın içinde çoğu zaman gözden kaçan ayrıntılara biraz daha yakından bakmak için bir davet.</p><p>Birlikte yaşamanın imkânı; birbirimizi aynılaştırmakta değil, farklı deneyimlere dikkatle yaklaşabilmekte saklı. Anlamaya ayrılan zaman, toplumsal bağların en sessiz ama en güçlü yapıtaşlarından biridir.</p></>}<div className="articleNotice">Bu içerik bilgilendirme ve düşünce paylaşımı amacı taşır; sağlık hizmeti ya da kişisel danışmanlık yerine geçmez.</div></div></div></article><section className="related sectionPad"><SectionHeading no="—" kicker="DEVAM ET" title="Başka okumalar" /><div className="editorialGrid">{articles.filter((x) => x.id !== article.id).slice(0, 3).map((item, i) => <ArticleCard key={item.id} article={item} index={i + 1} />)}</div></section></div>;
}

function ArticleBlock({ block }) {
  if (typeof block === "string") return <p>{block}</p>;
  if (["heading", "subheading"].includes(block.type)) return <h2>{block.text}</h2>;
  if (block.type === "quote") return <blockquote>{block.text}</blockquote>;
  if (block.type === "image" && block.url) return <figure><img src={block.url} alt={block.alt || ""} /><figcaption>{block.caption}</figcaption></figure>;
  if (block.type === "list" && Array.isArray(block.items)) return <ul>{block.items.map((x) => <li key={x}>{x}</li>)}</ul>;
  if (block.type === "references" && Array.isArray(block.items)) return <><h2>Kaynakça</h2><ol>{block.items.map((x, i) => <li key={i}>{x}</li>)}</ol></>;
  return block.text ? <p>{block.text}</p> : null;
}

function Community({ posts, ready, session, onAuth, onReload }) {
  const [content, setContent] = useState(""); const [topic, setTopic] = useState(TOPICS[0]); const [filter, setFilter] = useState("Tümü"); const [busy, setBusy] = useState(false); const [message, setMessage] = useState(""); const [selected, setSelected] = useState(null);
  const visible = filter === "Tümü" ? posts : posts.filter((x) => x.topic === filter);
  const publish = async (event) => {
    event.preventDefault(); if (!session) return onAuth();
    if (content.trim().length < 20) return setMessage("En az 20 karakterlik bir düşünce paylaşmalısın.");
    setBusy(true); const { data, error } = await supabase.from("community_posts").insert({ user_id: session.user.id, content: content.trim(), topic }).select("status").single(); setBusy(false);
    if (error) return setMessage(error.message);
    setContent(""); setMessage(data.status === "pending" ? "İlk paylaşımın kısa bir editör kontrolinden sonra yayınlanacak." : "Paylaşımın Meydan'da yayında."); onReload();
  };
  const like = async (post) => {
    if (!session) return onAuth();
    if (post.liked) await supabase.from("community_likes").delete().eq("post_id", post.id).eq("user_id", session.user.id);
    else await supabase.from("community_likes").insert({ post_id: post.id, user_id: session.user.id });
    onReload();
  };
  return <div className="page communityPage"><section className="communityHero"><div><span className="eyebrow">TOPLULUK ALANI</span><h1>Söz senin.<br /><em>Meydan hepimizin.</em></h1><p>Düşünceni paylaş. Bir başkasının hikâyesine kulak ver. Saygılı, meraklı ve açık bir topluluğun parçası ol.</p></div><div className="communityManifest"><span>MEYDAN KÜLTÜRÜ</span><p>İnsana saygı.</p><p>Fikre açıklık.</p><p>Nefret diline sıfır tolerans.</p></div></section><section className="communityLayout sectionPad"><div className="communityFeed"><form className="composer" onSubmit={publish}><div className="composerTop"><i>{session ? (session.user.email?.[0] || "Ü").toUpperCase() : "?"}</i><textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder={session ? "Bugün ne üzerine düşünüyorsun?" : "Paylaşmak için aramıza katıl..."} maxLength={1500} onFocus={() => !session && onAuth()} /></div><div className="composerBottom"><select value={topic} onChange={(e) => setTopic(e.target.value)}>{TOPICS.map((x) => <option key={x}>{x}</option>)}</select><span>{content.length}/1500</span><button disabled={busy}>{busy ? "Yayınlanıyor..." : "Paylaş →"}</button></div>{message && <p className="formMessage">{message}</p>}</form><div className="feedFilters">{["Tümü", ...TOPICS].map((x) => <button className={x === filter ? "active" : ""} key={x} onClick={() => setFilter(x)}>{x}</button>)}</div><div className="communityList">{visible.map((post) => <CommunityCard key={post.id} post={post} onLike={() => like(post)} onComments={() => setSelected(post)} />)}</div>{!ready && <p className="demoNotice">Topluluk altyapısı hazırlanırken örnek Meydan paylaşımları gösteriliyor.</p>}</div><aside className="communityRail"><span>BU HAFTA</span><h3>“Bir kenti yaşanır yapan en küçük şey nedir?”</h3><p>Haftanın sorusuna kendi deneyiminden bir cevap bırak.</p><button onClick={() => document.querySelector(".composer textarea")?.focus()}>Cevabını paylaş ↗</button><div><b>{posts.length}</b><small>meydan paylaşımı</small></div></aside></section>{selected && <CommentsDrawer post={selected} session={session} onAuth={onAuth} onClose={() => setSelected(null)} onReload={onReload} />}</div>;
}

function CommunityCard({ post, compact, onLike, onComments }) {
  return <article className={`communityCard ${post.is_featured ? "featured" : ""}`}><header><i>{post.author_name?.[0] || "M"}</i><div><b>{post.author_name}</b><small>@{post.author_username || "meydan"} · {formatDate(post.created_at)}</small></div>{post.is_featured && <span>ÖNE ÇIKAN</span>}</header><em>{post.topic}</em><p>{post.content}</p><footer><button onClick={onLike} className={post.liked ? "liked" : ""}>♡ {post.likes || 0}</button><button onClick={onComments}>○ {post.comments || 0}</button>{!compact && <button onClick={() => navigator.clipboard?.writeText(location.origin + "/#/meydan")}>↗ Paylaş</button>}</footer></article>;
}

function CommentsDrawer({ post, session, onAuth, onClose, onReload }) {
  const [comments, setComments] = useState([]); const [content, setContent] = useState(""); const [message, setMessage] = useState("");
  useEffect(() => { supabase.from("community_comments").select("id,content,created_at,user_id,community_profiles(display_name,username)").eq("post_id", post.id).eq("status", "published").order("created_at").then(({ data }) => setComments(data || [])); }, [post.id]);
  const submit = async (e) => { e.preventDefault(); if (!session) return onAuth(); if (content.trim().length < 2) return; const { error } = await supabase.from("community_comments").insert({ post_id: post.id, user_id: session.user.id, content: content.trim() }); if (error) return setMessage(error.message); setContent(""); const { data } = await supabase.from("community_comments").select("id,content,created_at,user_id,community_profiles(display_name,username)").eq("post_id", post.id).eq("status", "published").order("created_at"); setComments(data || []); onReload(); };
  const report = async () => { if (!session) return onAuth(); const reason = window.prompt("Bu paylaşımı neden bildirmek istiyorsun?"); if (!reason) return; const { error } = await supabase.from("community_reports").insert({ post_id: post.id, user_id: session.user.id, reason }); setMessage(error ? error.message : "Bildirimin editöre ulaştı."); };
  return <div className="drawerBackdrop" onClick={onClose}><aside className="commentsDrawer" onClick={(e) => e.stopPropagation()}><header><span>YORUMLAR</span><button onClick={onClose}>KAPAT ×</button></header><CommunityCard post={post} compact /><div className="comments">{comments.map((comment) => <article key={comment.id}><b>{comment.community_profiles?.display_name || "Üye"}</b><small>{formatDate(comment.created_at)}</small><p>{comment.content}</p></article>)}{!comments.length && <p>İlk yorumu sen bırak.</p>}</div><form onSubmit={submit}><textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Saygılı bir yorum yaz..." maxLength={500} /><button>Yorumla →</button></form><button className="reportButton" onClick={report}>Bu paylaşımı bildir</button>{message && <p className="formMessage">{message}</p>}</aside></div>;
}

function Authors({ authors, articles }) {
  const list = authors.length ? authors : [{ name: "Kaan Özkan", role: "Sosyal Hizmet Uzmanı", bio: "İnsan, toplum ve gündelik hayat üzerine yazıyor.", image: portraitImage }];
  return <div className="page authorsPage"><section className="simpleHero"><span className="eyebrow">YAZARLAR</span><h1>Her metin,<br /><em>başka bir pencere.</em></h1><p>Farklı disiplinlerden, ortak bir merakla yazan isimler.</p></section><section className="authorsGrid sectionPad">{list.map((author, index) => <article className="authorCard" key={author.slug || author.name}><span>{String(index + 1).padStart(2, "0")}</span>{author.image ? <img src={author.image} alt={author.name} /> : <i>{author.name?.[0]}</i>}<h2>{author.name}</h2><small>{cleanRole(author.role)}</small><p>{author.bio || "İnsan, toplum ve yaşam üzerine düşüncelerini paylaşıyor."}</p><b>{articles.filter((x) => x.authorName === author.name).length} YAZI</b></article>)}</section></div>;
}

function About() { return <div className="page aboutPage"><section className="aboutHero"><div><span className="eyebrow">HAKKIMDA</span><h1>Merakla bakmak.<br /><em>Dikkatle yazmak.</em></h1><p>Kaan Özkan — sosyal hizmet uzmanı, editör ve bu bağımsız yayın alanının kurucusu.</p></div><img src={portraitImage} alt="Kaan Özkan" /></section><section className="aboutStory sectionPad"><span>01 — HİKÂYE</span><div><h2>Bu site artık bir hizmet vitrini değil; <em>bir karşılaşma alanı.</em></h2><p>Sosyal hizmet eğitimi, insana yalnızca bireysel hikâyesiyle değil; içinde yaşadığı çevre, koşullar ve ilişkiler ağıyla birlikte bakmayı öğretir. Buradaki yayın çizgisi de tam olarak bu bakıştan besleniyor.</p><p>Dergide araştırma temelli yazılar ve insan hikâyeleri; Meydan'da ise ziyaretçilerin kendi sözü var. Amaç kesin cevaplar dağıtmak değil, daha iyi sorular sorabileceğimiz sakin ve özenli bir alan açmak.</p></div></section><section className="aboutValues sectionPad"><article><b>01</b><h3>İnsana saygı</h3><p>Her hikâyeyi kendi bağlamı ve biricikliği içinde ele almak.</p></article><article><b>02</b><h3>Editoryal özen</h3><p>Bilgiyi anlaşılır, kaynaklı ve sorumlu bir dille paylaşmak.</p></article><article><b>03</b><h3>Açık meydan</h3><p>Farklı seslerin güvenli ve saygılı biçimde karşılaşmasını sağlamak.</p></article></section><section className="aboutDisclaimer"><span>ÖNEMLİ NOT</span><p>Bu platform herhangi bir terapi, aile danışmanlığı, tanı, tedavi veya randevu hizmeti sunmaz. Yayınlanan içerikler genel bilgilendirme ve düşünce paylaşımı amaçlıdır.</p></section></div>; }

function Profile({ session, profile, onAuth, onProfile }) {
  const [name, setName] = useState(profile?.display_name || ""); const [bio, setBio] = useState(profile?.bio || ""); const [message, setMessage] = useState("");
  if (!session) return <AuthGate onAuth={onAuth} />;
  const save = async (e) => { e.preventDefault(); const { error } = await supabase.from("community_profiles").update({ display_name: name, bio }).eq("id", session.user.id); setMessage(error ? error.message : "Profilin güncellendi."); if (!error) onProfile(); };
  return <div className="page profilePage sectionPad"><header className="profileHeader"><span className="eyebrow">ÜYE PROFİLİ</span><h1>Merhaba, <em>{profile?.display_name || "aramıza hoş geldin"}.</em></h1><p>Meydan kimliğini buradan düzenleyebilirsin.</p></header><div className="profileLayout"><form className="profileForm" onSubmit={save}><label>Görünen ad<input value={name} onChange={(e) => setName(e.target.value)} minLength={2} maxLength={60} /></label><label>Kısa biyografi<textarea value={bio} onChange={(e) => setBio(e.target.value)} maxLength={240} /></label><button className="button buttonDark">Değişiklikleri kaydet</button>{message && <p className="formMessage">{message}</p>}</form><aside><p>{session.user.email}</p><b>{profile?.role === "admin" ? "YÖNETİCİ" : "MEYDAN ÜYESİ"}</b>{profile?.role === "admin" && <button onClick={() => go("/yonetim")}>Yönetim paneli →</button>}<button onClick={() => supabase.auth.signOut()}>Oturumu kapat</button></aside></div></div>;
}

function Admin({ profile, onReload }) {
  const [pending, setPending] = useState([]); const [reports, setReports] = useState([]); const [tab, setTab] = useState("moderation"); const [message, setMessage] = useState("");
  const load = useCallback(async () => { const [postResult, reportResult] = await Promise.all([supabase.from("community_posts").select("*").in("status", ["pending", "published"]).order("created_at", { ascending: false }), supabase.from("community_reports").select("*,community_posts(content,author_name)").eq("status", "open").order("created_at", { ascending: false })]); setPending(postResult.data || []); setReports(reportResult.data || []); }, []);
  useEffect(() => { if (profile?.role === "admin") Promise.resolve().then(load); }, [profile, load]);
  if (!profile) return <AuthGate onAuth={() => go("/profil")} />;
  if (profile.role !== "admin") return <div className="authGate"><h1>Bu alan yalnızca editörlere açık.</h1><button onClick={() => go("/")}>Ana sayfaya dön</button></div>;
  const moderate = async (id, status) => { const { error } = await supabase.from("community_posts").update({ status }).eq("id", id); setMessage(error ? error.message : "İşlem tamamlandı."); await load(); onReload(); };
  const resolve = async (id) => { await supabase.from("community_reports").update({ status: "reviewed" }).eq("id", id); load(); };
  return <div className="page adminPage"><aside className="adminSide"><span>KO / EDİTÖR</span><h2>Yönetim</h2><button className={tab === "moderation" ? "active" : ""} onClick={() => setTab("moderation")}>Meydan</button><button className={tab === "reports" ? "active" : ""} onClick={() => setTab("reports")}>Bildirimler <i>{reports.length}</i></button><button onClick={() => go("/dergi")}>Dergiyi görüntüle ↗</button><button onClick={() => go("/")}>Siteye dön</button></aside><section className="adminMain"><header><span>YÖNETİM PANELİ</span><h1>{tab === "moderation" ? "Meydan moderasyonu" : "Topluluk bildirimleri"}</h1><p>Topluluğun güvenli, açık ve nitelikli kalması için editoryal kontrol.</p></header>{message && <p className="formMessage">{message}</p>}{tab === "moderation" ? <div className="moderationList">{pending.map((post) => <article key={post.id}><header><b>{post.author_name || "Yeni üye"}</b><span className={`status ${post.status}`}>{post.status}</span></header><small>{post.topic} · {formatDate(post.created_at)}</small><p>{post.content}</p><footer>{post.status === "pending" && <button onClick={() => moderate(post.id, "published")}>Yayınla</button>}<button onClick={() => moderate(post.id, "removed")}>Kaldır</button></footer></article>)}</div> : <div className="moderationList">{reports.map((report) => <article key={report.id}><b>{report.community_posts?.author_name}</b><p>{report.community_posts?.content}</p><blockquote>{report.reason}</blockquote><button onClick={() => resolve(report.id)}>İncelendi olarak işaretle</button></article>)}{!reports.length && <div className="emptyState">Açık bildirim yok.</div>}</div>}</section></div>;
}

function AuthGate({ onAuth }) { return <div className="authGate"><span className="eyebrow">ÜYELİK</span><h1>Sözünü paylaşmak için<br /><em>aramıza katıl.</em></h1><p>Üyelik ücretsizdir. Meydan'da paylaşım yapabilir, beğeni ve yorum bırakabilirsin.</p><button className="button buttonDark" onClick={onAuth}>Giriş yap / hesap oluştur</button></div>; }

function AuthModal({ onClose }) {
  const [mode, setMode] = useState("login"); const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [message, setMessage] = useState(""); const [busy, setBusy] = useState(false);
  const submit = async (e) => { e.preventDefault(); setBusy(true); setMessage(""); let result; if (mode === "signup") result = await supabase.auth.signUp({ email, password, options: { data: { display_name: name } } }); else result = await supabase.auth.signInWithPassword({ email, password }); setBusy(false); if (result.error) return setMessage(result.error.message); if (mode === "signup" && !result.data.session) setMessage("E-posta adresine gelen bağlantıyla hesabını doğrula."); else onClose(); };
  return <div className="modalBackdrop" onClick={onClose}><section className="authModal" onClick={(e) => e.stopPropagation()}><button className="modalClose" onClick={onClose}>KAPAT ×</button><span className="eyebrow">MEYDAN ÜYELİĞİ</span><h2>{mode === "login" ? "Yeniden merhaba." : "Söze sen de katıl."}</h2><p>{mode === "login" ? "Meydan'a dönmek için giriş yap." : "Ücretsiz hesabını birkaç saniyede oluştur."}</p><form onSubmit={submit}>{mode === "signup" && <label>Adın<input value={name} onChange={(e) => setName(e.target.value)} required minLength={2} /></label>}<label>E-posta<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label><label>Şifre<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} /></label><button className="button buttonDark" disabled={busy}>{busy ? "Bir saniye..." : mode === "login" ? "Giriş yap →" : "Hesap oluştur →"}</button></form>{message && <p className="formMessage">{message}</p>}<button className="authSwitch" onClick={() => { setMode(mode === "login" ? "signup" : "login"); setMessage(""); }}>{mode === "login" ? "Hesabın yok mu? Aramıza katıl" : "Zaten üye misin? Giriş yap"}</button></section></div>;
}

function Footer() { return <footer className="siteFooter"><div><b>KAAN<br />ÖZKAN</b><p>İnsan, toplum ve yaşam üzerine<br />bağımsız dijital yayın.</p></div><nav><span>KEŞFET</span><a href="#/dergi">Dergi</a><a href="#/meydan">Meydan</a><a href="#/yazarlar">Yazarlar</a></nav><nav><span>BİLGİ</span><a href="#/hakkimda">Hakkımda</a><a href="mailto:iletisim@ailedanismanikaanozkan.com">İletişim</a></nav><div className="footerNote"><span>© {new Date().getFullYear()} KAAN ÖZKAN</span><p>Bu platform sağlık, terapi, danışmanlık veya randevu hizmeti sunmaz.</p></div></footer>; }
function NotFound() { return <div className="notFound"><span>404</span><h1>Bu sayfa henüz yazılmamış.</h1><button onClick={() => go("/")}>Ana sayfaya dön →</button></div>; }

export default App;

