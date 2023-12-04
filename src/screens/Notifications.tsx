import { useEffect } from 'react'
import { TouchableOpacity } from "react-native";
import { Avatar, HStack, Text, TextArea, VStack, Button, ScrollView, Box, FlatList } from "native-base";

import { useNavigation } from '@react-navigation/native'

import { Header } from "@components/Header";



export function Notifications() {
    const navigation = useNavigation();

    const notificacoes = [
        {
            foto: 'https://firebasestorage.googleapis.com/v0/b/uerj-tcc.appspot.com/o/photograph%2FWf3dXr6IHRQb8aZMLJgp.jpeg?alt=media&token=38035641-9b96-4a3f-91ae-8aa893666772',
            texto: 'Atenção! Não perca o dia do vencimento do seu boleto!'
        },
        {
            foto: 'https://firebasestorage.googleapis.com/v0/b/uerj-tcc.appspot.com/o/photograph%2FTxquPuSseEdBXsZJcYen.jpg?alt=media&token=c1efb070-281a-4b41-b924-2e8b4be176ae',
            texto: 'Pedro Henrique entrou na escola às 8:19 do dia 29/04/2023'
        },
        {
            foto: 'https://firebasestorage.googleapis.com/v0/b/uerj-tcc.appspot.com/o/photograph%2FWf3dXr6IHRQb8aZMLJgp.jpeg?alt=media&token=38035641-9b96-4a3f-91ae-8aa893666772',
            texto: 'Pedro Henrique entrou na escola às 8:10 do dia 28/04/2023'
        },
        {
            foto: 'https://firebasestorage.googleapis.com/v0/b/uerj-tcc.appspot.com/o/photograph%2FTxquPuSseEdBXsZJcYen.jpg?alt=media&token=c1efb070-281a-4b41-b924-2e8b4be176ae',
            texto: 'Pedro Henrique entrou na escola às 8:13 do dia 24/04/2023'
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
            <VStack bg="gray.200" h={0.5} w="100%" />
        </Box>
    );


    return (
        <VStack flex={1}>
            <Header
                title="Notificações"
                buttonBack={false}
            />

            <VStack flex={1} w={'100%'} >

                <FlatList
                    data={notificacoes}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                />
            </VStack>

        </VStack >
    );
}