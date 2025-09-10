window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  const bestSellers = document.getElementById('best-sellers');
  
  if (window.scrollY > 80) {
    if (navbar) {
      navbar.classList.add('navbar-scrolled');
    }
    if (bestSellers) {
      bestSellers.classList.add('show');
    }
  } else {
    if (navbar) {
      navbar.classList.remove('navbar-scrolled');
    }
    if (bestSellers) {
      bestSellers.classList.remove('show');
    }
  }
});

class TeslaCarousel {
  constructor() {
    this.currentSlide = 0;
    this.totalSlides = 4;
    this.autoPlayInterval = null;
    
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
  }
  
  updateCarousel() {
    const translateX = -this.currentSlide * 25;
    this.track.style.transform = `translateX(${translateX}%)`;
    
    this.slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === this.currentSlide);
    });
    
    this.indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === this.currentSlide);
    });
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
    if (index !== this.currentSlide) {
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
}

function showContactForm() {
    const contactModalElement = document.getElementById('contactModal');
    if (contactModalElement) {
        const contactModal = new bootstrap.Modal(contactModalElement);
        contactModal.show();
    }
}

function submitContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    const privacy = document.getElementById('privacy');
    
    let isValid = true;    

    form.classList.remove('was-validated');    

    if (!firstName.value.trim()) {
        firstName.classList.add('is-invalid');
        isValid = false;
    } else {
        firstName.classList.remove('is-invalid');
        firstName.classList.add('is-valid');
    }    

    if (!lastName.value.trim()) {
        lastName.classList.add('is-invalid');
        isValid = false;
    } else {
        lastName.classList.remove('is-invalid');
        lastName.classList.add('is-valid');
    }    

    // Fuente regex:  https://regex101.com/library/SOgUIV
    const duoc = 'duocuc.cl';
    const duoc2 = 'profesor.duoc.cl';
    const gmail = 'gmail.com';
    if (!email.value.includes(duoc) && !email.value.includes(duoc2) && !email.value.includes(gmail)) {
        email.classList.add('is-invalid');
        isValid = false;
    } else {
        email.classList.remove('is-invalid');
        email.classList.add('is-valid');
    }

    if (!phone.value.trim() || phone.value.trim().length < 8) {
        phone.classList.add('is-invalid');
        isValid = false;
    } else {
        phone.classList.remove('is-invalid');
        phone.classList.add('is-valid');
    }    

    if (!subject.value) {
        subject.classList.add('is-invalid');
        isValid = false;
    } else {
        subject.classList.remove('is-invalid');
        subject.classList.add('is-valid');
    }    

    if (!message.value.trim() || message.value.trim().length < 10) {
        message.classList.add('is-invalid');
        isValid = false;
    } else {
        message.classList.remove('is-invalid');
        message.classList.add('is-valid');
    }
    

    if (!privacy.checked) {
        privacy.classList.add('is-invalid');
        isValid = false;
    } else {
        privacy.classList.remove('is-invalid');
        privacy.classList.add('is-valid');
    }
    
    if (isValid) {
    
        const submitButton = document.querySelector('#contactModal .modal-footer .btn-primary');
        const originalText = submitButton.innerHTML;
        

        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
        submitButton.disabled = true;
        

        setTimeout(() => {

            const contactModal = bootstrap.Modal.getInstance(document.getElementById('contactModal'));
            contactModal.hide();
            

            form.reset();
            form.classList.remove('was-validated');
            document.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
                el.classList.remove('is-valid', 'is-invalid');
            });
            

            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            

            const successModalElement = document.getElementById('successModal');
            if (successModalElement) {
                const successModal = new bootstrap.Modal(successModalElement);
                successModal.show();
            }
        }, 2000);
    } else {
        form.classList.add('was-validated');
    }
}
  


// Simular pre-carga
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(function () {
    const preloader = document.getElementById("preloader");
    const mainContent = document.getElementById("main-content");
    
    if (preloader) {
      preloader.style.display = "none";
    }
    if (mainContent) {
      mainContent.style.display = "block";
    }
  }, 1500);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
      
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


// Exporta funcion para ocupar en el otro archivo
window.submitContactForm = submitContactForm;


