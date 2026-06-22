tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#b7102a',
        'primary-container': '#db313f',
        'secondary-container': '#fed023',
        navy: '#1A2C42',
        'navy-authority': '#1A2C42',
        background: '#f7f9ff',
        'surface-light': '#F8F9FA',
        'surface-container': '#ebeef3',
        'pure-white': '#FFFFFF',
        charcoal: '#181c20',
        'on-surface': '#181c20',
        'on-surface-variant': '#5b403f',
        'outline-variant': '#e4bebc',
        'red-alert': '#b7102a',
        'yellow-safety': '#fed023',
      },
      maxWidth: {
        content: '1200px',
        'container-max': '1200px',
      },
      spacing: {
        'margin-desktop': '80px',
        'section-gap-lg': '120px',
        'section-gap-md': '80px',
      },
      fontFamily: {
        montserrat: ['Oswald', 'sans-serif'],
        inter: ['Source Sans 3', 'sans-serif'],
        display: ['Bebas Neue', 'sans-serif'],
      },
      fontSize: {
        'display-hero': ['64px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],
        'display-hero-mobile': ['40px', { lineHeight: '1.2', fontWeight: '800' }],
        'headline-lg': ['48px', { lineHeight: '1.2', fontWeight: '700' }],
        'headline-lg-mobile': ['32px', { lineHeight: '1.3', fontWeight: '700' }],
      },
      borderRadius: {
        lg: '0.5rem',
        xl: '0.75rem',
      },
    },
  },
};
