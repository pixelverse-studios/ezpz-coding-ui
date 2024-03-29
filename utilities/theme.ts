const DARK_THEME = {
    primary: {
        main: '#3fc1aa'
    },
    secondary: {
        main: '#da5b38'
    },
    info: {
        main: '#3066be'
    },
    background: {
        paper: '#151419',
        default: '#1f1e24'
    }
}
const LIGHT_THEME = {
    primary: {
        main: '#3fc1aa'
    },
    secondary: {
        main: '#da5b38'
    },
    info: {
        main: '#3066be'
    },
    background: {
        paper: '#d0d0d0',
        default: '#e8e8e8'
    }
}

export const setTheme = (mode: 'light' | 'dark') =>
    mode === 'dark' ? DARK_THEME : LIGHT_THEME
