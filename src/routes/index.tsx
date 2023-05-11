import {  Box } from 'native-base';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'

import { AuthRoutes } from './auth.routes';
import { AppRotes } from './app.routes';

export function Routes() {
    const theme = DefaultTheme;
    const user = true


    return (
        <Box flex={1} bg={'gray.100'}>
            <NavigationContainer theme={theme}>
               { !user ? <AppRotes/> : <AuthRoutes />}
            </NavigationContainer>
        </Box>
    );
}