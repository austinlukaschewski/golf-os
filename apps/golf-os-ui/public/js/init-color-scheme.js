console.info('Getting initial color scheme');
const DATA_THEME_KEY = 'golf-os-data-theme';
try {
    let colorScheme = '';
    const mode = localStorage.getItem(DATA_THEME_KEY) || 'system';
    if (mode === 'system') {
        const mql = window.matchMedia('(prefers-color-scheme: dark)');
        if (mql.matches) {
            colorScheme = 'dark';
        } else {
            colorScheme = 'light';
        }
    }
    if (mode === 'light') {
        colorScheme = 'light';
    }
    if (mode === 'dark') {
        colorScheme = 'dark';
    }

    if (colorScheme) {
        document.documentElement.setAttribute('data-theme', colorScheme);
        if (mode !== 'system') {
            localStorage.setItem(DATA_THEME_KEY, colorScheme);
        }
    }
} catch (e) {
    console.error('Error getting initial color scheme', e);
}
