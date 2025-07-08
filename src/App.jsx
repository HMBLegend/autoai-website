import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaChevronDown, FaRocket, FaCogs, FaLightbulb, FaUsers, FaUserTie, FaBrain, FaChartBar, FaDatabase, FaShieldAlt } from 'react-icons/fa';
import { FaRegClock, FaRegChartBar, FaProjectDiagram, FaChartLine } from 'react-icons/fa';

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleDropdownEnter = () => setDropdownOpen(true);
  const handleDropdownLeave = () => setDropdownOpen(false);
  const closeDropdown = () => setDropdownOpen(false);

  return (
    <header className="autoai-header">
      <nav className="autoai-nav">
        <Link to="/about" className="autoai-nav-btn" onClick={closeDropdown}>About Us</Link>
        <div
          className="autoai-nav-dropdown"
          onMouseEnter={handleDropdownEnter}
          onMouseLeave={handleDropdownLeave}
        >
          <button className="autoai-nav-btn autoai-nav-dropdown-btn" aria-haspopup="true" aria-expanded={dropdownOpen}>
            Resources <FaChevronDown style={{ marginLeft: 6, fontSize: '0.8em' }} />
          </button>
          {dropdownOpen && (
            <div className="autoai-dropdown-menu">
              <Link to="/ai-strategy" className="autoai-dropdown-item" onClick={closeDropdown}>AI Strategy</Link>
              <Link to="/data-strategy" className="autoai-dropdown-item" onClick={closeDropdown}>Data Strategy</Link>
            </div>
          )}
        </div>
        <button className="autoai-nav-btn" onClick={() => { closeDropdown(); navigate('/#contact'); }}>Contact Us</button>
      </nav>
    </header>
  );
}

function Home() {
  return (
    <div className="autoai-bg">
      <main className="autoai-container">
        <h1 className="autoai-title">AutoAI Consult</h1>
        <p className="autoai-subtitle">Empowering Car Dealerships to Choose the Right AI Solutions</p>
        <a href="#contact" className="autoai-contact-btn">Contact Us</a>

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

        <section id="contact" className="autoai-card autoai-contact-section">
          <h2 className="autoai-section-title">Contact Us</h2>
          <p>Ready to find the perfect AI for your dealership?</p>
          <a href="mailto:info@autoaiconsult.org" className="autoai-contact-btn">Email us at info@autoaiconsult.org</a>
        </section>
      </main>
    </div>
  );
}

function AboutUs() {
  return (
    <div className="autoai-bg">
      <main className="autoai-container">
        {/* Hero Section */}
        <section className="autoai-card autoai-about-hero">
          <h1 className="autoai-title">Dealership success. Powered by people. Driven by AI-enabled tech.</h1>
          <p className="autoai-subtitle">Empowering dealerships with digital solutions and expert guidance for the future of automotive sales and service.</p>
        </section>

        {/* Mission/Vision Section */}
        <section className="autoai-card">
          <h2 className="autoai-section-title">Our Mission</h2>
          <p>
            Our mission is to equip dealerships with digital solutions that streamline operations and enhance customer engagement. With a team that knows the ins and outs of the auto world and always has an eye on the next big thing in tech, we're the folks dealerships turn to when they're ready to step up their game.
          </p>
        </section>

        {/* Key Stats Section */}
        <section className="autoai-card autoai-about-stats">
          <h2 className="autoai-section-title">Why Partner with AutoAI Consult?</h2>
          <div className="autoai-about-stats-row">
            <div className="autoai-about-stat"><FaRocket className="autoai-about-stat-icon" /><div className="autoai-about-stat-value">4,500+</div><div className="autoai-about-stat-label">Dealer Partners</div></div>
            <div className="autoai-about-stat"><FaCogs className="autoai-about-stat-icon" /><div className="autoai-about-stat-value">$25B+</div><div className="autoai-about-stat-label">Sales Enabled</div></div>
            <div className="autoai-about-stat"><FaLightbulb className="autoai-about-stat-icon" /><div className="autoai-about-stat-value">2M+</div><div className="autoai-about-stat-label">Service Appointments</div></div>
            <div className="autoai-about-stat"><FaUsers className="autoai-about-stat-icon" /><div className="autoai-about-stat-value">23M+</div><div className="autoai-about-stat-label">Sales Leads Reviewed</div></div>
          </div>
        </section>

        {/* Leadership/Team Section */}
        <section className="autoai-card autoai-about-team">
          <h2 className="autoai-section-title">The People Behind the Wheel</h2>
          <div className="autoai-about-team-row">
            <div className="autoai-about-team-member">
              <FaUserTie className="autoai-about-team-icon" />
              <div className="autoai-about-team-name">Alex Johnson</div>
              <div className="autoai-about-team-role">Chief Executive Officer</div>
            </div>
            <div className="autoai-about-team-member">
              <FaUserTie className="autoai-about-team-icon" />
              <div className="autoai-about-team-name">Jamie Lee</div>
              <div className="autoai-about-team-role">Chief Technology Officer</div>
            </div>
            <div className="autoai-about-team-member">
              <FaUserTie className="autoai-about-team-icon" />
              <div className="autoai-about-team-name">Morgan Smith</div>
              <div className="autoai-about-team-role">VP, Client Success</div>
            </div>
            <div className="autoai-about-team-member">
              <FaUserTie className="autoai-about-team-icon" />
              <div className="autoai-about-team-name">Taylor Brown</div>
              <div className="autoai-about-team-role">Director, AI Strategy</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function AIStrategy() {
  return (
    <div className="autoai-bg">
      <main className="autoai-container">
        <section className="autoai-card autoai-about-hero">
          <h1 className="autoai-title">AI Strategy for Dealerships</h1>
          <p className="autoai-subtitle">Unlock the power of artificial intelligence to drive sales, efficiency, and customer satisfaction.</p>
        </section>
        <section className="autoai-card">
          <h2 className="autoai-section-title">What We Offer</h2>
          <ul className="autoai-services-list">
            <li><FaBrain className="autoai-icon" /> Custom AI Roadmaps for Your Dealership</li>
            <li><FaChartBar className="autoai-icon" /> Comparative Analysis: PAM AI vs. TOMA AI and More</li>
            <li><FaLightbulb className="autoai-icon" /> AI Vendor Evaluation & Selection Guidance</li>
            <li><FaCogs className="autoai-icon" /> Implementation Planning & Support</li>
            <li><FaUsers className="autoai-icon" /> Staff Training & Change Management for AI Adoption</li>
          </ul>
        </section>
        <section className="autoai-card autoai-contact-section">
          <h2 className="autoai-section-title">Ready to Transform Your Dealership?</h2>
          <p>Contact us to discuss a tailored AI strategy for your business.</p>
          <a href="mailto:info@autoaiconsult.org" className="autoai-contact-btn">Get in Touch</a>
        </section>
      </main>
    </div>
  );
}

function DataStrategy() {
  return (
    <div className="autoai-bg">
      <main className="autoai-container">
        <section className="autoai-card autoai-about-hero">
          <h1 className="autoai-title">Data Strategy for Dealerships</h1>
          <p className="autoai-subtitle">Leverage your dealership’s data for smarter decisions, better marketing, and increased profitability.</p>
        </section>
        <section className="autoai-card">
          <h2 className="autoai-section-title">Our Data Strategy Services</h2>
          <ul className="autoai-services-list">
            <li><FaDatabase className="autoai-icon" /> Data Assessment & Cleansing</li>
            <li><FaChartBar className="autoai-icon" /> Data-Driven Marketing & Sales Insights</li>
            <li><FaLightbulb className="autoai-icon" /> Data Integration Across Platforms</li>
            <li><FaCogs className="autoai-icon" /> Data Security & Compliance Guidance</li>
            <li><FaShieldAlt className="autoai-icon" /> Ongoing Data Management & Support</li>
          </ul>
        </section>
        <section className="autoai-card autoai-contact-section">
          <h2 className="autoai-section-title">Let’s Build Your Data Advantage</h2>
          <p>Contact us to unlock the full potential of your dealership’s data.</p>
          <a href="mailto:info@autoaiconsult.org" className="autoai-contact-btn">Get in Touch</a>
        </section>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/ai-strategy" element={<AIStrategy />} />
        <Route path="/data-strategy" element={<DataStrategy />} />
      </Routes>
    </Router>
  );
}

export default App;
