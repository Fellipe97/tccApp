import {  Box, useTheme } from 'native-base';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'

import { useAuth } from '@hooks/auth';

import { AuthRoutes } from './auth.routes';
import { StackAppRoutes } from './stackApp.routes';


export function Routes() {
    const { user } = useAuth();
    const { colors } = useTheme();
    const theme = DefaultTheme;
    theme.colors.background = colors.gray[100]



    return (
        <Box flex={1} bg={'gray.100'}>
            <NavigationContainer theme={theme}>
               { user ? <StackAppRoutes/> : <AuthRoutes />}
            </NavigationContainer>
        </Box>
    );
}