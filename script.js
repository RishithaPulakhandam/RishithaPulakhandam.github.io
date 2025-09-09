/* Smooth section reveal on scroll, nav highlight, smooth scroll on nav click,
   skill click to filter/open related projects, and project modal handling. */

document.addEventListener('DOMContentLoaded', function () {

  /* ========== Smooth scroll for nav links ========== */
  document.querySelectorAll('.main-nav .nav-link').forEach(link => {
    link.addEventListener('click', function (ev) {
      ev.preventDefault();
      const target = document.getElementById(this.dataset.target);
      if (target) {
        window.scrollTo({ top: target.offsetTop - 72, behavior: 'smooth' });
      }
    });
  });

  /* ========== IntersectionObserver for reveal sections + active nav ========== */
  const sections = document.querySelectorAll('main .section');
  const navLinks = document.querySelectorAll('.main-nav .nav-link');

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show'); // reveal animation
        // set active nav
        const id = entry.target.id;
        navLinks.forEach(a => a.classList.toggle('active', a.dataset.target === id));
      }
    });
  }, { threshold: 0.22 });

  sections.forEach(s => io.observe(s));

  /* ========== Projects modal handling ========== */
  const modalOverlay = document.getElementById('modalOverlay');
  const modals = document.querySelectorAll('.modal');
  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('show');
    modalOverlay.style.opacity = '1';
    modalOverlay.style.visibility = 'visible';
    modalOverlay.setAttribute('aria-hidden', 'false');
    // trap focus (simple)
    const focusable = modal.querySelectorAll('a,button,input,textarea,[tabindex]');
    if (focusable.length) focusable[0].focus();
    document.body.style.overflow = 'hidden';
  }
  function closeModal(modal) {
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
    modal.classList.remove('show');
    modalOverlay.style.opacity = '0';
    modalOverlay.style.visibility = 'hidden';
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  // Open modal when clicking project card
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      // map dataset.project to modal id name
      const key = card.dataset.project;
      // mapping known project ids in HTML
      const map = {
        'proj-motif': 'proj-motif',
        'proj-rnaseq': 'proj-rnaseq',
        'proj-mirna': 'proj-mirna'
      };
      openModal(map[key] || map['proj-motif']);
    });
    // keyboard accessible (Enter)
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') card.click();
    });
  });

  // modal close buttons
  document.querySelectorAll('.modal .modal-close').forEach(btn => {
    const modal = btn.closest('.modal');
    btn.addEventListener('click', () => closeModal(modal));
  });
  // click overlay to close
  modalOverlay.addEventListener('click', () => {
    modals.forEach(m => {
      if (!m.hidden) closeModal(m);
    });
  });

  // Escape key closes open modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modals.forEach(m => {
        if (!m.hidden) closeModal(m);
      });
    }
  });

  /* ========== Skill card interactions ========== */
  // clicking a skill will highlight related project cards (simple filter)
  const skillCells = document.querySelectorAll('.skill-cell');
  const projectCards = document.querySelectorAll('.project-card');

  // small manual mapping of skills -> projects (adjust as you add real tags)
  const skillMap = {
    'Python': ['proj-motif','proj-mirna'],
    'R': ['proj-rnaseq'],
    'Nextflow': ['proj-rnaseq'],
    'RNA-seq': ['proj-rnaseq'],
    'Motif': ['proj-motif'],
    'Viz': ['proj-mirna','proj-rnaseq']
  };

  skillCells.forEach(cell => {
    cell.addEventListener('click', () => {
      const name = cell.dataset.skill;
      const related = skillMap[name] || [];
      // toggle active filter
      const alreadyActive = cell.classList.contains('active-skill');
      skillCells.forEach(c => c.classList.remove('active-skill'));
      projectCards.forEach(p => p.classList.remove('dimmed'));
      if (!alreadyActive) {
        cell.classList.add('active-skill');
        projectCards.forEach(p => {
          if (!related.includes(p.dataset.project)) p.classList.add('dimmed');
        });
        // scroll projects into view
        const projectsSection = document.getElementById('projects');
        projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ========== Simple contact form (client-side only) ========== */
  const contactForm = document.getElementById('contactForm');
  const contactStatus = document.getElementById('contactStatus');

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    // basic client-side validation already via required attributes
    contactStatus.textContent = 'Sending... (demo)';
    contactStatus.classList.remove('muted');
    // Simulate async send
    setTimeout(() => {
      contactStatus.textContent = 'Message sent — thank you! (demo only)';
      contactForm.reset();
    }, 900);
  });

  /* ========== Highlight nav on scroll (improve for small screens) ========== */
  // Already handled in IntersectionObserver above.

});
