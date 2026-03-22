document.addEventListener('DOMContentLoaded', () => {
    // Fade in animation on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once it has become visible
                // observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Navigation scroll effect
    const nav = document.getElementById('navbar');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('nav-scrolled', 'py-4');
                nav.classList.remove('py-6', 'bg-transparent');
            } else {
                nav.classList.remove('nav-scrolled', 'py-4');
                nav.classList.add('py-6', 'bg-transparent');
            }
        });
    }

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            // Animate items inside slightly if desired
        });
    }

    // Cart notification mock
    const cartBtns = document.querySelectorAll('.add-to-cart');
    const cartCount = document.getElementById('cart-count');
    let count = 0;

    cartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            count++;
            if (cartCount) {
                cartCount.textContent = count;
                cartCount.classList.remove('hidden');
                
                // Pop animation
                cartCount.classList.add('scale-125', 'transition-transform');
                setTimeout(() => {
                    cartCount.classList.remove('scale-125');
                }, 200);
            }
            // Create a small toast notification instead of alert
            showToast('Item added to your cart.');
        });
    });
});

// Simple toast notification function
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-8 right-8 bg-stone-900 text-white px-6 py-3 shadow-lg flex items-center gap-3 z-50 transition-opacity duration-300 transform translate-y-4 opacity-0 font-inter text-sm tracking-wide';
    toast.innerHTML = `
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
        ${message}
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.classList.remove('translate-y-4', 'opacity-0');
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.add('opacity-0');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}
