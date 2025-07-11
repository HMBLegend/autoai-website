import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { FaChevronDown, FaRocket, FaCogs, FaLightbulb, FaUsers, FaUserTie, FaBrain, FaChartBar, FaDatabase, FaShieldAlt, FaEnvelope, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { FaRegClock, FaRegChartBar, FaProjectDiagram, FaChartLine } from 'react-icons/fa';
import reactLogo from './assets/react.svg';
import logo from '../images/1.png';
import footerLogo from '../images/3.png';

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
  const navigate = useNavigate();

  const handleDropdownEnter = () => setDropdownOpen(true);
  const handleDropdownLeave = () => setDropdownOpen(false);
  const closeDropdown = () => setDropdownOpen(false);

  return (
    <header className="autoai-header">
      <div className="autoai-header-inner">
        <Link to="/" className="autoai-logo-link" onClick={closeDropdown}>
          <img src={logo} alt="AutoAI Logo" className="autoai-logo" />
        </Link>
        <nav className="autoai-nav" style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
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
          <div className="autoai-about-stat"><FaCogs className="autoai-about-stat-icon" /><div className="autoai-about-stat-value"><AnimatedCounter end={99} suffix="%" trigger={true} /></div><div className="autoai-about-stat-label">Consultant Retention </div></div>
          <div className="autoai-about-stat"><FaLightbulb className="autoai-about-stat-icon" /><div className="autoai-about-stat-value"><AnimatedCounter end={100} suffix="+" trigger={true} /></div><div className="autoai-about-stat-label">Vendors For Dealers Evaluated</div></div>
          <div className="autoai-about-stat"><FaUsers className="autoai-about-stat-icon" /><div className="autoai-about-stat-value"><AnimatedCounter end={20000000} suffix="+" trigger={true} /></div><div className="autoai-about-stat-label">Dollars Generated </div></div>
          <div className="autoai-about-stat"><FaUsers className="autoai-about-stat-icon" /><div className="autoai-about-stat-value"><AnimatedCounter end={97} suffix="%" trigger={true} /></div><div className="autoai-about-stat-label">Client Satisfaction<br/>Post-AI Adoption</div></div>
        </div>
      </div>
      {/* Leadership/Team Section */}
      <div className="autoai-card autoai-about-team">
        <h2 className="autoai-section-title fade-in-on-scroll">The People Behind the Wheel</h2>
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
      </div>
    </>
  );
}

function ContactUs() {
  const [form, setForm] = useState({
    email: '', first: '', last: '', job: '', dealership: '', phone: '', country: '', state: '', hear: '', isDealer: 'Yes',
  });
  const [submitted, setSubmitted] = useState(false);
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };
  const handleRadio = e => setForm(f => ({ ...f, isDealer: e.target.value }));
  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would send the form data to your backend or a service like Formspree/Netlify
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
        <label>Your work email*<input name="email" type="email" required value={form.email} onChange={handleChange} /></label>
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
        <label>Dealership website*<input name="dealership" type="text" required value={form.dealership} onChange={handleChange} /></label>
        <label>Phone number*<input name="phone" type="text" required value={form.phone} onChange={handleChange} /></label>
        <label>Country*<input name="country" type="text" required value={form.country} onChange={handleChange} /></label>
        <label>Region/State*<input name="state" type="text" required value={form.state} onChange={handleChange} /></label>
        <label>How did you hear about us*<input name="hear" type="text" required value={form.hear} onChange={handleChange} /></label>
        <button className="autoai-contact-btn" type="submit">Submit</button>
      </form>
    </section>
  );
}

function ContactUsSimple() {
  const [form, setForm] = useState({ name: '', email: '', message: '', screenshot: null });
  const [submitted, setSubmitted] = useState(false);
  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'screenshot') {
      setForm(f => ({ ...f, screenshot: files[0] }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would send the form data to your backend or email service
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
      </form>
    </section>
  );
}

function AIStrategy() {
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
        <a href="mailto:info@autoaiconsult.org" className="autoai-contact-btn">Get in Touch</a>
      </section>
    </>
  );
}

function DataStrategy() {
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
        <a href="mailto:info@autoaiconsult.org" className="autoai-contact-btn">Get in Touch</a>
      </section>
    </>
  );
}

function AIComparison() {
  const solutions = [
    {
      name: 'PAM AI',
      features: 'Lead scoring, automated follow-up, inventory insights',
      integrations: 'CRM, DMS, Email, SMS',
      bestFor: 'Dealerships focused on sales automation',
      info: 'mailto:info@autoaiconsult.org?subject=Request%20Info%20about%20PAM%20AI',
    },
    {
      name: 'TOMA AI',
      features: 'Customer retention, service reminders, analytics',
      integrations: 'CRM, DMS, Service Scheduler',
      bestFor: 'Dealerships focused on retention & service',
      info: 'mailto:info@autoaiconsult.org?subject=Request%20Info%20about%20TOMA%20AI',
    },
    {
      name: 'VisionDrive AI',
      features: 'Predictive analytics, marketing automation, customer segmentation',
      integrations: 'CRM, Marketing Platforms, DMS',
      bestFor: 'Dealerships seeking advanced marketing insights',
      info: 'mailto:info@autoaiconsult.org?subject=Request%20Info%20about%20VisionDrive%20AI',
    },
    {
      name: 'AutoPilot AI',
      features: 'Workflow automation, appointment scheduling, chatbot support',
      integrations: 'Website, CRM, Calendar, SMS',
      bestFor: 'Dealerships wanting to automate customer engagement',
      info: 'mailto:info@autoaiconsult.org?subject=Request%20Info%20about%20AutoPilot%20AI',
    },
    {
      name: 'Custom AI Solutions',
      features: 'Tailored AI tools, custom integrations, unique workflows',
      integrations: 'Custom integrations available',
      bestFor: 'Dealerships with unique or complex needs',
      info: 'mailto:info@autoaiconsult.org?subject=Request%20Info%20about%20Custom%20AI%20Solutions',
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
                  <td><a href={s.info} className="autoai-contact-btn autoai-compare-btn">Request Info</a></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="autoai-footer">
      <div className="autoai-footer-inner">
        <img src={footerLogo} alt="AutoAI Consult Logo" className="autoai-footer-logo" />
        <div className="autoai-footer-contact">
          <a href="mailto:info@autoaiconsult.org" className="autoai-footer-link"><FaEnvelope /> info@autoaiconsult.org</a>
        </div>
        <div className="autoai-footer-social">
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
            </Routes>
          </FadeInManager>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
