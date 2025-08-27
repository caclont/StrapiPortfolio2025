// src/app/home/page.js
import './alexandregambarini.css';

export default function Home() {
  return (
    <main className="home-container">
      <div className="home-video">
        <video 
        
          src="https://res.cloudinary.com/dweali6ld/video/upload/v1755245770/Less_than_8s_sj1e65.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
        />
      </div>

      <div className="home-text">
        <h1 className="text-3xl font-bold mb-4">Bienvenue sur mon site !</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          tincidunt, nulla at pulvinar facilisis, sapien lorem feugiat lorem,
          nec porttitor nulla magna nec ligula. Integer at libero felis.
        </p>
      </div>

      <div className="graphik"></div>
    </main>
  );
}
{/* <div style="padding:75% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1110231784?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Less than 8s"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script> */}