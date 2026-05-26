// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('section');

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });

  // Add scrolled class to navbar
  const navbar = document.querySelector('.navbar');
  if (window.pageYOffset > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('scroll-fade');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe skill cards and other elements for animation
document.querySelectorAll('.skill-card, .education-card, .project-card, .timeline-item').forEach(el => {
  observer.observe(el);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      const offset = 70; // navbar height
      const targetPosition = target.offsetTop - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Add animation to hero elements
window.addEventListener('load', () => {
  const heroElements = document.querySelectorAll('.fade-in');
  heroElements.forEach((el, index) => {
    el.style.animationDelay = `${index * 0.2}s`;
  });
});

// Parallax effect for hero section
const hero = document.querySelector('.hero');
if (hero) {
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    hero.style.backgroundPosition = `center ${scrollY * 0.5}px`;
  });
}

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
  const increment = target / (duration / 16);
  let current = 0;

  const counter = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(counter);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.stats');
if (statsSection) {
  const observerStats = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        entry.target.classList.add('animated');
        const statValues = document.querySelectorAll('.stat-item h3');
        statValues.forEach(stat => {
          const target = parseInt(stat.textContent);
          animateCounter(stat, target);
        });
      }
    });
  }, { threshold: 0.5 });

  observerStats.observe(statsSection);
}

// Add class to observe fade-in elements
document.addEventListener('DOMContentLoaded', () => {
  // Animate fade-in elements
  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach((el, index) => {
    el.style.opacity = '1';
  });
});

// Smooth scroll restoration
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

// Analytics tracking (optional - commented out by default)
/*
document.querySelectorAll('a[href^="https"], a[href^="mailto"], a[href^="tel"]').forEach(link => {
  link.addEventListener('click', function() {
    console.log('Link clicked:', this.href);
  });
});
*/

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  }
});

// Print-friendly styles hint
console.log('%cWelcome to Kranthi Reddy\'s Portfolio!', 'font-size: 20px; color: #1f4e79; font-weight: bold;');
console.log('%cFeel free to print this page to PDF (Ctrl+P or Cmd+P)', 'font-size: 14px; color: #666;');
