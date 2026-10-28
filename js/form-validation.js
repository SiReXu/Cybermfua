// Валидация формы бронирования (contact.html)
(function () {
  var form = document.getElementById('booking-form');
  if (!form) return;
  var status = document.getElementById('form-status');

  var rules = {
    name: function (v) { return v.trim().length >= 2 || 'Введите имя (минимум 2 символа)'; },
    phone: function (v) {
      return /^[+]?[\d\s()-]{10,18}$/.test(v.trim()) || 'Введите корректный номер телефона';
    },
    date: function (v) {
      if (!v) return 'Выберите дату';
      var d = new Date(v + 'T00:00:00');
      var today = new Date(); today.setHours(0, 0, 0, 0);
      return d >= today || 'Дата не может быть в прошлом';
    },
    zone: function (v) { return v !== '' || 'Выберите зону'; },
    message: function (v) { return v.length <= 500 || 'Не более 500 символов'; }
  };

  function validateField(field) {
    var input = field.querySelector('input, select, textarea');
    var rule = rules[input.name];
    if (!rule) return true;
    var res = rule(input.value);
    var ok = res === true;
    field.classList.toggle('invalid', !ok);
    field.querySelector('.error').textContent = ok ? '' : res;
    return ok;
  }

  var dateInput = form.querySelector('input[type="date"]');
  if (dateInput) dateInput.min = new Date().toISOString().split('T')[0];

  form.querySelectorAll('.field').forEach(function (field) {
    field.addEventListener('input', function () {
      if (field.classList.contains('invalid')) validateField(field);
    });
    field.addEventListener('blur', function () { validateField(field); }, true);
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var allOk = true;
    form.querySelectorAll('.field').forEach(function (f) { if (!validateField(f)) allOk = false; });
    if (!allOk) return;
    // Сайт статический, поэтому данные никуда не отправляются — показываем подтверждение
    status.textContent = 'Спасибо, ' + form.name.value.trim() + '! Заявка принята, мы перезвоним для подтверждения брони.';
    status.classList.add('show');
    form.reset();
  });
})();
