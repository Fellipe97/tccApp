import React, { useState } from "react";
import { ScrollView, Text, VStack, HStack, useToast } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Button } from "@components/Button";
import { Header } from "@components/Header";
import Input from "@components/Input";
import { useAuth } from "@hooks/auth";
import Api from "../helpers/Api";

type respMessage = {

    success: boolean;
    message: string;

}

export type FormsendContactMessageProps = { //sendContactMessage FormDataProps
    name: string;
    email: string;
    phone: string;
    message: string;
}

// Define yup validation schema
const contactSchema = yup.object({
    name: yup.string().required("Nome é obrigatório"),
    email: yup.string().email("Email inválido").required("Email é obrigatório"),
    phone: yup.string().required("Telefone é obrigatório"),
    message: yup.string().required("Mensagem é obrigatória"),
});

export function Contacts() {
    const { user } = useAuth()
    const api = Api();
    const toast = useToast();



    const navigation = useNavigation();
    const [loadingButton, setLoadingButton] = useState(false)

    // Create react-hook-form instance with validation schema
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(contactSchema),
    });

    function handleGoBack() {
        navigation.goBack();
    }

    const onSubmit = async (data: FormsendContactMessageProps) => {
        toast.closeAll();
        setLoadingButton(true)

        // Handle form submission logic here
        console.log("Form data submitted:", user?.id, data);

        if (user) {
            const success:respMessage = await api.sendContactMessage(user?.id, data)

            if (success.success) {
                toast.show({
                    title: 'Contatos',
                    description: success.message,
                    placement: 'top',
                    bgColor: 'emerald.500'
                })
                reset({
                    name: "",
                    email: "",
                    phone: "",
                    message: "",
                });
            }else{
                toast.show({
                    title: 'Contatos',
                    description: success.message,
                    placement: 'top',
                    bgColor: 'red.500'
                })
            }
        }

        setLoadingButton(false)
    };

    return (
        <>
            <Header title="Contatos" buttonBack={false} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <VStack mt={7} flex={1} px={8} pb={7}>
                    <VStack flex={1}>

                        <HStack /* bg={'red.100'} */ justifyContent={'space-between'}>
                            <VStack /* bg={'green.100'} */ alignItems={'center'}>
                                <Text fontFamily={'heading'} fontSize={'xl'}>Telefone</Text>
                                <Text mt={3} color={'purple.600'} fontSize={'md'} fontFamily={'heading'}>(21) 12345-6789</Text>
                                <Text color={'purple.600'} fontSize={'md'} fontFamily={'heading'}>(21) 98765-4321</Text>
                            </VStack>
                            <VStack /* bg={'blue.100'} */ alignItems={'center'}>
                                <Text fontFamily={'heading'} fontSize={'xl'}>Whatsapp</Text>
                                <Text mt={3} color={'purple.600'} fontSize={'md'} fontFamily={'heading'}>(21) 98765-4321</Text>
                            </VStack>
                        </HStack>

                        <VStack mt={6} alignItems={"center"}>
                            <Text fontFamily={"heading"} fontSize={"xl"}>
                                ENVIE UMA MENSAGEM
                            </Text>

                            <Controller
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        mt={3}
                                        placeholder="Nome"
                                        onChangeText={onChange}
                                        value={value}
                                        errorMessage={errors.name?.message}
                                    />
                                )}
                                name="name"
                                defaultValue=""
                            />

                            <Controller
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        placeholder="Email"
                                        keyboardType='email-address'
                                        onChangeText={onChange}
                                        value={value}
                                        errorMessage={errors.email?.message}
                                    />
                                )}
                                name="email"
                                defaultValue=""
                            />

                            <Controller
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        placeholder="Telefone/Celular"
                                        onChangeText={onChange}
                                        value={value}
                                        errorMessage={errors.phone?.message}
                                    />
                                )}
                                name="phone"
                                defaultValue=""
                            />

                            <Controller
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        placeholder="Em que podemos ajudar?"
                                        multiline={true}
                                        numberOfLines={5}
                                        h={120}
                                        textAlignVertical="top"
                                        onChangeText={onChange}
                                        value={value}
                                        errorMessage={errors.message?.message}
                                    />
                                )}
                                name="message"
                                defaultValue=""
                            />
                        </VStack>
                    </VStack>

                    <VStack>
                        <Button title="Enviar" onPress={handleSubmit(onSubmit)} isLoading={loadingButton} />
                    </VStack>
                </VStack>
            </ScrollView>
        </>
    );
}
