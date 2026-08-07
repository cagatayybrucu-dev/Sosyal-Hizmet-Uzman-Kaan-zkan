function App() {
  return (
    <div className="site">

      <header className="header">
        <div className="logo">
          Sosyal Hizmet Uzmanı
        </div>

        <nav>
          <a href="#">Ana Sayfa</a>
          <a href="#">Hakkımda</a>
          <a href="#">Hizmetler</a>
          <a href="#">İletişim</a>
        </nav>

        <button className="menuButton">
          Randevu Al
        </button>
      </header>


      <section className="hero">

        <div className="heroText">

          <h1>
            Profesyonel Sosyal Hizmet
            <br />
            Desteği
          </h1>

          <p>
            Danışan odaklı yaklaşım ile güvenilir,
            etik ve çözüm odaklı sosyal hizmet desteği.
          </p>

          <button className="mainButton">
            Randevu Oluştur
          </button>

        </div>


        <div className="heroCard">

          <h3>
            Yanınızdayım
          </h3>

          <p>
            Bireysel görüşmeler,
            danışmanlık ve sosyal destek süreçlerinde
            profesyonel yaklaşım.
          </p>

        </div>


      </section>



      <section className="services">

        <h2>
          Hizmet Alanlarım
        </h2>


        <div className="cards">


          <div className="card">

            <h3>
              Bireysel Görüşme
            </h3>

            <p>
              Kişisel ihtiyaçlara yönelik destek ve değerlendirme süreçleri.
            </p>

          </div>



          <div className="card">

            <h3>
              Sosyal Danışmanlık
            </h3>

            <p>
              Sosyal destek mekanizmaları ve yönlendirme hizmetleri.
            </p>

          </div>



          <div className="card">

            <h3>
              Online Görüşme
            </h3>

            <p>
              Uygun zamanlarda çevrim içi görüşme imkanı.
            </p>

          </div>


        </div>

      </section>


    </div>
  )
}


export default App
