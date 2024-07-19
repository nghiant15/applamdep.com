function initSlider() {
    $('.slick-carousel').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        infinite: false,
        touchThreshold: 1000,
        prevArrow: '<button class="slide-arrow prev-arrow"></button>',
        nextArrow: '<button class="slide-arrow next-arrow"></button>',
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    arrows: false,
                },
            },
        ],
    });
}