const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// function to set theme based on current state
function setTheme(isDark) {
  if (isDark) {
    body.classList.add('dark');
  } else {
    body.classList.remove('dark');
  }
  // store user preference
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// init theme from localStorage or system preference
function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme === 'dark');
  } else {
    // check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark);
  }
}
loadTheme();

// toggle on button click
themeToggle.addEventListener('click', () => {
  const isDark = body.classList.contains('dark');
  setTheme(!isDark);
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === "#" || href === "") return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault(); // prevent only if target exists (smooth + offset)
      const headerOffset = 80; 
      const elementPosition = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - headerOffset,
        behavior: 'smooth'
      });
    }
  });
});


const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // optional: unobserve after animation to reduce load
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -20px 0px' }); // subtle trigger

fadeElements.forEach(el => observer.observe(el));


const contactBtn = document.getElementById('contact-submit-btn');
const feedbackPara = document.getElementById('form-feedback');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

contactBtn.addEventListener('click', (e) => {
  e.preventDefault();

 
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  if (!name || !email || !message) {
    feedbackPara.textContent = '⚠️ all fields required (demo).';
    feedbackPara.style.color = 'var(--accent)';
    return;
  }
  if (!email.includes('@') || !email.includes('.')) {
    feedbackPara.textContent = '📧 enter a valid email address.';
    feedbackPara.style.color = 'var(--accent)';
    return;
  }

  feedbackPara.textContent = '✨ thanks! (this is a frontend demo — no data sent)';
  feedbackPara.style.color = 'var(--accent)';
  
});

[nameInput, emailInput, messageInput].forEach(input => {
  input.addEventListener('input', () => {
    feedbackPara.textContent = '';
  });
});