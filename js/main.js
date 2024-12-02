(function($) {
    "use strict";

    // Initiate the wowjs
    new WOW().init();


    // Spinner
    var spinner = function() {
        setTimeout(function() {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Sticky Navbar
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });


    // Back to top button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: true,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 24,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            992: {
                items: 2
            }
        }
    });





    // Function to show error
    function showError(element, errorId, message) {
        const errorElement = document.getElementById(errorId);
        if (element.validity.valid) {
            errorElement.classList.add('d-none');
            element.classList.remove('is-invalid');
        } else {
            errorElement.textContent = message;
            errorElement.classList.remove('d-none');
            element.classList.add('is-invalid');
        }
    }

    // Real-time validation for each field
    document.getElementById('name').addEventListener('input', function() {
        showError(this, 'nameError', 'Name is required.');
    });

    document.getElementById('email').addEventListener('input', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        showError(this, 'emailError', emailRegex.test(this.value) ? '' : 'Please enter a valid email address.');
    });

    document.getElementById('phone').addEventListener('input', function() {
        const phoneRegex = /^\d{10}$/;
        showError(this, 'phoneError', phoneRegex.test(this.value) ? '' : 'Please enter a 10-digit phone number.');
    });

    document.getElementById('course').addEventListener('blur', function() {
        showError(this, 'courseError', this.value !== '' ? '' : 'Please select a course.');
    });

    // Submit form if all validations pass
    document.getElementById('feedbackForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const course = document.getElementById('course');

        if (name.validity.valid && email.validity.valid && phone.validity.valid && course.value !== '') {
            alert('Feedback submitted successfully!');
            this.reset();
            document.querySelectorAll('.text-danger').forEach(err => err.classList.add('d-none')); // Hide errors after submission
        }
    });


    // Array of courses (Your provided data)
    const courses = [
        { name: 'Introduction to Computer Science' },
        { name: 'Data Structures and Algorithms' },
        { name: 'Artificial Intelligence' },
        { name: 'Web Development' },
        { name: 'Machine Learning' },
        { name: 'Cloud Computing' },
        { name: 'Cyber Security' },
        { name: 'Blockchain' },
        { name: 'Data Science' },
        { name: 'Database Systems' },
        { name: 'Web Design' },
        { name: 'Mobile App Development' },
        { name: 'Game Development' },
        { name: 'Operating Systems' },
        { name: 'Software Engineering' },
        { name: 'Augmented Reality' },
        { name: 'Virtual Reality' },
        { name: 'Data Analytics' },
        { name: 'Software Testing' },
        { name: 'Digital Marketing' },
        { name: 'Artificial Neural Networks' },
        { name: 'Internet of Things' },
        { name: 'Robotics' },
        { name: 'Ethical Hacking' },
        { name: '5G Technology' },
        { name: 'Quantum Computing' },
        { name: 'Computer Vision' },
        { name: 'Network Security' },
        { name: 'Search Engine Optimization' }
    ];

    // Populate the dropdown menu
    const courseDropdown = document.getElementById('course');

    courses.forEach(course => {
        const option = document.createElement('option');
        option.value = course.name;
        option.textContent = course.name;
        courseDropdown.appendChild(option);
    });



})(jQuery);