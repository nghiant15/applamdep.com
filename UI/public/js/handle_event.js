$(document).ready(function () {
    $(".border-smart-mirror").click(function () {
        $('html,body').animate({
            scrollTop: $("#content_scroll_ID").offset().top
        },
            'slow');
    })

    $(".border-homepage").click(function () {
        $('html,body').animate({
            scrollTop: $("#homepage_scroll_ID").offset().top
        },
            'slow');
    })

    $(".btn-border-common").click(function () {
        $('html,body').animate({
            scrollTop: $(".container").offset().top
        },
            'slow');
    })
})

AOS.init({
    duration: 1500,
    easing: 'ease-in-out-back'
  });
  