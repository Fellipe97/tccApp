import { extendTheme } from 'native-base'


export const THEME = extendTheme(
    {
        colors: {
            green: {
                200: '#9CFFDF',
            },
            gray: {
                500: '#9F9F9F',
                200: '#797979', //icone
                100: '#F1F3F5', //background
            },
            white: '#FFFFFF',
            black: '#000000',
            red: {
                500: '#F75A68',
            },
            purple: {
                700: '#5A3AA5',
                600: '#8257E6',
                500: '#9067EE'
            }
        },
        fonts: {
            heading: 'Roboto_700Bold',
            body: 'Roboto_400Regular',
        },
        fontSizes: {
            xs: 12,
            sm: 14,
            md: 16,
            lg: 18,
            xl: 20,
        },
        sizes: {
            14: 56,
            33: 148
        }
    }
)