$(document).ready(function(){
    $('.slider__inner').slick({
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        variableWidth: true,
        adaptiveHeight: true,
        centerMode: true,
        prevArrow: '<button type="button" class="slick-prev"><img src= "img/icon/left-solid.png"></button>',
        nextArrow:'<button type="button" class="slick-next"><img src= "img/icon/right-solid.png"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                arrows: false,
                dots: true,
                variableWidth: true,
                adaptiveHeight: true,
            }
        },
            {
                breakpoint: 767,
                settings: {
                arrows: false,
                dots: true,
                variableWidth: true,
                adaptiveHeight: true,
            }
        },
        {
            breakpoint: 575,
            settings:"unslick"
        }
        ]
      });

      $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });


function toggleSlide(item) {
    $(item).each(function(i) {
        $(this).on('click', function(e) {
            e.preventDefault();
            $('.catalog__back').eq(i).toggleClass('catalog__back_active');
            $('.catalog__front').eq(i).toggleClass('catalog__front_active');
        })
    });
};
toggleSlide('.catalog__link');
toggleSlide('.catalog__link_back');


//modal

$('[data-modal=consultation]').on('click', function() {
    $('.overlay, #consultation').fadeIn();
});
$('.modal__close').on('click', function() {
    $('.overlay, #consultation, #order, #thanks').fadeOut('slow')
});
$('.catalog__btn').each(function(i) {
    $(this).on('click', function() {
        $('#order .modal__description').text($('.catalog__subtitle').eq(i).text());
        $('.overlay, #order').fadeIn();
    });
});


function validateForms(form) {
    $(form).validate({
        rules: {
            name: 'required',
            phone: 'required',
            email: {
                required: true,
                email: true
            },
        },
        messages: {
            name: "Пожалуйста введите свое имя",
            phone: "Пожалуйста ввeдите свой номер телефона",
            email: {
              required: "пожалуйста введите почту",
              email: " must be in the format of name@domain.com"
            }
          }
    });
}

    validateForms('#consultation__form');
    validateForms('#consultation form');
    validateForms('#order form');


    $('input[name=phone]').mask("+38(999) 999-9999");

    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn();


            $('form').trigger('reset');
        });
        return false;
    });
    $(window).scroll(function(){
        if($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        } 
    });
    $("a[href^='#up']").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
});
new WOW().init();
});

// const slider = tns({
//     container: '.slider__inner',
//     autoplay: false,
//     controls: false
// });
// document.querySelector('.slick-prev').addEventListener('click', function () {
//     slider.goTo('prev')
// });
// document.querySelector('.slick-next').addEventListener('click', function () {
//     slider.goTo('next')
// });
