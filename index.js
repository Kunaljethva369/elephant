document.addEventListener('DOMContentLoaded',() => {
    // FQA Tab Switch Logic Start
    const tabs = document.querySelectorAll('.navtab');
    const contents = document.querySelectorAll('.content');
    tabs.forEach(tab => {
        tab.addEventListener('click',() => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const target = tab.getAttribute('data-target');
            contents.forEach(content => {
                if (content.id === target) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });
    // FQA Tab Switch Logic ends

    // Bookmark show side Logic Start
    function checkScroll() {
        const nav = document.getElementById('bookmark');
        const firstSection = document.querySelector('.bookmark-section-identifier section');
        const scrollPosition = window.scrollY;
        const firstSectionTop = firstSection.offsetTop;
        const isMobile = window.innerWidth <= 767;

        if (isMobile) {
            if (scrollPosition >= 3000) {
                nav.classList.add('slideDown');
            } else {
                nav.classList.remove('slideDown');
            }
        } else {
            if (scrollPosition >= firstSectionTop) {
                nav.classList.add('slideDown');
            } else {
                nav.classList.remove('slideDown');
            }
        }
    }

    window.addEventListener('scroll',checkScroll);
    window.addEventListener('resize',checkScroll);

    checkScroll();
    // Bookmark show side Logic End

    // Navgivate to Select bookmark logic Start

    const bookmarks = document.querySelectorAll('.bookmarks-list a');
    const sections = document.querySelectorAll('.bookmark-section-identifier section');
    const bookmarkWrapper = document.querySelector('.bookmarks-list');
    const leftArrow = document.querySelector('.bookmarks-left');
    const rightArrow = document.querySelector('.bookmarks-right');

    bookmarks.forEach((bookmark,index) => {
        bookmark.addEventListener('click',(event) => {
            event.preventDefault();
            const targetId = bookmark.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });

            setActiveBookmark(bookmark);
        });
    });

    let scrollTimeout;
    window.addEventListener('scroll',() => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            let currentSectionIndex = 0;

            sections.forEach((section,index) => {
                const sectionTop = section.offsetTop;
                if (window.scrollY >= sectionTop - window.innerHeight / 2) {
                    currentSectionIndex = index;
                }
            });

            setActiveBookmark(bookmarks[currentSectionIndex]);
        },100);
    });

    function setActiveBookmark(activeBookmark) {
        bookmarks.forEach(bookmark => {
            bookmark.classList.remove('active');
        });
        activeBookmark.classList.add('active');
        scrollBookmarkIntoView(activeBookmark);
    }

    function scrollBookmarkIntoView(bookmark) {
        const bookmarkLeft = bookmark.offsetLeft;
        const bookmarkRight = bookmarkLeft + bookmark.clientWidth;
        const wrapperLeft = bookmarkWrapper.scrollLeft;
        const wrapperRight = wrapperLeft + bookmarkWrapper.clientWidth;

        if (bookmarkLeft < wrapperLeft) {
            bookmarkWrapper.scrollTo({ left: bookmarkLeft,behavior: 'smooth' });
        } else if (bookmarkRight > wrapperRight) {
            bookmarkWrapper.scrollTo({ left: bookmarkRight - bookmarkWrapper.clientWidth,behavior: 'smooth' });
        }

        updateArrows();
    }

    leftArrow.addEventListener('click',() => {
        const scrollAmount = bookmarkWrapper.querySelector('li').clientWidth;
        bookmarkWrapper.scrollBy({ left: -scrollAmount,behavior: 'smooth' });
    });

    rightArrow.addEventListener('click',() => {
        const scrollAmount = bookmarkWrapper.querySelector('li').clientWidth;
        bookmarkWrapper.scrollBy({ left: scrollAmount,behavior: 'smooth' });
    });

    bookmarkWrapper.addEventListener('scroll',updateArrows);

    function updateArrows() {
        if (bookmarkWrapper.scrollLeft > 0) {
            leftArrow.style.display = 'flex';
        } else {
            leftArrow.style.display = 'none';
        }

        if (bookmarkWrapper.scrollLeft + bookmarkWrapper.clientWidth < bookmarkWrapper.scrollWidth) {
            rightArrow.style.display = 'flex';
        } else {
            rightArrow.style.display = 'none';
        }
    }

    updateArrows();

    // Navgivate to Select bookmark logic End

    // Carousel Logic Start
    var swiper = new Swiper('.blog-slider',{
        spaceBetween: 30,
        effect: 'fade',
        loop: true,
        autoplay: {
            delay: 4000,
        },
        mousewheel: {
            invert: false,
        },
        pagination: {
            el: '.blog-slider__pagination',
            clickable: true,
        }
    });
    document.querySelector('.blog-slider').addEventListener('mouseenter',function () {
        swiper.autoplay.stop();
    });

    document.querySelector('.blog-slider').addEventListener('mouseleave',function () {
        swiper.autoplay.start();
    });
    // Carousel Logic End
});

// Form Validation Logic Start
function validateEmail() {
    var emailInput = document.getElementById('personal-email');
    var email = emailInput.value.trim();
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        document.querySelector(".error").style.display = 'block';
        emailInput.focus();
        return false;
    } else {
        document.querySelector(".error").style.display = 'none';
        return true;
    }
}

function submitForm(event) {
    event.preventDefault();
    if (validateEmail()) {
        alert("Form submitted!");
    }
}
document.getElementById('personal-email').addEventListener('change',validateEmail);
document.getElementById('emailForm').addEventListener('submit',submitForm);
// Form Validation Logic End