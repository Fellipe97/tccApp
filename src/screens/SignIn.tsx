import { useRef } from 'react';
import { Alert } from 'react-native';
import { VStack, HStack, Text, Center, Actionsheet, useDisclose, KeyboardAvoidingView } from 'native-base'

import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'


import { Input } from '@components/Input';
import { ButtonGhost } from '@components/ButtonGhost';
import { Button } from '@components/Button';
import LogoSvg from '@assets/logo.svg'

export function SignIn() {
    const navigation = useNavigation<AuthNavigatorRoutesProps>();
    const { isOpen, onOpen, onClose } = useDisclose();

    const passwordRef = useRef(null);




    function handleNewAccount() {
        navigation.navigate('signUp')
    }

    function handleForgotPassword(){
        Alert.alert('Esqueci Senha', 'Email enviado!')
    }


    return (
        <VStack mt={10} flex={1} px={12} pb={16} alignItems='center' justifyContent='center'>

            <LogoSvg />

            <VStack w={'100%'} mt={12}>
                <Center>
                    <Input
                        placeholder='E-mail'
                        keyboardType='email-address'
                    />

                    <Input
                        placeholder='Senha'
                        secureTextEntry
                        //returnKeyType='send'
                    />

                    <ButtonGhost
                        title='Esqueceu a senha?'
                        onPress={onOpen}
                    />

                    <Button
                        title='Entrar'
                        mt={10}
                    />

                    <HStack w={'100%'} mt={6} alignItems='center' justifyContent='center'>

                        <Text color='gray.500' fontSize='sm' fontFamily='body'>Não tem conta?</Text>

                        <ButtonGhost
                            title='Saiba mais'
                            ml={2}
                            onPress={handleNewAccount}
                        />
                    </HStack>
                </Center>
            </VStack>


            {/* Pop up esqueci minha senha */}
            <Actionsheet isOpen={isOpen} onClose={onClose}>
                <KeyboardAvoidingView
                    behavior="padding"
                    w={'100%'}
                >
                    <Actionsheet.Content>
                        <VStack px={9} mt={5} mb={5} w={'100%'} alignItems='center'>
                            <Text color='purple.600' fontFamily='heading' fontSize='xl'>
                                Recuperar Senha
                            </Text>
                            <Input
                                placeholder='E-mail'
                                //returnKeyType='send'
                                mt={7}
                            />
                            <Button
                                title='Enviar'
                                mt={3}
                                mb={5}
                                onPress={() => {
                                    onClose()
                                    handleForgotPassword()
                                }}
                            />
                        </VStack>
                    </Actionsheet.Content>
                </KeyboardAvoidingView>
            </Actionsheet>


        </VStack>
    );
}