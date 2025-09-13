// Tour Package Website JavaScript

// Smooth scrolling for navigation links
$(document).ready(function() {
    // Smooth scrolling
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if( target.length ) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 70
            }, 1000);
        }
    });

    // Sticky navigation
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    // Mobile menu toggle
    $('.navbar-toggler').click(function() {
        $('.navbar-collapse').toggleClass('show');
    });

    // Statistics counter animation
    function animateCounters() {
        $('.counter').each(function() {
            var $this = $(this);
            var countTo = $this.attr('data-count');
            
            $({ countNum: $this.text() }).animate({
                countNum: countTo
            }, {
                duration: 2000,
                easing: 'linear',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(this.countNum);
                }
            });
        });
    }

    // Trigger counter animation when statistics section is in view
    $(window).scroll(function() {
        var statsSection = $('#statistics');
        if (statsSection.length) {
            var statsTop = statsSection.offset().top;
            var statsHeight = statsSection.outerHeight();
            var windowTop = $(window).scrollTop();
            var windowHeight = $(window).height();
            
            if (windowTop + windowHeight > statsTop && windowTop < statsTop + statsHeight) {
                if (!statsSection.hasClass('animated')) {
                    statsSection.addClass('animated');
                    animateCounters();
                }
            }
        }
    });

    // Scroll reveal animations
    function revealOnScroll() {
        var reveals = $('.reveal');
        
        for (var i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = reveals[i].getBoundingClientRect().top;
            var elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            }
        }
    }

    $(window).scroll(revealOnScroll);
    revealOnScroll(); // Check on load

    // Gallery lightbox functionality
    $('.gallery-item img').click(function() {
        var src = $(this).attr('src');
        var lightbox = '<div class="lightbox"><div class="lightbox-content"><span class="close">&times;</span><img src="' + src + '"></div></div>';
        $('body').append(lightbox);
        $('.lightbox').fadeIn();
    });

    $(document).on('click', '.lightbox .close, .lightbox', function(e) {
        if (e.target === this) {
            $('.lightbox').fadeOut(function() {
                $(this).remove();
            });
        }
    });

    // Contact form submission
    $('#contact-form').submit(function(e) {
        e.preventDefault();
        
        // Get form data
        var name = $('#name').val();
        var email = $('#email').val();
        var phone = $('#phone').val();
        var message = $('#message').val();
        
        // Basic validation
        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Simulate form submission
        $(this).find('button[type="submit"]').text('Sending...').prop('disabled', true);
        
        setTimeout(function() {
            alert('Thank you for your message! We will get back to you soon.');
            $('#contact-form')[0].reset();
            $('#contact-form button[type="submit"]').text('Send Message').prop('disabled', false);
        }, 1500);
    });

    // Package card hover effects
    $('.package-card').hover(
        function() {
            $(this).find('.package-overlay').fadeIn(300);
        },
        function() {
            $(this).find('.package-overlay').fadeOut(300);
        }
    );

    // Testimonial carousel (simple implementation)
    var currentTestimonial = 0;
    var testimonials = $('.testimonial-item');
    var totalTestimonials = testimonials.length;
    
    function showTestimonial(index) {
        testimonials.removeClass('active');
        testimonials.eq(index).addClass('active');
    }
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
        showTestimonial(currentTestimonial);
    }
    
    // Auto-rotate testimonials every 5 seconds
    if (totalTestimonials > 1) {
        setInterval(nextTestimonial, 5000);
    }
    
    // Initialize first testimonial
    if (totalTestimonials > 0) {
        showTestimonial(0);
    }

    // Hero parallax effect
    $(window).scroll(function() {
        var scrolled = $(this).scrollTop();
        var parallax = $('.hero-banner');
        var speed = 0.5;
        
        parallax.css('transform', 'translateY(' + (scrolled * speed) + 'px)');
    });

    // Add loading animation
    $(window).on('load', function() {
        $('.loader').fadeOut();
        $('body').removeClass('loading');
    });
});

// Initialize Google Maps (placeholder function)
function initMap() {
    // This would be replaced with actual Google Maps API integration
    console.log('Google Maps would be initialized here');
    
    // Example coordinates (replace with actual location)
    var location = { lat: 40.7128, lng: -74.0060 };
    
    // Create map (this is just a placeholder)
    if (typeof google !== 'undefined' && google.maps) {
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: location
        });
        
        var marker = new google.maps.Marker({
            position: location,
            map: map,
            title: 'Our Office Location'
        });
    }
}