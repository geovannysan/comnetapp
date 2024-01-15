/*document.addEventListener("DOMContentLoaded", function (event) {
console.log(event)
    const showNavbar = (toggleId, navId, bodyId, headerId) => {
        console(toggleId, navId, bodyId, headerId)
        const toggle = document.getElementById(toggleId),
            nav = document.getElementById(navId),
            bodypd = document.getElementById(bodyId),
            headerpd = document.getElementById(headerId)

        // Validate that all variables exist
        if (toggle && nav && bodypd && headerpd) {
            toggle.addEventListener('click', () => {
                // show navbar
                nav.classList.toggle('show')
                // change icon
                toggle.classList.toggle('bx-x')
                // add padding to body
                bodypd.classList.toggle('body-pd')
                // add padding to header
                headerpd.classList.toggle('body-pd')
            })
        }
    }

    showNavbar('header-toggle', 'nav-bar', 'body-pd', 'header')

    /*===== LINK ACTIVE =====*
    const linkColor = document.querySelectorAll('.nav_link')

    function colorLink() {
        if (linkColor) {
            linkColor.forEach(l => l.classList.remove('active'))
            this.classList.add('active')
        }
    }
    linkColor.forEach(l => l.addEventListener('click', colorLink))

    // Your code to run since DOM is loaded and ready
});*/

$(document).ready(function () {
    $('.slick-carousel').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    centerMode: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    spaceBetween: 10,

                }

            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                }
            }
        ],
        nextArrow: '<div class="swiper-button-next" tabindex="0" role="button" aria-label="Previous slide" aria-controls="swiper-wrapper-b47a45d67edc65b8"></div>',
        prevArrow: '<div class="swiper-button-prev" tabindex="0" role="button" aria-label="Next slide" aria-controls="swiper-wrapper-b47a45d67edc65b8"></div>'
    });
});