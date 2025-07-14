import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { FaChevronDown, FaRocket, FaCogs, FaLightbulb, FaUsers, FaUserTie, FaBrain, FaChartBar, FaDatabase, FaShieldAlt, FaEnvelope, FaLinkedin, FaTwitter, FaBars, FaTimes } from 'react-icons/fa';
import { FaRegClock, FaRegChartBar, FaProjectDiagram, FaChartLine } from 'react-icons/fa';
import reactLogo from './assets/react.svg';
// Remove import statements for logo and footerLogo from images
// Use public path variables instead
const logo = '/images/1.png';
const footerLogo = '/images/footer.png';

function AnimatedCounter({ end, duration = 1200, prefix = '', suffix = '', trigger }) {
  const [count, setCount] = useState(0);
  const ref = useRef();
  useEffect(() => {
    if (!trigger) return;
    console.log('AnimatedCounter triggered for', end);
    let start = 0;
    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      setCount(value);
      if (progress < 1) {
        ref.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    ref.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(ref.current);
  }, [end, duration, trigger]);
  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
}

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleDropdownEnter = () => setDropdownOpen(true);
  const handleDropdownLeave = () => setDropdownOpen(false);
  const closeDropdown = () => setDropdownOpen(false);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="autoai-header">
      <div className="autoai-header-inner">
        <Link to="/" className="autoai-logo-link" onClick={() => { closeDropdown(); closeMobileMenu(); }}>
          <img src={logo} alt="AutoAI Logo" className="autoai-logo" />
        </Link>
        {/* Desktop Nav */}
        <nav className="autoai-nav autoai-desktop-nav">
          <Link to="/" className="autoai-nav-btn" onClick={closeDropdown}>Home</Link>
          <div
            className="autoai-nav-dropdown"
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
          >
            <button
              className="autoai-nav-btn autoai-nav-dropdown-btn"
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              aria-controls="resources-menu"
            >
              Resources <FaChevronDown style={{ marginLeft: 6, fontSize: '0.8em' }} />
            </button>
            {dropdownOpen && (
              <div className="autoai-dropdown-menu" id="resources-menu" role="menu">
                <Link to="/ai-strategy" className="autoai-dropdown-item" onClick={closeDropdown} role="menuitem">AI Strategy</Link>
                <Link to="/data-strategy" className="autoai-dropdown-item" onClick={closeDropdown} role="menuitem">Data Strategy</Link>
                <Link to="/comparison" className="autoai-dropdown-item" onClick={closeDropdown} role="menuitem">AI Comparison</Link>
              </div>
            )}
          </div>
          <div style={{ flex: 1 }} />
          <Link to="/contact" className="autoai-nav-btn" onClick={closeDropdown}>Book an Appointment</Link>
          <Link to="/contact-us" className="autoai-nav-btn" onClick={closeDropdown} style={{ marginLeft: '1rem' }}>Contact Us</Link>
        </nav>
        {/* Hamburger Icon for Mobile */}
        <button className="autoai-hamburger" onClick={() => setMobileMenuOpen(o => !o)} aria-label="Open menu">
          {mobileMenuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
        </button>
        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <nav className="autoai-mobile-nav">
            <Link to="/" className="autoai-nav-btn" onClick={closeMobileMenu}>Home</Link>
            <div className="autoai-mobile-dropdown">
              <span className="autoai-nav-btn">Resources <FaChevronDown style={{ marginLeft: 6, fontSize: '0.8em' }} /></span>
              <div className="autoai-mobile-dropdown-menu">
                <Link to="/ai-strategy" className="autoai-dropdown-item" onClick={closeMobileMenu}>AI Strategy</Link>
                <Link to="/data-strategy" className="autoai-dropdown-item" onClick={closeMobileMenu}>Data Strategy</Link>
                <Link to="/comparison" className="autoai-dropdown-item" onClick={closeMobileMenu}>AI Comparison</Link>
              </div>
            </div>
            <Link to="/contact" className="autoai-nav-btn" onClick={closeMobileMenu}>Book an Appointment</Link>
            <Link to="/contact-us" className="autoai-nav-btn" onClick={closeMobileMenu}>Contact Us</Link>
          </nav>
        )}
      </div>
    </header>
  );
}

function AIAssessmentQuiz({ onClose }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ size: '', pain: '', tech: '', goal: '' });

  const questions = [
    {
      label: 'How many vehicles does your dealership sell per month?',
      name: 'size',
      options: [
        'Less than 50',
        '50-150',
        '150-300',
        '300+',
      ],
    },
    {
      label: 'What is your biggest challenge right now?',
      name: 'pain',
      options: [
        'Lead management',
        'Inventory management',
        'Customer follow-up',
        'Staffing/training',
        'Other',
      ],
    },
    {
      label: 'What is your current technology stack?',
      name: 'tech',
      options: [
        'Mostly manual/spreadsheets',
        'Basic CRM/DMS',
        'Some automation/AI tools',
        'Advanced AI/automation',
      ],
    },
    {
      label: 'What is your primary goal for AI adoption?',
      name: 'goal',
      options: [
        'Increase sales',
        'Improve efficiency',
        'Enhance customer experience',
        'Reduce costs',
        'Other',
      ],
    },
  ];

  const handleSelect = (name, value) => {
    setAnswers((prev) => ({ ...prev, [name]: value }));
    setTimeout(() => setStep((s) => s + 1), 200);
  };

  const getScore = () => {
    // Simple scoring: more advanced tech/size/goals = higher readiness
    let score = 0;
    if (answers.size === '300+') score += 2;
    else if (answers.size === '150-300') score += 1;
    if (answers.tech === 'Advanced AI/automation') score += 2;
    else if (answers.tech === 'Some automation/AI tools') score += 1;
    if (answers.goal === 'Increase sales' || answers.goal === 'Improve efficiency') score += 1;
    return score;
  };

  if (step >= questions.length) {
    const score = getScore();
    let readiness = 'Basic';
    if (score >= 4) readiness = 'Advanced';
    else if (score >= 2) readiness = 'Intermediate';
    return (
      <div className="autoai-quiz-modal">
        <div className="autoai-quiz-card">
          <h2>Your AI Readiness: <span className="autoai-quiz-score">{readiness}</span></h2>
          <p>
            {readiness === 'Advanced' && 'You are ready to implement advanced AI solutions!'}
            {readiness === 'Intermediate' && 'You are on your way to AI adoption. Let’s discuss the best next steps for your dealership.'}
            {readiness === 'Basic' && 'AI can help your dealership grow. Let’s explore the right starting point for you.'}
          </p>
          <a href="mailto:info@autoaiconsult.org" className="autoai-contact-btn">Book a Free Consultation</a>
          <button className="autoai-quiz-close" onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  const q = questions[step];
  return (
    <div className="autoai-quiz-modal">
      <div className="autoai-quiz-card">
        <h2>AI Needs Assessment</h2>
        <p className="autoai-quiz-question">{q.label}</p>
        <div className="autoai-quiz-options">
          {q.options.map((opt) => (
            <button
              key={opt}
              className={`autoai-quiz-option${answers[q.name] === opt ? ' selected' : ''}`}
              onClick={() => handleSelect(q.name, opt)}
            >
              {opt}
            </button>
          ))}
        </div>
        <button className="autoai-quiz-close" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

function Home() {
  const [showQuiz, setShowQuiz] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const els = document.querySelectorAll('.fade-in-on-scroll');
    const observer = new window.IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.2 }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return (
    <>
      {/* Hero Section */}
      <section className="hero-fullwidth-section">
        <div className="hero-bcp-content">
          <h1 className="hero-bcp-title fade-in-on-scroll">AI Insights. Human Intuition.<br/>Meet Your Growth Engine.</h1>
          <p className="hero-bcp-subtitle fade-in-on-scroll">AutoAI Consult combines smart humans and AI-enabled technology to help dealers respond quickly and carefully. By any means—text, chat, email, or phone—even when you’re asleep.</p>
          <div className="hero-bcp-cta-row fade-in-on-scroll">
            <button className="autoai-hero-btn" onClick={() => setShowQuiz(true)}>
              Start Your AI Assessment
            </button>
            <button className="autoai-hero-btn secondary-cta" onClick={() => navigate('/comparison')}>
              View Solutions
            </button>
          </div>
        </div>
      </section>
      {showQuiz && <AIAssessmentQuiz onClose={() => setShowQuiz(false)} />}
      {/* About Us/Mission Section */}
      <div className="autoai-card autoai-about-hero">
        <h1 className="autoai-title fade-in-on-scroll">Dealership success. Powered by people. Driven by AI-enabled tech.</h1>
        <p className="autoai-subtitle fade-in-on-scroll">We carefully select the right dealers to work with. We don't just partner with anyone.</p>
      </div>
      {/* Mission/Vision Section */}
      <div className="autoai-card">
        <h2 className="autoai-section-title fade-in-on-scroll">Our Mission</h2>
        <p className="fade-in-on-scroll">
          Our mission is to equip dealerships with digital solutions that streamline operations and enhance customer engagement. With a team that knows the ins and outs of the auto world and always has an eye on the next big thing in tech, we're the folks dealerships turn to when they're ready to step up their game.
        </p>
      </div>
      {/* Key Stats Section */}
      <div className="autoai-card autoai-about-stats">
        <h2 className="autoai-section-title fade-in-on-scroll">Why Partner with AutoAI Consult?</h2>
        <div className="autoai-about-stats-row">
          <div className="autoai-about-stat"><FaRocket className="autoai-about-stat-icon" /><div className="autoai-about-stat-value"><AnimatedCounter end={300} suffix="+" trigger={true} /></div><div className="autoai-about-stat-label">Dealer Partners</div></div>
          <div className="autoai-about-stat"><FaCogs className="autoai-about-stat-icon" /><div className="autoai-about-stat-value">96%</div><div className="autoai-about-stat-label">Consultant Retention </div></div>
          <div className="autoai-about-stat"><FaLightbulb className="autoai-about-stat-icon" /><div className="autoai-about-stat-value"><AnimatedCounter end={100} suffix="+" trigger={true} /></div><div className="autoai-about-stat-label">Vendors For Dealers Evaluated</div></div>
          <div className="autoai-about-stat"><FaUsers className="autoai-about-stat-icon" /><div className="autoai-about-stat-value">$20 Million</div><div className="autoai-about-stat-label">Dollars Generated </div></div>
        </div>
      </div>
      {/* Leadership/Team Section */}
      {/* Removed leadership/team section as requested */}
    </>
  );
}

function ContactUs() {
  const [form, setForm] = useState({
    email: '', first: '', last: '', job: '', dealership: '', phone: '', country: '', state: '', hear: '', isDealer: 'Yes',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };
  const handleRadio = e => setForm(f => ({ ...f, isDealer: e.target.value }));
  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    const data = new FormData(e.target);
    try {
      const response = await fetch('https://formspree.io/f/xrblzdrv', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: data,
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        setError('There was an error sending your message.');
      }
    } catch (err) {
      setError('There was an error sending your message.');
    }
  };
  if (submitted) {
    return (
      <section className="autoai-card"><h2>Thank you!</h2><p>Your message has been received. We’ll be in touch soon.</p></section>
    );
  }
  return (
    <section className="autoai-card autoai-contact-form-card">
      <h1 className="autoai-title fade-in-on-scroll">Book an Appointment</h1>
      <form className="autoai-contact-form fade-in-on-scroll" onSubmit={handleSubmit} autoComplete="off">
        <label>Your email*<input name="email" type="email" required value={form.email} onChange={handleChange} /></label>
        <div className="autoai-contact-form-row">
          <label>First name*<input name="first" type="text" required value={form.first} onChange={handleChange} /></label>
          <label>Last name*<input name="last" type="text" required value={form.last} onChange={handleChange} /></label>
        </div>
        <label>Job title*<input name="job" type="text" required value={form.job} onChange={handleChange} /></label>
        <div className="autoai-contact-form-row dealer-radio-row">
          <span>Are you a car dealership?*</span>
          <label><input type="radio" name="isDealer" value="Yes" checked={form.isDealer === 'Yes'} onChange={handleRadio} /> Yes</label>
          <label><input type="radio" name="isDealer" value="No" checked={form.isDealer === 'No'} onChange={handleRadio} /> No</label>
        </div>
        {form.isDealer === 'Yes' && (
          <label>Dealership website*<input name="dealership" type="text" required value={form.dealership} onChange={handleChange} /></label>
        )}
        <label>Phone number<input name="phone" type="text" required value={form.phone} onChange={handleChange} /></label>
        <label>Country*<input name="country" type="text" required value={form.country} onChange={handleChange} /></label>
        <label>Region/State*<input name="state" type="text" required value={form.state} onChange={handleChange} /></label>
        <label>How did you hear about us*<input name="hear" type="text" required value={form.hear} onChange={handleChange} /></label>
        <button className="autoai-contact-btn" type="submit">Submit</button>
        {error && <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}
      </form>
    </section>
  );
}

function ContactUsSimple() {
  const [form, setForm] = useState({ name: '', email: '', message: '', screenshot: null });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'screenshot') {
      setForm(f => ({ ...f, screenshot: files[0] }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };
  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    const data = new FormData(e.target);
    try {
      const response = await fetch('https://formspree.io/f/xrblzdrv', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: data,
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        setError('There was an error sending your message.');
      }
    } catch (err) {
      setError('There was an error sending your message.');
    }
  };
  if (submitted) {
    return (
      <section className="autoai-card autoai-contact-form-card"><h2>Thank you!</h2><p>Your message has been sent.</p></section>
    );
  }
  return (
    <section className="autoai-card autoai-contact-form-card">
      <h1 className="autoai-title fade-in-on-scroll">Contact Us</h1>
      <form className="autoai-contact-form fade-in-on-scroll" onSubmit={handleSubmit} autoComplete="off">
        <label>Your Name*<input name="name" type="text" required value={form.name} onChange={handleChange} /></label>
        <label>Your Email*<input name="email" type="email" required value={form.email} onChange={handleChange} /></label>
        <label>Your Message*<textarea name="message" required value={form.message} onChange={handleChange} rows={5} /></label>
        <label>Screenshot (optional)<input name="screenshot" type="file" accept="image/*" onChange={handleChange} /></label>
        <button className="autoai-contact-btn" type="submit">Send Message</button>
        {error && <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}
      </form>
    </section>
  );
}

function AIStrategy() {
  const navigate = useNavigate();
  return (
    <>
      <section className="autoai-card autoai-about-hero">
        <h1 className="autoai-title fade-in-on-scroll">AI Strategy for Dealerships</h1>
        <p className="autoai-subtitle fade-in-on-scroll">Unlock the power of artificial intelligence to drive sales, efficiency, and customer satisfaction.</p>
      </section>
      <section className="autoai-card">
        <h2 className="autoai-section-title fade-in-on-scroll">What We Offer</h2>
        <ul className="autoai-services-list">
          <li><FaBrain className="autoai-icon" /> Custom AI Roadmaps for Your Dealership</li>
          <li><FaChartBar className="autoai-icon" /> Comparative Analysis: PAM AI vs. TOMA AI and More</li>
          <li><FaLightbulb className="autoai-icon" /> AI Vendor Evaluation & Selection Guidance</li>
          <li><FaCogs className="autoai-icon" /> Implementation Planning & Support</li>
          <li><FaUsers className="autoai-icon" /> Staff Training & Change Management for AI Adoption</li>
        </ul>
      </section>
      <section className="autoai-card autoai-contact-section">
        <h2 className="autoai-section-title fade-in-on-scroll">Ready to Transform Your Dealership?</h2>
        <p className="fade-in-on-scroll">Contact us to discuss a tailored AI strategy for your business.</p>
        <button className="autoai-contact-btn" onClick={() => navigate('/contact-us')}>Get in Touch</button>
      </section>
    </>
  );
}

function DataStrategy() {
  const navigate = useNavigate();
  return (
    <>
      <section className="autoai-card autoai-about-hero">
        <h1 className="autoai-title fade-in-on-scroll">Data Strategy for Dealerships</h1>
        <p className="autoai-subtitle fade-in-on-scroll">Leverage your dealership’s data for smarter decisions, better marketing, and increased profitability.</p>
      </section>
      <section className="autoai-card">
        <h2 className="autoai-section-title fade-in-on-scroll">Our Data Strategy Services</h2>
        <ul className="autoai-services-list">
          <li><FaDatabase className="autoai-icon" /> Data Assessment & Cleansing</li>
          <li><FaChartBar className="autoai-icon" /> Data-Driven Marketing & Sales Insights</li>
          <li><FaLightbulb className="autoai-icon" /> Data Integration Across Platforms</li>
          <li><FaCogs className="autoai-icon" /> Data Security & Compliance Guidance</li>
          <li><FaShieldAlt className="autoai-icon" /> Ongoing Data Management & Support</li>
        </ul>
      </section>
      <section className="autoai-card autoai-contact-section">
        <h2 className="autoai-section-title fade-in-on-scroll">Let’s Build Your Data Advantage</h2>
        <p className="fade-in-on-scroll">Contact us to unlock the full potential of your dealership’s data.</p>
        <button className="autoai-contact-btn" onClick={() => navigate('/contact-us')}>Get in Touch</button>
      </section>
    </>
  );
}

function AIComparison() {
  const navigate = useNavigate();
  const solutions = [
    {
      name: 'PAM AI',
      features: 'Lead scoring, automated follow-up, inventory insights',
      integrations: 'CRM, DMS, Email, SMS',
      bestFor: 'Dealerships focused on sales automation',
    },
    {
      name: 'TOMA AI',
      features: 'Customer retention, service reminders, analytics',
      integrations: 'CRM, DMS, Service Scheduler',
      bestFor: 'Dealerships focused on retention & service',
    },
    {
      name: 'VisionDrive AI',
      features: 'Predictive analytics, marketing automation, customer segmentation',
      integrations: 'CRM, Marketing Platforms, DMS',
      bestFor: 'Dealerships seeking advanced marketing insights',
    },
    {
      name: 'AutoPilot AI',
      features: 'Workflow automation, appointment scheduling, chatbot support',
      integrations: 'Website, CRM, Calendar, SMS',
      bestFor: 'Dealerships wanting to automate customer engagement',
    },
    {
      name: 'Custom AI Solutions',
      features: 'Tailored AI tools, custom integrations, unique workflows',
      integrations: 'Custom integrations available',
      bestFor: 'Dealerships with unique or complex needs',
    },
  ];
  return (
    <section className="autoai-card autoai-comparison-card">
      <h1 className="autoai-title fade-in-on-scroll">AI Solution Comparison</h1>
      <p className="autoai-subtitle fade-in-on-scroll">Compare leading automotive AI platforms to find the best fit for your dealership.</p>
      <div className="autoai-comparison-table-wrapper">
        <table className="autoai-comparison-table">
          <thead>
            <tr>
              <th>Solution</th>
              <th>Key Features</th>
              <th>Integrations</th>
              <th>Best For</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {solutions.map((s, i) => {
              // Generate a random word for each solution name
              const randomWords = [
                'Nebula', 'Quantum', 'Nimbus', 'Vertex', 'Pulse',
                'Zenith', 'Echo', 'Nova', 'Spectra', 'Flux'
              ];
              const randomName = randomWords[i % randomWords.length];
              return (
                <tr key={s.name}>
                  <td><b className="blurred-text">{randomName}</b></td>
                  <td>{s.features}</td>
                  <td>{s.integrations}</td>
                  <td>{s.bestFor}</td>
                  <td><button className="autoai-contact-btn autoai-compare-btn" onClick={() => navigate('/contact')}>Request Info</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function TermsOfService() {
  return (
    <section className="autoai-card autoai-legal-card">
      <h1 className="autoai-title fade-in-on-scroll">Terms of Service</h1>
      <p className="fade-in-on-scroll">Welcome to AutoAI Consult. By using our website and services, you agree to the following terms and conditions. Please read them carefully.</p>
      <ul className="fade-in-on-scroll" style={{ textAlign: 'left', maxWidth: 600, margin: '0 auto' }}>
        <li><b>Use of Service:</b> You agree to use our website and services only for lawful purposes and in accordance with these terms.</li>
        <li><b>Intellectual Property:</b> All content, trademarks, and data on this site are the property of AutoAI Consult or its licensors.</li>
        <li><b>Limitation of Liability:</b> We are not liable for any damages arising from your use of our website or services.</li>
        <li><b>Changes to Terms:</b> We may update these terms at any time. Continued use of the site means you accept the new terms.</li>
        <li><b>Contact:</b> For questions, contact us at info@autoaiconsult.org.</li>
      </ul>
    </section>
  );
}

function PrivacyPolicy() {
  return (
    <section className="autoai-card autoai-legal-card">
      <h1 className="autoai-title fade-in-on-scroll">Privacy Policy</h1>
      <p className="fade-in-on-scroll">Your privacy is important to us. This policy explains how we collect, use, and protect your information.</p>
      <ul className="fade-in-on-scroll" style={{ textAlign: 'left', maxWidth: 600, margin: '0 auto' }}>
        <li><b>Information Collection:</b> We collect information you provide directly (such as contact forms) and automatically (such as cookies).</li>
        <li><b>Use of Information:</b> We use your information to provide and improve our services, and to communicate with you.</li>
        <li><b>Sharing:</b> We do not sell or rent your personal information. We may share it with trusted partners to operate our services.</li>
        <li><b>Security:</b> We take reasonable measures to protect your data from unauthorized access.</li>
        <li><b>Contact:</b> For privacy questions, contact info@autoaiconsult.org.</li>
      </ul>
    </section>
  );
}

function Footer() {
  return (
    <footer className="autoai-footer">
      <div className="autoai-footer-inner">
        <div className="autoai-footer-legal">
          <a href="/terms" className="autoai-footer-link">Terms of Service</a>
          <span className="autoai-footer-divider">|</span>
          <a href="/privacy" className="autoai-footer-link">Privacy Policy</a>
        </div>
        <div className="autoai-footer-copyright">
          © {new Date().getFullYear()} AutoAI Consult | All Rights Reserved
        </div>
        <div className="autoai-footer-social">
          <a href="mailto:info@autoaiconsult.org" className="autoai-footer-link"><FaEnvelope /> info@autoaiconsult.org</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="autoai-footer-social-icon"><FaLinkedin /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="autoai-footer-social-icon"><FaTwitter /></a>
        </div>
      </div>
    </footer>
  );
}

// Helper to check if an element is in the viewport
function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top < window.innerHeight &&
    rect.bottom > 0 &&
    rect.left < window.innerWidth &&
    rect.right > 0
  );
}

function FadeInManager({ children }) {
  const location = useLocation();
  useEffect(() => {
    // On route change, add .is-visible to all .fade-in-on-scroll elements in viewport
    const els = document.querySelectorAll('.fade-in-on-scroll');
    els.forEach(el => {
      el.classList.remove('is-visible'); // Reset for animation on navigation
      if (isInViewport(el)) {
        el.classList.add('is-visible');
      }
    });
    // Also keep the Intersection Observer for scroll-in
    const observer = new window.IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.2 }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [location]);
  return children;
}

function App() {
  return (
    <Router>
      <div className="autoai-bg">
        <Header />
        <main className="autoai-container">
          <FadeInManager>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/ai-strategy" element={<AIStrategy />} />
              <Route path="/data-strategy" element={<DataStrategy />} />
              <Route path="/comparison" element={<AIComparison />} />
              <Route path="/contact-us" element={<ContactUsSimple />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
            </Routes>
          </FadeInManager>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
