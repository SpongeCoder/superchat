//= helpers/number_format.js
//= helpers/isMobile.js
//= helpers/cloneObj.js
//= helpers/trim.js

//= assets/spoiler.js

//= assets/input/input-focus.js
//= assets/input/input-validate.js
//= assets/input/form-submit.js


/*
 * Слайдер на главной стр.
 */
$('.js-mSlide').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    dots: true,
    autoplaySpeed: 4000,

    prevArrow:  $('.js-mSlide-arrow--left'),
    nextArrow:  $('.js-mSlide-arrow--right'),
    appendDots: $('.js-mSlide-dots')
});