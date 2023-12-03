import { useRef, useState } from 'react';
import { TextInput, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { ScrollView, Text, VStack, useToast } from "native-base";


import { Header } from "@components/Header";
import Input from "@components/Input";
import { Button } from "@components/Button";



import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { useAuth } from '@hooks/auth';


type FormDataPropsRedefinePassword = {
    passwordOld: string;
    passwordNew: string;
    confirmPasswordNew: string;
}

const redefinePassword = yup.object({
    passwordOld: yup
        .string()
        .required('Informe a senha antiga.')
        .min(6, 'A senha deve ter pelo menos 6 dígitos.'),
    passwordNew: yup
        .string()
        .required('Informe a senha nova.')
        .min(6, 'A senha deve ter pelo menos 6 dígitos.')
        .test('passwords-match', 'As senhas não coincidem.', function (value) {
            return value === this.resolve(yup.ref('passwordNew'));
        })
        .test('passwords-match', 'A senha é igual a senha antiga.', function (value) {
            return value !== this.resolve(yup.ref('passwordOld'));
        }),
    confirmPasswordNew: yup
        .string()
        .required('Confirme a senha nova.')
        .min(6, 'A senha deve ter pelo menos 6 dígitos.')
        //.oneOf([yup.ref('passwordNew')], 'As senhas não coincidem.'),
        .test('passwords-match', 'As senhas não coincidem.', function (value) {
            return value === this.resolve(yup.ref('passwordNew'));
        })
        .test('passwords-match', 'A senha é igual a senha antiga.', function (value) {
            return value !== this.resolve(yup.ref('passwordOld'));
        }),
});

export function RedefinePassword() {
    const toast = useToast();
    const passwordRef = useRef<TextInput>(null);
    const newPasswordRef = useRef<TextInput>(null);
    const { redefinePasswordLogged, isLoadingRedefinePassword } = useAuth()
    const [loadingButton, setLoadingButton] = useState(false)




    const {
        control: redefinePasswordControl,
        handleSubmit: handleRedefinePasswordSubmit,
        formState: { errors: redefinePasswordErrors },
        reset
    } = useForm<FormDataPropsRedefinePassword>({
        resolver: yupResolver(redefinePassword)
    });

    async function handleRedefinePassword({ passwordOld, passwordNew, confirmPasswordNew }: FormDataPropsRedefinePassword) {
        setLoadingButton(true)
        toast.closeAll();
        console.log(passwordOld, passwordNew, confirmPasswordNew)
        await redefinePasswordLogged(passwordOld, confirmPasswordNew)
        reset({
            passwordOld: passwordOld,
            passwordNew: '',
            confirmPasswordNew: ''
        });
        setLoadingButton(false)
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <VStack flex={1}>
                <Header
                    title="Redefinir senha"
                    buttonBack={true}
                />
                <VStack px={7} mt={7}>

                    <Controller
                        control={redefinePasswordControl}
                        name='passwordOld'
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder='Senha antiga'
                                secureTextEntry
                                autoCapitalize='none'
                                onChangeText={onChange}
                                value={value}
                                errorMessage={redefinePasswordErrors.passwordOld?.message}
                                returnKeyType='next'
                                onSubmitEditing={() => newPasswordRef.current?.focus()}
                            />
                        )}
                    />
                    <Controller
                        control={redefinePasswordControl}
                        name='passwordNew'
                        render={({ field: { onChange, value } }) => (
                            <Input
                                ref={newPasswordRef}
                                placeholder='Senha nova'
                                secureTextEntry
                                autoCapitalize='none'
                                onChangeText={onChange}
                                value={value}
                                errorMessage={redefinePasswordErrors.passwordNew?.message}
                                returnKeyType='next'
                                onSubmitEditing={() => passwordRef.current?.focus()}
                            />
                        )}
                    />
                    <Controller
                        control={redefinePasswordControl}
                        name='confirmPasswordNew'
                        render={({ field: { onChange, value } }) => (
                            <Input
                                ref={passwordRef}
                                placeholder='Repetir a senha nova'
                                secureTextEntry
                                autoCapitalize='none'
                                onChangeText={onChange}
                                value={value}
                                errorMessage={redefinePasswordErrors.confirmPasswordNew?.message}
                                returnKeyType='send'
                                onSubmitEditing={handleRedefinePasswordSubmit(handleRedefinePassword)}
                            />
                        )}
                    />


                    <Button
                        title="Salvar"
                        mt={5}
                        onPress={handleRedefinePasswordSubmit(handleRedefinePassword)}
                        isLoading={loadingButton}
                    />
                </VStack>
            </VStack>
        </TouchableWithoutFeedback>
    );
}