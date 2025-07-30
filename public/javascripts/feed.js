const navSlide = () => {
    const lines = document.querySelector('.lines');
    const nav = document.querySelector('.navLink');
    
    lines.addEventListener('click',() => {
        nav.classList.toggle('nav-active');
        
    //Line Animation
    lines.classList.toggle('toggle');
    });
   
}

// Navbar hide/show on scroll
const navbarScroll = () => {
    const navbar = document.querySelector('nav');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down - hide navbar
            navbar.classList.add('nav-hidden');
        } else {
            // Scrolling up - show navbar
            navbar.classList.remove('nav-hidden');
        }
        
        lastScrollTop = scrollTop;
    });
}

// Image animation on scroll with staggered delay
const imageAnimation = () => {
    const boxes = document.querySelectorAll('.box');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for pop-up effect
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 100); // 100ms delay between each image
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    boxes.forEach(box => {
        observer.observe(box);
    });
}

// Initialize all functions
navSlide();
navbarScroll();
imageAnimation();