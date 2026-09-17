/**
 * ============================================================================
 * PORTFOLITE / VINAY GHAI EXACT CLONE - GSAP & INTERACTIVE SCRIPTS
 * For Vivek Kumar Rai - Flutter & Android Developer
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // Register GSAP plugins
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // 1. GSAP Custom Cursor Dot & Magnetic Aura Follower
  const cursorDot = document.getElementById('cursorDot');
  const cursorAura = document.getElementById('cursorAura');

  if (cursorDot && cursorAura && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      gsap.to(cursorDot, {
        x: mouseX,
        y: mouseY,
        duration: 0.08,
        ease: 'power2.out',
        overwrite: 'auto'
      });

      gsap.to(cursorAura, {
        x: mouseX,
        y: mouseY,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    });

    // Expand cursor on interactive links and buttons
    const interactives = document.querySelectorAll('a, button, .tilt-card, .accordion-header, input, textarea');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        gsap.to(cursorAura, {
          scale: 1.6,
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          borderColor: 'rgba(255, 255, 255, 0.6)',
          duration: 0.25
        });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(cursorAura, {
          scale: 1,
          backgroundColor: 'rgba(255, 255, 255, 0.04)',
          borderColor: 'rgba(255, 255, 255, 0.35)',
          duration: 0.25
        });
      });
    });
  }

  // 2. 3D Card Tilt Effect on Mouse Move with GSAP
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 1000,
        ease: 'power1.out',
        duration: 0.3
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        ease: 'power2.out',
        duration: 0.5
      });
    });

    // If card has data-url and user clicked anywhere on card (not directly on link)
    card.addEventListener('click', (e) => {
      if (!e.target.closest('a')) {
        const url = card.getAttribute('data-url');
        if (url) {
          window.open(url, '_blank', 'noopener,noreferrer');
        }
      }
    });
  });

  // 3. Smooth GSAP Scroll Down Motion on Scroll Indicator & 'View Projects'
  const scrollCue = document.querySelector('.hero-scroll-indicator');
  const viewProjectsBtn = document.querySelector('.hero-cta-buttons a[href="#projects"]');
  
  const scrollToProjects = (e) => {
    if (e) e.preventDefault();
    const target = document.getElementById('projects');
    if (target) {
      const targetPos = target.getBoundingClientRect().top + window.pageYOffset - 70;
      window.scrollTo({
        top: targetPos,
        behavior: 'smooth'
      });
    }
  };

  if (scrollCue) {
    scrollCue.style.cursor = 'pointer';
    scrollCue.addEventListener('click', scrollToProjects);
  }
  if (viewProjectsBtn) {
    viewProjectsBtn.addEventListener('click', scrollToProjects);
  }

  // 4. GSAP ScrollTrigger Animations for headings & cards
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.utils.toArray('.section-title-large, .case-study-hero-title, .section-headline').forEach((title) => {
      gsap.from(title, {
        scrollTrigger: {
          trigger: title,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 35,
        duration: 0.8,
        ease: 'power3.out'
      });
    });

    gsap.utils.toArray('.bento-quad-card, .decision-card, .service-bento-card, .mobile-bento-card').forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 98%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay: (index % 3) * 0.1,
        ease: 'power2.out',
        clearProps: 'all'
      });
    });
  }

  // 5. Project Filter Switcher Pill (All Projects vs Major Projects)
  const filterBtns = document.querySelectorAll(".filter-btn");
  const carouselCards = document.querySelectorAll(".carousel-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      carouselCards.forEach((card) => {
        const category = card.getAttribute("data-category") || "";
        const isMatch = filterValue === "all" || category.includes(filterValue);

        gsap.killTweensOf(card);
        if (isMatch) {
          card.style.display = "flex";
          gsap.to(card, {
            opacity: 1,
            scale: 1,
            duration: 0.35,
            ease: "power2.out",
            clearProps: "transform"
          });
        } else {
          gsap.to(card, {
            opacity: 0,
            scale: 0.85,
            duration: 0.28,
            ease: "power2.in",
            onComplete: () => {
              card.style.display = "none";
            }
          });
        }
      });
    });
  });

  // Mobile Navigation Drawer Toggle Logic
  const mobileNavToggle = document.getElementById("mobileNavToggle");
  const mobileNavDrawer = document.getElementById("mobileNavDrawer");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  if (mobileNavToggle && mobileNavDrawer) {
    const toggleMobileMenu = () => {
      const isOpen = mobileNavDrawer.classList.toggle("active");
      mobileNavToggle.classList.toggle("active", isOpen);
      mobileNavToggle.setAttribute("aria-expanded", isOpen);
      mobileNavDrawer.setAttribute("aria-hidden", !isOpen);
    };

    const closeMobileMenu = () => {
      mobileNavDrawer.classList.remove("active");
      mobileNavToggle.classList.remove("active");
      mobileNavToggle.setAttribute("aria-expanded", "false");
      mobileNavDrawer.setAttribute("aria-hidden", "true");
    };

    mobileNavToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });

    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        closeMobileMenu();
      });
    });

    // Close when clicking outside header
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".site-header") && mobileNavDrawer.classList.contains("active")) {
        closeMobileMenu();
      }
    });
  }

  // 6. FAQ Accordion Expand / Collapse
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach((header) => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isOpen = item.classList.contains('active');

      document.querySelectorAll('.accordion-item').forEach((i) => i.classList.remove('active'));

      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });

  // 7. Contact Modal Open / Close Logic
  const contactModal = document.getElementById('contactModalOverlay');
  const openModalBtns = document.querySelectorAll('.open-contact-modal');
  const closeModalBtn = document.getElementById('modalCloseBtn');

  const openModal = () => {
    if (contactModal) {
      contactModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    if (contactModal) {
      contactModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  openModalBtns.forEach((btn) => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  }));

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (contactModal) {
    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) {
        closeModal();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && contactModal && contactModal.classList.contains('active')) {
      closeModal();
    }
  });

  // 8. Contact Form Handling (Direct mailto & instant feedback)
  const contactForm = document.getElementById('modalContactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = contactForm.querySelector('input[type="text"]');
      const emailInput = contactForm.querySelector('input[type="email"]');
      const msgInput = contactForm.querySelector('textarea');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const message = msgInput ? msgInput.value.trim() : '';

      const recipient = 'vivekkumar620166@gmail.com';
      const subject = encodeURIComponent(`Portfolio Inquiry from ${name || 'Recruiter / Client'}`);
      const body = encodeURIComponent(`Hi Vivek,

Name: ${name}
Email: ${email}

Message:
${message}

Sent via Portfolio Website`);

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.innerHTML = '<span>Drafting Email... <i class="fas fa-check"></i></span>';
      submitBtn.style.background = '#10b981';
      submitBtn.style.color = '#ffffff';

      // Launch mail client
      window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;

      setTimeout(() => {
        closeModal();
        submitBtn.innerHTML = '<span>Send Message</span> <i class="fas fa-paper-plane"></i>';
        submitBtn.style.background = '';
        submitBtn.style.color = '';
        contactForm.reset();
      }, 1800);
    });
  }

  // 9. Interactive Flagship Mobile App Showcase Switcher
  const flagshipTabs = document.querySelectorAll('.flagship-tab-btn');
  const flagshipImg = document.getElementById('flagshipActiveImg');
  const flagshipTitle = document.getElementById('flagshipTitle');
  const flagshipDesc = document.getElementById('flagshipDesc');
  const flagshipYear = document.getElementById('flagshipYear');

  const appsData = {
    pharma: {
      title: 'PharmaHopers B2B Portal',
      year: '2026',
      desc: "India's leading B2B pharma marketplace app connecting 500+ verified pharma companies with instant lead distribution, credit balance tracking, and real-time trade inquiries.",
      img: 'assets/images/projects/pharmahopers-app.png'
    },
    pcd: {
      title: 'PCD Suites CRM',
      year: '2025',
      desc: "Field pharma sales & MR CRM automation app featuring real-time attendance clock-in, shift management, doctor order collection, and sales performance analytics.",
      img: 'assets/images/projects/pcdsuites-app.png'
    },
    localride: {
      title: 'Local Ride Canada',
      year: '2025',
      desc: "Autonomous taxi and mobility platform with real-time GPS fleet tracking, instant fare calculation, biometric driver onboarding, and WebSocket live ride dispatch.",
      img: 'assets/images/projects/localride-app.png'
    },
    glopetra: {
      title: 'GloPetra Skincare',
      year: '2024',
      desc: "Dermascience e-commerce mobile application featuring personalized skincare regimens, instant cart checkout, Razorpay payment gateway, and animated product carousels.",
      img: 'assets/images/projects/glopetra-app.png'
    }
  };

  if (flagshipTabs.length > 0 && flagshipImg) {
    flagshipTabs.forEach(btn => {
      btn.addEventListener('click', () => {
        flagshipTabs.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const appKey = btn.getAttribute('data-app');
        const data = appsData[appKey];
        if (data) {
          gsap.to(flagshipImg, {
            opacity: 0,
            scale: 0.95,
            duration: 0.18,
            onComplete: () => {
              flagshipImg.src = data.img;
              if (flagshipTitle) flagshipTitle.textContent = data.title;
              if (flagshipDesc) flagshipDesc.textContent = data.desc;
              if (flagshipYear) flagshipYear.textContent = data.year;
              gsap.to(flagshipImg, { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' });
            }
          });
        }
      });
    });
  }


  // 10. Dual Flagship Portals (PharmaHopers & PCD Suites) displayed simultaneously side-by-side


  // 10. System Design & Architecture Multi-View Switcher
  const sysTabBtns = document.querySelectorAll('.sys-tab-btn');
  const sysViewCards = document.querySelectorAll('.sys-view-card');

  sysTabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      sysTabBtns.forEach((b) => b.classList.remove('active'));
      sysViewCards.forEach((card) => card.classList.remove('active'));

      btn.classList.add('active');
      const targetView = btn.getAttribute('data-view');
      const activeCard = document.getElementById(`view-${targetView}`);
      if (activeCard) {
        activeCard.classList.add('active');
      }
    });
  });

  // Deep linking or query-param support for automated verification & sharing
  const urlParams = new URLSearchParams(window.location.search);
  const tabParam = urlParams.get('tab') || (window.location.hash ? window.location.hash.replace('#', '') : null);
  if (tabParam) {
    const targetBtn = document.querySelector(`.sys-tab-btn[data-view="${tabParam}"]`);
    if (targetBtn) {
      targetBtn.click();
    }
  }


  // 11. Architecture Diagram Fullscreen Lightbox Modal
  const diagLightbox = document.getElementById('diagLightboxOverlay');
  const diagLightboxImg = document.getElementById('diagLightboxImg');
  const diagLightboxTitle = document.getElementById('diagLightboxTitle');
  const diagLightboxCaption = document.getElementById('diagLightboxCaption');
  const diagLightboxClose = document.getElementById('diagLightboxClose');
  const diagFrames = document.querySelectorAll('.arch-diagram-img-frame');

  if (diagLightbox && diagFrames.length > 0) {
    const openDiagLightbox = (frame) => {
      const src = frame.getAttribute('data-diag-src') || frame.querySelector('img')?.src;
      const title = frame.getAttribute('data-diag-title') || 'Architecture Diagram';
      const caption = frame.getAttribute('data-diag-caption') || '';

      if (diagLightboxImg && src) {
        diagLightboxImg.src = src;
        if (diagLightboxTitle) diagLightboxTitle.textContent = title;
        if (diagLightboxCaption) diagLightboxCaption.textContent = caption;
        diagLightbox.classList.add('active');
        diagLightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    };

    const closeDiagLightbox = () => {
      diagLightbox.classList.remove('active');
      diagLightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (diagLightboxImg) diagLightboxImg.src = '';
    };

    diagFrames.forEach((frame) => {
      frame.addEventListener('click', () => openDiagLightbox(frame));
    });

    if (diagLightboxClose) {
      diagLightboxClose.addEventListener('click', closeDiagLightbox);
    }

    diagLightbox.addEventListener('click', (e) => {
      if (e.target === diagLightbox || e.target.classList.contains('diag-lightbox-container')) {
        closeDiagLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && diagLightbox.classList.contains('active')) {
        closeDiagLightbox();
      }
    });
  }

  // 12. Theme Switcher Logic (Dark Mode <-> Light Mode)
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeToggleIcon = document.getElementById('themeToggleIcon');

  const updateThemeUI = (theme) => {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      if (themeToggleIcon) {
        themeToggleIcon.className = 'fas fa-moon';
      }
      if (themeToggleBtn) {
        themeToggleBtn.setAttribute('title', 'Switch to Dark Theme');
        themeToggleBtn.setAttribute('aria-label', 'Switch to Dark Theme');
      }
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (themeToggleIcon) {
        themeToggleIcon.className = 'fas fa-sun';
      }
      if (themeToggleBtn) {
        themeToggleBtn.setAttribute('title', 'Switch to Light Theme');
        themeToggleBtn.setAttribute('aria-label', 'Switch to Light Theme');
      }
    }
  };

  // Initialize theme based on current attribute or localStorage (default dark)
  const urlParamsTheme = new URLSearchParams(window.location.search).get('theme');
  const currentTheme = urlParamsTheme || localStorage.getItem('theme') || document.documentElement.getAttribute('data-theme') || 'dark';
  updateThemeUI(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const nextTheme = activeTheme === 'light' ? 'dark' : 'light';
      try {
        localStorage.setItem('theme', nextTheme);
      } catch (e) {}
      updateThemeUI(nextTheme);
    });
  }
});
