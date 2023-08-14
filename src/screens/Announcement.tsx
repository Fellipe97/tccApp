import { useEffect, useState } from "react";
import { Avatar, Box, Center, FlatList, HStack, ScrollView, Text, VStack } from "native-base";

import { useNavigation } from '@react-navigation/native'

import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { ScrollViewChildren } from "@components/ScrollViewChildren";

import WarmingSvg from '@assets/warming.svg'

import { useAuth } from "@hooks/auth";

import Api from "../helpers/Api";
import { childrenProps } from "src/types/children";



type propsChildren = {
    id: string;
    name: string;
    birth: string;
    registration: string;
    bloodType: string;
    grade: string;
    photograph: string;
}
type propsAnnouncement = {
    idChildren: string;
    icon: string;
    message: string;
}

export function Announcement() {
    const navigation = useNavigation();
    const api = Api();
    const { user } = useAuth()



    /* const children: propsChildren[] = [
        {
            id: 'aaaaaaa111111',
            name: 'Maria Laura da Silva Oliveira',
            birth: '02/09/2010',
            registration: '1713332034',
            bloodType: 'O+',
            grade: 'Ensino Fundamental II - 9º ano',
            photograph: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        },
        {
            id: 'bbbbbbb2222222',
            name: 'Pedro Henrique da Silva Oliveira',
            birth: '12/09/1997',
            registration: '1913332134',
            bloodType: 'A+',
            grade: 'Ensino Fundamental II - 6º ano',
            photograph: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        },
        {
            id: 'ccccccc2222222',
            name: 'Luíz Fellipe Oliveira',
            birth: '12/09/1997',
            registration: '1724442134',
            bloodType: 'A+',
            grade: 'Ensino Fundamental II - 8º ano',
            photograph: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        },
    ] */

    const announcements: propsAnnouncement[] = [
        {
            idChildren: 'TxquPuSseEdBXsZJcYen',
            icon: '',
            message: 'Seu filho(a) está sem lápis de cor.'
        },
        {
            idChildren: 'Wf3dXr6IHRQb8aZMLJgp',
            icon: '',
            message: 'Seu filho(a) esqueceu o livro em casa.'
        },
        {
            idChildren: 'Wf3dXr6IHRQb8aZMLJgp',
            icon: '',
            message: 'A turma irá fazer uma atividade que precisará trazer cola.'
        },
        {
            idChildren: 'TxquPuSseEdBXsZJcYen',
            icon: '',
            message: 'Seu filho(a) não fez a tarefa de casa.'
        },
        {
            idChildren: 'Wf3dXr6IHRQb8aZMLJgp',
            icon: '',
            message: 'Seu filho(a) derramou o suco do lance.'
        },
    ]

    const [children, setChildren] = useState<childrenProps[] | null>(null)
    const [childrenSelected, setChildrenSelected] = useState<childrenProps | null>(null);
    const [announcementsFiltered, setAnnouncementsFiltered] = useState<propsAnnouncement[] | null>(null);


    const getGeneralInformationChildren = async (tokens: string[]) => {
        let resp = await api.getGeneralInformationChildren(tokens)
        if (resp) {
            setChildren(resp)
            let resp2 = await api.getMonthlyPaymentChildren(resp)
            if (resp2) {
                console.log('resp2: ', resp2)
                //setMonthlyPayment(resp2)
                //setMonthlyPaymentFiltered(resp2.filter(monthlyPayment => monthlyPayment.idChildren === resp[0].id))
            }
        }
    }

    useEffect(() => {
        if (user?.children) {
            getGeneralInformationChildren(user?.children)
        }
    }, [])


    useEffect(() => {
        if (children && children.length > 0 && !childrenSelected) {
            setChildrenSelected(children[0]);
        }
    }, [children, childrenSelected]);


    useEffect(() => {
        setAnnouncementsFiltered(
            announcements.filter(announcement => announcement.idChildren === childrenSelected?.id)
        )
    }, [childrenSelected])

    const renderItem = (item: any) => (
        <Box>
            <HStack maxW={'80%'} px={5} alignItems="center" py={5} h={130}>
                <WarmingSvg />
                <Text ml={4} numberOfLines={4} fontFamily={'heading'} fontSize={'md'}>{item.message}</Text>
            </HStack>
            <VStack bg="gray.200" h={0.4} w="100%" />
        </Box>
    );

    const renderEmptyList = () => (
        <Center flex={1} >
            <Text fontFamily={'heading'} fontSize={'xl'}>Não há comunicados</Text>
        </Center>
    )



    return (
        <VStack flex={1}>
            <Header
                title="Comunicados"
                buttonBack
            />
            <VStack mt={7} flex={1} px={8}>
                
                <Text
                    fontFamily={'heading'}
                    fontSize={'2xl'}
                    mb={5}
                >Selecione seu filho</Text>

                <FlatList
                    data={children}
                    keyExtractor={item => item.name}
                    renderItem={({ item }) => (
                        <ScrollViewChildren
                            item={item}

                            isActive={childrenSelected?.name == item.name}

                            onPress={() => {
                                setChildrenSelected(item)
                            }}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    maxH={110}
                    minH={110}
                />

                <VStack
                    flex={1}
                    bg={'gray.100'}
                    mt={4}
                    mb={10}
                    borderRadius={'xl'}
                    shadow={7}
                >
                    {announcementsFiltered?.length === 0 ? (
                        renderEmptyList()
                    ) : (
                        <FlatList
                            data={announcementsFiltered}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => renderItem(item)}
                            showsVerticalScrollIndicator
                        />
                    )}

                </VStack>

            </VStack>
        </VStack>
    );
}