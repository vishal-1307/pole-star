/* ==========================================================================
   POLE STAR SCHOOL - CORE CLIENT SCRIPTS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- Sticky Header & Active Navigation Links ---
  const header = document.querySelector('header');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
    
    // Simple active link highlight based on scroll position (if elements are on page)
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= sectionTop - 150) {
        current = section.getAttribute('id');
      }
    });

    if (current) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
          link.classList.add('active');
        }
      });
    }
  });

  // --- Mobile Hamburger Menu ---
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileNavToggle && navMenu) {
    mobileNavToggle.addEventListener('click', () => {
      mobileNavToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
    });

    // Close menu when clicking navigation links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNavToggle.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });
  }

  // --- Scroll Reveal Animation ---
  const revealElements = document.querySelectorAll('.reveal');
  
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Once revealed, no need to track it further
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: activate immediately
    revealElements.forEach(el => el.classList.add('active'));
  }

  // --- Animated Statistics Counter ---
  const counterElements = document.querySelectorAll('.stat-number');
  
  if ('IntersectionObserver' in window && counterElements.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const endValue = parseInt(target.getAttribute('data-target'), 10);
          const duration = 2000; // 2 seconds
          const stepTime = Math.abs(Math.floor(duration / endValue));
          let currentValue = 0;
          
          const timer = setInterval(() => {
            currentValue += Math.ceil(endValue / 50); // Increment
            if (currentValue >= endValue) {
              target.textContent = endValue + (target.getAttribute('data-suffix') || '');
              clearInterval(timer);
            } else {
              target.textContent = currentValue + (target.getAttribute('data-suffix') || '');
            }
          }, 30);
          
          counterObserver.unobserve(target);
        }
      });
    }, { threshold: 0.5 });

    counterElements.forEach(counter => counterObserver.observe(counter));
  } else {
    // Fallback: direct set values
    counterElements.forEach(counter => {
      counter.textContent = counter.getAttribute('data-target') + (counter.getAttribute('data-suffix') || '');
    });
  }

  // --- Hero Image Slider/Carousel ---
  const heroSlides = document.querySelectorAll('.hero-slide');
  if (heroSlides.length > 1) {
    let currentSlide = 0;
    setInterval(() => {
      heroSlides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % heroSlides.length;
      heroSlides[currentSlide].classList.add('active');
    }, 6000); // Change slide every 6 seconds
  }

  // --- Testimonials Slider ---
  const testimonialSlider = document.getElementById('testimonialSlider');
  const sliderDots = document.querySelectorAll('.slider-dot');
  
  if (testimonialSlider && sliderDots.length > 0) {
    sliderDots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        const slideIndex = parseInt(e.target.getAttribute('data-slide'), 10);
        
        // Update dots
        sliderDots.forEach(d => d.classList.remove('active'));
        e.target.classList.add('active');
        
        // Transform slider
        testimonialSlider.style.transform = `translateX(-${slideIndex * 100}%)`;
      });
    });
  }

  // --- FAQ Accordion ---
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const parent = header.parentElement;
      const content = parent.querySelector('.accordion-content');
      const isActive = parent.classList.contains('active');
      
      // Close all other accordions
      document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.accordion-content').style.maxHeight = null;
      });
      
      if (!isActive) {
        parent.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // --- Gallery Lightbox ---
  const galleryItems = document.querySelectorAll('.gallery-item-showcase, .gallery-grid-item');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  if (galleryItems.length > 0 && lightboxModal && lightboxImg) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const captionText = item.getAttribute('data-caption') || img.alt;
        
        lightboxImg.src = img.src;
        lightboxCaption.textContent = captionText;
        lightboxModal.classList.add('open');
        document.body.style.overflow = 'hidden'; // Lock body scroll
      });
    });

    const closeLightbox = () => {
      lightboxModal.classList.remove('open');
      lightboxImg.src = '';
      document.body.style.overflow = '';
    };

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxModal.classList.contains('open')) {
        closeLightbox();
      }
    });
  }

  // --- Admission Enquiry Form Handler ---
  const enquiryForm = document.getElementById('admissionEnquiryForm');
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Basic validations
      const name = document.getElementById('studentName').value.trim();
      const parentName = document.getElementById('parentName').value.trim();
      const phone = document.getElementById('parentPhone').value.trim();
      const grade = document.getElementById('admissionGrade').value;

      if (!name || !parentName || !phone || !grade) {
        alert('Please fill out all mandatory fields.');
        return;
      }

      // Check phone number format (simple 10 digit check)
      if (!/^\d{10}$/.test(phone.replace(/[\s-+]/g, '').slice(-10))) {
        alert('Please enter a valid 10-digit mobile number.');
        return;
      }

      // Successful submission animation
      const cardInner = enquiryForm.parentElement;
      const originalHTML = cardInner.innerHTML;
      
      cardInner.innerHTML = `
        <div class="text-center" style="padding: 2rem 0;">
          <svg style="width: 72px; height: 72px; color: var(--success); margin: 0 auto 1.5rem auto;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <h3 class="enquiry-form-title" style="color: var(--primary-color);">Enquiry Submitted!</h3>
          <p class="enquiry-form-desc" style="margin-bottom: 2rem;">Thank you for your interest in Pole Star School. Our admissions counselor will call you at <strong>${phone}</strong> within 24 hours.</p>
          <button class="btn btn-outline" id="resetEnquiryBtn">Submit Another Enquiry</button>
        </div>
      `;

      document.getElementById('resetEnquiryBtn').addEventListener('click', () => {
        cardInner.innerHTML = originalHTML;
        // Rebind handler recursively
        location.reload();
      });
    });
  }

  // --- Floating AI Admission Assistant (Simulated) ---
  const assistantBtn = document.getElementById('assistantBtn');
  const chatbox = document.getElementById('assistantChatbox');
  const chatboxBody = document.getElementById('chatboxBody');
  const chatboxInput = document.getElementById('chatboxInput');
  const chatboxSend = document.getElementById('chatboxSend');

  if (assistantBtn && chatbox && chatboxBody && chatboxInput && chatboxSend) {
    
    // Toggle chatbox visibility
    assistantBtn.addEventListener('click', () => {
      chatbox.classList.toggle('open');
      // Hide badge
      const badge = assistantBtn.querySelector('.floating-assistant-badge');
      if (badge) badge.style.display = 'none';
      
      // Auto-focus input
      if (chatbox.classList.contains('open')) {
        chatboxInput.focus();
      }
    });

    const appendMessage = (text, sender) => {
      const msg = document.createElement('div');
      msg.className = `chatbox-msg ${sender}`;
      msg.textContent = text;
      chatboxBody.appendChild(msg);
      chatboxBody.scrollTop = chatboxBody.scrollHeight;
    };

    const handleUserMessage = () => {
      const query = chatboxInput.value.trim();
      if (!query) return;

      appendMessage(query, 'outgoing');
      chatboxInput.value = '';

      // Simulate bot typing delay
      setTimeout(() => {
        let reply = "I'm sorry, I didn't quite catch that. You can call our admission desk directly at +91 7541810409 or email us at polestarschool@yahoo.co.in.";
        const lowercaseQuery = query.toLowerCase();

        if (lowercaseQuery.includes('admission') || lowercaseQuery.includes('apply') || lowercaseQuery.includes('fees')) {
          reply = "Admissions are currently open for classes Nursery to 11th for the 2025-2026 session. You can fill out the enquiry form on our 'Admissions' page, or download the Admission Form directly from the 'Downloads' section.";
        } else if (lowercaseQuery.includes('hostel') || lowercaseQuery.includes('boarding') || lowercaseQuery.includes('stay')) {
          reply = "Pole Star School offers excellent day-boarding and full-boarding hostel options for both boys and girls with safe, secure, and modern amenities.";
        } else if (lowercaseQuery.includes('location') || lowercaseQuery.includes('where') || lowercaseQuery.includes('address')) {
          reply = "We are located at Jeewachh Chowk, Sapta, Madhubani, Bihar - 847214. Feel free to explore the interactive Google Map in our Contact section!";
        } else if (lowercaseQuery.includes('cbse') || lowercaseQuery.includes('affiliation') || lowercaseQuery.includes('disclosure')) {
          reply = "Yes, we are affiliated with the CBSE Board up to +2 level (Affiliation No. 330199). All mandatory disclosure documents are available on our 'CBSE Disclosure' page.";
        } else if (lowercaseQuery.includes('hello') || lowercaseQuery.includes('hi') || lowercaseQuery.includes('hey')) {
          reply = "Hello! I am your Pole Star Admissions Assistant. How can I help you today? You can ask me about admissions, hostel facilities, fees, location, or school timings.";
        }

        appendMessage(reply, 'incoming');
      }, 800);
    };

    chatboxSend.addEventListener('click', handleUserMessage);
    chatboxInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        handleUserMessage();
      }
    });

    // Close chatbox when clicking outside (mobile convenience)
    document.addEventListener('click', (e) => {
      if (!chatbox.contains(e.target) && !assistantBtn.contains(e.target) && chatbox.classList.contains('open')) {
        chatbox.classList.remove('open');
      }
    });
  }

  // --- Mobile Navigation Dropdowns Accordion ---
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const parent = toggle.parentElement;
        parent.classList.toggle('open');
      }
    });
  });

});

