export function Home() {
  return (
    <section className="home">
      <main>
        <section className="hero">
          <h1 className="animate__animated animate__fadeInDown">
            Welcome to App
          </h1>
          <img
            className="horse"
            src="https://upload.wikimedia.org/wikipedia/commons/9/9b/THIEL_619.jpg"
            alt=""
          />
        </section>
        <section id="learn-more" class="features">
          <div className="feature">
            <h2>Amir Shamia</h2>
            <img
              className="amir-img"
              src="https://ca.slack-edge.com/T057RE2PDLK-U05GJ575G84-5bb6aa270c01-512"
              alt=""
            />
          </div>
          <div className="feature">
            <h2>Tzvia Izhakov</h2>
            <img
              className="our-img"
              src="https://ca.slack-edge.com/T057RE2PDLK-U05B8H5RSF3-6ac63c88a569-512"
              alt=""
            />
          </div>
        </section>
      </main>
      <footer>
        <p>&copy; 2023 App Sus. All rights reserved.</p>
      </footer>
    </section>
  );
}
