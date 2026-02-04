// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

$(document).on("turbo:load", function() {
  // Debugging: comprobar que jQuery y el plugin jcarousel están presentes
  try {
    console.log('DEBUG: $ present?', typeof $ !== 'undefined');
    console.log('DEBUG: $.fn.jcarousel present?', typeof $.fn !== 'undefined' && typeof $.fn.jcarousel !== 'undefined');
    console.log('DEBUG: jcarousel elements count', $('.jcarousel').length);

    // Forzar estilos críticos en runtime por si el CSS no se aplica
    $('.jcarousel ul').css({ 'white-space': 'nowrap', 'font-size': '0' });
    $('.jcarousel li').css({ 'display': 'inline-block', 'vertical-align': 'top', 'float': 'none', 'width': '100%' });
  } catch (e) {
    console.error('DEBUG: error applying jcarousel debug styles', e);
  }
  // Cerrar el alert al hacer clic en la X
  $(".close-btn").on("click", function() {
    $("#alert-box").fadeOut();
  });

  // Inicializar carrusel
  $('.jcarousel').jcarousel({
    wrap: 'circular'
  });

  // Controles
  $('.jcarousel-control-prev').jcarouselControl({ target: '-=1' });
  $('.jcarousel-control-next').jcarouselControl({ target: '+=1' });

  // Paginación
  $('.jcarousel-pagination')
    .jcarouselPagination({
      item: function(page) {
        return '<a href="#' + page + '">' + page + '</a>';
      }
    })
    .on('jcarouselpagination:active', 'a', function() {
      $(this).addClass('active');
    })
    .on('jcarouselpagination:inactive', 'a', function() {
      $(this).removeClass('active');
    });
  console.log('DEBUG: jcarousel init complete');

  // Fallback manual animation in case plugin doesn't animate
  (function() {
    var $carousel = $('.jcarousel');
    var $list = $carousel.find('ul');
    var $items = $list.find('li');
    if ($carousel.length === 0 || $items.length === 0) return;

    function setSizes() {
      var containerW = $carousel.innerWidth();
      $items.css({ 'width': containerW + 'px', 'float': 'left', 'display': 'block' });
      $list.css({ 'width': (containerW * $items.length) + 'px', 'position': 'relative', 'left': $list.data('left') || 0 });
    }

    // navigation state
    var index = 0;
    function goTo(i) {
      // wrap circular
      if (i < 0) i = $items.length - 1;
      if (i >= $items.length) i = 0;
      index = i;
      var left = -index * $carousel.innerWidth();
      $list.data('left', left + 'px');
      $list.stop(true).animate({ left: left + 'px' }, 400);
    }

    // Autoplay: avanza automáticamente cada intervalo
    var autoplayInterval = 3000; // ms
    var autoplayTimer = null;
    var autoplayDirection = -1; // -1 for backwards, +1 for forwards
    function startAutoplay() {
      stopAutoplay();
      autoplayTimer = setInterval(function() { goTo(index + autoplayDirection); }, autoplayInterval);
    }
    function stopAutoplay() {
      if (autoplayTimer) { clearInterval(autoplayTimer); autoplayTimer = null; }
    }

    // attach controls
    $carousel.closest('.jcarousel-wrapper').find('.jcarousel-control-prev').on('click', function(e) {
      e.preventDefault();
      goTo(index - 1);
      // set autoplay direction to match click direction
      autoplayDirection = -1;
      startAutoplay();
    });
    $carousel.closest('.jcarousel-wrapper').find('.jcarousel-control-next').on('click', function(e) {
      e.preventDefault();
      goTo(index + 1);
      // set autoplay direction to match click direction
      autoplayDirection = 1;
      startAutoplay();
    });

    // pagination dots (if present)
    $carousel.closest('.jcarousel-wrapper').find('.jcarousel-pagination').on('click', 'a', function(e) {
      e.preventDefault();
      var page = $(this).text();
      var i = parseInt(page, 10) - 1;
      if (!isNaN(i)) goTo(i);
    });

    // responsive
    $(window).on('resize', function() {
      setSizes();
      goTo(index);
    });

    // initial sizing after images load
    var imgs = $items.find('img');
    var loaded = 0;
    if (imgs.length === 0) {
      setSizes();
      // start autoplay once sizes are set
      startAutoplay();
    } else {
      imgs.each(function() {
        if (this.complete) {
          loaded++;
        } else {
          $(this).on('load error', function() { loaded++; if (loaded === imgs.length) setSizes(); });
        }
      });
      if (loaded === imgs.length) { setSizes(); startAutoplay(); }
    }

    // pause on hover (desktop)
    $carousel.closest('.jcarousel-wrapper').on('mouseenter', function() { stopAutoplay(); });
    $carousel.closest('.jcarousel-wrapper').on('mouseleave', function() { startAutoplay(); });
  })();
});
