import { extendTheme } from 'native-base'


export const THEME = extendTheme(
    {
        colors: {
            green: {
                600: '#2DDFA6', //2DDFA6
                500: '#6EF5CA', //2DDFA6
                200: '#9CFFDF', //2DDFA6
            },
            gray: {
                500: '#9F9F9F',
                200: '#797979', //icone
                100: '#F1F3F5', //background
            },
            white: '#FFFFFF',
            black: '#000000',
            red: {
                600: '#F75A68', //E76161
                500: '#E4757E', //E76161
            },
            purple: {
                700: '#5A3AA5',
                600: '#8257E6',
                500: '#9067EE'
            },
            blue: {
                600: '#78AEFF',
                500: '#91B6EF'
            },
            orange: {
                600: '#FFAB7B',
                500: '#FCC09E'
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
            "2xl": 24,
        },
        sizes: {
            14: 56,
            33: 148
        }
    }
)