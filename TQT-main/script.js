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
    
    const currentActiveSlide = document.querySelector('.car-slide.active');
    const nextSlide = this.slides[this.currentSlide];
    
    if (currentActiveSlide && currentActiveSlide !== nextSlide) {
      if (direction === 'next') {
        currentActiveSlide.classList.add('accelerating-left');
        nextSlide.classList.add('entering-right');
      } else {
        currentActiveSlide.classList.add('accelerating-right');
        nextSlide.classList.add('entering-left');
      }
      
      setTimeout(() => {
        const translateX = -this.currentSlide * 25;
        this.track.style.transform = `translateX(${translateX}%)`;
        
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
        
        this.indicators.forEach((indicator, index) => {
          indicator.classList.toggle('active', index === this.currentSlide);
        });
        
        setTimeout(() => {
          this.slides.forEach(slide => {
            slide.classList.remove('accelerating-left', 'accelerating-right', 'entering-left', 'entering-right');
          });
          this.isTransitioning = false;
        }, 800);
        
      }, 400);
    } else {
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
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value)) {
        email.classList.add('is-invalid');
        isValid = false;
    } else {
        email.classList.remove('is-invalid');
        email.classList.add('is-valid');
    }
    
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phone.value.trim() || !phoneRegex.test(phone.value) || phone.value.trim().length < 8) {
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

  const cartModalElement = document.getElementById('cartModal');
  const contactModalElement = document.getElementById('contactModal');
  
  const cartModal = cartModalElement ? new bootstrap.Modal(cartModalElement) : null;
  const contactModal = contactModalElement ? new bootstrap.Modal(contactModalElement) : null;
  
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  const cartCounter = document.getElementById('cart-counter');
  const proceedToQuoteBtn = document.getElementById('proceed-to-quote-btn');
  const cartItemsList = document.getElementById('cart-items-list');

  const updateCartCounter = () => {
    if (!cartCounter) return;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartCounter.textContent = cart.length;

    if (cart.length === 0) {
        cartCounter.classList.add('hidden');
    } else {
        cartCounter.classList.remove('hidden');
    }
  };

  addToCartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      
      const card = event.target.closest('.product-card');
      if (!card) return;

      const product = {
        id: card.dataset.id,
        nombre: card.dataset.nombre,
        precio: parseFloat(card.dataset.precio),
        imagen: card.dataset.imagen,
      };

      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      
      if (cart.find(item => item.id === product.id)) {
        alert('Este vehículo ya está en tu carrito.');
        return;
      }
      
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCounter();
      
      const originalIcon = button.innerHTML;
      button.innerHTML = `<i class="fas fa-check text-success"></i>`;
      setTimeout(() => {
        button.innerHTML = originalIcon;
      }, 1500);
    });
  });

const removeItemFromCart = (productId) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCounter();
    renderCartItems();
};

const renderCartItems = () => {
    if (!cartItemsList) return;
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItemsList.innerHTML = '';

    if (cart.length === 0) {
        cartItemsList.innerHTML = '<p>Tu carrito está vacío.</p>';
        proceedToQuoteBtn.style.display = 'none';
    } else {
        proceedToQuoteBtn.style.display = 'block';
        cart.forEach(product => {
            const itemHTML = `
              <div class="d-flex justify-content-between align-items-center mb-3">
                <div class="d-flex align-items-center">
                  <img src="${product.imagen}" alt="${product.nombre}" style="width: 80px; height: 60px; object-fit: cover; border-radius: 5px;">
                  <div class="ms-3">
                    <h6 class="mb-0">${product.nombre}</h6>
                    <small class="text-muted">$${product.precio.toLocaleString('es-CL')}</small>
                  </div>
                </div>
                <button class="btn btn-sm btn-outline-danger remove-from-cart-btn" data-id="${product.id}">
                    <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            `;
            cartItemsList.innerHTML += itemHTML;
        });

        document.querySelectorAll('.remove-from-cart-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.currentTarget.dataset.id;
                removeItemFromCart(productId);
            });
        });
    }
};

if (cartModalElement) {
    cartModalElement.addEventListener('show.bs.modal', () => {
        renderCartItems();
    });
}

  if (proceedToQuoteBtn) {
    proceedToQuoteBtn.addEventListener('click', () => {
      if(cartModal) cartModal.hide();
      
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      if (cart.length > 0) {
        const productNames = cart.map(product => product.nombre).join(', ');
        showContactForm(); 
        
        setTimeout(() => {
          document.getElementById('subject').value = 'cotizacion';
          document.getElementById('message').value = `Hola, estoy interesado en cotizar el/los siguiente(s) vehículo(s): ${productNames}.`;
        }, 500);
      }
    });
  }

  updateCartCounter();

