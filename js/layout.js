/** Layout compartilhado — header, footer, WhatsApp */
(function () {
  'use strict';

  window.LEAL_SITE = {
    phone: '(21) 96469-2647',
    phoneTel: '+5521964692647',
    whatsapp: '5521964692647',
    email: 'lealtreinamentosltda@gmail.com',
    city: 'Rio de Janeiro, RJ — Centro de Treinamentos Leal',
    waMessage: 'Olá! Gostaria de mais informações sobre os cursos da Leal Treinamentos.',
  };

  const NAV = [
    { href: 'index.html', label: 'Início', key: 'home' },
    { href: 'cursos.html', label: 'Cursos', key: 'cursos' },
    { href: 'corporativo.html', label: 'Corporativo', key: 'corporativo' },
    { href: 'sobre.html', label: 'Sobre Nós', key: 'sobre' },
    { href: 'contato.html', label: 'Contato', key: 'contato' },
  ];

  function navLinks(active) {
    return NAV.map(({ href, label, key }) => {
      const cls = key === active ? 'nav-link active text-sm' : 'nav-link text-sm';
      return `<a class="${cls}" href="${href}">${label}</a>`;
    }).join('');
  }

  function mobileLinks(active) {
    return NAV.map(({ href, label, key }) =>
      `<a href="${href}"${key === active ? ' class="text-yellow-safety"' : ''}>${label}</a>`
    ).join('');
  }

  window.renderLealLayout = function (activePage, opts = {}) {
    const heroMode = opts.heroMode ? ' hero-mode' : '';
    const wa = `https://wa.me/${LEAL_SITE.whatsapp}?text=${encodeURIComponent(LEAL_SITE.waMessage)}`;

    const header = `
      <div id="scroll-progress" aria-hidden="true"></div>
      <header class="glass-header${heroMode} fixed top-0 w-full z-50 px-6 lg:px-20 py-5 transition-all" id="main-header">
        <div class="max-w-content mx-auto flex items-center justify-between">
          <a href="index.html" class="flex items-center gap-3 group">
            <svg class="w-10 h-10 fill-red-alert transition-transform group-hover:scale-110" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
            <div>
              <span class="logo-text font-display text-xl block leading-tight tracking-wider">LEAL</span>
              <span class="logo-sub text-xs tracking-widest uppercase">Treinamentos</span>
            </div>
          </a>
          <nav class="hidden lg:flex items-center gap-10">${navLinks(activePage)}</nav>
          <div class="flex items-center gap-4">
            <a class="hidden sm:inline-flex btn-primary px-6 py-3 text-sm" href="contato.html">Solicitar Orçamento</a>
            <button class="hamburger lg:hidden" id="hamburger" aria-label="Abrir menu" type="button"><span></span><span></span><span></span></button>
          </div>
        </div>
      </header>
      <nav class="mobile-menu" id="mobile-menu" aria-hidden="true">${mobileLinks(activePage)}</nav>`;

    const footer = `
      <footer class="bg-navy text-white pt-20 pb-10">
        <div class="max-w-content mx-auto px-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <div class="flex items-center gap-3 mb-4">
                <svg class="w-8 h-8 fill-red-alert" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
                <span class="font-display text-xl tracking-wider">LEAL</span>
              </div>
              <p class="text-on-dark-muted text-sm leading-relaxed mb-6">Referência em capacitação e segurança do trabalho no Rio de Janeiro. Levando inovação e conhecimento.</p>
            </div>
            <div>
              <h4 class="font-montserrat font-bold mb-6">Links Rápidos</h4>
              <ul class="space-y-3 text-sm">
                ${NAV.map(n => `<li><a class="footer-link" href="${n.href}">${n.label}</a></li>`).join('')}
              </ul>
            </div>
            <div>
              <h4 class="font-montserrat font-bold mb-6">Contato</h4>
              <ul class="space-y-3 text-sm text-on-dark-muted">
                <li><a class="footer-link" href="tel:${LEAL_SITE.phoneTel}">${LEAL_SITE.phone}</a></li>
                <li><a class="footer-link" href="mailto:${LEAL_SITE.email}">${LEAL_SITE.email}</a></li>
                <li>${LEAL_SITE.city}</li>
              </ul>
            </div>
            <div>
              <h4 class="font-montserrat font-bold mb-6">Newsletter</h4>
              <form class="flex gap-2" data-validate-form novalidate>
                <input class="form-input flex-1 text-sm py-2 bg-white/12 border-white/25 text-white placeholder:text-white/55" type="email" data-required placeholder="Seu e-mail">
                <button class="btn-primary px-4 py-2 text-sm relative" type="submit"><span class="btn-text material-symbols-outlined">send</span><span class="btn-spinner"></span></button>
              </form>
              <p class="form-success hidden mt-2 text-green-400 text-xs">Inscrito com sucesso!</p>
            </div>
          </div>
          <div class="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-on-dark-subtle text-xs">
            <span>© 2026 Leal Treinamentos. Todos os direitos reservados.</span>
            <div class="flex flex-wrap gap-4 md:gap-6"><a class="footer-link text-xs" href="privacidade.html">Política de Privacidade</a><a class="footer-link text-xs" href="termos.html">Termos de Uso</a></div>
          </div>
        </div>
      </footer>
      <a class="whatsapp-float" href="${wa}" target="_blank" rel="noopener" aria-label="WhatsApp">
        ${typeof lealWhatsappIcon === 'function' ? lealWhatsappIcon('w-8 h-8') : '<svg class="w-8 h-8 fill-white icon-whatsapp" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>'}
      </a>`;

    const preloader = opts.preloader ? `
      <div id="preloader" aria-hidden="true">
        <div class="preloader-logo">
          <svg class="preloader-shield" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
          <span class="preloader-text">LEAL</span>
        </div>
        <div class="preloader-bar"><div class="preloader-bar-fill"></div></div>
      </div>` : '';

    const h = document.getElementById('site-header');
    const f = document.getElementById('site-footer');
    const p = document.getElementById('site-preloader');
    if (h) h.innerHTML = header;
    if (f) f.innerHTML = footer;
    if (p && opts.preloader) p.innerHTML = preloader;
  };
})();
