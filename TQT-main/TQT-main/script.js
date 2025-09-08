// Navbar scroll effect
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  const bestSellers = document.getElementById('best-sellers');
  
  if (window.scrollY > 80) {
    navbar.classList.add('navbar-scrolled');
    bestSellers.classList.add('show');
  } else {
    navbar.classList.remove('navbar-scrolled');
    bestSellers.classList.remove('show');
  }
});

class TeslaCarousel {
  constructor() {
    this.currentSlide = 0;
    this.totalSlides = 4;
    this.autoPlayInterval = null;
    this.isTransitioning = false;
    
    this.track = document.getElementById('carouselTrack');
    this.prevBtn = document.getElementById('prevBtn');
    this.nextBtn = document.getElementById('nextBtn');
    this.indicators = document.querySelectorAll('.indicator');
    this.slides = document.querySelectorAll('.car-slide');
    
    this.init();
  }
  
  init() {
    this.prevBtn.addEventListener('click', () => this.prevSlide());
    this.nextBtn.addEventListener('click', () => this.nextSlide());
    

    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => this.goToSlide(index));
    });
    

    this.startAutoPlay();
    

    const carousel = document.querySelector('.tesla-carousel');
    carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
    carousel.addEventListener('mouseleave', () => this.startAutoPlay());
    

    this.addTouchSupport();
  }
  
  updateCarousel(direction = 'next') {
    if (this.isTransitioning) return;
    
    this.isTransitioning = true;
    
    // Get current active slide
    const currentActiveSlide = document.querySelector('.car-slide.active');
    const nextSlide = this.slides[this.currentSlide];
    
    // Start acceleration animation on current slide
    if (currentActiveSlide && currentActiveSlide !== nextSlide) {
      // Apply direction-specific classes
      if (direction === 'next') {
        currentActiveSlide.classList.add('accelerating-left');
        nextSlide.classList.add('entering-right');
      } else {
        currentActiveSlide.classList.add('accelerating-right');
        nextSlide.classList.add('entering-left');
      }
      
      setTimeout(() => {
        // Update track position
        const translateX = -this.currentSlide * 25;
        this.track.style.transform = `translateX(${translateX}%)`;
        
        // Update active states
        this.slides.forEach((slide, index) => {
          slide.classList.remove('active', 'accelerating-left', 'accelerating-right', 'entering-left', 'entering-right');
          if (index === this.currentSlide) {
            slide.classList.add('active');
            if (direction === 'next') {
              slide.classList.add('entering-right');
            } else {
              slide.classList.add('entering-left');
            }
          }
        });
        
        // Update indicators
        this.indicators.forEach((indicator, index) => {
          indicator.classList.toggle('active', index === this.currentSlide);
        });
        
        // Clean up classes after animation
        setTimeout(() => {
          this.slides.forEach(slide => {
            slide.classList.remove('accelerating-left', 'accelerating-right', 'entering-left', 'entering-right');
          });
          this.isTransitioning = false;
        }, 800);
        
      }, 400); // Wait for acceleration to complete
    } else {
      // First load or same slide
      const translateX = -this.currentSlide * 25;
      this.track.style.transform = `translateX(${translateX}%)`;
      
      this.slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === this.currentSlide);
      });
      
      this.indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === this.currentSlide);
      });
      
      setTimeout(() => {
        this.isTransitioning = false;
      }, 800);
    }
  }
  
  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.updateCarousel();
  }
  
  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.updateCarousel();
  }
  
  goToSlide(index) {
    if (index !== this.currentSlide && !this.isTransitioning) {
      this.currentSlide = index;
      this.updateCarousel();
    }
  }
  
  startAutoPlay() {
    this.stopAutoPlay();
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }
  
  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }
  
  addTouchSupport() {
    let startX = 0;
    let endX = 0;
    
    const carousel = document.querySelector('.tesla-carousel');
    
    carousel.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });
    
    carousel.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      this.handleSwipe(startX, endX);
    });
  }
  
  handleSwipe(startX, endX) {
    const threshold = 50;
    const diff = startX - endX;
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
    }
  }
}

// Global functions
function scrollToCatalog() {
    document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
}

function showContactForm() {
    const contactModal = new bootstrap.Modal(document.getElementById('contactModal'));
    contactModal.show();
}

function submitContactForm() {
    const form = document.getElementById('contactForm');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    const privacy = document.getElementById('privacy');
    
    let isValid = true;
    
    // Reset previous validation states
    form.classList.remove('was-validated');
    
    // Validate first name
    if (!firstName.value.trim()) {
        firstName.classList.add('is-invalid');
        isValid = false;
    } else {
        firstName.classList.remove('is-invalid');
        firstName.classList.add('is-valid');
    }
    
    // Validate last name
    if (!lastName.value.trim()) {
        lastName.classList.add('is-invalid');
        isValid = false;
    } else {
        lastName.classList.remove('is-invalid');
        lastName.classList.add('is-valid');
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value)) {
        email.classList.add('is-invalid');
        isValid = false;
    } else {
        email.classList.remove('is-invalid');
        email.classList.add('is-valid');
    }
    
    // Validate phone
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phone.value.trim() || !phoneRegex.test(phone.value) || phone.value.trim().length < 8) {
        phone.classList.add('is-invalid');
        isValid = false;
    } else {
        phone.classList.remove('is-invalid');
        phone.classList.add('is-valid');
    }
    
    // Validate subject
    if (!subject.value) {
        subject.classList.add('is-invalid');
        isValid = false;
    } else {
        subject.classList.remove('is-invalid');
        subject.classList.add('is-valid');
    }
    
    // Validate message
    if (!message.value.trim() || message.value.trim().length < 10) {
        message.classList.add('is-invalid');
        isValid = false;
    } else {
        message.classList.remove('is-invalid');
        message.classList.add('is-valid');
    }
    
    // Validate privacy checkbox
    if (!privacy.checked) {
        privacy.classList.add('is-invalid');
        isValid = false;
    } else {
        privacy.classList.remove('is-invalid');
        privacy.classList.add('is-valid');
    }
    
    if (isValid) {
        // Simulate form submission
        const submitButton = document.querySelector('#contactModal .modal-footer .btn-primary');
        const originalText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
        submitButton.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            // Hide contact modal
            const contactModal = bootstrap.Modal.getInstance(document.getElementById('contactModal'));
            contactModal.hide();
            
            // Reset form
            form.reset();
            form.classList.remove('was-validated');
            document.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
                el.classList.remove('is-valid', 'is-invalid');
            });
            
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            
            // Show success modal
            const successModal = new bootstrap.Modal(document.getElementById('successModal'));
            successModal.show();
        }, 2000);
    } else {
        form.classList.add('was-validated');
    }
}

document.addEventListener('DOMContentLoaded', function() {
  setTimeout(function () {
    document.getElementById("preloader").style.display = "none";
    document.getElementById("main-content").style.display = "block";
  }, 1500);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Initialize carousel when section becomes visible
        setTimeout(() => {
          new TeslaCarousel();
        }, 500);
        observer.unobserve(entry.target);
      }
    });
  });
  
  const bestSellersSection = document.getElementById('best-sellers');
  if (bestSellersSection) {
    observer.observe(bestSellersSection);
  }
});

