import { useEffect } from 'react'
import { TouchableOpacity } from "react-native";
import { Avatar, HStack, Text, TextArea, VStack, Button, ScrollView, Box, FlatList } from "native-base";

import { useNavigation } from '@react-navigation/native'

import { Header } from "@components/Header";



export function Notifications() {
    const navigation = useNavigation();

    const notificacoes = [
        {
            foto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
            texto: 'Atenção! Não perca o dia do vencimento do seu boleto!'
        },
        {
            foto: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
            texto: 'Pedro Henrique entrou na escola às 8:13 do dia 28/04/2023'
        },
        {
            foto: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
            texto: 'Pedro Henrique entrou na escola às 8:13 do dia 28/04/2023'
        },
        {
            foto: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
            texto: 'Pedro Henrique entrou na escola às 8:13 do dia 28/04/2023'
        },
        {
            foto: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
            texto: 'Pedro Henrique entrou na escola às 8:13 do dia 28/04/2023'
        },
        {
            foto: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
            texto: 'Pedro Henrique entrou na escola às 8:13 do dia 28/04/2023'
        },
        {
            foto: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
            texto: 'Pedro Henrique entrou na escola às 8:13 do dia 28/04/2023'
        },
        {
            foto: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
            texto: 'Pedro Henrique entrou na escola às 8:13 do dia 28/04/2023'
        },
        {
            foto: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
            texto: 'Pedro Henrique entrou na escola às 8:13 do dia 28/04/2023'
        },
        {
            foto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
            texto: 'Evento X em nossa escola essa semana. Contamos com sua presença!'
        }
    ]

    const renderItem = ({ item }: any) => (
        <Box>
            <TouchableOpacity onPress={() => console.log({ item })}>
                <HStack w="100%" px={5} alignItems="center" py={5}>
                    <Avatar bg="gray.500" size="lg" shadow={7} m={2} source={{ uri: item.foto }}>
                        ...
                    </Avatar>
                    <Text ml={2} numberOfLines={4} fontFamily="heading" style={{ flex: 1 }}>
                        {item.texto}
                    </Text>
                </HStack>
            </TouchableOpacity>
            <VStack bg="gray.200" h={0.4} w="100%" shadow={4} />
        </Box>
    );


    return (
        <VStack flex={1}>
            <Header
                title="Notificações"
                buttonBack={false}
            />

            <VStack flex={1} w={'100%'} >

                {/* <ScrollView>
                    {notificacoes.map((item, index) => (

                        <Box key={index}>
                            <TouchableOpacity onPress={() => console.log({ item })}>
                                <HStack
                                    w={'100%'}
                                    px={5}
                                    alignItems={'center'}
                                    //mb={4}
                                    py={5}
                                >
                                    <Avatar bg="gray.500" size={'lg'} shadow={7} m={2} source={{ uri: item.foto }}>
                                        ...
                                    </Avatar>

                                    <Text
                                        numberOfLines={4}
                                        fontFamily={'heading'}
                                        style={{ flex: 1 }}
                                    >
                                        {item.texto}
                                    </Text>
                                </HStack>
                            </TouchableOpacity>
                            {index !== notificacoes.length - 1 && (
                                <VStack
                                    bg="gray.200"
                                    h={.4}
                                    w={'100%'}
                                    shadow={4}
                                />
                            )}
                        </Box>



                    ))}
                </ScrollView> */}

                <FlatList
                    data={notificacoes}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                />
            </VStack>

        </VStack >
    );
}