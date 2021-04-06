$(function () {
  const $body = $('body');
  const $buttonFooter = $('.footer__btn');
  const $formAlert = $('<p class="alert alert_success">Ваша заявка отрпавлена успешно</p>');
  const $formBody = $('.form__body');
  const $menuIcon = $('.header__menu-icon');
  const $nav = $('.nav');
  const $navItem = $('.nav__item');
  const $modalOverlay = $('.modal-overlay');

  function disableScroll() {
    $body.addClass('stop-scrolling');
    $body.bind('touchmove', function (event) {
      event.preventDefault();
    });
  }

  function enableScroll() {
    $body.removeClass('stop-scrolling');
    $body.unbind('touchmove');
  }

  function closeMenu() {
    $menuIcon.removeClass('active');
    $nav.removeClass('open-menu');
    enableScroll();
  }

  function changeButtonFooter() {
    if ($(document).outerWidth() <= 800) {
      $buttonFooter.addClass('btn_big');
    } else {
      $buttonFooter.removeClass('btn_big');
    }
  }

  function showModal(modal) {
    $(modal).fadeIn(600);
    disableScroll();
  }

  function sendForm(form) {
    $.post(
      $(form).attr('action'),
      $(form).serialize(),
      function () {
        $formBody.hide();
        $(form).append($formAlert);
        setTimeout(() => {
          $modalOverlay.fadeOut(400);
          $formAlert.remove();
          $formBody.show();
          $(form).trigger('reset');
          enableScroll();
        }, 2000);
      }
    );
  }

  $menuIcon.on('click', function () {
    $(this).toggleClass('active');
    $nav.toggleClass('open-menu');
    if ($menuIcon.hasClass('active')) {
      disableScroll();
    } else {
      enableScroll();
    }
  });

  $(window).resize(function (event) {
    if (event.target.innerWidth > 1024 && $menuIcon.hasClass('active')) {
      closeMenu();
    }
  });

  $navItem.on('click', function () {
    closeMenu();
  });

  $body.on('click', function (event) {
    if ($nav.hasClass('open-menu')) {
      const $menu = event.target.closest('.open-menu');
      const $icon = event.target.closest('.header__menu-icon');

      if ($menu || $icon) return;

      closeMenu();
    }
  });

  changeButtonFooter();
  $(window).resize(changeButtonFooter);

  $('.callback').on('click', function () {
    showModal('.modal-callback');
  });

  $('.feedback').on('click', function () {
    showModal('.modal-feedback');
  });

  $('.modal__close').on('click', function () {
    $(this).parents('.modal-overlay').fadeOut(400);
    $('.form').trigger('reset');
    enableScroll();
  });

  $modalOverlay.on('click', function (event) {
    const $modal = event.target.closest('.modal');

    if ($modal) return;

    $modalOverlay.fadeOut(400);
    $('.form').trigger('reset');
    enableScroll();
  });

  $('#callback-phone, #feedback-phone').mask('+7 (999) 999-9999');

  $('.callback-form').validate({
    errorElement: 'span',
    focusInvalid: false,
    rules: {
      phone: 'required',
    },
    messages: {
      phone: 'Введите телефон',
    },
    submitHandler(form) {
      sendForm(form);
    }
  });

  $('.feedback-form').validate({
    errorElement: 'span',
    focusInvalid: false,
    rules: {
      phone: 'required',
      email: {
        required: true,
        email: true
      }
    },
    messages: {
      phone: 'Введите телефон',
      email: {
        required: "Введите E-mail",
        email: "E-mail должен быть в формате name@domain.com"
      }
    },
    submitHandler(form) {
      sendForm(form);
    }
  });

  new Swiper('.portfolio__slider', {
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
});
