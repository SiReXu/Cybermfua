// Cybermfua — основной скрипт
(function () {
  // Год в футере
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Плавное появление блоков
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  // Анимированные счётчики на главной
  document.querySelectorAll('[data-count]').forEach(function (el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / 1400, 1);
      el.textContent = Math.floor(p * target) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });

  // Фильтр игр (games.html)
  var chips = document.querySelectorAll('.chip[data-filter]');
  var games = document.querySelectorAll('[data-genre]');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var f = chip.getAttribute('data-filter');
      chips.forEach(function (c) { c.classList.toggle('active', c === chip); });
      games.forEach(function (g) {
        g.classList.toggle('is-hidden', f !== 'all' && g.getAttribute('data-genre') !== f);
      });
    });
  });

  // Калькулятор стоимости (prices.html)
  var zone = document.getElementById('calc-zone');
  var hours = document.getElementById('calc-hours');
  var out = document.getElementById('calc-total');
  var hoursOut = document.getElementById('calc-hours-out');
  var note = document.getElementById('calc-note');
  if (zone && hours && out) {
    function calc() {
      var rate = parseInt(zone.value, 10);
      var h = parseInt(hours.value, 10);
      var total = rate * h;
      var text = '';
      if (h >= 5) { total = Math.round(total * 0.85); text = 'Скидка 15% за 5+ часов уже учтена'; }
      else if (h >= 3) { total = Math.round(total * 0.9); text = 'Скидка 10% за 3+ часа уже учтена'; }
      hoursOut.textContent = h;
      out.textContent = total + ' ₽';
      note.textContent = text;
    }
    zone.addEventListener('change', calc);
    hours.addEventListener('input', calc);
    calc();
  }
})();
