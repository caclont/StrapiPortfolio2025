"use client";

import './alexandregambarini.css';
import './alexandregambarini-smartphone.css';
import './alexandregambarini-tablet.css';

export default function Home() {
  return (
    <main className="home-container">
      <div className="role-label">Interactive Media Designer</div>

      <div className="home-grid">
        <div className="intro">
          <h2>Hi ! I'm Alex</h2>
          <p>I am an Interactive Media Designer passionate about creativity, user experience, and learning new technologies.</p>
        </div>

        <div className="education">
          <h2>Degrees</h2>
          <ul>
            <li>CFC Médiamaticien (CPLN)</li>
            <li>Maturité Professionnelle (CPLN)</li>
            <li>Bachelor in Media & Interaction Design (ECAL)</li>
          </ul>
        </div>

        <div className="bio">
          <h2>About Me</h2>
          <p>
            From an early age, I knew I wanted a career that allowed me to express my creativity. 
            I started with a CFC in Mediamatics, which opened many doors and taught me to be versatile with new technologies to fully express my creative freedom. 
            Then I pursued a Bachelor in Media & Interaction Design, which further strengthened my skills and taught me to handle intense workloads and deadlines, 
            shaping me into a highly motivated and reliable professional, always smiling, always ready for collaboration, and eager to learn new challenges.
          </p>
        </div>

        <div className="soft-skills">
          <h2>Soft Skills</h2>
          <div className="soft-skills-list">
            <ul>
              <li>Creativity</li>
              <li>Curiosity</li>
              <li>Motivation</li>
              <li>Adaptability</li>
              <li>Organization</li>
              <li>Communication</li>
              <li>Autodidact</li>
              <li>Critical Thinking</li>
              <li>Fast Learner</li>
              <li>Resilience</li>
              <li>Problem Solving</li>
              <li>Hard Worker</li>
              <li>Tech-savvy</li>
            </ul>
          </div>
        </div>

        <div className="languages">
          <h2>Languages</h2>
          <ul className="languages-list">
            <li style={{ '--lang-percent': '100%' }}>
              <span>French</span>
              <div className="lang-bar">
                <div className="lang-fill"></div>
              </div>
            </li>
            <li style={{ '--lang-percent': '90%' }}>
              <span>English</span>
              <div className="lang-bar">
                <div className="lang-fill"></div>
              </div>
            </li>
            <li style={{ '--lang-percent': '90%' }}>
              <span>Bulgarian</span>
              <div className="lang-bar">
                <div className="lang-fill"></div>
              </div>
            </li>
            <li style={{ '--lang-percent': '50%' }}>
              <span>German</span>
              <div className="lang-bar">
                <div className="lang-fill"></div>
              </div>
            </li>
          </ul>
        </div>

        <div className="tech-skills">
          <h2>Technical Skills</h2>
          <div className="tech-skills-list">
            <ul>
              <li>Adobe Photoshop</li>
              <li>Adobe Illustrator</li>
              <li>Adobe InDesign</li>
              <li>Adobe Lightroom</li>
              <li>Adobe After Effect</li>
              <li>Adobe Premiere Pro</li>
              <li>Adobe Audition</li>
              <li>Ableton</li>
              <li>Figma</li>
            </ul>
            <ul>
              <li>HTML | CSS</li>
              <li>JS | Java | C# | C++ | React</li>
              <li>Touch Designer</li>
              <li>Spark AR</li>
              <li>Strapi & other CMS</li>
              <li>Blender</li>
              <li>Unity</li>
              <li>Unreal Engine</li>
              <li>MadMapper</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
