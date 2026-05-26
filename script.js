// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger?.classList.remove('active');
    navMenu?.classList.remove('active');
  });
});

// Navbar Scroll Effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
  }

  // Update active nav link
  updateActiveNavLink();
  lastScroll = currentScroll;
});

// Update Active Nav Link
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      const offset = 80;
      const targetPosition = target.offsetTop - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Intersection Observer for Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe Cards and Elements
document.querySelectorAll('.glass-effect, .experience-card, .about-card, .skill-card-advanced, .education-card, .contact-card, .project-showcase').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'all 0.6s ease-out';
  observer.observe(el);
});

// Animate Skill Bars on Scroll
const skillBarsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const skillFills = entry.target.querySelectorAll('.skill-fill');
      skillFills.forEach((fill, index) => {
        setTimeout(() => {
          fill.style.animation = 'fillAnimation 1.2s ease-out forwards';
        }, index * 100);
      });
      skillBarsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.skills').forEach(section => {
  skillBarsObserver.observe(section);
});

// Add CSS animation for skill bars
const style = document.createElement('style');
style.textContent = `
  @keyframes fillAnimation {
    from {
      width: 0 !important;
    }
  }
`;
document.head.appendChild(style);

// Counter Animation
function animateCounter(element, target, duration = 1500) {
  let current = 0;
  const increment = target / (duration / 16);

  const counter = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(counter);
    } else {
      element.textContent = Math.floor(current) + (target > 10 ? '+' : '');
    }
  }, 16);
}

// Trigger Counter on Scroll
const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
      entry.target.classList.add('animated');
      const stats = entry.target.querySelectorAll('.stat-number');
      stats.forEach(stat => {
        const value = parseInt(stat.textContent);
        animateCounter(stat, value);
      });
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.tech-stats').forEach(el => {
  statsObserver.observe(el);
});

// Mouse Move Parallax Effect
const heroVisual = document.querySelector('.hero-visual');
if (heroVisual) {
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX - window.innerWidth / 2) * 0.01;
    const y = (e.clientY - window.innerHeight / 2) * 0.01;

    heroVisual.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
  });
}

// Floating Elements Animation Enhancement
const floatingElements = document.querySelectorAll('.element');
floatingElements.forEach((el, index) => {
  el.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1) translateY(-5px)';
    this.style.boxShadow = '0 0 20px rgba(0, 217, 255, 0.6)';
  });

  el.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
    this.style.boxShadow = 'none';
  });
});

// Add Glow Effect to Buttons on Hover
const buttons = document.querySelectorAll('.btn-glow');
buttons.forEach(btn => {
  btn.addEventListener('mouseenter', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const glow = document.createElement('div');
    glow.style.position = 'absolute';
    glow.style.left = x + 'px';
    glow.style.top = y + 'px';
    glow.style.width = '50px';
    glow.style.height = '50px';
    glow.style.background = 'radial-gradient(circle, rgba(0, 217, 255, 0.8), transparent)';
    glow.style.borderRadius = '50%';
    glow.style.pointerEvents = 'none';
    glow.style.animation = 'glowPulse 0.6s ease-out';

    this.appendChild(glow);

    setTimeout(() => glow.remove(), 600);
  });
});

// Add CSS for glow pulse
const glowStyle = document.createElement('style');
glowStyle.textContent = `
  @keyframes glowPulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(3);
      opacity: 0;
    }
  }
`;
document.head.appendChild(glowStyle);

// Text Glitch Effect
const glitchElements = document.querySelectorAll('.glitch');
glitchElements.forEach(el => {
  el.addEventListener('mouseenter', function() {
    this.style.animation = 'glitch 0.5s ease-in-out';
  });
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    hamburger?.classList.remove('active');
    navMenu?.classList.remove('active');
  }
});

// Add Loading Animation
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
  document.querySelectorAll('.fade-in').forEach((el, index) => {
    el.style.opacity = '1';
  });
});

// Cursor Tracking for Premium Feel
const cursorDot = document.createElement('div');
cursorDot.style.position = 'fixed';
cursorDot.style.width = '8px';
cursorDot.style.height = '8px';
cursorDot.style.backgroundColor = 'rgba(0, 217, 255, 0.6)';
cursorDot.style.borderRadius = '50%';
cursorDot.style.pointerEvents = 'none';
cursorDot.style.zIndex = '9999';
cursorDot.style.display = 'none';
document.body.appendChild(cursorDot);

document.addEventListener('mousemove', (e) => {
  cursorDot.style.display = 'block';
  cursorDot.style.left = e.clientX - 4 + 'px';
  cursorDot.style.top = e.clientY - 4 + 'px';
  cursorDot.style.boxShadow = '0 0 15px rgba(0, 217, 255, 0.8)';
});

// Interactive Hover Cards
const contactCards = document.querySelectorAll('.contact-card');
contactCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px) scale(1.02)';
  });

  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Console Welcome Message
console.log('%c🚀 Welcome to Kranthi Reddy\'s Premium Portfolio!', 'font-size: 20px; color: #00d9ff; font-weight: bold; text-shadow: 0 0 10px #00d9ff;');
console.log('%cBuilt with cutting-edge web technologies', 'font-size: 14px; color: #0099ff; font-weight: bold;');
console.log('%cFeel free to open DevTools and explore the code!', 'font-size: 12px; color: #b0b8d4;');

// Prevent Scroll Jank
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateActiveNavLink();
      ticking = false;
    });
    ticking = true;
  }
});

// Add Random Floating Animation Variation
window.addEventListener('load', () => {
  const elements = document.querySelectorAll('.element, .glass-effect');
  elements.forEach(el => {
    el.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
  });
});

// Splash Effect on Contact Cards
document.querySelectorAll('.contact-card').forEach(card => {
  card.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const splash = document.createElement('div');

    splash.style.position = 'absolute';
    splash.style.left = (e.clientX - rect.left) + 'px';
    splash.style.top = (e.clientY - rect.top) + 'px';
    splash.style.width = '20px';
    splash.style.height = '20px';
    splash.style.background = 'radial-gradient(circle, rgba(0, 217, 255, 1), rgba(255, 0, 110, 0.5))';
    splash.style.borderRadius = '50%';
    splash.style.pointerEvents = 'none';
    splash.style.animation = 'splash 0.6s ease-out forwards';

    this.appendChild(splash);

    setTimeout(() => splash.remove(), 600);
  });
});

// Add splash animation
const splashStyle = document.createElement('style');
splashStyle.textContent = `
  @keyframes splash {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(splashStyle);

// Performance Monitor (optional)
if (window.location.hash === '#perf') {
  const perfDiv = document.createElement('div');
  perfDiv.style.position = 'fixed';
  perfDiv.style.bottom = '10px';
  perfDiv.style.right = '10px';
  perfDiv.style.background = 'rgba(0, 217, 255, 0.1)';
  perfDiv.style.border = '1px solid rgba(0, 217, 255, 0.3)';
  perfDiv.style.color = '#00d9ff';
  perfDiv.style.padding = '10px 15px';
  perfDiv.style.borderRadius = '8px';
  perfDiv.style.fontSize = '11px';
  perfDiv.style.fontFamily = 'monospace';
  perfDiv.style.zIndex = '9999';
  perfDiv.style.backdropFilter = 'blur(10px)';

  document.body.appendChild(perfDiv);

  setInterval(() => {
    const perf = performance.memory;
    if (perf) {
      perfDiv.textContent = `Memory: ${(perf.usedJSHeapSize / 1048576).toFixed(1)}MB / ${(perf.jsHeapSizeLimit / 1048576).toFixed(1)}MB`;
    }
  }, 1000);
}
