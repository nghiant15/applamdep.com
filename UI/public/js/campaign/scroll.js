const scrollElements = document.querySelectorAll(".js-scroll");

const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;

    return (
        elementTop <=
        (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
};

const elementOutofView = (el) => {
    const elementTop = el.getBoundingClientRect().top;

    return (
        elementTop > (window.innerHeight || document.documentElement.clientHeight)
    );
};

const displayScrollElement = (element) => {
    element.classList.add("scrolled");
};

const hideScrollElement = (element) => {
    element.classList.remove("scrolled");
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 1.25)) {
            displayScrollElement(el);
        } else if (elementOutofView(el)) {
            //   hideScrollElement(el)
        };
    });
};
const backtoTop = document.querySelector(".status-backToTop-campaign"),
    font_nav = document.getElementsByClassName("scroll-nav-font"),
    height_nav = document.getElementsByClassName("scroll-nav-height");
document.body.addEventListener('scroll', () => {
    handleScrollAnimation();
    if (document.body.scrollTop > 1 || document.documentElement.scrollTop > 1) {
        if (font_nav && height_nav) {
            for (let i = 0; i < height_nav.length; i++) {
                height_nav[i].classList.add("nav-height-change");
            };
            for (let i = 0; i < font_nav.length; i++) {
                font_nav[i].classList.add("nav-font-change");
            };
        };
    } else {
        if (font_nav && height_nav) {
            for (let i = 0; i < height_nav.length; i++) {
                // height_nav[i].classList.remove("nav-height-change");
            };
            for (let i = 0; i < font_nav.length; i++) {
                // font_nav[i].classList.remove("nav-font-change");
            };
        };
    }

    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        if (backtoTop) {
            backtoTop.style.display = "block";
        };
    } else {
        if (backtoTop) {
            backtoTop.style.display = "none";
        };
    }
});    