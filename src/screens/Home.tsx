import { useState, useEffect } from 'react'
import {
    Text,
    VStack,
    Box,
    HStack,
    Avatar,
    ScrollView,
    Pressable,
    Center,
    Actionsheet,
    useDisclose,
    KeyboardAvoidingView,
    useToast,
    FlatList
} from "native-base";


import { StackAuthNavigatorRoutesProps } from '@routes/stackApp.routes'
import { useNavigation } from '@react-navigation/native'

import { Button } from "@components/Button";
import { HeaderHome } from "@components/HeaderHome";
import { ButtonCardMenu } from "@components/ButtonCardMenu";

import IconeFrequencia from "@assets/iconeFrequencia.svg"
import IconeNotas from "@assets/iconeNotas.svg"
import IconeComunicados from "@assets/iconeComunicados.svg"
import IconeFinanceiro from "@assets/iconeFinanceiro.svg"

import { useAuth } from '@hooks/auth';
import { ButtonGhost } from '@components/ButtonGhost';

import { StyleSheet } from 'react-native';
import LogoSvg from '@assets/logo.svg'
import { ScrollViewChildren } from '@components/ScrollViewChildren';


type propsChildren = {
    name: string;
    birth: string;
    registration: string;
    bloodType: string;
    grade: string;
    photograph: string;
}

export function Home() {
    const navigation = useNavigation<StackAuthNavigatorRoutesProps>();
    const { user } = useAuth()
    const school = 'Colégio X'

    const { isOpen, onOpen, onClose } = useDisclose();
    const [childrenSelected, setChildrenSelected] = useState<propsChildren | null>(null)

    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear();
    const validadeCarteirinha = '31/12/' + anoAtual


    const children: propsChildren[] = [
        {
            name: 'Maria Laura da Silva Oliveira',
            birth: '02/09/2010',
            registration: '1713332034',
            bloodType: 'O+',
            grade: 'Ensino Fundamental II - 9º ano',
            photograph: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        },
        {
            name: 'Pedro Henrique da Silva Oliveira',
            birth: '12/09/1997',
            registration: '1913332134',
            bloodType: 'A+',
            grade: 'Ensino Fundamental II - 6º ano',
            photograph: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        },
        {
            name: 'Luíz Fellipe Oliveira',
            birth: '12/09/1997',
            registration: '1724442134',
            bloodType: 'A+',
            grade: 'Ensino Fundamental II - 8º ano',
            photograph: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        },
    ]

    useEffect(() => {

    }, [])

    return (
        <>
            <HeaderHome
                nameUser={user!.name.split(" ")[0]}
                nameSchool={school}
            />

            <VStack mt={10} flex={1} px={7} pb={16}>

                <VStack>
                    <Text
                        fontFamily={'heading'}
                        fontSize={'2xl'}
                        mb={5}
                    >Carteirinhas</Text>

                    <FlatList
                        data={children}
                        keyExtractor={item => item.name}
                        renderItem={({ item }) => (
                            <ScrollViewChildren
                                item={item}
                                onPress={() => {
                                    console.log('\nCliquei no aluno: ', { item })
                                    onOpen()
                                    setChildrenSelected(item)
                                }}
                            />
                        )}
                        horizontal
                        showsHorizontalScrollIndicator = {false}
                        maxH={110}
                        minH={110}
                        //_contentContainerStyle={{ px: 8 }}
                    />

                    {/* <FlatList
                        data={groups}
                        keyExtractor={item => item}
                        renderItem={({ item }) => (
                            <Group
                                name={item}
                                isActive={groupSelected.toUpperCase() === item.toUpperCase()}
                                onPress={() => setGroupSelected(item)}
                            />
                        )}
                        horizontal
                        showsHorizontalScrollIndicator
                        _contentContainerStyle={{ px: 8 }}
                        my={10}
                        maxH={10}
                        minH={10}
                    /> */}

                </VStack>


                <VStack mt={7}>
                    <Text
                        fontFamily={'heading'}
                        fontSize={'2xl'}
                        mb={5}
                    >Menu</Text>

                    <HStack justifyContent={'space-between'} mb={5}>
                        <ButtonCardMenu
                            title='Frequência'
                            color={'blueButton'}
                            icone={<IconeFrequencia />}
                            onPress={() => console.log('cliquei Frequência')}
                        />
                        <ButtonCardMenu
                            title='Notas'
                            color={'redButton'}
                            icone={<IconeNotas />}
                            onPress={() => navigation.navigate('grades')}
                        />
                    </HStack>
                    <HStack justifyContent={'space-between'}>
                        <ButtonCardMenu
                            title='Comunicados'
                            color={'orangeButton'}
                            icone={<IconeComunicados />}
                            onPress={() => navigation.navigate('announcement')}
                        />
                        <ButtonCardMenu
                            title='Financeiro'
                            color={'greenButton'}
                            icone={<IconeFinanceiro />}
                            onPress={() => console.log('cliquei Financeiro')}
                        />
                    </HStack>
                </VStack>

            </VStack>

            {/* Pop up carteirinha */}
            <Actionsheet isOpen={isOpen} onClose={onClose}>
                <KeyboardAvoidingView
                    behavior="padding"
                    w={'100%'}
                >
                    <Actionsheet.Content >
                        <VStack px={9} mt={2} mb={5} w={'100%'} h={'90%'} alignItems='center'>

                            <HStack
                                justifyContent={'center'}
                                alignItems={'center'}
                                h={50}
                                mb={3}
                            >
                                <LogoSvg width={'50px'} height={'50px'} style={{ marginRight: 1 }} />
                                <Text color='purple.600' fontFamily='heading' fontSize='2xl' ml={1}>
                                    {school}
                                </Text>
                            </HStack>

                            <VStack
                                w={'100%'}
                                flex={1}
                                alignItems={'center'}
                                bg={'purple.100'}
                                shadow={5}
                                mb={5}
                                rounded={'lg'}
                                px={3}
                                justifyContent={'center'}
                            >


                                <Avatar bg="gray.500" size={'xl'} shadow={7} m={2} source={{
                                    uri: childrenSelected?.photograph
                                }}>
                                    ...
                                </Avatar>

                                <VStack w={'100%'}>
                                    <Text fontFamily={'heading'}>Nome</Text>
                                    <Text fontFamily={'body'} fontSize={18}>{childrenSelected?.name}</Text>
                                </VStack>
                                <HStack justifyContent={'space-between'}>
                                    <VStack mt={2} w={'50%'}>
                                        <Text fontFamily={'heading'}>Data de Nascimento</Text>
                                        <Text fontFamily={'body'} fontSize={18}>{childrenSelected?.birth}</Text>
                                    </VStack>

                                    <VStack mt={2} w={'50%'}>
                                        <Text fontFamily={'heading'}>Tipo sanguineo</Text>
                                        <Text fontFamily={'body'} fontSize={18}>{childrenSelected?.bloodType}</Text>
                                    </VStack>
                                </HStack>

                                <HStack justifyContent={'space-between'}>
                                    <VStack w={'50%'} mt={2}>
                                        <Text fontFamily={'heading'}>Matricula</Text>
                                        <Text fontFamily={'body'} fontSize={18}>{childrenSelected?.registration}</Text>
                                    </VStack>

                                    <VStack w={'50%'} mt={2}>
                                        <Text fontFamily={'heading'}>Validade</Text>
                                        <Text fontFamily={'body'} fontSize={18}>{validadeCarteirinha}</Text>
                                    </VStack>
                                </HStack>



                                <VStack w={'100%'} mt={2}>
                                    <Text fontFamily={'heading'}>Série</Text>
                                    <Text fontFamily={'body'} fontSize={18}>{childrenSelected?.grade}</Text>
                                </VStack>

                            </VStack>
                            <Button
                                title='Download em PDF'
                                mb={2}
                                onPress={() => {
                                    console.log('fazendo o download')
                                    onClose()
                                }}
                            />
                            <ButtonGhost
                                title='Cancelar'
                                colorButton='cancel'
                                onPress={onClose}
                            />


                        </VStack>
                    </Actionsheet.Content>
                </KeyboardAvoidingView>
            </Actionsheet >

        </>
    );
}