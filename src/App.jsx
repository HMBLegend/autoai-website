import './App.css';
import { FaRegClock, FaRegChartBar, FaUserTie, FaProjectDiagram, FaChartLine } from 'react-icons/fa';

function App() {
  return (
    <div className="autoai-bg">
      <main className="autoai-container">
        <h1 className="autoai-title">AutoAI Consult</h1>
        <p className="autoai-subtitle">Empowering Car Dealerships to Choose the Right AI Solutions</p>
        <a href="mailto:info@autoaiconsult.org" className="autoai-contact-btn">Contact Us</a>

        <section className="autoai-card">
          <h2 className="autoai-section-title">About Us</h2>
          <p>
            At AutoAI Consult, we specialize in guiding car dealerships through the complex world of automotive AI. Whether you're considering solutions like <b>PAM AI</b>, <b>TOMA AI</b>, or other cutting-edge platforms, we help you make informed decisions that drive results.
          </p>
        </section>

        <section className="autoai-card">
          <h2 className="autoai-section-title">Our Services</h2>
          <ul className="autoai-services-list">
            <li><FaRegClock className="autoai-icon" /> AI Needs Assessment for Dealerships</li>
            <li><FaRegChartBar className="autoai-icon" /> Comparative Analysis: PAM AI vs. TOMA AI and more</li>
            <li><FaUserTie className="autoai-icon" /> Vendor Evaluation & Selection Guidance</li>
            <li><FaProjectDiagram className="autoai-icon" /> Implementation Planning & Support</li>
            <li><FaChartLine className="autoai-icon" /> Staff Training & Change Management</li>
          </ul>
        </section>

        <section className="autoai-card autoai-contact-section">
          <h2 className="autoai-section-title">Contact Us</h2>
          <p>Ready to find the perfect AI for your dealership?</p>
          <a href="mailto:info@autoaiconsult.org" className="autoai-contact-btn">Email us at info@autoaiconsult.org</a>
        </section>
      </main>
    </div>
  );
}

export default App;
