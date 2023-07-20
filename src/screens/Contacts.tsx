import { HStack, ScrollView, Text, VStack } from "native-base";

import { useNavigation } from '@react-navigation/native'

import { Button } from "@components/Button";
import { Header } from "@components/Header";
import Input from "@components/Input";

export function Contacts() {
    const navigation = useNavigation();

    function handleGoBack() {
        navigation.goBack();
    }


    return (
        <>
            <Header
                title="Contatos"
                buttonBack={false}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <VStack mt={7} flex={1} px={8} pb={7}>
                    <VStack flex={1}>
                        <HStack /* bg={'red.100'} */ justifyContent={'space-between'}>
                            <VStack /* bg={'green.100'} */ alignItems={'center'}>
                                <Text fontFamily={'heading'} fontSize={'xl'}>Telefone</Text>
                                <Text mt={3} color={'purple.600'} fontSize={'md'} fontFamily={'heading'}>(21) 00000-0000</Text>
                                <Text color={'purple.600'} fontSize={'md'} fontFamily={'heading'}>(21) 00000-0000</Text>
                            </VStack>
                            <VStack /* bg={'blue.100'} */ alignItems={'center'}>
                                <Text fontFamily={'heading'} fontSize={'xl'}>Whatsapp</Text>
                                <Text mt={3} color={'purple.600'} fontSize={'md'} fontFamily={'heading'}>(21) 00000-0000</Text>
                            </VStack>
                        </HStack>

                        <VStack mt={6} alignItems={'center'}>
                            <Text fontFamily={'heading'} fontSize={'xl'}>ENVIE UMA MENSAGEM</Text>

                            <Input
                                mt={3}
                                placeholder="Nome"
                            />
                            <Input
                                placeholder="Email"
                            />
                            <Input
                                placeholder="Telefone/Celular"
                            />
                            <Input
                                placeholder="Em que podemos ajudar?"
                                multiline={true}
                                numberOfLines={5}
                                h={120}
                                textAlignVertical="top" 
                            />
                        </VStack>

                    </VStack>

                    <VStack>
                        <Button
                            title="Enviar"
                            onPress={() => console.log('Enviando o email')}
                        />
                    </VStack>
                </VStack>
            </ScrollView>
        </>
    );
}