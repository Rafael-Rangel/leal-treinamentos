/** Google Fonts — tipografia industrial Leal */
(function () {
  'use strict';
  if (document.querySelector('link[data-leal-fonts]')) return;
  const fonts = document.createElement('link');
  fonts.rel = 'stylesheet';
  fonts.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@500;600;700&family=Source+Sans+3:wght@400;500;600;700&display=swap';
  fonts.setAttribute('data-leal-fonts', '');
  document.head.appendChild(fonts);
})();
