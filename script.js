const menu = document.querySelector('.menu');
const nav = document.querySelector('.nav nav');

menu?.addEventListener('click', () => {
  nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
  nav.style.position = 'absolute';
  nav.style.top = '72px';
  nav.style.left = '0';
  nav.style.right = '0';
  nav.style.background = '#fff';
  nav.style.padding = '18px 5%';
  nav.style.flexDirection = 'column';
  nav.style.borderBottom = '1px solid #e8edf2';
});

document.addEventListener('DOMContentLoaded', () => {
  const impactSection = document.querySelector('#impact');
  if (!impactSection) return;
  const cards = document.querySelectorAll('.impact-card');
  const counters = document.querySelectorAll('.count');

  let timeouts = [];
  let rafIds = [];

  const cancelAnimations = () => {
    timeouts.forEach(clearTimeout);
    rafIds.forEach(cancelAnimationFrame);
    timeouts = [];
    rafIds = [];
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        cards.forEach(c => c.classList.add('visible'));
        
        counters.forEach((c, i) => {
          const target = +c.getAttribute('data-target');
          const duration = 2000;
          const delay = i * 150;
          
          const timeoutId = setTimeout(() => {
            let start = null;
            const step = (ts) => {
              if (!start) start = ts;
              const prog = Math.min((ts - start) / duration, 1);
              const ease = 1 - Math.pow(1 - prog, 4);
              const curr = Math.floor(ease * target);
              
              if (target === 15000) {
                 c.innerText = curr.toLocaleString('en-IN');
              } else {
                 c.innerText = curr;
              }
              
              if (prog < 1) {
                const rafId = window.requestAnimationFrame(step);
                rafIds.push(rafId);
              } else {
                if (target === 15000) {
                   c.innerText = "15,000";
                } else {
                   c.innerText = target;
                }
              }
            };
            const rafId = window.requestAnimationFrame(step);
            rafIds.push(rafId);
          }, delay);
          timeouts.push(timeoutId);
        });
      } else {
        cancelAnimations();
        cards.forEach(c => c.classList.remove('visible'));
        counters.forEach(c => {
          c.innerText = '0';
        });
      }
    });
  }, { threshold: 0.2 });

  observer.observe(impactSection);
});
