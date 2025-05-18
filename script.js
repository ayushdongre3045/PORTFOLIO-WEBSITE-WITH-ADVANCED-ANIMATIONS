
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize header scroll effect
    initHeaderScroll();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize skill progress bars
    initSkillBars();
    
    // Initialize project filters
    initProjectFilters();
    
    // Initialize testimonial slider
    initTestimonialSlider();
    
    // Initialize contact form
    initContactForm();
    
    // Set the current year in the footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Add smooth scrolling to all navigation links
    initSmoothScroll();
  });
  
  // Header scroll effect
  function initHeaderScroll() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      // Update active navigation link based on scroll position
      updateActiveNavLink();
    });
  }
  
  // Mobile menu toggle
  function initMobileMenu() {
    const menuButton = document.querySelector('.mobile-menu-button');
    const nav = document.querySelector('.nav');
    
    menuButton.addEventListener('click', function() {
      nav.classList.toggle('active');
      
      // Toggle menu icon (hamburger/close)
      const spans = menuButton.querySelectorAll('span');
      if (nav.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!menuButton.contains(event.target) && !nav.contains(event.target) && nav.classList.contains('active')) {
        menuButton.click();
      }
    });
    
    // Close mobile menu when window resizes to desktop size
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768 && nav.classList.contains('active')) {
        menuButton.click();
      }
    });
  }
  
  // Update active navigation link based on scroll position
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }
  
  // Animate skill progress bars
  function initSkillBars() {
    const skillSection = document.querySelector('#skills');
    const progressBars = document.querySelectorAll('.skill-progress-bar');
    
    // Function to check if element is in viewport
    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
      );
    }
    
    // Animate skill bars when in viewport
    function animateSkillBars() {
      if (isInViewport(skillSection)) {
        progressBars.forEach((bar, index) => {
          setTimeout(() => {
            const percent = bar.getAttribute('data-percent');
            bar.style.transform = `scaleX(${percent / 100})`;
          }, index * 100);
        });
        // Remove event listener after animation is triggered
        window.removeEventListener('scroll', animateSkillBars);
      }
    }
    
    // Initial check and add scroll listener
    animateSkillBars();
    window.addEventListener('scroll', animateSkillBars);
  }
  
  // Project filtering
  function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-button');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        // Filter projects
        projectCards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 100);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }
  
  // Testimonial slider
  function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    let currentIndex = 0;
    
    function showTestimonial(index) {
      testimonials.forEach(testimonial => testimonial.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      testimonials[index].classList.add('active');
      dots[index].classList.add('active');
      currentIndex = index;
    }
    
    // Next testimonial
    nextButton.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % testimonials.length;
      showTestimonial(currentIndex);
    });
    
    // Previous testimonial
    prevButton.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
      showTestimonial(currentIndex);
    });
    
    // Dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showTestimonial(index);
      });
    });
    
    // Auto slide (optional)
    let interval = setInterval(() => {
      nextButton.click();
    }, 5000);
    
    // Stop auto slide on hover
    const testimonialSlider = document.querySelector('.testimonial-slider');
    testimonialSlider.addEventListener('mouseenter', () => {
      clearInterval(interval);
    });
    
    testimonialSlider.addEventListener('mouseleave', () => {
      interval = setInterval(() => {
        nextButton.click();
      }, 5000);
    });
  }
  
  // Contact form handling
  function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Get form values
      const name = contactForm.querySelector('#name').value;
      const email = contactForm.querySelector('#email').value;
      const subject = contactForm.querySelector('#subject').value;
      const message = contactForm.querySelector('#message').value;
      
      // Simple form validation
      if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
      }
      
      // In a real application, you would send this data to a server
      // For this example, we'll just log it and show a success message
      console.log('Form submitted:', { name, email, subject, message });
      
      // Show success message
      alert('Message sent successfully! I will get back to you soon.');
      
      // Reset form
      contactForm.reset();
    });
  }
  
  // Smooth scrolling for navigation links
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Close mobile menu if open
        const nav = document.querySelector('.nav');
        if (nav.classList.contains('active')) {
          document.querySelector('.mobile-menu-button').click();
        }
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }
  