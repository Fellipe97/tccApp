import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { THEME } from './src/theme';

import { LoadingInitial } from '@components/LoadingInitial';


import { AuthProvider } from '@hooks/auth';
import { Routes } from '@routes/index';


export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  const config = {
    dependencies: {
      "linear-gradient": require("expo-linear-gradient").LinearGradient,
    },
  };

  return (
    <NativeBaseProvider theme={THEME} config={config}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <AuthProvider>
        {fontsLoaded ? <Routes /> : <LoadingInitial />}
      </AuthProvider>

    </NativeBaseProvider>
  );
}

