/* Footer always bottom */
function footerAdj() {
    var footerH = $("footer").outerHeight();
    $("footer").css({ "margin-top": -footerH });
    $(".wrapper").css({ "padding-bottom": footerH });
}
function headerAdj() {
    var headerH = $("header").innerHeight();
    $(".main-content").css({
        "margin-top": headerH
    });
}


//equalHeight
function eqHeight() {
    $.fn.extend({
        equalHeights: function() {
            var top = 0;
            var row = [];
            var classname = ('equalHeights' + Math.random()).replace('.', '');
            $(this).each(function() {
                var thistop = $(this).offset().top;
                if (thistop > top) {
                    $('.' + classname).removeClass(classname);
                    top = thistop;
                }
                $(this).addClass(classname);
                $(this).height('auto');
                var h = (Math.max.apply(null, $('.' + classname).map(function() {
                    return $(this).height();
                }).get()));
                $('.' + classname).height(h);
            }).removeClass(classname);
        }
    });

    $(".news-list .news-detail").equalHeights();
}



$(document).ready(function() {
    footerAdj();
    eqHeight();
    /* Placeholder */
    $("[placeholder]").each(function () {
        $(this).attr("data-placeholder", this.placeholder);

        $(this).bind("focus", function () {
            this.placeholder = "";
        });
        $(this).bind("blur", function () {
            this.placeholder = $(this).attr("data-placeholder");
        });
    });

    // mobile-menu
    $(".nav-icon").on("click", function () {
        $("body").toggleClass("open-menu");
    });

    $(function() {
      var galleryThumbs = new Swiper(".gallery-thumbs", {
        centeredSlides: true,
        centeredSlidesBounds: true, 
        direction: "horizontal",
        slidesPerView: 3,
        freeMode: false,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        watchOverflow: true,
        breakpoints: {
          767: {
            direction: "vertical",
            slidesPerView: 3,
          }
        }
      });
      var galleryTop = new Swiper(".gallery-top", {
        direction: "horizontal",
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        thumbs: {
          swiper: galleryThumbs
        },
      });
      galleryTop.on('slideChangeTransitionStart', function() {
        galleryThumbs.slideTo(galleryTop.activeIndex);
      });
      galleryThumbs.on('transitionStart', function() {
        galleryTop.slideTo(galleryThumbs.activeIndex);
      });
    });


});

$(window).on('load', function() {
    footerAdj();
    eqHeight();
    headerAdj();

    if ($(window).scrollTop() > 20) {
        $(".wrapper").addClass("small-header");
    } else {
        $(".wrapper").removeClass("small-header");
    }
});

$(window).resize(function() {
    footerAdj();
    headerAdj();

    setTimeout(function(){ 
        eqHeight();
    }, 150);
    if ($(window).scrollTop() > 20) {
        $(".wrapper").addClass("small-header");
    } else {
        $(".wrapper").removeClass("small-header");
    }
});

$(window).scroll(function (e) {
    if ($(window).scrollTop() > 20) {
        $(".wrapper").addClass("small-header");
    } else {
        $(".wrapper").removeClass("small-header");
    }
});
