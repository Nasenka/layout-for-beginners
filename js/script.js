$(function () {
  let $menu = $('.header__menu-icon');
  let $body = $('body');
  let $buttonHeader = $('.header__btn');
  let $buttonFooter = $('.footer__btn');
  let $navItem = $('.nav__item');
  let $formBody = $('.callback-form__body');
  let $formAlert = $('<p class="alert alert_success">Ваша заявка отрпавлена успешно</p>');

  function toggleScroll() {
    if ($menu.hasClass('active')) {
      $body.addClass('stop-scrolling');
      $body.bind('touchmove', function (e) {
        e.preventDefault();
      });
    } else {
      $body.removeClass('stop-scrolling');
      $body.unbind('touchmove');
    }
  }

  $menu.on('click', function () {
    $(this).toggleClass('active');
    $('.nav').toggleClass('open-menu');
    toggleScroll();
  });

  $navItem.on('click', function () {
    if ($(document).outerWidth() <= 1024) {
      $menu.toggleClass('active');
      $('.nav').toggleClass('open-menu');
      $body.removeClass('stop-scrolling');
      $body.unbind('touchmove');
    }
  });

  function changeButtonHeader() {
    if ($(document).outerWidth() <= 600) {
      $buttonHeader.html('<i class="fa fa-phone" aria-hidden="true"></i>');
    } else {
      $buttonHeader.text('Заказать звонок');
    }
  }

  changeButtonHeader();
  $(window).resize(changeButtonHeader);

  function changeButtonFooter() {
    if ($(document).outerWidth() <= 800) {
      $buttonFooter.addClass('btn_big');
    } else {
      $buttonFooter.removeClass('btn_big');
    }
  }

  changeButtonFooter();
  $(window).resize(changeButtonFooter);

  $('[rel=show-popup]').click(function () {
    $('.popup_callback').fadeIn(700);
    $body.append('<div id="overlay"></div>');
    $('#overlay').show().css({
      'filter': 'alpha(opacity=80)'
    });
    return false;
  });

  $('.popup__close').click(function () {
    $(this).parent().fadeOut(500);
    $('#overlay').remove('#overlay');
    return false;
  });

  $('#callback-phone').mask('+7 (999) 999-9999');

  $('.callback-form').submit(function () {
    const $form = $(this);

    $form.find('.form-error').remove();

    if ($form.find('input[name=callback-phone]').val() === '') {
      $form.find('label[for=callback-phone]')
        .prepend('<div class="callback-form__error">Введите телефон</div>');
      return false;
    }

    $.post(
      $form.attr('action'),
      $form.serialize(),
      function () {
        $formBody.hide();
        $form.append($formAlert);
        setTimeout(() => {
          $('.popup').fadeOut(500);
          $('#overlay').remove('#overlay');
          $formAlert.remove();
          $formBody.show();
          $('.callback-form__input').val('');
        }, 2000);
      }
    );

    return false;
  });
});

const swiper = new Swiper('.portfolio__slider', {
  slidesPerView: 1,
  loop: true,
  breakpoints: {
    600: {
      slidesPerView: 2,
      spaceBetween: 35,
    },
    1025: {
      slidesPerView: 3,
      spaceBetween: 30,
    }
  },
  slideClass: 'portfolio__item',
  wrapperClass: 'portfolio__list',
  pagination: {
    el: '.portfolio__pagination',
    type: 'bullets',
    clickable: true,
  },
  navigation: {
    nextEl: '.portfolio__button_next',
    prevEl: '.portfolio__button_prev',
  },
  a11y: {
    prevSlideMessage: 'Предыдущий слайд',
    nextSlideMessage: 'Следующий слайд',
    paginationBulletMessage: 'Слайд №{{index}}',
  },
});
