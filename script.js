document.addEventListener('DOMContentLoaded', () => {
    // Correct the ID selector with '#'
    let menuIcon = document.querySelector('#menu-icon'); 
    let navbar = document.querySelector('.navbar');

    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('header nav ul li a');
    const typingElement = document.getElementById('typing');

    // Typing effect variables
    const words = ["Data Analyst","Web Developer","Business Analyst","Machine Learning Engineer","Software Developer", "Researcher"];
    let wordIndex = 0;
    let letterIndex = 0;
    let currentWord = '';
    let currentLetters = '';
    let isDeleting = false;

    // Typing function
    function type() {
        if (isDeleting) {
            currentLetters = currentWord.substring(0, letterIndex - 1);
            letterIndex--;
        } else {
            currentLetters = currentWord.substring(0, letterIndex + 1);
            letterIndex++;
        }

        if (typingElement) {
            typingElement.innerHTML = currentLetters;
        }

        let typeSpeed = 200; // Default speed
        if (isDeleting) {
            typeSpeed /= 2; // Faster deletion
        }

        if (!isDeleting && letterIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && letterIndex === 0) {
            isDeleting = false;
            wordIndex++;
            if (wordIndex === words.length) {
                wordIndex = 0; // Loop back to the first word
            }
            currentWord = words[wordIndex];
            typeSpeed = 500; // Delay before typing the next word
        }

        setTimeout(type, typeSpeed);
    }

    // Start typing effect only if the typing element exists
    if (typingElement) {
        currentWord = words[wordIndex];
        type();
    }

    // Scroll behavior for navigation links
    window.onscroll = () => {
        sections.forEach(sec => {
            let top = window.scrollY;
            let offset = sec.offsetTop - 150;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');

            if (top >= offset && top < offset + height) {
                navLinks.forEach(links => {
                    links.classList.remove('active');
                    let targetLink = document.querySelector('header nav ul li a[href*="' + id + '"]');
                    if (targetLink) {
                        targetLink.classList.add('active');
                    }
                });
            }
        });
    };

    // Check if menuIcon and navbar exist before setting onclick
    if (menuIcon && navbar) {
        menuIcon.onclick = () => {
            menuIcon.classList.toggle('bx-x');
            navbar.classList.toggle('active');
        };
    }
});

