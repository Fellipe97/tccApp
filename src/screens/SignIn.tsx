import React from 'react';
import { useRef } from 'react';
import { TextInput } from 'react-native';

import { VStack, HStack, Text, Center, Actionsheet, useDisclose, KeyboardAvoidingView, useToast } from 'native-base'

import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'


import Input from '@components/Input';
import { ButtonGhost } from '@components/ButtonGhost';
import { Button } from '@components/Button';
import LogoSvg from '@assets/logo.svg';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';

import { useAuth } from '@hooks/auth';
import { LoadingInitial } from '@components/LoadingInitial';


type FormDataPropsSignIn = {
    email: string;
    password: string;
}
type FormDataPropsForgetPassword = {
    email: string;
}

const signInSchema = yup.object({
    email: yup.string().required('Informe o e-mail.').email('E-mail inválido.'),
    password: yup.string().required('Informe a senha.').min(6, 'A senha deve ter pelo menos 6 dígitos.'),
});
const forgetPasswordSchema = yup.object({
    email: yup.string().required('Informe o e-mail.').email('E-mail inválido.'),
});

export function SignIn() {
    const navigation = useNavigation<AuthNavigatorRoutesProps>();
    const passwordRef = useRef<TextInput>(null)
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclose();
    const { signIn, isLoadingSigIn, isLoadingStorage, redefinePassword, isLoadingRedefinePassword } = useAuth()

    const {
        control: signInControl,
        handleSubmit: handleSignInSubmit,
        formState: { errors: signInErrors }
    } = useForm<FormDataPropsSignIn>({
        resolver: yupResolver(signInSchema)
    });
    function handleSignIn({ email, password }: FormDataPropsSignIn) {
        toast.closeAll();
        console.log('Verificando...')
        signIn(email, password)
    }


    const {
        control: forgetPasswordControl,
        handleSubmit: handleForgetPasswordSubmit,
        formState: { errors: forgetPasswordErrors }
    } = useForm<FormDataPropsForgetPassword>({
        resolver: yupResolver(forgetPasswordSchema)
    });
    function handleForgotPassword({ email }: FormDataPropsForgetPassword) {
        toast.closeAll();
        redefinePassword(email)
        onClose()
    }


    function handleNewAccount() {
        navigation.navigate('signUp')
    }

    if (isLoadingStorage) {
        return (
            <LoadingInitial />
        )
    }


      


    return (
        <VStack mt={10} flex={1} px={12} pb={16} alignItems='center' justifyContent='center'>

            <LogoSvg />

            <VStack w={'100%'} mt={12}>
                <Center>

                    <Controller
                        control={signInControl}
                        name='email'
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder='E-mail'
                                keyboardType='email-address'
                                autoCapitalize='none'
                                onChangeText={onChange}
                                value={value}
                                errorMessage={signInErrors.email?.message}
                                returnKeyType='next'
                                onSubmitEditing={() => passwordRef.current?.focus()}
                            />
                        )}
                    />

                    <Controller
                        control={signInControl}
                        name='password'
                        render={({ field: { onChange, value } }) => (
                            <Input
                                ref={passwordRef}
                                placeholder='Senha'
                                secureTextEntry
                                autoCapitalize='none'
                                onChangeText={onChange}
                                value={value}
                                errorMessage={signInErrors.password?.message}
                                returnKeyType='send'
                                onSubmitEditing={handleSignInSubmit(handleSignIn)}
                            />
                        )}
                    />

                    <ButtonGhost
                        title='Esqueceu a senha?'
                        onPress={onOpen}
                    />

                    <Button
                        title='Entrar'
                        mt={10}
                        onPress={handleSignInSubmit(handleSignIn)}
                        isLoading={isLoadingSigIn}
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
                            <Controller
                                control={forgetPasswordControl}
                                name='email'
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        mt={3}
                                        placeholder='E-mail'
                                        keyboardType='email-address'
                                        autoCapitalize='none'
                                        onChangeText={onChange}
                                        value={value}
                                        errorMessage={forgetPasswordErrors.email?.message}
                                        returnKeyType='send'
                                        onSubmitEditing={handleForgetPasswordSubmit(handleForgotPassword)}
                                    />
                                )}
                            />
                            <Button
                                title='Enviar'
                                mt={3}
                                mb={5}
                                onPress={handleForgetPasswordSubmit(handleForgotPassword)}
                                isLoading={isLoadingRedefinePassword}
                            />
                        </VStack>
                    </Actionsheet.Content>
                </KeyboardAvoidingView>
            </Actionsheet>


        </VStack>
    );
}