/** Banner de cookies — conformidade LGPD (Lei nº 13.709/2018) */
(function () {
  'use strict';

  var STORAGE_KEY = 'leal_cookie_consent';
  var CONSENT_VERSION = '1.0';

  var DEFAULT_PREFS = {
    version: CONSENT_VERSION,
    necessary: true,
    analytics: false,
    marketing: false,
    timestamp: null,
  };

  function getConsent() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var data = JSON.parse(raw);
      if (data.version !== CONSENT_VERSION) return null;
      return data;
    } catch (e) {
      return null;
    }
  }

  function saveConsent(prefs) {
    prefs.version = CONSENT_VERSION;
    prefs.timestamp = new Date().toISOString();
    prefs.necessary = true;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    window.dispatchEvent(new CustomEvent('leal:consent', { detail: prefs }));
    hideBanner();
    updateFab();
  }

  function hideBanner() {
    var banner = document.getElementById('cookie-banner');
    var panel = document.getElementById('cookie-panel');
    if (banner) banner.classList.remove('is-visible');
    if (panel) panel.classList.remove('is-open');
    document.body.classList.remove('cookie-panel-open');
  }

  function showBanner() {
    var banner = document.getElementById('cookie-banner');
    if (banner) banner.classList.add('is-visible');
  }

  function updateFab() {
    var fab = document.getElementById('cookie-fab');
    if (!fab) return;
    fab.classList.toggle('is-visible', !!getConsent());
  }

  function buildUI() {
    if (document.getElementById('cookie-banner')) return;

    var wrap = document.createElement('div');
    wrap.innerHTML =
      '<div id="cookie-banner" class="cookie-banner" role="dialog" aria-labelledby="cookie-banner-title" aria-describedby="cookie-banner-desc" aria-hidden="true">' +
        '<div class="cookie-banner-inner">' +
          '<div class="cookie-banner-text">' +
            '<p id="cookie-banner-title" class="cookie-banner-title">Privacidade e cookies</p>' +
            '<p id="cookie-banner-desc" class="cookie-banner-desc">Utilizamos cookies necessários para o funcionamento do site e, com o seu consentimento, cookies analíticos e de marketing para melhorar a sua experiência. Você pode aceitar, recusar ou personalizar suas preferências conforme a <a href="privacidade.html">Política de Privacidade</a> e a LGPD.</p>' +
          '</div>' +
          '<div class="cookie-banner-actions">' +
            '<button type="button" class="cookie-btn cookie-btn-ghost" id="cookie-btn-preferences">Personalizar</button>' +
            '<button type="button" class="cookie-btn cookie-btn-outline" id="cookie-btn-reject">Recusar opcionais</button>' +
            '<button type="button" class="cookie-btn cookie-btn-primary" id="cookie-btn-accept">Aceitar todos</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div id="cookie-panel" class="cookie-panel" role="dialog" aria-labelledby="cookie-panel-title" aria-hidden="true">' +
        '<div class="cookie-panel-backdrop" id="cookie-panel-backdrop"></div>' +
        '<div class="cookie-panel-sheet">' +
          '<div class="cookie-panel-header">' +
            '<h2 id="cookie-panel-title" class="cookie-panel-title">Preferências de cookies</h2>' +
            '<button type="button" class="cookie-panel-close" id="cookie-panel-close" aria-label="Fechar">' +
              '<span class="material-symbols-outlined">close</span>' +
            '</button>' +
          '</div>' +
          '<div class="cookie-panel-body">' +
            '<p class="cookie-panel-intro">Gerencie como a Leal Treinamentos utiliza cookies e tecnologias similares. Cookies necessários não podem ser desativados, pois são essenciais ao site.</p>' +
            '<div class="cookie-option">' +
              '<div class="cookie-option-head">' +
                '<div><strong>Necessários</strong><span class="cookie-option-tag">Sempre ativos</span></div>' +
                '<label class="cookie-switch cookie-switch-disabled"><input type="checkbox" checked disabled><span></span></label>' +
              '</div>' +
              '<p>Garantem funções básicas como segurança, preferências de consentimento e navegação.</p>' +
            '</div>' +
            '<div class="cookie-option">' +
              '<div class="cookie-option-head">' +
                '<div><strong>Analíticos</strong></div>' +
                '<label class="cookie-switch"><input type="checkbox" id="cookie-pref-analytics"><span></span></label>' +
              '</div>' +
              '<p>Ajudam a entender como os visitantes utilizam o site (páginas visitadas, tempo de permanência), de forma agregada e anônima.</p>' +
            '</div>' +
            '<div class="cookie-option">' +
              '<div class="cookie-option-head">' +
                '<div><strong>Marketing</strong></div>' +
                '<label class="cookie-switch"><input type="checkbox" id="cookie-pref-marketing"><span></span></label>' +
              '</div>' +
              '<p>Permitem medir campanhas e exibir conteúdos relevantes em canais parceiros, quando aplicável.</p>' +
            '</div>' +
          '</div>' +
          '<div class="cookie-panel-footer">' +
            '<a class="cookie-link" href="privacidade.html#cookies">Saiba mais na Política de Privacidade</a>' +
            '<div class="cookie-panel-actions">' +
              '<button type="button" class="cookie-btn cookie-btn-outline" id="cookie-panel-reject">Recusar opcionais</button>' +
              '<button type="button" class="cookie-btn cookie-btn-primary" id="cookie-panel-save">Salvar preferências</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<button type="button" id="cookie-fab" class="cookie-fab" aria-label="Configurar cookies" title="Configurar cookies">' +
        '<span class="material-symbols-outlined">cookie</span>' +
      '</button>';

    document.body.appendChild(wrap);

    document.getElementById('cookie-btn-accept').addEventListener('click', function () {
      saveConsent({ necessary: true, analytics: true, marketing: true });
    });

    document.getElementById('cookie-btn-reject').addEventListener('click', function () {
      saveConsent({ necessary: true, analytics: false, marketing: false });
    });

    document.getElementById('cookie-btn-preferences').addEventListener('click', openPanel);
    document.getElementById('cookie-fab').addEventListener('click', openPanel);
    document.getElementById('cookie-panel-close').addEventListener('click', closePanel);
    document.getElementById('cookie-panel-backdrop').addEventListener('click', closePanel);

    document.getElementById('cookie-panel-save').addEventListener('click', function () {
      saveConsent({
        necessary: true,
        analytics: document.getElementById('cookie-pref-analytics').checked,
        marketing: document.getElementById('cookie-pref-marketing').checked,
      });
    });

    document.getElementById('cookie-panel-reject').addEventListener('click', function () {
      saveConsent({ necessary: true, analytics: false, marketing: false });
    });
  }

  function openPanel() {
    var consent = getConsent() || DEFAULT_PREFS;
    document.getElementById('cookie-pref-analytics').checked = !!consent.analytics;
    document.getElementById('cookie-pref-marketing').checked = !!consent.marketing;
    document.getElementById('cookie-panel').classList.add('is-open');
    document.body.classList.add('cookie-panel-open');
    document.getElementById('cookie-panel').setAttribute('aria-hidden', 'false');
  }

  function closePanel() {
    document.getElementById('cookie-panel').classList.remove('is-open');
    document.body.classList.remove('cookie-panel-open');
    document.getElementById('cookie-panel').setAttribute('aria-hidden', 'true');
    if (!getConsent()) showBanner();
  }

  function init() {
    buildUI();
    var consent = getConsent();
    if (consent) {
      updateFab();
      window.dispatchEvent(new CustomEvent('leal:consent', { detail: consent }));
    } else {
      setTimeout(showBanner, 600);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.LealCookies = {
    getConsent: getConsent,
    openPreferences: openPanel,
    revoke: function () {
      localStorage.removeItem(STORAGE_KEY);
      showBanner();
      updateFab();
    },
  };
})();
