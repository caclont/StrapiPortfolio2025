// src/app/home/page.js
import './home.css';

export default function Home() {
  return (
    <main className="home-container">
      <div className='MAINTNANCE'></div>
      <div className="home-video">
        {/* Ici tu pourras ajouter <video> ou <img> */}
        <p style={{ color: 'white' }}>Video / GIF</p>
      </div>

      <div className="home-text">
        <h1 className="text-3xl font-bold mb-4">Bienvenue sur mon site !</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          tincidunt, nulla at pulvinar facilisis, sapien lorem feugiat lorem,
          nec porttitor nulla magna nec ligula. Integer at libero felis.
        </p>
      </div>
      <div className="graphik">
        </div>
    </main>
  );
}
