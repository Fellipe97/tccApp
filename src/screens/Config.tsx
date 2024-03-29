import { Text, VStack } from "native-base";

import { StackAuthNavigatorRoutesProps } from '@routes/stackApp.routes'
import { useNavigation } from '@react-navigation/native'

import { Button } from "@components/Button";
import { useAuth } from '@hooks/auth';
import { Header } from "@components/Header";
import { ButtonConfig } from "@components/ButtonConfig";


export function Config() {
    const navigation = useNavigation<StackAuthNavigatorRoutesProps>();
    const { signOut, user } = useAuth()


    function handleSignOut() {
        console.log('Saindo do app...')
        signOut()
    }


    return (
        <VStack flex={1} px={8}>
            <Header
                title="Configurações"
                buttonBack={false}
            />
            <VStack mt={7} flex={1} pb={16} >

                <ButtonConfig 
                    title="Redefinir senha"
                    subTitle="Mudar a senha atual" 
                    onPress={() => navigation.navigate('redefinePassword')}
                />

                <ButtonConfig 
                    title="Termos de uso"
                    subTitle="Acesse os termos de uso completo"
                    mt={5}
                    onPress={() => navigation.navigate('termOfUse')}
                />

                <ButtonConfig 
                    title="Política de privacidade"
                    subTitle="Acesse a política de privacidade completo"
                    mt={5}
                    onPress={() => navigation.navigate('privacyPolicy')}
                />

            </VStack>
            <Button
                title='Sair do aplicativo'
                mb={5}
                onPress={handleSignOut}
                bg={'red.600'}
                _pressed={{
                    bg: "red.500"
                }}
            />
        </VStack>
    );
}