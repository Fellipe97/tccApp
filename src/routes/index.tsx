import { useTheme, Box } from 'native-base';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'

import { AuthRoutes } from './auth.routes';
import { AppRotes } from './app.routes';

export function Routes() {
    const {colors} = useTheme();
    const theme = DefaultTheme;
    //theme.colors.background = colors.backgroundColor
    const user = true


    return (
        <Box flex={1} bg='backgroundColor'>
            <NavigationContainer theme={theme}>
               { user ? <AppRotes/> : <AuthRoutes />}
            </NavigationContainer>
        </Box>
    );
}